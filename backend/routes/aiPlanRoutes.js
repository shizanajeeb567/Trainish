const express = require("express");
const router = express.Router();
const { generatePlan, getPlans, deletePlan } = require("../controllers/aiPlanController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/ai-workout-plan", authMiddleware, generatePlan);
router.get("/ai-workout-plan", authMiddleware, getPlans);
router.delete("/ai-workout-plan/:id", authMiddleware, deletePlan);

module.exports = router;
