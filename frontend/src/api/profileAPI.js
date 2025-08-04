// src/api/profileAPI.js
const API_BASE = `${process.env.REACT_APP_API_URL}/api/profile`;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getProfile = async () => {
  const res = await fetch(API_BASE, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw res;
  return res.json();
};

export const saveProfile = async (data, hasProfile) => {
  const res = await fetch(API_BASE, {
    method: hasProfile ? "PUT" : "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw res;
  return res.json();
};
