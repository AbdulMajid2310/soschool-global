'use client';

import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import {  FaFilter, FaEllipsisVertical, 
  FaGraduationCap, FaEnvelope, FaIdCard 
} from 'react-icons/fa6';
import { MdOutlineClass, MdMale, MdFemale } from 'react-icons/md';

// --- DATA STATIS ---
interface Student {
  id: string;
  nisn: string;
  name: string;
  level: string;
  class: string;
  email: string;
  status: 'Aktif' | 'Nonaktif' | 'Alumni';
  gender: 'L' | 'P';
}

const STATIC_STUDENTS: Student[] = [
  { id: '1', nisn: '0012345678', name: 'Majid Ikhwan', level: 'SMK', class: 'XII RPL 1', email: 'majid@soschool.id', status: 'Aktif', gender: 'L' },
  { id: '2', nisn: '0023456789', name: 'Siti Rahmawati', level: 'SMA', class: 'XI IPA 4', email: 'siti.rahma@gmail.com', status: 'Aktif', gender: 'P' },
  { id: '3', nisn: '0034567890', name: 'Budi Hartanto', level: 'SMP', class: 'IX B', email: 'budi.h@yahoo.com', status: 'Nonaktif', gender: 'L' },
  { id: '4', nisn: '0045678901', name: 'Alya Safira', level: 'SD', class: 'VI A', email: 'alya.safira@outlook.com', status: 'Aktif', gender: 'P' },
  { id: '5', nisn: '0056789012', name: 'Dedi Kurniawan', level: 'SMK', class: 'XII TKJ 2', email: 'dedi.k@soschool.id', status: 'Alumni', gender: 'L' },
];

export default function ListStudentResponsive() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    return STATIC_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.nisn.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama atau NISN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
          />
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-100 dark:bg-gray-800 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-all">
          <FaFilter />
          Filter
        </button>
      </div>

      {/* RESPONSIVE GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            className="group relative bg-white dark:bg-gray-900 p-5 rounded-3xl border border-slate-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
          >
            {/* Opsi Button - Top Right */}
            <button className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <FaEllipsisVertical />
            </button>

            {/* Header: Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner
                ${student.gender === 'L' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-pink-100 text-pink-600 dark:bg-pink-900/30'}
              `}>
                {student.name.charAt(0)}
                {/* Gender Icon Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex items-center justify-center text-xs">
                  {student.gender === 'L' ? <MdMale className="text-blue-500" /> : <MdFemale className="text-pink-500" />}
                </div>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 dark:text-white truncate pr-6 leading-tight">
                  {student.name}
                </h3>
                <span className="inline-block mt-1">
                  <StatusBadge status={student.status} />
                </span>
              </div>
            </div>

            {/* Info Body */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <MdOutlineClass className="text-blue-500 w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Kelas</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{student.class} ({student.level})</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <FaIdCard className="text-purple-500 w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">NISN</span>
                  <span className="text-sm font-mono font-bold text-slate-700 dark:text-gray-200">{student.nisn}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 p-1 px-3">
                <FaEnvelope className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-xs truncate">{student.email}</span>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-gray-800 flex gap-2">
              <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20">
                Detail
              </button>
              <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-300 rounded-xl hover:bg-slate-200 transition-all">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-4xl border border-dashed border-slate-200 dark:border-gray-800">
          <p className="text-slate-400 font-medium">Siswa tidak ditemukan...</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Student['status'] }) {
  const styles = {
    Aktif: 'bg-emerald-500 text-white shadow-emerald-500/20',
    Nonaktif: 'bg-red-500 text-white shadow-red-500/20',
    Alumni: 'bg-blue-500 text-white shadow-blue-500/20',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg ${styles[status]}`}>
      {status}
    </span>
  );
}