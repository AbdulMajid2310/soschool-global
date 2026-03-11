"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearEmailStatus } from "@/redux/features/authEmail/slice";
import { forgotPasswordThunk } from "@/redux/features/authEmail/thunks";
import SuccessState from "./SuccessState";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaDoorOpen } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error, success, message } = useAppSelector(
    (state) => state.authEmail,
  );

  useEffect(() => {
    if (success) {
      toast.success(message || "OTP berhasil dikirim!");
      setIsSubmitted(true);
    }
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearEmailStatus());
    };
  }, [success, error, message, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(email));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-login-pattern bg-cover bg-center px-4 overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px]" />
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-slow" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-md w-full p-8 backdrop-blur-2xl rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 mb-4">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Lupa Password?
              </h1>
              <p className="text-slate-400 text-sm mt-3 font-medium">
                Masukkan email SoSchool Anda untuk menerima kode verifikasi OTP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.com"
                  className="block w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 rounded-2xl shadow-2xl shadow-blue-600/30 text-sm font-black text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={20} />
                    MENGIRIM OTP...
                  </>
                ) : (
                  "KIRIM KODE VERIFIKASI"
                )}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <Link
                href="/login"
                className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors group"
              >
                <FaDoorOpen
                  size={16}
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                />
                Kembali ke Login
              </Link>
            </div>
          </>
        ) : (
          <SuccessState email={email} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
