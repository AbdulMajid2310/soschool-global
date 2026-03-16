"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStudentsByPeriod } from "@/redux/features/classroom-student/thunks";
import {
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { QuickStat } from "./HelperClassroom";
import { StudentCard } from "./StudentCard";
import { toast } from "react-hot-toast";
import { confirmActionToast } from "../toast/confirmActionToast";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
// Import SearchModal Anda
import { SearchModal } from "../SearchModal";

export default function ClassroomStudentList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const { students, loading } = useAppSelector(
    (state) => state.classroomStudent,
  );
  const { loading: accessLoading } = useAppSelector(
    (state) => state.userAccess,
  );
  const { role } = useAppSelector((state) => state.userRole);

  const [searchQuery, setSearchQuery] = useState(""); // State untuk SearchModal
  const [filterClass, setFilterClass] = useState("all");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (schoolId && activePeriod) {
      dispatch(
        fetchStudentsByPeriod({ schoolId, periodId: activePeriod.periodId }),
      );
    }
    const studentRoleCode = process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (studentRoleCode) {
      dispatch(getUserRoleByCode(studentRoleCode));
    }
  }, [dispatch, schoolId, activePeriod]);

  const classOptions = useMemo(() => {
    const classes = students.map((s) => s.classroomConfig.classroom.name);
    return ["all", ...Array.from(new Set(classes))];
  }, [students]);

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

  const handleRefresh = () => {
    if (schoolId && activePeriod) {
      dispatch(
        fetchStudentsByPeriod({ schoolId, periodId: activePeriod.periodId }),
      );
      toast.success("Data diperbarui");
    }
  };

  const handleBulkAccess = (type: "grant" | "revoke") => {
    const studentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (!schoolId || !studentRoleId || selectedUserIds.length === 0) return;

    confirmActionToast({
      title: type === "grant" ? "Berikan Akses" : "Cabut Akses",
      message: `${type === "grant" ? "Berikan" : "Cabut"} akses untuk ${selectedUserIds.length} siswa?`,
      confirmText: "Ya, Lanjutkan",
      variant: type === "grant" ? "warning" : "danger",
      onConfirm: async () => {
        const action = type === "grant" ? createBulkAccess : deleteBulkAccess;
        await dispatch(
          action({
            schoolId,
            userRoleId: studentRoleId,
            userIds: selectedUserIds,
          }),
        ).unwrap();
        toast.success(
          `Akses berhasil ${type === "grant" ? "diberikan" : "dicabut"}`,
        );
        setSelectedUserIds([]);
      },
    });
  };

  const toggleSelectAll = () => {
    if (
      selectedUserIds.length === filteredData.length &&
      filteredData.length > 0
    ) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredData.map((s) => s.student.user.userId));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
            Peserta Didik{" "}
            <span className="text-indigo-600">
              {activePeriod?.academicYear}
            </span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
            Manajemen penempatan dan status akademik siswa
          </p>
        </div>
        <div className="flex gap-4">
          <QuickStat
            label="Total Siswa"
            value={students.length}
            icon={<HiOutlineUserGroup />}
            color="bg-indigo-600"
          />
          <QuickStat
            label="Kelas Aktif"
            value={classOptions.length - 1}
            icon={<HiOutlineAcademicCap />}
            color="bg-emerald-500"
          />
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedUserIds.length > 0 && (
        <div className="fixed top-0 right-0  z-50 bg-slate-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 border border-white/10">
          <span className="text-xs font-black uppercase tracking-widest border-r border-slate-700 pr-6">
            {selectedUserIds.length} Terpilih
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAccess("grant")}
              disabled={accessLoading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-[10px] font-black uppercase transition-all"
            >
              <HiOutlineShieldCheck size={16} /> Beri Akses
            </button>
            <button
              onClick={() => handleBulkAccess("revoke")}
              disabled={accessLoading}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-xl text-[10px] font-black uppercase transition-all"
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

      {/* Toolbar Section dengan SearchModal */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            title="select"
            onClick={toggleSelectAll}
            className={`p-4 rounded-2xl transition-all shrink-0 ${selectedUserIds.length === filteredData.length && filteredData.length > 0 ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
          >
            <HiOutlineCheckCircle size={22} />
          </button>

          {/* Implementasi SearchModal Anda */}
          <div className="flex-1 lg:w-80">
            <SearchModal
              onSearch={setSearchQuery}
              onRefresh={handleRefresh}
              isLoading={loading}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 justify-end w-full overflow-hidden">
          <HiOutlineAdjustmentsHorizontal
            size={20}
            className="text-slate-400 shrink-0"
          />
          <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-x-auto no-scrollbar">
            {classOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterClass(opt)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${filterClass === opt ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                {opt === "all" ? "Semua Kelas" : opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => {
          const isSelected = selectedUserIds.includes(item.student.user.userId);
          return (
            <div key={item.classroomStudentId} className="relative group">
              <div
                onClick={() => {
                  const userId = item.student.user.userId;
                  setSelectedUserIds((prev) =>
                    isSelected
                      ? prev.filter((id) => id !== userId)
                      : [...prev, userId],
                  );
                }}
                className={`absolute top-4 right-4 z-20 cursor-pointer transition-all ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <div
                  className={`p-1 rounded-full ${isSelected ? "bg-indigo-600 text-white" : "bg-white shadow-lg text-slate-300"}`}
                >
                  <HiOutlineCheckCircle size={24} />
                </div>
              </div>
              <div
                className={`transition-all duration-300 ${isSelected ? "scale-[0.98] ring-4 ring-indigo-500/30 rounded-[2.5rem]" : ""}`}
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
