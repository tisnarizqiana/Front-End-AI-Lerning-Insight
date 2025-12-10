// Lokasi: src/services/api.js
import axios from "axios";

const BASE_URL = "https://asah-dicoding-backend.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Register (Baru)
  register: async (name, email, password) => {
    const response = await api.post("/register", { name, email, password });
    return response.data;
  },

  // Lupa Password (Baru)
  forgotPassword: async (email) => {
    // Mengirim request reset password ke email
    const response = await api.post("/forgot-password", { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export const dashboardService = {
  getData: async () => {
    const response = await api.get("/dashboard");
    return response.data;
  },
  updateTarget: async (value) => {
    const response = await api.post("/target", {
      target_type: "study_duration",
      target_value: parseInt(value),
    });
    return response.data;
  },
  postInsight: async (insightData) => {
    const response = await api.post("/predict", insightData);
    return response.data;
  },
};

export default api;
