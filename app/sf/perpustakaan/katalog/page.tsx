// app/perpustakaan/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaBook, FaEye, FaEdit, FaTrash,
  FaLayerGroup, FaFlask, FaLaptopCode, FaLandmark, FaPalette
} from 'react-icons/fa';

// data/buku.ts

// --- 1. DEFINISI TIPE DATA UNTUK BUKU ---
export interface Buku {
  id: string;
  judul: string;
  penulis: string;
  penerbit: string;
  tahunTerbit: number;
  isbn: string;
  kategori: 'Fiksi' | 'Non-Fiksi' | 'Sains' | 'Teknologi' | 'Sejarah' | 'Seni';
  jumlahStok: number;
  gambar: string; // URL gambar cover buku
  deskripsi: string;
}

// --- 2. DATA KATALOG BUKU ---
export const dataBuku: Buku[] = [
  {
    id: '1',
    judul: 'Laskar Pelangi',
    penulis: 'Andrea Hirata',
    penerbit: 'Bentang Pustaka',
    tahunTerbit: 2005,
    isbn: '978-602-291-014-1',
    kategori: 'Fiksi',
    jumlahStok: 12,
    gambar: 'https://picsum.photos/seed/laskar-pelangi/200/300.jpg',
    deskripsi: 'Novel inspiratif tentang perjuangan anak-anak Belitung untuk mendapatkan pendidikan.',
  },
  {
    id: '2',
    judul: 'Sapiens: Riwayat Singkat Umat Manusia',
    penulis: 'Yuval Noah Harari',
    penerbit: 'Kepustakaan Populer Gramedia',
    tahunTerbit: 2016,
    isbn: '978-602-424-608-1',
    kategori: 'Non-Fiksi',
    jumlahStok: 8,
    gambar: 'https://picsum.photos/seed/sapiens/200/300.jpg',
    deskripsi: 'Sejarah umat manusia dari zaman prasejarah hingga era modern.',
  },
  {
    id: '3',
    judul: 'Brief Answers to the Big Questions',
    penulis: 'Stephen Hawking',
    penerbit: 'Bantam Press',
    tahunTerbit: 2018,
    isbn: '978-1-984-81919-2',
    kategori: 'Sains',
    jumlahStok: 5,
    gambar: 'https://picsum.photos/seed/big-questions/200/300.jpg',
    deskripsi: 'Stephen Hawking menjawab pertanyaan-pertanyaan besar tentang alam semesta.',
  },
  {
    id: '4',
    judul: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    penulis: 'Robert C. Martin',
    penerbit: 'Prentice Hall',
    tahunTerbit: 2008,
    isbn: '978-013-235088-4',
    kategori: 'Teknologi',
    jumlahStok: 10,
    gambar: 'https://picsum.photos/seed/clean-code/200/300.jpg',
    deskripsi: 'Panduan menulis kode yang bersih, mudah dibaca, dan dapat dipelihara.',
  },
  {
    id: '5',
    judul: 'Sejarah Nusantara',
    penulis: 'Bernard H.M. Vlekke',
    penerbit: 'Grafiti',
    tahunTerbit: 2018,
    isbn: '978-602-424-608-1',
    kategori: 'Sejarah',
    jumlahStok: 0, // Contoh buku yang habis
    gambar: 'https://picsum.photos/seed/sejarah-nusantara/200/300.jpg',
    deskripsi: 'Sejarah lengkap kepulauan Nusantara dari zaman kuno hingga modern.',
  },
  {
    id: '6',
    judul: 'The Way of the Superior Man: A Spiritual Guide to Mastering the Challenges of Women, Work, and Sexual Desire',
    penulis: 'David Deida',
    penerbit: 'Sounds True',
    tahunTerbit: 1997,
    isbn: '978-1-561-708-58-0',
    kategori: 'Non-Fiksi',
    jumlahStok: 3,
    gambar: 'https://picsum.photos/seed/superior-man/200/300.jpg',
    deskripsi: 'Panduan spiritual bagi pria untuk menguasai tantangan kehidupan.',
  },
  {
    id: '7',
    judul: 'Cosmos',
    penulis: 'Carl Sagan',
    penerbit: 'Random House',
    tahunTerbit: 1980,
    isbn: '978-0-345-33135-9',
    kategori: 'Sains',
    jumlahStok: 7,
    gambar: 'https://picsum.photos/seed/cosmos/200/300.jpg',
    deskripsi: 'Perjalanan personal ke alam semesta, menjelajahi asal-usul kehidupan dan pencarian makna.',
  },
  {
    id: '8',
    judul: 'Ways of Seeing',
    penulis: 'John Berger',
    penerbit: 'Penguin Books',
    tahunTerbit: 1972,
    isbn: '978-0-14-013515-2',
    kategori: 'Seni',
    jumlahStok: 4,
    gambar: 'https://picsum.photos/seed/ways-of-seeing/200/300.jpg',
    deskripsi: 'Sebuah eksplorasi tentang bagaimana kita melihat dan memahami seni visual.',
  },
];

