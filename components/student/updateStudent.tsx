"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";
import { api } from "@/lib/axiosInstance";
import { useSchoolId } from "@/hooks/useSchoolId";

interface StudentFormInputs {
  username: string;
  nik: string;
  email: string;
  phone: string;
  password: string;
  nisn: string;
}

export default function CreateStudentPage() {
  // Ambil konteks sekolah dari Redux sesuai request-mu
  const { authLoading } = useAppSelector((state) => state.auth);
  const schoolId = useSchoolId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormInputs>();

  const onSubmit = async (data: StudentFormInputs) => {
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan. Pastikan Anda sudah masuk ke profil sekolah.");
      return;
    }

    try {
      // Gabungkan data form dengan schoolId dari Redux
      const payload = {
        ...data,
        schoolId,
      };

      const response = await api.post("/students", payload);

      if (response.data.success) {
        toast.success("Siswa dan Akun User berhasil dibuat secara otomatis!");
        reset();
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Terjadi kesalahan saat menyimpan data";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  if (authLoading) return <div className="p-10 text-center">Memuat data autentikasi...</div>;

  return (
    <div className="w-full p-6">


      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-white  text-gray-700 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-slate-100">

        {/* Kolom Kiri: Informasi Akun (User) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 ">Informasi Akun (User)</h3>

          <div>
            <label className="block text-sm font-medium  mb-1">Nama Lengkap</label>
            <input
              {...register("username", { required: "Username wajib diisi" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Contoh: abdul majid"
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email wajib diisi" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="siswa@soschool.id"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: { value: 8, message: "Minimal 8 karakter" }
              })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>
        </div>

        {/* Kolom Kanan: Data Identitas (Student) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 ">Data Identitas Siswa</h3>

          <div>
            <label className="block text-sm font-medium  mb-1">NIK (Nomor Induk Kependudukan)</label>
            <input
              {...register("nik", { required: "NIK wajib diisi" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="16 digit NIK"
            />
            {errors.nik && <span className="text-red-500 text-xs">{errors.nik.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">NISN (Nomor Induk Siswa Nasional)</label>
            <input
              {...register("nisn", { required: "NISN wajib diisi" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="10 digit NISN"
            />
            {errors.nisn && <span className="text-red-500 text-xs">{errors.nisn.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Nomor Telepon</label>
            <input
              {...register("phone", { required: "Nomor telepon wajib diisi" })}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="0812xxxx"
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
          </div>
        </div>

        <div className="md:col-span-2 pt-4 border-t mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100"
          >
            {isSubmitting ? "Memproses..." : "Simpan Siswa & Buat Akun"}
          </button>
        </div>
      </form>
    </div>
  );
}