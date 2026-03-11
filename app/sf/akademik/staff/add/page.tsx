"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUserPlus, FiFileText, FiArrowLeft } from "react-icons/fi";
import AddSingleStaff from "./AddSingleStaff";
import ImportStaffCsv from "./ImportStaffCsv";

export default function AddStaffPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"single" | "excel">("single");

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-4 hover:gap-4 transition-all"
          >
            <FiArrowLeft strokeWidth={3} /> Kembali
          </button>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
            Registrasi Staff
          </h1>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-4xl shadow-inner">
          <button
            onClick={() => setMethod("single")}
            className={`flex items-center gap-3 px-6 py-3 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${
              method === "single"
                ? "bg-white dark:bg-gray-700 text-indigo-600 shadow-xl"
                : "text-gray-500"
            }`}
          >
            <FiUserPlus size={18} strokeWidth={3} /> Single Data
          </button>
          <button
            onClick={() => setMethod("excel")}
            className={`flex items-center gap-3 px-6 py-3 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${
              method === "excel"
                ? "bg-white dark:bg-gray-700 text-indigo-600 shadow-xl"
                : "text-gray-500"
            }`}
          >
            <FiFileText size={18} strokeWidth={3} /> Import Excel
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
        {method === "single" ? <AddSingleStaff /> : <ImportStaffCsv />}
      </div>
    </div>
  );
}
