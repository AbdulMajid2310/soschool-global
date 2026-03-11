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
  const [showPassword, setShowPassword] = useState(false); // State untuk lihat password

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
    <div className="relative min-h-screen flex items-center justify-center bg-login-pattern bg-cover bg-center bg-no-repeat px-4">
      <div className="absolute inset-0 bg-slate-950 overflow-hidden">
        {/* Orb Cahaya Biru (Pojok Kiri Atas) */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />

        {/* Orb Cahaya Ungu/Indigo (Pojok Kanan Bawah) */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />

        {/* Overlay Grid Halus (Memberikan kesan teknologi/arsitektur) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

        {/* Glassmorphism Blur Utama */}
        <div className="absolute inset-0 backdrop-blur-xs bg-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 p-8 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-500">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              So<span className="text-blue-500">School</span>
            </h1>
            {/* Menggunakan max-w-60 (240px) atau max-w-64 (256px) untuk standar Tailwind */}
            <p className="mt-2 text-slate-300 text-sm font-medium max-w-64 mx-auto">
              {showRoleSelector
                ? "Pilih akses masuk Anda"
                : "Satu akun untuk seluruh ekosistem sekolah"}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm border border-red-500/20 backdrop-blur-md flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        {!showRoleSelector ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  className="block w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                  placeholder="name@school.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Kata Sandi
                  </label>
                  <Link
                    href="auth/forgot-password"
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-500"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
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
              className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-2xl shadow-blue-600/40 text-sm font-black text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? "Memverifikasi..." : "MASUK KE AKUN"}
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
  );
}
