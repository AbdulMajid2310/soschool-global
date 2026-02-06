"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'; 
import { 
  FiArrowLeft, FiShield, FiPlus, FiCheck, 
  FiLayers, FiActivity, FiKey, FiCpu 
} from 'react-icons/fi';

const PERMISSION_GROUPS = [
  {
    group: "Helpdesk & Support",
    icon: <FiActivity />,
    permissions: ["TICKET_READ", "TICKET_REPLY", "TICKET_RESOLVE", "TICKET_ESCALATE"]
  },
  {
    group: "Financial Control",
    icon: <FiKey />,
    permissions: ["PAYOUT_VIEW", "PAYOUT_APPROVE", "SOPAY_ADJUST", "FEE_CONFIG"]
  },
  {
    group: "System Infrastructure",
    icon: <FiCpu />,
    permissions: ["CONFIG_EDIT", "AUDIT_LOG_VIEW", "CACHE_FLUSH", "ROLE_MANAGE"]
  }
];

const AddRolePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [roleName, setRoleName] = useState("");
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  const togglePermission = (perm: string) => {
    setSelectedPerms(prev => 
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

  const handleSaveRole = () => {
    const roleData = {
      id: `ROLE-${Math.floor(Math.random() * 9000)}`,
      name: roleName,
      slug: roleName.toLowerCase().replace(/\s+/g, '-'),
      permissions: selectedPerms,
      createdAt: new Date().toISOString()
    };

    // Dispatch ke Redux
    // dispatch(addRole(roleData));
    
    console.log("Saving to Redux:", roleData);
    router.push('/sss/internal-users/roles');
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10 flex justify-center">
      <div className="max-w-4xl w-full">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] font-black uppercase italic text-slate-500 hover:text-white transition-all mb-4"
            >
              <FiArrowLeft /> Back to Role List
            </button>
            <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">
              Create New <span className="text-blue-500">Access Role</span>
            </h1>
          </div>
          <button 
            onClick={handleSaveRole}
            disabled={!roleName || selectedPerms.length === 0}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white px-10 py-4 rounded-2xl text-[12px] font-black uppercase italic transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
          >
            <FiPlus /> Save Role
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* ROLE IDENTITY CARD */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500">
                <FiShield size={24} />
              </div>
              <div className="flex-1">
                <label className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">Role Identification Name</label>
                <input 
                  type="text" 
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. SENIOR SUPPORT ANALYST" 
                  className="w-full bg-transparent border-b-2 border-white/10 py-2 text-xl font-black text-white uppercase italic outline-none focus:border-blue-500 transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            {/* PERMISSIONS MAPPING */}
            <h3 className="text-[11px] font-black uppercase italic text-white mb-6 flex items-center gap-2 tracking-[0.2em]">
              <FiLayers className="text-blue-500" /> Permission Mapping
            </h3>

            <div className="space-y-8">
              {PERMISSION_GROUPS.map((group, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-sm">{group.icon}</span>
                    <span className="text-[10px] font-black uppercase italic tracking-widest">{group.group}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.permissions.map((perm) => (
                      <div 
                        key={perm}
                        onClick={() => togglePermission(perm)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group ${
                          selectedPerms.includes(perm) 
                            ? 'bg-blue-600/10 border-blue-500' 
                            : 'bg-black/40 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <span className={`text-[9px] font-black uppercase italic ${
                          selectedPerms.includes(perm) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                          {perm.replace(/_/g, ' ')}
                        </span>
                        {selectedPerms.includes(perm) && <FiCheck className="text-blue-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY FOOTER */}
        <div className="mt-8 p-6 border border-dashed border-white/10 rounded-3xl flex justify-between items-center">
          <div className="text-[10px] font-black uppercase italic text-slate-500">
            Total Selected Permissions: <span className="text-blue-500">{selectedPerms.length}</span>
          </div>
          <div className="text-[9px] font-bold text-slate-600 uppercase italic">
            SoSchool Role-Based Access Control v1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRolePage;