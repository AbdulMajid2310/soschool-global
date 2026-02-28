"use client";

import React, { useState } from 'react';
import { 
  FiActivity, FiPlus, FiSearch, FiTrendingUp, 
  FiMinusCircle, FiCheckCircle, FiAward, FiAlertTriangle 
} from 'react-icons/fi';

export interface BehaviorLog {
  id: string;
  studentName: string;
  type: 'positive' | 'negative';
  category: string;
  points: number;
  note: string;
  date: string;
}

export const BEHAVIOR_LOGS: BehaviorLog[] = [
  { id: '1', studentName: 'Ahmad Zaki', type: 'positive', category: 'Leadership', points: 50, note: 'Membantu memimpin diskusi kelompok dengan sangat baik.', date: '10:30 AM' },
  { id: '2', studentName: 'Siti Aminah', type: 'positive', category: 'Creative', points: 30, note: 'Memberikan ide inovatif pada proyek IoT.', date: '09:15 AM' },
  { id: '3', studentName: 'Budi Santoso', type: 'negative', category: 'Discipline', points: -20, note: 'Terlambat masuk kelas tanpa keterangan.', date: '08:00 AM' },
];

const BehaviorTracker = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
      
      {/* LEFT: Student List & Action (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Quick Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Cari nama siswa..." 
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#0a0f1d] rounded-2xl border border-slate-200 dark:border-indigo-900/20 text-xs font-bold outline-none focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
            <FiPlus size={16} /> Input Poin Baru
          </button>
        </div>

        {/* Logs Timeline */}
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white">Aktivitas Perilaku Terbaru</h3>
            <div className="flex gap-2 bg-slate-100 dark:bg-indigo-950/40 p-1 rounded-xl">
              <TabButton active={activeTab === 'all'} label="Semua" onClick={() => setActiveTab('all')} />
              <TabButton active={activeTab === 'positive'} label="Positif" onClick={() => setActiveTab('positive')} />
              <TabButton active={activeTab === 'negative'} label="Negatif" onClick={() => setActiveTab('negative')} />
            </div>
          </div>

          <div className="space-y-6">
            {BEHAVIOR_LOGS.map((log) => (
              <div key={log.id} className="group relative flex gap-6 p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 border-white dark:border-[#0a0f1d] shadow-lg
                  ${log.type === 'positive' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-rose-500/20'}`}>
                  {log.type === 'positive' ? <FiCheckCircle size={20} /> : <FiAlertTriangle size={20} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-black uppercase italic text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">{log.studentName}</h4>
                      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">{log.category}</p>
                    </div>
                    <span className={`text-xs font-black italic ${log.type === 'positive' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {log.points > 0 ? `+${log.points}` : log.points} XP
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    "{log.note}"
                  </p>
                  <p className="mt-2 text-[8px] font-black text-slate-300 uppercase tracking-tighter">{log.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Top Achievement & Summary (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Top Points Card */}
        <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <FiAward size={120} className="absolute -right-5 -bottom-5 text-white/10 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic text-indigo-200">Star Student</h3>
            <p className="text-2xl font-black italic uppercase tracking-tighter mt-2">Ahmad Zaki</p>
            <div className="mt-6 flex items-center gap-2">
              <FiTrendingUp className="text-emerald-400" />
              <span className="text-xs font-bold text-indigo-100 italic">+450 XP Minggu ini</span>
            </div>
          </div>
        </div>

        {/* Categories Summary */}
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 italic">Statistik Perilaku</h3>
          <div className="space-y-4">
            <ProgressStat label="Discipline" value={70} color="bg-indigo-500" />
            <ProgressStat label="Social Care" value={85} color="bg-emerald-500" />
            <ProgressStat label="Innovation" value={40} color="bg-amber-500" />
            <ProgressStat label="Ethics" value={95} color="bg-cyan-500" />
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Components
const TabButton = ({ active, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest italic transition-all
    ${active ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-indigo-500'}`}>
    {label}
  </button>
);

const ProgressStat = ({ label, value, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 dark:text-white">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 dark:bg-indigo-950/40 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default BehaviorTracker;