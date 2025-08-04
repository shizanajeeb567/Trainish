const {
  createMealPlan,
  getMealPlansByUser,
  getMealPlanById,
  updateMealInPlan,
  deleteMealPlanById,
  deleteAllMealPlansForUser,
  regenerateMealPlan,
  extractGroceryList
} = require('../services/mealPlanService');

// POST /api/meal-plans
const createPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, cuisines = [] } = req.body;

    if (!startDate) {
      return res.status(400).json({ error: 'startDate is required' });
    }

    const plan = await createMealPlan(userId, startDate, cuisines); // weeks param removed
    res.status(201).json(plan);
  } catch (err) {
    console.error('Error creating meal plan:', err.message);

    if (err.message.includes('already have a meal plan')) {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: err.message });
  }
};

// GET /api/meal-plans
const getAllPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    const plans = await getMealPlansByUser(userId);
    res.json(plans);
  } catch (err) {
    console.error('Error fetching meal plans:', err.message);
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
};

// GET /api/meal-plans/:planId
const getPlanById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const plan = await getMealPlanById(planId, userId);
    res.json(plan);
  } catch (err) {
    console.error('Error fetching meal plan:', err.message);
    res.status(404).json({ error: err.message });
  }
};

// DELETE /api/meal-plans/:planId
const deletePlanById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    await deleteMealPlanById(planId, userId);
    res.json({ message: "Meal plan deleted successfully." });
  } catch (err) {
    console.error('Error deleting meal plan:', err.message);
    res.status(404).json({ error: err.message });
  }
};

// DELETE /api/meal-plans
const deleteAllPlans = async (req, res) => {
  try {
    const userId = req.user.id;
    await deleteAllMealPlansForUser(userId);
    res.json({ message: "All meal plans deleted successfully." });
  } catch (err) {
    console.error('Error deleting all meal plans:', err.message);
    res.status(500).json({ error: "Failed to delete all meal plans" });
  }
};

// PATCH /api/meal-plans/:planId/regenerate
const regeneratePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const updatedPlan = await regenerateMealPlan(planId, userId);
    res.json(updatedPlan);
  } catch (err) {
    console.error('Error regenerating meal plan:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/meal-plans/:planId/grocery-list
const getGroceryList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;
    const list = await extractGroceryList(userId, planId);
    res.json(list);
  } catch (err) {
    console.error("Error generating grocery list:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPlan,
  getAllPlans,
  getPlanById,
  deletePlanById,
  deleteAllPlans,
  regeneratePlan,
  getGroceryList,
};
