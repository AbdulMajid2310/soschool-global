"use client";

import React, { useState } from 'react';
import { 
  FiTrendingUp, FiUsers, FiHome, FiActivity, 
  FiArrowUpRight, FiMapPin, FiCheckCircle 
} from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';

// --- DATA MOCK (Skala Nasional) ---
const ECOSYSTEM_DATA = {
  stats: [
    { id: 1, label: 'Sekolah Aktif', value: '1,284', grow: '+12%', icon: <FiHome />, color: 'blue' },
    { id: 2, label: 'Total Siswa', value: '452.910', grow: '+5.4%', icon: <FiUsers />, color: 'emerald' },
    { id: 3, label: 'Total Guru', value: '38.200', grow: '+2.1%', icon: <FiActivity />, color: 'violet' },
    { id: 4, label: 'SoPay Volume', value: 'Rp 12.8M', grow: '+18%', icon: <FiTrendingUp />, color: 'amber' },
  ],
  recentGrowth: [
    { month: 'Jan', users: 4000 },
    { month: 'Feb', users: 5500 },
    { month: 'Mar', users: 4800 },
    { month: 'Apr', users: 7000 },
    { month: 'Mei', users: 8500 },
    { month: 'Jun', users: 12000 },
  ],
  topSchools: [
    { name: 'SMA Negeri 1 Jakarta', region: 'DKI Jakarta', students: '1.200', status: 'Enterprise' },
    { name: 'SMK Telkom Malang', region: 'Jawa Timur', students: '2.500', status: 'Enterprise' },
    { name: 'SMA Al-Azhar Pusat', region: 'DKI Jakarta', students: '950', status: 'Premium' },
  ]
};

const EcosystemStatus = () => {
  return (
    <div className="min-h-screen dark:text-gray-700 text-slate-200 p-6 md:p-10 font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <FiActivity className="text-blue-500 text-xl" />
          </div>
          <h1 className="text-2xl font-black italic uppercase  text-white dark:text-gray-700">
            Status <span className="text-blue-500">Ekosistem</span> Nasional
          </h1>
        </div>
        <p className="text-slate-500 text-sm font-medium">Monitoring performa real-time SoSchool seluruh Indonesia.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {ECOSYSTEM_DATA.stats.map((stat) => (
          <div key={stat.id} className="relative group overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl hover:border-blue-500/50 transition-all duration-500">
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${stat.color}-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all`} />
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-3 rounded-2xl bg-white/5 text-${stat.color}-400 text-2xl`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.grow} <FiArrowUpRight />
              </div>
            </div>

            <div className="mt-5 relative z-10">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest italic">{stat.label}</p>
              <h2 className="text-3xl font-black text-white mt-1">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHART VISUALIZATION (GROWTH) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Pertumbuhan Pengguna Baru</h3>
              <p className="text-slate-500 text-xs">Total registrasi siswa & guru 6 bulan terakhir</p>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 transition-all">
              <option>Tahun 2026</option>
              <option>Tahun 2025</option>
            </select>
          </div>

          {/* Simple CSS-based Bar Chart */}
          <div className="flex items-end justify-between h-64 gap-2 pt-10">
            {ECOSYSTEM_DATA.recentGrowth.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex flex-col justify-end items-center h-full">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded hidden group-hover:block transition-all shadow-lg shadow-blue-500/20">
                    {item.users.toLocaleString()}
                  </div>
                  <div 
                    style={{ height: `${(item.users / 12000) * 100}%` }}
                    className="w-full max-w-10 bg-linear-to-t from-blue-600 to-blue-400 rounded-t-xl group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-500 relative"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />
                  </div>
                </div>
                <span className="mt-4 text-[10px] font-black uppercase text-slate-500 group-hover:text-white transition-colors tracking-tighter italic">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TOP SCHOOLS SIDEBAR */}
        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Sekolah Unggulan</h3>
          <div className="space-y-6">
            {ECOSYSTEM_DATA.topSchools.map((school, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl font-black group-hover:bg-blue-500 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <div className="flex-1 border-b border-white/5 pb-4 group-last:border-none">
                  <h4 className="text-xs font-black uppercase italic text-white leading-tight">{school.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 font-bold italic">
                      <FiMapPin size={10} /> {school.region}
                    </span>
                    <span className="text-[10px] text-blue-400 font-black italic">
                      {school.students} Siswa
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-white/5 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/20 hover:border-blue-500 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all">
            Lihat Semua Direktori
          </button>
        </div>
      </div>
      
      {/* SYSTEM LOG FOOTER */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">API Server: Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">AI Engine: Ready</span>
          </div>
        </div>
        <p className="text-[9px] font-medium text-slate-600 italic uppercase tracking-[0.2em]">
          Last update: 5 Feb 2026 - 20:38 WIB
        </p>
      </div>
    </div>
  );
};

export default EcosystemStatus;