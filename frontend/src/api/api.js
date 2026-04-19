

import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000"
});

// Product prediction
export const predictUser = (data) => API.post("/predict", data);

// Secure admin login
export const adminLogin = (data) => API.post("/admin/login", data);

// Protected stats API
export const getStats = (token) =>
  API.get("/stats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

// CSV export helper (optional)
export const exportCSV = () =>
  API.get("/export", {
    responseType: "blob"
  });


export const trackEvent = (eventData) =>
  axios.post("http://127.0.0.1:5000/api/track", eventData, {
    headers: {
      "Content-Type": "application/json"
    }
  });