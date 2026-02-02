"use client";

import React, { useState } from 'react';
import { 
  FiZap, FiCalendar, FiMapPin, FiClock, FiStar, 
  FiChevronRight, FiActivity, FiSearch, FiFilter, FiCheckCircle, FiAward
} from 'react-icons/fi';
import { GiDiamondTrophy } from 'react-icons/gi';

// --- DATA SOURCE COMPREHENSIVE ---
const ALL_ACTIVITIES = [
  {
    id: '1',
    type: 'Ekskul',
    title: 'Robotik & AI',
    category: 'Teknologi',
    coach: 'Majid, S.Kom',
    time: 'Setiap Rabu • 15:00',
    status: 'Hadir (Hari Ini)',
    progress: 88,
    metricLabel: 'Skill Level',
    metricValue: 'Advanced',
    color: 'indigo',
    icon: <FiZap />
  },
  {
    id: '2',
    type: 'Kompetisi',
    title: 'Olimpiade Sains Nasional',
    category: 'Akademik',
    coach: 'Ibu Ratna',
    time: '12 - 15 Feb 2026',
    status: 'Babak Final',
    progress: 100,
    metricLabel: 'Peringkat',
    metricValue: 'Top 5',
    color: 'rose',
    icon: <GiDiamondTrophy/>
  },
  {
    id: '3',
    type: 'Event',
    title: 'Parenting Day 2026',
    category: 'Agenda Sekolah',
    coach: 'Management',
    time: '20 Feb • 08:00',
    status: 'Mendatang',
    progress: 0,
    metricLabel: 'Status',
    metricValue: 'Wajib',
    color: 'amber',
    icon: <FiCalendar />
  },
  {
    id: '4',
    type: 'Ekskul',
    title: 'Futsal Academy',
    category: 'Olahraga',
    coach: 'Coach Aris',
    time: 'Setiap Jumat • 16:00',
    status: 'Izin (Sakit)',
    progress: 72,
    metricLabel: 'Fisik',
    metricValue: 'B+',
    color: 'emerald',
    icon: <FiActivity />
  }
];

