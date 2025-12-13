// Lokasi: src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/api";
import {
  WeeklyTargetCard,
  InsightCard,
  SubmissionCard,
  RightSidebarWidgets,
} from "../components/DashboardWidgets";
import { AlertCircle, X, CheckCircle, Save } from "lucide-react";

// --- PILIHAN BARU: POPUP SUKSES (TENGAH LAYAR) ---
const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100 animate-in zoom-in-95 border border-gray-100 dark:border-gray-700">
        {/* Ikon Animasi Sederhana */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle size={40} strokeWidth={3} />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Berhasil!
        </h3>
        <p className="text-gray-500 dark:text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/30 active:scale-95"
        >
          Oke, Mantap!
        </button>
      </div>
    </div>
  );
};

// --- MODAL INPUT TARGET (Tetap Sama) ---
const TargetModal = ({ isOpen, onClose, onSave, currentTarget }) => {
  const [minutes, setMinutes] = useState(60);

  useEffect(() => {
    if (isOpen) {
      setMinutes(currentTarget ? parseInt(currentTarget) : 60);
    }
  }, [isOpen, currentTarget]);

  if (!isOpen) return null;

  const hours = (minutes / 60).toFixed(1).replace(".0", "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative transform scale-100 transition-all border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Atur Target Mingguan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Durasi Belajar (Menit)
          </label>
          <div className="relative">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pl-4 pr-16 text-gray-900 dark:text-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-bold shadow-sm transition-all"
              placeholder="60"
            />
            <span className="absolute right-4 top-3.5 text-gray-400 font-medium text-sm">
              Menit
            </span>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[30, 60, 90, 120].map((val) => (
              <button
                key={val}
                onClick={() => setMinutes(val)}
                className={`
                      px-4 py-1.5 text-xs font-bold rounded-full transition-all border
                      ${
                        minutes === val
                          ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }
                    `}
              >
                {val}m
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <AlertCircle size={16} className="text-blue-600 shrink-0" />
            <span>
              Target ini setara dengan{" "}
              <span className="font-bold text-blue-700 dark:text-blue-400">
                {hours} Jam
              </span>{" "}
              per minggu.
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(minutes)}
            className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <Save size={18} /> Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---
const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // STATE UNTUK SUCCESS POPUP
  const [successPopup, setSuccessPopup] = useState({
    show: false,
    message: "",
  });

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveTarget = async (minutes) => {
    try {
      setIsModalOpen(false);
      await dashboardService.updateTarget(minutes);
      await fetchData();

      // TAMPILKAN POPUP TENGAH
      setSuccessPopup({
        show: true,
        message: `Target berhasil diperbarui menjadi ${minutes} menit per minggu.`,
      });
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan target.");
    }
  };

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
    <div className="relative">
      {/* Success Popup Render */}
      {successPopup.show && (
        <SuccessPopup
          message={successPopup.message}
          onClose={() => setSuccessPopup({ ...successPopup, show: false })}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        {/* KOLOM KIRI */}
        <div className="xl:col-span-2 space-y-6">
          <WeeklyTargetCard
            data={data?.learning_target}
            loading={loading}
            onEditClick={() => setIsModalOpen(true)}
          />
          <InsightCard data={data?.ai_insight} loading={loading} />
          <SubmissionCard data={data?.last_submission} />
        </div>

        {/* KOLOM KANAN */}
        <div className="xl:col-span-1">
          <RightSidebarWidgets
            user={data?.user}
            activeCourse={data?.active_course}
            examHistory={data?.exam_history}
            recommendation={data?.recommendation}
            learnerProfile={data?.learner_profile}
            loading={loading}
          />
        </div>

        {/* Modal Target */}
        <TargetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTarget}
          currentTarget={data?.learning_target?.max || 60}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
