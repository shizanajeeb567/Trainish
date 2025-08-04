// src/api/mealPlanAPI.js

const API_BASE = `${process.env.REACT_APP_API_URL}/api`;

const getHeaders = (json = true) => ({
  ...(json && { "Content-Type": "application/json" }),
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const checkProfileStatus = async () => {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchMealPlans = async () => {
  const res = await fetch(`${API_BASE}/meal-plans`, {
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createMealPlan = async ({ startDate, weeks, cuisines }) => {
  const res = await fetch(`${API_BASE}/meal-plans`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ startDate, cuisines }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const regenerateMealPlan = async (planId) => {
  const res = await fetch(`${API_BASE}/meal-plans/${planId}/regenerate`, {
    method: "POST",
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteMealPlan = async (planId) => {
  const res = await fetch(`${API_BASE}/meal-plans/${planId}`, {
    method: "DELETE",
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return true;
};

export const updateMeal = async (planId, updatedMeal) => {
  const res = await fetch(`${API_BASE}/meal-plans/${planId}/update-meal`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(updatedMeal),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const generateGroceryList = async (planId) => {
  const res = await fetch(`${API_BASE}/meal-plans/${planId}/grocery-list`, {
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};