"use client";

import React from "react";
import Image from "next/image";
import { FiInfo, FiEdit2, FiTrash2, FiZap, FiCheck } from "react-icons/fi";
import { FaMale, FaFemale, FaFingerprint } from "react-icons/fa";
import { ActionButton } from "../ui/button/ActionButton";
import { Student } from "@/redux/features/student/types";
import { getInitials } from "@/utils/stringHelper";

interface Props {
  students: Student[];
  selectedIds: { studentId: string; userId: string }[];
  setSelectedIds: React.Dispatch<
    React.SetStateAction<{ studentId: string; userId: string }[]>
  >;
  onDetail: (id: string) => void;
  onEdit: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const StudentGridView = ({
  students,
  selectedIds,
  setSelectedIds,
  onDetail,
  onEdit,
  onDelete,
}: Props) => {
  const toggleSelect = (studentId: string, userId: string) => {
    setSelectedIds((prev) => {
      const isExist = prev.some((item) => item.studentId === studentId);
      if (isExist) {
        return prev.filter((item) => item.studentId !== studentId);
      } else {
        return [...prev, { studentId, userId }];
      }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {students.map((s, idx) => {
        const currentId = s.studentId || `idx-${idx}`;
        const isSelected = selectedIds.some(
          (item) => item.studentId === currentId,
        );

        return (
          <div
            key={currentId}
            className={`group relative bg-white dark:bg-slate-900 rounded-4xl p-6 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 overflow-hidden ${
              isSelected
                ? "border-indigo-500 ring-8 ring-indigo-500/5 shadow-2xl"
                : "border-slate-50 dark:border-slate-800 shadow-sm"
            }`}
          >
            {/* Selection Checkbox */}
            <button
              type="button"
              title={isSelected ? "Batal pilih" : "Pilih siswa"}
              onClick={() => toggleSelect(currentId, s.user?.userId || "")}
              className={`absolute top-5 left-5 z-20 p-2.5 rounded-2xl transition-all duration-300 transform active:scale-90 ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40"
                  : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-300 border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2"
              }`}
            >
              <FiCheck
                size={18}
                className={`${isSelected ? "scale-110" : "scale-50 opacity-0"}`}
              />
            </button>

            {/* Status Indicator */}
            <div className="absolute top-6 right-6 flex h-3 w-3 z-10">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${s.status === "AKTIF" ? "bg-emerald-400" : "bg-rose-400"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${s.status === "AKTIF" ? "bg-emerald-500" : "bg-rose-500"}`}
              />
            </div>

            {/* Avatar Section */}
            <div className="flex justify-center mb-4">
              <div className="relative inline-block">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-3xl transition-transform duration-700 group-hover:rotate-6 shadow-inner">
                  <div className="relative h-28 w-28 overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center bg-linear-to-br from-indigo-500 to-blue-600 transition-transform duration-500 group-hover:scale-105">
                    {s.user?.avatar ? (
                      <Image
                        src={s.user.avatar}
                        alt={s.user.username}
                        fill
                        sizes="112px"
                        className="object-cover"
                        priority={idx < 4}
                      />
                    ) : (
                      <span className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-md">
                        {getInitials(s.user?.username)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 border border-slate-100 dark:border-slate-800">
                  <FiZap
                    size={14}
                    className="text-amber-500 fill-amber-500 animate-pulse"
                  />
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="text-center mb-5 space-y-1">
              <h3 className="font-black text-slate-900 dark:text-white uppercase italic tracking-tight text-base leading-tight group-hover:text-indigo-600 transition-colors truncate px-2">
                {s.user?.username || "No Name"}
              </h3>
              <div className="flex items-center justify-center gap-2 text-indigo-500/80">
                <FaFingerprint size={12} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                  NIS: {s.nis || "---"}
                </p>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-4 gap-2 pt-5 border-t border-slate-50 dark:border-slate-800/60">
              <div
                title={s.user?.gender === "L" ? "Laki-laki" : "Perempuan"}
                className={`flex items-center justify-center p-2.5 rounded-2xl border transition-all ${
                  s.user?.gender === "L"
                    ? "bg-blue-50/50 border-blue-100 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20"
                    : "bg-pink-50/50 border-pink-100 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/20"
                }`}
              >
                {s.user?.gender === "L" ? (
                  <FaMale size={16} />
                ) : (
                  <FaFemale size={16} />
                )}
              </div>

              <ActionButton
                icon={<FiInfo size={18} />}
                color="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/20"
                onClick={() => onDetail(s.studentId)}
                title="Detail"
              />
              <ActionButton
                icon={<FiEdit2 size={18} />}
                color="text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/20"
                onClick={() => onEdit(s)}
                title="Edit"
              />
              <ActionButton
                icon={<FiTrash2 size={18} />}
                color="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20"
                onClick={() => onDelete?.(s.studentId)}
                title="Hapus"
              />
            </div>

            <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        );
      })}
    </div>
  );
};
