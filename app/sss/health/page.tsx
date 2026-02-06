"use client";

import React, { memo, useEffect, useState } from 'react';
import { 
  FiServer, FiDatabase, FiCpu, FiZap, 
  FiActivity, FiShield, FiAlertTriangle, FiCheckCircle 
} from 'react-icons/fi';
import { RiPulseFill } from 'react-icons/ri';

// --- MOCK DATA FOR SYSTEM METRICS ---
const SYSTEM_METRICS = {
  server: {
    cpu: 42, // dalam persen
    ram: 65, // dalam persen
    uptime: "14 Hari, 6 Jam",
    status: "Optimal"
  },
  database: {
    connections: 450,
    latency: "12ms",
    storage: "78%",
    status: "Healthy"
  },
  api: {
    requestPerSecond: 1240,
    errorRate: "0.02%",
    avgResponse: "85ms",
    successRate: "99.98%"
  },
  regionalNodes: [
    { name: "Cluster Jakarta-01", load: 45, status: "Active" },
    { name: "Cluster Surabaya-02", load: 32, status: "Active" },
    { name: "Cluster Medan-01", load: 12, status: "Standby" },
  ]
};

const SystemHealth = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER WITH PULSE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FiServer className="text-blue-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              System <span className="text-blue-500">Health</span> Monitor
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic tracking-widest uppercase">Infrastructure & API Real-time Diagnostics</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
          <RiPulseFill className="text-emerald-500 animate-pulse text-2xl" />
          <div className="leading-tight">
            <p className="text-[10px] font-black text-slate-500 uppercase italic">Core Engine Status</p>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">All Systems Operational</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. SERVER UTILIZATION (CPU & RAM) */}
        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <FiCpu size={80} />
          </div>
          
          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <FiCpu className="text-blue-500" /> Server Resources
          </h3>

          <div className="space-y-8">
            <ProgressMetric label="CPU Usage" value={SYSTEM_METRICS.server.cpu} color="blue" />
            <ProgressMetric label="Memory (RAM)" value={SYSTEM_METRICS.server.ram} color="violet" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-10 pt-6 border-t border-white/5">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase italic">System Uptime</p>
              <p className="text-sm font-bold text-white uppercase mt-1">{SYSTEM_METRICS.server.uptime}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase italic">Status</p>
              <p className="text-sm font-bold text-emerald-400 uppercase mt-1">{SYSTEM_METRICS.server.status}</p>
            </div>
          </div>
        </div>

        {/* 2. DATABASE DIAGNOSTICS */}
        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <FiDatabase size={80} />
          </div>

          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <FiDatabase className="text-amber-500" /> Database Engine
          </h3>

          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase italic">Active Connections</span>
              <span className="text-2xl font-black text-white">{SYSTEM_METRICS.database.connections}</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase italic">Queries Latency</span>
              <span className="text-2xl font-black text-emerald-400">{SYSTEM_METRICS.database.latency}</span>
            </div>
            <div className="pt-2">
              <ProgressMetric label="Disk Space (SSD)" value={78} color="amber" />
            </div>
          </div>
        </div>

        {/* 3. API PERFORMANCE & TRAFFIC */}
        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <FiZap size={80} />
          </div>

          <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <FiZap className="text-emerald-500" /> API Gateway
          </h3>

          <div className="space-y-6">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <p className="text-[10px] font-black text-emerald-500/50 uppercase italic tracking-widest">Global Traffic</p>
              <h4 className="text-3xl font-black text-white mt-1">{SYSTEM_METRICS.api.requestPerSecond} <span className="text-xs font-medium text-slate-500">REQ/S</span></h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-slate-500 uppercase italic">Avg Response</p>
                <p className="text-lg font-black text-white">{SYSTEM_METRICS.api.avgResponse}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl">
                <p className="text-[9px] font-black text-slate-500 uppercase italic">Error Rate</p>
                <p className="text-lg font-black text-red-400">{SYSTEM_METRICS.api.errorRate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-emerald-400 uppercase italic tracking-widest bg-emerald-500/10 p-2 rounded-lg justify-center">
              <FiCheckCircle /> Success Rate: {SYSTEM_METRICS.api.successRate}
            </div>
          </div>
        </div>
      </div>

      {/* CLUSTER MONITORING MAP-LIKE GRID */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <h3 className="text-xs font-black uppercase italic text-slate-400 tracking-widest mb-6">Regional Infrastructure Load</h3>
          <div className="space-y-4">
            {SYSTEM_METRICS.regionalNodes.map((node, i) => (
              <div key={i} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <div className="flex-1">
                  <h4 className="text-xs font-black text-white uppercase italic">{node.name}</h4>
                  <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">{node.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-blue-400">{node.load}%</p>
                  <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div style={{ width: `${node.load}%` }} className="h-full bg-blue-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INCIDENT ALERT PANEL */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-4xl p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-red-500 mb-6">
            <FiAlertTriangle className="animate-bounce" />
            <h3 className="text-xs font-black uppercase italic tracking-widest">Active Warnings</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 rounded-2xl border-l-4 border-red-500">
              <p className="text-[10px] font-black text-red-400 uppercase italic">Peak Load Alert</p>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Traffic diperkirakan naik 300% pada pukul 07:00 WIB (Jam Masuk Sekolah). Auto-scaling dipicu.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-[10px] font-black text-slate-500 uppercase italic">Scheduled Maintenance</p>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Database backup global pada pukul 02:00 WIB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENT: PROGRESS METRIC ---

const ProgressMetric = ({ label, value, color }: { label: string, value: number, color: string }) => {
  const colorMap: any = {
    blue: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    amber: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
    violet: "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]",
    emerald: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black text-slate-400 uppercase italic tracking-tighter">{label}</span>
        <span className={`text-xs font-black text-${color}-400`}>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          style={{ width: `${value}%` }} 
          className={`h-full transition-all duration-1000 ${colorMap[color]}`} 
        />
      </div>
    </div>
  );
};

export default memo(SystemHealth);