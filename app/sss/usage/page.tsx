"use client";

import React, { useState, memo } from 'react';
import { 
  FiCpu, FiActivity, FiZap, FiBarChart2, 
  FiSettings, FiAlertCircle, FiDatabase, FiLayers,
  FiTrendingUp, FiCheckCircle, FiInfo, FiSliders
} from 'react-icons/fi';
import { LuBrainCircuit } from 'react-icons/lu';

// --- MOCK AI USAGE DATA ---
const AI_USAGE_BY_SCHOOL = [
  {
    id: 'SCH-001',
    name: 'SMA Negeri 1 Jakarta',
    plan: 'Enterprise',
    tokensUsed: 1250000,
    quota: 5000000,
    cost: 15.50, // USD
    activeUsers: 45, // Guru
  },
  {
    id: 'SCH-002',
    name: 'SMK Telkom Malang',
    plan: 'Enterprise',
    tokensUsed: 4800000,
    quota: 5000000,
    cost: 58.20,
    activeUsers: 82,
  },
  {
    id: 'SCH-003',
    name: 'SMP Al-Azhar Pusat',
    plan: 'Premium',
    tokensUsed: 150000,
    quota: 200000,
    cost: 2.10,
    activeUsers: 12,
  }
];

const AIIntelligenceControl = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <LuBrainCircuit className="text-purple-500 text-xl animate-pulse" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              AI Intelligence <span className="text-purple-500">Control</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Token Monitoring & Neural Governance</p>
        </div>
        
        <div className="flex gap-3">
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Global Provider</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-black text-white uppercase italic">Google Gemini 1.5 Pro</span>
                </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-purple-600/20">
                <FiSliders /> AI Engine Settings
            </button>
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard label="Total Tokens (MTD)" value="6.2M" sub="Million Tokens" icon={<FiActivity className="text-purple-500" />} />
        <StatCard label="Estimated Cost" value="$82.40" sub="Bulan Februari" icon={<FiDatabase className="text-emerald-500" />} />
        <StatCard label="Active Prompts" value="12,450" sub="Lesson Plans Generated" icon={<FiZap className="text-amber-500" />} />
        <StatCard label="Avg. Latency" value="1.2s" sub="Per Generation" icon={<FiTrendingUp className="text-blue-500" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* TOKEN USAGE PER SCHOOL (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center">
               <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                  <FiBarChart2 className="text-purple-500" /> Kuota Token per Sekolah
               </h3>
               <button className="text-[10px] font-black text-purple-400 uppercase italic hover:text-purple-300">View Detailed Analytics</button>
            </div>

            <div className="p-8 space-y-8">
                {AI_USAGE_BY_SCHOOL.map((school) => {
                    const usagePercent = (school.tokensUsed / school.quota) * 100;
                    const isCritical = usagePercent > 80;

                    return (
                        <div key={school.id} className="space-y-3 group">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="text-sm font-black text-white uppercase italic group-hover:text-purple-400 transition-colors">{school.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase italic mt-1">Paket: {school.plan} • {school.activeUsers} Guru Aktif</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-white italic">{school.tokensUsed.toLocaleString()} / {school.quota.toLocaleString()}</p>
                                    <p className="text-[9px] text-slate-500 uppercase font-black italic mt-1">Estimasi: ${school.cost}</p>
                                </div>
                            </div>
                            
                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${
                                        isCritical ? 'bg-linear-to-r from-red-500 to-red-400' : 'bg-linear-to-r from-purple-600 to-blue-500'
                                    }`}
                                    style={{ width: `${usagePercent}%` }}
                                />
                            </div>

                            {isCritical && (
                                <div className="flex items-center gap-2 text-red-400">
                                    <FiAlertCircle size={12} className="animate-pulse" />
                                    <span className="text-[9px] font-black uppercase italic">Critical: Kuota hampir habis. Sekolah disarankan Upgrade Paket.</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
          </div>
        </div>

        {/* AI MODEL CONFIGURATION (1 COL) */}
        <div className="space-y-8">
            
            {/* MODEL SELECTOR */}
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
                <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                    <FiLayers className="text-purple-500" /> Active Engine
                </h3>
                <div className="space-y-3">
                    <EngineOption label="Gemini 1.5 Pro" active desc="Balanced for Education" />
                    <EngineOption label="Gemini 1.5 Flash" desc="Fastest for Chat" />
                    <EngineOption label="GPT-4o (OpenAI)" desc="Premium Logic Performance" />
                </div>
            </div>

            {/* COST EFFICIENCY BOX */}
            <div className="bg-linear-to-br from-purple-600 to-indigo-800 rounded-4xl p-8 text-white shadow-xl shadow-purple-900/30">
                <div className="flex items-center gap-3 mb-4">
                    <FiCheckCircle className="text-2xl" />
                    <h4 className="font-black uppercase italic text-lg leading-none">Smart Caching</h4>
                </div>
                <p className="text-purple-100 text-[11px] font-medium leading-relaxed italic mb-6">
                    Sistem Caching aktif. <span className="font-bold">24% Token berhasil dihemat</span> karena guru sering meminta Lesson Plan dengan topik serupa.
                </p>
                <div className="bg-white/10 p-4 rounded-2xl">
                    <div className="flex justify-between text-[10px] font-black uppercase italic">
                        <span>Efisiensi</span>
                        <span className="text-emerald-400">+Rp 2.4M Saved</span>
                    </div>
                </div>
            </div>

            {/* ADVISORY */}
            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-start gap-4">
                <FiInfo className="text-amber-500 shrink-0 mt-1" />
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic uppercase">
                    Membatasi kuota per sekolah sangat penting untuk menjaga integritas <span className="text-white">Business Model SaaS</span> SoSchool agar tidak rugi bandar.
                </p>
            </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---
const StatCard = ({ label, value, sub, icon }: any) => (
    <div className="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl group hover:border-purple-500/30 transition-all">
        <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black text-slate-500 uppercase italic tracking-widest">{label}</p>
            <div className="p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
        </div>
        <h2 className="text-3xl font-black text-white italic">{value}</h2>
        <p className="text-[9px] text-slate-600 font-bold uppercase italic mt-1">{sub}</p>
    </div>
);

const EngineOption = ({ label, active = false, desc }: any) => (
    <div className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
        active ? 'bg-purple-600/10 border-purple-500/50' : 'bg-black/20 border-white/5 hover:border-white/20'
    }`}>
        <div>
            <p className={`text-xs font-black uppercase italic ${active ? 'text-white' : 'text-slate-500'}`}>{label}</p>
            <p className="text-[8px] text-slate-600 font-bold uppercase mt-0.5 italic">{desc}</p>
        </div>
        {active && <FiCheckCircle className="text-purple-500" />}
    </div>
);

export default memo(AIIntelligenceControl);