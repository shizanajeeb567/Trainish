const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

// Enums
const GENDER_TYPES = ['Male', 'Female', 'Other'];

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  gender: {
    type: DataTypes.ENUM(...GENDER_TYPES),
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foodAllergies: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'UserProfiles',
  timestamps: true,
});

module.exports = Profile;
