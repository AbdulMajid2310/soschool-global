"use client";

import React from "react";
import {
  HiOutlineFingerPrint,
  HiOutlineIdentification,
  HiOutlineCalendarDays,
  HiOutlineXMark,
} from "react-icons/hi2";
import { User } from "@/redux/features/user/types";

interface ModalStudentIdentityProps {
  isOpen: boolean;
  user: User;
  data: {
    nis: string;
    nisn: string;
    entryYear: string;
  };
  updateData: (id: string, field: string, val: string) => void;
  onClose: () => void;
}

const ModalStudentIdentity: React.FC<ModalStudentIdentityProps> = ({
  isOpen,
  user,
  data,
  updateData,
  onClose,
}) => {
  if (!isOpen || !user) return null;

  const avatarUrl =
    user.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Close Button */}
        <div className="absolute top-6 right-6 z-50">
          <button
            type="button"
            title="keluar"
            onClick={onClose}
            className="group flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all duration-300"
          >
            <HiOutlineXMark
              size={24}
              className="text-slate-400 group-hover:text-rose-500"
            />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
          {/* Kiri: Profil Visual */}
          <div className="flex flex-col items-center text-center space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-8 lg:pb-0 lg:pr-8">
            <img
              src={avatarUrl}
              className="w-24 h-24 lg:w-36 lg:h-36 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white dark:border-slate-800"
              alt={user.username}
            />
            <div className="space-y-1">
              <h5 className="text-lg font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                {user.username}
              </h5>
              <span className="inline-flex px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest">
                ID: {user.registrationNumber || "NEW STUDENT"}
              </span>
            </div>
          </div>

          {/* Kanan: Form */}
          <div className="space-y-5">
            {/* NIS - Wajib */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-1.5 ml-1">
                <HiOutlineFingerPrint size={14} />
                NIS <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nomor Induk Siswa..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none transition-all"
                value={data.nis}
                onChange={(e) => updateData(user.userId, "nis", e.target.value)}
              />
            </div>

            {/* NISN - Opsional */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5 ml-1">
                <HiOutlineIdentification size={14} />
                NISN (Opsional)
              </label>
              <input
                type="text"
                placeholder="Nomor Induk Siswa Nasional..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-bold border-2 border-transparent focus:border-slate-300 outline-none transition-all"
                value={data.nisn}
                onChange={(e) =>
                  updateData(user.userId, "nisn", e.target.value)
                }
              />
            </div>

            {/* Tahun Masuk */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5 ml-1">
                <HiOutlineCalendarDays size={14} />
                Tahun Masuk
              </label>
              <input
                title="tahun masuk"
                type="number"
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs font-bold border-2 border-transparent focus:border-slate-300 outline-none transition-all"
                value={data.entryYear}
                onChange={(e) =>
                  updateData(user.userId, "entryYear", e.target.value)
                }
              />
            </div>

            <button
              onClick={onClose}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-xl shadow-indigo-500/20 mt-4 transition-all active:scale-95"
            >
              Simpan Identitas Siswa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalStudentIdentity;
