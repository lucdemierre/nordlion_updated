const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid authentication' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token' });
  }
};

// Admin authorization middleware
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Dealer or Admin middleware
const dealerMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'dealer') {
    return res.status(403).json({ error: 'Dealer or admin access required' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  dealerMiddleware,
};
