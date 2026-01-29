// app/laporan-kehadiran/page.tsx

'use client';

import React from 'react';
import { 
  FaUsers, FaCheckCircle, FaClock, FaExclamationTriangle,
  FaUserTimes, FaCalendarCheck, FaChalkboardTeacher, FaUserTie
} from 'react-icons/fa';


// data/kehadiran.ts

// --- 1. TIPE DATA UNTUK SISWA ---
export interface LaporanKehadiranSiswaSummary {
  totalSiswa: number;
  tingkatKehadiranUmum: number;
  siswaTepatWaktu: number;
  siswaTerlambat: number;
}

export interface RekapKehadiranKelas {
  namaKelas: string;
  jumlahSiswa: number;
  hadir: number;
  terlambat: number;
  izin: number;
  sakit: number;
  tanpaKeterangan: number;
  persentaseKehadiran: number;
}

export interface SiswaTidakHadir {
  nis: string;
  nama: string;
  kelas: string;
  totalTidakHadir: number;
}

// --- 2. TIPE DATA UNTUK GURU & STAFF ---
export interface LaporanKehadiranStaffSummary {
  totalStaff: number;
  tingkatKehadiranUmum: number;
  staffHadir: number;
  staffIzinSakit: number;
}

export interface RekapKehadiranStaff {
  nip: string;
  nama: string;
  jabatan: string;
  unitKerja: string; // Contoh: 'Guru', 'TU', 'Satpam'
  hadir: number;
  terlambat: number;
  izin: number;
  sakit: number;
  tanpaKeterangan: number;
  persentaseKehadiran: number;
}

export interface StaffTidakHadir {
  nip: string;
  nama: string;
  jabatan: string;
  totalTidakHadir: number;
}

// --- 3. DATA STATIS KEHADIRAN SISWA ---
export const laporanKehadiranSiswaSummary: LaporanKehadiranSiswaSummary = {
  totalSiswa: 320,
  tingkatKehadiranUmum: 95.5,
  siswaTepatWaktu: 250,
  siswaTerlambat: 55,
};

export const rekapKehadiranKelas: RekapKehadiranKelas[] = [
  { namaKelas: 'XII IPA 1', jumlahSiswa: 30, hadir: 28, terlambat: 2, izin: 0, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 100.0 },
  { namaKelas: 'XI IPA 3', jumlahSiswa: 29, hadir: 27, terlambat: 1, izin: 1, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 96.5 },
  { namaKelas: 'X IPA 1', jumlahSiswa: 32, hadir: 30, terlambat: 2, izin: 0, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 100.0 },
  { namaKelas: 'VII A', jumlahSiswa: 36, hadir: 33, terlambat: 2, izin: 1, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 94.4 },
  { namaKelas: 'VIII C', jumlahSiswa: 34, hadir: 31, terlambat: 2, izin: 0, sakit: 1, tanpaKeterangan: 0, persentaseKehadiran: 94.1 },
  { namaKelas: 'XII IPS 2', jumlahSiswa: 31, hadir: 28, terlambat: 2, izin: 0, sakit: 1, tanpaKeterangan: 0, persentaseKehadiran: 93.5 },
  { namaKelas: 'VII B', jumlahSiswa: 35, hadir: 30, terlambat: 3, izin: 1, sakit: 0, tanpaKeterangan: 1, persentaseKehadiran: 88.5 },
];

export const siswaTidakHadir: SiswaTidakHadir[] = [
  { nis: '2024025', nama: 'Doni Hermawan', kelas: 'VII B', totalTidakHadir: 5 },
  { nis: '2024019', nama: 'Bambang Sutrisno', kelas: 'VIII C', totalTidakHadir: 4 },
  { nis: '2024027', nama: 'Kevin Sanjaya', kelas: 'VII A', totalTidakHadir: 3 },
  { nis: '2024013', nama: 'Hendra Gunawan', kelas: 'VIII C', totalTidakHadir: 3 },
  { nis: '2024024', nama: 'Hana Putri', kelas: 'VII B', totalTidakHadir: 3 },
];

// --- 4. DATA STATIS KEHADIRAN GURU & STAFF ---
export const laporanKehadiranStaffSummary: LaporanKehadiranStaffSummary = {
  totalStaff: 45,
  tingkatKehadiranUmum: 97.8,
  staffHadir: 44,
  staffIzinSakit: 1,
};

