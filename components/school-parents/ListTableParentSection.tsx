"use client";

import React from "react";
import {
  HiOutlineUserCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { SchoolParent } from "@/redux/features/school-parents/types";

interface SelectedData {
  parentId: string;
  userId: string;
}

interface ListTableParentSectionProps {
  loading: boolean;
  parents: SchoolParent[];
  filteredParents: SchoolParent[];
  onEdit: (parent: SchoolParent) => void;
  onDelete: (parentId: string, username: string) => void;
  selectedIds: SelectedData[];
  setSelectedIds: React.Dispatch<React.SetStateAction<SelectedData[]>>;
}

export const ListTableParentSection = ({
  loading,
  parents,
  filteredParents,
  onEdit,
  onDelete,
  selectedIds,
  setSelectedIds,
}: ListTableParentSectionProps) => {
  const handleSelectOne = (parentId: string, userId: string) => {
    setSelectedIds((prev) => {
      const exist = prev.find((i) => i.parentId === parentId);
      if (exist) return prev.filter((i) => i.parentId !== parentId);
      return [...prev, { parentId, userId }];
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
              <th className="px-6 py-6 w-10">Pilih</th>
              <th className="px-6 py-6">Identitas Wali</th>
              <th className="px-6 py-6">Informasi Kontak</th>
              <th className="px-6 py-6">Daftar Anak</th>
              <th className="px-6 py-6">Status</th>
              <th className="px-6 py-6 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-sm">
            {loading && parents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Sinkronisasi Data Personalia...
                    </span>
                  </div>
                </td>
              </tr>
            ) : filteredParents.length > 0 ? (
              filteredParents.map((parent) => {
                const isSelected = selectedIds.some(
                  (i) => i.parentId === parent.parentId,
                );
                return (
                  <tr
                    key={parent.parentId}
                    className={`group transition-all ${
                      isSelected
                        ? "bg-indigo-50/30 dark:bg-indigo-500/5"
                        : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        title={isSelected ? "Batal pilih" : "Pilih wali"}
                        onClick={() =>
                          handleSelectOne(parent.parentId, parent.user.userId)
                        }
                        className={`p-2 rounded-xl transition-all ${
                          isSelected
                            ? "text-indigo-600"
                            : "text-slate-300 hover:text-indigo-400"
                        }`}
                      >
                        {isSelected ? (
                          <FiCheckSquare size={20} />
                        ) : (
                          <FiSquare size={20} />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2.5 bg-white dark:bg-slate-800 border-2 transition-all rounded-2xl shadow-sm ${
                            isSelected
                              ? "border-indigo-200 text-indigo-600"
                              : "border-slate-50 dark:border-slate-700 text-slate-400 group-hover:border-indigo-100"
                          }`}
                        >
                          <HiOutlineUserCircle size={28} />
                        </div>
                        <div>
                          <div className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight text-base italic">
                            {parent.user.username}
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            REG: {parent.user.registrationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-600 dark:text-slate-300 lowercase text-xs">
                        {parent.user.email}
                      </div>
                      <div className="text-[10px] text-indigo-500 font-black mt-1 uppercase tracking-widest">
                        {parent.user.phone || "---"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {parent.students.map((student) => (
                          <div
                            key={student.studentId}
                            className="px-3 py-1.5 bg-indigo-50/50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-xl border border-indigo-100/50 dark:border-indigo-500/20 shadow-sm"
                          >
                            {student.user.username}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border-2 ${
                          parent.isActive
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/5 dark:border-emerald-500/20"
                            : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            parent.isActive ? "bg-emerald-600" : "bg-rose-600"
                          }`}
                        ></span>
                        {parent.isActive ? "Aktif" : "Suspend"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(parent)}
                          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-90 border border-transparent hover:border-indigo-100"
                          title="Edit Profile"
                        >
                          <HiOutlinePencilSquare size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onDelete(parent.parentId, parent.user.username)
                          }
                          className="p-3 text-slate-400 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-90 border border-transparent hover:border-rose-100"
                          title="Hapus Data"
                        >
                          <HiOutlineTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-32 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-4xl text-slate-200">
                      <HiOutlineUserCircle size={80} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 font-black text-xl uppercase italic tracking-tighter">
                        Data Tidak Terdeteksi
                      </p>
                      <p className="text-slate-300 text-[10px] uppercase font-bold tracking-[0.3em]">
                        Gunakan kata kunci lain untuk pencarian
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
