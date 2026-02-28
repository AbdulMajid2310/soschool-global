"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    HiOutlineArrowLeft,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineIdentification,
    HiOutlineCalendarDays,
    HiOutlineShieldCheck,
    HiOutlineMapPin,
    HiOutlinePencilSquare,
    HiOutlineFingerPrint,
    HiOutlineCheckBadge
} from "react-icons/hi2";
import { getUserById } from "@/redux/features/user/thunk";
import { useRouter } from "next/navigation";



export default function UserDetailSection() {
    const dispatch = useAppDispatch();
    const { userDetail, loading } = useAppSelector((state) => state.users);
    const userId = sessionStorage.getItem("userId")
    const router = useRouter()
    console.log("data detail user", userDetail)

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [dispatch, userId]);

    if (loading || !userDetail) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-4xl w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-4xl" />
                    <div className="md:col-span-2 h-64 bg-slate-100 dark:bg-slate-800 rounded-4xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">

            {/* Header Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-3 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-all group"
                >
                    <HiOutlineArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase italic tracking-widest">Kembali</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                    <HiOutlinePencilSquare size={18} />
                    <span className="text-[10px] font-black uppercase italic tracking-widest">Edit Profil</span>
                </button>
            </div>

            {/* Profile Hero Card */}
            <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-8 border-slate-50 dark:border-slate-800 shadow-xl">
                        <img
                            src={userDetail.avatar || `https://ui-avatars.com/api/?name=${userDetail.username}&background=6366f1&color=fff`}
                            alt={userDetail.username}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div className="text-center md:text-left space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <h1 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                                {userDetail.username}
                            </h1>
                            {userDetail.isVerified && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase italic w-fit mx-auto md:mx-0">
                                    <HiOutlineShieldCheck size={14} /> Verified Member
                                </span>
                            )}
                        </div>
                        <p className="text-indigo-500 text-sm font-black uppercase tracking-[0.3em] italic">
                            {userDetail.registrationNumber || 'No Register ID'}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <HiOutlineEnvelope size={16} />
                                <span className="text-xs font-bold">{userDetail.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <HiOutlinePhone size={16} />
                                <span className="text-xs font-bold">{userDetail.phone || '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Account Status Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 space-y-6">
                    <h3 className="text-sm font-black italic uppercase tracking-widest dark:text-white border-b border-slate-50 dark:border-slate-800 pb-4">Account Status</h3>
                    <div className="space-y-4">
                        <StatusRow label="System ID" value={userDetail.userId.substring(0, 12)} icon={<HiOutlineFingerPrint />} />
                        <StatusRow label="Verified" value={userDetail.isVerified ? "YES" : "NO"} icon={<HiOutlineShieldCheck />} color={userDetail.isVerified ? "text-emerald-500" : "text-amber-500"} />
                        <StatusRow label="Approved" value={userDetail.isApproved ? "YES" : "NO"} icon={<HiOutlineCheckBadge />} color={userDetail.isApproved ? "text-indigo-500" : "text-rose-500"} />
                        <StatusRow label="Active" value={userDetail.isActive ? "ACTIVE" : "INACTIVE"} icon={<HiOutlineShieldCheck />} color={userDetail.isActive ? "text-emerald-500" : "text-rose-500"} />
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8">
                    <h3 className="text-sm font-black italic uppercase tracking-widest dark:text-white border-b border-slate-50 dark:border-slate-800 pb-4 mb-6">Informasi Lengkap</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoBox label="Registration Number" value={userDetail.registrationNumber} icon={<HiOutlineIdentification />} />
                        <InfoBox label="Email Address" value={userDetail.email} icon={<HiOutlineEnvelope />} />
                        <InfoBox label="Phone Number" value={userDetail.phone || "Belum diatur"} icon={<HiOutlinePhone />} />
                        <InfoBox label="Joined Since" value={new Date(userDetail.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} icon={<HiOutlineCalendarDays />} />
                        <InfoBox label="Last Update" value={new Date(userDetail.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} icon={<HiOutlineCalendarDays />} />
                        <InfoBox label="Location/Region" value="Jawa Barat, Indonesia" icon={<HiOutlineMapPin />} />
                    </div>
                </div>

            </div>
        </div>
    );
}

// Helper Components
function StatusRow({ label, value, icon, color = "text-slate-500" }: any) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 text-slate-400">
                <span className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:text-indigo-500 transition-colors">{icon}</span>
                <span className="text-[10px] font-black uppercase italic tracking-widest">{label}</span>
            </div>
            <span className={`text-[10px] font-black italic uppercase ${color}`}>{value}</span>
        </div>
    );
}

function InfoBox({ label, value, icon }: any) {
    return (
        <div className="space-y-2 group">
            <div className="flex items-center gap-2 text-slate-400">
                {icon}
                <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">{label}</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl group-hover:border-indigo-500/30 transition-all">
                <p className="text-sm font-bold dark:text-white">{value}</p>
            </div>
        </div>
    );
}