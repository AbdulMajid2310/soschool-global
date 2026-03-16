"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HiOutlineChevronLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineSquares2X2,
  HiOutlineListBullet,
  HiOutlineAcademicCap,
  HiOutlineHomeModern,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDisplaySettings } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassroomConfigById } from "@/redux/features/classroom-config/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import { StudentTableView } from "@/components/student/StudentTableView";
import { StudentGridView } from "@/components/student/StudentGridView";

export default function ClassroomConfigDetailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { detail, loading } = useAppSelector((state) => state.classroomConfig);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<
    { studentId: string; userId: string }[]
  >([]);

  const configId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("classroomConfigId")
      : null;

  useEffect(() => {
    if (configId && schoolId) {
      dispatch(fetchClassroomConfigById({ id: configId, schoolId }));
    } else if (!configId) {
      router.back();
    }
  }, [dispatch, configId, schoolId, router]);

  const filteredStudents = useMemo(() => {
    if (!detail?.classroomStudents) return [];
    return detail.classroomStudents
      .map((item) => item.student)
      .filter((student) => {
        const matchesName = student.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesNis = student.nis.includes(searchQuery);
        return matchesName || matchesNis;
      });
  }, [detail, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-r-transparent" />
          <p className="font-black uppercase italic text-[10px] tracking-widest text-slate-400">
            Memuat Data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 animate-in fade-in duration-700">
      {/* Hero Header Section */}
      <div className="relative h-96 lg:h-128 overflow-hidden">
        <Image
          src={(detail?.classroom as any)?.image || "/images/classroom.png"}
          alt="Classroom Header"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Floating Actions Navigation */}
        <div className="absolute inset-x-0 top-8 px-6 lg:px-12 flex flex-wrap justify-between items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex gap-2 text-[10px] font-black uppercase tracking-widest items-center text-white bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-2xl"
          >
            <HiOutlineChevronLeft size={16} strokeWidth={3} />
            Kembali
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("./promotions")}
              className="flex gap-2 text-[10px] font-black uppercase tracking-widest items-center text-white bg-indigo-600 px-6 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl"
            >
              <MdOutlineDisplaySettings size={18} /> Promotion
            </button>
            <button
              type="button"
              onClick={() => router.push("./update")}
              className="flex gap-2 text-[10px] font-black uppercase tracking-widest items-center text-white bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-xl"
            >
              <IoSettingsOutline size={18} /> Edit Konfigurasi
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-16 left-6 lg:left-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest italic shadow-lg shadow-indigo-500/20">
              Detail Rombongan Belajar
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest italic border border-white/10">
              T.P {detail?.period?.academicYear}
            </span>
          </div>
          <h1 className="text-6xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
            {detail?.classroom?.name || "Kelas Siswa"}
          </h1>
          <p className="text-lg lg:text-xl text-indigo-300 font-bold italic mt-8 flex items-center gap-3">
            Semester {detail?.period?.semester}
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Ruang {detail?.roomLocation || "Belum Ditentukan"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl p-8 lg:p-14 border border-slate-200 dark:border-slate-800">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                label: "Wali Kelas Utama",
                value: detail?.homeroomTeacher?.user?.username || "N/A",
                icon: <HiOutlineAcademicCap />,
                color: "text-indigo-600",
              },
              {
                label: "Lokasi Ruangan",
                value: detail?.roomLocation || "TBA",
                icon: <HiOutlineHomeModern />,
                color: "text-emerald-500",
              },
              {
                label: "Total Peserta Didik",
                value: `${detail?.classroomStudents?.length || 0} Siswa`,
                icon: <HiOutlineUserGroup />,
                color: "text-amber-500",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
              >
                <div
                  className={`p-4 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm mb-6 text-2xl ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
                  {stat.label}
                </p>
                <p className="text-xl font-black text-slate-800 dark:text-white uppercase italic truncate">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* List Controller Header */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8 pt-12 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">
                Daftar <span className="text-indigo-600">Siswa</span>
              </h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
                {filteredStudents.length} Siswa ditemukan di kelas ini
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none group">
                <HiOutlineMagnifyingGlass
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                  strokeWidth={2.5}
                />
                <input
                  type="text"
                  placeholder="Cari NIS atau Nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-80 pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-3xl font-bold text-sm outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all dark:text-white"
                />
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-3xl p-1.5 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  title="Grid View"
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-2xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-xl" : "text-slate-400"}`}
                >
                  <HiOutlineSquares2X2 size={22} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  title="List View"
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-2xl transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-xl" : "text-slate-400"}`}
                >
                  <HiOutlineListBullet size={22} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Student List Content */}
          {filteredStudents.length === 0 ? (
            <div className="text-center py-32 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
              <HiOutlineUserGroup
                size={64}
                className="mx-auto text-slate-200 dark:text-slate-700 mb-6"
              />
              <p className="text-slate-400 font-black uppercase italic tracking-widest text-xs">
                Belum Ada Siswa Di Kelas Ini
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {viewMode === "list" ? (
                <StudentTableView
                  students={filteredStudents}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  onDetail={(id) =>
                    router.push(`/staff/akademik/siswa/detail/${id}`)
                  }
                  onEdit={(s) => console.log("Edit", s)}
                  onDelete={(id) => console.log("Hapus ID", id)}
                />
              ) : (
                <StudentGridView
                  students={filteredStudents}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  onDetail={(id) =>
                    router.push(`/staff/akademik/siswa/detail/${id}`)
                  }
                  onEdit={(s) => console.log("Edit", s)}
                  onDelete={(id) => console.log("Hapus ID", id)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