export const rekapKehadiranStaff: RekapKehadiranStaff[] = [
  { nip: '198703152005011001', nama: 'Dr. Andi Wijaya, M.Si.', jabatan: 'Guru IPA', unitKerja: 'Guru', hadir: 22, terlambat: 0, izin: 0, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 100.0 },
  { nip: '199005122015031002', nama: 'Siti Nurhaliza, S.Pd.', jabatan: 'Guru Bahasa Indonesia', unitKerja: 'Guru', hadir: 21, terlambat: 1, izin: 0, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 100.0 },
  { nip: '198505102010021003', nama: 'Budi Santoso, S.Kom.', jabatan: 'Staff IT', unitKerja: 'TU', hadir: 22, terlambat: 0, izin: 0, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 100.0 },
  { nip: '199212312018022004', nama: 'Rizki Pratama, S.Pd.', jabatan: 'Wali Kelas', unitKerja: 'Guru', hadir: 20, terlambat: 1, izin: 1, sakit: 0, tanpaKeterangan: 0, persentaseKehadiran: 95.5 },
  { nip: '198809082009011005', nama: 'Ahmad Fadli, S.Pd.', jabatan: 'Kepala Perpustakaan', unitKerja: 'Staff', hadir: 21, terlambat: 0, izin: 0, sakit: 1, tanpaKeterangan: 0, persentaseKehadiran: 95.5 },
  { nip: '199501152017011006', nama: 'Dewi Lestari, S.Pd.', jabatan: 'Guru Seni Budaya', unitKerja: 'Guru', hadir: 18, terlambat: 2, izin: 0, sakit: 0, tanpaKeterangan: 2, persentaseKehadiran: 90.0 },
];

export const staffTidakHadir: StaffTidakHadir[] = [
  { nip: '199501152017011006', nama: 'Dewi Lestari, S.Pd.', jabatan: 'Guru Seni Budaya', totalTidakHadir: 4 },
  { nip: '199212312018022004', nama: 'Rizki Pratama, S.Pd.', jabatan: 'Wali Kelas', totalTidakHadir: 2 },
];

