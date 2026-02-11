"use client";

import React from "react";
import { FiUsers, FiUserCheck, FiUserX, FiTrendingUp } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiChalkboardTeacher } from "react-icons/pi";

export default function TeacherStats() {
    const { stats, loading } = useAppSelector((state) => state.teacher);

    const statItems = [
        {
            label: "Total Pengajar",
            val: stats.total,
            icon: <FaChalkboardTeacher size={60} />,
            color: "text-emerald-600",
            darkColor: "dark:text-emerald-400",
            bg: "bg-emerald-50/50",
            iconBg: "bg-emerald-100",
            accent: "bg-emerald-500",
            description: "Data keseluruhan",
        },
        {
            label: "Status Aktif",
            val: stats.active,
            icon: <GiTeacher size={60} />,
            color: "text-emerald-600",
            darkColor: "dark:text-emerald-400",
            bg: "bg-emerald-50/50",
            iconBg: "bg-emerald-100",
            accent: "bg-emerald-500",
            description: "Akses penuh",
        },
        {
            label: "Nonaktif",
            val: stats.inactive,
            icon: <PiChalkboardTeacher size={60} />,
            color: "text-rose-600",
            darkColor: "dark:text-rose-400",
            bg: "bg-rose-50/50",
            iconBg: "bg-rose-100",
            accent: "bg-rose-500",
            description: "Tanpa akses",
        },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statItems.map((item, i) => (
                <div
                    key={i}
                    className={`relative overflow-hidden group p-6 rounded-[2.5rem] border border-white dark:border-gray-800 ${item.bg} backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-none`}
                >
                    {/* Animated Gradient Aksen */}
                    <div
                        className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full ${item.accent} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start">

                            <div className="flex items-center gap-1 px-2 py-1 bg-white/50 dark:bg-gray-800 rounded-full border border-white dark:border-gray-700 shadow-sm">
                                <FiTrendingUp size={10} className={item.color} />
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Live</span>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-5">
                            <div>

                                <div className={`flex text-4xl items-center justify-center size-12 rounded-2xl  shadow-inner`}>
                                    {item.icon}
                                </div>
                            </div>
                            <div className="">
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    {item.label}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <h2 className={`text-4xl font-black ${item.color} ${item.darkColor} tracking-tight`}>
                                        {item.val.toLocaleString()}
                                    </h2>
                                    <span className="text-sm font-semibold text-gray-400">Guru</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase italic">
                                {item.description}
                            </p>
                            <div className={`h-1.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden`}>
                                <div
                                    className={`h-full ${item.accent} transition-all duration-1000 ease-out`}
                                    style={{ width: stats.total > 0 ? `${(item.val / stats.total) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}