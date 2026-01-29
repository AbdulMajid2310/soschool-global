// app/laporan/page.tsx

'use client';

import React from 'react';
import { FaFileAlt, FaChartLine, FaUsers, FaDollarSign, FaBook } from 'react-icons/fa';

// --- TIPE DATA ---
interface Laporan {
  id: string;
  namaLaporan: string;
  deskripsi: string;
  icon: React.ReactNode;
  warna: string;
}

// --- DATA ---
const daftarLaporan: Laporan[] = [
  { id: 'lap-1', namaLaporan: 'Laporan Keuangan Bulanan', deskripsi: 'Ringkasan pemasukan dan pengeluaran per bulan.', icon: <FaChartLine />, warna: 'text-blue-600' },
  { id: 'lap-2', namaLaporan: 'Rekapitulasi Pembayaran SPP', deskripsi: 'Daftar siswa yang sudah dan belum membayar SPP.', icon: <FaDollarSign />, warna: 'text-green-600' },
  { id: 'lap-3', namaLaporan: 'Data Siswa Per Kelas', deskripsi: 'Jumlah dan daftar nama siswa untuk setiap kelas.', icon: <FaUsers />, warna: 'text-purple-600' },
  { id: 'lap-4', namaLaporan: 'Laporan Nilai Ujian', deskripsi: 'Rekap nilai ujian untuk semua mata pelajaran.', icon: <FaBook />, warna: 'text-red-600' },
];

// --- KOMPONEN ---
export default function LaporanPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaFileAlt className="mr-3 text-gray-600 dark:text-gray-400" />
            Pusat Laporan
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pilih dan buat laporan yang Anda butuhkan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {daftarLaporan.map(laporan => (
            <div key={laporan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <div className={`text-4xl ${laporan.warna} mb-4 group-hover:scale-110 transition-transform`}>
                {laporan.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{laporan.namaLaporan}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{laporan.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}