// --- KOMPONEN HALAMAN LAPORAN KEHADIRAN ---
export default function LaporanKehadiranPage() {
  // --- 1. KOMPONEN KARTU INDIKATOR KINERJA (KPI) ---
  const KPICard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    description: string;
  }> = ({ title, value, icon, color, description }) => (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );

  // --- 2. FUNGSI UNTUK MENENTUKAN WARNA PERSEN KEHADIRAN ---
  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600 dark:text-green-400';
    if (percentage >= 90) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
            <FaCalendarCheck className="mr-3 text-indigo-600 dark:text-indigo-400" />
            Laporan Kehadiran
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Ringkasan dan analisis kehadiran siswa, guru, dan staff bulan ini.</p>
        </div>

        {/* --- BAGIAN KEHADIRAN SISWA --- */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <FaUsers className="mr-2 text-blue-600 dark:text-blue-400" />
            Kehadiran Siswa
          </h2>

          {/* Grid Kartu KPI Siswa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard title="Total Siswa" value={laporanKehadiranSiswaSummary.totalSiswa} icon={<FaUsers />} color="bg-gradient-to-br from-blue-500 to-blue-600" description="Seluruh siswa aktif" />
            <KPICard title="Tingkat Kehadiran" value={`${laporanKehadiranSiswaSummary.tingkatKehadiranUmum}%`} icon={<FaCheckCircle />} color="bg-gradient-to-br from-green-500 to-green-600" description="Persentase kehadiran bulan ini" />
            <KPICard title="Tepat Waktu" value={laporanKehadiranSiswaSummary.siswaTepatWaktu} icon={<FaCalendarCheck />} color="bg-gradient-to-br from-indigo-500 to-indigo-600" description="Siswa yang hadir tepat waktu" />
            <KPICard title="Terlambat" value={laporanKehadiranSiswaSummary.siswaTerlambat} icon={<FaClock />} color="bg-gradient-to-br from-orange-500 to-orange-600" description="Siswa yang terlambat hadir" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabel Rekap Kehadiran Per Kelas */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rekap Kehadiran per Kelas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">Kelas</th>
                      <th scope="col" className="px-4 py-3 text-center">Hadir</th>
                      <th scope="col" className="px-4 py-3 text-center">Terlambat</th>
                      <th scope="col" className="px-4 py-3 text-center">Izin/Sakit</th>
                      <th scope="col" className="px-4 py-3 text-center">Tanpa Keterangan</th>
                      <th scope="col" className="px-4 py-3 text-center">Persentase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rekapKehadiranKelas.sort((a, b) => a.persentaseKehadiran - b.persentaseKehadiran).map((kelas) => (
                      <tr key={kelas.namaKelas} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{kelas.namaKelas}</td>
                        <td className="px-4 py-3 text-center">{kelas.hadir}</td>
                        <td className="px-4 py-3 text-center">{kelas.terlambat}</td>
                        <td className="px-4 py-3 text-center">{kelas.izin + kelas.sakit}</td>
                        <td className="px-4 py-3 text-center font-semibold text-red-600 dark:text-red-400">{kelas.tanpaKeterangan}</td>
                        <td className="px-4 py-3 text-center font-bold">
                          <span className={getAttendanceColor(kelas.persentaseKehadiran)}>
                            {kelas.persentaseKehadiran.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daftar Siswa Tidak Hadir */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaUserTimes className="mr-2 text-red-500" />
                Siswa Terbanyak Tidak Hadir
              </h3>
              <ul className="space-y-3">
                {siswaTidakHadir.map((siswa) => (
                  <li key={siswa.nis} className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="mr-2 text-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{siswa.nama}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{siswa.kelas}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-600 dark:text-red-400">{siswa.totalTidakHadir} hari</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- BAGIAN KEHADIRAN GURU & STAFF --- */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <FaChalkboardTeacher className="mr-2 text-green-600 dark:text-green-400" />
            Kehadiran Guru & Staff
          </h2>

          {/* Grid Kartu KPI Staff */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard title="Total Guru & Staff" value={laporanKehadiranStaffSummary.totalStaff} icon={<FaUserTie />} color="bg-gradient-to-br from-teal-500 to-teal-600" description="Seluruh tenaga pendidik & kependidikan" />
            <KPICard title="Tingkat Kehadiran" value={`${laporanKehadiranStaffSummary.tingkatKehadiranUmum}%`} icon={<FaCheckCircle />} color="bg-gradient-to-br from-green-500 to-green-600" description="Persentase kehadiran bulan ini" />
            <KPICard title="Hadir" value={laporanKehadiranStaffSummary.staffHadir} icon={<FaCalendarCheck />} color="bg-gradient-to-br from-blue-500 to-blue-600" description="Jumlah yang hadir hari ini" />
            <KPICard title="Izin/Sakit" value={laporanKehadiranStaffSummary.staffIzinSakit} icon={<FaClock />} color="bg-gradient-to-br from-yellow-500 to-yellow-600" description="Jumlah yang izin atau sakit" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabel Rekap Kehadiran Staff */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Rekap Kehadiran Guru & Staff</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3">Nama</th>
                      <th scope="col" className="px-4 py-3">Jabatan</th>
                      <th scope="col" className="px-4 py-3 text-center">Hadir</th>
                      <th scope="col" className="px-4 py-3 text-center">Terlambat</th>
                      <th scope="col" className="px-4 py-3 text-center">Izin/Sakit</th>
                      <th scope="col" className="px-4 py-3 text-center">Persentase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rekapKehadiranStaff.sort((a, b) => a.persentaseKehadiran - b.persentaseKehadiran).map((staff) => (
                      <tr key={staff.nip} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{staff.nama}</td>
                        <td className="px-4 py-3 text-sm">{staff.jabatan}</td>
                        <td className="px-4 py-3 text-center">{staff.hadir}</td>
                        <td className="px-4 py-3 text-center">{staff.terlambat}</td>
                        <td className="px-4 py-3 text-center">{staff.izin + staff.sakit}</td>
                        <td className="px-4 py-3 text-center font-bold">
                          <span className={getAttendanceColor(staff.persentaseKehadiran)}>
                            {staff.persentaseKehadiran.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daftar Staff Tidak Hadir */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaUserTimes className="mr-2 text-red-500" />
                Staff Terbanyak Tidak Hadir
              </h3>
              <ul className="space-y-3">
                {staffTidakHadir.map((staff) => (
                  <li key={staff.nip} className="flex items-center justify-between text-sm p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="mr-2 text-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{staff.nama}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{staff.jabatan}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-600 dark:text-red-400">{staff.totalTidakHadir} hari</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}