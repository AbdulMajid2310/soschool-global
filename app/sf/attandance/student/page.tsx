"use client";

import React, { useMemo } from 'react';
import {
    FaUsers, FaUserCheck, FaUserTimes, FaUserClock,
    FaBookOpen, FaUserSlash, FaExclamationTriangle,
    FaArrowUp, FaArrowDown, FaCalendarCheck, FaDownload
} from 'react-icons/fa';

// --- DATA MOCK YANG LEBIH KONKRET ---
const MOCK_SUBJECT_STATS = [
    { id: 1, subject: 'Matematika', grade: 'X', sessions: 24, present: 850, permit: 20, absent: 32, trend: 'up' },
    { id: 2, subject: 'Bahasa Inggris', grade: 'X', sessions: 20, present: 700, permit: 15, absent: 12, trend: 'down' },
    { id: 3, subject: 'Fisika', grade: 'XI', sessions: 18, present: 540, permit: 30, absent: 45, trend: 'stable' },
];

const MOCK_AT_RISK_STUDENTS = [
    { id: 'S01', name: 'Andi Pratama', class: 'XI - IPS 1', absent: 8, permit: 3, lastAbsent: '2026-02-12', severity: 'high' },
    { id: 'S02', name: 'Siti Aminah', class: 'X - IPA 2', absent: 5, permit: 12, lastAbsent: '2026-02-15', severity: 'medium' },
    { id: 'S03', name: 'Budi Santoso', class: 'XII - TKJ 1', absent: 10, permit: 1, lastAbsent: '2026-02-10', severity: 'critical' },
];

const AttendanceAnalytics = () => {
    // Hitung ringkasan total untuk Top Cards
    const summary = useMemo(() => {
        const totalAbsent = MOCK_SUBJECT_STATS.reduce((acc, curr) => acc + curr.absent, 0);
        const totalPresent = MOCK_SUBJECT_STATS.reduce((acc, curr) => acc + curr.present, 0);
        return { totalAbsent, totalPresent };
    }, []);

    return (
        <div className="space-y-10 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen p-4 sm:p-8">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-[0.2em]">
                        <div className="w-8 h-1 bg-indigo-600 rounded-full" /> Dashboard Admin
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Analisis Kehadiran</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Laporan kumulatif pertemuan dan tingkat absensi siswa.</p>
                </div>
                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all active:scale-95">
                    <FaDownload className="text-indigo-600" /> Export Laporan .xlsx
                </button>
            </div>

            {/* --- SECTION 1: TOP INSIGHT CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InsightCard
                    title="Rata-rata Kehadiran"
                    value="94.2%"
                    desc="Meningkat 2% dari bulan lalu"
                    icon={<FaUserCheck className="text-emerald-500" />}
                    trend="up"
                />
                <InsightCard
                    title="Total Alpa Kumulatif"
                    value={summary.totalAbsent}
                    desc="Total dari semua mata pelajaran"
                    icon={<FaUserSlash className="text-rose-500" />}
                    trend="down"
                />
                <InsightCard
                    title="Pertemuan Selesai"
                    value="62"
                    desc="Dari total 120 sesi semester ini"
                    icon={<FaCalendarCheck className="text-blue-500" />}
                    trend="stable"
                />
            </div>

            {/* --- SECTION 2: PER MATA PELAJARAN (ANALISIS KONKRET) --- */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
                        <FaBookOpen className="text-white w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white">Statistik Per Mata Pelajaran</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {MOCK_SUBJECT_STATS.map((sub) => {
                        const attendanceRate = ((sub.present / (sub.present + sub.permit + sub.absent)) * 100).toFixed(1);
                        return (
                            <div key={sub.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all border-b-4 border-b-indigo-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kelas {sub.grade}</p>
                                        <h4 className="font-black text-xl text-slate-900 dark:text-white">{sub.subject}</h4>
                                    </div>
                                    <div className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                        {sub.sessions} Sesi
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <p className="text-sm font-bold text-slate-500">Rate Kehadiran</p>
                                        <p className="text-lg font-black text-slate-900 dark:text-white">{attendanceRate}%</p>
                                    </div>
                                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${Number(attendanceRate) < 90 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${attendanceRate}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 pt-2">
                                        <MiniStat label="Hadir" value={sub.present} color="emerald" />
                                        <MiniStat label="Izin" value={sub.permit} color="amber" />
                                        <MiniStat label="Alpa" value={sub.absent} color="rose" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- SECTION 3: AT RISK STUDENTS (ACTIONABLE) --- */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* LIST ALPA */}
                <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-2xl">
                                <FaUserSlash className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-900 dark:text-white">Indikasi Alpa Tinggi</h3>
                                <p className="text-sm text-slate-500 font-medium italic">Siswa dengan akumulasi alpa {'>'} 5 Sesi</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_AT_RISK_STUDENTS.sort((a, b) => b.absent - a.absent).map(student => (
                            <div key={student.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-transparent hover:border-rose-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 border border-slate-200 dark:border-slate-700">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${student.severity === 'critical' ? 'bg-rose-600 animate-pulse' : 'bg-amber-500'}`} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-slate-100">{student.name}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{student.class} • Terakhir: {student.lastAbsent}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-black text-rose-600">{student.absent}</span>
                                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Sesi Alpa</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* LIST IZIN (POTENSI MASALAH) */}
                <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl">
                                <FaExclamationTriangle className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-900 dark:text-white">Frekuensi Izin Tinggi</h3>
                                <p className="text-sm text-slate-500 font-medium italic">Siswa yang memerlukan validasi surat dokter/ortu</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_AT_RISK_STUDENTS.sort((a, b) => b.permit - a.permit).map(student => (
                            <div key={student.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl group transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-amber-100">
                                        {student.permit}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-slate-100">{student.name}</p>
                                        <p className="text-xs text-slate-500 font-medium">Total Izin Semester Ini</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white transition-all">
                                    Cek Surat
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENT: INSIGHT CARD ---
const InsightCard = ({ title, value, desc, icon, trend }: any) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm group hover:ring-2 hover:ring-indigo-500 transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            {trend === 'up' && <FaArrowUp className="text-emerald-500" />}
            {trend === 'down' && <FaArrowDown className="text-rose-500" />}
        </div>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{value}</h3>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{desc}</p>
    </div>
);

// --- SUB-COMPONENT: MINI STAT ---
const MiniStat = ({ label, value, color }: { label: string, value: number, color: 'emerald' | 'amber' | 'rose' }) => {
    const colors = {
        emerald: 'text-emerald-600',
        amber: 'text-amber-600',
        rose: 'text-rose-600'
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-700">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
            <p className={`text-sm font-black ${colors[color]}`}>{value}</p>
        </div>
    );
};

export default AttendanceAnalytics;