const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, profileController.createProfile);
router.get('/', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
router.delete('/', authMiddleware, profileController.deleteProfile);

module.exports = router;
