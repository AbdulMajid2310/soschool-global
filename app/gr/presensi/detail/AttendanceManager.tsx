"use client";

import React, { useState } from 'react';
import { FiCheck, FiX, FiClock, FiFileText, FiSearch, FiSave, FiUsers } from 'react-icons/fi';

export interface StudentAbsence {
  id: string;
  name: string;
  nis: string;
  avatar: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
  note?: string;
}

export const MOCK_STUDENTS: StudentAbsence[] = [
  { id: '1', name: 'Majid Developer', nis: '2024001', avatar: 'https://i.pravatar.cc/150?u=majid', status: 'present' },
  { id: '2', name: 'Siti Aminah', nis: '2024002', avatar: 'https://i.pravatar.cc/150?u=siti', status: null },
  { id: '3', name: 'Budi Santoso', nis: '2024003', avatar: 'https://i.pravatar.cc/150?u=budi', status: 'late' },
  { id: '4', name: 'Dewi Lestari', nis: '2024004', avatar: 'https://i.pravatar.cc/150?u=dewi', status: 'excused', note: 'Sakit flu' },
  { id: '5', name: 'Rian Hidayat', nis: '2024005', avatar: 'https://i.pravatar.cc/150?u=rian', status: null },
];

const AttendanceManager = () => {
  const [students, setStudents] = useState<StudentAbsence[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState('');

  const updateStatus = (id: string, status: StudentAbsence['status']) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const stats = {
    present: students.filter(s => s.status === 'present').length,
    late: students.filter(s => s.status === 'late').length,
    excused: students.filter(s => s.status === 'excused').length,
    absent: students.filter(s => s.status === 'absent').length,
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Hadir" count={stats.present} color="bg-green-500" />
        <StatCard label="Telat" count={stats.late} color="bg-amber-500" />
        <StatCard label="Izin" count={stats.excused} color="bg-blue-500" />
        <StatCard label="Alpa" count={stats.absent} color="bg-red-500" />
      </div>

      {/* Control Bar */}
      <div className="bg-white dark:bg-[#0a0f1d] p-4 rounded-3xl border border-slate-200 dark:border-indigo-900/20 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Cari nama siswa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-indigo-950/30 border-none outline-none text-xs font-bold"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest italic flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
            <FiSave /> Simpan Presensi
          </button>
        </div>
      </div>

      {/* Table/List Section */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-4xl border border-slate-200 dark:border-indigo-900/20 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-indigo-950/20 border-b border-slate-100 dark:border-indigo-900/10">
            <tr>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest">Siswa</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest text-center">Status Kehadiran</th>
              <th className="px-6 py-4 text-[9px] font-black uppercase text-slate-400 tracking-widest hidden md:table-cell">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-indigo-900/10">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border-2 border-slate-100 dark:border-indigo-900/30" />
                    <div>
                      <p className="text-xs font-black uppercase italic text-slate-900 dark:text-white">{student.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 tracking-tighter">{student.nis}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <StatusBtn 
                      active={student.status === 'present'} 
                      onClick={() => updateStatus(student.id, 'present')}
                      color="hover:bg-green-500 hover:text-white"
                      activeColor="bg-green-500 text-white shadow-green-500/40"
                      icon={<FiCheck />}
                      label="Hadir"
                    />
                    <StatusBtn 
                      active={student.status === 'late'} 
                      onClick={() => updateStatus(student.id, 'late')}
                      color="hover:bg-amber-500 hover:text-white"
                      activeColor="bg-amber-500 text-white shadow-amber-500/40"
                      icon={<FiClock />}
                      label="Telat"
                    />
                    <StatusBtn 
                      active={student.status === 'excused'} 
                      onClick={() => updateStatus(student.id, 'excused')}
                      color="hover:bg-blue-500 hover:text-white"
                      activeColor="bg-blue-500 text-white shadow-blue-500/40"
                      icon={<FiFileText />}
                      label="Izin"
                    />
                    <StatusBtn 
                      active={student.status === 'absent'} 
                      onClick={() => updateStatus(student.id, 'absent')}
                      color="hover:bg-red-500 hover:text-white"
                      activeColor="bg-red-500 text-white shadow-red-500/40"
                      icon={<FiX />}
                      label="Alpa"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <input 
                    type="text" 
                    placeholder="Catatan..." 
                    className="w-full bg-transparent border-b border-dashed border-slate-200 dark:border-indigo-900/30 text-[10px] focus:border-indigo-500 outline-none pb-1"
                    defaultValue={student.note}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ label, count, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-4 rounded-3xl border border-slate-200 dark:border-indigo-900/20 flex items-center gap-4">
    <div className={`w-12 h-12 ${color} bg-opacity-10 dark:bg-opacity-20 rounded-2xl flex items-center justify-center text-lg font-bold text-white`}>
      <span className={color.replace('bg-', 'text-')}>{count}</span>
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <p className="text-xl font-black italic text-slate-900 dark:text-white">{count} <span className="text-[10px] font-bold not-italic">Siswa</span></p>
    </div>
  </div>
);

const StatusBtn = ({ active, onClick, color, activeColor, icon, label }: any) => (
  <div className="relative group/btn">
    <button 
      onClick={onClick}
      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-300 border
        ${active ? activeColor + ' border-transparent scale-110' : 'bg-slate-50 dark:bg-indigo-950/20 border-transparent text-slate-400 ' + color}`}
    >
      {icon}
    </button>
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[8px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none uppercase font-black">
      {label}
    </span>
  </div>
);

export default AttendanceManager;