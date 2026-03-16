"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaFilePdf } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

const PdfViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  console.log(pdfUrl);

  useEffect(() => {
    const storedHash = sessionStorage.getItem("fileHash");
    if (storedHash) {
      setPdfUrl(storedHash);
    }
  }, []);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SoSchool_Dokumen_${pdfUrl.split("/").pop()}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
    }
  };

  if (!pdfUrl) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-800 transition-colors">
        <FaFilePdf className="w-10 h-10 text-gray-300 dark:text-slate-700 mb-2" />
        <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase italic">
          Dokumen Belum Dipilih
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 w-full scrollbar-hide lg:p-6 h-screen overflow-hidden bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-2xl rounded-2xl transition-colors duration-300">
      {/* Header Bar Modern */}
      <div className="flex items-center rounded-xl justify-between px-5 py-4 bg-linear-to-r from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500 rounded-xl shadow-lg shadow-red-500/20 dark:shadow-red-900/10">
            <FaFilePdf className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase italic tracking-tight">
              Pratinjau Dokumentasi
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold uppercase truncate max-w-45">
              ID: {pdfUrl.split("/").pop()?.substring(0, 20)}...
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg shadow-md dark:shadow-indigo-900/20 active:scale-95 transition-all text-xs font-bold"
          >
            <FaDownload className="w-4 h-4" />
            <span>Unduh Berkas</span>
          </button>
        </div>
      </div>

      {/* Viewer Container dengan Frame Desain */}
      <div className="relative w-full h-[75vh] md:h-[85vh] bg-slate-800 dark:bg-slate-900 p-1 sm:p-2 shadow-inner">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-sm">
            <HiOutlineRefresh className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-xs font-black text-white dark:text-blue-400 uppercase tracking-[0.3em] animate-pulse">
              Syncing with CDN...
            </p>
          </div>
        )}

        <div className="w-full h-full scrollbar-hide rounded-lg overflow-hidden border border-white/5 dark:border-white/10 shadow-2xl">
          <iframe
            title="SoSchool Document Viewer"
            src={`${pdfUrl}#view=FitH&toolbar=1`}
            className="w-full h-full border-none bg-white"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Footer Branding */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-slate-900/30 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Terverifikasi Sistem Global SoSchool
          </p>
        </div>
        <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 italic uppercase">
          Internal Storage v2.6
        </p>
      </div>
    </div>
  );
};

export default PdfViewer;
