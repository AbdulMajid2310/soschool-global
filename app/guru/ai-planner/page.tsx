"use client";

import React from 'react';
import { 
  LuBrain, LuSparkles, LuFileJson, LuLibrary, 
  LuArrowRight, LuClock, LuTarget,
  LuFileCheck2, 
} from 'react-icons/lu';

const AI_PLAN_DATA = [
  { 
    id: 'P1', subject: 'Informatika', class: '10-IPA-1', 
    topic: 'Berpikir Komputasional', style: 'Socratic Method',
    lastGenerated: 'Today', status: 'Ready', score: 98,
    color: 'border-indigo-500'
  },
  { 
    id: 'P2', subject: 'Basis Data', class: '11-RPL-2', 
    topic: 'Entity Relationship Diagram', style: 'Project Based',
    lastGenerated: '2 Days ago', status: 'Draft', score: 85,
    color: 'border-violet-500'
  },
  { 
    id: 'P3', subject: 'Web Dev', class: '12-RPL-1', 
    topic: 'Advanced React Patterns', style: 'Hands-on Coding',
    lastGenerated: '1 Week ago', status: 'Ready', score: 94,
    color: 'border-cyan-500'
  },
];

const AILessonList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* 1. AI Planning Intelligence Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <PlanStat icon={<LuBrain className="text-indigo-500" />} label="AI Tokens Used" value="12.4K" sub="Bulan ini" />
        <PlanStat icon={<LuSparkles className="text-amber-500" />} label="RPP Tergenerate" value="18" sub="Sesuai Capaian" />
        <PlanStat icon={<LuTarget className="text-emerald-500" />} label="Kesesuaian TP" value="96%" sub="Sangat Akurat" />
        <PlanStat icon={<LuClock className="text-rose-500" />} label="Waktu Hemat" value="14 Jam" sub="Auto-Planning" />
      </div>

      <div className="flex justify-between items-center px-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Saved AI Lesson Blueprints</h3>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase italic flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
          <LuSparkles /> Generate New Plan
        </button>
      </div>

      {/* 2. List of AI Generated Plans */}
      <div className="grid grid-cols-1 gap-4">
        {AI_PLAN_DATA.map((plan) => (
          <div key={plan.id} className={`bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] border-l-8 ${plan.color} border border-slate-200 dark:border-white/5 p-6 hover:translate-x-2 transition-all duration-300 group`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-indigo-950/40 flex items-center justify-center text-2xl text-indigo-500">
                  <LuFileJson />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-indigo-500 tracking-widest">{plan.subject}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{plan.class}</span>
                  </div>
                  <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none mt-1">{plan.topic}</h4>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 px-8 border-l border-slate-100 dark:border-white/5">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Teaching Style</p>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">{plan.style}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">AI Quality Score</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${plan.score}%` }} />
                    </div>
                    <span className="text-[10px] font-black italic text-emerald-500">{plan.score}%</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Status</p>
                  <span className={`flex items-center gap-1 text-[9px] font-black uppercase ${plan.status === 'Ready' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {plan.status === 'Ready' ? <LuFileCheck2 size={12} /> : <LuClock size={12} />} {plan.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-4 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl hover:text-indigo-500 transition-all">
                  <LuLibrary size={20} />
                </button>
                <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 hover:bg-indigo-700 transition-all">
                  Open Plan <LuArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Smart Recommendation Box */}
      <div className="p-8 bg-linear-to-br from-[#0a0f1d] to-[#1e1b4b] rounded-[3rem] border border-indigo-500/20 text-white relative overflow-hidden group">
        <LuSparkles className="absolute -right-10 -bottom-10 text-indigo-500/10 group-hover:scale-125 transition-transform duration-1000" size={200} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-indigo-500/20 backdrop-blur-xl rounded-4xl flex items-center justify-center border border-indigo-500/30">
            <LuBrain size={40} className="text-indigo-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic mb-2">Lesson Optimization Analysis</h5>
            <p className="text-lg font-medium italic leading-relaxed text-slate-300">
              "Berdasarkan data nilai terakhir, kelas **11-RPL-2** kesulitan di bagian 'Relational Logic'. AI menyarankan Anda mengaktifkan **'Remedial Flow'** pada Lesson Plan berikutnya untuk memperkuat fondasi."
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-indigo-900 rounded-4xl text-[10px] font-black uppercase italic hover:scale-105 transition-transform">
            Adjust My Plan
          </button>
        </div>
      </div>

    </div>
  );
};

const PlanStat = ({ icon, label, value, sub }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest italic text-slate-400">{label}</span>
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default AILessonList;