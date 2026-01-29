"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// --- TYPES ---
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  number: number;
  questionText: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

const QUESTION_DATA: Question = {
  id: "q-101",
  number: 5,
  questionText: "Jika $^{2}\\log 8 = x$ dan $^{3}\\log 9 = y$, maka berapakah nilai dari $x + y$?",
  options: [
    { id: "A", text: "3" },
    { id: "B", text: "5" },
    { id: "C", text: "6" },
    { id: "D", text: "12" }
  ],
  correctAnswer: "B",
  explanation: "Pembahasan: $^{2}\\log 8 = ^{2}\\log 2^3 = 3$. Sedangkan $^{3}\\log 9 = ^{3}\\log 3^2 = 2$. Maka, $x + y = 3 + 2 = 5$."
};

export default function QuizInterface() {
  const [selected, setSelected] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    if (selected) setIsChecked(true);
  };

  return (
    // Background Biru Dongker untuk Dark Mode
    <div className="min-h-screen bg-zinc-50 dark:bg-[#020617] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans selection:bg-blue-500/30">
      
      {/* --- NAV BAR --- */}
      <nav className="h-20 border-b border-zinc-200 dark:border-blue-900/30 flex items-center px-6 md:px-12 sticky top-0 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href=".." className="flex items-center gap-2 group p-2 hover:bg-zinc-100 dark:hover:bg-blue-900/20 rounded-xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-blue-400"><path d="m15 18-6-6 6-6"/></svg>
              <span className="hidden sm:block text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-blue-400">Exit</span>
            </Link>
            <div className="h-6 w-px bg-zinc-200 dark:bg-blue-900/30" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-black italic shadow-lg shadow-blue-500/20">SoS</div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] italic">Logaritma <span className="text-blue-600 mx-1">•</span> <span className="text-zinc-400">05/15</span></h2>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">Timer</p>
              <p className="text-sm font-black font-mono text-blue-600 dark:text-blue-400">12:45</p>
            </div>
            <button className="bg-white dark:bg-blue-900/20 border border-zinc-200 dark:border-blue-800/50 p-3 rounded-2xl hover:scale-105 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-blue-400"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: SOAL --- */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-white dark:bg-[#0B1224] border border-zinc-100 dark:border-blue-900/30 p-10 rounded-[40px] shadow-sm relative overflow-hidden">
               {/* Decorative light effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-8">
                <span className="inline-block px-4 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-600/20">
                  Multiple Choice
                </span>
                <h3 className="text-2xl md:text-4xl font-black leading-[1.2] tracking-tight">
                  {QUESTION_DATA.questionText}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {QUESTION_DATA.options.map((opt) => {
                const isSelected = selected === opt.id;
                const isCorrect = opt.id === QUESTION_DATA.correctAnswer;
                
                let cardStyles = "border-zinc-100 dark:border-blue-900/20 bg-white dark:bg-[#0B1224] hover:border-blue-500 dark:hover:border-blue-400/50";
                
                if (isChecked) {
                  if (isCorrect) {
                    cardStyles = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50";
                  } else if (isSelected && !isCorrect) {
                    cardStyles = "border-red-500 bg-red-50 dark:bg-red-500/10 dark:border-red-500/50";
                  }
                } else if (isSelected) {
                  cardStyles = "border-blue-600 dark:border-blue-500 bg-blue-50/30 dark:bg-blue-500/10 shadow-xl shadow-blue-500/5";
                }

                return (
                  <button 
                    key={opt.id}
                    disabled={isChecked}
                    onClick={() => setSelected(opt.id)}
                    className={`w-full p-5 rounded-[28px] border-2 flex items-center justify-between transition-all duration-300 transform active:scale-[0.98] cursor-pointer group ${cardStyles}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-black transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-zinc-50 dark:bg-blue-950 border-zinc-100 dark:border-blue-800 text-zinc-400 dark:text-blue-400/50 group-hover:border-blue-400 group-hover:text-blue-400'}`}>
                        {opt.id}
                      </div>
                      <span className="text-lg font-bold tracking-tight text-zinc-700 dark:text-zinc-200">{opt.text}</span>
                    </div>
                    {isChecked && isCorrect && (
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path d="M20 6L9 17L4 12"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT: SIDEBAR --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              
              {!isChecked ? (
                <div className="bg-white dark:bg-[#0B1224] border border-zinc-100 dark:border-blue-900/30 p-10 rounded-[40px] shadow-sm space-y-8">
                  <div className="space-y-3">
                    <h4 className="text-2xl font-black italic tracking-tighter uppercase">Konfirmasi</h4>
                    <p className="text-sm text-zinc-500 dark:text-blue-200/50 font-medium leading-relaxed">Jawaban yang sudah dikirim tidak dapat diubah kembali. Periksa kembali langkah kerjamu.</p>
                  </div>
                  <button 
                    onClick={handleCheck}
                    disabled={!selected}
                    className={`w-full py-5 rounded-2xl font-black text-xs tracking-widest transition-all shadow-2xl uppercase ${selected ? 'bg-blue-600 text-white shadow-blue-500/30 cursor-pointer hover:scale-[1.02]' : 'bg-zinc-100 dark:bg-blue-900/20 text-zinc-400 dark:text-blue-900/50 cursor-not-allowed'}`}
                  >
                    Kirim Jawaban
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700 space-y-6">
                  <div className={`p-10 rounded-[40px] border-2 shadow-2xl ${selected === QUESTION_DATA.correctAnswer ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-500 shadow-emerald-500/5' : 'bg-red-50 dark:bg-red-500/5 border-red-500 shadow-red-500/5'}`}>
                    <div className="flex items-center gap-3 mb-4">
                       <span className={`w-3 h-3 rounded-full animate-pulse ${selected === QUESTION_DATA.correctAnswer ? 'bg-emerald-500' : 'bg-red-500'}`} />
                       <h4 className="text-xl font-black uppercase italic tracking-tighter">
                        {selected === QUESTION_DATA.correctAnswer ? 'Brilliant!' : 'Kurang Tepat.'}
                      </h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-blue-100/70 mb-6">
                      {QUESTION_DATA.explanation}
                    </p>
                    <button className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-2xl font-black text-xs tracking-[0.2em] uppercase hover:scale-[1.02] transition-all shadow-xl">
                      Next Question
                    </button>
                  </div>
                </div>
              )}

              {/* Minimal Nav Grid */}
              <div className="bg-white dark:bg-[#0B1224] p-6 rounded-4xl border border-zinc-100 dark:border-blue-900/30">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-4">Navigasi Soal</p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-[10px] font-black ${i + 1 === 5 ? 'border-blue-500 text-blue-500' : 'border-zinc-100 dark:border-blue-900/20 text-zinc-300 dark:text-blue-900'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}