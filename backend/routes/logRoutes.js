const express = require('express');
const router = express.Router();
const workoutLogController = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, workoutLogController.logCreation);
router.get('/', authMiddleware, workoutLogController.getLogs); // Optional ?date=YYYY-MM-DD
router.put('/:id', authMiddleware, workoutLogController.updateLog);
router.delete('/:id', authMiddleware, workoutLogController.deleteLog);

module.exports = router;
