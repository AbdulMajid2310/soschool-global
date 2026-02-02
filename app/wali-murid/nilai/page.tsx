"use client";

import React, { useState } from 'react';
import { 
  FiDownload, FiAward, FiBook, FiCheckCircle, 
  FiPrinter, FiUser, FiCalendar, FiLayers, FiGrid,
  FiStar
} from 'react-icons/fi';

const CATEGORIES = ["SD", "SLTP", "SLTA"];
const CLASSES = {
  SD: ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"],
  SLTP: ["Kelas 7", "Kelas 8", "Kelas 9"],
  SLTA: ["Kelas 10", "Kelas 11", "Kelas 12"]
};

const SIKAP_DATA = [
  { 
    title: "Sikap Spiritual", 
    predikat: "Baik", 
    icon: <FiStar className="text-amber-500" />,
    desc: "Memiliki sikap spiritual Baik, antara lain Konsisten dalam bersyukur ketika berhasil mengerjakan sesuatu, menjalankan Ibadah, memberi Salam, Bersyukur sebagai bangsa indonesia." 
  },
  { 
    title: "Sikap Sosial", 
    predikat: "Baik", 
    icon: <FiCheckCircle className="text-emerald-500" />,
    desc: "Memiliki sikap sosial Baik, antara lain Konsisten dalam tanggung jawab, percaya diri, santun, peduli, disiplin, dan jujur." 
  }
];

