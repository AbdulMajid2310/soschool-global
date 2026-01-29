// app/mata-pelajaran/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaBook, FaFlask, FaCalculator, FaLanguage, 
  FaGlobe, FaPalette, FaHistory, FaRunning, FaMusic, FaDesktop,
  FaEye, FaEdit, FaTrash
} from 'react-icons/fa';


// data/mapel.ts

// --- 1. DEFINISI TIPE DATA ---
export interface MataPelajaran {
  id: string;
  namaPelajaran: string;
  deskripsi: string;
  kelas: string; // Nama kelas tempat mata pelajaran ini diajarkan
}

// --- 2. DATA MATA PELAJARAN (SATU ARRAY DATAR) ---
export const dataMataPelajaran: MataPelajaran[] = [
  // Kelas VII A
  { id: 'vii-a-1', namaPelajaran: 'Matematika', deskripsi: 'Mempelajari konsep dasar matematika, aljabar, dan geometri.', kelas: 'VII A' },
  { id: 'vii-a-2', namaPelajaran: 'Bahasa Indonesia', deskripsi: 'Mempelajari tata bahasa dan sastra Indonesia.', kelas: 'VII A' },
  { id: 'vii-a-3', namaPelajaran: 'IPA Terpadu', deskripsi: 'Pengenalan sains terpadu: fisika, biologi, kimia.',  kelas: 'VII A' },
  { id: 'vii-a-4', namaPelajaran: 'IPS Terpadu',  deskripsi: 'Mempelajari sejarah, geografi, sosiologi, dan ekonomi.', kelas: 'VII A' },
  { id: 'vii-a-5', namaPelajaran: 'Seni Budaya',  deskripsi: 'Mengeksplorasi seni rupa, musik, dan tari.', kelas: 'VII A' },

  // Kelas X IPA 1
  { id: 'x-ipa1-1', namaPelajaran: 'Matematika Wajib',  deskripsi: 'Mempelajari matematika lanjut untuk tingkat SMA.', kelas: 'X IPA 1' },
  { id: 'x-ipa1-2', namaPelajaran: 'Fisika', deskripsi: 'Mempelajari tentang energi, gaya, gerak, dan kelistrikan.', kelas: 'X IPA 1' },
  { id: 'x-ipa1-3', namaPelajaran: 'Kimia',  deskripsi: 'Mempelajari struktur atom, senyawa, dan reaksi kimia.',  kelas: 'X IPA 1' },
  { id: 'x-ipa1-4', namaPelajaran: 'Biologi', deskripsi: 'Mempelajari makhluk hidup dan ekosistem.',  kelas: 'X IPA 1' },
  { id: 'x-ipa1-5', namaPelajaran: 'Bahasa Inggris', deskripsi: 'Meningkatkan kemampuan berbahasa Inggris.', kelas: 'X IPA 1' },

  // Kelas XII IPS 2
  { id: 'xii-ips2-1', namaPelajaran: 'Matematika Wajib', deskripsi: 'Matematika untuk jurusan IPS.', kelas: 'XII IPS 2' },
  { id: 'xii-ips2-2', namaPelajaran: 'Ekonomi',  deskripsi: 'Mempelajari kegiatan ekonomi dan prinsip-prinsipnya.', kelas: 'XII IPS 2' },
  { id: 'xii-ips2-3', namaPelajaran: 'Geografi', deskripsi: 'Mempelajari fenomena geosfer dan hubungannya dengan manusia.', kelas: 'XII IPS 2' },
  { id: 'xii-ips2-4', namaPelajaran: 'Sosiologi', deskripsi: 'Mempelajari masyarakat dan perilaku sosial.',  kelas: 'XII IPS 2' },
];

// --- 3. FUNGSI UNTUK MENDAPATKAN DAFTAR KELAS UNIK ---
export const getDaftarKelas = (): string[] => {
  const kelasSet = new Set(dataMataPelajaran.map(pelajaran => pelajaran.kelas));
  return Array.from(kelasSet).sort(); // Mengurutkan nama kelas
};

// --- KOMPONEN HALAMAN MATA PELAJARAN ---
export default function MataPelajaranPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null); // State untuk kelas yang dipilih

  // Mendapatkan daftar kelas unik dari data
  const daftarKelas = useMemo(() => getDaftarKelas(), []);

  // Memfilter data mata pelajaran berdasarkan pencarian dan kelas yang dipilih
  const filteredMataPelajaran = useMemo(() => {
    return dataMataPelajaran.filter(pelajaran => {
      const matchesSearch = pelajaran.namaPelajaran.toLowerCase().includes(searchQuery.toLowerCase())
                         
      const matchesKelas = !selectedKelas || pelajaran.kelas === selectedKelas;
      return matchesSearch && matchesKelas;
    });
  }, [searchQuery, selectedKelas]);

  // Pemetaan string nama icon ke komponen icon
  const iconMap: Record<string, React.ReactNode> = {
    FaCalculator: <FaCalculator />,
    FaFlask: <FaFlask />,
    FaLanguage: <FaLanguage />,
    FaGlobe: <FaGlobe />,
    FaPalette: <FaPalette />,
    FaHistory: <FaHistory />,
    FaRunning: <FaRunning />,
    FaDesktop: <FaDesktop />,
    FaMusic: <FaMusic />,
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Data Mata Pelajaran</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola semua mata pelajaran berdasarkan kelas.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Mata Pelajaran
          </button>
        </div>

        {/* Tombol Filter Kelas */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter Berdasarkan Kelas</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedKelas(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedKelas === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Semua Kelas
            </button>
            {daftarKelas.map((kelas) => (
              <button
                key={kelas}
                onClick={() => setSelectedKelas(kelas)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedKelas === kelas
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {kelas}
              </button>
            ))}
          </div>
        </div>

        {/* Input Pencarian */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari mata pelajaran atau guru..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grid Kartu Mata Pelajaran */}
        {filteredMataPelajaran.length === 0 ? (
          <div className="text-center py-10">
            <FaBook className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada mata pelajaran yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMataPelajaran.map((pelajaran) => (
              <div key={pelajaran.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="p-6">
                  {/* Header: Icon dan Nama */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                     
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pelajaran.namaPelajaran}</h3>
                       
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{pelajaran.deskripsi}</p>
                  
                  {/* Guru dan Kelas */}
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                   
                    <p><span className="font-medium">Kelas:</span> {pelajaran.kelas}</p>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}