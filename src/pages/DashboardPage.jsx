// Lokasi: src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/api";
import {
  WeeklyTargetCard,
  InsightCard,
  SubmissionCard,
  RightSidebarWidgets,
} from "../components/DashboardWidgets";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data murni dari API saat halaman dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dashboardService.getData();
        console.log("Data Dashboard:", response);
        setData(response);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Jika error 404/401, kemungkinan token expired atau data kosong
        setError("Gagal memuat data. Pastikan Token valid atau Server aktif.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* --- KOLOM KIRI (UTAMA) --- */}
      <div className="lg:col-span-2 space-y-6">
        <WeeklyTargetCard data={data?.learning_target} />
        <InsightCard data={data?.ai_insight} />
        <SubmissionCard />
      </div>

      {/* --- KOLOM KANAN (SIDEBAR) --- */}
      <div className="lg:col-span-1">
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
