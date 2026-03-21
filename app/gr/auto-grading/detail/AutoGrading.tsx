"use client";

import React, { useState } from 'react';
import { 
  FiZap, FiCheckCircle, FiAlertCircle, FiSearch, 
  FiBarChart2, FiCpu, FiMessageSquare, FiShield 
} from 'react-icons/fi';


export interface Submission {
  id: string;
  studentName: string;
  score: number;
  status: 'graded' | 'pending' | 'flagged';
  aiFeedback: string;
  matchPercentage: number; // Untuk deteksi plagiarisme/kemiripan
}

export const SUBMISSIONS: Submission[] = [
  { id: '1', studentName: 'Ahmad Zaki', score: 88, status: 'graded', aiFeedback: 'Pemahaman konsep API sangat baik, namun perlu optimasi pada error handling.', matchPercentage: 12 },
  { id: '2', studentName: 'Siti Aminah', score: 95, status: 'graded', aiFeedback: 'Struktur kode sangat rapi dan efisien. Luar biasa!', matchPercentage: 5 },
  { id: '3', studentName: 'Budi Santoso', score: 45, status: 'flagged', aiFeedback: 'Terdeteksi kemiripan tinggi dengan sumber eksternal. Perlu review manual.', matchPercentage: 85 },
  { id: '4', studentName: 'Rani Wijaya', score: 0, status: 'pending', aiFeedback: '', matchPercentage: 0 },
];

const AutoGrading = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GradingStatCard icon={<FiCheckCircle />} label="Sudah Dinilai" value="28/32" color="text-emerald-500" />
        <GradingStatCard icon={<FiBarChart2 />} label="Rata-rata Kelas" value="82.5" color="text-cyan-500" />
        <GradingStatCard icon={<FiShield />} label="Indikasi Plagiarisme" value="2" color="text-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Submission List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-cyan-900/20 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white">Daftar Pengumpulan</h3>
              <div className="relative group">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500" />
                <input type="text" placeholder="Cari siswa..." className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-cyan-950/20 rounded-xl text-[10px] font-bold outline-none border border-transparent focus:border-cyan-500" />
              </div>
            </div>

            <div className="space-y-4">
              {SUBMISSIONS.map((sub) => (
                <div key={sub.id} className="group p-5 rounded-2xl border border-slate-50 dark:border-cyan-950/20 hover:border-cyan-500/50 hover:bg-slate-50/50 dark:hover:bg-cyan-500/5 transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs 
                        ${sub.status === 'graded' ? 'bg-emerald-500/10 text-emerald-500' : 
                          sub.status === 'flagged' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                        {sub.studentName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black uppercase italic text-slate-800 dark:text-white leading-none">{sub.studentName}</h4>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status: {sub.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black italic tracking-tighter ${sub.status === 'flagged' ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                        {sub.status === 'pending' ? '--' : sub.score}
                      </p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase italic">Points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: AI Insights Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-cyan-600 to-emerald-700 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
            <FiCpu className="absolute -right-10 -top-10 text-white/10" size={180} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest">AI Analyst</div>
                <div className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Umpan Balik Otomatis</h3>
              <div className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 space-y-4">
                <p className="text-[11px] font-medium leading-relaxed italic">
                  "Berdasarkan analisis AI, 60% siswa kesulitan pada bagian <strong>Implementasi Middleware</strong>. Disarankan untuk memberikan penguatan materi pada sesi berikutnya."
                </p>
                <button className="w-full py-3 bg-white text-cyan-600 rounded-xl text-[9px] font-black uppercase tracking-widest italic hover:bg-cyan-50 transition-all shadow-lg">
                  Kirim Feedback Massal
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-cyan-900/20">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 italic">Detection System</h3>
            <div className="flex items-center justify-between p-4 bg-rose-500/5 rounded-2xl border border-rose-500/10">
              <div className="flex items-center gap-3">
                <FiAlertCircle className="text-rose-500" />
                <span className="text-[10px] font-black uppercase italic text-slate-700 dark:text-slate-300">Flagged for Review</span>
              </div>
              <span className="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black italic">02</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const GradingStatCard = ({ icon, label, value, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-cyan-900/20 shadow-sm flex items-center gap-5 group hover:-translate-y-1 transition-all duration-500">
    <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-cyan-950/30 flex items-center justify-center text-2xl ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic leading-none">{label}</p>
      <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mt-1">{value}</h4>
    </div>
  </div>
);

export default AutoGrading;