"use client";

import React from "react";
import { FiEdit2, FiInfo, FiTrash2 } from "react-icons/fi";
import { ActionButton } from "../ui/button/ActionButton";
import { StatusBadge } from "../classroom-student/HelperClassroom";
import { Student } from "@/redux/features/student/types";
import Image from "next/image";
import { getInitials } from "@/utils/stringHelper";

// Interface harus sama dengan yang di ListStudentSection
interface SelectedData {
  studentId: string;
  userId: string;
}

interface Props {
  students: Student[];
  selectedIds: SelectedData[];
  setSelectedIds: React.Dispatch<React.SetStateAction<SelectedData[]>>;
  onDetail: (id: string) => void;
  onEdit: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const StudentTableView = ({
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

  const toggleSelectAll = () => {
    if (students.length > 0 && selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      const allSelected = students.map((s) => ({
        studentId: s.studentId,
        userId: s.user?.userId || "",
      }));
      setSelectedIds(allSelected);
    }
  };

  const isAllSelected =
    students.length > 0 && selectedIds.length === students.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400">
              <th className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                <input
                  title="select all"
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-2 border-slate-200 accent-indigo-600 cursor-pointer"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Siswa
              </th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                NIS
              </th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Alamat
              </th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Status
              </th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 text-right">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {students.map((s) => {
              const isSelected = selectedIds.some(
                (item) => item.studentId === s.studentId,
              );

              return (
                <tr
                  key={s.studentId}
                  className={`group transition-all duration-300 ${
                    isSelected
                      ? "bg-indigo-50/50 dark:bg-indigo-500/10"
                      : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-8 py-5">
                    <input
                      title="select row"
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-2 border-slate-200 accent-indigo-600 cursor-pointer"
                      checked={isSelected}
                      onChange={() =>
                        toggleSelect(s.studentId, s.user?.userId || "")
                      }
                    />
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden rounded-2xl shadow-sm bg-linear-to-br from-indigo-500 to-blue-600">
                        {s.user?.avatar ? (
                          <Image
                            src={s.user.avatar}
                            alt={s.user.username || "avatar"}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-sm font-black text-white italic uppercase tracking-tighter">
                            {getInitials(s.user?.username)}
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight uppercase italic">
                          {s.user?.username || "Unknown"}
                        </p>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                          {s.user?.gender === "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-black text-slate-600 dark:text-slate-300">
                    {s.nis}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-200">
                        {s.user?.address?.district || "---"}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">
                        Kecamatan
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {/* Menggunakan s.status sesuai model JSON data terbaru */}
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-1.5 opacity-20 group-hover:opacity-100 transition-all">
                      <ActionButton
                        icon={<FiInfo size={16} />}
                        color="text-indigo-500"
                        onClick={() => onDetail(s.studentId)}
                        title="Detail"
                      />
                      <ActionButton
                        icon={<FiEdit2 size={16} />}
                        color="text-amber-500"
                        onClick={() => onEdit(s)}
                        title="Edit"
                      />
                      <ActionButton
                        icon={<FiTrash2 size={16} />}
                        color="text-rose-500"
                        onClick={() => onDelete?.(s.studentId)}
                        title="Hapus"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
