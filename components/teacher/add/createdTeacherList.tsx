"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";
import ModalTeacherIdentity from "./ModalTeacherIdentity";
import { CardUserModal } from "@/components/user/CardUserModal";
import { User } from "@/redux/features/user/types";

type IdType = "nip" | "nuptk" | "niy";

export default function CreatedTeacherList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { filteredUsers } = useAppSelector((state) => state.users);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [teacherData, setTeacherData] = useState<Record<string, any>>({});
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    if (schoolId) {
      dispatch(getFilteredUsers({ schoolId, role: "teacher", exists: false }));
    }
  }, [dispatch, schoolId]);

  const handleSelectFromModal = useCallback(
    (user: User) => {
      const userId = user.userId;

      if (selectedIds.includes(userId)) {
        setSelectedIds((prev) => prev.filter((id) => id !== userId));
        setTeacherData((prev) => {
          const newData = { ...prev };
          delete newData[userId];
          return newData;
        });
        setActivePopup(null);
      } else {
        setSelectedIds((prev) => [...prev, userId]);
        setTeacherData((prev) => ({
          ...prev,
          [userId]: { ...user, type: "nip", value: "" },
        }));
        setActivePopup(userId);
      }
    },
    [selectedIds],
  );

  const handleCloseModal = useCallback(() => {
    if (activePopup) {
      const currentTeacher = teacherData[activePopup];
      if (!currentTeacher?.value?.trim()) {
        setSelectedIds((prev) => prev.filter((id) => id !== activePopup));
        setTeacherData((prev) => {
          const newData = { ...prev };
          delete newData[activePopup];
          return newData;
        });
      }
    }
    setActivePopup(null);
  }, [activePopup, teacherData]);

  const updateData = (id: string, field: "type" | "value", val: string) => {
    setTeacherData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  };

  const handleSave = async () => {
    if (!schoolId) return toast.error("School ID tidak ditemukan");
    if (selectedIds.length === 0) return toast.error("Pilih minimal satu guru");

    const isAnyEmpty = selectedIds.some(
      (id) => !teacherData[id]?.value?.trim(),
    );
    if (isAnyEmpty) {
      const missingId = selectedIds.find(
        (id) => !teacherData[id]?.value?.trim(),
      );
      if (missingId) setActivePopup(missingId);
      return toast.error("Semua Identitas Guru (NIP/NUPTK/NIY) wajib diisi!");
    }

    const payload = selectedIds.map((id) => ({
      userId: id,
      type: teacherData[id].type,
      value: teacherData[id].value,
    }));

    setIsSubmitting(true);
    const toastId = toast.loading("Mendaftarkan guru...");

    try {
      const response = await api.post(`/school-teachers/bulk/${schoolId}`, {
        teachers: payload,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(`${selectedIds.length} Guru berhasil didaftarkan!`, {
          id: toastId,
        });
        setSelectedIds([]);
        setTeacherData({});
        setActivePopup(null);
        dispatch(
          getFilteredUsers({
            schoolId: schoolId as string,
            role: "teacher",
            exists: false,
          }),
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mendaftarkan guru", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeUser = activePopup ? teacherData[activePopup] : null;

  return (
    <div className="w-full text-gray-700 dark:text-white space-y-6 pb-40 px-4 animate-in fade-in duration-500">
      {/* AREA PENCARIAN GLOBAL (CARD USER MODAL) */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-2 shadow-sm border border-slate-100 dark:border-slate-800">
        <CardUserModal
          role="teacher"
          onSelect={handleSelectFromModal}
          selectedIds={selectedIds}
          placeholder="Cari kandidat guru dari database global SoSchool..."
        />
      </div>

      {/* FLOATING ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4 animate-in slide-in-from-bottom-20 duration-500">
          <div className="bg-slate-900/95 dark:bg-indigo-950/95 p-4 pl-10 rounded-[3rem] flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="text-white text-sm font-black uppercase italic tracking-tighter">
                Konfirmasi Guru
              </span>
              <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                {selectedIds.length} Terpilih
              </span>
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleSave}
              className="group flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-4xl text-[10px] font-black uppercase italic transition-all active:scale-95 disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? (
                <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlinePaperAirplane
                    size={18}
                    className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                  Daftarkan Sekarang
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* MODAL IDENTITAS GURU */}
      {activePopup && activeUser && (
        <ModalTeacherIdentity
          isOpen={!!activePopup}
          user={activeUser as User}
          data={teacherData[activePopup]}
          updateData={updateData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
