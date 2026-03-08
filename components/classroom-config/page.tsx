"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlus,
  HiOutlineHomeModern,
} from "react-icons/hi2";

// Thunks
import {
  fetchClassroomConfigs,
  removeClassroomConfig,
} from "@/redux/features/classroom-config/thunk";
import toast from "react-hot-toast";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { ClassroomConfigCard } from "./ClassroomConfigCard";

export default function ClassroomConfigListSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Selectors
  const { configs, loading } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const schoolId = useSchoolId();
  // Local UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Semua");

  useEffect(() => {
    if (schoolId) {
      dispatch(
        fetchClassroomConfigs({
          schoolId,
          periodId: activePeriod?.periodId,
        }),
      );
    }
  }, [dispatch, schoolId, activePeriod]);

  // Fitur Pencarian & Filter
  const filteredConfigs = useMemo(() => {
    return configs.filter((config) => {
      const matchesSearch =
        config.classroom?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        config.homeroomTeacher?.user?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [configs, searchTerm, selectedLevel]);

  const handleDelete = (id: string) => {
    confirmActionToast({
      title: "Hapus Konfigurasi",
      message:
        "Apakah Anda yakin ingin menghapus konfigurasi kelas ini? Tindakan ini tidak dapat dibatalkan.",
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(
          removeClassroomConfig({ id, schoolId: schoolId! }),
        ).unwrap();
        toast.success("Konfigurasi berhasil dihapus");
      },
    });
  };

  const handleGoToDetail = (classroomConfigId: string) => {
    sessionStorage.setItem("classroomConfigId", classroomConfigId);
    router.push("classroom-config/detail");
  };

  const handleUpdate = (classroomConfigId: string) => {
    sessionStorage.setItem("classroomConfigId", classroomConfigId);
    router.push("classroom-config/update");
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
            Manajemen kelas untuk periode {activePeriod?.academicYear} (
            {activePeriod?.semester})
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("classroom-config/add")}
          className="flex items-center gap-2 px-6 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          <HiOutlinePlus size={18} strokeWidth={3} />
          Buka Kelas Baru
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 relative">
          <HiOutlineMagnifyingGlass
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-4xl"
            ></div>
          ))}
        </div>
      ) : filteredConfigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredConfigs.map((config) => (
            <ClassroomConfigCard
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
          <HiOutlineHomeModern
            size={48}
            className="mx-auto text-slate-300 mb-4"
          />
          <p className="text-slate-500 font-bold italic">
            Data kelas tidak ditemukan.
          </p>
        </div>
      )}
    </div>
  );
}
