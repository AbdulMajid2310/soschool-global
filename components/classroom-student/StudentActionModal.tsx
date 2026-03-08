"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateStudentClassStatus,
  promoteStudents,
} from "@/redux/features/classroom-student/thunks";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineCheckBadge,
  HiOutlineXMark,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { ClassroomStudent } from "@/redux/features/classroom-student/types";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchClassroomConfigs } from "@/redux/features/classroom-config/thunk";
import { HiOutlineSearch } from "react-icons/hi";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: ClassroomStudent;
  type: "STATUS" | "TRANSFER";
}

export default function StudentActionModal({
  isOpen,
  onClose,
  student,
  type,
}: ActionModalProps) {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { configs } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

  const [selectedStatus, setSelectedStatus] = useState(student?.status);
  const [targetConfigId, setTargetConfigId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && schoolId) {
      dispatch(
        fetchClassroomConfigs({
          schoolId,
          periodId: activePeriod?.periodId,
        }),
      );
    }
  }, [isOpen, dispatch, schoolId, activePeriod]);

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(student?.status);
      setTargetConfigId("");
      setSearchTerm("");
    }
  }, [isOpen, student]);

  const filteredConfigs = useMemo(() => {
    return configs.filter((c) =>
      c.classroom.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [configs, searchTerm]);

  if (!isOpen) return null;

  const handleUpdateStatus = async () => {
    await dispatch(
      updateStudentClassStatus({
        id: student.classroomStudentId,
        status: selectedStatus,
      }),
    );
    onClose();
  };

  const handleTransferClass = async () => {
    const mapping = [
      {
        studentId: student.student.studentId,
        fromConfigId: student.classroomConfig.classroomConfigId,
        toConfigId: targetConfigId,
      },
    ];
    await dispatch(promoteStudents(mapping));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-4xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-black uppercase italic text-xl text-slate-800 dark:text-white leading-none">
              {type === "STATUS" ? "Update Status" : "Pindah Kelas"}
            </h2>
            <button
              type="button"
              title="Tutup Modal"
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <HiOutlineXMark size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-4xl border border-slate-100 dark:border-slate-700/50">
            <div className="relative">
              <img
                src={
                  student.student.user.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${student.student.user.username}`
                }
                className="w-14 h-14 rounded-3xl object-cover shadow-sm border-2 border-white dark:border-slate-700"
                alt={student.student.user.username}
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800" />
            </div>
            <div>
              <p className="font-black uppercase italic text-base text-slate-700 dark:text-slate-200 leading-tight">
                {student.student.user.username}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                NIS: {student.student.nis} •{" "}
                {student.classroomConfig.classroom.name}
              </p>
            </div>
          </div>

          {type === "STATUS" ? (
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-slate-400 italic px-2 tracking-widest">
                Status Akademik Baru
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["ACTIVE", "MUTATED", "DROPOUT", "GRADUATED"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    title={`Ubah ke status ${s}`}
                    onClick={() => setSelectedStatus(s as any)}
                    className={`py-4 px-4 rounded-3xl font-black text-[10px] uppercase transition-all border-2 ${
                      selectedStatus === s
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-500/20"
                        : "bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:border-indigo-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 relative">
              <div className="flex justify-between items-center px-2">
                <p className="text-[10px] font-black uppercase text-slate-400 italic tracking-widest">
                  Cari & Pilih Kelas Tujuan
                </p>
              </div>

              <div className="relative group">
                <div className="relative">
                  <HiOutlineSearch
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    title="Cari nama kelas"
                    placeholder="Ketik nama kelas (Contoh: X IPA 1)"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-100 dark:bg-slate-800 rounded-4xl border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 font-bold text-sm outline-none transition-all"
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-110 mt-3 w-full bg-white dark:bg-slate-900 rounded-4xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 animate-in slide-in-from-top-2 duration-200 overflow-hidden">
                    <div className="max-h-60 overflow-y-auto">
                      {filteredConfigs.length > 0 ? (
                        filteredConfigs.map((c) => (
                          <button
                            key={c.classroomConfigId}
                            type="button"
                            title={`Pilih ${c.classroom.name}`}
                            onClick={() => {
                              setTargetConfigId(c.classroomConfigId);
                              setSearchTerm(c.classroom.name);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-7 py-4 text-left flex items-center justify-between transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${
                              targetConfigId === c.classroomConfigId
                                ? "bg-indigo-50 dark:bg-indigo-900/10 border-l-4 border-indigo-600"
                                : ""
                            }`}
                          >
                            <span
                              className={`text-xs font-black uppercase tracking-tight ${targetConfigId === c.classroomConfigId ? "text-indigo-600" : "text-slate-600 dark:text-slate-300"}`}
                            >
                              {c.classroom.name}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                              {c.period?.academicYear || "Aktif"}
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="p-10 text-center space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic">
                            Kelas tidak ditemukan
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="button"
              title="Konfirmasi Perubahan"
              onClick={
                type === "STATUS" ? handleUpdateStatus : handleTransferClass
              }
              disabled={type === "TRANSFER" && !targetConfigId}
              className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-4xl font-black uppercase italic tracking-tighter hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale"
            >
              {type === "STATUS" ? (
                <HiOutlineCheckBadge size={22} />
              ) : (
                <HiOutlineArrowsRightLeft size={22} />
              )}
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
