const express = require('express');
const router = express.Router();
const Message = require('../models/Message.model');
const User = require('../models/User.model');
const { authMiddleware } = require('../middleware/auth.middleware');
const { Op } = require('sequelize');

// @route   GET /api/messages/conversations
// @desc    Get user's conversations list
// @access  Private
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all unique conversations
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['id', 'name', 'avatar', 'isOnline', 'lastSeenAt'],
        },
        {
          model: User,
          as: 'Receiver',
          attributes: ['id', 'name', 'avatar', 'isOnline', 'lastSeenAt'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Group by conversation partner
    const conversationsMap = new Map();
    
    messages.forEach(message => {
      const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
      
      if (!conversationsMap.has(partnerId)) {
        const partner = message.senderId === userId ? message.Receiver : message.Sender;
        conversationsMap.set(partnerId, {
          partner,
          lastMessage: message,
          unreadCount: 0,
        });
      }

      // Count unread messages
      if (message.receiverId === userId && !message.read) {
        conversationsMap.get(partnerId).unreadCount++;
      }
    });

    const conversations = Array.from(conversationsMap.values());
    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// @route   GET /api/messages/:userId
// @desc    Get messages with specific user
// @access  Private
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await Message.findAndCountAll({
      where: {
        [Op.or]: [
          { senderId: currentUserId, receiverId: userId },
          { senderId: userId, receiverId: currentUserId },
        ],
      },
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'ASC']],
    });

    // Mark messages as read
    await Message.update(
      { read: true, readAt: new Date() },
      {
        where: {
          senderId: userId,
          receiverId: currentUserId,
          read: false,
        },
      }
    );

    res.json({
      messages: messages.rows,
      pagination: {
        total: messages.count,
        page: parseInt(page),
        pages: Math.ceil(messages.count / limit),
      },
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// @route   POST /api/messages
// @desc    Send new message
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { receiverId, content, type = 'text' } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ error: 'Receiver and content required' });
    }

    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
      type,
    });

    const messageWithSender = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['id', 'name', 'avatar'],
        },
      ],
    });

    res.status(201).json(messageWithSender);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// @route   GET /api/messages/unread/count
// @desc    Get unread message count
// @access  Private
router.get('/unread/count', authMiddleware, async (req, res) => {
  try {
    const count = await Message.count({
      where: {
        receiverId: req.user.id,
        read: false,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

module.exports = router;
