"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiShield, FiCheck, FiLock, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const RoleManagementPage = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-white">Identity <span className="text-blue-500">& Access</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Define Roles & System Permissions</p>
        </div>
        <button onClick={() => router.push('/sss/internal-users/staff/add')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all flex items-center gap-2">
          <FiPlus /> Create New Role
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LIST ROLES */}
        <div className="xl:col-span-1 space-y-4">
          <RoleCard name="Super Admin" count={2} active />
          <RoleCard name="Support Finance" count={5} />
          <RoleCard name="Core Developer" count={3} />
        </div>

        {/* PERMISSIONS EDITOR */}
        <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
            <h3 className="text-xs font-black uppercase italic text-white flex items-center gap-2">
                <FiLock className="text-blue-500" /> Permissions: <span className="text-blue-500">Support Finance</span>
            </h3>
            <button className="text-[10px] font-black text-emerald-500 uppercase italic">Save Changes</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PermissionToggle group="Helpdesk" label="Read Tickets" checked />
            <PermissionToggle group="Helpdesk" label="Reply Tickets" checked />
            <PermissionToggle group="Finance" label="View Payouts" checked />
            <PermissionToggle group="Finance" label="Approve Payouts" />
            <PermissionToggle group="System" label="Access Config" />
            <PermissionToggle group="System" label="View Logs" checked />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---
const RoleCard = ({ name, count, active = false }: any) => (
  <div className={`p-6 rounded-3xl border transition-all cursor-pointer ${active ? 'bg-blue-600/10 border-blue-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
    <div className="flex justify-between items-center">
      <div>
        <h4 className={`text-sm font-black uppercase italic ${active ? 'text-white' : 'text-slate-400'}`}>{name}</h4>
        <p className="text-[9px] font-bold text-slate-500 uppercase mt-1">{count} Users Assigned</p>
      </div>
      <FiShield className={active ? 'text-blue-500' : 'text-slate-700'} size={20} />
    </div>
  </div>
);

const PermissionToggle = ({ group, label, checked = false }: any) => (
  <div className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-blue-500/30 transition-all">
    <div>
      <p className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">{group}</p>
      <p className="text-[10px] font-black text-white uppercase italic">{label}</p>
    </div>
    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${checked ? 'bg-blue-600 border-blue-500' : 'border-white/10'}`}>
      {checked && <FiCheck size={12} className="text-white" />}
    </div>
  </div>
);

export default RoleManagementPage;