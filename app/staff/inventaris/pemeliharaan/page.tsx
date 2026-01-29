// app/pemeliharaan/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { 
  FaPlus, FaSearch, FaEye, FaWrench, FaTimesCircle,
  FaTools, FaExclamationTriangle, FaUser, FaCalendarAlt,
  FaCheckCircle, FaClock, FaBan
} from 'react-icons/fa';

// data/pemeliharaan.ts

// --- 1. DEFINISI TIPE DATA UNTUK PEMELIHARAAN ---
export interface Pemeliharaan {
  id: string;
  idAset: string; // ID unik aset dari data inventaris
  namaAset: string; // Denormalisasi untuk kemudahan tampilan
  gambarAset: string; // Denormalisasi untuk kemudahan tampilan
  pelapor: {
    nama: string;
    jabatan: string; // Contoh: 'Guru', 'TU', 'Kepala Lab'
  };
  tanggalLapor: string; // Format 'YYYY-MM-DD'
  deskripsiKerusakan: string;
  status: 'Diterima' | 'Sedang Diproses' | 'Selesai' | 'Dibatalkan';
  tanggalSelesai: string | null; // Null jika belum selesai
  biaya: number | null; // Dalam Rupiah
  teknisi: string | null; // Nama teknisi yang memperbaiki
  keteranganPerbaikan: string | null; // Apa yang dilakukan untuk memperbaiki
}

// --- 2. DATA PEMELIHARAAN ---
export const dataPemeliharaan: Pemeliharaan[] = [
  {
    id: 'pm-001',
    idAset: 'ast-002',
    namaAset: 'Laptop Lenovo ThinkPad E14',
    gambarAset: 'https://picsum.photos/seed/laptop-lenovo/300/200.jpg',
    pelapor: { nama: 'Ahmad Fadli, S.Pd.', jabatan: 'Guru' },
    tanggalLapor: '2024-06-10',
    deskripsiKerusakan: 'Keyboard tombol "E" tidak responsif dan kadang macet-macet.',
    status: 'Sedang Diproses',
    tanggalSelesai: null,
    biaya: null,
    teknisi: 'Budi Teknisi',
    keteranganPerbaikan: 'Sedang menunggu penggantian sparepart keyboard yang baru.',
  },
  {
    id: 'pm-002',
    idAset: 'ast-006',
    namaAset: 'Printer Canon iP2770',
    gambarAset: 'https://picsum.photos/seed/printer-canon/300/200.jpg',
    pelapor: { nama: 'Siti Nurhaliza, S.Pd.', jabatan: 'TU' },
    tanggalLapor: '2024-05-20',
    deskripsiKerusakan: 'Printer tidak bisa mencetak, head printer macet total.',
    status: 'Selesai',
    tanggalSelesai: '2024-06-05',
    biaya: 350000,
    teknisi: 'Budi Teknisi',
    keteranganPerbaikan: 'Head printer berhasil dibersihkan dan cartridge diganti. Printer sudah normal kembali.',
  },
  {
    id: 'pm-003',
    idAset: 'ast-001',
    namaAset: 'Proyektor Epson EB-X06',
    gambarAset: 'https://picsum.photos/seed/proyektor-epson/300/200.jpg',
    pelapor: { nama: 'Rizki Pratama', jabatan: 'Guru' },
    tanggalLapor: '2024-06-12',
    deskripsiKerusakan: 'Gambar proyektor tampak redup dan tidak fokus di beberapa area.',
    status: 'Diterima',
    tanggalSelesai: null,
    biaya: null,
    teknisi: null,
    keteranganPerbaikan: null,
  },
  {
    id: 'pm-004',
    idAset: 'ast-007',
    namaAset: 'Kursi Siswa',
    gambarAset: 'https://picsum.photos/seed/kursi-siswa/300/200.jpg',
    pelapor: { nama: 'Dewi Lestari, S.Pd.', jabatan: 'Guru' },
    tanggalLapor: '2024-06-11',
    deskripsiKerusakan: 'Salah satu kaki kursi patah dan tidak bisa digunakan.',
    status: 'Dibatalkan',
    tanggalSelesai: '2024-06-12',
    biaya: 0,
    teknisi: 'Satpam Sekolah',
    keteranganPerbaikan: 'Kursi langsung dibuang karena sudah tidak layak perbaiki dan diganti dengan yang baru dari gudang.',
  },
];

