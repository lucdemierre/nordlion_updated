const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Review = sequelize.define('Review', {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  title: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pros: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  cons: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  notHelpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  response: {
    type: DataTypes.TEXT,
  },
  responseDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Review;
