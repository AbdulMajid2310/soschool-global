"use client";

import React from "react";
import {
  HiOutlineUserCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { SchoolParent } from "@/redux/features/school-parents/types";

interface SelectedData {
  parentId: string;
  userId: string;
}

interface ListCardParentSectionProps {
  loading: boolean;
  parents: SchoolParent[];
  filteredParents: SchoolParent[];
  onEdit: (parent: SchoolParent) => void;
  onDelete: (parentId: string, username: string) => void;
  selectedIds: SelectedData[];
  setSelectedIds: React.Dispatch<React.SetStateAction<SelectedData[]>>;
}

export const ListCardParentSection = ({
  loading,
  parents,
  filteredParents,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
}: ListCardParentSectionProps) => {
  const handleSelectOne = (parentId: string, userId: string) => {
    setSelectedIds((prev) => {
      const exist = prev.find((i) => i.parentId === parentId);
      if (exist) return prev.filter((i) => i.parentId !== parentId);
      return [...prev, { parentId, userId }];
    });
  };

  if (loading && parents.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 animate-pulse"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-full"></div>
              <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredParents.length === 0) {
    return (
      <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-4xl border-4 border-dashed border-slate-50 dark:border-slate-800 animate-in fade-in duration-500">
        <HiOutlineUserCircle
          size={80}
          className="mx-auto text-slate-100 dark:text-slate-800 mb-4"
        />
        <h3 className="text-xl font-black text-slate-300 uppercase italic tracking-tighter">
          Data Wali Tidak Ditemukan
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {filteredParents.map((parent) => {
        const username = parent.user.username;
        const isSelected = selectedIds.some(
          (i) => i.parentId === parent.parentId,
        );
        const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=4f46e5&textColor=ffffff`;

        return (
          <div
            key={parent.parentId}
            className={`group relative bg-white dark:bg-slate-900 p-6 rounded-4xl border-2 transition-all duration-500 overflow-hidden ${
              isSelected
                ? "border-indigo-600 shadow-2xl shadow-indigo-500/10 ring-8 ring-indigo-500/5"
                : "border-slate-50 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-500/20 shadow-sm"
            }`}
          >
            {/* Checkbox Overlay */}
            <button
              type="button"
              title={isSelected ? "Batal pilih" : "Pilih wali"}
              onClick={() =>
                handleSelectOne(parent.parentId, parent.user.userId)
              }
              className={`absolute top-6 left-6 z-10 p-2 rounded-xl transition-all shadow-sm ${
                isSelected
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-200 opacity-0 group-hover:opacity-100 hover:text-indigo-500"
              }`}
            >
              {isSelected ? (
                <FiCheckSquare size={18} />
              ) : (
                <FiSquare size={18} />
              )}
            </button>

            {/* Status Badge */}
            <div
              className={`absolute top-6 right-6 px-3 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border-2 ${
                parent.isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/20"
                  : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/20"
              }`}
            >
              {parent.isActive ? "Aktif" : "Suspend"}
            </div>

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mt-4 mb-8">
              <img
                src={avatarUrl}
                alt={username}
                className="w-20 h-20 rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 mb-4 group-hover:scale-110 transition-transform duration-500"
              />
              <h3 className="font-black text-slate-800 dark:text-white uppercase italic text-lg leading-none tracking-tighter">
                {username}
              </h3>
              <div className="flex items-center gap-1.5 text-slate-400 mt-2">
                <HiOutlineIdentification
                  size={14}
                  className="text-indigo-500"
                />
                <span className="text-[10px] font-black tracking-widest uppercase">
                  REG: {parent.user.registrationNumber}
                </span>
              </div>
            </div>

            {/* Students List */}
            <div className="mb-8">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-3 italic">
                Relasi Siswa
              </p>
              <div className="flex flex-wrap gap-2">
                {parent.students.map((student) => (
                  <div
                    key={student.studentId}
                    className="px-3 py-1.5 bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-xl"
                  >
                    <span>{student?.user?.username}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
              <button
                type="button"
                title="Edit Data"
                onClick={() => onEdit(parent)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-500 rounded-2xl transition-all duration-300 active:scale-95 border border-transparent hover:border-indigo-400"
              >
                <HiOutlinePencilSquare size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">
                  Detail
                </span>
              </button>
              <button
                type="button"
                title="Hapus Wali"
                onClick={() => onDelete(parent.parentId, username)}
                className="p-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 rounded-2xl transition-all duration-300 active:scale-95 border border-transparent hover:border-rose-400"
              >
                <HiOutlineTrash size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
