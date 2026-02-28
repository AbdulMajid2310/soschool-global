"use client";

import { FaSchool, FaGraduationCap } from "react-icons/fa";

/* ================= TYPES ================= */
interface EducationStage {
  level: string; // TK, SD, SLTP, SLTA, MTs, Aliyah, SMK
  schoolName: string;
  city: string;
  yearStart: number;
  yearEnd: number;
  graduationScore?: number; // Nilai kelulusan
}

interface StudentFullData {
  educationHistory: EducationStage[];
}

/* ================= DATA SISWA ================= */
const studentData: StudentFullData = {
  educationHistory: [
    { level: "TK", schoolName: "TK Bintang Kecil", city: "Bandung", yearStart: 2010, yearEnd: 2012, graduationScore: 95 },
    { level: "SD", schoolName: "SD Negeri 03 Sukajadi", city: "Bandung", yearStart: 2012, yearEnd: 2018, graduationScore: 90 },
    { level: "SLTP", schoolName: "MTs Negeri 1 Bandung", city: "Bandung", yearStart: 2018, yearEnd: 2021, graduationScore: 88 },
    { level: "SLTA", schoolName: "Aliyah Negeri 2 Bandung", city: "Bandung", yearStart: 2021, yearEnd: 2024, graduationScore: 92 },
  ],
};

/* ================= PAGE ================= */
export default function StudentEducationPage() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 bg-linear-to-r from-blue-500 to-indigo-600">
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaSchool /> Riwayat Pendidikan Siswa
          </h1>
          <p className="text-blue-100 text-sm">
            Jenjang pendidikan dari TK hingga SLTA/MTs/Aliyah/SMK beserta nilai kelulusan
          </p>
        </div>

        {/* EDUCATION TIMELINE */}
        <div className="p-8 space-y-6">
          {studentData.educationHistory.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between gap-4"
            >
              {/* Icon & Level */}
              <div className="flex items-center gap-3">
                <FaGraduationCap className="text-indigo-500 text-3xl" />
                <div>
                  <p className="font-semibold text-lg">{edu.level}</p>
                  <p className="text-sm text-gray-500">{edu.schoolName}, {edu.city}</p>
                </div>
              </div>

              {/* Tahun & Nilai Kelulusan */}
              <div className="flex flex-col items-start md:items-end gap-1">
                <p className="text-sm text-gray-400">{edu.yearStart} - {edu.yearEnd}</p>
                {edu.graduationScore !== undefined && (
                  <span className="text-sm font-semibold text-green-700">
                    Nilai Kelulusan: {edu.graduationScore}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
