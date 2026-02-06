"use client";

import React, { useState, memo } from 'react';
import { 
  FiRepeat, FiCheckCircle, FiAlertCircle, FiSearch, 
  FiFileText, FiDownload, FiArrowRight, FiActivity,
  FiFilter, FiRefreshCw, FiExternalLink,
  FiInfo
} from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';

// --- MOCK DATA REKONSILIASI ---
const RECON_DATA = [
  { 
    id: 'TRX-9901', 
    date: '05 Feb 2026', 
    school: 'SMA N 1 Jakarta',
    systemAmt: 500000, 
    bankAmt: 500000, 
    status: 'Matched',
    method: 'VA Mandiri'
  },
  { 
    id: 'TRX-9902', 
    date: '05 Feb 2026', 
    school: 'SMK Telkom Malang',
    systemAmt: 15000000, 
    bankAmt: 0, 
    status: 'Missing in Bank',
    method: 'Xendit Payout'
  },
  { 
    id: 'TRX-9903', 
    date: '04 Feb 2026', 
    school: 'SMP Al-Azhar',
    systemAmt: 250000, 
    bankAmt: 255000, 
    status: 'Amount Mismatch',
    method: 'QRIS'
  },
];

const BankReconciliation = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FiRepeat className="text-blue-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Rekonsiliasi <span className="text-blue-500">Bank</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Internal Ledger vs Bank Statement Validation</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all">
            <FiDownload /> Export Report
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-blue-600/20">
            <FiRefreshCw /> Run Auto-Recon
          </button>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ReconStat label="Total Synced" value="1,240" sub="Transactions" icon={<FiCheckCircle className="text-emerald-500" />} />
        <ReconStat label="Discrepancy" value="12" sub="Alerts Found" icon={<FiAlertCircle className="text-red-500" />} color="text-red-500" />
        <ReconStat label="Bank Balance" value="Rp 2.4B" sub="Real-time BCA" icon={<BsBank className="text-blue-500" />} />
        <ReconStat label="System Balance" value="Rp 2.4B" sub="SoPay Ledger" icon={<FiActivity className="text-indigo-500" />} />
      </div>

      {/* MAIN RECONCILIATION TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4 bg-white/2">
            <div className="flex items-center gap-4">
                <h3 className="text-xs font-black uppercase italic text-white tracking-widest">Data Comparison Matrix</h3>
                <span className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-black uppercase">Live Sync</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={12} />
                    <input type="text" placeholder="Search school or TRX ID..." className="bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[10px] outline-none focus:border-blue-500/50 w-64" />
                </div>
                <button className="p-2 bg-white/5 rounded-xl border border-white/5 text-slate-400"><FiFilter size={16} /></button>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase italic">Transaction Details</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase italic">SoSchool Ledger</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase italic">Bank Mutation</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase italic">Status</th>
                <th className="px-8 py-5 text-[9px] font-black text-slate-500 uppercase italic text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RECON_DATA.map((item) => (
                <tr key={item.id} className="hover:bg-white/1 transition-all group">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-black text-blue-500 mb-1">{item.id} • {item.method}</p>
                    <h4 className="text-xs font-black text-white uppercase italic">{item.school}</h4>
                    <p className="text-[9px] text-slate-600 mt-1 font-bold">{item.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-white">Rp {item.systemAmt.toLocaleString()}</p>
                    <p className="text-[8px] text-slate-500 uppercase font-black italic mt-1">Recorded in DB</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className={`text-sm font-black ${item.bankAmt === 0 ? 'text-slate-700' : 'text-white'}`}>
                        Rp {item.bankAmt.toLocaleString()}
                    </p>
                    <p className="text-[8px] text-slate-500 uppercase font-black italic mt-1">Bank Statement</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Matched' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'
                      }`} />
                      <span className={`text-[10px] font-black uppercase italic ${
                        item.status === 'Matched' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black uppercase italic text-slate-400 hover:text-white transition-all">
                        Manual Match
                      </button>
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl">
                        <FiExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER INFO */}
      <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-start gap-4">
        <FiInfo className="text-blue-500 shrink-0 mt-1" />
        <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                Sistem melakukan sinkronisasi otomatis dengan API perbankan setiap 30 menit. 
            </p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                Jika terjadi <span className="text-red-400 font-bold">Amount Mismatch</span>, mohon periksa apakah ada biaya admin bank (MDR) yang belum terhitung di sistem.
            </p>
        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENT ---
const ReconStat = ({ label, value, sub, icon, color = "text-white" }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">{label}</p>
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    </div>
    <h2 className={`text-2xl font-black ${color}`}>{value}</h2>
    <p className="text-[9px] text-slate-600 font-bold uppercase italic mt-1">{sub}</p>
  </div>
);

export default memo(BankReconciliation);