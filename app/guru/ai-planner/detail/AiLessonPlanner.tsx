"use client";

import React, { useState } from 'react';
import { 
  FiCpu, FiSend, FiFileText, FiRefreshCcw, 
  FiDownload, FiCopy, FiZap, FiLayout, FiBookOpen 
} from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';

const AiLessonPlanner = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulating AI Processing
    setTimeout(() => {
      setIsGenerating(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
      
      {/* LEFT: Input Configuration (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <LuBrain size={120} className="text-indigo-500" />
          </div>

          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-indigo-600 flex items-center gap-2">
              <FiZap /> AI Configuration
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Mata Pelajaran</label>
                <input type="text" placeholder="Misal: Pemrograman Web" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent focus:border-indigo-500 outline-none text-xs font-bold" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Kelas</label>
                  <select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent focus:border-indigo-500 outline-none text-xs font-bold appearance-none">
                    <option>X - IPA</option>
                    <option>XI - RPL</option>
                    <option>XII - RPL</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Durasi</label>
                  <input type="text" placeholder="90 Menit" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent focus:border-indigo-500 outline-none text-xs font-bold" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Topik Spesifik / KD</label>
                <textarea 
                  placeholder="Misal: Pengenalan konsep API dan Integrasi Fetch Data..." 
                  className="w-full p-4 h-32 rounded-2xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent focus:border-indigo-500 outline-none text-xs font-bold resize-none"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-5 bg-linear-to-r from-indigo-600 to-violet-700 text-white rounded-4xl text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <> <FiRefreshCcw className="animate-spin" /> Sedang Merancang... </>
                ) : (
                  <> <FiCpu /> Generate Lesson Plan </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Result / Preview (7 Cols) */}
      <div className="lg:col-span-7">
        {!hasResult ? (
          <div className="h-full min-h-125 border-4 border-dashed border-slate-100 dark:border-indigo-900/10 rounded-[3rem] flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-slate-50 dark:bg-indigo-950/20 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <FiFileText size={40} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Belum ada Rencana Terbuat</h4>
            <p className="text-[10px] font-medium text-slate-300 mt-2 italic uppercase">Isi form di samping untuk memulai keajaiban AI.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 overflow-hidden shadow-sm animate-in zoom-in-95 duration-500">
            {/* Toolbar */}
            <div className="px-8 py-4 bg-slate-50 dark:bg-indigo-950/20 border-b border-slate-100 dark:border-indigo-900/10 flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 italic">Preview RPP Digital</span>
              <div className="flex gap-2">
                <button className="p-2 hover:text-indigo-600 transition-colors"><FiCopy size={16} /></button>
                <button className="p-2 hover:text-indigo-600 transition-colors"><FiDownload size={16} /></button>
              </div>
            </div>

            {/* Document Content */}
            <div className="p-10 space-y-8 max-h-150 overflow-y-auto no-scrollbar">
              <div className="text-center space-y-2 mb-10">
                <h2 className="text-lg font-black italic uppercase tracking-tighter">Rencana Pelaksanaan Pembelajaran</h2>
                <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
              </div>

              <Section title="I. Tujuan Pembelajaran" content="Siswa mampu memahami arsitektur RESTful API dan mendemonstrasikan pengambilan data dari endpoint publik menggunakan metode Fetch." />
              <Section title="II. Langkah Pembelajaran" content="1. Pendahuluan (10m): Review Konsep HTTP. 2. Inti (60m): Live Coding Integrasi API. 3. Penutup (20m): Diskusi Case Study." />
              <Section title="III. Metode & Media" content="Problem Based Learning, Live Demo, SoSchool Media Studio." />
              
              <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100 dark:border-indigo-900/20 mt-10">
                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 mb-2 italic">Rekomendasi AI:</p>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 italic">"Gunakan media video interaktif untuk menjelaskan konsep asinkronus agar siswa lebih mudah memvisualisasikan data flow."</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, content }: any) => (
  <div className="space-y-3">
    <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 italic">{title}</h5>
    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{content}</p>
  </div>
);

export default AiLessonPlanner;