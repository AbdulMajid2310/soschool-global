// app/perpustakaan/denda/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaMoneyBillWave, FaSearch, FaEye, FaCreditCard, FaCheckCircle,
  FaBook, FaUser, FaCalendarAlt, FaExclamationTriangle
} from 'react-icons/fa';


// data/denda.ts

// --- 1. DEFINISI TIPE DATA UNTUK DENDA ---
export interface Denda {
  id: string; // ID unik transaksi denda
  idPeminjaman: string; // ID transaksi peminjaman terkait
  peminjam: {
    nis: string;
    nama: string;
  };
  buku: {
    judul: string;
    gambar: string;
  };
  tanggalJatuhTempo: string; // Format 'YYYY-MM-DD'
  tanggalKembaliActual: string; // Format 'YYYY-MM-DD'
  terlambatHari: number; // Jumlah hari keterlambatan
  jumlahDenda: number; // Total denda dalam Rupiah
  status: 'Belum Dibayar' | 'Sudah Dibayar';
  tanggalBayar: string | null; // Null jika belum dibayar
}

// --- 2. DATA DENDA ---
export const dataDenda: Denda[] = [
  {
    id: 'd-001',
    idPeminjaman: 'tr-003',
    peminjam: { nis: '2024022', nama: 'Fitri Handayani' },
    buku: { judul: 'Clean Code: A Handbook of Agile Software Craftsmanship', gambar: 'https://picsum.photos/seed/clean-code/100/150.jpg' },
    tanggalJatuhTempo: '2024-05-04',
    tanggalKembaliActual: '2024-05-20',
    terlambatHari: 16,
    jumlahDenda: 16000, // Asumsi Rp 1000/hari
    status: 'Belum Dibayar',
    tanggalBayar: null,
  },
  {
    id: 'd-002',
    idPeminjaman: 'tr-007',
    peminjam: { nis: '2024011', nama: 'Reza Pahlevi' },
    buku: { judul: 'The Pragmatic Programmer', gambar: 'https://picsum.photos/seed/pragmatic-programmer/100/150.jpg' },
    tanggalJatuhTempo: '2024-04-15',
    tanggalKembaliActual: '2024-04-18',
    terlambatHari: 3,
    jumlahDenda: 3000,
    status: 'Sudah Dibayar',
    tanggalBayar: '2024-04-19',
  },
  {
    id: 'd-003',
    idPeminjaman: 'tr-009',
    peminjam: { nis: '2024015', nama: 'Toni Kusuma' },
    buku: { judul: 'Sapiens: Riwayat Singkat Umat Manusia', gambar: 'https://picsum.photos/seed/sapiens/100/150.jpg' },
    tanggalJatuhTempo: '2024-06-10',
    tanggalKembaliActual: '2024-06-25',
    terlambatHari: 15,
    jumlahDenda: 15000,
    status: 'Belum Dibayar',
    tanggalBayar: null,
  },
];


// --- KOMPONEN HALAMAN DATA DENDA ---
export default function DataDendaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Memfilter data denda
  const filteredDenda = useMemo(() => {
    return dataDenda.filter(denda => {
      const matchesSearch = denda.buku.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            denda.peminjam.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !selectedStatus || denda.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  // Fungsi helper untuk memformat tanggal dan mata uang
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // Mapping status ke warna dan ikon
  const statusInfo = {
    'Belum Dibayar': { icon: <FaExclamationTriangle />, color: 'red' },
    'Sudah Dibayar': { icon: <FaCheckCircle />, color: 'green' },
  };

  // --- Komponen Kartu Denda ---
  const DendaCard: React.FC<{ denda: Denda }> = ({ denda }) => {
    const info = statusInfo[denda.status];
    const isBelumDibayar = denda.status === 'Belum Dibayar';
    
    const colorClasses = {
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Informasi Buku dan Peminjam */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <img 
              src={denda.buku.gambar} 
              alt={denda.buku.judul} 
              className="w-16 h-20 object-cover rounded-lg shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{denda.buku.judul}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <FaUser className="mr-2 text-gray-400" />
                {denda.peminjam.nama} ({denda.peminjam.nis})
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                Terlambat {denda.terlambatHari} hari (dari {formatDate(denda.tanggalJatuhTempo)})
              </p>
            </div>
          </div>

          {/* Informasi Denda dan Status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Denda</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatRupiah(denda.jumlahDenda)}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses[info.color as keyof typeof colorClasses]}`}>
                {info.icon}
                <span className="ml-1">{denda.status}</span>
              </span>
              {denda.tanggalBayar && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Dibayar: {formatDate(denda.tanggalBayar)}</p>
              )}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center gap-2 lg:ml-4">
            <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Lihat Detail">
              <FaEye />
            </button>
            {isBelumDibayar && (
              <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Bayar Denda">
                <FaCreditCard />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Menghitung total denda yang belum dibayar
  const totalDendaBelumDibayar = useMemo(() => {
    return dataDenda
      .filter(d => d.status === 'Belum Dibayar')
      .reduce((total, d) => total + d.jumlahDenda, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaMoneyBillWave className="mr-3 text-green-600 dark:text-green-400" />
              Data Denda Peminjaman
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola dan pantau denda keterlambatan pengembalian buku.</p>
          </div>
        </div>

        {/* Kartu Ringkasan Total Denda */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Total Denda Belum Dibayar</h3>
              <p className="text-sm text-red-600 dark:text-red-400">Jumlah yang harus ditagihkan ke seluruh peminjam</p>
            </div>
            <p className="text-3xl font-bold text-red-700 dark:text-red-400">{formatRupiah(totalDendaBelumDibayar)}</p>
          </div>
        </div>

        {/* Filter dan Pencarian */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Tombol Filter Status */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === null
                  ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Semua Status
            </button>
            {Object.entries(statusInfo).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  selectedStatus === key
                    ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`w-3 h-3 bg-${val.color}-500 rounded-full mr-2`}></span>
                {key}
              </button>
            ))}
          </div>

          {/* Input Pencarian */}
          <div className="relative lg:ml-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul buku atau nama peminjam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Daftar Kartu Denda */}
        {filteredDenda.length === 0 ? (
          <div className="text-center py-10">
            <FaMoneyBillWave className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada data denda yang ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDenda.map((denda) => (
              <DendaCard key={denda.id} denda={denda} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}