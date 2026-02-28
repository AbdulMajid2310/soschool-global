"use client";

import React, { useMemo, useState } from 'react';
import { 
  FiCheckCircle, FiAlertCircle, FiActivity, FiTarget, 
  FiMapPin, FiLayers, FiCoffee, FiSearch, FiFilter 
} from 'react-icons/fi';

// --- DATA SOURCE (Best Practice: Pisahkan jika data besar) ---
const SUBJECT_HISTORY = [
  { id: 1, date: '2026-02-02', topic: 'Integrasi Tailwind CSS v4 di Next.js', status: 'BOLOS', note: 'Siswa tidak berada di Lab saat absensi jam ke-3.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 2, date: '2026-01-29', topic: 'State Management dengan Context API', status: 'HADIR', note: 'Mengerjakan tugas praktikum dengan sangat baik.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 3, date: '2026-01-26', topic: 'Routing & Middleware di Next.js', status: 'HADIR', note: 'Hadir tepat waktu.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 4, date: '2026-01-22', topic: 'Dasar-dasar React Server Components', status: 'SAKIT', note: 'Izin sakit demam (Surat terlampir).', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 5, date: '2026-01-19', topic: 'Pengenalan Framework Next.js', status: 'HADIR', note: 'Aktif bertanya mengenai struktur folder.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 6, date: '2026-01-15', topic: 'Review DOM Manipulation Javascript', status: 'HADIR', note: 'Hadir.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 7, date: '2026-01-12', topic: 'Javascript ES6+ Deep Dive', status: 'IZIN', note: 'Izin mengikuti lomba eksternal.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
  { id: 8, date: '2026-01-08', topic: 'Logika Dasar Pemrograman Web', status: 'HADIR', note: 'Mengerjakan tugas dengan teliti.', teacher: 'Pak Majid, S.Kom', avatar: 'https://i.pravatar.cc/150?u=majid' },
];

type FilterStatus = 'SEMUA' | 'HADIR' | 'IZIN_SAKIT' | 'BOLOS';

export default function DetailAnalisisMapelFinal() {
  const [filter, setFilter] = useState<FilterStatus>('SEMUA');

  // --- LOGIC: MEMOIZED STATS ---
  const stats = useMemo(() => {
    const total = SUBJECT_HISTORY.length;
    const hadir = SUBJECT_HISTORY.filter(d => d.status === 'HADIR').length;
    const izinSakit = SUBJECT_HISTORY.filter(d => d.status === 'IZIN' || d.status === 'SAKIT').length;
    const bolos = SUBJECT_HISTORY.filter(d => d.status === 'BOLOS').length;
    const percentage = Math.round((hadir / total) * 100);

    return { total, hadir, izinSakit, bolos, percentage };
  }, []);

  // --- LOGIC: FILTERED LIST ---
  const filteredData = useMemo(() => {
    if (filter === 'SEMUA') return SUBJECT_HISTORY;
    if (filter === 'IZIN_SAKIT') return SUBJECT_HISTORY.filter(d => d.status === 'IZIN' || d.status === 'SAKIT');
    return SUBJECT_HISTORY.filter(d => d.status === filter);
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-10 animate-in fade-in duration-1000">
      
     {/* 1. UNIFIED TEACHER & PERFORMANCE HERO SECTION */}
      <section className="relative bg-slate-950 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl border border-white/5">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-indigo-600/20 to-transparent z-0" />
        <FiActivity className="absolute -right-16 -bottom-16 text-[25rem] text-white/3 rotate-12" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* LEFT SIDE: TEACHER PROFILE */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-500/30 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <img 
                  src={SUBJECT_HISTORY[0].avatar} 
                  alt="Guru" 
                  className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] border-2 border-white/10 object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center border-4 border-slate-950 shadow-xl">
                  <FiTarget className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[9px] font-black uppercase italic tracking-widest text-indigo-400">
                  Lead Instructor
                </span>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase italic tracking-widest text-slate-400">
                  Academic 2026
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {SUBJECT_HISTORY[0].teacher}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-5 text-[10px] font-bold uppercase italic text-slate-400 tracking-wider">
                 <span className="flex items-center gap-2 text-indigo-400"><FiLayers size={14}/> Pemrograman Web</span>
                 <span className="flex items-center gap-2 text-rose-400"><FiMapPin size={14}/> Lab RPL Utama</span>
                 <span className="flex items-center gap-2 text-amber-400"><FiActivity size={14}/> XII RPL 1</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PERFORMANCE & ACTION */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
            
            <div className="text-center lg:text-right space-y-1">
              <p className="text-[10px] font-black uppercase italic text-indigo-400 tracking-[0.3em]">Total Kehadiran</p>
              <div className="flex items-baseline justify-center lg:justify-end gap-2">
                <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter text-white leading-none">
                  {stats.percentage}%
                </h2>
                <span className="text-lg font-black italic text-indigo-500 uppercase">Score</span>
              </div>
              <p className="text-[9px] font-bold text-slate-500 uppercase italic">Berdasarkan {stats.total} Sesi Pertemuan</p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl hover:bg-indigo-500 hover:text-white transition-all duration-500 scale-100 hover:scale-105 active:scale-95">
                Download Report Mapel
                <div className="w-6 h-6 bg-slate-100 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                   <FiActivity className="group-hover:animate-pulse" size={12} />
                </div>
              </button>
              <p className="text-[8px] text-center lg:text-right font-medium text-slate-600 italic uppercase tracking-tighter">
                Terakhir diperbarui: {SUBJECT_HISTORY[0].date}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 2. LEFT SIDEBAR: STICKY ANALISIS PERTEMUAN */}
        <aside className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-black uppercase italic tracking-[0.2em] text-slate-400 px-2">Pertemuan Mata Pelajaran</h3>
            
            {/* Card: Total */}
            <div className="group relative bg-slate-950 rounded-[2.5rem] p-6 overflow-hidden border border-white/10 shadow-xl transition-all hover:border-indigo-500/50">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                    <FiLayers className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-indigo-400 italic">Total</p>
                    <p className="text-xl font-black italic text-white leading-none">Sesi Kelas</p>
                  </div>
                </div>
                <span className="text-5xl font-black italic text-white opacity-20">{stats.total}</span>
              </div>
            </div>

            {/* Card: Hadir */}
            <div className="bg-white dark:bg-slate-900 rounded-4xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                    <FiCheckCircle size={20} />
                  </div>
                  <p className="text-xs font-black italic uppercase dark:text-white">Total Hadir</p>
                </div>
                <p className="text-2xl font-black italic text-emerald-500">{stats.hadir}</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(stats.hadir/stats.total)*100}%` }} />
              </div>
            </div>

            {/* Card: Izin & Sakit */}
            <div className="bg-white dark:bg-slate-900 rounded-4xl p-6 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center">
                    <FiCoffee size={20} />
                  </div>
                  <p className="text-xs font-black italic uppercase dark:text-white">Izin & Sakit</p>
                </div>
                <p className="text-2xl font-black italic text-amber-500">{stats.izinSakit}</p>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${(stats.izinSakit/stats.total)*100}%` }} />
              </div>
            </div>

            {/* Card: Bolos */}
            <div className="bg-white dark:bg-slate-900 rounded-4xl p-6 border-2 border-rose-500/10 shadow-sm transition-all hover:border-rose-500/30">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center animate-pulse">
                    <FiAlertCircle size={20} />
                  </div>
                  <p className="text-xs font-black italic uppercase text-rose-600">Total Bolos</p>
                </div>
                <p className="text-2xl font-black italic text-rose-600">{stats.bolos}</p>
              </div>
              <div className="h-1.5 w-full bg-rose-50 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-600" style={{ width: `${(stats.bolos/stats.total)*100}%` }} />
              </div>
            </div>
          </div>
        </aside>

        {/* 3. RIGHT CONTENT: FILTER & HISTORY LIST */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* FILTER BAR - Best Practice: Scannable buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-100 dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/5 sticky top-4 z-20 backdrop-blur-md bg-opacity-80">
            <div className="flex flex-wrap gap-2">
              {(['SEMUA', 'HADIR', 'IZIN_SAKIT', 'BOLOS'] as FilterStatus[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase italic tracking-widest transition-all
                  ${filter === f 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-lg scale-105 border border-indigo-500/10' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {f.replace('_', ' & ')}
                </button>
              ))}
            </div>
            <div className="hidden md:flex pr-4 items-center gap-2 text-[9px] font-black italic uppercase text-slate-400">
              <FiFilter /> {filteredData.length} History
            </div>
          </div>

         {/* 4. DYNAMIC LIST WITH CUSTOM SCROLL */}
          <div className="grid grid-cols-1 gap-4 max-h-162.5 pb-50 scrollbar-hide overflow-y-auto pr-2 
            scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
            
            {filteredData.length > 0 ? (
              filteredData.map((log, index) => (
                <div 
                  key={log.id} 
                  className="group relative bg-white dark:bg-slate-900 rounded-4xl p-5 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 animate-in slide-in-from-right"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    
                    {/* Date Badge: Glass Effect */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-white/3 rounded-2xl flex flex-col items-center justify-center border border-slate-100 dark:border-white/10 transition-transform group-hover:scale-110 duration-500">
                        <span className="text-2xl font-black italic dark:text-white leading-none">{log.date.split('-')[2]}</span>
                        <span className="text-[8px] font-black uppercase text-indigo-500 italic tracking-tighter">
                          {new Date(log.date).toLocaleDateString('id-ID', { month: 'short' })}
                        </span>
                      </div>
                    </div>

                    {/* Content Detail */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse
                          ${log.status === 'HADIR' ? 'bg-emerald-500' : log.status === 'BOLOS' ? 'bg-rose-500' : 'bg-amber-500'}`} 
                        />
                        <h4 className="text-[13px] font-black italic uppercase dark:text-white tracking-tight leading-none">
                          {log.topic}
                        </h4>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 dark:bg-white/5 rounded-full" />
                        <p className="pl-4 text-[11px] italic text-slate-500 dark:text-slate-400 leading-relaxed ">
                          {log.note}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill: Modern Style */}
                    <div className="w-full md:w-36 flex flex-col items-center md:items-end gap-2">
                      <div className={`px-5 py-2 rounded-full text-[9px] font-black italic uppercase tracking-widest transition-all
                        ${log.status === 'HADIR' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 
                          log.status === 'BOLOS' ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20' : 
                          'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>
                        {log.status === 'SAKIT' || log.status === 'IZIN' ? 'IZIN & SAKIT' : log.status}
                      </div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase italic tracking-tighter">Verified by System</span>
                    </div>
                  </div>

                  {/* Hover Accent Line */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-r-full" />
                </div>
              ))
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-white/5">
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-slate-300" size={32} />
                </div>
                <h5 className="text-xs font-black uppercase italic text-slate-400 tracking-widest">Tidak Ada Data Ditemukan</h5>
                <p className="text-[10px] text-slate-400 mt-1">Coba ganti filter pencarian Anda</p>
              </div>
            )}
          </div>
        </main>
      </div>

    
    </div>
  );
}