require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./config/database');
const { setupSocketIO } = require('./socket/index');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const orderRoutes = require('./routes/order.routes');
const reviewRoutes = require('./routes/review.routes');
const messageRoutes = require('./routes/message.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();
const server = http.createServer(app);

// Socket.IO setup with CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// Make io accessible to routes
app.set('io', io);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: sequelize.authenticate()
      .then(() => 'connected')
      .catch(() => 'disconnected'),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Setup Socket.IO event handlers
setupSocketIO(io);

// Database connection and server start
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('\u2705 Database connection established');

    // Sync models (use { alter: true } in development, migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('\u2705 Database models synced');
    }

    // Start server
    server.listen(PORT, () => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`\ud83d\ude80 NordLion Backend Server Running`);
      console.log(`${'='.repeat(60)}`);
      console.log(`\ud83c\udf0d Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\ud83d\udd0c Port: ${PORT}`);
      console.log(`\ud83d\udcca Health: http://localhost:${PORT}/health`);
      console.log(`\ud83d\udd0c API: http://localhost:${PORT}/api`);
      console.log(`\ud83d\udd0c Socket.IO: Enabled`);
      console.log(`${'='.repeat(60)}\n`);
    });
  } catch (error) {
    console.error('\u274c Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n\ud83d\uded1 SIGTERM received. Shutting down gracefully...');
  server.close(async () => {
    await sequelize.close();
    console.log('\u2705 Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('\n\ud83d\uded1 SIGINT received. Shutting down gracefully...');
  server.close(async () => {
    await sequelize.close();
    console.log('\u2705 Server closed');
    process.exit(0);
  });
});

startServer();

module.exports = { app, server, io };