const NILAI_MAPEL = [
  { id: 1, grup: "Kelompok A", nama: "Pendidikan Agama Islam dan Budi Pekerti", kkm: 73, p: 86, k: 87, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam Memahami makna Q.S. al-Mujadilah: 11, Q.S. ar-Rahman: 33" },
  { id: 2, grup: "Kelompok A", nama: "Pendidikan Pancasila dan Kewarganegaraan", kkm: 70, p: 80, k: 80, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam memahami norma yang berlaku dalam bermasyarakat" },
  { id: 3, grup: "Kelompok A", nama: "Bahasa Indonesia", kkm: 73, p: 83, k: 83, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam mengidentifikasi informasi dalam teks deskripsi" },
  { id: 4, grup: "Kelompok A", nama: "Matematika (Umum)", kkm: 70, p: 86, k: 85, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam menjelaskan bilangan pangkat bulat positif & negatif" },
  { id: 5, grup: "Kelompok A", nama: "Ilmu Pengetahuan Alam (IPA)", kkm: 74, p: 83, k: 83, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam mengklasifikasikan makhluk hidup berdasar karakteristiknya" },
  { id: 6, grup: "Kelompok B", nama: "Seni dan Budaya", kkm: 72, p: 83, k: 83, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam memahami unsur, prinsip, teknik dan prosedur menggambar" },
  { id: 7, grup: "Kelompok B", nama: "Prakarya", kkm: 72, p: 88, k: 88, predikat: "B", desc: "Memiliki penguasaan pengetahuan yang baik, terutama dalam memahami komoditas tanaman sayuran yang dapat dikembangkan" },
];
export default function NilaiRaporPage() {
  const [jenjang, setJenjang] = useState("SLTP");
  const [pilihKelas, setPilihKelas] = useState("Kelas 7");
  const [semester, setSemester] = useState("Ganjil");

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-4 md:p-6 lg:p-12 font-sans antialiased selection:bg-indigo-500 transition-colors">
      
      <main className="max-w-7xl mx-auto space-y-6 md:space-y-10">
        
        {/* --- HEADER & CATEGORY SELECTOR --- */}
        <header className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
               <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                  Portal <span className="text-indigo-600">Rapor.</span>
               </h1>
               <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-[0.2em]">Sistem Informasi Akademik SoSchool</p>
            </div>

            {/* JENJANG SELECTOR */}
            <div className="flex bg-white dark:bg-white/5 p-1.5 rounded-4xl border border-slate-200 dark:border-white/10 w-full md:w-auto shadow-sm overflow-x-auto no-scrollbar">
               {CATEGORIES.map((cat) => (
                  <button 
                     key={cat}
                     onClick={() => {
                        setJenjang(cat);
                        setPilihKelas(CLASSES[cat as keyof typeof CLASSES][0]);
                     }}
                     className={`flex-1 md:flex-none px-8 py-3 rounded-3xl text-[10px] font-black uppercase italic transition-all cursor-pointer ${jenjang === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-indigo-500'}`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
          </div>

          {/* SUB-FILTER: KELAS & SEMESTER */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-100 dark:bg-white/2 p-4 rounded-4xl">
            <div className="flex items-center gap-2 px-4 text-indigo-600">
               <FiGrid size={18} />
               <span className="text-[10px] font-black uppercase italic">Tingkat:</span>
            </div>
            <div className="flex flex-wrap gap-2">
               {CLASSES[jenjang as keyof typeof CLASSES].map((kls) => (
                  <button 
                    key={kls}
                    onClick={() => setPilihKelas(kls)}
                    className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase italic transition-all ${pilihKelas === kls ? 'bg-slate-900 dark:bg-white text-white dark:text-black' : 'bg-white dark:bg-white/5 text-slate-400 border border-slate-200 dark:border-white/10'}`}
                  >
                    {kls}
                  </button>
               ))}
            </div>
            <div className="h-8 w-px bg-slate-300 dark:bg-white/10 hidden lg:block mx-2" />
            <div className="flex gap-2 bg-white dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
               {["Ganjil", "Genap"].map((sem) => (
                  <button 
                    key={sem}
                    onClick={() => setSemester(sem)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase italic transition-all ${semester === sem ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    {sem}
                  </button>
               ))}
            </div>
          </div>
        </header>

        {/* --- STUDENT INFO CARD --- */}
        <section className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-6 md:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-600 shrink-0">
                <FiUser size={32} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-tight">Ahmad Jalaludin</h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest mt-1">NISN: 0102466271 • {jenjang}</p>
              </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center border-x border-slate-100 dark:border-white/5 px-8 text-center md:text-left">
               <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Satuan Pendidikan</p>
               <p className="text-sm font-black italic uppercase">SMP Negeri 2 Pedes</p>
            </div>

            <div className="flex items-center md:justify-end gap-4">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-indigo-600 italic leading-none">Tahun Ajaran</p>
                <p className="text-lg font-black italic uppercase">2022/2023</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                <FiCheckCircle size={24} />
              </div>
            </div>
          </div>
          <FiLayers className="absolute -right-10 -bottom-10 text-[250px] opacity-2 dark:opacity-5 pointer-events-none" />
        </section>

        {/* --- DATA TABLE --- */}
        <section className="overflow-hidden shadow-sm">
          {/* --- SECTION 2: SIKAP (BENTO STYLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {SIKAP_DATA.map((sikap, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl">{sikap.icon}</div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">{sikap.title}</h3>
                </div>
                <span className="px-4 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase italic tracking-widest">
                  {sikap.predikat}
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed text-slate-500 italic">"{sikap.desc}"</p>
            </div>
          ))}
        </div>

        {/* --- SECTION 3: TABEL NILAI --- */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3.5rem] overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
            <h4 className="text-xs font-black italic uppercase tracking-[0.2em]">Pengetahuan & Keterampilan</h4>
            <div className="flex gap-4 text-[9px] font-black uppercase italic opacity-40">
              <span>P: Pengetahuan</span>
              <span>K: Keterampilan</span>
            </div>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full text-left min-w-200">
              <thead>
                <tr className="text-[9px] font-black uppercase italic text-slate-400 tracking-widest border-b border-slate-100 dark:border-white/5">
                  <th className="px-8 py-6">Mata Pelajaran</th>
                  <th className="px-8 py-6 text-center">KKM</th>
                  <th className="px-8 py-6 text-center">P</th>
                  <th className="px-8 py-6 text-center">K</th>
                  <th className="px-8 py-6 text-center">Grade</th>
                  <th className="px-8 py-6">Analisis Kompetensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {NILAI_MAPEL.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/1 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black italic uppercase text-indigo-600/80 mb-1">{item.grup}</p>
                      <p className="text-lg font-black italic uppercase tracking-tighter">{item.nama}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-xs font-bold text-slate-400">{item.kkm}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="text-2xl font-black italic">{item.p}</span>
                    </td>
                    <td className="px-8 py-6 text-center border-r border-slate-100 dark:border-white/5">
                      <span className="text-2xl font-black italic opacity-60">{item.k}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex w-10 h-10 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black italic">
                        {item.predikat}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[10px] font-medium text-slate-500 italic leading-relaxed max-w-xs line-clamp-2 group-hover:line-clamp-none transition-all cursor-help">
                        {item.desc}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </section>

        {/* --- ACTION FOOTER --- */}
        <footer className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-4xl p-8 flex items-center gap-6 shadow-sm">
             <div className="w-16 h-16 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <FiAward className="text-indigo-600" size={32} />
             </div>
             <div>
                <p className="text-[9px] font-black uppercase text-slate-400 italic">Pendidik / Wali Kelas</p>
                <h5 className="text-lg font-black italic uppercase tracking-tighter">Yayan Suryana, S.Pd.</h5>
                <p className="text-[8px] font-bold text-slate-400 uppercase">NIP. 197906062022211003</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-4xl font-black text-[10px] uppercase italic tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer shadow-sm">
              <FiPrinter className="inline mr-2" /> Print Rapor
            </button>
            <button className="flex-1 lg:px-10 py-5 bg-indigo-600 text-white rounded-4xl font-black text-[10px] uppercase italic tracking-widest hover:scale-105 transition-all cursor-pointer shadow-xl shadow-indigo-600/20">
              <FiDownload className="inline mr-2" /> Download PDF
            </button>
          </div>
        </footer>

      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}