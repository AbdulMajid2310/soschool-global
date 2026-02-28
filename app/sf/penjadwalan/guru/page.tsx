"use client";

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchedulesBySchool } from '@/redux/features/school_schedule/thunks';
import { fetchTeachers } from '@/redux/features/teacher/thunk';
import RealtimeClock from '@/components/realtimeClock';
import { HiOutlineMagnifyingGlass, HiOutlineAcademicCap, HiOutlineClock, HiOutlineXMark, HiChevronDown } from "react-icons/hi2";

export default function TeacherSchedulePage() {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { schedules, loading } = useAppSelector((state) => state.schoolSchedule);
  const { teachers } = useAppSelector((state) => state.teacher);
  const { profile } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<string>("SEMUA");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (profile?.school.schoolId) {
      dispatch(fetchSchedulesBySchool(profile.school.schoolId));
      dispatch(fetchTeachers(profile.school.schoolId));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const days = ['SEMUA', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

  const teacherSuggestions = useMemo(() => {
    if (!searchQuery || selectedTeacherId) return [];
    return teachers.filter(t =>
      t.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [teachers, searchQuery, selectedTeacherId]);

  // FILTERING DATA YANG SUDAH TER-GROUP DARI REDUX
  const filteredData = useMemo(() => {
    // Karena 'schedules' di Redux sekarang bertipe IGroupedSchedule[]
    return schedules.filter(group => {
      const matchTeacher = selectedTeacherId
        ? group.teacher?.teacherId === selectedTeacherId
        : group.teacher?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDay = activeDay === "SEMUA" || group.day === activeDay;

      return matchTeacher && matchDay;
    });
  }, [schedules, searchQuery, selectedTeacherId, activeDay]);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#F8FAFC] dark:bg-gray-950 text-slate-700 dark:text-white">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-balance">Teacher Monitoring</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Teacher<span className="text-blue-600">.</span>Groups
          </h1>
        </div>
        <RealtimeClock />
      </div>

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md" ref={dropdownRef}>
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Cari guru..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTeacherId(null);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full bg-white dark:bg-slate-900 pl-14 pr-12 py-3.5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 shadow-sm font-bold text-sm transition-all"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); setSelectedTeacherId(null); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                <HiOutlineXMark size={18} />
              </button>
            )}
          </div>

          {isDropdownOpen && teacherSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden p-1">
              {teacherSuggestions.map((t) => (
                <div
                  key={t.teacherId}
                  onClick={() => {
                    setSelectedTeacherId(t.teacherId);
                    setSearchQuery(t.user?.username);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl cursor-pointer transition-all"
                >
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs uppercase">
                    {t.user?.username?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase">{t.user?.username}</p>
                    <p className="text-[10px] text-slate-400">NIP. {t.nip || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all shrink-0 tracking-widest border-2 ${activeDay === day
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-blue-200'}`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((group, idx) => {
            const now = new Date();
            const curT = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const todayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(now).toUpperCase();

            // Cek apakah ada sesi dalam grup ini yang sedang aktif sekarang
            const isGroupActiveNow = group.day === todayName && group.sessions.some(s =>
              curT >= s.startTime.substring(0, 5) && curT <= s.endTime.substring(0, 5)
            );

            return (
              <div
                key={idx}
                className={`relative flex flex-col p-5 rounded-3xl border-2 transition-all duration-500 group ${isGroupActiveNow
                  ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-600/30 -translate-y-1'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-400 shadow-sm'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${isGroupActiveNow ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {group.day}
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-transform group-hover:rotate-3 ${isGroupActiveNow ? 'bg-white text-blue-600' : 'bg-blue-600 text-white shadow-lg'}`}>
                    {group.teacher?.user?.username?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-black uppercase leading-tight truncate ${isGroupActiveNow ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {group.teacher?.user?.username}
                    </p>
                    <p className={`text-[10px] font-bold ${isGroupActiveNow ? 'text-white/60' : 'text-slate-400'}`}>
                      NIP. {group.teacher?.nip || '-'}
                    </p>
                  </div>
                </div>

                <div className="flex-1 mb-6">
                  <h3 className={`text-xl font-black italic uppercase tracking-tighter leading-none mb-1 ${isGroupActiveNow ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {group.subject?.name}
                  </h3>
                  <div className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${isGroupActiveNow ? 'text-white/70' : 'text-blue-600'}`}>
                    <HiOutlineAcademicCap size={14} /> {group.classroom}
                  </div>
                </div>

                <div className={`space-y-2 p-3 rounded-2xl border ${isGroupActiveNow ? 'bg-white/10 border-white/20' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'}`}>
                  {group.sessions.map((sess) => {
                    const isSessActive = group.day === todayName && curT >= sess.startTime.substring(0, 5) && curT <= sess.endTime.substring(0, 5);
                    return (
                      <div key={sess.scheduleId} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HiOutlineClock size={12} className={isGroupActiveNow ? 'text-white/40' : 'text-slate-400'} />
                          <span className={`text-[10px] font-bold tracking-tight ${isGroupActiveNow ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                            {sess.startTime.substring(0, 5)} — {sess.endTime.substring(0, 5)}
                          </span>
                        </div>
                        {isSessActive && (
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-[8px] font-black uppercase text-white">Live</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/30 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem]">
            <p className="text-slate-400 font-black text-xs uppercase tracking-[0.4em]">Tidak ada jadwal</p>
          </div>
        )}
      </div>
    </div>
  );
}