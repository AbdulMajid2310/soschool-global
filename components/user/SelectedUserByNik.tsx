"use client";

import React, { useState } from "react";
import {
  HiOutlineIdentification,
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useAppDispatch } from "@/redux/hooks";
import { getUserByNik } from "@/redux/features/user/thunk";
import { toast } from "react-hot-toast";
import { User } from "@/redux/features/user/types";

interface SelectedUserByNikProps {
  onFound: (user: User) => void;
  onClear: () => void;
}

export const SelectedUserByNik = ({
  onFound,
  onClear,
}: SelectedUserByNikProps) => {
  const dispatch = useAppDispatch();
  const [nikInput, setNikInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);

  const handleSearch = async () => {
    if (nikInput.length !== 16) {
      toast.error("NIK harus 16 digit");
      return;
    }

    setIsLoading(true);
    setFoundUser(null);
    onClear();

    try {
      const result = await dispatch(getUserByNik(nikInput)).unwrap();

      if (result.data) {
        setFoundUser(result.data);
        onFound(result.data);
        toast.success("User ditemukan!");
      } else {
        toast.error("User dengan NIK tersebut tidak ditemukan");
      }
    } catch (error: any) {
      toast.error(error || "Terjadi kesalahan saat mencari NIK");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInput = () => {
    setNikInput("");
    setFoundUser(null);
    onClear();
  };

  return (
    <div className=" rounded-3xl border border-slate-100 dark:border-white/5 transition-all">
      <div className="space-y-2">
        <div className="relative group">
          <HiOutlineIdentification
            className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isLoading ? "text-indigo-500 animate-pulse" : "text-slate-300"}`}
            size={20}
          />
          <input
            type="text"
            maxLength={16}
            value={nikInput}
            onChange={(e) => setNikInput(e.target.value.replace(/\D/g, ""))}
            placeholder="Masukkan 16 Digit NIK..."
            className="w-full pl-14 pr-32 py-4 bg-white dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm transition-all dark:text-white"
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {nikInput && (
              <button
                title="hapus"
                type="button"
                onClick={handleClearInput}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <HiOutlineXMark size={18} />
              </button>
            )}
            <button
              type="button"
              onClick={handleSearch}
              disabled={isLoading || nikInput.length !== 16}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100 dark:shadow-none"
            >
              {isLoading ? "Checking..." : "Cek NIK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
