"use client";

import React, { useState, memo } from 'react';
import { 
  FiCreditCard, FiKey, FiLock, FiShield, 
  FiCheckCircle, FiRefreshCw, FiAlertTriangle, 
  FiEye, FiEyeOff, FiSettings, FiExternalLink, FiServer
} from 'react-icons/fi';

// --- MOCK DATA PAYMENT GATEWAY ---
const PG_CONFIG = {
  activeProvider: 'Midtrans',
  environment: 'Production', // atau Sandbox
  merchants: [
    { 
      name: 'Midtrans', 
      status: 'Active', 
      type: 'Primary', 
      clientKey: 'SB-Mid-client-8XyZ...',
      serverKey: 'SB-Mid-server-9912...',
      merchantId: 'M102933',
      lastUpdate: '5 Feb 2026'
    },
    { 
      name: 'Xendit', 
      status: 'Standby', 
      type: 'Backup', 
      clientKey: 'xnd_public_main_...',
      serverKey: 'xnd_secret_main_...',
      merchantId: 'XND-99012',
      lastUpdate: '1 Jan 2026'
    }
  ]
};

const PaymentGatewayConfig = () => {
  const [showKey, setShowKey] = useState<string | null>(null);

  const toggleKey = (id: string) => {
    setShowKey(showKey === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <FiCreditCard className="text-amber-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Payment <span className="text-amber-500">Gateway</span> Info
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Master API Credentials & Gateway Routing</p>
        </div>
        
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl">
          <FiShield className="text-red-500 animate-pulse" />
          <p className="text-[10px] font-black text-red-400 uppercase italic">Encrypted Environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT & CENTER: ACTIVE CONFIGURATIONS */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* PROVIDER SELECTOR & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl border-l-4 border-l-emerald-500">
                <p className="text-[10px] font-black text-slate-500 uppercase italic mb-2">Active Gateway</p>
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black text-white uppercase italic">{PG_CONFIG.activeProvider}</h2>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-2 py-1 rounded-md uppercase italic flex items-center gap-1">
                        <FiCheckCircle /> Live
                    </span>
                </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
                <p className="text-[10px] font-black text-slate-500 uppercase italic mb-2">Operational Mode</p>
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-black text-amber-500 uppercase italic">{PG_CONFIG.environment}</h2>
                    <FiSettings className="text-slate-500 cursor-pointer hover:rotate-90 transition-all duration-500" />
                </div>
            </div>
          </div>

          {/* CREDENTIAL CARDS */}
          {PG_CONFIG.merchants.map((merchant, idx) => (
            <div key={idx} className={`bg-white/5 border ${merchant.status === 'Active' ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'border-white/10'} rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden`}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${merchant.status === 'Active' ? 'bg-amber-500 text-black' : 'bg-white/10 text-slate-400'}`}>
                    {merchant.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase italic leading-none">{merchant.name}</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">{merchant.type} Provider</p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-amber-500 uppercase italic border-b border-amber-500/20 hover:text-amber-400">Manage Keys</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Server Key */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase italic flex items-center gap-2">
                    <FiLock /> Server Key (Secret)
                  </label>
                  <div className="flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono group">
                    <span className="truncate max-w-50">
                      {showKey === `${merchant.name}-server` ? merchant.serverKey : '••••••••••••••••••••••••'}
                    </span>
                    <button onClick={() => toggleKey(`${merchant.name}-server`)} className="text-slate-500 hover:text-white transition-all">
                      {showKey === `${merchant.name}-server` ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Client Key */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase italic flex items-center gap-2">
                    <FiKey /> Client Key (Public)
                  </label>
                  <div className="flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono group">
                    <span className="truncate max-w-50">
                      {showKey === `${merchant.name}-client` ? merchant.clientKey : '••••••••••••••••••••••••'}
                    </span>
                    <button onClick={() => toggleKey(`${merchant.name}-client`)} className="text-slate-500 hover:text-white transition-all">
                      {showKey === `${merchant.name}-client` ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-600 uppercase italic">Merchant ID:</span>
                  <span className="text-[10px] font-mono text-slate-300">{merchant.merchantId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-600 uppercase italic">Last Sync:</span>
                  <span className="text-[10px] font-mono text-slate-300">{merchant.lastUpdate}</span>
                </div>
                {merchant.status === 'Standby' && (
                   <button className="ml-auto flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase italic hover:text-blue-400">
                    <FiRefreshCw /> Switch To Backup
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: WEBHOOKS & SECURITY */}
        <div className="space-y-8">
          {/* WEBHOOK STATUS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6">
              <FiServer className="text-amber-500" /> Webhook Endpoint
            </h3>
            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl mb-4">
              <p className="text-[9px] font-black text-slate-600 uppercase italic mb-2 tracking-widest">Target URL</p>
              <p className="text-[10px] font-mono text-amber-500 truncate">https://api.soschool.id/v1/payments/callback</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              <FiCheckCircle size={14} />
              <span className="text-[10px] font-black uppercase italic tracking-tighter">Connection Stable</span>
            </div>
          </div>

          {/* SECURITY WARNING */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-4xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <FiAlertTriangle className="text-2xl animate-pulse" />
              <h4 className="text-xs font-black uppercase italic tracking-widest text-red-400">Security Warning</h4>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
              API Keys memberikan akses penuh ke aliran dana SoPay. Jangan pernah membagikan <span className="text-white font-bold">Server Key</span> kepada pihak manapun. Sistem otomatis melakukan rotasi log setiap 24 jam.
            </p>
            <button className="w-full mt-6 py-4 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-500 rounded-2xl text-[10px] font-black uppercase italic transition-all">
              Revoke All Access
            </button>
          </div>

          {/* DOCS LINK */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-800 rounded-4xl p-8 text-white shadow-xl shadow-blue-900/20">
            <h4 className="font-black uppercase italic text-lg mb-2">Integration Guide</h4>
            <p className="text-blue-100 text-[10px] font-medium leading-relaxed italic mb-6">
              Pelajari cara mengonfigurasi <span className="font-bold">Snap Redirect</span> dan <span className="font-bold">Callback URL</span> untuk Midtrans & Xendit.
            </p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-2xl text-[10px] font-black uppercase italic hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              <FiExternalLink /> API Documentation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default memo(PaymentGatewayConfig);