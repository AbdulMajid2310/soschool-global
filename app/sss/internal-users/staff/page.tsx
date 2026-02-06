"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiUserPlus, FiMail, FiShield, 
  FiKey, FiBriefcase, FiCheckCircle, FiInfo 
} from 'react-icons/fi';

const AddStaffPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10 flex justify-center">
      <div className="max-w-3xl w-full">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase italic text-slate-500 hover:text-white transition-all mb-8"
        >
          <FiArrowLeft /> Back to Infrastructure
        </button>

        {/* HEADER */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">
            Onboard <span className="text-blue-500">Internal Staff</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 italic">
            Assign new operator or developer to SoSchool Backbone
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
              <form className="space-y-6">
                
                {/* BASIC INFO */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase italic text-blue-500 tracking-widest border-b border-white/5 pb-2">Basic Identity</h3>
                  <FormInput label="Full Name" placeholder="e.g. Ahmad Ghozali" icon={<FiUserPlus />} />
                  <FormInput label="Official Email" placeholder="ghozali@soschool.id" icon={<FiMail />} />
                </div>

                {/* ROLE ASSIGNMENT */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-[10px] font-black uppercase italic text-blue-500 tracking-widest border-b border-white/5 pb-2">Work Assignment</h3>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase italic">Select Primary Role</label>
                    <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-xs font-black uppercase italic text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer">
                      <option>Junior Support</option>
                      <option>Senior Support</option>
                      <option>Head of Finance</option>
                      <option>Core Developer</option>
                      <option>System Administrator</option>
                    </select>
                  </div>
                </div>

                {/* SECURITY SETTINGS */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-[10px] font-black uppercase italic text-blue-500 tracking-widest border-b border-white/5 pb-2">Security Control</h3>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                        <FiKey className="text-blue-500" />
                        <div>
                            <p className="text-[11px] font-black text-white uppercase italic">Auto-Generate Credentials</p>
                            <p className="text-[8px] text-slate-500 uppercase font-bold italic">Password will be sent to official email</p>
                        </div>
                    </div>
                    <div className="w-10 h-5 bg-blue-600 rounded-full flex justify-end p-1">
                        <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-3xl text-[12px] font-black uppercase italic transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 mt-8"
                >
                  Confirm & Create Staff Access
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: INFO/PREVIEW AREA */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-4xl p-6 italic">
                <FiInfo className="text-blue-500 mb-4" size={20} />
                <h4 className="text-[11px] font-black text-white uppercase mb-2">Notice for Admin</h4>
                <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-bold tracking-tight">
                  Menambahkan staff baru akan memberikan mereka akses ke data internal sekolah. Pastikan email yang digunakan adalah email resmi instansi.
                </p>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-4xl p-6">
                <h4 className="text-[11px] font-black text-emerald-500 uppercase mb-4 italic flex items-center gap-2">
                  <FiCheckCircle /> Scope Access
                </h4>
                <div className="space-y-3">
                   <ScopeItem label="View Dashboard" active />
                   <ScopeItem label="Handle Support" active />
                   <ScopeItem label="System Config" />
                   <ScopeItem label="Finance Control" />
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---
const FormInput = ({ label, placeholder, icon }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-slate-500 uppercase italic tracking-widest">{label}</label>
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors">
        {icon}
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs font-medium text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 italic"
      />
    </div>
  </div>
);

const ScopeItem = ({ label, active = false }: any) => (
    <div className="flex items-center justify-between">
        <span className={`text-[10px] font-black uppercase italic ${active ? 'text-emerald-400' : 'text-slate-600'}`}>
            {label}
        </span>
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`} />
    </div>
)

export default AddStaffPage;