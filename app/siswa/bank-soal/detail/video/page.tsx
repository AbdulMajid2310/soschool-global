"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiCheckCircle, FiLock, FiTerminal, FiLayout, FiBookmark } from 'react-icons/fi';

// --- UNIVERSAL TYPESCRIPT ENGINE ---
type ContentBlockType = 'paragraph' | 'key_list' | 'data_grid' | 'quote';

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  heading?: string;
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
    label: string;
    themeColor: string; 
  };
  title: string;
  synopsis: string;
  videoUrl?: string;
  blocks: ContentBlock[];
  playlist: Lesson[];
}

const DATA: UniversalMaterial = {
  subject: {
    name: "Informatika",
    label: "Algoritme & Struktur Data",
    themeColor: "blue"
  },
  title: "Efisiensi Algoritme: Sorting & Searching",
  synopsis: "Mempelajari bagaimana cara komputer 'berpikir' secara logis untuk mengurutkan data secara cepat dan efisien menggunakan metode yang sistematis.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  blocks: [
    {
      id: "b1",
      type: "key_list",
      heading: "Karakteristik Algoritme",
      body: [
        "Finiteness: Algoritme harus berhenti setelah sejumlah langkah.",
        "Definiteness: Setiap langkah harus didefinisikan secara tepat.",
        "Input & Output: Menghasilkan minimal satu output fungsional.",
        "Effectiveness: Langkah sederhana yang masuk akal bagi mesin."
      ]
    },
    {
      id: "b2",
      type: "data_grid",
      heading: "Kompleksitas Waktu (Big O)",
      body: { 
        "Binary Search": "O(log n) - Fast", 
        "Bubble Sort": "O(n²) - Slow",
        "Quick Sort": "O(n log n) - Standard"
      }
    },
    {
      id: "b3",
      type: "paragraph",
      heading: "Penerapan di Dunia Nyata",
      body: "Algoritme bukan hanya teori koding; ia adalah mesin di balik sistem rekomendasi Netflix, rute tercepat di Google Maps, hingga cara mesin pencari menemukan informasi."
    },
    // Tambahan blok untuk ngetes scroll
    {
      id: "b4",
      type: "paragraph",
      heading: "Deep Dive: Space Complexity",
      body: "Selain waktu, efisiensi juga diukur dari seberapa banyak memori yang digunakan selama algoritme berjalan."
    }
  ],
  playlist: [
    { id: "1", title: "Dasar Pemikiran Logis", duration: "06:45", status: "completed" },
    { id: "2", title: "Analisis Big O Notation", duration: "14:20", status: "current" },
    { id: "3", title: "Studi Kasus Sorting", duration: "18:00", status: "locked" },
    { id: "4", title: "Searching Algorithms", duration: "12:00", status: "locked" },
    { id: "5", title: "Binary Tree Intro", duration: "20:00", status: "locked" },
    { id: "6", title: "Graph Theory Dasar", duration: "25:00", status: "locked" }
  ]
};

