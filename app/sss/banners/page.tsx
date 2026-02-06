"use client";

import React, { useState, memo } from 'react';
import {  FiSend, FiPlus, FiClock, 
  FiEye, FiTrash2, FiTarget, FiLayers,
  FiZap, FiCheckCircle, FiBell, FiSmartphone,
  FiMonitor, FiLayout, FiActivity
} from 'react-icons/fi';
import { IoMegaphoneSharp } from 'react-icons/io5';

// --- MOCK BROADCAST DATA ---
const ACTIVE_BROADCASTS = [
  {
    id: 'BC-101',
    title: 'Olimpiade Sains Nasional SoSchool 2026',
    type: 'Banner',
    target: 'All Students',
    status: 'Live',
    clicks: 12450,
    impression: 85000,
    color: 'bg-indigo-600'
  },
  {
    id: 'BC-102',
    title: 'Maintenance Sistem: 06 Feb, 00:00 WIB',
    type: 'Global Alert',
    target: 'All Users',
    status: 'Scheduled',
    clicks: 0,
    impression: 0,
    color: 'bg-rose-600'
  },
  {
    id: 'BC-103',
    title: 'Update Kurikulum Merdeka v2.0',
    type: 'Popup',
    target: 'All Teachers',
    status: 'Expired',
    clicks: 4500,
    impression: 12000,
    color: 'bg-amber-600'
  }
];

const BannerBroadcast = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <IoMegaphoneSharp  className="text-amber-500 text-xl animate-bounce" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Communication <span className="text-amber-500">Center</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Announcements & User Engagement</p>
        </div>
        
        <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-amber-600/20 flex items-center gap-2">
          <FiPlus /> Create New Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: BROADCAST EDITOR (2 COLS) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* CAMPAIGN LIST */}
          <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase italic text-white tracking-widest flex items-center gap-2">
                <FiActivity className="text-amber-500" /> Active Campaigns
              </h3>
            </div>
            
            <div className="divide-y divide-white/5">
              {ACTIVE_BROADCASTS.map((bc) => (
                <div key={bc.id} className="p-8 hover:bg-white/1 transition-all group">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex gap-6">
                      <div className={`w-2 h-16 rounded-full ${bc.status === 'Live' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[9px] font-black text-amber-500 uppercase">{bc.id}</span>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase italic ${
                            bc.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : 
                            bc.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-500/10 text-slate-500'
                          }`}>
                            {bc.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight mb-2">{bc.title}</h4>
                        <div className="flex flex-wrap gap-4">
                          <span className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase"><FiLayout /> {bc.type}</span>
                          <span className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase"><FiTarget /> {bc.target}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 lg:border-l border-white/5 lg:pl-8">
                      <div className="text-center">
                        <p className="text-[10px] font-black text-white italic">{bc.impression.toLocaleString()}</p>
                        <p className="text-[8px] font-bold text-slate-600 uppercase italic">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-amber-500 italic">{bc.clicks.toLocaleString()}</p>
                        <p className="text-[8px] font-bold text-slate-600 uppercase italic">Clicks</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400"><FiEye /></button>
                        <button className="p-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl text-slate-400 border border-transparent hover:border-rose-500/20"><FiTrash2 /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PREVIEW MOCKUP */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase italic text-white mb-6 tracking-widest">Mobile App Preview</h3>
            <div className="max-w-75 mx-auto bg-[#0A0F1A] border-[6px] border-slate-800 rounded-[3rem] h-137.5 relative overflow-hidden shadow-2xl">
              {/* Header Mockup */}
              <div className="bg-indigo-600 p-3 flex justify-between items-center">
                <div className="w-12 h-2 bg-white/20 rounded-full" />
                <FiBell className="text-white" size={12} />
              </div>
              
              {/* THE BANNER PREVIEW */}
              <div className="bg-amber-500 p-4 m-3 rounded-2xl shadow-lg shadow-amber-500/20 animate-pulse">
                <p className="text-[10px] font-black text-white uppercase italic leading-tight">🏆 Olimpiade Sains SoSchool 2026</p>
                <p className="text-[8px] font-bold text-white/80 uppercase mt-1">Daftar sekarang & menangkan hadiah jutaan rupiah!</p>
              </div>

              {/* Content Mockup */}
              <div className="p-4 space-y-4">
                <div className="w-full h-32 bg-white/5 rounded-2xl" />
                <div className="flex gap-3">
                  <div className="w-full h-20 bg-white/5 rounded-2xl" />
                  <div className="w-full h-20 bg-white/5 rounded-2xl" />
                </div>
                <div className="w-full h-32 bg-white/5 rounded-2xl" />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* RIGHT: CONFIGURATION (1 COL) */}
        <div className="space-y-8">
          
          {/* BROADCAST TYPE */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
                <FiLayers className="text-amber-500" /> Display Format
             </h3>
             <div className="space-y-3">
                <FormatOption label="Sticky Top Banner" active icon={<FiLayout />} />
                <FormatOption label="Modal/Popup Alert" icon={<FiZap />} />
                <FormatOption label="Push Notification" icon={<FiSmartphone />} />
                <FormatOption label="Email Newsletter" icon={<FiMonitor />} />
             </div>
          </div>

          {/* TARGETING ENGINE */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6 tracking-widest">
                <FiTarget className="text-amber-500" /> Smart Targeting
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500" defaultChecked />
                <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase italic">Semua Sekolah</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase italic">Hanya Guru & Admin</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500" />
                <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase italic">Hanya Wilayah Tertentu</span>
              </label>
            </div>
          </div>

          {/* SCHEDULER */}
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-blue-400 mb-4">
              <FiClock className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Auto-Schedule</h4>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic mb-6 uppercase">
              Atur waktu mulai dan berakhirnya pengumuman agar tidak mengganggu *user experience* saat informasi sudah tidak relevan.
            </p>
            <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase italic border border-blue-500/10 p-3 rounded-xl bg-black/20">
                <FiCheckCircle /> Scheduler Ready
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---
const FormatOption = ({ label, active = false, icon }: any) => (
  <div className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
    active ? 'bg-amber-500/10 border-amber-500/50 text-white' : 'bg-black/20 border-white/5 text-slate-500 hover:border-white/20'
  }`}>
    <div className={active ? 'text-amber-500' : ''}>{icon}</div>
    <span className="text-[10px] font-black uppercase italic">{label}</span>
  </div>
);

export default memo(BannerBroadcast);