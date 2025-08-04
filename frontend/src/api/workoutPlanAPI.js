const API_BASE = "http://localhost:3001/api";

const getHeaders = (json = true) => ({
  ...(json && { "Content-Type": "application/json" }),
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const checkProfileStatus = async () => {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: getHeaders(false),
  });
  if (!res.ok) throw res;
  return res.json();
};

export const fetchWorkoutPlans = async () => {
  const res = await fetch(`${API_BASE}/ai/ai-workout-plan`, {
    headers: getHeaders(false),
  });
  if (!res.ok) throw res;
  return res.json();
};

export const generateWorkoutPlan = async ({ userId, preferences }) => {
  const res = await fetch(`${API_BASE}/ai/ai-workout-plan`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ userId, preferences }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteWorkoutPlan = async (planId) => {
  const res = await fetch(`${API_BASE}/ai/ai-workout-plan/${planId}`, {
    method: "DELETE",
    headers: getHeaders(false),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};
