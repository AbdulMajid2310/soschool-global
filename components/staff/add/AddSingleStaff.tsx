"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerStaff } from "@/redux/features/staff/thunks";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function AddSingleStaff() {
  const dispatch = useAppDispatch();

  const schoolId = useSchoolId();
  const { loading } = useAppSelector((state) => state.schoolStaff);

  // Initial state disesuaikan dengan CreateSchoolStaffDto
  const [form, setForm] = useState({
    username: "",
    nik: "",
    email: "",
    phone: "",
    position: "",
    employeeId: "",
    nip: "", // Ditambahkan sesuai DTO
    password: "",
    gender: "L",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolId) {
      return toast.error("ID Sekolah tidak ditemukan!");
    }

    const loadToast = toast.loading("Sedang mendaftarkan staff...");

    try {
      await dispatch(
        registerStaff({
          ...form,
          schoolId: String(schoolId),
        }),
      ).unwrap();

      toast.success("Staff berhasil ditambahkan!", { id: loadToast });
    } catch (err: any) {
      const msg =
        typeof err === "string" ? err : err?.message || "Terjadi kesalahan";
      toast.error(msg, { id: loadToast });
    }
  };

  const inputClass =
    "w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-4 focus:ring-indigo-500/10 font-bold text-sm transition-all outline-none text-slate-700 dark:text-slate-200";
  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2 mb-1 block";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="space-y-1">
        <label className={labelClass}>Nama Lengkap Staff</label>
        <input
          required
          name="username"
          className={inputClass}
          value={form.username}
          onChange={handleChange}
          placeholder="Ex: Abdul Majid"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>NIK (KTP)</label>
        <input
          required
          name="nik"
          className={inputClass}
          value={form.nik}
          onChange={handleChange}
          placeholder="16 Digit NIK"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Email Aktif</label>
        <input
          required
          type="email"
          name="email"
          className={inputClass}
          value={form.email}
          onChange={handleChange}
          placeholder="staff@soschool.com"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Nomor Telepon (WA)</label>
        <input
          name="phone"
          className={inputClass}
          value={form.phone}
          onChange={handleChange}
          placeholder="0812..."
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Jabatan / Posisi</label>
        <input
          required
          name="position"
          className={inputClass}
          value={form.position}
          onChange={handleChange}
          placeholder="Ex: IT Support, Tata Usaha"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>NIP (Jika Ada)</label>
        <input
          name="nip"
          className={inputClass}
          value={form.nip}
          onChange={handleChange}
          placeholder="Nomor Induk Pegawai"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>ID Pegawai Internal</label>
        <input
          name="employeeId"
          className={inputClass}
          value={form.employeeId}
          onChange={handleChange}
          placeholder="ID Internal Sekolah"
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Password Akun</label>
        <input
          required
          type="password"
          name="password"
          className={inputClass}
          value={form.password}
          onChange={handleChange}
          placeholder="Min. 6 Karakter"
        />
      </div>

      <div className="md:col-span-2 pt-6">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-5 bg-indigo-600 text-white rounded-4xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {loading ? "Menyimpan..." : "Daftarkan Staff Baru"}
        </button>
      </div>
    </form>
  );
}
