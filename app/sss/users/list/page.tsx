"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCheckBadge,
  HiOutlineXCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineUsers,
  HiOutlineArrowLeft,
  HiOutlineArrowPath, // Icon untuk Refresh
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { deleteUser, getAllUsers } from "@/redux/features/user/thunk";
import { useRouter } from "next/navigation";
import { BiSolidUserDetail } from "react-icons/bi";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function UserListSection() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSearch = () => {
    setSearchQuery(searchTerm.toLowerCase());
  };

  // Fungsi Refresh untuk reset state dan ambil data ulang
  const handleRefresh = () => {
    setSearchTerm("");
    setSearchQuery("");
    dispatch(getAllUsers());
    toast.success("Data diperbarui", {
      icon: "🔄",
      style: {
        borderRadius: "15px",
        background: "#333",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "bold",
      },
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery) ||
        (user.phone && user.phone.includes(searchQuery)) ||
        (user.registrationNumber &&
          user.registrationNumber.toLowerCase().includes(searchQuery)),
    );
  }, [users, searchQuery]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user ${name}?`)) {
      const resultAction = await dispatch(deleteUser(id));
      if (deleteUser.fulfilled.match(resultAction)) {
        toast.success("User berhasil dihapus");
      } else {
        toast.error("Gagal menghapus user");
      }
    }
  };

  const handleDetailUser = (userId: string) => {
    sessionStorage.setItem("userId", userId);
    router.push("list/detail");
  };

  if (loading && users.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-64 bg-slate-100 dark:bg-slate-800 rounded-4xl w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in p-4 fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <ButtonBackUI />
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
              List Pengguna
            </h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mt-1">
              Management Database User
            </p>
          </div>
        </div>

        {/* Input Pencarian & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <HiOutlineMagnifyingGlass
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Cari User..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase italic tracking-widest transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
            >
              Cari
            </button>

            {/* Button Refresh */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-90 shadow-sm ${loading ? "animate-spin" : ""}`}
              title="Refresh Data"
            >
              <HiOutlineArrowPath size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.userId}
            className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
          >
            {/* ... (Konten User Card tetap sama) */}
            <div className="absolute top-4 right-4">
              {user.isVerified ? (
                <div
                  className="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 p-1.5 rounded-full"
                  title="Verified"
                >
                  <HiOutlineCheckBadge size={18} />
                </div>
              ) : (
                <div
                  className="text-amber-500 bg-amber-50 dark:bg-amber-500/10 p-1.5 rounded-full"
                  title="Pending"
                >
                  <HiOutlineXCircle size={18} />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 rounded-3xl overflow-hidden mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-md">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`
                  }
                  alt={user.username}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="text-base font-black dark:text-white uppercase tracking-tight line-clamp-1 italic">
                {user.username}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 mb-4">
                {user.registrationNumber || "No Register ID"}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <HiOutlineEnvelope size={14} />
                </div>
                <span className="text-[11px] font-bold truncate">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <HiOutlinePhone size={14} />
                </div>
                <span className="text-[11px] font-bold">
                  {user.phone || "-"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                title="detail"
                onClick={() => handleDetailUser(user.userId)}
                className="flex items-center justify-center gap-2 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase italic"
              >
                <BiSolidUserDetail size={16} />
              </button>
              <button
                type="button"
                title="edit"
                className="flex items-center justify-center gap-2 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase italic"
              >
                <HiOutlinePencilSquare size={16} />
              </button>
              <button
                type="button"
                title="hapus"
                onClick={() => handleDelete(user.userId, user.username)}
                className="flex items-center justify-center gap-2 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all text-[10px] font-black uppercase italic"
              >
                <HiOutlineTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <div className="p-20 text-center bg-white dark:bg-slate-900 rounded-4xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <HiOutlineUsers size={40} />
          </div>
          <h3 className="text-lg font-black dark:text-white italic uppercase tracking-tighter">
            {searchQuery ? "Data Tidak Ditemukan" : "Database Kosong"}
          </h3>
          <button
            onClick={handleRefresh}
            className="mt-4 text-indigo-500 text-[10px] font-black uppercase underline decoration-2 underline-offset-4"
          >
            Tampilkan Semua Data
          </button>
        </div>
      )}
    </div>
  );
}
