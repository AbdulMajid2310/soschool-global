"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { 
  FiClock, FiCoffee, FiUser, FiMapPin, 
  FiCalendar, FiChevronRight, FiActivity, FiArrowRight, FiInfo
} from 'react-icons/fi';

// 1. Typescript Interface
interface ScheduleItem {
  jam: string;
  range: string;
  subject: string;
  teacherCode: string;
  type: 'Pelajaran' | 'Istirahat';
  category: string;
}

// 2. Data Master XII-6
const XII6_MASTER_DATA: Record<string, ScheduleItem[]> = {
  "Senin": [
    { jam: "1-2", range: "07:00 - 08:30", subject: "Agama Islam", teacherCode: "54", type: "Pelajaran", category: "Wajib" },
    { jam: "3-4", range: "08:30 - 10:00", subject: "Ekonomi", teacherCode: "18", type: "Pelajaran", category: "Peminatan" },
    { jam: "Rest", range: "10:00 - 10:20", subject: "Istirahat I", teacherCode: "-", type: "Istirahat", category: "Jeda" },
    { jam: "5-6", range: "10:20 - 11:50", subject: "Ekonomi", teacherCode: "18", type: "Pelajaran", category: "Peminatan" },
    { jam: "Rest", range: "11:50 - 12:30", subject: "Ishoma", teacherCode: "-", type: "Istirahat", category: "Jeda" },
    { jam: "7-8", range: "12:30 - 13:50", subject: "Sosiologi", teacherCode: "10", type: "Pelajaran", category: "Peminatan" },
    { jam: "9-10", range: "13:50 - 15:10", subject: "Matematika", teacherCode: "04", type: "Pelajaran", category: "Wajib" },
  ],
  "Selasa": [
    { jam: "1-2", range: "07:00 - 08:30", subject: "PKwU", teacherCode: "50", type: "Pelajaran", category: "Produk Kreatif" },
    { jam: "3-4", range: "08:30 - 10:00", subject: "B. Inggris Lanjut", teacherCode: "13", type: "Pelajaran", category: "Bahasa" },
    { jam: "Rest", range: "10:00 - 10:20", subject: "Istirahat I", teacherCode: "-", type: "Istirahat", category: "Jeda" },
    { jam: "5-6", range: "10:20 - 11:50", subject: "Pancasila", teacherCode: "24", type: "Pelajaran", category: "Wajib" },
    { jam: "7-8", range: "12:30 - 13:50", subject: "Seni Budaya", teacherCode: "22", type: "Pelajaran", category: "Seni" },
  ],
  "Rabu": [
    { jam: "1-3", range: "07:00 - 09:15", subject: "PJOK", teacherCode: "20", type: "Pelajaran", category: "Olahraga" },
    { jam: "4-5", range: "09:15 - 11:05", subject: "Matematika", teacherCode: "04", type: "Pelajaran", category: "Wajib" },
    { jam: "Rest", range: "10:00 - 10:20", subject: "Istirahat I", teacherCode: "-", type: "Istirahat", category: "Jeda" },
    { jam: "6-8", range: "11:05 - 13:50", subject: "B. Indonesia Lanjut", teacherCode: "27", type: "Pelajaran", category: "Bahasa" },
  ],
  "Kamis": [
    { jam: "1-3", range: "07:00 - 09:15", subject: "Sejarah", teacherCode: "05", type: "Pelajaran", category: "Wajib" },
    { jam: "4-5", range: "09:15 - 11:05", subject: "B. Indonesia", teacherCode: "35", type: "Pelajaran", category: "Wajib" },
    { jam: "6-8", range: "11:05 - 13:50", subject: "B. Inggris Lanjut", teacherCode: "13", type: "Pelajaran", category: "Bahasa" },
  ],
  "Jumat": [
    { jam: "1-3", range: "07:00 - 09:00", subject: "Sosiologi", teacherCode: "10", type: "Pelajaran", category: "Peminatan" },
    { jam: "4-6", range: "09:00 - 11:20", subject: "B. Inggris", teacherCode: "03", type: "Pelajaran", category: "Bahasa" },
    { jam: "7-8", range: "11:20 - 12:30", subject: "B. Indonesia Lanjut", teacherCode: "27", type: "Pelajaran", category: "Bahasa" },
  ],
};

