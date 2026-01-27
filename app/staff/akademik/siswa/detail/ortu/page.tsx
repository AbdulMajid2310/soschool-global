"use client";

import {
  FaUserTie,
  FaUser,
  FaBriefcase,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaTasks,
  FaPhoneAlt,
  FaEnvelope,
  FaSchool,
} from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";

/* ================= TYPES ================= */

interface JobDetail {
  jobDescription: string;
  mainResponsibilities: string;
  workingHours: string;
  workLocation: string;
  employmentRisk?: string;
}

interface Parent {
  imageProfile: string;
  firstName: string;
  lastName: string;
  status: "Alive" | "Deceased";
  lastEducation: string;
  occupation: string;
  monthlyIncome: number;
  numberOfDependents: number;
  phone: string;
  email: string;
  jobDetail: JobDetail;
}

interface FamilyData {
  familyPhoto: string;
  father: Parent;
  mother: Parent;
  guardian?: Parent;
}

/* ================= DATA ================= */

const familyData: FamilyData = {
  familyPhoto: "https://picsum.photos/800/400?family",
  father: {
    imageProfile: "https://i.pravatar.cc/150?img=12",
    firstName: "Ahmad",
    lastName: "Fauzi",
    status: "Alive",
    lastEducation: "Sarjana Manajemen",
    occupation: "Pengusaha",
    monthlyIncome: 7500000,
    numberOfDependents: 4,
    phone: "0812-1111-2222",
    email: "ahmad.fauzi@email.com",
    jobDetail: {
      jobDescription: "Mengelola usaha toko kelontong keluarga.",
      mainResponsibilities:
        "Mengatur stok barang, keuangan, melayani pelanggan, dan pembelian barang.",
      workingHours: "08:00 - 18:00",
      workLocation: "Toko keluarga di Sukajadi, Bandung",
      employmentRisk: "Pendapatan tergantung pada penjualan harian.",
    },
  },
  mother: {
    imageProfile: "https://i.pravatar.cc/150?img=47",
    firstName: "Siti",
    lastName: "Aisyah",
    status: "Alive",
    lastEducation: "SMA",
    occupation: "Ibu Rumah Tangga",
    monthlyIncome: 3000000,
    numberOfDependents: 4,
    phone: "0812-3333-4444",
    email: "siti.aisyah@email.com",
    jobDetail: {
      jobDescription: "Mengurus rumah tangga dan membantu usaha keluarga.",
      mainResponsibilities:
        "Mengurus anak, belanja rumah tangga, dan membantu toko keluarga jika diperlukan.",
      workingHours: "Fleksibel",
      workLocation: "Rumah & Toko keluarga",
    },
  },
  guardian: {
    imageProfile: "https://i.pravatar.cc/150?img=68",
    firstName: "Budi",
    lastName: "Santoso",
    status: "Alive",
    lastEducation: "Diploma Ekonomi",
    occupation: "Karyawan Swasta",
    monthlyIncome: 5000000,
    numberOfDependents: 2,
    phone: "0812-5555-6666",
    email: "budi.santoso@email.com",
    jobDetail: {
      jobDescription: "Bekerja di perusahaan perdagangan.",
      mainResponsibilities:
        "Mengelola administrasi dan keuangan perusahaan.",
      workingHours: "08:00 - 17:00",
      workLocation: "Perkantoran Bandung",
    },
  },
};

/* ================= UTILS ================= */

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

/* ================= PAGE ================= */

export default function ParentPage() {
  const parents = [familyData.father, familyData.mother];
  if (familyData.guardian) parents.push(familyData.guardian);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full  space-y-8">

        {/* HEADER */}
        <div className=" py-6 px-8 bg-linear-to-r from-green-400 to-teal-500 rounded-t-2xl shadow-lg">
          <h1 className="text-2xl flex gap-2 items-center font-bold text-white">
          <RiParentFill />  Profil Orang Tua & Wali Murid
          </h1>
          <p className="text-green-100 text-sm">
            Informasi lengkap pekerjaan, status, pendidikan, kontak, dan tanggung jawab
          </p>
        </div>

        {/* FAMILY PHOTO */}
        <div className="relative">
          <img
            src={familyData.familyPhoto}
            alt="Foto Keluarga"
            className="w-full h-64 object-cover rounded-2xl shadow-md"
          />
          <span className="absolute bottom-3 right-3 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full text-sm shadow">
            Foto Keluarga
          </span>
        </div>

        {/* PARENTS + GUARDIAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {parents.map((parent, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4 hover:shadow-xl transition"
            >
              {/* FOTO + NAMA */}
              <div className="flex items-center gap-4">
                <img
                  src={parent.imageProfile}
                  className="w-24 h-24 rounded-full border-2 border-indigo-400 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {parent.firstName} {parent.lastName}
                  </h2>
                  <p className="flex items-center gap-2 mt-1 text-gray-500">
                    {idx === 0
                      ? <FaUserTie className="text-indigo-500" />
                      : idx === 1
                      ? <FaUser className="text-teal-500" />
                      : <FaUserTie className="text-purple-500" />}
                    {idx === 0
                      ? "Ayah"
                      : idx === 1
                      ? "Ibu"
                      : "Wali Murid"}
                  </p>
                </div>
              </div>

              {/* STATUS & PENDIDIKAN */}
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  parent.status === "Alive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {parent.status === "Alive" ? "Hidup" : "Meninggal"}
                </span>
                <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  <FaSchool /> {parent.lastEducation}
                </span>
                <span className="flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  <FaUsers /> {parent.numberOfDependents} Tanggungan
                </span>
              </div>

              {/* PEKERJAAN & PENDAPATAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="flex items-center gap-2"><FaBriefcase className="text-indigo-500" /> {parent.occupation}</p>
                  <p className="flex items-center gap-2"><FaMoneyBillWave className="text-indigo-500" /> {formatCurrency(parent.monthlyIncome)}</p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-2"><FaPhoneAlt className="text-indigo-500" /> {parent.phone}</p>
                  <p className="flex items-center gap-2"><FaEnvelope className="text-indigo-500" /> {parent.email}</p>
                  <p className="flex items-center gap-2"><FaClock className="text-indigo-500" /> {parent.jobDetail.workingHours}</p>
                </div>
              </div>

              {/* TANGGUNG JAWAB */}
              <div className="border-t pt-3 text-sm text-gray-700 dark:text-gray-200">
                <p className="font-semibold mb-1">Tanggung Jawab & Job Detail</p>
                <p className="flex items-center gap-2"><FaTasks className="text-gray-500" /> {parent.jobDetail.mainResponsibilities}</p>
                <p className="flex items-center gap-2 mt-1"><FaMapMarkerAlt className="text-gray-500" /> {parent.jobDetail.workLocation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
