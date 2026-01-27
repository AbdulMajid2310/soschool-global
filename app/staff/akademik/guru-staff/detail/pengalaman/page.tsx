"use client";

import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { PiBracketsCurly } from "react-icons/pi";

/* ================= TYPES ================= */
interface TeacherExperience {
  position: string;
  jobType: string;
  company: string;
  startDate: string;
  endDate?: string;
  location: string;
  locationType: string;
  description?: string;
  skills: string[];
}

interface TeacherExperienceData {
  experiences: TeacherExperience[];
}

/* ================= DATA CONTOH ================= */
const teacherExperiences: TeacherExperienceData = {
  experiences: [
    {
      position: "Guru Fisika",
      jobType: "PNS",
      company: "SMA Negeri 1 Bandung",
      startDate: "01 Januari 2015",
      endDate: "31 Desember 2020",
      location: "Bandung",
      locationType: "Sekolah",
      description: "Mengajar mata pelajaran Fisika untuk kelas X-XII, membimbing siswa dalam olimpiade sains.",
      skills: ["Fisika", "Pembelajaran Interaktif", "Bimbingan Olimpiade"],
    },
    {
      position: "Kepala Lab Fisika",
      jobType: "PNS",
      company: "SMA Negeri 1 Bandung",
      startDate: "01 Januari 2018",
      endDate: "31 Desember 2020",
      location: "Bandung",
      locationType: "Lab",
      description: "Mengelola peralatan laboratorium, menyusun prosedur keselamatan, dan memfasilitasi praktikum.",
      skills: ["Manajemen Lab", "Keselamatan Laboratorium", "Instruksi Praktikum"],
    },
    {
      position: "Guru Fisika",
      jobType: "PPPK",
      company: "SMA Negeri 2 Bandung",
      startDate: "01 Januari 2021",
      location: "Bandung",
      locationType: "Sekolah",
      description: "Mengajar Fisika kelas X-XII dan membimbing proyek penelitian siswa.",
      skills: ["Fisika", "Pembimbing Proyek", "Evaluasi Akademik"],
    },
  ],
};

/* ================= PAGE ================= */
export default function TeacherExperiencePage() {
  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full space-y-8">

        {/* HEADER */}
        <div className="px-6 py-4 ">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaBriefcase /> Pengalaman Kerja
          </h1>
          <p className="text-indigo-100 text-sm mt-1">
            Riwayat posisi dan pengalaman kerja, beserta keahlian terkait
          </p>
        </div>

        {/* EXPERIENCES LIST */}
        <div className="space-y-6">
          {teacherExperiences.experiences.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition"
            >
              {/* ICON */}
              <div className="shrink-0 flex items-center justify-center">
                <FaBriefcase className="text-indigo-500 text-4xl" />
              </div>

              {/* INFO */}
              <div className="flex flex-col flex-1 gap-3">
                {/* POSITION & COMPANY */}
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {exp.position} <span className="text-indigo-500 font-medium">@ {exp.company}</span>
                </p>

                {/* JOB TYPE, LOCATION, PERIOD */}
                <div className="flex flex-wrap gap-3 items-center text-sm">
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200 px-3 py-1 rounded-full">
                    {exp.jobType}
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                    <FaMapMarkerAlt /> {exp.location} ({exp.locationType})
                  </span>
                  <span className="flex items-center gap-1 bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                    <FaCalendarAlt /> {exp.startDate} - {exp.endDate ?? "Sekarang"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                {exp.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
                )}

                {/* SKILLS */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="flex items-center gap-1 bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      <PiBracketsCurly /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
