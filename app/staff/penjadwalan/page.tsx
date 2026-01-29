// app/analisis-penjadwalan/page.tsx

'use client';

import React, { useMemo } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaChalkboardTeacher, FaUser, FaClock, FaCalendarAlt } from 'react-icons/fa';

// --- 1. TIPE DATA (DIGABUNGKAN DARI SUMBER LAIN) ---
// Dalam aplikasi nyata, ini akan diimpor dari file data terpusat atau API

interface JadwalPelajaran {
  id: string;
  hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  jamMulai: string;
  jamSelesai: string;
  namaKelas: string;
  mataPelajaran: string;
  guruPengajar: string;
  ruangan: string;
}

interface Ujian {
  id: string;
  namaUjian: string;
  mataPelajaran: string;
  kelas: string;
  tanggal: string; // Format 'YYYY-MM-DD'
  jamMulai: string;
  jamSelesai: string;
  ruangan: string;
  pengawas: string[];
  jenisUjian: 'UTS' | 'UAS' | 'UKK';
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

// Tipe untuk objek konflik yang ditemukan
interface Konflik {
  type: 'Guru';
  guru: string;
  waktu: string;
  detail1: JadwalPelajaran | (Ujian & { sumber: string });
  detail2: JadwalPelajaran | (Ujian & { sumber: string });
}

// --- 2. DATA CONTOH (DENGAN KONFLIK YANG DISENGAJA) ---
// Data Jadwal Pelajaran
const dataJadwalPelajaran: JadwalPelajaran[] = [
  { id: 'jp-001', hari: 'Senin', jamMulai: '08:00', jamSelesai: '09:30', namaKelas: 'X IPA 1', mataPelajaran: 'Fisika', guruPengajar: 'Dr. Andi Wijaya, M.Si.', ruangan: 'Lab Fisika' },
  { id: 'jp-002', hari: 'Senin', jamMulai: '10:00', jamSelesai: '11:30', namaKelas: 'VII A', mataPelajaran: 'Matematika', guruPengajar: 'Ahmad Fadli, S.Pd.', ruangan: 'Ruang 7A' },
  { id: 'jp-003', hari: 'Selasa', jamMulai: '07:00', jamSelesai: '08:30', namaKelas: 'VIII C', mataPelajaran: 'IPA Terpadu', guruPengajar: 'Dewi Lestari, S.Pd.', ruangan: 'Lab IPA' },
];

// Data Jadwal Ujian
const dataUjian: Ujian[] = [
  // KONFLIK: Dr. Andi Wijaya, M.Si. mengawas ujian saat dia mengajar
  { id: 'uj-001', namaUjian: 'Ujian Praktikum Fisika', mataPelajaran: 'Fisika', kelas: 'XI IPA 2', tanggal: '2024-12-16', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Lab Fisika', pengawas: ['Dr. Andi Wijaya, M.Si.', 'Maya Sari, M.Si.'], jenisUjian: 'UTS', status: 'Akan Datang' },
  // Tidak ada konflik
  { id: 'uj-002', namaUjian: 'Ujian Bahasa Indonesia', mataPelajaran: 'Bahasa Indonesia', kelas: 'VII B', tanggal: '2024-12-17', jamMulai: '08:00', jamSelesai: '10:00', ruangan: 'Ruang 7B', pengawas: ['Siti Nurhaliza, S.Pd.'], jenisUjian: 'UTS', status: 'Akan Datang' },
];

// --- 3. KOMPONEN HALAMAN ANALISIS PENJADWALAN ---
export default function AnalisisPenjadwalanPage() {
  
  // Fungsi untuk mendapatkan nama hari dari tanggal
  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return date.toLocaleDateString('id-ID', options);
  };

  // Logika Analisis Konflik
  const konflikDitemukan = useMemo((): Konflik[] => {
    const conflicts: Konflik[] = [];
    const scheduleMap = new Map<string, JadwalPelajaran | (Ujian & { sumber: string })>();

    // 1. Proses semua jadwal pelajaran
    dataJadwalPelajaran.forEach(jadwal => {
      const key = `${jadwal.hari}-${jadwal.jamMulai}-${jadwal.guruPengajar}`;
      if (scheduleMap.has(key)) {
        conflicts.push({
          type: 'Guru',
          guru: jadwal.guruPengajar,
          waktu: `${jadwal.hari}, ${jadwal.jamMulai} - ${jadwal.jamSelesai}`,
          detail1: scheduleMap.get(key)!,
          detail2: { ...jadwal, sumber: 'Jadwal Pelajaran' },
        });
      } else {
        scheduleMap.set(key, { ...jadwal, sumber: 'Jadwal Pelajaran' });
      }
    });

    // 2. Proses semua jadwal ujian (untuk setiap pengawas)
    dataUjian.forEach(ujian => {
      const hariUjian = getDayName(ujian.tanggal);
      ujian.pengawas.forEach(pengawas => {
        const key = `${hariUjian}-${ujian.jamMulai}-${pengawas}`;
        if (scheduleMap.has(key)) {
          conflicts.push({
            type: 'Guru',
            guru: pengawas,
            waktu: `${hariUjian}, ${ujian.jamMulai} - ${ujian.jamSelesai}`,
            detail1: scheduleMap.get(key)!,
            detail2: { ...ujian, sumber: 'Jadwal Ujian (Pengawas)' },
          });
        } else {
          // PERBAIKAN: Membuat objek baru dengan spread syntax yang benar
          scheduleMap.set(key, { ...ujian, sumber: 'Jadwal Ujian (Pengawas)' });
        }
      });
    });

    return conflicts;
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaExclamationTriangle className="mr-3 text-red-600 dark:text-red-400" />
            Analisis Penjadwalan
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Mendeteksi potensi konflik pada jadwal guru, pelajaran, dan ujian.</p>
        </div>

        {/* Hasil Analisis */}
        {konflikDitemukan.length === 0 ? (
          // Tampilan jika tidak ada konflik
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tidak Ada Konflik</h2>
            <p className="text-gray-600 dark:text-gray-400">Semua jadwal guru, pelajaran, dan ujian berjalan baik tanpa tumpang tindih.</p>
          </div>
        ) : (
          // Tampilan jika ada konflik
          <>
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 font-semibold">
                <FaExclamationTriangle className="inline mr-2" />
                Ditemukan {konflikDitemukan.length} konflik jadwal yang perlu ditinjau ulang.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {konflikDitemukan.map((konflik, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-red-500 p-6">
                  <div className="flex items-center mb-4">
                    <FaUser className="text-red-500 mr-2" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Konflik Jadwal: {konflik.guru}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center">
                    <FaClock className="mr-2" /> {konflik.waktu}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Jadwal 1:</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{konflik.detail1.mataPelajaran || (konflik.detail1 as any).namaUjian}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {(konflik.detail1 as any).sumber} - {konflik.detail1.ruangan || (konflik.detail1 as any).kelas} ({konflik.detail1.ruangan})
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Bertabrakan dengan:</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{konflik.detail2.mataPelajaran || (konflik.detail2 as any).namaUjian}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {(konflik.detail2 as any).sumber} - {konflik.detail2.ruangan || (konflik.detail2 as any).kelas} ({konflik.detail2.ruangan})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}