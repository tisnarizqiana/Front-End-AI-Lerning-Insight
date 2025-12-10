// Lokasi: src/pages/ComingSoonPage.jsx
import React from "react";
import { Construction } from "lucide-react";

const ComingSoonPage = ({ title }) => {
  return (
    // Container utama dengan transisi warna background & border
    <div
      className="flex flex-col items-center justify-center h-[70vh] text-center p-8 m-4 rounded-2xl border-2 border-dashed transition-colors duration-300
      bg-white border-gray-200 
      dark:bg-gray-800 dark:border-gray-700"
    >
      {/* Icon Circle */}
      <div
        className="p-6 rounded-full mb-6 transition-colors duration-300
        bg-yellow-50 
        dark:bg-yellow-900/20"
      >
        <Construction
          size={64}
          className="text-yellow-600 dark:text-yellow-500"
        />
      </div>

      {/* Judul */}
      <h2
        className="text-3xl font-bold mb-3 transition-colors duration-300
        text-gray-900 
        dark:text-white"
      >
        {title}
      </h2>

      {/* Deskripsi */}
      <p
        className="max-w-md text-lg leading-relaxed transition-colors duration-300
        text-gray-500 
        dark:text-gray-400"
      >
        Fitur ini sedang dalam tahap pengembangan oleh Tim Capstone A25-CS238.
        <br />
        Silakan kembali lagi nanti!
      </p>
    </div>
  );
};

export default ComingSoonPage;
