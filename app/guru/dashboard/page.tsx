"use client";

import React from 'react';
import { 
  FiActivity, FiBookOpen, FiUsers, FiCpu, 
  FiAlertCircle, FiCheckCircle, FiTrendingUp, FiClock,
  FiStar, FiTarget, FiMessageSquare
} from 'react-icons/fi';

const GuruUnifiedDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Welcome & Quick Snapshot */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-6 px-4">
        <div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Teacher <span className="text-indigo-600">Command</span> Center
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-3 italic flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
            Majid, S.Kom • Monday, Feb 01, 2026
          </p>
        </div>
        <div className="flex gap-3">
           <div className="px-6 py-3 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/5 rounded-2xl">
              <p className="text-[8px] font-black text-slate-400 uppercase leading-none mb-1">Teaching Hours</p>
              <p className="text-sm font-black italic text-indigo-500">24 / 24 <span className="text-[9px] text-slate-400">Jam/Minggu</span></p>
           </div>
        </div>
      </div>

      {/* 2. Top-Level Analytics (Semua Fitur) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard 
          label="Academic Health" 
          value="88%" 
          trend="+2.4%" 
          icon={<FiBookOpen />} 
          color="bg-indigo-500" 
          sub="Rata-rata Nilai Tugas"
        />
        <AnalyticCard 
          label="Attendance Rate" 
          value="94%" 
          trend="-1.2%" 
          icon={<FiUsers />} 
          color="bg-emerald-500" 
          sub="Kehadiran Siswa Hari Ini"
        />
        <AnalyticCard 
          label="Behavior Points" 
          value="42" 
          trend="Positive" 
          icon={<FiStar />} 
          color="bg-amber-500" 
          sub="Apresiasi Karakter Pekan Ini"
        />
        <AnalyticCard 
          label="AI Efficiency" 
          value="12h" 
          trend="Saved" 
          icon={<FiCpu />} 
          color="bg-violet-600" 
          sub="Waktu Grading Dihemat AI"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 3. Homeroom (Wali Kelas) Monitoring - Left Side */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-[#0a0f1d] p-10 rounded-[4rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <div className="flex justify-between items-center mb-10 px-2">
               <div>
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Homeroom Monitor: 11-RPL-2</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase italic">Kesiapan Rapor & Kondisi Siswa Perwalian</p>
               </div>
               <FiActivity className="text-indigo-500 animate-pulse" size={24} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Grade Progress */}
               <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest text-slate-500">
                    <span>Entry Progress (Guru Mapel)</span>
                    <span className="text-indigo-600">62%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-50 dark:bg-white/2 rounded-full overflow-hidden border border-slate-100 dark:border-white/5">
                    <div className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: '62%' }} />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-slate-50 dark:bg-white/2 rounded-3xl text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Tuntas</p>
                      <p className="text-lg font-black italic text-slate-800 dark:text-white">18</p>
                    </div>
                    <div className="flex-1 p-4 bg-rose-50 dark:bg-rose-500/5 rounded-3xl text-center">
                      <p className="text-[8px] font-black text-rose-400 uppercase mb-1">Pending</p>
                      <p className="text-lg font-black italic text-rose-500">12</p>
                    </div>
                  </div>
               </div>

               {/* Critical Watchlist */}
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase italic tracking-widest text-slate-500 mb-4">Urgent Attention Needed</p>
                  <div className="space-y-3">
                    <WatchlistItem name="Budi Santoso" issue="Absensi > 3 Hari" color="text-rose-500" />
                    <WatchlistItem name="Siti Aminah" issue="Nilai Math Anjlok" color="text-amber-500" />
                    <WatchlistItem name="Andi Wijaya" issue="Lupa Bayar SPP" color="text-indigo-500" />
                  </div>
               </div>
            </div>
          </div>

          {/* 4. AI Lesson Planner Preview */}
          <div className="bg-linear-to-r from-indigo-600 to-violet-700 p-10 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-xl relative overflow-hidden">
            <FiCpu className="absolute -right-10 -bottom-10 text-white/10" size={200} />
            <div className="shrink-0 w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center text-3xl">
              <LuBrain />
            </div>
            <div className="flex-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 mb-2 italic">SoSchool AI Intelligence</h4>
              <p className="text-lg font-medium italic leading-relaxed">
                "Majid, materi **'Database Relasional'** minggu depan membutuhkan 3 modul lab. Mau saya buatkan draf rencana praktikum otomatis hari ini?"
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase italic shadow-xl shrink-0 hover:scale-105 transition-all">
              Buka AI Planner
            </button>
          </div>
        </div>

        {/* 5. Right Side: Operational & Social */}
        <div className="lg:col-span-4 space-y-8">
          {/* Today's Agenda */}
          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3.5rem] border border-slate-200 dark:border-white/5">
            <h4 className="text-[10px] font-black uppercase italic tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <FiClock className="text-indigo-500" /> Today's Agenda
            </h4>
            <div className="space-y-6">
              <AgendaItem time="08:00" title="Basis Data RPL" room="Lab 02" status="Done" />
              <AgendaItem time="10:30" title="Informatika" room="Kelas 10-1" status="Now" />
              <AgendaItem time="13:00" title="Rapat Wali Kelas" room="Ruang Guru" status="Upcoming" />
            </div>
          </div>

          {/* Parent Communication */}
          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3.5rem] border border-slate-200 dark:border-white/5">
            <h4 className="text-[10px] font-black uppercase italic tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <FiMessageSquare className="text-emerald-500" /> Parent Portal
            </h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center font-black italic text-indigo-500">5</div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase italic">Pesan belum dibaca</p>
              </div>
              <button className="w-full py-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-[9px] font-black uppercase italic text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all">
                Buka Komunikasi Ortu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const AnalyticCard = ({ label, value, trend, icon, color, sub }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm group hover:border-indigo-500/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center text-xl shadow-lg`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black italic ${trend.includes('+') ? 'text-emerald-500' : 'text-indigo-400'}`}>{trend}</span>
    </div>
    <h4 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">{value}</h4>
    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic mt-3">{label}</p>
    <p className="text-[8px] font-medium text-slate-400 mt-1 uppercase italic">{sub}</p>
  </div>
);

const WatchlistItem = ({ name, issue, color }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-white/2 rounded-2xl border border-transparent hover:border-white/10 transition-all">
    <div className="flex items-center gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      <span className="text-[11px] font-black text-slate-800 dark:text-white italic uppercase tracking-tight">{name}</span>
    </div>
    <span className={`text-[9px] font-black italic uppercase ${color}`}>{issue}</span>
  </div>
);

const AgendaItem = ({ time, title, room, status }: any) => (
  <div className="flex gap-4 relative">
    <div className="text-[10px] font-black italic text-slate-400 w-10 shrink-0">{time}</div>
    <div className="flex-1 pb-6 border-l-2 border-slate-100 dark:border-white/5 pl-4 relative">
      <div className={`absolute -left-1.25 top-1 w-2 h-2 rounded-full ${status === 'Now' ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'}`} />
      <h5 className={`text-[11px] font-black italic uppercase tracking-tight leading-none ${status === 'Now' ? 'text-indigo-600' : 'text-slate-800 dark:text-slate-300'}`}>{title}</h5>
      <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">{room}</p>
    </div>
  </div>
);

// Icon for AI Brain
const LuBrain = () => <FiCpu />;

export default GuruUnifiedDashboard;