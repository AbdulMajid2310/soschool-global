"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { FaCalculator } from 'react-icons/fa';
import { 
  FiPlayCircle, FiDownload, FiSearch, FiFilter, FiFileText, FiClock,
  FiCalendar, FiHash,
  FiBookOpen,
  FiStar
} from 'react-icons/fi';
import { GiDna2, GiMicroscope, GiBookshelf, GiAtomicSlashes } from 'react-icons/gi';

const SISWA_SUBJECTS = [
  // --- SENIN ---
  { id: 1, name: "Matematika", teacher: "Drs. Mulyadi", progress: 75, icon: <FaCalculator/>, color: "text-blue-500", bg: "bg-blue-50", darkBg: "dark:bg-blue-900/20", lastTopic: "Integral Subtitusi", totalModules: 12, completedModules: 9, assignments: 2, schedule: "Senin, 07:30" },
  { id: 6, name: "Bahasa Inggris", teacher: "Ms. Sarah", progress: 60, icon: <FiBookOpen/>, color: "text-orange-500", bg: "bg-orange-50", darkBg: "dark:bg-orange-900/20", lastTopic: "Analytical Exposition", totalModules: 10, completedModules: 6, assignments: 1, schedule: "Senin, 09:30" },
  { id: 1, name: "Matematika", teacher: "Drs. Mulyadi", progress: 75, icon: <FaCalculator/>, color: "text-blue-500", bg: "bg-blue-50", darkBg: "dark:bg-blue-900/20", lastTopic: "Latihan Soal", totalModules: 12, completedModules: 9, assignments: 1, schedule: "Senin, 11:00" },
  { id: 13, name: "Ekonomi", teacher: "Ibu Linda", progress: 45, icon: <FiFileText/>, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "dark:bg-emerald-900/20", lastTopic: "Akuntansi Dasar", totalModules: 14, completedModules: 6, assignments: 3, schedule: "Senin, 13:30" },

  // --- SELASA ---
  { id: 2, name: "Fisika", teacher: "Ibu Ratna, M.Pd", progress: 40, icon: <GiAtomicSlashes/>, color: "text-purple-500", bg: "bg-purple-50", darkBg: "dark:bg-purple-900/20", lastTopic: "Termodinamika", totalModules: 10, completedModules: 4, assignments: 5, schedule: "Selasa, 07:30" },
  { id: 14, name: "Geografi", teacher: "Bpk. Kusuma", progress: 70, icon: <FiSearch/>, color: "text-cyan-600", bg: "bg-cyan-50", darkBg: "dark:bg-cyan-900/20", lastTopic: "Peta & Pemetaan", totalModules: 8, completedModules: 5, assignments: 0, schedule: "Selasa, 09:30" },
  { id: 2, name: "Fisika", teacher: "Ibu Ratna, M.Pd", progress: 40, icon: <GiAtomicSlashes/>, color: "text-purple-500", bg: "bg-purple-50", darkBg: "dark:bg-purple-900/20", lastTopic: "Praktikum Lab", totalModules: 10, completedModules: 4, assignments: 2, schedule: "Selasa, 11:00" },
  { id: 7, name: "Sejarah", teacher: "Bpk. Hermawan", progress: 85, icon: <GiBookshelf/>, color: "text-amber-600", bg: "bg-amber-50", darkBg: "dark:bg-amber-900/20", lastTopic: "Perang Dunia II", totalModules: 8, completedModules: 7, assignments: 0, schedule: "Selasa, 13:30" },

  // --- RABU ---
  { id: 3, name: "Biologi", teacher: "Bpk. Bambang", progress: 92, icon: <GiDna2/>, color: "text-green-500", bg: "bg-green-50", darkBg: "dark:bg-green-900/20", lastTopic: "Genetika Molekuler", totalModules: 8, completedModules: 7, assignments: 0, schedule: "Rabu, 07:30" },
  { id: 8, name: "Kimia", teacher: "Ibu Siti Aminah", progress: 25, icon: <GiMicroscope/>, color: "text-red-500", bg: "bg-red-50", darkBg: "dark:bg-red-900/20", lastTopic: "Laju Reaksi", totalModules: 15, completedModules: 3, assignments: 2, schedule: "Rabu, 09:30" },
  { id: 3, name: "Biologi", teacher: "Bpk. Bambang", progress: 92, icon: <GiDna2/>, color: "text-green-500", bg: "bg-green-50", darkBg: "dark:bg-green-900/20", lastTopic: "Bedah Katak", totalModules: 8, completedModules: 7, assignments: 1, schedule: "Rabu, 11:00" },
  { id: 9, name: "Olahraga", teacher: "Coach Pratama", progress: 100, icon: <FiPlayCircle/>, color: "text-sky-500", bg: "bg-sky-50", darkBg: "dark:bg-sky-900/20", lastTopic: "Basket", totalModules: 5, completedModules: 5, assignments: 0, schedule: "Rabu, 13:30" },

  // --- KAMIS ---
  { id: 15, name: "Sosiologi", teacher: "Ibu Diana", progress: 65, icon: <FiFilter/>, color: "text-rose-500", bg: "bg-rose-50", darkBg: "dark:bg-rose-900/20", lastTopic: "Konflik Sosial", totalModules: 10, completedModules: 6, assignments: 2, schedule: "Kamis, 07:30" },
  { id: 4, name: "Kimia", teacher: "Ibu Siti Aminah", progress: 25, icon: <GiMicroscope/>, color: "text-red-500", bg: "bg-red-50", darkBg: "dark:bg-red-900/20", lastTopic: "Senyawa Karbon", totalModules: 15, completedModules: 3, assignments: 3, schedule: "Kamis, 09:30" },
  { id: 10, name: "Seni Budaya", teacher: "Ibu Melati", progress: 55, icon: <FiStar/>, color: "text-pink-500", bg: "bg-pink-50", darkBg: "dark:bg-pink-900/20", lastTopic: "Seni Lukis", totalModules: 6, completedModules: 3, assignments: 1, schedule: "Kamis, 11:00" },
  { id: 16, name: "B. Indonesia", teacher: "Bpk. Satria", progress: 80, icon: <FiFileText/>, color: "text-slate-600", bg: "bg-slate-50", darkBg: "dark:bg-slate-900/20", lastTopic: "Teks Prosedur", totalModules: 12, completedModules: 9, assignments: 0, schedule: "Kamis, 13:30" },

  // --- JUMAT ---
  { id: 11, name: "Agama", teacher: "Ustadz Hanafi", progress: 80, icon: <FiCalendar/>, color: "text-teal-600", bg: "bg-teal-50", darkBg: "dark:bg-teal-900/20", lastTopic: "Sejarah Islam", totalModules: 12, completedModules: 10, assignments: 0, schedule: "Jumat, 07:30" },
  { id: 12, name: "Informatika", teacher: "Bpk. Majid", progress: 10, icon: <GiAtomicSlashes/>, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "dark:bg-indigo-900/20", lastTopic: "Tailwind v4", totalModules: 20, completedModules: 2, assignments: 8, schedule: "Jumat, 09:00" },
  { id: 12, name: "Informatika", teacher: "Bpk. Majid", progress: 10, icon: <GiAtomicSlashes/>, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "dark:bg-indigo-900/20", lastTopic: "Next.js 15", totalModules: 20, completedModules: 2, assignments: 4, schedule: "Jumat, 10:30" },
  { id: 17, name: "BK", teacher: "Ibu Rina", progress: 100, icon: <FiStar/>, color: "text-lime-600", bg: "bg-lime-50", darkBg: "dark:bg-lime-900/20", lastTopic: "Minat Bakat", totalModules: 4, completedModules: 4, assignments: 0, schedule: "Jumat, 13:30" },
];