export default function UniversalMaterialPage() {
  const [isDone, setIsDone] = useState(false);

  return (
    <div className="h-screen bg-white dark:bg-[#02040a] pt-20 text-slate-600 dark:text-slate-400 font-sans transition-colors duration-500 overflow-hidden flex flex-col">
      
      {/* 1. NAVIGATION (Fixed Height: 80px) */}
      <nav className="h-20 shrink-0 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#02040a]/80 backdrop-blur-2xl px-8 flex items-center justify-between z-50">
        <Link href="/siswa/bank-soal/detail" className="flex items-center gap-4 group transition-all">
          <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/10">
            <FiArrowLeft size={18} />
          </div>
          <div className="leading-none">
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-1">{DATA.subject.name}</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white uppercase italic tracking-tighter">{DATA.subject.label}</p>
          </div>
        </Link>
        <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-900 p-px shadow-lg shadow-blue-600/10">
                <div className="size-full bg-white dark:bg-[#02040a] rounded-[11px] flex items-center justify-center font-black italic text-slate-900 dark:text-white">S</div>
            </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT: DYNAMIC CONTENT AREA (Scrollable) */}
          <div className="lg:col-span-8 h-full overflow-y-auto p-6 md:p-12 scroll-smooth scrollbar-hide">
            <div className="space-y-16">
              {/* Editorial Header */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-blue-600" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Module Focus</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none text-slate-900 dark:text-white max-w-2xl">
                  {DATA.title}
                </h1>
                <div className="relative p-8 rounded-4xl bg-slate-50 dark:bg-white/2 border-l-4 border-blue-600 overflow-hidden">
                  <p className="relative z-10 text-xl text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed">
                    "{DATA.synopsis}"
                  </p>
                  <FiBookmark className="absolute -right-4 -bottom-4 size-24 text-slate-200 dark:text-white/5 -rotate-12" />
                </div>
              </div>

              {/* Video Block */}
              {DATA.videoUrl && (
                <div className="relative group">
                  <div className="absolute -inset-4 bg-blue-600/10 rounded-5xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-video bg-slate-900 rounded-5xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                    <iframe className="w-full h-full" src={DATA.videoUrl} title="Module Player" allowFullScreen />
                  </div>
                </div>
              )}

              {/* Content Blocks */}
              <div className="space-y-10 pb-20">
                {DATA.blocks.map((block) => (
                  <section key={block.id} className="space-y-6">
                    {block.heading && (
                      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 flex items-center gap-4">
                        <FiTerminal className="text-blue-600" /> {block.heading}
                      </h3>
                    )}
                    <div className="bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 rounded-4xl p-8 md:p-10 hover:bg-white/4 dark:hover:bg-white/4 transition-all duration-500">
                      {block.type === 'paragraph' && (
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg md:text-xl font-medium">{block.body as string}</p>
                      )}
                      {block.type === 'key_list' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(block.body as string[]).map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start p-6 bg-white dark:bg-[#05070f] rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/50 transition-all group">
                              <span className="text-blue-600 font-black italic text-xs mt-1">0{idx + 1}.</span>
                              <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {block.type === 'data_grid' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(block.body as Record<string, string>).map(([key, val], idx) => (
                            <div key={idx} className="p-6 bg-white dark:bg-[#05070f] rounded-2xl border border-slate-200 dark:border-white/5 hover:bg-blue-600/5 transition-all text-center md:text-left">
                              <p className="text-[9px] font-black text-blue-500 uppercase mb-3 tracking-widest">{key}</p>
                              <p className="text-sm font-black text-slate-900 dark:text-white italic leading-tight uppercase tracking-tight">{val}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR TIMELINE (Scrollable) */}
          <aside className="lg:col-span-4 h-full px-6 py-4 lg:border-l border-slate-200 dark:border-white/5 overflow-y-auto scrollbar-hide">
            <div className="space-y-8 pb-10">
              <div className=" bg-white/90 dark:bg-[#02040a]/90 backdrop-blur-md z-10 py-2">
                <h4 className="text-2xl font-black italic uppercase text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
                  <FiLayout className="text-blue-600" size={20} /> Timeline
                </h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Curriculum Path</p>
              </div>

              <div className="space-y-4">
                {DATA.playlist.map(item => (
                  <div key={item.id} className={`flex items-center gap-4 p-4 rounded-3xl border transition-all cursor-pointer relative group ${
                    item.status === 'current' 
                    ? 'bg-blue-600 border-blue-400 shadow-[0_20px_40px_rgba(37,99,235,0.2)] scale-105 z-10' 
                    : 'border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/2'
                  }`}>
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                      item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' : 
                      item.status === 'current' ? 'bg-white text-blue-600' : 
                      'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600'
                    }`}>
                      {item.status === 'completed' ? <FiCheckCircle size={18} /> : 
                       item.status === 'locked' ? <FiLock size={16} /> :
                       <span className="text-xs font-black italic">0{item.id}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-black tracking-tight truncate ${item.status === 'current' ? 'text-white' : 'text-slate-900 dark:text-slate-300'}`}>{item.title}</p>
                      <p className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'current' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-600'}`}>{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-linear-to-t from-white dark:from-[#02040a] to-transparent pt-10 pb-4">
                <button 
                    onClick={() => setIsDone(!isDone)}
                    className={`w-full py-5 rounded-3xl font-black text-[10px] tracking-[0.3em] uppercase transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        isDone 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white shadow-xl shadow-black/5 dark:shadow-white/5'
                    }`}
                >
                    {isDone ? <><FiCheckCircle /> Materi Selesai</> : 'Tandai Selesai'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}