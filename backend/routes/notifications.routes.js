const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get all notifications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notifications = [
      {
        id: 1,
        type: 'order',
        title: 'Order Delivered',
        message: 'Your Porsche 911 Turbo S has been delivered',
        timestamp: '2024-01-15T10:30:00Z',
        read: false,
        icon: 'package'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Processed',
        message: 'Payment of $245,000 has been successfully processed',
        timestamp: '2024-01-14T15:20:00Z',
        read: true,
        icon: 'credit-card'
      },
      {
        id: 3,
        type: 'message',
        title: 'New Message',
        message: 'You have a new message from Support Team',
        timestamp: '2024-01-13T09:15:00Z',
        read: false,
        icon: 'message-square'
      }
    ];
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark notification as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Update database
    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticateToken, async (req, res) => {
  try {
    // Update all notifications in database
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Delete from database
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get unread count
router.get('/unread/count', authenticateToken, async (req, res) => {
  try {
    const count = 2; // Get from database
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;