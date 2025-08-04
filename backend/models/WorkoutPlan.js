const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

// Enums
const PLAN_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const WorkoutPlan = sequelize.define("WorkoutPlan", {
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
      key: "id",
    },
    onDelete: "CASCADE",
  },
  planText: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  daysPerWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM(...PLAN_LEVELS),
    allowNull: false,
  },
  weeks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  generatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "WorkoutPlans",
  timestamps: true,
});

module.exports = WorkoutPlan;
