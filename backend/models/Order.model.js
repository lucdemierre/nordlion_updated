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
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
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
});

module.exports = Order;
