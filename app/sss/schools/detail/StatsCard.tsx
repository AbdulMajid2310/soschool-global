"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface StatCardProps {
    icon: React.ReactElement;
    label: string;
    value: number | string;
    color: string;
    href: string;
}

function StatCard({ icon, label, value, color, href }: StatCardProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(href)}
            className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-xl p-7 rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer overflow-hidden"
        >
            {/* Glow Effect on Hover */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/15 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 ${color} ring-1 ring-slate-200/50 dark:ring-white/5 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                    {React.cloneElement(icon as React.ReactElement<any>, {
                        size: 26,
                        className: "drop-shadow-sm"
                    })}
                </div>

                <p className="text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-[0.15em] mb-2">
                    {label}
                </p>

                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-slate-800 dark:text-white leading-none tracking-tighter">
                        {typeof value === "number" ? value.toLocaleString() : value}
                    </p>
                    {/* Opsional: Indikator kecil jika ingin tambah konteks */}
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700 opacity-50" />
        </div>
    );
}

export default StatCard;