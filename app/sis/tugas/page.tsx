"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { 
  FiFileText, FiClock, FiCheckCircle, FiAlertCircle, 
  FiCalendar, FiUser, FiXCircle, FiTarget
} from 'react-icons/fi';

// 1. DATA TUGAS
const TASKS_DATA = [
  { id: 1, subject: "Matematika", teacher: "Drs. Mulyadi", title: "Latihan Integral Subtitusi", deadline: "2026-02-01T18:00:00", status: "pending", type: "Tugas", priority: "high" },
  { id: 2, subject: "Fisika", teacher: "Ibu Ratna, M.Pd", title: "Laporan Praktikum Kalor", deadline: "2026-02-05T23:59:00", status: "pending", type: "Laporan", priority: "medium" },
  { id: 3, subject: "B. Inggris", teacher: "Ms. Jane Doe", title: "Kuis Vocabulary Unit 4", deadline: "2026-02-02T10:00:00", status: "submitted", type: "Kuis", priority: "high" },
  { id: 4, subject: "Biologi", teacher: "Bpk. Bambang", title: "Gambar Struktur Sel Hewan", deadline: "2026-01-25T14:00:00", status: "graded", score: 95, type: "Tugas", priority: "low" },
  { id: 7, subject: "TIK", teacher: "Bpk. Majid", title: "Dasar Pemrograman Next.js 15", deadline: "2026-02-05T16:00:00", status: "submitted", type: "Proyek", priority: "medium" },
  { id: 8, subject: "Informatika", teacher: "Bpk. Majid", title: "Slicing UI Tailwind v4", deadline: "2026-02-01T23:59:00", status: "pending", type: "Praktikum", priority: "high" },
];

const AssignmentHub = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const now = new Date();
  const router = useRouter();

  const getTaskMeta = (deadlineStr: string, status: string) => {
    const deadline = new Date(deadlineStr);
    const diff = deadline.getTime() - now.getTime();
    const isOverdue = diff < 0 && status === 'pending';

    if (status === 'graded' || status === 'submitted') return { label: "Completed", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: <FiCheckCircle /> };
    if (isOverdue) return { label: "Terlambat", color: "text-red-500", bg: "bg-red-500/10", icon: <FiXCircle /> };
    if (diff < 86400000) return { label: "Urgent", color: "text-orange-500", bg: "bg-orange-500/10", icon: <FiAlertCircle className="animate-pulse" /> };
    return { label: "On Track", color: "text-blue-500", bg: "bg-blue-500/10", icon: <FiClock /> };
  };

  const filteredTasks = useMemo(() => {
    return TASKS_DATA.filter((task) => {
      const isOverdue = new Date(task.deadline) < now && task.status === 'pending';
      if (filter === 'all') return true;
      if (filter === 'pending') return task.status === 'pending' && !isOverdue;
      if (filter === 'completed') return task.status === 'submitted' || task.status === 'graded';
      if (filter === 'overdue') return isOverdue;
      return true;
    }).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  }, [filter]);

  return (
    <div className="space-y-10 lg:pt-30 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-2">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
            Assignment <span className="text-blue-600">Hub</span>
          </h2>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
             <FiTarget className="text-blue-600" /> Target: {TASKS_DATA.filter(t => t.status !== 'pending').length}/{TASKS_DATA.length} Selesai
          </span>
        </div>

        {/* Filter Tab v4 Style */}
        <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-4xl border border-gray-200 dark:border-white/5 overflow-x-auto w-full md:w-auto">
          <FilterTab active={filter === 'all'} onClick={() => setFilter('all')} label="Semua" />
          <FilterTab active={filter === 'pending'} onClick={() => setFilter('pending')} label="Pending" />
          <FilterTab active={filter === 'overdue'} onClick={() => setFilter('overdue')} label="Terlambat" variant="danger" />
          <FilterTab active={filter === 'completed'} onClick={() => setFilter('completed')} label="Selesai" />
        </div>
      </div>

      {/* LIST TUGAS */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const meta = getTaskMeta(task.deadline, task.status);
            return (
              <div key={task.id} className="group relative bg-white dark:bg-gray-900/50 rounded-6xl p-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-xl shadow-black/2">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                  
                  {/* Info Utama */}
                  <div className="flex gap-8 items-center flex-1">
                    <div className={`w-20 h-20 rounded-4xl flex items-center justify-center text-3xl transition-transform duration-500 group-hover:rotate-12 ${meta.bg} ${meta.color}`}>
                      {task.status === 'pending' ? <FiFileText /> : <FiCheckCircle />}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500">
                          {task.type}
                        </span>
                        <span className="text-xs font-black text-blue-600 uppercase italic tracking-tighter">
                          {task.subject}
                        </span>
                      </div>
                      <h3 className="text-2xl  font-black dark:text-white uppercase italic tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs text-blue-600 font-black">
                          {task.teacher.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{task.teacher}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deadline Section */}
                  <div className="flex flex-col justify-center lg:items-center px-10 border-y lg:border-y-0 lg:border-x border-gray-100 dark:border-white/5 py-6 lg:py-0">
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </div>
                    <div className="text-center lg:text-left">
                       <p className="text-lg font-black dark:text-white uppercase italic leading-none mb-1">
                         {new Date(task.deadline).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                       </p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                         Pukul {new Date(task.deadline).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                       </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-end min-w-45">
                    {task.status === 'graded' ? (
                      <div className="text-right bg-emerald-500/5 px-8 py-4 rounded-4xl border border-emerald-500/10">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1 text-center">Final Score</p>
                        <p className="text-5xl font-black italic text-emerald-600 leading-none">{task.score}</p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => router.push(`/siswa/tugas/detail`)}
                        className={`w-full lg:w-auto px-10 py-5 rounded-4xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-black/10 active:scale-95
                        ${meta.label === 'Terlambat' 
                          ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed opacity-50' 
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 hover:text-white'}
                        `}
                      >
                        {task.status === 'submitted' ? 'Review Detail' : 'Submit Now'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-40 bg-gray-50/50 dark:bg-white/2 rounded-6xl border-4 border-dashed border-gray-100 dark:border-white/5">
            <FiFileText size={60} className="mx-auto text-gray-200 mb-6" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest italic">No missions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterTab = ({ active, onClick, label, variant }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3.5 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
      ${active 
        ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl shadow-black/5' 
        : variant === 'danger' ? 'text-red-400 hover:text-red-500' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}
    `}
  >
    {label}
  </button>
);

export default AssignmentHub;