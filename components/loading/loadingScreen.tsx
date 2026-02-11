"use client";

import { getProfileMe } from '@/redux/features/auth/thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react';

export default function LoadingScreen() {
  const dispatch = useAppDispatch();
  const { profile, authLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!profile && !authLoading) {
      dispatch(getProfileMe());
    }
  }, [dispatch, profile, authLoading]);

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white dark:bg-slate-950 backdrop-blur-2xl transition-colors duration-500">
      {/* Container Lingkaran Utama */}
      <div className="relative flex items-center justify-center">

        {/* Lingkaran Luar */}
        <div className="h-48 w-48 rounded-full border-4 border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_bottom,#f97316,#3b82f6)_border-box] dark:[background:linear-gradient(#020617,#020617)_padding-box,linear-gradient(to_bottom,#f97316,#3b82f6)_border-box] opacity-80 animate-[spin_4s_linear_infinite]"></div>

        {/* Lingkaran Tengah */}
        <div className="absolute h-40 w-40 rounded-full border-4 border-transparent [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#8b5cf6,#06b6d4)_border-box] dark:[background:linear-gradient(#020617,#020617)_padding-box,linear-gradient(to_right,#8b5cf6,#06b6d4)_border-box] opacity-60 animate-[spin_3s_linear_infinite_reverse]"></div>

        {/* Logo Container */}
        <div className="absolute flex rounded-full bg-slate-50 dark:bg-slate-900 h-36 w-36 items-center justify-center shadow-xl dark:shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden border border-slate-200 dark:border-slate-800">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-full w-full object-cover scale-110"
          />
        </div>
      </div>

      {/* Brand Name So School */}
      <div className="mt-4 text-center">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center">
          So
          <span className="ml-2 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic font-black pr-2">
            School
          </span>
          <span className="ml-2 h-3 w-3 bg-pink-500 rounded-full inline-block animate-ping"></span>
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
          Meningkatkan Pendidikan
        </p>
      </div>

      {/* Progress Bar Area */}
      <div className="mt-4 w-64 space-y-3">
        <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 overflow-hidden">
          {authLoading ? (
            /* Mode Loading: Animasi Berjalan */
            <div className="h-full rounded-full bg-linear-to-r from-cyan-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-[loading_1.5s_infinite_ease-in-out] w-1/3"></div>
          ) : (
            /* Mode Selesai: Full */
            <div className="h-full w-full rounded-full bg-blue-500 transition-all duration-700 ease-out"></div>
          )}
        </div>

        <div className="flex justify-between items-center px-1">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            {authLoading ? 'sinkronisasi sistem' : 'berhasil disinkronisasi'}
          </span>
          <span className="text-[9px] font-black text-blue-500 animate-pulse uppercase">
            {authLoading ? 'proses' : 'siap'}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}