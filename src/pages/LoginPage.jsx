// Lokasi: src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import {
  LogIn,
  UserPlus,
  AlertCircle,
  Lock,
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  ArrowLeft,
  Send,
} from "lucide-react";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [viewMode, setViewMode] = useState("login");
  // HAPUS STATE NAME KARENA TIDAK DIPAKAI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const switchMode = (mode) => {
    setViewMode(mode);
    setError("");
    setSuccessMsg("");
    if (mode === "login") setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      if (viewMode === "login") {
        await authService.login(email, password);
        navigate("/dashboard");
      } else if (viewMode === "register") {
        // REVISI: Register tanpa Nama, hanya Email & Password
        await authService.register(email, password);
        setSuccessMsg(
          "Aktivasi Berhasil! Silakan login dengan password baru Anda."
        );
        setViewMode("login");
        setPassword("");
      } else if (viewMode === "forgot") {
        await authService.forgotPassword(email);
        setSuccessMsg("Cek email Anda! Link reset password telah dikirim.");
      }
    } catch (err) {
      const apiError = err.response?.data?.message || err.message;
      setError(apiError || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans relative">
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
            {viewMode === "register"
              ? "Aktivasi Akun" // Ganti Text jadi Aktivasi
              : viewMode === "forgot"
              ? "Lupa Kata Sandi?"
              : "Selamat Datang"}
          </h2>

          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            {viewMode === "register"
              ? "Masukkan email terdaftar dan buat password baru."
              : viewMode === "forgot"
              ? "Masukkan email Anda untuk reset password."
              : "Masuk untuk mengakses dashboard pembelajaran."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-3 border border-red-100 animate-fade-in">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-sm rounded-xl flex items-start gap-3 border border-emerald-100 animate-fade-in">
            <CheckCircleIcon />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* INPUT NAMA DIHAPUS (Sesuai Dokumen) */}

          {/* INPUT EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
              Alamat Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* INPUT PASSWORD */}
          {viewMode !== "forgot" && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-sm font-semibold text-slate-700">
                  {viewMode === "register"
                    ? "Buat Password Baru"
                    : "Kata Sandi"}
                </label>
                {viewMode === "login" && (
                  <button
                    type="button"
                    onClick={() => switchMode("forgot")}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Lupa kata sandi?
                  </button>
                )}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    viewMode === "register"
                      ? "Password baru Anda"
                      : "Masukkan kata sandi"
                  }
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
          )}

          {/* TOMBOL */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform active:scale-[0.98] ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                "Memproses..."
              ) : (
                <>
                  {viewMode === "register" ? (
                    <UserPlus size={18} />
                  ) : viewMode === "forgot" ? (
                    <Send size={18} />
                  ) : (
                    <LogIn size={18} />
                  )}

                  {viewMode === "register"
                    ? "Aktivasi Akun"
                    : viewMode === "forgot"
                    ? "Kirim Link Reset"
                    : "Masuk ke Dashboard"}
                </>
              )}
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center border-t border-slate-100 pt-6">
          {viewMode === "login" ? (
            <div className="flex items-center justify-center gap-1.5 text-sm text-slate-600">
              <span>Belum aktivasi akun?</span>
              <button
                onClick={() => switchMode("register")}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Aktivasi sekarang
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => switchMode("login")}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft size={16} /> Kembali ke Halaman Login
              </button>
            </div>
          )}

          <p className="text-xs text-slate-400 mt-6">
            &copy; 2025 Asah Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 mt-0.5"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default LoginPage;
