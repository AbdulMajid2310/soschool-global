"use client";

import React, { useState, useEffect } from 'react';
import {
  HiOutlineIdentification,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineUser,
} from "react-icons/hi2";
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetTeacherStatus } from '@/redux/features/teacher/slice';
import { registerTeacher } from '@/redux/features/teacher/thunk';

export default function AddTeacher() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { loading, error, success } = useAppSelector((state) => state.teacher);
  const selectSchoolId = typeof window !== 'undefined' ? sessionStorage.getItem("schoolId") : null;

  const schoolId = profile?.activeContext?.schoolId || selectSchoolId;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nik: '',
    password: '',
    nip: '',
    nuptk: '',
    niy: '',
    phone: '',
  });

  useEffect(() => {
    if (success) {
      setFormData({
        username: '', email: '', nik: '', password: '',
        nip: '', nuptk: '', niy: '', phone: ''
      });
      dispatch(resetTeacherStatus());
      toast.success('Guru berhasil didaftarkan!');
    }
  }, [success, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan");
      return;
    }
    dispatch(registerTeacher({ ...formData, schoolId: schoolId }));
  };

  // Class presets untuk menjaga konsistensi
  const inputClass = "w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 dark:text-white rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm font-medium";
  const labelClass = "text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 ml-1 mb-2 block";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors";

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form onSubmit={handleSubmit} className="space-y-8">

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl text-sm font-semibold flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {typeof error === 'string' ? error : "Terjadi kesalahan pada data yang dikirim"}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Section 1: Kredensial */}
          <div className=" bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                <HiOutlineEnvelope size={18} />
              </div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Kredensial Akun</h2>
            </div>

            <div className="grid lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="group relative">
                <label className={labelClass}>Nama Lengkap (Username)</label>
                <div className="relative">
                  <HiOutlineUser className={iconClass} />
                  <input
                    type="text" required placeholder="Masukkan nama lengkap"
                    className={inputClass} value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>NIK</label>
                <div className="relative">
                  <HiOutlineIdentification className={iconClass} />
                  <input
                    type="text" required placeholder="16 Digit NIK"
                    className={inputClass} value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  />
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>Email Aktif</label>
                <div className="relative">
                  <HiOutlineEnvelope className={iconClass} />
                  <input
                    type="email" required placeholder="guru@soschool.id"
                    className={inputClass} value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>Password Login</label>
                <div className="relative">
                  <HiOutlineLockClosed className={iconClass} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 8 karakter"
                    className={`${inputClass} pr-12`}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Data Pegawai */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-200 dark:shadow-none">
                <HiOutlineIdentification size={18} />
              </div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Informasi Pegawai</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 group relative">
                <label className={labelClass}>No. Telepon</label>
                <div className="relative">
                  <HiOutlinePhone className={iconClass} />
                  <input
                    type="text" required placeholder="08..."
                    className={inputClass} value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>NIP</label>
                <div className="relative">
                  <HiOutlineAcademicCap className={iconClass} />
                  <input
                    type="text" placeholder="NIP"
                    className={inputClass} value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  />
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>NUPTK</label>
                <div className="relative">
                  <HiOutlineIdentification className={iconClass} />
                  <input
                    type="text" placeholder="NUPTK"
                    className={inputClass} value={formData.nuptk}
                    onChange={(e) => setFormData({ ...formData, nuptk: e.target.value })}
                  />
                </div>
              </div>

              <div className="sm:col-span-2 group relative">
                <label className={labelClass}>NIY (Nomor Induk Yayasan)</label>
                <div className="relative">
                  <HiOutlineIdentification className={iconClass} />
                  <input
                    type="text" placeholder="Masukkan NIY jika ada"
                    className={inputClass} value={formData.niy}
                    onChange={(e) => setFormData({ ...formData, niy: e.target.value })}
                  />
                </div>
              </div>
            </div>
            {/* Action Button */}
            <div className="flex flex-col  items-center justify-end gap-4 pt-4">
              <p className="text-xs text-slate-400 italic">Pastikan data yang dimasukkan sudah sesuai dengan KTP</p>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-200 dark:shadow-none disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <>
                    Konfirmasi Registrasi
                    <HiOutlineArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>


      </form>
    </div>
  );
}