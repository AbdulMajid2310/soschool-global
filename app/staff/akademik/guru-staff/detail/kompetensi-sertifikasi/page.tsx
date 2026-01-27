"use client";

import { FaBook, FaUserGraduate, FaStar } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

/* ================= TYPES ================= */
interface Certification {
  certificateNumber?: string; // No Sertifikat Pendidik
  NRG?: string; // Nomor Registrasi Guru
  fieldOfStudy: string; // Bidang Studi Sertifikasi
  year: number; // Tahun Sertifikasi
  specialSkills?: string; // Keahlian Khusus
  certificateUrl?: string; // Link Sertifikat
}

interface TeacherCertificationData {
  certifications: Certification[];
}

/* ================= DATA GURU ================= */
const teacherCertData: TeacherCertificationData = {
  certifications: [
    {
      certificateNumber: "1234567890",
      NRG: "987654321",
      fieldOfStudy: "Matematika",
      year: 2015,
      specialSkills: "TOEFL Score 600",
      certificateUrl: "https://example.com/cert-matematika.pdf",
    },
    {
      certificateNumber: "1122334455",
      NRG: "987654321",
      fieldOfStudy: "Teknologi Informasi",
      year: 2018,
      specialSkills: "Sertifikasi IT Cisco",
    },
  ],
};

/* ================= PAGE ================= */
export default function TeacherCertificationPage() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full space-y-6">

        {/* HEADER */}
        <div className="px-6 py-4 ">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaBook /> Kompetensi & Sertifikasi
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Daftar sertifikasi beserta bidang studi, nomor sertifikat, dan keahlian khusus.
          </p>
        </div>

        {/* CERTIFICATIONS LIST */}
        <div className="space-y-4">
          {teacherCertData.certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition"
            >
              {/* ICON & BIDANG STUDI */}
              <div className="flex items-center gap-3 shrink-0">
                <FaUserGraduate className="text-indigo-500 text-3xl" />
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {cert.fieldOfStudy}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    No Sertifikat: {cert.certificateNumber ?? "-"} | NRG: {cert.NRG ?? "-"}
                  </p>
                </div>
              </div>

              {/* TAHUN & KEAHLIAN KHUSUS */}
              <div className="flex flex-col justify-between flex-1 gap-2">
                <div className="flex items-center gap-2 flex-wrap mt-2 md:mt-0">
                  <span className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <FaStar /> Tahun: {cert.year}
                  </span>

                  {cert.specialSkills && (
                    <span className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100">
                      <FaStar /> {cert.specialSkills}
                    </span>
                  )}

                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200 transition"
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
