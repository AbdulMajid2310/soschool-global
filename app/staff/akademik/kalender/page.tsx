// app/kalender-akademik/page.tsx

'use client';

import React, { useMemo, useState } from 'react'; // <-- TAMBAHKAN useState
import { 
  FaCalendarAlt, FaBook, FaClipboardList, FaSun, FaSchool,
  FaChalkboardTeacher, FaFileSignature, FaUserGraduate, FaFilter // <-- TAMBAHKAN FaFilter
} from 'react-icons/fa';

// --- 1. TIPE DATA UNTUK EVENT AKADEMIK ---
interface EventAkademik {
  id: string;
  namaKegiatan: string;
  tanggalMulai: string; // Format 'YYYY-MM-DD'
  tanggalSelesai: string; // Format 'YYYY-MM-DD'
  deskripsi: string;
  kategori: 'Pembelajaran' | 'Ujian' | 'Libur' | 'Kegiatan';
}

// --- 2. DATA KALENDER AKADEMIK ---
const dataKalenderAkademik: EventAkademik[] = [
  // TAHUN AJARAN 2024/2025
  { id: '1', namaKegiatan: 'Hari Pertama Masuk', tanggalMulai: '2024-07-15', tanggalSelesai: '2024-07-15', deskripsi: 'Awal tahun ajaran 2024/2025.', kategori: 'Pembelajaran' },
  { id: '2', namaKegiatan: 'Masa Orientasi Siswa (MOS)', tanggalMulai: '2024-07-15', tanggalSelesai: '2024-07-17', deskripsi: 'Kegiatan pengenalan lingkungan sekolah untuk siswa baru.', kategori: 'Kegiatan' },
  { id: '3', namaKegiatan: 'Pembelajaran Semester Ganjil', tanggalMulai: '2024-07-18', tanggalSelesai: '2024-12-20', deskripsi: 'Periode pembelajaran untuk semester ganjil.', kategori: 'Pembelajaran' },
  { id: '4', namaKegiatan: 'Ujian Tengah Semester (UTS) Ganjil', tanggalMulai: '2024-09-30', tanggalSelesai: '2024-10-05', deskripsi: 'Penilaian tengah semester ganjil.', kategori: 'Ujian' },
  { id: '5', namaKegiatan: 'Libur Akhir Tahun', tanggalMulai: '2024-12-23', tanggalSelesai: '2025-01-06', deskripsi: 'Libur semester ganjil dan Hari Raya Natal.', kategori: 'Libur' },
  { id: '6', namaKegiatan: 'Hari Pertama Masuk Semester Genap', tanggalMulai: '2025-01-07', tanggalSelesai: '2025-01-07', deskripsi: 'Awal kegiatan belajar semester genap.', kategori: 'Pembelajaran' },
  { id: '7', namaKegiatan: 'Ujian Tengah Semester (UTS) Genap', tanggalMulai: '2025-03-17', tanggalSelesai: '2025-03-22', deskripsi: 'Penilaian tengah semester genap.', kategori: 'Ujian' },
  { id: '8', namaKegiatan: 'Ujian Sekolah (US)', tanggalMulai: '2025-04-07', tanggalSelesai: '2025-04-15', deskripsi: 'Ujian akhir untuk kelas XII.', kategori: 'Ujian' },
  { id: '9', namaKegiatan: 'Ujian Akhir Semester (UAS) Genap', tanggalMulai: '2025-05-26', tanggalSelesai: '2025-06-07', deskripsi: 'Penilaian akhir semester genap.', kategori: 'Ujian' },
  { id: '10', namaKegiatan: 'Pengumuman Kelulusan', tanggalMulai: '2025-05-20', tanggalSelesai: '2025-05-20', deskripsi: 'Pengumuman hasil kelulusan siswa kelas XII.', kategori: 'Kegiatan' },
  { id: '11', namaKegiatan: 'Wisuda', tanggalMulai: '2025-05-25', tanggalSelesai: '2025-05-25', deskripsi: 'Acara pelepasan siswa kelas XII.', kategori: 'Kegiatan' },
  { id: '12', namaKegiatan: 'Libur Akhir Tahun Pelajaran', tanggalMulai: '2025-06-16', tanggalSelesai: '2025-07-14', deskripsi: 'Libur semester genap dan kegiatan panja.', kategori: 'Libur' },
];

// --- 3. KOMPONEN HALAMAN KALENDER AKADEMIK ---
export default function KalenderAkademikPage() {
  // --- STATE UNTUK FILTER ---
  const [selectedKategori, setSelectedKategori] = useState<string | null>(null);

  // --- Fungsi Helper untuk Memformat Tanggal ---
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

    if (start === end) {
      return startDate.toLocaleDateString('id-ID', options);
    }
    
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${startDate.toLocaleDateString('id-ID', { day: 'numeric' })} - ${endDate.toLocaleDateString('id-ID', options)} ${startDate.getFullYear()}`;
    }

    return `${startDate.toLocaleDateString('id-ID', options)} - ${endDate.toLocaleDateString('id-ID', options)}`;
  };

  // --- Mengelompokkan Data Berdasarkan Bulan dan Tahun (DIPERBAIKI) ---
  const groupedEvents = useMemo(() => {
    // 1. Filter data berdasarkan kategori yang dipilih
    const filteredData = selectedKategori
      ? dataKalenderAkademik.filter(event => event.kategori === selectedKategori)
      : dataKalenderAkademik;

    // 2. Kelompokkan data yang sudah difilter
    const groups: Record<string, EventAkademik[]> = {};
    filteredData.forEach(event => {
      const date = new Date(event.tanggalMulai);
      const monthYear = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(event);
    });
    
    // Urutkan event di dalam setiap bulan berdasarkan tanggal mulai
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => new Date(a.tanggalMulai).getTime() - new Date(b.tanggalMulai).getTime());
    });
    return groups;
  }, [selectedKategori]); // <-- Tambahkan dependency

  // --- Mapping Kategori ke Warna dan Ikon ---
  const kategoriInfo = {
    Pembelajaran: { icon: <FaBook />, color: 'blue' },
    Ujian: { icon: <FaClipboardList />, color: 'red' },
    Libur: { icon: <FaSun />, color: 'green' },
    Kegiatan: { icon: <FaSchool />, color: 'purple' },
  };

  // --- Komponen Kartu Event ---
  const EventCard: React.FC<{ event: EventAkademik }> = ({ event }) => {
    const info = kategoriInfo[event.kategori];
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    };

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className={`inline-flex items-center p-2 rounded-lg mr-3 ${colorClasses[info.color as keyof typeof colorClasses]}`}>
                {info.icon}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.namaKegiatan}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{formatDateRange(event.tanggalMulai, event.tanggalSelesai)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{event.deskripsi}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
            <FaCalendarAlt className="mr-3 text-blue-600 dark:text-blue-400" />
            Kalender Akademik
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Tahun Ajaran 2024/2025</p>
        </div>

        {/* --- TAMBAHKAN TOMBOL FILTER --- */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter Berdasarkan Kategori</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedKategori(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedKategori === null
                  ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Semua Kategori
            </button>
            {Object.entries(kategoriInfo).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedKategori(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  selectedKategori === key
                    ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-800 shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <span className={`w-3 h-3 bg-${val.color}-500 rounded-full mr-2`}></span>
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Event Berdasarkan Bulan */}
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="text-center py-10">
            <FaCalendarAlt className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada kegiatan yang ditemukan untuk kategori "{selectedKategori}".</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedEvents).map(([monthYear, events]) => (
              <section key={monthYear}>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600">
                  {monthYear}
                </h2>
                <div className="space-y-3">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}