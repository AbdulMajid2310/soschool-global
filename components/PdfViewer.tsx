"use client";

import React, { useState, useEffect } from "react";
import { FaDownload, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

interface PdfViewerProps {
  url?: string;
  title?: string;
}

const PdfViewer = ({
  url: propsUrl,
  title = "Pratinjau Dokumentasi",
}: PdfViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  console.log("url", propsUrl);

  useEffect(() => {
    if (propsUrl) setIsLoading(true);
  }, [propsUrl]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!propsUrl) return;

    try {
      const response = await fetch(propsUrl);
      if (!response.ok) throw new Error("Gagal mengunduh dokumen");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;

      const fileName = propsUrl.split("/").pop() || "dokumen";
      link.download = `SoSchool_${fileName}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal mengunduh file:", error);
    }
  };

  if (!propsUrl) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all duration-500">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl mb-4">
          <FaFilePdf className="w-12 h-12 text-slate-300 dark:text-slate-600" />
        </div>
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          Menunggu Signal Dokumen...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-150 overflow-hidden  border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] transition-all duration-500 ring-1 ring-black/5 dark:ring-white/5">
      {/* Dynamic Glass Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 bg-white/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 backdrop-blur-xl z-30 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative">
            <div className="p-3 bg-linear-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg shadow-rose-500/20">
              <FaFilePdf className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase italic tracking-tight leading-none">
              {title}
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 flex items-center gap-1">
              <span className="opacity-50">HASH:</span>
              <span className="truncate max-w-30">
                {propsUrl.split("/").pop()?.substring(0, 16)}...
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-500/10 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <FaDownload className="w-3 h-3" />
            <span>Unduh</span>
          </button>
        </div>
      </div>

      {/* Modern Content Frame */}
      <div className="relative flex-1 bg-slate-50 dark:bg-slate-900/50 m-2 rounded-[1.8rem] overflow-hidden border border-slate-100 dark:border-slate-800">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <HiOutlineRefresh
                className="absolute inset-0 m-auto text-indigo-500 animate-pulse"
                size={24}
              />
            </div>
            <p className="text-[10px] font-black text-slate-500 dark:text-indigo-400 uppercase tracking-[0.5em] animate-pulse">
              Syncing Core...
            </p>
          </div>
        )}

        <div className="w-full h-screen">
          {propsUrl && (
            <object
              data={`${propsUrl}#view=FitH&scrollbar=1&toolbar=1`}
              type="application/pdf"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            >
              <iframe
                title="SoSchool Document Viewer Fallback"
                src={`https://docs.google.com/gview?url=${encodeURIComponent(propsUrl)}&embedded=true`}
                className="w-full h-full border-none bg-white"
                onLoad={() => setIsLoading(false)}
                loading="lazy"
                allow="fullscreen"
              />
            </object>
          )}
        </div>
      </div>

      {/* Micro-Branding Footer */}
      <div className="px-8 py-4 bg-transparent flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 shadow-sm flex items-center justify-center text-[8px] font-bold text-slate-400`}
              >
                {i}
              </div>
            ))}
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Multi-Node CDN Active
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200/50 dark:border-slate-800/50">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <p className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase italic">
            SoSchool v2.6.4
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
