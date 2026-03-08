"use client";

import React from "react";
import { FiInfo, FiEdit2, FiMapPin, FiTrash2, FiZap } from "react-icons/fi";
import { FaMale, FaFemale, FaFingerprint } from "react-icons/fa";
import { ActionButton } from "../ui/button/ActionButton";
import { Student } from "@/redux/features/student/types";

interface Props {
  students: Student[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
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
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {students.map((s, idx) => {
        const isSelected = selectedIds.includes(s.studentId);

        return (
          <div
            key={s.studentId || idx}
            className={`group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-3 overflow-hidden ${
              isSelected
                ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-100 dark:shadow-none"
                : "border-slate-100 dark:border-slate-800"
            }`}
          >
            {/* Checkbox Selection */}
            <div className="absolute top-6 left-6 z-10">
              <input
                type="checkbox"
                title="select"
                checked={isSelected}
                onChange={() => toggleSelect(s.studentId)}
                className="w-5 h-5 rounded-lg border-2 border-slate-200 accent-indigo-600 cursor-pointer transition-transform group-hover:scale-110"
              />
            </div>

            {/* Status Indicator (Pulse) */}
            <div className="absolute top-6 right-6 flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${
                  s.isStatus === "AKTIF" ? "bg-emerald-400" : "bg-rose-400"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  s.isStatus === "AKTIF" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              ></span>
            </div>

            {/* 1. Avatar Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-[2.2rem] transition-transform duration-500 group-hover:rotate-6">
                  <img
                    src={
                      s.user.avatar ||
                      `https://ui-avatars.com/api/?name=${s.user.username}&background=6366f1&color=fff&bold=true`
                    }
                    className="w-24 h-24 rounded-[1.8rem] object-cover shadow-2xl shadow-indigo-500/10"
                    alt={s.user.username}
                  />
                </div>
                {/* Ikon Zap saat hover seperti di Table View */}
                <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                  <FiZap
                    size={12}
                    className="text-indigo-500 fill-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Primary Info */}
            <div className="space-y-4 text-center mb-6">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white uppercase italic tracking-tighter text-base leading-tight group-hover:text-indigo-600 transition-colors truncate px-2">
                  {s.user.username}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2 text-slate-400">
                  <FaFingerprint size={12} className="opacity-40" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {s.nis}
                  </p>
                </div>
              </div>

              {/* Address Pill */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-500/10 transition-all">
                <FiMapPin size={14} className="text-indigo-500 shrink-0" />
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
                  {s.user?.address?.district || "WILAYAH BELUM DISET"}
                </span>
              </div>
            </div>

            {/* 3. Footer Section */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
              <div
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-colors ${
                  s.user.gender === "L"
                    ? "bg-blue-50/50 border-blue-100 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20"
                    : "bg-pink-50/50 border-pink-100 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/20"
                }`}
              >
                {s.user.gender === "L" ? (
                  <FaMale size={12} />
                ) : (
                  <FaFemale size={12} />
                )}
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {s.user.gender === "L" ? "Laki-laki" : "Perempuan"}
                </span>
              </div>

              <div className="flex gap-2">
                <ActionButton
                  icon={<FiInfo size={16} />}
                  color="text-indigo-500"
                  onClick={() => onDetail(s.studentId)}
                  title="Detail Siswa"
                />
                <ActionButton
                  icon={<FiEdit2 size={16} />}
                  color="text-amber-500"
                  onClick={() => onEdit(s)}
                  title="Edit Siswa"
                />
                <ActionButton
                  icon={<FiTrash2 size={16} />}
                  color="text-rose-500"
                  onClick={() => onDelete?.(s.studentId)}
                  title="Hapus Siswa"
                />
              </div>
            </div>

            {/* Decorative Top Flare */}
            <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        );
      })}
    </div>
  );
};
