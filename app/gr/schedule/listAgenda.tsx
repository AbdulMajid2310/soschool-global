"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { fetchSchedulesByTeacher } from "@/redux/features/school_schedule/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiCalendar,
  FiSearch,
  FiMoreVertical,
  FiZap,
} from "react-icons/fi";

const DAYS_PROTOCOL = [
  "SEMUA",
  "SENIN",
  "SELASA",
  "RABU",
  "KAMIS",
  "JUMAT",
  "SABTU",
];

export default function AgendaList() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedDay, setSelectedDay] = useState("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const { currentTeacherProfile } = useAppSelector((state) => state.teacher);
  const { schedules, loading } = useAppSelector(
    (state) => state.schoolSchedule,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const teacherId = currentTeacherProfile?.teacherId;

  useEffect(() => {
    if (teacherId) {
      dispatch(
        fetchSchedulesByTeacher({
          teacherId,
          day: selectedDay === "SEMUA" ? "" : selectedDay,
        }),
      );
    }
  }, [teacherId, selectedDay, dispatch]);

  const handleDetail = useCallback(
    (subjectId: string, configId: string) => {
      sessionStorage.setItem("subjectId", subjectId);
      sessionStorage.setItem("classroomConfigId", configId);
      router.push("schedule/detail");
    },
    [router],
  );

  const filteredSchedules = useMemo(() => {
    const data = schedules || [];
    if (!searchQuery) return data;
    return data.filter(
      (item: any) =>
        item.subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.classroom.classroom.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );
  }, [schedules, searchQuery]);

  const isCurrentSession = (start: string, end: string) => {
    return currentTime >= start && currentTime <= end;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-0 space-y-8 pb-20">
      <header className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
            Agenda <span className="text-blue-600">Teacher</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              System Active • {currentTime}
            </span>
          </div>
        </div>
        <button
          type="button"
          title="Search Toggle"
          className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-500 cursor-pointer"
        >
          <FiMoreVertical size={20} />
        </button>
      </header>

      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          placeholder="Cari jadwal atau kelas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600/10 transition-all dark:text-white shadow-sm"
        />
      </div>

      <nav className="flex overflow-x-auto gap-2 scrollbar-hide py-2">
        {DAYS_PROTOCOL.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all uppercase whitespace-nowrap cursor-pointer ${
              selectedDay === day
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-white/5"
            }`}
          >
            {day}
          </button>
        ))}
      </nav>

      <div className="space-y-4">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-slate-100 dark:bg-slate-900 rounded-3xl animate-pulse"
            />
          ))
        ) : filteredSchedules.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-4xl border border-dashed border-slate-200 dark:border-white/5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Tidak ada jadwal ditemukan
            </p>
          </div>
        ) : (
          filteredSchedules.map((item: any, index: number) => {
            const active = isCurrentSession(
              item.sessions[0].startTime,
              item.sessions[0].endTime,
            );
            return (
              <div
                key={index}
                onClick={() =>
                  handleDetail(
                    item.subject.subjectId,
                    item.classroom.classroomConfigId,
                  )
                }
                className={`group relative flex items-center gap-6 p-5 md:p-6 bg-white dark:bg-slate-900 border transition-all duration-300 rounded-3xl cursor-pointer ${
                  active
                    ? "border-blue-600 ring-4 ring-blue-600/5 shadow-xl"
                    : "border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center justify-center min-w-16 md:min-w-20 py-2 border-r border-slate-100 dark:border-white/5 gap-1">
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">
                    {item.sessions[0].startTime}
                  </span>
                  <div className="w-1 h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    {active && (
                      <div className="w-full h-full bg-blue-600 animate-bounce" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 leading-none tracking-tighter uppercase">
                    {item.sessions[0].endTime}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {active && (
                      <span className="flex items-center gap-1 text-[8px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase animate-pulse">
                        <FiZap size={8} /> Now
                      </span>
                    )}
                    <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {item.subject.code} • {item.day}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic truncate leading-tight">
                    {item.subject.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <FiMapPin className="text-slate-400" />{" "}
                      {item.classroom.classroom.name}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <FiClock className="text-slate-400" /> Gedung{" "}
                      {item.classroom.roomLocation
                        .split(" ")[1]
                        ?.toUpperCase() || "A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  <FiArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs px-4 z-50">
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 p-4 rounded-3xl shadow-2xl flex items-center justify-center gap-3">
          <FiCalendar size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Academic OS v2.0
          </span>
        </div>
      </footer>
    </div>
  );
}
