"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

// --- TYPES ---
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Topic {
  id: string;
  title: string;
  subject: string;
  totalSoal: number;
  completed: number;
  difficulty: Difficulty;
  icon: string;
}

// --- DATA LEBIH BANYAK & REALISTIS ---
const TOPICS: Topic[] = [
  { id: '1', title: "Logaritma", subject: "Matematika", totalSoal: 40, completed: 40, difficulty: "Hard", icon: "log" },
  { id: '2', title: "Struktur Atom", subject: "Kimia", totalSoal: 25, completed: 10, difficulty: "Medium", icon: "atom" },
  { id: '3', title: "Ekonomi Makro", subject: "Ekonomi", totalSoal: 30, completed: 0, difficulty: "Easy", icon: "money" },
  { id: '4', title: "Termodinamika", subject: "Fisika", totalSoal: 35, completed: 5, difficulty: "Hard", icon: "fire" },
  { id: '5', title: "Sel Hewan", subject: "Biologi", totalSoal: 20, completed: 20, difficulty: "Medium", icon: "dna" },
  { id: '6', title: "Zaman Batu", subject: "Sejarah", totalSoal: 15, completed: 3, difficulty: "Easy", icon: "stone" },
  { id: '7', title: "Trigonometri", subject: "Matematika", totalSoal: 50, completed: 0, difficulty: "Hard", icon: "angle" },
  { id: '8', title: "Teks Prosedur", subject: "B. Indonesia", totalSoal: 10, completed: 10, difficulty: "Easy", icon: "doc" },
];

export default function BankSoalSiswa() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Compact Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-4xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Pusat Latihan <span className="text-blue-600">SoSchool</span></h1>
            <p className="text-sm text-zinc-500 font-medium">Pilih topik materi untuk mulai eksplorasi soal.</p>
          </div>
          <div className="flex gap-3">
             <div className="text-right px-4 border-r border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Poin Kamu</p>
                <p className="text-lg font-black text-blue-600">2,450</p>
             </div>
             <div className="text-right px-4">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Peringkat</p>
                <p className="text-lg font-black text-emerald-500">#12</p>
             </div>
          </div>
        </header>

        {/* Grid: 4 Kolom di Layar Besar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  const isDone = topic.completed === topic.totalSoal;
  const progress = Math.round((topic.completed / topic.totalSoal) * 100);
  const router = useRouter()

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-4xl p-5 hover:border-blue-500 dark:hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between overflow-hidden">
      
      {/* Decorative Gradient Background (Low Opacity) */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-zinc-100 dark:border-zinc-700 shadow-sm">
            <IconPlaceholder type={topic.icon} />
          </div>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg border ${
            topic.difficulty === 'Hard' ? 'text-red-500 bg-red-50 dark:bg-red-500/10 border-red-100' :
            topic.difficulty === 'Medium' ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-100' :
            'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100'
          }`}>
            {topic.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-bold leading-tight mb-1 truncate group-hover:text-blue-600 transition-colors">
          {topic.title}
        </h3>
        <p className="text-xs text-zinc-400 font-bold tracking-tight uppercase mb-5">{topic.subject}</p>

        {/* Compact Progress */}
        <div className="space-y-1.5 mb-6">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
            <span className="text-zinc-400 italic">Progress</span>
            <span className={isDone ? 'text-emerald-500' : 'text-zinc-600 dark:text-zinc-300'}>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${isDone ? 'bg-emerald-500' : 'bg-blue-600'}`} 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-zinc-400 font-medium tracking-tight">
            {topic.completed} dari {topic.totalSoal} soal tuntas
          </p>
        </div>
      </div>

      <button onClick={()=> router.push('/siswa/bank-soal/detail')} className={`w-full py-3 rounded-2xl font-black text-[10px] tracking-widest transition-all transform active:scale-95 cursor-pointer ${
        isDone 
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20' 
        : 'bg-zinc-900 dark:bg-white dark:text-zinc-950 text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white shadow-lg shadow-zinc-200 dark:shadow-none'
      }`}>
        {isDone ? 'LIHAT HASIL' : 'MULAI'}
      </button>
    </div>
  );
}

// Simple Helper for Icons
function IconPlaceholder({ type }: { type: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}