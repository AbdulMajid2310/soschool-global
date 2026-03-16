"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchFilteredUsersApi } from "@/redux/features/user/service";
import { User } from "@/redux/features/user/types";

interface CardUserModalProps {
  onSelect: (user: User) => void;
  role: "teacher" | "student" | "parent" | "staff";
  placeholder?: string;
  selectedIds?: string[];
}

export const CardUserModal = ({
  onSelect,
  role,
  placeholder = "Cari user global...",
  selectedIds = [],
}: CardUserModalProps) => {
  const schoolId = useSchoolId();
  const [localQuery, setLocalQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    if (!schoolId) return;
    setLoading(true);
    try {
      const result = await fetchFilteredUsersApi(schoolId, role, false);
      setUsers(result.data);
    } catch (error) {
      console.error("Gagal memuat user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [schoolId, role]);

  const filteredUsers = useMemo(() => {
    const s = localQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(s) ||
        (u.email && u.email.toLowerCase().includes(s)) ||
        (u.registrationNumber && u.registrationNumber.includes(s)),
    );
  }, [users, localQuery]);

  return (
    <div className="w-full space-y-4">
      {/* Search & Refresh Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/20 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
        {/* Label Teks Kiri */}
        <div className="flex items-center gap-3">
          <div className="size-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <HiOutlineMagnifyingGlass size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase italic leading-none text-slate-800 dark:text-white">
              Eksplorasi Database
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Cari kandidat {role} global
            </p>
          </div>
        </div>

        {/* Search & Action Group */}
        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="relative group w-full md:w-80 lg:w-96">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <HiOutlineMagnifyingGlass size={18} strokeWidth={2.5} />
            </div>

            <input
              type="text"
              placeholder={placeholder}
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none font-bold text-xs shadow-sm focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          {/* Tombol Refresh dengan Teks Subtil */}
          <button
            type="button"
            onClick={loadUsers}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95 disabled:opacity-50 shadow-sm group/btn"
            title="Sinkronisasi Ulang"
          >
            <HiOutlineArrowPath
              size={18}
              strokeWidth={2.5}
              className={`${loading ? "animate-spin" : "group-hover/btn:rotate-180"} transition-transform duration-700`}
            />
            <span className="text-[10px] font-black uppercase tracking-tighter hidden sm:block">
              Refresh
            </span>
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="relative animate-in zoom-in-95 duration-300">
        {loading ? (
          <div className="flex flex-col items-center py-20 opacity-40">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest italic">
              Sinkronisasi Database...
            </p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
            {filteredUsers.map((u) => (
              <button
                key={u.userId}
                onClick={() => onSelect(u)}
                className="group relative w-full flex items-center sm:justify-between p-4 bg-white dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 rounded-4xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 text-left overflow-hidden"
              >
                <div className="flex flex-row sm:flex-col sm:justify-center items-center gap-4 relative z-10 w-full group/card">
                  {/* Avatar Section dengan squircle style & glow effect */}
                  <div className="relative">
                    {/* Subtle Glow behind avatar */}
                    <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-400/5 blur-2xl rounded-full scale-150 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    <div className="relative">
                      <img
                        src={
                          u.avatar ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${u.username}`
                        }
                        alt={u.username}
                        className="sm:size-24 size-16 rounded-3xl object-cover shadow-xl border-4 border-white dark:border-slate-800 group-hover/card:scale-105 group-hover/card:-rotate-2 transition-all duration-500 ease-out"
                      />
                      {/* Online/Status Badge dengan animasi ping */}
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-sm"></span>
                      </span>
                    </div>
                  </div>

                  {/* Info Content Section */}
                  <div className="text-center sm:w-full ">
                    <div className="space-y-0.5 px-2">
                      <h4 className="text-[13px] font-black line-clamp-1 uppercase italic tracking-tight text-slate-800 dark:text-white group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors truncate">
                        {u.username}
                      </h4>

                      {/* Badge ID yang lebih rapi */}
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-black rounded-lg border border-slate-200/50 dark:border-slate-700/50 tracking-tracking-widest">
                          ID-{u.registrationNumber || "NEW"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Indicator */}
                <div
                  className={`absolute top-4 right-4 flex items-center justify-center size-9 rounded-full transition-all duration-300 ${
                    selectedIds.includes(u.userId)
                      ? "bg-emerald-500 shadow-lg shadow-emerald-200 dark:shadow-none"
                      : "bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600"
                  }`}
                >
                  {selectedIds.includes(u.userId) ? (
                    /* Icon jika sudah terpilih (Check) */
                    <HiOutlineCheckCircle
                      className="text-white animate-in zoom-in duration-300"
                      size={24}
                    />
                  ) : (
                    /* Icon jika belum terpilih (Plus/Add) */
                    <HiOutlineCheckCircle
                      className="text-slate-300 group-hover:text-white transition-all transform scale-75 group-hover:scale-110"
                      size={24}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="opacity-30 italic font-black text-[10px] uppercase tracking-widest text-slate-500">
              User tidak ditemukan dalam database global
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl text-center border border-indigo-100/50 dark:border-indigo-500/10">
          <p className="text-[9px] font-black text-indigo-600/60 dark:text-indigo-400/60 uppercase tracking-[0.2em]">
            Sistem hanya menampilkan user yang belum berafiliasi dengan sekolah
            ini
          </p>
        </div>
      </div>
    </div>
  );
};
