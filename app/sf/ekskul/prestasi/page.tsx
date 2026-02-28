// app/prestasi-eskul/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaTrophy, FaPlus, FaFilter, FaMedal, FaUser, FaCalendarAlt } from 'react-icons/fa';

// --- TIPE DATA ---
interface PrestasiEkskul {
  id: string;
  namaSiswa: string;
  nis: string;
  namaEkskul: string;
  jenisPrestasi: string;
  tingkat: 'Internasional' | 'Nasional' | 'Provinsi' | 'Kabupaten/Kota' | 'Sekolah';
  tanggal: string; // 'YYYY-MM-DD'
}

// --- DATA ---
const dataPrestasi: PrestasiEkskul[] = [
  { id: 'pr-001', namaSiswa: 'Ali bin Abu Thalib', nis: '2021001', namaEkskul: 'Futsal', jenisPrestasi: 'Juara 1 Liga Futsal Pelajar', tingkat: 'Kabupaten/Kota', tanggal: '2024-11-20' },
  { id: 'pr-002', namaSiswa: 'Siti Khadijah', nis: '2021002', namaEkskul: 'PMR (Palang Merah Remaja)', jenisPrestasi: 'Tim Tanggap Darurat Terbaik', tingkat: 'Provinsi', tanggal: '2024-10-15' },
  { id: 'pr-003', namaSiswa: 'Umar bin Khattab', nis: '2021003', namaEkskul: 'Robotika', jenisPrestasi: 'Finalis Olimpiade Robotika', tingkat: 'Nasional', tanggal: '2024-09-30' },
  { id: 'pr-004', namaSiswa: 'Aisyah binti Abu Bakar', nis: '2020006', namaEkskul: 'Seni Tari', jenisPrestasi: 'Penari Utama Terbaik', tingkat: 'Sekolah', tanggal: '2024-12-01' },
];

// --- KOMPONEN ---
export default function PrestasiEkskulPage() {
  const [filterEkskul, setFilterEkskul] = useState<string>('Semua');
  const [filterTingkat, setFilterTingkat] = useState<string>('Semua');

  const sortedPrestasi = useMemo(() => {
    const filtered = dataPrestasi.filter(p => {
      const matchesEkskul = filterEkskul === 'Semua' || p.namaEkskul === filterEkskul;
      const matchesTingkat = filterTingkat === 'Semua' || p.tingkat === filterTingkat;
      return matchesEkskul && matchesTingkat;
    });
    return filtered.sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
  }, [filterEkskul, filterTingkat]);

  const daftarEkskul = useMemo(() => ['Semua', ...Array.from(new Set(dataPrestasi.map(p => p.namaEkskul)))], []);
  const daftarTingkat = useMemo(() => ['Semua', 'Internasional', 'Nasional', 'Provinsi', 'Kabupaten/Kota', 'Sekolah'], []);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const tingkatColors = {
    'Internasional': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Nasional': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Provinsi': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Kabupaten/Kota': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Sekolah': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaTrophy className="mr-3 text-yellow-600 dark:text-yellow-400" />
              Prestasi Ekstrakulikuler
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Catat prestasi membanggakan siswa.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Prestasi
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center"><FaFilter className="text-gray-500 dark:text-gray-400 mr-2" /><span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span></div>
          <select value={filterEkskul} onChange={(e) => setFilterEkskul(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500">
            {daftarEkskul.map(ekskul => <option key={ekskul} value={ekskul}>{ekskul}</option>)}
          </select>
          <select value={filterTingkat} onChange={(e) => setFilterTingkat(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500">
            {daftarTingkat.map(tingkat => <option key={tingkat} value={tingkat}>{tingkat}</option>)}
          </select>
        </div>

        {/* Grid Prestasi */}
        {sortedPrestasi.length === 0 ? (
          <div className="text-center py-10"><FaTrophy className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" /><p className="text-gray-500 dark:text-gray-400">Belum ada prestasi yang dicatat.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPrestasi.map(prestasi => (
              <div key={prestasi.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{prestasi.jenisPrestasi}</h3>
                  <FaMedal className="text-yellow-500 text-xl" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center"><FaUser className="mr-2 text-gray-400" /> {prestasi.namaSiswa} ({prestasi.nis})</p>
                  <p><span className="font-medium">Ekskul:</span> {prestasi.namaEkskul}</p>
                  <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-400" /> {formatDate(prestasi.tanggal)}</p>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${tingkatColors[prestasi.tingkat]}`}>
                    {prestasi.tingkat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}