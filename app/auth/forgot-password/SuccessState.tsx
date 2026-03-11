"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { FaDoorOpen } from "react-icons/fa";
import Link from "next/link";

interface SuccessStateProps {
  email: string;
}

const SuccessState = ({ email }: SuccessStateProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-3xl flex items-center justify-center mb-6 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <MdMarkEmailRead size={40} />
      </div>

      <h2 className="text-3xl font-black text-white tracking-tight">
        Cek Email Anda
      </h2>
      <p className="text-slate-400 mt-3 max-w-64">
        Kami telah mengirimkan kode OTP ke{" "}
        <span className="text-blue-400 font-bold">{email}</span>. Silakan
        periksa kotak masuk atau folder spam Anda.
      </p>

      <button
        onClick={() => router.push(`/auth/reset-password?email=${email}`)}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/30 active:scale-[0.97] transition-all tracking-wide"
      >
        MASUKKAN KODE OTP
      </button>

      <div className="mt-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
        <Link
          href="/login"
          className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
            <FaDoorOpen size={16} />
          </div>
          Kembali ke Login
        </Link>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-400 transition-all group"
        >
          <MdMarkEmailUnread size={18} className="group-hover:animate-bounce" />
          <span className="relative">
            Kirim ulang email
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SuccessState;
