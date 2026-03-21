"use client";

import React, { useEffect, useState } from "react";
import ClassroomStudentList from "@/components/classroom-student/ClassroomStudentList";
import ListStudentSection from "@/components/student/listStudentSchoolSection";
import { useRouter } from "next/navigation";
import { FaUsers, FaLayerGroup } from "react-icons/fa6";
import { BsPersonFillAdd } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchStudentsByPeriod } from "@/redux/features/classroom-student/thunks";

export default function StudentPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { students } = useAppSelector((state) => state.student);
  const schoolId = useSchoolId();
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

  // State untuk Switcher
  const [activeTab, setActiveTab] = useState<"master" | "mapping">("master");
  useEffect(() => {
    if (schoolId && activePeriod) {
      dispatch(
        fetchStudentsByPeriod({ schoolId, periodId: activePeriod.periodId }),
      );
    }
  }, [dispatch, schoolId, activePeriod]);

  const tabClass = (tab: string) => `
    flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300
    ${
      activeTab === tab
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none translate-y-[-2px]"
        : "bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-100 dark:border-slate-800"
    }
  `;

  return (
    <div className="space-y-4 p-4  animate-in fade-in duration-700">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              Database Siswa
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              SoSchool Management System
            </p>
          </div>
        </div>

        <div className="flex  flex-wrap items-center gap-3 p-2 bg-slate-100/50 dark:bg-slate-900/50 rounded-4xl w-fit border border-slate-200/50 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab("master")}
            className={tabClass("master")}
          >
            <FaUsers size={18} />
            <span className="hidden lg:inline "> Master Data </span>(
            {students.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mapping")}
            className={tabClass("mapping")}
          >
            <FaLayerGroup size={18} />
            <span className="hidden lg:inline "> Data Kelas</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("student/add")}
            className="group flex items-center justify-center gap-3 px-8 py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <BsPersonFillAdd className="text-lg group-hover:rotate-12 transition-transform" />
            <span className="hidden lg:inline ">Tambah</span>
          </button>
        </div>
      </div>

      {/* Modern Switcher / Tabs */}

      {/* Dynamic Content Rendering */}
      <div className="mt-4 transition-all duration-500">
        {activeTab === "master" ? (
          <div className="animate-in slide-in-from-left-4 duration-500">
            <ListStudentSection />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <ClassroomStudentList />
          </div>
        )}
      </div>
    </div>
  );
}
