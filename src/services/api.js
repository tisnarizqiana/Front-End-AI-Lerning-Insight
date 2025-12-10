// Lokasi: src/services/api.js
import axios from "axios";

// URL Backend
const BASE_URL = "https://asah-dicoding-backend.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Otomatis sisipkan Token
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
  login: async (email, password) => {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

export const dashboardService = {
  // Ambil Data Dashboard
  getData: async () => {
    const response = await api.get("/dashboard");
    return response.data;
  },

  // Update Target (POST /target)
  updateTarget: async (value) => {
    const response = await api.post("/target", {
      target_type: "study_duration",
      target_value: parseInt(value),
    });
    return response.data;
  },

  // Update Insight / Predict (POST /predict) <-- INI YANG DIUBAH
  postInsight: async (insightData) => {
    // Sebelumnya '/insight', sekarang jadi '/predict'
    const response = await api.post("/predict", insightData);
    return response.data;
  },
};

export default api;
