const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  vin: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  interiorColor: {
    type: DataTypes.STRING,
  },
  transmission: {
    type: DataTypes.ENUM('automatic', 'manual', 'cvt'),
    defaultValue: 'automatic',
  },
  fuelType: {
    type: DataTypes.ENUM('gasoline', 'diesel', 'electric', 'hybrid', 'plugin-hybrid'),
    defaultValue: 'gasoline',
  },
  bodyType: {
    type: DataTypes.STRING,
  },
  drivetrain: {
    type: DataTypes.ENUM('fwd', 'rwd', 'awd', '4wd'),
  },
  engineSize: {
    type: DataTypes.STRING,
  },
  horsepower: {
    type: DataTypes.INTEGER,
  },
  torque: {
    type: DataTypes.INTEGER,
  },
  seats: {
    type: DataTypes.INTEGER,
  },
  doors: {
    type: DataTypes.INTEGER,
  },
  mpgCity: {
    type: DataTypes.INTEGER,
  },
  mpgHighway: {
    type: DataTypes.INTEGER,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  description: {
    type: DataTypes.TEXT,
  },
  condition: {
    type: DataTypes.ENUM('new', 'used', 'certified'),
    defaultValue: 'used',
  },
  status: {
    type: DataTypes.ENUM('available', 'reserved', 'sold', 'pending'),
    defaultValue: 'available',
  },
  location: {
    type: DataTypes.STRING,
  },
  carfaxReport: {
    type: DataTypes.STRING,
  },
  previousOwners: {
    type: DataTypes.INTEGER,
  },
  accidents: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  serviceHistory: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  warrantyInfo: {
    type: DataTypes.JSON,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Vehicle;
