// src/api/chatAPI.js

const API_BASE = "http://localhost:3001/api/chat";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchChatHistory = async () => {
  const res = await fetch(`${API_BASE}/history`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch chat history");
  return res.json();
};

export const sendChatMessage = async (message) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw await res.json();
  return res.json(); // expects { reply }
};

// Add to src/api/chatAPI.js

export const clearChatHistory = async () => {
  const res = await fetch(`${API_BASE}/history`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete chat history");
  return res.json();
};
