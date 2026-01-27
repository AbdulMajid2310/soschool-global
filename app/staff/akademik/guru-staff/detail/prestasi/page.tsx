"use client";

import { FaTrophy, FaCalendarAlt, FaSchool } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

/* ================= TYPES ================= */
interface Achievement {
  title: string;
  year: number;
  level: "Sekolah" | "Kota" | "Provinsi" | "Nasional";
  description?: string;
  imageUrl?: string;       // Foto prestasi
  certificateUrl?: string; // Link sertifikat
}

interface TeacherAchievementsData {
  achievements: Achievement[];
}

/* ================= DATA CONTOH ================= */
const teacherAchievements: TeacherAchievementsData = {
  achievements: [
    {
      title: "Juara 1 Olimpiade Fisika Guru",
      year: 2022,
      level: "Provinsi",
      description: "Prestasi tingkat provinsi Jawa Barat dalam Olimpiade Fisika Guru.",
      imageUrl: "https://picsum.photos/400/250?img=101",
      certificateUrl: "https://picsum.photos/200/250?cert=101",
    },
    {
      title: "Juara 2 Lomba Inovasi Pembelajaran",
      year: 2021,
      level: "Nasional",
      description: "Inovasi media pembelajaran berbasis digital.",
      imageUrl: "https://picsum.photos/400/250?img=102",
      certificateUrl: "https://picsum.photos/200/250?cert=102",
    },
    {
      title: "Pembina OSN Siswa",
      year: 2023,
      level: "Sekolah",
      description: "Membimbing siswa mengikuti Olimpiade Sains Nasional.",
      imageUrl: "https://picsum.photos/400/250?img=103",
    },
  ],
};

/* ================= PAGE ================= */
export default function TeacherAchievementsPage() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full  space-y-8">

        {/* HEADER */}
        <div className="py-6 px-8 ">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaTrophy /> Prestasi
          </h1>
          <p className="text-yellow-100 text-sm">
            Daftar prestasi akademik dan non-akademik.
          </p>
        </div>

        {/* ACHIEVEMENTS LIST */}
        <div className="space-y-6">
          {teacherAchievements.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition"
            >
              {/* FOTO PRESTASI */}
              {ach.imageUrl && (
                <div className="shrink-0">
                  <img
                    src={ach.imageUrl}
                    alt={ach.title}
                    className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm"
                  />
                </div>
              )}

              {/* JUDUL, DESKRIPSI, TAHUN & LEVEL */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" /> {ach.title}
                  </p>
                  {ach.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{ach.description}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-3 items-center">
                  <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <FaCalendarAlt /> {ach.year}
                  </span>
                  <span className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                    ach.level === "Sekolah"
                      ? "bg-blue-100 text-blue-800"
                      : ach.level === "Kota"
                      ? "bg-green-100 text-green-800"
                      : ach.level === "Provinsi"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {ach.level === "Sekolah" && <FaSchool />} {ach.level}
                  </span>

                  {/* SERTIFIKAT */}
                  {ach.certificateUrl && (
                    <a
                      href={ach.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                    >
                      <PiCertificateFill /> Sertifikat
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
