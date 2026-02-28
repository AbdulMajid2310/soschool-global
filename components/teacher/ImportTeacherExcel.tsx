"use client";

import React, { useRef, useState } from 'react';
import { HiOutlineCloudArrowUp, HiOutlineDocumentText } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { importTeacherCsv } from "@/redux/features/teacher/thunk";
import toast from 'react-hot-toast';
import { useSchoolId } from '@/hooks/useSchoolId';

export default function ImportTeacherCsv() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // State loading tambahan
  const schoolId = useSchoolId();
  const processFile = async (file: File) => {


    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan!");
      return;
    }

    // Validasi file type
    const isCsv = file.type === "text/csv" || file.name.endsWith(".csv");
    if (!isCsv) {
      toast.error("Hanya file .csv yang diperbolehkan!");
      return;
    }

    // Eksekusi langsung tanpa confirmActionToast
    const loadingToast = toast.loading(`Sedang mengimport data ${file.name}...`);
    setIsUploading(true);

    try {
      await dispatch(importTeacherCsv({
        schoolId: String(schoolId),
        file
      })).unwrap();

      toast.success("Data guru berhasil diimport!", { id: loadingToast });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      toast.error(error?.message || "Gagal mengimport data", { id: loadingToast });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (isUploading) return; // Mencegah drop saat proses berjalan

    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Tambahkan logika download template SoSchool Anda di sini
    toast.success("Mengunduh template CSV...");
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading) setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-[2.5rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center group 
          ${isUploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
          ${dragActive
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 scale-[0.99]'
            : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900'
          }`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv"
          disabled={isUploading}
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        />

        <div className={`p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 mb-6 transition-transform duration-500 ${!isUploading && 'group-hover:scale-110'}`}>
          <HiOutlineCloudArrowUp size={48} className={isUploading ? "animate-bounce" : ""} />
        </div>

        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-2">
          {isUploading ? "Proses Unggah..." : "Unggah File CSV"}
        </h3>

        <p className="text-sm text-slate-500 dark:text-gray-400 max-w-xs mx-auto mb-8 font-medium">
          {isUploading
            ? "Mohon tunggu sebentar, kami sedang memproses data guru SoSchool."
            : "Tarik dan lepas file CSV guru Anda di sini atau klik untuk memilih file."}
        </p>

        <div className="flex gap-3">
          <div className={`flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all ${isUploading ? 'opacity-50' : 'active:scale-95 shadow-indigo-200 dark:shadow-none'}`}>
            {isUploading ? 'Memproses...' : 'Pilih File CSV'}
          </div>

          <button
            type="button"
            disabled={isUploading}
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
          >
            <HiOutlineDocumentText size={16} />
            Template CSV
          </button>
        </div>
      </div>
    </div>
  );
}