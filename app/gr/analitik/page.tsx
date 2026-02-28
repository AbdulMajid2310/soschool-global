"use client";

import React from 'react';
import { 
  FiBarChart2, FiTrendingUp, FiActivity, FiArrowRight, 
  FiAlertCircle, FiCheckCircle, FiUsers, FiCpu 
} from 'react-icons/fi';

const ANALYTICS_CLASSES = [
  { 
    id: 'A1', name: '10-IPA-1', subject: 'Informatika', 
    totalStudents: 32, performance: 92, engagement: 88,
    insight: 'Kelas paling konsisten. Fokus pada materi pengayaan HOTS untuk menjaga motivasi.',
    status: 'High Performer', color: 'text-emerald-500', bg: 'bg-emerald-500/10'
  },
  { 
    id: 'A2', name: '11-RPL-2', subject: 'Basis Data', 
    totalStudents: 30, performance: 68, engagement: 62,
    insight: 'Anomali terdeteksi pada tugas kelompok. Butuh intervensi pada kolaborasi antar siswa.',
    status: 'Underperforming', color: 'text-rose-500', bg: 'bg-rose-500/10'
  },
  { 
    id: 'A3', name: '12-RPL-1', subject: 'Web Dev', 
    totalStudents: 28, performance: 85, engagement: 94,
    insight: 'Keaktifan tinggi namun akurasi tugas menurun. Periksa beban kerja koding mingguan.',
    status: 'Active but Volatile', color: 'text-amber-500', bg: 'bg-amber-500/10'
  },
];

const StudentAnalyticsList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Analytic Summary Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Student <span className="text-indigo-600">Analytics</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 italic">
            Ringkasan Performa & Prediksi AI Per Rombel
          </p>
        </div>
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-4">
           <FiCpu className="text-indigo-500 animate-pulse" size={24} />
           <p className="text-[10px] font-black italic text-indigo-600 uppercase leading-none">AI Engine: Active & Analyzing</p>
        </div>
      </div>

      {/* 2. Class Analytics Cards */}
      <div className="grid grid-cols-1 gap-6">
        {ANALYTICS_CLASSES.map((cls) => (
          <div key={cls.id} className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-white/5 p-8 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              
              {/* Class & Subject Info */}
              <div className="lg:w-1/4">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black italic uppercase tracking-widest ${cls.bg} ${cls.color} mb-4 inline-block`}>
                  {cls.status}
                </span>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
                <div className="flex items-center gap-2 mt-4 text-slate-400">
                  <FiUsers size={14} />
                  <span className="text-[10px] font-black italic">{cls.totalStudents} Siswa Terdaftar</span>
                </div>
              </div>

              {/* Data Visualization Bars */}
              <div className="flex-1 space-y-6 px-0 lg:px-10 border-x border-slate-100 dark:border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-[9px] font-black uppercase italic tracking-widest">
                    <span className="text-slate-400 flex items-center gap-2"><FiBarChart2 /> Academic Rank</span>
                    <span className="text-indigo-600">{cls.performance}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${cls.performance}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end text-[9px] font-black uppercase italic tracking-widest">
                    <span className="text-slate-400 flex items-center gap-2"><FiActivity /> Participation Rate</span>
                    <span className="text-emerald-500">{cls.engagement}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cls.engagement}%` }} />
                  </div>
                </div>
              </div>

              {/* AI Insight Paragraph */}
              <div className="lg:w-1/3 bg-slate-50 dark:bg-white/2 p-6 rounded-2xl border border-slate-100 dark:border-white/5 relative group-hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-3 text-indigo-500">
                  <FiCpu size={14} />
                  <p className="text-[9px] font-black uppercase italic tracking-widest">AI Intelligence Insight</p>
                </div>
                <p className="text-[11px] font-medium italic text-slate-500 dark:text-slate-400 leading-relaxed">
                  "{cls.insight}"
                </p>
                <button className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Detail Siswa <FiArrowRight />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. Global Anomaly Alert */}
      <div className="p-8 bg-linear-to-br from-rose-600 to-rose-800 rounded-[3.5rem] text-white shadow-xl shadow-rose-500/20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
         <FiAlertCircle className="absolute -right-6 -bottom-6 text-white/10 group-hover:scale-110 transition-transform duration-700" size={180} />
         <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white text-3xl shrink-0">
            <FiTrendingUp className="rotate-180" />
         </div>
         <div className="flex-1 text-center md:text-left relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200 mb-2 italic">Critical Performance Drop Alert</h4>
            <p className="text-lg font-medium italic leading-relaxed">
              "Majid, sistem mendeteksi penurunan nilai rata-rata sebesar **14%** secara kolektif di semua kelas pada topik **Logic & Programming**. Hal ini mungkin disebabkan oleh kompleksitas kurikulum baru. Sarankan sesi sinkronisasi ulang."
            </p>
         </div>
         <button className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-[10px] font-black uppercase italic shadow-xl relative z-10 hover:scale-105 transition-transform">
            Buka Analisis Topik
         </button>
      </div>

    </div>
  );
};

export default StudentAnalyticsList;