const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./user');

const MealPlan = sequelize.define("MealPlan", {
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
  planDuration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cuisines: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regenerationCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  planData: {
    type: DataTypes.JSONB,
    allowNull: false,
  }
}, {
  tableName: 'MealPlans',
  timestamps: true,
});

module.exports = { MealPlan };
