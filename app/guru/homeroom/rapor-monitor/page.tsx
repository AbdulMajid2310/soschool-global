"use client";

import React from 'react';
import { 
  FiFileText, FiAlertCircle, FiCheckCircle, FiClock, 
  FiMessageSquare, FiTrendingUp, FiSend, FiSearch 
} from 'react-icons/fi';

const SUBJECT_PROGRESS = [
  { id: 1, subject: 'Matematika', teacher: 'Drs. Sudirman', progress: 100, status: 'Completed', avg: 72 },
  { id: 2, subject: 'Bahasa Inggris', teacher: 'Miss Sarah', progress: 45, status: 'In Progress', avg: 85 },
  { id: 3, subject: 'Fisika', teacher: 'Bpk. Heru', progress: 0, status: 'Pending', avg: 0 },
  { id: 4, subject: 'Pkn', teacher: 'Ibu Ratna', progress: 100, status: 'Completed', avg: 88 },
];

const HomeroomGradeMonitor = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Rapor Readiness Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white dark:bg-[#0a0f1d] p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic mb-6">Total Rapor Readiness</p>
          <div className="text-center">
            <h2 className="text-6xl font-black italic tracking-tighter text-indigo-600">62%</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-4 italic">Berdasarkan Input Guru Mapel</p>
            <div className="mt-8 h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: '62%' }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a0f1d] p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
          <FiFileText className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-110 transition-transform duration-700" size={200} />
          <div className="relative z-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-6">Subject Entry Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBJECT_PROGRESS.map((sub) => (
                <div key={sub.id} className="p-5 bg-white/2 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-[11px] font-black text-white italic uppercase tracking-wider">{sub.subject}</h4>
                      <p className="text-[9px] font-bold text-slate-500 uppercase">{sub.teacher}</p>
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${sub.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${sub.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-black italic text-slate-400">{sub.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Critical Students Table (Below KKM) */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-[3.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between gap-4">
           <div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">Underperforming Analysis</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase italic mt-2">Daftar siswa dengan nilai di bawah KKM (&lt;75)</p>
           </div>
           <div className="flex gap-2">
              <button className="px-6 py-3 bg-rose-500 text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest shadow-lg shadow-rose-500/20 flex items-center gap-2">
                <FiSend /> Blast Ortu (Warning)
              </button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/2">
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Siswa Perwalian</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Mapel Bermasalah</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Nilai Terendah</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Rata-rata</th>
                <th className="p-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <CriticalRow name="Budi Santoso" subject="Matematika, Fisika" minGrade={45} avg={62} />
              <CriticalRow name="Dedi Kurniawan" subject="Fisika" minGrade={68} avg={71} />
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. AI Rapor Insight */}
      <div className="bg-linear-to-br from-indigo-600 to-violet-800 p-8 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-visit flex items-center justify-center text-white shrink-0">
          <FiTrendingUp size={30} />
        </div>
        <div className="flex-1">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-2 italic">Rapor Integrity Insight (AI)</h5>
          <p className="text-lg font-medium italic leading-relaxed text-indigo-50">
            "Majid, terdapat ketimpangan nilai yang signifikan di kelas **11-RPL-2**. Sebanyak **40% siswa** gagal di mata pelajaran Fisika, sementara 95% lulus di Informatika. Hal ini menunjukkan indikasi beban kurikulum Fisika yang perlu dievaluasi dengan guru mapel terkait."
          </p>
        </div>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase italic shadow-xl">
          Unduh Ringkasan Rapor
        </button>
      </div>

    </div>
  );
};

// Sub-components
const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    'Completed': 'bg-emerald-500/10 text-emerald-500',
    'In Progress': 'bg-amber-500/10 text-amber-500',
    'Pending': 'bg-rose-500/10 text-rose-500'
  };
  return (
    <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase italic ${styles[status]}`}>
      {status}
    </span>
  );
};

const CriticalRow = ({ name, subject, minGrade, avg }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-white/2 transition-all group">
    <td className="p-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-black italic text-xs">
          {name.charAt(0)}
        </div>
        <h4 className="text-[11px] font-black italic uppercase tracking-tight text-slate-900 dark:text-white leading-none">{name}</h4>
      </div>
    </td>
    <td className="p-8 text-[10px] font-bold text-slate-500 italic uppercase">{subject}</td>
    <td className="p-8">
      <span className="text-sm font-black italic text-rose-500">{minGrade}</span>
    </td>
    <td className="p-8">
      <span className="text-sm font-black italic text-slate-400">{avg}</span>
    </td>
    <td className="p-8">
      <button className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-xl hover:text-indigo-500 hover:bg-white transition-all">
        <FiMessageSquare size={16} />
      </button>
    </td>
  </tr>
);

export default HomeroomGradeMonitor;