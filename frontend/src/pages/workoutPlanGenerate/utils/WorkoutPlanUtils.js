// pages/workoutplanGenerate/utils/workoutPlanUtils.js

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatPlanText = (plan) =>
  `${plan.focusArea} • ${plan.daysPerWeek} days/week • ${plan.durationWeeks} weeks`;
