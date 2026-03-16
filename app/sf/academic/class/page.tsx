"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { HiOutlinePlus, HiOutlineHomeModern } from "react-icons/hi2";
import {
  fetchClassroomConfigs,
  removeClassroomConfig,
} from "@/redux/features/classroom-config/thunk";
import toast from "react-hot-toast";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SearchModal } from "@/components/SearchModal";
import { ClassroomConfigCard } from "@/components/classroom-config/ClassroomConfigCard";
import { MdOutlineAddHomeWork } from "react-icons/md";

export default function ClassroomConfigListPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { configs, loading } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const schoolId = useSchoolId();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (schoolId) {
      handleRefresh();
    }
  }, [dispatch, schoolId, activePeriod]);

  const handleRefresh = () => {
    if (schoolId) {
      dispatch(
        fetchClassroomConfigs({
          schoolId,
          periodId: activePeriod?.periodId,
        }),
      );
    }
  };

  const filteredConfigs = useMemo(() => {
    return configs.filter((config) => {
      return (
        config.classroom?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        config.homeroomTeacher?.user?.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
  }, [configs, searchTerm]);

  const handleDelete = (id: string) => {
    confirmActionToast({
      title: "Hapus Konfigurasi",
      message: "Apakah Anda yakin ingin menghapus konfigurasi kelas ini?",
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

  const handleGoToDetail = (id: string) => {
    sessionStorage.setItem("classroomConfigId", id);
    router.push("class/detail");
  };

  const handleUpdate = (id: string) => {
    sessionStorage.setItem("classroomConfigId", id);
    router.push("class/update");
  };

  return (
    <div className="w-full p-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-200 dark:shadow-none">
              <HiOutlineHomeModern size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
              Rombongan Belajar
            </h1>
          </div>
          <p className="text-slate-500 font-bold italic text-sm">
            Tahun Pelajaran {activePeriod?.academicYear} (
            {activePeriod?.semester})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <SearchModal
            onSearch={setSearchTerm}
            onRefresh={handleRefresh}
            isLoading={loading}
          />
          <button
            type="button"
            onClick={() => router.push("class/add")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <MdOutlineAddHomeWork size={18} />
            Buka Kelas
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-72 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"
            />
          ))}
        </div>
      ) : filteredConfigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
          <HiOutlineHomeModern
            size={64}
            className="mx-auto text-slate-200 dark:text-slate-700 mb-6"
          />
          <p className="text-slate-400 font-black italic uppercase tracking-widest">
            Data kelas tidak ditemukan
          </p>
        </div>
      )}
    </div>
  );
}
