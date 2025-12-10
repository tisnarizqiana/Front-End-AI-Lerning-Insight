// Lokasi: src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ComingSoonPage from "./pages/ComingSoonPage";

// Komponen Pelindung (Cek apakah user punya token)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Login (Public) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root (/) ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Halaman yang dilindungi (Butuh Login) & Pakai Sidebar */}
        <Route element={<MainLayout />}>
          {/* Dashboard Utama */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Halaman Menu Lain (Coming Soon) */}
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="My Progress" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/check-in"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="Daily Check-in" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="My Schedule" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentoring"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="Dicoding Mentoring" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="Student Portal" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcement"
            element={
              <ProtectedRoute>
                <ComingSoonPage title="Announcement" />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
