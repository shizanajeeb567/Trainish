const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
require("dotenv").config();
const axios = require("axios");
const { MealPlan } = require("../models/mealPlan");
const { GroceryList } = require("../models/GroceryList");
const Profile = require("../models/Profile");

// Fixed calorie targets per goal
const goalCalories = {
  "Weight Loss": 1500,
  "Muscle Gain": 2500,
  "Maintain Weight": 2000,
  "Improve Endurance": 2200,
  "General Fitness": 2100,
  "Strength Training": 2400,
};

// Helpers
const getEndDate = (startDate) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() + 7);
  return start.toISOString().split("T")[0];
};

const createMealPlan = async (userId, startDate, cuisines = [], variationHint = "") => {
  const profile = await Profile.findOne({ where: { userId } });
  if (!profile) throw new Error("User profile not found");

  const existing = await MealPlan.findOne({ where: { userId } });
  if (existing) await existing.destroy();

  const endDate = getEndDate(startDate);
  const allergies = profile.foodAllergies?.split(",").map((a) => a.trim()) || [];
  const dailyCalories = goalCalories[profile.goal] || 2000;

  const prompt = `
You are a JSON Meal Plan Generator. Based on the user profile, create a 7-day meal plan.

# User Profile
- Goal: ${profile.goal}
- Daily Calorie Target: ${dailyCalories}
- Allergies: ${allergies.length ? allergies.join(", ") : "None"}
- Cuisines: ${cuisines.length ? cuisines.join(", ") : "Any"}
- Hint: ${variationHint || "None"}

# Instructions
1.  Generate a response containing ONLY a valid JSON array.
2.  Do not add any explanations or markdown formatting around the JSON.
3.  The 'totalCalories' for each day must not exceed the user's target.
4.  Adhere strictly to the following structure:

# JSON Schema
- The root is an array of 7 Day objects.
- Day Object:
  - day: Number
  - meals: Object containing 'breakfast', 'lunch', and 'dinner' keys.
  - totalCalories: Number
- Meal Object (for breakfast, lunch, dinner):
  - recipeName: String
  - calories: Number
  - mealType: String ("breakfast", "lunch", or "dinner")
  - cuisine: String
  - ingredients: String (format: "Name (qty unit) (category), ...")
  - macros: String (format: "Xg carbs, Yg protein, Zg fat")
  - sides: String (optional)
`;

  console.log("🍽️ Prompt length:", prompt.length);

  // Retry logic
  let response;
  let attempts = 0;
  const maxAttempts = 2;

  while (attempts < maxAttempts) {
    try {
      response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      break;
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        console.error("❌ Groq timeout after retry:", error.message);
        throw new Error("Groq API timed out during meal plan generation.");
      }
      console.warn("⏳ Retrying Groq API...");
      await delay(1000);
    }
  }

  const rawText = response.data.choices[0]?.message?.content?.trim();
  console.log(`Raw Groq Output:\n`, rawText);

  let jsonString = rawText;
  const jsonBlockMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    jsonString = jsonBlockMatch[1].trim();
  } else {
    const jsonStart = rawText.indexOf("[");
    const jsonEnd = rawText.lastIndexOf("]");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Groq response doesn't contain valid JSON array.");
    }
    jsonString = rawText.substring(jsonStart, jsonEnd + 1);
  }

  let weekPlan = JSON.parse(jsonString);
  if (typeof weekPlan === "string") {
    weekPlan = JSON.parse(weekPlan);
  }

  return await MealPlan.create({
    userId,
    planDuration: "1 Week",
    startDate,
    endDate,
    planData: [weekPlan],
    cuisines: cuisines.join(','),
  });
};

const extractGroceryList = async (userId, planId) => {
  const plan = await MealPlan.findOne({ where: { id: planId, userId } });
  if (!plan) throw new Error("Meal plan not found");

  const groceryMap = {};

  for (const week of plan.planData) {
    for (const day of week) {
      const meals = day.meals;
      for (const mealType in meals) {
        const meal = meals[mealType];
        const ingredients = meal.ingredients?.split(",") || [];

        for (const ing of ingredients) {
          const match = ing.match(/(.*?)\s*\(([\d/.]+)?\s*(\w+)?\)\s*\((.*?)\)/);
          if (match) {
            const name = match[1].trim().toLowerCase();
            const quantity = parseFloat(match[2]) || 1;
            const unit = match[3] || "";
            const rawCategory = match[4] || "Other";
            const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
            const key = `${name}_${unit}_${category}`;

            if (groceryMap[key]) {
              groceryMap[key].quantity += quantity;
            } else {
              groceryMap[key] = {
                ingredientName: name,
                quantity,
                unit,
                category,
              };
            }
          }
        }
      }
    }
  }

  return Object.values(groceryMap);
};

const getMealPlansByUser = async (userId) => {
  return await MealPlan.findAll({ where: { userId } });
};

const getMealPlanById = async (planId, userId) => {
  const plan = await MealPlan.findOne({ where: { id: planId, userId } });
  if (!plan) throw new Error("Meal plan not found");
  return plan;
};

const deleteMealPlanById = async (planId, userId) => {
  const plan = await MealPlan.findOne({ where: { id: planId, userId } });
  if (!plan) throw new Error("Meal plan not found");
  await plan.destroy();
};

const deleteAllMealPlansForUser = async (userId) => {
  await MealPlan.destroy({ where: { userId } });
};

const regenerateMealPlan = async (planId, userId) => {
  const oldPlan = await getMealPlanById(planId, userId);

  if (oldPlan.regenerationCount >= 2) {
    throw new Error("You can only regenerate a meal plan up to 2 times.");
  }

  await delay(500); // small buffer before Groq call

  const cuisines = oldPlan.cuisines ? oldPlan.cuisines.split(',') : [];
  const variationHint = `regenerate-${Date.now()}`;

  const newPlan = await createMealPlan(userId, oldPlan.startDate, cuisines, variationHint);

  newPlan.regenerationCount = (oldPlan.regenerationCount || 0) + 1;
  await newPlan.save();

  return newPlan;
};

module.exports = {
  createMealPlan,
  extractGroceryList,
  getMealPlansByUser,
  getMealPlanById,
  deleteMealPlanById,
  deleteAllMealPlansForUser,
  regenerateMealPlan,
};
