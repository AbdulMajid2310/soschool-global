"use client";

import React, { useState, memo } from 'react';
import { 
  FiSettings, FiShield, FiZap, FiBox, 
  FiClock, FiEdit3, FiRefreshCw, FiCheckCircle,
  FiTrendingUp, FiInfo, FiPlus
} from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';

// --- MOCK DATA CONFIG ---
const LICENSE_PLANS = [
  { 
    id: 'basic', 
    name: 'Basic', 
    price: 'Rp 500k/bln', 
    features: ['LMS Core', 'E-Library', 'Standard Support'],
    color: 'slate'
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: 'Rp 2.5M/bln', 
    features: ['All Basic', 'SoPay Integration', 'Whitelabel', 'Priority Support'],
    color: 'blue'
  },
  { 
    id: 'enterprise', 
    name: 'Enterprise', 
    price: 'Custom', 
    features: ['All Premium', 'SoSchool AI Engine', 'Dedicated Server', 'SLA 99.9%'],
    color: 'amber',
    hasAI: true
  },
];

const ACTIVE_LICENSES = [
  { id: 'L-101', school: 'SMA Negeri 1 Jakarta', plan: 'Enterprise', expiry: '20 Dec 2026', status: 'Active', autoRenewal: true },
  { id: 'L-102', school: 'SMK Telkom Malang', plan: 'Enterprise', expiry: '15 Jan 2027', status: 'Active', autoRenewal: true },
  { id: 'L-103', school: 'SMP Al-Azhar Pusat', plan: 'Premium', expiry: '05 Mar 2026', status: 'Active', autoRenewal: false },
  { id: 'L-104', school: 'SDIT Permata Hati', plan: 'Basic', expiry: '12 Feb 2026', status: 'Grace Period', autoRenewal: false },
];

const LicenseManagement = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <FiSettings className="text-amber-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Manajemen <span className="text-amber-500">Lisensi & Paket</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">SaaS Subscription & Feature Entitlement Control</p>
        </div>
        
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-xs font-black uppercase italic transition-all">
          <FiPlus /> Buat Paket Baru
        </button>
      </div>

      {/* PLAN CONFIGURATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {LICENSE_PLANS.map((plan) => (
          <div key={plan.id} className={`p-8 rounded-4xl border relative overflow-hidden group transition-all duration-500 hover:-translate-y-2
            ${plan.id === 'enterprise' ? 'bg-linear-to-br from-amber-600/10 to-transparent border-amber-500/30' : 'bg-white/5 border-white/10'}
          `}>
            {plan.hasAI && (
              <div className="absolute top-4 right-4 bg-amber-500 text-black text-[8px] font-black px-2 py-1 rounded-md uppercase italic flex items-center gap-1 animate-pulse">
                <LuBrain /> AI Enabled
              </div>
            )}
            
            <h3 className={`text-xl font-black uppercase italic mb-1 ${plan.id === 'enterprise' ? 'text-amber-500' : 'text-white'}`}>
              {plan.name}
            </h3>
            <p className="text-2xl font-black text-white mb-6">{plan.price}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <FiCheckCircle className={plan.id === 'enterprise' ? 'text-amber-500' : 'text-blue-500'} /> {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase italic transition-all">
              Edit Benefit
            </button>
          </div>
        ))}
      </div>

      {/* ACTIVE LICENSES TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2">
            <FiShield className="text-amber-500" /> Lisensi Sekolah Aktif
          </h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase italic">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Normal
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase italic">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Expiring
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 border-b border-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">ID / Sekolah</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Paket Saat Ini</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Masa Berlaku</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Auto-Renew</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase italic tracking-widest text-center">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ACTIVE_LICENSES.map((lic) => (
                <tr key={lic.id} className="hover:bg-white/2 transition-all group">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-black text-amber-500 mb-1">{lic.id}</p>
                    <h4 className="text-xs font-black text-white uppercase italic">{lic.school}</h4>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${lic.plan === 'Enterprise' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                        {lic.plan === 'Enterprise' ? <LuBrain size={14} /> : <FiBox size={14} />}
                      </div>
                      <span className="text-xs font-black uppercase italic text-slate-300">{lic.plan}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <FiClock className={lic.status === 'Grace Period' ? 'text-red-500' : 'text-slate-500'} />
                        {lic.expiry}
                      </span>
                      <span className={`text-[9px] font-black uppercase italic mt-1 ${lic.status === 'Grace Period' ? 'text-red-500' : 'text-emerald-500'}`}>
                        {lic.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className={`w-12 h-6 rounded-full p-1 transition-all ${lic.autoRenewal ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                        <div className={`w-4 h-4 rounded-full transition-all ${lic.autoRenewal ? 'bg-emerald-500 translate-x-6' : 'bg-slate-600'}`} />
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-xl text-[10px] font-black uppercase italic hover:bg-amber-400 transition-all">
                        <FiZap /> Upgrade
                      </button>
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all">
                        <FiEdit3 size={14} />
                      </button>
                      <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all">
                        <FiRefreshCw size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REVENUE INSIGHT */}
      <div className="mt-10 p-8 bg-linear-to-r from-blue-600/10 to-amber-600/10 border border-white/10 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-amber-500 text-3xl border border-white/10">
            <FiTrendingUp />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase italic mb-1">Potensi Upgrade</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              Ada <span className="text-white font-bold">42 Sekolah</span> di paket Premium yang telah mencapai limit storage.<br/>
              Waktunya menawarkan upgrade ke <span className="text-amber-500 font-bold uppercase">Enterprise AI</span>.
            </p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase italic hover:bg-slate-200 transition-all">
          Kirim Penawaran Global
        </button>
      </div>

    </div>
  );
};

export default memo(LicenseManagement);