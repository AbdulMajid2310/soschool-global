"use client";

import React, { useState, memo } from 'react';
import { 
  FiDatabase, FiBookOpen, FiPlus, FiSearch, 
  FiFilter, FiCheckCircle, FiLayers, FiFileText,
  FiTrendingUp, FiSettings, FiDownload, FiShare2,
  FiLock, FiUnlock, FiAward
} from 'react-icons/fi';
import { LuBrainCircuit } from 'react-icons/lu';

// --- MOCK BANK SOAL DATA ---
const NATIONAL_QUESTION_BANKS = [
  {
    id: 'QB-NAS-001',
    subject: 'Matematika - SMA',
    topic: 'Kalkulus & Trigonometri',
    level: 'Kelas 12',
    totalQuestions: 1250,
    curriculum: 'Kurikulum Merdeka',
    difficulty: 'High (HOTS)',
    status: 'Public',
    usage: 8420, // Berapa kali digunakan guru
  },
  {
    id: 'QB-NAS-002',
    subject: 'Bahasa Inggris - SMP',
    topic: 'Reading Comprehension',
    level: 'Kelas 7-9',
    totalQuestions: 3500,
    curriculum: 'K-13 & Merdeka',
    difficulty: 'Medium',
    status: 'Premium',
    usage: 12500,
  },
  {
    id: 'QB-NAS-003',
    subject: 'Fisika - SMA',
    topic: 'Mekanika Kuantum',
    level: 'Kelas 12',
    totalQuestions: 450,
    curriculum: 'Olimpiade (KSN)',
    difficulty: 'Very High',
    status: 'Restricted',
    usage: 1200,
  }
];

const NationalQuestionBank = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FiDatabase className="text-blue-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              National <span className="text-blue-500">Question Bank</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Academic Repository & Standardized Assessment</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all">
            Import QTI/JSON
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
            <FiPlus /> Create New Repository
          </button>
        </div>
      </div>

      {/* REPOSITORY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <RepoStat label="Total Questions" value="1.2M+" sub="Verified Items" icon={<FiLayers className="text-blue-500" />} />
        <RepoStat label="Global Usage" value="452K" sub="Teachers Assigned" icon={<FiShare2 className="text-emerald-500" />} />
        <RepoStat label="Subject Areas" value="42" sub="K-12 Categories" icon={<FiBookOpen className="text-purple-500" />} />
        <RepoStat label="AI Generated" value="15%" sub="Validated by Experts" icon={<LuBrainCircuit className="text-pink-500" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* REPOSITORY LIST (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by subject, topic, or keyword..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all text-xs font-medium"
              />
            </div>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase italic transition-all">
              <FiFilter /> Filter
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {NATIONAL_QUESTION_BANKS.map((repo) => (
              <div key={repo.id} className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl group hover:border-blue-500/40 transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-blue-500 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{repo.id}</span>
                        <h3 className="text-lg font-black text-white uppercase italic">{repo.subject}</h3>
                        {repo.status === 'Premium' ? <FiLock className="text-amber-500" size={14} /> : <FiUnlock className="text-slate-600" size={14} />}
                    </div>
                    
                    <div>
                        <p className="text-sm font-black text-slate-300 uppercase italic tracking-tight">{repo.topic}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 italic">{repo.level} • {repo.curriculum}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
                            <FiFileText className="text-blue-500" /> {repo.totalQuestions} Questions
                        </div>
                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase italic">
                            <FiTrendingUp className="text-emerald-500" /> {repo.usage.toLocaleString()} Times Used
                        </div>
                        <div className={`flex items-center gap-2 text-[9px] font-black uppercase italic ${
                            repo.difficulty.includes('High') ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                            <FiAward /> Difficulty: {repo.difficulty}
                        </div>
                    </div>
                  </div>

                  <div className="lg:w-48 flex flex-col gap-2 justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase italic text-white transition-all">
                        Edit Content
                    </button>
                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase italic transition-all">
                        Manage Access
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: TAXONOMY & SETTINGS (1 COL) */}
        <div className="space-y-8">
          
          {/* TAXONOMY MANAGEMENT */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                <FiSettings className="text-blue-500" /> Taxonomy Control
             </h3>
             <div className="space-y-4">
                <label className="block text-[10px] font-black text-slate-500 uppercase italic mb-2">Standardization Level</label>
                <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase italic">Bloom's Taxonomy</button>
                    <button className="p-3 bg-white/5 text-slate-500 rounded-xl text-[9px] font-black uppercase italic">Webb's DOK</button>
                </div>
                <div className="mt-6">
                    <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">
                        Mengaktifkan Bloom's Taxonomy akan memaksa setiap soal memiliki tag <span className="text-white">C1-C6</span> (Kognitif).
                    </p>
                </div>
             </div>
          </div>

          {/* QUALITY ASSURANCE */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-emerald-500 mb-4">
              <FiCheckCircle className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Expert Verification</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic mb-6">
              Setiap soal "Premium" wajib melewati verifikasi dari minimal <span className="text-white font-bold">3 Panelis Ahli</span> sebelum bisa digunakan secara nasional.
            </p>
            <button className="w-full py-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-[9px] font-black uppercase italic">
                Review Verification Queue
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
                <span className="text-[10px] font-black uppercase italic text-slate-400 group-hover:text-white">Download Global Report</span>
                <FiDownload className="text-slate-600 group-hover:text-blue-400" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENT ---
const RepoStat = ({ label, value, sub, icon }: any) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl hover:border-blue-500/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[10px] font-black text-slate-500 uppercase italic tracking-widest">{label}</p>
      <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
    </div>
    <h2 className="text-3xl font-black text-white italic">{value}</h2>
    <p className="text-[9px] text-slate-600 font-bold uppercase italic mt-1">{sub}</p>
  </div>
);

export default memo(NationalQuestionBank);