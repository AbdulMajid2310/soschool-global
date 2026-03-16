// app/analitik-nilai/page.tsx

'use client';

import React, { useMemo } from 'react';
import { FaChartBar, FaTrophy, FaUserGraduate, FaExclamationTriangle } from 'react-icons/fa';

// --- TIPE DATA ---
interface NilaiAnalitik {
  id: string;
  siswa: string;
  kelas: string;
  mapel: string;
  jenis: string;
  nilai: number;
}

// --- DATA ---
const dataNilaiAnalitik: NilaiAnalitik[] = [
  { id: 'n-1', siswa: 'Ali', kelas: 'VII A', mapel: 'Matematika', jenis: 'UAS', nilai: 92 },
  { id: 'n-2', siswa: 'Siti', kelas: 'VII A', mapel: 'Matematika', jenis: 'UAS', nilai: 88 },
  { id: 'n-3', siswa: 'Umar', kelas: 'VII A', mapel: 'Matematika', jenis: 'UAS', nilai: 75 },
  { id: 'n-4', siswa: 'Ali', kelas: 'VII A', mapel: 'B. Indonesia', jenis: 'UAS', nilai: 85 },
  { id: 'n-5', siswa: 'Siti', kelas: 'VII A', mapel: 'B. Indonesia', jenis: 'UAS', nilai: 90 },
  { id: 'n-6', siswa: 'Umar', kelas: 'VII A', mapel: 'B. Indonesia', jenis: 'UAS', nilai: 78 },
  { id: 'n-7', siswa: 'Budi', kelas: 'VII B', mapel: 'Matematika', jenis: 'UAS', nilai: 65 }, // Nilai Rendah
];

// --- KOMPONEN ---
export default function AnalitikNilaiPage() {
  const analytics = useMemo(() => {
    const totalNilai = dataNilaiAnalitik.reduce((sum, n) => sum + n.nilai, 0);
    const rataRata = totalNilai / dataNilaiAnalitik.length;
    const nilaiTertinggi = Math.max(...dataNilaiAnalitik.map(n => n.nilai));
    const nilaiTerendah = Math.min(...dataNilaiAnalitik.map(n => n.nilai));

    // Rata-rata per mapel
    const rataPerMapel = dataNilaiAnalitik.reduce((acc, curr) => {
      if (!acc[curr.mapel]) {
        acc[curr.mapel] = { total: 0, count: 0 };
      }
      acc[curr.mapel].total += curr.nilai;
      acc[curr.mapel].count++;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const avgMapelData = Object.entries(rataPerMapel).map(([mapel, data]) => ({
      mapel,
      rataRata: data.total / data.count,
    }));

    // Distribusi Nilai
    const distribusi = { A: 0, B: 0, C: 0, D: 0 };
    dataNilaiAnalitik.forEach(n => {
      if (n.nilai >= 85) distribusi.A++;
      else if (n.nilai >= 70) distribusi.B++;
      else if (n.nilai >= 55) distribusi.C++;
      else distribusi.D++;
    });

    // Siswa Berprestasi & Perlu Bimbingan
    const siswaBerprestasi = dataNilaiAnalitik.filter(n => n.nilai >= 90).map(n => n.siswa);
    const siswaPerluBimbingan = dataNilaiAnalitik.filter(n => n.nilai < 70).map(n => n.siswa);

    return { rataRata, nilaiTertinggi, nilaiTerendah, avgMapelData, distribusi, siswaBerprestasi, siswaPerluBimbingan };
  }, []);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID').format(amount);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaChartBar className="mr-3 text-rose-600 dark:text-rose-400" />
            Analitik Nilai
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pantau performa akademik siswa secara keseluruhan.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaTrophy className="text-3xl text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Rata-Rata Keseluruhan</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.rataRata.toFixed(1)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaUserGraduate className="text-3xl text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Nilai Tertinggi</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.nilaiTertinggi}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaExclamationTriangle className="text-3xl text-red-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Nilai Terendah</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.nilaiTerendah}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rata-Rata per Mapel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Rata-Rata per Mata Pelajaran</h3>
            <div className="space-y-3">
              {analytics.avgMapelData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.mapel}</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.rataRata.toFixed(1)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.rataRata}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analisis Siswa */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analisis Siswa</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">Berprestasi (Nilai &gt;= 90)</p>
                <div className="flex flex-wrap gap-2">
                  {analytics.siswaBerprestasi.length > 0 ? analytics.siswaBerprestasi.map((siswa, i) => (
                    <span key={i} className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">{siswa}</span>
                  )) : <span className="text-xs text-gray-500 dark:text-gray-400">Tidak ada</span>}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">Perlu Bimbingan (Nilai &gt; 70)</p>
                <div className="flex flex-wrap gap-2">
                  {analytics.siswaPerluBimbingan.length > 0 ? analytics.siswaPerluBimbingan.map((siswa, i) => (
                    <span key={i} className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">{siswa}</span>
                  )) : <span className="text-xs text-gray-500 dark:text-gray-400">Tidak ada</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}