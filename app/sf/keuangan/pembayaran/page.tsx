// app/pembayaran/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaMoneyBillWave, FaPlus, FaFilter, FaCheckCircle, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

// --- TIPE DATA ---
interface Pembayaran {
  id: string;
  tanggalBayar: string;
  namaSiswa: string;
  nis: string;
  jenisTagihan: string;
  jumlahBayar: number;
  metodePembayaran: 'Transfer' | 'Tunai' | 'E-Wallet';
  penerima: string;
}

// --- DATA ---
const dataPembayaran: Pembayaran[] = [
  { id: 'by-001', tanggalBayar: '2024-12-09', namaSiswa: 'Ali bin Abu Thalib', nis: '2021001', jenisTagihan: 'SPP', jumlahBayar: 150000, metodePembayaran: 'Transfer', penerima: 'Bendahara 1' },
  { id: 'by-002', tanggalBayar: '2024-12-08', namaSiswa: 'Fatimah az-Zahra', nis: '2019011', jenisTagihan: 'SPP', jumlahBayar: 175000, metodePembayaran: 'E-Wallet', penerima: 'Bendahara 2' },
  { id: 'by-003', tanggalBayar: '2024-11-29', namaSiswa: 'Aisyah binti Abu Bakar', nis: '2020006', jenisTagihan: 'Daftar Ulang', jumlahBayar: 500000, metodePembayaran: 'Tunai', penerima: 'Bendahara 1' },
];

// --- KOMPONEN ---
export default function PembayaranPage() {
  const [filterMetode, setFilterMetode] = useState<string>('Semua');

  const sortedPembayaran = useMemo(() => {
    const filtered = dataPembayaran.filter(p => filterMetode === 'Semua' || p.metodePembayaran === filterMetode);
    return filtered.sort((a, b) => new Date(b.tanggalBayar).getTime() - new Date(a.tanggalBayar).getTime());
  }, [filterMetode]);

  const daftarMetode = useMemo(() => ['Semua', 'Transfer', 'Tunai', 'E-Wallet'], []);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaMoneyBillWave className="mr-3 text-green-600 dark:text-green-400" />
              Riwayat Pembayaran
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Catat semua transaksi pembayaran yang telah masuk.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Catat Pembayaran
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span>
          </div>
          <select value={filterMetode} onChange={(e) => setFilterMetode(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500">
            {daftarMetode.map(metode => <option key={metode} value={metode}>{metode}</option>)}
          </select>
        </div>

        {sortedPembayaran.length === 0 ? (
          <div className="text-center py-10"><FaMoneyBillWave className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" /><p className="text-gray-500 dark:text-gray-400">Belum ada catatan pembayaran.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPembayaran.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{p.namaSiswa}</h3>
                  <FaCheckCircle className="text-green-500 text-xl" />
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><span className="font-medium">NIS:</span> {p.nis}</p>
                  <p><span className="font-medium">Tagihan:</span> {p.jenisTagihan}</p>
                  <p className="flex items-center justify-between">
                    <span className="font-medium">Jumlah:</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(p.jumlahBayar)}</span>
                  </p>
                  <p className="flex items-center"><FaCreditCard className="mr-2 text-gray-400" /> {p.metodePembayaran}</p>
                  <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-400" /> {formatDate(p.tanggalBayar)}</p>
                  <p><span className="font-medium">Diterima oleh:</span> {p.penerima}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}