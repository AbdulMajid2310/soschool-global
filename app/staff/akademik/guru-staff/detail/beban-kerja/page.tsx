"use client";

import { FaChalkboardTeacher, FaClock, FaMapMarkerAlt, FaTasks } from "react-icons/fa";

/* ================= TYPES ================= */
interface Assignment {
    academicYear: string; // Tahun Ajaran Aktif, misal "2025/2026"
    semester: "Ganjil" | "Genap";
    mainSubject: string; // Mata Pelajaran Utama
    additionalTasks?: string[]; // Tugas Tambahan
    totalTeachingHours: number; // Total Jam Mengajar per minggu
    location?: string; // Lokasi Tugas
}

interface TeacherAssignmentData {
    assignments: Assignment[];
}

/* ================= DATA GURU ================= */
const teacherAssignmentData: TeacherAssignmentData = {
    assignments: [
        {
            academicYear: "2025/2026",
            semester: "Ganjil",
            mainSubject: "Fisika",
            additionalTasks: ["Wali Kelas XI-A", "Kepala Lab", "Pembina Pramuka"],
            totalTeachingHours: 24,
            location: "Gedung A",
        },
        {
            academicYear: "2025/2026",
            semester: "Genap",
            mainSubject: "Fisika",
            additionalTasks: ["Wali Kelas XI-A", "Pembina Pramuka"],
            totalTeachingHours: 22,
            location: "Gedung A",
        },
    ],
};

/* ================= PAGE ================= */
export default function TeacherAssignmentPage() {
    return (
        <div className="min-h-screen flex justify-center p-4 ">
            <div className="w-full  space-y-6">
                <div className="px-6 py-4 ">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FaTasks /> Beban Kerja & Penugasan 
                    </h1>
                    <p className="text-green-100 text-sm mt-1">
                        Ringkasan beban mengajar, tugas tambahan, dan lokasi penugasan setiap semester.
                    </p>
                </div>
                {teacherAssignmentData.assignments.map((assign, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:justify-between gap-4 hover:shadow-lg transition"
                    >
                        {/* Tahun Ajaran & Semester */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <FaChalkboardTeacher className="text-blue-500 text-2xl" />
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {assign.academicYear} - Semester {assign.semester}
                                </p>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Mata Pelajaran Utama: {assign.mainSubject}
                            </p>

                            {assign.additionalTasks && assign.additionalTasks.length > 0 && (
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Tugas Tambahan: {assign.additionalTasks.join(", ")}
                                </p>
                            )}
                        </div>

                        {/* Total Jam & Lokasi */}
                        <div className="flex flex-col gap-2 items-start md:items-end">
                            <div className="flex items-center gap-2">
                                <FaClock className="text-green-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Total Jam Mengajar: {assign.totalTeachingHours} jam/minggu
                                </span>
                            </div>

                            {assign.location && (
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    <span className="text-sm text-gray-700 dark:text-gray-200">
                                        Lokasi Tugas: {assign.location}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
