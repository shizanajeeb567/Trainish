const WorkoutLog = require('../models/log');
const User = require('../models/user');
exports.createMultipleLogs = async (userId, logs) => {
  const formattedLogs = logs.map(log => ({
    ...log,
    userId,
  }));

  const createdLogs = await WorkoutLog.bulkCreate(formattedLogs);
  return createdLogs;
};


exports.getAllLogs = async (userId, date) => {
    const whereClause = { userId };
    if (date) {
        whereClause.date = date;
    }

    const logs = await WorkoutLog.findAll({
        where: whereClause,
        order: [['date', 'DESC']],
    });

    return logs;
};

exports.updateWorkoutLog = async (logId, updatedFields) => {
  const log = await WorkoutLog.findByPk(logId);
  if (!log) {
    throw new Error('Workout log not found');
  }

  await log.update(updatedFields);
  return log;
};

exports.deleteWorkoutLog = async (logId) => {
  const log = await WorkoutLog.findByPk(logId);
  if (!log) {
    throw new Error('Workout log not found');
  }

  await log.destroy();
  return { message: 'Workout log deleted successfully' };
};