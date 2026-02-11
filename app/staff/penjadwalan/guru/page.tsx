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

  // 1. Redux Selectors
  const { schedules } = useAppSelector((state) => state.schoolSchedule);
  const { teachers } = useAppSelector((state) => state.teacher);
  const { profile } = useAppSelector((state) => state.auth);

  // 2. State Filter & Search
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

  // Close dropdown when clicking outside
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

  // 3. Dropdown Logic: Filter daftar guru yang muncul di dropdown saat diketik
  const teacherSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return teachers.filter(t =>
      t.user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Ambil 5 teratas biar rapi
  }, [teachers, searchQuery]);

  // 4. Logic Grouping & Filtering Utama
  const groupedData = useMemo(() => {
    const filtered = schedules.filter(s => {
      const matchTeacher = selectedTeacherId
        ? s.teacher?.teacherId === selectedTeacherId
        : s.teacher?.user?.username?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDay = activeDay === "SEMUA" || s.day === activeDay;
      return matchTeacher && matchDay;
    });

    const groups: { [key: string]: any } = {};

    filtered.forEach(item => {
      // Key utama kartu: Tetap per Hari, Subject, dan Guru
      const groupKey = `${item.day}-${item.subject?.subjectId}-${item.teacher?.teacherId}`;

      if (!groups[groupKey]) {
        groups[groupKey] = {
          day: item.day,
          subject: item.subject,
          teacher: item.teacher,
          classroom: item.classroomConfig?.classroom.name,
          sessions: []
        };
      }

      // Cek apakah di dalam grup ini sudah ada sesi untuk kelas yang sama
      // Jika Majid ingin tetap membedakan jam tapi menggabung yang benar-benar identik:
      const classroomName = item.classroomConfig?.classroom?.name || item.classroomConfig.classroom;
      const isDuplicateSession = groups[groupKey].sessions.find((sess: any) =>
        sess.startTime === item.startTime &&
        sess.endTime === item.endTime &&
        sess.classroom === classroomName
      );

      // Hanya push jika belum ada sesi yang benar-benar identik (mencegah data double dari backend)
      if (!isDuplicateSession) {
        groups[groupKey].sessions.push({
          startTime: item.startTime,
          endTime: item.endTime,
          classroom: classroomName,
          scheduleId: item.scheduleId
        });
      }
    });

    return Object.values(groups).sort((a: any, b: any) => {
      const dayOrder = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
      if (a.day !== b.day) return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);

      // Sorting sesi di dalam kartu berdasarkan jam mulai
      return a.sessions[0].startTime.localeCompare(b.sessions[0].startTime);
    });
  }, [schedules, searchQuery, selectedTeacherId, activeDay]);
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#F8FAFC] dark:bg-gray-900 text-gray-700 dark:text-white">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-balance">Management Console</span>
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Teacher<span className="text-blue-600">.</span>Group
          </h1>
        </div>
        <RealtimeClock />
      </div>

      {/* FILTER & SEARCH BAR WITH DROPDOWN */}
      <div className="max-w-6xl mx-auto mb-4 space-y-2">
        <div className="flex flex-col md:flex-row gap-4">

          {/* Custom Search Input with Suggestions */}
          <div className="flex-1 relative " ref={dropdownRef}>
            <div className="relative group w-80">
              <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Cari & Pilih Nama Guru..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedTeacherId(null); // Reset ID filter saat user ngetik ulang
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                className="w-full bg-white dark:bg-slate-900 pl-14 pr-8 py-2 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 shadow-sm font-bold text-sm transition-all text-slate-700 dark:text-slate-200"
              />
              {searchQuery ? (
                <button onClick={() => { setSearchQuery(""); setSelectedTeacherId(null); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                  <HiOutlineXMark size={18} />
                </button>
              ) : (
                <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
              )}
            </div>

            {/* Dropdown List */}
            {isDropdownOpen && teacherSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-100 overflow-hidden p-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {teacherSuggestions.map((t) => (
                  <div
                    key={t.teacherId}
                    onClick={() => {
                      setSelectedTeacherId(t.teacherId);
                      setSearchQuery(t.user?.username); // Isi input dengan nama guru
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-lg flex items-center justify-center font-black text-[10px]">
                      {t.user?.username?.charAt(0)}
                    </div>
                    <span className="text-xs font-bold uppercase dark:text-white">{t.user?.username}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2 rounded-2xl text-[10px] font-black transition-all shrink-0 tracking-widest border-2 ${activeDay === day
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-blue-200'
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GROUPED CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {groupedData.length > 0 ? (
          groupedData.map((group: any, idx) => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const todayName = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(now).toUpperCase();

            const hasActiveSession = group.sessions.some((s: any) =>
              todayName === group.day && currentTime >= s.startTime && currentTime <= s.endTime
            );

            return (
              <div
                key={idx}
                className={`group relative flex flex-col p-4 rounded-2xl border-2 transition-all duration-500 ${hasActiveSession
                  ? 'bg-blue-600 border-blue-600 shadow-2xl shadow-blue-200'
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:shadow-xl'
                  }`}
              >
                {/* Header: Day & Teacher */}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex -space-x-2">
                          {group.teacher?.user?.avatar ? (
                            /* Jika Ada Avatar */
                            <div className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-transform group-hover:scale-110 ${hasActiveSession ? 'border-white/50' : 'border-white dark:border-slate-900 shadow-md'
                              }`}>
                              <img
                                src={group.teacher.user.avatar}
                                alt={group.teacher?.user?.username}
                                className="w-full h-full object-cover"
                                // Fallback jika gambar error saat load
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.classList.add('fallback-active');
                                }}
                              />
                            </div>
                          ) : (
                            /* Fallback: Inisial Nama */
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all group-hover:scale-110 ${hasActiveSession
                              ? 'bg-white text-blue-600 shadow-lg'
                              : 'bg-blue-600 text-white shadow-md'
                              }`}>
                              {group.teacher?.user?.username?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-[10px] font-black text-left  line-clamp-1 uppercase tracking-tight leading-none ${hasActiveSession ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                          {group.teacher?.user?.username}
                        </p>
                        <p className={`text-[8px] font-bold uppercase  text-left tracking-widest ${hasActiveSession ? 'text-white/60' : 'text-slate-400'}`}>
                          NIP. {group.teacher?.nip || '-'}
                        </p>
                      </div>

                    </div>


                  </div>

                  {/* Subject Name */}
                  <div className="mb-4">
                    <div className={`px-4 py-1.5 rounded-xl w-20 text-[9px] font-black uppercase tracking-widest ${hasActiveSession ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                      {group.day}
                    </div>
                    <h3 className={`text-lg font-black italic uppercase tracking-tighter leading-tight ${hasActiveSession ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {group.subject?.name}
                    </h3>
                    <p className={`text-xs capitalize italic tracking-[0.2em] mt-1 ${hasActiveSession ? 'text-white/70' : 'text-blue-600'}`}>
                      {group.sessions.length} Sesi Terjadwal
                    </p>
                  </div>

                  {/* Sessions List */}
                  <div className="flex items-center gap-2">
                    <HiOutlineAcademicCap size={12} className="opacity-60" />
                    <span className="text-sm font-bold uppercase">Kelas  {group.classroom}</span>
                  </div>
                  <div className={`flex flex-col  justify-between p-4 rounded-2xl border bg-white/10 border-white/20 text-white`}>
                    {group.sessions.map((session: any) => {
                      const isSessionActive = todayName === group.day && currentTime >= session.startTime && currentTime <= session.endTime;

                      return (
                        <div
                          key={session.scheduleId}

                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${isSessionActive ? 'bg-green-400 animate-pulse' : 'bg-slate-300 dark:bg-gray-950'}`}></div>
                            <div className='text-left'>
                              <div className="flex items-center gap-2 text-gray-700 dark:text-white font-semibold">
                                <HiOutlineClock size={12} className="opacity-60" />
                                <span className="text-xs  tracking-tight">{session.startTime} - {session.endTime}</span>
                              </div>

                            </div>
                          </div>
                          {isSessionActive && <span className="text-[8px] font-black bg-white dark:bg-gray-900 text-blue-600 px-2 py-1 rounded-md uppercase animate-bounce">Now</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-40 flex flex-col items-center justify-center bg-white dark:bg-slate-900/50 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem]">
            <p className="text-slate-300 font-black text-sm uppercase tracking-[0.5em]">No Grouped Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
}