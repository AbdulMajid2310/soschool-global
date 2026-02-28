"use client";

import React from 'react';
import { 
  FiUserCheck, FiClock, FiAlertCircle, FiTrendingUp, 
  FiArrowRight, FiCalendar, FiBookOpen, FiActivity 
} from 'react-icons/fi';

const CLASS_PRESENSI_DATA = [
  { 
    id: 'C1', name: '10-IPA-1', subject: 'Informatika', 
    attendanceRate: 98, totalStudents: 32, lateToday: 0,
    status: 'Selesai', lastMeeting: '01 Feb 2026', color: 'text-emerald-500'
  },
  { 
    id: 'C2', name: '11-RPL-2', subject: 'Basis Data', 
    attendanceRate: 85, totalStudents: 30, lateToday: 4,
    status: 'Berlangsung', lastMeeting: '01 Feb 2026', color: 'text-amber-500'
  },
  { 
    id: 'C3', name: '12-RPL-1', subject: 'Web Dev', 
    attendanceRate: 92, totalStudents: 28, lateToday: 1,
    status: 'Belum Mulai', lastMeeting: '30 Jan 2026', color: 'text-slate-400'
  },
];

const PresensiList = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Global Attendance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticMiniCard 
          icon={<FiActivity />} 
          label="Rata-rata Kehadiran Global" 
          value="91.6%" 
          subValue="+2.4% dari bulan lalu"
          isUp={true}
        />
        <AnalyticMiniCard 
          icon={<FiAlertCircle />} 
          label="Siswa Perlu Perhatian" 
          value="05 Siswa" 
          subValue="Sering terlambat/Alpha"
          isUp={false}
        />
        <AnalyticMiniCard 
          icon={<FiUserCheck />} 
          label="Total Jurnal Terisi" 
          value="42/45" 
          subValue="93% Kepatuhan Administrasi"
          isUp={true}
        />
      </div>

      {/* 2. Class List with Specific Analytics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Daftar Presensi Per Kelas</h3>
          <button className="text-[9px] font-black uppercase text-indigo-500 flex items-center gap-2">
            <FiCalendar /> Lihat Kalender Akademik
          </button>
        </div>

        {CLASS_PRESENSI_DATA.map((cls) => (
          <div key={cls.id} className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] border border-slate-200 dark:border-indigo-900/20 p-2 group hover:border-indigo-500/50 transition-all duration-500">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 gap-8">
              
              {/* Info Utama */}
              <div className="flex items-center gap-5 lg:w-1/4">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-indigo-950/40 flex items-center justify-center text-2xl text-indigo-500 shadow-inner group-hover:scale-110 transition-transform`}>
                  <FiBookOpen />
                </div>
                <div>
                  <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
                </div>
              </div>

              {/* Analisis Data Per Kelas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 border-l border-slate-100 dark:border-indigo-900/10 pl-8">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Attendance Rate</p>
                  <div className="flex items-center gap-3">
                    <span className={`text-xl font-black italic tracking-tighter ${cls.attendanceRate > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {cls.attendanceRate}%
                    </span>
                    <div className="h-1 flex-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${cls.attendanceRate > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${cls.attendanceRate}%` }} />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Terlambat Hari Ini</p>
                  <p className={`text-xl font-black italic tracking-tighter ${cls.lateToday > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {cls.lateToday} <span className="text-[10px] uppercase opacity-50 font-bold">Siswa</span>
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Status Jurnal</p>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black italic uppercase tracking-widest bg-slate-50 dark:bg-white/5 ${cls.color}`}>
                    {cls.status}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="lg:w-1/6 flex justify-end">
                <button className="group/btn relative px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic overflow-hidden shadow-lg shadow-indigo-500/20">
                  <span className="relative z-10 flex items-center gap-2">
                    Buka Detail <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-700 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Insights for Attendance */}
      <div className="p-8 bg-linear-to-br from-indigo-900 to-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
        <FiTrendingUp className="absolute -right-6 -bottom-6 text-white/5 group-hover:scale-110 transition-transform duration-700" size={150} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-400">
            <FiActivity size={32} />
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">AI Attendance Analyst</h5>
            <p className="text-sm font-medium italic mt-1 max-w-2xl leading-relaxed">
              "Tren kehadiran di kelas **11-RPL-2** menurun 5% di jam pertama. Disarankan untuk memindahkan materi berat ke jam kedua untuk efektivitas belajar maksimal."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticMiniCard = ({ icon, label, value, subValue, isUp }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm">
    <div className="flex items-center gap-3 text-indigo-500 mb-4">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest italic text-slate-400">{label}</span>
    </div>
    <div className="space-y-1">
      <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
      <p className={`text-[9px] font-bold italic ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>{subValue}</p>
    </div>
  </div>
);

export default PresensiList;