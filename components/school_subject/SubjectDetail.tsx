"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSubjectDetail } from "@/redux/features/school_subject/thunks";
import { HiOutlineSparkles } from "react-icons/hi";
import StudyMaterialManager from "@/components/school_study_materials/list_study_material";
import HeaderSubject from "@/components/school_subject/HeaderSubject";
import SpecificScheduleDetail from "@/components/school-schedule/detailTeacher/SpecificScheduleDetail";

const SubjectDetail = () => {
  const dispatch = useAppDispatch();
  const { currentSubject, loading } = useAppSelector(
    (state) => state.schoolSubject,
  );
  const subjectId = sessionStorage.getItem("schoolSubjectId") || "";

  useEffect(() => {
    if (subjectId) dispatch(fetchSubjectDetail(subjectId));
  }, [dispatch, subjectId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Menyiapkan ruang kelas...
        </p>
      </div>
    );

  if (!currentSubject) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="relative group overflow-hidden bg-slate-900 dark:bg-blue-600 rounded-[4rem] p-10  text-white shadow-2xl transition-all duration-700">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-white/10 blur-[120px] rounded-full -mr-40 -mt-40 animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 blur-[100px] rounded-full -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <HeaderSubject data={currentSubject} />

          {/* PROGRESS WIDGET */}
          <div className="shrink-0 flex flex-col items-center justify-center p-10 bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-white/10 shadow-inner">
            <div className="relative flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/10"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * 60) / 100}
                  className="text-white transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-2xl font-black italic">40%</span>
            </div>
            <p className="mt-4 text-[8px] font-black uppercase tracking-[0.3em] opacity-60">
              Term Progress
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: AI Summary & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card AI Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-slate-800 dark:text-white text-sm">
                <HiOutlineSparkles className="text-blue-500" />
                Jadwal Mengajar
              </h3>
            </div>

            {/* Sparkle Decoration */}
            <HiOutlineSparkles
              className="absolute -bottom-4 -right-4 text-blue-500/5 group-hover:text-blue-500/10 transition-colors"
              size={120}
            />
          </div>

          {/* Quick Info Card */}
          <SpecificScheduleDetail />
        </div>

        <div className="w-full col-span-2">
          <StudyMaterialManager />
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
