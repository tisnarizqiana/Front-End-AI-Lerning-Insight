// Lokasi: src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/api";
// IMPORT DARI FILE WIDGETS
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await dashboardService.getData();
        setData(response);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Gagal memuat data terbaru.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      {/* KOLOM KIRI */}
      <div className="lg:col-span-2 space-y-6">
        <WeeklyTargetCard data={data?.learning_target} loading={loading} />
        <InsightCard data={data?.ai_insight} loading={loading} />
        <SubmissionCard />
      </div>

      {/* KOLOM KANAN */}
      <div className="lg:col-span-1">
        <RightSidebarWidgets
          user={data?.user}
          activeCourse={data?.active_course}
          examHistory={data?.exam_history}
          insight={data?.ai_insight}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
