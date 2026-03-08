"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  HiOutlineChevronLeft,
  HiOutlineUserPlus,
  HiOutlineTableCells,
} from "react-icons/hi2";
import AddTeacher from "@/components/teacher/addTeacher";
import ImportTeacherExcel from "@/components/teacher/ImportTeacherExcel";
import { FaUserTag } from "react-icons/fa";
import CreatedTeacherList from "./add/createdTeacherList";

export default function CreateTeacherSection() {
  const router = useRouter();
  const [mode, setMode] = useState<"list" | "single" | "bulk">("list");

  return (
    <div className="min-h-screen p-4  animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 ">
        <div className="flex items-center lg:gap-6 gap-3">
          <button
            type="button"
            title="kembali"
            onClick={() => router.back()}
            className="p-3 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl shadow-sm hover:text-indigo-600 transition-all active:scale-95"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
          <div>
            <h1 className="lg:text-3xl text-lg font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
              Registrasi Guru
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
              Tambahkan personel akademik ke{" "}
              <span className="text-indigo-600 font-bold">SoSchool</span>
            </p>
          </div>
        </div>

        {/* Switcher Tab */}
        <div className="flex p-1.5 bg-slate-100 dark:bg-gray-900 rounded-3xl border border-slate-200 dark:border-gray-800 w-fit">
          <button
            type="button"
            title="list"
            onClick={() => setMode("list")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "list" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <FaUserTag size={16} /> List
          </button>
          <button
            type="button"
            title="form"
            onClick={() => setMode("single")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "single" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <HiOutlineUserPlus size={16} /> Single
          </button>
          <button
            type="button"
            title="import"
            onClick={() => setMode("bulk")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "bulk" ? "bg-white dark:bg-gray-800 text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            <HiOutlineTableCells size={16} /> Bulk Import
          </button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {mode === "single" && <AddTeacher />}

        {mode === "bulk" && <ImportTeacherExcel />}

        {mode === "list" && <CreatedTeacherList />}
      </div>
    </div>
  );
}
