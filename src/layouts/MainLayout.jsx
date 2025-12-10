// Lokasi: src/layouts/MainLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
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
} from "lucide-react";

// --- BAGIAN SIDEBAR ---
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "bg-gray-100 text-gray-900"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`;
  };

  return (
    <>
      {/* Overlay Gelap (Hanya muncul di HP saat menu buka) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed top-0 left-0 z-30 h-screen w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 
      `}
      >
        {/* Logo & Tombol Close Mobile */}
        <div className="p-6 flex justify-between items-center">
          <div className="border rounded-lg p-2 inline-block shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              dicoding
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profil User (Data Mockup sesuai Project Plan) */}
        <div className="px-6 pb-6">
          <div className="border border-blue-200 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
            <img
              src="https://ui-avatars.com/api/?name=Joko+Sulistiyo&background=0D8ABC&color=fff"
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-md"
            />
            <h2 className="font-bold text-lg text-gray-900">Joko Sulistiyo</h2>
            [cite_start]
            {/* ID Tim Capstone Project: A25-CS238 / ID Anggota [cite: 10] */}
            <p className="text-xs text-gray-500 mb-3">R248D5Y0905</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
              Ahead of Schedule
            </span>
            <div className="mt-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    University
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    University of Lampung
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Major
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    Electrical Engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Mentor
                  </p>
                  [cite_start]{/* Mentor sesuai List Anggota [cite: 8] */}
                  <p className="text-xs font-medium text-gray-700">
                    Majid Solihin Hadi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="px-4 flex-1 pb-10">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Learning
          </p>
          <nav className="space-y-1 mb-6">
            <Link to="/progress" className={getLinkClass("/progress")}>
              <LayoutDashboard size={18} />
              My Progress
            </Link>
            <Link to="/check-in" className={getLinkClass("/check-in")}>
              <CheckSquare size={18} />
              Daily Check-in
            </Link>
            <Link to="/schedule" className={getLinkClass("/schedule")}>
              <Calendar size={18} />
              My Schedule
            </Link>
            <Link to="/dashboard" className={getLinkClass("/dashboard")}>
              <Lightbulb size={18} />
              Learning Insight
            </Link>
            <Link to="/mentoring" className={getLinkClass("/mentoring")}>
              <Users size={18} />
              Dicoding Mentoring ↗
            </Link>
          </nav>

          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Document
          </p>
          <nav className="space-y-1">
            <Link to="/portal" className={getLinkClass("/portal")}>
              <BookOpen size={18} />
              Student Portal
            </Link>
            <Link to="/announcement" className={getLinkClass("/announcement")}>
              <FileText size={18} />
              Announcement
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

// --- LAYOUT UTAMA ---
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* UPDATE PENTING: mx-auto dihapus agar konten nempel kiri */}
      <main className="flex-1 transition-all duration-300 ml-0 md:ml-72 p-4 md:p-8 h-screen overflow-y-auto">
        <div className="max-w-7xl">
          {/* Header Global */}
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-600 md:hidden hover:bg-gray-50"
              >
                <Menu size={24} />
              </button>

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  AI Learning Insight
                </h1>
                <p className="hidden md:block text-gray-500 text-sm mt-1">
                  Track your learning goals, get AI-powered insights
                </p>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Joko+Sulistiyo&background=0D8ABC&color=fff"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                Joko Sulistiyo
              </span>
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
