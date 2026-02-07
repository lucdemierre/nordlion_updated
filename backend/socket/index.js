const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Message = require('../models/Message.model');

// Store active user sockets
const userSockets = new Map();

function setupSocketIO(io) {
  // Socket.IO middleware for authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user.id;
      socket.userRole = user.role;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`\u2705 User connected: ${socket.userId}`);

    // Store socket connection
    userSockets.set(socket.userId, socket.id);

    // Set user online
    try {
      const user = await User.findByPk(socket.userId);
      if (user) {
        await user.setOnline();
        
        // Broadcast online status to all users
        io.emit('user:online', {
          userId: socket.userId,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error setting user online:', error);
    }

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Handle sending messages
    socket.on('message:send', async (data) => {
      try {
        const { receiverId, content, type = 'text' } = data;

        // Create message in database
        const message = await Message.create({
          senderId: socket.userId,
          receiverId,
          content,
          type,
        });

        // Get sender info
        const sender = await User.findByPk(socket.userId, {
          attributes: ['id', 'name', 'avatar', 'role'],
        });

        const messageData = {
          ...message.toJSON(),
          Sender: sender,
        };

        // Send to receiver if online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('message:received', messageData);
        }

        // Confirm to sender
        socket.emit('message:sent', messageData);

        // Notify receiver (even if offline, for notification count)
        io.to(`user:${receiverId}`).emit('notification:new', {
          type: 'message',
          from: sender.name,
          timestamp: new Date(),
        });
      } catch (error) {
        socket.emit('message:error', { error: error.message });
      }
    });

    // Handle message read status
    socket.on('message:read', async (data) => {
      try {
        const { messageId } = data;
        
        const message = await Message.findByPk(messageId);
        if (message && message.receiverId === socket.userId) {
          message.read = true;
          message.readAt = new Date();
          await message.save();

          // Notify sender
          const senderSocketId = userSockets.get(message.senderId);
          if (senderSocketId) {
            io.to(senderSocketId).emit('message:read', {
              messageId,
              readAt: message.readAt,
            });
          }
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    });

    // Handle typing indicator
    socket.on('typing:start', (data) => {
      const { receiverId } = data;
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing:started', {
          userId: socket.userId,
        });
      }
    });

    socket.on('typing:stop', (data) => {
      const { receiverId } = data;
      const receiverSocketId = userSockets.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing:stopped', {
          userId: socket.userId,
        });
      }
    });

    // Handle order status updates (admin only)
    socket.on('order:update', async (data) => {
      if (socket.userRole !== 'admin' && socket.userRole !== 'dealer') {
        return socket.emit('error', { message: 'Unauthorized' });
      }

      const { orderId, status, userId } = data;
      
      // Notify customer
      io.to(`user:${userId}`).emit('order:updated', {
        orderId,
        status,
        timestamp: new Date(),
      });

      // Send notification
      io.to(`user:${userId}`).emit('notification:new', {
        type: 'order_update',
        orderId,
        status,
        timestamp: new Date(),
      });
    });

    // Handle vehicle updates (broadcast to all)
    socket.on('vehicle:update', async (data) => {
      if (socket.userRole !== 'admin' && socket.userRole !== 'dealer') {
        return socket.emit('error', { message: 'Unauthorized' });
      }

      io.emit('vehicle:updated', data);
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`\u274c User disconnected: ${socket.userId}`);
      
      // Remove from active sockets
      userSockets.delete(socket.userId);

      // Set user offline
      try {
        const user = await User.findByPk(socket.userId);
        if (user) {
          await user.setOffline();
          
          // Broadcast offline status
          io.emit('user:offline', {
            userId: socket.userId,
            lastSeen: new Date(),
          });
        }
      } catch (error) {
        console.error('Error setting user offline:', error);
      }
    });
  });

  return io;
}

module.exports = { setupSocketIO, userSockets };
