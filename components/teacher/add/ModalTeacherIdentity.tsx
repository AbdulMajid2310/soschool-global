"use client";

import React from "react";
import { HiOutlineFingerPrint, HiOutlineXMark } from "react-icons/hi2";

type IdType = "nip" | "nuptk" | "niy";

interface ModalTeacherIdentityProps {
  isOpen: boolean;
  user: {
    userId: string;
    username: string;
    avatar?: string;
    registrationNumber?: string;
  };
  data: {
    type: IdType;
    value: string;
  };
  updateData: (id: string, field: "type" | "value", val: string) => void;
  onClose: () => void;
}

const ModalTeacherIdentity: React.FC<ModalTeacherIdentityProps> = ({
  isOpen,
  user,
  data,
  updateData,
  onClose,
}) => {
  if (!isOpen) return null;

  const avatarUrl =
    user.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <div className="absolute top-6 right-6">
          <button
            type="button"
            title="keluar"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <HiOutlineXMark size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Profile Header */}
          <div className="space-y-3">
            <img
              src={avatarUrl}
              className="w-24 h-24 rounded-4xl object-cover mx-auto shadow-xl border-4 border-white dark:border-slate-800"
              alt={user.username}
            />
            <div>
              <h5 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                {user.username}
              </h5>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                REG : {user.registrationNumber}
              </p>
            </div>
          </div>

          <div className="w-full space-y-4">
            <label className="text-[10px] font-black uppercase text-indigo-600 tracking-widest block">
              Pilih Jenis Identitas & Nomor
            </label>

            {/* Type Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              {(["nip", "nuptk", "niy"] as IdType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => updateData(user.userId, "type", t)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase italic transition-all ${
                    data.type === t
                      ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Input Value */}
            <div className="relative">
              <HiOutlineFingerPrint
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                autoFocus
                type="text"
                placeholder={`Masukkan nomor ${data.type.toUpperCase()}...`}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-sm font-bold border-2 border-transparent focus:border-indigo-500 outline-none transition-all"
                value={data.value}
                onChange={(e) =>
                  updateData(user.userId, "value", e.target.value)
                }
              />
            </div>

            <button
              onClick={onClose}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black uppercase italic shadow-xl shadow-indigo-500/20 mt-4 transition-all active:scale-95"
            >
              Simpan Identitas Guru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTeacherIdentity;
