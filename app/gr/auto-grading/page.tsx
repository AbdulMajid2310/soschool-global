"use client";

import React from 'react';
import { 
  FiBarChart2, FiTrendingUp, FiAlertCircle, FiAward, 
  FiArrowRight, FiDownload, FiFilter, FiCheckCircle 
} from 'react-icons/fi';

const GRADING_CLASS_DATA = [
  { 
    id: 'G1', name: '10-IPA-1', subject: 'Informatika', 
    avgScore: 88.5, kkm: 75, passRate: 95,
    topStudent: 'Ahmad Zaki', needRemedial: 2,
    status: 'Excellent', color: 'text-emerald-500'
  },
  { 
    id: 'G2', name: '11-RPL-2', subject: 'Basis Data', 
    avgScore: 72.4, kkm: 75, passRate: 65,
    topStudent: 'Siti Aminah', needRemedial: 12,
    status: 'Below KKM', color: 'text-rose-500'
  },
  { 
    id: 'G3', name: '12-RPL-1', subject: 'Web Dev', 
    avgScore: 82.1, kkm: 78, passRate: 88,
    topStudent: 'Rani Wijaya', needRemedial: 4,
    status: 'Stable', color: 'text-amber-500'
  },
];

const GradingList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 1. Executive Grading Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GradingStat icon={<FiBarChart2 />} label="Rata-rata Sekolah" value="81.0" sub="Meningkat 2.1%" color="text-indigo-500" />
        <GradingStat icon={<FiCheckCircle />} label="Tingkat Kelulusan" value="82.6%" sub="Lolos KKM" color="text-emerald-500" />
        <GradingStat icon={<FiAlertCircle />} label="Perlu Remedial" value="18" sub="Siswa (Total)" color="text-rose-500" />
        <GradingStat icon={<FiAward />} label="Nilai Sempurna" value="08" sub="Siswa (A+)" color="text-amber-500" />
      </div>

      <div className="flex justify-between items-center px-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Analisis Capaian Nilai Per Kelas</h3>
        <div className="flex gap-3">
            <button className="p-3 bg-white dark:bg-indigo-950/20 border border-slate-200 dark:border-white/5 rounded-xl text-slate-400">
                <FiFilter />
            </button>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase italic flex items-center gap-2">
                <FiDownload /> Export E-Rapor
            </button>
        </div>
      </div>

      {/* 2. Class Grading Analytics Cards */}
      <div className="grid grid-cols-1 gap-6">
        {GRADING_CLASS_DATA.map((cls) => (
          <div key={cls.id} className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-white/5 p-8 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              
              {/* Kelas & Mapel */}
              <div className="lg:w-1/4">
                <div className="flex items-center gap-4 mb-4">
                   <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 ${cls.color}`}>
                     {cls.status}
                   </span>
                </div>
                <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
              </div>

              {/* Data Visual Analysis */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 border-x border-slate-100 dark:border-white/5 px-8">
                <div className="text-center md:text-left">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Rata-rata</p>
                  <p className={`text-3xl font-black italic tracking-tighter ${cls.avgScore < cls.kkm ? 'text-rose-500' : 'text-indigo-600'}`}>
                    {cls.avgScore}
                  </p>
                </div>
                
                <div className="text-center md:text-left">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Pass Rate</p>
                  <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
                    <div className="h-2 w-16 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${cls.passRate > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${cls.passRate}%` }} />
                    </div>
                    <span className="text-[10px] font-black italic">{cls.passRate}%</span>
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Bintang Kelas</p>
                  <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase leading-none mt-2 italic">{cls.topStudent}</p>
                  <p className="text-[8px] font-bold text-emerald-500 uppercase mt-1 tracking-tighter">Gold Medalist</p>
                </div>

                <div className="hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Perlu Remedial</p>
                  <p className={`text-xl font-black italic mt-1 ${cls.needRemedial > 5 ? 'text-rose-500' : 'text-slate-400'}`}>
                    {cls.needRemedial} <span className="text-[9px] uppercase">Siswa</span>
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="lg:w-1/6 flex flex-col gap-2">
                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Detail Nilai <FiArrowRight />
                </button>
                <button className="w-full py-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl text-[8px] font-black uppercase italic hover:bg-rose-500 hover:text-white transition-all">
                  Kirim Notif Ortu
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Grading Insight */}
      <div className="p-8 bg-linear-to-br from-[#0a0f1d] to-[#1e1b4b] rounded-[3.5rem] border border-emerald-500/20 relative overflow-hidden group">
        <FiTrendingUp className="absolute -right-6 -bottom-6 text-emerald-500/10 group-hover:scale-110 transition-transform duration-700" size={150} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-glow-emerald">
                <FiBarChart2 size={32} />
            </div>
            <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 italic">Score Trend Analysis (AI)</h5>
                <p className="text-sm font-medium italic mt-1 text-slate-300 leading-relaxed max-w-3xl">
                    "Majid, nilai rata-rata kelas **11-RPL-2 (Basis Data)** berada 2.6 poin di bawah KKM. Anomali terdeteksi pada topik 'Normalization'. AI menyarankan pengulangan materi menggunakan metode visual sebelum ujian akhir."
                </p>
            </div>
            <button className="px-8 py-4 bg-emerald-500 text-[#0a0f1d] rounded-2xl text-[10px] font-black uppercase italic shadow-xl shadow-emerald-500/20">
                Lihat Analisis Topik
            </button>
        </div>
      </div>

    </div>
  );
};

const GradingStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default GradingList;