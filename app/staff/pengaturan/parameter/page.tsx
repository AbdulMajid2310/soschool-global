'use client';

import React, { useState } from 'react';
import { FaSave, FaBell, FaCog, FaSchool, FaCalendarAlt, FaPalette, FaTools, FaTimes } from 'react-icons/fa';
import ProfileSchool from './profileSchool';
import PeriodActiveCard from './periodeSchool';

/* =======================
   TIPE DATA & STATE AWAL
======================= */
interface SystemParams {
  // --- Informasi Umum Sekolah ---
  namaSekolah: string;
  alamat: string;
  nomorTelepon: string;
  email: string;
  logo: string; // Untuk demo, kita simpan nama file

  // --- Tahun Ajaran ---
  tahunAjaranAktif: string;
  semesterAktif: 'ganjil' | 'genap';

  // --- Parameter Akademik ---
  nilaiMinimalKkm: number;
  maksimalSiswaPerKelas: number;
  hariEfektif: string[];

  // --- Pengaturan Aplikasi ---
  namaAplikasi: string;
  tema: 'light' | 'dark' | 'system';
  modePemeliharaan: boolean;
}

// Data default untuk inisialisasi state
const defaultParams: SystemParams = {
  namaSekolah: 'SMA Negeri 1 Example',
  alamat: 'Jl. Pendidikan No. 1, Kota Example',
  nomorTelepon: '(021) 1234567',
  email: 'info@sma1example.sch.id',
  logo: 'logo-sekolah.png',
  tahunAjaranAktif: '2023/2024',
  semesterAktif: 'ganjil',
  nilaiMinimalKkm: 75,
  maksimalSiswaPerKelas: 36,
  hariEfektif: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
  namaAplikasi: 'Sistem Informasi Akademik',
  tema: 'system',
  modePemeliharaan: false,
};

const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/* =======================
   KOMPONEN NOTIFIKASI (REUSABLE)
======================= */
const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between animate-pulse">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4"><FaTimes /></button>
    </div>
  );
};

/* =======================
   HALAMAN UTAMA
======================= */
export default function ParameterSistemPage() {
  const [params, setParams] = useState<SystemParams>(defaultParams);
  const [notification, setNotification] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // --- Handler untuk input biasa (text, number, select) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  // --- Handler untuk checkbox ---
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    if (name === 'hariEfektif') {
      setParams(prev => {
        const currentDays = prev.hariEfektif;
        if (checked) {
          // Tambah hari jika dicentang
          return { ...prev, hariEfektif: [...currentDays, value] };
        } else {
          // Hapus hari jika centang dilepas
          return { ...prev, hariEfektif: currentDays.filter(day => day !== value) };
        }
      });
    } else {
      // Untuk checkbox tunggal seperti modePemeliharaan
      setParams(prev => ({ ...prev, [name]: checked }));
    }
  };

  // --- Handler untuk tombol simpan ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulasi proses penyimpanan ke API (dengan delay 1.5 detik)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Di sini Anda akan memanggil API untuk menyimpan data
    // contoh: await api.updateSystemParams(params);

    console.log('Parameter sistem yang disimpan:', params);
    setIsSaving(false);
    setNotification('Parameter sistem berhasil disimpan!');

    // Sembunyikan notifikasi setelah 3 detik
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}

      <div className="max-w-full  mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaCog className="text-3xl text-gray-600 dark:text-gray-400" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Parameter Sistem</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* --- SECTION 1: Informasi Umum Sekolah --- */}
          <ProfileSchool />

          {/* --- SECTION 2: Tahun Ajaran --- */}
          <PeriodActiveCard />

          {/* --- SECTION 3: Parameter Akademik --- */}
          <fieldset className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <legend className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <FaSchool /> Parameter Akademik
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nilai Minimal (KKM)</label>
                <input type="number" name="nilaiMinimalKkm" value={params.nilaiMinimalKkm} onChange={handleInputChange} min="0" max="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Maksimal Siswa per Kelas</label>
                <input type="number" name="maksimalSiswaPerKelas" value={params.maksimalSiswaPerKelas} onChange={handleInputChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hari Efektif Pembelajaran</label>
                <div className="flex flex-wrap gap-4">
                  {daysOfWeek.map(day => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hariEfektif"
                        value={day}
                        checked={params.hariEfektif.includes(day)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          {/* --- SECTION 4: Pengaturan Aplikasi --- */}
          <fieldset className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <legend className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <FaPalette /> Pengaturan Aplikasi
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Aplikasi</label>
                <input type="text" name="namaAplikasi" value={params.namaAplikasi} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tema Default</label>
                <select name="tema" value={params.tema} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600">
                  <option value="light">Terang</option>
                  <option value="dark">Gelap</option>
                  <option value="system">Ikuti Sistem</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="modePemeliharaan"
                    checked={params.modePemeliharaan}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Aktifkan Mode Pemeliharaan (Maintenance Mode)</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">Jika diaktifkan, hanya admin yang dapat mengakses aplikasi.</p>
              </div>
            </div>
          </fieldset>

          {/* --- TOMBOL SIMPAN --- */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <>Menyimpan...</>
              ) : (
                <>
                  <FaSave /> Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}