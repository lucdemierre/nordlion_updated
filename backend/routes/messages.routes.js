const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get all conversations
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const conversations = [
      {
        id: 1,
        contactName: 'Support Team',
        lastMessage: 'Your order has been confirmed',
        timestamp: '2024-01-15T10:30:00Z',
        unread: 2,
        avatar: '/avatars/support.jpg'
      },
      {
        id: 2,
        contactName: 'Sales Department',
        lastMessage: 'The vehicle you inquired about is available',
        timestamp: '2024-01-14T15:20:00Z',
        unread: 0,
        avatar: '/avatars/sales.jpg'
      }
    ];
    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get messages for a conversation
router.get('/:conversationId', authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = [
      {
        id: 1,
        senderId: 'user',
        content: 'I\'m interested in the Porsche 911 GT3 RS',
        timestamp: '2024-01-15T10:25:00Z',
        isOwn: true
      },
      {
        id: 2,
        senderId: 'support',
        content: 'Great choice! That vehicle is currently available. Would you like to schedule a viewing?',
        timestamp: '2024-01-15T10:30:00Z',
        isOwn: false
      }
    ];
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send a message
router.post('/send', authenticateToken, async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    // Save message to database
    const message = {
      id: Date.now(),
      conversationId,
      senderId: req.user.id,
      content,
      timestamp: new Date().toISOString(),
      isOwn: true
    };
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark conversation as read
router.put('/:conversationId/read', authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    // Update database
    res.json({ success: true, message: 'Conversation marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;