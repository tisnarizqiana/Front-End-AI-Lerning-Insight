// Lokasi: src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage"; // <-- Import Wajib
import ComingSoonPage from "./pages/ComingSoonPage";

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
        {/* Halaman Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman Reset Password (Public, akses via link email) */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Halaman Protected (Butuh Login) */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

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
