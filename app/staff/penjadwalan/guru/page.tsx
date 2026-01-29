// app/jadwal-guru/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaChalkboardTeacher, FaFilter, FaPlus, FaUser } from 'react-icons/fa';

// --- 1. TIPE DATA ---
interface JadwalGuru {
  id: string;
  namaGuru: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  jamMulai: string; // '07:00'
  jamSelesai: string; // '07:45'
  mataPelajaran: string;
  namaKelas: string;
  ruangan: string;
}

// --- 2. DATA JADWAL GURU ---
// Data ini dibuat berdasarkan perspektif guru, bukan kelas
const dataJadwalGuru: JadwalGuru[] = [
  // Ahmad Fadli, S.Pd.
  { id: 'jg-001', namaGuru: 'Ahmad Fadli, S.Pd.', hari: 'Senin', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'Matematika', namaKelas: 'VII A', ruangan: 'Ruang 7A' },
  { id: 'jg-002', namaGuru: 'Ahmad Fadli, S.Pd.', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'Matematika', namaKelas: 'VII B', ruangan: 'Ruang 7B' },
  { id: 'jg-003', namaGuru: 'Ahmad Fadli, S.Pd.', hari: 'Jumat', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'Matematika', namaKelas: 'VII A', ruangan: 'Ruang 7A' },
  // Siti Nurhaliza, S.Pd.
  { id: 'jg-004', namaGuru: 'Siti Nurhaliza, S.Pd.', hari: 'Senin', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'Bahasa Indonesia', namaKelas: 'VII B', ruangan: 'Ruang 7B' },
  { id: 'jg-005', namaGuru: 'Siti Nurhaliza, S.Pd.', hari: 'Selasa', jamMulai: '07:45', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', namaKelas: 'VII A', ruangan: 'Ruang 7A' },
  { id: 'jg-006', namaGuru: 'Siti Nurhaliza, S.Pd.', hari: 'Kamis', jamMulai: '08:30', jamSelesai: '09:15', mataPelajaran: 'Bahasa Indonesia', namaKelas: 'VIII C', ruangan: 'Ruang 8C' },
  { id: 'jg-007', namaGuru: 'Siti Nurhaliza, S.Pd.', hari: 'Jumat', jamMulai: '07:45', jamSelesai: '08:30', mataPelajaran: 'Bahasa Indonesia', namaKelas: 'VII B', ruangan: 'Ruang 7B' },
  // Dewi Lestari, S.Pd.
  { id: 'jg-008', namaGuru: 'Dewi Lestari, S.Pd.', hari: 'Senin', jamMulai: '07:45', jamSelesai: '08:30', mataPelajaran: 'IPA Terpadu', namaKelas: 'VIII C', ruangan: 'Lab IPA' },
  { id: 'jg-009', namaGuru: 'Dewi Lestari, S.Pd.', hari: 'Rabu', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'IPA Terpadu', namaKelas: 'VII A', ruangan: 'Lab IPA' },
  { id: 'jg-010', namaGuru: 'Dewi Lestari, S.Pd.', hari: 'Kamis', jamMulai: '07:00', jamSelesai: '07:45', mataPelajaran: 'IPA Terpadu', namaKelas: 'VII B', ruangan: 'Lab IPA' },
  // Dr. Andi Wijaya, M.Si.
  { id: 'jg-011', namaGuru: 'Dr. Andi Wijaya, M.Si.', hari: 'Senin', jamMulai: '08:30', jamSelesai: '09:15', mataPelajaran: 'Fisika', namaKelas: 'X IPA 1', ruangan: 'Lab Fisika' },
  { id: 'jg-012', namaGuru: 'Dr. Andi Wijaya, M.Si.', hari: 'Kamis', jamMulai: '09:30', jamSelesai: '10:15', mataPelajaran: 'Matematika Wajib', namaKelas: 'X IPA 1', ruangan: 'Ruang 10 IPA 1' },
  // Maya Sari, M.Si.
  { id: 'jg-013', namaGuru: 'Maya Sari, M.Si.', hari: 'Selasa', jamMulai: '10:15', jamSelesai: '11:00', mataPelajaran: 'Kimia', namaKelas: 'X IPA 1', ruangan: 'Lab Kimia' },
];

// --- 3. KOMPONEN HALAMAN JADWAL GURU ---
export default function JadwalGuruPage() {
  const [filterGuru, setFilterGuru] = useState<string>('Semua');

  // Mendapatkan daftar unik untuk filter guru
  const daftarGuru = useMemo(() => {
    const guruSet = new Set(dataJadwalGuru.map(j => j.namaGuru));
    return ['Semua', ...Array.from(guruSet).sort()];
  }, []);

  // Memfilter dan mengurutkan data jadwal
  const filteredJadwal = useMemo(() => {
    const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    
    const filtered = dataJadwalGuru.filter(jadwal => {
      return filterGuru === 'Semua' || jadwal.namaGuru === filterGuru;
    });

    // Mengurutkan berdasarkan hari, lalu jam
    return filtered.sort((a, b) => {
      const dayComparison = dayOrder.indexOf(a.hari) - dayOrder.indexOf(b.hari);
      if (dayComparison !== 0) return dayComparison;
      return a.jamMulai.localeCompare(b.jamMulai); // Mengurutkan berdasarkan string waktu
    });
  }, [filterGuru]);

  // Mapping hari ke warna untuk indikator visual
  const dayColors = {
    'Senin': 'border-blue-500',
    'Selasa': 'border-green-500',
    'Rabu': 'border-yellow-500',
    'Kamis': 'border-red-500',
    'Jumat': 'border-purple-500',
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaChalkboardTeacher className="mr-3 text-teal-600 dark:text-teal-400" />
              Jadwal Guru
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Lihat jadwal mengajar untuk setiap guru.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Jadwal
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span>
          </div>
          <select
            value={filterGuru}
            onChange={(e) => setFilterGuru(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
          >
            {daftarGuru.map(guru => <option key={guru} value={guru}>{guru}</option>)}
          </select>
        </div>

        {/* Grid Jadwal */}
        {filteredJadwal.length === 0 ? (
          <div className="text-center py-10">
            <FaChalkboardTeacher className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada jadwal untuk guru yang dipilih.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJadwal.map((jadwal) => {
              const borderColor = dayColors[jadwal.hari] || 'border-gray-500';
              return (
                <div key={jadwal.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${borderColor} hover:shadow-lg transition-shadow duration-300`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{jadwal.mataPelajaran}</h3>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {jadwal.hari}
                    </span>
                  </div>
                  
                  {/* Detail Informasi */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-center">
                      <FaUser className="mr-2 text-gray-400" />
                      <span>{jadwal.namaGuru}</span>
                    </p>
                    <p>
                      <span className="font-medium">Kelas:</span> {jadwal.namaKelas}
                    </p>
                    <p>
                      <span className="font-medium">Waktu:</span> {jadwal.jamMulai} - {jadwal.jamSelesai}
                    </p>
                    <p>
                      <span className="font-medium">Ruangan:</span> {jadwal.ruangan}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}