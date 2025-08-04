// src/api/workoutAPI.js
const API_BASE = `${process.env.REACT_APP_API_URL}/api/workout-plans`;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const fetchWorkoutPlans = async (date) => {
  const res = await fetch(`${API_BASE}?date=${date}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
};

export const createWorkoutPlan = async (planData) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(planData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const updateWorkoutPlan = async (id, updatedData) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteWorkoutPlan = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};
