"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  FiZap, FiTarget, FiBarChart2, 
  FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';

// --- TS INTERFACES ---
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Topic {
  id: string;
  title: string;
  subject: string;
  totalSoal: number;
  completed: number;
  difficulty: Difficulty;
  imageUrl: string; // Menggunakan Image URL
}

// --- DATA DENGAN IMAGE URL ---
const TOPICS: Topic[] = [
  { id: '1', title: "Logaritma", subject: "Matematika", totalSoal: 40, completed: 40, difficulty: "Hard", imageUrl: "https://illustrations.popsy.co/amber/mathematics.svg" },
  { id: '2', title: "Struktur Atom", subject: "Kimia", totalSoal: 25, completed: 10, difficulty: "Medium", imageUrl: "https://illustrations.popsy.co/amber/creative-work.svg" },
  { id: '3', title: "Ekonomi Makro", subject: "Ekonomi", totalSoal: 30, completed: 0, difficulty: "Easy", imageUrl: "https://illustrations.popsy.co/amber/digital-currency.svg" },
  { id: '4', title: "Termodinamika", subject: "Fisika", totalSoal: 35, completed: 5, difficulty: "Hard", imageUrl: "https://illustrations.popsy.co/amber/energy-drink.svg" },
  { id: '5', title: "Sel Hewan", subject: "Biologi", totalSoal: 20, completed: 20, difficulty: "Medium", imageUrl: "https://illustrations.popsy.co/amber/dna.svg" },
  { id: '6', title: "Zaman Batu", subject: "Sejarah", totalSoal: 15, completed: 3, difficulty: "Easy", imageUrl: "https://illustrations.popsy.co/amber/archaeology.svg" },
  { id: '7', title: "Trigonometri", subject: "Matematika", totalSoal: 50, completed: 0, difficulty: "Hard", imageUrl: "https://illustrations.popsy.co/amber/geography.svg" },
  { id: '8', title: "Teks Prosedur", subject: "B. Indonesia", totalSoal: 10, completed: 10, difficulty: "Easy", imageUrl: "https://illustrations.popsy.co/amber/writing.svg" },
];

export default function BankSoalSiswa() {
  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-slate-50  dark:bg-[#050811] text-slate-900  dark:text-slate-100 px-4 pt-20 transition-colors duration-300">
      <div className="w-full space-y-10">
        
        {/* --- HEADER --- */}
        <header className="relative bg-white  dark:bg-zinc-900 p-6 px-10 rounded-4xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter">
              Pusat Latihan <span className="text-blue-600">SoSchool</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Pilih mata pelajaran dan asah kemampuanmu hari ini.</p>
          </div>

          <div className="flex items-center gap-8 relative z-10">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1"><FiZap className="text-amber-500 fill-amber-500" /> Total XP</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white italic">2,450</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1"><FiTarget className="text-emerald-500" /> Global Rank</p>
                <p className="text-4xl font-black text-emerald-500 italic">#12</p>
             </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -top-20 -left-20 size-60 bg-blue-600/10 blur-3xl rounded-full" />
        </header>

        {/* --- TOPICS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
  const router = useRouter();

  const difficultyColors = {
    Hard: "text-red-500 bg-red-500/10 border-red-500/20",
    Medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    Easy: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
  };

  return (
    <div className="group bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-4xl p-1 shadow-xs hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
      
      {/* Top Section: Image Content */}
      <div className="relative h-48 w-full rounded-[28px] overflow-hidden bg-slate-100 dark:bg-white/5">
        <img 
          src={topic.imageUrl} 
          alt={topic.title}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 right-4">
           <span className={`text-[9px] font-black px-3 py-1 rounded-full border backdrop-blur-md uppercase tracking-widest ${difficultyColors[topic.difficulty]}`}>
             {topic.difficulty}
           </span>
        </div>
      </div>

      <div className="p-4 space-y-5">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white italic tracking-tight truncate group-hover:text-blue-600 transition-colors">
            {topic.title}
          </h3>
          <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">{topic.subject}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-black uppercase">
            <span className="text-slate-400">Progress</span>
            <span className={isDone ? 'text-emerald-500' : 'text-blue-600 dark:text-blue-400'}>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${isDone ? 'bg-emerald-500' : 'bg-blue-600'}`} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => router.push('/siswa/bank-soal/detail')}
          className={`w-full py-4 rounded-3xl font-black text-[10px] tracking-[0.2em] uppercase transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
            isDone 
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500' 
            : 'bg-slate-900 dark:bg-white dark:text-slate-950 text-white hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white'
          } hover:shadow-lg group-hover:translate-y-0.5`}
        >
          {isDone ? 'LIHAT ANALISA' : 'KERJAKAN SEKARANG'}
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}