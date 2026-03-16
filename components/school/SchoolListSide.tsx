"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSchools } from "@/redux/features/school/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SchoolListSide() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { schools, loading } = useAppSelector((state) => state.school);
  const activeSchoolId = useSchoolId();

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  const handleSchoolSelect = (schoolId: string) => {
    sessionStorage.setItem("schoolId", schoolId);

    window.dispatchEvent(new Event("storage"));
    router.refresh();
  };

  // Fungsi untuk ambil inisial jika avatar kosong
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "SC"
    );
  };

  return (
    <div className="xl:col-span-4 space-y-5">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-[0.2em]">
          Daftar Antrean Sekolah
        </h3>
        <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-blue-600/20">
          {schools.length}
        </span>
      </div>

      <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 w-full bg-slate-200 dark:bg-white/5 rounded-4xl animate-pulse"
              />
            ))}
          </div>
        ) : schools.length > 0 ? (
          schools.map((school) => {
            const isActive = activeSchoolId === school.schoolId;

            return (
              <div
                key={school.schoolId}
                onClick={() => handleSchoolSelect(school.schoolId)}
                className={`group p-4 rounded-4xl border transition-all cursor-pointer duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-emerald-600 border-emerald-400 "
                    : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex gap-4 items-center">
                  {/* AVATAR OR INITIALS */}
                  <div className="relative shrink-0">
                    {school.avatar ? (
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/10 shadow-inner">
                        <Image
                          src={school.avatar}
                          alt={school.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {getInitials(school.name)}
                      </div>
                    )}

                    {!school.isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border-2 border-white dark:border-slate-900"></span>
                      </span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <span
                        className={`text-[8px] font-black uppercase tracking-tighter ${
                          isActive
                            ? "text-emerald-200"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {school.level || "INSTITUSI"}
                      </span>
                      <span
                        className={`text-[8px] font-bold ${
                          isActive ? "text-white/60" : "text-slate-400"
                        }`}
                      >
                        {new Date(school.createdAt).toLocaleDateString(
                          "id-ID",
                          { month: "short", day: "2-digit" },
                        )}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-black uppercase italic leading-tight truncate ${
                        isActive
                          ? "text-white"
                          : "text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {school.name}
                    </h4>

                    <p
                      className={`text-[9px] font-bold mt-1 ${
                        isActive ? "text-emerald-100/70" : "text-slate-500"
                      }`}
                    >
                      NISP:{" "}
                      <span
                        className={
                          isActive
                            ? "text-white"
                            : "text-slate-700 dark:text-slate-300"
                        }
                      >
                        {school.nisp}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-10 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-4xl text-center">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest italic">
              Antrean Kosong
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
