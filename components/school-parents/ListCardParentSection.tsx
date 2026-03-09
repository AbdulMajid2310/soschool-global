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
import { SchoolParent } from "@/redux/features/school-parents/types";

interface ListCardParentSectionProps {
  loading: boolean;
  parents: SchoolParent[];
  filteredParents: SchoolParent[];
  onEdit: (parent: SchoolParent) => void;
  onDelete: (parentId: string, username: string) => void;
}

export const ListCardParentSection = ({
  loading,
  parents,
  filteredParents,
  onEdit,
  onDelete,
}: ListCardParentSectionProps) => {
  if (loading && parents.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 animate-pulse"
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
      <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
        <HiOutlineUserCircle
          size={64}
          className="mx-auto text-slate-200 mb-4"
        />
        <p className="text-slate-400 font-black uppercase italic tracking-widest">
          Data tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredParents.map((parent) => {
        const username = parent.user.username;
        const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${username}&backgroundColor=4f46e5&textColor=ffffff`;

        return (
          <div
            key={parent.parentId}
            className="group bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative overflow-hidden"
          >
            {/* Status Badge */}
            <div
              className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                parent.isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-rose-50 text-rose-600 border-rose-100"
              }`}
            >
              {parent.isActive ? "Aktif" : "Suspend"}
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={avatarUrl}
                alt={username}
                className="w-14 h-14 rounded-2xl shadow-inner border border-slate-50 dark:border-slate-800 group-hover:scale-110 transition-transform duration-500"
              />
              <div>
                <h3 className="font-black text-slate-800 dark:text-white uppercase italic leading-tight tracking-tight">
                  {username}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                  <HiOutlineIdentification size={14} />
                  <span className="text-[10px] font-bold font-mono tracking-widest">
                    {parent.user.registrationNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <HiOutlineEnvelope size={14} />
                </div>
                <span className="text-xs font-bold truncate">
                  {parent.user.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <div className="p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <HiOutlinePhone size={14} />
                </div>
                <span className="text-xs font-bold">
                  {parent.user.phone || "Tidak ada nomor"}
                </span>
              </div>
            </div>

            {/* Students List (Children) */}
            <div className="mb-8">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 mb-3 italic">
                Relasi Siswa
              </p>
              <div className="flex flex-wrap gap-2">
                {parent.students.map((student) => (
                  <div
                    key={student.studentId}
                    className="px-3 py-1 bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-xl italic"
                  >
                    <p> {student?.user?.username}</p>
                    <p>NIS : {student.nis}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800">
              <button
                type="button"
                onClick={() => onEdit(parent)}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-500 rounded-2xl transition-all duration-300 group/btn"
              >
                <HiOutlinePencilSquare size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">
                  Edit
                </span>
              </button>
              <button
                type="button"
                title="hapus"
                onClick={() => onDelete(parent.parentId, username)}
                className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 rounded-2xl transition-all duration-300"
              >
                <HiOutlineTrash size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
