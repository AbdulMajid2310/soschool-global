// app/jadwal-pelajaran/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaChalkboardTeacher, FaClock, FaFilter, FaPlus } from 'react-icons/fa';

// --- 1. TIPE DATA ---
interface JadwalPelajaran {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  jamKe: number; // Sesi ke-1, ke-2, dst.
  jamMulai: string; // '07:00'
  jamSelesai: string; // '07:45'
  namaKelas: string;
  mataPelajaran: string;
  guruPengajar: string;
  ruangan: string;
}

// --- 2. DATA JADWAL PELAJARAN ---
const dataJadwal: JadwalPelajaran[] = [
  // SENIN
  { id: '1', hari: 'Senin', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII A', mataPelajaran: 'Matematika', guruPengajar: 'Ahmad Fadli, S.Pd.', ruangan: 'Ruang 7A' },
  { id: '2', hari: 'Senin', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII B', mataPelajaran: 'Bahasa Indonesia', guruPengajar: 'Siti Nurhaliza, S.Pd.', ruangan: 'Ruang 7B' },
  { id: '3', hari: 'Senin', jamKe: 2, jamMulai: '07:45', jamSelesai: '08:30', namaKelas: 'VIII C', mataPelajaran: 'IPA Terpadu', guruPengajar: 'Dewi Lestari, S.Pd.', ruangan: 'Lab IPA' },
  { id: '4', hari: 'Senin', jamKe: 3, jamMulai: '08:30', jamSelesai: '09:15', namaKelas: 'X IPA 1', mataPelajaran: 'Fisika', guruPengajar: 'Dr. Andi Wijaya, M.Si.', ruangan: 'Lab Fisika' },
  { id: '5', hari: 'Senin', jamKe: 4, jamMulai: '09:30', jamSelesai: '10:15', namaKelas: 'XII IPS 2', mataPelajaran: 'Ekonomi', guruPengajar: 'Chandra Liow, S.E.', ruangan: 'Ruang 12 IPS 2' },
  { id: '6', hari: 'Senin', jamKe: 5, jamMulai: '10:15', jamSelesai: '11:00', namaKelas: 'VII A', mataPelajaran: 'Seni Budaya', guruPengajar: 'Rina Amelia, S.Pd.', ruangan: 'Ruang 7A' },
  { id: '7', hari: 'Senin', jamKe: 6, jamMulai: '11:00', jamSelesai: '11:45', namaKelas: 'VIII C', mataPelajaran: 'IPS Terpadu', guruPengajar: 'Rizki Pratama, S.Pd.', ruangan: 'Ruang 8C' },
  { id: '8', hari: 'Senin', jamKe: 7, jamMulai: '12:30', jamSelesai: '13:15', namaKelas: 'X IPA 1', mataPelajaran: 'Biologi', guruPengajar: 'Fajar Nugroho, S.Pd.', ruangan: 'Lab Biologi' },
  { id: '9', hari: 'Senin', jamKe: 8, jamMulai: '13:15', jamSelesai: '14:00', namaKelas: 'XII IPS 2', mataPelajaran: 'Geografi', guruPengajar: 'Doni Hermawan, S.Pd.', ruangan: 'Ruang 12 IPS 2' },
  // SELASA
  { id: '10', hari: 'Selasa', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII B', mataPelajaran: 'Matematika', guruPengajar: 'Ahmad Fadli, S.Pd.', ruangan: 'Ruang 7B' },
  { id: '11', hari: 'Selasa', jamKe: 2, jamMulai: '07:45', jamSelesai: '08:30', namaKelas: 'VII A', mataPelajaran: 'Bahasa Indonesia', guruPengajar: 'Siti Nurhaliza, S.Pd.', ruangan: 'Ruang 7A' },
  { id: '12', hari: 'Selasa', jamKe: 4, jamMulai: '09:30', jamSelesai: '10:15', namaKelas: 'VIII C', mataPelajaran: 'IPS Terpadu', guruPengajar: 'Rizki Pratama, S.Pd.', ruangan: 'Ruang 8C' },
  { id: '13', hari: 'Selasa', jamKe: 5, jamMulai: '10:15', jamSelesai: '11:00', namaKelas: 'X IPA 1', mataPelajaran: 'Kimia', guruPengajar: 'Maya Sari, M.Si.', ruangan: 'Lab Kimia' },
  { id: '14', hari: 'Selasa', jamKe: 6, jamMulai: '11:00', jamSelesai: '11:45', namaKelas: 'XII IPS 2', mataPelajaran: 'Sosiologi', guruPengajar: 'Fitri Handayani, S.Sos.', ruangan: 'Ruang 12 IPS 2' },
  // RABU
  { id: '15', hari: 'Rabu', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII A', mataPelajaran: 'IPA Terpadu', guruPengajar: 'Dewi Lestari, S.Pd.', ruangan: 'Lab IPA' },
  { id: '16', hari: 'Rabu', jamKe: 2, jamMulai: '07:45', jamSelesai: '08:30', namaKelas: 'VII B', mataPelajaran: 'IPS Terpadu', guruPengajar: 'Rizki Pratama, S.Pd.', ruangan: 'Ruang 7B' },
  { id: '17', hari: 'Rabu', jamKe: 3, jamMulai: '08:30', jamSelesai: '09:15', namaKelas: 'VIII C', mataPelajaran: 'Matematika', guruPengajar: 'Budi Cahyono, S.Pd.', ruangan: 'Ruang 8C' },
  { id: '18', hari: 'Rabu', jamKe: 4, jamMulai: '09:30', jamSelesai: '10:15', namaKelas: 'X IPA 1', mataPelajaran: 'Bahasa Inggris', guruPengajar: 'Indah Permata, S.Pd.', ruangan: 'Ruang 10 IPA 1' },
  { id: '19', hari: 'Rabu', jamKe: 5, jamMulai: '10:15', jamSelesai: '11:00', namaKelas: 'XII IPS 2', mataPelajaran: 'Sejarah', guruPengajar: 'Fajar Nugroho, S.Pd.', ruangan: 'Ruang 12 IPS 2' },
  // KAMIS
  { id: '20', hari: 'Kamis', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII B', mataPelajaran: 'IPA Terpadu', guruPengajar: 'Dewi Lestari, S.Pd.', ruangan: 'Lab IPA' },
  { id: '21', hari: 'Kamis', jamKe: 2, jamMulai: '07:45', jamSelesai: '08:30', namaKelas: 'VII A', mataPelajaran: 'IPS Terpadu', guruPengajar: 'Rizki Pratama, S.Pd.', ruangan: 'Ruang 7A' },
  { id: '22', hari: 'Kamis', jamKe: 3, jamMulai: '08:30', jamSelesai: '09:15', namaKelas: 'VIII C', mataPelajaran: 'Bahasa Indonesia', guruPengajar: 'Siti Nurhaliza, S.Pd.', ruangan: 'Ruang 8C' },
  { id: '23', hari: 'Kamis', jamKe: 4, jamMulai: '09:30', jamSelesai: '10:15', namaKelas: 'X IPA 1', mataPelajaran: 'Matematika Wajib', guruPengajar: 'Dr. Andi Wijaya, M.Si.', ruangan: 'Ruang 10 IPA 1' },
  { id: '24', hari: 'Kamis', jamKe: 5, jamMulai: '10:15', jamSelesai: '11:00', namaKelas: 'XII IPS 2', mataPelajaran: 'Ekonomi', guruPengajar: 'Chandra Liow, S.E.', ruangan: 'Ruang 12 IPS 2' },
  // JUMAT
  { id: '25', hari: 'Jumat', jamKe: 1, jamMulai: '07:00', jamSelesai: '07:45', namaKelas: 'VII A', mataPelajaran: 'Matematika', guruPengajar: 'Ahmad Fadli, S.Pd.', ruangan: 'Ruang 7A' },
  { id: '26', hari: 'Jumat', jamKe: 2, jamMulai: '07:45', jamSelesai: '08:30', namaKelas: 'VII B', mataPelajaran: 'Bahasa Indonesia', guruPengajar: 'Siti Nurhaliza, S.Pd.', ruangan: 'Ruang 7B' },
  { id: '27', hari: 'Jumat', jamKe: 3, jamMulai: '08:30', jamSelesai: '09:15', namaKelas: 'VIII C', mataPelajaran: 'Seni Budaya', guruPengajar: 'Rina Amelia, S.Pd.', ruangan: 'Ruang 8C' },
  { id: '28', hari: 'Jumat', jamKe: 4, jamMulai: '09:30', jamSelesai: '10:15', namaKelas: 'X IPA 1', mataPelajaran: 'Biologi', guruPengajar: 'Fajar Nugroho, S.Pd.', ruangan: 'Lab Biologi' },
  { id: '29', hari: 'Jumat', jamKe: 5, jamMulai: '10:15', jamSelesai: '11:00', namaKelas: 'XII IPS 2', mataPelajaran: 'Sosiologi', guruPengajar: 'Fitri Handayani, S.Sos.', ruangan: 'Ruang 12 IPS 2' },
];

// --- 3. KOMPONEN HALAMAN JADWAL PELAJARAN ---
export default function JadwalPelajaranPage() {
  const [filterHari, setFilterHari] = useState<string>('Semua');
  const [filterKelas, setFilterKelas] = useState<string>('Semua');

  // Mendapatkan daftar unik untuk filter
  const daftarHari = useMemo(() => ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'], []);
  const daftarKelas = useMemo(() => {
    const kelasSet = new Set(dataJadwal.map(j => j.namaKelas));
    return ['Semua', ...Array.from(kelasSet).sort()];
  }, []);

  // Memfilter dan mengurutkan data jadwal
  const sortedJadwal = useMemo(() => {
    const dayOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    
    const filtered = dataJadwal.filter(jadwal => {
      const matchesHari = filterHari === 'Semua' || jadwal.hari === filterHari;
      const matchesKelas = filterKelas === 'Semua' || jadwal.namaKelas === filterKelas;
      return matchesHari && matchesKelas;
    });

    // Mengurutkan berdasarkan hari, lalu jam
    return filtered.sort((a, b) => {
      const dayComparison = dayOrder.indexOf(a.hari) - dayOrder.indexOf(b.hari);
      if (dayComparison !== 0) return dayComparison;
      return a.jamKe - b.jamKe;
    });
  }, [filterHari, filterKelas]);

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
              <FaClock className="mr-3 text-indigo-600 dark:text-indigo-400" />
              Jadwal Pelajaran
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Lihat dan kelola jadwal mengajar untuk semua kelas.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
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
            value={filterHari}
            onChange={(e) => setFilterHari(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {daftarHari.map(hari => <option key={hari} value={hari}>{hari}</option>)}
          </select>
          <select
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {daftarKelas.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
          </select>
        </div>

        {/* Grid Jadwal */}
        {sortedJadwal.length === 0 ? (
          <div className="text-center py-10">
            <FaClock className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada jadwal pelajaran yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJadwal.map((jadwal) => {
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
                    <p>
                      <span className="font-medium">Kelas:</span> {jadwal.namaKelas}
                    </p>
                    <p className="flex items-center">
                      <FaChalkboardTeacher className="mr-2 text-gray-400" />
                      <span>{jadwal.guruPengajar}</span>
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