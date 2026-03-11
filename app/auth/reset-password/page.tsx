"use client";

import React, { useState, useEffect, Suspense, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearEmailStatus } from "@/redux/features/authEmail/slice";
import { resetPasswordThunk } from "@/redux/features/authEmail/thunks";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaDoorOpen,
  FaEye,
  FaEyeSlash,
  FaStepBackward,
  FaUserShield,
} from "react-icons/fa";
import { FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const emailFromUrl = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 1. Validasi Kekuatan Password
  const passwordStrength = useMemo(() => {
    const pass = formData.newPassword;
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
  }, [formData.newPassword]);

  // 2. Validasi Kecocokan Password
  const isPasswordMatch = useMemo(() => {
    if (!formData.confirmPassword) return true;
    return formData.newPassword === formData.confirmPassword;
  }, [formData.newPassword, formData.confirmPassword]);

  useEffect(() => {
    if (emailFromUrl) {
      setFormData((prev) => ({ ...prev, email: emailFromUrl }));
    }
  }, [emailFromUrl]);

  const { loading, error, success, message } = useAppSelector(
    (state) => state.authEmail,
  );

  useEffect(() => {
    if (success) {
      toast.success(message || "Password berhasil diperbarui!");
      setTimeout(() => router.push("/login"), 2000);
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

    dispatch(
      resetPasswordThunk({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      }),
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-login-pattern bg-cover bg-center px-4 overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{ style: { zIndex: 9999 } }}
      />
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px]" />

      {/* Glow Orbs */}
      <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-slow" />

      <div className="relative z-10 max-w-2xl w-full p-8 backdrop-blur-2xl rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FaUserShield size={32} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Atur Ulang Sandi
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Amankan akun SoSchool Anda dengan sandi baru.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Kode OTP
            </label>
            <input
              type="text"
              required
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-center tracking-[0.8em] font-black focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* New Password Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Sandi Baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:border-blue-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Strength Meter Indicator */}
            {formData.newPassword && (
              <div className="px-1 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Kekuatan: {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 transition-all duration-500 ${i < passwordStrength.score ? passwordStrength.color : "bg-slate-800"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Konfirmasi Sandi
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`w-full px-5 py-4 rounded-2xl border bg-white/5 text-white outline-none transition-all ${
                  isPasswordMatch
                    ? "border-white/10 focus:border-blue-500"
                    : "border-red-500/50 focus:border-red-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {!isPasswordMatch && (
              <p className="text-red-400 text-[10px] font-bold uppercase flex items-center gap-1 ml-1">
                <FiAlertCircle /> Tidak cocok
              </p>
            )}
            {isPasswordMatch && formData.confirmPassword && (
              <p className="text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1 ml-1">
                <FiCheckCircle /> Cocok
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordMatch || passwordStrength.score < 1}
            className="w-full flex justify-center items-center py-4 rounded-2xl shadow-2xl shadow-blue-600/30 text-sm font-black text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.97] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" size={20} />{" "}
                MEMPROSES...
              </>
            ) : (
              "SIMPAN PERUBAHAN"
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-white group"
          >
            <FaDoorOpen
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- WRAPPER DENGAN SUSPENSE (NEXT.JS BEST PRACTICE) ---
export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-blue-500">
          <FiLoader className="animate-spin" size={40} />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
