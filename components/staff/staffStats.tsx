"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { RiUserSharedLine, RiUserForbidLine } from "react-icons/ri";

export default function StaffStats() {
  const { stats, loading } = useAppSelector((state) => state.schoolStaff);

  const statItems = [
    {
      label: "Total Personalia",
      val: stats.total,
      icon: <HiOutlineIdentification className="size-8 opacity-80" />,
      color: "text-indigo-600",
      darkColor: "dark:text-indigo-400",
      accent: "bg-indigo-500",
      description: "Seluruh Staff Terdaftar",
      unit: "Staff",
      percentage: 100,
    },
    {
      label: "Staff Aktif",
      val: stats.active,
      icon: <RiUserSharedLine className="size-8 opacity-80" />,
      color: "text-emerald-600",
      darkColor: "dark:text-emerald-400",
      accent: "bg-emerald-500",
      description: "Sedang Bertugas",
      unit: "Orang",
      percentage: stats.total > 0 ? (stats.active / stats.total) * 100 : 0,
    },
    {
      label: "Nonaktif / Cuti",
      val: stats.inactive,
      icon: <RiUserForbidLine className="size-8 opacity-80" />,
      color: "text-rose-600",
      darkColor: "dark:text-rose-400",
      accent: "bg-rose-500",
      description: "Akses Dinonaktifkan",
      unit: "Staff",
      percentage: stats.total > 0 ? (stats.inactive / stats.total) * 100 : 0,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-44 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map((item, i) => (
        <div
          key={i}
          className="relative overflow-hidden group p-7 rounded-[2.5rem] border border-slate-200 dark:border-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100 dark:hover:shadow-none bg-white/50 dark:bg-slate-900/50"
        >
          <div
            className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full ${item.accent} opacity-5 blur-3xl group-hover:opacity-15 transition-opacity duration-500`}
          />

          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-white/5 shadow-sm">
                <FiTrendingUp size={12} className={item.color} />
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Live Status
                </span>
              </div>
            </div>

            <div className="flex gap-5 mt-6 items-center">
              <div
                className={`flex items-center justify-center size-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-50 dark:border-white/5 ${item.color}`}
              >
                {item.icon}
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em] mb-1">
                  {item.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h2
                    className={`text-4xl font-black ${item.color} ${item.darkColor} tracking-tighter italic`}
                  >
                    {item.val.toLocaleString()}
                  </h2>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-tighter italic">
                    {item.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase italic tracking-wider">
                {item.description}
              </p>

              <div className="h-1.5 flex-1 max-w-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-1.5 flex-1 max-w-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${item.accent} transition-all duration-1000 ease-out progress-bar-fill`}
                    data-progress={Math.round(item.percentage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
