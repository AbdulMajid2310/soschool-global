// app/input-nilai/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaEdit, FaFilter, FaSave, FaUserGraduate } from 'react-icons/fa';

// --- TIPE DATA ---
interface Siswa {
  id: string;
  nis: string;
  namaSiswa: string;
}

interface NilaiInput {
  siswaId: string;
  nilai: number;
}

// --- DATA ---
const dataSiswaKelas: Siswa[] = [
  { id: 's-001', nis: '2021001', namaSiswa: 'Ali bin Abu Thalib' },
  { id: 's-002', nis: '2021002', namaSiswa: 'Siti Khadijah' },
  { id: 's-003', nis: '2021003', namaSiswa: 'Umar bin Khattab' },
];

// --- KOMPONEN ---
export default function InputNilaiPage() {
  const [filterKelas, setFilterKelas] = useState<string>('VII A');
  const [filterMapel, setFilterMapel] = useState<string>('Matematika');
  const [filterJenis, setFilterJenis] = useState<string>('Ulangan Harian 1');
  const [nilaiInput, setNilaiInput] = useState<Record<string, number>>({});

  const daftarKelas = ['VII A', 'VII B', 'VIII C', 'X IPA 1'];
  const daftarMapel = ['Matematika', 'Bahasa Indonesia', 'IPA Terpadu'];
  const daftarJenis = ['Ulangan Harian 1', 'Ulangan Harian 2', 'UTS', 'UAS'];

  const handleNilaiChange = (siswaId: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setNilaiInput(prev => ({ ...prev, [siswaId]: numValue }));
    }
  };

  const handleSave = () => {
    alert('Nilai berhasil disimpan! (Ini adalah simulasi)');
    // Logika untuk menyimpan ke backend atau state global akan ada di sini
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaEdit className="mr-3 text-indigo-600 dark:text-indigo-400" />
              Input Nilai
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Masukkan nilai untuk setiap siswa.</p>
          </div>
          <button onClick={handleSave} className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <FaSave className="mr-2" /> Simpan Nilai
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center"><FaFilter className="text-gray-500 dark:text-gray-400 mr-2" /><span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span></div>
          <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
            {daftarKelas.map(kelas => <option key={kelas} value={kelas}>{kelas}</option>)}
          </select>
          <select value={filterMapel} onChange={(e) => setFilterMapel(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
            {daftarMapel.map(mapel => <option key={mapel} value={mapel}>{mapel}</option>)}
          </select>
          <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
            {daftarJenis.map(jenis => <option key={jenis} value={jenis}>{jenis}</option>)}
          </select>
        </div>

        {/* Grid Siswa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSiswaKelas.map(siswa => (
            <div key={siswa.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FaUserGraduate className="text-gray-400 mr-3 text-xl" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{siswa.namaSiswa}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">NIS: {siswa.nis}</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                value={nilaiInput[siswa.id] || ''}
                onChange={(e) => handleNilaiChange(siswa.id, e.target.value)}
                className="w-20 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}