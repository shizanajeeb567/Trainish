const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, planController.createPlan);
router.get('/', authMiddleware, planController.getPlans);
router.put('/:id', authMiddleware, planController.updatePlan);
router.delete('/:id', authMiddleware, planController.deletePlan);

module.exports = router;