export default function SoSchoolMasterActivity() {
  const [filter, setFilter] = useState('Semua');

  const filteredData = filter === 'Semua' 
    ? ALL_ACTIVITIES 
    : ALL_ACTIVITIES.filter(item => item.type === filter);

  return (
    <div className="min-h-screen pb-32">
      
      {/* HEADER: DYNAMIC STATUS */}
      <div className="bg-white dark:bg-gray-900 px-8 pt-16 pb-12 rounded-b-[4rem] border-b border-slate-100 dark:border-white/5 shadow-sm">
        <div className="max-w-105 mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-4xl font-[1000] italic tracking-tighter dark:text-white uppercase leading-none">
                Aktivitas <br/><span className="text-indigo-600">Siswa.</span>
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic mt-2">SoSchool Eco-System v4.2</p>
            </div>
            <button className="w-14 h-14 rounded-3xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xl">
               <FiSearch size={20} />
            </button>
          </div>

          {/* QUICK ANALYTICS CHIPS */}
          <div className="grid grid-cols-3 gap-3">
             <div className="p-4 bg-indigo-50 dark:bg-indigo-600/10 rounded-3xl border border-indigo-100/50 dark:border-indigo-500/20 text-center">
                <p className="text-[7px] font-black text-indigo-600 uppercase italic mb-1 tracking-widest">Ekskul</p>
                <p className="text-xl font-black dark:text-white italic leading-none">02</p>
             </div>
             <div className="p-4 bg-rose-50 dark:bg-rose-600/10 rounded-3xl border border-rose-100/50 dark:border-rose-500/20 text-center">
                <p className="text-[7px] font-black text-rose-600 uppercase italic mb-1 tracking-widest">Lomba</p>
                <p className="text-xl font-black dark:text-white italic leading-none">01</p>
             </div>
             <div className="p-4 bg-amber-50 dark:bg-gray-900 rounded-3xl border border-amber-100/50 dark:border-amber-500/20 text-center">
                <p className="text-[7px] font-black text-amber-600 uppercase italic mb-1 tracking-widest">Point</p>
                <p className="text-xl font-black dark:text-white italic leading-none">1.2k</p>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-105 mx-auto px-6 mt-10 space-y-8">
        
        {/* TAB FILTER - MODERN MINIMALIST */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {['Semua', 'Ekskul', 'Kompetisi', 'Event'].map((t) => (
            <button 
              key={t}
              onClick={() => setFilter(t)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all whitespace-nowrap ${filter === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* LIST KEGIATAN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {filteredData.map((item, idx) => (
            <div key={item.id} className="group relative animate-in fade-in slide-in-from-bottom-6 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              
              <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-7 border border-slate-100 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:scale-[1.02]">
                
                {/* TOP ROW: ICON & STATUS */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner
                      ${item.color === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600' :
                        item.color === 'rose' ? 'bg-rose-50 dark:bg-rose-600/20 text-rose-600' :
                        item.color === 'amber' ? 'bg-amber-50 dark:bg-amber-600/20 text-amber-600' :
                        'bg-emerald-50 dark:bg-emerald-600/20 text-emerald-600'}
                    `}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-[1000] italic dark:text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest mt-1">{item.category} • {item.coach}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-2xl text-[8px] font-black uppercase italic tracking-widest border
                    ${item.status.includes('Hadir') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                      item.status.includes('Izin') ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' : 
                      'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500'}
                  `}>
                    {item.status}
                  </div>
                </div>

                {/* MIDDLE ROW: ANALYTICS PREVIEW */}
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 dark:border-white/5">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase italic tracking-widest">{item.metricLabel}</p>
                      <p className="text-sm font-black dark:text-white uppercase italic tracking-tighter">{item.metricValue}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[8px] font-black text-slate-400 uppercase italic tracking-widest">Jadwal/Waktu</p>
                      <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 italic">
                        <FiClock size={12} className="text-indigo-600" /> {item.time.split('•')[1] || item.time}
                      </div>
                   </div>
                </div>

                {/* BOTTOM ROW: PROGRESS & ACTION */}
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase italic text-slate-400 tracking-widest">
                       <span>Progres Capaian</span>
                       <span className="text-indigo-600">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase italic tracking-[0.2em] shadow-lg active:scale-95 transition-all">
                        Lihat Detail {item.type}
                     </button>
                     <button className="w-14 h-14 bg-indigo-50 dark:bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 dark:border-indigo-500/20">
                        <FiChevronRight size={20} />
                     </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY PERFORMANCE CARD */}
        <div className="relative p-8 bg-linear-to-br from-slate-900 to-black rounded-[4rem] text-white overflow-hidden group">
           <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <FiAward size={20} />
                 </div>
                 <h4 className="text-xl font-black italic uppercase tracking-tighter">Achievement Score</h4>
              </div>
              <p className="text-[11px] font-medium leading-relaxed italic text-white/50">
                Putra Anda berada di jalur yang tepat dengan konsistensi 92% bulan ini. Pertahankan performa untuk medali emas OSN!
              </p>
              <div className="pt-2 flex gap-4 overflow-x-auto no-scrollbar">
                 <span className="shrink-0 px-4 py-2 bg-white/10 rounded-xl text-[8px] font-black uppercase italic tracking-widest">#Top3Percent</span>
                 <span className="shrink-0 px-4 py-2 bg-white/10 rounded-xl text-[8px] font-black uppercase italic tracking-widest">#RobotikExpert</span>
                 <span className="shrink-0 px-4 py-2 bg-white/10 rounded-xl text-[8px] font-black uppercase italic tracking-widest">#Consistent</span>
              </div>
           </div>
           <FiStar className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 -rotate-12" />
        </div>

      </div>

      {/* FOOTER LABEL */}
      <div className="mt-16 text-center">
        <p className="text-[8px] font-[1000] uppercase tracking-[0.6em] text-slate-300 dark:text-white/5 italic">SoSchool All-Activity Hub v4.0</p>
      </div>

    </div>
  );
}