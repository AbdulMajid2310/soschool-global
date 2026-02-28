"use client";

import React from 'react';
import { 
  FiTrendingUp, FiActivity, FiArrowRight, FiCheckCircle, 
  FiAward, FiStar, FiClock, FiTarget, FiZap, FiEdit3, 
  FiAnchor, FiBookOpen, FiUser, FiCalendar
} from 'react-icons/fi';

// --- INTERFACES (STRUKTUR DATA LENGKAP) ---
interface MapelSingkat {
  nama: string;
  nilai: number;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

interface RiwayatSemester {
  id: string;
  label: string;
  nilai: number;
  tahunAjaran: string;
  isAktif: boolean;
}

interface AnalisisSiswa {
  nama: string;
  nisn: string;
  kelas: string;
  waliKelas: string;
  rataRata: number;
  pertumbuhan: number;
  peluangPTN: number;
  kehadiran: { persentase: number; sakit: number; izin: number; alpa: number };
  karakter: { spiritual: string; sosial: string; catatan: string };
  ekstrakurikuler: { nama: string; nilai: string; deskripsi: string }[];
  mapelUtama: MapelSingkat[];
  riwayatSemester: RiwayatSemester[];
  catatanWali: string;
}

// --- DATA MOCK LENGKAP ---
const DATA_SISWA: AnalisisSiswa = {
  nama: "AHMAD JALALUDIN",
  nisn: "0102466271",
  kelas: "11-MIPA-3",
  waliKelas: "Drs. Mulyadi Saputra",
  rataRata: 89.4,
  pertumbuhan: 4.7,
  peluangPTN: 88,
  kehadiran: { persentase: 98.2, sakit: 1, izin: 2, alpa: 0 },
  karakter: {
    spiritual: "Sangat Baik",
    sosial: "Sangat Baik",
    catatan: "Menunjukkan integritas tinggi dan kepemimpinan yang baik dalam kelompok."
  },
  ekstrakurikuler: [
    { nama: "Pramuka", nilai: "A", deskripsi: "Aktif dalam kegiatan LDKS." },
    { nama: "Robotik", nilai: "A", deskripsi: "Juara 2 Nasional KRTI 2025." }
  ],
  mapelUtama: [
    { nama: "Matematika", nilai: 92, grade: "A", trend: 'up' },
    { nama: "Fisika", nilai: 88, grade: "B+", trend: 'up' },
    { nama: "Biologi", nilai: 95, grade: "A", trend: 'stable' },
    { nama: "B. Inggris", nilai: 90, grade: "A", trend: 'up' },
  ],
  riwayatSemester: [
    { id: '1', label: "Kls 10 Ganjil", nilai: 81, tahunAjaran: "2024/2025", isAktif: false },
    { id: '2', label: "Kls 10 Genap", nilai: 84, tahunAjaran: "2024/2025", isAktif: false },
    { id: '3', label: "Kls 11 Ganjil", nilai: 89, tahunAjaran: "2025/2026", isAktif: true },
  ],
  catatanWali: "Pertahankan fokus pada mapel eksakta. Sangat potensial masuk jalur SNBP."
};

export default function DashboardProgresSiswa() {
  const d = DATA_SISWA;

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-600/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto space-y-4">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-white/5 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Akademik Aktif • 2026</p>
            </div>
            <h1 className="text-6xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.8]">
              Progres <br /> <span className="text-indigo-600">Siswa.</span>
            </h1>
          </div>
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 text-right">
              <div className="space-y-1">
                <p className="text-sm font-black italic uppercase leading-none">{d.nama}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase italic">NISN: {d.nisn} • {d.kelas}</p>
              </div>
              <div className="w-12 h-12 bg-slate-200 dark:bg-white/10 rounded-2xl flex items-center justify-center">
                <FiUser size={24} className="text-slate-400" />
              </div>
            </div>
            <button className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase italic tracking-[0.2em] hover:scale-105 transition-all shadow-xl cursor-pointer">
              Unduh Laporan Digital <FiArrowRight className="inline ml-2" />
            </button>
          </div>
        </header>

        {/* --- GRID UTAMA (BENTO BOXES) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 1. STATISTIK NILAI (8 COLS) */}
          <div className="md:col-span-8 bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-16 relative z-10">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">Riwayat Akademik</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-widest">Tren rata-rata nilai semester</p>
              </div>
              <FiActivity className="text-indigo-600 dark:text-indigo-400" size={28} />
            </div>

            {/* CHART RENDER */}
            <div className="flex items-end justify-between h-64 gap-8 relative z-10 px-4 min-h-75">
              {d.riwayatSemester.map((item) => (
                <div key={item.id} className="flex-1 flex flex-col items-center gap-6 group/bar h-full">
                  <div className="relative w-full bg-slate-50 dark:bg-white/5 rounded-4xl h-full flex items-end overflow-hidden shadow-inner">
                    <div 
                      className={`w-full transition-all duration-1000 ease-out group-hover/bar:brightness-125 ${
                        item.isAktif ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      style={{ height: `${item.nilai}%` }}
                    >
                       <span className="absolute -top-8 w-full text-center text-xs font-black italic opacity-0 group-hover/bar:opacity-100 transition-all">
                        {item.nilai}
                       </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white italic leading-none">{item.label}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase italic mt-1">{item.tahunAjaran}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. KPI GROWTH & PTN (4 COLS) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-indigo-600 rounded-[3rem] p-10 text-white flex flex-col justify-between h-full relative overflow-hidden shadow-2xl shadow-indigo-600/30">
              <FiTrendingUp className="absolute -right-4 -bottom-4 text-[150px] opacity-10" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 italic leading-none">Laju Pertumbuhan</p>
              <div>
                <h4 className="text-8xl font-black italic tracking-tighter leading-[0.7]">+{d.pertumbuhan}%</h4>
                <p className="text-[11px] font-medium italic opacity-70 mt-6 leading-relaxed tracking-wide">Peningkatan konsisten dalam penguasaan kompetensi dasar.</p>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-white rounded-[3rem] p-10 text-white dark:text-black flex flex-col justify-between shadow-xl min-h-40">
               <div className="flex justify-between items-center">
                  <FiTarget size={24} className="opacity-40" />
                  <span className="text-[8px] font-black border border-white/20 dark:border-black/10 px-2 py-1 rounded-full uppercase italic">Prediksi Kelulusan SNBP</span>
               </div>
               <h4 className="text-5xl font-black italic tracking-tighter leading-none">{d.peluangPTN}% <span className="text-xs opacity-40 italic uppercase">Peluang Berhasil</span></h4>
            </div>
          </div>
        </div>

        {/* --- DATA SEKSI 2 (MAPEL & KARAKTER) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* 3. DAFTAR NILAI MAPEL UTAMA (7 COLS) */}
          <div className="md:col-span-7 bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-10">
              <FiBookOpen size={20} className="text-indigo-600" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic">Sorotan Mata Pelajaran</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {d.mapelUtama.map((m, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-3xl flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 italic mb-1">{m.nama}</p>
                    <h5 className="text-2xl font-black italic leading-none">{m.nilai}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black italic text-indigo-600 dark:text-indigo-400">{m.grade}</span>
                    <div className="text-[8px] font-bold uppercase text-emerald-500 flex items-center gap-1 justify-end">
                      <FiTrendingUp size={10} /> Naik
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. KARAKTER & SIKAP (5 COLS) */}
          <div className="md:col-span-5 bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-8">
              <FiStar size={20} className="text-amber-500" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] italic">Penilaian Karakter</h4>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase italic">Sikap Spiritual</span>
                <span className="text-xl font-black italic text-emerald-500 uppercase">{d.karakter.spiritual}</span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase italic">Sikap Sosial</span>
                <span className="text-xl font-black italic text-indigo-500 uppercase">{d.karakter.sosial}</span>
              </div>
              <p className="text-xs font-medium italic text-slate-500 dark:text-slate-400 leading-relaxed ">
                "{d.karakter.catatan}"
              </p>
            </div>
          </div>
        </div>

        {/* --- DATA SEKSI 3 (EKSKUL & ABSENSI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 5. EKSTRAKURIKULER */}
          <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-amber-500">
              <FiAnchor size={20} />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] italic">Ekstrakurikuler</h4>
            </div>
            <div className="space-y-6">
              {d.ekstrakurikuler.map((ekskul, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center font-black italic text-xl shrink-0">{ekskul.nilai}</div>
                  <div>
                    <p className="text-xs font-black italic uppercase leading-none mb-1">{ekskul.nama}</p>
                    <p className="text-[9px] font-medium text-slate-400 italic leading-tight">{ekskul.deskripsi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. LOG KEHADIRAN */}
          <div className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-[3rem] p-10 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-3 text-emerald-500 mb-8">
              <FiClock size={20} />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] italic">Persentase Kehadiran</h4>
            </div>
            <div className="flex items-end gap-3 mb-6">
              <h4 className="text-6xl font-black italic tracking-tighter leading-none">{d.kehadiran.persentase}%</h4>
              <span className="text-[10px] font-black uppercase text-emerald-500 mb-1 tracking-widest">Sangat Baik</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-white/5 pt-6">
               <div className="text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase italic">Sakit</p>
                  <p className="text-sm font-black italic">{d.kehadiran.sakit}</p>
               </div>
               <div className="text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase italic">Izin</p>
                  <p className="text-sm font-black italic">{d.kehadiran.izin}</p>
               </div>
               <div className="text-center">
                  <p className="text-[8px] font-bold text-slate-400 uppercase italic">Alpa</p>
                  <p className="text-sm font-black italic text-rose-500">{d.kehadiran.alpa}</p>
               </div>
            </div>
          </div>

          {/* 7. PRESTASI / AWARD */}
          <div className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-600/20 flex flex-col justify-between relative overflow-hidden">
             <FiAward className="absolute -right-4 -bottom-4 text-[120px] opacity-10" />
             <div className="flex items-center gap-3">
                <FiAward size={20} />
                <h4 className="text-[10px] font-black uppercase tracking-widest italic leading-none">Status Prestasi</h4>
             </div>
             <div>
                <h4 className="text-4xl font-black italic tracking-tighter leading-none">Peringkat 3 Besar</h4>
                <p className="text-[10px] font-medium italic opacity-70 mt-4 leading-relaxed tracking-wide">Konsisten berada di peringkat 10% terbaik di seluruh angkatan Kelas 11.</p>
             </div>
          </div>
        </div>

        {/* --- CATATAN WALI KELAS (DASHED BOX) --- */}
        <footer className="bg-white dark:bg-white/2 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-10 group transition-all hover:border-indigo-500/30">
           <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm shrink-0 group-hover:rotate-6 transition-transform duration-500">
              <FiEdit3 size={40} />
           </div>
           <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h5 className="text-xs font-black uppercase italic tracking-widest text-indigo-600 dark:text-indigo-400">Pesan Wali Kelas</h5>
                <span className="text-[9px] font-bold text-slate-400 uppercase italic">• {d.waliKelas}</span>
              </div>
              <p className="text-lg font-black italic text-slate-700 dark:text-slate-300 leading-relaxed ">
                "{d.catatanWali}"
              </p>
           </div>
           <div className="shrink-0 space-y-4">
              <div className="flex items-center gap-2 text-emerald-500 justify-center md:justify-end">
                <FiCheckCircle size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest italic">Data Terverifikasi</span>
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase italic text-center md:text-right flex items-center gap-2">
                <FiCalendar /> Diperbarui: 02 Feb 2026
              </p>
           </div>
        </footer>

      </main>
    </div>
  );
}