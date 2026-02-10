const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KYC = sequelize.define('KYC', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Personal Information
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Address Verification
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Identity Verification
  idType: {
    type: DataTypes.ENUM('passport', 'drivers_license', 'national_id'),
    allowNull: false
  },
  idNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  idExpiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  // Document Uploads
  idFrontImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idBackImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  proofOfAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  selfieImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Financial Information (for high-value transactions)
  sourceOfFunds: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  employmentStatus: {
    type: DataTypes.ENUM('employed', 'self_employed', 'business_owner', 'retired', 'other'),
    allowNull: true
  },
  annualIncome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Verification Status
  status: {
    type: DataTypes.ENUM('pending', 'under_review', 'approved', 'rejected', 'expired'),
    defaultValue: 'pending',
    allowNull: false
  },
  verificationLevel: {
    type: DataTypes.ENUM('basic', 'intermediate', 'advanced'),
    defaultValue: 'basic',
    allowNull: false
  },
  // Review Information
  reviewedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reviewedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Risk Assessment
  riskLevel: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'low'
  },
  // Compliance
  amlCheck: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sanctionsCheck: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pepCheck: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Expiry
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Metadata
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'kyc_verifications',
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['status']
    },
    {
      fields: ['verificationLevel']
    }
  ]
});

// Instance Methods
KYC.prototype.isExpired = function() {
  if (!this.expiresAt) return false;
  return new Date() > new Date(this.expiresAt);
};

KYC.prototype.isApproved = function() {
  return this.status === 'approved' && !this.isExpired();
};

KYC.prototype.canTransact = function(amount) {
  if (!this.isApproved()) return false;
  
  // Transaction limits based on verification level
  const limits = {
    basic: 50000,
    intermediate: 250000,
    advanced: Infinity
  };
  
  return amount <= limits[this.verificationLevel];
};

module.exports = KYC;
