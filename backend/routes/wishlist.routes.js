const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Mock data for now - replace with actual database query
    const wishlist = [
      {
        id: 1,
        vehicleId: 'V001',
        name: 'Porsche 911 GT3 RS',
        price: 295000,
        image: '/images/porsche-gt3rs.jpg',
        year: 2024,
        addedDate: '2024-01-15',
        status: 'available'
      },
      {
        id: 2,
        vehicleId: 'V002',
        name: 'Ferrari SF90 Stradale',
        price: 625000,
        image: '/images/ferrari-sf90.jpg',
        year: 2024,
        addedDate: '2024-01-10',
        status: 'reserved'
      }
    ];
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add vehicle to wishlist
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { vehicleId } = req.body;
    // Add to database
    res.json({ success: true, message: 'Vehicle added to wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove vehicle from wishlist
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Remove from database
    res.json({ success: true, message: 'Vehicle removed from wishlist' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;