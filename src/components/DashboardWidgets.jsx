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
} from "lucide-react";

// --- HELPER: SKELETON ---
const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <div
    className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
  ></div>
);

// --- WIDGET 1: TARGET MINGGUAN ---
export const WeeklyTargetCard = ({ data, loading }) => {
  const targetValue = data?.target_value || 60;
  const currentValue = data?.current_value || 0;
  const progressPercent = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 mb-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
          <CheckCircle size={20} />
          <h3>Target Mingguan</h3>
        </div>
        {loading ? (
          <SkeletonText width="w-16" height="h-6" />
        ) : (
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full font-bold">
            On-Track
          </span>
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
          <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="capitalize">
              {data?.target_type
                ? data.target_type.replace("_", " ")
                : "Target Belajar"}
            </span>
            <span>
              {currentValue} / {targetValue} jam
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-lg border border-blue-100 dark:border-blue-800/50">
            <AlertCircle size={16} />
            <p>
              Berdasarkan target, kamu perlu menyisihkan{" "}
              <strong>1 jam/hari</strong>.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

// --- WIDGET 2: AI LEARNING INSIGHT ---
export const InsightCard = ({ data, loading }) => {
  const [insightData, setInsightData] = useState(data);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setInsightData(data);
  }, [data]);

  const handlePredict = async () => {
    try {
      setIsAnalyzing(true);
      const newInsight = await dashboardService.predict();
      setInsightData(newInsight.data || newInsight);
    } catch (error) {
      console.error("Gagal melakukan prediksi:", error);
      alert("Gagal melakukan analisis AI. Coba lagi nanti.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isLoading = loading || isAnalyzing;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 relative overflow-hidden transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-2.5 rounded-xl text-pink-600 dark:text-pink-400 shadow-sm">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
              AI Learning Insight
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Analisis personal dari aktivitas 3 hari terakhir
            </p>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={isLoading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white shadow-md transition-all
            ${
              isLoading
                ? "bg-gray-300 dark:bg-gray-600 cursor-wait"
                : "bg-pink-600 hover:bg-pink-700 hover:shadow-lg active:scale-95"
            }
          `}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Menganalisis...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Analisis Sekarang</span>
            </>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-pink-50 dark:bg-gray-700 rounded-lg border-l-4 border-pink-300"></div>
          <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <SkeletonText width="w-32" />
            <div className="mt-3 space-y-2">
              <SkeletonText />
              <SkeletonText />
              <SkeletonText width="w-2/3" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="border-l-4 border-pink-500 pl-4 py-3 bg-pink-50 dark:bg-pink-900/10 mb-6 rounded-r-lg">
            <p className="text-gray-800 dark:text-gray-200 italic font-medium text-lg font-serif">
              "
              {insightData?.motivation ||
                "Tekan tombol analisis untuk mendapatkan insight."}
              "
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl border border-gray-100 dark:border-gray-600">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-3 tracking-wider">
              DATA-DRIVEN ADVICE
            </h4>

            {insightData?.suggestions && insightData.suggestions.length > 0 ? (
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                {insightData.suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-pink-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                AI belum mendeteksi pola belajar yang cukup.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// --- WIDGET 3: SUBMISSION ---
export const SubmissionCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold">
          <FileText size={20} /> <span>Hasil Submission Terakhir</span>
        </div>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full font-bold">
          Lulus (Passed)
        </span>
      </div>
      <div className="flex gap-4 items-start">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            4.5
          </h2>
          <div className="flex text-yellow-400 text-sm justify-center my-1">
            ★★★★<span className="text-gray-300 dark:text-gray-600">★</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
          <h4 className="font-bold text-gray-800 dark:text-white mb-1">
            Aplikasi Github User
          </h4>
          <p className="italic">
            "Fitur pencarian user sudah berjalan baik. Tampilan list sudah
            rapi."
          </p>
        </div>
      </div>
    </div>
  );
};

// --- SIDEBAR KANAN ---
export const RightSidebarWidgets = ({
  user,
  activeCourse,
  examHistory,
  insight,
  loading,
}) => {
  const recommendationTitle =
    insight?.suggestions?.[0] || "Lanjutkan Materi Aktif";
  const matchPercentage = insight?.prediction_confidence
    ? `${Math.round(insight.prediction_confidence * 100)}% Match`
    : "Calculating...";

  return (
    <div className="space-y-6">
      {/* 1. Total XP */}
      <div className="text-right mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
        {loading ? (
          <div className="flex justify-end">
            <SkeletonText width="w-24" height="h-8" />
          </div>
        ) : (
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {user?.total_xp || 0} XP
          </h2>
        )}
      </div>

      {/* 2. Tipe Belajar */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border-2 border-green-400 dark:border-green-600 relative transition-colors duration-300">
        <div className="absolute top-4 right-4 text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/30 p-1 rounded">
          <CheckCircle size={16} />
        </div>
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Tipe Belajar Kamu
        </p>

        {loading ? (
          <div className="mt-2 space-y-2">
            <SkeletonText width="w-32" height="h-6" />
            <SkeletonText width="w-full" height="h-10" />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
              {insight?.learning_style || "Belum Dianalisis"}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {insight?.prediction_confidence
                ? `AI yakin ${Math.round(
                    insight.prediction_confidence * 100
                  )}% dengan gaya belajarmu.`
                : "Menunggu data aktivitas..."}
            </p>
          </>
        )}
      </div>

      {/* 3. Sedang Dipelajari */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h4 className="font-bold text-gray-800 dark:text-white mb-4">
          Sedang Dipelajari
        </h4>

        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <SkeletonText width="w-3/4" />
            <SkeletonText width="w-full" height="h-8" />
          </div>
        ) : activeCourse ? (
          <>
            <div className="flex flex-col items-center text-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mb-2">
                <BookOpen
                  className="text-yellow-600 dark:text-yellow-400"
                  size={24}
                />
              </div>
              <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                {activeCourse.course_name}
              </h5>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Progress: {activeCourse.progress_percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${activeCourse.progress_percentage || 0}%` }}
              ></div>
            </div>
            <button className="w-full bg-black dark:bg-gray-700 text-white text-sm py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition">
              Lanjutkan Belajar
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Tidak ada kursus aktif.
          </p>
        )}
      </div>

      {/* 4. Rekomendasi Berikutnya */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-5 rounded-2xl shadow-md text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-20">
          <Sparkles size={40} />
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="flex justify-between mb-2">
              <div className="h-4 bg-white/30 w-1/3 rounded"></div>
              <div className="h-4 bg-white/30 w-1/4 rounded"></div>
            </div>
            <div className="h-3 bg-white/30 w-1/2 rounded mb-4"></div>
            <div className="h-16 bg-white/20 rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-2 relative z-10">
              <h4 className="font-bold text-sm">Rekomendasi Berikutnya</h4>
              <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded backdrop-blur-sm font-medium border border-white/10">
                {matchPercentage}
              </span>
            </div>
            <p className="text-[10px] text-white/80 mb-3 relative z-10">
              Based on AI Prediction
            </p>

            <div className="bg-white/10 p-3 rounded-lg border border-white/20 backdrop-blur-sm relative z-10 hover:bg-white/20 transition-colors cursor-pointer">
              <h5 className="font-bold text-sm line-clamp-1">
                {recommendationTitle}
              </h5>
              <p className="text-[10px] mt-1 opacity-90 leading-relaxed italic">
                "Saran ini dipilih khusus untuk meningkatkan performa
                belajarmu."
              </p>
            </div>
          </>
        )}
      </div>

      {/* 5. Riwayat Ujian */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h4 className="font-bold text-gray-800 dark:text-white mb-4 text-sm">
          Riwayat Ujian (Exam)
        </h4>
        <div className="space-y-3">
          {loading ? (
            <>
              <SkeletonText />
              <SkeletonText />
            </>
          ) : examHistory && examHistory.length > 0 ? (
            examHistory.map((exam, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm border-b dark:border-gray-700 pb-2 last:border-0"
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {exam.exam_name}
                </span>
                <span
                  className={`font-bold ${
                    exam.score >= 70 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {exam.score}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-400">Belum ada riwayat ujian.</p>
          )}
        </div>
      </div>
    </div>
  );
};
