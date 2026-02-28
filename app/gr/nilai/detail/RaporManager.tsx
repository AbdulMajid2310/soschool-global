"use client";

import React from 'react';
import { 
  FiFileText, FiPrinter, FiLock, FiUnlock, FiTrendingUp, 
  FiAlertCircle, FiCheckCircle, FiChevronRight 
} from 'react-icons/fi';

export interface StudentRapor {
  id: string;
  name: string;
  nis: string;
  grades: {
    pengetahuan: number;
    keterampilan: number;
    sikap: string; // A, B, C
  };
  attendance: {
    sakit: number;
    izin: number;
    alpa: number;
  };
  isLocked: boolean; // Jika sudah diverifikasi wali kelas
}

export const RAPOR_STUDENTS: StudentRapor[] = [
  { 
    id: '1', name: 'Majid Developer', nis: '2024001', 
    grades: { pengetahuan: 92, keterampilan: 95, sikap: 'A' },
    attendance: { sakit: 0, izin: 1, alpa: 0 },
    isLocked: true 
  },
  { 
    id: '2', name: 'Siti Aminah', nis: '2024002', 
    grades: { pengetahuan: 85, keterampilan: 88, sikap: 'A' },
    attendance: { sakit: 2, izin: 0, alpa: 0 },
    isLocked: false 
  },
  { 
    id: '3', name: 'Budi Santoso', nis: '2024003', 
    grades: { pengetahuan: 75, keterampilan: 80, sikap: 'B' },
    attendance: { sakit: 0, izin: 0, alpa: 3 },
    isLocked: false 
  },
];

const RaporManager = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Quick Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard label="Sudah Dinilai" count="28/32" icon={<FiCheckCircle />} color="text-emerald-500" />
        <SummaryCard label="Rata-rata Kelas" count="84.5" icon={<FiTrendingUp />} color="text-indigo-500" />
        <SummaryCard label="Perlu Perbaikan" count="4" icon={<FiAlertCircle />} color="text-rose-500" />
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] border border-slate-200 dark:border-emerald-900/20 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-emerald-900/10 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Rekapitulasi E-Rapor</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Semester Ganjil 2025/2026</p>
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-slate-100 dark:bg-emerald-950/20 text-slate-600 dark:text-emerald-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all">
              <FiPrinter /> Print Massal
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-emerald-950/10">
                <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest">Nama Siswa</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Pengetahuan</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Keterampilan</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Sikap</th>
                <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-emerald-900/10">
              {RAPOR_STUDENTS.map((student) => (
                <tr key={student.id} className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all">
                  <td className="px-8 py-5">
                    <p className="text-xs font-black uppercase italic text-slate-900 dark:text-white">{student.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 tracking-tighter">NIS: {student.nis}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-sm font-black italic ${student.grades.pengetahuan < 75 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}>
                      {student.grades.pengetahuan}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-black italic text-slate-700 dark:text-slate-300">
                      {student.grades.keterampilan}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-lg text-[10px] font-black">
                      {student.grades.sikap}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      {student.isLocked ? (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase text-emerald-500 italic">
                          <FiLock /> Locked
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[8px] font-black uppercase text-amber-500 italic">
                          <FiUnlock /> Editable
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                      <FiChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ label, count, icon, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-4xl border border-slate-200 dark:border-emerald-900/20 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <p className={`text-2xl font-black italic tracking-tighter ${color.split(' ')[0]}`}>{count}</p>
    </div>
    <div className={`text-2xl ${color} opacity-20`}>
      {icon}
    </div>
  </div>
);

export default RaporManager;