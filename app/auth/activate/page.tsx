"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearEmailStatus } from "@/redux/features/authEmail/slice";
import { activateAccountThunk } from "@/redux/features/authEmail/thunks";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCheckDouble,
  FaRocket,
} from "react-icons/fa";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ActivateForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const token = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // 1. Validasi Kekuatan Password (Konsisten dengan Reset Password)
  const passwordStrength = useMemo(() => {
    const pass = formData.password;
    if (!pass) return { score: 0, label: "", color: "bg-slate-700" };

    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    const levels = [
      { label: "Sangat Lemah", color: "bg-red-500" },
      { label: "Lemah", color: "bg-orange-500" },
      { label: "Cukup", color: "bg-yellow-500" },
      { label: "Kuat", color: "bg-emerald-500" },
      { label: "Sangat Kuat", color: "bg-blue-500" },
    ];
    return { score, ...levels[score] };
  }, [formData.password]);

  const isPasswordMatch = useMemo(() => {
    if (!formData.confirmPassword) return true;
    return formData.password === formData.confirmPassword;
  }, [formData.password, formData.confirmPassword]);

  const { loading, error, success, message } = useAppSelector(
    (state) => state.authEmail,
  );

  useEffect(() => {
    if (!token) {
      toast.error("Token aktivasi tidak ditemukan");
      router.push("/login");
    }
  }, [token, router]);

  useEffect(() => {
    if (success) {
      toast.success(message || "Akun berhasil diaktifkan!");
      setTimeout(() => router.push("/login"), 3000);
    }
    if (error) toast.error(error);
    return () => {
      dispatch(clearEmailStatus());
    };
  }, [success, error, message, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordMatch) return toast.error("Konfirmasi password tidak cocok");
    if (passwordStrength.score < 2)
      return toast.error("Password terlalu lemah");

    dispatch(activateAccountThunk({ token, password: formData.password }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden">
      <Toaster position="top-right" />

      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />

      <div className="relative z-10 max-w-xl w-full p-8 md:p-12 backdrop-blur-2xl rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <FaShieldAlt size={40} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            Aktivasi <span className="text-emerald-500">Akun</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Satu langkah lagi untuk bergabung dengan{" "}
            <span className="text-white font-bold">SoSchool</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
              Buat Password Baru
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-6 py-5 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-emerald-500 outline-none transition-all focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Strength Meter (Model Garis Terpisah) */}
            {formData.password && (
              <div className="px-1 mt-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Security Level: {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 transition-all duration-500 rounded-full ${i < passwordStrength.score ? passwordStrength.color : "bg-slate-800"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">
              Ulangi Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`w-full px-6 py-5 rounded-2xl border bg-white/5 text-white outline-none transition-all ${
                  isPasswordMatch
                    ? "border-white/10 focus:border-emerald-500"
                    : "border-red-500/50 focus:border-red-500"
                }`}
              />
              {!isPasswordMatch && (
                <p className="text-red-400 text-[10px] font-bold uppercase flex items-center gap-1 mt-2 ml-1">
                  <FiAlertCircle /> Password tidak sama
                </p>
              )}
              {isPasswordMatch && formData.confirmPassword && (
                <p className="text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1 mt-2 ml-1">
                  <FiCheckCircle /> Password cocok
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordMatch || passwordStrength.score < 2}
            className="w-full group relative flex justify-center items-center py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.3em] transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] active:scale-[0.98] disabled:opacity-40"
          >
            {loading ? (
              <FiLoader className="animate-spin" size={20} />
            ) : (
              <span className="flex items-center gap-2">
                Aktifkan Sekarang{" "}
                <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
          Dengan mengaktifkan akun, Anda menyetujui <br />
          <span className="text-slate-300">
            Ketentuan Layanan & Kebijakan Privasi
          </span>{" "}
          SoSchool.
        </p>
      </div>
    </div>
  );
};

export default function ActivatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <FiLoader className="animate-spin text-emerald-500" size={40} />
        </div>
      }
    >
      <ActivateForm />
    </Suspense>
  );
}
