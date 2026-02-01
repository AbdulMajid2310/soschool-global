"use client";

import React from 'react';
import { 
  FiCalendar, FiClock, FiMapPin, FiLayers, 
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiTrendingUp 
} from 'react-icons/fi';

const AGENDA_CLASSES = [
  { 
    id: 'C1', name: '10-IPA-1', subject: 'Informatika', 
    session: 'Sesi 1-2', time: '08:00 - 09:30', room: 'Lab Komputer 1',
    topic: 'Struktur Data Dasar', progress: 100, status: 'Completed' 
  },
  { 
    id: 'C2', name: '11-RPL-2', subject: 'Basis Data', 
    session: 'Sesi 4-5', time: '10:30 - 12:00', room: 'Ruang Teori 4',
    topic: 'Relational Database', progress: 45, status: 'Ongoing' 
  },
  { 
    id: 'C3', name: '12-RPL-1', subject: 'Web Dev', 
    session: 'Sesi 7-8', time: '13:30 - 15:00', room: 'Lab Komputer 3',
    topic: 'React Hooks & State', progress: 0, status: 'Upcoming' 
  },
];

const AgendaList = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Time Utilization Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AgendaStat icon={<FiClock />} label="Total Jam Mengajar" value="24 Jam" sub="Minggu ini" color="text-amber-500" />
        <AgendaStat icon={<FiCheckCircle />} label="Materi Terselesaikan" value="82%" sub="Sesuai Silabus" color="text-emerald-500" />
        <AgendaStat icon={<FiAlertCircle />} label="Jadwal Bentrok" value="0" sub="Sistem Aman" color="text-cyan-500" />
        <AgendaStat icon={<FiLayers />} label="Total Kelas" value="03" sub="Aktif Semester Ini" color="text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 2. Today's Timeline (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Timeline Mengajar Hari Ini</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase italic">
              <FiCalendar /> 01 Februari 2026
            </div>
          </div>

          <div className="space-y-4 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-slate-100 dark:before:bg-white/5">
            {AGENDA_CLASSES.map((item) => (
              <div key={item.id} className="relative pl-16 group">
                {/* Timeline Dot */}
                <div className={`absolute left-7.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-[#0a0f1d] z-10 transition-all duration-500 group-hover:scale-150
                  ${item.status === 'Completed' ? 'bg-emerald-500' : item.status === 'Ongoing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`} 
                />

                <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm group-hover:border-amber-500/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-amber-500 tracking-widest">{item.time}</span>
                        <span className="text-[9px] font-bold text-slate-400 opacity-50">•</span>
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.room}</span>
                      </div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{item.name} <span className="text-slate-300 mx-2">/</span> {item.subject}</h4>
                      <p className="text-[10px] font-medium text-slate-500 italic">Topik: {item.topic}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase italic">Progress Materi</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white italic">{item.progress}%</p>
                      </div>
                      <button className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AI Schedule Analysis (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-linear-to-br from-amber-500 to-orange-600 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
            <FiTrendingUp className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-700" size={150} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-100 mb-6 italic">Pacing Analysis (AI)</h4>
            <div className="space-y-6 relative z-10">
              <p className="text-xs font-medium leading-relaxed italic">
                "Berdasarkan jadwal, Anda memiliki **3 jam jeda** hari ini. Waktu terbaik untuk mengoreksi tugas kelas **11-RPL-2** adalah pukul 15:00 saat energi fokus Anda sedang stabil."
              </p>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-amber-200">Rekomendasi Istirahat</p>
                <p className="text-[10px] font-bold italic">10:00 - 10:30 (Recharge Time)</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">Next Week Preview</h5>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold italic">
                <span>Senin, 09 Feb</span>
                <span className="text-amber-500">Ujian Tengah Semester</span>
              </div>
              <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
              <div className="flex justify-between text-[10px] font-bold italic">
                <span>Selasa, 10 Feb</span>
                <span className="text-slate-400 text-glow-indigo">Materi Baru: API Dev</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components
const AgendaStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default AgendaList;