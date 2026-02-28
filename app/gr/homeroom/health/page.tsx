"use client";

import React from 'react';
import { 
  FiHeart, FiActivity, FiShield, FiBook, 
  FiTrendingUp, FiTrendingDown, FiAlertCircle, FiCpu 
} from 'react-icons/fi';

const CLASS_HEALTH_DATA = {
  overallScore: 74, // Skala 100
  status: "Needs Attention",
  metrics: [
    { label: "Akademik", score: 68, trend: "down", icon: <FiBook /> },
    { label: "Kedisiplinan", score: 85, trend: "up", icon: <FiShield /> },
    { label: "Keaktifan", score: 62, trend: "stable", icon: <FiActivity /> },
    { label: "Kesejahteraan", score: 81, trend: "up", icon: <FiHeart /> },
  ],
  anomalies: [
    "5 Siswa mengalami penurunan nilai drastis di Matematika.",
    "Tingkat keterlambatan meningkat di hari Senin pagi.",
    "Interaksi orang tua kelas ini terendah dibanding kelas lain."
  ]
};


const ClassHealthDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Main Vital Sign Indicator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white dark:bg-[#0a0f1d] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic mb-6">Class Health Index</p>
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Circular Progress (Simplified) */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-white/5" />
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * 74) / 100} className="text-indigo-600" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white">74%</span>
              <span className="text-[8px] font-bold text-rose-500 uppercase mt-1 italic tracking-widest animate-pulse">Needs Attention</span>
            </div>
          </div>
          <p className="mt-8 text-[11px] font-medium italic text-slate-500 leading-relaxed">
            Kesehatan kelas turun **4%** dari minggu lalu karena kendala di aspek Akademik.
          </p>
        </div>

        {/* 2. Detailed Metrics Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard label="Academic Vital" value="68" trend="down" icon={<FiBook />} color="text-indigo-500" />
          <MetricCard label="Discipline Rate" value="85" trend="up" icon={<FiShield />} color="text-emerald-500" />
          <MetricCard label="Engagement" value="62" trend="stable" icon={<FiActivity />} color="text-amber-500" />
          <MetricCard label="Social Well-being" value="81" trend="up" icon={<FiHeart />} color="text-rose-500" />
        </div>
      </div>

      {/* 3. AI Diagnostic & Anomalies */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-10 border border-white/5 overflow-hidden relative group">
        <FiCpu className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-110 transition-transform duration-1000" size={250} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
              <FiAlertCircle size={24} />
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">AI Class Diagnostic</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnomalyItem text="5 Siswa kritis di Mapel Matematika" />
            <AnomalyItem text="Trend terlambat meningkat di hari Senin" />
            <AnomalyItem text="Respon Wali Murid menurun 12%" />
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-medium italic text-slate-400 max-w-xl">
              "Majid, sistem mendeteksi kelelahan belajar (burnout) ringan pada hari Kamis. Disarankan memberikan metode ice breaking atau penyesuaian jadwal tugas."
            </p>
            <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
              Terapkan Solusi AI
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Sub-components
const MetricCard = ({ label, value, trend, icon, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase text-slate-400 italic tracking-[0.2em] leading-none mb-1">{label}</p>
        <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">{value}%</h4>
      </div>
    </div>
    <div className={`flex items-center gap-1 text-[10px] font-black italic ${trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-slate-400'}`}>
      {trend === 'up' ? <FiTrendingUp /> : trend === 'down' ? <FiTrendingDown /> : null}
      {trend.toUpperCase()}
    </div>
  </div>
);

const AnomalyItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-4 p-5 bg-white/2 rounded-2xl border border-white/5">
    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-pulse" />
    <p className="text-[11px] font-bold italic text-slate-300 uppercase leading-relaxed">{text}</p>
  </div>
);

export default ClassHealthDashboard;