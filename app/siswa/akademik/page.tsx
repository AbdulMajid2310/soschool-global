"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCalculator } from 'react-icons/fa';
import { 
  FiBookOpen, FiPlayCircle, FiDownload, FiChevronRight, 
  FiSearch, FiFilter, FiStar, FiFileText, FiClock,
  FiCalendar
} from 'react-icons/fi';
import { GiDna2, GiMicroscope, GiBookshelf, GiAtomicSlashes } from 'react-icons/gi';

// Data yang lebih lengkap untuk simulasi database
const SISWA_SUBJECTS = [
  { 
    id: 1, 
    name: "Matematika", 
    teacher: "Drs. Mulyadi", 
    progress: 75, 
    icon: <FaCalculator/>, 
    color: "text-blue-500", 
    bg: "bg-blue-50",
    darkBg: "dark:bg-blue-900/20",
    lastTopic: "Integral Subtitusi",
    totalModules: 12,
    completedModules: 9,
    assignments: 2,
    schedule: "Senin, 07:30"
  },
  { 
    id: 2, 
    name: "Fisika", 
    teacher: "Ibu Ratna, M.Pd", 
    progress: 40, 
    icon: <GiAtomicSlashes/>, 
    color: "text-purple-500", 
    bg: "bg-purple-50",
    darkBg: "dark:bg-purple-900/20",
    lastTopic: "Termodinamika",
    totalModules: 10,
    completedModules: 4,
    assignments: 5,
    schedule: "Selasa, 09:30"
  },
  { 
    id: 3, 
    name: "Biologi", 
    teacher: "Bpk. Bambang", 
    progress: 92, 
    icon: <GiDna2/>, 
    color: "text-green-500", 
    bg: "bg-green-50",
    darkBg: "dark:bg-green-900/20",
    lastTopic: "Genetika Molekuler",
    totalModules: 8,
    completedModules: 7,
    assignments: 0,
    schedule: "Rabu, 08:00"
  },
  { 
    id: 4, 
    name: "Kimia", 
    teacher: "Ibu Siti Aminah", 
    progress: 25, 
    icon: <GiMicroscope/>, 
    color: "text-red-500", 
    bg: "bg-red-50",
    darkBg: "dark:bg-red-900/20",
    lastTopic: "Senyawa Karbon",
    totalModules: 15,
    completedModules: 3,
    assignments: 3,
    schedule: "Kamis, 10:00"
  },
];

const AkademikSiswa = () => {
    const router=useRouter()
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-5 duration-700 pb-20">
      
      {/* 1. HEADER & GLOBAL STATS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                <GiBookshelf size={24} />
             </div>
             <h2 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white">
                My <span className="text-blue-600">Courses</span>
             </h2>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] pl-1">
            Kurikulum Merdeka • Semester Ganjil 2026
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          {/* Filter & Search Group */}
          <div className="relative flex-1 md:min-w-75">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari Mata Pelajaran..." 
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>
          <button className="p-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-blue-600 transition-all hover:shadow-lg">
            <FiFilter size={20} />
          </button>
        </div>
      </div>

      {/* 2. SUBJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {SISWA_SUBJECTS.map((sub) => (
          <div 
            key={sub.id} 
            className="group bg-white dark:bg-gray-900 rounded-[3.5rem] p-8 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            
            {/* Header: Icon & Badges */}
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className={`w-16 h-16 ${sub.bg} ${sub.darkBg} ${sub.color} rounded-4xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                {sub.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900 overflow-hidden shadow-sm">
                      <div className="w-full h-full bg-linear-to-br from-gray-400 to-gray-500" />
                    </div>
                  ))}
                </div>
                {sub.assignments > 0 && (
                   <span className="bg-red-500 text-white text-[7px] font-black px-2 py-1 rounded-lg uppercase tracking-widest animate-pulse">
                      {sub.assignments} Tugas Baru
                   </span>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1 dark:text-white leading-none">
                {sub.name}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">
                {sub.teacher}
              </p>
              
              {/* Last Activity Card */}
              <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-4xl border border-gray-100 dark:border-gray-800 mb-8 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                   <FiClock className="text-blue-600 text-[10px]" />
                   <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest">Aktivitas Terakhir</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase italic truncate pr-4 dark:text-gray-200">
                    {sub.lastTopic}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <FiPlayCircle className="text-lg" />
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="flex items-center gap-3">
                    <FiFileText className="text-gray-400" />
                    <div className="leading-none">
                       <p className="text-[10px] font-black dark:text-white">{sub.completedModules}/{sub.totalModules}</p>
                       <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Modul Selesai</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 border-l border-gray-100 dark:border-gray-800 pl-4">
                    <FiCalendar className="text-gray-400" />
                    <div className="leading-none">
                       <p className="text-[10px] font-black dark:text-white">{sub.schedule.split(',')[0]}</p>
                       <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{sub.schedule.split(',')[1]}</p>
                    </div>
                 </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-gray-400">Mastery Level</span>
                  <span className={sub.color}>{sub.progress}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full ${sub.color.replace('text', 'bg')} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,0,0,0.1)]`} 
                    style={{ width: `${sub.progress}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-10 pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center relative z-10">
              <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors group/btn">
                <FiDownload className="group-hover/btn:-translate-y-1 transition-transform" /> Silabus
              </button>
              <button onClick={()=> router.push('/siswa/akademik/detail')} className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-[9px] font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl shadow-black/5 active:scale-95">
                Masuk Kelas
              </button>
            </div>

            {/* Background Icon (Decorative) */}
            <div className={`absolute -right-10 -bottom-10 w-44 h-44 ${sub.color} opacity-[0.03] dark:opacity-[0.05] group-hover:scale-150 group-hover:-rotate-12 transition-all duration-1000`}>
              {sub.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AkademikSiswa;