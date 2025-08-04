require("dotenv").config();
const axios = require("axios");

const chatWithOpenAI = async (message) => {
  const systemPrompt = `
You are TrainishBoT, a direct and concise expert in fitness and nutrition.

Rules:
- Reply in a to-the-point manner.
- Avoid fluff or long explanations.
- Prefer bullet points or short paragraphs.
- Never exceed 5 lines.
- Only answer questions about fitness, meals, or greetings.
- If off-topic, respond: "Sorry, I can only help with fitness, meals, or greetings."
`;


  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    throw new Error("AI response failed");
  }
};

module.exports = { chatWithOpenAI };
