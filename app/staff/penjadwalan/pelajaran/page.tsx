"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchedulesBySchool, deleteSchedule } from '@/redux/features/school_schedule/thunks';
import { SchoolSchedule } from '@/redux/features/school_schedule/types';

import CreateScheduleModal from './createSchedule';
import UpdateScheduleModal from './updateScheduleModal';
import RealtimeClock from '@/components/realtimeClock';
import { confirmActionToast } from '@/components/toast/confirmActionToast';
import toast from 'react-hot-toast';

export default function SchoolSchedulePage() {
  const dispatch = useAppDispatch();

  // 1. Redux Selectors
  const { schedules, loading } = useAppSelector((state) => state.schoolSchedule);
  const { profile } = useAppSelector((state) => state.auth);

  // 2. State Filter
  const [activeDay, setActiveDay] = useState<string>(() => {
    const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date()).toUpperCase();
    return ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'].includes(today) ? today : 'SENIN';
  });

  // State untuk Filter Waktu (Time Slot)
  const [activeTime, setActiveTime] = useState<string>('SEMUA');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<SchoolSchedule | null>(null);

  useEffect(() => {
    if (profile?.school.schoolId) {
      dispatch(fetchSchedulesBySchool(profile.school.schoolId));
    }
  }, [dispatch, profile]);

  // 3. Ambil daftar waktu unik yang ada di hari tersebut untuk dijadikan Tabs
  const timeSlots = useMemo(() => {
    const slots = schedules
      .filter(s => s.day === activeDay)
      .map(s => `${s.startTime} - ${s.endTime}`);
    // Hilangkan duplikat dan urutkan
    return ['SEMUA', ...Array.from(new Set(slots)).sort()];
  }, [schedules, activeDay]);

  // 4. Reset filter waktu jika pindah hari
  useEffect(() => {
    setActiveTime('SEMUA');
  }, [activeDay]);

  // 5. Filter Akhir Data
  const filteredData = useMemo(() => {
    return schedules.filter(s => {
      const matchDay = s.day === activeDay;
      const matchTime = activeTime === 'SEMUA' || `${s.startTime} - ${s.endTime}` === activeTime;
      return matchDay && matchTime;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules, activeDay, activeTime]);

  const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  const handleDelete = (schedule: SchoolSchedule) => {
    confirmActionToast({
      title: "Hapus Jadwal",
      message: `Hapus mata pelajaran ${schedule.subject?.name} untuk kelas ${schedule.classroomConfig?.classroom?.name}?`,
      confirmText: "Ya, Hapus",
      variant: 'danger',
      onConfirm: async () => {
        // Menggunakan unwrap() agar error tertangkap oleh try-catch di confirmActionToast
        await dispatch(deleteSchedule(schedule.scheduleId)).unwrap();
        toast.success('Jadwal berhasil dibersihkan!');
      }
    });
  };
  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-4">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Jadwal<span className="text-blue-600">.</span></h1>
        <button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest hover:scale-105 transition-all">
          TAMBAH DATA
        </button>
      </div>

      {/* FILTER HARI (Row 1) */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center border-b pb-2 border-slate-100 dark:border-slate-800' >
        <div>

          <div className="max-w-6xl w-full mx-auto flex gap-2  overflow-x-auto no-scrollbar">

            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black transition-all border-2 shrink-0 ${activeDay === day
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}
              >
                {day}
              </button>
            ))}

          </div>
          {/* FILTER WAKTU (Row 2 - Modelnya seperti Day) */}
          <div className="max-w-6xl mx-auto flex gap-2  overflow-x-auto no-scrollbar pt-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setActiveTime(time)}
                className={`px-5 py-2 rounded-full text-[9px] font-black transition-all shrink-0 uppercase tracking-tighter ${activeTime === time
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-blue-100'}`}
              >
                {time === 'SEMUA' ? 'SEMUA JAM' : time}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <RealtimeClock />
        </div>
      </div>



      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((item) => {
            // Logic Realtime Status (Opsional, tapi keren buat SoSchool)
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const isActive = currentTime >= item.startTime && currentTime <= item.endTime;

            return (
              <div
                key={item.scheduleId}
                className={`relative bg-white dark:bg-slate-900 p-4 rounded-2xl border-2 transition-all duration-500 group ${isActive
                  ? 'border-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.15)] ring-4 ring-blue-600/5'
                  : 'border-slate-100 dark:border-slate-800 hover:border-blue-500 shadow-sm hover:shadow-2xl'
                  }`}
              >
                {/* Header Card */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col gap-2">
                    <span className={`self-start px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isActive ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                      {isActive ? '● Sedang Berlangsung' : item.classroomConfig?.classroom?.name}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase ml-1">
                        {item.classroomConfig?.classroom?.name}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => { setSelectedSchedule(item); setIsUpdateOpen(true); }}
                      className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                {/* Teacher Footer */}
                <div className="flex items-center mb-4 gap-4  border-t-2 border-dashed border-slate-50 dark:border-slate-800/50">
                  <div className="relative">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                      {item.teacher?.user?.username?.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Guru Pengampu</p>
                    <p className="text-sm font-bold text-slate-900 capitalize line-clamp-1 dark:text-white truncate">{item.teacher?.user?.username}</p>
                    <p className="text-[10px] font-medium text-slate-400 truncate tracking-tight">NIP. {item.teacher?.nip || '-'}</p>
                  </div>
                </div>
                {/* Subject Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                    {item.subject?.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                      {item.startTime} — {item.endTime}
                    </p>
                  </div>
                </div>



                {/* Subtle Decorative Element */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
                  <svg className="w-20 h-20 rotate-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z" /></svg>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem]">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.4em]">Belum ada jadwal hari ini</p>
          </div>
        )}
      </div>

      {/* MODALS */}
      <CreateScheduleModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} defaultDay={activeDay} />
      <UpdateScheduleModal isOpen={isUpdateOpen} onClose={() => { setIsUpdateOpen(false); setSelectedSchedule(null); }} data={selectedSchedule} />
    </div>
  );
}