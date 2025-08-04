const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const WorkoutLog = sequelize.define('Log', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  exerciseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'WorkoutLogs',
  timestamps: true,
});

module.exports = WorkoutLog;
