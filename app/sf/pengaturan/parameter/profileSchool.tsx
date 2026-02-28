"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSchoolById } from "@/redux/features/school/thunk";
import { FaSchool, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function ProfileSchool() {
  const dispatch = useAppDispatch();
  const { selectedSchool, loading } = useAppSelector((state) => state.school);

  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolById(schoolId));
    }
  }, [dispatch, schoolId]);

  if (loading && !selectedSchool) {
    return <div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-4xl"></div>;
  }

  return (
    <div className="space-y-6 antialiased">
      {/* HEADER SECTION (COVER & AVATAR) */}
      <div className="relative group">
        {/* Background Cover */}
        <div className="h-48 md:h-64 w-full rounded-t-4xl overflow-hidden relative rounded-2xl bg-linear-to-br from-indigo-600 to-blue-700">

          <img
            src={selectedSchool?.background || '/images/background-school.png'}
            alt="Cover"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent"></div>
        </div>

        {/* Avatar Profile */}
        <div className="absolute -bottom-12 left-8 flex items-end gap-5">
          <div className="relative">
            <div>

              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white dark:bg-slate-900  shadow-2xl">
                <div className="w-full h-full rounded-full  bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700">
                  {selectedSchool?.avatar ? (
                    <img src={selectedSchool.avatar} alt="Logo" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <FaSchool className="text-slate-400 text-4xl" />
                  )}
                </div>
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
              <FaCamera size={14} />
            </button>
          </div>

          <div className="mb-4 pb-2">
            <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-md flex items-center gap-2">
              {selectedSchool?.name || "Nama Sekolah"}
              <HiOutlineBadgeCheck className="text-blue-400 shadow-sm" />
            </h1>

          </div>
        </div>
      </div>

      {/* INFORMATION CONTENT */}
      <div className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <fieldset className="bg-white dark:bg-slate-900 p-8 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <legend className="px-4 py-1 bg-slate-900 dark:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Informasi Umum
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaEnvelope className="text-indigo-500" /> Email Sekolah
                </label>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  {selectedSchool?.email || "-"}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaPhone className="text-indigo-500" /> Nomor Telepon
                </label>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  {selectedSchool?.phone || "-"}
                </p>
              </div>


            </div>
          </fieldset>
        </div>

        {/* Sidebar Info / Status */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-4xl text-white shadow-xl shadow-indigo-200 dark:shadow-none relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">Status Verifikasi</h3>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  <HiOutlineBadgeCheck size={32} />
                </div>
                <div>
                  <p className="font-black text-lg"> Terverifikasi</p>
                  <p className="text-[10px] opacity-70 uppercase font-bold tracking-tighter">ID: {schoolId?.slice(0, 8)}...</p>
                </div>
              </div>
            </div>
            {/* Decorative Circle */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}