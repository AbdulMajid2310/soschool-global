"use client";

import React from 'react';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

// --- TYPE DATA: STRUKTUR MATERI REMAJA (SLTP/SLTA) ---
type ContentType = 'editorial_text' | 'deep_dive_grid' | 'comparison_table' | 'pro_tip';

interface DataPoint {
  id: string;
  key: string;
  value: string;
  context?: string; 
}

interface ContentSection {
  id: string;
  type: ContentType;
  heading?: string;
  bodyText?: string;
  dataPoints?: DataPoint[];
}

interface SeniorLesson {
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  sections: ContentSection[];
}

// --- DATA: MATERI BAHASA INGGRIS (LEVEL SLTP/SLTA) ---
// --- DATA: MATERI MATEMATIKA (LEVEL SLTP/SLTA) ---
const LESSON_DATA: SeniorLesson = {
  subject: "Advanced Mathematics",
  topic: "The Power of Derivatives",
  difficulty: "Advanced",
  readTime: "12 min read",
  sections: [
    {
      id: "sec-1",
      type: "editorial_text",
      bodyText: "Turunan (Derivatives) bukan sekadar angka atau kemiringan garis. Ia adalah bahasa perubahan. Dari memprediksi kecepatan roket hingga menghitung keuntungan maksimum sebuah bisnis, turunan memungkinkan kita memahami bagaimana satu variabel bereaksi terhadap perubahan sekecil apa pun."
    },
    {
      id: "sec-2",
      type: "deep_dive_grid",
      heading: "The Calculus Foundation",
      dataPoints: [
        { id: "d1", key: "The Power Rule", value: "f(x) = xⁿ  → f'(x) = nxⁿ⁻¹" },
        { id: "d2", key: "Instantaneous Rate", value: "Menghitung perubahan pada satu titik waktu (t)." },
        { id: "d3", key: "Leibniz Notation", value: "Ditulis sebagai dy/dx, melambangkan rasio perubahan." }
      ]
    },
    {
      id: "sec-3",
      type: "comparison_table",
      heading: "Function vs. Derivative",
      dataPoints: [
        { id: "c1", key: "Position (s)", value: "Jarak yang ditempuh dalam waktu tertentu." },
        { id: "c2", key: "Velocity (v)", value: "Turunan pertama dari jarak terhadap waktu (ds/dt)." },
        { id: "c3", key: "Acceleration (a)", value: "Turunan kedua dari jarak atau turunan pertama kecepatan." }
      ]
    },
    {
      id: "sec-4",
      type: "pro_tip",
      heading: "Problem Solving Strategy",
      bodyText: "Saat mengerjakan soal optimasi, carilah titik di mana turunan pertama bernilai nol (f'(x) = 0). Itulah titik stasioner di mana nilai maksimum atau minimum kemungkinan besar berada."
    }
  ]
};

// --- UI COMPONENT (TAILWIND V4 - HIGH SCHOOL STYLE) ---
export default function SeniorMaterialPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30">
      
      {/* MINIMALIST NAV */}
      <nav className="sticky top-0  h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-8 flex items-center justify-between">
        <Link href=".." className="text-sm flex gap-2 items-center font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">
          <FaChevronLeft/> Library
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{LESSON_DATA.difficulty}</span>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{LESSON_DATA.readTime}</span>
        </div>
      </nav>

      <main className="w-full px-6 py-14 space-y-8">
        
        {/* EDITORIAL HEADER */}
        <header className="space-y-8 border-b border-white/5 pb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500 italic">
            {LESSON_DATA.subject}
          </p>
          <h1 className="text-xl md:text-4xl font-black tracking-tighter text-white leading-[0.85] uppercase italic">
            {LESSON_DATA.topic}
          </h1>
        </header>

        {/* CONTENT SECTIONS */}
        {LESSON_DATA.sections.map((section) => (
          <section key={section.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            
            {/* TYPE: EDITORIAL TEXT (Dropcap style) */}
            {section.type === 'editorial_text' && (
              <p className="text-md leading-relaxed text-slate-400 font-medium italic first-letter:text-4xl first-letter:font-black first-letter:text-white first-letter:mr-4 first-letter:float-left">
                {section.bodyText}
              </p>
            )}

            {/* TYPE: DEEP DIVE (Grid with glow effect) */}
            {section.type === 'deep_dive_grid' && (
              <div className="space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white flex items-center gap-4">
                  <span className="w-12 h-px bg-indigo-500" /> {section.heading}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.dataPoints?.map((item) => (
                    <div key={item.id} className="p-8 rounded-4xl bg-white/2 border border-white/5 hover:border-indigo-500/30 transition-all group">
                      <p className="text-[10px] font-black uppercase text-indigo-500 mb-4 tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.key}</p>
                      <p className="text-sm font-bold text-slate-200 leading-snug uppercase italic">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE: COMPARISON (Dark table style) */}
            {section.type === 'comparison_table' && (
              <div className="space-y-8">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-4">
                  <span className="w-12 h-px bg-indigo-500" /> {section.heading}
                </h3>
                <div className="divide-y divide-white/5 border-t border-b border-white/5">
                  {section.dataPoints?.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 py-6 gap-4">
                      <span className="text-[10px] font-black uppercase text-slate-500 self-center tracking-widest">{item.key}</span>
                      <span className="text-lg font-bold text-white italic">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TYPE: PRO TIP (Highlight Card) */}
            {section.type === 'pro_tip' && (
              <div className="p-12 rounded-5xl bg-linear-to-br from-indigo-600 to-violet-800 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
                <div className="absolute -right-6 -bottom-6 text-9xl font-black italic text-white/10 select-none group-hover:scale-110 transition-transform duration-700 underline underline-offset-8">PRO</div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-70 italic">{section.heading}</h4>
                <p className="text-2xl font-black italic uppercase tracking-tighter leading-tight relative z-10">
                  {section.bodyText}
                </p>
              </div>
            )}

          </section>
        ))}

        {/* FOOTER ACTION */}
        <footer className="pt-24 border-t border-white/5 flex flex-col items-center">
          <button className="w-full md:w-auto px-24 py-6 rounded-4xl bg-white text-black font-black uppercase italic tracking-[0.3em] text-[10px] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95">
            Launch Mastery Quiz
          </button>
        </footer>
      </main>
    </div>
  );
}