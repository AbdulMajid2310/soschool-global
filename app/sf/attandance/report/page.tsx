"use client";

import React, { useState } from 'react';
import {
    FaGlobe, FaUserGraduate, FaUserTie, FaCheckDouble,
    FaExclamationTriangle, FaFileDownload, FaFilter,
    FaCalendarAlt, FaChartBar, FaUserClock
} from 'react-icons/fa';

// --- DATA MOCK GLOBAL ---
const GLOBAL_SUMMARY = {
    totalPresent: 1240,
    totalAbsent: 42,
    totalLate: 15,
    attendanceRate: 96.5
};

const ATTENDANCE_TREND = [
    { day: 'Sen', rate: 98 },
    { day: 'Sel', rate: 95 },
    { day: 'Rab', rate: 97 },
    { day: 'Kam', rate: 92 },
    { day: 'Jum', rate: 94 },
];

const GlobalAttendanceReport = () => {
    const [dateRange, setDateRange] = useState('Februari 2026');

    return (
        <div className="space-y-10 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen p-4 sm:p-10">

            {/* --- TOP NAV & EXPORT --- */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-indigo-200">
                        <FaGlobe />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Laporan Global</h1>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                            <FaCalendarAlt className="text-indigo-500" /> {dateRange}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                        <FaFilter /> Filter Periode
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-105 transition-all">
                        <FaFileDownload /> Export Full Report (.pdf)
                    </button>
                </div>
            </div>

            {/* --- EXECUTIVE SUMMARY CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReportCard title="Total Kehadiran" value={GLOBAL_SUMMARY.totalPresent} sub="Siswa & Staf" color="indigo" icon={<FaCheckDouble />} />
                <ReportCard title="Tingkat Disiplin" value={`${GLOBAL_SUMMARY.attendanceRate}%`} sub="Rata-rata Global" color="emerald" icon={<FaChartBar />} />
                <ReportCard title="Total Alpa/Bolos" value={GLOBAL_SUMMARY.totalAbsent} sub="Perlu Tindakan" color="rose" icon={<FaExclamationTriangle />} />
                <ReportCard title="Total Terlambat" value={GLOBAL_SUMMARY.totalLate} sub="Bulan Ini" color="amber" icon={<FaUserClock />} />
            </div>

            {/* --- MAIN CONTENT: COMPARISON & TREND --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* 1. SECTOR COMPARISON */}
                <div className="xl:col-span-1 bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Perbandingan Sektor</h3>
                    <div className="space-y-8">
                        <SectorProgress label="Siswa (All Grade)" percentage={94} icon={<FaUserGraduate />} color="bg-blue-500" />
                        <SectorProgress label="Guru & Staf" percentage={98} icon={<FaUserTie />} color="bg-emerald-500" />
                        <SectorProgress label="Karyawan Outsourcing" percentage={89} icon={<FaUserClock />} color="bg-amber-500" />
                    </div>

                    <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-4xl border border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                            * Insight: Tingkat kehadiran Guru lebih stabil 4% dibandingkan Siswa pada periode ini.
                        </p>
                    </div>
                </div>

                {/* 2. ATTENDANCE TREND CHART (SIMULATED) */}
                <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Tren Kehadiran Mingguan</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Target 95%</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between h-64 px-4">
                        {ATTENDANCE_TREND.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-4 w-full">
                                <div className="relative w-12 sm:w-16 group">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all font-bold">
                                        {item.rate}%
                                    </div>
                                    <div
                                        className={`w-full rounded-2xl transition-all duration-1000 ${item.rate >= 95 ? 'bg-indigo-500' : 'bg-rose-400'} group-hover:brightness-110 shadow-lg`}
                                        style={{ height: `${item.rate * 2}px` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- RECENT ANOMALIES (CRITICAL) --- */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-10 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <FaExclamationTriangle className="text-[10rem]" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">Anomali Terdeteksi</h3>
                    <p className="text-slate-400 mb-8 max-w-md text-sm">Sistem mendeteksi penurunan kehadiran yang tidak biasa pada sektor berikut:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-xl font-black">!</div>
                            <div>
                                <p className="font-bold text-rose-400 text-sm">Kelas XII - TKJ 1</p>
                                <p className="text-xs text-slate-300 italic">Penurunan 15% kehadiran pada jam pelajaran Fisika.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-xl font-black">?</div>
                            <div>
                                <p className="font-bold text-amber-400 text-sm">Sektor Kebersihan</p>
                                <p className="text-xs text-slate-300 italic">3 Staf terlambat serentak pada Senin Pagi.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const ReportCard = ({ title, value, sub, color, icon }: any) => {
    const colorSchemes: any = {
        indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20',
        emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
        rose: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20',
        amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-6 ${colorSchemes[color]}`}>
                {icon}
            </div>
            <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{value}</h4>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
            <p className="text-[10px] font-bold text-slate-500 mt-2 italic">{sub}</p>
        </div>
    );
};

const SectorProgress = ({ label, percentage, icon, color }: any) => (
    <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                <span className="text-indigo-500">{icon}</span> {label}
            </div>
            <span className="font-black text-slate-900 dark:text-white">{percentage}%</span>
        </div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
                className={`h-full rounded-full ${color} transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

export default GlobalAttendanceReport;