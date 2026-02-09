const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'vehicles',
      key: 'id',
    },
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    defaultValue: () => {
      return `NL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    },
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'confirmed',
      'processing',
      'ready-for-delivery',
      'delivered',
      'cancelled',
      'refunded'
    ),
    defaultValue: 'pending',
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  downPayment: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  financingDetails: {
    type: DataTypes.JSON,
  },
  deliveryAddress: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  deliveryDate: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  trackingInfo: {
    type: DataTypes.JSON,
  },
  insuranceInfo: {
    type: DataTypes.JSON,
  },
  tradeInDetails: {
    type: DataTypes.JSON,
  },
  documents: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['vehicle_id'] },
    { fields: ['status'] },
    { fields: ['payment_status'] },
    { fields: ['created_at'] },
  ],
});

module.exports = Order;
