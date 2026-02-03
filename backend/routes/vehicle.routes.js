const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Vehicle, Review } = require('../models');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

// @route   GET /api/vehicles
// @desc    Get all vehicles with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      minPrice,
      maxPrice,
      condition,
      status,
      bodyType,
      fuelType,
      transmission,
      page = 1,
      limit = 12,
      sort = 'createdAt',
      order = 'DESC',
    } = req.query;

    const where = {};

    if (make) where.make = { [Op.iLike]: `%${make}%` };
    if (model) where.model = { [Op.iLike]: `%${model}%` };
    if (year) where.year = year;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }
    if (condition) where.condition = condition;
    if (status) where.status = status;
    if (bodyType) where.bodyType = bodyType;
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;

    const offset = (page - 1) * limit;

    const { count, rows: vehicles } = await Vehicle.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [[sort, order]],
      include: [{ model: Review, as: 'reviews' }],
    });

    res.json({
      vehicles,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/vehicles/featured
// @desc    Get featured vehicles
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: { isFeatured: true, status: 'available' },
      limit: 6,
      order: [['views', 'DESC']],
    });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/vehicles/:id
// @desc    Get vehicle by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [{ model: Review, as: 'reviews', include: ['user'] }],
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Increment views
    await vehicle.increment('views');

    res.json({ vehicle });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/vehicles
// @desc    Create new vehicle
// @access  Private (Admin)
router.post(
  '/',
  authenticateToken,
  authorizeRole('admin', 'superadmin'),
  async (req, res) => {
    try {
      const vehicle = await Vehicle.create(req.body);
      res.status(201).json({ message: 'Vehicle created', vehicle });
    } catch (error) {
      console.error('Create vehicle error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   PUT /api/vehicles/:id
// @desc    Update vehicle
// @access  Private (Admin)
router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin', 'superadmin'),
  async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      await vehicle.update(req.body);
      res.json({ message: 'Vehicle updated', vehicle });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// @route   DELETE /api/vehicles/:id
// @desc    Delete vehicle
// @access  Private (Admin)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin', 'superadmin'),
  async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      await vehicle.destroy();
      res.json({ message: 'Vehicle deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
