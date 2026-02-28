"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiTrendingUp, FiActivity, FiAward, 
  FiBookOpen, FiPieChart, FiTarget, FiInfo 
} from 'react-icons/fi';

const DetailRaporMapel = () => {
  const params = useParams();
  const router = useRouter();
  const subjectName = params.subject ? decodeURIComponent(params.subject as string) : "Matematika";

  // Simulasi Data Komponen Nilai
  const components = [
    { name: "Rata-rata Tugas", score: 90, weight: "20%", icon: <FiBookOpen className="text-blue-500" /> },
    { name: "Kuis Harian", score: 85, weight: "15%", icon: <FiActivity className="text-purple-500" /> },
    { name: "Ujian Tengah Semester", score: 82, weight: "30%", icon: <FiTarget className="text-orange-500" /> },
    { name: "Ujian Akhir Semester", score: 92, weight: "35%", icon: <FiAward className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 py-24">
      
      {/* 1. HEADER NAV */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-600 transition-colors group"
      >
        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 group-hover:shadow-md">
          <FiArrowLeft size={16} />
        </div>
        Kembali ke Rapor Utama
      </button>

      {/* 2. SUBJECT HERO CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Detail Kompetensi</p>
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
              {subjectName}
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">Tahun Ajaran 2025/2026 • Semester Ganjil</p>
          </div>

          <div className="text-right">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Final Grade</p>
             <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black italic text-blue-600 leading-none">88</span>
                <span className="text-2xl font-black text-gray-300 italic">/100</span>
             </div>
          </div>
        </div>

        {/* Floating Decorative */}
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* 3. KOMPONEN NILAI & ANALISIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Breakdown Nilai */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 pl-4">Breakdown Komponen</h3>
          {components.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-blue-500/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-black dark:text-white uppercase italic tracking-tight">{item.name}</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Bobot Nilai: {item.weight}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black italic dark:text-white leading-none">{item.score}</p>
                <div className="h-1 w-20 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-blue-600" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kolom Kanan: Skill Radar & Insight */}
        <div className="space-y-6">
           <div className="bg-gray-950 p-8 rounded-[3rem] text-white">
              <div className="flex items-center gap-3 mb-8">
                 <FiTrendingUp className="text-blue-400" size={24} />
                 <h4 className="text-xs font-black uppercase tracking-widest">Analisis Progres</h4>
              </div>
              
              <div className="space-y-6">
                <InsightRow label="Keaktifan" value="Sangat Baik" color="text-green-400" />
                <InsightRow label="Ketepatan Waktu" value="98%" color="text-blue-400" />
                <InsightRow label="Rata-rata Tugas" value="92.5" color="text-yellow-400" />
              </div>

              <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10">
                 <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <FiInfo size={14} />
                    <p className="text-[9px] font-black uppercase tracking-widest">Rekomendasi:</p>
                 </div>
                 <p className="text-[11px] font-medium leading-relaxed opacity-70 italic">
                    "Tingkatkan pemahaman pada materi Logaritma untuk persiapan ujian semester depan."
                 </p>
              </div>
           </div>

           <div className="bg-linear-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-500/20">
              <FiAward size={40} className="mb-4 opacity-50" />
              <h4 className="text-lg font-black italic uppercase leading-tight mb-2">Predikat Akhir: "A"</h4>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-80">Luar Biasa!</p>
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component
const InsightRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex justify-between items-end border-b border-white/5 pb-4">
    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
    <p className={`text-sm font-black italic ${color}`}>{value}</p>
  </div>
);

export default DetailRaporMapel;