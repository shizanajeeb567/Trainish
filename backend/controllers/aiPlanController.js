const Profile = require("../models/Profile");
const WorkoutPlan = require("../models/WorkoutPlan");
const generateAIWorkout = require("../services/generateAIWorkout");

// Improved validator: checks days in EACH week
const validatePlan = (planText, expectedWeeks, expectedDays) => {
  const weekSections = planText.split(/Week\s+\d+:/gi).slice(1); // ignore first blank split
  if (weekSections.length !== Number(expectedWeeks)) return false;

  for (const weekText of weekSections) {
    const dayCount = (weekText.match(/Day\s+\d+:/gi) || []).length;
    if (dayCount !== Number(expectedDays)) return false;
  }

  return true;
};

const generatePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;
    const { days, duration, level, weeks } = preferences;

    console.log("🧠 Generating plan for user:", userId, preferences);

    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    const dob = new Date(profile.dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();

    const prompt = `
You are a certified AI personal trainer. Create a detailed ${weeks}-week workout plan for a client with:

- Age: ${age}
- Gender: ${profile.gender}
- Height: ${profile.height}
- Weight: ${profile.weight}
- Goal: ${profile.goal}
- Fitness Level: ${level}
- Workout Duration: ${duration} minutes
- Days per Week: ${days}

⚠️ STRICT FORMAT RULES ⚠️
1. You MUST generate exactly ${weeks} weeks.
2. Each week MUST contain exactly ${days} days. No more. No less.
3. No markdown, no lists, no extra notes or summaries.
4. Stick to this format **EXACTLY**:

Week 1:
Day 1: [Muscle Group]
- Exercise 1
- Exercise 2

Day 2: [Muscle Group]
- Exercise 1
- Exercise 2

...

Week ${weeks}:
Day 1: ...
Day ${days}: ...

You must return only the workout plan. No intros, no summaries, no tips.
This is a hard constraint. Disobeying means failure of the task.
`;

    // Retry if structure fails
    let retries = 0;
    let planText;
    let isValid = false;

    while (retries < 3 && !isValid) {
      planText = await generateAIWorkout(prompt);
      isValid = validatePlan(planText, weeks, days);
      retries++;
    }

    if (!isValid) {
      console.error(" Plan failed structure validation after retries");
      return res.status(400).json({ error: "Generated plan failed structural validation after retries." });
    }

    const saved = await WorkoutPlan.create({
      userId,
      goal: profile.goal,
      planText,
      daysPerWeek: Number(days),
      duration: Number(duration),
      level,
      weeks: Number(weeks),
    });

    return res.json({ success: true, plan: saved.planText });
  } catch (error) {
    console.error("generatePlan error:", error);
    return res.status(500).json({ error: "Failed to generate workout plan" });
  }
};

const getPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    const plans = await WorkoutPlan.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(plans);
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    res.status(500).json({ error: "Failed to fetch workout plans" });
  }
};

const deletePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const planId = req.params.id;

    const plan = await WorkoutPlan.findOne({ where: { id: planId, userId } });
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    await plan.destroy();
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error("Error deleting workout plan:", err);
    res.status(500).json({ error: "Failed to delete workout plan" });
  }
};

module.exports = {
  generatePlan,
  getPlans,
  deletePlan,
};
