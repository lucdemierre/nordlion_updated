const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.name.split(' ')[0];
    },
  },
  lastName: {
    type: DataTypes.VIRTUAL,
    get() {
      const parts = this.name.split(' ');
      return parts.slice(1).join(' ');
    },
  },
  phone: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'dealer'),
    defaultValue: 'user',
  },
  avatar: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {
      notifications: true,
      newsletter: false,
      language: 'en',
      currency: 'GBP',
    },
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // NEW: Online status tracking
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastSeenAt: {
    type: DataTypes.DATE,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  // Email verification
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  // Password reset
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
  },
  // Security
  twoFactorEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  twoFactorSecret: {
    type: DataTypes.STRING,
  },
  // Stats
  totalPurchases: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalSpent: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  indexes: [
    { fields: ['email'] },
    { fields: ['role'] },
    { fields: ['isOnline'] },
    { fields: ['isActive'] },
  ],
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

User.prototype.setOnline = async function() {
  this.isOnline = true;
  this.lastSeenAt = new Date();
  await this.save();
};

User.prototype.setOffline = async function() {
  this.isOnline = false;
  this.lastSeenAt = new Date();
  await this.save();
};

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.verificationToken;
  delete values.resetPasswordToken;
  delete values.resetPasswordExpires;
  delete values.twoFactorSecret;
  return values;
};

module.exports = User;
