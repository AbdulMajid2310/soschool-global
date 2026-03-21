"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSubjectDetail } from "@/redux/features/school_subject/thunks";
import {
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineDocumentText,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

const SubjectDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentSubject, loading } = useAppSelector(
    (state) => state.schoolSubject,
  );

  useEffect(() => {
    const id = sessionStorage.getItem("subjectId");
    if (id) {
      dispatch(fetchSubjectDetail(id));
    }
  }, [dispatch]);

  if (loading || !currentSubject) {
    return (
      <div className="p-8 animate-pulse space-y-4">
        <div className="h-10 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50 dark:bg-[#0f172a]">
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium mb-4"
        >
          <HiOutlineArrowLeft /> Kembali ke Daftar
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <HiOutlineBookOpen size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                {currentSubject.code}
              </span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-full uppercase">
                {currentSubject.classroomConfig?.classroom?.name || "Global"}
              </span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {currentSubject.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <HiOutlineUser className="text-blue-500" />
                <span className="text-sm font-semibold">
                  {currentSubject.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="text-purple-500" />
                <span className="text-sm font-semibold">
                  {currentSubject.period?.isActive}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-4xl p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                  <HiOutlineSparkles size={24} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">
                  Digital Footprint Analysis
                </h2>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic text-lg border-l-4 border-purple-500 pl-4 py-2 bg-purple-50/50 dark:bg-purple-900/10 rounded-r-xl">
                  "
                  {currentSubject.description ||
                    "Belum ada rangkuman materi yang dianalisis oleh AI untuk kelas ini."}
                  "
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold px-2 dark:text-white">
                Daftar Materi Pembelajaran majid
              </h2>
              <div className="grid gap-4">
                {currentSubject.materials?.map((material) => (
                  <div
                    key={material.studyMaterialId}
                    className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all group"
                  >
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                      <HiOutlineDocumentText size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {material.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {material.description || "Tidak ada rincian materi."}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Oleh: {material.author?.user?.username || "Pengajar"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-4xl p-8 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Informasi Akademik</h3>
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <span className="text-xs font-medium">Total Materi</span>
                  <span className="text-xl font-black">
                    {currentSubject.materials?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                  <span className="text-xs font-medium">Bobot SKS</span>
                  <span className="text-xl font-black">
                    {currentSubject.sks} SKS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
