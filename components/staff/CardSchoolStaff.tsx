import { SchoolStaff } from "@/redux/features/staff/types";
import React from "react";
import {
  FiCheck,
  FiX,
  FiCreditCard,
  FiPhone,
  FiEdit3,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";

interface StaffProps {
  staff: SchoolStaff;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onEdit: (staff: any) => void;
  onDelete: (id: string) => void;
}

const CardSchoolStaff: React.FC<StaffProps> = ({
  staff,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const { user, isActive, position, staffId, nip, employeeId } = staff;
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800/60 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 dark:hover:border-indigo-500/20 transition-all duration-500">
      <div className="relative flex flex-col">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative shrink-0">
            {/* Outer Glow & Ring Container */}
            <div
              className={`p-1 rounded-[1.75rem] transition-all duration-500 ${
                isActive
                  ? "bg-linear-to-tr from-emerald-500/20 to-indigo-500/20 shadow-lg shadow-emerald-500/5"
                  : "bg-gray-100 dark:bg-slate-800"
              }`}
            >
              {/* Main Avatar Box */}
              <div className="relative h-16 w-16 rounded-[1.4rem] bg-linear-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-xl font-black text-white shadow-inner group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500 overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="drop-shadow-md">{initial}</span>
                )}

                {/* Subtle Overlay Gloss (Efek Kilau) */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-50" />
              </div>
            </div>

            {/* Modern Glassmorphism Status Indicator */}
            {isActive && (
              <div className="absolute -bottom-1.5 -right-1.5 flex items-center justify-center">
                <div className="relative flex items-center justify-center p-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-white dark:border-slate-700 animate-in zoom-in duration-500">
                  <span className="relative flex h-2.5 w-2.5">
                    {/* Efek Wave yang lebih halus */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {user.username}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              {position}
            </p>
          </div>
        </div>

        {/* Info Grid (Bento Style) */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all">
            <div className="flex items-center gap-3">
              <FiCreditCard className="size-4 text-indigo-500" />
              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300 font-mono">
                {nip || employeeId || "NIP_NOT_FOUND"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-transparent hover:border-gray-100 dark:hover:border-white/10 transition-all">
            <div className="flex items-center gap-3">
              <FiPhone className="size-4 text-indigo-500" />
              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                {user.phone || "--- --- ---"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleStatus(staffId, isActive)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 border ${
              isActive
                ? "bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
            }`}
          >
            {isActive ? (
              <>
                <FiX className="size-3.5" /> Suspend
              </>
            ) : (
              <>
                <FiCheck className="size-3.5" /> Activate
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onEdit(staff)}
            className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all"
            title="Edit"
          >
            <FiEdit3 size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(staffId)}
            className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
            title="Hapus"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default CardSchoolStaff;
