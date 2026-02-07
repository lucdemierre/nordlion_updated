const express = require('express');
const router = express.Router();
const Review = require('../models/Review.model');
const User = require('../models/User.model');
const Vehicle = require('../models/Vehicle.model');
const { authMiddleware } = require('../middleware/auth.middleware');

// @route   GET /api/reviews/vehicle/:vehicleId
// @desc    Get reviews for a vehicle
// @access  Public
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { vehicleId: req.params.vehicleId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// @route   POST /api/reviews
// @desc    Create review
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { vehicleId, rating, comment } = req.body;

    // Check if user already reviewed this vehicle
    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        vehicleId,
      },
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You already reviewed this vehicle' });
    }

    const review = await Review.create({
      userId: req.user.id,
      vehicleId,
      rating,
      comment,
    });

    const reviewWithUser = await Review.findByPk(review.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });

    res.status(201).json({
      message: 'Review created successfully',
      review: reviewWithUser,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

module.exports = router;