export default function SoSchoolOptimizedUI() {
    const router = useRouter()
  const [selectedDay, setSelectedDay] = useState<string>("Senin");
  const currentSchedule = XII6_MASTER_DATA[selectedDay] || [];

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* --- HEADER --- */}
      <header className="relative pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          
          <div className="space-y-8 flex-1">
            <div className="flex items-center gap-3">
              <div className="px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic shadow-lg shadow-indigo-500/20">
                Live SoSchool
              </div>
              <div className="h-px w-12 bg-slate-200 dark:bg-white/10" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Monitoring Akademik</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase italic">
              Pantau <br /> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-white">Cerdas.</span>
            </h1>
            
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg italic leading-relaxed">
              Jadwal sesi XII-6 untuk <span className="text-indigo-600 font-black">Majid</span> hari ini.
            </p>
          </div>

          {/* Kartu Status (Optimized min-w-60) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none min-w-60">
               <div className="flex items-center gap-2 mb-4">
                  <FiActivity className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Kehadiran</span>
               </div>
               <p className="text-4xl font-black italic tracking-tighter uppercase leading-none">Hadir</p>
               <p className="text-[11px] text-emerald-500 font-bold mt-2 italic">06:58 WIB</p>
            </div>
            <div className="bg-slate-900 dark:bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-500/30 min-w-60">
               <div className="flex items-center gap-2 mb-4 opacity-70">
                  <FiMapPin />
                  <span className="text-[10px] font-black uppercase tracking-widest">Lokasi</span>
               </div>
               <p className="text-4xl font-black italic tracking-tighter uppercase leading-none">XII-6</p>
               <p className="text-[11px] text-indigo-200 font-bold mt-2 italic tracking-wide">Gedung B • Lt. 2</p>
            </div>
          </div>
        </div>
      </header>

      {/* --- NAVIGASI HARI --- */}
      <nav className="sticky top-0 z-50 bg-[#fcfcfd]/80 dark:bg-slate-950/80 backdrop-blur-xl py-6 border-b border-slate-200/50 dark:border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {Object.keys(XII6_MASTER_DATA).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase italic tracking-widest transition-all
                  ${selectedDay === day 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-105' 
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- GRID JADWAL (Optimized dark:bg-white/2) --- */}
      <main className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {currentSchedule.map((item, idx) => (
            <div 
              key={`${selectedDay}-${idx}`}
              onClick={()=> router.push('/wali-murid/agenda/detail')}
              className={`group relative flex flex-col p-1 transition-all duration-500 hover:-translate-y-4
                ${item.type === 'Istirahat' ? 'opacity-70' : ''}`}
            >
              <div className={`h-full flex flex-col justify-between p-10 rounded-[4rem] border transition-all duration-500
                ${item.type === 'Istirahat' 
                  ? 'bg-slate-100 dark:bg-white/2 border-dashed border-slate-300 dark:border-white/10' 
                  : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-white/5 shadow-xs hover:shadow-3xl hover:shadow-indigo-500/10'}`}
              >
                {/* Waktu */}
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                          <FiClock size={20} />
                       </div>
                       <span className="text-3xl font-black italic tracking-tighter dark:text-white">
                         {item.range.split(' - ')[0]}
                       </span>
                    </div>
                  </div>

                  {/* Pelajaran */}
                  <div className="space-y-4">
                    <h3 className={`text-4xl font-black italic uppercase tracking-tighter leading-[0.85] transition-colors
                      ${item.type === 'Istirahat' ? 'text-slate-400' : 'text-slate-900 dark:text-white group-hover:text-indigo-600'}`}>
                      {item.subject}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                  </div>
                </div>

                {/* Footer Kartu */}
                <div className="mt-14 flex items-end justify-between">
                  {item.teacherCode !== '-' ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                         {item.teacherCode}
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-white/5 flex items-center justify-center text-amber-500">
                       <FiCoffee size={24} />
                    </div>
                  )}
                  
                  <button className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white">
                     <FiArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}