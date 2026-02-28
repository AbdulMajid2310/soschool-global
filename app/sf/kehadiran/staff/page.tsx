"use client";

import React, { useMemo } from 'react';
import {
    FaUserTie, FaClock, FaCalendarCheck, FaExclamationCircle,
    FaArrowUp, FaArrowDown, FaBriefcase, FaDownload,
    FaHistory, FaChartPie, FaCheckCircle
} from 'react-icons/fa';

// --- DATA MOCK PEGAWAI ---
const MOCK_DEPT_STATS = [
    { id: 1, dept: 'Tenaga Pengajar (Guru)', total: 45, onTime: 38, late: 5, absent: 2, avgHours: 8.5 },
    { id: 2, dept: 'Administrasi & TU', total: 12, onTime: 12, late: 0, absent: 0, avgHours: 8.0 },
    { id: 3, dept: 'Kebersihan & Keamanan', total: 8, onTime: 6, late: 2, absent: 0, avgHours: 9.0 },
];

const MOCK_LATE_EMPLOYEES = [
    { id: 'P01', name: 'Drs. Mulyadi', role: 'Guru Fisika', lateCount: 4, avgDelay: '15m', status: 'Teguran Lisan' },
    { id: 'P02', name: 'Santi Susanti, S.Pd', role: 'Guru Biologi', lateCount: 3, avgDelay: '10m', status: 'Normal' },
    { id: 'P03', name: 'Rahmat Hidayat', role: 'Staf IT', lateCount: 7, avgDelay: '25m', status: 'SP 1' },
];

const EmployeeAttendanceAnalytics = () => {
    return (
        <div className="space-y-10 pb-20 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen p-4 sm:p-8">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-[0.2em]">
                        <div className="w-8 h-1 bg-emerald-600 rounded-full" /> Staff Analytics
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Analisis Pegawai</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Monitoring kedisiplinan dan produktivitas staf SoSchool.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                        <FaHistory /> Riwayat Presensi
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                        <FaDownload /> Cetak Payroll
                    </button>
                </div>
            </div>

            {/* --- TOP INSIGHTS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InsightCard
                    title="Kehadiran Staf"
                    value="98.1%"
                    icon={<FaCheckCircle className="text-emerald-500" />}
                    trend="up"
                    color="emerald"
                />
                <InsightCard
                    title="Rata-rata Terlambat"
                    value="12 Menit"
                    icon={<FaClock className="text-amber-500" />}
                    trend="down"
                    color="amber"
                />
                <InsightCard
                    title="Staf Cuti/Izin"
                    value="3"
                    icon={<FaCalendarCheck className="text-blue-500" />}
                    trend="stable"
                    color="blue"
                />
                <InsightCard
                    title="Produktivitas"
                    value="8.2h"
                    icon={<FaBriefcase className="text-indigo-500" />}
                    trend="up"
                    color="indigo"
                />
            </div>

            {/* --- DEPARTEMEN ANALYTICS --- */}
            <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl">
                            <FaChartPie className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Performa Per Departemen</h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                                <th className="px-8 py-5">Departemen</th>
                                <th className="px-8 py-5 text-center">Total Staf</th>
                                <th className="px-8 py-5 text-center text-emerald-600">Tepat Waktu</th>
                                <th className="px-8 py-5 text-center text-amber-600">Terlambat</th>
                                <th className="px-8 py-5 text-center">Rata-rata Jam Kerja</th>
                                <th className="px-8 py-5 text-right">Skor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                            {MOCK_DEPT_STATS.map((d) => (
                                <tr key={d.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all">
                                    <td className="px-8 py-6 font-bold text-slate-800 dark:text-white">{d.dept}</td>
                                    <td className="px-8 py-6 text-center font-medium">{d.total}</td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="font-black text-emerald-600">{d.onTime}</span>
                                            <div className="w-16 h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${(d.onTime / d.total) * 100}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center font-black text-amber-600">{d.late}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold">
                                            {d.avgHours} jam/hari
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="font-black text-slate-900 dark:text-white">
                                            {((d.onTime / d.total) * 10).toFixed(1)}/10
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- ACTIONABLE STAFF LIST --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TERLAMBAT TERBANYAK */}
                <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl">
                            <FaExclamationCircle className="text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-900 dark:text-white">Review Kedisiplinan</h3>
                            <p className="text-sm text-slate-500 font-medium">Staf dengan tingkat keterlambatan tertinggi minggu ini.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_LATE_EMPLOYEES.map(emp => (
                            <div key={emp.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl group border border-transparent hover:border-amber-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center font-black text-indigo-600 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        {emp.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-slate-100">{emp.name}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{emp.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-amber-600">{emp.lateCount}x</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Terlambat</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STATUS & TINDAKAN */}
                <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-2xl">
                            <FaUserTie className="text-2xl" />
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-900 dark:text-white">Status Kepegawaian</h3>
                            <p className="text-sm text-slate-500 font-medium italic">Tindakan administratif berdasarkan presensi.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_LATE_EMPLOYEES.map(emp => (
                            <div key={emp.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${emp.status === 'SP 1' ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`} />
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{emp.name}</p>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${emp.status === 'SP 1' ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-600'}`}>
                                            {emp.status}
                                        </span>
                                    </div>
                                </div>
                                <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                                    Detail
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---
const InsightCard = ({ title, value, icon, trend, color }: any) => {
    const trendIcons: any = {
        up: <FaArrowUp className="text-emerald-500 text-xs" />,
        down: <FaArrowDown className="text-rose-500 text-xs" />,
        stable: <div className="w-2 h-0.5 bg-slate-300 rounded-full" />
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm group hover:ring-2 hover:ring-emerald-500/50 transition-all">
            <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                    {icon}
                </div>
                {trendIcons[trend]}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
        </div>
    );
};

export default EmployeeAttendanceAnalytics;