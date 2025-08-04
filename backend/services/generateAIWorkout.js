require("dotenv").config();
const axios = require("axios");

const generateAIWorkout = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Generation failed:", err.response?.data || err.message);
    throw new Error("Workout generation failed");
  }
};

module.exports = generateAIWorkout;
