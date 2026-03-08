"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowUpRight, FiTrendingUp } from "react-icons/fi";
import { IconBaseProps } from "react-icons";

// Definisikan Union Type untuk warna agar Type-Safe
type StatColor = "blue" | "emerald" | "violet" | "amber" | "rose" | "purple";

interface StatCardProps {
  icon: React.ReactElement<IconBaseProps>;
  label: string;
  value: number | string;
  color: StatColor;
  href: string;
  trend?: string; // Tambahkan opsional tren (misal: "+12%")
}

function StatCard({ icon, label, value, color, href, trend }: StatCardProps) {
  const router = useRouter();

  // Mapping class Tailwind secara eksplisit agar terbaca oleh PurgeCSS
  const styles = {
    blue: {
      border: "group-hover:border-blue-500/50",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      bar: "bg-blue-600 dark:bg-blue-500",
    },
    emerald: {
      border: "group-hover:border-emerald-500/50",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-emerald-600 dark:bg-emerald-500",
    },
    violet: {
      border: "group-hover:border-violet-500/50",
      iconBg: "bg-violet-50 dark:bg-violet-900/20",
      text: "text-violet-600 dark:text-violet-400",
      bar: "bg-violet-600 dark:bg-violet-500",
    },
    amber: {
      border: "group-hover:border-amber-500/50",
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      bar: "bg-amber-600 dark:bg-amber-500",
    },
    rose: {
      border: "group-hover:border-rose-500/50",
      iconBg: "bg-rose-50 dark:bg-rose-900/20",
      text: "text-rose-600 dark:text-rose-400",
      bar: "bg-rose-600 dark:bg-rose-500",
    },
    purple: {
      border: "group-hover:border-purple-500/50",
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      bar: "bg-purple-600 dark:bg-purple-500",
    },
  };

  const currentStyle = styles[color];

  return (
    <div
      onClick={() => router.push(href)}
      className={`group relative bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-40 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none ${currentStyle.border}`}
    >
      <div className="flex justify-between items-start">
        {/* Ikon dengan Background Soft */}
        <div
          className={`p-3 rounded-2xl ${currentStyle.iconBg} ${currentStyle.text} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
        >
          {React.cloneElement(icon, { size: 22 })}
        </div>

        {/* Badge Tren Opsional */}
        {trend && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
            <FiTrendingUp size={10} />
            {trend}
          </div>
        )}
      </div>

      <div className="mt-4 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.15em] mb-1">
              {label}
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {typeof value === "number"
                ? value.toLocaleString("id-ID")
                : value}
            </h3>
          </div>

          {/* Micro Visualizer (Murni Tailwind, No Inline Style) */}
          <div className="flex items-end gap-1 h-8 mb-1">
            <div
              className={`w-1.5 h-3 rounded-full ${currentStyle.bar} opacity-20 group-hover:h-5 transition-all duration-300`}
            />
            <div
              className={`w-1.5 h-5 rounded-full ${currentStyle.bar} opacity-20 group-hover:h-8 transition-all duration-500`}
            />
            <div
              className={`w-1.5 h-4 rounded-full ${currentStyle.bar} opacity-20 group-hover:h-6 transition-all duration-400`}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Icon */}
      <div className="absolute top-4 right-4 p-1.5 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300">
        <FiArrowUpRight size={18} />
      </div>
    </div>
  );
}

export default StatCard;
