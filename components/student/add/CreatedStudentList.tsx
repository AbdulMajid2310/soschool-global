"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";
import { User } from "@/redux/features/user/types";
import { CardUserModal } from "@/components/user/CardUserModal";
import ModalStudentIdentity from "./ModalStudentIdentity";

export default function CreatedStudentList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { filteredUsers } = useAppSelector((state) => state.users);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [studentData, setStudentData] = useState<Record<string, any>>({});
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    if (schoolId)
      dispatch(getFilteredUsers({ schoolId, role: "student", exists: false }));
  }, [dispatch, schoolId]);

  const handleSelectFromModal = useCallback(
    (user: User) => {
      const userId = user.userId;
      if (selectedIds.includes(userId)) {
        setSelectedIds((prev) => prev.filter((id) => id !== userId));
        setStudentData((prev) => {
          const newData = { ...prev };
          delete newData[userId];
          return newData;
        });
        setActivePopup(null);
      } else {
        setSelectedIds((prev) => [...prev, userId]);
        setStudentData((prev) => ({
          ...prev,
          [userId]: {
            ...user,
            nis: "",
            nisn: "",
            entryYear: new Date().getFullYear().toString(),
          },
        }));
        setActivePopup(userId);
      }
    },
    [selectedIds],
  );

  const handleCloseModal = useCallback(() => {
    if (activePopup) {
      const current = studentData[activePopup];
      if (!current?.nis?.trim()) {
        setSelectedIds((prev) => prev.filter((id) => id !== activePopup));
        setStudentData((prev) => {
          const newData = { ...prev };
          delete newData[activePopup];
          return newData;
        });
      }
    }
    setActivePopup(null);
  }, [activePopup, studentData]);

  const updateData = (id: string, field: string, val: string) => {
    setStudentData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  };

  const handleSave = async () => {
    if (!schoolId) return toast.error("School ID tidak ditemukan");
    if (selectedIds.length === 0)
      return toast.error("Pilih minimal satu siswa");

    const isNisMissing = selectedIds.some(
      (id) => !studentData[id]?.nis?.trim(),
    );
    if (isNisMissing) {
      const missingId = selectedIds.find((id) => !studentData[id]?.nis?.trim());
      if (missingId) setActivePopup(missingId);
      return toast.error("Semua siswa terpilih wajib memiliki NIS!");
    }

    const payload = selectedIds.map((id) => ({
      userId: id,
      nis: studentData[id].nis,
      nisn: studentData[id].nisn || null,
      entryYear: studentData[id].entryYear,
    }));

    setIsSubmitting(true);
    const toastId = toast.loading("Mendaftarkan siswa...");

    try {
      const response = await api.post(`/school-students/bulk/${schoolId}`, {
        students: payload,
      });

      if (response.data.success) {
        toast.success(`${selectedIds.length} Siswa berhasil didaftarkan!`, {
          id: toastId,
        });
        setSelectedIds([]);
        setStudentData({});
        setActivePopup(null);
        dispatch(
          getFilteredUsers({ schoolId, role: "student", exists: false }),
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mendaftarkan siswa", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeUser = activePopup ? studentData[activePopup] : null;

  return (
    <div className="w-full text-gray-700 dark:text-white space-y-6 pb-40 px-4 animate-in fade-in duration-500">
      {/* AREA PENCARIAN GLOBAL */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-2 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
        <CardUserModal
          role="student"
          onSelect={handleSelectFromModal}
          selectedIds={selectedIds}
          placeholder="Cari kandidat siswa dari database global..."
        />
      </div>

      {/* FLOATING ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4 animate-in slide-in-from-bottom-20 duration-500">
          <div className="bg-slate-900/95 dark:bg-indigo-950/95 p-4 pl-10 rounded-[3rem] flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="text-white text-sm font-black uppercase italic tracking-tighter leading-tight">
                Konfirmasi Siswa
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                {selectedIds.length} Terpilih
              </span>
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleSave}
              className="flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-4xl text-[10px] font-black uppercase italic transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-900/20"
            >
              {isSubmitting ? (
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlinePaperAirplane size={18} className="rotate-45" />
                  Daftarkan Sekarang
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* MODAL IDENTITAS SISWA */}
      {activePopup && activeUser && (
        <ModalStudentIdentity
          isOpen={!!activePopup}
          user={activeUser as User}
          data={studentData[activePopup]}
          updateData={updateData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
