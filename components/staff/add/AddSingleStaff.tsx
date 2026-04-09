"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerStaff } from "@/redux/features/staff/thunks";
import { useSchoolId } from "@/hooks/useSchoolId";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineBriefcase,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

export default function AddSingleStaff() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { loading } = useAppSelector((state) => state.schoolStaff);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    nik: "",
    email: "",
    phone: "",
    position: "",
    employeeId: "",
    nip: "",
    password: "",
    gender: "L",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return toast.error("ID Sekolah tidak ditemukan!");

    const loadToast = toast.loading("Sinkronisasi database...");
    try {
      await dispatch(
        registerStaff({ ...form, schoolId: String(schoolId) }),
      ).unwrap();
      toast.success("Staff baru berhasil diaktivasi!", { id: loadToast });
      setForm({
        username: "",
        nik: "",
        email: "",
        phone: "",
        position: "",
        employeeId: "",
        nip: "",
        password: "",
        gender: "L",
      });
    } catch (err: any) {
      toast.error(err?.message || "Gagal mendaftarkan staff", {
        id: loadToast,
      });
    }
  };

  const labelClass =
    "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2.5 block ml-1";
  const inputContainer = "group relative flex items-center";
  const inputClass =
    "w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.25rem] text-sm font-bold transition-all duration-300 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/40 dark:text-slate-200 shadow-sm shadow-slate-100/50 dark:shadow-none";
  const iconClass =
    "absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300";

  return (
    <div className="w-full pb-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-12  flex gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700"
      >
        {/* Section: Personal Identity */}
        <section className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <HiOutlineUser size={22} />
            </div>
            <div>
              <h2 className="text-lg font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                Informasi Personal
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Data dasar sesuai identitas resmi
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className={labelClass}>Nama Lengkap</label>
              <div className={inputContainer}>
                <HiOutlineUser className={iconClass} size={20} />
                <input
                  required
                  name="username"
                  className={inputClass}
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Masukkan Nama Lengkap"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>NIK (KTP)</label>
              <div className={inputContainer}>
                <HiOutlineIdentification className={iconClass} size={20} />
                <input
                  required
                  name="nik"
                  className={inputClass}
                  value={form.nik}
                  onChange={handleChange}
                  placeholder="16 Digit NIK"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={`${labelClass} block text-sm font-medium`}>
                Jenis Kelamin
              </label>

              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full md:w-fit shadow-inner">
                {["L", "P"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, gender: g }))}
                    className={`
          flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl 
          text-[11px] font-bold uppercase tracking-wider transition-all duration-200
          ${
            form.gender === g
              ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm ring-1 ring-black/5"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }
        `}
                  >
                    {g === "L" ? (
                      <>
                        <AiOutlineMan className="text-lg" />
                        <span>Laki-Laki</span>
                      </>
                    ) : (
                      <>
                        <AiOutlineWoman className="text-lg" />
                        <span>Perempuan</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Kata Sandi</label>
              <div className={inputContainer}>
                <HiOutlineLockClosed className={iconClass} size={20} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={inputClass}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 Karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div>
          {/* Section: Professional & Account */}
          <section className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
                <HiOutlineBriefcase size={22} />
              </div>
              <div>
                <h2 className="text-lg font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
                  Kredensial & Tugas
                </h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Detail akses dan jabatan di sekolah
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="space-y-1">
                <label className={labelClass}>Email Aktif</label>
                <div className={inputContainer}>
                  <HiOutlineEnvelope className={iconClass} size={20} />
                  <input
                    required
                    type="email"
                    name="email"
                    className={inputClass}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nama@sekolah.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Nomor Telepon</label>
                <div className={inputContainer}>
                  <HiOutlinePhone className={iconClass} size={20} />
                  <input
                    name="phone"
                    className={inputClass}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxx"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>Jabatan</label>
                <div className={inputContainer}>
                  <HiOutlineBriefcase className={iconClass} size={20} />
                  <input
                    required
                    name="position"
                    className={inputClass}
                    value={form.position}
                    onChange={handleChange}
                    placeholder="Contoh: Guru Matematika"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={labelClass}>NIP / ID Pegawai</label>
                <div className={inputContainer}>
                  <HiOutlineIdentification className={iconClass} size={20} />
                  <input
                    name="nip"
                    className={inputClass}
                    value={form.nip}
                    onChange={handleChange}
                    placeholder="Opsional"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Final Submission */}
          <div className="flex flex-col mt-8 items-center">
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full md:w-100 py-5 bg-indigo-600 text-white rounded-4xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-2xl shadow-indigo-300 dark:shadow-none"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 font-black uppercase italic tracking-[0.25em] text-xs">
                {loading ? (
                  "Mendaftarkan..."
                ) : (
                  <>
                    <HiOutlineSparkles size={18} /> Daftarkan Staff
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-700 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <p className="mt-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 text-center">
              Sistem Pemetaan Bakat Terintegrasi SoSchool
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
