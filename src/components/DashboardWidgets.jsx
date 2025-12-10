// Lokasi: src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/api";
import {
  WeeklyTargetCard,
  InsightCard,
  SubmissionCard,
  RightSidebarWidgets,
} from "../components/DashboardWidgets";
import { AlertCircle } from "lucide-react";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil data dari Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Panggil API GET /dashboard
        const response = await dashboardService.getData();
        console.log("Data Dashboard Diterima:", response); // Debugging
        setData(response);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          "Gagal memuat data. Silakan periksa koneksi internet atau login ulang."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- TAMPILAN LOADING ---
  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );

  // --- TAMPILAN ERROR ---
  if (error)
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-center gap-4 text-red-600 dark:text-red-400">
        <AlertCircle size={24} />
        <div>
          <h3 className="font-bold">Terjadi Kesalahan</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );

  // --- TAMPILAN UTAMA (DATA SUKSES) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      {/* --- KOLOM KIRI (UTAMA) - Mengambil 2 bagian lebar --- */}
      <div className="lg:col-span-2 space-y-6">
        {/* Widget 1: Target Belajar (Data dari API: learning_target) */}
        <WeeklyTargetCard data={data?.learning_target} />

        {/* Widget 2: AI Insight (Data dari API: ai_insight) */}
        <InsightCard data={data?.ai_insight} />

        {/* Widget 3: Hasil Submission (Statis/Mockup sementara karena belum ada API khusus) */}
        <SubmissionCard />
      </div>

      {/* --- KOLOM KANAN (SIDEBAR) - Mengambil 1 bagian lebar --- */}
      <div className="lg:col-span-1">
        {/* Mengirim berbagai potongan data ke widget kanan */}
        <RightSidebarWidgets
          user={data?.user}
          activeCourse={data?.active_course}
          examHistory={data?.exam_history}
          insight={data?.ai_insight}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
