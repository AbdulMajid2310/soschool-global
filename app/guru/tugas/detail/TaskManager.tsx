"use client";

import React from 'react';
import { 
  FiFolder, FiPlus, FiClock, FiCheckCircle, 
  FiAlertCircle, FiMoreVertical, FiSend, FiFileText 
} from 'react-icons/fi';

export interface Task {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  submitted: number;
  totalStudents: number;
  status: 'active' | 'closed' | 'reviewing';
}

export const TEACHER_TASKS: Task[] = [
  { id: '1', title: 'Implementasi Autentikasi JWT', subject: 'Informatika', class: '12 - RPL 1', dueDate: 'Besok, 23:59', submitted: 28, totalStudents: 32, status: 'active' },
  { id: '2', title: 'Desain Database E-Commerce', subject: 'Basis Data', class: '11 - RPL 2', dueDate: '05 Feb 2026', submitted: 12, totalStudents: 30, status: 'active' },
  { id: '3', title: 'Struktur Data Stack & Queue', subject: 'Algoritma', class: '10 - IPA 1', dueDate: '30 Jan 2026', submitted: 32, totalStudents: 32, status: 'reviewing' },
];

const TaskManager = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic mb-1">Kurikulum</h3>
          <p className="text-xl font-black italic uppercase text-slate-900 dark:text-white">Daftar Penugasan Siswa</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
          <FiPlus /> Buat Tugas Baru
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {TEACHER_TASKS.map((task) => {
          const progress = (task.submitted / task.totalStudents) * 100;
          const isUrgent = task.dueDate.includes('Besok');

          return (
            <div key={task.id} className="group bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-indigo-900/20 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative overflow-hidden">
              
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${isUrgent ? 'bg-rose-500' : 'bg-indigo-500'}`} />

              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner
                  ${task.status === 'reviewing' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
                  <FiFileText />
                </div>
                <button className="text-slate-300 hover:text-indigo-500 transition-colors">
                  <FiMoreVertical size={20} />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-tight">
                  {task.title}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {task.subject} <span className="mx-1">•</span> {task.class}
                </p>
              </div>

              {/* Status & Deadline */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase italic tracking-widest
                  ${isUrgent ? 'text-rose-500' : 'text-slate-400'}`}>
                  <FiClock /> {task.dueDate}
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase italic tracking-widest text-emerald-500">
                  <FiCheckCircle /> {task.status}
                </div>
              </div>

              {/* Submission Progress */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[9px] font-black uppercase text-slate-400 italic">Pengumpulan</p>
                  <p className="text-xs font-black italic text-slate-900 dark:text-white">
                    {task.submitted}<span className="text-slate-400">/{task.totalStudents}</span>
                  </p>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-indigo-950/40 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${isUrgent ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-indigo-600'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Hover Actions */}
              <div className="mt-8 pt-6 border-t border-slate-50 dark:border-indigo-900/10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                <button className="flex-1 py-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-widest italic hover:bg-indigo-600 hover:text-white transition-all">
                  Koreksi
                </button>
                <button className="px-4 py-3 bg-slate-50 dark:bg-indigo-950/30 text-slate-400 rounded-xl hover:text-rose-500 transition-all" title="Kirim Pengingat">
                  <FiSend size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;