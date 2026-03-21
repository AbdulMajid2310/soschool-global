"use client";

import React from "react";
import {
  FiBookOpen,
  FiMoreVertical,
  FiPlus,
  FiUsers,
  FiClock,
  FiLayers,
} from "react-icons/fi";

export interface Subject {
  id: string;
  name: string;
  class: string;
  studentsCount: number;
  progress: number; // Progres kurikulum dalam persen
  color: string;
  nextSync: string;
}

export const TEACHER_SUBJECTS: Subject[] = [
  {
    id: "1",
    name: "Informatika",
    class: "10 - IPA 1",
    studentsCount: 36,
    progress: 75,
    color: "bg-indigo-500",
    nextSync: "Selasa, 08:00",
  },
  {
    id: "2",
    name: "Algoritma & Struktur Data",
    class: "11 - RPL 2",
    studentsCount: 32,
    progress: 40,
    color: "bg-violet-500",
    nextSync: "Rabu, 10:30",
  },
  {
    id: "3",
    name: "Basis Data",
    class: "12 - RPL 1",
    studentsCount: 30,
    progress: 90,
    color: "bg-fuchsia-500",
    nextSync: "Kamis, 13:00",
  },
];

const SubjectManager = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic mb-1">
            Akademik
          </h2>
          <p className="text-xl font-black italic uppercase text-slate-900 dark:text-white">
            Jadwal & Materi Ajar
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-900/30 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
          <FiPlus /> Tambah Materi
        </button>
      </div>

      {/* Grid Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEACHER_SUBJECTS.map((subject) => (
          <div
            key={subject.id}
            className="group relative bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-6 border border-slate-200 dark:border-indigo-900/20 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
          >
            {/* Top Info */}
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-14 h-14 ${subject.color} rounded-3xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-6 transition-transform`}
              >
                <FiBookOpen />
              </div>
              <button
                title="info"
                className="p-2 text-slate-300 hover:text-indigo-500 transition-colors"
              >
                <FiMoreVertical size={20} />
              </button>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
                {subject.name}
              </h3>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
                {subject.class}
              </p>
            </div>

            {/* Stats Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <FiUsers className="text-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {subject.studentsCount} Siswa
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <FiClock className="text-indigo-500" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">
                  {subject.nextSync}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-slate-400 italic">
                  Kurikulum
                </span>
                <span className="text-[9px] font-black text-indigo-500">
                  {subject.progress}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-indigo-950/40 rounded-full overflow-hidden">
                <div
                  className={`h-full ${subject.color} transition-all duration-1000 ease-out w-${subject.progress}%`}
                />
              </div>
            </div>

            {/* Hover Action */}
            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-full py-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-indigo-600 hover:text-white transition-all">
                Buka Kelas Digital
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card (Ghost Style) */}
        <button className="border-2 border-dashed border-slate-200 dark:border-indigo-900/20 rounded-[2.5rem] p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all group">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 dark:border-indigo-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiPlus size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest italic">
            Tambah Mapel Baru
          </span>
        </button>
      </div>
    </div>
  );
};

export default SubjectManager;
