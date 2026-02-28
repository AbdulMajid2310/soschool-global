'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineHomeModern,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineMapPin,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineUser
} from 'react-icons/hi2';

// Thunks
import { fetchClassroomConfigs, removeClassroomConfig } from '@/redux/features/classroom-config/thunk';
import { ClassroomConfig } from '@/redux/features/classroom-config/types';
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { TbListDetails } from 'react-icons/tb';
import { confirmActionToast } from '@/components/toast/confirmActionToast';
import { useSchoolId } from '@/hooks/useSchoolId';

export default function ClassroomConfigListSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Selectors
  const { configs, loading } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const schoolId = useSchoolId();
  // Local UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Semua');

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchClassroomConfigs({
        schoolId,
        periodId: activePeriod?.periodId
      }));
    }
  }, [dispatch, schoolId, activePeriod]);

  // Fitur Pencarian & Filter
  const filteredConfigs = useMemo(() => {
    return configs.filter((config) => {
      const matchesSearch =
        config.classroom?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.homeroomTeacher?.user?.username.toLowerCase().includes(searchTerm.toLowerCase());


      return matchesSearch;
    });
  }, [configs, searchTerm, selectedLevel]);

  const handleDelete = (id: string) => {
    confirmActionToast({
      title: 'Hapus Konfigurasi',
      message: 'Apakah Anda yakin ingin menghapus konfigurasi kelas ini? Tindakan ini tidak dapat dibatalkan.',
      confirmText: 'Ya, Hapus',
      variant: 'danger',
      onConfirm: async () => {
        // Pastikan menggunakan unwrap() agar error tertangkap oleh try-catch di dalam confirmActionToast
        await dispatch(removeClassroomConfig({ id, schoolId: schoolId! })).unwrap();

        // Notifikasi sukses (Loading toast akan otomatis di-dismiss oleh fungsi confirmActionToast kamu)
        toast.success("Konfigurasi berhasil dihapus");
      }
    });
  };

  const handleGoToDetail = (classroomConfigId: string) => {
    // 1. Simpan di SessionStorage (Agar URL tetap bersih)
    sessionStorage.setItem("classroomConfigId", classroomConfigId);


    // 3. Pindah halaman
    router.push("/staff/akademik/kelas/detail");
  };

  const handleUpdate = (classroomConfigId: string) => {
    sessionStorage.setItem("classroomConfigId", classroomConfigId);


    // 3. Pindah halaman
    router.push("/staff/akademik/kelas/update");
  };

  return (
    <div className="animate-in fade-in text-gray-900 dark:text-white duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <HiOutlineHomeModern size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight italic">
              Rombongan Belajar
            </h1>
          </div>
          <p className="text-slate-500 font-medium italic">
            Manajemen kelas untuk periode {activePeriod?.academicYear} ({activePeriod?.semester})
          </p>
        </div>

        <button
          onClick={() => router.push('classroom-config/add')}
          className="flex items-center gap-2 px-6 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <HiOutlinePlus size={18} strokeWidth={3} />
          Buka Kelas Baru
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama kelas atau wali kelas..."
            className="w-full pl-14 pr-5 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-4xl"></div>
          ))}
        </div>
      ) : filteredConfigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConfigs.map((config) => (
            <ClassCard
              key={config.classroomConfigId}
              config={config}
              onDetail={() => handleGoToDetail(config.classroomConfigId)}
              onDelete={handleDelete}
              onEdit={() => handleUpdate(config.classroomConfigId)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-700">
          <HiOutlineHomeModern size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold italic">Data kelas tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: CARD ---
const ClassCard = ({
  config,
  onEdit,
  onDetail,
  onDelete
}: {
  config: ClassroomConfig,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
  onDetail: (id: string) => void
}) => {
  const studentCount = config.classroomStudents?.length || 0;
  const capacity = 36; // Bisa diambil dari config.classroom.capacity jika ada
  const percent = (studentCount / capacity) * 100;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Action Buttons (Hover Only) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDetail(config.classroomConfigId)}
          className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
        >
          <TbListDetails size={18} />
        </button>
        <button
          onClick={() => onEdit(config.classroomConfigId)}
          className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
        >
          <BiEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(config.classroomConfigId)}
          className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>

      {/* Card Header */}
      <div className="flex items-start gap-5 mb-4">
        <div className="shrink-0 w-16 h-16 bg-linear-to-br from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none group-hover:rotate-6 transition-transform">
          <HiOutlineAcademicCap size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">
            {config.classroom?.name}
          </h3>
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <HiOutlineMapPin size={14} />
            {config.roomLocation || 'Lokasi Belum Diatur'}
          </div>
        </div>
      </div>

      {/* Info Grid */}

      <div className="flex gap-4 items-center mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
        <div className="shrink-0">
          {config.homeroomTeacher?.user?.avatar ? (
            <img
              src={config.homeroomTeacher.user.avatar}
              alt={config.homeroomTeacher?.user?.username}
              className="h-14 w-14 object-cover rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
            />
          ) : (
            <div className="h-14 w-14 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-full border-2 border-white dark:border-slate-700">
              <HiOutlineUser size={28} />
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Wali Kelas</p>
          <h1 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
            {config.homeroomTeacher?.user?.username || 'Belum Ditentukan'}
          </h1>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            NIP: {config.homeroomTeacher?.nip || '-'}
          </p>
        </div>
      </div>



      {/* Progress Bar */}
      <div className="pt-3 border-t border-slate-50 dark:border-slate-800">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Kapasitas</p>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
              {studentCount} <span className="text-slate-400 font-medium text-sm">/ {capacity} Siswa</span>
            </p>
          </div>
          <span className={`text-xs font-black ${percent >= 100 ? 'text-rose-500' : 'text-indigo-600'}`}>
            {Math.round(percent)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${percent >= 100 ? 'bg-rose-500' : 'bg-linear-to-r from-indigo-500 to-violet-400'
              }`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};