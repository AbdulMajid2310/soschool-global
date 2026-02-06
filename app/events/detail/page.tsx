"use client";

import React from 'react';
import {
    FiCalendar, FiMapPin, FiClock, FiZap, FiUsers, FiShield,
    FiShare2, FiDownload, FiLayers, FiTerminal, FiChevronLeft,
    FiAward, FiCheckCircle
} from 'react-icons/fi';
import Link from 'next/link';

const EventDetailPage = () => {
    const event = {
        title: "National Cyber Security Competition: Capture The Flag",
        category: "LOMBA",
        organizer: "SoSchool x Cyber Community",
        date: "25 Mar 2026",
        time: "08:00 - 17:00 WIB",
        location: "Lab Cyber & Cloud Computing",
        xpReward: 1250,
        registered: 18,
        maxCapacity: 50,
        description: "National Cyber Security Competition: Capture The Flag (NCSC-CTF) 2026 dirancang sebagai simulasi pertahanan dan penyerangan siber tingkat lanjut bagi siswa sekolah menengah. Kompetisi ini bertujuan untuk menguji batas kemampuan teknis peserta dalam mengidentifikasi kerentanan sistem sebelum dieksploitasi oleh pihak yang tidak bertanggung jawab.",
        requirements: [
            "Siswa aktif SMA/SMK sederajat",
            "Satu tim maksimal 3 orang",
            "Membawa laptop dengan OS Linux/Kali",
            "Mengunggah surat pakta integritas"
        ],
        benefits: [
            "Sertifikat Nasional (Portofolio)",
            "Akses Premium SoSchool Lab",
            "Voucher Sertifikasi CompTIA+",
            "Merchandise Exclusive"
        ],
        timeline: [
            { time: "08:00", activity: "Check-in & Technical Meeting" },
            { time: "09:00", activity: "Babak Penyisihan (Jeopardy)" },
            { time: "12:00", activity: "Break & Lunch" },
            { time: "13:00", activity: "Final Round (Attack & Defense)" },
            { time: "16:00", activity: "Awarding Ceremony" },
        ],
        speakers: [
            { name: "Dr. Aris Setiawan", role: "Security Architect @CloudSec", avatar: "https://i.pravatar.cc/100?u=1" },
            { name: "Maya Putri", role: "Lead Dev SoSchool", avatar: "https://i.pravatar.cc/100?u=2" },
        ],
        resources: [
            { name: "Rulebook_CTF_2026.pdf", size: "2.4 MB" },
            { name: "Starter_Kit_Networking.zip", size: "45 MB" }
        ]
    };

    return (
        <div className="h-screen overflow-hidden font-sans transition-colors duration-300
            bg-slate-50 dark:bg-[#050811] text-slate-600 dark:text-slate-300">
            
            <div className="max-w-7xl mx-auto h-full flex flex-col px-4 md:px-8">
                
                {/* --- BACK BUTTON --- */}
                <div className="pt-24 pb-4 shrink-0">
                    <Link href="/siswa/events" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all
                        text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-500">
                        <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" size={16}/> Kembali ke Beranda
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full overflow-hidden pb-10">
                    
                    {/* --- LEFT SECTION (SCROLLABLE) --- */}
                    <main className="lg:col-span-8 overflow-y-auto pr-4 scrollbar-hide space-y-12">
                        <section className="space-y-6 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest italic">
                                    {event.category}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    Organized by {event.organizer}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]
                                text-slate-900 dark:text-white">
                                {event.title}
                            </h1>
                        </section>

                        <div className="relative rounded-[2.5rem] overflow-hidden aspect-video border shadow-2xl shrink-0
                            border-slate-200 dark:border-white/5 bg-slate-200 dark:bg-slate-900">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200" className="w-full h-full object-cover opacity-80 dark:opacity-60" alt="cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-50 dark:from-[#050811] via-transparent" />
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-xs font-black uppercase italic tracking-[0.2em] flex items-center gap-3 text-slate-900 dark:text-white">
                                <FiTerminal className="text-blue-600 dark:text-blue-500" /> Deskripsi Acara
                            </h2>
                            <p className="text-md leading-relaxed font-medium text-slate-600 dark:text-slate-400">
                                {event.description}
                            </p>
                        </section>

                        {/* SYARAT & BENEFIT */}
                        <section className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6 p-8 rounded-4xl border transition-colors
                                bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                <h2 className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-3 text-slate-900 dark:text-white">
                                    <FiShield className="text-blue-600 dark:text-blue-500" /> Syarat & Ketentuan
                                </h2>
                                <ul className="space-y-3">
                                    {event.requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[11px] font-bold uppercase italic leading-tight text-slate-500 dark:text-slate-400">
                                            <FiCheckCircle className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" size={14} /> {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6 p-8 rounded-4xl border transition-colors
                                bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                <h2 className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-3 text-slate-900 dark:text-white">
                                    <FiAward className="text-blue-600 dark:text-blue-500" /> Benefit Peserta
                                </h2>
                                <div className="grid grid-cols-1 gap-2">
                                    {event.benefits.map((b, i) => (
                                        <div key={i} className="px-4 py-3 rounded-xl border font-black text-[10px] uppercase italic
                                            bg-blue-50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10 text-blue-700 dark:text-blue-100">
                                            {b}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* RUNDOWN */}
                        <section className="space-y-8 pb-10">
                            <h2 className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-3 text-slate-900 dark:text-white">
                                <FiLayers className="text-blue-600 dark:text-blue-500" /> Rundown Kegiatan
                            </h2>
                            <div className="relative space-y-6 pl-6 border-l-2 border-slate-200 dark:border-white/5">
                                {event.timeline.map((item, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute -left-[1.85rem] top-1 w-3 h-3 rounded-full border-2 transition-all
                                            bg-slate-300 dark:bg-slate-800 border-slate-50 dark:border-[#050811] group-hover:bg-blue-600" />
                                        <div className="flex gap-6">
                                            <span className="text-[11px] font-black text-blue-600 dark:text-blue-500 w-14 shrink-0">{item.time}</span>
                                            <p className="text-[11px] font-bold uppercase tracking-widest italic text-slate-700 dark:text-slate-300">{item.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* --- RIGHT SECTION (SCROLLABLE) --- */}
                    <aside className="lg:col-span-4 overflow-y-auto pr-2 scrollbar-hide space-y-6">
                        
                        {/* REGISTRATION CARD */}
                        <div className="rounded-4xl p-8 shadow-2xl mt-2 border transition-all
                            bg-white dark:bg-linear-to-br dark:from-slate-900 dark:to-[#050811] border-slate-200 dark:border-blue-500/20">
                            <div className="flex justify-between items-center mb-10">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase italic">Reward</p>
                                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                                        <FiZap className="fill-current" size={16} />
                                        <span className="text-2xl font-black italic">+{event.xpReward} XP</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase italic">Sisa Slot</p>
                                    <p className="text-2xl font-black italic text-slate-900 dark:text-white">{event.maxCapacity - event.registered}</p>
                                </div>
                            </div>

                            <div className="space-y-5 mb-10">
                                <DetailRow icon={<FiCalendar />} label="Tanggal" value={event.date} />
                                <DetailRow icon={<FiClock />} label="Waktu" value={event.time} />
                                <DetailRow icon={<FiMapPin />} label="Lokasi" value={event.location} />
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-600/20 active:scale-95 cursor-pointer">
                                    Daftar Sekarang
                                </button>
                                <button className="w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 font-black cursor-pointer
                                    bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white">
                                    <FiShare2 /> Bagikan
                                </button>
                            </div>
                        </div>

                        {/* JURUR / SPEAKERS */}
                        <div className="p-8 rounded-4xl border transition-colors
                            bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 space-y-6">
                            <h2 className="text-[10px] font-black uppercase italic tracking-widest flex items-center gap-3 text-slate-900 dark:text-white">
                                <FiUsers className="text-blue-600 dark:text-blue-500" /> Dewan Juri
                            </h2>
                            <div className="space-y-5">
                                {event.speakers.map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <img src={s.avatar} className="w-12 h-12 rounded-2xl grayscale group-hover:grayscale-0 transition-all border border-slate-200 dark:border-white/10" alt="avatar" />
                                        <div>
                                            <p className="text-[11px] font-black uppercase italic leading-none text-slate-900 dark:text-white">{s.name}</p>
                                            <p className="text-[9px] font-bold uppercase mt-1.5 tracking-tighter text-slate-400 dark:text-slate-600">{s.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DOWNLOADS */}
                        <div className="p-8 rounded-4xl border transition-colors
                            bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-900 dark:text-white">
                                <FiDownload className="text-blue-600 dark:text-blue-500" /> Berkas Pendukung
                            </h3>
                            <div className="space-y-3">
                                {event.resources.map((f, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group
                                        bg-slate-50 dark:bg-black/40 border-slate-100 dark:border-white/5 hover:border-blue-500/50">
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black uppercase truncate text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-white">{f.name}</p>
                                            <p className="text-[8px] font-bold uppercase text-slate-400 dark:text-slate-600">{f.size}</p>
                                        </div>
                                        <FiDownload className="text-slate-400 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" size={16} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-4 group">
        <div className="p-2.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform
            bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500">
            {React.cloneElement(icon, { size: 16 })}
        </div>
        <div className="min-w-0">
            <p className="text-[8px] font-black uppercase tracking-widest mb-1 italic text-slate-400 dark:text-slate-600">{label}</p>
            <p className="text-[11px] font-black uppercase italic leading-tight tracking-tight text-slate-700 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

export default EventDetailPage;