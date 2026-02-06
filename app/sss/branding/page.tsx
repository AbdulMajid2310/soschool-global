"use client";

import React, { useState, memo } from 'react';
import { 
  FiLayout, FiGlobe, FiDroplet, FiImage, 
  FiCheckCircle, FiRefreshCw, FiSave, FiAlertCircle,
  FiExternalLink, FiCopy, FiInfo
} from 'react-icons/fi';

// --- MOCK DATA TENANT CONFIG ---
const TENANT_BRANDING = {
  schoolName: 'SMA Negeri 1 Jakarta',
  currentDomain: 'sman1jkt.soschool.id',
  customDomain: 'lms.sman1jakarta.sch.id',
  dnsStatus: 'Verified',
  theme: {
    primary: '#3B82F6', // Blue 500
    secondary: '#0F172A',
    radius: '1rem', // rounded-2xl
  },
  assets: {
    logo: '/logos/sman1jkt-light.png',
    favicon: '/favicons/sman1jkt.ico'
  }
};

const WhitelabelBranding = () => {
  const [primaryColor, setPrimaryColor] = useState(TENANT_BRANDING.theme.primary);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FiLayout className="text-indigo-400 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Whitelabel <span className="text-indigo-500">& Branding</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Custom Identity & Domain Management</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all">
            Reset To Default
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-indigo-600/20">
            <FiSave /> Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: DOMAIN CONFIGURATION */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* DOMAIN SETUP CARD */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
              <FiGlobe className="text-indigo-400" /> DNS & Domain Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase italic mb-2 block">Default Subdomain</label>
                <div className="flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono text-slate-400">
                  {TENANT_BRANDING.currentDomain}
                  <FiCopy className="cursor-pointer hover:text-white transition-all" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase italic mb-2 block">Custom Domain (Premium)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue={TENANT_BRANDING.customDomain}
                    className="w-full bg-white/5 border border-indigo-500/30 rounded-2xl p-4 text-xs font-mono text-indigo-400 outline-none focus:border-indigo-500 transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded uppercase italic">
                    <FiCheckCircle size={10} /> {TENANT_BRANDING.dnsStatus}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl">
              <h4 className="text-[10px] font-black text-indigo-400 uppercase italic mb-4 flex items-center gap-2">
                <FiInfo /> DNS Configuration Required
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed italic mb-4">
                Arahkan CNAME record domain Anda ke <code className="text-white font-mono bg-white/5 px-1 rounded">ingress.soschool.id</code> untuk mengaktifkan Whitelabel.
              </p>
              <table className="w-full text-left text-[10px] font-mono border-t border-white/5 pt-4">
                <thead>
                  <tr className="text-slate-500 uppercase">
                    <th className="py-2">Type</th>
                    <th className="py-2">Host</th>
                    <th className="py-2">Value</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr>
                    <td className="py-2">CNAME</td>
                    <td className="py-2">lms</td>
                    <td className="py-2">ingress.soschool.id</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* COLOR PALETTE SETTINGS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
              <FiDroplet className="text-indigo-400" /> Brand Color Palette
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase italic mb-4 block">Primary Branding Color</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 p-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-black text-white uppercase italic">{primaryColor}</p>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1 italic">Tailwind Hex-Value</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase italic mb-4 block">Corner Radius (UI Style)</label>
                  <div className="flex gap-2">
                    {['0px', '0.5rem', '1rem', '2rem'].map((r) => (
                      <button key={r} className={`flex-1 py-3 text-[10px] font-black uppercase italic rounded-lg border transition-all ${TENANT_BRANDING.theme.radius === r ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}>
                        {r === '0px' ? 'Sharp' : r === '2rem' ? 'Ultra' : r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE PREVIEW SIMULATION */}
              <div className="relative p-6 bg-slate-900 border border-white/5 rounded-3xl overflow-hidden">
                 <p className="text-[8px] font-black text-slate-600 uppercase italic mb-4 tracking-[0.2em]">Real-time Preview</p>
                 <div className="space-y-4 scale-95 origin-top">
                    <div className="h-4 w-24 rounded" style={{ backgroundColor: primaryColor }} />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/5 rounded" />
                      <div className="h-2 w-3/4 bg-white/5 rounded" />
                    </div>
                    <button className="w-full py-2 rounded-xl text-[8px] font-black uppercase italic text-white shadow-lg" style={{ backgroundColor: primaryColor, boxShadow: `0 10px 15px -3px ${primaryColor}44` }}>
                      Sample Button
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: ASSETS MANAGEMENT (LOGO/FAVICON) */}
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8">
              <FiImage className="text-indigo-400" /> Brand Assets
            </h3>
            
            <div className="space-y-8">
              <div className="group cursor-pointer">
                <label className="text-[10px] font-black text-slate-500 uppercase italic mb-4 block">School Logo (Light Mode)</label>
                <div className="h-32 bg-black/40 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 group-hover:border-indigo-500/50 transition-all">
                  <FiImage className="text-slate-600 group-hover:text-indigo-400 transition-all" size={24} />
                  <p className="text-[9px] font-black text-slate-500 uppercase italic group-hover:text-indigo-400">Upload SVG or PNG</p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase italic mb-4 block">Favicon</label>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center">
                    <FiGlobe className="text-slate-500" />
                  </div>
                  <button className="text-[9px] font-black text-indigo-400 uppercase italic border-b border-indigo-500/20 hover:text-indigo-300">Replace Icon</button>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS PANEL */}
          <div className="bg-indigo-600 border border-indigo-400 rounded-4xl p-8 shadow-xl shadow-indigo-900/30">
            <h4 className="text-white font-black uppercase italic text-lg mb-2">Live Status</h4>
            <p className="text-indigo-100 text-[10px] font-medium leading-relaxed italic mb-6">
              Konfigurasi branding untuk <span className="font-bold underline">{TENANT_BRANDING.schoolName}</span> sudah aktif dan dipublikasikan ke edge network.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[9px] font-black text-white uppercase italic">
                <span>SSL Certificate</span>
                <span className="text-emerald-300">Active</span>
              </div>
              <div className="flex items-center justify-between text-[9px] font-black text-white uppercase italic">
                <span>Cache Status</span>
                <span className="text-emerald-300">Purged</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase italic hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
              <FiExternalLink /> Visit Site
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default memo(WhitelabelBranding);