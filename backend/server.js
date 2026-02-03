const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const { sequelize } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// New Dashboard Routes
app.use('/api/wishlist', require('./routes/wishlist.routes'));
app.use('/api/messages', require('./routes/messages.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));
app.use('/api/billing', require('./routes/billing.routes'));
app.use('/api/documents', require('./routes/documents.routes'));
app.use('/api/settings', require('./routes/settings.routes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'NordLion API is running',
    timestamp: new Date().toISOString(),
    routes: {
      auth: '/api/auth',
      users: '/api/users',
      vehicles: '/api/vehicles',
      orders: '/api/orders',
      admin: '/api/admin',
      wishlist: '/api/wishlist',
      messages: '/api/messages',
      notifications: '/api/notifications',
      billing: '/api/billing',
      documents: '/api/documents',
      settings: '/api/settings'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');

    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database models synchronized');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 NordLion API server running on port ${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`   Database: ${process.env.DB_NAME}`);
      console.log(`   API Health: http://localhost:${PORT}/health`);
      console.log('\n📋 Available Routes:');
      console.log('   - /api/auth');
      console.log('   - /api/users');
      console.log('   - /api/vehicles');
      console.log('   - /api/orders');
      console.log('   - /api/admin');
      console.log('   - /api/wishlist');
      console.log('   - /api/messages');
      console.log('   - /api/notifications');
      console.log('   - /api/billing');
      console.log('   - /api/documents');
      console.log('   - /api/settings');
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
