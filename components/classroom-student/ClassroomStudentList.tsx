"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { StudentCard } from "./StudentCard";
import { toast } from "react-hot-toast";
import { confirmActionToast } from "../toast/confirmActionToast";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
import { SearchModal } from "../SearchModal";

export default function ClassroomStudentList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { students, loading } = useAppSelector(
    (state) => state.classroomStudent,
  );
  const { loading: accessLoading } = useAppSelector(
    (state) => state.userAccess,
  );
  const { role } = useAppSelector((state) => state.userRole);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const studentRoleCode = process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (studentRoleCode) dispatch(getUserRoleByCode(studentRoleCode));
  }, [dispatch]);

  const classOptions = useMemo(
    () => [
      "all",
      ...Array.from(
        new Set(students.map((s) => s.classroomConfig.classroom.name)),
      ),
    ],
    [students],
  );

  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.student.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        s.student.nis.includes(searchQuery);
      const matchClass =
        filterClass === "all" ||
        s.classroomConfig.classroom.name === filterClass;
      return matchSearch && matchClass;
    });
  }, [students, searchQuery, filterClass]);

  const toggleSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleBulkAccess = (type: "grant" | "revoke") => {
    const studentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;

    if (!schoolId || !studentRoleId || selectedUserIds.length === 0) {
      if (!schoolId) toast.error("School ID tidak ditemukan");
      return;
    }

    confirmActionToast({
      title: type === "grant" ? "Berikan Akses" : "Cabut Akses",
      message: `${type === "grant" ? "Berikan" : "Cabut"} akses untuk ${selectedUserIds.length} siswa?`,
      confirmText: "Ya, Lanjutkan",
      variant: type === "grant" ? "warning" : "danger",
      onConfirm: async () => {
        const action = type === "grant" ? createBulkAccess : deleteBulkAccess;
        try {
          await dispatch(
            action({
              schoolId: schoolId as string,
              userRoleId: studentRoleId,
              userIds: selectedUserIds,
            }),
          ).unwrap();

          toast.success(
            `Akses berhasil ${type === "grant" ? "diberikan" : "dicabut"}`,
          );
          setSelectedUserIds([]);
        } catch (error) {}
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Action Bar Floating */}
      {selectedUserIds.length > 0 && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 border border-white/10 animate-in slide-in-from-top-5">
          <span className="text-xs font-black uppercase tracking-widest border-r border-slate-700 pr-6">
            {selectedUserIds.length} Terpilih
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAccess("grant")}
              disabled={accessLoading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
            >
              <HiOutlineShieldCheck size={16} /> Beri Akses
            </button>
            <button
              onClick={() => handleBulkAccess("revoke")}
              disabled={accessLoading}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
            >
              <HiOutlineShieldExclamation size={16} /> Cabut Akses
            </button>
            <button
              onClick={() => setSelectedUserIds([])}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Toolbar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            title="Pilih Semua"
            onClick={() =>
              setSelectedUserIds(
                selectedUserIds.length === filteredData.length
                  ? []
                  : filteredData.map((s) => s.student.user.userId),
              )
            }
            className={`p-4 rounded-2xl transition-all ${
              selectedUserIds.length === filteredData.length &&
              filteredData.length > 0
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200"
            }`}
          >
            <HiOutlineCheckCircle size={22} />
          </button>
          <div className="flex-1 lg:w-80">
            <SearchModal
              onSearch={setSearchQuery}
              onRefresh={() => {}}
              isLoading={loading}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-hidden">
          <HiOutlineAdjustmentsHorizontal
            size={20}
            className="text-slate-400 shrink-0"
          />
          <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto no-scrollbar">
            {classOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterClass(opt)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${
                  filterClass === opt
                    ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {opt === "all" ? "Semua Kelas" : opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Student */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => {
          const isSelected = selectedUserIds.includes(item.student.user.userId);
          return (
            <div key={item.classroomStudentId} className="relative group">
              {/* Checkbox Overlay: Hanya bagian ini yang bisa diklik untuk seleksi */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah klik menyebar ke elemen bawah
                  toggleSelection(item.student.user.userId);
                }}
                className={`absolute top-5 right-5 z-20 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "opacity-100 scale-110"
                    : "opacity-0 group-hover:opacity-100 scale-100"
                }`}
              >
                <div
                  className={`p-1 rounded-full transition-colors ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                      : "bg-white/90 backdrop-blur shadow-md text-slate-300 hover:text-indigo-500 hover:scale-110"
                  }`}
                >
                  <HiOutlineCheckCircle size={26} />
                </div>
              </div>

              {/* Student Card: Klik di sini tidak akan memicu checkbox */}
              <div
                className={`transition-all duration-500 ${
                  isSelected
                    ? "scale-[0.97] ring-4 ring-indigo-500/30 rounded-[2.5rem] shadow-inner"
                    : ""
                }`}
              >
                <StudentCard data={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