// --- 3. FUNGSI UNTUK MENDAPATKAN DAFTAR KATEGORI UNIK ---
export const getDaftarKategori = (): string[] => {
  const kategoriSet = new Set(dataBuku.map(buku => buku.kategori));
  return Array.from(kategoriSet).sort();
};

// --- KOMPONEN HALAMAN KATALOG BUKU ---
export default function KatalogBukuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);

  const daftarKategori = useMemo(() => getDaftarKategori(), []);

  // Memfilter data buku berdasarkan pencarian dan kategori
  const filteredBuku = useMemo(() => {
    return dataBuku.filter(buku => {
      const matchesSearch = buku.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            buku.penulis.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesKategori = !selectedKategori || buku.kategori === selectedKategori;
      return matchesSearch && matchesKategori;
    });
  }, [searchQuery, selectedKategori]);

  // Mapping kategori ke ikon dan warna
  const kategoriInfo = {
    'Fiksi': { icon: <FaBook />, color: 'purple' },
    'Non-Fiksi': { icon: <FaLayerGroup />, color: 'yellow' },
    'Sains': { icon: <FaFlask />, color: 'blue' },
    'Teknologi': { icon: <FaLaptopCode />, color: 'green' },
    'Sejarah': { icon: <FaLandmark />, color: 'red' },
    'Seni': { icon: <FaPalette />, color: 'pink' },
  };

  // Komponen Kartu Buku
  const BukuCard: React.FC<{ buku: Buku }> = ({ buku }) => {
    const info = kategoriInfo[buku.kategori];
    const isTersedia = buku.jumlahStok > 0;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
        <div className="relative">
          <img 
            src={buku.gambar} 
            alt={buku.judul} 
            className="w-full h-64 object-cover"
          />
          {!isTersedia && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-red-600 text-white text-lg font-bold px-4 py-2 rounded">Habis</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded bg-${info.color}-100 text-${info.color}-800 dark:bg-${info.color}-900/30 dark:text-${info.color}-400`}>
              {info.icon}
              <span className="ml-1">{buku.kategori}</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Stok: {buku.jumlahStok}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{buku.judul}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">oleh {buku.penulis}</p>
          
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
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Katalog Buku Perpustakaan</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Temukan dan kelola koleksi buku sekolah.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Buku Baru
          </button>
        </div>

        {/* Tombol Filter Kategori */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter Berdasarkan Kategori</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedKategori(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedKategori === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Semua Kategori
            </button>
            {daftarKategori.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setSelectedKategori(kategori)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  selectedKategori === kategori
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {kategoriInfo[kategori as keyof typeof kategoriInfo].icon}
                <span className="ml-2">{kategori}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Pencarian */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grid Kartu Buku */}
        {filteredBuku.length === 0 ? (
          <div className="text-center py-10">
            <FaBook className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada buku yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBuku.map((buku) => (
              <BukuCard key={buku.id} buku={buku} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}