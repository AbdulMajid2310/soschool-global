"use client";

import React from 'react';
import {
    FiCalendar, FiMapPin, FiClock, FiZap, FiUsers, FiShield,
    FiShare2, FiDownload, FiLayers, FiTerminal, FiChevronLeft,
    FiAward, FiCheckCircle, FiPhone, FiMail
} from 'react-icons/fi';
import Link from 'next/link';

const EventDetailPage = () => {
    // --- DATA KOMPLEKS & REALISTIS ---
    const event = {
        title: "National Cyber Security Competition: Capture The Flag",
        category: "LOMBA",
        organizer: "SoSchool x Cyber Community",
        organizerAvatar: "https://i.pravatar.cc/100?u=soschool",
        date: "25 Mar 2026",
        time: "08:00 - 17:00 WIB",
        location: "Lab Cyber & Cloud Computing",
        xpReward: 1250,
        registered: 18,
        maxCapacity: 50,
        description: "National Cyber Security Competition: Capture The Flag (NCSC-CTF) 2026 dirancang sebagai simulasi pertahanan dan penyerangan siber tingkat lanjut bagi siswa sekolah menengah. Kompetisi ini bertujuan untuk menguji batas kemampuan teknis peserta dalam mengidentifikasi kerentanan sistem sebelum dieksploitasi oleh pihak yang tidak bertanggung jawab. Dalam skenario Penetrasi, peserta akan dihadapkan pada arsitektur jaringan kompleks di mana mereka harus melakukan vulnerability assessment dan mencari celah pada layanan yang aktif. Pada sektor Kriptografi, tantangan akan berfokus pada teknik dekripsi algoritma modern dan pemecahan sandi terenkripsi. Sementara itu, bidang Digital Forensic akan menantang peserta untuk melakukan investigasi pasca-insiden, menganalisis log sistem yang korup, dan memulihkan data sensitif yang sengaja disembunyikan dalam file sistem. Sepanjang kompetisi, setiap peserta ditantang untuk menemukan  Flag sebuah string unik tersembunyi—yang hanya bisa didapatkan melalui teknik hacking etis yang presisi. Peserta dituntut tidak hanya memiliki skill teknis, tetapi juga integritas moral tinggi dalam menjaga keamanan lingkungan server SoSchool-Sandbox yang telah disediakan sebagai arena tempur digital ini.,",

        // Kompleksitas 1: Syarat & Ketentuan
        requirements: [
            "Siswa aktif SMA/SMK sederajat",
            "Satu tim maksimal 3 orang",
            "Membawa laptop dengan OS Linux/Kali (disarankan)",
            "Sudah mengunggah surat pakta integritas"
        ],

        // Kompleksitas 2: Benefit
        benefits: [
            "Sertifikat Nasional (Poin Portofolio)",
            "Akses Premium SoSchool Lab 3 Bulan",
            "Voucher Ujian Sertifikasi CompTIA+",
            "Merchandise Exclusive & Hoodie"
        ],

        // Kompleksitas 3: Timeline Detail
        timeline: [
            { time: "08:00", activity: "Check-in & Technical Meeting" },
            { time: "09:00", activity: "Babak Penyisihan (Jeopardy Mode)" },
            { time: "12:00", activity: "Break & Lunch (Free Catering)" },
            { time: "13:00", activity: "Final Round (Attack & Defense)" },
            { time: "16:00", activity: "Awarding & Closing Ceremony" },
        ],

        // Kompleksitas 4: Speakers & Juri
        speakers: [
            { name: "Dr. Aris Setiawan", role: "Security Architect @CloudSec", avatar: "https://i.pravatar.cc/100?u=1" },
            { name: "Maya Putri", role: "Lead Dev SoSchool", avatar: "https://i.pravatar.cc/100?u=2" },
        ],

        // Kompleksitas 5: Sponsor & Resources
        resources: [
            { name: "Rulebook_CTF_2026.pdf", size: "2.4 MB" },
            { name: "Starter_Kit_Networking.zip", size: "45 MB" }
        ],
        contact: { phone: "0812-3456-7890", email: "ctf@soschool.com" }
    };

    return (
        <div className="min-h-screen bg-[#050811] text-slate-300 pt-4 pb-20 px-4 md:px-12 font-sans relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Back Button */}
                <Link href="/siswa/events" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-500 transition-all mb-10">
                    <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- CONTENT LEFT --- */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-xl text-[8px] font-black text-blue-500 uppercase tracking-widest italic">{event.category}</span>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">By {event.organizer}</span>
                            </div>
                            <h1 className="text-4xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{event.title}</h1>
                        </div>

                        {/* Banner Section */}
                        <div className="relative rounded-4xl overflow-hidden aspect-video border border-white/5 bg-white/5">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200" className="w-full h-full object-cover opacity-40" alt="cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#050811] via-transparent" />
                        </div>

                        {/* Description & Requirements Grid */}

                        <div className="space-y-6">
                            <h2 className="text-lg font-black text-white uppercase italic tracking-widest flex items-center gap-3"><FiTerminal className="text-blue-500" /> Deskripsi Acara</h2>
                            <p className="text-sm  text-slate-300 font-medium">{event.description}</p>


                        </div>



                        <div className='grid col-end-1 lg:grid-cols-2 gap-2'>
                            <div className="space-y-6">
                                <h2 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-3 "><FiShield className="text-blue-500" /> Syarat & Ketentuan</h2>
                                <ul className="space-y-2">
                                    {event.requirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase italic tracking-tight">
                                            <FiCheckCircle className="text-blue-500 shrink-0" size={12} /> {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-3"><FiAward className="text-blue-500" /> Benefit Peserta</h2>
                                <div className="grid grid-cols-1 gap-2">
                                    {event.benefits.map((b, i) => (
                                        <div key={i} className="p-3 bg-white/2 rounded-2xl border border-white/5 text-[9px] font-black text-white uppercase italic">
                                            {b}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-8">
                            <h2 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-3"><FiLayers className="text-blue-500" /> Rundown Kegiatan</h2>
                            <div className="relative space-y-4 pl-4 border-l border-white/5">
                                {event.timeline.map((item, i) => (
                                    <div key={i} className="relative group">
                                        <div className="absolute -left-5.25 top-1.5 w-2 h-2 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-colors" />
                                        <div className="flex gap-6">
                                            <span className="text-[10px] font-black text-blue-500 w-12 shrink-0">{item.time}</span>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR RIGHT --- */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-12 space-y-6">
                            {/* Registration Card */}
                            <div className="bg-white/3 backdrop-blur-3xl border border-white/5 rounded-4xl p-8">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black text-slate-600 uppercase italic">Reward</p>
                                        <div className="flex items-center gap-2">
                                            <FiZap className="text-amber-500 fill-amber-500" size={14} />
                                            <span className="text-xl font-black text-white italic leading-none">+{event.xpReward} XP</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[8px] font-black text-slate-600 uppercase italic">Sisa Slot</p>
                                        <p className="text-xl font-black text-blue-500 italic leading-none">{event.maxCapacity - event.registered}</p>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <DetailRow icon={<FiCalendar />} label="Tanggal" value={event.date} />
                                    <DetailRow icon={<FiClock />} label="Waktu" value={event.time} />
                                    <DetailRow icon={<FiMapPin />} label="Lokasi" value={event.location} />
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-white text-black rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-blue-600 hover:text-white active:scale-95">Daftar Sekarang</button>
                                    <button className="w-full py-4 bg-white/5 border border-white/5 text-slate-500 rounded-3xl  text-[10px] uppercase tracking-[0.2em] transition-all hover:text-white flex items-center justify-center gap-2 font-black"><FiShare2 /> Bagikan</button>
                                </div>
                            </div>

                            <div className="space-y-10">


                                <div className="space-y-6">
                                    <h2 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-3"><FiUsers className="text-blue-500" /> Dewan Juri</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {event.speakers.map((s, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <img src={s.avatar} className="w-10 h-10 rounded-xl grayscale" alt="avatar" />
                                                <div>
                                                    <p className="text-[10px] font-black text-white uppercase italic leading-none">{s.name}</p>
                                                    <p className="text-[8px] font-bold text-slate-600 uppercase mt-1">{s.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Resources Card */}
                            <div className="bg-white/2 border border-white/5 rounded-4xl p-6 space-y-4">
                                <h3 className="text-[9px] font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2"><FiDownload className="text-blue-500" /> Berkas Pendukung</h3>
                                {event.resources.map((f, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-2xl border border-white/5 hover:border-blue-900 transition-all cursor-pointer group">
                                        <div className="min-w-0">
                                            <p className="text-[9px] font-black text-slate-400 uppercase truncate">{f.name}</p>
                                            <p className="text-[7px] text-slate-600 font-bold uppercase">{f.size}</p>
                                        </div>
                                        <FiDownload className="text-slate-700 group-hover:text-blue-500" size={14} />
                                    </div>
                                ))}
                            </div>

                            {/* Contact Area */}
                            <div className="p-6 bg-white/2 border border-white/5 rounded-4xl space-y-4">
                                <h3 className="text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">Hubungi Panitia</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer">
                                        <FiPhone size={12} /> <span className="text-[10px] font-black italic">{event.contact.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer">
                                        <FiMail size={12} /> <span className="text-[10px] font-black italic">{event.contact.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-4">
        <div className="p-2 bg-white/5 rounded-xl text-blue-500 shrink-0 mt-0.5">{React.cloneElement(icon, { size: 14 })}</div>
        <div className="min-w-0">
            <p className="text-[7px] font-black text-slate-700 uppercase tracking-widest mb-0.5 italic">{label}</p>
            <p className="text-[10px] font-black text-slate-300 uppercase italic leading-tight">{value}</p>
        </div>
    </div>
);

export default EventDetailPage;