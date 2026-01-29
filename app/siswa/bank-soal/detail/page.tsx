"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- TYPES ---
type Status = 'correct' | 'wrong' | 'unattempted';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Question {
  id: string;
  index: number;
  status: Status;
  difficulty: Difficulty;
}

interface SubChapter {
  id: string;
  title: string;
  type: 'Video' | 'Reading' | 'Quiz';
  duration: string;
  points: number;
  isLocked: boolean;
  questions: Question[];
}

// --- DATA KOMPLEKS & REALISTIS ---
const SYLLABUS: SubChapter[] = [
  {
    id: 'm1',
    title: "Konsep Dasar Eksponen",
    type: 'Video',
    duration: "12m",
    points: 100,
    isLocked: false,
    questions: []
  },
  {
    id: 'm2',
    title: "Sifat-sifat Logaritma Dasar",
    type: 'Quiz',
    duration: "25m",
    points: 250,
    isLocked: false,
    questions: Array.from({ length: 10 }, (_, i) => ({
      id: `q2-${i}`, index: i + 1, status: i < 3 ? 'correct' : i === 4 ? 'wrong' : 'unattempted', difficulty: 'Easy'
    }))
  },
  {
    id: 'm3',
    title: "Manipulasi Aljabar Logaritma",
    type: 'Reading',
    duration: "15m",
    points: 50,
    isLocked: false,
    questions: []
  },
  {
    id: 'm4',
    title: "Persamaan Logaritma Level HOTS",
    type: 'Quiz',
    duration: "45m",
    points: 500,
    isLocked: true,
    questions: Array.from({ length: 15 }, (_, i) => ({
      id: `q4-${i}`, index: i + 1, status: 'unattempted', difficulty: 'Hard'
    }))
  }
];

export default function DetailBankSoal() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'stats'>('syllabus');
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500 font-sans">
      
      {/* HEADER SECTION */}
      <header className="relative h-75 flex items-end bg-zinc-900 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-purple-600/20 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 z-0" />
        
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 relative z-10">
          <Link href="/student/bank-soal" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-xs font-black uppercase tracking-[0.2em] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Kembali
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Matematika Wajib</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white italic">Logaritma</h1>
              <p className="text-zinc-400 font-medium max-w-lg">Kuasai konsep invers eksponensial dari dasar hingga soal olimpiade (HOTS).</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl min-w-30">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Progress</p>
                  <p className="text-3xl font-black text-white italic">32%</p>
               </div>
               <div className="bg-blue-600 p-4 rounded-3xl min-w-30 shadow-xl shadow-blue-500/30">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Total Poin</p>
                  <p className="text-3xl font-black text-white italic">1,250</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: SYLLABUS NODES */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-4">
               Kurikulum Materi <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-900" />
            </h3>

            {SYLLABUS.map((chapter, idx) => (
              <div key={chapter.id} className={`group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-4xl p-1 shadow-xs transition-all hover:shadow-lg ${chapter.isLocked ? 'opacity-60 grayscale' : ''}`}>
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Icon Node */}
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-transform group-hover:scale-110 ${chapter.type === 'Quiz' ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-600' : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-500'}`}>
                       {chapter.type === 'Video' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                       {chapter.type === 'Reading' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>}
                       {chapter.type === 'Quiz' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
                    </div>
                    {idx !== SYLLABUS.length - 1 && <div className="w-0.5 h-12 bg-zinc-100 dark:bg-zinc-800 mt-4" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{chapter.type}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-300" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{chapter.duration}</span>
                        </div>
                        <h4 className="text-xl font-bold tracking-tight">{chapter.title}</h4>
                      </div>
                      {chapter.isLocked ? (
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                      ) : (
                        <div className="text-right">
                          <p className="text-sm font-black text-blue-600">+{chapter.points} Pts</p>
                        </div>
                      )}
                    </div>

                    {/* Question Grid (If Quiz) */}
                    {chapter.questions.length > 0 && (
                      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2 animate-in fade-in duration-700">
                        {chapter.questions.map((q) => (
                          <div key={q.id} className={`aspect-square rounded-xl border flex items-center justify-center text-[10px] font-black transition-all ${
                            q.status === 'correct' ? 'bg-emerald-500 border-emerald-400 text-white' :
                            q.status === 'wrong' ? 'bg-red-500 border-red-400 text-white' :
                            'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-400'
                          }`}>
                            {q.index}
                          </div>
                        ))}
                      </div>
                    )}
                    
                   {!chapter.isLocked && (
  <button 
    onClick={() => {
      // Navigasi dinamis berdasarkan tipe materi
      if (chapter.type === 'Reading') {
        router.push(`/siswa/bank-soal/detail/materi`);
      } else if (chapter.type === 'Video') {
        router.push(`/siswa/bank-soal/detail/video`);
      } else {
        router.push(`/siswa/bank-soal/detail/quiz`);
      }
    }} 
    className="text-xs font-black text-blue-600 uppercase tracking-widest hover:translate-x-2 transition-transform cursor-pointer flex items-center gap-2"
  >
    Mulai {chapter.type === 'Quiz' ? 'Latihan' : 'Belajar'} 
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </button>
)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: FLOATING STATS */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-12 space-y-8">
               
               {/* Leaderboard/Personal Best */}
               <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-5xl p-8 shadow-sm">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Pencapaian Kamu</h5>
                  <div className="space-y-6">
                    <StatBox label="Akurasi" value="88%" desc="Lebih tinggi dari 70% siswa" />
                    <StatBox label="Kecepatan" value="1.2m" desc="Rata-rata per soal" />
                    <StatBox label="Streak" value="12" desc="Hari berturut-turut" />
                  </div>
               </div>

               {/* Exam Call to Action */}
               <div className="bg-blue-600 rounded-5xl p-8 text-white shadow-2xl shadow-blue-500/40 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black italic mb-4 leading-tight text-white">Final Exam Logaritma</h4>
                    <p className="text-sm text-blue-100 mb-8 font-medium">Selesaikan kurikulum untuk membuka ujian akhir dan dapatkan Sertifikat Kompetensi.</p>
                    <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-zinc-50 transition-all active:scale-95 shadow-lg">
                      Terkunci (Progress 32%)
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
               </div>

            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatBox({ label, value, desc }: { label: string, value: string, desc: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{label}</span>
        <span className="text-xl font-black text-blue-600">{value}</span>
      </div>
      <p className="text-[10px] text-zinc-500 font-medium">{desc}</p>
      <div className="h-1 w-full bg-zinc-50 dark:bg-zinc-800 rounded-full mt-2">
         <div className="h-full bg-blue-600/30 rounded-full w-2/3" />
      </div>
    </div>
  );
}