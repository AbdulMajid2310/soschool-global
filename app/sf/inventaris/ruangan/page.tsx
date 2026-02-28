// app/ruangan/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaEye, FaEdit, FaTrash, FaFilter,
  FaGraduationCap, FaFlask, FaChalkboardTeacher, FaBuilding,
  FaBook, FaWarehouse, FaDoorOpen, FaUsers, FaMapMarkerAlt,
  FaUserTie
} from 'react-icons/fa';


// data/ruangan.ts

// --- 1. DEFINISI TIPE DATA UNTUK RUANGAN ---
export interface Ruangan {
  id: string;
  namaRuangan: string;
  tipe: 'Kelas' | 'Lab' | 'Ruang Guru' | 'Aula' | 'Perpustakaan' | 'Gudang';
  lokasi: string; // Contoh: 'Lantai 2, Gedung A'
  kapasitas: number;
  status: 'Tersedia' | 'Digunakan' | 'Dalam Perbaikan';
  penanggungJawab: string;
  fasilitas: string[]; // Contoh: ['Proyektor', 'AC', 'Whiteboard']
  gambar: string; // URL gambar ruangan
  deskripsi: string;
}

// --- 2. DATA RUANGAN SEKOLAH ---
export const dataRuangan: Ruangan[] = [
  {
    id: 'ru-001',
    namaRuangan: 'Kelas VII A',
    tipe: 'Kelas',
    lokasi: 'Lantai 1, Gedung Utama',
    kapasitas: 36,
    status: 'Digunakan',
    penanggungJawab: 'Siti Nurhaliza, S.Pd.',
    fasilitas: ['Proyektor', 'AC', 'Whiteboard', 'Speaker'],
    gambar: 'https://picsum.photos/seed/kelas-vii-a/400/300.jpg',
    deskripsi: 'Ruang kelas untuk siswa kelas 7A, dilengkapi dengan proyektor.',
  },
  {
    id: 'ru-002',
    namaRuangan: 'Lab Komputer 1',
    tipe: 'Lab',
    lokasi: 'Lantai 2, Gedung B',
    kapasitas: 30,
    status: 'Tersedia',
    penanggungJawab: 'Budi Santoso, S.Kom.',
    fasilitas: ['30 Unit PC', 'AC', 'Internet', 'Proyektor'],
    gambar: 'https://picsum.photos/seed/lab-komputer-1/400/300.jpg',
    deskripsi: 'Laboratorium komputer untuk praktikum TIK dan pemrograman.',
  },
  {
    id: 'ru-003',
    namaRuangan: 'Lab Fisika',
    tipe: 'Lab',
    lokasi: 'Lantai 3, Gedung B',
    kapasitas: 25,
    status: 'Tersedia',
    penanggungJawab: 'Dr. Andi Wijaya, M.Si.',
    fasilitas: ['Meja Praktikum', 'Alat Lab', 'Proyektor', 'AC'],
    gambar: 'https://picsum.photos/seed/lab-fisika/400/300.jpg',
    deskripsi: 'Laboratorium untuk praktikum fisika meliputi listrik dan mekanika.',
  },
  {
    id: 'ru-004',
    namaRuangan: 'Ruang Guru',
    tipe: 'Ruang Guru',
    lokasi: 'Lantai 1, Gedung Utama',
    kapasitas: 20,
    status: 'Digunakan',
    penanggungJawab: 'Rizki Pratama, S.Pd.',
    fasilitas: ['Locker', 'Meja Kerja', 'AC', 'WiFi'],
    gambar: 'https://picsum.photos/seed/ruang-guru/400/300.jpg',
    deskripsi: 'Ruang kerja dan tempat istirahat bagi guru.',
  },
  {
    id: 'ru-005',
    namaRuangan: 'Aula Sekolah',
    tipe: 'Aula',
    lokasi: 'Lantai 1, Gedung Serbaguna',
    kapasitas: 300,
    status: 'Tersedia',
    penanggungJawab: 'Kepala Sekolah',
    fasilitas: ['Panggung', 'Sound System', 'Proyektor', 'Kurs Lipat'],
    gambar: 'https://picsum.photos/seed/aula-sekolah/400/300.jpg',
    deskripsi: 'Aula besar untuk acara sekolah seperti upacara atau seminar.',
  },
  {
    id: 'ru-006',
    namaRuangan: 'Perpustakaan',
    tipe: 'Perpustakaan',
    lokasi: 'Lantai 2, Gedung C',
    kapasitas: 80,
    status: 'Digunakan',
    penanggungJawab: 'Kepala Perpustakaan',
    fasilitas: ['Rak Buku', 'Meja Baca', 'Komputer Katalog', 'AC'],
    gambar: 'https://picsum.photos/seed/perpustakaan/400/300.jpg',
    deskripsi: 'Pusat sumber belajar dengan koleksi buku dan fasilitas baca yang nyaman.',
  },
  {
    id: 'ru-007',
    namaRuangan: 'Gudang Olahraga',
    tipe: 'Gudang',
    lokasi: 'Belakang Lapangan',
    kapasitas: 5,
    status: 'Dalam Perbaikan',
    penanggungJawab: 'Guru Olahraga',
    fasilitas: ['Rak Penyimpanan', 'Alat Olahraga'],
    gambar: 'https://picsum.photos/seed/gudang-olahraga/400/300.jpg',
    deskripsi: 'Gudang untuk menyimpan berbagai alat dan perlengkapan olahraga. Atap sedang diperbaiki.',
  },
];

