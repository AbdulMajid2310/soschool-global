// app/penggajian/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaUserTie, FaPlus, FaFilter, FaMoneyCheckAlt, FaExclamationTriangle } from 'react-icons/fa';

// --- TIPE DATA ---
interface Penggajian {
  id: string;
  namaGuru: string;
  jabatan: string;
  gajiPokok: number;
  tunjangan: number;
  potongan: number;
  totalGaji: number;
  statusPembayaran: 'Sudah Dibayar' | 'Belum Dibayar';
  tanggalBayar?: string;
}

// --- DATA ---
const dataPenggajian: Penggajian[] = [
  { id: 'pg-001', namaGuru: 'Ahmad Fadli, S.Pd.', jabatan: 'Guru Tetap', gajiPokok: 5000000, tunjangan: 1000000, potongan: 500000, totalGaji: 5500000, statusPembayaran: 'Belum Dibayar' },
  { id: 'pg-002', namaGuru: 'Dr. Andi Wijaya, M.Si.', jabatan: 'Kepala Sekolah', gajiPokok: 10000000, tunjangan: 3000000, potongan: 1000000, totalGaji: 12000000, statusPembayaran: 'Sudah Dibayar', tanggalBayar: '2024-12-01' },
  { id: 'pg-003', namaGuru: 'Siti Nurhaliza, S.Pd.', jabatan: 'Guru Honorer', gajiPokok: 3000000, tunjangan: 500000, potongan: 200000, totalGaji: 3300000, statusPembayaran: 'Belum Dibayar' },
];

// --- KOMPONEN ---
export default function PenggajianPage() {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const sortedPenggajian = useMemo(() => {
    const filtered = dataPenggajian.filter(p => filterStatus === 'Semua' || p.statusPembayaran === filterStatus);
    return filtered.sort((a, b) => a.statusPembayaran.localeCompare(b.statusPembayaran));
  }, [filterStatus]);

  const daftarStatus = useMemo(() => ['Semua', 'Sudah Dibayar', 'Belum Dibayar'], []);
  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaUserTie className="mr-3 text-orange-600 dark:text-orange-400" />
              Penggajian
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola gaji dan tunjangan untuk guru dan staf.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Proses Gaji
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center"><FaFilter className="text-gray-500 dark:text-gray-400 mr-2" /><span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span></div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500">
            {daftarStatus.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>

        {sortedPenggajian.length === 0 ? (<div className="text-center py-10"><FaUserTie className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" /><p className="text-gray-500 dark:text-gray-400">Tidak ada data penggajian.</p></div>) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPenggajian.map(p => {
              const isUnpaid = p.statusPembayaran === 'Belum Dibayar';
              return (
                <div key={p.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 ${isUnpaid ? 'border-orange-500' : 'border-green-500'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{p.namaGuru}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{p.jabatan}</p>
                    </div>
                    {isUnpaid ? <FaExclamationTriangle className="text-orange-500 text-xl" /> : <FaMoneyCheckAlt className="text-green-500 text-xl" />}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex justify-between"><span>Gaji Pokok:</span><span>{formatCurrency(p.gajiPokok)}</span></p>
                    <p className="flex justify-between"><span>Tunjangan:</span><span>{formatCurrency(p.tunjangan)}</span></p>
                    <p className="flex justify-between"><span>Potongan:</span><span>-{formatCurrency(p.potongan)}</span></p>
                    <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                      <span className="font-semibold">Total Gaji:</span>
                      <span className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(p.totalGaji)}</span>
                    </div>
                  </div>
                  {isUnpaid && <button className="w-full mt-4 flex items-center justify-center px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700">Bayar Sekarang</button>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}