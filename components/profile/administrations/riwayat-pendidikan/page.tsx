"use client";

import { FaSchool, FaGraduationCap } from "react-icons/fa";

/* ================= TYPES ================= */
interface EducationStage {
  level: string; // SD, SMP, SMA, S1, S2, S3
  schoolName: string;
  city: string;
  yearStart: number;
  yearEnd: number;
  graduationScore?: number | string; // Nilai/IPK
}

interface TeacherFullData {
  educationHistory: EducationStage[];
}

/* ================= DATA GURU ================= */
const teacherData: TeacherFullData = {
  educationHistory: [
    { level: "SD", schoolName: "SDN 01 Jakarta", city: "Jakarta", yearStart: 1986, yearEnd: 1992, graduationScore: 8.5 },
    { level: "SMP", schoolName: "SMPN 02 Jakarta", city: "Jakarta", yearStart: 1992, yearEnd: 1995, graduationScore: 8.7 },
    { level: "SMA", schoolName: "SMAN 03 Jakarta", city: "Jakarta", yearStart: 1995, yearEnd: 1998, graduationScore: 8.9 },
    { level: "S1", schoolName: "Universitas Negeri Jakarta", city: "Jakarta", yearStart: 1998, yearEnd: 2002, graduationScore: 3.60 },
    { level: "S2", schoolName: "Universitas Indonesia", city: "Depok", yearStart: 2004, yearEnd: 2006, graduationScore: 3.80 },
    { level: "S3", schoolName: "Universitas Pendidikan Indonesia", city: "Bandung", yearStart: 2008, yearEnd: 2012, graduationScore: 4.00 },
  ],
};

/* ================= PAGE ================= */
export default function TeacherEducationPage() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

{/* HEADER */}
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaGraduationCap /> Riwayat Pendidikan 
          </h1>
          <p className="text-green-100 text-sm mt-1">
            Rekap jenjang pendidikan.
          </p>
        </div>

        {/* EDUCATION TIMELINE */}
        <div className="p-6 md:p-8 space-y-6">
          {teacherData.educationHistory.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between gap-4"
            >
              {/* Icon & Level */}
              <div className="flex items-center gap-3">
                <div className="text-3xl text-green-500">
                  {["SD","SMP","SMA"].includes(edu.level) ? <FaSchool /> : <FaGraduationCap />}
                </div>
                <div>
                  <p className="font-semibold text-lg">{edu.level}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{edu.schoolName}, {edu.city}</p>
                </div>
              </div>

              {/* Tahun & Nilai/IPK */}
              <div className="flex flex-col items-start md:items-end gap-1">
                <p className="text-sm text-gray-400 dark:text-gray-300">{edu.yearStart} - {edu.yearEnd}</p>
                {edu.graduationScore !== undefined && (
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    Nilai/IPK: {edu.graduationScore}
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
