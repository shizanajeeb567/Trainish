// routes/mealPlanRoutes.js

const express = require('express');
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  getPlanById,
  deletePlanById,
  deleteAllPlans,
  regeneratePlan,
  getGroceryList
} = require('../controllers/mealPlanController');

const authenticate = require('../middleware/authMiddleware');
router.use(authenticate);

router.post('/', createPlan);                                // Create new plan
router.get('/', getAllPlans);                                // Get all plans for user
router.get('/:planId', getPlanById);                         // Get specific plan
router.post('/:planId/regenerate', regeneratePlan);          // Regenerate plan
router.get('/:planId/grocery-list', getGroceryList);         // Generate grocery list
router.delete('/:planId', deletePlanById);                   // Delete one plan
router.delete('/', deleteAllPlans);                          // Delete all plans

module.exports = router;