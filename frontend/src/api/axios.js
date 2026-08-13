import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT token to every request automatically if user is logged in
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("shopeasy_user");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
