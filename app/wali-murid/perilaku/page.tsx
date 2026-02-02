"use client";

import React, { useState } from 'react';
import { 
  FiAlertTriangle, FiCheckCircle, FiCamera, FiUser, 
  FiShield, FiTrendingDown, FiTrendingUp, FiX, 
  FiArrowRight, FiClock, FiDownload, FiMessageCircle, 
  FiBarChart2, FiActivity, FiTarget, FiHeart
} from 'react-icons/fi';

// --- DATA REAL UNTUK LAPORAN ORANG TUA ---
const DATA_TIMELINE = [
  { 
    id: 'LOG-001', 
    tipe: 'MINUS', 
    kategori: 'Disiplin & Etika', 
    judul: 'Pelanggaran Aturan Merokok', 
    poin: -50, 
    tgl: '02 Feb 2026', 
    jam: '10:15', 
    desc: 'Siswa ditemukan merokok di belakang laboratorium. Ini merupakan pelanggaran kategori berat yang mempengaruhi poin kelulusan.', 
    tindakan: 'Skorsing 2 Hari & Konseling Tahap 1', 
    impact: 'Menurunkan standar integritas siswa di lingkungan sekolah.',
    saran: 'Mohon orang tua memantau pergaulan anak di luar jam sekolah.',
    guru: 'Bpk. Ahmad Sujarwo', 
    image: 'https://images.unsplash.com/photo-1527113359680-2647dcacdead?q=80&w=800' 
  },
  { 
    id: 'LOG-002', 
    tipe: 'PLUS', 
    kategori: 'Kepemimpinan', 
    judul: 'Koordinator Proyek Sosial', 
    poin: 100, 
    tgl: '30 Jan 2026', 
    jam: '14:00', 
    desc: 'Majid berhasil memimpin tim dalam penggalangan dana panti asuhan dengan hasil melampaui target.', 
    tindakan: 'Sertifikat Leadership', 
    impact: 'Meningkatkan kepercayaan diri dan empati sosial.',
    saran: 'Dukungan orang tua sangat membantu untuk pengembangan soft-skill ini.',
    guru: 'Ibu Siti Aminah', 
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800' 
  },
  { 
    id: 'LOG-003', 
    tipe: 'PLUS', 
    kategori: 'Sosial', 
    judul: 'Interaksi Teman Sebaya', 
    poin: 30, 
    tgl: '25 Jan 2026', 
    jam: '09:00', 
    desc: 'Sangat proaktif membantu teman yang kesulitan memahami materi matematika.', 
    tindakan: 'Point Peer-Support', 
    impact: 'Menciptakan lingkungan kelas yang kolaboratif.',
    saran: 'Pertahankan sikap komunikatif ini di lingkungan rumah.',
    guru: 'Ibu Dewi Lestari', 
    image: 'https://images.unsplash.com/photo-1573497620053-ea5310f94a17?q=80&w=800' 
  }
];

