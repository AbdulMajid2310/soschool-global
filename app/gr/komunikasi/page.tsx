"use client";

import React from 'react';
import { 
  FiUsers, FiMessageSquare, FiActivity, FiShield, 
  FiArrowRight, FiMail, FiPhoneCall, FiCheckCircle 
} from 'react-icons/fi';

const PARENT_PORTAL_DATA = [
  { 
    id: 'P1', name: '10-IPA-1', subject: 'Informatika', 
    parentActive: 28, totalStudents: 32,
    lastMeeting: '15 Jan 2026', engagement: 92,
    issueFlag: 0, status: 'High Connection',
    color: 'border-emerald-500'
  },
  { 
    id: 'P2', name: '11-RPL-2', subject: 'Basis Data', 
    parentActive: 15, totalStudents: 30,
    lastMeeting: '02 Feb 2026', engagement: 45,
    issueFlag: 8, status: 'Low Engagement',
    color: 'border-rose-500'
  },
  { 
    id: 'P3', name: '12-RPL-1', subject: 'Web Dev', 
    parentActive: 25, totalStudents: 28,
    lastMeeting: '20 Jan 2026', engagement: 78,
    issueFlag: 2, status: 'Stable',
    color: 'border-indigo-500'
  },
];

const ParentPortalList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* 1. Portal Connectivity Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <PortalStat icon={<FiShield className="text-emerald-500" />} label="Orang Tua Terverifikasi" value="82%" sub="Total 3 Kelas" />
        <PortalStat icon={<FiMessageSquare className="text-indigo-500" />} label="Pesan Terkirim" value="142" sub="Bulan ini" />
        <PortalStat icon={<FiActivity className="text-amber-500" />} label="Rata-rata Login" value="4.2x" sub="Per Minggu" />
        <PortalStat icon={<FiCheckCircle className="text-cyan-500" />} label="Respon Undangan" value="89%" sub="Target Tercapai" />
      </div>

      <div className="flex justify-between items-center px-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Manajemen Komunikasi Orang Tua</h3>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase italic flex items-center gap-2 hover:bg-indigo-700 transition-all">
          <FiMail /> Broadcast Pengumuman
        </button>
      </div>

      {/* 2. Parent Connection Cards */}
      <div className="grid grid-cols-1 gap-6">
        {PARENT_PORTAL_DATA.map((item) => (
          <div key={item.id} className={`bg-white dark:bg-[#0a0f1d] rounded-[3rem] border-l-8 ${item.color} border border-slate-200 dark:border-white/5 p-8 hover:shadow-2xl transition-all duration-500 group`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              
              {/* Identity Section */}
              <div className="lg:w-1/4">
                <div className="flex items-center gap-2 mb-3">
                   <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 
                    ${item.engagement > 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                     {item.status}
                   </span>
                </div>
                <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{item.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">{item.subject}</p>
              </div>

              {/* Engagement Analytics */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 border-x border-slate-100 dark:border-white/5 px-8">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Aktivitas Ortu</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black italic text-slate-700 dark:text-white">{item.parentActive}/{item.totalStudents}</span>
                    <div className="h-1 w-12 bg-slate-100 dark:bg-white/5 rounded-full">
                      <div className="h-full bg-indigo-500" style={{ width: `${(item.parentActive/item.totalStudents)*100}%` }} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Pertemuan Terakhir</p>
                  <p className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase italic">{item.lastMeeting}</p>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Keterlibatan (AI)</p>
                  <p className={`text-xl font-black italic ${item.engagement < 50 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.engagement}%
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Isu Perlu Respon</p>
                  <p className={`text-xl font-black italic ${item.issueFlag > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                    {item.issueFlag} <span className="text-[9px]">Siswa</span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="lg:w-1/6 flex flex-col gap-2">
                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Lihat Respon <FiArrowRight />
                </button>
                <button className="w-full py-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl text-[8px] font-black uppercase italic hover:text-indigo-600 dark:hover:text-white transition-all">
                  <FiPhoneCall className="inline mr-2" /> Hubungi Koordinator
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Communication Analysis */}
      <div className="p-8 bg-linear-to-br from-[#0a0f1d] to-[#1e1b4b] rounded-[3.5rem] border border-emerald-500/20 text-white relative overflow-hidden group">
        <FiMessageSquare className="absolute -right-10 -bottom-10 text-emerald-500/5 group-hover:scale-125 transition-transform duration-1000" size={200} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <FiUsers size={30} />
          </div>
          <div className="flex-1">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 italic mb-2">Social Connection Analysis (AI)</h5>
            <p className="text-lg font-medium italic leading-relaxed text-slate-300">
              "Majid, tingkat keterlibatan orang tua di kelas **11-RPL-2** menurun tajam. AI mendeteksi 8 siswa memiliki masalah absensi tanpa respon dari wali murid. Disarankan melakukan **Parent-Teacher Meeting** virtual minggu depan."
            </p>
          </div>
          <button className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl text-[10px] font-black uppercase italic shadow-xl shadow-emerald-500/20">
            Atur Pertemuan
          </button>
        </div>
      </div>

    </div>
  );
};

const PortalStat = ({ icon, label, value, sub }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest italic text-slate-400">{label}</span>
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default ParentPortalList;