// --- 3. FUNGSI UNTUK MENDAPATKAN DAFTAR TIPE & STATUS UNIK ---
export const getDaftarTipe = (): string[] => {
  const tipeSet = new Set(dataRuangan.map(ruangan => ruangan.tipe));
  return Array.from(tipeSet).sort();
};

export const getDaftarStatus = (): string[] => {
    const statusSet = new Set(dataRuangan.map(ruangan => ruangan.status));
    return Array.from(statusSet).sort();
};


// --- KOMPONEN HALAMAN DATA RUANGAN ---
export default function RuanganPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTipe, setSelectedTipe] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const daftarTipe = useMemo(() => getDaftarTipe(), []);
  const daftarStatus = useMemo(() => getDaftarStatus(), []);

  // Memfilter data ruangan
  const filteredRuangan = useMemo(() => {
    return dataRuangan.filter(ruangan => {
      const matchesSearch = ruangan.namaRuangan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ruangan.penanggungJawab.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTipe = !selectedTipe || ruangan.tipe === selectedTipe;
      const matchesStatus = !selectedStatus || ruangan.status === selectedStatus;
      return matchesSearch && matchesTipe && matchesStatus;
    });
  }, [searchQuery, selectedTipe, selectedStatus]);

  // Mapping tipe dan status ke warna dan ikon
  const tipeInfo = {
    'Kelas': { icon: <FaGraduationCap />, color: 'blue' },
    'Lab': { icon: <FaFlask />, color: 'purple' },
    'Ruang Guru': { icon: <FaChalkboardTeacher />, color: 'green' },
    'Aula': { icon: <FaBuilding />, color: 'yellow' },
    'Perpustakaan': { icon: <FaBook />, color: 'indigo' },
    'Gudang': { icon: <FaWarehouse />, color: 'gray' },
  };

  const statusInfo = {
    'Tersedia': { color: 'green' },
    'Digunakan': { color: 'blue' },
    'Dalam Perbaikan': { color: 'red' },
  };

  // Komponen Kartu Ruangan
  const RuanganCard: React.FC<{ ruangan: Ruangan }> = ({ ruangan }) => {
    const tipe = tipeInfo[ruangan.tipe];
    const status = statusInfo[ruangan.status];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
        <div className="relative">
          <img src={ruangan.gambar} alt={ruangan.namaRuangan} className="w-full h-48 object-cover" />
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${tipe.color}-100 text-${tipe.color}-800 dark:bg-${tipe.color}-900/30 dark:text-${tipe.color}-400`}>
              {tipe.icon}
              <span className="ml-1">{ruangan.tipe}</span>
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{ruangan.namaRuangan}</h3>
          
          <div className="space-y-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              {ruangan.lokasi}
            </p>
            <p className="flex items-center">
              <FaUsers className="mr-2 text-gray-400" />
              Kapasitas: {ruangan.kapasitas} Orang
            </p>
            <p className="flex items-center">
              <FaUserTie className="mr-2 text-gray-400" />
              {ruangan.penanggungJawab}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {ruangan.fasilitas.slice(0, 3).map((fasilitas, index) => (
              <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                {fasilitas}
              </span>
            ))}
            {ruangan.fasilitas.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">...</span>
            )}
          </div>

          {/* Footer: Status dan Aksi */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${status.color}-100 text-${status.color}-800 dark:bg-${status.color}-900/30 dark:text-${status.color}-400`}>
              <FaDoorOpen className="mr-1" />
              {ruangan.status}
            </span>
            
            {/* Tombol Aksi */}
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Data Ruangan Sekolah</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola semua ruangan dan fasilitasnya.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Ruangan Baru
          </button>
        </div>

        {/* Filter dan Pencarian */}
        <div className="space-y-4 mb-6">
          {/* Filter Tipe */}
          <div>
            <div className="flex items-center mb-3">
              <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter Berdasarkan Tipe</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedTipe(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedTipe === null ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                Semua Tipe
              </button>
              {daftarTipe.map((tipe) => (
                <button key={tipe} onClick={() => setSelectedTipe(tipe)} className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${selectedTipe === tipe ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {tipeInfo[tipe as keyof typeof tipeInfo].icon}
                  <span className="ml-2">{tipe}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter Berdasarkan Status</h3>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedStatus(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === null ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                Semua Status
              </button>
              {daftarStatus.map((status) => (
                <button key={status} onClick={() => setSelectedStatus(status)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === status ? 'bg-gray-800 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {status}
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
            placeholder="Cari berdasarkan nama ruangan atau penanggung jawab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grid Kartu Ruangan */}
        {filteredRuangan.length === 0 ? (
          <div className="text-center py-10">
            <FaBuilding className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada ruangan yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRuangan.map((ruangan) => (
              <RuanganCard key={ruangan.id} ruangan={ruangan} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}