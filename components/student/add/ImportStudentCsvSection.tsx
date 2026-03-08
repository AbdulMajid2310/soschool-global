"use client";

import React, { useState, useRef } from "react";
import { api } from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";
import {
  HiOutlineCloudArrowUp,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineArrowDownTray,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export default function ImportStudentCsvSection() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schoolId = sessionStorage.getItem("schoolId");

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
      toast.error("Pilih file dan pastikan konteks sekolah aktif");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        `/school-students/import/${schoolId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      // Backend mengembalikan objek results { total, success, failed, successData, errors }
      setResults(response.data.data);
      toast.success("Proses import selesai!");
      setFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mengunggah file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 rounded-2xl">
                <HiOutlineCloudArrowUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter dark:text-white">
                  Import Massal Siswa
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Status: {uploading ? "Sedang Memproses..." : "Siap Unggah"}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              <HiOutlineArrowDownTray size={18} />
              Template CSV
            </button>
          </div>

          {/* Upload Area */}
          {!results && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-4 border-dashed rounded-4xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer
                ${file ? "border-indigo-500 bg-indigo-50/30" : "border-slate-100 dark:border-slate-800 hover:border-indigo-200"}
              `}
            >
              <input
                title="upload data"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
              {!file ? (
                <>
                  <HiOutlineDocumentText
                    size={40}
                    className="text-slate-300 mb-4"
                  />
                  <p className="text-sm font-bold text-slate-500">
                    Klik untuk pilih file CSV
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <HiOutlineCheckCircle
                    size={40}
                    className="text-indigo-500 mb-2 animate-bounce"
                  />
                  <p className="font-black text-slate-700 dark:text-white italic uppercase">
                    {file.name}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-500/20">
                  <p className="text-[10px] font-black uppercase text-emerald-600 mb-1">
                    Berhasil
                  </p>
                  <p className="text-3xl font-black dark:text-white">
                    {results.success}
                  </p>
                </div>
                <div className="p-6 bg-rose-50 dark:bg-rose-500/10 rounded-3xl border border-rose-100 dark:border-rose-500/20">
                  <p className="text-[10px] font-black uppercase text-rose-600 mb-1">
                    Gagal
                  </p>
                  <p className="text-3xl font-black dark:text-white">
                    {results.failed}
                  </p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                    Total
                  </p>
                  <p className="text-3xl font-black dark:text-white">
                    {results.total}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Success Data List */}
                <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-slate-50 dark:border-slate-800  flex items-center gap-2">
                    <HiOutlineUserGroup className="text-2xl" />
                    <span className="text-sm font-black uppercase tracking-widest ">
                      Siswa Berhasil Diimport
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto scrollbar-hide p-4 space-y-2 custom-scrollbar">
                    {results.successData?.length > 0 ? (
                      results.successData.map((s: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-transparent hover:border-emerald-100"
                        >
                          <div>
                            <p className="text-[11px] font-black uppercase italic dark:text-white">
                              {s.username}
                            </p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                              NIS: {s.nis}
                            </p>
                          </div>
                          <span className="text-[8px] font-black px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md uppercase tracking-tighter italic">
                            {s.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-center py-10 text-slate-400 uppercase italic font-bold">
                        Tidak ada data berhasil
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Log List */}
                <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-slate-50 dark:border-slate-800  flex items-center gap-2">
                    <HiOutlineExclamationTriangle className="text-2xl" />
                    <span className="text-sm font-black uppercase tracking-widest ">
                      Daftar Kesalahan (Error Log)
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {results.errors?.length > 0 ? (
                      results.errors.map((err: any, i: number) => (
                        <div
                          key={i}
                          className="p-3 bg-rose-50/30 dark:bg-rose-500/5 rounded-xl border border-rose-100/50 flex flex-col gap-1"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-rose-600 uppercase italic">
                              Baris {err.baris}
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase">
                              {err.identitas}
                            </span>
                          </div>
                          <p className="text-[10px] text-rose-500 font-medium leading-tight">
                            {err.pesan}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-center py-10 text-slate-400 uppercase italic font-bold">
                        Tidak ada kesalahan
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setResults(null)}
                  className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Unggah File Lain
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        {!results && (
          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-700 transition-all disabled:opacity-30 flex items-center gap-3"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineCloudArrowUp size={20} />
                  Mulai Proses Import
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
