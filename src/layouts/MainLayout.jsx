// Lokasi: src/layouts/MainLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { dashboardService, authService } from "../services/api"; // Import dashboardService
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Lightbulb,
  Users,
  BookOpen,
  FileText,
  Building2,
  GraduationCap,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  AlertTriangle,
  Moon,
  Sun,
} from "lucide-react";

import logoLight from "../assets/logo.png";
import logoDark from "../assets/logo-putih.png";

// --- SIDEBAR DINAMIS ---
const Sidebar = ({ isOpen, toggleSidebar, isDarkMode, user }) => {
  // Terima props 'user'
  const location = useLocation();

  // Gunakan data user asli jika ada, jika tidak pakai default (loading state)
  const displayName = user?.name || "Memuat...";
  const displayId = user?.student_id || "ID-.....";
  const avatarBgColor = isDarkMode ? "1E3A8A" : "0ea5e9";
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName
  )}&background=${avatarBgColor}&color=fff&size=128`;

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`
        fixed top-0 left-0 z-30 h-screen w-72 flex flex-col transition-transform duration-300 ease-in-out
        bg-white border-r border-gray-100 
        dark:bg-gray-800 dark:border-gray-700
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
      `}
      >
        {/* Header Logo */}
        <div className="shrink-0 z-20 relative h-20 flex items-center justify-center bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <img
            src={isDarkMode ? logoDark : logoLight}
            alt="Dicoding Logo"
            className="h-8 w-auto object-contain transition-opacity duration-300"
          />
          <button
            onClick={toggleSidebar}
            className="absolute right-4 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide bg-white dark:bg-gray-800">
          {/* PROFIL USER DINAMIS */}
          <div className="px-6 py-6">
            <div
              className="
                  bg-white dark:bg-gray-800 
                  rounded-2xl p-6 pb-8 text-center 
                  relative overflow-hidden 
                  shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none
                  border border-gray-100 dark:border-gray-700
                  transition-colors
              "
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500 dark:bg-blue-600"></div>

              <div className="mt-2 mb-3">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white dark:border-gray-700 shadow-sm"
                />
              </div>

              <h2 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                {displayName}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 font-mono">
                {displayId}
              </p>

              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 text-[11px] font-bold rounded-full">
                Ahead of Schedule
              </span>

              <hr className="my-6 border-gray-100 dark:border-gray-700" />

              <div className="text-left space-y-4">
                <div className="flex items-start gap-3 group">
                  <Building2 className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wide uppercase">
                      University
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                      {user?.university || "Belum diatur"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <GraduationCap className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wide uppercase">
                      Major
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                      {user?.major || "Belum diatur"}
                    </p>
                  </div>
                </div>

                {/* Jika backend belum ada data Lecturer/Mentor, kita pakai fallback */}
                <div className="flex items-start gap-3 group">
                  <Users className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wide uppercase">
                      Lecturer
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                      Dr. Iwan Satriawan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group">
                  <User className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mt-0.5" />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold tracking-wide uppercase">
                      Mentor
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                      Majid Solihin Hadi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Navigasi */}
          <div className="px-4 flex-1 pb-10">
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 dark:text-gray-500">
              Learning
            </p>
            <nav className="space-y-1 mb-8">
              <Link to="/progress" className={getLinkClass("/progress")}>
                <LayoutDashboard size={19} />
                My Progress
              </Link>
              <Link to="/check-in" className={getLinkClass("/check-in")}>
                <CheckSquare size={19} />
                Daily Check-in
              </Link>
              <Link to="/schedule" className={getLinkClass("/schedule")}>
                <Calendar size={19} />
                My Schedule
              </Link>
              <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                <Lightbulb size={19} />
                Learning Insight
              </Link>
              <Link to="/mentoring" className={getLinkClass("/mentoring")}>
                <Users size={19} />
                Dicoding Mentoring ↗
              </Link>
            </nav>
            <p className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 dark:text-gray-500">
              Document
            </p>
            <nav className="space-y-1">
              <Link to="/portal" className={getLinkClass("/portal")}>
                <BookOpen size={19} />
                Student Portal
              </Link>
              <Link
                to="/announcement"
                className={getLinkClass("/announcement")}
              >
                <FileText size={19} />
                Announcement
              </Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

// --- LAYOUT UTAMA ---
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State untuk menyimpan data user dari API

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const navigate = useNavigate();

  // Effect 1: Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Effect 2: Fetch User Data (Agar Sidebar Dinamis)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await dashboardService.getData();
        if (data && data.user) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Avatar Dinamis untuk Header Kanan
  const headerAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userData?.name || "User"
  )}&background=${isDarkMode ? "1E3A8A" : "0D8ABC"}&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar menerima props user */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isDarkMode={isDarkMode}
        user={userData}
      />

      <div className="flex-1 flex flex-col h-screen ml-0 md:ml-72 transition-all duration-300">
        {/* HEADER UTAMA */}
        <header
          className="
            sticky top-0 z-20 h-20 
            flex items-center 
            bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm 
            border-b border-gray-200 dark:border-gray-700 
            px-4 md:px-8
        "
        >
          <div className="w-full max-w-7xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 md:hidden"
                >
                  <Menu size={24} />
                </button>

                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    AI Learning Insight
                  </h1>
                  <p className="hidden md:block text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Track your learning goals, get AI-powered insights
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* User Dropdown Header */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-white dark:bg-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <img
                      src={headerAvatarUrl}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                      {userData?.name || "Loading..."}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-fade-in w-64 md:w-full overflow-hidden">
                      <div className="flex flex-col items-center justify-center p-5 border-b border-gray-100 dark:border-gray-700 md:hidden bg-gradient-to-b from-blue-50/50 dark:from-gray-700 to-white dark:to-gray-800">
                        <img
                          src={headerAvatarUrl}
                          alt="Profile"
                          className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-600 shadow-md mb-3"
                        />
                        <h4 className="font-bold text-gray-900 dark:text-white text-base">
                          {userData?.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-mono bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded">
                          {userData?.student_id}
                        </p>
                      </div>

                      <div className="p-1">
                        <button
                          onClick={handleLogoutClick}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors justify-center"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-2">
          <div className="max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
              <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Konfirmasi Keluar
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Apakah Anda yakin ingin mengakhiri sesi ini?
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 dark:shadow-none"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
