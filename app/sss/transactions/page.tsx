"use client";

import React, { useState, memo } from 'react';
import { 
  FiArrowUp, FiArrowDown, FiActivity, FiDollarSign, 
  FiClock, FiAlertCircle, FiZap, FiDownload
} from 'react-icons/fi';
import { BsBank } from 'react-icons/bs';

// --- DATA MOCK TRANSAKSI ---
const TRANSACTION_STATS = {
  totalInflow: "Rp 1.240.500.000",
  totalOutflow: "Rp 890.200.000",
  netVolume: "Rp 350.300.000",
  peakTime: "10:00 - 11:00 WIB",
  
  // Data Grafik 24 Jam (Simulasi Arus Kas)
  hourlyFlow: [
    { hour: '00', in: 10, out: 5 }, { hour: '02', in: 5, out: 2 },
    { hour: '04', in: 8, out: 3 }, { hour: '06', in: 45, out: 20 },
    { hour: '08', in: 85, out: 60 }, { hour: '10', in: 100, out: 95 }, // Peak
    { hour: '12', in: 70, out: 80 }, { hour: '14', in: 60, out: 45 },
    { hour: '16', in: 40, out: 30 }, { hour: '18', in: 30, out: 25 },
    { hour: '20', in: 25, out: 15 }, { hour: '22', in: 15, out: 10 },
  ],

  // Recent Transactions Live
  liveLogs: [
    { id: 1, school: 'SMA N 1 Jakarta', type: 'Top-up', amount: 'Rp 500.000', status: 'Success', time: '2 Menit lalu' },
    { id: 2, school: 'SMK Telkom', type: 'Payout', amount: 'Rp 15.000.000', status: 'Processing', time: '5 Menit lalu' },
    { id: 3, school: 'SMP Al-Hikmah', type: 'Belanja', amount: 'Rp 25.000', status: 'Success', time: '8 Menit lalu' },
  ]
};

const TransactionMonitoring = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER & ACTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <FiDollarSign className="text-amber-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Monitoring <span className="text-amber-500">Transaksi</span> SoPay
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Financial Flow & Settlement</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-xs font-black uppercase italic transition-all">
          <FiDownload /> Export Ledger (CSV)
        </button>
      </div>

      {/* TOP CARDS: FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          label="Total Kas Masuk (Top-up)" 
          value={TRANSACTION_STATS.totalInflow} 
          icon={<FiArrowUp className="text-emerald-400" />} 
          sub="Dari 1,284 Sekolah"
        />
        <StatCard 
          label="Total Kas Keluar (Belanja/Payout)" 
          value={TRANSACTION_STATS.totalOutflow} 
          icon={<FiArrowDown className="text-red-400" />} 
          sub="MDR Platform: Rp 12.4M"
        />
        <StatCard 
          label="Volume Bersih (Net)" 
          value={TRANSACTION_STATS.netVolume} 
          icon={<FiActivity className="text-blue-400" />} 
          sub="Settlement Ready"
          isHighlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CHART: INFLOW VS OUTFLOW */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FiZap className="text-amber-500" /> Arus Kas 24 Jam
              </h3>
              <p className="text-slate-500 text-xs">Perbandingan Top-up vs Penggunaan Saldo</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase italic">
                <div className="w-3 h-3 bg-blue-500 rounded-full" /> Inflow
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase italic">
                <div className="w-3 h-3 bg-red-500 rounded-full" /> Outflow
              </div>
            </div>
          </div>

          {/* Dual Bar Chart */}
          <div className="flex items-end justify-between h-72 gap-3">
            {TRANSACTION_STATS.hourlyFlow.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Outflow Bar (Red) */}
                <div 
                  style={{ height: `${data.out}%` }} 
                  className="w-full max-w-2 bg-red-500/40 rounded-t-full absolute left-1/2 -translate-x-0.2 transition-all group-hover:bg-red-500"
                />
                {/* Inflow Bar (Blue) */}
                <div 
                  style={{ height: `${data.in}%` }} 
                  className="w-full max-w-2 bg-blue-500 rounded-t-full translate-x-1.5 relative z-10 transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                />
                
                <span className="mt-4 text-[9px] font-black text-slate-600 group-hover:text-blue-400 transition-colors italic">
                  {data.hour}:00
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR: PEAK TIME & LIVE LOGS */}
        <div className="space-y-6">
          {/* Peak Time Indicator */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-800 rounded-4xl p-6 text-white shadow-xl shadow-blue-900/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-xl">
                <FiClock className="text-xl" />
              </div>
              <h4 className="text-xs font-black uppercase italic tracking-widest">Beban Puncak</h4>
            </div>
            <h2 className="text-2xl font-black mb-1">{TRANSACTION_STATS.peakTime}</h2>
            <p className="text-blue-100/60 text-[10px] font-medium leading-relaxed">
              Traffic tertinggi terdeteksi saat jam istirahat sekolah. Pastikan server SoPay dalam kondisi High Availability.
            </p>
          </div>

          {/* Live Transaction Logs */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-6 backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase italic text-slate-400 tracking-widest mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Live Transaction
            </h3>
            <div className="space-y-5">
              {TRANSACTION_STATS.liveLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-xs ${
                      log.type === 'Top-up' ? 'bg-emerald-500/10 text-emerald-400' : 
                      log.type === 'Payout' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      <BsBank />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase italic text-white leading-none">{log.school}</h4>
                      <p className="text-[9px] text-slate-500 mt-1">{log.type} • {log.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white">{log.amount}</p>
                    <p className={`text-[8px] font-bold uppercase italic ${log.status === 'Success' ? 'text-emerald-500' : 'text-blue-400 animate-pulse'}`}>
                      {log.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HEATMAP SIMULATION: BEBAN PER JAM */}
      <div className="mt-8 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
        <h3 className="text-xs font-black uppercase italic text-slate-400 tracking-widest mb-6">Heatmap Kepadatan Transaksi (Mingguan)</h3>
        <div className="grid grid-cols-24 gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 items-center">
              <div 
                className={`w-full aspect-square rounded-sm ${
                  i > 8 && i < 14 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 
                  i > 17 && i < 20 ? 'bg-blue-700' : 'bg-white/5'
                }`} 
              />
              <span className="text-[7px] text-slate-600 font-bold">{i}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---

const StatCard = ({ label, value, icon, sub, isHighlight }: any) => (
  <div className={`relative overflow-hidden p-6 rounded-3xl border transition-all duration-500 ${
    isHighlight 
    ? 'bg-blue-600 border-blue-400 shadow-xl shadow-blue-600/20' 
    : 'bg-white/5 border-white/10 hover:border-white/20'
  }`}>
    <div className="flex justify-between items-start mb-4">
      <p className={`text-[10px] font-black uppercase italic tracking-widest ${isHighlight ? 'text-blue-100' : 'text-slate-500'}`}>
        {label}
      </p>
      <div className={`p-2 rounded-xl ${isHighlight ? 'bg-white/20' : 'bg-white/5'}`}>
        {icon}
      </div>
    </div>
    <h2 className={`text-2xl font-black ${isHighlight ? 'text-white' : 'text-white'}`}>{value}</h2>
    <p className={`text-[9px] mt-1 font-bold italic ${isHighlight ? 'text-blue-200' : 'text-slate-500'}`}>{sub}</p>
    {isHighlight && (
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 blur-3xl rounded-full" />
    )}
  </div>
);

export default memo(TransactionMonitoring);