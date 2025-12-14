// Lokasi: src/components/DashboardWidgets.jsx
import React, { useState, useEffect } from "react";
import { dashboardService } from "../services/api";
import {
  CheckCircle,
  BookOpen,
  AlertCircle,
  FileText,
  Star,
  Sparkles,
  Bot,
  Pencil,
  CheckSquare,
  Trophy,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

// --- IMPORT LOGO DARI ASSETS ---
import logoHitam from "../assets/logo.png";
import logoPutih from "../assets/logo-putih.png";

// --- HELPER: SKELETON ---
const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <div
    className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
  ></div>
);

// --- WIDGET 1: TARGET MINGGUAN ---
export const WeeklyTargetCard = ({ data, loading, onEditClick }) => {
  const current = data?.current || 0;
  const max = data?.max || 60;
  const progressPercent = Math.min((current / max) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 mb-6 transition-colors duration-300 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
          <CheckCircle size={20} />
          <h3>Target Mingguan</h3>
        </div>
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
      const res = await dashboardService.predict();
      setInsightData(res.data?.ai_insight || res);
    } catch (error) {
      console.error("Gagal melakukan prediksi:", error);
      alert("Gagal melakukan analisis AI. Coba lagi nanti.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isLoading = loading || isAnalyzing;

  // Helper warna badge tipe belajar
  const getBadgeColor = (type) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("struggling"))
      return "bg-pink-100 text-pink-700 border-pink-200";
    if (t.includes("fast") || t.includes("achiever"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (t.includes("consistent"))
      return "bg-green-100 text-green-700 border-green-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 mb-6 relative transition-colors duration-300 overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 dark:bg-pink-900/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          {/* Ikon dengan Gradient */}
          <div className="bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-900/40 dark:to-rose-800/40 p-3 rounded-2xl text-pink-600 dark:text-pink-300 shadow-sm border border-pink-50 dark:border-pink-800/30">
            <Bot size={26} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
              AI Learning Insight
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Analisis personal aktivitas 3 hari terakhir
            </p>
          </div>
        </div>

        {/* Tombol Gradient & Shadow */}
        <button
          onClick={handlePredict}
          disabled={isLoading}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-lg transition-all transform active:scale-95
            ${
              isLoading
                ? "bg-gray-300 dark:bg-gray-600 cursor-wait shadow-none"
                : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-pink-500/30 hover:shadow-pink-500/50"
            }
          `}
        >
          {isLoading ? (
            <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Sparkles size={14} fill="currentColor" />
          )}
          {isLoading ? "Memproses..." : "Analisis Sekarang"}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-16 bg-pink-50 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-xl"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Quote Box - Warm Tone */}
          <div className="bg-gradient-to-r from-orange-50/80 to-rose-50/50 dark:from-gray-700/40 dark:to-gray-700/40 border-l-4 border-orange-400 p-5 rounded-r-xl">
            <p className="text-gray-800 dark:text-gray-200 italic font-medium font-serif text-[15px] leading-relaxed">
              "{insightData?.motivation || "Belum ada data."}"
            </p>
          </div>

          {/* Advice Box - Cool Tone */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                DATA-DRIVEN ADVICE
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              {insightData?.advice ||
                insightData?.suggestions?.[0] ||
                "Mulai belajar untuk mendapatkan saran AI."}
            </p>

            {/* Badge Tipe Belajar (Colorful) */}
            {insightData?.type && (
              <span
                className={`inline-block text-[10px] px-3 py-1 rounded-md font-bold uppercase border ${getBadgeColor(
                  insightData.type
                )}`}
              >
                {insightData.type}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- WIDGET 3: SUBMISSION ---
export const SubmissionCard = ({ data }) => {
  const submission = data || {
    title: "Belum ada submission",
    rating: 0,
    note: "Silakan submit tugas pertama Anda.",
    status: "-",
  };
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

// --- SIDEBAR KANAN ---
export const RightSidebarWidgets = ({
  user,
  activeCourse,
  examHistory,
  recommendation,
  learnerProfile,
  loading,
}) => {
  // LOGIKA WARNA & IKON TIPE BELAJAR
  const getProfileStyle = (type) => {
    switch (type) {
      case "High Achiever":
        return {
          container: "border-purple-200 dark:border-purple-900/50",
          bgIcon: "bg-purple-50 dark:bg-purple-900/20",
          iconColor: "text-purple-500",
          titleColor: "text-purple-600 dark:text-purple-400",
          Icon: Trophy,
        };
      case "Fast Learner":
        return {
          container: "border-blue-200 dark:border-blue-900/50",
          bgIcon: "bg-blue-50 dark:bg-blue-900/20",
          iconColor: "text-blue-500",
          titleColor: "text-blue-600 dark:text-blue-400",
          Icon: Zap,
        };
      case "Consistent Learner":
        return {
          container: "border-green-200 dark:border-green-900/50",
          bgIcon: "bg-green-50 dark:bg-green-900/20",
          iconColor: "text-green-500",
          titleColor: "text-green-600 dark:text-green-400",
          Icon: CheckSquare,
        };
      case "Struggling Learner":
        return {
          container: "border-pink-200 dark:border-pink-900/50",
          bgIcon: "bg-pink-50 dark:bg-pink-900/20",
          iconColor: "text-pink-500",
          titleColor: "text-pink-600 dark:text-pink-400",
          Icon: AlertTriangle,
        };
      default:
        return {
          container: "border-gray-200 dark:border-gray-700",
          bgIcon: "bg-gray-50 dark:bg-gray-800",
          iconColor: "text-gray-500",
          titleColor: "text-gray-800 dark:text-white",
          Icon: Activity,
        };
    }
  };

  const profileStyle = getProfileStyle(learnerProfile?.type);
  const ProfileIcon = profileStyle.Icon;

  return (
    <div className="space-y-6">
      {/* TOTAL XP DINAMIS */}
      <div className="text-right">
        <p className="text-sm text-gray-500 font-bold mb-1">Total XP</p>
        {loading ? (
          <div className="flex justify-end">
            <SkeletonText width="w-24" height="h-8" />
          </div>
        ) : (
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            {user?.xp ? new Intl.NumberFormat("id-ID").format(user.xp) : 0} XP
          </h2>
        )}
      </div>

      {/* TIPE BELAJAR (WARNA-WARNI) */}
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-5 relative overflow-hidden transition-colors ${profileStyle.container}`}
      >
        <div
          className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full -mr-2 -mt-2 ${profileStyle.bgIcon}`}
        ></div>
        <div
          className={`absolute top-3 right-3 text-xl ${profileStyle.iconColor}`}
        >
          <ProfileIcon size={20} />
        </div>

        <p className="text-xs text-gray-400 font-bold uppercase mb-1">
          TIPE BELAJAR KAMU
        </p>

        {loading ? (
          <SkeletonText width="w-32" />
        ) : (
          <>
            <h3 className={`text-xl font-bold mb-3 ${profileStyle.titleColor}`}>
              {learnerProfile?.type || "Belum Dianalisis"}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {learnerProfile?.description || "Menunggu data aktivitas..."}
            </p>
          </>
        )}
      </div>

      {/* WIDGET SEDANG DIPELAJARI (LOGO ASET) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 transition-colors">
        <h3 className="font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-500" /> Sedang Dipelajari
        </h3>

        {loading ? (
          <div className="flex gap-4 items-center animate-pulse">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl shrink-0"></div>
            <div className="flex-1 space-y-2">
              <SkeletonText width="w-3/4" />
              <SkeletonText width="w-1/2" height="h-3" />
            </div>
          </div>
        ) : activeCourse ? (
          <>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 flex items-center justify-center shadow-sm">
                {/* LOGO OTOMATIS BERGANTI */}
                <img
                  src={logoHitam}
                  alt="Course Logo"
                  className="w-full h-full object-contain block dark:hidden opacity-80"
                />
                <img
                  src={logoPutih}
                  alt="Course Logo Dark"
                  className="w-full h-full object-contain hidden dark:block opacity-90"
                />
              </div>

              <div className="flex-1 min-w-0 py-1">
                <h4 className="font-bold text-gray-900 dark:text-white text-[15px] leading-tight line-clamp-2 mb-1.5">
                  {activeCourse.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-md uppercase tracking-wide">
                    {activeCourse.level}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    • {activeCourse.hours_display}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                <span>Progres Materi</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {activeCourse.progress_percent}%
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${activeCourse.progress_percentage}%` }}
                ></div>
              </div>
            </div>

            {/* --- BUTTON "LANJUTKAN BELAJAR" (SEKARANG MENJADI LINK KE DICODING) --- */}
            <a
              href="https://www.dicoding.com/dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              Lanjutkan Belajar
            </a>
          </>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Tidak ada kelas aktif saat ini.</p>
          </div>
        )}
      </div>

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
