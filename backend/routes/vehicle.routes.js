const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle.model');
const Review = require('../models/Review.model');
const { authMiddleware, dealerMiddleware } = require('../middleware/auth.middleware');
const { Op } = require('sequelize');

// @route   GET /api/vehicles
// @desc    Get all vehicles with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      make,
      minPrice,
      maxPrice,
      year,
      condition,
      status = 'available',
      featured,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (make) {
      where.make = { [Op.iLike]: `%${make}%` };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    if (year) {
      where.year = parseInt(year);
    }

    if (condition) {
      where.condition = condition;
    }

    if (featured !== undefined) {
      where.featured = featured === 'true';
    }

    if (search) {
      where[Op.or] = [
        { make: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Vehicle.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: Review,
          attributes: ['rating'],
        },
      ],
    });

    res.json({
      vehicles: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get single vehicle
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          include: [{
            model: require('../models/User.model'),
            attributes: ['id', 'name', 'avatar'],
          }],
        },
      ],
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Increment view count
    vehicle.views = (vehicle.views || 0) + 1;
    await vehicle.save();

    res.json(vehicle);
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
});

// @route   POST /api/vehicles
// @desc    Create new vehicle
// @access  Private/Dealer
router.post('/', authMiddleware, dealerMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
});

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle
// @access  Private/Dealer
router.put('/:id', authMiddleware, dealerMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.update(req.body);
    
    res.json({
      message: 'Vehicle updated successfully',
      vehicle,
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
});

// @route   DELETE /api/vehicles/:id
// @desc    Delete vehicle
// @access  Private/Dealer
router.delete('/:id', authMiddleware, dealerMiddleware, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
});

module.exports = router;
