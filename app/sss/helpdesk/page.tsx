"use client";
import React from 'react';
import { FiMessageSquare, FiClock, FiFilter, FiUser, FiSend } from 'react-icons/fi';

const HelpdeskPage = () => {
  return (
    <div className="p-6 md:p-10 bg-[#050810] min-h-screen text-slate-200">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-white">Helpdesk <span className="text-purple-500">Tickets</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">SLA Tracking & School Communications</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <p className="text-[8px] font-black text-slate-500 uppercase">Avg Response</p>
            <p className="text-xl font-black text-purple-500 italic">14m</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TICKET LIST */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative mb-6">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs italic uppercase" placeholder="Filter by Status..." />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] font-black text-purple-500">TKT-882{i}</span>
                <span className="text-[8px] font-black bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded uppercase">Urgent</span>
              </div>
              <h4 className="text-[11px] font-black text-white uppercase italic mb-1">Gagal Sinkron Dapodik</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase mb-4">SMA Negeri 1 Jakarta</p>
              <div className="flex justify-between items-center text-[8px] font-black text-slate-600 uppercase">
                <span className="flex items-center gap-1"><FiClock /> 12m left</span>
                <span className="group-hover:text-purple-500 transition-colors">View Thread</span>
              </div>
            </div>
          ))}
        </div>

        {/* THREADED MESSAGING AREA */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-4xl flex flex-col h-175">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-500"><FiUser /></div>
              <div>
                <h3 className="text-xs font-black text-white uppercase italic">SMA Negeri 1 Jakarta</h3>
                <p className="text-[9px] text-slate-500 font-bold uppercase">Topic: Payment Inquiry</p>
              </div>
            </div>
            <button className="bg-emerald-600/10 text-emerald-500 px-4 py-2 rounded-xl text-[9px] font-black uppercase italic border border-emerald-500/20">Mark Resolved</button>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <div className="max-w-[80%] bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/5">
              <p className="text-[11px] leading-relaxed italic">Halo tim SoSchool, kami mengalami kendala saat melakukan penarikan dana (payout) SoPay. Muncul error 'Invalid API Key'. Mohon bantuannya.</p>
              <span className="text-[8px] text-slate-600 mt-2 block font-bold">10:45 AM</span>
            </div>
            <div className="max-w-[80%] bg-purple-600/10 p-4 rounded-3xl rounded-tr-none border border-purple-500/20 ml-auto">
              <p className="text-[11px] leading-relaxed italic">Selamat pagi Admin SMA 1 Jakarta. Mohon maaf atas ketidaknyamanannya. Tim teknis kami sedang melakukan pengecekan pada modul payout. Harap tunggu sebentar.</p>
              <span className="text-[8px] text-purple-400 mt-2 block font-bold text-right">SUPPORT • 11:02 AM</span>
            </div>
          </div>

          <div className="p-6 border-t border-white/5">
            <div className="relative">
              <input className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-xs italic" placeholder="Type your response here..." />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-xl"><FiSend size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskPage;