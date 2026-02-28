// app/perpustakaan/detail/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaArrowLeft, FaUserEdit, FaTrash, FaBookOpen, FaCalendarAlt,
  FaBuilding, FaTag, FaLayerGroup, FaBoxes, FaGlobe, FaRulerCombined,
  FaUser, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

// --- 1. DATA STATIS BUKU YANG LENGKAP DAN MENARIK ---
const bukuDetailStatis = {
  id: 'buku-detail-001',
  judul: 'The Pragmatic Programmer: Your Journey to Mastery',
  penulis: 'David Thomas, Andrew Hunt',
  gambar: 'https://picsum.photos/seed/pragmatic-programmer/400/600.jpg',
  penerbit: 'Addison-Wesley Professional',
  tahunTerbit: 2019,
  isbn: '978-0135957059',
  kategori: 'Teknologi',
  jumlahHalaman: 352,
  bahasa: 'Inggris',
  dimensi: '18 x 23.5 cm',
  jumlahStok: 5,
  sinopsis: 'Ditulis sebagai serangkaian artikel yang berdiri sendiri dengan komentar singkat, edisi baru kedua dari buku ini penuh dengan ide-ide baru yang relevan bahkan bagi pengembang C++ atau Java yang paling berpengalaman. Buku ini adalah buku wajib bagi setiap programmer, terlepas dari tingkat keahlian Anda. Anda akan menemukan serangkaian praktik, peralatan, dan disiplin yang telah membentuk karir para pengembang terbaik. Dari pragmatisme dasar hingga metode pengembangan yang berat, buku ini menawarkan wawasan yang tak ternilai untuk meningkatkan keterampilan dan karir pemrograman Anda.',
  tentangPenulis: 'David Thomas dan Andrew Hunt adalah pendiri The Pragmatic Programmers, LLC, dan penulis beberapa buku terlaris tentang pengembangan perangkat lunak. Mereka berdua memiliki pengalaman puluhan tahun dalam industri perangkat lunak dan telah berbicara di berbagai konferensi internasional. Misi mereka adalah membantu pengembang menjadi lebih produktif dan efektif.',
  daftarIsi: [
    'Bab 1: A Pragmatic Philosophy',
    'Bab 2: A Pragmatic Approach',
    'Bab 3: The Basic Tools',
    'Bab 4: Pragmatic Paranoia',
    'Bab 5: Bend, or Break',
    'Bab 6: Concurrency',
    'Bab 7: While You Are Coding',
    'Bab 8: Before the Project',
    'Bab 9: Pragmatic Projects',
    'Appendix A: Bibliography',
    'Appendix B: Answers to Exercises'
  ]
};

// --- 2. KOMPONEN HALAMAN DETAIL ---
export default function BukuDetailPage() {
  const [isDaftarIsiOpen, setIsDaftarIsiOpen] = useState(false);
  const isTersedia = bukuDetailStatis.jumlahStok > 0;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Tombol Kembali */}
        <Link href="/perpustakaan" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <FaArrowLeft className="mr-2" />
          Kembali ke Katalog
        </Link>

        {/* Konten Utama Detail Buku */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Kolom Kiri: Gambar Buku */}
            <div className="md:col-span-1">
              <img 
                src={bukuDetailStatis.gambar} 
                alt={bukuDetailStatis.judul}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4 text-center">
                <span className={`inline-block px-4 py-2 text-lg font-semibold rounded-full ${
                  isTersedia 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {isTersedia ? `Tersedia (${bukuDetailStatis.jumlahStok} buku)` : 'Stok Habis'}
                </span>
              </div>
            </div>

            {/* Kolom Kanan: Informasi Buku */}
            <div className="md:col-span-2 space-y-6">
              {/* Judul dan Penulis */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{bukuDetailStatis.judul}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 flex items-center">
                  <FaUser className="mr-2" /> oleh {bukuDetailStatis.penulis}
                </p>
              </div>

              {/* Tombol Aksi */}
              <div className="flex space-x-3">
                <button 
                  className={`flex-1 sm:flex-none flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors ${
                    isTersedia 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  disabled={!isTersedia}
                >
                  <FaBookOpen className="mr-2" />
                  Pinjam Buku
                </button>
                <button className="p-3 text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors" title="Edit">
                  <FaUserEdit />
                </button>
                <button className="p-3 text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors" title="Hapus">
                  <FaTrash />
                </button>
              </div>

              {/* Informasi Detail */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informasi Buku</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaBuilding className="inline mr-2" />Penerbit:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.penerbit}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaCalendarAlt className="inline mr-2" />Tahun:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.tahunTerbit}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaTag className="inline mr-2" />ISBN:</dt>
                    <dd className="text-gray-900 dark:text-gray-100 font-mono">{bukuDetailStatis.isbn}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaLayerGroup className="inline mr-2" />Kategori:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.kategori}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaBookOpen className="inline mr-2" />Halaman:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.jumlahHalaman} halaman</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaGlobe className="inline mr-2" />Bahasa:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.bahasa}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaRulerCombined className="inline mr-2" />Dimensi:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.dimensi}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-semibold text-gray-600 dark:text-gray-400 w-28"><FaBoxes className="inline mr-2" />Stok:</dt>
                    <dd className="text-gray-900 dark:text-gray-100">{bukuDetailStatis.jumlahStok} buku</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Sinopsis */}
          <div className="px-8 pb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sinopsis</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {bukuDetailStatis.sinopsis}
            </p>
          </div>

          {/* Tentang Penulis */}
          <div className="px-8 pb-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tentang Penulis</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {bukuDetailStatis.tentangPenulis}
            </p>
          </div>

          {/* Daftar Isi (Collapsible) */}
          <div className="px-8 pb-8 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setIsDaftarIsiOpen(!isDaftarIsiOpen)}
              className="w-full flex items-center justify-between text-left text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Daftar Isi
              {isDaftarIsiOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isDaftarIsiOpen && (
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {bukuDetailStatis.daftarIsi.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-semibold mr-2 text-gray-500 dark:text-gray-400">{item.split(':')[0]}:</span>
                    <span>{item.split(':')[1]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}