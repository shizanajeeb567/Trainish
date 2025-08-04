// src/api/groceryAPI.js

const API_BASE = `${process.env.REACT_APP_API_URL}/api`;

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getLatestMealPlan = async () => {
  const res = await fetch(`${API_BASE}/meal-plans`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch meal plans");
  return res.json();
};

export const getGroceryList = async (mealPlanId) => {
  const res = await fetch(`${API_BASE}/meal-plans/${mealPlanId}/grocery-list`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};
