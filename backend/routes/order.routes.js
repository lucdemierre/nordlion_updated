const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Order, Vehicle, User } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `NL-${timestamp}-${random}`;
};

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post(
  '/',
  authenticateToken,
  [
    body('vehicleId').notEmpty().withMessage('Vehicle ID required'),
    body('deliveryAddress').notEmpty().withMessage('Delivery address required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { vehicleId, deliveryAddress, downPayment, financingDetails, notes } = req.body;

      // Check vehicle availability
      const vehicle = await Vehicle.findByPk(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      if (vehicle.status !== 'available') {
        return res.status(400).json({ error: 'Vehicle not available' });
      }

      // Create order
      const order = await Order.create({
        userId: req.user.id,
        vehicleId,
        orderNumber: generateOrderNumber(),
        amount: vehicle.price,
        downPayment,
        financingDetails,
        deliveryAddress,
        notes,
      });

      // Update vehicle status
      await vehicle.update({ status: 'reserved' });

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: ['vehicle', 'user'],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (order.userId !== req.user.id && !['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private (Admin)
router.put(
  '/:id/status',
  authenticateToken,
  authorizeRole('admin', 'superadmin'),
  async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByPk(req.params.id);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      await order.update({ status });
      res.json({ message: 'Order status updated', order });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: ['vehicle'] });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check authorization
    if (order.userId !== req.user.id && !['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Can only cancel if not delivered
    if (order.status === 'delivered') {
      return res.status(400).json({ error: 'Cannot cancel delivered order' });
    }

    await order.update({ status: 'cancelled' });
    
    // Make vehicle available again
    if (order.vehicle) {
      await order.vehicle.update({ status: 'available' });
    }

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
