// app/analisis-eskul/page.tsx

'use client';

import React, { useMemo } from 'react';
import { FaChartPie, FaUsers, FaTrophy, FaStar, FaArrowUp } from 'react-icons/fa';

// --- DATA (Diambil dari file lain untuk simulasi) ---
const dataEkskul = [
  { id: 'ek-001', namaEkskul: 'Pramuka', pembina: 'Ahmad Fadli, S.Pd.', jadwal: 'Sabtu, 07:00 - 09:00', deskripsi: 'Membina karakter...', jumlahAnggota: 45 },
  { id: 'ek-002', namaEkskul: 'Futsal', pembina: 'Rizki Pratama, S.Pd.', jadwal: 'Rabu, 15:00 - 17:00', deskripsi: 'Mengembangkan bakat...', jumlahAnggota: 22 },
  { id: 'ek-003', namaEkskul: 'PMR', pembina: 'Dewi Lestari, S.Pd.', jadwal: 'Jumat, 14:00 - 16:00', deskripsi: 'Melatih keterampilan...', jumlahAnggota: 30 },
  { id: 'ek-004', namaEkskul: 'Robotika', pembina: 'Dr. Andi Wijaya, M.Si.', jadwal: 'Selasa, 14:00 - 16:00', deskripsi: 'Mengenalkan teknologi...', jumlahAnggota: 15 },
  { id: 'ek-005', namaEkskul: 'Seni Tari', pembina: 'Rina Amelia, S.Pd.', jadwal: 'Kamis, 15:00 - 17:00', deskripsi: 'Melestarikan seni...', jumlahAnggota: 25 },
];

const dataPrestasi = [
  { id: 'pr-001', namaEkskul: 'Futsal', tingkat: 'Kabupaten/Kota' },
  { id: 'pr-002', namaEkskul: 'PMR', tingkat: 'Provinsi' },
  { id: 'pr-003', namaEkskul: 'Robotika', tingkat: 'Nasional' },
  { id: 'pr-004', namaEkskul: 'Seni Tari', tingkat: 'Sekolah' },
  { id: 'pr-005', namaEkskul: 'Futsal', tingkat: 'Sekolah' }, // Prestasi tambahan
];

// --- KOMPONEN ---
export default function AnalisisEkskulPage() {
  const analytics = useMemo(() => {
    const totalEkskul = dataEkskul.length;
    const totalAnggota = dataEkskul.reduce((sum, e) => sum + e.jumlahAnggota, 0);
    const totalPrestasi = dataPrestasi.length;

    // Jumlah Prestasi per Ekskul
    const prestasiPerEkskul = dataPrestasi.reduce((acc, curr) => {
      acc[curr.namaEkskul] = (acc[curr.namaEkskul] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = dataEkskul.map(ekskul => ({
      nama: ekskul.namaEkskul,
      anggota: ekskul.jumlahAnggota,
      prestasi: prestasiPerEkskul[ekskul.namaEkskul] || 0,
    })).sort((a, b) => b.prestasi - a.prestasi); // Urutkan berdasarkan prestasi terbanyak

    // Top Ekskul
    const topEkskulByAnggota = [...dataEkskul].sort((a, b) => b.jumlahAnggota - a.jumlahAnggota).slice(0, 3);
    const topEkskulByPrestasi = chartData.slice(0, 3);

    return { totalEkskul, totalAnggota, totalPrestasi, chartData, topEkskulByAnggota, topEkskulByPrestasi };
  }, []);

  const maxChartValue = useMemo(() => Math.max(...analytics.chartData.map(d => d.anggota)), [analytics.chartData]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaChartPie className="mr-3 text-indigo-600 dark:text-indigo-400" />
            Analisis Ekstrakulikuler
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pantau partisipasi dan pencapaian ekskul.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaUsers className="text-3xl text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Ekskul Aktif</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalEkskul}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaStar className="text-3xl text-yellow-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Siswa Terlibat</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalAnggota}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <FaTrophy className="text-3xl text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Prestasi</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.totalPrestasi}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Jumlah Anggota & Prestasi */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Anggota vs. Prestasi per Ekskul</h3>
            <div className="space-y-3">
              {analytics.chartData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.nama}</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.anggota} Anggota, {item.prestasi} Prestasi</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 flex">
                    <div className="bg-blue-600 h-2.5 rounded-l-full" style={{ width: `${(item.anggota / maxChartValue) * 100}%` }} title="Anggota"></div>
                    <div className="bg-green-600 h-2.5 rounded-r-full" style={{ width: `${(item.prestasi / 5) * 100}%` }} title="Prestasi"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Lists */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Peringkat Ekskul</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center"><FaUsers className="mr-2" />Terpopuler (Berdasarkan Anggota)</p>
                <ol className="list-decimal list-inside space-y-1">
                  {analytics.topEkskulByAnggota.map((ekskul, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{ekskul.namaEkskul} ({ekskul.jumlahAnggota} anggota)</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center"><FaTrophy className="mr-2" />Berprestasi (Berdasarkan Jumlah Prestasi)</p>
                <ol className="list-decimal list-inside space-y-1">
                  {analytics.topEkskulByPrestasi.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{item.nama} ({item.prestasi} prestasi)</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}