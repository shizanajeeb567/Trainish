const planService = require('../services/planService');

exports.createPlan = async (req, res) => {
  const userId = req.user.id;
  const planData = req.body;

  try {
    const newPlan = await planService.createPlan(userId, planData);
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPlans = async (req, res) => {
  const userId = req.user.id;
  const { date, dayOfWeek } = req.query;

  try {
    const plans = await planService.getPlans(userId, { date, dayOfWeek }); // ✅ use date filter
    res.json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updatePlan = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updated = await planService.updatePlan(id, updatedFields);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await planService.deletePlan(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
