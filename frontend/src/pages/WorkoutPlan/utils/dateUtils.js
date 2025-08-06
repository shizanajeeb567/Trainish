// WorkoutPlans/utils/dateUtils.js

export const getDateForWeek = (year, month, week) => {
  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  const offsetToMonday = (firstDay === 0 ? -6 : 1 - firstDay);
  const firstMonday = new Date(year, month, 1 + offsetToMonday);

  const targetDate = new Date(firstMonday);
  targetDate.setDate(firstMonday.getDate() + (week - 1) * 7);

  return targetDate.toISOString().split("T")[0];
};

// go through this. it is recommended to use 3rd party library while dealing with data and time
// look into day js and some other libraries 
export const getWeekDateRange = (year, month, week) => {
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  const mondayOffset = (week - 1) * 7 + (1 - firstDayOfWeek);
  const monday = new Date(year, month, firstDay.getDate() + mondayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return `${formatDate(monday)} - ${formatDate(sunday)}`;
};
