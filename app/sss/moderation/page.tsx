"use client";

import React, { useState, memo } from 'react';
import { 
  FiShield, FiMessageSquare, FiTrash2, FiFlag, 
  FiCheck, FiAlertCircle, FiSearch, FiFilter,
  FiUser, FiClock, FiEye, FiMoreVertical,
  FiSlash, FiThumbsDown
} from 'react-icons/fi';

// --- MOCK MODERATION DATA ---
const REPORTED_POSTS = [
  {
    id: 'POST-4021',
    author: 'Siswa_Anon01',
    school: 'SMA Negeri 1 Jakarta',
    content: 'Woi, liat deh si Budi cupu banget pas presentasi tadi wkwk. Ga level!',
    violationType: 'Bullying / Harassment',
    aiScore: 88, // Persentase toxicity
    timestamp: '5 Feb 2026, 14:20',
    reports: 3,
    status: 'Flagged'
  },
  {
    id: 'POST-4019',
    author: 'Reza_X',
    school: 'SMK Telkom Malang',
    content: 'Jual kunci jawaban ujian semester besok! DM yang minat, murah aja bro.',
    violationType: 'Academic Fraud',
    aiScore: 95,
    timestamp: '5 Feb 2026, 13:05',
    reports: 12,
    status: 'Under Review'
  },
  {
    id: 'POST-3998',
    author: 'Andini_Putri',
    school: 'SMP Al-Azhar',
    content: 'Ada yang tau cara ngerjain soal matematika halaman 42?',
    violationType: 'None (False Positive)',
    aiScore: 5,
    timestamp: '5 Feb 2026, 10:15',
    reports: 1,
    status: 'Safe'
  }
];

const CommunityModeration = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-500/10 rounded-lg">
              <FiShield className="text-rose-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Community <span className="text-rose-500">Moderation</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Feed Surveillance & Anti-Bullying System</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-rose-500/10 border border-rose-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-rose-400 uppercase italic">Live Monitoring: Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MODERATION QUEUE (3 COLS) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari konten, siswa, atau sekolah..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-rose-500/50 transition-all text-xs font-medium"
              />
            </div>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all">
              <FiFilter /> Filter Pelanggaran
            </button>
          </div>

          <div className="space-y-4">
            {REPORTED_POSTS.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl group hover:border-rose-500/30 transition-all">
                <div className="flex flex-col lg:flex-row gap-8">
                  
                  {/* AI ANALYSIS SCORE */}
                  <div className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/5 rounded-3xl min-w-30">
                    <p className="text-[8px] font-black text-slate-500 uppercase italic mb-2">Toxicity</p>
                    <h2 className={`text-3xl font-black italic ${post.aiScore > 80 ? 'text-rose-500' : post.aiScore > 50 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {post.aiScore}%
                    </h2>
                    <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${post.aiScore > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${post.aiScore}%` }} />
                    </div>
                  </div>

                  {/* CONTENT INFO */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg"><FiUser className="text-slate-400" /></div>
                            <div>
                                <h4 className="text-xs font-black text-white uppercase italic">{post.author}</h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase italic">{post.school}</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-black text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full uppercase italic border border-rose-500/20">
                            {post.violationType}
                        </span>
                    </div>

                    <div className="p-5 bg-white/5 border border-white/5 rounded-2xl italic text-sm text-slate-300 leading-relaxed">
                        "{post.content}"
                    </div>

                    <div className="flex items-center gap-6 text-[9px] font-black text-slate-500 uppercase italic">
                        <span className="flex items-center gap-1"><FiClock /> {post.timestamp}</span>
                        <span className="flex items-center gap-1 text-rose-500"><FiFlag /> {post.reports} Reports by Users</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-row lg:flex-col gap-2 justify-center lg:border-l border-white/5 lg:pl-8 pt-4 lg:pt-0">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[9px] font-black uppercase italic transition-all shadow-lg shadow-rose-600/20">
                        <FiTrash2 /> Take Down
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-[9px] font-black uppercase italic transition-all border border-white/5">
                        <FiCheck /> Approve
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-2xl transition-all">
                        <FiSlash /> Ban User
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: INSIGHTS & RULES (1 COL) */}
        <div className="space-y-8">
          
          {/* STATS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-[10px] font-black uppercase italic text-slate-500 tracking-[0.2em] mb-6">Moderation Stats</h3>
             <div className="space-y-6">
                <div>
                    <p className="text-2xl font-black text-white italic">142</p>
                    <p className="text-[9px] font-bold text-rose-500 uppercase italic mt-1">Postingan di-takedown hari ini</p>
                </div>
                <div className="h-px bg-white/5 w-full" />
                <div>
                    <p className="text-2xl font-black text-white italic">98.2%</p>
                    <p className="text-[9px] font-bold text-emerald-500 uppercase italic mt-1">AI Accuracy Rate</p>
                </div>
             </div>
          </div>

          {/* AUTO-MODERATION RULES */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6 tracking-widest">
                <FiAlertCircle className="text-rose-500" /> Auto-Hide Rules
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-slate-400 uppercase italic">Score {'>'} 90%</span>
                    <span className="text-[8px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded uppercase">Instant Delete</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-[9px] font-black text-slate-400 uppercase italic">Reports {'>'} 5</span>
                    <span className="text-[8px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase">Hide & Review</span>
                </div>
            </div>
          </div>

          {/* SAFETY ADVISORY */}
          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
             <div className="flex items-center gap-2 text-blue-400 mb-3">
                <FiAlertCircle />
                <span className="text-[10px] font-black uppercase italic">Legal Advisory</span>
             </div>
             <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed uppercase">
                Pastikan setiap tindakan takedown memiliki bukti log yang kuat untuk menghindari tuntutan dari pihak sekolah atau wali murid.
             </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(CommunityModeration);