const AkademikSiswa = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDay, setActiveDay] = useState("Semua");

  const days = ["Semua", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  // LOGIC: Grouping & Filtering
  const filteredAndGroupedSubjects = useMemo(() => {
    let filtered = SISWA_SUBJECTS.filter(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (activeDay !== "Semua") {
      filtered = filtered.filter(sub => sub.schedule.startsWith(activeDay));
    }

    // Mengurutkan berdasarkan jam di dalam hari tersebut
    return filtered.sort((a, b) => {
      const timeA = a.schedule.split(', ')[1];
      const timeB = b.schedule.split(', ')[1];
      return timeA.localeCompare(timeB);
    });
  }, [searchQuery, activeDay]);

  return (
    <div className="space-y-10 lg:pt-30 pt-20 animate-in fade-in slide-in-from-right-5 duration-700 pb-20">
      
      {/* 1. HEADER & GLOBAL STATS */}
      <div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                <GiBookshelf size={24} />
             </div>
             <h2 className="lg:text-4xl text-xl font-black italic uppercase tracking-tighter dark:text-white">
               <span className="text-blue-600">Jadwal Pelajaran</span>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] pl-1">
            Manajemen Waktu & Aktivitas Kelas • 2026
          </p>
             </h2>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        
        
        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
          {/* Search */}
          <div className="relative flex-1 md:min-w-75">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Mata Pelajaran..." 
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>

          {/* Day Filter - Horizontal Scrollable */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide bg-white dark:bg-gray-900 p-2 rounded-3xl border border-gray-100 dark:border-gray-800">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeDay === day 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" 
                  : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SUBJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredAndGroupedSubjects.length > 0 ? (
          filteredAndGroupedSubjects.map((sub) => (
            <div 
              key={`${sub.id}-${sub.schedule}`} // Key unik karena id bisa sama di hari yang berbeda
              className="group bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col h-full"
            >
              {/* Jam Kuliah Badge */}
              <div className="absolute top-0 right-0">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-bl-3xl text-[9px] font-black italic tracking-tighter">
                  {sub.schedule.split(', ')[1]}
                </div>
              </div>

              {/* Icon Section */}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-16 h-16 ${sub.bg} ${sub.darkBg} ${sub.color} rounded-4xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                  {sub.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                    {sub.name}
                  </h3>
                  {/* Penanda sesi jika ada 2 pelajaran sama */}
                  {SISWA_SUBJECTS.filter(s => s.name === sub.name && s.schedule.startsWith(sub.schedule.split(',')[0])).length > 1 && (
                    <div className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[8px] font-black rounded-lg">SESI</div>
                  )}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  {sub.teacher}
                </p>
                
                {/* Time Indicator Card */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800 mb-4 flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm text-blue-600">
                    <FiClock size={14} />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Jadwal Pelajaran</p>
                    <p className="text-[10px] font-black dark:text-white uppercase italic">{sub.schedule}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-gray-400 flex items-center gap-1"><FiHash size={10}/> Last Topic</span>
                    <span className="text-blue-600 italic truncate max-w-24">{sub.lastTopic}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sub.color.replace('text', 'bg')} rounded-full transition-all duration-1000`} 
                      style={{ width: `${sub.progress}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center relative z-10">
                <button className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                  <FiDownload /> Silabus
                </button>
                <button 
                  onClick={() => router.push('/siswa/akademik/detail')}
                  className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                >
                  Masuk Kelas
                </button>
              </div>

              <div className={`absolute -right-10 -bottom-10 w-44 h-44 ${sub.color} opacity-[0.03] dark:opacity-[0.05] group-hover:scale-150 group-hover:-rotate-12 transition-all duration-1000`}>
                {sub.icon}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-900/50 rounded-4xl border-2 border-dashed border-gray-100 dark:border-gray-800">
            <FiCalendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Tidak ada jadwal pelajaran untuk hari ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AkademikSiswa;