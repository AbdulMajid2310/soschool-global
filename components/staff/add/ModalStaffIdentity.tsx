import { User } from "@/redux/features/user/types";
import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import {
  HiOutlineBriefcase,
  HiOutlineFingerPrint,
  HiOutlineIdentification,
} from "react-icons/hi2";

interface ModalStaffIdentityProps {
  isOpen: boolean;
  user: User;
  data: {
    position: string;
    nip: string;
    employeeId: string;
  };
  updateData: (id: string, field: string, val: string) => void;
  setActivePopup: (id: string | null) => void;
}

const ModalStaffIdentity: React.FC<ModalStaffIdentityProps> = ({
  isOpen,
  user,
  data,
  updateData,
  setActivePopup,
}) => {
  if (!isOpen || !user) return null;

  const avatarUrl =
    user.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Tombol Close Absolute - Menjalankan fungsi handleClose dari parent */}
        <div className="absolute top-6 right-6 z-50">
          <button
            type="button"
            title="Batal"
            onClick={() => setActivePopup(null)}
            className="group flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all duration-300 active:scale-90 shadow-sm"
          >
            <AiFillCloseSquare
              className="text-slate-400 group-hover:text-rose-500 transition-colors"
              size={32}
            />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
          {/* Kolom Kiri: Profil Visual */}
          <div className="flex flex-col items-center text-center space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-8 lg:pb-0 lg:pr-8">
            <div className="relative group/avatar">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
              <img
                src={avatarUrl}
                className="relative w-24 h-24 lg:w-40 lg:h-40 rounded-[2.5rem] object-cover shadow-2xl border-4 border-white dark:border-slate-800 transition-transform duration-500 group-hover/avatar:scale-105"
                alt={user.username}
              />
            </div>
            <div className="space-y-1">
              <h5 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                {user.username}
              </h5>
              <div className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  REG : {user.registrationNumber || "NEW USER"}
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Form Input */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-1.5 ml-1">
                <HiOutlineBriefcase size={14} />
                Jabatan / Posisi <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Guru Matematika, Admin..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-500/50 rounded-2xl text-sm font-bold outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                value={data?.position || ""}
                onChange={(e) =>
                  updateData(user.userId, "position", e.target.value)
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5 ml-1">
                <HiOutlineFingerPrint size={14} />
                NIP (Opsional)
              </label>
              <input
                type="text"
                placeholder="Masukkan NIP..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-slate-300 dark:focus:border-slate-600 rounded-2xl text-sm font-bold outline-none transition-all"
                value={data?.nip || ""}
                onChange={(e) => updateData(user.userId, "nip", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1.5 ml-1">
                <HiOutlineIdentification size={14} />
                Employee ID
              </label>
              <input
                type="text"
                placeholder="Masukkan ID Pegawai..."
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-slate-300 dark:focus:border-slate-600 rounded-2xl text-sm font-bold outline-none transition-all"
                value={data?.employeeId || ""}
                onChange={(e) =>
                  updateData(user.userId, "employeeId", e.target.value)
                }
              />
            </div>

            {/* Tombol Simpan - Ini juga menutup popup, tapi karena logic di parent, 
                jika posisi sudah diisi, data tidak akan terhapus */}
            <button
              onClick={() => setActivePopup(null)}
              className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black uppercase italic shadow-xl shadow-emerald-500/20 mt-4 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Simpan Identitas Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalStaffIdentity;
