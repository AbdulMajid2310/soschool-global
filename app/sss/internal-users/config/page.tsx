"use client";

import React, { useState, memo } from 'react';
import { 
  FiSettings, FiGlobe, FiCpu, FiShield, 
  FiZap, FiDatabase, FiLock, FiSave,
  FiAlertTriangle, FiRefreshCcw, FiExternalLink, FiToggleRight
} from 'react-icons/fi';

const SystemConfigPage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FiSettings className="text-blue-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              System <span className="text-blue-500">Configuration</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Environment & Core Parameters</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
          <FiSave size={14} /> Save Global Settings
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: GENERAL SETTINGS (2 COLS) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* PLATFORM PARAMETERS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                <FiGlobe className="text-blue-500" /> Platform Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ConfigInput label="App Name" value="SoSchool Ecosystem" />
              <ConfigInput label="Global Support Email" value="ops@soschool.id" />
              <ConfigInput label="Default School License (Days)" value="365" />
              <ConfigInput label="Transaction Fee (SoPay %)" value="1.5" />
            </div>
          </div>

          {/* AI & NODE SETTINGS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                <FiCpu className="text-purple-500" /> Engine & AI Inference
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                <div>
                  <p className="text-[11px] font-black text-white uppercase italic">Gemini AI Routing</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Priority: Low Latency Mode</p>
                </div>
                <button className="text-[10px] font-black text-purple-500 uppercase italic border-b border-purple-500/20">Switch to Flash 2.0</button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl">
                <div>
                  <p className="text-[11px] font-black text-white uppercase italic">Webhook Timeout</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Standard: 5000ms</p>
                </div>
                <input type="range" className="accent-purple-500 w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: SECURITY & DANGER ZONE (1 COL) */}
        <div className="space-y-8">
          
          {/* MAINTENANCE MODE CARD */}
          <div className={`p-8 rounded-4xl border transition-all ${maintenanceMode ? 'bg-rose-500/10 border-rose-500/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={maintenanceMode ? 'text-rose-500' : 'text-slate-500'}>
                <FiZap className="text-2xl" />
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`p-1 rounded-full w-12 flex transition-all ${maintenanceMode ? 'bg-rose-500 justify-end' : 'bg-slate-700 justify-start'}`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
            <h4 className="text-sm font-black text-white uppercase italic mb-2">Maintenance Mode</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic uppercase">
              {maintenanceMode 
                ? "Platform is currently locked for public users. Only staff can access." 
                : "Platform is live and accessible by all schools."}
            </p>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-[10px] font-black uppercase italic text-rose-500 flex items-center gap-2 mb-6 tracking-widest">
                <FiAlertTriangle /> Danger Zone
            </h3>
            <div className="space-y-3">
              <DangerAction label="Flush Redis Cache" icon={<FiRefreshCcw />} />
              <DangerAction label="Re-index Database" icon={<FiDatabase />} />
              <DangerAction label="Reset API Gateway" icon={<FiShield />} />
            </div>
          </div>

          {/* SYSTEM INFO */}
          <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-4xl">
             <div className="flex items-center gap-2 text-blue-400 mb-4 font-black italic uppercase text-[10px]">
                <FiLock /> Env: Production-v2
             </div>
             <div className="text-[9px] space-y-2 font-mono text-slate-500">
                <p>Build: 2026.02.05.stable</p>
                <p>Node: v20.10.0 (LTS)</p>
                <p>Region: id-west-1 (Jakarta)</p>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---
const ConfigInput = ({ label, value }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase italic tracking-widest">{label}</label>
    <input 
      type="text" 
      defaultValue={value} 
      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-xs font-medium text-white outline-none focus:border-blue-500/50 transition-all"
    />
  </div>
);

const DangerAction = ({ label, icon }: any) => (
  <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-rose-500/5 border border-white/5 hover:border-rose-500/20 rounded-2xl transition-all group">
    <span className="text-[10px] font-black text-slate-400 group-hover:text-rose-500 uppercase italic">{label}</span>
    <span className="text-slate-600 group-hover:text-rose-500">{icon}</span>
  </button>
);

export default memo(SystemConfigPage);