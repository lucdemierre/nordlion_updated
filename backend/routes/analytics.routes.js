const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const User = require('../models/User.model');
const Vehicle = require('../models/Vehicle.model');
const Order = require('../models/Order.model');
const Review = require('../models/Review.model');
const Message = require('../models/Message.model');
const { sequelize } = require('../config/database');

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Private/Admin
router.get('/dashboard', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Total counts
    const [totalUsers, totalVehicles, totalOrders, totalRevenue] = await Promise.all([
      User.count(),
      Vehicle.count(),
      Order.count(),
      Order.sum('totalPrice', {
        where: {
          paymentStatus: 'paid',
        },
      }),
    ]);

    // Recent stats
    const [newUsers, newOrders, pendingOrders, availableVehicles] = await Promise.all([
      User.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
          },
        },
      }),
      Order.count({
        where: {
          createdAt: {
            [Op.gte]: startDate,
          },
        },
      }),
      Order.count({
        where: {
          status: 'pending',
        },
      }),
      Vehicle.count({
        where: {
          status: 'available',
        },
      }),
    ]);

    // Revenue trends (by day for last 30 days)
    const revenueTrends = await Order.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders'],
      ],
      where: {
        createdAt: {
          [Op.gte]: startDate,
        },
        paymentStatus: 'paid',
      },
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']],
    });

    // Top selling vehicles
    const topVehicles = await Order.findAll({
      attributes: [
        'vehicleId',
        [sequelize.fn('COUNT', sequelize.col('vehicleId')), 'orderCount'],
      ],
      where: {
        status: {
          [Op.in]: ['completed', 'processing'],
        },
      },
      group: ['vehicleId'],
      order: [[sequelize.fn('COUNT', sequelize.col('vehicleId')), 'DESC']],
      limit: 5,
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'make', 'model', 'year', 'price', 'images'],
        },
      ],
    });

    // User activity
    const [onlineUsers, activeUsers] = await Promise.all([
      User.count({
        where: {
          isOnline: true,
        },
      }),
      User.count({
        where: {
          lastSeenAt: {
            [Op.gte]: new Date(now - 24 * 60 * 60 * 1000), // Last 24h
          },
        },
      }),
    ]);

    // Order status breakdown
    const ordersByStatus = await Order.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['status'],
    });

    // Average order value
    const avgOrderValue = await Order.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('totalPrice')), 'average'],
      ],
      where: {
        paymentStatus: 'paid',
      },
    });

    res.json({
      overview: {
        totalUsers,
        totalVehicles,
        totalOrders,
        totalRevenue: parseFloat(totalRevenue || 0).toFixed(2),
        newUsers,
        newOrders,
        pendingOrders,
        availableVehicles,
        avgOrderValue: parseFloat(avgOrderValue?.dataValues?.average || 0).toFixed(2),
      },
      activity: {
        onlineUsers,
        activeUsers,
      },
      trends: {
        revenue: revenueTrends,
      },
      topVehicles,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// @route   GET /api/analytics/sales
// @desc    Get sales analytics
// @access  Private/Admin
router.get('/sales', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;

    const where = {
      paymentStatus: 'paid',
    };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate);
    }

    let dateFormat;
    switch (groupBy) {
      case 'month':
        dateFormat = '%Y-%m';
        break;
      case 'week':
        dateFormat = '%Y-W%V';
        break;
      case 'day':
      default:
        dateFormat = '%Y-%m-%d';
    }

    const sales = await Order.findAll({
      attributes: [
        [sequelize.fn('TO_CHAR', sequelize.col('createdAt'), dateFormat), 'period'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders'],
      ],
      where,
      group: [sequelize.fn('TO_CHAR', sequelize.col('createdAt'), dateFormat)],
      order: [[sequelize.fn('TO_CHAR', sequelize.col('createdAt'), dateFormat), 'ASC']],
    });

    res.json(sales);
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch sales analytics' });
  }
});

module.exports = router;
