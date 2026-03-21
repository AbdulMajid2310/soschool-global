"use client";

import ClassroomConfigFormSection from "@/components/classroom-config/add/page";
import { useRouter } from "next/navigation";
import { HiOutlineCalendar, HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineUserPlus } from "react-icons/hi2";

export default function ClassroomConfigFormPage() {
  const router = useRouter();
  return (
    <div className="p-4 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
          <button
            type="button"
            title="kembali"
            onClick={() => router.back()}
            className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all active:scale-95"
          >
            <HiOutlineChevronLeft
              size={22}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
              Manajemen Kelas
            </h1>
            <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-md">
              Hubungkan ruangan, wali kelas, dan siswa
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("./classroom")}
            className="px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-4xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl"
          >
            <HiOutlineUserPlus size={18} /> Buka Kelas
          </button>

          {/* Button Periode / Tahun Ajaran */}
          <button
            type="button"
            onClick={() => router.push("./period")}
            className="px-6 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-4xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            <HiOutlineCalendar size={18} className="text-indigo-600" /> Periode
          </button>
        </div>
      </div>
      <div>
        <ClassroomConfigFormSection />
      </div>
    </div>
  );
}
