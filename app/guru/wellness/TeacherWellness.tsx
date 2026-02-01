"use client";

import React from 'react';
import { 
  FiHeart, FiCoffee, FiSmile, FiBarChart, 
  FiAward, FiSun, FiMoon, FiBattery, FiWind 
} from 'react-icons/fi';

export const WELLNESS_STATS = {
  workloadIndex: 65, // Persentase beban kerja minggu ini
  burnoutRisk: 'Rendah',
  teachingHours: 24,
  pointsEarned: 1250, // Poin apresiasi dari sekolah/siswa
};

export const MOOD_HISTORY = [
  { day: 'Sen', mood: 'Happy' },
  { day: 'Sel', mood: 'Productive' },
  { day: 'Rab', mood: 'Tired' },
  { day: 'Kam', mood: 'Energetic' },
  { day: 'Jum', mood: 'Happy' },
];

const TeacherWellness = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in duration-700">
      
      {/* 1. Main Wellness Card (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1d] p-10 rounded-[3rem] border border-slate-200 dark:border-emerald-900/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <FiHeart size={150} className="text-emerald-500" />
          </div>

          <div className="relative z-10">
            <h3 className="text-sm font-black uppercase italic tracking-[0.2em] text-emerald-500 mb-2">Teacher Wellness Index</h3>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
              Halo Majid, Kondisi Anda <span className="text-emerald-500 text-glow-emerald">Sangat Baik</span>
            </h2>
            <p className="mt-4 text-[11px] font-medium text-slate-500 dark:text-slate-400 max-w-md leading-relaxed italic">
              Beban kerja Anda minggu ini berada di angka ideal. Jangan lupa untuk mengambil jeda istirahat 15 menit setelah sesi mengajar berikutnya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <WellnessMetric icon={<FiBattery />} label="Energy Level" value="85%" color="bg-emerald-500" />
              <WellnessMetric icon={<FiCoffee />} label="Workload" value="65%" color="bg-amber-500" />
              <WellnessMetric icon={<FiWind />} label="Focus" value="90%" color="bg-cyan-500" />
            </div>
          </div>
        </div>

        {/* Weekly Mood Tracker */}
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-emerald-900/20 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">Mood Tracker Mingguan</h3>
          <div className="flex justify-between items-center px-4">
            {['S', 'S', 'R', 'K', 'J'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110
                  ${i === 4 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 dark:bg-emerald-950/20 text-emerald-500'}`}>
                  <FiSmile />
                </div>
                <span className="text-[10px] font-black text-slate-400 italic">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Rewards & Benefits (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Points & Achievement */}
        <div className="bg-linear-to-br from-emerald-600 to-teal-700 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
          <FiAward className="absolute -right-5 -bottom-5 text-white/10 group-hover:rotate-12 transition-transform" size={150} />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 italic">Teacher Points</p>
            <h4 className="text-4xl font-black italic tracking-tighter mt-2">1,250 <span className="text-sm font-bold opacity-60 uppercase">XP</span></h4>
            <div className="mt-8 space-y-3">
              <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-100">Reward Tersedia:</p>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex justify-between items-center text-[10px] font-black italic">
                <span>Voucher Coffee Bar</span>
                <span className="text-emerald-300">CLAIM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wellness Tip */}
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-emerald-900/20">
          <div className="flex items-center gap-3 text-emerald-500 mb-4">
            <FiSun size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest italic">Daily Tip</span>
          </div>
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
            "Cobalah teknik pernapasan 4-7-8 sebelum memulai kelas untuk meningkatkan fokus dan menurunkan tingkat stres Anda hari ini."
          </p>
        </div>

        <button className="w-full py-5 bg-slate-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-emerald-600 hover:text-white transition-all">
          Ajukan Cuti/Izin
        </button>
      </div>

    </div>
  );
};

// Helper Components
const WellnessMetric = ({ icon, label, value, color }: any) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-slate-400">
      <span className="text-lg">{icon}</span>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-xl font-black italic text-slate-900 dark:text-white">{value}</div>
    <div className="h-1.5 w-full bg-slate-100 dark:bg-emerald-950/40 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: value }} />
    </div>
  </div>
);

export default TeacherWellness;