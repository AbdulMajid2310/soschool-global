"use client";

import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaDoorOpen,
  FaUserGraduate,
  FaPlus,
  FaEye,
  FaTrash,
  FaTh,
  FaList,
  FaSearch,
  FaChevronLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchClassroomConfigById } from "@/redux/features/classroom-config/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import { IoSettings } from "react-icons/io5";
import { MdOutlineDisplaySettings } from "react-icons/md";

export default function ClassroomConfigDetailModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { detail, loading } = useAppSelector((state) => state.classroomConfig);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const schoolId = useSchoolId();
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

  const filteredDaftarSiswa =
    detail?.classroomStudents?.filter(
      (item) =>
        item.student.user.username
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.student.nis.includes(searchQuery),
    ) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-amber-500 border-r-transparent"></div>
          <p className="font-black uppercase italic text-[10px] tracking-widest text-slate-400">
            Memuat Data...
          </p>
        </div>
      </div>
    );
  }

  const handleOpenPromotion = (classroomConfigId: string) => {
    sessionStorage.setItem("classroomConfigId", classroomConfigId);
    router.push("./promotions");
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-slate-950 pb-20 animate-in fade-in duration-700">
      {/* Hero Header */}
      <div className="relative h-80 lg:h-112.5 overflow-hidden">
        <img
          src={
            (detail?.classroom as any)?.image ||
            "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop"
          }
          alt={`Ruang ${detail?.classroom?.name || "Kelas"}`}
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/40 to-transparent"></div>

        {/* Back Button */}
        <button
          type="button"
          title="Kembali"
          onClick={() => router.back()}
          className="absolute flex gap-2 text-sm italic font-black uppercase tracking-widest left-8 top-8 items-center text-white bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-2xl"
        >
          <FaChevronLeft size={12} />
          Kembali
        </button>

        <div className="absolute flex gap-4 right-4 top-8 ">
          <button
            type="button"
            onClick={() => handleOpenPromotion(detail?.classroomConfigId || "")}
            className="italic flex gap-2 text-sm font-black uppercase tracking-widest items-center text-white bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-2xl"
          >
            <MdOutlineDisplaySettings className="mr-3 text-lg" /> Promotion
          </button>
          <button
            type="button"
            onClick={() => router.push("./update")}
            className="italic flex gap-2 text-sm font-black uppercase tracking-widest items-center text-white bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-2xl"
          >
            <IoSettings className="mr-3 text-lg" /> Edit Konfigurasi
          </button>
        </div>

        <div className="absolute bottom-16 left-8 sm:left-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-500 text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] italic shadow-lg shadow-amber-500/20">
              Arsip Konfigurasi
            </span>
            <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] italic border border-white/20">
              {detail?.period?.academicYear}
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
            {detail?.classroom?.name || "Kelas Siswa"}
          </h1>
          <p className="text-lg text-amber-200/80 font-bold italic mt-4 flex items-center gap-2">
            Semester {detail?.period?.semester}{" "}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>{" "}
            Ruang {detail?.roomLocation}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-5xl shadow-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-800">
          {/* Info Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                label: "Wali Kelas Utama",
                value:
                  detail?.homeroomTeacher?.user?.username || "Belum Ditentukan",
                icon: FaChalkboardTeacher,
                theme: "indigo",
              },
              {
                label: "Titik Lokasi Ruang",
                value: detail?.roomLocation || "Belum Diatur",
                icon: FaDoorOpen,
                theme: "emerald",
              },
              {
                label: "Kapasitas Terisi",
                value: `${detail?.classroomStudents?.length || 0} Peserta Didik`,
                icon: FaUserGraduate,
                theme: "amber",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 dark:bg-slate-800/50 rounded-4xl p-7 border border-slate-100 dark:border-slate-800 hover:border-amber-500/20 transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-white dark:bg-slate-700 rounded-3xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="text-amber-500 text-2xl" />
                  </div>
                  <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded-full mt-4"></div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">
                  {item.label}
                </p>
                <p className="text-lg font-black text-slate-800 dark:text-white uppercase italic leading-tight truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-8 border-t border-slate-100 dark:border-slate-800 pt-16">
            <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter">
                Daftar <span className="text-amber-500">Siswa</span>
              </h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
                {filteredDaftarSiswa.length} Data ditemukan dalam sistem
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-none group">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Cari NIS atau Nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-72 pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-3xl font-bold text-sm focus:ring-4 focus:ring-amber-500/10 transition-all dark:text-white"
                />
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-3xl p-1.5">
                <button
                  type="button"
                  title="Grid View"
                  onClick={() => setViewMode("grid")}
                  className={`p-3.5 rounded-2xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-700 text-amber-600 shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <FaTh size={18} />
                </button>
                <button
                  type="button"
                  title="List View"
                  onClick={() => setViewMode("list")}
                  className={`p-3.5 rounded-2xl transition-all ${viewMode === "list" ? "bg-white dark:bg-slate-700 text-amber-600 shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <FaList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {filteredDaftarSiswa.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/30 rounded-5xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-4xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FaUserGraduate className="text-slate-300 dark:text-slate-600 text-4xl" />
              </div>
              <p className="text-slate-400 font-black uppercase italic tracking-widest text-xs">
                Data Tidak Ditemukan
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-4"
              }
            >
              {filteredDaftarSiswa.map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 rounded-4xl transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-amber-500/5 ${
                    viewMode === "grid" ? "p-8" : "p-5 flex items-center"
                  }`}
                >
                  <div
                    className={`${viewMode === "grid" ? "mb-6" : "mr-6"} relative shrink-0`}
                  >
                    <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    {item.student.user.avatar ? (
                      <img
                        src={item.student.user.avatar}
                        alt={item.student.user.username}
                        className="w-20 h-20 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-2xl relative z-10 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-black text-3xl shadow-2xl border-4 border-white dark:border-slate-800 relative z-10">
                        {item.student.user.username.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="font-black text-xl text-slate-800 dark:text-white truncate uppercase italic tracking-tighter leading-none group-hover:text-amber-600 transition-colors">
                      {item.student.user.username}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest italic bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-lg">
                        NIS {item.student.nis}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex gap-2 relative z-10 ${viewMode === "grid" ? "mt-8 justify-end" : "ml-6"}`}
                  >
                    <button
                      type="button"
                      title="Lihat Profil"
                      className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all shadow-sm"
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      type="button"
                      title="Keluarkan"
                      className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-rose-500 rounded-2xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
