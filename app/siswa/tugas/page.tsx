"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { 
  FiFileText, FiClock, FiCheckCircle, FiAlertCircle, 
  FiChevronRight, FiCalendar, FiUser, FiXCircle 
} from 'react-icons/fi';

// 1. DATA TUGAS YANG DIPERBANYAK & DIPERLENGKAP
const TASKS_DATA = [
  { 
    id: 1, subject: "Matematika", teacher: "Drs. Mulyadi", 
    title: "Latihan Integral Subtitusi", deadline: "2026-01-28T18:00:00", 
    status: "pending", type: "Tugas", priority: "high" 
  },
  { 
    id: 2, subject: "Fisika", teacher: "Ibu Ratna, M.Pd", 
    title: "Laporan Praktikum Kalor", deadline: "2026-02-02T23:59:00", 
    status: "pending", type: "Laporan", priority: "medium" 
  },
  { 
    id: 3, subject: "B. Inggris", teacher: "Ms. Jane Doe", 
    title: "Kuis Vocabulary Unit 4", deadline: "2026-01-29T10:00:00", 
    status: "submitted", type: "Kuis", priority: "high" 
  },
  { 
    id: 4, subject: "Biologi", teacher: "Bpk. Bambang", 
    title: "Gambar Struktur Sel Hewan", deadline: "2026-01-25T14:00:00", 
    status: "graded", score: 95, type: "Tugas", priority: "low" 
  },
  { 
    id: 5, subject: "Kimia", teacher: "Ibu Siti Aminah", 
    title: "Persamaan Reaksi Redoks", deadline: "2026-01-27T07:00:00", 
    status: "pending", type: "Tugas", priority: "high" // Ini akan terdeteksi Telat
  },
  { 
    id: 6, subject: "Sejarah", teacher: "Bpk. Hermawan", 
    title: "Analisis Perang Diponegoro", deadline: "2026-02-10T12:00:00", 
    status: "pending", type: "Esai", priority: "low" 
  },
  { 
    id: 7, subject: "TIK", teacher: "Majid (Admin)", 
    title: "Dasar Pemrograman Next.js", deadline: "2026-02-05T16:00:00", 
    status: "submitted", type: "Proyek", priority: "medium" 
  },
];

const AssignmentCenter = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const now = new Date();
  const router = useRouter()

  // 2. LOGIKA DEADLINE CHECKER
  const getDeadlineStatus = (deadlineStr: string, status: string) => {
    const deadline = new Date(deadlineStr);
    const diffInHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (status !== 'pending') return { label: "Selesai", color: "text-green-500", icon: <FiCheckCircle /> };
    if (diffInHours < 0) return { label: "Terlambat", color: "text-red-500", icon: <FiXCircle /> };
    if (diffInHours < 24) return { label: "Deadline Hari Ini", color: "text-orange-500", icon: <FiAlertCircle className="animate-pulse" /> };
    return { label: "Mendatang", color: "text-blue-500", icon: <FiClock /> };
  };

  // 3. FILTERING DATA
  const filteredTasks = TASKS_DATA.filter((task) => {
    const deadline = new Date(task.deadline);
    const isOverdue = deadline < now && task.status === 'pending';

    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending' && !isOverdue;
    if (filter === 'completed') return task.status === 'submitted' || task.status === 'graded';
    if (filter === 'overdue') return isOverdue;
    return true;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
            Assignment <span className="text-blue-600">Hub</span>
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2 pl-1">
            Total {TASKS_DATA.length} Aktivitas Ditemukan
          </p>
        </div>

        <div className="flex flex-wrap bg-white dark:bg-gray-900 p-1.5 rounded-4xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <FilterTab active={filter === 'all'} onClick={() => setFilter('all')} label="Semua" />
          <FilterTab active={filter === 'pending'} onClick={() => setFilter('pending')} label="Belum Selesai" />
          <FilterTab active={filter === 'overdue'} onClick={() => setFilter('overdue')} label="Terlambat" color="text-red-500" />
          <FilterTab active={filter === 'completed'} onClick={() => setFilter('completed')} label="Selesai" />
        </div>
      </div>

      {/* TASK LIST */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const dStatus = getDeadlineStatus(task.deadline, task.status);
            return (
              <div 
                key={task.id}
                className="group bg-white dark:bg-gray-900 p-8 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
                  
                  {/* Bagian Kiri: Info Utama */}
                  <div className="flex gap-6 items-start">
                    <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-2xl shadow-sm group-hover:rotate-6 transition-transform
                      ${task.status === 'pending' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-green-50 text-green-600 dark:bg-green-900/20'}
                    `}>
                      {task.status === 'pending' ? <FiFileText /> : <FiCheckCircle />}
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                         <span className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500">
                           {task.type}
                         </span>
                         <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-tighter">
                           {task.subject}
                         </span>
                      </div>
                      <h3 className="text-xl font-black dark:text-white uppercase italic tracking-tight mb-3">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] text-orange-600 font-bold">
                               {task.teacher.charAt(0)}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">{task.teacher}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Bagian Tengah: Deadline Logic */}
                  <div className="flex flex-col justify-center lg:items-center px-8 border-l border-r border-gray-50 dark:border-gray-800">
                     <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1 ${dStatus.color}`}>
                        {dStatus.icon} {dStatus.label}
                     </div>
                     <p className="text-xs font-black dark:text-white uppercase italic">
                        {new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                     </p>
                     <p className="text-[9px] text-gray-400 font-bold">Pukul {new Date(task.deadline).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                  </div>

                  {/* Bagian Kanan: Actions/Score */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 min-w-37.5">
                    {task.status === 'graded' ? (
                       <div className="text-right">
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Final Score</p>
                          <p className="text-4xl font-black italic text-green-600 leading-none">{task.score}</p>
                       </div>
                    ) : (
                       <button onClick={()=> router.push('/siswa/tugas/detail')} className={`px-8 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg
                         ${dStatus.label === 'Terlambat' 
                           ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                           : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 hover:text-white'}
                       `}>
                          {task.status === 'submitted' ? 'Lihat Detail' : 'Kumpul Tugas'}
                       </button>
                    )}
                  </div>
                </div>

                {/* Dekorasi Background */}
                <div className={`absolute -right-4 -bottom-4 w-32 h-32 opacity-[0.02] dark:opacity-[0.05] group-hover:scale-125 transition-transform duration-700 ${dStatus.color.replace('text', 'bg')}`}>
                   {task.status === 'pending' ? <FiFileText size={120} /> : <FiCheckCircle size={120} />}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[4rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
             <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
                <FiFileText size={40} />
             </div>
             <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] italic">Tidak ada tugas ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FilterTab = ({ active, onClick, label, color }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
      ${active 
        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
        : `text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ${color || ''}`}
    `}
  >
    {label}
  </button>
);

export default AssignmentCenter;