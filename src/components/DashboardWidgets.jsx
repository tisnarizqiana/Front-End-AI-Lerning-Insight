// Lokasi: src/components/DashboardWidgets.jsx
import React, { useState, useEffect } from "react";
import { dashboardService } from "../services/api";
import {
  CheckCircle,
  TrendingUp,
  BookOpen,
  AlertCircle,
  FileText,
  Star,
  Sparkles,
  Bot,
  Pencil,
  X,
  CheckSquare,
  GraduationCap,
  Users,
  User,
} from "lucide-react";

// --- HELPER: SKELETON ---
const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <div
    className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
  ></div>
);

// --- WIDGET 1: TARGET MINGGUAN (Updated: Ada Tombol Edit) ---
export const WeeklyTargetCard = ({ data, loading, onEditClick }) => {
  const current = data?.current || 0;
  const max = data?.max || 60;
  // Menghindari progress bar lebih dari 100%
  const progressPercent = Math.min((current / max) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 mb-6 transition-colors duration-300 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
          <CheckCircle size={20} />
          <h3>Target Mingguan</h3>
        </div>

        {/* Tombol Ubah Target */}
        {!loading && (
          <button
            onClick={onEditClick}
            className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5 rounded-full font-bold transition duration-200"
          >
            <Pencil size={12} />
            <span>Ubah Target</span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex justify-between">
            <SkeletonText width="w-24" />
            <SkeletonText width="w-16" />
          </div>
          <SkeletonText height="h-3" />
          <SkeletonText height="h-10" />
        </div>
      ) : (
        <>
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span className="text-gray-700 dark:text-gray-300">
              Target:{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                Belajar Rutin
              </span>
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {current} / {data?.max_display || "60 Jam"}
            </span>
          </div>

          <div className="w-full bg-blue-100 dark:bg-gray-700 rounded-full h-3 mb-5">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg p-3 flex items-start gap-3">
            <AlertCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              {data?.message ||
                "Tetapkan target belajar untuk memantau progresmu."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// --- WIDGET 2: AI LEARNING INSIGHT (Updated structure) ---
export const InsightCard = ({ data, loading }) => {
  const [insightData, setInsightData] = useState(data);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setInsightData(data);
  }, [data]);

  const handlePredict = async () => {
    try {
      setIsAnalyzing(true);
      const res = await dashboardService.predict();
      // Sesuaikan jika struktur predict beda, tapi asumsi backend konsisten mengembalikan struktur baru
      setInsightData(res.data?.ai_insight || res);
    } catch (error) {
      console.error("Gagal melakukan prediksi:", error);
      alert("Gagal melakukan analisis AI. Coba lagi nanti.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isLoading = loading || isAnalyzing;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 mb-6 relative transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg text-pink-500">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">
              AI Learning Insight
            </h3>
            <p className="text-xs text-gray-400">
              Analisis personal aktivitas 3 hari terakhir
            </p>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={isLoading}
          className={`
            bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition transform active:scale-95 flex items-center gap-2
            ${isLoading ? "opacity-70 cursor-wait" : ""}
          `}
        >
          {isLoading ? (
            <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Sparkles size={14} />
          )}
          {isLoading ? "Memproses..." : "Analisis Sekarang"}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-pink-50 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 dark:bg-gray-700/30 border-l-4 border-pink-400 p-4 mb-4 rounded-r-lg">
            <p className="text-gray-700 dark:text-gray-200 italic font-medium font-serif text-lg">
              "{insightData?.motivation || "Belum ada data."}"
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">
              DATA-DRIVEN ADVICE
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {insightData?.advice ||
                insightData?.suggestions?.[0] ||
                "Mulai belajar untuk mendapatkan saran AI."}
            </p>
            {/* Menampilkan Tipe Belajar jika ada di insight */}
            {insightData?.type && (
              <span className="inline-block mt-2 text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded font-bold uppercase">
                {insightData.type}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// --- WIDGET 3: SUBMISSION (Sekarang Dinamis) ---
export const SubmissionCard = ({ data }) => {
  // Data dummy fallback jika null
  const submission = data || {
    title: "Belum ada submission",
    rating: 0,
    note: "Silakan submit tugas pertama Anda.",
    status: "-",
  };

  // Convert string rating "0" to number
  const ratingVal = parseFloat(submission.rating) || 0;
  const isPassed =
    submission.status?.toLowerCase().includes("lulus") || ratingVal >= 3;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50 dark:border-gray-700">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold">
          <FileText size={20} className="text-gray-400" />
          <h3 className="text-sm">Hasil Submission Terakhir</h3>
        </div>
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            isPassed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {submission.status || "Pending"}
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className="text-center min-w-[60px]">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            {ratingVal}
          </h2>
          <div className="flex text-yellow-400 text-xs justify-center my-1 gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={10}
                fill={star <= ratingVal ? "currentColor" : "none"}
                className={
                  star <= ratingVal ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-xs text-gray-400">Rating</p>
        </div>

        <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <h4 className="font-bold text-gray-800 dark:text-white text-sm mb-1 line-clamp-1">
            {submission.title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-2">
            "{submission.note}"
          </p>
        </div>
      </div>

      <div className="mt-3 text-right">
        <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">
          Lihat Detail Review →
        </button>
      </div>
    </div>
  );
};

// --- SIDEBAR KANAN (Updated: Recommendation & Profile Data) ---
export const RightSidebarWidgets = ({
  user,
  activeCourse,
  examHistory,
  recommendation,
  loading,
}) => {
  return (
    <div className="space-y-6">
      {/* Profil Data Lengkap (Hanya tampil di Desktop via Sidebar kanan ini jika diperlukan, 
                tapi biasanya sidebar dashboard utama (kiri) yang handle profil. 
                Disini kita pakai untuk Statistik XP) */}
      <div className="text-right">
        <p className="text-sm text-gray-500 font-bold mb-1">Total XP</p>
        {loading ? (
          <div className="flex justify-end">
            <SkeletonText width="w-24" height="h-8" />
          </div>
        ) : (
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            {/* Karena API tidak kirim XP, kita dummy atau ambil dari field lain jika ada */}
            2200 XP
          </h2>
        )}
      </div>

      {/* Tipe Belajar (Hardcoded dummy atau dari ml_features jika ada logika mapping) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-green-200 dark:border-green-900/50 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-bl-full -mr-2 -mt-2"></div>
        <div className="absolute top-3 right-3 text-green-500 text-xl">
          <CheckSquare size={20} />
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase mb-1">
          TIPE BELAJAR KAMU
        </p>
        {loading ? (
          <SkeletonText width="w-32" />
        ) : (
          <>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">
              Consistent Learner
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Hebat! Pola belajarmu sangat teratur. Data tracking menunjukkan
              kamu mengakses materi secara rutin.
            </p>
          </>
        )}
      </div>

      {/* Sedang Dipelajari */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">
          Sedang Dipelajari
        </h3>
        {loading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <SkeletonText />
          </div>
        ) : activeCourse ? (
          <>
            <div className="text-center mb-4">
              <img
                src={activeCourse.image}
                alt="Course"
                className="w-16 h-16 mx-auto mb-2 object-contain bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-1"
              />
              <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">
                {activeCourse.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {activeCourse.level} • {activeCourse.hours_display}
              </p>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progres Materi</span>
              <span>{activeCourse.progress_percent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{ width: `${activeCourse.progress_percentage}%` }}
              ></div>
            </div>
            <button className="w-full bg-black dark:bg-gray-700 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">
              Lanjutkan Belajar
            </button>
          </>
        ) : (
          <p className="text-sm text-center text-gray-500">
            Tidak ada kelas aktif.
          </p>
        )}
      </div>

      {/* Rekomendasi Berikutnya (New from API) */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-lg p-5 text-white relative overflow-hidden">
        {loading ? (
          <div className="animate-pulse h-20 bg-white/20 rounded"></div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm">Rekomendasi Berikutnya</h3>
              <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                {recommendation?.match_percent || 0}% Match
              </span>
            </div>
            <p className="text-[10px] text-purple-100 mb-3">
              Based on AI Prediction
            </p>
            <div className="bg-white/10 rounded p-3 backdrop-blur-md border border-white/20">
              <h4 className="font-bold text-sm mb-1">
                {recommendation?.next_class || "Belum ada rekomendasi"}
              </h4>
              <p className="text-[10px] text-gray-200 leading-tight">
                "{recommendation?.reason || "Selesaikan kelas saat ini dulu."}"
              </p>
            </div>
          </>
        )}
      </div>

      {/* Riwayat Ujian */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
        <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-3">
          Riwayat Ujian (Exam)
        </h3>
        <ul className="space-y-3">
          {loading ? (
            <SkeletonText count={2} />
          ) : examHistory && examHistory.length > 0 ? (
            examHistory.map((exam, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center text-xs"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  Exam #{exam.exam_registrations?.examinees_id || idx + 1}
                </span>
                <span
                  className={`font-bold ${
                    exam.is_passed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {exam.score} ({exam.is_passed ? "Pass" : "Fail"})
                </span>
              </li>
            ))
          ) : (
            <p className="text-xs text-gray-400">Belum ada riwayat ujian.</p>
          )}
        </ul>
      </div>
    </div>
  );
};
