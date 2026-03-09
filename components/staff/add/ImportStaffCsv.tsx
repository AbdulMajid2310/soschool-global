"use client";

import React, { useState, useRef } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineUserGroup,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";

interface ImportResult {
  total: number;
  success: number;
  failed: number;
  successData?: any[];
  errors: Array<{ baris: number; identitas: string; pesan: string }>;
}

export default function ImportStaffCsv() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const schoolId = useSchoolId();

  // Mapper pesan error database ke bahasa user
  const formatErrorMessage = (pesan: string) => {
    if (!pesan) return "Kesalahan tidak diketahui";
    const lowPesan = pesan.toLowerCase();
    if (
      lowPesan.includes("uq_") ||
      lowPesan.includes("duplicate key") ||
      lowPesan.includes("already exists")
    ) {
      return "Staff ini sudah terdaftar (NIP/NIK Duplikat).";
    }
    if (lowPesan.includes("invalid input syntax")) {
      return "Format data pada baris ini tidak valid.";
    }
    return pesan;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isCsv =
      selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv");

    if (isCsv) {
      setFile(selectedFile);
      setResult(null);
    } else {
      toast.error("Format file harus .csv");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Silahkan pilih file terlebih dahulu");
    if (!schoolId)
      return toast.error("ID Sekolah tidak ditemukan. Coba refresh halaman.");

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const toastId = toast.loading("Sedang memproses database staff...");

    try {
      const response = await api.post(
        `/school-staffs/import-csv/${schoolId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          // Timeout diperpanjang jika data ribuan
          timeout: 60000,
        },
      );

      if (response.data.success) {
        setResult(response.data.data);
        toast.success("Proses import selesai!", { id: toastId });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Terjadi kesalahan sistem";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      {/* 1. HEADER */}
      {!result && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[3rem] shadow-sm flex flex-col md:flex-row gap-8 items-start">
          <div className="p-5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-4xl">
            <HiOutlineIdentification size={40} />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                Import Database Staff
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                SoSchool Staff Synchronization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-tight text-slate-500">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Kolom Wajib: Nama, NIP, NIK, Jabatan
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Separator: Titik Koma (;) atau Koma (,)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DROPZONE */}
      {!result && (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`group relative border-4 border-dashed rounded-[4rem] p-16 flex flex-col items-center justify-center transition-all cursor-pointer bg-white dark:bg-slate-900
            ${file ? "border-emerald-500 bg-emerald-50/20 shadow-none" : "border-slate-100 dark:border-slate-800 hover:border-emerald-400 shadow-xl shadow-slate-200/50"}`}
        >
          <input
            title="upload"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />

          <div
            className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-6 transition-all shadow-2xl ${file ? "bg-emerald-600 text-white animate-pulse" : "bg-slate-50 dark:bg-slate-800 text-slate-300 group-hover:scale-110"}`}
          >
            {file ? (
              <HiOutlineDocumentText size={48} />
            ) : (
              <HiOutlineCloudArrowUp size={48} />
            )}
          </div>

          <div className="text-center">
            <h4 className="text-lg font-black uppercase italic dark:text-white tracking-tight">
              {file ? file.name : "Pilih atau Seret File CSV"}
            </h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-widest">
              Maks: 5MB • Pastikan Header CSV sesuai
            </p>
          </div>

          {file && !isUploading && (
            <button
              title="hapus"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-8 right-8 p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
              <HiOutlineXMark size={24} />
            </button>
          )}

          {file && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUpload();
              }}
              disabled={isUploading}
              className="mt-10 px-12 py-5 bg-emerald-600 text-white rounded-4xl text-xs font-black uppercase italic tracking-widest shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isUploading ? "Mengeksekusi..." : "Mulai Import Data"}
            </button>
          )}
        </div>
      )}

      {/* 3. REPORT SECTION */}
      {result && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
            <div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-emerald-600 leading-none">
                Hasil Sinkronisasi
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                Analisis Data Selesai
              </p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-slate-800 text-white text-[10px] font-black uppercase italic rounded-2xl flex items-center gap-2 hover:bg-black transition-all"
            >
              <HiOutlineArrowPath size={18} /> Upload File Lain
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Total Data",
                val: result.total,
                color: "text-slate-800",
                bg: "bg-white border-slate-100",
              },
              {
                label: "Sukses",
                val: result.success,
                color: "text-emerald-600",
                bg: "bg-white border-emerald-100 shadow-emerald-100/50",
              },
              {
                label: "Gagal",
                val: result.failed,
                color: "text-rose-600",
                bg: "bg-white border-rose-100 shadow-rose-100/50",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[3rem] border-2 shadow-sm dark:bg-slate-900 dark:border-slate-800 ${item.bg}`}
              >
                <p
                  className={`text-[11px] font-black uppercase mb-2 tracking-widest ${item.color} italic`}
                >
                  {item.label}
                </p>
                <p
                  className={`text-5xl font-black italic tracking-tighter dark:text-white ${item.color}`}
                >
                  {item.val}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* List Sukses */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 bg-emerald-50/50 dark:bg-emerald-500/5 border-b border-emerald-100 dark:border-emerald-500/10 flex items-center gap-3">
                <HiOutlineUserGroup className="text-emerald-600" size={24} />
                <span className="text-xs font-black uppercase italic tracking-widest text-emerald-700 dark:text-emerald-400">
                  Data Sukses
                </span>
              </div>
              <div className="max-h-100 overflow-y-auto scrollbar-hide p-6 space-y-3">
                {result.success > 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                      <HiOutlineUserGroup size={32} />
                    </div>
                    <p className="font-black uppercase text-[10px] italic tracking-widest text-emerald-600">
                      {result.success} Staff Baru Berhasil Diimpor
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-20 opacity-20 font-black uppercase text-xs italic">
                    Kosong
                  </div>
                )}
              </div>
            </div>

            {/* Log Gagal */}
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 bg-rose-50/50 dark:bg-rose-500/5 border-b border-rose-100 dark:border-rose-500/10 flex items-center gap-3">
                <HiOutlineExclamationTriangle
                  className="text-rose-600"
                  size={24}
                />
                <span className="text-xs font-black uppercase italic tracking-widest text-rose-700 dark:text-rose-400">
                  Log Kesalahan
                </span>
              </div>
              <div className="max-h-100 scrollbar-hide overflow-y-auto p-6 space-y-3">
                {result.errors.length > 0 ? (
                  result.errors.map((err, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-l-rose-500 border border-slate-100 dark:border-slate-700 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-rose-600 italic uppercase">
                          Baris #{err.baris}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {err.identitas}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-bold uppercase italic">
                        {formatErrorMessage(err.pesan)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 opacity-20 font-black uppercase text-xs italic text-emerald-500">
                    Tidak ada error
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
