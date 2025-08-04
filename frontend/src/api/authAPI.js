// src/api/authAPI.js
import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_URL}/auth`;

export const signup = async ({ email, password, username }) => {
  const res = await axios.post(`${API_BASE}/signup`, {
    email,
    password,
    username,
  });
  return res.data;
};
export const login = async ({ email, password }) => {
  const res = await axios.post(`${API_BASE}/login`, { email, password });
  return res.data;
};
