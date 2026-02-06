"use client";

import React, { useState, memo } from 'react';
import { 
  FiArrowUpRight, FiCheckCircle, FiClock, FiFileText, 
  FiSend, FiSearch, FiFilter, FiInfo, FiAlertCircle,
  FiCornerDownRight, FiArrowRight
} from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';

// --- MOCK DATA PAYOUT QUEUE ---
const PAYOUT_QUEUE = [
  {
    id: 'PAY-2026-001',
    school: 'SMA Negeri 1 Jakarta',
    bankName: 'BCA',
    accountNo: '8820394851',
    accountName: 'Bendahara SMAN 1 Jakarta',
    amount: 145500000,
    fee: 5000,
    status: 'Pending',
    requestDate: '5 Feb 2026, 10:00',
  },
  {
    id: 'PAY-2026-002',
    school: 'SMK Telkom Malang',
    bankName: 'Mandiri',
    accountNo: '144002933485',
    accountName: 'Yayasan Sandhy Putra',
    amount: 89200000,
    fee: 5000,
    status: 'Processing',
    requestDate: '5 Feb 2026, 11:30',
  },
  {
    id: 'PAY-2026-003',
    school: 'SMP Al-Azhar Pusat',
    bankName: 'BNI',
    accountNo: '023349122',
    accountName: 'SMP Al-Azhar Jakarta',
    amount: 42000000,
    fee: 5000,
    status: 'Completed',
    requestDate: '4 Feb 2026, 09:00',
  }
];

const SettlementPayout = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FiArrowUpRight className="text-indigo-400 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Settlement <span className="text-indigo-500">& Payout</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Dana Keluar & Pencairan Dana Sekolah</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <div className="leading-tight text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase italic">Dana Siap Cair</p>
            <p className="text-sm font-black text-indigo-400">Rp 1.450.800.000</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20">
            <FiSend />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDE: QUEUE LIST (3 COLS) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* SEARCH & FILTER */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari sekolah atau nomor rekening..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 transition-all text-xs font-medium"
              />
            </div>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all">
              <FiFilter /> Filter
            </button>
          </div>

          {/* PAYOUT CARDS */}
          <div className="space-y-4">
            {PAYOUT_QUEUE.map((pay) => (
              <div key={pay.id} className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl group hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  {/* SCHOOL & BANK INFO */}
                  <div className="flex gap-6 flex-1">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-slate-400 text-2xl border border-white/10">
                      <BsBank />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black text-indigo-500 uppercase">{pay.id}</span>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                          pay.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                          pay.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                        } uppercase italic`}>
                          {pay.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white uppercase italic leading-none">{pay.school}</h3>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-600 uppercase italic">Bank:</span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase">{pay.bankName} - {pay.accountNo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-slate-600 uppercase italic">A/N:</span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase">{pay.accountName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AMOUNT & ACTIONS */}
                  <div className="flex flex-col lg:items-end justify-center lg:min-w-2xl border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                    <p className="text-[9px] font-black text-slate-500 uppercase italic mb-1">Total Payout</p>
                    <h2 className="text-2xl font-black text-white italic tracking-tight">Rp {pay.amount.toLocaleString()}</h2>
                    <p className="text-[10px] font-bold text-slate-600 mt-1 uppercase italic tracking-widest">Fee: Rp {pay.fee.toLocaleString()}</p>
                    
                    <div className="mt-6 flex gap-2 w-full lg:w-auto">
                      {pay.status === 'Pending' && (
                        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-indigo-600/20">
                          Approve & Transfer
                        </button>
                      )}
                      <button className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all">
                        <FiFileText size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: INSIGHTS & SUMMARY (1 COL) */}
        <div className="space-y-8">
          
          {/* DAILY DISBURSEMENT LIMIT */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase italic text-slate-500 tracking-[0.2em] mb-6 flex items-center gap-2">
              <FiClock /> Daily Limit
            </h3>
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xl font-black text-white italic">45%</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase">Limit: Rp 5B</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[45%] shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">
              Total pencairan dana hari ini telah mencapai <span className="text-white font-bold tracking-tight">Rp 2.25B</span> dari limit harian yang ditentukan oleh bank rekanan.
            </p>
          </div>

          {/* SECURITY NOTICE */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <FiAlertCircle className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Peringatan Keamanan</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
              Setiap transaksi di atas <span className="text-white font-bold">Rp 100 Juta</span> membutuhkan verifikasi <span className="text-white font-bold italic underline">2-Factor Authentication</span> dari Super Admin Utama (Majid).
            </p>
          </div>

          {/* ACTION QUICK LINKS */}
          <div className="space-y-3">
            <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-all">
                <span className="text-[10px] font-black uppercase italic text-slate-400 group-hover:text-white">Batch Payout (Excel)</span>
                <FiArrowRight className="text-slate-600 group-hover:text-indigo-400" />
            </button>
            <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-all">
                <span className="text-[10px] font-black uppercase italic text-slate-400 group-hover:text-white">Rekening Tujuan (Whitelist)</span>
                <FiArrowRight className="text-slate-600 group-hover:text-indigo-400" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(SettlementPayout);