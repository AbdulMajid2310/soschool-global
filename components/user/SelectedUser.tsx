"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchFilteredUsersApi } from "@/redux/features/user/service";
import { User } from "@/redux/features/user/types";

interface SelectedUserProps {
  onSelect: (user: User) => void;
  role: "teacher" | "student" | "parent" | "staff";
  placeholder?: string;
  label?: string;
}

// --- Main Component ---
export const SelectedUser = ({
  onSelect,
  role,
  placeholder = "Cari user yang sudah terdaftar...",
  label = "Cari User Eksis",
}: SelectedUserProps) => {
  const schoolId = useSchoolId();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch data saat modal dibuka
  useEffect(() => {
    const loadUsers = async () => {
      if (showModal && schoolId) {
        setLoading(true);
        try {
          const result = await fetchFilteredUsersApi(schoolId, role, false);
          setUsers(result.data);
        } catch (error) {
          console.error("Gagal memuat user:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadUsers();
  }, [showModal, schoolId, role]);

  const filteredUsers = useMemo(() => {
    const s = search.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s),
    );
  }, [users, search]);

  const handleClose = () => {
    setShowModal(false);
    setSearch("");
  };

  const handlePickUser = (user: User) => {
    onSelect(user);
    handleClose();
  };

  return (
    <section>
      <div className="space-y-3">
        <div
          onClick={() => setShowModal(true)}
          className="relative group cursor-pointer"
        >
          <HiOutlineUserGroup
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors z-10"
            size={20}
          />
          <div className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-indigo-500/30 rounded-2xl font-bold text-sm transition-all text-slate-400">
            {placeholder}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in"
            onClick={handleClose}
          />

          <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 w-full max-w-xl flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200">
                  <HiOutlineUserCircle size={22} />
                </div>
                <h2 className="text-lg font-black uppercase italic text-slate-800 dark:text-white leading-none">
                  Pilih Akun
                </h2>
              </div>
              <button
                type="button"
                title="hapus"
                onClick={handleClose}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-6">
              <div className="relative group">
                <HiOutlineMagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  autoFocus
                  placeholder="Cari berdasarkan nama atau email..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-xl font-bold text-sm outline-none transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center py-10 opacity-40">
                  <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest italic">
                    Mencari User...
                  </p>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="space-y-2">
                  {filteredUsers.map((u) => (
                    <button
                      key={u.userId}
                      onClick={() => handlePickUser(u)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/50 dark:hover:bg-indigo-900/20 rounded-2xl border-2 border-transparent hover:border-indigo-500/20 transition-all group"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <img
                          src={
                            u.avatar ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${u.username}`
                          }
                          alt="image"
                          className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <p className="text-sm font-black uppercase italic leading-none text-slate-700 dark:text-white">
                            {u.username}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter truncate max-w-50">
                            {u.email}
                          </p>
                        </div>
                      </div>
                      <HiOutlineCheckCircle
                        className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        size={24}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center opacity-30 italic font-black text-[10px] uppercase tracking-widest">
                  User tidak ditemukan
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
