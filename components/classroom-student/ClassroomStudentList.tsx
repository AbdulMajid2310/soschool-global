"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStudentsByPeriod } from "@/redux/features/classroom-student/thunks";
import {
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { HiOutlineSearch } from "react-icons/hi";
import { QuickStat } from "./HelperClassroom";
import { StudentCard } from "./StudentCard";

export default function ClassroomStudentList() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const { students, loading } = useAppSelector(
    (state) => state.classroomStudent,
  );

  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("all");

  useEffect(() => {
    if (schoolId && activePeriod) {
      dispatch(
        fetchStudentsByPeriod({ schoolId, periodId: activePeriod.periodId }),
      );
    }
  }, [dispatch, schoolId, activePeriod]);

  // List kelas unik untuk filter
  const classOptions = useMemo(() => {
    const classes = students.map((s) => s.classroomConfig.classroom.name);
    return ["all", ...Array.from(new Set(classes))];
  }, [students]);

  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.student.user.username.toLowerCase().includes(search.toLowerCase()) ||
        s.student.nis.includes(search);
      const matchClass =
        filterClass === "all" ||
        s.classroomConfig.classroom.name === filterClass;
      return matchSearch && matchClass;
    });
  }, [students, search, filterClass]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Stats Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">
            Peserta Didik{" "}
            <span className="text-indigo-600">
              {activePeriod?.academicYear}
            </span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
            Manajemen penempatan dan status akademik siswa
          </p>
        </div>

        <div className="flex gap-4">
          <QuickStat
            label="Total Siswa"
            value={students.length}
            icon={<HiOutlineUserGroup />}
            color="bg-indigo-600"
          />
          <QuickStat
            label="Kelas Aktif"
            value={classOptions.length - 1}
            icon={<HiOutlineAcademicCap />}
            color="bg-emerald-500"
          />
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="lg:col-span-5 relative group">
          <HiOutlineSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari Nama atau NIS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
          />
        </div>

        <div className="lg:col-span-7 flex flex-wrap items-center gap-4 justify-end">
          <div className="flex items-center gap-3">
            <HiOutlineAdjustmentsHorizontal
              size={20}
              className="text-slate-400"
            />
            <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {classOptions.slice(0, 4).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilterClass(opt)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${filterClass === opt ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {opt === "all" ? "Semua Kelas" : opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <StudentCard key={item.classroomStudentId} data={item} />
        ))}
      </div>
    </div>
  );
}
