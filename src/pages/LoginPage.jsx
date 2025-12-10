// Lokasi: src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api"; // Panggil kurir API kita
import { LogIn, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setError("");
    setIsLoading(true);

    try {
      // 1. Panggil API Login
      // Sesuai PDF: Email: igihcksn@gmail.com, Pass: password123
      await authService.login(email, password);

      // 2. Jika sukses, Token otomatis tersimpan di localStorage (cek api.js)

      // 3. Arahkan ke Dashboard
      navigate("/dashboard");
    } catch (err) {
      // Handle Error (misal password salah)
      setError(
        err.response?.data?.message || "Gagal login. Periksa email/password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Header Login */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
              dicoding
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Selamat Datang Kembali
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Masuk untuk melihat progres belajarmu
          </p>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh: igihcksn@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              "Memproses..."
            ) : (
              <>
                <LogIn size={18} /> Masuk Sekarang
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Akun Demo:{" "}
          <span className="font-mono text-gray-700">igihcksn@gmail.com</span> /{" "}
          <span className="font-mono text-gray-700">password123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
