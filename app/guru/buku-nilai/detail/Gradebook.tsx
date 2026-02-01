"use client";

import React from 'react';
import { FiDownload, FiFilter, FiSave, FiTrendingUp, FiAlertCircle, FiSearch } from 'react-icons/fi';

export interface StudentGrade {
  id: string;
  name: string;
  nis: string;
  grades: {
    harian: number;
    tugas: number;
    uts: number;
    uas: number;
  };
  average: number;
  status: 'A' | 'B' | 'C' | 'D';
}

export const GRADEBOOK_DATA: StudentGrade[] = [
  { id: '1', name: 'Ahmad Zaki', nis: '2026001', grades: { harian: 90, tugas: 85, uts: 88, uas: 92 }, average: 89, status: 'A' },
  { id: '2', name: 'Siti Aminah', nis: '2026002', grades: { harian: 95, tugas: 90, uts: 92, uas: 96 }, average: 93, status: 'A' },
  { id: '3', name: 'Budi Santoso', nis: '2026003', grades: { harian: 70, tugas: 75, uts: 65, uas: 70 }, average: 70, status: 'C' },
  { id: '4', name: 'Rani Wijaya', nis: '2026004', grades: { harian: 82, tugas: 80, uts: 85, uas: 80 }, average: 82, status: 'B' },
];

const Gradebook = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Gradebook Header Actions */}
      <div className="flex flex-col xl:flex-row justify-between gap-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {['Semester Ganjil', 'Semester Genap', 'Remedial'].map((tab) => (
            <button key={tab} className="whitespace-nowrap px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest italic bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-900/20 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all">
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-900/20 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:text-indigo-500 transition-all">
            <FiDownload /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
            <FiSave /> Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-indigo-950/20">
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Siswa</th>
                <th className="px-6 py-6 text-center text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Harian</th>
                <th className="px-6 py-6 text-center text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Tugas</th>
                <th className="px-6 py-6 text-center text-[9px] font-black uppercase tracking-widest text-slate-400 italic">UTS</th>
                <th className="px-6 py-6 text-center text-[9px] font-black uppercase tracking-widest text-slate-400 italic">UAS</th>
                <th className="px-6 py-6 text-center text-[9px] font-black uppercase tracking-widest text-indigo-500 italic">Rata-rata</th>
                <th className="px-8 py-6 text-right text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Predikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-indigo-900/10">
              {GRADEBOOK_DATA.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-all">
                  <td className="px-8 py-5">
                    <p className="text-[11px] font-black uppercase italic text-slate-900 dark:text-white leading-none">{student.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{student.nis}</p>
                  </td>
                  <GradeCell value={student.grades.harian} />
                  <GradeCell value={student.grades.tugas} />
                  <GradeCell value={student.grades.uts} />
                  <GradeCell value={student.grades.uas} />
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-black italic tracking-tighter text-indigo-600 dark:text-indigo-400">{student.average}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black italic shadow-sm
                      ${student.status === 'A' ? 'bg-emerald-500 text-white' : 
                        student.status === 'B' ? 'bg-indigo-500 text-white' : 
                        student.status === 'C' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/20 flex flex-col md:flex-row items-center gap-6">
        <div className="w-12 h-12 bg-white dark:bg-indigo-900 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
          <FiTrendingUp size={24} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 italic">Analisis Performa Kelas</h4>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Rata-rata kelas meningkat <strong>+4.2%</strong> dibandingkan semester lalu. Siswa menunjukkan pemahaman yang kuat di materi Basis Data.</p>
        </div>
        <button className="px-6 py-3 bg-white dark:bg-indigo-900 text-[10px] font-black uppercase tracking-widest italic rounded-xl text-indigo-600 hover:shadow-md transition-all">Lihat Detail Analitik</button>
      </div>
    </div>
  );
};

// Sub-component for Grade Cells
const GradeCell = ({ value }: { value: number }) => (
  <td className="px-6 py-5 text-center">
    <input 
      type="number" 
      defaultValue={value}
      className={`w-12 text-center bg-transparent text-[11px] font-bold outline-none border-b-2 border-transparent focus:border-indigo-500 transition-all
        ${value < 75 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}
    />
  </td>
);

export default Gradebook;