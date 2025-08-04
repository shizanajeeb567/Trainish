const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

// Enums
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  dayOfWeek: {
    type: DataTypes.ENUM(...DAYS_OF_WEEK),
    allowNull: false,
  },
  focusArea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exercises: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  totalDuration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  weekNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Workout',
  timestamps: true,
});

module.exports = Workout;
