"use client";

import React from 'react';
import { 
  FiZap, FiDatabase, FiFileText, FiPlus, 
  FiArrowRight, FiPieChart, FiBarChart, FiShield 
} from 'react-icons/fi';

const BANK_SOAL_CATEGORIES = [
  { 
    id: 'B1', subject: 'Informatika', totalQuestions: 120, 
    examSets: 5, usedCount: 12, qualityScore: 92,
    lastUpdate: '2 jam yang lalu', color: 'bg-indigo-500' 
  },
  { 
    id: 'B2', subject: 'Basis Data', totalQuestions: 85, 
    examSets: 3, usedCount: 8, qualityScore: 78,
    lastUpdate: '1 hari yang lalu', color: 'bg-violet-500' 
  },
  { 
    id: 'B3', subject: 'Web Dev', totalQuestions: 150, 
    examSets: 8, usedCount: 24, qualityScore: 95,
    lastUpdate: 'Baru saja', color: 'bg-cyan-500' 
  },
];

const BankSoalList = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Global Question Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <BankStat icon={<FiDatabase />} label="Total Bank Soal" value="355" sub="Butir Soal" color="text-indigo-500" />
        <BankStat icon={<FiShield />} label="Tingkat Validitas" value="88%" sub="High Quality" color="text-emerald-500" />
        <BankStat icon={<FiPieChart />} label="Tingkat Kesulitan" value="Medium" sub="Balance" color="text-amber-500" />
        <BankStat icon={<FiZap />} label="CBT Aktif" value="02" sub="Sedang Berlangsung" color="text-rose-500" />
      </div>

      <div className="flex justify-between items-center px-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Repository Mata Pelajaran</h3>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase italic flex items-center gap-2 hover:bg-indigo-700 transition-all">
          <FiPlus /> Buat Bank Soal Baru
        </button>
      </div>

      {/* 2. Category List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BANK_SOAL_CATEGORIES.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-white/5 p-8 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 rounded-2xl ${cat.color} text-white flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/10`}>
                <FiFileText />
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black text-slate-400 uppercase italic">Quality Score</p>
                <p className={`text-sm font-black italic ${cat.qualityScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{cat.qualityScore}%</p>
              </div>
            </div>

            <div className="space-y-1 mb-8">
              <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cat.subject}</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Update: {cat.lastUpdate}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Butir Soal</p>
                <p className="text-lg font-black italic text-slate-900 dark:text-white">{cat.totalQuestions}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Paket Ujian</p>
                <p className="text-lg font-black italic text-slate-900 dark:text-white">{cat.examSets}</p>
              </div>
            </div>

            <button className="w-full py-4 bg-slate-100 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
              Buka Repository <FiArrowRight />
            </button>
          </div>
        ))}
      </div>

      {/* 3. AI Insights: Question Distribution */}
      <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3.5rem] border border-slate-200 dark:border-white/5 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 italic mb-4">Distribution Analysis (AI)</h5>
          <p className="text-sm font-medium italic text-slate-500 leading-relaxed">
            "Majid, koleksi soal **Basis Data** Anda didominasi oleh tingkat 'Mudah' (60%). Untuk persiapan UTS, AI merekomendasikan penambahan 15 soal tingkat 'Analisis/HOTS' agar sebaran kognitif lebih seimbang."
          </p>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
           <SimpleDistribution label="Mengingat" value="40%" color="bg-emerald-500" />
           <SimpleDistribution label="Memahami" value="35%" color="bg-indigo-500" />
           <SimpleDistribution label="Menerapkan" value="20%" color="bg-amber-500" />
           <SimpleDistribution label="Menganalisis" value="5%" color="bg-rose-500" />
        </div>
      </div>

    </div>
  );
};

const SimpleDistribution = ({ label, value, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[8px] font-black uppercase italic text-slate-400">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: value }} />
    </div>
  </div>
);

const BankStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default BankSoalList;