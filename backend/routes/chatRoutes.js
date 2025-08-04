const express = require('express');
const router = express.Router();
const { chatWithAI, getChatHistory, deleteChatHistory } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/chat', authMiddleware, chatWithAI);
router.get('/chat/history', authMiddleware, getChatHistory);
router.delete('/chat/history', authMiddleware, deleteChatHistory); 

module.exports = router;
