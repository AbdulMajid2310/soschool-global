"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// --- UNIVERSAL TYPESCRIPT ENGINE ---
type ContentBlockType = 'paragraph' | 'key_list' | 'data_grid' | 'quote';

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  heading?: string;
  // Konten bisa berupa string tunggal, array, atau objek pasangan (key-value)
  body: string | string[] | Record<string, string>;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: 'locked' | 'current' | 'completed';
}

interface UniversalMaterial {
  subject: {
    name: string;
    label: string; // Misal: "Sejarah Dunia", "Aljabar", "English Grammar"
    themeColor: string; // Tailwind class like "indigo", "emerald", "rose"
  };
  title: string;
  synopsis: string;
  videoUrl?: string;
  blocks: ContentBlock[];
  playlist: Lesson[];
}

// --- EXAMPLE DATA (UNIVERSAL) ---
const DATA: UniversalMaterial = {
  subject: {
    name: "Informatika",
    label: "Algoritme & Struktur Data",
    themeColor: "blue" // Menggunakan nuansa biru khas teknologi
  },
  title: "Efisiensi Algoritme: Sorting & Searching",
  synopsis: "Mempelajari bagaimana cara komputer 'berpikir' secara logis untuk mengurutkan data secara cepat dan efisien menggunakan metode yang sistematis.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video visualisasi sorting
  blocks: [
    {
      id: "b1",
      type: "key_list",
      heading: "Karakteristik Algoritme",
      body: [
        "Finiteness: Algoritme harus berhenti setelah melakukan sejumlah langkah.",
        "Definiteness: Setiap langkah harus didefinisikan secara tepat dan tidak ambigu.",
        "Input & Output: Memiliki nol atau lebih input dan menghasilkan minimal satu output.",
        "Effectiveness: Setiap langkah harus cukup sederhana agar bisa dikerjakan dalam waktu yang masuk akal."
      ]
    },
    {
      id: "b2",
      type: "data_grid",
      heading: "Kompleksitas Waktu (Big O)",
      body: { 
        "Binary Search": "O(log n) - Sangat Cepat", 
        "Bubble Sort": "O(n²) - Lambat untuk Data Besar",
        "Quick Sort": "O(n log n) - Standar Industri"
      }
    },
    {
      id: "b3",
      type: "paragraph",
      heading: "Penerapan di Dunia Nyata",
      body: "Algoritme bukan hanya teori koding; ia adalah mesin di balik sistem rekomendasi Netflix, rute tercepat di Google Maps, hingga cara mesin pencari Google menemukan informasi dalam miliaran halaman web hanya dalam sepersekian detik."
    }
  ],
  playlist: [
    { id: "1", title: "Dasar Pemikiran Logis", duration: "06:45", status: "completed" },
    { id: "2", title: "Analisis Big O Notation", duration: "14:20", status: "current" },
    { id: "3", title: "Studi Kasus Sorting", duration: "18:00", status: "locked" }
  ]
};

export default function UniversalMaterialPage() {
  const [isDone, setIsDone] = useState(false);
  const theme = DATA.subject.themeColor;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* 1. SMART NAVIGATION */}
      <nav className="sticky top-0 z-50 h-20 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl px-8 flex items-center justify-between">
        <Link href="." className="flex items-center gap-4 group transition-transform active:scale-95">
          <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-${theme}-600 transition-all duration-500`}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </div>
          <div className="leading-none">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{DATA.subject.name}</p>
            <p className="text-xs font-bold text-white uppercase italic tracking-tighter">{DATA.subject.label}</p>
          </div>
        </Link>
        <div className={`w-11 h-11 rounded-2xl bg-linear-to-br from-${theme}-500 to-slate-800 p-0.5 shadow-lg shadow-${theme}-500/10`}>
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black italic text-white text-lg tracking-tighter">S</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 2. DYNAMIC CONTENT AREA */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Editorial Header */}
            <div className="space-y-6">
              <h1 className="text-xl md:text-3xl font-black tracking-tighter italic uppercase leading-[0.85] text-white">
              # {DATA.title}
              </h1>
              <p className="text-lg text-slate-400 font-medium italic border-l-2 border-slate-700 pl-8 max-w-3xl leading-relaxed">
                "{DATA.synopsis}"
              </p>
            </div>

            {/* Multimedia Block */}
            {DATA.videoUrl && (
              <div className="relative group">
                <div className={`absolute -inset-1 bg-linear-to-r from-${theme}-600 to-transparent rounded-5xl blur-2xl opacity-10`} />
                <div className="relative aspect-video bg-black rounded-5xl overflow-hidden border border-white/10 shadow-2xl">
                  <iframe className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" src={DATA.videoUrl} title="Module Player" allowFullScreen />
                </div>
              </div>
            )}

            {/* Dynamic Content Blocks */}
            <div className="space-y-6">
              {DATA.blocks.map((block) => (
                <div key={block.id} className="bg-white/2 border border-white/5 rounded-4xl p-8 md:p-10 hover:bg-white/4 transition-colors group">
                  {block.heading && (
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-4">
                      <span className={`w-2 h-2 rounded-full bg-${theme}-600`} />
                      {block.heading}
                    </h3>
                  )}

                  {/* Render logic based on type */}
                  {block.type === 'paragraph' && (
                    <p className="text-slate-400 leading-relaxed text-lg font-medium">{block.body as string}</p>
                  )}

                  {block.type === 'key_list' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(block.body as string[]).map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center p-5 bg-slate-950/40 rounded-3xl border border-white/5 hover:border-slate-700 transition-all">
                          <span className={`text-${theme}-500 font-black italic text-[10px]`}>0{idx + 1}</span>
                          <span className="text-sm font-bold text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {block.type === 'data_grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(block.body as Record<string, string>).map(([key, val], idx) => (
                        <div key={idx} className="p-6 bg-white/2 rounded-3xl border border-white/5 group-hover:border-slate-700 transition-all">
                          <p className={`text-[9px] font-black text-${theme}-400 uppercase mb-3 tracking-widest`}>{key}</p>
                          <p className="text-sm font-black text-white italic leading-tight uppercase tracking-tight">{val}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. UNIVERSAL PLAYLIST SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 bg-slate-900 border border-white/5 rounded-5xl p-8 shadow-2xl space-y-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-slate-700 via-indigo-600 to-slate-700" />
              
              <div className="text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Curriculum</p>
                <h4 className="text-xl font-black italic uppercase text-white tracking-tighter">Timeline Belajar</h4>
              </div>

              <div className="space-y-3">
                {DATA.playlist.map(item => (
                  <div key={item.id} className={`flex items-center gap-5 p-4 rounded-3xl border-2 transition-all cursor-pointer ${item.status === 'current' ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20' : 'border-transparent hover:bg-white/2'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.status === 'completed' ? 'bg-emerald-500' : item.status === 'current' ? 'bg-white text-indigo-600 font-black' : 'bg-slate-800 text-slate-600'}`}>
                      {item.status === 'completed' ? '✓' : <span className="text-[10px] italic">0{item.id}</span>}
                    </div>
                    <div className="max-w-40">
                      <p className={`text-sm font-black tracking-tight truncate mb-1 ${item.status === 'current' ? 'text-white' : 'text-slate-300'}`}>{item.title}</p>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'current' ? 'text-indigo-200' : 'text-slate-600'}`}>{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsDone(!isDone)}
                className={`w-full py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all transform active:scale-95 shadow-xl ${isDone ? 'bg-emerald-600 text-white' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
              >
                {isDone ? 'Materi Selesai' : 'Tandai Selesai'}
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}