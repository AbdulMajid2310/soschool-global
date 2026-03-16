"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axiosInstance";
import RoleSelector from "./roleSelector";
import Link from "next/link";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [availableAccess, setAvailableAccess] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      const { sid } = res.data.data;
      localStorage.setItem("sid", sid);

      const payloadBase64 = sid.split(".")[1];
      const decodedToken = JSON.parse(atob(payloadBase64));
      const accessRes = await api.get(`/user-access/user/${decodedToken.sub}`);

      setAvailableAccess(accessRes.data.data);
      setShowRoleSelector(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login gagal, periksa email/password",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = async (userAccessId: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/select-role", { userAccessId });
      const { sid, redirectUrl } = res.data.data;
      localStorage.setItem("sid", sid);

      let targetPath: string;
      if (redirectUrl.startsWith("http")) {
        const url = new URL(redirectUrl);
        targetPath = url.pathname + url.search;
      } else {
        targetPath = redirectUrl;
      }

      router.push(targetPath);
    } catch (err: any) {
      setError("Gagal memproses akses role");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 size-137.5 rounded-full bg-blue-600/20 blur-120 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 size-137.5 rounded-full bg-indigo-500/10 blur-120 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-slate-950/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-0 bg-slate-900/50 backdrop-blur-2xl rounded-4xl border border-white/10 shadow-3xl overflow-hidden">
          {/* SISI KIRI: BRANDING */}
          <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-linear-to-br from-blue-600/10 to-transparent border-r border-white/5">
            <div className="bg-white/5 p-6 rounded-3xl backdrop-blur-xl border border-white/10 mb-8 shadow-2xl">
              <img
                src="/images/logo.png"
                alt="logo"
                className="size-24 object-contain"
              />
            </div>
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase">
                So<span className="text-blue-500">School</span>
              </h1>
              <p className="text-slate-400 text-sm font-bold max-w-64 mx-auto leading-relaxed tracking-wide uppercase italic">
                Satu akun untuk seluruh ekosistem sekolah
              </p>
            </div>
          </div>

          {/* SISI KANAN: FORM/SELECTOR */}
          <div className="p-8 lg:p-16 flex flex-col justify-center min-h-125">
            {/* Logo Mobile Only */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <img src="/images/logo.png" alt="logo" className="size-16 mb-4" />
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                So<span className="text-blue-500">School</span>
              </h2>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">
                {showRoleSelector ? "Otoritas Akses" : "Selamat Datang"}
              </h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                {showRoleSelector
                  ? "Pilih instansi untuk melanjutkan"
                  : "Masuk ke dashboard anda"}
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-rose-500/10 text-rose-400 p-4 rounded-2xl text-[10px] font-black uppercase border border-rose-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="size-2 rounded-full bg-rose-500 animate-ping" />
                {error}
              </div>
            )}

            {!showRoleSelector ? (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1 group-focus-within:text-blue-500 transition-colors">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      className="block w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold text-sm"
                      placeholder="name@school.com"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-center mb-2 ml-1">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-blue-500 transition-colors">
                        Kata Sandi
                      </label>
                      <Link
                        href="auth/forgot-password"
                        className="text-[10px] font-black text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest italic"
                      >
                        Lupa?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="block w-full px-5 py-4 rounded-2xl border border-white/5 bg-white/5 text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-slate-600 font-bold text-sm"
                        placeholder="••••••••"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                      >
                        {showPassword ? (
                          <RiEyeOffFill size={20} />
                        ) : (
                          <RiEyeFill size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-3 py-5 px-4 rounded-2xl shadow-xl shadow-blue-600/20 text-xs font-black text-white bg-blue-600 hover:bg-blue-500 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 transition-all duration-300 uppercase italic tracking-widest"
                >
                  {loading ? (
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Verifikasi Identitas"
                  )}
                </button>
              </form>
            ) : (
              <RoleSelector
                availableAccess={availableAccess}
                onSelectRole={handleSelectRole}
                onBack={() => setShowRoleSelector(false)}
                loading={loading}
              />
            )}
          </div>
        </div>

        {/* Footer Credit */}
        <p className="mt-8 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
          &copy; 2026 SoSchool Ecosystem &bull; All Rights Reserved
        </p>
      </div>
    </div>
  );
}
