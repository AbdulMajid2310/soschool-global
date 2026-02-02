"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  FiBookOpen, FiTarget, FiTrendingUp, FiActivity, 
  FiChevronRight, FiAlertCircle, FiAward, FiClock,
  FiZap, FiPieChart, FiBarChart
} from 'react-icons/fi';

// --- DATA SIMULASI DASHBOARD AKADEMIK ---
const DATA_PROGRESS = [
  { mapel: 'Matematika', total: 200, done: 160, acc: 88, status: 'Mastered', color: 'indigo', weakTopic: 'Logaritma' },
  { mapel: 'Fisika', total: 150, done: 40, acc: 55, status: 'Need Review', color: 'amber', weakTopic: 'Termodinamika' },
  { mapel: 'B. Inggris', total: 180, done: 175, acc: 94, status: 'Expert', color: 'emerald', weakTopic: 'None' },
];

export default function SoSchoolBankSoalParent() {
    const router = useRouter()
  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-6 md:p-12 antialiased">
      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* --- HERO SECTION: ACADEMIC STANDING --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
               <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em] italic">Knowledge Bank Audit</span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">
               ACADEMIC <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">PULSE.</span>
            </h2>
            <p className="text-slate-500 font-medium italic max-w-xl text-lg">
                Analisis mendalam kesiapan ujian berdasarkan interaksi Bank Soal. Memantau progres belajar bukan lagi sekadar angka, tapi strategi.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4 w-full">
             <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-8 rounded-[3rem] shadow-sm flex flex-col justify-between aspect-square">
                <FiZap className="text-amber-500" size={32} />
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 italic mb-1 tracking-widest">Study Streak</p>
                   <h3 className="text-5xl font-black italic tracking-tighter">12 <span className="text-lg opacity-30">Days</span></h3>
                </div>
             </div>
             <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col justify-between aspect-square">
                <FiAward className="text-indigo-400" size={32} />
                <div>
                   <p className="text-[10px] font-black uppercase opacity-60 italic mb-1 tracking-widest">Global Rank</p>
                   <h3 className="text-5xl font-black italic tracking-tighter">#4</h3>
                </div>
             </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: PROGRESS LIST (8 UNITS) */}
          <div className="lg:col-span-8 space-y-6">
             <div className="flex justify-between items-center px-4">
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic flex items-center gap-2">
                   <FiBarChart /> Mapel Progress Analysis
                </h4>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic hover:underline">Full Report</button>
             </div>

             {DATA_PROGRESS.map((item) => (
                <div key={item.mapel} onClick={()=> router.push('/wali-murid/bank-soal/detail')} className="group bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
                   <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-4xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <FiBookOpen />
                   </div>
                   
                   <div className="flex-1 space-y-3 w-full">
                      <div className="flex justify-between items-end">
                         <div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{item.mapel}</h3>
                            <p className="text-[10px] font-bold text-slate-400 italic mt-1 uppercase">Top Weakness: <span className="text-red-500">{item.weakTopic}</span></p>
                         </div>
                         <div className="text-right">
                            <p className="text-2xl font-black italic tracking-tighter text-indigo-600">{item.acc}% <span className="text-[9px] text-slate-400 uppercase">Acc.</span></p>
                         </div>
                      </div>
                      
                      {/* Industrial Progress Bar */}
                      <div className="h-4 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden p-1">
                         <div 
                           className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                           style={{ width: `${(item.done / item.total) * 100}%` }}
                         />
                      </div>
                      <div className="flex justify-between text-[9px] font-black uppercase italic tracking-widest text-slate-400">
                         <span>{item.done} Soal Terlampaui</span>
                         <span>{Math.round((item.done / item.total) * 100)}% Kesiapan</span>
                      </div>
                   </div>

                   <div className="flex flex-col items-center justify-center border-l border-slate-100 dark:border-white/5 pl-8 md:flex">
                      <p className="text-[9px] font-black text-slate-400 uppercase italic mb-1">Grade</p>
                      <p className={`text-4xl font-black italic ${item.acc > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                         {item.acc > 90 ? 'A' : item.acc > 75 ? 'B' : 'C'}
                      </p>
                   </div>
                </div>
             ))}
          </div>

          {/* RIGHT: INSIGHTS & ANALYTICS (4 UNITS) */}
          <div className="lg:col-span-4 space-y-8">
             
             {/* Study Heatmap Mockup */}
             <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] space-y-6">
                <div className="flex justify-between items-center">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Study Consistency</p>
                   <FiActivity className="text-emerald-400" />
                </div>
                <div className="grid grid-cols-7 gap-2">
                   {[...Array(28)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-sm ${i % 3 === 0 ? 'bg-indigo-500' : i % 5 === 0 ? 'bg-indigo-300' : 'bg-white/10'}`} 
                      />
                   ))}
                </div>
                <p className="text-xs italic opacity-60 leading-relaxed">
                   Anak Anda paling produktif pada jam <strong>19:00 - 21:00</strong>. Konsistensi meningkat 15% dari minggu lalu.
                </p>
             </div>

             {/* Predicted Score Card */}
             <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-10 rounded-[3.5rem] space-y-6 relative overflow-hidden">
                <FiPieChart size={120} className="absolute -right-8 -bottom-8 opacity-[0.03] -rotate-12" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Predicted Exam Score</p>
                <div className="flex items-baseline gap-2">
                   <h3 className="text-6xl font-black italic tracking-tighter">84.5</h3>
                   <span className="text-emerald-500 font-black italic">+2.3</span>
                </div>
                <div className="pt-4 space-y-4">
                   <div className="flex items-start gap-3">
                      <FiAlertCircle className="text-amber-500 shrink-0 mt-1" />
                      <p className="text-[11px] font-medium italic text-slate-500">
                         Tingkatkan latihan pada materi <strong>Termodinamika</strong> untuk mengamankan nilai A.
                      </p>
                   </div>
                </div>
                <button className="w-full py-5 bg-indigo-600 text-white rounded-4xl font-black uppercase italic text-[10px] tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-transform">
                   Kirim Motivasi ke Anak
                </button>
             </div>

          </div>
        </div>

        {/* --- BOTTOM ACTION: PARENTAL SUPPORT --- */}
        <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-12 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-600/20 rounded-full flex items-center justify-center text-indigo-600">
                 <FiTarget size={32} />
              </div>
              <div>
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter">Target Lulus PTN</h4>
                 <p className="text-sm font-medium italic text-slate-400 uppercase tracking-widest">Berdasarkan progres saat ini: 89% Peluang Tembus</p>
              </div>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-10 py-5 bg-slate-100 dark:bg-white/5 rounded-2xl font-black uppercase italic text-xs tracking-widest">Set Target Baru</button>
              <button className="flex-1 md:flex-none px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase italic text-xs tracking-widest shadow-lg shadow-indigo-600/30">Hubungi Pembimbing</button>
           </div>
        </div>

      </main>
    </div>
  );
}