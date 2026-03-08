"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteClassroom,
  fetchClassrooms,
} from "@/redux/features/classroom/thunk";
import { resetClassroomStatus } from "@/redux/features/classroom/slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { confirmActionToast } from "../toast/confirmActionToast";

import { ClassroomHeader } from "./ClassroomHeader";
import { ClassroomCard } from "./ClassroomCard";
import { AddClassroomModal } from "./AddClassroomModal";
import { UpdateClassroomModal } from "./UpdateClassroomModal";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SchoolClassroom } from "@/redux/features/classroom/types";
import { SearchModal } from "../SearchModal";

export default function SchoolClassroomSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { classrooms, loading, success, error } = useAppSelector(
    (state) => state.classroom,
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SchoolClassroom | null>(
    null,
  );
  const [appliedQuery, setAppliedQuery] = useState("");

  const handleFetchData = useCallback(() => {
    if (schoolId) {
      dispatch(fetchClassrooms(schoolId));
    }
  }, [dispatch, schoolId]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  useEffect(() => {
    if (success) {
      toast.success(
        selectedItem ? "Ruangan diperbarui" : "Ruangan ditambahkan",
      );
      handleCloseModals();
      dispatch(resetClassroomStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetClassroomStatus());
    }
  }, [success, error, dispatch, selectedItem]);

  const filteredClassrooms = useMemo(() => {
    if (!appliedQuery) return classrooms;
    const q = appliedQuery.toLowerCase();
    return classrooms.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.level.toString().includes(q) ||
        (item.major && item.major.toLowerCase().includes(q)),
    );
  }, [classrooms, appliedQuery]);

  const handleCloseModals = () => {
    setIsAddOpen(false);
    setIsUpdateOpen(false);
    setSelectedItem(null);
  };

  const handleOpenEdit = (item: SchoolClassroom) => {
    setSelectedItem(item);
    setIsUpdateOpen(true);
  };

  const handleDelete = (id: string) => {
    // Validasi schoolId sebelum memicu toast konfirmasi
    if (!schoolId) {
      return toast.error(
        "Sesi sekolah tidak ditemukan. Silakan refresh halaman.",
      );
    }

    confirmActionToast({
      title: "Hapus Ruangan?",
      message: "Data akan dihapus permanen dan tidak dapat dikembalikan.",
      variant: "danger",
      onConfirm: async () => {
        try {
          // Menggunakan unwrap() agar kita bisa menangkap error langsung di sini jika diperlukan
          await dispatch(deleteClassroom({ id, schoolId })).unwrap();
          toast.success("Ruangan berhasil dihapus");
        } catch (err: any) {
          // Error biasanya sudah dihandle oleh useEffect error di atas,
          // tapi unwrap membolehkan handling lokal jika spesifik.
        }
      },
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <ClassroomHeader
        onBack={() => router.back()}
        onAdd={() => setIsAddOpen(true)}
        onSearch={setAppliedQuery}
        onRefresh={handleFetchData}
        isLoading={loading}
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl shadow-sm min-h-100 overflow-hidden transition-all">
        {loading && classrooms.length === 0 ? (
          <div className="p-32 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
              Sinkronisasi data...
            </p>
          </div>
        ) : filteredClassrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
            {filteredClassrooms.map((item) => (
              <ClassroomCard
                key={item.schoolClassroomId}
                item={item}
                onEdit={() => handleOpenEdit(item)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="p-32 text-center space-y-4">
            <p className="text-slate-200 dark:text-slate-800 font-black uppercase tracking-tighter text-7xl">
              {appliedQuery ? "Nihil" : "Kosong"}
            </p>
            {appliedQuery && (
              <p className="text-slate-400 font-bold text-sm uppercase italic">
                Hasil pencarian untuk "{appliedQuery}" tidak ditemukan.
              </p>
            )}
          </div>
        )}
      </div>

      <AddClassroomModal isOpen={isAddOpen} onClose={handleCloseModals} />
      <UpdateClassroomModal
        isOpen={isUpdateOpen}
        onClose={handleCloseModals}
        data={selectedItem}
      />
    </div>
  );
}
