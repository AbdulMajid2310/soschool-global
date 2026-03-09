"use client";

import React, { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlinePhone,
  HiOutlineXMark,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineUserPlus,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { createParent } from "@/redux/features/school-parents/thunks";
import SelectedStudentModal from "../../student/SelectedStudentModal";
import { FaUserFriends } from "react-icons/fa";
import { toast } from "react-hot-toast"; // Pastikan sudah install react-hot-toast

export const AddParentSchoolModal = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { students } = useAppSelector((state) => state.student);

  const [formData, setFormData] = useState({
    username: "",
    nik: "",
    email: "",
    phone: "",
    gender: "" as "L" | "P" | "",
    studentIds: [] as string[],
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleGenderSelect = (val: "L" | "P") => {
    setFormData((prev) => ({ ...prev, gender: val }));
    if (errors.gender) {
      setErrors((prev) => {
        const { gender, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleToggleStudent = (studentId: string) => {
    setFormData((prev) => {
      const isExist = prev.studentIds.includes(studentId);
      const newIds = isExist
        ? prev.studentIds.filter((id) => id !== studentId)
        : [...prev.studentIds, studentId];
      return { ...prev, studentIds: newIds };
    });
    if (errors.studentIds) {
      setErrors((prev) => {
        const { studentIds, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = "Nama wajib diisi";
    if (formData.nik.length !== 16) newErrors.nik = "NIK harus 16 digit";
    if (!formData.email.includes("@")) newErrors.email = "Email tidak valid";
    if (!formData.gender) newErrors.gender = "Pilih jenis kelamin";
    if (formData.studentIds.length === 0)
      newErrors.studentIds = "Pilih minimal satu siswa";

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Minimal 8 karakter, Huruf Besar, Kecil & Angka";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validate()) {
      toast.error("Mohon lengkapi data dengan benar");
      return;
    }

    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Sedang menyinkronkan data...");

    try {
      await dispatch(createParent({ ...formData, schoolId })).unwrap();
      toast.success("Data wali murid berhasil didaftarkan!", {
        id: loadingToast,
      });

      // Reset Form jika sukses
      setFormData({
        username: "",
        nik: "",
        email: "",
        phone: "",
        gender: "",
        studentIds: [],
        password: "",
      });
    } catch (err: any) {
      toast.error(err || "Gagal menyimpan data", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" py-6 px-4 sm:px-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5 ">
          <div className="p-4 bg-indigo-600 rounded-3xl  text-white">
            <HiOutlineUserPlus size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tight">
              Pendaftaran Wali Murid
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
              Sekolah Management System
            </p>
          </div>
        </div>
        {/* Tombol Submit di Header - Menghubungkan ke handleSubmit */}
        <div className="px-2">
          <button
            type="button" // Gunakan type button karena submit dilakukan via fungsi handleSubmit
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="group relative border p-2 px-4 w-full py-3 bg-indigo-600 dark:bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-4xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-500/40 active:scale-95 disabled:opacity-50 italic"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Proses Sinkronisasi...
                </>
              ) : (
                "Daftarkan Wali Murid"
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Kolom Form Kiri */}
        <div className="lg:col-span-8 space-y-4 bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-black italic uppercase text-slate-700 dark:text-slate-200 flex items-center gap-3">
            <span className="w-10 h-1.5 bg-indigo-600 rounded-full"></span>
            Informasi Identitas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                Nama Lengkap
              </label>
              <div className="relative group">
                <HiOutlineUser
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nama Lengkap Sesuai KTP"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm transition-all"
                />
              </div>
              {errors.username && (
                <p className="text-[10px] text-rose-500 font-bold ml-2 italic">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                Jenis Kelamin
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["L", "P"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGenderSelect(g as "L" | "P")}
                    className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
                      formData.gender === g
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {g === "L" ? "Laki-Laki" : "Perempuan"}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-[10px] text-rose-500 font-bold ml-2 italic">
                  {errors.gender}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                NIK (KTP)
              </label>
              <div className="relative group">
                <HiOutlineIdentification
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  maxLength={16}
                  placeholder="16 Digit NIK"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm font-mono tracking-widest transition-all"
                />
              </div>
              {errors.nik && (
                <p className="text-[10px] text-rose-500 font-bold ml-2 italic">
                  {errors.nik}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                Nomor HP
              </label>
              <div className="relative group">
                <HiOutlinePhone
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0812..."
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 ">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                Alamat Email
              </label>
              <div className="relative group">
                <HiOutlineEnvelope
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@sekolah.com"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-rose-500 font-bold ml-2 italic">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2 ">
              <div className="flex justify-between">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">
                  Password Akun
                </label>
                <span className="text-[9px] font-black uppercase tracking-tighter text-indigo-500 flex items-center gap-1 italic">
                  <HiOutlineShieldCheck size={14} /> Keamanan Tinggi
                </span>
              </div>
              <div className="relative group">
                <HiOutlineLockClosed
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 Karakter (Mix Huruf & Angka)"
                  className="w-full pl-14 pr-16 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash size={22} />
                  ) : (
                    <HiOutlineEye size={22} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-rose-500 font-bold ml-2 italic">
                  {errors.password}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Samping: Pilih Siswa & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 dark:bg-indigo-600 p-4 rounded-4xl text-white shadow-2xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>

            <h2 className="text-lg font-black italic uppercase mb-2 flex items-center gap-3 relative z-10">
              <span className="border rounded-full p-1">
                <FaUserFriends />
              </span>
              Relasi Anak
            </h2>

            <div className="space-y-6 relative z-10">
              <SelectedStudentModal
                selectedIds={formData.studentIds}
                onSelect={handleToggleStudent}
              />

              <div className="space-y-3 mt-4 h-60  overflow-y-auto pr-2  scrollbar-hide">
                {formData.studentIds.length > 0 ? (
                  formData.studentIds.map((id) => {
                    const student = students.find((s) => s.studentId === id);
                    const studentName = student?.user.username || "Siswa";
                    const avatarUrl =
                      student?.user.avatar ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${studentName}&backgroundColor=4f46e5&textColor=ffffff`;

                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-[1.8rem] border border-white/10 transition-all group animate-in slide-in-from-right-5 duration-300"
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar Section */}
                          <div className="relative">
                            <img
                              src={avatarUrl}
                              alt={studentName}
                              className="w-11 h-11 rounded-2xl object-cover border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase italic tracking-wider leading-tight text-white group-hover:text-indigo-200 transition-colors">
                              {studentName}
                            </span>
                            <span className="text-[9px] font-bold opacity-50 tracking-widest mt-0.5">
                              NIS • {student?.nis || "N/A"}
                            </span>
                          </div>
                        </div>

                        <button
                          title="Hapus Relasi"
                          type="button"
                          onClick={() => handleToggleStudent(id)}
                          className="p-2.5 text-white/30 hover:text-white hover:bg-rose-500 rounded-xl transition-all duration-300 active:scale-90"
                        >
                          <HiOutlineXMark size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-14 text-center border-2 border-dashed border-white/10 rounded-[2.5rem] bg-white/5 group">
                    <div className="mb-3 flex justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <HiOutlineUser size={40} />
                    </div>
                    <p className="text-[10px] font-black uppercase italic tracking-[0.2em] opacity-40">
                      Belum ada siswa terpilih
                    </p>
                  </div>
                )}
              </div>

              {errors.studentIds && (
                <div className="p-3 bg-rose-500/20 border border-rose-500/50 rounded-2xl animate-bounce">
                  <p className="text-[10px] text-rose-200 font-black text-center uppercase italic">
                    {errors.studentIds}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
