"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { 
  FiArrowLeft, FiBook, FiClipboard, FiCheckCircle, 
  FiDownload, FiPlay, FiClock, FiInfo, FiStar, FiCalendar,
  FiUser
} from 'react-icons/fi';
import { GiAtomicSlashes } from 'react-icons/gi';

// DATA DETAIL MATA PELAJARAN (Internal Data)
const SUBJECT_DETAIL = {
  name: "Informatika",
  code: "INF-102",
  teacher: "Bpk. Majid",
  room: "Lab Komputer 01",
  attendance: 95, // Persentase
  totalMeetings: 16,
  attendedMeetings: 15,
  description: "Mempelajari pengembangan aplikasi modern menggunakan Next.js 15, Tailwind CSS v4, dan integrasi AI.",
  
  // Tab Materi
  modules: [
    { id: 1, title: "Pengenalan Next.js 15", type: "Video", duration: "15 min", status: "Completed", date: "24 Jan 2026" },
    { id: 2, title: "Styling dengan Tailwind CSS v4", type: "PDF", size: "2.4 MB", status: "In Progress", date: "28 Jan 2026" },
    { id: 3, title: "Manajemen State dengan React Context", type: "Video", duration: "45 min", status: "Locked", date: "02 Feb 2026" },
  ],

  // Tab Tugas
  tasks: [
    { id: 1, title: "Setup Project SoSchool", deadline: "30 Jan 2026", status: "Submitted", grade: 95 },
    { id: 2, title: "Slicing UI Dashboard Siswa", deadline: "05 Feb 2026", status: "Pending", grade: null },
  ],
  attendanceHistory: [
    { id: 1, date: "23 Jan 2026", time: "07:35", status: "Hadir", topic: "Intro to React v19", note: "Tepat Waktu" },
    { id: 2, date: "16 Jan 2026", time: "07:42", status: "Hadir", topic: "Next.js Project Structure", note: "Tepat Waktu" },
    { id: 3, date: "09 Jan 2026", time: "-", status: "Izin", topic: "Server Components", note: "Lomba Coding" },
    { id: 4, date: "02 Jan 2026", time: "07:55", status: "Hadir", topic: "Client vs Server", note: "Terlambat 5 Menit" },
    { id: 5, date: "26 Des 2025", time: "07:30", status: "Hadir", topic: "Setup Environment", note: "Tepat Waktu" },
  ]
};

