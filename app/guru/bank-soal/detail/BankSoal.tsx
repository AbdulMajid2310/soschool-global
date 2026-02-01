"use client";

import React from 'react';
import { 
  FiDatabase, FiPlus, FiGrid, FiFileText, 
  FiMoreVertical, FiCpu, FiBarChart, FiSearch 
} from 'react-icons/fi';

export interface QuestionBank {
  id: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  difficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  lastUpdate: string;
}

export const TEACHER_COLLECTIONS: QuestionBank[] = [
  { 
    id: '1', subject: 'Informatika', topic: 'Struktur Data & Algoritma', 
    totalQuestions: 120, difficulty: { easy: 50, medium: 45, hard: 25 },
    lastUpdate: '2 jam yang lalu' 
  },
  { 
    id: '2', subject: 'Basis Data', topic: 'Normalisasi & SQL', 
    totalQuestions: 85, difficulty: { easy: 30, medium: 40, hard: 15 },
    lastUpdate: '1 hari yang lalu' 
  },
  { 
    id: '3', subject: 'Pemrograman Web', topic: 'React Framework v19', 
    totalQuestions: 64, difficulty: { easy: 20, medium: 30, hard: 14 },
    lastUpdate: '5 Feb 2026' 
  },
];

const BankSoal = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* AI Smart Action */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-700 p-8 rounded-[3rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <FiCpu className="absolute -left-10 -bottom-10 text-white/10" size={200} />
        <div className="relative z-10">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">AI Question Generator</h2>
          <p className="text-xs font-medium opacity-80 mt-1 uppercase tracking-widest">Buat soal otomatis dari materi PDF atau Video Studio Anda.</p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-violet-600 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-violet-50 transition-all shadow-xl">
          Generate Soal Sekarang
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-400">Koleksi Bank Soal</h3>
        <button className="flex items-center gap-2 text-violet-500 font-black text-[10px] uppercase italic hover:underline">
          <FiPlus /> Buat Folder Baru
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEACHER_COLLECTIONS.map((folder) => (
          <div key={folder.id} className="group bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-violet-900/20 hover:border-violet-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500 text-2xl group-hover:bg-violet-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <FiDatabase />
              </div>
              <button className="text-slate-300 hover:text-violet-500">
                <FiMoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-1 mb-8">
              <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
                {folder.topic}
              </h4>
              <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest italic">{folder.subject}</p>
            </div>

            {/* Difficulty Bar */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic text-slate-400">
                <span>Total: {folder.totalQuestions} Soal</span>
                <span className="text-slate-300">Update: {folder.lastUpdate}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-violet-950/40 rounded-full flex overflow-hidden">
                <div style={{ width: `${(folder.difficulty.easy / folder.totalQuestions) * 100}%` }} className="bg-emerald-500 h-full" title="Easy" />
                <div style={{ width: `${(folder.difficulty.medium / folder.totalQuestions) * 100}%` }} className="bg-amber-500 h-full" title="Medium" />
                <div style={{ width: `${(folder.difficulty.hard / folder.totalQuestions) * 100}%` }} className="bg-rose-500 h-full" title="Hard" />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-violet-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest italic hover:bg-violet-700 shadow-lg shadow-violet-500/20 transition-all">
                Kelola Soal
              </button>
              <button className="px-4 py-3 border border-slate-100 dark:border-violet-900/30 text-slate-400 rounded-xl hover:text-violet-500 transition-all">
                <FiBarChart size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankSoal;