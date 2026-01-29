// app/raport-siswa/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaIdCard, FaUser, FaBook, FaCalendarAlt, FaStickyNote } from 'react-icons/fa';

// --- TIPE DATA ---
interface NilaiRaport {
  mataPelajaran: string;
  nilai: { uh1: number; uh2: number; uts: number; uas: number; };
  predikat: string;
  deskripsi: string;
}

interface Raport {
  namaSiswa: string;
  nis: string;
  kelas: string;
  semester: string;
  tahunAjaran: string;
  nilai: NilaiRaport[];
  kehadiran: { hadir: number; sakit: number; izin: number; alpa: number; };
  catatanWaliKelas: string;
}

// --- DATA ---
const dataRaport: Raport = {
  namaSiswa: 'Ali bin Abu Thalib', nis: '2021001', kelas: 'VII A', semester: 'Ganjil', tahunAjaran: '2024/2025',
  nilai: [
    { mataPelajaran: 'Matematika', nilai: { uh1: 85, uh2: 90, uts: 88, uas: 92 }, predikat: 'A', deskripsi: 'Sangat memuaskan.' },
    { mataPelajaran: 'Bahasa Indonesia', nilai: { uh1: 78, uh2: 80, uts: 82, uas: 85 }, predikat: 'B', deskripsi: 'Baik.' },
  ],
  kehadiran: { hadir: 95, sakit: 3, izin: 2, alpa: 0 },
  catatanWaliKelas: 'Ali adalah siswa yang berprestasi dan aktif di kelas. Pertahankan prestasinya!'
};

// --- KOMPONEN ---
export default function RaportSiswaPage() {
  const [selectedSiswa, setSelectedSiswa] = useState<string>('Ali bin Abu Thalib');
  const daftarSiswa = ['Ali bin Abu Thalib', 'Siti Khadijah', 'Umar bin Khattab'];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FaIdCard className="mr-3 text-blue-600 dark:text-blue-400" />
            Raport Siswa
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Lihat raport lengkap siswa.</p>
        </div>

        {/* Pemilih Siswa */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Siswa:</label>
          <select value={selectedSiswa} onChange={(e) => setSelectedSiswa(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
            {daftarSiswa.map(siswa => <option key={siswa} value={siswa}>{siswa}</option>)}
          </select>
        </div>

        {/* Tampilan Raport */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
          {/* Header Raport */}
          <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">LAPORAN HASIL BELAJAR</h2>
            <p className="text-gray-600 dark:text-gray-400">Tahun Ajaran {dataRaport.tahunAjaran} - Semester {dataRaport.semester}</p>
          </div>

          {/* Identitas Siswa */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center"><FaUser className="mr-2 text-gray-400" /><span><b>Nama:</b> {dataRaport.namaSiswa}</span></div>
            <div className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-400" /><span><b>Kelas:</b> {dataRaport.kelas}</span></div>
            <div className="flex items-center"><FaIdCard className="mr-2 text-gray-400" /><span><b>NIS:</b> {dataRaport.nis}</span></div>
          </div>

          {/* Tabel Nilai */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center"><FaBook className="mr-2" />Nilai Akademik</h3>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                <tr><th>Mata Pelajaran</th><th>UH1</th><th>UH2</th><th>UTS</th><th>UAS</th><th>Predikat</th></tr>
              </thead>
              <tbody>
                {dataRaport.nilai.map((n, i) => (
                  <tr key={i} className="bg-white dark:bg-gray-800 border-b">
                    <td className="px-2 py-2 font-medium">{n.mataPelajaran}</td>
                    <td className="px-2 py-2 text-center">{n.nilai.uh1}</td>
                    <td className="px-2 py-2 text-center">{n.nilai.uh2}</td>
                    <td className="px-2 py-2 text-center">{n.nilai.uts}</td>
                    <td className="px-2 py-2 text-center">{n.nilai.uas}</td>
                    <td className="px-2 py-2 text-center font-bold">{n.predikat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Kehadiran & Catatan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Kehadiran</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hadir: {dataRaport.kehadiran.hadir} hari</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sakit: {dataRaport.kehadiran.sakit} hari</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Izin: {dataRaport.kehadiran.izin} hari</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alpa: {dataRaport.kehadiran.alpa} hari</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center"><FaStickyNote className="mr-2" />Catatan Wali Kelas</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{dataRaport.catatanWaliKelas}"</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}