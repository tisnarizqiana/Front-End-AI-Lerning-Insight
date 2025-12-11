// Lokasi: src/services/api.js
import axios from "axios";

const BASE_URL = "https://asah-dicoding-backend.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor Login (Tetap sama)
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

  // REVISI REGISTER: Hanya kirim email & password (sesuai dokumen)
  register: async (email, password) => {
    const response = await api.post("/register", { email, password });
    return response.data;
  },

  // Lupa Password (Request Link)
  forgotPassword: async (email) => {
    const response = await api.post("/forgot-password", { email });
    return response.data;
  },

  // REVISI RESET PASSWORD (Update Password)
  // Token harus dikirim via Header Authorization, bukan Body
  updateNewPassword: async (token, newPassword) => {
    const response = await axios.post(
      `${BASE_URL}/update-password`,
      { new_password: newPassword }, // Body sesuai dokumen
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token wajib di sini
        },
      }
    );
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
  // ... (sisa dashboardService sama)
  updateTarget: async (value) => {
    const response = await api.post("/target", {
      target_type: "study_duration",
      target_value: parseInt(value),
    });
    return response.data;
  },
  postInsight: async (insightData) => {
    const response = await api.post("/insight", insightData); // URL balik ke /insight sesuai dokumen poin 4
    return response.data;
  },
};

export default api;
