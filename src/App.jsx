// Lokasi: src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage"; // Import halaman Login

// Komponen Pelindung (Protected Route)
// Kalau tidak ada token, tendang ke login
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

        {/* Halaman Protected (Butuh Login) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Nanti halaman lain juga dibungkus ProtectedRoute */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
