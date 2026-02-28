"use client";

import { useState } from "react";
import { FiCloudLightning, FiFile, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { importStaffExcel } from "@/redux/features/staff/thunks";

export default function ImportStaffExcel() {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);
    const { profile } = useAppSelector((state) => state.auth);
    const { loading, importReport } = useAppSelector((state) => state.schoolStaff);

    const handleImport = async () => {
        if (!file || !profile?.school?.schoolId) return;
        try {
            await dispatch(importStaffExcel({ file, schoolId: profile.school.schoolId })).unwrap();
            toast.success("Proses import selesai!");
        } catch (err: any) {
            toast.error(err || "Gagal mengunggah file");
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <div className="inline-flex p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2.5rem] text-indigo-600">
                    <FiCloudLightning size={40} strokeWidth={2.5} className="animate-pulse" />
                </div>
                <div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Bulk Import Excel</h2>
                    <p className="text-gray-500 font-bold text-sm">Upload file .xlsx dengan format kolom yang sesuai</p>
                </div>
            </div>

            <div className="relative group border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] p-12 transition-all hover:border-indigo-500/30 flex flex-col items-center">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FiFile size={48} className="text-gray-300 group-hover:text-indigo-400 transition-colors mb-4" />
                <p className="font-black uppercase text-xs tracking-widest text-gray-400">
                    {file ? file.name : "Klik atau seret file kesini"}
                </p>
            </div>

            <button
                onClick={handleImport}
                disabled={!file || loading}
                className="w-full py-5 bg-emerald-500 text-white rounded-4xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 dark:shadow-none disabled:opacity-30 disabled:grayscale"
            >
                {loading ? "Sedang Mengimpor..." : "Mulai Upload Data"}
            </button>

            {importReport && (
                <div className="mt-6 p-6 bg-slate-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-emerald-600 mb-4 font-black uppercase text-xs tracking-widest">
                        <FiCheckCircle strokeWidth={3} /> Hasil Laporan Terakhir
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl"><p className="text-xl font-black">{importReport.total}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Total</p></div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl text-emerald-500"><p className="text-xl font-black">{importReport.success}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Sukses</p></div>
                        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl text-rose-500"><p className="text-xl font-black">{importReport.failed}</p><p className="text-[10px] font-bold text-gray-400 uppercase">Gagal</p></div>
                    </div>
                </div>
            )}
        </div>
    );
}