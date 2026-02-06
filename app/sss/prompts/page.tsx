"use client";

import React, { useState, memo } from 'react';
import { 
  FiFileText, FiShield, FiEdit3, FiEye, 
  FiSave, FiInfo, FiCheckCircle, FiGlobe,
  FiZap, FiLock, FiAlertCircle, FiCommand
} from 'react-icons/fi';

// --- MOCK PROMPT CONFIG ---
const GLOBAL_PROMPTS = {
  systemIdentity: "SoSchool Academic Engine v2.1",
  coreInstruction: `Kamu adalah asisten akademik cerdas untuk platform SoSchool. 
Tujuan utamamu adalah membantu Guru dan Siswa di Indonesia.
PRINSIP UTAMA:
1. NADA BICARA: Selalu sopan, edukatif, dan menggunakan bahasa Indonesia yang baik dan benar (EYD).
2. KURIKULUM: Selalu mengacu pada Kurikulum Merdeka dan K-13.
3. ETIKA: Jangan pernah memberikan jawaban untuk ujian/nyontek secara langsung, tapi berikan penjelasan konsep.
4. KONTEN: Larang keras konten yang mengandung SARA, pornografi, atau kekerasan.`,
  lastUpdated: '5 Feb 2026',
  updatedBy: 'Majid (Super Admin)'
};

const GlobalPromptEngineering = () => {
  const [activePrompt, setActivePrompt] = useState(GLOBAL_PROMPTS.coreInstruction);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FiCommand className="text-purple-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Global <span className="text-purple-500">Prompt Engineering</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Master System Instructions & AI Personality</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all">
            <FiEye /> Preview Persona
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-purple-600/20">
            <FiSave /> Inject System Prompt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: MAIN PROMPT EDITOR (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                    <FiEdit3 className="text-purple-500" /> Core System Message
                </h3>
                <span className="text-[9px] font-black text-slate-600 uppercase italic">Version 2.1 • Stable</span>
            </div>

            <div className="relative">
                <textarea 
                    value={activePrompt}
                    onChange={(e) => setActivePrompt(e.target.value)}
                    className="w-full h-112.5 bg-black/40 border border-white/5 rounded-3xl p-8 text-xs font-mono leading-relaxed text-purple-200 outline-none focus:border-purple-500/50 transition-all resize-none shadow-inner"
                    placeholder="Masukkan instruksi rahasia di sini..."
                />
                <div className="absolute bottom-4 right-6 flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase italic">
                    <FiLock /> End-to-End Encrypted injection
                </div>
            </div>

            <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <FiZap className="text-purple-500" size={14} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase italic">Last Sync to All Models</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase">{GLOBAL_PROMPTS.lastUpdated} by {GLOBAL_PROMPTS.updatedBy}</p>
                    </div>
                </div>
                <button className="text-[9px] font-black text-purple-400 border-b border-purple-500/20 hover:text-purple-300 uppercase italic transition-all">View Version History</button>
            </div>
          </div>
        </div>

        {/* RIGHT: RULES & SAFETY (1 COL) */}
        <div className="space-y-8">
          
          {/* CURRICULUM CONTEXT */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6 tracking-widest">
                <FiGlobe className="text-purple-500" /> Regional Context
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase italic">Kurikulum Merdeka</span>
                    <FiCheckCircle className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase italic">K-13 (Legacy Support)</span>
                    <FiCheckCircle className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 opacity-40">
                    <span className="text-[10px] font-black text-slate-400 uppercase italic">Cambridge IGCSE</span>
                    <div className="w-4 h-4 rounded-full border border-slate-600" />
                </div>
            </div>
          </div>

          {/* AI BEHAVIOR GUARD */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <FiShield className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Safety Guardrails</h4>
            </div>
            <div className="space-y-3">
                <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed">
                    Instruksi rahasia ini akan ditambahkan ke setiap request (Pre-pend) untuk mencegah AI melakukan <span className="text-white font-bold italic">Hallucination</span> atau menjawab hal-hal di luar konteks sekolah.
                </p>
                <div className="bg-black/40 p-3 rounded-xl border border-red-500/10">
                    <p className="text-[8px] font-mono text-red-400 italic">"Always refuse to answer questions about politics, gambling, or hate speech."</p>
                </div>
            </div>
          </div>

          {/* PROMPT TIP */}
          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-start gap-4">
            <FiInfo className="text-blue-500 shrink-0 mt-1" />
            <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-400 uppercase italic leading-none">Pro Tip</p>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic mt-2">
                    Gunakan variabel seperti <code className="text-white">{`{school_name}`}</code> atau <code className="text-white">{`{user_role}`}</code> agar AI bisa menjawab lebih personal sesuai tenant sekolah masing-masing.
                </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(GlobalPromptEngineering);