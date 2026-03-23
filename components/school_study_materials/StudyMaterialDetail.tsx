"use client";

import { fetchOneMaterial } from "@/redux/features/school_study_material/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTag,
  HiSparkles,
  HiOutlineRefresh,
} from "react-icons/hi";
import PdfViewer from "../PdfViewer";
import MaterialCompleteButton from "./MaterialCompleteButton";

export default function StudyMaterialDetail() {
  const dispatch = useAppDispatch();
  const studyMaterialId = sessionStorage.getItem("studyMaterialId");

  // Mengambil selectedMaterial dan loading state dari redux
  const { selectedMaterial, loading } = useAppSelector(
    (state) => state.schoolStudyMaterial,
  );

  useEffect(() => {
    if (studyMaterialId) {
      dispatch(fetchOneMaterial(studyMaterialId));
    }
  }, [dispatch, studyMaterialId]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
        <HiOutlineRefresh className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Memuat Materi...
        </p>
      </div>
    );
  }

  // 2. Error/Null State
  if (!selectedMaterial) {
    return (
      <div className="w-full p-10 text-center bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 font-medium">
          Data materi tidak ditemukan.
        </p>
      </div>
    );
  }

  // Destructuring untuk kemudahan akses berdasarkan JSON Anda
  const material = selectedMaterial;

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-6 transition-all duration-300">
      <div className="p-6 space-y-4 lg:space-y-8">
        {/* Badge & Meta */}
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider flex items-center border border-indigo-100 dark:border-indigo-800/50">
              <HiOutlineTag className="mr-1" size={12} />
              {/* Akses: subject.name */}
              {material.subject?.name || "Tanpa Subjek"}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center border border-emerald-100 dark:border-emerald-800/50">
              <HiSparkles className="mr-1" size={12} /> AI Verified
            </span>
          </div>
          <MaterialCompleteButton
            isComplete={selectedMaterial.isComplete}
            studyMaterialId={selectedMaterial.studyMaterialId}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none mb-4">
          {material.title}
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-4 mb-6 border-y border-slate-100 dark:border-slate-900 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <HiOutlineUser className="text-slate-500" size={16} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                Pengajar
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {/* Akses: author.user.username */}
                {material.author?.user?.username || "Anonim"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <HiOutlineCalendar className="text-slate-500" size={16} />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                Rilis
              </p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {material.createdAt
                  ? new Date(material.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="relative group p-4">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full opacity-50"></div>
          <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2">
            Ringkasan Materi
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {material.description ||
              "Tidak ada deskripsi tambahan untuk materi ini."}
          </p>
        </div>

        <PdfViewer
          url={selectedMaterial.fileUrl}
          title={selectedMaterial.title}
        />
      </div>

      {/* Decorative Bottom Bar */}
      <div className="h-1 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-50"></div>
    </div>
  );
}
