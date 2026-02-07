const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const Vehicle = require('../models/Vehicle.model');
const User = require('../models/User.model');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');
const { Op } = require('sequelize');

// @route   GET /api/orders
// @desc    Get all orders (admin) or user's orders
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    const where = {};
    
    // Non-admins can only see their own orders
    if (req.user.role !== 'admin') {
      where.userId = req.user.id;
    }

    if (status) {
      where.status = status;
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'make', 'model', 'year', 'images', 'price'],
        },
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    res.json({
      orders: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Vehicle,
        },
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { vehicleId, deliveryAddress, notes } = req.body;

    // Verify vehicle exists and is available
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    if (vehicle.status !== 'available') {
      return res.status(400).json({ error: 'Vehicle is not available' });
    }

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      vehicleId,
      totalPrice: vehicle.price,
      deliveryAddress,
      notes,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Update vehicle status
    vehicle.status = 'pending';
    await vehicle.save();

    const orderWithDetails = await Order.findByPk(order.id, {
      include: [Vehicle, User],
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: orderWithDetails,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin only)
// @access  Private/Admin
router.put('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    
    const order = await Order.findByPk(req.params.id, {
      include: [Vehicle],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (status) {
      order.status = status;
      
      // Update vehicle status based on order status
      if (status === 'completed') {
        order.Vehicle.status = 'sold';
        await order.Vehicle.save();
      } else if (status === 'cancelled') {
        order.Vehicle.status = 'available';
        await order.Vehicle.save();
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel order
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Vehicle],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Can only cancel pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot cancel processed orders' });
    }

    order.status = 'cancelled';
    await order.save();

    // Make vehicle available again
    order.Vehicle.status = 'available';
    await order.Vehicle.save();

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

module.exports = router;
