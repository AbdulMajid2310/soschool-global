// app/inventaris/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaLaptop, FaTools, FaDoorOpen, FaArrowRight,
  FaPlus, FaCheckCircle, FaExclamationTriangle, FaWrench
} from 'react-icons/fa';
import { dataInventaris } from './aset/page';
import { dataPemeliharaan } from './pemeliharaan/page';
import { dataRuangan } from './ruangan/page';




// --- 1. FUNGSI UNTUK MENGHITUNG RANGKUMAN ASET ---
export const getAsetSummary = () => {
  const totalAset = dataInventaris.length;
  const kondisiBaik = dataInventaris.filter(a => a.kondisi === 'Baik').length;
  const kondisiRusak = dataInventaris.filter(a => a.kondisi === 'Rusak Ringan' || a.kondisi === 'Rusak Berat').length;
  const dalamPerbaikan = dataInventaris.filter(a => a.status === 'Dalam Perbaikan').length;

  return {
    totalAset,
    kondisiBaik,
    kondisiRusak,
    dalamPerbaikan,
  };
};

// --- 2. FUNGSI UNTUK MENGHITUNG RANGKUMAN PEMELIHARAAN ---
export const getPemeliharaanSummary = () => {
  const totalLaporan = dataPemeliharaan.length;
  const sedangDiproses = dataPemeliharaan.filter(p => p.status === 'Sedang Diproses').length;
  const selesai = dataPemeliharaan.filter(p => p.status === 'Selesai').length;
  
  const totalBiayaPending = dataPemeliharaan
    .filter(p => p.status !== 'Selesai' && p.biaya !== null)
    .reduce((total, p) => total + (p.biaya || 0), 0);

  return {
    totalLaporan,
    sedangDiproses,
    selesai,
    totalBiayaPending,
  };
};

// --- 3. FUNGSI UNTUK MENGHITUNG RANGKUMAN RUANGAN ---
export const getRuanganSummary = () => {
  const totalRuangan = dataRuangan.length;
  const tersedia = dataRuangan.filter(r => r.status === 'Tersedia').length;
  const digunakan = dataRuangan.filter(r => r.status === 'Digunakan').length;
  const dalamPerbaikan = dataRuangan.filter(r => r.status === 'Dalam Perbaikan').length;

  return {
    totalRuangan,
    tersedia,
    digunakan,
    dalamPerbaikan,
  };
};

// --- 1. TIPE DATA UNTUK PROPS KARTU RANGKUMAN ---
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  detail: { label: string; value: string | number; color: string }[];
  linkHref: string;
  linkText: string;
  cardColor: string;
}

// --- 2. KOMPONEN KARTU RANGKUMAN (REUSABLE) ---
const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, value, icon, detail, linkHref, linkText, cardColor 
}) => (
  <div className={`${cardColor} rounded-xl shadow-lg p-6 text-white`}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <span className="text-3xl opacity-80">{icon}</span>
    </div>
    <p className="text-4xl font-extrabold mb-4">{value}</p>
    <div className="space-y-2 mb-4">
      {detail.map((item: { label: string; value: string | number; color: string }, index: number) => (
        <div key={index} className="flex justify-between text-sm">
          <span className="flex items-center">
            {item.label === 'Baik' && <FaCheckCircle className="mr-2 text-green-300" />}
            {item.label === 'Rusak' && <FaExclamationTriangle className="mr-2 text-red-300" />}
            {item.label === 'Diproses' && <FaWrench className="mr-2 text-blue-300" />}
            {item.label === 'Tersedia' && <FaCheckCircle className="mr-2 text-green-300" />}
            {item.label === 'Digunakan' && <FaExclamationTriangle className="mr-2 text-yellow-300" />}
            {item.label === 'Dalam Perbaikan' && <FaWrench className="mr-2 text-orange-300" />}
            {item.label}:
          </span>
          <span className={`font-semibold ${item.color}`}>{item.value}</span>
        </div>
      ))}
    </div>
    <Link 
      href={linkHref} 
      className="flex items-center justify-center w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
    >
      {linkText}
      <FaArrowRight className="ml-2" />
    </Link>
  </div>
);

// --- 3. KOMPONEN HALAMAN DASHBOARD INVENTARIS ---
export default function InventarisDashboardPage() {
  // --- AMBIL DATA RANGKUMAN DARI FUNGSI ---
  const asetSummary = getAsetSummary();
  const pemeliharaanSummary = getPemeliharaanSummary();
  const ruanganSummary = getRuanganSummary();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Dashboard Inventaris</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ringkasan data aset, pemeliharaan, dan ruangan sekolah.</p>
        </div>

        {/* Grid Kartu Rangkuman */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Kartu Aset */}
          <SummaryCard
            title="Data Aset"
            value={asetSummary.totalAset}
            icon={<FaLaptop />}
            detail={[
              { label: 'Baik', value: asetSummary.kondisiBaik, color: 'text-green-300' },
              { label: 'Rusak', value: asetSummary.kondisiRusak, color: 'text-red-300' },
              { label: 'Dalam Perbaikan', value: asetSummary.dalamPerbaikan, color: 'text-orange-300' },
            ]}
            linkHref="/inventaris/aset"
            linkText="Lihat Aset"
            cardColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />

          {/* Kartu Pemeliharaan */}
          <SummaryCard
            title="Data Pemeliharaan"
            value={pemeliharaanSummary.totalLaporan}
            icon={<FaTools />}
            detail={[
              { label: 'Diproses', value: pemeliharaanSummary.sedangDiproses, color: 'text-blue-300' },
              { label: 'Selesai', value: pemeliharaanSummary.selesai, color: 'text-green-300' },
              { label: 'Estimasi Biaya', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pemeliharaanSummary.totalBiayaPending), color: 'text-yellow-300' },
            ]}
            linkHref="/inventaris/pemeliharaan"
            linkText="Lihat Pemeliharaan"
            cardColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />

          {/* Kartu Ruangan */}
          <SummaryCard
            title="Data Ruangan"
            value={ruanganSummary.totalRuangan}
            icon={<FaDoorOpen />}
            detail={[
              { label: 'Tersedia', value: ruanganSummary.tersedia, color: 'text-green-300' },
              { label: 'Digunakan', value: ruanganSummary.digunakan, color: 'text-yellow-300' },
              { label: 'Dalam Perbaikan', value: ruanganSummary.dalamPerbaikan, color: 'text-orange-300' },
            ]}
            linkHref="/inventaris/ruangan"
            linkText="Lihat Ruangan"
            cardColor="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Aksi Cepat</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inventaris/aset" className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              <FaPlus className="mr-2" /> Tambah Aset Baru
            </Link>
            <Link href="/inventaris/pemeliharaan" className="flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors shadow-md">
              <FaPlus className="mr-2" /> Laporkan Kerusakan
            </Link>
            <Link href="/inventaris/ruangan" className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
              <FaPlus className="mr-2" /> Tambah Ruangan Baru
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}