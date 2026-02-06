"use client";

import React, { useState, memo } from 'react';
import { 
  FiShield, FiAlertOctagon, FiActivity, FiUser, 
  FiMapPin, FiClock, FiSlash, FiCheck, FiMoreHorizontal,
  FiZap, FiLock, FiEye, FiSearch
} from 'react-icons/fi';

// --- MOCK FRAUD ALERTS ---
const FRAUD_ALERTS = [
  {
    id: 'FRD-1029',
    user: 'Andi Wijaya (Siswa)',
    school: 'SMA Negeri 1 Jakarta',
    riskScore: 92,
    reason: 'Rapid Top-up Pattern',
    description: '3 transaksi top-up @ Rp2.000.000 dalam 45 detik via VA Mandiri.',
    status: 'Flagged',
    timestamp: '5 Feb 2026, 21:10',
    location: 'Jakarta, ID (IP: 182.253.x.x)'
  },
  {
    id: 'FRD-1028',
    user: 'Budi Santoso (Admin Kantin)',
    school: 'SMK Telkom Malang',
    riskScore: 78,
    reason: 'Unusual Payout Amount',
    description: 'Permintaan pencairan dana 5x lipat dari rata-rata harian (Rp45.000.000).',
    status: 'Pending Review',
    timestamp: '5 Feb 2026, 20:45',
    location: 'Malang, ID (IP: 114.124.x.x)'
  },
  {
    id: 'FRD-1025',
    user: 'Unknown Device',
    school: 'SDIT Permata Hati',
    riskScore: 95,
    reason: 'Brute Force Attempt',
    description: '15x gagal login dalam 2 menit pada akun Bendahara Sekolah.',
    status: 'Account Locked',
    timestamp: '5 Feb 2026, 18:20',
    location: 'Kaliningrad, RU (IP: 95.161.x.x)'
  }
];

const FraudDetectionLab = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <FiShield className="text-red-500 text-xl animate-pulse" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Fraud <span className="text-red-500">Detection Lab</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">AI-Powered Anti Money Laundering (AML) Monitor</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
          <p className="text-[10px] font-black text-white uppercase italic">Sistem Monitoring Aktif</p>
        </div>
      </div>

      {/* RISK SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-4xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FiAlertOctagon size={80} className="text-red-500" />
            </div>
            <p className="text-[10px] font-black text-red-400 uppercase italic mb-2 tracking-widest">High Risk Alerts</p>
            <h2 className="text-4xl font-black text-white italic">03</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Butuh Tindakan Segera</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase italic mb-2 tracking-widest">Avg. Risk Score</p>
            <h2 className="text-4xl font-black text-emerald-400 italic">12.4</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Status: Aman (Normal)</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase italic mb-2 tracking-widest">Auto-Blocked</p>
            <h2 className="text-4xl font-black text-white italic">142</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Percobaan Ilegal Bulan Ini</p>
        </div>
      </div>

      {/* RADAR & ALERTS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ALERT LIST (2 COLS) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <FiActivity className="text-red-500" /> Insiden Terbaru
            </h3>
            <div className="flex gap-2">
                 <button className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><FiSearch /></button>
                 <button className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><FiMoreHorizontal /></button>
            </div>
          </div>

          {FRAUD_ALERTS.map((alert) => (
            <div key={alert.id} className="group bg-white/5 border border-white/10 rounded-4xl p-8 hover:border-red-500/40 transition-all duration-500">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex gap-6">
                        <div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center border transition-all ${
                            alert.riskScore > 90 ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                        }`}>
                            <span className="text-2xl font-black leading-none">{alert.riskScore}</span>
                            <span className="text-[8px] font-black uppercase italic">Score</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{alert.reason}</h4>
                                <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded uppercase">{alert.id}</span>
                            </div>
                            <p className="text-xs text-slate-400 font-medium italic leading-relaxed max-w-md">{alert.description}</p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                    <FiUser className="text-red-500" /> {alert.user}
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                    <FiMapPin className="text-red-500" /> {alert.location}
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                    <FiClock className="text-red-500" /> {alert.timestamp}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-2xl text-[9px] font-black uppercase italic transition-all shadow-lg shadow-red-600/20">
                            <FiSlash /> Suspend Account
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-[9px] font-black uppercase italic transition-all border border-white/5">
                            <FiCheck /> Dismiss
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>

        {/* SETTINGS & SYSTEM RULES (1 COL) */}
        <div className="space-y-8">
          
          {/* AI AUTOMATION TOGGLES */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
              <FiZap className="text-red-500" /> Auto-Rules
            </h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-white uppercase italic">Auto-Lock Brute Force</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase italic">Kunci akun setelah 10x gagal</p>
                    </div>
                    <div className="w-10 h-5 bg-red-600 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1" />
                    </div>
                </div>
                <div className="flex items-center justify-between opacity-50">
                    <div>
                        <p className="text-[10px] font-black text-white uppercase italic">MDR Spike Detection</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase italic">Cegah lonjakan fee abnormal</p>
                    </div>
                    <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer">
                        <div className="w-3 h-3 bg-slate-500 rounded-full absolute left-1 top-1" />
                    </div>
                </div>
            </div>
          </div>

          {/* SENSITIVITY CONFIG */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6">
              <FiLock className="text-red-500" /> Sensitivity Level
            </h3>
            <input type="range" className="w-full accent-red-600 bg-white/5 rounded-lg appearance-none h-1.5 mb-4" />
            <div className="flex justify-between text-[10px] font-black uppercase italic text-slate-500">
                <span>Relaxed</span>
                <span className="text-red-500">Aggressive</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic mt-6 leading-relaxed">
                Mode <span className="text-white">Aggressive</span> akan otomatis melakukan pembatalan transaksi (void) pada skor risiko di atas 75.
            </p>
          </div>

          {/* INVESTIGATION QUICK LINK */}
          <button className="w-full py-6 bg-linear-to-r from-red-600/20 to-transparent border border-red-500/30 rounded-4xl text-left px-8 group hover:from-red-600/30 transition-all">
                <p className="text-[10px] font-black text-red-500 uppercase italic tracking-[0.2em] mb-1">Deep Analysis</p>
                <h4 className="text-lg font-black text-white uppercase italic group-hover:translate-x-2 transition-transform">Transaction Log Engine →</h4>
          </button>

        </div>
      </div>

    </div>
  );
};

export default memo(FraudDetectionLab);