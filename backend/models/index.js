const { sequelize } = require('../config/database');
const User = require('./User.model');
const Vehicle = require('./Vehicle.model');
const Order = require('./Order.model');
const Review = require('./Review.model');

// Define associations
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Vehicle.hasMany(Order, { foreignKey: 'vehicleId', as: 'orders' });
Order.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Vehicle.hasMany(Review, { foreignKey: 'vehicleId', as: 'reviews' });
Review.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

module.exports = {
  sequelize,
  User,
  Vehicle,
  Order,
  Review,
};
