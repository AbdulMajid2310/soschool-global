"use client";

import { useRouter } from 'next/navigation';
import React, { useState, memo } from 'react';
import { 
  FiLifeBuoy, FiShield, FiUsers, FiClock, 
  FiMessageSquare, FiAlertCircle, FiCheckCircle, FiUserPlus,
  FiLock, FiKey, FiCpu, FiHardDrive, 
  FiMoreVertical, FiSearch, FiFilter, FiSettings
} from 'react-icons/fi';

// --- MOCK SUPPORT TICKETS ---
const SUPPORT_TICKETS = [
  {
    id: 'TKT-8821',
    school: 'SMA Negeri 1 Jakarta',
    issue: 'Gagal Payout SoPay',
    priority: 'Urgent',
    category: 'Finance',
    status: 'Open',
    timestamp: '5 Feb 2026, 21:05'
  },
  {
    id: 'TKT-8819',
    school: 'SMK Telkom Malang',
    issue: 'Integrasi Gemini AI Error',
    priority: 'High',
    category: 'Technical',
    status: 'In Progress',
    timestamp: '5 Feb 2026, 19:30'
  }
];

// --- MOCK STAFF ROLES ---
const STAFF_MEMBERS = [
  {
    name: 'Budi Raharjo',
    role: 'Head of Finance',
    access: ['Finance', 'Marketplace'],
    status: 'Online',
    avatar: 'BR'
  },
  {
    name: 'Siska Amelia',
    role: 'Senior Support',
    access: ['Tickets', 'Moderation', 'Broadcast'],
    status: 'Away',
    avatar: 'SA'
  },
  {
    name: 'Rian Putra',
    role: 'Core Developer',
    access: ['Infrastructure', 'AI Control', 'Audit Logs'],
    status: 'Online',
    avatar: 'RP'
  }
];

const SupportInfrastructure = () => {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FiHardDrive className="text-blue-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Backbone <span className="text-blue-500">& Infrastructure</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Internal Operations & Team Governance</p>
        </div>
        
        <div className="flex gap-3">
            <button 
              onClick={() => router.push('/sss/internal-users/roles')} 
              className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 hover:border-blue-500/50 transition-all flex items-center gap-2 group"
            >
                <FiShield className="group-hover:text-blue-500 transition-colors" /> Identity Roles
            </button>
            <button onClick={()=> router.push('/sss/internal-users/config')} className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all flex items-center gap-2">
                <FiSettings /> System Config
            </button>
            <button onClick={() => router.push('/sss/internal-users/staff')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <FiUserPlus /> Add Internal Staff
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: SUPPORT TICKETS (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center">
               <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2 tracking-widest">
                  <FiLifeBuoy className="text-blue-500" /> Keluhan Admin Sekolah (Active Tickets)
               </h3>
               <div className="flex gap-2">
                    <button className="p-2 bg-white/5 rounded-lg text-slate-500"><FiSearch /></button>
                    <button className="p-2 bg-white/5 rounded-lg text-slate-500"><FiFilter /></button>
               </div>
            </div>

            <div className="divide-y divide-white/5">
                {SUPPORT_TICKETS.map((ticket) => (
                    <div key={ticket.id} className="p-8 hover:bg-white/1 transition-all group flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${ticket.priority === 'Urgent' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                                <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{ticket.issue}</h4>
                                <span className="text-[8px] font-black bg-white/5 px-2 py-0.5 rounded text-slate-500 uppercase">{ticket.id}</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-[9px] font-black text-slate-500 uppercase italic">
                                <span className="flex items-center gap-1"><FiUsers className="text-blue-500" /> {ticket.school}</span>
                                <span className="flex items-center gap-1"><FiCpu className="text-purple-500" /> Category: {ticket.category}</span>
                                <span className="flex items-center gap-1 text-slate-600"><FiClock /> {ticket.timestamp}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right mr-4">
                                <span className={`text-[9px] font-black uppercase italic px-3 py-1 rounded-full border ${
                                    ticket.status === 'Open' ? 'border-rose-500/20 text-rose-500 bg-rose-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'
                                }`}>
                                    {ticket.status}
                                </span>
                            </div>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[9px] font-black uppercase italic transition-all border border-white/5">
                                Handle Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT: STAFF & PERMISSIONS (1 COL) */}
        <div className="space-y-8">
          
          {/* STAFF MANAGEMENT */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-8 tracking-widest">
                <FiShield className="text-blue-500" /> Internal Staff Roles
            </h3>
            
            <div className="space-y-6">
                {STAFF_MEMBERS.map((staff, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-[10px] font-black text-white italic shadow-lg">
                                {staff.avatar}
                            </div>
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase italic leading-none mb-1">{staff.name}</h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase italic">{staff.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                            <FiKey className="text-slate-600 group-hover:text-blue-500 cursor-pointer transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-500 uppercase italic mb-4 tracking-widest">Recent Access Logs</p>
                <div className="space-y-3">
                    <LogEntry time="21:15" user="Rian P." action="Changed API Key" />
                    <LogEntry time="20:45" user="Budi R." action="Exported Payout Report" />
                </div>
            </div>
          </div>

          {/* SECURITY STATUS */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-4xl p-8 backdrop-blur-xl">
             <div className="flex items-center gap-3 text-emerald-500 mb-6">
                <FiLock className="text-xl" />
                <h4 className="text-[10px] font-black uppercase italic tracking-widest">Infrastructure Health</h4>
             </div>
             <div className="space-y-4">
                <HealthBar label="API Server" status="Stable" value={98} />
                <HealthBar label="Database Cluster" status="Optimal" value={100} />
                <HealthBar label="AI Inference Node" status="Busy" value={76} />
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

// --- SUBCOMPONENTS ---
const LogEntry = ({ time, user, action }: any) => (
    <div className="flex items-center justify-between text-[9px] font-medium italic">
        <span className="text-slate-600 font-mono">{time}</span>
        <span className="text-slate-400 font-black uppercase">{user}</span>
        <span className="text-slate-500 truncate max-w-25">{action}</span>
    </div>
);

const HealthBar = ({ label, status, value }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[9px] font-black uppercase italic">
            <span className="text-slate-500">{label}</span>
            <span className={value > 90 ? 'text-emerald-500' : 'text-amber-500'}>{status}</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${value > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${value}%` }} />
        </div>
    </div>
);

export default memo(SupportInfrastructure);