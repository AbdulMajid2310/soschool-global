"use client";

import React, { useState, useRef, useEffect } from "react";
import { api } from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineArrowDownTray,
  HiOutlineUserGroup,
  HiOutlineArrowPath,
} from "react-icons/hi2";

export default function ImportStudentCsvSection() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);

  // Ambil schoolId hanya di sisi client
  useEffect(() => {
    setSchoolId(sessionStorage.getItem("schoolId"));
  }, []);

  // Mapper untuk merubah pesan teknis DB ke bahasa manusia
  const formatErrorMessage = (pesan: string) => {
    if (
      pesan.includes("UQ_fe0bb3f6520ee0469504521e710") ||
      pesan.includes("duplicate key")
    ) {
      return "Siswa ini sudah terdaftar di database (ID/Data Duplikat).";
    }
    return pesan;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv"))
    ) {
      setFile(selectedFile);
      setResults(null);
    } else {
      toast.error("Hanya file CSV yang diizinkan");
    }
  };

  const handleUpload = async () => {
    if (!file || !schoolId) {
      toast.error(
        !schoolId
          ? "Konteks sekolah tidak ditemukan"
          : "Pilih file terlebih dahulu",
      );
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const toastId = toast.loading("Memproses data siswa...");

    try {
      const response = await api.post(
        `/school-students/import/${schoolId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setResults(response.data.data);
      toast.success("Proses import selesai!", { id: toastId });
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengunggah file", {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-500">
        {/* Header Section */}
        <div className="p-8 border-b border-slate-50 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-3xl shadow-sm">
                <HiOutlineCloudArrowUp size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">
                  Import Massal Siswa
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  {results
                    ? "Verifikasi Sistem Selesai"
                    : uploading
                      ? "Sistem sedang bekerja..."
                      : "Siap menerima data CSV"}
                </p>
              </div>
            </div>
            {!results && (
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                <HiOutlineArrowDownTray size={18} />
                Template CSV
              </button>
            )}
            {results && (
              <button
                onClick={() => setResults(null)}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:bg-indigo-100 transition-all"
              >
                <HiOutlineArrowPath size={18} /> Unggah Lagi
              </button>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* 1. DROPZONE (Hanya tampil jika belum ada hasil) */}
          {!results && (
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`relative border-4 border-dashed rounded-[3rem] p-16 flex flex-col items-center justify-center transition-all cursor-pointer
                ${file ? "border-indigo-500 bg-indigo-50/30" : "border-slate-100 dark:border-slate-800 hover:border-indigo-300 bg-slate-50/30"}
                ${uploading ? "opacity-50 cursor-not-allowed scale-[0.98]" : "hover:scale-[1.01]"}
              `}
            >
              <input
                title="upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
              {!file ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-4xl shadow-xl flex items-center justify-center mx-auto mb-6">
                    <HiOutlineDocumentText
                      size={40}
                      className="text-slate-300"
                    />
                  </div>
                  <p className="text-sm font-black uppercase tracking-tighter text-slate-500 dark:text-slate-400">
                    Klik atau seret file CSV ke sini
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-4xl shadow-xl shadow-emerald-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <HiOutlineCheckCircle size={45} />
                  </div>
                  <p className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tight text-center">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase mt-2 italic">
                    File siap dieksekusi
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 2. RESULTS DISPLAY (Statistik & Grid Data) */}
          {results && (
            <div className="space-y-10 animate-in zoom-in-95 duration-500">
              {/* Statistik Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-emerald-50 dark:bg-emerald-500/5 rounded-[2.5rem] border-2 border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                  <p className="text-[11px] font-black uppercase text-emerald-600 mb-2 italic">
                    Berhasil Import
                  </p>
                  <p className="text-5xl font-black dark:text-white">
                    {results.success}
                  </p>
                </div>
                <div className="p-8 bg-rose-50 dark:bg-rose-500/5 rounded-[2.5rem] border-2 border-rose-100 dark:border-rose-500/20 shadow-sm">
                  <p className="text-[11px] font-black uppercase text-rose-600 mb-2 italic">
                    Gagal / Error
                  </p>
                  <p className="text-5xl font-black dark:text-white">
                    {results.failed}
                  </p>
                </div>
                <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 shadow-sm">
                  <p className="text-[11px] font-black uppercase text-slate-400 mb-2 italic">
                    Total Baris File
                  </p>
                  <p className="text-5xl font-black dark:text-white">
                    {results.total}
                  </p>
                </div>
              </div>

              {/* Data Detail Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LIST SUCCESS */}
                <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <HiOutlineUserGroup
                      className="text-emerald-500"
                      size={24}
                    />
                    <span className="text-xs font-black uppercase tracking-[0.2em] dark:text-white">
                      Data Berhasil
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    {results.successData?.length > 0 ? (
                      results.successData.map((s: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800"
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase italic dark:text-white tracking-tight">
                              {s.username}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                              NIS: {s.nis || "-"}
                            </span>
                          </div>
                          <span className="text-[9px] font-black px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg italic uppercase">
                            Success
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 opacity-30 font-black uppercase text-xs italic tracking-widest">
                        Kosong
                      </div>
                    )}
                  </div>
                </div>

                {/* LIST ERROR */}
                <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                    <HiOutlineExclamationTriangle
                      className="text-rose-500"
                      size={24}
                    />
                    <span className="text-xs font-black uppercase tracking-[0.2em] dark:text-white">
                      Log Kesalahan
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    {results.errors?.length > 0 ? (
                      results.errors.map((err: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border-l-4 border-l-rose-500 border border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black text-rose-600 italic uppercase tracking-tighter">
                              Baris {err.baris}
                            </span>
                            <span className="text-sm font-black dark:text-white uppercase italic tracking-tight">
                              {err.identitas}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium italic leading-relaxed uppercase">
                            {formatErrorMessage(err.pesan)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 opacity-30 font-black uppercase text-xs italic tracking-widest text-emerald-500">
                        Aman
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. FOOTER ACTION (Hanya jika belum import) */}
        {!results && (
          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-12 py-5 bg-indigo-600 text-white rounded-4xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center gap-4 italic"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mengeksekusi Data...
                </>
              ) : (
                <>
                  <HiOutlineCloudArrowUp size={20} />
                  Mulai Import Massal
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
