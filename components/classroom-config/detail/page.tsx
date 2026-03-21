"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HiOutlineChevronLeft,
  HiOutlineAcademicCap,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassroomConfigById } from "@/redux/features/classroom-config/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import ClassroomStudentListDetail from "@/components/classroom-student/ClassroomStudentListDetil";

// --- Types ---
interface StatItemProps {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  color: string;
}

export default function ClassroomConfigDetailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { detail, loading } = useAppSelector((state) => state.classroomConfig);

  // Memastikan pembacaan sessionStorage aman di Next.js (Client Side Only)
  const configId = useMemo(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("classroomConfigId");
    }
    return null;
  }, []);

  useEffect(() => {
    if (configId && schoolId) {
      dispatch(fetchClassroomConfigById({ id: configId, schoolId }));
    } else if (typeof window !== "undefined" && !configId) {
      // Jika ID tidak ada, arahkan kembali ke list agar user tidak terjebak di halaman kosong
      router.replace("/dashboard/classroom-config");
    }
  }, [dispatch, configId, schoolId, router]);

  if (loading && !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-indigo-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 bg-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="font-black uppercase italic text-[10px] tracking-[0.3em] text-slate-400 animate-pulse">
            Sinkronisasi Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="relative h-128 lg:h-144 overflow-hidden">
        <Image
          src={(detail?.classroom as any)?.image || "/images/classroom.png"}
          alt="Classroom Header"
          fill
          priority
          className="object-cover scale-105 transition-transform duration-1000 hover:scale-100"
        />
        {/* Overlay Gradasi yang lebih halus */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Navigation Bar */}
        <div className="absolute inset-x-0 top-8 px-6 lg:px-12 flex flex-wrap justify-between items-center gap-4 z-10">
          <button
            onClick={() => router.back()}
            className="group flex gap-3 text-[10px] font-black uppercase tracking-widest items-center text-white bg-slate-900/40 backdrop-blur-2xl px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all shadow-2xl"
          >
            <HiOutlineChevronLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`./promotions?id=${configId}`)}
              className="flex gap-2 text-[10px] font-black uppercase tracking-widest items-center text-white bg-indigo-600 px-6 py-4 rounded-2xl hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
            >
              <MdOutlineDisplaySettings size={18} /> Promotion
            </button>
            <button
              onClick={() => router.push(`./update?id=${configId}`)}
              className="flex gap-2 text-[10px] font-black uppercase tracking-widest items-center text-white bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <IoSettingsOutline size={18} /> Edit
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <div className="absolute bottom-24 left-6 lg:left-20 max-w-5xl z-10">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest italic shadow-xl shadow-indigo-600/40">
              Rombongan Belajar
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest italic border border-white/20">
              T.A {detail?.period?.academicYear || "----/----"}
            </span>
          </div>

          <h1 className="text-7xl lg:text-[10rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
            {detail?.classroom?.name || "Loading"}
          </h1>

          <div className="flex items-center gap-6 mt-10">
            <p className="text-lg lg:text-2xl text-indigo-300 font-black italic flex items-center gap-3">
              Semester {detail?.period?.semester || "-"}
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </p>
            <div className="h-8 w-px bg-white/20" />
            <p className="text-lg lg:text-2xl text-white font-black italic">
              Ruang {detail?.roomLocation || "TBA"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto -mt-16 relative z-20 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl p-6 lg:p-10 border border-slate-200 dark:border-slate-800 transition-colors duration-500">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <StatItem
              label="Wali Kelas Utama"
              value={detail?.homeroomTeacher?.user?.username}
              icon={<HiOutlineAcademicCap />}
              color="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
            />
            <StatItem
              label="Lokasi Ruangan"
              value={detail?.roomLocation}
              icon={<HiOutlineHomeModern />}
              color="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
            />
            <StatItem
              label="Total Peserta Didik"
              value={`${detail?.classroomStudents?.length || 0} Siswa`}
              icon={<HiOutlineUserGroup />}
              color="text-amber-500 bg-amber-50 dark:bg-amber-500/10"
            />
          </div>

          {/* Table/List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 italic">
                Manajemen Siswa Aktif
              </h3>
            </div>
            <ClassroomStudentListDetail />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatItem({ label, value, icon, color }: StatItemProps) {
  return (
    <div className="group bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none">
      <div
        className={`p-5 rounded-2xl w-fit shadow-sm mb-8 text-3xl transition-transform group-hover:scale-110 duration-500 ${color}`}
      >
        {icon}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-800 dark:text-white uppercase italic truncate tracking-tight">
        {value || "Belum Diatur"}
      </p>
    </div>
  );
}
