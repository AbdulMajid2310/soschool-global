"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineUserGroup,
  HiOutlineXMark,
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

export default function ClassroomStudentListDetail() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { students: globalStudents, loading: globalLoading } = useAppSelector(
    (state) => state.classroomStudent,
  );
  const { detail: configDetail, loading: configLoading } = useAppSelector(
    (state) => state.classroomConfig,
  );
  const { loading: accessLoading } = useAppSelector(
    (state) => state.userAccess,
  );
  const { role } = useAppSelector((state) => state.userRole);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    const studentRoleCode = process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (studentRoleCode) dispatch(getUserRoleByCode(studentRoleCode));
  }, [dispatch]);

  const unifiedStudentList = useMemo(() => {
    if (configDetail?.classroomStudents) {
      return configDetail.classroomStudents.map((item: any) => ({
        ...item,
        classroomConfig: {
          classroomConfigId: configDetail.classroomConfigId,
          classroom: configDetail.classroom,
          period: configDetail.period,
        },
      }));
    }
    return Array.isArray(globalStudents) ? globalStudents : [];
  }, [configDetail, globalStudents]);

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return unifiedStudentList.filter((s: any) => {
      const username = s.student?.user?.username?.toLowerCase() || "";
      const nis = s.student?.nis || "";
      return username.includes(query) || nis.includes(searchQuery);
    });
  }, [unifiedStudentList, searchQuery]);

  const toggleSelection = useCallback((userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (
      selectedUserIds.length === filteredData.length &&
      filteredData.length > 0
    ) {
      setSelectedUserIds([]);
    } else {
      const allIds = filteredData.map((s: any) => s.student.user.userId);
      setSelectedUserIds(allIds);
    }
  }, [filteredData, selectedUserIds]);

  const handleBulkAccess = (type: "grant" | "revoke") => {
    const studentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (!schoolId) return toast.error("School ID tidak valid");
    if (!studentRoleId || selectedUserIds.length === 0) return;

    confirmActionToast({
      title: type === "grant" ? "Berikan Akses" : "Cabut Akses",
      message: `Konfirmasi ${type === "grant" ? "pemberian" : "pencabutan"} akses untuk ${selectedUserIds.length} siswa?`,
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
        } catch (err) {}
      },
    });
  };

  const isLoading = globalLoading || configLoading;

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      {/* 1. PERBAIKAN: Floating Bar dipindah ke Bawah agar tidak menutupi Konten & Header */}
      {selectedUserIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-2xl animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900/90 dark:bg-indigo-950/90 backdrop-blur-2xl text-white px-6 py-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500 h-10 w-10 rounded-full flex items-center justify-center font-black text-sm shadow-inner">
                {selectedUserIds.length}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">
                Siswa Terpilih
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAccess("grant")}
                disabled={accessLoading}
                className="group flex items-center gap-2 px-5 py-3 bg-white text-slate-900 hover:bg-indigo-500 hover:text-white rounded-2xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
              >
                <HiOutlineShieldCheck
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="hidden xs:inline">Beri Akses</span>
              </button>
              <button
                onClick={() => handleBulkAccess("revoke")}
                disabled={accessLoading}
                className="group flex items-center gap-2 px-5 py-3 bg-rose-600/20 text-rose-400 border border-rose-600/30 hover:bg-rose-600 hover:text-white rounded-2xl text-[10px] font-black uppercase transition-all disabled:opacity-50"
              >
                <HiOutlineShieldExclamation size={16} />
                <span className="hidden xs:inline">Cabut</span>
              </button>
              <button
                title="selected"
                onClick={() => setSelectedUserIds([])}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all"
              >
                <HiOutlineXMark size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-600">
              <HiOutlineUserGroup size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase">
                Student Directory
              </h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {isLoading
                  ? "Synchronizing..."
                  : `${filteredData.length} Total Students`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 lg:w-96">
              <SearchModal
                onSearch={setSearchQuery}
                onRefresh={() => {}}
                isLoading={isLoading}
              />
            </div>
            <button
              onClick={handleSelectAll}
              className={`p-4 rounded-2xl transition-all flex items-center gap-3 ${
                selectedUserIds.length === filteredData.length &&
                filteredData.length > 0
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100"
              }`}
            >
              <HiOutlineCheckCircle size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
                {selectedUserIds.length === filteredData.length
                  ? "Deselect"
                  : "Select All"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredData.map((item: any) => {
            const userId = item.student.user.userId;
            const isSelected = selectedUserIds.includes(userId);

            return (
              <div
                key={item.classroomStudentId || item.student.studentId}
                className="relative group"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelection(userId);
                  }}
                  className={`absolute top-4 right-4 z-20 cursor-pointer transition-all duration-500 ${
                    isSelected
                      ? "opacity-100 scale-100"
                      : "opacity-0 group-hover:opacity-100 scale-90"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-full backdrop-blur-md border ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-400 text-white shadow-lg"
                        : "bg-white/80 dark:bg-slate-800/80 border-slate-200 text-slate-300"
                    }`}
                  >
                    <HiOutlineCheckCircle size={22} />
                  </div>
                </div>

                {/* Card Container */}
                <div className={`transition-all duration-500`}>
                  <StudentCard data={item} />
                  {/* Overlay tint saat terpilih */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-[2.5rem] pointer-events-none ring-2 ring-indigo-500/50" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <HiOutlineUserGroup
              size={64}
              className="text-slate-200 dark:text-slate-800 mb-6"
            />
            <p className="text-slate-400 font-black uppercase tracking-widest italic text-xs">
              No students found in this configuration
            </p>
          </div>
        )
      )}
    </div>
  );
}
