"use client";

import React, { useState, memo } from 'react';
import { 
  FiCpu, FiZap, FiTarget, FiActivity, 
  FiLayers, FiSettings, FiCheckCircle, FiAlertCircle,
  FiInfo, FiShuffle, FiSave, FiNavigation
} from 'react-icons/fi';
import { SiOpenai, SiGooglecloud } from 'react-icons/si';

// --- MOCK MODEL ROUTING CONFIG ---
const INITIAL_ROUTES = [
  {
    id: 'R-01',
    feature: 'Auto Grading (Koreksi Esai)',
    description: 'Membutuhkan logika evaluasi mendalam & objektivitas tinggi.',
    activeModel: 'GPT-4o',
    provider: 'OpenAI',
    priority: 'Quality',
    cost: 'High'
  },
  {
    id: 'R-02',
    feature: 'Chatbot & Student Assistant',
    description: 'Respon cepat untuk tanya jawab materi ringan.',
    activeModel: 'Gemini 1.5 Flash',
    provider: 'Google',
    priority: 'Speed',
    cost: 'Budget'
  },
  {
    id: 'R-03',
    feature: 'AI Lesson Planner',
    description: 'Menghasilkan silabus dan materi ajar kreatif.',
    activeModel: 'Gemini 1.5 Pro',
    provider: 'Google',
    priority: 'Balanced',
    cost: 'Medium'
  }
];

const ModelConfiguration = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FiNavigation className="text-purple-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              AI Model <span className="text-purple-500">Routing</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Neural Gateway & Feature Logic Assignment</p>
        </div>
        
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-purple-600/20">
            <FiSave /> Terapkan Konfigurasi
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: FEATURE ROUTING LIST (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          {INITIAL_ROUTES.map((route) => (
            <div key={route.id} className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl group hover:border-purple-500/30 transition-all">
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-black text-purple-500 uppercase">{route.id}</span>
                    <h3 className="text-lg font-black text-white uppercase italic leading-none">{route.feature}</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed uppercase max-w-md">{route.description}</p>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-slate-400 uppercase italic">Priority: {route.priority}</div>
                    <div className={`px-3 py-1 border border-white/5 rounded-lg text-[8px] font-black uppercase italic ${
                        route.cost === 'High' ? 'text-red-400 bg-red-500/5' : 
                        route.cost === 'Medium' ? 'text-amber-400 bg-amber-500/5' : 'text-emerald-400 bg-emerald-500/5'
                    }`}>Cost: {route.cost}</div>
                  </div>
                </div>

                <div className="lg:w-72 space-y-3">
                  <label className="text-[9px] font-black text-slate-600 uppercase italic tracking-widest block ml-1">Assigned Brain (LLM)</label>
                  <div className="relative group/select">
                    <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between cursor-pointer group-hover/select:border-purple-500/50 transition-all">
                        <div className="flex items-center gap-3">
                            {route.provider === 'OpenAI' ? <SiOpenai className="text-white" /> : <SiGooglecloud className="text-blue-400" />}
                            <span className="text-xs font-black text-white uppercase italic">{route.activeModel}</span>
                        </div>
                        <FiShuffle className="text-slate-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase italic tracking-tighter">Status: Gateway Active & Stable</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SYSTEM CONFIG & PARAMS (1 COL) */}
        <div className="space-y-8">
          
          {/* TEMPERATURE & TOP-P SETTINGS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                <FiSettings className="text-purple-500" /> Global Parameters
            </h3>
            
            <div className="space-y-8">
                <div>
                    <div className="flex justify-between mb-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase italic">Temperature (Kreativitas)</label>
                        <span className="text-xs font-black text-purple-400 italic">0.7</span>
                    </div>
                    <input type="range" className="w-full accent-purple-600 bg-white/5 rounded-lg appearance-none h-1.5" />
                    <div className="flex justify-between mt-2 text-[8px] font-black text-slate-700 uppercase italic">
                        <span>Faktual</span>
                        <span>Sangat Kreatif</span>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-4">
                        <label className="text-[10px] font-black text-slate-500 uppercase italic">Max Tokens Per Prompt</label>
                        <span className="text-xs font-black text-purple-400 italic">2,048</span>
                    </div>
                    <input type="range" className="w-full accent-purple-600 bg-white/5 rounded-lg appearance-none h-1.5" />
                </div>
            </div>
          </div>

          {/* FALLBACK SYSTEM */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <FiShuffle className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Auto-Fallback</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic mb-6">
              Jika <span className="text-white">GPT-4o</span> mengalami downtime/limit, otomatis alihkan fitur grading ke <span className="text-white">Gemini 1.5 Pro</span>.
            </p>
            <div className="flex items-center gap-2 text-[9px] font-black text-amber-600 uppercase italic border border-amber-500/10 p-3 rounded-xl bg-black/20">
                <FiCheckCircle /> Fallback Status: Ready
            </div>
          </div>

          {/* PROVIDER STATUS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6">
              <FiActivity className="text-purple-500" /> Provider Latency
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Google AI</span>
                    <span className="text-[10px] font-mono text-emerald-400">142ms</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">OpenAI</span>
                    <span className="text-[10px] font-mono text-amber-400">890ms</span>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(ModelConfiguration);