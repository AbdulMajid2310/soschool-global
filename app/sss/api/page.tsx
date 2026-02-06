"use client";

import React, { useState, memo } from 'react';
import { 
  FiKey, FiShare2, FiPlus, FiRefreshCw, 
  FiEye, FiEyeOff, FiActivity, FiGlobe,
  FiZap, FiLock, FiTerminal, FiCheckCircle,
  FiAlertCircle, FiCopy, FiServer
} from 'react-icons/fi';
import { SiPostman } from 'react-icons/si';

// --- MOCK INTEGRATION DATA ---
const API_KEYS = [
  {
    id: 'KEY-001',
    name: 'Dapodik Kemendikbud Sync',
    key: 'ss_live_672198shakjshd8213...',
    created: '12 Jan 2026',
    status: 'Active',
    lastUsed: '2 mins ago'
  },
  {
    id: 'KEY-002',
    name: 'Xendit Payment Gateway',
    key: 'ss_live_992102haslkdjaslkj...',
    created: '05 Jan 2026',
    status: 'Active',
    lastUsed: '1 hour ago'
  }
];

const WEBHOOKS = [
  {
    id: 'WH-01',
    url: 'https://api.kemdikbud.go.id/soschool/callback',
    event: 'student.graduation',
    status: 'Healthy',
    latency: '142ms'
  },
  {
    id: 'WH-02',
    url: 'https://webhook.site/test-integration',
    event: 'payment.success',
    status: 'Failing',
    latency: '5000ms'
  }
];

const APIIntegrationGateway = () => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FiTerminal className="text-indigo-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Integration <span className="text-indigo-500">Gateway</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">API Keys & External Webhook Orchestration</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all flex items-center gap-2">
            <SiPostman /> API Documentation
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
            <FiPlus /> Generate New Key
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: API KEYS (2 COLS) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* API KEYS SECTION */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                    <FiKey className="text-indigo-500" /> API Secret Keys
                </h3>
                <span className="text-[9px] font-black text-slate-600 uppercase italic">Environment: Production</span>
            </div>

            <div className="space-y-4">
                {API_KEYS.map((item) => (
                    <div key={item.id} className="p-6 bg-black/40 border border-white/5 rounded-3xl flex flex-col lg:flex-row justify-between gap-6 hover:border-indigo-500/30 transition-all group">
                        <div className="flex-1">
                            <h4 className="text-[11px] font-black text-white uppercase italic mb-2">{item.name}</h4>
                            <div className="flex items-center gap-3 bg-black/60 p-3 rounded-xl border border-white/5 group-hover:border-indigo-500/20">
                                <code className="text-[10px] text-indigo-400 font-mono flex-1 truncate">
                                    {showKey ? item.key : '••••••••••••••••••••••••••••••••'}
                                </code>
                                <div className="flex gap-2">
                                    <button onClick={() => setShowKey(!showKey)} className="text-slate-500 hover:text-white transition-colors">
                                        {showKey ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                                    </button>
                                    <button className="text-slate-500 hover:text-white transition-colors"><FiCopy size={14} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8 lg:border-l border-white/5 lg:pl-8">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase italic leading-none mb-1">Status</p>
                                <span className="text-[9px] font-black text-emerald-400 uppercase italic flex items-center gap-1 justify-end">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> {item.status}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-500 uppercase italic leading-none mb-1">Last Sync</p>
                                <span className="text-[9px] font-black text-white uppercase italic">{item.lastUsed}</span>
                            </div>
                            <button className="p-3 bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 rounded-xl transition-all">
                                <FiRefreshCw size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* WEBHOOKS SECTION */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                    <FiShare2 className="text-indigo-500" /> Outgoing Webhooks
                </h3>
                <button className="text-[9px] font-black text-indigo-400 uppercase italic border-b border-indigo-500/20">Add Webhook Endpoint</button>
            </div>

            <div className="space-y-4">
                {WEBHOOKS.map((wh) => (
                    <div key={wh.id} className="p-6 bg-black/40 border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all">
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                        wh.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                    }`}>{wh.status}</span>
                                    <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-tight">{wh.event}</p>
                                </div>
                                <p className="text-[11px] font-mono text-indigo-300 break-all">{wh.url}</p>
                            </div>
                            <div className="flex items-center gap-6 lg:border-l border-white/5 lg:pl-8">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-500 uppercase italic">Latency</p>
                                    <p className={`text-[10px] font-black italic ${wh.status === 'Healthy' ? 'text-emerald-400' : 'text-rose-500'}`}>{wh.latency}</p>
                                </div>
                                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase italic text-slate-300">Test URL</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

        </div>

        {/* RIGHT: CONNECTIVITY & DOCS (1 COL) */}
        <div className="space-y-8">
          
          {/* EXTERNAL SERVICES STATUS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6 tracking-widest">
                <FiServer className="text-indigo-500" /> External Nodes
             </h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Dapodik API</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-emerald-500 uppercase italic">Connected</span>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Xendit V2</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-emerald-500 uppercase italic">Operational</span>
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    </div>
                </div>
                <div className="flex items-center justify-between opacity-40">
                    <span className="text-[10px] font-black text-slate-500 uppercase italic">Kemdikbud Auth</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-slate-600 uppercase italic">Disabled</span>
                        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                    </div>
                </div>
             </div>
          </div>

          {/* SECURITY ADVISORY */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <FiLock className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Security Protocol</h4>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic mb-6">
              Jangan pernah membagikan <span className="text-white font-bold italic underline">Secret Key</span> kepada siapa pun. SoSchool menggunakan enkripsi AES-256 untuk menyimpan kunci di level database.
            </p>
            <div className="flex items-center gap-2 text-[9px] font-black text-amber-600 uppercase italic border border-amber-500/10 p-3 rounded-xl bg-black/20">
                <FiAlertCircle /> IP Whitelisting Active
            </div>
          </div>

          {/* INTEGRATION STATS */}
          <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-4xl">
             <div className="flex items-center gap-2 text-indigo-400 mb-3">
                <FiActivity />
                <span className="text-[10px] font-black uppercase italic tracking-widest">Throughput</span>
             </div>
             <p className="text-2xl font-black text-white italic">1.2M <span className="text-[10px] text-slate-500">Req/Month</span></p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(APIIntegrationGateway);