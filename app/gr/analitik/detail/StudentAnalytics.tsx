"use client";

import React from 'react';
import { 
  FiTrendingUp, FiTrendingDown, FiUser, FiActivity, 
  FiPieChart, FiBarChart, FiZap, FiTarget 
} from 'react-icons/fi';

const StudentAnalytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Global Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard label="Rata-rata Kelas" value="84.2" trend="+5.4%" up={true} />
        <AnalyticCard label="Tingkat Kelulusan" value="92%" trend="+2.1%" up={true} />
        <AnalyticCard label="Siswa Aktif" value="31/32" trend="Normal" up={true} />
        <AnalyticCard label="Butuh Perhatian" value="03" trend="-15%" up={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. Visual Chart Mockup (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white leading-none">Progres Belajar Kelas</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Perbandingan 4 Bulan Terakhir</p>
              </div>
              <FiActivity className="text-indigo-500 animate-pulse" />
            </div>

            {/* Mock Chart Visualization */}
            <div className="h-64 flex items-end justify-between gap-4 px-4 border-b border-slate-100 dark:border-indigo-900/20 pb-2">
              {[60, 85, 70, 95, 80, 100].map((height, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center">
                  <div 
                    style={{ height: `${height}%` }} 
                    className="w-full max-w-10 bg-linear-to-t from-indigo-600 to-cyan-400 rounded-t-xl group-hover:brightness-110 transition-all duration-700"
                  />
                  <span className="absolute -top-8 text-[10px] font-black italic text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">
              <span>Minggu 1</span>
              <span>Minggu 2</span>
              <span>Minggu 3</span>
              <span>Minggu 4</span>
              <span>Minggu 5</span>
              <span>Minggu 6</span>
            </div>
          </div>
        </div>

        {/* 3. AI Learning Style Analysis (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-linear-to-br from-[#0a0f1d] to-[#1a1f3d] p-8 rounded-[3rem] border border-indigo-500/20 text-white relative overflow-hidden group">
            <FiZap className="absolute -right-6 -top-6 text-indigo-500/20 group-hover:scale-110 transition-transform" size={150} />
            
            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 italic">Gaya Belajar Kelas (AI)</h4>
            
            <div className="space-y-6 relative z-10">
              <LearningStyleItem label="Visual Learner" value={65} color="bg-cyan-500" />
              <LearningStyleItem label="Auditory Learner" value={20} color="bg-violet-500" />
              <LearningStyleItem label="Kinesthetic" value={15} color="bg-emerald-500" />
            </div>

            <div className="mt-10 p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <p className="text-[10px] font-medium leading-relaxed italic text-indigo-200">
                "Strategi terbaik minggu ini: Gunakan <strong>Media Studio</strong> berbasis video untuk hasil maksimal."
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Top Students Table (Compact) */}
      <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm">
        <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white mb-6">Siswa dengan Peningkatan Tertinggi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TopStudentItem name="Ahmad Zaki" increase="+12%" subject="Algoritma" />
          <TopStudentItem name="Siti Aminah" increase="+8%" subject="Web Dev" />
          <TopStudentItem name="Rani Wijaya" increase="+15%" subject="Database" />
        </div>
      </div>
    </div>
  );
};

// Sub-components
const AnalyticCard = ({ label, value, trend, up }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm group hover:border-indigo-500/50 transition-all">
    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">{label}</p>
    <div className="flex items-end justify-between mt-2">
      <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
      <div className={`flex items-center gap-1 text-[10px] font-black italic ${up ? 'text-emerald-500' : 'text-rose-500'}`}>
        {up ? <FiTrendingUp /> : <FiTrendingDown />} {trend}
      </div>
    </div>
  </div>
);

const LearningStyleItem = ({ label, value, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
      <span className="text-slate-400">{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

const TopStudentItem = ({ name, increase, subject }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-indigo-950/20 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all">
    <div>
      <p className="text-[10px] font-black uppercase italic text-slate-800 dark:text-white">{name}</p>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{subject}</p>
    </div>
    <span className="text-xs font-black italic text-emerald-500">{increase}</span>
  </div>
);

export default StudentAnalytics;