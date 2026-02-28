// app/nilai/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { FaGraduationCap, FaEdit, FaIdCard, FaChartBar, FaHistory } from 'react-icons/fa';

// --- TIPE DATA ---
interface FiturNilai {
  id: string;
  judul: string;
  deskripsi: string;
  icon: React.ReactNode;
  link: string;
  warna: string;
}

// --- DATA ---
const fiturNilai: FiturNilai[] = [
  {
    id: 'f-1',
    judul: 'Input Nilai',
    deskripsi: 'Masukkan nilai untuk tugas, ulangan, dan ujian.',
    icon: <FaEdit />,
    link: '/input-nilai',
    warna: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    id: 'f-2',
    judul: 'Raport Siswa',
    deskripsi: 'Lihat dan cetak raport lengkap siswa per semester.',
    icon: <FaIdCard />,
    link: '/raport-siswa',
    warna: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'f-3',
    judul: 'Analitik Nilai',
    deskripsi: 'Analisis mendalam tentang performa akademik siswa.',
    icon: <FaChartBar />,
    link: '/analitik-nilai',
    warna: 'text-rose-600 dark:text-rose-400',
  },
];

// --- KOMPONEN ---
export default function NilaiPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaGraduationCap className="mr-3 text-emerald-600 dark:text-emerald-400" />
            Manajemen Nilai
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pusat kelola dan analisis nilai siswa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {fiturNilai.map(fitur => (
            <Link key={fitur.id} href={fitur.link} className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-transparent group-hover:border-emerald-500">
              <div className={`text-4xl ${fitur.warna} mb-4 group-hover:scale-110 transition-transform`}>
                {fitur.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{fitur.judul}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{fitur.deskripsi}</p>
            </Link>
          ))}
        </div>

        {/* Section Tambahan: Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FaHistory className="mr-2 text-gray-400" />
            Aktivitas Terkini
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada aktivitas nilai yang tercatat.</p>
          {/* Di sini bisa ditampilkan 5 input nilai terakhir */}
        </div>
      </div>
    </main>
  );
}