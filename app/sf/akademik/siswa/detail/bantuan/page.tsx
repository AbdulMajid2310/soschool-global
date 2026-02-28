"use client";

import { FaGift, FaHandHoldingHeart } from "react-icons/fa";

/* ================= TYPES ================= */
interface HelpReceived {
  type: string;
  provider: string;
  description: string;
  amount: number;
  dateReceived: string;
  status: "Selesai" | "Belum";
  category: string;
}

interface StudentFullData {
  helpReceived: HelpReceived[];
}

/* ================= DATA SISWA ================= */
const studentData: StudentFullData = {
  helpReceived: [
    {
      type: "Beasiswa Prestasi",
      provider: "Dinas Pendidikan Kota Bandung",
      description: "Bantuan biaya sekolah untuk siswa berprestasi.",
      amount: 1000000,
      dateReceived: "1 Januari 2024",
      status: "Selesai",
      category: "Keuangan",
    },
    {
      type: "Bantuan Sembako",
      provider: "Baznas Kota Bandung",
      description: "Bantuan paket sembako untuk keluarga siswa.",
      amount: 0,
      dateReceived: "15 Februari 2024",
      status: "Selesai",
      category: "Kebutuhan Dasar",
    },
    {
      type: "Bantuan Peralatan Sekolah",
      provider: "Yayasan Pendidikan Nusantara",
      description: "Bantuan buku, tas, dan alat tulis.",
      amount: 0,
      dateReceived: "20 Maret 2024",
      status: "Belum",
      category: "Pendidikan",
    },
    {
      type: "Bantuan Kesehatan",
      provider: "RSUD Kota Bandung",
      description: "Pemeriksaan gratis dan vitamin tambahan.",
      amount: 0,
      dateReceived: "5 April 2024",
      status: "Selesai",
      category: "Kesehatan",
    },
    {
      type: "KIP (Kartu Indonesia Pintar)",
      provider: "Kemendikbud",
      description: "Bantuan biaya pendidikan untuk siswa kurang mampu.",
      amount: 1500000,
      dateReceived: "10 Januari 2024",
      status: "Selesai",
      category: "Keuangan",
    },
    {
      type: "Karawang Cerdas",
      provider: "Pemerintah Kabupaten Karawang",
      description: "Program dukungan pendidikan tambahan bagi siswa berprestasi.",
      amount: 0,
      dateReceived: "5 Februari 2024",
      status: "Belum",
      category: "Pendidikan",
    },
  ],
};

/* ================= PAGE ================= */
export default function StudentHelpPage() {
  return (
    <div className="min-h-screen  flex justify-center">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 bg-linear-to-r from-yellow-500 to-yellow-600">
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaGift /> Bantuan yang Diterima Siswa
          </h1>
          <p className="text-yellow-100 text-sm">
            Daftar lengkap semua bantuan, beasiswa, dan fasilitas yang diterima siswa.
          </p>
        </div>

        {/* GRID BANTUAN */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentData.helpReceived.map((help, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Header Card */}
              <div className="flex items-center gap-2 mb-2">
                <FaHandHoldingHeart className="text-yellow-500 text-xl" />
                <p className="font-semibold text-lg">{help.type}</p>
              </div>

              {/* Provider & Kategori */}
              <p className="text-sm text-gray-500 mt-1">Pemberi Bantuan</p>
              <p className="text-md">{help.provider}</p>

              <p className="text-sm text-gray-500 mt-1">Kategori</p>
              <p className="text-md">{help.category}</p>

              {/* Deskripsi */}
              <p className="text-sm text-gray-500 mt-2">Deskripsi</p>
              <p className="text-sm">{help.description}</p>

              {/* Jumlah jika ada */}
              {help.amount > 0 && (
                <>
                  <p className="text-sm text-gray-500 mt-2">Jumlah</p>
                  <p className="text-md font-semibold">Rp {help.amount.toLocaleString()}</p>
                </>
              )}

              {/* Status dan tanggal */}
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    help.status === "Selesai"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {help.status}
                </span>
                <span className="text-xs text-gray-400">{help.dateReceived}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
