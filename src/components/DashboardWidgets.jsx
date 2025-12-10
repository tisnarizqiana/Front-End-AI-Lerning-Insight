// Lokasi: src/components/DashboardWidgets.jsx
import React from "react";
import {
  CheckCircle,
  TrendingUp,
  BookOpen,
  AlertCircle,
  FileText,
  Star,
} from "lucide-react";

// --- WIDGET 1: TARGET MINGGUAN ---
export const WeeklyTargetCard = ({ data }) => {
  if (!data)
    return (
      <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse mb-6"></div>
    );

  const targetValue = data.target_value || 60;
  const currentValue = data.current_value || 0;
  const progressPercent = Math.min((currentValue / targetValue) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-gray-700 mb-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
          <CheckCircle size={20} />
          <h3>Target Mingguan</h3>
        </div>
        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-full font-bold">
          On-Track
        </span>
      </div>

      <div className="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
        <span className="capitalize">
          {data.target_type
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
          Berdasarkan target, kamu perlu menyisihkan <strong>1 jam/hari</strong>{" "}
          agar selesai tepat waktu.
        </p>
      </div>
    </div>
  );
};

// --- WIDGET 2: AI LEARNING INSIGHT ---
export const InsightCard = ({ data }) => {
  if (!data)
    return (
      <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse mb-6"></div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 text-xs px-3 py-1 rounded-bl-lg font-medium">
        Last Update: {new Date().toLocaleDateString("id-ID")}
      </div>

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="bg-pink-100 dark:bg-pink-900/40 p-2 rounded-lg text-pink-600 dark:text-pink-400">
          <TrendingUp size={24} />
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          AI Learning Insight
        </h3>
      </div>

      <div className="border-l-4 border-orange-400 pl-4 py-2 bg-orange-50 dark:bg-orange-900/10 mb-6 rounded-r-lg">
        <p className="text-gray-800 dark:text-gray-200 italic font-medium">
          "{data.motivation || "Tetap semangat!"}"
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">
          DATA-DRIVEN ADVICE
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-4 space-y-1">
          {data.suggestions?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// --- WIDGET 3: HASIL SUBMISSION ---
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
            {"★".repeat(4)}
            <span className="text-gray-300 dark:text-gray-600">★</span>
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
}) => {
  if (!user)
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 animate-pulse"></div>
    );

  return (
    <div className="space-y-6">
      <div className="text-right mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total XP</p>
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {user.total_xp || 0} XP
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border-2 border-green-400 dark:border-green-600 relative transition-colors duration-300">
        <div className="absolute top-4 right-4 text-green-500 dark:text-green-400 bg-green-50 dark:bg-green-900/30 p-1 rounded">
          <CheckCircle size={16} />
        </div>
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Tipe Belajar Kamu
        </p>
        <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
          {insight?.learning_style || "Belum Dianalisis"}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
          {insight?.prediction_confidence
            ? `AI yakin ${
                insight.prediction_confidence * 100
              }% dengan gaya belajarmu.`
            : "Data tracking sedang dikumpulkan."}
        </p>
      </div>

      {activeCourse && (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h4 className="font-bold text-gray-800 dark:text-white mb-4">
            Sedang Dipelajari
          </h4>
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
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h4 className="font-bold text-gray-800 dark:text-white mb-4 text-sm">
          Riwayat Ujian (Exam)
        </h4>
        <div className="space-y-3">
          {examHistory && examHistory.length > 0 ? (
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
