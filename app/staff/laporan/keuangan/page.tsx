// app/laporan-keuangan/page.tsx

'use client';

import React from 'react';
import { 
  FaMoneyBillWave, FaArrowUp, FaArrowDown, FaReceipt, FaExclamationTriangle,
  FaUsers, FaTools, FaShoppingCart, FaBolt, FaHandHoldingUsd
} from 'react-icons/fa';



// data/keuangan.ts

// --- 1. DEFINISI TIPE DATA ---
export interface Transaksi {
  id: string;
  tanggal: string; // Format 'YYYY-MM-DD'
  keterangan: string;
  jumlah: number; // Dalam Rupiah
  tipe: 'Pemasukan' | 'Pengeluaran';
  kategori: string; // Contoh: 'SPP', 'Gaji Guru', 'Operasional'
}

export interface RingkasanKeuangan {
  totalPemasukan: number;
  totalPengeluaran: number;
  sisaAnggaran: number;
  totalTunggakanSPP: number;
}

export interface PembayaranSPP {
  nis: string;
  nama: string;
  kelas: string;
  bulan: string; // Contoh: 'Juli 2024'
  jumlah: number;
  status: 'Lunas' | 'Belum Dibayar';
}

// --- 2. DATA STATIS KEUANGAN ---
export const ringkasanKeuangan: RingkasanKeuangan = {
  totalPemasukan: 450000000, // 450 Juta
  totalPengeluaran: 380000000, // 380 Juta
  sisaAnggaran: 70000000,    // 70 Juta
  totalTunggakanSPP: 15000000, // 15 Juta
};

export const transaksiTerakhir: Transaksi[] = [
  { id: 'tr-01', tanggal: '2024-06-25', keterangan: 'Pembayaran SPP - XII IPA 1', jumlah: 9600000, tipe: 'Pemasukan', kategori: 'SPP' },
  { id: 'tr-02', tanggal: '2024-06-24', keterangan: 'Gaji Guru & Staf', jumlah: 150000000, tipe: 'Pengeluaran', kategori: 'Gaji' },
  { id: 'tr-03', tanggal: '2024-06-22', keterangan: 'Pembelian Buku Paket IPS', jumlah: 5500000, tipe: 'Pengeluaran', kategori: 'Pembelian Barang' },
  { id: 'tr-04', tanggal: '2024-06-20', keterangan: 'Donasi dari Alumni', jumlah: 25000000, tipe: 'Pemasukan', kategori: 'Donasi' },
  { id: 'tr-05', tanggal: '2024-06-18', keterangan: 'Biaya Listrik & Air', jumlah: 8500000, tipe: 'Pengeluaran', kategori: 'Operasional' },
];

export const pengeluaranPerKategori = [
  { kategori: 'Gaji Guru & Staf', jumlah: 180000000 },
  { kategori: 'Operasional', jumlah: 95000000 },
  { kategori: 'Pembelian Barang', jumlah: 60000000 },
  { kategori: 'Pemeliharaan', jumlah: 45000000 },
];

export const tunggakanSPP: PembayaranSPP[] = [
  { nis: '2024025', nama: 'Doni Hermawan', kelas: 'VII B', bulan: 'Juni 2024', jumlah: 300000, status: 'Belum Dibayar' },
  { nis: '2024019', nama: 'Bambang Sutrisno', kelas: 'VIII C', bulan: 'Juni 2024', jumlah: 300000, status: 'Belum Dibayar' },
  { nis: '2024027', nama: 'Kevin Sanjaya', kelas: 'VII A', bulan: 'Mei 2024', jumlah: 300000, status: 'Belum Dibayar' },
];


// --- KOMPONEN HALAMAN LAPORAN KEUANGAN ---
export default function LaporanKeuanganPage() {
  // --- 1. FUNGSI HELPER ---
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // --- 2. KOMPONEN KARTU INDIKATOR KINERJA (KPI) ---
  const KPICard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend?: { value: string; isUp: boolean };
  }> = ({ title, value, icon, color, trend }) => (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      {trend && (
        <div className={`flex items-center text-sm ${trend.isUp ? 'text-green-300' : 'text-red-300'}`}>
          <FaArrowUp className={`mr-1 ${!trend.isUp && 'rotate-180'}`} />
          {trend.value} dari bulan lalu
        </div>
      )}
    </div>
  );

  // --- 3. DATA UNTUK KARTU KPI ---
  const kpiData = [
    {
      title: 'Total Pemasukan',
      value: formatRupiah(ringkasanKeuangan.totalPemasukan),
      icon: <FaArrowUp />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: { value: '+12.5%', isUp: true },
    },
    {
      title: 'Total Pengeluaran',
      value: formatRupiah(ringkasanKeuangan.totalPengeluaran),
      icon: <FaArrowDown />,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      trend: { value: '+8.2%', isUp: true }, // Pengeluaran naik, tapi trend tetap 'up'
    },
    {
      title: 'Sisa Anggaran',
      value: formatRupiah(ringkasanKeuangan.sisaAnggaran),
      icon: <FaMoneyBillWave />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Tunggakan SPP',
      value: formatRupiah(ringkasanKeuangan.totalTunggakanSPP),
      icon: <FaExclamationTriangle />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
            <FaMoneyBillWave className="mr-3 text-green-600 dark:text-green-400" />
            Laporan Keuangan
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ringkasan keuangan dan transaksi sekolah.</p>
        </div>

        {/* Grid Kartu KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rincian Pengeluaran */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaReceipt className="mr-2 text-red-500" />
              Rincian Pengeluaran Bulan Ini
            </h2>
            <div className="space-y-3">
              {pengeluaranPerKategori.map((item, index) => {
                const percentage = (item.jumlah / ringkasanKeuangan.totalPengeluaran) * 100;
                const iconMap: Record<string, React.ReactNode> = {
                  'Gaji Guru & Staf': <FaUsers className="text-gray-400" />,
                  'Operasional': <FaBolt className="text-gray-400" />,
                  'Pembelian Barang': <FaShoppingCart className="text-gray-400" />,
                  'Pemeliharaan': <FaTools className="text-gray-400" />,
                };

                return (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center">
                        {iconMap[item.kategori]}
                        <span className="ml-2 font-medium text-gray-700 dark:text-gray-300">{item.kategori}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatRupiah(item.jumlah)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-red-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transaksi Terakhir & Tunggakan */}
          <div className="space-y-8">
            {/* Transaksi Terakhir */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaReceipt className="mr-2 text-blue-500" />
                Transaksi Terakhir
              </h2>
              <div className="space-y-3">
                {transaksiTerakhir.map((transaksi) => (
                  <div key={transaksi.id} className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{transaksi.keterangan}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(transaksi.tanggal)}</p>
                    </div>
                    <span className={`font-bold ${transaksi.tipe === 'Pemasukan' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaksi.tipe === 'Pemasukan' ? '+' : '-'}{formatRupiah(transaksi.jumlah)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tunggakan SPP */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaExclamationTriangle className="mr-2 text-orange-500" />
                Tunggakan SPP Terakhir
              </h2>
              <div className="space-y-3">
                {tunggakanSPP.map((tunggakan) => (
                  <div key={tunggakan.nis} className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{tunggakan.nama}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tunggakan.kelas} • {tunggakan.bulan}</p>
                    </div>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {formatRupiah(tunggakan.jumlah)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}