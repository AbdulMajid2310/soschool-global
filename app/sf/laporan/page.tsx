// app/laporan-terpadu/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
  FaGraduationCap,
  FaTrophy,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";

// --- 2. DATA TREN (UNTUK GRAFIK GARIS) ---
// Data ini adalah contoh untuk 6 bulan terakhir
export const kehadiranTrend = [
  { bulan: "Januari", persentase: 94.2 },
  { bulan: "Februari", persentase: 95.1 },
  { bulan: "Maret", persentase: 96.3 },
  { bulan: "April", persentase: 95.8 },
  { bulan: "Mei", persentase: 94.5 },
  { bulan: "Juni", persentase: 95.5 },
];

export const pemasukanTrend = [
  { bulan: "Januari", jumlah: 420000000 },
  { bulan: "Februari", jumlah: 435000000 },
  { bulan: "Maret", jumlah: 445000000 },
  { bulan: "April", jumlah: 460000000 },
  { bulan: "Mei", jumlah: 450000000 },
  { bulan: "Juni", jumlah: 450000000 },
];

// --- 3. EKSPOR DATA YANG SUDAH DIOLAH ---
export const dataLaporanTerpadu = {
  akademik: {
    summary: laporanAkademikSummary,
    peringkatKelas: peringkatKelas.slice(0, 5), // Ambil 5 teratas untuk grafik
  },
  keuangan: {
    summary: ringkasanKeuangan,
    pengeluaranPerKategori: pengeluaranPerKategori,
    pemasukanTrend: pemasukanTrend,
  },
  kehadiran: {
    summary: laporanKehadiranSiswaSummary,
    kelasTerendah: rekapKehadiranKelas.sort(
      (a, b) => a.persentaseKehadiran - b.persentaseKehadiran,
    )[0],
    trend: kehadiranTrend,
  },
};

// --- IMPORT KOMPONEN DARI RECHARTS ---
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { laporanAkademikSummary, peringkatKelas } from "./akademik/page";
import { pengeluaranPerKategori, ringkasanKeuangan } from "./keuangan/page";
import {
  laporanKehadiranSiswaSummary,
  rekapKehadiranKelas,
} from "./kehadiran/page";

// --- KOMPONEN HALAMAN DASHBOARD LAPORAN TERPADU ---
export default function LaporanTerpaduPage() {
  const { akademik, keuangan, kehadiran } = dataLaporanTerpadu;

  // --- 1. FUNGSI HELPER ---
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Warna untuk grafik pie
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // --- 2. KOMPONEN KARTU INDIKATOR UTAMA (KPI) ---
  const MainKPICard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    linkHref: string;
  }> = ({ title, value, icon, color, linkHref }) => (
    <Link
      href={linkHref}
      className={`${color} rounded-xl shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl block`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </Link>
  );

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center">
            <FaChartLine className="mr-3 text-purple-600 dark:text-purple-400" />
            Dashboard Laporan Terpadu
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Analisis komprehensif kinerja akademik, keuangan, dan kehadiran
            sekolah.
          </p>
        </div>

        {/* --- 3. KARTU KPI UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MainKPICard
            title="Nilai Rata-Rata Umum"
            value={`${akademik.summary.nilaiRataRataUmum.toFixed(1)}`}
            icon={<FaGraduationCap />}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            linkHref="/laporan-akademik"
          />
          <MainKPICard
            title="Sisa Anggaran"
            value={formatRupiah(keuangan.summary.sisaAnggaran)}
            icon={<FaMoneyBillWave />}
            color="bg-gradient-to-br from-green-500 to-green-600"
            linkHref="/laporan-keuangan"
          />
          <MainKPICard
            title="Tingkat Kehadiran"
            value={`${kehadiran.summary.tingkatKehadiranUmum}%`}
            icon={<FaUsers />}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            linkHref="/laporan-kehadiran"
          />
        </div>

        {/* --- 4. AREA GRAFIK DAN ANALISIS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Grafik Batang: Performa Akademik */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaTrophy className="mr-2 text-yellow-500" />5 Kelas dengan Nilai
              Tertinggi
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={akademik.peringkatKelas}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="namaKelas" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilaiRataRata" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Grafik Pie: Rincian Pengeluaran */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Rincian Pengeluaran Bulan Ini
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={keuangan.pengeluaranPerKategori}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="jumlah"
                  label={({ name, percent }) => {
                    const pct = percent ?? 0; // kalau undefined, pakai 0
                    return `${name} ${(pct * 100).toFixed(0)}%`;
                  }}
                >
                  {keuangan.pengeluaranPerKategori.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) =>
                    value !== undefined ? formatRupiah(Number(value)) : "-"
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* Grafik Garis: Tren Kehadiran & Pemasukan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Grafis Garis: Tren Kehadiran */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Tren Kehadiran Siswa (6 Bulan Terakhir)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={kehadiran.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="persentase"
                  stroke="#F97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Grafis Garis: Tren Pemasukan */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Tren Pemasukan (6 Bulan Terakhir)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={keuangan.pemasukanTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis tickFormatter={(value) => `${value / 1000000}jt`} />
                <Tooltip
                  formatter={(value, ...rest) => {
                    const num = typeof value === "number" ? value : 0;
                    return formatRupiah(num);
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="jumlah"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </div>

        {/* --- 5. AREA ANALISIS & PERINGATAN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kartu Analisis: Kelas dengan Kehadiran Terendah */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-500" />
              Perlu Perhatian: Kehadiran Terendah
            </h3>
            {kehadiran.kelasTerendah ? (
              <div>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {kehadiran.kelasTerendah.namaKelas}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tingkat kehadiran hanya{" "}
                  <span className="font-semibold">
                    {kehadiran.kelasTerendah.persentaseKehadiran.toFixed(1)}%
                  </span>{" "}
                  bulan ini.
                </p>
                <Link
                  href="/laporan-kehadiran"
                  className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-400 hover:underline mt-3"
                >
                  Lihat Detail Laporan
                  <FaArrowRight className="ml-1" />
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Data tidak tersedia.
              </p>
            )}
          </section>

          {/* Kartu Analisis: Kategori Pengeluaran Tertinggi */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <FaExclamationTriangle className="mr-2 text-orange-500" />
              Analisis: Pengeluaran Terbesar
            </h3>
            {keuangan.pengeluaranPerKategori[0] && (
              <div>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {keuangan.pengeluaranPerKategori[0].kategori}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Menyerap{" "}
                  <span className="font-semibold">
                    {formatRupiah(keuangan.pengeluaranPerKategori[0].jumlah)}
                  </span>{" "}
                  atau{" "}
                  <span className="font-semibold">
                    {(
                      (keuangan.pengeluaranPerKategori[0].jumlah /
                        keuangan.summary.totalPengeluaran) *
                      100
                    ).toFixed(1)}
                    %
                  </span>{" "}
                  dari total pengeluaran.
                </p>
                <Link
                  href="/laporan-keuangan"
                  className="inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline mt-3"
                >
                  Lihat Detail Laporan
                  <FaArrowRight className="ml-1" />
                </Link>
              </div>
            )}{" "}
            : (
            <p className="text-gray-500 dark:text-gray-400">
              Data tidak tersedia.
            </p>
            )
          </section>
        </div>
      </div>
    </main>
  );
}
