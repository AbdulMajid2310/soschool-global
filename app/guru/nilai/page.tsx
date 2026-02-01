"use client";

import React from 'react';
import { 
  FiFileText, FiPrinter, FiCheckCircle, FiClock, 
  FiArrowRight, FiCpu, FiShield, FiDownloadCloud 
} from 'react-icons/fi';

const RAPOR_CLASS_DATA = [
  { 
    id: 'R1', name: '10-IPA-1', subject: 'Informatika', 
    ready: 32, total: 32, validated: true,
    avgGrade: 'A-', status: 'Ready to Print', color: 'text-emerald-500'
  },
  { 
    id: 'R2', name: '11-RPL-2', subject: 'Basis Data', 
    ready: 12, total: 30, validated: false,
    avgGrade: 'C+', status: 'Data Incomplete', color: 'text-rose-500'
  },
  { 
    id: 'R3', name: '12-RPL-1', subject: 'Web Dev', 
    ready: 28, total: 28, validated: false,
    avgGrade: 'B+', status: 'Pending Validation', color: 'text-amber-500'
  },
];

const RaporList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-6 duration-700">
      
      {/* 1. Rapor Generation Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RaporStat label="Rapor Siap Cetak" value="60" sub="Siswa (Total)" icon={<FiCheckCircle />} color="text-emerald-500" />
        <RaporStat label="Butuh Validasi" value="30" sub="Siswa (Pending)" icon={<FiClock />} color="text-amber-500" />
        <RaporStat label="Narasi AI Generated" value="100%" sub="Sesuai CP/TP" icon={<FiCpu />} color="text-indigo-500" />
        <RaporStat label="Integritas Data" value="Valid" sub="Sistem Terkunci" icon={<FiShield />} color="text-cyan-500" />
      </div>

      <div className="flex justify-between items-center px-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Administrasi Rapor Akhir Semester</h3>
        <button className="text-[9px] font-black uppercase text-indigo-500 flex items-center gap-2 hover:underline">
          <FiDownloadCloud /> Download Format Dapodik
        </button>
      </div>

      {/* 2. Rapor Class Matrix */}
      <div className="grid grid-cols-1 gap-4">
        {RAPOR_CLASS_DATA.map((cls) => (
          <div key={cls.id} className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-2 group hover:border-indigo-500/50 transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-8">
              
              {/* Info Kelas */}
              <div className="flex items-center gap-5 lg:w-1/4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-indigo-950/40 flex items-center justify-center text-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                  <FiFileText />
                </div>
                <div>
                  <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
                </div>
              </div>

              {/* Progres Rapor */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 border-l border-slate-100 dark:border-white/5 pl-8">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Status Kelengkapan</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black italic">{cls.ready}/{cls.total}</span>
                    <div className="h-1.5 flex-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${cls.ready === cls.total ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${(cls.ready/cls.total)*100}%` }} />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Rata-rata Predikat</p>
                  <p className="text-xl font-black italic text-indigo-600 tracking-tighter">{cls.avgGrade}</p>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Keterangan</p>
                  <span className={`text-[9px] font-black italic uppercase tracking-widest ${cls.color}`}>
                    {cls.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:w-1/5 flex gap-3">
                <button className="flex-1 py-4 bg-slate-50 dark:bg-white/5 text-slate-500 rounded-2xl text-[9px] font-black uppercase italic hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  <FiPrinter size={14} /> Cetak
                </button>
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
                  Detail <FiArrowRight />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Rapor Assistant (Narrative Analysis) */}
      <div className="p-8 bg-linear-to-br from-[#0a0f1d] via-[#1e1b4b] to-indigo-950 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
        <FiCpu className="absolute -right-10 -bottom-10 text-indigo-500/10 group-hover:scale-125 transition-transform duration-1000" size={200} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="text-center md:text-left">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic mb-2">Smart Narrative Engine (AI)</h5>
            <p className="text-lg font-medium italic text-slate-300 leading-relaxed max-w-2xl">
              "Majid, narasi rapor untuk kelas **10-IPA-1** telah siap 100%. AI telah menyesuaikan deskripsi berdasarkan pencapaian tertinggi pada materi 'Berpikir Komputasional' untuk setiap siswa secara unik."
            </p>
          </div>
          <button className="px-8 py-4 bg-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform">
            Review Narasi AI
          </button>
        </div>
      </div>

    </div>
  );
};

const RaporStat = ({ label, value, sub, icon, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default RaporList;