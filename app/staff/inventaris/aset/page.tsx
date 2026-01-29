// app/inventaris/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaFilter,
  FaLaptop, FaCouch, FaCar, FaBasketballBall, FaFlask
} from 'react-icons/fa';


// data/inventaris.ts

// --- 1. DEFINISI TIPE DATA UNTUK ASET ---
export interface Aset {
  id: string;
  namaAset: string;
  kodeAset: string; // Kode unik inventaris
  kategori: 'Elektronik' | 'Furniture' | 'Kendaraan' | 'Alat Olahraga' | 'Lab';
  lokasi: string; // Contoh: 'Lab Komputer 1', 'Ruang Guru', 'Gudang'
  merek: string;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  status: 'Tersedia' | 'Dipinjamkan' | 'Dalam Perbaikan';
  tanggalPembelian: string; // Format 'YYYY-MM-DD'
  hargaBeli: number; // Dalam Rupiah
  gambar: string; // URL gambar aset
  keterangan: string;
}

// --- 2. DATA INVENTARIS SEKOLAH ---
export const dataInventaris: Aset[] = [
  {
    id: 'ast-001',
    namaAset: 'Proyektor Epson EB-X06',
    kodeAset: 'ELK-PRJ-001',
    kategori: 'Elektronik',
    lokasi: 'Ruang Kelas X IPA 1',
    merek: 'Epson',
    kondisi: 'Baik',
    status: 'Tersedia',
    tanggalPembelian: '2023-01-15',
    hargaBeli: 7500000,
    gambar: 'https://picsum.photos/seed/proyektor-epson/300/200.jpg',
    keterangan: 'Proyektor untuk presentasi, lampu baru diganti bulan lalu.',
  },
  {
    id: 'ast-002',
    namaAset: 'Laptop Lenovo ThinkPad E14',
    kodeAset: 'ELK-LPT-001',
    kategori: 'Elektronik',
    lokasi: 'Lab Komputer 1',
    merek: 'Lenovo',
    kondisi: 'Rusak Ringan',
    status: 'Dalam Perbaikan',
    tanggalPembelian: '2022-07-20',
    hargaBeli: 8500000,
    gambar: 'https://picsum.photos/seed/laptop-lenovo/300/200.jpg',
    keterangan: 'Keyboard tombol  tidak responsif. Sudah dilaporkan ke teknisi.',
  },
  {
    id: 'ast-003',
    namaAset: 'Meja Guru',
    kodeAset: 'FUR-MJG-015',
    kategori: 'Furniture',
    lokasi: 'Ruang Guru',
    merek: 'VIP',
    kondisi: 'Baik',
    status: 'Tersedia',
    tanggalPembelian: '2021-03-10',
    hargaBeli: 1500000,
    gambar: 'https://picsum.photos/seed/meja-guru/300/200.jpg',
    keterangan: 'Meja kerja guru dengan laci.',
  },
  {
    id: 'ast-004',
    namaAset: 'Mikroskop Olympus CX21',
    kodeAset: 'LAB-MIK-002',
    kategori: 'Lab',
    lokasi: 'Lab Biologi',
    merek: 'Olympus',
    kondisi: 'Baik',
    status: 'Tersedia',
    tanggalPembelian: '2022-11-01',
    hargaBeli: 4500000,
    gambar: 'https://picsum.photos/seed/mikroskop-olympus/300/200.jpg',
    keterangan: 'Mikroskop untuk praktikum biologi, lengkap dengan kotaknya.',
  },
  {
    id: 'ast-005',
    namaAset: 'Bola Volli Mikasa MVA200',
    kodeAset: 'OLR-BLV-001',
    kategori: 'Alat Olahraga',
    lokasi: 'Gudang Olahraga',
    merek: 'Mikasa',
    kondisi: 'Baik',
    status: 'Dipinjamkan',
    tanggalPembelian: '2023-06-05',
    hargaBeli: 450000,
    gambar: 'https://picsum.photos/seed/bola-volli/300/200.jpg',
    keterangan: 'Dipinjamkan untuk ekstrakurikuler voli.',
  },
  {
    id: 'ast-006',
    namaAset: 'Printer Canon iP2770',
    kodeAset: 'ELK-PRN-003',
    kategori: 'Elektronik',
    lokasi: 'Ruang TU',
    merek: 'Canon',
    kondisi: 'Rusak Berat',
    status: 'Dalam Perbaikan',
    tanggalPembelian: '2020-08-12',
    hargaBeli: 650000,
    gambar: 'https://picsum.photos/seed/printer-canon/300/200.jpg',
    keterangan: 'Head printer macet, tidak bisa digunakan. Menunggu suku cadang.',
  },
  {
    id: 'ast-007',
    namaAset: 'Kursi Siswa',
    kodeAset: 'FUR-KRS-045',
    kategori: 'Furniture',
    lokasi: 'Ruang Kelas VII A',
    merek: 'Chitose',
    kondisi: 'Rusak Ringan',
    status: 'Tersedia',
    tanggalPembelian: '2021-06-30',
    hargaBeli: 120000,
    gambar: 'https://picsum.photos/seed/kursi-siswa/300/200.jpg',
    keterangan: 'Salah satu kaki sedikit goyang, masih bisa digunakan dengan hati-hati.',
  },
];

