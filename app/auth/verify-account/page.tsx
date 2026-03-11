"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiCheckCircle, FiXCircle, FiLoader, FiArrowRight } from "react-icons/fi";
import { api } from "@/lib/axiosInstance";
import { toast } from "react-hot-toast";

export default function VerifyAccountPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Sedang memverifikasi akun Anda...");

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Token verifikasi tidak ditemukan.");
                return;
            }

            try {
                // Ganti endpoint sesuai dengan API NestJS kamu
                const response = await api.get(`/auth/verify?token=${token}`);
                setStatus("success");
                setMessage(response.data.message || "Akun Anda berhasil diverifikasi!");
                toast.success("Verifikasi Berhasil!");
            } catch (err: any) {
                setStatus("error");
                setMessage(err.response?.data?.message || "Token tidak valid atau telah kedaluwarsa.");
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">

                {/* Dekorasi Aksen */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-10 ${status === "success" ? "bg-emerald-500" : status === "error" ? "bg-rose-500" : "bg-indigo-500"
                    }`} />

                <div className="relative z-10 space-y-8">
                    {/* Icon Section */}
                    <div className="flex justify-center">
                        {status === "loading" && (
                            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-4xl text-indigo-600">
                                <FiLoader size={48} className="animate-spin stroke-[3px]" />
                            </div>
                        )}
                        {status === "success" && (
                            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-4xl text-emerald-600">
                                <FiCheckCircle size={48} className="stroke-[3px] animate-bounce" />
                            </div>
                        )}
                        {status === "error" && (
                            <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-4xl text-rose-600">
                                <FiXCircle size={48} className="stroke-[3px]" />
                            </div>
                        )}
                    </div>

                    {/* Text Section */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white">
                            {status === "loading" ? "Verifikasi" : status === "success" ? "Berhasil!" : "Gagal"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-sm leading-relaxed px-4">
                            {message}
                        </p>
                    </div>

                    {/* Action Button */}
                    {status !== "loading" && (
                        <button
                            onClick={() => router.push("/login")}
                            className={`w-full py-5 rounded-4xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${status === "success"
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100"
                                    : "bg-gray-900 dark:bg-white dark:text-gray-900 text-white shadow-gray-200"
                                }`}
                        >
                            <span>{status === "success" ? "Masuk ke Dashboard" : "Kembali ke Login"}</span>
                            <FiArrowRight strokeWidth={3} />
                        </button>
                    )}

                    <div className="pt-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-700">
                            SoSchool Authentication System
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}