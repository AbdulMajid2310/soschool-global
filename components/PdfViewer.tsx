import React, { useState } from "react";
import { FaFilePdf, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

const PdfViewer = () => {
  const fileHash = sessionStorage.getItem("fileHash");
  const [isLoading, setIsLoading] = useState(true);
  const pdfUrl = `https://cdn.soschool.site/v1/storage/view/${fileHash}`;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto my-4 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all"
            title="Buka di Tab Baru"
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
          </a>
          <a
            href={pdfUrl}
            download
            className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all shadow-md active:scale-95"
          >
            <FaDownload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        </div>
      </div>

      {/* Viewer Container */}
      <div className="relative w-full h-[70vh] md:h-[80vh] bg-[#525659]">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50">
            <HiOutlineRefresh className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
            <p className="text-sm text-gray-500 font-semibold tracking-wide">
              Menyiapkan Dokumen...
            </p>
          </div>
        )}

        <iframe
          title="file"
          src={`${pdfUrl}#view=FitH&toolbar=1`}
          className="w-full h-full border-none shadow-inner"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[10px] text-gray-400 font-medium">
          Keamanan Dokumen Terjamin oleh SoSchool
        </p>
        <p className="text-[10px] text-gray-500 italic">CDN v2.1</p>
      </div>
    </div>
  );
};

export default PdfViewer;
