"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { registerBulkStaff } from "@/redux/features/staff/thunks";
import { useSchoolId } from "@/hooks/useSchoolId";
import ModalStaffIdentity from "./ModalStaffIdentity";
import { User } from "@/redux/features/user/types";
import { CardUserModal } from "@/components/user/CardUserModal";

export default function CreatedStaffList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { filteredUsers } = useAppSelector((state) => state.users);
  const { loading: isSubmitting } = useAppSelector(
    (state) => state.schoolStaff,
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [staffData, setStaffData] = useState<Record<string, any>>({});
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    if (schoolId) {
      dispatch(getFilteredUsers({ schoolId, role: "staff", exists: false }));
    }
  }, [dispatch, schoolId]);

  const handleSelectFromModal = useCallback(
    (user: User) => {
      const userId = user.userId;

      if (selectedIds.includes(userId)) {
        setSelectedIds((prev) => prev.filter((id) => id !== userId));
        setStaffData((prev) => {
          const newData = { ...prev };
          delete newData[userId];
          return newData;
        });
        setActivePopup(null);
      } else {
        setSelectedIds((prev) => [...prev, userId]);
        setStaffData((prev) => ({
          ...prev,
          [userId]: { ...user, position: "", nip: "", employeeId: "" },
        }));
        setActivePopup(userId);
      }
    },
    [selectedIds],
  );

  const handleCloseModal = useCallback(() => {
    if (activePopup) {
      const currentStaff = staffData[activePopup];
      if (!currentStaff?.position?.trim()) {
        setSelectedIds((prev) => prev.filter((id) => id !== activePopup));
        setStaffData((prev) => {
          const newData = { ...prev };
          delete newData[activePopup];
          return newData;
        });
      }
    }
    setActivePopup(null);
  }, [activePopup, staffData]);

  const updateData = (id: string, field: string, val: string) => {
    setStaffData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  };

  const handleSave = async () => {
    if (!schoolId) return toast.error("School ID tidak ditemukan");
    if (selectedIds.length === 0)
      return toast.error("Pilih minimal satu staff");

    const isPositionMissing = selectedIds.some(
      (id) => !staffData[id]?.position?.trim(),
    );
    if (isPositionMissing) {
      const missingId = selectedIds.find(
        (id) => !staffData[id]?.position?.trim(),
      );
      if (missingId) setActivePopup(missingId);
      return toast.error("Jabatan wajib diisi untuk semua staff terpilih");
    }

    const payload = selectedIds.map((id) => ({
      userId: id,
      position: staffData[id].position,
      nip: staffData[id].nip || null,
      employeeId: staffData[id].employeeId || null,
    }));

    const resultAction = await dispatch(
      registerBulkStaff({ schoolId, staffs: payload }),
    );

    if (registerBulkStaff.fulfilled.match(resultAction)) {
      toast.success(`${selectedIds.length} Staff berhasil didaftarkan!`);
      setSelectedIds([]);
      setStaffData({});
      setActivePopup(null);
    } else {
      toast.error(
        (resultAction.payload as string) || "Gagal mendaftarkan staff",
      );
    }
  };

  const activeUser = activePopup ? staffData[activePopup] : null;

  return (
    <div className="w-full text-gray-700 dark:text-white space-y-6 pb-40 px-4 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-2 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
        <CardUserModal
          role="staff"
          onSelect={handleSelectFromModal}
          selectedIds={selectedIds}
          placeholder="Cari dan pilih kandidat staff dari database global..."
        />
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4 animate-in slide-in-from-bottom-20 duration-500">
          <div className="bg-slate-900/95 dark:bg-indigo-950/95 p-4 pl-10 rounded-[3rem] flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col">
              <span className="text-white text-sm font-black uppercase italic tracking-tighter">
                Konfirmasi Pendaftaran
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                {selectedIds.length} Kandidat Terpilih
              </span>
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleSave}
              className="group flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-4xl text-[10px] font-black uppercase italic transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-emerald-900/20"
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

      {activePopup && activeUser && (
        <ModalStaffIdentity
          isOpen={!!activePopup}
          user={activeUser as User}
          data={staffData[activePopup]}
          updateData={updateData}
          setActivePopup={handleCloseModal}
        />
      )}
    </div>
  );
}
