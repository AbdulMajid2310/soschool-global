"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheck,
  HiOutlineFingerPrint,
  HiOutlinePaperAirplane,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineBriefcase,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function CreatedStaffList() {
  const dispatch = useAppDispatch();
  const { filteredUsers, loading } = useAppSelector((state) => state.users);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State data disesuaikan dengan entitas SchoolStaff
  const [staffData, setStaffData] = useState<
    Record<string, { position: string; nip: string; employeeId: string }>
  >({});

  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId)
      // Mengambil user dengan role selain student yang belum terdaftar di sekolah ini
      dispatch(getFilteredUsers({ schoolId, role: "staff", exists: false }));
  }, [dispatch, schoolId]);

  const toggleUser = (userId: string) => {
    if (selectedIds.includes(userId)) {
      setSelectedIds((prev) => prev.filter((id) => id !== userId));
      setActivePopup(null);
    } else {
      setSelectedIds((prev) => [...prev, userId]);
      if (!staffData[userId]) {
        setStaffData((d) => ({
          ...d,
          [userId]: {
            position: "", // Wajib diisi sesuai entitas
            nip: "",
            employeeId: "",
          },
        }));
      }
      setActivePopup(userId);
    }
  };

  const updateData = (id: string, field: string, val: string) => {
    setStaffData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));
  };

  const displayedUsers = useMemo(() => {
    if (!filteredUsers) return [];
    return filteredUsers.filter(
      (u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [searchTerm, filteredUsers]);

  const handleSave = async () => {
    if (!schoolId) return toast.error("School ID tidak ditemukan");

    // Validasi: Jabatan (Position) Wajib diisi sesuai entitas
    const isPositionMissing = selectedIds.some(
      (id) => !staffData[id]?.position.trim(),
    );
    if (isPositionMissing)
      return toast.error("Semua staff terpilih wajib memiliki Jabatan!");

    const payload = selectedIds.map((id) => ({
      userId: id,
      position: staffData[id].position,
      nip: staffData[id].nip || null,
      employeeId: staffData[id].employeeId || null,
      isActive: true,
    }));

    setIsSubmitting(true);
    const toastId = toast.loading("Mendaftarkan staff...");

    try {
      const response = await api.post(`/school-staffs/bulk/${schoolId}`, {
        staffs: payload,
      });

      if (response.data.success) {
        toast.success(`${selectedIds.length} Staff berhasil didaftarkan!`, {
          id: toastId,
        });
        setSelectedIds([]);
        setStaffData({});
        setActivePopup(null);
        dispatch(getFilteredUsers({ schoolId, role: "staff", exists: false }));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal mendaftarkan staff", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-gray-700 dark:text-white space-y-6 pb-40 px-4">
      {/* SEARCH BAR */}
      <div className="relative group">
        <HiOutlineMagnifyingGlass
          className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Cari calon pegawai/guru..."
          className="w-full pl-14 pr-6 py-5 border border-slate-100 dark:border-slate-800 rounded-4xl text-xs font-bold outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/10 transition-all bg-white dark:bg-slate-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedUsers.map((user) => {
          const isSelected = selectedIds.includes(user.userId);
          const isOpen = activePopup === user.userId;
          const data = staffData[user.userId];

          return (
            <div key={user.userId} className="relative">
              <div
                className={`flex flex-col items-center p-5 transition-all rounded-[2.5rem] border-2 ${isSelected ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-xl" : "bg-slate-50/50 dark:bg-slate-800/20 border-transparent"}`}
              >
                <div className="absolute right-3 top-3">
                  <button
                    onClick={() => toggleUser(user.userId)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? "bg-emerald-600 text-white shadow-lg" : "bg-white dark:bg-slate-800 text-slate-300 border hover:border-emerald-300"}`}
                  >
                    {isSelected ? (
                      <HiOutlineCheck size={20} strokeWidth={3} />
                    ) : (
                      <HiOutlinePlus size={18} />
                    )}
                  </button>
                </div>

                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                  }
                  className="w-20 h-20 rounded-3xl object-cover mb-4 border-2 border-white"
                  alt=""
                />

                <div className="text-center w-full">
                  <h4 className="text-sm font-black uppercase truncate">
                    {user.username}
                  </h4>
                  <p className="text-[9px] font-bold text-slate-400 mb-4 tracking-tighter">
                    REG : {user.registrationNumber || "-"}
                  </p>

                  {isSelected && (
                    <button
                      onClick={() =>
                        setActivePopup(isOpen ? null : user.userId)
                      }
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-[9px] font-black uppercase text-emerald-600"
                    >
                      <HiOutlineBriefcase size={14} />
                      {data?.position ? data.position : `Set Jabatan`}
                      <HiOutlineChevronDown
                        size={12}
                        className={isOpen ? "rotate-180" : ""}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* MODAL SETTING STAFF */}
              {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                  <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <img
                        src={
                          user.avatar ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                        }
                        className="w-12 h-12 rounded-2xl"
                        alt=""
                      />
                      <div className="text-left">
                        <h5 className="text-xs font-black uppercase">
                          {user.username}
                        </h5>
                        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                          Calon Staff SoSchool
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* JABATAN / POSITION - WAJIB */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-emerald-600 flex items-center gap-1">
                          Jabatan / Posisi{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <HiOutlineBriefcase
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                          />
                          <input
                            type="text"
                            placeholder="Contoh: Guru Matematika, Admin..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold border-2 border-transparent focus:border-emerald-500 outline-none"
                            value={data.position}
                            onChange={(e) =>
                              updateData(
                                user.userId,
                                "position",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* NIP */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">
                          NIP (Opsional)
                        </label>
                        <div className="relative">
                          <HiOutlineFingerPrint
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                          />
                          <input
                            type="text"
                            placeholder="Masukkan NIP..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold outline-none"
                            value={data.nip}
                            onChange={(e) =>
                              updateData(user.userId, "nip", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* EMPLOYEE ID */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">
                          Internal ID / Employee ID
                        </label>
                        <div className="relative">
                          <HiOutlineIdentification
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                          />
                          <input
                            type="text"
                            placeholder="Masukkan ID Pegawai..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold outline-none"
                            value={data.employeeId}
                            onChange={(e) =>
                              updateData(
                                user.userId,
                                "employeeId",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setActivePopup(null)}
                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-lg mt-2"
                      >
                        Simpan Identitas Staff
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FLOATING ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg z-90 px-4">
          <div className="bg-slate-900 p-4 pl-10 rounded-[3rem] flex items-center justify-between border border-white/10 shadow-2xl">
            <div className="flex flex-col">
              <span className="text-white text-sm font-black uppercase italic tracking-tighter">
                Konfirmasi
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase">
                {selectedIds.length} Staff Terpilih
              </span>
            </div>
            <button
              disabled={isSubmitting}
              onClick={handleSave}
              className="flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-4xl text-[10px] font-black uppercase italic hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                "Proses..."
              ) : (
                <>
                  <HiOutlinePaperAirplane size={18} className="rotate-45" />
                  Daftarkan Staff
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
