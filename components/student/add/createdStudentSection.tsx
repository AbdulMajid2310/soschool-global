"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axiosInstance";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineIdentification,
  HiOutlinePhone,
  HiOutlineFingerPrint,
  HiOutlineUserPlus
} from "react-icons/hi2";

interface StudentFormInputs {
  username: string;
  nik: string;
  email: string;
  phone: string;
  password: string;
  nisn: string;
}

export default function CreateStudentSection() {
  const { profile, authLoading } = useAppSelector((state) => state.auth);
  const selectSchoolId = sessionStorage.getItem("schoolId");
  const schoolId = profile?.activeContext?.schoolId || selectSchoolId;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormInputs>();

  const onSubmit = async (data: StudentFormInputs) => {
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan.");
      return;
    }

    try {
      const payload = { ...data, schoolId };
      const response = await api.post("/students", payload);

      if (response.data.success) {
        toast.success("Akun Siswa berhasil dibuat!");
        reset();
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Terjadi kesalahan sistem";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  if (authLoading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sinkronisasi Data...</p>
    </div>
  );

  const labelClass = "text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 block ml-1 italic";
  const inputClass = "w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors";

  return (
    <div className="w-full max-w-5xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Kolom Kiri: Informasi Akun */}
          <div className="p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl">
                <HiOutlineUser size={24} />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter dark:text-white">Informasi Akun</h3>
            </div>

            <div className="space-y-6">
              <div className="group relative">
                <label className={labelClass}>Nama Lengkap</label>
                <div className="relative">
                  <HiOutlineUser className={iconClass} size={20} />
                  <input {...register("username", { required: "Nama wajib diisi" })} className={inputClass} placeholder="Abdul Majid" />
                </div>
                {errors.username && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.username.message}</p>}
              </div>

              <div className="group relative">
                <label className={labelClass}>Email Official</label>
                <div className="relative">
                  <HiOutlineEnvelope className={iconClass} size={20} />
                  <input type="email" {...register("email", { required: "Email wajib diisi" })} className={inputClass} placeholder="siswa@soschool.id" />
                </div>
                {errors.email && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.email.message}</p>}
              </div>

              <div className="group relative">
                <label className={labelClass}>Password Akses</label>
                <div className="relative">
                  <HiOutlineLockClosed className={iconClass} size={20} />
                  <input type="password" {...register("password", { required: "Password wajib diisi", minLength: 8 })} className={inputClass} placeholder="••••••••" />
                </div>
                {errors.password && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">Minimal 8 karakter</p>}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Data Identitas */}
          <div className="p-8 md:p-12 space-y-8 bg-slate-50/30 dark:bg-slate-800/20">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl">
                <HiOutlineIdentification size={24} />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter dark:text-white">Identitas Siswa</h3>
            </div>

            <div className="space-y-6">
              <div className="group relative">
                <label className={labelClass}>NIK (Kependudukan)</label>
                <div className="relative">
                  <HiOutlineFingerPrint className={iconClass} size={20} />
                  <input {...register("nik", { required: "NIK wajib diisi" })} className={inputClass} placeholder="16 Digit Nomor NIK" />
                </div>
                {errors.nik && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.nik.message}</p>}
              </div>

              <div className="group relative">
                <label className={labelClass}>NISN (Nasional)</label>
                <div className="relative">
                  <HiOutlineIdentification className={iconClass} size={20} />
                  <input {...register("nisn", { required: "NISN wajib diisi" })} className={inputClass} placeholder="10 Digit Nomor NISN" />
                </div>
                {errors.nisn && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.nisn.message}</p>}
              </div>

              <div className="group relative">
                <label className={labelClass}>WhatsApp / Phone</label>
                <div className="relative">
                  <HiOutlinePhone className={iconClass} size={20} />
                  <input {...register("phone", { required: "Telepon wajib diisi" })} className={inputClass} placeholder="08123456789" />
                </div>
                {errors.phone && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{errors.phone.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-8 bg-slate-900 dark:bg-indigo-600 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 dark:text-indigo-100 text-xs font-medium max-w-xs text-center md:text-left">
            Pastikan data yang dimasukkan sudah sesuai dengan <span className="text-white font-bold text-italic italic">Dokumen Resmi</span> siswa.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full md:w-auto px-10 py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? "Processing..." : (
                <>
                  <HiOutlineUserPlus size={18} />
                  Simpan & Daftarkan Siswa
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}