const DetailMataPelajaran = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('materi'); // materi | tugas | absensi

  return (
    <div className="min-h-screen space-y-8 lg:pt-30 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* --- HEADER: Back Button & Subject Identity --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Jadwal
          </button>
          
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-blue-600 rounded-4xl flex items-center justify-center text-4xl text-white shadow-2xl shadow-blue-500/20">
              <GiAtomicSlashes />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                  {SUBJECT_DETAIL.name}
                </h1>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-lg text-[10px] font-black uppercase text-gray-500">
                  {SUBJECT_DETAIL.code}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">
                Bersama <span className="text-blue-600">{SUBJECT_DETAIL.teacher}</span> • {SUBJECT_DETAIL.room}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-gray-100 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5 w-full md:w-auto overflow-x-auto">
          {['materi', 'tugas', 'absensi'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl shadow-black/5" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* --- MAIN CONTENT (LEFT) --- */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* CONTENT BASED ON TAB */}
          {activeTab === 'materi' && (
            <div className="space-y-4">
              {SUBJECT_DETAIL.modules.map((mod) => (
                <div key={mod.id} className="group flex items-center gap-6 p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${
                    mod.status === 'Locked' ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  }`}>
                    {mod.type === 'Video' ? <FiPlay /> : <FiBook />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-1">{mod.type} • {mod.date}</p>
                    <h4 className="text-lg font-black uppercase italic dark:text-white leading-tight">{mod.title}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                      {mod.type === 'Video' ? mod.duration : mod.size}
                    </p>
                  </div>
                  <button className={`p-4 rounded-2xl transition-all ${
                    mod.status === 'Locked' ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 hover:text-white shadow-lg'
                  }`}>
                    {mod.status === 'Locked' ? <FiClock /> : mod.type === 'Video' ? <FiPlay /> : <FiDownload />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tugas' && (
            <div className="space-y-4">
              {SUBJECT_DETAIL.tasks.map((task) => (
                <div key={task.id} className="p-6 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-xl font-black uppercase italic dark:text-white leading-tight">{task.title}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Deadline: {task.deadline}</p>
                    </div>
                    {task.grade && (
                      <div className="text-right">
                        <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Nilai Akhir</p>
                        <p className="text-2xl font-black italic text-emerald-500">{task.grade}/100</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      task.status === 'Submitted' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {task.status}
                    </span>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                      <FiClipboard /> Buka Lembar Kerja
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

         {activeTab === 'absensi' && (
  <div className="space-y-6">
    {/* Summary Card */}
    <div className="p-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-10">
      <div className="relative inline-block">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-white/5" />
          <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" 
            strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * SUBJECT_DETAIL.attendance) / 100}
            className="text-blue-600" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black italic dark:text-white">{SUBJECT_DETAIL.attendance}%</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <h4 className="text-xl font-black uppercase italic dark:text-white leading-none">Kehadiran Kamu Sangat Baik!</h4>
          <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-2">
            Telah hadir di {SUBJECT_DETAIL.attendedMeetings} dari {SUBJECT_DETAIL.totalMeetings} pertemuan semester ini.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
           <div className="px-5 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Hadir</p>
              <p className="text-lg font-black dark:text-white leading-none">{SUBJECT_DETAIL.attendedMeetings}</p>
           </div>
           <div className="px-5 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Izin/Sakit</p>
              <p className="text-lg font-black dark:text-white leading-none">1</p>
           </div>
           <div className="px-5 py-3 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Alpa</p>
              <p className="text-lg font-black text-red-500 leading-none">0</p>
           </div>
        </div>
      </div>
    </div>

    {/* Detail History List */}
    <div className="overflow-hidden bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-white/5">
      <div className="p-6 border-b border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-white/2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
          <FiCalendar className="text-blue-600" /> Riwayat Kehadiran Per Sesi
        </h4>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-white/5">
        {SUBJECT_DETAIL.attendanceHistory.map((history) => (
          <div key={history.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors">
            <div className="flex items-center gap-6">
              <div className="text-center min-w-15">
                <p className="text-xs font-black dark:text-white leading-none">{history.date.split(' ')[0]}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{history.date.split(' ').slice(1).join(' ')}</p>
              </div>
              <div className="h-10 w-px bg-gray-100 dark:bg-white/10 hidden md:block" />
              <div>
                <p className="text-sm font-black italic uppercase dark:text-gray-200">{history.topic}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1">
                    <FiClock className="text-blue-500" /> {history.time}
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1">
                    <FiInfo className="text-orange-500" /> {history.note}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end">
              <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                history.status === 'Hadir' ? 'bg-emerald-100 text-emerald-600' : 
                history.status === 'Izin' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
              }`}>
                {history.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        </div>

        {/* --- SIDEBAR INFO (RIGHT) --- */}
        <div className="space-y-6">
          <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
            <FiInfo className="absolute -right-4 -top-4 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <FiStar /> Informasi Kursus
            </h4>
            <p className="text-xs font-bold leading-relaxed opacity-90 italic">
              "{SUBJECT_DETAIL.description}"
            </p>
            <div className="mt-8 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><FiUser /></div>
                  <div>
                    <p className="text-[8px] font-black uppercase opacity-60">Instruktur</p>
                    <p className="text-xs font-black uppercase tracking-widest">{SUBJECT_DETAIL.teacher}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><FiCalendar /></div>
                  <div>
                    <p className="text-[8px] font-black uppercase opacity-60">Jadwal Rutin</p>
                    <p className="text-xs font-black uppercase tracking-widest">Setiap Jumat, 09:30</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
              <FiCheckCircle className="text-emerald-500" /> Progres Belajar
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-black uppercase tracking-widest dark:text-white">Materi Selesai</p>
                <p className="text-xl font-black italic text-blue-600">65%</p>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden p-1">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase italic">Tinggal 4 modul lagi menuju sertifikat!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMataPelajaran;