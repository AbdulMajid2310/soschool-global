"use client";

import React, { useEffect, useState } from "react";
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
  HiOutlineUserPlus,
  HiOutlineCalendarDays,
  HiArrowsUpDown, // Icon tambahan untuk Gender
} from "react-icons/hi2";

interface StudentFormInputs {
  username: string;
  nik: string;
  email: string;
  phone: string;
  password?: string;
  nis: string;
  nisn?: string;
  entryYear: string;
  gender: string; // "L" atau "P"
}

export default function CreateStudentSection() {
  const { profile, authLoading } = useAppSelector((state) => state.auth);
  const [schoolId, setSchoolId] = useState<string | null>(null);

  useEffect(() => {
    const selectSchoolId = sessionStorage.getItem("schoolId");
    setSchoolId(profile?.activeContext?.schoolId || selectSchoolId);
  }, [profile]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormInputs>({
    defaultValues: {
      entryYear: new Date().getFullYear().toString(),
      gender: "", // Default kosong untuk validasi
    },
  });

  const onSubmit = async (data: StudentFormInputs) => {
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan. Silakan pilih sekolah kembali.");
      return;
    }

    try {
      const payload = { ...data, schoolId };
      const response = await api.post("/school-students", payload);

      if (response.data.success) {
        toast.success("Akun Siswa berhasil dibuat!");
        reset();
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Terjadi kesalahan sistem";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  if (authLoading || !schoolId)
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">
          Menyiapkan Form Siswa...
        </p>
      </div>
    );

  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 block ml-1 italic";
  const inputClass =
    "w-full pl-12 pr-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 appearance-none";
  const iconClass =
    "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none";

  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-12 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-2xl">
                <HiOutlineUser size={24} />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter dark:text-white text-indigo-600">
                Akun & Kredensial
              </h3>
            </div>

            <div className="space-y-5">
              <div className="group relative">
                <label className={labelClass}>
                  Nama Lengkap (Sesuai Ijazah)
                </label>
                <div className="relative">
                  <HiOutlineUser className={iconClass} size={20} />
                  <input
                    {...register("username", { required: "Nama wajib diisi" })}
                    className={inputClass}
                    placeholder="Budi Santoso"
                  />
                </div>
                {errors.username && (
                  <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* INPUT GENDER TAMBAHAN */}
              <div className="group relative">
                <label className={labelClass}>Jenis Kelamin</label>
                <div className="relative">
                  <HiArrowsUpDown className={iconClass} size={20} />
                  <select
                    {...register("gender", {
                      required: "Jenis kelamin wajib dipilih",
                    })}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Pilih Jenis Kelamin
                    </option>
                    <option value="L">Laki-laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="group relative">
                <label className={labelClass}>Email Official / Pribadi</label>
                <div className="relative">
                  <HiOutlineEnvelope className={iconClass} size={20} />
                  <input
                    type="email"
                    {...register("email", { required: "Email wajib diisi" })}
                    className={inputClass}
                    placeholder="budi@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="group relative">
                <label className={labelClass}>Password Baru</label>
                <div className="relative">
                  <HiOutlineLockClosed className={iconClass} size={20} />
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password wajib diisi",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                        message:
                          "Sangat Lemah: Butuh Huruf Besar, Angka & Simbol",
                      },
                    })}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8 bg-slate-50/30 dark:bg-slate-800/20">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-2xl">
                <HiOutlineIdentification size={24} />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tighter dark:text-white text-emerald-600">
                Identitas Sekolah
              </h3>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label className={labelClass}>NIS (Internal)</label>
                  <div className="relative">
                    <HiOutlineIdentification className={iconClass} size={20} />
                    <input
                      {...register("nis", { required: "NIS wajib diisi" })}
                      className={inputClass}
                      placeholder="2024001"
                    />
                  </div>
                </div>
                <div className="group relative">
                  <label className={labelClass}>NISN (Nasional)</label>
                  <div className="relative">
                    <HiOutlineFingerPrint className={iconClass} size={20} />
                    <input
                      {...register("nisn")}
                      className={inputClass}
                      placeholder="00123xxx"
                    />
                  </div>
                </div>
              </div>

              <div className="group relative">
                <label className={labelClass}>NIK (16 Digit)</label>
                <div className="relative">
                  <HiOutlineIdentification className={iconClass} size={20} />
                  <input
                    {...register("nik", {
                      required: "NIK wajib diisi",
                      minLength: 16,
                    })}
                    className={inputClass}
                    placeholder="3201xxxxxxxxxxxx"
                  />
                </div>
                {errors.nik && (
                  <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">
                    NIK harus 16 digit
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group relative">
                  <label className={labelClass}>No. WhatsApp</label>
                  <div className="relative">
                    <HiOutlinePhone className={iconClass} size={20} />
                    <input
                      {...register("phone", { required: "HP wajib diisi" })}
                      className={inputClass}
                      placeholder="08xxx"
                    />
                  </div>
                </div>
                <div className="group relative">
                  <label className={labelClass}>Thn Masuk</label>
                  <div className="relative">
                    <HiOutlineCalendarDays className={iconClass} size={20} />
                    <input
                      {...register("entryYear", { required: "Wajib" })}
                      className={inputClass}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-900 dark:bg-indigo-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-white font-black italic uppercase text-sm tracking-widest">
              Konfirmasi Data
            </span>
            <p className="text-slate-400 dark:text-indigo-100 text-[10px] font-medium max-w-xs uppercase">
              Pastikan Gender dipilih dengan benar (L/P) untuk keperluan rapor.
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full md:w-auto px-12 py-5 bg-white text-slate-900 rounded-4xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-500 hover:text-white active:scale-95 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <HiOutlineUserPlus size={18} />
                Daftarkan Siswa Sekarang
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
