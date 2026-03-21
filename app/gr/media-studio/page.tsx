"use client"

import MediaStudio from "./MediaStudio";

export default function MediaStudioPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Media <span className="text-rose-600">Studio</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Ciptakan pengalaman belajar multimedia yang tak terlupakan.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="px-6 py-3 bg-white dark:bg-[#0a0f1d] rounded-2xl border border-slate-200 dark:border-rose-900/20 text-center">
            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Storage Used</p>
            <p className="text-sm font-black italic text-rose-600">12.4 / 50 GB</p>
          </div>
        </div>
      </div>

      <MediaStudio />
    </div>
  );
}