// --- KOMPONEN HALAMAN DATA PEMELIHARAAN ---
export default function PemeliharaanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Memfilter data pemeliharaan
  const filteredPemeliharaan = useMemo(() => {
    return dataPemeliharaan.filter(pemeliharaan => {
      const matchesSearch = pemeliharaan.namaAset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pemeliharaan.pelapor.nama.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !selectedStatus || pemeliharaan.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  // Fungsi helper
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  // Mapping status ke warna dan ikon
  const statusInfo = {
    'Diterima': { icon: <FaExclamationTriangle />, color: 'yellow' },
    'Sedang Diproses': { icon: <FaWrench />, color: 'blue' },
    'Selesai': { icon: <FaCheckCircle />, color: 'green' },
    'Dibatalkan': { icon: <FaBan />, color: 'gray' },
  };

  // --- Komponen Kartu Pemeliharaan ---
  const PemeliharaanCard: React.FC<{ pemeliharaan: Pemeliharaan }> = ({ pemeliharaan }) => {
    const info = statusInfo[pemeliharaan.status];
    const isSelesai = pemeliharaan.status === 'Selesai';
    const isDibatalkan = pemeliharaan.status === 'Dibatalkan';
    
    const colorClasses = {
      yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          {/* Informasi Aset dan Pelapor */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <img 
              src={pemeliharaan.gambarAset} 
              alt={pemeliharaan.namaAset} 
              className="w-20 h-16 object-cover rounded-lg shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pemeliharaan.namaAset}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center mt-1">
                <FaUser className="mr-2 text-gray-400" />
                {pemeliharaan.pelapor.jabatan} • {pemeliharaan.pelapor.nama}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                <FaCalendarAlt className="mr-2 text-gray-400" />
                Dilaporkan: {formatDate(pemeliharaan.tanggalLapor)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>Kerusakan:</strong> {pemeliharaan.deskripsiKerusakan}
              </p>
            </div>
          </div>

          {/* Informasi Status dan Aksi */}
          <div className="flex flex-col items-end gap-2 lg:mt-0 mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClasses[info.color as keyof typeof colorClasses]}`}>
              {info.icon}
              <span className="ml-1">{pemeliharaan.status}</span>
            </span>
            
            {isSelesai && pemeliharaan.biaya && (
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Biaya: {formatRupiah(pemeliharaan.biaya)}
              </p>
            )}

            {/* Tombol Aksi */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Lihat Detail">
                <FaEye />
              </button>
              {pemeliharaan.status === 'Diterima' && (
                <button className="p-2 text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors" title="Proses Perbaikan">
                  <FaWrench />
                </button>
              )}
              {pemeliharaan.status === 'Sedang Diproses' && (
                <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Tandai Selesai">
                  <FaCheckCircle />
                </button>
              )}
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
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaTools className="mr-3 text-orange-600 dark:text-orange-400" />
              Data Pemeliharaan Aset
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola semua laporan perbaikan dan perawatan aset.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Buat Laporan Baru
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
              placeholder="Cari nama aset atau pelapor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Daftar Kartu Pemeliharaan */}
        {filteredPemeliharaan.length === 0 ? (
          <div className="text-center py-10">
            <FaTools className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Tidak ada laporan pemeliharaan yang ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPemeliharaan.map((pemeliharaan) => (
              <PemeliharaanCard key={pemeliharaan.id} pemeliharaan={pemeliharaan} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}