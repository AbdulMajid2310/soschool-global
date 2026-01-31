"use client";

import React from 'react';
import { 
  FiZap, FiCalendar, FiClock, FiAlertCircle, 
  FiArrowRight, FiCheckCircle, FiTrendingUp, FiTarget 
} from 'react-icons/fi';
import { GiTrophy } from 'react-icons/gi';

const DashboardSiswa = () => {
  return (
    <div className="space-y-10 lg:pt-30 animate-in fade-in slide-in-from-bottom-5 duration-700">
      
      {/* SECTION 1: WELCOME & PRIMARY STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Card */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-4">
              Selamat Malam, <span className="text-blue-600">Siti!</span> 👋
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-8">
              Kamu telah menyelesaikan 85% target belajar minggu ini.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <StatBadge label="Kehadiran" value="98.2%" color="text-green-600" bg="bg-green-50" />
               <StatBadge label="Tugas Aktif" value="04" color="text-blue-600" bg="bg-blue-50" />
               <StatBadge label="Rata-rata" value="92.5" color="text-purple-600" bg="bg-purple-50" />
            </div>
          </div>
          <FiCheckCircle className="absolute -right-12 -bottom-12 text-gray-50 dark:text-gray-800/50 w-72 h-72 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
        </div>

        {/* Gamification Card (XP) */}
        <div className="bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                 <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.3em] mb-1">Level Progress</p>
                 <h3 className="text-5xl font-black italic mb-2 tracking-tighter">LV. 12</h3>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                    <span>2,840 XP</span>
                    <span className="opacity-60">Goal: 3,500</span>
                 </div>
                 <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-1000" style={{ width: '75%' }}></div>
                 </div>
                 <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                    Detail Leaderboard
                 </button>
              </div>
           </div>
           <GiTrophy className="absolute -right-6 -top-6 text-white/10 w-48 h-48 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
        </div>
      </div>

      {/* SECTION 2: SCHEDULE & URGENT TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Side: Schedule */}
        <div className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                 <FiCalendar className="text-blue-600"/> Jadwal Hari Ini
              </h3>
              <span className="text-[10px] font-bold text-gray-400 italic cursor-pointer hover:text-blue-600">Full Calendar</span>
           </div>
           
           <div className="space-y-4">
              <ScheduleItem subject="Matematika" time="07:30 - 09:00" room="R.301" teacher="Pak Budi" status="done" />
              <ScheduleItem subject="Fisika Quantum" time="09:30 - 11:00" room="Lab-02" teacher="Bu Ani" status="ongoing" />
              <ScheduleItem subject="B. Inggris" time="11:30 - 13:00" room="R.204" teacher="Ms. Jane" status="upcoming" />
           </div>
        </div>

        {/* Right Side: Points & Challenges */}
        <div className="space-y-6">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
                 <FiTarget className="text-red-500"/> Quest Belajar
              </h3>
           </div>

           <div className="bg-gray-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="bg-red-500 text-white text-[8px] font-black px-3 py-1 rounded-full inline-block mb-4 tracking-widest uppercase">Mendesak</div>
                 <h4 className="text-2xl font-black italic uppercase mb-2 tracking-tight">Tugas Biologi: Struktur Sel</h4>
                 <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-8">Deadline: Besok, jam 08:00 AM</p>
                 
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <FiZap className="text-yellow-400" />
                       <span className="text-sm font-black italic">+250 XP</span>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
                       Kerjakan Sekarang <FiArrowRight/>
                    </button>
                 </div>
              </div>
              <FiClock className="absolute -right-5 -bottom-5 text-white/5 w-40 h-40 group-hover:scale-110 transition-transform duration-500" />
           </div>

           <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Peringkat Sekolah</p>
                 <p className="text-2xl font-black italic uppercase tracking-tighter">Global <span className="text-blue-600">#04</span></p>
              </div>
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                 <FiTrendingUp size={24} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const StatBadge = ({ label, value, color, bg }: any) => (
  <div className={`${bg} px-6 py-4 rounded-3xl text-center border border-black/5 dark:border-white/5`}>
    <p className={`text-[9px] font-black uppercase tracking-widest ${color} mb-1`}>{label}</p>
    <p className="text-xl text-gray-700 font-bold italic tracking-tighter">{value}</p>
  </div>
);

const ScheduleItem = ({ subject, time, room, teacher, status }: any) => (
  <div className={`p-6 rounded-[2.5rem] border transition-all flex justify-between items-center ${
    status === 'ongoing' 
    ? 'bg-white dark:bg-gray-900 border-blue-500 shadow-xl scale-[1.02]' 
    : 'bg-white/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 opacity-60'
  }`}>
    <div className="flex gap-4 items-center">
       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
         status === 'ongoing' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
       }`}>
          <FiClock />
       </div>
       <div>
          <h4 className="font-black dark:text-white text-md uppercase tracking-tight italic">{subject}</h4>
          <p className="text-[9px] text-gray-400 font-bold uppercase">{time} • {room}</p>
       </div>
    </div>
    {status === 'ongoing' && (
      <span className="bg-blue-600 text-white text-[8px] font-black px-4 py-1.5 rounded-full animate-pulse uppercase tracking-widest">Sekarang</span>
    )}
    {status === 'done' && <FiCheckCircle className="text-green-500 text-xl" />}
  </div>
);

export default DashboardSiswa;