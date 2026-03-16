// app/keuangan/page.tsx

'use client';

import React, { useMemo } from 'react';
import { FaChartLine, FaDollarSign, FaMoneyBillWave, FaExclamationTriangle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// --- TIPE DATA ---
interface KPI { title: string; value: string; icon: React.ReactNode; change?: number; changeType?: 'up' | 'down'; }
interface ChartData { kategori: string; anggaran: number; realisasi: number; }

// --- DATA (Dalam aplikasi nyata, ini dihitung dari database) ---
const totalSaldo = 250000000;
const pemasukanBulanIni = 85000000;
const pengeluaranBulanIni = 92000000;

const chartData: ChartData[] = [
  { kategori: 'Gaji', anggaran: 150000000, realisasi: 148000000 },
  { kategori: 'Operasional', anggaran: 50000000, realisasi: 45000000 },
  { kategori: 'Maintenance', anggaran: 30000000, realisasi: 35000000 },
];

const tagihanMenunggu = 15;
const gajiMenunggu = 3;

// --- KOMPONEN ---
export default function KeuanganPage() {
  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const kpiData: KPI[] = useMemo(() => [
    { title: 'Total Saldo', value: formatCurrency(totalSaldo), icon: <FaDollarSign />, change: 5, changeType: 'up' },
    { title: 'Pemasukan Bulan Ini', value: formatCurrency(pemasukanBulanIni), icon: <FaArrowUp />, change: 12, changeType: 'up' },
    { title: 'Pengeluaran Bulan Ini', value: formatCurrency(pengeluaranBulanIni), icon: <FaArrowDown />, change: -8, changeType: 'down' },
  ], []);

  const maxChartValue = useMemo(() => Math.max(...chartData.map(d => Math.max(d.anggaran, d.realisasi))), []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaChartLine className="mr-3 text-purple-600 dark:text-purple-400" />
            Dashboard Keuangan
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Analisis ringkas kesehatan keuangan sekolah.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</p>
                  {kpi.change !== undefined && (
                    <p className={`text-sm mt-2 ${kpi.changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.changeType === 'up' ? <FaArrowUp className="inline mr-1" /> : <FaArrowDown className="inline mr-1" />}
                      {Math.abs(kpi.change)}% dari bulan lalu
                    </p>
                  )}
                </div>
                <div className="text-3xl text-purple-600 dark:text-purple-400">{kpi.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simple Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Anggaran vs. Realisasi</h3>
            <div className="space-y-4">
              {chartData.map((data, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{data.kategori}</span>
                    <span className="text-gray-600 dark:text-gray-400">{formatCurrency(data.realisasi)} / {formatCurrency(data.anggaran)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 flex">
                    <div className="bg-blue-600 h-2.5 rounded-l-full" style={{ width: `${(data.anggaran / maxChartValue) * 100}%` }}></div>
                    <div className={`h-2.5 rounded-r-full ${data.realisasi > data.anggaran ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(data.realisasi / maxChartValue) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts / Pending Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tindakan Menunggu</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <FaExclamationTriangle className="text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{tagihanMenunggu} Tagihan Siswa Menunggu Pembayaran</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Perlu ditindaklanjuti.</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <FaMoneyBillWave className="text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{gajiMenunggu} Penggajian Belum Diproses</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Jatuh tempo pada akhir bulan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}