'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaGraduationCap, FaBook, FaFlask, FaCalculator, FaPalette, FaUserGraduate } from 'react-icons/fa';

// --- 1. TIPE DATA (Tidak Berubah) ---
interface KelasSekolah {
  id: string;
  namaKelas: string;
  waliKelas: string;
  tingkat: string;
  jurusan: 'IPA' | 'IPS' | null;
  ruangan: string;
  jumlahSiswa: number;
  kapasitas: number;
  icon: 'FaGraduationCap' | 'FaBook' | 'FaFlask' | 'FaCalculator' | 'FaPalette' | 'FaUserGraduate';
}

// --- 2. DATA SAMPLE (Tidak Berubah) ---
const dataKelasSekolah: KelasSekolah[] = [
  { id: '1', namaKelas: 'VII A', waliKelas: 'Siti Nurhaliza, S.Pd.', tingkat: 'VII', jurusan: null, ruangan: 'Ruang 7A', jumlahSiswa: 32, kapasitas: 36, icon: 'FaGraduationCap' },
  { id: '2', namaKelas: 'VII B', waliKelas: 'Budi Cahyono, S.Pd.', tingkat: 'VII', jurusan: null, ruangan: 'Ruang 7B', jumlahSiswa: 35, kapasitas: 36, icon: 'FaBook' },
  { id: '3', namaKelas: 'VIII C', waliKelas: 'Dewi Ratnasari, M.Pd.', tingkat: 'VIII', jurusan: null, ruangan: 'Ruang 8C', jumlahSiswa: 34, kapasitas: 36, icon: 'FaBook' },
  { id: '4', namaKelas: 'IX A', waliKelas: 'Rizki Pratama, S.Pd.', tingkat: 'IX', jurusan: null, ruangan: 'Ruang 9A', jumlahSiswa: 36, kapasitas: 36, icon: 'FaUserGraduate' },
  { id: '5', namaKelas: 'X IPA 1', waliKelas: 'Dr. Andi Wijaya, M.Si.', tingkat: 'X', jurusan: 'IPA', ruangan: 'Lab Kimia', jumlahSiswa: 30, kapasitas: 32, icon: 'FaFlask' },
  { id: '6', namaKelas: 'X IPA 2', waliKelas: 'Maya Sari, S.Pd.', tingkat: 'X', jurusan: 'IPA', ruangan: 'Lab Fisika', jumlahSiswa: 28, kapasitas: 32, icon: 'FaCalculator' },
  { id: '7', namaKelas: 'X IPS 1', waliKelas: 'Fajar Nugroho, S.Hum.', tingkat: 'X', jurusan: 'IPS', ruangan: 'Ruang 10 IPS 1', jumlahSiswa: 31, kapasitas: 32, icon: 'FaPalette' },
  { id: '8', namaKelas: 'XI IPA 3', waliKelas: 'Indah Permata, S.Pd.', tingkat: 'XI', jurusan: 'IPA', ruangan: 'Lab Biologi', jumlahSiswa: 29, kapasitas: 32, icon: 'FaFlask' },
];

// --- 3. KOMPONEN KARTU KELAS (DIPERBAIKI) ---
const KelasCard: React.FC<{ kelas: KelasSekolah }> = ({ kelas }) => {
    const router = useRouter()
  const iconMap: Record<string, React.ReactNode> = {
    FaGraduationCap: <FaGraduationCap />,
    FaBook: <FaBook />,
    FaFlask: <FaFlask />,
    FaCalculator: <FaCalculator />,
    FaPalette: <FaPalette />,
    FaUserGraduate: <FaUserGraduate />,
  };

  const kapasitasPersentase = (kelas.jumlahSiswa / kelas.kapasitas) * 100;
  const isPenuh = kelas.jumlahSiswa >= kelas.kapasitas;

  return (
    <div  onClick={() => router.push('/staff/akademik/kelas')} className="group relative bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4">
          <div className="shrink-0 bg-linear-to-br from-blue-500 to-cyan-400 dark:from-blue-600 dark:to-cyan-500 rounded-xl p-3 text-white shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl">{iconMap[kelas.icon]}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{kelas.namaKelas}</h3>
            {kelas.jurusan && <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{kelas.jurusan}</span>}
          </div>
        </div>
      </div>

      {/* Detail Informasi */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Wali Kelas</span>
          <span className="text-gray-900 dark:text-gray-100 text-right">{kelas.waliKelas}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Ruang</span>
          <span className="text-gray-900 dark:text-gray-100">{kelas.ruangan}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600 dark:text-gray-400">Tingkat</span>
          <span className="text-gray-900 dark:text-gray-100">{kelas.tingkat}</span>
        </div>
      </div>

      {/* Kapasitas Siswa */}
      <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">Jumlah Siswa</span>
          <span className={`font-bold ${isPenuh ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {kelas.jumlahSiswa} / {kelas.kapasitas}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${isPenuh ? 'bg-red-500' : 'bg-linear-to-r from-blue-400 to-cyan-400'}`}
            style={{ width: `${Math.min(kapasitasPersentase, 100)}%` }}
          ></div>
        </div>
        {isPenuh && <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-semibold">Kelas Penuh</p>}
      </div>
    </div>
  );
};

// --- 4. HALAMAN UTAMA (DIPERBAIKI) ---
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header dengan Tombol Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Data Kelas Sekolah</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Informasi lengkap mengenai setiap rombongan belajar.</p>
          </div>
         
        </div>

        {/* Grid Kartu Kelas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dataKelasSekolah.map((kelas) => (
            <KelasCard key={kelas.id} kelas={kelas} />
          ))}
        </div>
      </div>
    </main>
  );
}