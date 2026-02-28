"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  FiChevronLeft, FiCheckCircle, FiAlertCircle, 
  FiClock, FiTarget, FiBarChart2, FiArrowUpRight, FiFilter,
  FiZap, FiActivity, FiTrendingUp
} from 'react-icons/fi';

// --- DATA SIMULASI DETAIL MATERI (MENDALAM) ---
const DATA_DETAIL_MAPEL = {
  id: 'MAT-01',
  name: 'Matematika',
  totalSoal: 250,
  overallReady: 78,
  studyTime: '12h 45m', // Data Tambahan: Total waktu belajar di mapel ini
  topics: [
    { 
      name: 'Aljabar Linear', 
      done: 50, total: 50, acc: 95, 
      status: 'Mastered', 
      lastStudy: '2 jam yang lalu',
      strength: 'Persamaan Matriks' // Data Tambahan
    },
    { 
      name: 'Trigonometri', 
      done: 40, total: 60, acc: 82, 
      status: 'On Track', 
      lastStudy: '1 hari yang lalu',
      strength: 'Identitas Trigonometri'
    },
    { 
      name: 'Geometri Dimensi Tiga', 
      done: 15, total: 70, acc: 45, 
      status: 'Need Focus', 
      lastStudy: '3 hari yang lalu',
      weakness: 'Sudut Antar Ruang' // Data Tambahan
    },
    { 
      name: 'Statistika & Peluang', 
      done: 45, total: 70, acc: 70, 
      status: 'On Track', 
      lastStudy: '5 jam yang lalu',
      strength: 'Distribusi Normal'
    },
  ]
};

