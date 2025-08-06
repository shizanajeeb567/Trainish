const WorkoutPlan = require('../models/plan');

const getWeekInfo = (dateStr) => {
  const date = new Date(dateStr);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekNumber = Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return { weekNumber, month, year };
};

exports.createPlan = async (userId, planData) => {
  const { dayOfWeek, focusArea, exercises, totalDuration, date } = planData;

  if (!Array.isArray(exercises) || exercises.length === 0) {
    throw new Error('Exercises must be a non-empty array');
  }

  if (!date) {
    throw new Error('Date is required to assign week/month/year');
  }

  const { weekNumber, month, year } = getWeekInfo(date);

  // Check for duplicate day in same week for this user
  const existingPlan = await WorkoutPlan.findOne({
    where: {
      userId,
      dayOfWeek,
      weekNumber,
      month,
    },
  });

  if (existingPlan) {
    throw new Error(`A plan already exists for ${dayOfWeek} in this week.`);
  }

  const newPlan = await WorkoutPlan.create({
    userId,
    dayOfWeek,
    focusArea,
    exercises,
    totalDuration,
    date,
    weekNumber,
    month,
    year,
  });

  return newPlan;
};

exports.getPlans = async (userId, filters = {}) => {
  const { date, dayOfWeek } = filters;
  const where = { userId };

  if (date) {
    where.date = date; // exact match only
  }

  if (dayOfWeek) {
    where.dayOfWeek = dayOfWeek;
  }

  const plans = await WorkoutPlan.findAll({ where });
  return plans;
};



exports.updatePlan = async (planId, updatedFields) => {
  const plan = await WorkoutPlan.findByPk(planId);
  if (!plan) {
    throw new Error('Workout plan not found');
  }

  await plan.update(updatedFields);
  return plan;
};

exports.deletePlan = async (planId) => {
  const plan = await WorkoutPlan.findByPk(planId);
  if (!plan) {
    throw new Error('Workout plan not found');
  }

  await plan.destroy();
  return { message: 'Workout plan deleted successfully' };
};