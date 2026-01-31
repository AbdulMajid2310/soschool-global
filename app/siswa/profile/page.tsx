"use client";

import React, { useState } from "react";
import {
    FiEdit2, FiMapPin, FiCalendar, FiCamera, FiPlus, FiGlobe,
    FiMessageCircle, FiThumbsUp, FiShare2, FiMoreHorizontal,
    FiBriefcase, FiVideo, FiImage, FiSmile,
    FiExternalLink,
    FiCheck,
    FiAward,
    FiBookOpen,
    FiGithub,
    FiLinkedin,
    FiTwitter,
    FiCpu
} from "react-icons/fi";

export default function SocialProfilePage() {

    return (
        <div className="max-w-6xl mx-auto px-4  grid grid-cols-1 lg:grid-cols-12 gap-6">


            {/* LEFT: Intro & Info (LinkedIn Sidebar style) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto scrollbar-hide">
                {/* 1. INTRO CARD */}
                <div className="bg-white dark:bg-[#0a0a0b] p-6 rounded-4xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <h2 className="text-[10px] font-black italic uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> Intro
                    </h2>
                    <p className="text-sm text-center mb-6 font-bold italic text-slate-600 dark:text-slate-400 px-2 leading-relaxed">
                        "Building the future of education with code. 🚀"
                    </p>

                    <div className="space-y-4 border-y border-slate-100 dark:border-white/5 py-4">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                            <FiBriefcase className="text-blue-600" />
                            <span>Founder at <span className="text-slate-900 dark:text-white">SoSchool</span></span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                            <FiCalendar className="text-blue-600" />
                            <span>Joined <span className="text-slate-900 dark:text-white">Jan 2026</span></span>
                        </div>
                    </div>

                    {/* NEW: SOCIAL LINKS (Minimalist) */}
                    <div className="flex justify-center gap-4 mt-6">
                        {[FiGithub, FiLinkedin, FiTwitter].map((Icon, idx) => (
                            <button key={idx} className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl hover:text-blue-600 transition-all cursor-pointer border border-transparent hover:border-blue-600/20">
                                <Icon size={16} />
                            </button>
                        ))}
                    </div>


                </div>

                {/* 2. TECH STACK (NEW - Menambah kesan Developer) */}
                <div className="bg-white dark:bg-[#0a0a0b] p-6 rounded-4xl border border-slate-200 dark:border-white/5">
                    <h2 className="text-[10px] font-black italic uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FiCpu className="text-blue-600" /> Tech Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {["Next.js", "TypeScript", "Tailwind v4", "NestJS", "PostgreSQL"].map((skill) => (
                            <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] font-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 italic">
                                #{skill.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 3. FRIENDS PREVIEW */}
                <div className="bg-white dark:bg-[#0a0a0b] p-6 rounded-4xl border border-slate-200 dark:border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-[10px] font-black italic uppercase tracking-widest">Connections</h2>
                            <p className="text-[9px] text-slate-400 font-bold mt-0.5">840 Mutual Friends</p>
                        </div>
                        <button className="text-[10px] text-blue-600 font-black uppercase tracking-wider hover:underline cursor-pointer">View All</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 40}`} className="w-full aspect-square rounded-2xl object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-300" alt="" />
                                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                </div>
                                <p className="text-[9px] font-black mt-2 truncate text-slate-600 dark:text-slate-400 group-hover:text-blue-600">STUDENT {i}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* MIDDLE: Create Post & Feed (Facebook Style) */}
            <main className="lg:col-span-8 space-y-6 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto scrollbar-hide">
                {/* Create Post */}
                <section className="bg-white dark:bg-[#0a1229] p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="flex gap-4">
                        <img src="https://i.pravatar.cc/150?u=10" className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover" alt="" />
                        <button className="flex-1 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-left px-6 rounded-2xl text-slate-500 text-sm font-bold transition-all cursor-pointer">
                            Apa yang kamu pikirkan, Majid?
                        </button>
                    </div>
                    <div className="flex justify-between mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                            <FiVideo className="text-red-500" /> <span className="text-xs font-black uppercase">Live</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                            <FiImage className="text-emerald-500" /> <span className="text-xs font-black uppercase">Photo</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                            <FiSmile className="text-orange-400" /> <span className="text-xs font-black uppercase">Feeling</span>
                        </button>
                    </div>
                </section>

                {/* POST EXAMPLE */}
                <article className="bg-white dark:bg-[#0a1229] rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <img src="https://i.pravatar.cc/150?u=10" className="w-10 h-10 rounded-xl" alt="" />
                                <div>
                                    <h4 className="text-sm font-black italic uppercase tracking-tight">Majid</h4>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        <span>2 hours ago</span>
                                        <span>•</span>
                                        <FiGlobe />
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><FiMoreHorizontal /></button>
                        </div>
                        <p className="text-sm md:text-base font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                            Baru saja menyelesaikan fitur chat di <span className="text-blue-600 font-bold">SoSchool</span>. Tampilannya makin rapi dengan dark mode! 🚀 Siapa yang mau coba beta testingnya?
                        </p>
                    </div>

                    {/* Content Image */}
                    <div className="px-2">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" className="w-full max-h-96 object-cover rounded-2xl" alt="Post" />
                    </div>

                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <div className="flex items-center gap-1">
                                <div className="flex -space-x-2">
                                    <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white dark:border-[#0a1229] flex items-center justify-center text-[8px] text-white"><FiThumbsUp /></div>
                                </div>
                                <span>42 Likes</span>
                            </div>
                            <span>12 Comments</span>
                        </div>

                        <div className="flex gap-2 border-t border-slate-100 dark:border-white/5 pt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                                <FiThumbsUp className="group-hover:text-blue-600" /> <span className="text-[10px] font-black uppercase">Like</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                                <FiMessageCircle className="group-hover:text-blue-600" /> <span className="text-[10px] font-black uppercase">Comment</span>
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all cursor-pointer group">
                                <FiShare2 className="group-hover:text-blue-600" /> <span className="text-[10px] font-black uppercase">Share</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* CENTER COLUMN: MAIN SECTIONS (LINKEDIN CONTENT) */}
                <main className="lg:col-span-8 space-y-8">

                    {/* EXPERIENCE */}
                    <section className="bg-white dark:bg-[#0a1229] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600/10 rounded-xl text-blue-600"><FiBriefcase size={20} /></div>
                                <h2 className="text-xl font-black italic uppercase tracking-tight">Experience</h2>
                            </div>
                            <button className="text-blue-600 p-2 hover:bg-blue-50 dark:hover:bg-blue-600/10 rounded-full transition-all cursor-pointer"><FiPlus size={20} /></button>
                        </div>
                        <div className="space-y-10">
                            <div className="flex gap-6 group relative">
                                <div className="shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black italic shadow-lg">SO</div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="text-lg font-black italic uppercase leading-none">Founder & Lead Dev</h4>
                                        <FiEdit2 size={14} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
                                    </div>
                                    <p className="text-sm font-bold text-blue-600 mt-1">SoSchool · Full-time</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Jan 2026 - Present</p>
                                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">Developing a comprehensive school management system with advanced chat and community features.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* EDUCATION */}
                    <section className="bg-white dark:bg-[#0a1229] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-600/10 rounded-xl text-emerald-600"><FiBookOpen size={20} /></div>
                                <h2 className="text-xl font-black italic uppercase tracking-tight">Education</h2>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 shadow-inner"><FiBookOpen size={24} /></div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black italic uppercase leading-none">Universitas Teknik Komputer</h4>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mt-1">S1 Software Engineering</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">2020 - 2024</p>
                            </div>
                        </div>
                    </section>

                    {/* LICENSES & CERTS */}
                    <section className="bg-white dark:bg-[#0a1229] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-orange-600/10 rounded-xl text-orange-600"><FiAward size={20} /></div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight">Licenses & Certs</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Fullstack Web Development", issuer: "Google" },
                                { title: "Advanced React & Next.js", issuer: "Meta" }
                            ].map((cert, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0d1733] border border-slate-100 dark:border-white/5 flex justify-between items-start group hover:border-blue-500 transition-all">
                                    <div>
                                        <h5 className="font-black italic uppercase text-sm mb-1">{cert.title}</h5>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase">{cert.issuer}</p>
                                    </div>
                                    <FiExternalLink className="text-slate-400 group-hover:text-blue-600" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SKILLS */}
                    <section className="bg-white dark:bg-[#0a1229] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-purple-600/10 rounded-xl text-purple-600"><FiCheck size={20} /></div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight">Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {['React.js', 'Next.js 15', 'Tailwind v4', 'TypeScript', 'Node.js', 'PostgreSQL'].map((skill) => (
                                <div key={skill} className="px-5 py-2.5 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-blue-600 transition-all group cursor-default">
                                    <span className="text-sm font-bold uppercase tracking-tighter flex items-center gap-2">
                                        {skill} <span className="text-[10px] text-blue-600 font-black italic opacity-50">• 24</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                </main>
            </main>
        </div>
    );
}