export default function SoSchoolDetailMateri() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] p-6 md:p-12 text-slate-900 dark:text-white transition-colors duration-500 antialiased">
      {/* GLOW BACKGROUND */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* --- HEADER NAVIGATION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
           <div className="space-y-4">
              <button 
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all cursor-pointer"
              >
                 <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
              </button>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                 {DATA_DETAIL_MAPEL.name}<span className="text-indigo-600">.</span>
              </h2>
           </div>
           
           {/* QUICK STATS BENTO */}
           <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-4xl flex items-center gap-4 shadow-sm">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-600/20">
                    <FiTarget size={20} />
                 </div>
                 <div>
                    <p className="text-[8px] font-black uppercase text-slate-400 italic leading-none mb-1">Overall Ready</p>
                    <p className="text-2xl font-black italic">{DATA_DETAIL_MAPEL.overallReady}%</p>
                 </div>
              </div>
              <div className="flex-1 md:flex-none bg-slate-900 dark:bg-white p-6 rounded-4xl flex items-center gap-4 shadow-xl">
                 <div className="w-12 h-12 bg-white/10 dark:bg-black/5 rounded-2xl flex items-center justify-center text-white dark:text-black shrink-0">
                    <FiClock size={20} />
                 </div>
                 <div>
                    <p className="text-[8px] font-black uppercase text-white/40 dark:text-black/40 italic leading-none mb-1">Time Invested</p>
                    <p className="text-2xl font-black italic text-white dark:text-black">{DATA_DETAIL_MAPEL.studyTime}</p>
                 </div>
              </div>
           </div>
        </div>

        {/* --- TOPIC LIST --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-3">
                <FiActivity className="text-indigo-600" />
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Topic Breakdown</h4>
             </div>
             <button className="flex items-center gap-2 text-[10px] font-black uppercase bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full italic hover:bg-slate-50 transition-colors">
                <FiFilter /> Sort by Progress
             </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {DATA_DETAIL_MAPEL.topics.map((topic) => (
              <div 
                key={topic.name} 
                onClick={()=> router.push('/wali-murid/bank-soal/detail/soal')} 
                className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 transition-all hover:scale-[1.01] hover:border-indigo-500/50 hover:shadow-2xl shadow-sm cursor-pointer relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-2 h-full ${
                  topic.acc > 85 ? 'bg-emerald-500' : topic.acc > 60 ? 'bg-indigo-600' : 'bg-red-500'
                }`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                   {/* Col 1: Name & Strengths */}
                   <div className="lg:col-span-4 space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 italic bg-indigo-600/5 px-3 py-1 rounded-full">{topic.status}</span>
                         <span className="text-[10px] font-bold text-slate-400 italic">{topic.lastStudy}</span>
                      </div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">
                         {topic.name}
                      </h3>
                      {/* Insight Chip */}
                      {topic.strength || topic.weakness ? (
                        <div className="flex items-center gap-2">
                           {topic.strength ? (
                             <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-lg">
                                <FiTrendingUp size={12} />
                                <span className="text-[9px] font-black uppercase italic">Kuat di: {topic.strength}</span>
                             </div>
                           ) : (
                             <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-500/5 px-3 py-1 rounded-lg">
                                <FiAlertCircle size={12} />
                                <span className="text-[9px] font-black uppercase italic">Lemah di: {topic.weakness}</span>
                             </div>
                           )}
                        </div>
                      ) : null}
                   </div>

                   {/* Col 2: Progress Bar */}
                   <div className="lg:col-span-5 space-y-4">
                      <div className="flex justify-between items-end">
                         <p className="text-[10px] font-black uppercase text-slate-400 italic">Completed Task</p>
                         <p className="text-sm font-black italic">{topic.done} <span className="text-slate-400">/ {topic.total}</span></p>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-white/5">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${
                             topic.acc > 85 ? 'bg-emerald-500' : topic.acc > 60 ? 'bg-indigo-600' : 'bg-red-500'
                           }`} 
                           style={{ width: `${(topic.done / topic.total) * 100}%` }}
                         />
                      </div>
                      <p className="text-[9px] font-black uppercase text-slate-400 italic text-right">
                         {Math.round((topic.done / topic.total) * 100)}% Progress
                      </p>
                   </div>

                   {/* Col 3: Stats */}
                   <div className="lg:col-span-3 flex justify-between lg:justify-end items-center gap-8 lg:border-l border-slate-100 dark:border-white/5 lg:pl-8">
                      <div className="text-left lg:text-right">
                         <p className="text-[9px] font-black uppercase text-slate-400 italic mb-1">Accuracy</p>
                         <p className={`text-4xl font-black italic tracking-tighter ${
                            topic.acc > 85 ? 'text-emerald-500' : topic.acc > 60 ? 'text-indigo-600' : 'text-red-500'
                         }`}>
                            {topic.acc}%
                         </p>
                      </div>
                      <div className="w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
                         <FiArrowUpRight size={24} />
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SMART RECOMMENDATION CARD --- */}
        <div className="bg-slate-900 dark:bg-white rounded-[3.5rem] p-10 md:p-14 text-white dark:text-black relative overflow-hidden shadow-2xl transition-all group">
           {/* Pattern Deco */}
           <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <FiZap size={180} />
           </div>

           <div className="relative z-10 max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-black/5 px-4 py-2 rounded-full border border-white/10 dark:border-black/10">
                 <FiAlertCircle className="text-amber-500" size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">Diagnostic Insight</span>
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9]">
                    Prioritas Belajar: <br /> 
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600">
                       Geometri Ruang.
                    </span>
                 </h3>
                 <p className="text-lg font-medium italic opacity-70 leading-relaxed">
                    Akurasi Majid menurun pada soal bertipe <span className="underline decoration-indigo-500">Visualisasi 3D</span>. 
                    Kami menyarankan pengerjaan 10 soal tambahan pada topik ini sebelum ujian pekan depan.
                 </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                 <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase italic text-[11px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-600/30">
                    Buka Latihan Soal
                 </button>
                 <button className="px-10 py-5 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 rounded-3xl font-black uppercase italic text-[11px] tracking-widest hover:bg-white/10 dark:hover:bg-black/10 transition-all">
                    Detail Analisis
                 </button>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}