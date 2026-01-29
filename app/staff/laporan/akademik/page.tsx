// app/laporan-akademik/page.tsx

'use client';

import React from 'react';
import { 
  FaChartLine, FaUsers, FaGraduationCap, FaTrophy, FaExclamationTriangle,
  FaMedal, FaAward, FaStar
} from 'react-icons/fa';

// data/laporan-akademik.ts

// --- 1. DEFINISI TIPE DATA ---
export interface LaporanAkademikSummary {
  totalSiswa: number;
  nilaiRataRataUmum: number;
  tingkatKelulusan: number; // Dalam persen
  siswaBerprestasi: number; // Jumlah siswa dengan nilai > 85
  siswaPerluBimbingan: number; // Jumlah siswa dengan nilai < 70
}

export interface PeringkatKelas {
  namaKelas: string;
  jumlahSiswa: number;
  nilaiRataRata: number;
  peringkat: number;
}

export interface SiswaBerprestasi {
  nis: string;
  nama: string;
  kelas: string;
  nilaiRataRata: number;
}

// --- 2. DATA STATIS LAPORAN AKADEMIK ---
export const laporanAkademikSummary: LaporanAkademikSummary = {
  totalSiswa: 320,
  nilaiRataRataUmum: 78.5,
  tingkatKelulusan: 95.5,
  siswaBerprestasi: 48,
  siswaPerluBimbingan: 15,
};

export const peringkatKelas: PeringkatKelas[] = [
  { namaKelas: 'XII IPA 1', jumlahSiswa: 30, nilaiRataRata: 85.2, peringkat: 1 },
  { namaKelas: 'XI IPA 3', jumlahSiswa: 29, nilaiRataRata: 82.1, peringkat: 2 },
  { namaKelas: 'X IPA 1', jumlahSiswa: 32, nilaiRataRata: 80.5, peringkat: 3 },
  { namaKelas: 'XII IPS 2', jumlahSiswa: 31, nilaiRataRata: 79.8, peringkat: 4 },
  { namaKelas: 'VII A', jumlahSiswa: 36, nilaiRataRata: 77.3, peringkat: 5 },
  { namaKelas: 'VIII C', jumlahSiswa: 34, nilaiRataRata: 75.9, peringkat: 6 },
  { namaKelas: 'VII B', jumlahSiswa: 35, nilaiRataRata: 74.1, peringkat: 7 },
];

export const siswaBerprestasi: SiswaBerprestasi[] = [
  { nis: '2024015', nama: 'Toni Kusuma', kelas: 'XII IPA 1', nilaiRataRata: 92.5 },
  { nis: '2024028', nama: 'Lia Anggraini', kelas: 'XII IPA 1', nilaiRataRata: 91.8 },
  { nis: '2024011', nama: 'Reza Pahlevi', kelas: 'XI IPA 3', nilaiRataRata: 90.2 },
  { nis: '2024030', nama: 'Nadia Safitri', kelas: 'X IPA 1', nilaiRataRata: 89.5 },
  { nis: '2024022', nama: 'Fitri Handayani', kelas: 'XII IPS 2', nilaiRataRata: 88.9 },
];

export const siswaPerluBimbingan: SiswaBerprestasi[] = [
  { nis: '2024025', nama: 'Doni Hermawan', kelas: 'VII B', nilaiRataRata: 65.4 },
  { nis: '2024019', nama: 'Bambang Sutrisno', kelas: 'VIII C', nilaiRataRata: 67.1 },
  { nis: '2024027', nama: 'Kevin Sanjaya', kelas: 'VII A', nilaiRataRata: 68.9 },
  { nis: '2024013', nama: 'Hendra Gunawan', kelas: 'VIII C', nilaiRataRata: 69.2 },
  { nis: '2024024', nama: 'Hana Putri', kelas: 'VII B', nilaiRataRata: 69.8 },
];


// --- KOMPONEN HALAMAN LAPORAN AKADEMIK ---
export default function LaporanAkademikPage() {
  // --- 1. KOMPONEN KARTU INDIKATOR KINERJA (KPI) ---
  const KPICard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description: string;
  }> = ({ title, value, icon, color, description }) => (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );

  // --- 2. KOMPONEN IKON MEDALI ---
  const MedalIcon: React.FC<{ rank: number }> = ({ rank }) => {
    if (rank === 1) return <FaMedal className="text-yellow-400" title="Juara 1" />;
    if (rank === 2) return <FaAward className="text-gray-300" title="Juara 2" />;
    if (rank === 3) return <FaStar className="text-orange-400" title="Juara 3" />;
    return null;
  };

  // --- 3. DATA UNTUK KARTU KPI ---
  const kpiData = [
    {
      title: 'Total Siswa',
      value: laporanAkademikSummary.totalSiswa,
      icon: <FaUsers />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      description: 'Seluruh siswa aktif',
    },
    {
      title: 'Nilai Rata-Rata',
      value: laporanAkademikSummary.nilaiRataRataUmum.toFixed(1),
      icon: <FaChartLine />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      description: 'Rata-rata seluruh mata pelajaran',
    },
    {
      title: 'Tingkat Kelulusan',
      value: `${laporanAkademikSummary.tingkatKelulusan}%`,
      icon: <FaGraduationCap />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      description: 'Persentase siswa lulus standar KKM',
    },
    {
      title: 'Siswa Berprestasi',
      value: laporanAkademikSummary.siswaBerprestasi,
      icon: <FaTrophy />,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      description: 'Siswa dengan nilai > 85',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Laporan Akademik</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ringkasan dan analisis kinerja akademik sekolah.</p>
        </div>

        {/* Grid Kartu KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabel Peringkat Kelas */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaTrophy className="mr-2 text-yellow-500" />
              Peringkat Kelas
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Peringkat</th>
                    <th scope="col" className="px-4 py-3">Nama Kelas</th>
                    <th scope="col" className="px-4 py-3">Jumlah Siswa</th>
                    <th scope="col" className="px-4 py-3 text-right">Nilai Rata-Rata</th>
                  </tr>
                </thead>
                <tbody>
                  {peringkatKelas.map((kelas) => (
                    <tr key={kelas.namaKelas} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <MedalIcon rank={kelas.peringkat} />
                          <span className="ml-2">{kelas.peringkat}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{kelas.namaKelas}</td>
                      <td className="px-4 py-3">{kelas.jumlahSiswa}</td>
                      <td className="px-4 py-3 text-right font-semibold">{kelas.nilaiRataRata.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Daftar Siswa di Samping */}
          <div className="space-y-8">
            {/* Siswa Berprestasi */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaStar className="mr-2 text-yellow-500" />
                5 Siswa Terbaik
              </h2>
              <ul className="space-y-3">
                {siswaBerprestasi.slice(0, 5).map((siswa, index) => (
                  <li key={siswa.nis} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 mr-3">{index + 1}.</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{siswa.nama}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{siswa.kelas}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">{siswa.nilaiRataRata.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Siswa Perlu Bimbingan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaExclamationTriangle className="mr-2 text-red-500" />
                Siswa Perlu Bimbingan
              </h2>
              <ul className="space-y-3">
                {siswaPerluBimbingan.slice(0, 5).map((siswa) => (
                  <li key={siswa.nis} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{siswa.nama}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{siswa.kelas}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-600 dark:text-red-400">{siswa.nilaiRataRata.toFixed(1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}