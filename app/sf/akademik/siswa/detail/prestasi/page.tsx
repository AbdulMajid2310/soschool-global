"use client";

import { FaTrophy, FaCalendarAlt, FaGlobe, FaSchool } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

/* ================= TYPES ================= */

interface Achievement {
  title: string;
  year: number;
  level: "Sekolah" | "Kota" | "Provinsi" | "Nasional";
  description?: string;
  imageUrl?: string;        // Foto prestasi
  certificateUrl?: string;   // Link sertifikat
}

interface StudentAchievementsData {
  achievements: Achievement[];
}

/* ================= DATA ================= */

const studentAchievements: StudentAchievementsData = {
  achievements: [
    {
      title: "Juara 1 Lomba Mewarnai",
      year: 2014,
      level: "Sekolah",
      description: "Lomba mewarnai tingkat TK Bintang Kecil",
      imageUrl: "https://picsum.photos/400/250?img=101",
      certificateUrl: "https://picsum.photos/200/250?cert=101",
    },
    {
      title: "Juara Kelas 6",
      year: 2018,
      level: "Sekolah",
      description: "Prestasi akademik terbaik di kelas",
      imageUrl: "https://picsum.photos/400/250?img=102",
    },
    {
      title: "Juara 2 Olimpiade Matematika",
      year: 2020,
      level: "Kota",
      description: "Olimpiade Matematika tingkat Kota Bandung",
      imageUrl: "https://picsum.photos/400/250?img=103",
      certificateUrl: "https://picsum.photos/200/250?cert=103",
    },
    {
      title: "Juara 1 Lomba Debat",
      year: 2022,
      level: "Provinsi",
      description: "Lomba debat antar SMA se-Jawa Barat",
      imageUrl: "https://picsum.photos/400/250?img=104",
      certificateUrl: "https://picsum.photos/200/250?cert=104",
    },
    {
      title: "Ketua OSIS",
      year: 2021,
      level: "Sekolah",
      imageUrl: "https://picsum.photos/400/250?img=105",
    },
  ],
};

/* ================= PAGE ================= */

export default function StudentAchievementsPage() {
  return (
    <div className="min-h-screen  flex justify-center">
      <div className="w-full  space-y-8">

        {/* HEADER */}
        <div className="py-6 px-8 bg-linear-to-r from-yellow-400 to-orange-500 rounded-t-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaTrophy /> Prestasi Siswa
          </h1>
          <p className="text-yellow-100 text-sm">
            Daftar prestasi akademik dan non-akademik siswa dari TK hingga SLTA
          </p>
        </div>

        {/* ACHIEVEMENTS LIST */}
        <div className="space-y-6">
          {studentAchievements.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition"
            >
              {/* IMAGE PRESTASI */}
              {ach.imageUrl && (
                <div className="shrink-0">
                  <img
                    src={ach.imageUrl}
                    alt={ach.title}
                    className="w-full md:w-48 h-32 object-cover rounded-xl shadow-sm"
                  />
                </div>
              )}

              {/* TITLE, DESCRIPTION, YEAR & LEVEL */}
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

                  {/* CERTIFICATE */}
                  {ach.certificateUrl && (
                    <a
                      href={ach.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                    >
                      <PiCertificateFill/> Sertifikat
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
