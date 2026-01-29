// app/data-ekskul/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { FaUsers, FaPlus, FaFilter, FaUserTie, FaCalendarAlt } from 'react-icons/fa';

// --- TIPE DATA ---
interface Ekstrakulikuler {
  id: string;
  namaEkskul: string;
  pembina: string;
  jadwal: string;
  deskripsi: string;
  jumlahAnggota: number; // Data tambahan untuk analisis
}

// --- DATA ---
const dataEkskul: Ekstrakulikuler[] = [
  { id: 'ek-001', namaEkskul: 'Pramuka', pembina: 'Ahmad Fadli, S.Pd.', jadwal: 'Sabtu, 07:00 - 09:00', deskripsi: 'Membina karakter disiplin, kepemimpinan, dan kecintaan pada alam.', jumlahAnggota: 45 },
  { id: 'ek-002', namaEkskul: 'Futsal', pembina: 'Rizki Pratama, S.Pd.', jadwal: 'Rabu, 15:00 - 17:00', deskripsi: 'Mengembangkan bakat olahraga sepak bola dan kerja sama tim.', jumlahAnggota: 22 },
  { id: 'ek-003', namaEkskul: 'PMR (Palang Merah Remaja)', pembina: 'Dewi Lestari, S.Pd.', jadwal: 'Jumat, 14:00 - 16:00', deskripsi: 'Melatih keterampilan pertolongan pertama dan kesiapsiagaan bencana.', jumlahAnggota: 30 },
  { id: 'ek-004', namaEkskul: 'Robotika', pembina: 'Dr. Andi Wijaya, M.Si.', jadwal: 'Selasa, 14:00 - 16:00', deskripsi: 'Mengenalkan teknologi robotika dan pemrograman dasar.', jumlahAnggota: 15 },
  { id: 'ek-005', namaEkskul: 'Seni Tari', pembina: 'Rina Amelia, S.Pd.', jadwal: 'Kamis, 15:00 - 17:00', deskripsi: 'Melestarikan seni budaya tari tradisional dan modern.', jumlahAnggota: 25 },
];

// --- KOMPONEN ---
export default function DataEkskulPage() {
  const [filterPembina, setFilterPembina] = useState<string>('Semua');

  const sortedEkskul = useMemo(() => {
    const filtered = filterPembina === 'Semua' ? dataEkskul : dataEkskul.filter(e => e.pembina === filterPembina);
    return filtered.sort((a, b) => a.namaEkskul.localeCompare(b.namaEkskul));
  }, [filterPembina]);

  const daftarPembina = useMemo(() => ['Semua', ...Array.from(new Set(dataEkskul.map(e => e.pembina)))], []);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
              <FaUsers className="mr-3 text-teal-600 dark:text-teal-400" />
              Data Ekstrakulikuler
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Kelola semua kegiatan ekstrakulikuler sekolah.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
            <FaPlus className="mr-2" /> Tambah Ekskul
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center"><FaFilter className="text-gray-500 dark:text-gray-400 mr-2" /><span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3">Filter:</span></div>
          <select value={filterPembina} onChange={(e) => setFilterPembina(e.target.value)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500">
            {daftarPembina.map(pembina => <option key={pembina} value={pembina}>{pembina}</option>)}
          </select>
        </div>

        {/* Grid Ekskul */}
        {sortedEkskul.length === 0 ? (
          <div className="text-center py-10"><FaUsers className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" /><p className="text-gray-500 dark:text-gray-400">Tidak ada data ekstrakulikuler.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEkskul.map(ekskul => (
              <div key={ekskul.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-teal-500 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{ekskul.namaEkskul}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p className="flex items-center"><FaUserTie className="mr-2 text-gray-400" /> {ekskul.pembina}</p>
                  <p className="flex items-center"><FaCalendarAlt className="mr-2 text-gray-400" /> {ekskul.jadwal}</p>
                  <p className="text-xs mt-3">{ekskul.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}