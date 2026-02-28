"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiChevronLeft, FiTarget, FiClock, FiZap, 
  FiBarChart2, FiCheck, FiTrendingUp,
  FiActivity, FiHeart, FiBookOpen, FiArrowRight
} from 'react-icons/fi';

// --- DATA LAPORAN UNTUK ORANG TUA ---
const DATA_PARENT_INSIGHT = {
  subject: 'Matematika',
  topic: 'Geometri Dimensi Tiga',
  studentName: 'Ananda Majid',
  stats: {
    accuracy: 45,
    avgTime: '45 Detik',
    effortLevel: 'Sangat Tinggi', // Untuk apresiasi
    consistency: 62,
    status: 'Perlu Pendampingan Khusus',
    statusColor: 'rose'
  },
  difficulties: [
    { level: 'Dasar', desc: 'Pemahaman konsep awal', score: 85, color: 'emerald' },
    { level: 'Menengah', desc: 'Penerapan rumus', score: 25, color: 'amber' },
    { level: 'Lanjut', desc: 'Analisis ruang kompleks', score: 12, color: 'rose' },
  ],
  recommendations: [
    "Ajak Ananda latihan menggambar sketsa bangun ruang di kertas.",
    "Fokus pada penguatan konsep Pythagoras sebelum lanjut ke materi ini.",
    "Berikan apresiasi pada ketelitian Ananda di level dasar."
  ]
};

export default function SoSchoolTopicAnalysis() {
  const router = useRouter();

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans transition-colors duration-500 antialiased">
      
      {/* BACKGROUND DECO */}
      <div className="fixed top-[-10%] right-[-5%] w-130 h-130 bg-indigo-500/5 dark:bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

      <main className="max-w-6xl mx-auto space-y-12">
        
        {/* --- HEADER --- */}
        <header className="space-y-8">
           <button 
             onClick={() => router.back()}
             className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
           >
              <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Ringkasan
           </button>
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-indigo-600 dark:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Laporan Wali Murid</span>
                    </div>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                    {DATA_PARENT_INSIGHT.topic}<span className="text-indigo-600">.</span>
                 </h1>
                 <p className="text-lg font-medium text-slate-500 italic">Progress Belajar {DATA_PARENT_INSIGHT.studentName}</p>
              </div>
              
              <div className="w-full md:w-auto bg-slate-100 dark:bg-slate-100/5 border border-slate-200 dark:border-white/10 p-2 rounded-[2.5rem] flex items-center shadow-2xl dark:shadow-none transition-all">
                 <div className="bg-rose-500 text-white px-10 py-5 rounded-4xl flex flex-col items-center shadow-xl shadow-rose-500/30">
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-70 italic mb-1">Status Saat Ini</span>
                    <p className="text-xl font-black italic uppercase text-center leading-tight">Perlu<br/>Dukungan</p>
                 </div>
                 <div className="px-10 py-5 flex flex-col items-center text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic mb-1">Total Latihan</span>
                    <p className="text-3xl font-black italic text-indigo-600 dark:text-indigo-400 leading-none">85</p>
                    <p className="text-[10px] font-bold opacity-40 mt-1 italic uppercase tracking-tighter">Soal Selesai</p>
                 </div>
              </div>
           </div>
        </header>

        {/* --- BENTO SECTION --- */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. KEKUATAN & USAHA (Apresiasi untuk Orang Tua) */}
          <div className="md:col-span-5 bg-indigo-600 text-white rounded-[3.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
             <FiHeart className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-700" size={180} />
             <div className="space-y-2 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Etos Belajar Anak</p>
                <h3 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{DATA_PARENT_INSIGHT.stats.effortLevel}</h3>
             </div>
             <div className="mt-12 relative z-10">
                <p className="text-sm font-medium italic leading-relaxed opacity-90 border-l-2 border-white/30 pl-4">
                  "Ananda Majid menunjukkan kegigihan yang luar biasa. Ia terus mencoba soal yang sulit meski beberapa kali belum tepat."
                </p>
             </div>
          </div>

          {/* 2. ANALISIS LEVEL (Visual yang mudah dibaca) */}
          <div className="md:col-span-7 bg-slate-100 dark:bg-slate-100/5 border border-slate-200 dark:border-white/10 rounded-[3.5rem] p-10 space-y-8 shadow-sm">
             <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-6">
                <FiBarChart2 className="text-indigo-600" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 italic">Detail Penguasaan Materi</h4>
             </div>
             
             <div className="space-y-8">
                {DATA_PARENT_INSIGHT.difficulties.map((item) => (
                  <div key={item.level} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 group">
                     <div className="md:col-span-1">
                        <p className="text-sm font-black italic uppercase leading-none">{item.level}</p>
                        <p className="text-[10px] font-medium text-slate-400 italic mt-1">{item.desc}</p>
                     </div>
                     <div className="md:col-span-2 h-3 bg-slate-100 dark:bg-slate-100/5 rounded-full overflow-hidden p-0.5">
                        <div 
                           className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(var(--color-${item.color}-500),0.5)]`} 
                           style={{ width: `${item.score}%` }}
                        />
                     </div>
                     <div className="md:col-span-1 text-right">
                        <span className={`text-xl font-black italic text-${item.color}-500`}>{item.score}%</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* 3. REKOMENDASI UNTUK DIRUMAH */}
          <div className="md:col-span-12 bg-slate-900 dark:bg-slate-100 text-white dark:text-black rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden transition-all duration-500">
             <FiZap size={220} className="absolute -right-10 -bottom-10 opacity-5 dark:opacity-10 -rotate-12" />
             
             <div className="w-24 h-24 bg-indigo-500 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-2xl">
                <FiBookOpen size={40} />
             </div>
             
             <div className="flex-1 space-y-6 relative z-10">
                <h4 className="text-3xl font-black italic uppercase tracking-tighter">Saran Pendampingan</h4>
                <ul className="space-y-4">
                   {DATA_PARENT_INSIGHT.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg font-medium italic opacity-80 leading-tight">
                         <FiCheck className="mt-1 shrink-0 text-indigo-500" /> {rec}
                      </li>
                   ))}
                </ul>
             </div>
             
             <button className="w-full md:w-auto px-10 py-6 bg-slate-100 dark:bg-indigo-600 text-black dark:text-white rounded-4xl font-black uppercase italic text-[11px] tracking-widest hover:scale-105 transition-all shadow-2xl cursor-pointer">
                Konsultasi Pengajar <FiArrowRight className="inline ml-2" />
             </button>
          </div>
        </section>

        {/* --- RIWAYAT BELAJAR --- */}
        <section className="space-y-6">
           <div className="flex items-center gap-3 px-6">
              <FiTrendingUp className="text-indigo-600" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Timeline Latihan</h4>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-100 dark:bg-slate-100/5 border border-slate-200 dark:border-white/10 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">0{i} Feb 2026</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                   </div>
                   <h5 className="text-2xl font-black italic uppercase mb-2">Quiz Mandiri</h5>
                   <p className="text-5xl font-black italic text-indigo-600 dark:text-indigo-500 leading-none">+{70 - (i*10)}%</p>
                   <p className="text-[10px] font-bold opacity-40 mt-4 italic uppercase tracking-tighter leading-tight text-slate-500">Hasil menunjukkan perbaikan signifikan.</p>
                </div>
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}