"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSchedulesBySchool, deleteSchedule } from '@/redux/features/school_schedule/thunks';
import { IGroupedSchedule, ISession } from '@/redux/features/school_schedule/types';

import CreateScheduleModal from './createSchedule';
import UpdateScheduleModal from './updateScheduleModal';
import RealtimeClock from '@/components/realtimeClock';
import { confirmActionToast } from '@/components/toast/confirmActionToast';
import toast from 'react-hot-toast';

export default function SchoolSchedulePage() {
  const dispatch = useAppDispatch();

  const { schedules, loading } = useAppSelector((state) => state.schoolSchedule);
  const { profile } = useAppSelector((state) => state.auth);

  const [activeDay, setActiveDay] = useState<string>(() => {
    const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(new Date()).toUpperCase();
    const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    return days.includes(today) ? today : 'SENIN';
  });

  const [activeTime, setActiveTime] = useState<string>('SEMUA');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // Karena data grouped, selected untuk update biasanya ambil session pertama atau id tertentu
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  useEffect(() => {
    if (profile?.school.schoolId) {
      dispatch(fetchSchedulesBySchool(profile.school.schoolId));
    }
  }, [dispatch, profile]);

  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    schedules.forEach(item => {
      if (item.day === activeDay) {
        item.sessions.forEach(sess => {
          slots.push(`${sess.startTime.substring(0, 5)} - ${sess.endTime.substring(0, 5)}`);
        });
      }
    });
    return ['SEMUA', ...Array.from(new Set(slots)).sort()];
  }, [schedules, activeDay]);

  useEffect(() => {
    setActiveTime('SEMUA');
  }, [activeDay]);

  const filteredData = useMemo(() => {
    return schedules.filter(item => {
      const matchDay = item.day === activeDay;
      const matchTime = activeTime === 'SEMUA' ||
        item.sessions.some(sess => `${sess.startTime.substring(0, 5)} - ${sess.endTime.substring(0, 5)}` === activeTime);
      return matchDay && matchTime;
    });
  }, [schedules, activeDay, activeTime]);

  const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

  const handleDelete = (session: ISession, subjectName: string) => {
    confirmActionToast({
      title: "Hapus Sesi",
      message: `Hapus jadwal ${subjectName} jam ${session.startTime.substring(0, 5)}?`,
      confirmText: "Ya, Hapus",
      variant: 'danger',
      onConfirm: async () => {
        await dispatch(deleteSchedule(session.scheduleId)).unwrap();
        toast.success('Sesi berhasil dihapus!');
        // Re-fetch data agar grouping diperbarui
        if (profile?.school.schoolId) dispatch(fetchSchedulesBySchool(profile.school.schoolId));
      }
    });
  };

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#F8FAFC] dark:bg-[#020617]">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Jadwal<span className="text-blue-600">.</span></h1>
        <button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-blue-600/20">
          TAMBAH DATA
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-end border-b pb-6 border-slate-100 dark:border-slate-800'>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all border-2 shrink-0 ${activeDay === day
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-300'}`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar">
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
        <div className="flex lg:justify-end">
          <RealtimeClock />
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => {
            const now = new Date();
            const curT = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const hasActiveSession = item.sessions.some(s => curT >= s.startTime && curT <= s.endTime);

            return (
              <div
                key={idx}
                className={`relative bg-white dark:bg-slate-900 p-5 rounded-3xl border-2 transition-all duration-500 group ${hasActiveSession
                  ? 'border-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.15)] ring-4 ring-blue-600/5'
                  : 'border-slate-100 dark:border-slate-800 hover:border-blue-500 shadow-sm'
                  }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${hasActiveSession ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {item.classroom}
                  </span>
                  <div className="w-10 h-10 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none group-hover:text-blue-600 transition-colors mb-4">
                    {item.subject?.name}
                  </h3>

                  <div className="space-y-2">
                    {item.sessions.map((sess) => (
                      <div key={sess.scheduleId} className="flex items-center justify-between group/sess bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-transparent hover:border-blue-200 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${curT >= sess.startTime && curT <= sess.endTime ? 'bg-blue-600 animate-ping' : 'bg-slate-300'}`} />
                          <p className="text-xs font-black text-slate-600 dark:text-slate-400">
                            {sess.startTime.substring(0, 5)} — {sess.endTime.substring(0, 5)}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover/sess:opacity-100 transition-opacity">
                          <button onClick={() => { setSelectedSchedule({ ...item, ...sess }); setIsUpdateOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                          <button onClick={() => handleDelete(sess, item.subject.name)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center pt-4 border-t-2 border-dashed border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md mr-3">
                    {item.teacher?.user?.username?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Guru</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.teacher?.user?.username}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-32 flex flex-col items-center justify-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-white/50 dark:bg-slate-900/50">
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.4em]">Tidak ada jadwal</p>
          </div>
        )}
      </div>

      <CreateScheduleModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} defaultDay={activeDay} />
      <UpdateScheduleModal isOpen={isUpdateOpen} onClose={() => { setIsUpdateOpen(false); setSelectedSchedule(null); }} data={selectedSchedule} />
    </div>
  );
}