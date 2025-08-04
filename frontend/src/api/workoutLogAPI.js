
import axios from "axios";

const API_BASE = "/api/workout-logs";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchWorkoutLogs = async (date) => {
  const res = await axios.get(`${API_BASE}?date=${date}`, getAuthHeaders());
  return res.data;
};

export const saveWorkoutLogs = async (logs) => {
  const res = await axios.post(API_BASE, { logs }, getAuthHeaders());
  return res.data;
};

export const updateWorkoutLog = async (id, updatedLog) => {
  const res = await axios.put(`${API_BASE}/${id}`, updatedLog, getAuthHeaders());
  return res.data;
};

export const deleteWorkoutLog = async (id) => {
  await axios.delete(`${API_BASE}/${id}`, getAuthHeaders());
};
