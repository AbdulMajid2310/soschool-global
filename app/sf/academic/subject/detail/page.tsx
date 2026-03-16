"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSubjectDetail } from "@/redux/features/school_subject/thunks";
import {
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineArrowLeft,
  HiOutlineRefresh,
  HiOutlineAcademicCap,
} from "react-icons/hi";
import toast from "react-hot-toast";
import StudyMaterialManager from "@/components/school_study_materials/list_study_material";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

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
      {/* Header / Navigasi */}
      <ButtonBackUI />

      {/* Hero Section - Info Mapel */}
      <div className="relative overflow-hidden bg-linear-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
              {currentSubject.code}
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
              {currentSubject.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-blue-100 font-medium">
              <div className="flex items-center gap-2">
                <HiOutlineAcademicCap size={20} />
                <span>Level {currentSubject.level || "Dasar"}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineUserGroup size={20} />
                <span>Mata Pelajaran Wajib</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: AI Summary & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card AI Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-slate-800 dark:text-white text-sm">
                <HiOutlineSparkles className="text-blue-500" />
                AI Summary
              </h3>
            </div>

            {/* Sparkle Decoration */}
            <HiOutlineSparkles
              className="absolute -bottom-4 -right-4 text-blue-500/5 group-hover:text-blue-500/10 transition-colors"
              size={120}
            />
          </div>

          {/* Quick Info Card */}
          <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-slate-400 mb-4">
              Informasi Kelas
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <span className="text-slate-400 text-sm">Kredit SKS</span>
                <span className="font-bold">4 SKS</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <span className="text-slate-400 text-sm">Semester</span>
                <span className="font-bold">Ganjil</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-400 text-sm">Target Siswa</span>
                <span className="font-bold">Kelas 10-A</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-2">
          <StudyMaterialManager />
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
