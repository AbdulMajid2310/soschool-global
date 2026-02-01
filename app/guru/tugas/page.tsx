"use client";

import React from 'react';
import { 
  FiFolder, FiClock, FiCheckCircle, FiAlertCircle, 
  FiArrowRight, FiPieChart, FiBarChart2, FiEdit3 
} from 'react-icons/fi';

const ASSIGNMENT_DATA = [
  { 
    id: 'T1', name: '10-IPA-1', subject: 'Informatika', 
    activeAssignments: 2, totalSubmission: 28, totalStudents: 32,
    pendingGrading: 5, deadlineSoon: 1,
    status: 'Normal', color: 'border-indigo-500'
  },
  { 
    id: 'T2', name: '11-RPL-2', subject: 'Basis Data', 
    activeAssignments: 4, totalSubmission: 12, totalStudents: 30,
    pendingGrading: 0, deadlineSoon: 3,
    status: 'High Load', color: 'border-rose-500'
  },
  { 
    id: 'T3', name: '12-RPL-1', subject: 'Web Dev', 
    activeAssignments: 1, totalSubmission: 26, totalStudents: 28,
    pendingGrading: 18, deadlineSoon: 0,
    status: 'Grading Heavy', color: 'border-cyan-500'
  },
];

const TugasList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      
      {/* 1. Assignment Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AssignmentStat icon={<FiPieChart />} label="Rate Pengumpulan" value="78%" sub="Rata-rata Global" color="text-indigo-500" />
        <AssignmentStat icon={<FiEdit3 />} label="Belum Dinilai" value="23" sub="Total Semua Kelas" color="text-amber-500" />
        <AssignmentStat icon={<FiAlertCircle />} label="Tugas Kritis" value="04" sub="Mendekati Deadline" color="text-rose-500" />
        <AssignmentStat icon={<FiCheckCircle />} label="Selesai Minggu Ini" value="12" sub="Tugas Terarsip" color="text-emerald-500" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Monitoring Tugas Per Kelas</h3>
          <button className="text-[9px] font-black uppercase text-indigo-500 flex items-center gap-2">
            <FiBarChart2 /> Lihat Statistik Bulanan
          </button>
        </div>

        {ASSIGNMENT_DATA.map((item) => (
          <div key={item.id} className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-8 gap-8">
              
              {/* Info Kelas & Subjek */}
              <div className="flex items-center gap-6 lg:w-1/4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-indigo-950/40 flex items-center justify-center text-2xl text-indigo-500 group-hover:rotate-12 transition-transform">
                  <FiFolder />
                </div>
                <div>
                  <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{item.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.subject}</p>
                </div>
              </div>

              {/* Analisis Progres Tugas */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 border-l border-slate-100 dark:border-white/5 pl-8">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Tugas Aktif</p>
                  <p className="text-xl font-black italic text-slate-900 dark:text-white">{item.activeAssignments}</p>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Pengumpulan</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black italic text-indigo-600">{item.totalSubmission}/{item.totalStudents}</span>
                    <div className="h-1 w-12 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${(item.totalSubmission/item.totalStudents)*100}%` }} />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Menunggu Nilai</p>
                  <p className={`text-xl font-black italic ${item.pendingGrading > 10 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                    {item.pendingGrading}
                  </p>
                </div>

                <div className="hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Beban Tugas (AI)</p>
                  <span className={`px-2 py-1 rounded-md text-[8px] font-black italic uppercase tracking-widest bg-slate-50 dark:bg-white/5 
                    ${item.status === 'High Load' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:w-1/6 flex justify-end gap-3">
                <button className="p-4 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xs">
                  <FiClock />
                </button>
                <button className="flex-1 lg:flex-none px-6 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Kelola <FiArrowRight />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* AI Assignment Insight */}
      <div className="p-8 bg-linear-to-br from-indigo-600 to-violet-700 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <FiEdit3 className="absolute -right-10 -bottom-10 text-white/10 group-hover:scale-125 transition-transform duration-1000" size={200} />
        <div className="flex-1 relative z-10">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 italic mb-2">Workload Intelligence</h5>
          <p className="text-lg font-medium italic leading-relaxed">
            "Majid, kelas **12-RPL-1** memiliki 18 tugas yang belum dinilai. Gunakan fitur **Auto-Grading AI** malam ini untuk memproses tugas pilihan ganda secara instan agar Anda tetap *On Track*."
          </p>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 rounded-4xl text-[10px] font-black uppercase italic shadow-xl hover:scale-105 transition-transform">
          Gunakan Auto-Grading
        </button>
      </div>
    </div>
  );
};

// Sub-component
const AssignmentStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default TugasList;