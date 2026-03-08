"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheck,
  HiOutlineFingerPrint,
  HiOutlinePaperAirplane,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineXMark,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function CreatedStudentList() {
  const dispatch = useAppDispatch();
  const { filteredUsers, loading } = useAppSelector((state) => state.users);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State data dipecah agar NIS wajib dan NISN opsional
  const [studentData, setStudentData] = useState<
    Record<string, { nis: string; nisn: string; entryYear: string }>
  >({});

  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId)
      dispatch(getFilteredUsers({ schoolId, role: "student", exists: false }));
  }, [dispatch, schoolId]);

  const toggleUser = (userId: string) => {
    if (selectedIds.includes(userId)) {
      setSelectedIds((prev) => prev.filter((id) => id !== userId));
      setActivePopup(null);
    } else {
      setSelectedIds((prev) => [...prev, userId]);
      if (!studentData[userId]) {
        setStudentData((d) => ({
          ...d,
          [userId]: {
            nis: "",
            nisn: "",
            entryYear: new Date().getFullYear().toString(),
          },
        }));
      }
      setActivePopup(userId);
    }
  };

  const updateData = (id: string, field: string, val: string) => {
    setStudentData((prev) => ({
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

    // Validasi: NIS Wajib diisi untuk semua yang terpilih
    const isNisMissing = selectedIds.some((id) => !studentData[id]?.nis.trim());
    if (isNisMissing)
      return toast.error("Semua siswa terpilih wajib memiliki NIS!");

    const payload = selectedIds.map((id) => ({
      userId: id,
      nis: studentData[id].nis,
      nisn: studentData[id].nisn || null, // NISN Opsional
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
          placeholder="Cari calon siswa..."
          className="w-full pl-14 pr-6 py-5 border border-slate-100 dark:border-slate-800 rounded-4xl text-xs font-bold outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white dark:bg-slate-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedUsers.map((user) => {
          const isSelected = selectedIds.includes(user.userId);
          const isOpen = activePopup === user.userId;
          const data = studentData[user.userId];

          return (
            <div key={user.userId} className="relative">
              <div
                className={`flex flex-col items-center p-5 transition-all rounded-[2.5rem] border-2 ${isSelected ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-xl" : "bg-slate-50/50 dark:bg-slate-800/20 border-transparent"}`}
              >
                <div className="absolute right-3 top-3">
                  <button
                    onClick={() => toggleUser(user.userId)}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? "bg-indigo-600 text-white shadow-lg" : "bg-white dark:bg-slate-800 text-slate-300 border hover:border-indigo-300"}`}
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
                    {user.email || "No Email"}
                  </p>

                  {isSelected && (
                    <button
                      onClick={() =>
                        setActivePopup(isOpen ? null : user.userId)
                      }
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-[9px] font-black uppercase text-indigo-600"
                    >
                      <HiOutlineAcademicCap size={14} />
                      {data?.nis ? `NIS: ${data.nis}` : `Set Identitas`}
                      <HiOutlineChevronDown
                        size={12}
                        className={isOpen ? "rotate-180" : ""}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* DROPDOWN / MODAL SETTING */}
              {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                  <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                    {/* INFO USER DI DROPDOWN */}
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
                        <p className="text-[10px] text-slate-500 font-bold tracking-widest">
                          {user.registrationNumber || "SO-NEW"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* NIS - WAJIB */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-indigo-600 flex items-center gap-1">
                          Nomor Induk Siswa (NIS){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <HiOutlineFingerPrint
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                          />
                          <input
                            title="nis"
                            type="text"
                            placeholder="Masukkan NIS..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                            value={data.nis}
                            onChange={(e) =>
                              updateData(user.userId, "nis", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* NISN - OPSIONAL */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">
                          NISN (Opsional)
                        </label>
                        <div className="relative">
                          <HiOutlineIdentification
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                          />
                          <input
                            title="nisn"
                            type="text"
                            placeholder="Masukkan NISN..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold outline-none"
                            value={data.nisn}
                            onChange={(e) =>
                              updateData(user.userId, "nisn", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* TAHUN MASUK */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase text-slate-400">
                          Tahun Masuk
                        </label>
                        <input
                          title="tahun masuk"
                          type="number"
                          className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs font-bold outline-none"
                          value={data.entryYear}
                          onChange={(e) =>
                            updateData(user.userId, "entryYear", e.target.value)
                          }
                        />
                      </div>

                      <button
                        onClick={() => setActivePopup(null)}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-lg mt-2"
                      >
                        Simpan Identitas
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
              <span className="text-indigo-400 text-[10px] font-bold uppercase">
                {selectedIds.length} Siswa Terpilih
              </span>
            </div>
            <button
              disabled={isSubmitting}
              onClick={handleSave}
              className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-4xl text-[10px] font-black uppercase italic hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                "Proses..."
              ) : (
                <>
                  <HiOutlinePaperAirplane size={18} className="rotate-45" />{" "}
                  Daftarkan Sekarang
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
