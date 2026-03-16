"use client";

import { useState } from "react";
import { AddParentSchoolModal } from "@/components/school-parents/add/AddParentSchoolModal";
import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { HiOutlineUserPlus, HiOutlineLink } from "react-icons/hi2";
import { AddParentByListSection } from "@/components/school-parents/add/AddParentByListSection";

export default function ParentPage() {
  // State untuk switch tampilan
  const [activeTab, setActiveTab] = useState<"new" | "exist">("new");

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header & Navigation */}
      <div className="flex  justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-4xl border border-slate-200/60 dark:border-white/5 shadow-sm gap-4">
        <ButtonBackUI />

        {/* Switch Toggle Tab */}
        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-3xl border border-slate-200/50 dark:border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab("new")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "new"
                ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xl shadow-indigo-100 dark:shadow-none italic"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            <HiOutlineUserPlus size={18} />
            Buat Baru
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("exist")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === "exist"
                ? "bg-white dark:bg-slate-900 text-emerald-600 shadow-xl shadow-emerald-100 dark:shadow-none italic"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            <HiOutlineLink size={18} />
            Hubungkan User
          </button>
        </div>
      </div>

      {/* Content Container dengan Transisi Sederhana */}
      <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 p-4 min-h-150 shadow-sm">
        {activeTab === "new" ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <AddParentSchoolModal />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <AddParentByListSection />
          </div>
        )}
      </div>

      {/* Tips Section */}
      <footer className="px-10 py-6 bg-indigo-50/30 dark:bg-white/5 rounded-4xl border border-indigo-100/50 dark:border-white/5">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          <span className="text-indigo-500 font-black italic mr-2">INFO:</span>
          Gunakan <span className="text-emerald-500">
            "Hubungkan User"
          </span>{" "}
          jika wali murid sudah memiliki akun di sekolah lain atau sebelumnya
          adalah staf/guru agar data NIK tidak duplikat.
        </p>
      </footer>
    </div>
  );
}
