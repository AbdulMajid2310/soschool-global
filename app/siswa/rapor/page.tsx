"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  FiAward, FiTrendingUp, FiBarChart2, FiBook, 
  FiDownload, FiStar, FiChevronRight, FiPieChart 
} from 'react-icons/fi';
import { GiAchievement, GiTargetPrize } from 'react-icons/gi';

const ACADEMIC_SCORES = [
  { subject: "Matematika", score: 88, avg: 75, grade: "A", status: "Naik" },
  { subject: "Fisika", score: 92, avg: 72, grade: "A", status: "Naik" },
  { subject: "Biologi", score: 85, avg: 80, grade: "B", status: "Tetap" },
  { subject: "Kimia", score: 78, avg: 70, grade: "B", status: "Turun" },
  { subject: "B. Inggris", score: 95, avg: 75, grade: "A", status: "Naik" },
  { subject: "Sejarah", score: 80, avg: 78, grade: "B", status: "Naik" },
];

const RaporDigital = () => {
    const router= useRouter()
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      
      {/* 1. HERO STATS: RINGKASAN UMUM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-linear-to-br from-blue-700 via-blue-600 to-indigo-600 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mb-2">Peringkat Kelas</p>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-4">Rank #03</h2>
              <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                  <p className="text-[8px] font-black uppercase opacity-60">Rata-rata</p>
                  <p className="text-xl font-black italic">86.4</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                  <p className="text-[8px] font-black uppercase opacity-60">Kehadiran</p>
                  <p className="text-xl font-black italic">100%</p>
                </div>
              </div>
            </div>
            <GiAchievement className="w-48 h-48 text-white opacity-20 rotate-12" />
          </div>
          
          {/* Download Button */}
          <button className="mt-10 flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            <FiDownload /> Download Rapor PDF
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center text-center">
           <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-4xl flex items-center justify-center text-orange-500 mb-6 shadow-inner">
              <GiTargetPrize size={40} />
           </div>
           <h3 className="text-xl font-black italic uppercase tracking-tight dark:text-white">Next Goal</h3>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 px-4 leading-relaxed">
              Dapatkan nilai 90+ di Mapel Kimia untuk Level Up!
           </p>
           <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-orange-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
           </div>
        </div>
      </div>

      {/* 2. TABEL NILAI DETIL */}
      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3">
            <FiBarChart2 className="text-blue-600"/> Detail Kompetensi
          </h3>
          <span className="text-[10px] font-bold text-gray-400 italic">Semester Ganjil 2026</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ACADEMIC_SCORES.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-xl font-black italic text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.grade}
                </div>
                <div>
                  <h4 className="text-lg font-black dark:text-white uppercase italic tracking-tight">{item.subject}</h4>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Rata-rata Kelas: {item.avg}</p>
                </div>
              </div>

              {/* Progress Bar Mini */}
              <div className="flex-1 w-full max-w-xs space-y-2">
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-400">
                    <span>Performance</span>
                    <span>{item.score}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                      style={{ width: `${item.score}%` }}
                    />
                 </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Score</p>
                  <p className="text-2xl font-black italic dark:text-white leading-none">{item.score}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest
                  ${item.status === 'Naik' ? 'bg-green-50 text-green-600' : item.status === 'Turun' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}
                `}>
                  {item.status}
                </div>
                <button onClick={()=> router.push('/siswa/rapor/detail')} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-blue-600 transition-all">
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CATATAN GURU & KARAKTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-gray-950 p-10 rounded-[3rem] text-white relative overflow-hidden">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">Catatan Wali Kelas</h4>
            <p className="text-sm font-medium italic leading-relaxed opacity-80 mb-8">
              "Siti memiliki kemampuan logika yang sangat kuat di matematika dan fisika. Namun, perlu lebih aktif dalam diskusi kelompok di mata pelajaran sosial. Pertahankan prestasimu!"
            </p>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">W</div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Waluyo S.Pd</p>
                  <p className="text-[8px] opacity-50 uppercase font-bold">Wali Kelas 12-IPA-1</p>
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Penilaian Karakter</h4>
            <div className="space-y-4">
               <CharacterBar label="Kedisiplinan" value="A" />
               <CharacterBar label="Gotong Royong" value="B+" />
               <CharacterBar label="Kreativitas" value="A" />
               <CharacterBar label="Kemandirian" value="A-" />
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Sub Components ---
const CharacterBar = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
    <span className="text-[10px] font-black uppercase tracking-widest dark:text-gray-300">{label}</span>
    <span className="text-lg font-black italic text-blue-600">{value}</span>
  </div>
);

export default RaporDigital;