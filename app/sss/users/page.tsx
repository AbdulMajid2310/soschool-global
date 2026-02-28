"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    HiOutlineUsers,
    HiOutlineAcademicCap,
    HiOutlineUserGroup,
    HiOutlineBriefcase,
    HiOutlineArrowTrendingUp,
    HiOutlineArrowTrendingDown
} from "react-icons/hi2";
import {
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { getUserStats } from '@/redux/features/user/thunk';
import { useRouter } from 'next/navigation';

export default function UserMonitoringSection() {
    const dispatch = useAppDispatch();
    const { stats, loading } = useAppSelector((state) => state.users);
    const router = useRouter()

    useEffect(() => {
        dispatch(getUserStats());
    }, [dispatch]);

    // Format data untuk Chart dari State Redux
    const chartData = stats?.trend || [];
    const pieData = stats?.distribution.map(d => ({
        name: d.role,
        value: d.count,
        color: d.role === 'STUDENT' ? '#10b981' : d.role === 'TEACHER' ? '#f59e0b' : d.role === 'STAFF' ? '#f43f5e' : '#6366f1'
    })) || [];

    // Tampilan Loading (Skeleton)
    if (loading && !stats) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800/50 rounded-4xl" />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-75 bg-slate-100 dark:bg-slate-800/50 rounded-4xl" />
                    <div className="h-75 bg-slate-100 dark:bg-slate-800/50 rounded-4xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-4 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                {/* Left Side: Title & Subtitle */}
                <div className="space-y-1">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                        User <span className="text-indigo-600">Analytics</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="w-8 h-2 bg-indigo-500 rounded-full" />
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic">
                            Dashboard Monitoring SoSchool
                        </p>
                    </div>
                </div>

                {/* Right Side: Action Button */}
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("users/list")} className="group relative px-6 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <HiOutlineUserGroup size={20} />
                            </div>
                            <span className="text-xs font-black uppercase italic tracking-widest dark:text-white">
                                List Pengguna
                            </span>
                        </div>
                        {/* Dekorasi Glow saat Hover */}
                        <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total User', value: stats?.summary.totalUser, icon: <HiOutlineUsers size={24} />, color: 'bg-indigo-500' },
                    { label: 'Verified', value: stats?.summary.verifiedUser, icon: <HiOutlineAcademicCap size={24} />, color: 'bg-emerald-500' },
                    { label: 'Active', value: stats?.summary.activeUser, icon: <HiOutlineUserGroup size={24} />, color: 'bg-amber-500' },
                    { label: 'Pending', value: stats?.summary.pendingUser, icon: <HiOutlineBriefcase size={24} />, color: 'bg-rose-500' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 ${stat.color} text-white rounded-2xl shadow-lg`}>
                                {stat.icon}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">
                                <HiOutlineArrowTrendingUp />
                                LIVE
                            </div>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</p>
                        <h3 className="text-2xl font-black dark:text-white mt-2 group-hover:translate-x-1 transition-transform origin-left italic">
                            {stat.value?.toLocaleString() || 0}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mb-8">
                        <h4 className="text-lg font-black italic uppercase dark:text-white leading-none">Trend Pertumbuhan</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase italic mt-1 tracking-widest">Aktivitas 6 Bulan Terakhir</p>
                    </div>
                    <div className="h-75 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
                                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <div className="w-full mb-6 text-left">
                        <h4 className="text-lg font-black italic uppercase dark:text-white leading-none">Distribusi Role</h4>
                    </div>
                    <div className="h-62.5 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={10}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full space-y-4 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-xs font-black dark:text-white italic">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}