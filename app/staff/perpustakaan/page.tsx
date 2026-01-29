// app/perpustakaan/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaBook, FaExchangeAlt, FaMoneyBillWave, FaArrowRight,
  FaPlus, FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';
import { dataBuku } from './katalog/page';
import { dataPeminjaman } from './peminjaman/page';
import { dataDenda } from './denda/page';



// --- 1. FUNGSI UNTUK MENGHITUNG RANGKUMAN KATALOG ---
export const getKatalogSummary = () => {
  const totalJudul = dataBuku.length;
  const totalStok = dataBuku.reduce((total, buku) => total + buku.jumlahStok, 0);
  const bukuTersedia = dataBuku.filter(buku => buku.jumlahStok > 0).length;
  const bukuHabis = dataBuku.filter(buku => buku.jumlahStok === 0).length;

  return {
    totalJudul,
    totalStok,
    bukuTersedia,
    bukuHabis,
  };
};

// --- 2. FUNGSI UNTUK MENGHITUNG RANGKUMAN PEMINJAMAN ---
export const getPeminjamanSummary = () => {
  const totalTransaksi = dataPeminjaman.length;
  const sedangDipinjam = dataPeminjaman.filter(p => p.status === 'Dipinjam').length;
  const terlambat = dataPeminjaman.filter(p => p.status === 'Terlambat').length;
  const sudahDikembalikan = dataPeminjaman.filter(p => p.status === 'Dikembalikan').length;

  return {
    totalTransaksi,
    sedangDipinjam,
    terlambat,
    sudahDikembalikan,
  };
};

// --- 3. FUNGSI UNTUK MENGHITUNG RANGKUMAN DENDA ---
export const getDendaSummary = () => {
  const totalDenda = dataDenda.length;
  const belumDibayar = dataDenda.filter(d => d.status === 'Belum Dibayar').length;
  const sudahDibayar = dataDenda.filter(d => d.status === 'Sudah Dibayar').length;
  
  const totalNominalBelumDibayar = dataDenda
    .filter(d => d.status === 'Belum Dibayar')
    .reduce((total, d) => total + d.jumlahDenda, 0);

  return {
    totalDenda,
    belumDibayar,
    sudahDibayar,
    totalNominalBelumDibayar,
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
            {item.label === 'Tersedia' && <FaCheckCircle className="mr-2 text-green-300" />}
            {item.label === 'Habis' && <FaExclamationTriangle className="mr-2 text-yellow-300" />}
            {item.label === 'Dipinjam' && <FaExchangeAlt className="mr-2 text-blue-300" />}
            {item.label === 'Terlambat' && <FaExclamationTriangle className="mr-2 text-red-300" />}
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

// --- 3. KOMPONEN HALAMAN DASHBOARD PERPUSTAKAAN ---
export default function PerpustakaanPage() {
  // --- AMBIL DATA RANGKUMAN DARI FUNGSI ---
  const katalogSummary = getKatalogSummary();
  const peminjamanSummary = getPeminjamanSummary();
  const dendaSummary = getDendaSummary();

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Dashboard Perpustakaan</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ringkasan data dan statistik perpustakaan sekolah.</p>
        </div>

        {/* Grid Kartu Rangkuman */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Kartu Katalog */}
          <SummaryCard
            title="Katalog Buku"
            value={katalogSummary.totalJudul}
            icon={<FaBook />}
            detail={[
              { label: 'Total Stok', value: katalogSummary.totalStok, color: 'text-white' },
              { label: 'Tersedia', value: katalogSummary.bukuTersedia, color: 'text-green-300' },
              { label: 'Habis', value: katalogSummary.bukuHabis, color: 'text-yellow-300' },
            ]}
            linkHref="/perpustakaan/katalog"
            linkText="Lihat Katalog"
            cardColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />

          {/* Kartu Peminjaman */}
          <SummaryCard
            title="Data Peminjaman"
            value={peminjamanSummary.totalTransaksi}
            icon={<FaExchangeAlt />}
            detail={[
              { label: 'Sedang Dipinjam', value: peminjamanSummary.sedangDipinjam, color: 'text-blue-300' },
              { label: 'Terlambat', value: peminjamanSummary.terlambat, color: 'text-red-300' },
              { label: 'Dikembalikan', value: peminjamanSummary.sudahDikembalikan, color: 'text-green-300' },
            ]}
            linkHref="/perpustakaan/peminjaman"
            linkText="Lihat Peminjaman"
            cardColor="bg-gradient-to-br from-green-500 to-green-600"
          />

          {/* Kartu Denda */}
          <SummaryCard
            title="Data Denda"
            value={dendaSummary.totalDenda}
            icon={<FaMoneyBillWave />}
            detail={[
              { label: 'Belum Dibayar', value: `${dendaSummary.belumDibayar} Transaksi`, color: 'text-red-300' },
              { label: 'Total Nominal', value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dendaSummary.totalNominalBelumDibayar), color: 'text-yellow-300' },
            ]}
            linkHref="/perpustakaan/denda"
            linkText="Lihat Denda"
            cardColor="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Aksi Cepat</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/perpustakaan/katalog" className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              <FaBook className="mr-2" /> Tambah Buku Baru
            </Link>
            <Link href="/perpustakaan/peminjaman" className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md">
              <FaPlus className="mr-2" /> Tambah Peminjaman
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}