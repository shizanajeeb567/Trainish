// MealGeneration/utils.js

export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getWeekDateRange = (startDateStr, weekIndex) => {
  const start = new Date(startDateStr);
  start.setDate(start.getDate() + weekIndex * 7);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const format = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return `${format(start)} - ${format(end)}`;
};
