// app/perpustakaan/peminjaman/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaEye, FaUndo, FaBook, FaUser, 
  FaCalendarAlt, FaHourglassHalf
} from 'react-icons/fa';


// data/peminjaman.ts

// --- 1. DEFINISI TIPE DATA UNTUK PEMINJAMAN ---
export interface Peminjaman {
  id: string; // ID unik transaksi peminjaman
  idBuku: string;
  judulBuku: string;
  gambarBuku: string; // URL gambar cover buku
  peminjam: {
    nis: string; // Nomor Induk Siswa
    nama: string;
  };
  tanggalPinjam: string; // Format 'YYYY-MM-DD'
  tanggalJatuhTempo: string; // Format 'YYYY-MM-DD'
  tanggalKembali: string | null; // Null jika belum dikembalikan
  status: 'Dipinjam' | 'Dikembalikan' | 'Terlambat';
}

// --- 2. DATA PEMINJAMAN ---
export const dataPeminjaman: Peminjaman[] = [
  {
    id: 'tr-001',
    idBuku: '1',
    judulBuku: 'Laskar Pelangi',
    gambarBuku: 'https://picsum.photos/seed/laskar-pelangi/100/150.jpg',
    peminjam: { nis: '2024011', nama: 'Reza Pahlevi' },
    tanggalPinjam: '2024-05-01',
    tanggalJatuhTempo: '2024-05-15',
    tanggalKembali: '2024-05-14',
    status: 'Dikembalikan',
  },
  {
    id: 'tr-002',
    idBuku: '2',
    judulBuku: 'Sapiens: Riwayat Singkat Umat Manusia',
    gambarBuku: 'https://picsum.photos/seed/sapiens/100/150.jpg',
    peminjam: { nis: '2024015', nama: 'Toni Kusuma' },
    tanggalPinjam: '2024-05-10',
    tanggalJatuhTempo: '2024-05-24',
    tanggalKembali: null,
    status: 'Dipinjam',
  },
  {
    id: 'tr-003',
    idBuku: '4',
    judulBuku: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    gambarBuku: 'https://picsum.photos/seed/clean-code/100/150.jpg',
    peminjam: { nis: '2024022', nama: 'Fitri Handayani' },
    tanggalPinjam: '2024-04-20',
    tanggalJatuhTempo: '2024-05-04',
    tanggalKembali: null,
    status: 'Terlambat', // Status ini bisa dihitung otomatis, tapi untuk contoh ini kita set manual
  },
  {
    id: 'tr-004',
    idBuku: '7',
    judulBuku: 'Cosmos',
    gambarBuku: 'https://picsum.photos/seed/cosmos/100/150.jpg',
    peminjam: { nis: '2024028', nama: 'Lia Anggraini' },
    tanggalPinjam: '2024-06-01',
    tanggalJatuhTempo: '2024-06-15',
    tanggalKembali: null,
    status: 'Dipinjam',
  },
  {
    id: 'tr-005',
    idBuku: '8',
    judulBuku: 'Ways of Seeing',
    gambarBuku: 'https://picsum.photos/seed/ways-of-seeing/100/150.jpg',
    peminjam: { nis: '2024030', nama: 'Nadia Safitri' },
    tanggalPinjam: '2024-05-20',
    tanggalJatuhTempo: '2024-06-03',
    tanggalKembali: '2024-06-02',
    status: 'Dikembalikan',
  },
];

// --- KOMPONEN HALAMAN DATA PEMINJAMAN ---
export default function DataPeminjamanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Memfilter data peminjaman
  const filteredPeminjaman = useMemo(() => {
    return dataPeminjaman.filter(peminjaman => {
      const matchesSearch = peminjaman.judulBuku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            peminjaman.peminjam.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !selectedStatus || peminjaman.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  // Fungsi helper untuk memformat tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Mapping status ke warna dan ikon
  const statusInfo = {
    'Dipinjam': { icon: <FaBook />, color: 'yellow' },
    'Dikembalikan': { icon: <FaUndo />, color: 'green' },
    'Terlambat': { icon: <FaHourglassHalf />, color: 'red' },
  };

  // --- Komponen Kartu Peminjaman ---
  const PeminjamanCard: React.FC<{ peminjaman: Peminjaman }> = ({ peminjaman }) => {
    const info = statusInfo[peminjaman.status];
    const isDikembalikan = peminjaman.status === 'Dikembalikan';
    
    const colorClasses = {
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Informasi Buku dan Peminjam */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <img 
              src={peminjaman.gambarBuku} 
              alt={peminjaman.judulBuku} 
              className="w-16 h-20 object-cover rounded-lg shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{peminjaman.judulBuku}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">ID Buku: {peminjaman.idBuku}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <FaUser className="mr-2 text-gray-400" />
                {peminjaman.peminjam.nama} ({peminjaman.peminjam.nis})
              </p>
            </div>
          </div>

          {/* Informasi Tanggal dan Status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                Pinjam: {formatDate(peminjaman.tanggalPinjam)}
              </p>
              <p className="flex items-center">
                <FaHourglassHalf className="mr-2 text-gray-400" />
                Tempo: {formatDate(peminjaman.tanggalJatuhTempo)}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses[info.color as keyof typeof colorClasses]}`}>
                {info.icon}
                <span className="ml-1">{peminjaman.status}</span>
              </span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center gap-2 lg:ml-4">
            <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Lihat Detail">
              <FaEye />
            </button>
            <button 
              className={`p-2 rounded-lg transition-colors ${
                isDikembalikan 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`} 
              title={isDikembalikan ? 'Sudah Dikembalikan' : 'Tandai Dikembalikan'}
              disabled={isDikembalikan}
            >
              <FaUndo />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Data Peminjaman Buku</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola dan pantau seluruh transaksi peminjaman.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Transaksi
          </button>
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

        {/* Daftar Kartu Peminjaman */}
        {filteredPeminjaman.length === 0 ? (
          <div className="text-center py-10">
            <FaBook className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada transaksi peminjaman yang ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPeminjaman.map((peminjaman) => (
              <PeminjamanCard key={peminjaman.id} peminjaman={peminjaman} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}