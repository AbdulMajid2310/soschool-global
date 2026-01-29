// app/tagihan-siswa/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaFileInvoiceDollar, FaPlus, FaFilter, FaClock, FaCheckCircle, FaExclamationTriangle, FaMoneyBillWave } from 'react-icons/fa';

// --- 1. TIPE DATA ---
interface TagihanSiswa {
  id: string;
  namaSiswa: string;
  nis: string; // Nomor Induk Siswa
  kelas: string;
  jenisTagihan: 'SPP' | 'Uang Bangunan' | 'Daftar Ulang' | 'Lainnya';
  jumlah: number;
  jatuhTempo: string; // Format 'YYYY-MM-DD'
  status: 'Belum Dibayar' | 'Lunas' | 'Terlambat';
}

// --- 2. DATA TAGIHAN SISWA ---
const dataTagihan: TagihanSiswa[] = [
  { id: 'tg-001', namaSiswa: 'Ali bin Abu Thalib', nis: '2021001', kelas: 'VII A', jenisTagihan: 'SPP', jumlah: 150000, jatuhTempo: '2024-12-10', status: 'Lunas' },
  { id: 'tg-002', namaSiswa: 'Siti Khadijah', nis: '2021002', kelas: 'VII A', jenisTagihan: 'SPP', jumlah: 150000, jatuhTempo: '2025-01-10', status: 'Belum Dibayar' },
  { id: 'tg-003', namaSiswa: 'Umar bin Khattab', nis: '2020005', kelas: 'VIII C', jenisTagihan: 'Uang Bangunan', jumlah: 2000000, jatuhTempo: '2024-11-30', status: 'Terlambat' },
  { id: 'tg-004', namaSiswa: 'Aisyah binti Abu Bakar', nis: '2020006', kelas: 'VIII C', jenisTagihan: 'Daftar Ulang', jumlah: 500000, jatuhTempo: '2024-06-15', status: 'Lunas' },
  { id: 'tg-005', namaSiswa: 'Usman bin Affan', nis: '2019010', kelas: 'X IPA 1', jenisTagihan: 'SPP', jumlah: 175000, jatuhTempo: '2025-01-10', status: 'Belum Dibayar' },
  { id: 'tg-006', namaSiswa: 'Fatimah az-Zahra', nis: '2019011', kelas: 'X IPA 1', jenisTagihan: 'SPP', jumlah: 175000, jatuhTempo: '2024-12-10', status: 'Lunas' },
  { id: 'tg-007', namaSiswa: 'Abu Bakar ash-Shiddiq', nis: '2018020', kelas: 'XII IPS 2', jenisTagihan: 'SPP', jumlah: 200000, jatuhTempo: '2024-12-05', status: 'Terlambat' },
  { id: 'tg-008', namaSiswa: 'Hafsah binti Umar', nis: '2018021', kelas: 'XII IPS 2', jenisTagihan: 'Lainnya', jumlah: 250000, jatuhTempo: '2025-01-15', status: 'Belum Dibayar' },
];

// --- 3. KOMPONEN HALAMAN TAGIHAN SISWA ---
export default function TagihanSiswaPage() {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  const [filterKelas, setFilterKelas] = useState<string>('Semua');

  // Memfilter dan mengurutkan data tagihan
  const sortedTagihan = useMemo(() => {
    const filtered = dataTagihan.filter(tagihan => {
      const matchesStatus = filterStatus === 'Semua' || tagihan.status === filterStatus;
      const matchesKelas = filterKelas === 'Semua' || tagihan.kelas === filterKelas;
      return matchesStatus && matchesKelas;
    });

    // Mengurutkan berdasarkan status (Terlambat dulu), lalu tanggal jatuh tempo
    return filtered.sort((a, b) => {
      const statusOrder = { 'Terlambat': 0, 'Belum Dibayar': 1, 'Lunas': 2 };
      const statusComparison = statusOrder[a.status] - statusOrder[b.status];
      if (statusComparison !== 0) return statusComparison;
      return new Date(a.jatuhTempo).getTime() - new Date(b.jatuhTempo).getTime();
    });
  }, [filterStatus, filterKelas]);

  // Mendapatkan daftar unik untuk filter
  const daftarStatus = useMemo(() => ['Semua', 'Belum Dibayar', 'Lunas', 'Terlambat'], []);
  const daftarKelas = useMemo(() => {
    const kelasSet = new Set(dataTagihan.map(t => t.kelas));
    return ['Semua', ...Array.from(kelasSet).sort()];
  }, []);

  // Fungsi helper untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Fungsi helper untuk memformat mata uang
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Mapping status ke warna dan ikon
  const statusInfo = {
    'Belum Dibayar': { icon: <FaClock className="text-yellow-500" />, color: 'text-yellow-600 dark:text-yellow-400', borderColor: 'border-yellow-500' },
    'Lunas': { icon: <FaCheckCircle className="text-green-500" />, color: 'text-green-600 dark:text-green-400', borderColor: 'border-green-500' },
    'Terlambat': { icon: <FaExclamationTriangle className="text-red-500" />, color: 'text-red-600 dark:text-red-400', borderColor: 'border-red-500' },
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaFileInvoiceDollar className="mr-3 text-cyan-600 dark:text-cyan-400" />
              Tagihan Siswa
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola dan pantau status pembayaran tagihan siswa.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Tagihan
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span>
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500">
            {daftarStatus.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
          <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500">
            {daftarKelas.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
          </select>
        </div>

        {/* Grid Tagihan */}
        {sortedTagihan.length === 0 ? (
          <div className="text-center py-10">
            <FaFileInvoiceDollar className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada tagihan yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTagihan.map((tagihan) => {
              const info = statusInfo[tagihan.status];
              return (
                <div key={tagihan.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${info.borderColor} hover:shadow-lg transition-shadow duration-300`}>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tagihan.namaSiswa}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">NIS: {tagihan.nis}</p>
                    </div>
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full ${info.color}`}>
                      {info.icon}
                      <span className="ml-1">{tagihan.status}</span>
                    </span>
                  </div>
                  
                  {/* Detail Informasi */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <span className="font-medium">Kelas:</span> {tagihan.kelas}
                    </p>
                    <p>
                      <span className="font-medium">Jenis:</span> {tagihan.jenisTagihan}
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-medium">Jumlah:</span>
                      <span className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(tagihan.jumlah)}</span>
                    </p>
                    <p>
                      <span className="font-medium">Jatuh Tempo:</span> {formatDate(tagihan.jatuhTempo)}
                    </p>
                  </div>

                  {/* Aksi */}
                  {tagihan.status !== 'Lunas' && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        <FaMoneyBillWave className="mr-2" /> Tandai Lunas
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}