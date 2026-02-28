"use client";

import React from "react";
import {
    FiCamera,
    FiGlobe,
    FiMapPin,
    FiUserPlus,
    FiMessageSquare,
    FiMoreHorizontal,
    FiZap,
    FiUsers,
} from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";

export default function HeaderProfile({ isOwnProfile = true }) {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { id: "posts", label: "Insights", path: "/siswa/profile" },
        { id: "about", label: "Postingan", path: "/siswa/profile/postingan" },
        { id: "projects", label: "Galeri", path: "/siswa/profile/galeri" },
    ];

    return (
        <section className="w-full md:pt-20">
            <div className="relative bg-white dark:bg-[#0a0a0b] md:rounded-4xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-2xl">
                {/* 1. DYNAMIC COVER */}
                <div className="relative h-48 md:h-72 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
                        className="w-full h-full object-cover scale-105"
                        alt="Cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-[#0a0a0b]" />

                    <div className="absolute top-6 right-6 flex gap-2">
                        <button className="p-2.5 bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-blue-600 transition-all cursor-pointer">
                            <FiMoreHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* 2. ASYMMETRIC CONTENT AREA */}
                <div className="px-6 md:px-12 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center -mt-20 md:-mt-24 relative z-10">
                        {/* AVATAR BOX */}
                        <div className="relative shrink-0 group mx-auto md:mx-0">
                            <div className="w-36 h-36 md:w-40 md:h-40 rounded-4xl bg-linear-to-tr from-blue-600 to-indigo-400 p-1 shadow-[0_20px_50px_rgba(37,99,235,0.3)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://i.pravatar.cc/150"
                                    className="w-full h-full rounded-[1.8rem] object-cover border-4 border-white dark:border-[#0a0a0b]"
                                    alt="Majid"
                                />
                            </div>
                            {isOwnProfile && (
                                <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 hover:scale-110 transition-all cursor-pointer text-blue-600">
                                    <FiCamera size={18} />
                                </button>
                            )}
                        </div>

                        {/* INFO PANEL */}
                        <div className="flex-1 space-y-4 pt-4 text-center md:text-left">
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white">
                                        Majid
                                    </h1>
                                </div>
                                <p className="text-lg font-bold text-slate-500 dark:text-slate-400 italic">
                                    Founder of <span className="text-blue-600">SoSchool</span> —
                                    Architecting Future Education.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <FiMapPin className="text-blue-600" /> Karawang, ID
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <FiGlobe className="text-blue-600" /> soschool.id
                                </div>
                            </div>

                            {/* ACTION GROUP */}
                            <div className="flex flex-wrap gap-3  justify-center md:justify-start">
                                <>
                                    <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black italic uppercase text-[10px] tracking-widest shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2">
                                        <FiUserPlus /> Connect
                                    </button>
                                    <button className="px-8 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black italic uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all cursor-pointer flex items-center gap-2">
                                        <FiMessageSquare /> Ping
                                    </button>
                                </>
                            </div>
                        </div>

                        <div>
                            {/* QUICK STATS */}
                            <div className=" lg:grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-white/3 rounded-4xl border border-slate-100 dark:border-white/5 self-center">
                                <div className="px-4 py-2 text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        Impact
                                    </p>
                                    <div className="flex items-center justify-center gap-1 text-blue-600">
                                        <FiZap size={14} />
                                        <span className="text-xl font-black">2.4k</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 text-center border-l border-slate-200 dark:border-white/10">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        Peers
                                    </p>
                                    <div className="flex items-center justify-center gap-1 text-emerald-500">
                                        <FiUsers size={14} />
                                        <span className="text-xl font-black">840</span>
                                    </div>
                                </div>
                            </div>
                            {/* 3. REFINED NAV BAR */}
                            <div className=" bg-white/80 dark:bg-[#0a0a0b]/80 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 ">
                                <div className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide py-4">
                                    {tabs.map((tab) => {
                                        const isActive = pathname === tab.path;

                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => router.push(tab.path)}
                                                className={`            relative px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em]    transition-all duration-500 cursor-pointer group whitespace-nowrap flex items-center gap-2.5
            ${isActive
                                                        ? "text-blue-600"
                                                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                                                    }
          `}
                                            >
                                                {/* Background Highlight (Active) */}
                                                {isActive && (
                                                    <div className="absolute inset-0 bg-blue-600/10 rounded-2xl animate-in fade-in zoom-in duration-500" />
                                                )}

                                                {/* Indicator Dot & Label */}
                                                <div className="relative flex items-center gap-2 z-10">
                                                    <div
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive
                                                                ? "bg-blue-600 scale-110 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                                                                : "bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-400"
                                                            }`}
                                                    />
                                                    <span className="leading-none">{tab.label}</span>
                                                </div>

                                                {/* Bottom Line (Stylized) */}
                                                {isActive && (
                                                    <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full shadow-[0_-2px_10px_rgba(37,99,235,0.8)]" />
                                                )}
                                            </button>
                                        );
                                    })}
                                    <div className="min-w-6 md:hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
