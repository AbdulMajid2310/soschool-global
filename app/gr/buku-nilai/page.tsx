"use client";

import React from 'react';
import { 
  FiBook, FiTrendingUp, FiAlertCircle, FiCheckCircle, 
  FiArrowRight, FiUsers, FiAward, FiBarChart2 
} from 'react-icons/fi';

const GRADEBOOK_CLASSES = [
  { 
    id: 'C1', name: '10-IPA-1', subject: 'Informatika', 
    avgScore: 88.5, passRate: 94, totalStudents: 32,
    status: 'High Performance', color: 'from-emerald-500 to-teal-600',
    lastUpdate: '12 Menit lalu'
  },
  { 
    id: 'C2', name: '11-RPL-2', subject: 'Basis Data', 
    avgScore: 71.2, passRate: 62, totalStudents: 30,
    status: 'Needs Attention', color: 'from-rose-500 to-orange-600',
    lastUpdate: '1 Hari lalu'
  },
  { 
    id: 'C3', name: '12-RPL-1', subject: 'Web Dev', 
    avgScore: 84.8, passRate: 89, totalStudents: 28,
    status: 'On Track', color: 'from-indigo-600 to-violet-700',
    lastUpdate: '3 Jam lalu'
  },
];

const GradebookClassList = () => {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700">
      
      {/* 1. Global Academic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlobalStatCard 
          label="Rata-rata Gabungan" 
          value="81.5" 
          sub="Sesuai Target Tahunan" 
          icon={<FiBarChart2 />} 
        />
        <GlobalStatCard 
          label="Siswa di Bawah KKM" 
          value="14 Siswa" 
          sub="Mayoritas dari 11-RPL-2" 
          icon={<FiAlertCircle className="text-rose-500" />} 
        />
        <GlobalStatCard 
          label="Predikat Unggul (A)" 
          value="26 Siswa" 
          sub="Meningkat 5% Bulan ini" 
          icon={<FiAward className="text-amber-500" />} 
        />
      </div>

      {/* 2. Class Selection Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic px-4">Pilih Kelas untuk Kelola Nilai</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {GRADEBOOK_CLASSES.map((cls) => (
            <div key={cls.id} className="group bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col lg:flex-row">
                
                {/* Visual Indicator (Left) */}
                <div className={`lg:w-48 bg-linear-to-br ${cls.color} p-8 text-white flex flex-col justify-center items-center text-center`}>
                  <h4 className="text-3xl font-black italic tracking-tighter">{cls.avgScore}</h4>
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-80 mt-1">Avg Score</p>
                </div>

                {/* Content (Middle) */}
                <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div>
                    <h5 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h5>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
                    <div className="flex items-center gap-3 mt-4 text-[9px] font-black italic text-slate-400 uppercase">
                        <FiUsers /> {cls.totalStudents} Siswa
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <p className="text-[9px] font-black text-slate-400 uppercase italic leading-none">Ketuntasan (KKM)</p>
                        <p className={`text-xs font-black italic ${cls.passRate > 80 ? 'text-emerald-500' : 'text-rose-500'}`}>{cls.passRate}%</p>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${cls.passRate > 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${cls.passRate}%` }} />
                    </div>
                    <p className="text-[8px] font-bold text-slate-400 italic">Terakhir diupdate: {cls.lastUpdate}</p>
                  </div>

                  <div className="flex flex-col md:items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black italic uppercase tracking-widest border ${cls.passRate > 80 ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/5 border-rose-500/20 text-rose-500'}`}>
                        {cls.status}
                    </span>
                    <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic group-hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                        Buka Buku Nilai <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI Comparison Insight */}
      <div className="p-8 bg-linear-to-br from-indigo-900 via-slate-900 to-[#0a0f1d] rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
        <FiTrendingUp className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-110 transition-transform duration-700" size={200} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-indigo-400">
                <FiBarChart2 size={32} />
            </div>
            <div className="flex-1">
                <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic mb-2">Academic Benchmarking (AI)</h6>
                <p className="text-sm font-medium italic text-slate-300 leading-relaxed">
                    "Majid, gap nilai antara kelas **10-IPA-1** dan **11-RPL-2** mencapai 17.3 poin. Disarankan untuk meninjau kembali tingkat kesulitan materi 'Basis Data' atau melakukan tes diagnostik ulang di kelas 11."
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

const GlobalStatCard = ({ label, value, sub, icon }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm flex items-center gap-6 hover:border-indigo-500/50 transition-colors">
    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-2xl text-indigo-500">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 italic tracking-widest mb-1 leading-none">{label}</p>
      <h4 className="text-xl font-black italic text-slate-900 dark:text-white leading-none">{value}</h4>
      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{sub}</p>
    </div>
  </div>
);

export default GradebookClassList;