// --- 3. FUNGSI UNTUK MENDAPATKAN DAFTAR KATEGORI & LOKASI UNIK ---
export const getDaftarKategori = (): string[] => {
  const kategoriSet = new Set(dataInventaris.map(aset => aset.kategori));
  return Array.from(kategoriSet).sort();
};

export const getDaftarLokasi = (): string[] => {
  const lokasiSet = new Set(dataInventaris.map(aset => aset.lokasi));
  return Array.from(lokasiSet).sort();
};

// --- KOMPONEN HALAMAN DATA INVENTARIS ---
export default function InventarisPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
  const [selectedLokasi, setSelectedLokasi] = useState<string | null>(null);

  const daftarKategori = useMemo(() => getDaftarKategori(), []);
  const daftarLokasi = useMemo(() => getDaftarLokasi(), []);

  // Memfilter data aset berdasarkan pencarian, kategori, dan lokasi
  const filteredAset = useMemo(() => {
    return dataInventaris.filter(aset => {
      const matchesSearch = aset.namaAset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            aset.merek.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKategori = !selectedKategori || aset.kategori === selectedKategori;
      const matchesLokasi = !selectedLokasi || aset.lokasi === selectedLokasi;
      return matchesSearch && matchesKategori && matchesLokasi;
    });
  }, [searchQuery, selectedKategori, selectedLokasi]);

  // Mapping kategori dan kondisi ke warna dan ikon
  const kategoriInfo = {
    'Elektronik': { icon: <FaLaptop />, color: 'blue' },
    'Furniture': { icon: <FaCouch />, color: 'yellow' },
    'Kendaraan': { icon: <FaCar />, color: 'green' },
    'Alat Olahraga': { icon: <FaBasketballBall />, color: 'purple' },
    'Lab': { icon: <FaFlask />, color: 'indigo' },
  };

  const kondisiInfo = {
    'Baik': { color: 'green' },
    'Rusak Ringan': { color: 'yellow' },
    'Rusak Berat': { color: 'red' },
  };
  
  const statusInfo = {
    'Tersedia': { color: 'blue' },
    'Dipinjamkan': { color: 'purple' },
    'Dalam Perbaikan': { color: 'orange' },
  };

  // Komponen Kartu Aset
  const AsetCard: React.FC<{ aset: Aset }> = ({ aset }) => {
    const kategori = kategoriInfo[aset.kategori];
    const kondisi = kondisiInfo[aset.kondisi];
    const status = statusInfo[aset.status];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
        <div className="relative">
          <img src={aset.gambar} alt={aset.namaAset} className="w-full h-48 object-cover" />
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${kategori.color}-100 text-${kategori.color}-800 dark:bg-${kategori.color}-900/30 dark:text-${kategori.color}-400`}>
              {kategori.icon}
              <span className="ml-1">{aset.kategori}</span>
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{aset.namaAset}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{aset.kodeAset} • {aset.merek}</p>
          
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className={`inline-flex items-center px-2 py-1 rounded font-semibold bg-${kondisi.color}-100 text-${kondisi.color}-800 dark:bg-${kondisi.color}-900/30 dark:text-${kondisi.color}-400`}>
              Kondisi: {aset.kondisi}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded font-semibold bg-${status.color}-100 text-${status.color}-800 dark:bg-${status.color}-900/30 dark:text-${status.color}-400`}>
              {aset.status}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{aset.keterangan}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">Lokasi: {aset.lokasi}</p>
          
          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Detail">
              <FaEye />
            </button>
            <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Update">
              <FaEdit />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
              <FaTrash />
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
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Data Inventaris Sekolah</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola semua aset dan sarana sekolah.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Aset Baru
          </button>
        </div>

        {/* Filter dan Pencarian */}
        <div className="space-y-4 mb-6">
          {/* Filter Kategori */}
          <div>
            <div className="flex items-center mb-3">
              <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter Berdasarkan Kategori</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedKategori(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedKategori === null ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                Semua Kategori
              </button>
              {daftarKategori.map((kat) => (
                <button key={kat} onClick={() => setSelectedKategori(kat)} className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${selectedKategori === kat ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {kategoriInfo[kat as keyof typeof kategoriInfo].icon}
                  <span className="ml-2">{kat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Lokasi */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter Berdasarkan Lokasi</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedLokasi(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedLokasi === null ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                Semua Lokasi
              </button>
              {daftarLokasi.map((lok) => (
                <button key={lok} onClick={() => setSelectedLokasi(lok)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedLokasi === lok ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {lok}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Pencarian */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama aset atau merek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grid Kartu Aset */}
        {filteredAset.length === 0 ? (
          <div className="text-center py-10">
            <FaLaptop className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada aset yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAset.map((aset) => (
              <AsetCard key={aset.id} aset={aset} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}