const workoutLogService= require('../services/workoutLogService.js');

exports.logCreation = async (req, res) => {
  const userId = req.user.id;
  const logs = req.body.logs;

  console.log("Received logs:", logs); // ← Debug print

  if (!Array.isArray(logs) || logs.length === 0) {
    return res.status(400).json({ error: 'Logs should be a non-empty array' });
  }
  console.log("User ID:", userId);
console.log("Received logs payload:", logs);


  try {
    const createdLogs = await workoutLogService.createMultipleLogs(userId, logs);
    res.status(201).json(createdLogs);
  } catch (error) {
    console.error("Workout creation error:", error);
res.status(400).json({ error: error.message, stack: error.stack });

  }
};



exports.getLogs= async (req, res)=>{
    const userId = req.user.id;
    const {date} = req.query;
    try{
        const logs = await workoutLogService.getAllLogs(userId, date);
        res.json(logs);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.updateLog = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updated = await workoutLogService.updateWorkoutLog(id, updatedFields);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await workoutLogService.deleteWorkoutLog(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};