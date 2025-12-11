// Lokasi: src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from "react"; // Tambah useEffect
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import logo from "../assets/logo.png";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  // --- REVISI PENGAMBILAN TOKEN (DARI HASH #) ---
  useEffect(() => {
    // URL Contoh: .../reset-password#access_token=eyJhb...&refresh_token=...
    const hash = window.location.hash.substring(1); // Ambil setelah #
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!token) {
      setError(
        "Token invalid atau URL salah. Silakan request ulang link reset."
      );
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      // Panggil API Update Password dengan Token di Header
      await authService.updateNewPassword(token, password);
      setIsSuccess(true);
    } catch (err) {
      const apiError = err.response?.data?.message || err.message;
      setError(apiError || "Gagal mereset password. Token mungkin kadaluarsa.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans relative">
      {/* Background & Container sama seperti Login ... */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-slate-100 transition-all duration-300">
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Dicoding Logo"
            className="h-10 mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Atur Kata Sandi Baru
          </h2>
          {!isSuccess && (
            <p className="text-slate-500 text-sm mt-2">
              Silakan buat kata sandi baru untuk akun Anda.
            </p>
          )}
        </div>

        {isSuccess ? (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Berhasil Diubah!
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Kata sandi Anda telah diperbarui. Silakan login kembali.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Masuk ke Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {!token && (
              <div className="p-4 bg-yellow-50 text-yellow-700 text-sm rounded-xl border border-yellow-100 mb-4">
                Token tidak ditemukan di URL. Pastikan Anda menyalin link
                lengkap dari email.
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-3 border border-red-100">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Kata Sandi Baru
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
