// app/kelas/detail/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaArrowLeft, FaChalkboardTeacher, FaDoorOpen, FaUserGraduate,
  FaCalendarAlt, FaBookOpen, FaPhoneAlt, FaIdCard, FaPlus,
  FaEye, FaEdit, FaTrash, FaTh, FaList, FaSearch, FaUser,
  FaChevronLeft
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchClassroomConfigById } from '@/redux/features/classroom-config/thunk';
import { useSchoolId } from '@/hooks/useSchoolId';

// --- 1. TIPE DATA UNTUK SISWA ---
interface Siswa {
  nis: string;
  firstName: string;
  lastName: string;
  image: string;
}

// --- 2. DATA STATIS KELAS ---
const kelasDetailStatis = {
  id: '5',
  namaKelas: 'X IPA 1',
  waliKelas: 'Dr. Andi Wijaya, M.Si.',
  kontakWaliKelas: '+62 812-3456-7890',
  tingkat: 'X',
  jurusan: 'IPA' as const,
  ruangan: 'Lab Kimia Lantai 2',
  jumlahSiswa: 10, // Jumlah disesuaikan dengan data sample
  kapasitas: 32,
  tahunAjaran: '2024/2025',
  semester: 'Ganjil',
  kurikulum: 'Merdeka',
  image: 'https://picsum.photos/seed/kelas-x-ipa-1/1200/400.jpg',
};

// --- 3. DATA SISWA YANG LENGKAP ---
const initialDaftarSiswa: Siswa[] = [
  { nis: '2024001', firstName: 'Ahmad Rizki', lastName: 'Fahrezi', image: 'https://picsum.photos/seed/siswa1/200/200.jpg' },
  { nis: '2024002', firstName: 'Siti', lastName: 'Nurhaliza', image: 'https://picsum.photos/seed/siswa2/200/200.jpg' },
  { nis: '2024003', firstName: 'Budi', lastName: 'Santoso', image: 'https://picsum.photos/seed/siswa3/200/200.jpg' },
  { nis: '2024004', firstName: 'Dewi', lastName: 'Lestari', image: 'https://picsum.photos/seed/siswa4/200/200.jpg' },
  { nis: '2024005', firstName: 'Rizki', lastName: 'Pratama', image: 'https://picsum.photos/seed/siswa5/200/200.jpg' },
  { nis: '2024006', firstName: 'Andi Wijaya', lastName: 'Kusuma', image: 'https://picsum.photos/seed/siswa6/200/200.jpg' },
  { nis: '2024007', firstName: 'Maya Sari', lastName: 'Dewi', image: 'https://picsum.photos/seed/siswa7/200/200.jpg' },
  { nis: '2024008', firstName: 'Fajar', lastName: 'Nugroho', image: 'https://picsum.photos/seed/siswa8/200/200.jpg' },
  { nis: '2024009', firstName: 'Indah Permata', lastName: 'Sari', image: 'https://picsum.photos/seed/siswa9/200/200.jpg' },
  { nis: '2024010', firstName: 'Chandra', lastName: 'Liow', image: 'https://picsum.photos/seed/siswa10/200/200.jpg' },
];

// --- 4. KOMPONEN HALAMAN DETAIL YANG DIPERBAIKI ---
export default function KelasDetailStatisPage() {
  const dispatch = useAppDispatch();
  const { detail } = useAppSelector((state) => state.classroomConfig)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const schoolId = useSchoolId();
  const configId = sessionStorage.getItem("classroomConfigId")

  const filteredDaftarSiswa = detail?.classroomStudents.filter(siswa =>
    siswa.student.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    siswa.student.nis.includes(searchQuery)
  );



  console.log(schoolId, configId)
  useEffect(() => {
    if (configId && schoolId) {
      dispatch(fetchClassroomConfigById({ id: configId, schoolId }));
    }
  }, [dispatch, configId, schoolId]);
  const router = useRouter()

  console.log("data detail kelas", detail)


  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 lg:h-96">
        <img
          src={kelasDetailStatis.image}
          alt={`Gambar ${kelasDetailStatis.namaKelas}`}
          className="w-full h-full object-cover brightness-75 rounded-t-lg"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <Link href="/" className="absolute flex gap-2 text-lg font-bold left-2 top-4 items-center text-white/80 hover:text-white mb-4 transition-colors">
          <FaChevronLeft className="mr-2" />
          Kembali
        </Link>
        <div className="absolute bottom-0 left-0 p-6 sm:p-10">

          <h1 className="text-4xl sm:text-5xl font-bold text-white">{detail?.classroom.name}</h1>
          <p className="text-lg text-white/90 mt-1"> • {detail?.period.academicYear}</p>
        </div>
      </div>

      <div className="container mx-auto  -mt-10 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Grid Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <FaChalkboardTeacher className="text-blue-600 dark:text-blue-400 text-2xl mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wali Kelas</p>
              <p className="font-semibold text-gray-900 capitalize dark:text-white">{detail?.homeroomTeacher.user.username}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <FaDoorOpen className="text-green-600 dark:text-green-400 text-2xl mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ruang</p>
              <p className="font-semibold text-gray-900 dark:text-white">{detail?.roomLocation}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <FaUserGraduate className="text-purple-600 dark:text-purple-400 text-2xl mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kapasitas</p>
              <p className="font-semibold text-gray-900 dark:text-white">{kelasDetailStatis.jumlahSiswa} / 36</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <FaCalendarAlt className="text-orange-600 dark:text-orange-400 text-2xl mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Semester</p>
              <p className="font-semibold text-gray-900 dark:text-white">{detail?.period.semester}</p>
            </div>
          </div>

          {/* Daftar Siswa dengan Kontrol Pencarian dan View */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Daftar Siswa ({filteredDaftarSiswa?.length})</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Input Pencarian */}
                <div className="relative ">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama atau NIS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <FaPlus className="mr-2" /> Tambah Siswa
                </button>
                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>



            {/* Render Tampilan Berdasarkan Mode */}
            {filteredDaftarSiswa?.length === 0 ? (
              <div className="text-center py-10">
                <FaUser className="mx-auto text-gray-300 dark:text-gray-600 text-5xl mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Tidak ada siswa yang ditemukan untuk pencarian "{searchQuery}"</p>
              </div>
            ) : viewMode === 'grid' ? (
              // --- TAMPILAN GRID ---
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail?.classroomStudents?.map((siswa, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="relative group">
                      {siswa.student.user?.avatar ? (
                        <img
                          src={siswa.student.user.avatar}
                          alt={siswa.student.user.username}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-md transition-all duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-md">
                          <span className="text-white font-bold text-xl tracking-tighter uppercase">
                            {/* Ambil huruf pertama dari username, fallback ke 'S' jika null */}
                            {siswa.student.user?.username?.charAt(0) || 'S'}
                          </span>
                        </div>
                      )}

                      {/* Indikator Status (Opsional) */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{siswa.student.user.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">NIS: {siswa.student.nis}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors" title="Detail">
                        <FaEye />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors" title="Update">
                        <FaEdit />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // --- TAMPILAN LIST (TANPA TABLE) ---
              <div className="space-y-2">
                {filteredDaftarSiswa?.map((siswa, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                    <div className="relative">
                      {siswa.student.user.avatar ? (
                        <img
                          src={siswa.student.user.avatar}
                          alt={siswa.student.user.username}
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-sm">
                          <span className="text-white font-bold text-lg uppercase">
                            {siswa.student.user.username.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Status Online/Aktif Indicator (Optional) */}
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{siswa.student.user.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">NIS: {siswa.student.nis}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Detail">
                        <FaEye />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors" title="Update">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}