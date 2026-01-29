// app/ujian/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaCalendarAlt, FaPlus, FaFilter, FaClock, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

// --- 1. TIPE DATA ---
interface Ujian {
  id: string;
  namaUjian: string;
  mataPelajaran: string;
  kelas: string;
  tanggal: string; // Format 'YYYY-MM-DD'
  jamMulai: string; // Format 'HH:mm'
  jamSelesai: string; // Format 'HH:mm'
  ruangan: string;
  pengawas: string[]; // Bisa lebih dari satu
  jenisUjian: 'UTS' | 'UAS' | 'UKK';
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

// --- 2. DATA JADWAL UJIAN ---
const dataUjian: Ujian[] = [
  // UJIAN TENGAH SEMESTER (UTS)
  { id: 'uj-001', namaUjian: 'Ujian Tengah Semester Ganjil', mataPelajaran: 'Matematika', kelas: 'VII A', tanggal: '2024-09-30', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 7A', pengawas: ['Ahmad Fadli, S.Pd.', 'Siti Nurhaliza, S.Pd.'], jenisUjian: 'UTS', status: 'Selesai' },
  { id: 'uj-002', namaUjian: 'Ujian Tengah Semester Ganjil', mataPelajaran: 'IPA Terpadu', kelas: 'VII B', tanggal: '2024-09-30', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Lab IPA', pengawas: ['Dewi Lestari, S.Pd.'], jenisUjian: 'UTS', status: 'Selesai' },
  { id: 'uj-003', namaUjian: 'Ujian Tengah Semester Ganjil', mataPelajaran: 'Bahasa Indonesia', kelas: 'VIII C', tanggal: '2024-10-01', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 8C', pengawas: ['Rizki Pratama, S.Pd.'], jenisUjian: 'UTS', status: 'Selesai' },
  { id: 'uj-004', namaUjian: 'Ujian Tengah Semester Ganjil', mataPelajaran: 'Fisika', kelas: 'X IPA 1', tanggal: '2024-10-02', jamMulai: '08:00', jamSelesai: '10:30', ruangan: 'Lab Fisika', pengawas: ['Dr. Andi Wijaya, M.Si.'], jenisUjian: 'UTS', status: 'Selesai' },
  { id: 'uj-005', namaUjian: 'Ujian Tengah Semester Ganjil', mataPelajaran: 'Ekonomi', kelas: 'XII IPS 2', tanggal: '2024-10-02', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 12 IPS 2', pengawas: ['Chandra Liow, S.E.'], jenisUjian: 'UTS', status: 'Selesai' },
  // UJIAN AKHIR SEMESTER (UAS)
  { id: 'uj-006', namaUjian: 'Ujian Akhir Semester Genap', mataPelajaran: 'Matematika', kelas: 'VII A', tanggal: '2024-06-03', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 7A', pengawas: ['Ahmad Fadli, S.Pd.'], jenisUjian: 'UAS', status: 'Selesai' },
  { id: 'uj-007', namaUjian: 'Ujian Akhir Semester Genap', mataPelajaran: 'Bahasa Indonesia', kelas: 'VII B', tanggal: '2024-06-04', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 7B', pengawas: ['Siti Nurhaliza, S.Pd.'], jenisUjian: 'UAS', status: 'Selesai' },
  { id: 'uj-008', namaUjian: 'Ujian Akhir Semester Genap', mataPelajaran: 'Biologi', kelas: 'X IPA 1', tanggal: '2024-06-05', jamMulai: '08:00', jamSelesai: '10:30', ruangan: 'Lab Biologi', pengawas: ['Fajar Nugroho, S.Pd.'], jenisUjian: 'UAS', status: 'Selesai' },
  { id: 'uj-009', namaUjian: 'Ujian Akhir Semester Genap', mataPelajaran: 'Geografi', kelas: 'XII IPS 2', tanggal: '2024-06-05', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 12 IPS 2', pengawas: ['Doni Hermawan, S.Pd.'], jenisUjian: 'UAS', status: 'Selesai' },
  // UJIAN KENAIKAN (UKK)
  { id: 'uj-010', namaUjian: 'Ujian Kompetensi Keahlian', mataPelajaran: 'Teknologi Informasi', kelas: 'XII IPA 1', tanggal: '2024-05-15', jamMulai: '07:00', jamSelesai: '09:00', ruangan: 'Lab Komputer', pengawas: ['Budi Santoso, S.Pd.'], jenisUjian: 'UKK', status: 'Selesai' },
  // UJIAN YANG AKAN DATANG
  { id: 'uj-011', namaUjian: 'Ujian Praktikum Semester Ganjil', mataPelajaran: 'Kimia', kelas: 'XI IPA 1', tanggal: '2024-12-16', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Lab Kimia', pengawas: ['Maya Sari, M.Si.'], jenisUjian: 'UTS', status: 'Akan Datang' },
  { id: 'uj-012', namaUjian: 'Ujian Praktikum Semester Ganjil', mataPelajaran: 'Fisika', kelas: 'XI IPA 1', tanggal: '2024-12-16', jamMulai: '10:30', jamSelesai: '12:30', ruangan: 'Lab Fisika', pengawas: ['Dr. Andi Wijaya, M.Si.'], jenisUjian: 'UTS', status: 'Akan Datang' },
  { id: 'uj-013', namaUjian: 'Ujian Akhir Semester Genap', mataPelajaran: 'Sejarah', kelas: 'XII IPS 2', tanggal: '2024-12-20', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 12 IPS 2', pengawas: ['Fitri Handayani, S.Sos.'], jenisUjian: 'UAS', status: 'Akan Datang' },
];

// --- 3. KOMPONEN HALAMAN JADWAL UJIAN ---
export default function UjianPage() {
  const [filterJenis, setFilterJenis] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterKelas, setFilterKelas] = useState<string>('Semua');

  // Memfilter data ujian berdasarkan filter yang dipilih
  const filteredUjian = useMemo(() => {
    return dataUjian.filter(ujian => {
      const matchesJenis = filterJenis === 'Semua' || ujian.jenisUjian === filterJenis;
      const matchesStatus = filterStatus === 'Semua' || ujian.status === filterStatus;
      const matchesKelas = filterKelas === 'Semua' || ujian.kelas === filterKelas;
      return matchesJenis && matchesStatus && matchesKelas;
    });
  }, [filterJenis, filterStatus, filterKelas]);

  // Mengurutkan ujian berdasarkan tanggal
  const sortedUjian = useMemo(() => {
    return [...filteredUjian].sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());
  }, [filteredUjian]);

  // Mendapatkan daftar unik untuk filter
  const daftarJenis = useMemo(() => ['Semua', 'UTS', 'UAS', 'UKK'], []);
  const daftarStatus = useMemo(() => ['Semua', 'Akan Datang', 'Sedang Berlangsung', 'Selesai'], []);
  const daftarKelas = useMemo(() => {
    const kelasSet = new Set(dataUjian.map(u => u.kelas));
    return ['Semua', ...Array.from(kelasSet).sort()];
  }, []);

  // Fungsi helper untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Mapping status ke warna dan ikon
  const statusInfo = {
    'Akan Datang': { icon: <FaClock className="text-blue-500" />, color: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-500' },
    'Sedang Berlangsung': { icon: <FaHourglassHalf className="text-orange-500" />, color: 'text-orange-600 dark:text-orange-400', borderColor: 'border-orange-500' },
    'Selesai': { icon: <FaCheckCircle className="text-green-500" />, color: 'text-green-600 dark:text-green-400', borderColor: 'border-green-500' },
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaCalendarAlt className="mr-3 text-purple-600 dark:text-purple-400" />
              Jadwal Ujian
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola dan pantau seluruh jadwal ujian sekolah.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Jadwal
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span>
          </div>
          <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500">
            {daftarJenis.map(jenis => <option key={jenis} value={jenis}>{jenis}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500">
            {daftarStatus.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500">
            {daftarKelas.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
          </select>
        </div>

        {/* Grid Ujian */}
        {sortedUjian.length === 0 ? (
          <div className="text-center py-10">
            <FaCalendarAlt className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada jadwal ujian yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedUjian.map((ujian) => {
              const info = statusInfo[ujian.status];
              return (
                <div key={ujian.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${info.borderColor} hover:shadow-lg transition-shadow duration-300`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{ujian.namaUjian}</h3>
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full ${info.color}`}>
                      {info.icon}
                      <span className="ml-1">{ujian.status}</span>
                    </span>
                  </div>
                  
                  {/* Detail Informasi */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <span className="font-medium">Mata Pelajaran:</span> {ujian.mataPelajaran}
                    </p>
                    <p>
                      <span className="font-medium">Kelas:</span> {ujian.kelas}
                    </p>
                    <p>
                      <span className="font-medium">Tanggal:</span> {formatDate(ujian.tanggal)}
                    </p>
                    <p>
                      <span className="font-medium">Waktu:</span> {ujian.jamMulai} - {ujian.jamSelesai}
                    </p>
                    <p>
                      <span className="font-medium">Ruang:</span> {ujian.ruangan}
                    </p>
                    <p>
                      <span className="font-medium">Pengawas:</span> {ujian.pengawas.join(', ')}
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