export default function SoSchoolKarakter() {
  const [selectedLog, setSelectedLog] = useState<typeof DATA_TIMELINE[0] | null>(null);

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-4 md:p-12 antialiased">
      <main className="max-w-7xl mx-auto space-y-12">
        
        {/* --- DYNAMIC HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
               <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.4em] italic">Parental Insight Report</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
               Behavior <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-indigo-600 to-purple-600 italic">Analysis.</span>
            </h2>
            <p className="text-slate-500 font-medium italic text-sm md:text-base">
                Laporan komprehensif mengenai perkembangan mental, sosial, dan kedisiplinan siswa untuk kolaborasi pendidikan sekolah & rumah.
            </p>
          </div>

          {/* SUMMARY BENTO CARDS */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
             <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-8 rounded-[3rem] flex flex-col justify-between shadow-xs">
                <FiBarChart2 className="text-indigo-600" size={28} />
                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 italic mb-1 tracking-widest">Avg. Score</p>
                   <h3 className="text-5xl font-black italic tracking-tighter">88%</h3>
                </div>
             </div>
             <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col justify-between">
                <FiActivity className="text-emerald-400" size={28} />
                <div>
                   <p className="text-[10px] font-black uppercase opacity-60 italic mb-1 tracking-widest">Status</p>
                   <h3 className="text-3xl font-black italic tracking-tighter">STABIL</h3>
                </div>
             </div>
          </div>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          
          {/* Main Feed - Grid 8/12 */}
          <div className="md:col-span-6 lg:col-span-8 space-y-6">
             <h4 className="px-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <FiClock /> Log Kejadian & Impact
             </h4>
             {DATA_TIMELINE.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLog(log)}
                  className="group bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-8 flex flex-col md:flex-row items-center gap-8 cursor-pointer transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5"
                >
                   <div className={`w-20 h-20 rounded-4xl flex items-center justify-center text-3xl shrink-0 ${
                     log.tipe === 'PLUS' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                   }`}>
                     {log.tipe === 'PLUS' ? <FiTrendingUp /> : <FiAlertTriangle />}
                   </div>
                   <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">{log.kategori}</span>
                         <span className="h-1 w-1 bg-slate-300 rounded-full" />
                         <span className="text-[10px] font-bold text-slate-400 italic">{log.tgl}</span>
                      </div>
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter">{log.judul}</h3>
                      <p className="text-sm italic text-slate-500 line-clamp-1">Impact: {log.impact}</p>
                   </div>
                   <div className="text-right">
                      <p className={`text-4xl font-black italic ${log.tipe === 'PLUS' ? 'text-emerald-500' : 'text-red-500'}`}>
                         {log.tipe === 'PLUS' ? '+' : ''}{log.poin}
                      </p>
                   </div>
                </div>
             ))}
          </div>

          {/* Secondary Stats - Grid 4/12 */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6">
             <h4 className="px-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                <FiTarget /> Ringkasan Analitik
             </h4>
             
             {/* Mental Health/Mood Card */}
             <div className="bg-indigo-600 text-white p-10 rounded-[3.5rem] space-y-6 relative overflow-hidden group">
                <FiHeart className="absolute -right-4 -top-4 opacity-10 group-hover:scale-125 transition-transform" size={150} />
                <div className="relative z-10">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Rata-rata Emosional</p>
                   <h3 className="text-4xl font-black italic mt-2">POSITIF</h3>
                </div>
                <div className="relative z-10 space-y-3 pt-4 border-t border-white/20">
                   <p className="text-xs font-medium italic leading-relaxed">Siswa menunjukkan antusiasme tinggi dalam kolaborasi tim, namun perlu bimbingan dalam manajemen waktu.</p>
                </div>
             </div>

             {/* Peer Interaction Card */}
             <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-10 rounded-[3.5rem] space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Social Peer Rank</p>
                <div className="flex items-center gap-4">
                   <h3 className="text-5xl font-black italic">TOP 5%</h3>
                   <div className="text-emerald-500 font-bold italic text-[10px] bg-emerald-500/10 px-3 py-1 rounded-full uppercase">Sangat Berpengaruh</div>
                </div>
                <p className="text-xs italic text-slate-500">Dihargai oleh rekan sebaya karena sikap suportif.</p>
             </div>
          </div>

        </div>
      </main>

      {/* --- PREMIUM FULL DETAIL MODAL --- */}
      {selectedLog && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0  backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setSelectedLog(null)} />
          
          <div className="relative w-full max-w-6xl bg-white dark:bg-[#0a0a0c] scrollbar-hide rounded-[4rem] overflow-hidden flex flex-col md:flex-row h-full md:h-auto max-h-[95vh] shadow-2xl animate-in zoom-in-95">
             
             {/* Left: Media & Evidence */}
             <div className="w-full md:w-5/12 relative group bg-slate-100 dark:bg-white/5">
                <img src={selectedLog.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Evidence" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                   <h4 className="text-white text-3xl font-black italic uppercase tracking-tighter">Bukti <br /> Dokumentasi.</h4>
                </div>
             </div>

             {/* Right: Parental Content */}
             <div className="w-full md:w-7/12 p-10 md:p-16 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-start mb-10">
                   <div>
                      <span className={`text-[10px] font-black px-4 py-1 rounded-full border ${
                        selectedLog.tipe === 'PLUS' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                         {selectedLog.kategori}
                      </span>
                      <h2 className="text-5xl font-black italic uppercase tracking-tighter mt-4 leading-none">{selectedLog.judul}</h2>
                   </div>
                   <button onClick={() => setSelectedLog(null)} className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                      <FiX size={24} />
                   </button>
                </div>

                <div className="space-y-8">
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Kronologi Kejadian</p>
                      <p className="text-xl font-bold italic text-slate-700 dark:text-slate-300">"{selectedLog.desc}"</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Impact / Dampak</p>
                         <p className="text-sm font-black italic uppercase text-indigo-600">{selectedLog.impact}</p>
                      </div>
                      <div className="bg-indigo-600/5 p-6 rounded-3xl border border-indigo-600/20">
                         <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-2 italic">Saran Untuk Orang Tua</p>
                         <p className="text-sm font-black italic uppercase text-slate-900 dark:text-white">{selectedLog.saran}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-8 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                            <FiUser size={20} className="text-indigo-600" />
                         </div>
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase italic">Pelapor</p>
                            <p className="text-sm font-black italic uppercase tracking-tighter">{selectedLog.guru}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-slate-400 uppercase italic">Waktu Kejadian</p>
                         <p className="text-sm font-black italic uppercase">{selectedLog.jam} • {selectedLog.tgl}</p>
                      </div>
                   </div>

                   <div className="pt-6 flex gap-4">
                      <button className="flex-1 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2.5rem] font-black uppercase italic text-xs tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition-transform">
                         <FiDownload className="inline mr-2 mb-1" /> Unduh Laporan Resmi
                      </button>
                      <button className="w-20 h-20 bg-indigo-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-600/30 hover:scale-110 transition-transform">
                         <FiMessageCircle size={32} />
                      </button>
                   </div>
                </div>
             </div>

          </div>
        </div>
      )}
    </div>
  );
}