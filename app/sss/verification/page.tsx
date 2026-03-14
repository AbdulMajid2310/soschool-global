"use client";

import ListSchoolDocument from "@/components/school-document/ListSchoolDocument";
import SchoolListSide from "@/components/school/SchoolListSide";
import UpdateStatusSchool from "@/components/school/UpdateStatusSchool";
import { FiClipboard } from "react-icons/fi";

export default function VerificationCenter() {
  return (
    <div className="min-h-screen p-4 transition-colors duration-300 ">
      {/* HEADER SECTION */}
      <div className="mb-12 relative group">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <FiClipboard className="text-emerald-500 text-2xl" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
              Verifikasi <span className="text-emerald-500">Sekolah Baru</span>
            </h1>
            <div className="h-1 w-20 bg-emerald-500 rounded-full mt-1 group-hover:w-32 transition-all duration-500" />
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-black italic uppercase tracking-[0.3em] ml-1">
          Antrean Kurasi Dokumen & Validasi NPSN
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT: LIST OF REQUESTS (4 Cols on XL) */}
        <div className="xl:col-span-4 h-full">
          <SchoolListSide />
        </div>

        {/* RIGHT: DETAIL VIEW (8 Cols on XL) */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-3xl relative overflow-hidden">
          {/* Subtle Glow Effect for Dark Mode */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <UpdateStatusSchool />

            {/* SEPARATOR */}
            <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent w-full" />

            <ListSchoolDocument />
          </div>
        </div>
      </div>
    </div>
  );
}
