"use client";

import React, { useState, memo } from 'react';
import { 
  FiDatabase, FiCloud, FiRefreshCw, FiDownload, 
  FiPlay, FiClock, FiHardDrive, FiCheckCircle,
  FiAlertTriangle, FiShield, FiServer, FiArchive,
  FiActivity, FiSearch, FiChevronRight,
  FiSettings
} from 'react-icons/fi';

// --- MOCK BACKUP DATA ---
const BACKUP_HISTORY = [
  {
    id: 'BKP-20260205-01',
    name: 'Daily Global Snapshot',
    size: '1.2 TB',
    provider: 'AWS S3 (Singapore)',
    timestamp: '5 Feb 2026, 03:00',
    status: 'Success',
    integrity: 'Verified'
  },
  {
    id: 'BKP-20260204-01',
    name: 'Full Database Cluster',
    size: '1.18 TB',
    provider: 'Google Cloud (Jakarta)',
    timestamp: '4 Feb 2026, 03:00',
    status: 'Success',
    integrity: 'Verified'
  },
  {
    id: 'BKP-20260203-05',
    name: 'Emergency Hotfix Backup',
    size: '850 GB',
    provider: 'Local Storage (Node-01)',
    timestamp: '3 Feb 2026, 22:15',
    status: 'Failed',
    integrity: 'Corrupted'
  }
];

const BackupDisasterRecovery = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <FiDatabase className="text-emerald-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Data <span className="text-emerald-500">Fortress</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Backup Strategy & Disaster Recovery Hub</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all flex items-center gap-2">
            <FiRefreshCw /> Schedule Settings
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2">
            <FiPlay /> Backup Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: BACKUP HISTORY (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* STORAGE OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StorageCard label="Primary S3" usage="85%" color="text-blue-500" />
            <StorageCard label="DR Site Jakarta" usage="42%" color="text-emerald-500" />
            <StorageCard label="Archive Glacier" usage="12%" color="text-purple-500" />
          </div>

          {/* HISTORY TABLE */}
          <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
                <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                    <FiArchive className="text-emerald-500" /> Snapshot History
                </h3>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={12} />
                    <input type="text" placeholder="Search backups..." className="bg-black/40 border border-white/5 rounded-xl py-2 pl-8 pr-4 text-[10px] outline-none" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-[9px] font-black text-slate-500 uppercase italic">
                            <th className="p-6">Backup Instance</th>
                            <th className="p-6">Provider</th>
                            <th className="p-6">Size</th>
                            <th className="p-6 text-center">Status</th>
                            <th className="p-6 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {BACKUP_HISTORY.map((bkp) => (
                            <tr key={bkp.id} className="hover:bg-white/1 transition-colors group">
                                <td className="p-6">
                                    <p className="text-[11px] font-black text-white uppercase italic">{bkp.name}</p>
                                    <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold">{bkp.timestamp} • {bkp.id}</p>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                        <FiCloud className="text-blue-500" /> {bkp.provider}
                                    </div>
                                </td>
                                <td className="p-6 text-[10px] font-mono text-slate-400">{bkp.size}</td>
                                <td className="p-6">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                            bkp.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                        }`}>{bkp.status}</span>
                                        <span className="text-[8px] text-slate-600 font-bold uppercase">{bkp.integrity}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <button className="p-3 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-xl transition-all border border-transparent hover:border-emerald-500/20">
                                        <FiDownload size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        {/* RIGHT: STRATEGY & CONFIG (1 COL) */}
        <div className="space-y-8">
          
          {/* RECOVERY READINESS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
                <FiShield className="text-emerald-500" /> Recovery Health
             </h3>
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-black text-white italic">RPO: 24h</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase italic">Recovery Point Objective</p>
                    </div>
                    <FiCheckCircle className="text-emerald-500 text-xl" />
                </div>
                <div className="h-px bg-white/5 w-full" />
                <div>
                    <p className="text-2xl font-black text-white italic">RTO: 15m</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase italic">Est. Recovery Time Objective</p>
                </div>
             </div>
          </div>

          {/* BACKUP STRATEGY */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 mb-6 tracking-widest">
                <FiSettings className="text-emerald-500" /> Configuration
            </h3>
            <div className="space-y-4">
                <StrategyToggle label="Multi-Region Replication" active />
                <StrategyToggle label="SQL Binary Logs" active />
                <StrategyToggle label="Encrypted Snapshots" active />
                <StrategyToggle label="Cold Storage Auto-Archiving" />
            </div>
          </div>

          {/* EMERGENCY SYSTEM */}
          <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-4xl">
             <div className="flex items-center gap-3 text-rose-500 mb-4">
                <FiAlertTriangle className="text-xl animate-pulse" />
                <h4 className="text-[10px] font-black uppercase italic tracking-widest">Critical Action</h4>
             </div>
             <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed mb-6 uppercase">
                Gunakan <span className="text-white">Point-in-Time Recovery</span> hanya dalam kondisi darurat (misal: Serangan Ransomware). Proses ini akan memutar balik seluruh database ke waktu tertentu.
             </p>
             <button className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-rose-600/20">
                Trigger Disaster Recovery
             </button>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---
const StorageCard = ({ label, usage, color }: any) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
        <p className="text-[9px] font-black text-slate-500 uppercase italic mb-3">{label}</p>
        <div className="flex items-end justify-between">
            <h3 className={`text-2xl font-black italic ${color}`}>{usage}</h3>
            <FiServer className="text-slate-700 mb-1" />
        </div>
        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full bg-current ${color}`} style={{ width: usage }} />
        </div>
    </div>
);

const StrategyToggle = ({ label, active = false }: any) => (
    <div className="flex items-center justify-between group cursor-pointer">
        <span className={`text-[10px] font-black uppercase italic ${active ? 'text-slate-300' : 'text-slate-600'}`}>{label}</span>
        <div className={`w-8 h-4 rounded-full relative transition-all ${active ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
            <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${active ? 'right-1 bg-emerald-500' : 'left-1 bg-slate-700'}`} />
        </div>
    </div>
);

export default memo(BackupDisasterRecovery);