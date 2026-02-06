"use client";

import React, { useState, memo } from 'react';
import { 
  FiClock, FiUser, FiActivity, FiSearch, 
  FiFilter, FiDownload, FiInfo, FiHash,
  FiGlobe, FiMonitor, FiAlertTriangle, FiCheckCircle,
  FiArrowRight, FiHardDrive, FiCpu, FiCreditCard
} from 'react-icons/fi';

// --- MOCK AUDIT DATA ---
const AUDIT_LOGS = [
  {
    id: 'LOG-99281',
    user: 'Majid (Super Admin)',
    action: 'Modified AI System Prompt',
    target: 'Global AI Engine',
    timestamp: '5 Feb 2026, 21:45:12',
    ip: '192.168.1.1',
    device: 'MacBook Pro - Chrome',
    severity: 'High',
    icon: <FiCpu className="text-purple-500" />
  },
  {
    id: 'LOG-99278',
    user: 'Budi Raharjo (Finance)',
    action: 'Approved Payout Request',
    target: 'SMA Negeri 1 Jakarta (Rp 12.500.000)',
    timestamp: '5 Feb 2026, 20:12:05',
    ip: '103.12.44.2',
    device: 'Windows - Edge',
    severity: 'Medium',
    icon: <FiCreditCard className="text-emerald-500" />
  },
  {
    id: 'LOG-99275',
    user: 'Siska Amelia (Support)',
    action: 'Updated School License',
    target: 'SMP Al-Azhar Pusat (Extend 1 Year)',
    timestamp: '5 Feb 2026, 18:05:44',
    ip: '180.244.12.9',
    device: 'iPad Pro - Safari',
    severity: 'Medium',
    icon: <FiHardDrive className="text-blue-500" />
  },
  {
    id: 'LOG-99270',
    user: 'System (Auto-Guard)',
    action: 'Blocked Suspicious Login',
    target: 'Account: Vendor_X',
    timestamp: '5 Feb 2026, 15:20:00',
    ip: '45.12.0.1 (Russia)',
    device: 'Unknown Device',
    severity: 'Critical',
    icon: <FiAlertTriangle className="text-rose-500" />
  }
];

const AuditLogSystem = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-500/10 rounded-lg border border-slate-500/20">
              <FiActivity className="text-slate-400 text-xl animate-pulse" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Digital <span className="text-slate-500">Audit Logs</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Immutable Activity Tracking & Forensics</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all flex items-center gap-2">
            <FiDownload /> Export Log (CSV/PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* LOGS TABLE CONTAINER */}
        <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl shadow-2xl">
          
          {/* SEARCH & FILTER BAR */}
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 bg-white/2">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search logs by user, action, or target..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-slate-500/50 transition-all text-xs font-medium italic uppercase"
              />
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase italic flex items-center gap-2">
                    <FiFilter /> All Severities
                </button>
                <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase italic flex items-center gap-2">
                    <FiClock /> Last 24 Hours
                </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/1">
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">ID & Timestamp</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">User Actor</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase italic tracking-widest">Activity & Target</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase italic tracking-widest text-center">Severity</th>
                  <th className="p-6 text-[10px] font-black text-slate-500 uppercase italic tracking-widest text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-white/2 transition-colors group">
                    <td className="p-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors">#{log.id}</span>
                            <span className="text-[9px] font-medium text-slate-600 uppercase mt-1 italic">{log.timestamp}</span>
                        </div>
                    </td>
                    <td className="p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 transition-all border border-white/5">
                                <FiUser size={14} />
                            </div>
                            <span className="text-[11px] font-black text-white uppercase italic">{log.user}</span>
                        </div>
                    </td>
                    <td className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-black/40 rounded-lg">{log.icon}</div>
                            <div>
                                <p className="text-[11px] font-black text-slate-300 uppercase italic">{log.action}</p>
                                <p className="text-[10px] font-medium text-slate-500 mt-0.5 italic"><FiArrowRight className="inline mr-1" />{log.target}</p>
                            </div>
                        </div>
                    </td>
                    <td className="p-6">
                        <div className="flex justify-center">
                            <span className={`text-[8px] font-black px-3 py-1 rounded-full border uppercase italic ${
                                log.severity === 'Critical' ? 'border-rose-500/30 text-rose-500 bg-rose-500/10' :
                                log.severity === 'High' ? 'border-purple-500/30 text-purple-500 bg-purple-500/10' :
                                'border-slate-500/30 text-slate-400 bg-white/5'
                            }`}>
                                {log.severity}
                            </span>
                        </div>
                    </td>
                    <td className="p-6 text-right">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1"><FiGlobe /> {log.ip}</span>
                            <span className="text-[8px] font-bold text-slate-600 uppercase italic mt-1 flex items-center gap-1"><FiMonitor /> {log.device}</span>
                        </div>
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER / PAGINATION */}
          <div className="p-6 border-t border-white/5 bg-white/1 flex justify-between items-center">
            <p className="text-[10px] font-black text-slate-600 uppercase italic">Showing 4 of 2.5k Records</p>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black text-slate-400 uppercase italic border border-white/10 hover:text-white transition-all">Previous</button>
                <button className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black text-slate-400 uppercase italic border border-white/10 hover:text-white transition-all">Next Page</button>
            </div>
          </div>
        </div>

        {/* SECURITY INSIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-4xl">
                <FiInfo className="text-blue-500 mb-4" size={24} />
                <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest mb-2">Immutable Logs</h4>
                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed uppercase">
                    Log ini tidak dapat diubah atau dihapus oleh siapapun (termasuk Super Admin) untuk menjamin <span className="text-blue-400">Integritas Data</span> jika terjadi audit legal.
                </p>
            </div>
            <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-4xl">
                <FiAlertTriangle className="text-rose-500 mb-4" size={24} />
                <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest mb-2">Security Alerts</h4>
                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed uppercase">
                    Sistem mendeteksi <span className="text-rose-400">1 Percobaan Login Luar Negeri</span> dalam 24 jam terakhir. IP telah diblokir secara otomatis oleh firewall.
                </p>
            </div>
            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-4xl">
                <FiCheckCircle className="text-emerald-500 mb-4" size={24} />
                <h4 className="text-[10px] font-black text-white uppercase italic tracking-widest mb-2">Compliance Status</h4>
                <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed uppercase">
                    Platform SoSchool saat ini memenuhi standar <span className="text-emerald-400">ISO 27001 & GDPR</span> dalam hal pencatatan aktivitas pengguna dan perlindungan data.
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default memo(AuditLogSystem);