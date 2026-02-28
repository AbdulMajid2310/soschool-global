"use client";

import React from 'react';
import { 
  FiMapPin, FiCalendar, FiCamera, FiPlus, 
  FiFileText, FiChevronRight, FiCheckCircle, FiClock, FiSearch
} from 'react-icons/fi';

const VISIT_HISTORY = [
  {
    id: 'V01', student: 'Budi Santoso', date: '28 Jan 2026',
    reason: 'Absensi > 15%', outcome: 'Siswa bekerja membantu ortu',
    status: 'Verified', lat: '-6.32xx', long: '107.31xx'
  },
  {
    id: 'V02', student: 'Dedi Kurniawan', date: '01 Feb 2026',
    reason: 'Penurunan Nilai drastis', outcome: 'Kendala fasilitas (Laptop Rusak)',
    status: 'Follow Up', lat: '-6.30xx', long: '107.29xx'
  }
];

const HomeVisitLog = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Statistics & Action Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Home <span className="text-indigo-600">Visit</span> Log
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 italic">
            Dokumentasi Kunjungan Wali Kelas 11-RPL-2
          </p>
        </div>
        
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-4xl text-[10px] font-black uppercase italic tracking-widest flex items-center gap-3 shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
          <FiPlus size={18} /> Buat Laporan Kunjungan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VisitStat label="Total Kunjungan" value="12" sub="Semester Genap" color="text-indigo-500" />
        <VisitStat label="Dalam Pantauan" value="04" sub="Siswa" color="text-rose-500" />
        <VisitStat label="Selesai Masalah" value="08" sub="Kasus Tertutup" color="text-emerald-500" />
      </div>

      {/* 2. Visit Feed / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 mb-2">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Riwayat Kunjungan Terakhir</h3>
          <div className="relative">
             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
             <input type="text" placeholder="Cari nama siswa..." className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/5 rounded-full py-2 pl-9 pr-4 text-[10px] font-bold outline-none" />
          </div>
        </div>

        {VISIT_HISTORY.map((visit) => (
          <div key={visit.id} className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3.5rem] border border-slate-200 dark:border-white/5 shadow-sm group hover:border-indigo-500/30 transition-all overflow-hidden relative">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              
              {/* Profile & Date */}
              <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-white/5 pb-6 lg:pb-0 lg:pr-8">
                <div className="w-16 h-16 rounded-4xl bg-slate-50 dark:bg-white/2 flex items-center justify-center text-2xl mb-4 text-indigo-500">
                  <FiCalendar />
                </div>
                <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{visit.student}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{visit.date}</p>
              </div>

              {/* Analysis Content */}
              <div className="flex-1 space-y-4">
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-rose-500/10 text-rose-500 rounded-lg text-[8px] font-black uppercase italic">Alasan: {visit.reason}</span>
                  <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase italic ${visit.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {visit.status}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-white/2 p-5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                   <p className="text-[11px] font-black text-slate-400 uppercase italic mb-1">Hasil Kunjungan:</p>
                   <p className="text-[13px] font-medium italic text-slate-600 dark:text-slate-300">"{visit.outcome}"</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiMapPin size={12} />
                    <span className="text-[9px] font-bold italic uppercase tracking-tighter">LatLong: {visit.lat}, {visit.long}</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-500">
                    <FiCamera size={12} />
                    <span className="text-[9px] font-bold italic uppercase tracking-tighter underline">3 Foto Terlampir</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button className="p-4 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-full hover:bg-indigo-600 hover:text-white transition-all">
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. AI Geo-Tagging Insight */}
      <div className="p-10 bg-linear-to-br from-indigo-900 to-[#0a0f1d] rounded-[4rem] border border-white/5 relative overflow-hidden group">
        <FiMapPin className="absolute -right-10 -bottom-10 text-white/5 group-hover:scale-125 transition-transform duration-1000" size={200} />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30">
              <FiCheckCircle size={24} />
           </div>
           <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2 italic">Home Visit Intelligence (AI)</h5>
              <p className="text-base font-medium italic text-slate-300 leading-relaxed max-w-2xl">
                "Majid, berdasarkan data koordinat kunjungan, **15% siswa** perwalianmu tinggal di area yang sering terdampak banjir (Karawang Barat). Hal ini berkorelasi dengan kenaikan absensi saat curah hujan tinggi."
              </p>
           </div>
        </div>
      </div>

    </div>
  );
};

const VisitStat = ({ label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-white/5">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none mb-3">{label}</p>
    <h4 className={`text-4xl font-black italic tracking-tighter ${color} leading-none`}>{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase mt-2">{sub}</p>
  </div>
);

export default HomeVisitLog;