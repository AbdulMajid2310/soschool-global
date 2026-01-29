// app/anggaran/page.tsx

'use client';

import React, { useMemo } from 'react';
import { FaPiggyBank, FaChartPie, FaExclamationTriangle } from 'react-icons/fa';

// --- TIPE DATA ---
interface Anggaran {
  id: string;
  kategori: string;
  dianggarkan: number;
  terpakai: number;
}

// --- DATA ---
const dataAnggaran: Anggaran[] = [
  { id: 'ag-1', kategori: 'Gaji Guru & Staf', dianggarkan: 150000000, terpakai: 148000000 },
  { id: 'ag-2', kategori: 'Operasional Sekolah', dianggarkan: 50000000, terpakai: 45000000 },
  { id: 'ag-3', kategori: 'Maintenance Gedung', dianggarkan: 30000000, terpakai: 35000000 }, // Contoh melebihi anggaran
  { id: 'ag-4', kategori: 'Pengembangan Kurikulum', dianggarkan: 20000000, terpakai: 5000000 },
];

// --- KOMPONEN ---
export default function AnggaranPage() {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const anggaranWithProgress = useMemo(() => 
    dataAnggaran.map(item => {
      const sisa = item.dianggarkan - item.terpakai;
      const persentase = (item.terpakai / item.dianggarkan) * 100;
      const isOverBudget = persentase > 100;
      return { ...item, sisa, persentase, isOverBudget };
    }), []
  );

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaPiggyBank className="mr-3 text-pink-600 dark:text-pink-400" />
              Manajemen Anggaran
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Pantau penggunaan anggaran sekolah.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {anggaranWithProgress.map(item => (
            <div key={item.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${item.isOverBudget ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <FaChartPie className="mr-2 text-gray-400" />
                  {item.kategori}
                </h3>
                {item.isOverBudget && <FaExclamationTriangle className="text-red-500" title="Melebihi Anggaran" />}
              </div>
              
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between"><span>Dianggarkan:</span><span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.dianggarkan)}</span></div>
                <div className="flex justify-between"><span>Terpakai:</span><span className="font-medium text-gray-900 dark:text-white">{formatCurrency(item.terpakai)}</span></div>
                <div className="flex justify-between"><span>Sisa:</span><span className={`font-bold ${item.sisa < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(item.sisa)}</span></div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Realisasi</span>
                  <span>{item.persentase.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${item.isOverBudget ? 'bg-red-600' : 'bg-green-600'}`} style={{ width: `${Math.min(item.persentase, 100)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}