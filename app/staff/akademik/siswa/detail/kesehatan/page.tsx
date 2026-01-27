"use client";

import {
  FaHeartbeat,
  FaAllergies,
  FaSyringe,
  FaNotesMedical,
  FaUserMd,
  FaPhoneAlt,
  FaHospital,
  FaUserFriends,
  FaRulerVertical,
  FaWeight,
} from "react-icons/fa";
import { FaSuitcaseMedical } from "react-icons/fa6";

/* ================= TYPES (Bahasa Inggris) ================= */
export interface Name {
  firstName: string;
  lastName: string;
}

export interface Parent {
  imageProfile: string;
  fullName: string;
  education: string;
  occupation: string;
  employmentStatus: "Permanent" | "Contract" | "Self-Employed" | "Unemployed";
  monthlyIncome: number;
  numberOfDependents: number;
  jobDetail: {
    jobDescription: string;
    mainResponsibilities: string;
    workingHours: string;
    workLocation: string;
    employmentRisk?: string;
  };
}

export interface Family {
  familyPhoto: string;
  father: Parent;
  mother: Parent;
}

export interface StudentDocument {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  status: "Verified" | "Pending";
  uploadedAt: string;
}

export interface Immunization {
  name: string;
  status: "Completed" | "Not Completed";
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface MedicalCheckup {
  date: string;
  doctorName: string;
  notes: string;
}

export interface StudentHealth {
  bloodType: string;
  heightCm: number;
  weightKg: number;
  medicalHistory: string;
  allergies: string;
  chronicDisease: string;
  specialNeeds: string;
  immunizations: Immunization[];
  medicalCheckups: MedicalCheckup[];
  emergencyContact: EmergencyContact;
  lastCheckupDate: string;
  familyDoctor: string;
  familyMembersWithHealthIssues: string;
}

export interface StudentFullData {
  profilePhoto: string;
  name: Name;
  nisn: string;
  nik: string;
  placeOfBirth: string;
  dateOfBirth: string;
  gender: "Laki-laki" | "Perempuan";
  religion: string;
  address: string;
  phone: string;
  email: string;
  parents: Family;
  documents: StudentDocument[];
  health: StudentHealth;
}

/* ================= DATA CONTOH ================= */

export const studentData: StudentFullData = {
  profilePhoto: "https://i.pravatar.cc/150?img=32",
  name: { firstName: "Muhammad Rizki", lastName: "Fahrezi" },
  nisn: "0087654321",
  nik: "3201012345678901",
  placeOfBirth: "Bandung",
  dateOfBirth: "15 Januari 2006",
  gender: "Laki-laki",
  religion: "Islam",
  address: "Jl. Merdeka No. 123, Kelurahan Sukajadi, Kecamatan Coblong, Bandung, Jawa Barat",
  phone: "0812-3456-7890",
  email: "rizki.fahrezi.siswa@email.com",

  parents: {
    familyPhoto: "https://picsum.photos/600/400?family",
    father: {
      imageProfile: "https://i.pravatar.cc/150?img=12",
      fullName: "Ahmad Fauzi",
      education: "S1 Manajemen",
      occupation: "Pengusaha",
      employmentStatus: "Self-Employed",
      monthlyIncome: 7500000,
      numberOfDependents: 4,
      jobDetail: {
        jobDescription: "Mengelola usaha toko kelontong keluarga.",
        mainResponsibilities: "Manajemen stok, keuangan, melayani pelanggan, pembelian barang.",
        workingHours: "08:00 - 18:00",
        workLocation: "Toko di Sukajadi, Bandung",
        employmentRisk: "Pendapatan bergantung pada penjualan harian.",
      },
    },
    mother: {
      imageProfile: "https://i.pravatar.cc/150?img=47",
      fullName: "Siti Aisyah",
      education: "SMA",
      occupation: "Ibu Rumah Tangga",
      employmentStatus: "Unemployed",
      monthlyIncome: 3000000,
      numberOfDependents: 4,
      jobDetail: {
        jobDescription: "Mengurus rumah tangga dan membantu usaha keluarga.",
        mainResponsibilities: "Mengurus anak, belanja rumah tangga, membantu toko keluarga.",
        workingHours: "Fleksibel",
        workLocation: "Rumah & Toko keluarga",
      },
    },
  },

  documents: [
    {
      id: 1,
      title: "Akte Kelahiran",
      description: "Dokumen resmi akte kelahiran dari Disdukcapil.",
      imageUrl: "https://picsum.photos/400/300?doc1",
      status: "Verified",
      uploadedAt: "12 Januari 2024",
    },
    {
      id: 2,
      title: "Kartu Keluarga (KK)",
      description: "Dokumen identitas keluarga yang lengkap.",
      imageUrl: "https://picsum.photos/400/300?doc2",
      status: "Verified",
      uploadedAt: "15 Januari 2024",
    },
    {
      id: 3,
      title: "Kartu Pelajar",
      description: "Kartu identitas siswa resmi.",
      imageUrl: "https://picsum.photos/400/300?doc3",
      status: "Pending",
      uploadedAt: "20 Januari 2024",
    },
    {
      id: 4,
      title: "Rekam Medis",
      description: "Catatan kesehatan dan imunisasi siswa.",
      imageUrl: "https://picsum.photos/400/300?doc4",
      status: "Pending",
      uploadedAt: "22 Januari 2024",
    },
  ],

  health: {
    bloodType: "O",
    heightCm: 168,
    weightKg: 58,
    medicalHistory: "Riwayat asma ringan pada masa kecil, tidak ada kekambuhan terbaru.",
    allergies: "Seafood, debu",
    chronicDisease: "Tidak ada",
    specialNeeds: "Tidak ada",
    immunizations: [
      { name: "BCG", status: "Completed" },
      { name: "Polio", status: "Completed" },
      { name: "DPT", status: "Completed" },
      { name: "Hepatitis B", status: "Completed" },
      { name: "COVID-19", status: "Completed" },
      { name: "Campak", status: "Completed" },
    ],
    medicalCheckups: [
      { date: "10 Februari 2024", doctorName: "Dr. Siti Rahmawati", notes: "Semua pemeriksaan normal." },
      { date: "12 Januari 2023", doctorName: "Dr. Budi Santoso", notes: "Diberikan vitamin rutin, kondisi sehat." },
    ],
    emergencyContact: { name: "Ahmad Fauzi", relation: "Ayah", phone: "0812-1111-2222" },
    lastCheckupDate: "10 Februari 2024",
    familyDoctor: "Dr. Siti Rahmawati, Klinik Sukajadi",
    familyMembersWithHealthIssues: "Ibu memiliki hipertensi ringan",
  },
};

/* ================= PAGE ================= */

export default function StudentHealthPage() {
  const health = studentData.health;

  return (
    <div className="min-h-screen   flex justify-center">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 bg-linear-to-r from-red-500 to-pink-500">
          <h1 className="text-2xl flex gap-2 items-center font-semibold text-white">
          <FaSuitcaseMedical />  Informasi Kesehatan Siswa
          </h1>
          <p className="text-red-100 text-sm">
            Rekapitulasi riwayat kesehatan dan imunisasi siswa
          </p>
        </div>

        {/* BASIC HEALTH */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

  {/* Golongan Darah */}
  <div className="bg-gray-50 dark:bg-gray-700 flex justify-center gap-4 rounded-xl p-5 items-center">
    <FaHeartbeat className="text-red-500 text-6xl" />
    <div className="text-center">
      <p className="text-sm text-gray-500">Golongan Darah</p>
      <p className="text-2xl font-bold">{health.bloodType}</p>
    </div>
  </div>

  {/* Tinggi Badan */}
  <div className="bg-gray-50 dark:bg-gray-700 flex justify-center gap-4 rounded-xl p-5 items-center">
    <FaRulerVertical className="text-blue-500 text-6xl" />
    <div className="text-center">
      <p className="text-sm text-gray-500">Tinggi Badan</p>
      <p className="text-2xl font-bold">{health.heightCm} cm</p>
    </div>
  </div>

  {/* Berat Badan */}
  <div className="bg-gray-50 dark:bg-gray-700 flex justify-center gap-4 rounded-xl p-5 items-center">
    <FaWeight className="text-green-500 text-6xl" />
    <div className="text-center">
      <p className="text-sm text-gray-500">Berat Badan</p>
      <p className="text-2xl font-bold">{health.weightKg} kg</p>
    </div>
  </div>

</div>

        {/* MEDICAL DETAILS */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Riwayat Medis & Alergi */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4 text-sm">
            <p className="font-semibold flex items-center gap-2">
              <FaNotesMedical className="text-red-500" />
              Riwayat Medis
            </p>
            <p>{health.medicalHistory}</p>

            <p className="font-semibold flex items-center gap-2 pt-2">
              <FaAllergies className="text-yellow-500" />
              Alergi
            </p>
            <p>{health.allergies}</p>

            <p className="font-semibold flex items-center gap-2 pt-2">
              <FaUserMd className="text-blue-500" />
              Penyakit Kronis
            </p>
            <p>{health.chronicDisease}</p>

            <p className="font-semibold flex items-center gap-2 pt-2">
              <FaUserFriends className="text-purple-500" />
              Kebutuhan Khusus
            </p>
            <p>{health.specialNeeds}</p>
          </div>

          {/* Imunisasi */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4 text-sm">
            <p className="font-semibold flex items-center gap-2">
              <FaSyringe className="text-green-500" />
              Riwayat Imunisasi
            </p>
            <div className="space-y-2">
              {health.immunizations.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-4 py-2"
                >
                  <span>{item.name}</span>
                  <span
                    className={`text-xs font-medium ${
                      item.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status === "Completed" ? "Selesai" : "Belum"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* PEMERIKSAAN MEDIS */}
        <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4">
          <p className="font-semibold text-sm flex items-center gap-2">
            <FaHospital className="text-indigo-600" />
            Pemeriksaan Medis Terakhir
          </p>
          {health.medicalCheckups.map((check, index) => (
            <div key={index} className="text-sm bg-white dark:bg-gray-800 rounded-lg p-3">
              <p><strong>Tanggal:</strong> {check.date}</p>
              <p><strong>Dokter:</strong> {check.doctorName}</p>
              <p><strong>Catatan:</strong> {check.notes}</p>
            </div>
          ))}
          <p className="text-xs text-gray-500">
            Pemeriksaan terakhir: {health.lastCheckupDate}
          </p>
          <p className="text-xs text-gray-500">
            Dokter keluarga: {health.familyDoctor}
          </p>
          <p className="text-xs text-gray-500">
            Anggota keluarga dengan masalah kesehatan: {health.familyMembersWithHealthIssues}
          </p>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-xl space-y-3 text-sm">
          <p className="font-semibold text-red-600 flex items-center gap-2">
            <FaPhoneAlt /> Kontak Darurat
          </p>
          <p><strong>Nama:</strong> {health.emergencyContact.name}</p>
          <p><strong>Hubungan:</strong> {health.emergencyContact.relation}</p>
          <p><strong>Telepon:</strong> {health.emergencyContact.phone}</p>
        </div>

      </div>
    </div>
  );
}
