"use client";

import React, { useState } from 'react';
import { 
  FiClock, FiMapPin, FiBook, FiCheckCircle, 
  FiChevronLeft, FiChevronRight, FiPlus, FiMoreVertical,
  FiVideo, FiUsers, FiAlertCircle
} from 'react-icons/fi';

export interface AgendaItem {
  id: string;
  time: string;
  subject: string;
  class: string;
  topic: string;
  type: 'teaching' | 'meeting' | 'exam' | 'submission';
  isCompleted: boolean;
}

export const DAILY_AGENDA: AgendaItem[] = [
  { id: '1', time: '08:00 - 09:30', subject: 'Informatika', class: '10 - IPA 1', topic: 'Pengenalan React & Tailwind', type: 'teaching', isCompleted: true },
  { id: '2', time: '10:00 - 11:30', subject: 'Rapat Kurikulum', class: 'Ruang Guru', topic: 'Persiapan UTS Genap', type: 'meeting', isCompleted: false },
  { id: '3', time: '13:00 - 14:30', subject: 'Informatika', class: '11 - RPL 2', topic: 'Ujian Praktik Database', type: 'exam', isCompleted: false },
  { id: '4', time: '15:00', subject: 'Deadline Tugas', class: '12 - RPL 1', topic: 'Pengumpulan Portofolio Web', type: 'submission', isCompleted: false },
];

const ClassAgenda = () => {
  const [selectedDate, setSelectedDate] = useState('Senin, 2 Feb 2026');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* LEFT: Mini Calendar & Stats (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-indigo-900/20 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 italic">Pilih Tanggal</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-100 dark:bg-indigo-950/40 rounded-xl hover:text-indigo-500 transition-colors"><FiChevronLeft /></button>
              <button className="p-2 bg-slate-100 dark:bg-indigo-950/40 rounded-xl hover:text-indigo-500 transition-colors"><FiChevronRight /></button>
            </div>
          </div>
          
          <div className="text-center space-y-1 mb-8">
            <p className="text-4xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter">FEB 02</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Senin, 2026</p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-indigo-900/10">
            <AgendaStat label="Sesi Mengajar" value="2/3" />
            <AgendaStat label="Rapat/Pertemuan" value="1" />
            <AgendaStat label="Tugas Masuk" value="12" color="text-rose-500" />
          </div>
        </div>

        <button className="w-full p-6 bg-linear-to-br from-indigo-600 to-violet-700 rounded-4xl text-white flex items-center justify-between group shadow-xl shadow-indigo-500/20">
          <span className="font-black italic uppercase text-xs tracking-widest">Buat Agenda Baru</span>
          <FiPlus className="group-hover:rotate-90 transition-transform duration-500" size={24} />
        </button>
      </div>

      {/* RIGHT: Timeline View (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-indigo-900/20">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-8">
            Timeline <span className="text-indigo-600">Hari Ini</span>
          </h3>

          <div className="relative space-y-8 before:absolute before:left-4.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-indigo-900/20">
            {DAILY_AGENDA.map((item) => (
              <div key={item.id} className="relative pl-14 group">
                {/* Timeline Dot */}
                <div className={`absolute left-0 top-1 w-10 h-10 rounded-2xl flex items-center justify-center z-10 border-4 border-white dark:border-[#0a0f1d] transition-all duration-500
                  ${item.isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-indigo-950 text-slate-400'}`}>
                  {item.isCompleted ? <FiCheckCircle /> : <FiClock />}
                </div>

                {/* Card Agenda */}
                <div className={`p-6 rounded-4xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4
                  ${item.isCompleted ? 'bg-slate-50/50 dark:bg-emerald-500/5 border-transparent opacity-60' : 'bg-white dark:bg-indigo-950/20 border-slate-100 dark:border-indigo-900/30 hover:border-indigo-500/50 shadow-sm'}`}>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md italic
                        ${item.type === 'teaching' ? 'bg-indigo-100 text-indigo-600' : 
                          item.type === 'meeting' ? 'bg-amber-100 text-amber-600' : 
                          item.type === 'exam' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                        {item.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                    </div>
                    
                    <h4 className="text-sm font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
                      {item.subject} <span className="text-indigo-500 not-italic mx-1">/</span> {item.topic}
                    </h4>
                    
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><FiMapPin /> {item.class}</span>
                      {item.type === 'teaching' && <span className="flex items-center gap-1"><FiUsers /> 32 Siswa</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {!item.isCompleted && item.type === 'teaching' && (
                      <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                        <FiVideo />
                      </button>
                    )}
                    <button className="p-3 bg-slate-100 dark:bg-indigo-950/60 rounded-xl hover:text-indigo-500 transition-all">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AgendaStat = ({ label, value, color = "text-indigo-500" }: any) => (
  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
    <span className="text-slate-400">{label}</span>
    <span className={color}>{value}</span>
  </div>
);

export default ClassAgenda;