"use client";

import React from "react";
import {
  HiOutlineUserCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { SchoolParent } from "@/redux/features/school-parents/types"; // Sesuaikan path types Anda

interface ListTableParentSectionProps {
  loading: boolean;
  parents: SchoolParent[];
  filteredParents: SchoolParent[];
  onEdit: (parent: SchoolParent) => void;
  onDelete: (parentId: string, username: string) => void;
}

export const ListTableParentSection = ({
  loading,
  parents,
  filteredParents,
  onEdit,
  onDelete,
}: ListTableParentSectionProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm shadow-slate-200/50">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
              <th className="px-6 py-5">Identitas Wali</th>
              <th className="px-6 py-5">Informasi Kontak</th>
              <th className="px-6 py-5">Daftar Anak</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-sm">
            {loading && parents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Sinkronisasi Data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : filteredParents.length > 0 ? (
              filteredParents.map((parent) => (
                <tr
                  key={parent.parentId}
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all rounded-2xl shadow-sm">
                        <HiOutlineUserCircle size={24} />
                      </div>
                      <div>
                        <div className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">
                          {parent.user.username}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono italic">
                          ID: {parent.user.registrationNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-600 dark:text-slate-400 lowercase">
                      {parent.user.email}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {parent.user.phone || "No Phone"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {parent.students.map((student) => (
                        <div
                          key={student.studentId}
                          className="px-2.5 py-1 bg-indigo-50/50 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase rounded-lg border border-indigo-100/50 dark:border-indigo-500/10"
                        >
                          {student.user.username}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        parent.isActive
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          parent.isActive ? "bg-emerald-600" : "bg-rose-600"
                        }`}
                      ></span>
                      {parent.isActive ? "Aktif" : "Suspend"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(parent)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all active:scale-90"
                        title="Edit Profile"
                      >
                        <HiOutlinePencilSquare size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          onDelete(parent.parentId, parent.user.username)
                        }
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all active:scale-90"
                        title="Hapus Data"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-slate-200">
                      <HiOutlineUserCircle size={64} />
                    </div>
                    <p className="text-slate-400 font-bold text-sm tracking-tight">
                      Data tidak ditemukan
                    </p>
                    <p className="text-slate-300 text-[10px] uppercase font-black tracking-widest">
                      Coba kata kunci lain atau refresh
                    </p>
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
