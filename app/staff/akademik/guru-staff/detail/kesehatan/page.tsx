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

/* ================= TYPES ================= */
export interface TeacherHealth {
    bloodType: string;
    heightCm: number;
    weightKg: number;
    medicalHistory: string;
    allergies: string;
    chronicDisease: string;
    specialNeeds: string;
    immunizations: { name: string; status: "Completed" | "Not Completed" }[];
    medicalCheckups: { date: string; doctorName: string; notes: string }[];
    emergencyContact: { name: string; relation: string; phone: string };
    lastCheckupDate: string;
    familyDoctor: string;
    familyMembersWithHealthIssues: string;
}

/* ================= DATA GURU ================= */
export const teacherHealthData: TeacherHealth = {
    bloodType: "O",
    heightCm: 170,
    weightKg: 65,
    medicalHistory: "Riwayat asma ringan, rutin pemeriksaan setiap tahun.",
    allergies: "Debu, Seafood",
    chronicDisease: "Tidak ada",
    specialNeeds: "Tidak ada",
    immunizations: [
        { name: "BCG", status: "Completed" },
        { name: "Polio", status: "Completed" },
        { name: "DPT", status: "Completed" },
        { name: "Hepatitis B", status: "Completed" },
        { name: "COVID-19", status: "Completed" },
    ],
    medicalCheckups: [
        { date: "15 Januari 2026", doctorName: "Dr. Siti Rahmawati", notes: "Semua normal." },
        { date: "12 Januari 2025", doctorName: "Dr. Budi Santoso", notes: "Diberikan vitamin rutin." },
    ],
    emergencyContact: { name: "Ahmad Fauzi", relation: "Saudara", phone: "0812-1111-2222" },
    lastCheckupDate: "15 Januari 2026",
    familyDoctor: "Dr. Siti Rahmawati, Klinik Sukajadi",
    familyMembersWithHealthIssues: "Ibu memiliki hipertensi ringan",
};

/* ================= PAGE ================= */
export default function TeacherHealthPage() {
    const health = teacherHealthData;

    return (
        <div className="min-h-screen flex justify-center ">
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* HEADER */}
                <div className="px-6 py-4 ">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FaSuitcaseMedical /> Informasi Kesehatan 
                    </h1>
                    <p className="text-red-100 text-sm mt-1">
                        Ringkasan kondisi kesehatan, imunisasi, dan kontak darurat.
                    </p>
                </div>
                {/* BASIC HEALTH */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 flex justify-center gap-4 rounded-xl p-5 items-center">
                        <FaHeartbeat className="text-red-500 text-6xl" />
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Golongan Darah</p>
                            <p className="text-2xl font-bold">{health.bloodType}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 flex justify-center gap-4 rounded-xl p-5 items-center">
                        <FaRulerVertical className="text-blue-500 text-6xl" />
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Tinggi Badan</p>
                            <p className="text-2xl font-bold">{health.heightCm} cm</p>
                        </div>
                    </div>

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

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4 text-sm">
                        <p className="font-semibold flex items-center gap-2">
                            <FaNotesMedical className="text-red-500" /> Riwayat Medis
                        </p>
                        <p>{health.medicalHistory}</p>

                        <p className="font-semibold flex items-center gap-2 pt-2">
                            <FaAllergies className="text-yellow-500" /> Alergi
                        </p>
                        <p>{health.allergies}</p>

                        <p className="font-semibold flex items-center gap-2 pt-2">
                            <FaUserMd className="text-blue-500" /> Penyakit Kronis
                        </p>
                        <p>{health.chronicDisease}</p>

                        <p className="font-semibold flex items-center gap-2 pt-2">
                            <FaUserFriends className="text-purple-500" /> Kebutuhan Khusus
                        </p>
                        <p>{health.specialNeeds}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4 text-sm">
                        <p className="font-semibold flex items-center gap-2">
                            <FaSyringe className="text-green-500" /> Riwayat Imunisasi
                        </p>
                        <div className="space-y-2">
                            {health.immunizations.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-4 py-2"
                                >
                                    <span>{item.name}</span>
                                    <span className={`text-xs font-medium ${item.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                                        {item.status === "Completed" ? "Selesai" : "Belum"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* MEDICAL CHECKUPS */}
                <div className="p-8 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4">
                    <p className="font-semibold text-sm flex items-center gap-2">
                        <FaHospital className="text-indigo-600" /> Pemeriksaan Medis Terakhir
                    </p>
                    {health.medicalCheckups.map((check, idx) => (
                        <div key={idx} className="text-sm bg-white dark:bg-gray-800 rounded-lg p-3">
                            <p><strong>Tanggal:</strong> {check.date}</p>
                            <p><strong>Dokter:</strong> {check.doctorName}</p>
                            <p><strong>Catatan:</strong> {check.notes}</p>
                        </div>
                    ))}
                    <p className="text-xs text-gray-500">Pemeriksaan terakhir: {health.lastCheckupDate}</p>
                    <p className="text-xs text-gray-500">Dokter keluarga: {health.familyDoctor}</p>
                    <p className="text-xs text-gray-500">Anggota keluarga dengan masalah kesehatan: {health.familyMembersWithHealthIssues}</p>
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
