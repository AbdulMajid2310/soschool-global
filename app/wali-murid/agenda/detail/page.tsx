"use client";

import React from 'react';
import { 
  FiClock, FiUser, FiMapPin, FiActivity, FiBookOpen, 
  FiCheckCircle, FiMessageCircle, FiDownload, 
  FiExternalLink, FiChevronRight, FiMaximize2, FiArrowLeft
} from 'react-icons/fi';

// --- DATA STATIS DETAIL ---
const DATA_SESI_AKTIF = {
  subject: "Sosiologi",
  kategori: "Peminatan IPS",
  sesi: "Sesi 7-8",
  waktu: "12:30 - 13:50",
  ruangan: {
    nama: "Laboratorium Sosial",
    lantai: "Gedung B, Lantai 2",
    kode: "R-204"
  },
  guru: {
    nama: "Drs. Budi Santoso, M.Pd",
    kode: "10",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    wa: "6281234567890"
  },
  materi: {
    bab: "Bab 04",
    topik: "Konflik Sosial & Integrasi",
    deskripsi: "Menganalisis penyebab konflik horizontal di masyarakat urban serta strategi rekonsiliasi pasca-konflik.",
    modulUrl: "#"
  },
  tugas: [
    { id: 1, judul: "Observasi Konflik Lingkungan", tenggat: "Besok", status: "Proses" },
    { id: 2, judul: "Resume Teori Ralf Dahrendorf", tenggat: "Selesai", status: "Selesai" }
  ]
};

export default function SoSchoolDirectDetail() {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* --- TOP BAR --- */}
      <nav className="sticky top-0 bg-[#f8fafc]/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
              <FiArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic text-indigo-600">SoSchool Live</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
              Sesi Sedang Berjalan
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- BAGIAN KIRI: UTAMA (Col 8) --- */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Hero Header */}
            <div className="relative group">
              <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <FiActivity size={14} /> {DATA_SESI_AKTIF.kategori}
              </p>
              <h1 className="lg:text-6xl text-4xl  font-black tracking-tighter leading-[0.75] uppercase italic text-slate-900 dark:text-white">
                {DATA_SESI_AKTIF.subject}<span className="text-indigo-600">.</span>
              </h1>
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <FiClock className="text-indigo-500" />
                  <span className="text-sm font-black italic">{DATA_SESI_AKTIF.waktu}</span>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <FiMapPin className="text-indigo-500" />
                  <span className="text-sm font-black italic">{DATA_SESI_AKTIF.ruangan.kode}</span>
                </div>
              </div>
            </div>

           {/* Materi Highlight - Card Besar (V2 Optimized) */}
<div className="relative overflow-hidden bg-slate-900 dark:bg-slate-300 rounded-[4rem] p-10 md:p-14 text-white dark:text-slate-900 shadow-2xl group">
  
  {/* Decorative Background Elements */}
  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />
  
  <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
    
    {/* Sisi Kiri: Teks & Action */}
    <div className="flex-1 space-y-8">
      <div className="flex items-center gap-3">
        <div className="px-4 py-1.5 bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] italic shadow-lg shadow-indigo-500/20">
          {DATA_SESI_AKTIF.materi.bab}
        </div>
        <div className="h-px w-10 bg-white/20 dark:bg-slate-200" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Materi Utama</span>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
          {DATA_SESI_AKTIF.materi.topik}
        </h2>
        <p className="text-sm md:text-lg opacity-70 leading-relaxed font-medium italic max-w-xl">
          {DATA_SESI_AKTIF.materi.deskripsi}
        </p>
      </div>

      
    </div>

  

  </div>
</div>
          </div>

          {/* --- BAGIAN KANAN: GURU & TUGAS (Col 4) --- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Guru Card */}
            <div className="bg-white dark:bg-white/2 p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 min-w-60 shadow-sm">
               <div className="flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <img src={DATA_SESI_AKTIF.guru.foto} alt="Guru" className="w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 shadow-inner" />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg border-4 border-white dark:border-[#020617]">
                      <FiMessageCircle size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-black italic uppercase leading-none">{DATA_SESI_AKTIF.guru.nama}</p>
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2 italic">Kode Pengajar: {DATA_SESI_AKTIF.guru.kode}</p>
                  </div>
                  <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase italic text-[10px] tracking-widest transition-all hover:opacity-90">
                    Kirim Pesan Chat
                  </button>
               </div>
            </div>

            {/* Tugas Card */}
            <div className="bg-white dark:bg-white/2 p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 min-w-60 shadow-sm">
               <div className="flex items-center justify-between mb-8 px-2">
                 <h3 className="text-lg font-black italic uppercase tracking-tight">Agenda Sesi</h3>
                 <FiMaximize2 size={16} className="text-slate-400" />
               </div>
               
               <div className="space-y-4">
                  {DATA_SESI_AKTIF.tugas.map(t => (
                    <div key={t.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 group hover:border-indigo-500/30 transition-all">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${t.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-xs'}`}>
                        <FiCheckCircle size={20} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[11px] font-black uppercase italic leading-none mb-1 ${t.status === 'Selesai' ? 'line-through opacity-30 text-slate-500' : ''}`}>
                          {t.judul}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 uppercase italic">Tenggat: {t.tenggat}</span>
                          <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                        </div>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase italic">
                    <span className="text-slate-400">Progres Belajar</span>
                    <span className="text-indigo-600 font-black">50%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.4)]" />
                  </div>
               </div>
            </div>

           
          </div>
        </div>
      </main>

      
    </div>
  );
}