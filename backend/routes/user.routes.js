const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { User, Order, Review } = require('../models');
const { authenticateToken } = require('../middleware/auth.middleware');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { model: Order, as: 'orders' },
        { model: Review, as: 'reviews' },
      ],
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, preferences } = req.body;
    
    const user = await User.findByPk(req.user.id);
    await user.update({
      firstName,
      lastName,
      phone,
      address,
      preferences,
    });

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/users/password
// @desc    Change password
// @access  Private
router.put(
  '/password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      const user = await User.findByPk(req.user.id);

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password incorrect' });
      }

      await user.update({ password: newPassword });
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   GET /api/users/orders
// @desc    Get user orders
// @access  Private
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: ['vehicle'],
      order: [['createdAt', 'DESC']],
    });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
