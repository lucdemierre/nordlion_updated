const express = require('express');
const router = express.Router();
const { User, Vehicle, Order, Review } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');
const { Op } = require('sequelize');

// All routes require admin or superadmin role
router.use(authenticateToken);
router.use(authorizeRole('admin', 'superadmin'));

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalVehicles = await Vehicle.count();
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('amount', {
      where: { paymentStatus: 'paid' },
    });

    const recentOrders = await Order.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: ['user', 'vehicle'],
    });

    const vehiclesByStatus = await Vehicle.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', 'id'), 'count'],
      ],
      group: ['status'],
    });

    const ordersByStatus = await Order.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', 'id'), 'count'],
      ],
      group: ['status'],
    });

    res.json({
      stats: {
        totalUsers,
        totalVehicles,
        totalOrders,
        totalRevenue: totalRevenue || 0,
      },
      recentOrders,
      vehiclesByStatus,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Private (Admin)
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const where = search
      ? {
          [Op.or]: [
            { email: { [Op.iLike]: `%${search}%` } },
            { firstName: { [Op.iLike]: `%${search}%` } },
            { lastName: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows: users } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
    });

    res.json({
      users,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user
// @access  Private (Admin)
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { role, isActive } = req.body;
    await user.update({ role, isActive });

    res.json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Superadmin)
router.delete('/users/:id', authorizeRole('superadmin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private (Admin)
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    const where = status ? { status } : {};

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: ['user', 'vehicle'],
    });

    res.json({
      orders,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/admin/reviews
// @desc    Get all reviews
// @access  Private (Admin)
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [['createdAt', 'DESC']],
      include: ['user', 'vehicle'],
    });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
