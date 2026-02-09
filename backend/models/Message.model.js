const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Use lowercase to match actual table name
      key: 'id',
    },
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Use lowercase to match actual table name
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  readAt: {
    type: DataTypes.DATE,
  },
  type: {
    type: DataTypes.ENUM('text', 'image', 'file', 'inquiry', 'quote'),
    defaultValue: 'text',
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  timestamps: true,
  underscored: true, // Use snake_case for DB columns
  indexes: [
    { fields: ['sender_id'] },
    { fields: ['receiver_id'] },
    { fields: ['read'] },
    { fields: ['created_at'] },
  ],
});

module.exports = Message;
