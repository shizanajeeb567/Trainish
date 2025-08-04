const { chatWithOpenAI } = require("../services/chatService");
const Chat = require("../models/Chat");

exports.chatWithAI = async (req, res) => {
  const { message } = req.body;
  const userId = req.user?.id || null; // fallback if user not authenticated

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Save user message to DB
    if (userId) {
      await Chat.create({ userId, sender: "user", text: message });
    }

    // Get AI reply
    const reply = await chatWithOpenAI(message);

    // Save AI reply to DB
    if (userId) {
      await Chat.create({ userId, sender: "ai", text: reply });
    }

    res.json({ reply });
  } catch (err) {
    console.error("Chat Controller Error:", err.message);
    res.status(500).json({ error: "AI response failed" });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const messages = await Chat.findAll({
      where: { userId },
      order: [['createdAt', 'ASC']],
    });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

exports.deleteChatHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await Chat.destroy({ where: { userId } });

    res.json({ message: "Chat history deleted successfully" });
  } catch (err) {
    console.error("Delete Chat Error:", err.message);
    res.status(500).json({ error: "Failed to delete chat history" });
  }
};
