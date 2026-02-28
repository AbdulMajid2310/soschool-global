"use client";

import React, { use, useEffect } from 'react';
import {
  FiCalendar, FiClock, FiMapPin, FiLayers,
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiTrendingUp
} from 'react-icons/fi';
import AgendaList from './listAgenda';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTeacherProfile } from '@/redux/features/teacher/thunk';
import { fetchSchedulesByTeacher } from '@/redux/features/school_schedule/thunks';
import StatsSchedule from './stats_schedule';

const AGENDA_CLASSES = [
  {
    id: 'C1', name: '10-IPA-1', subject: 'Informatika',
    session: 'Sesi 1-2', time: '08:00 - 09:30', room: 'Lab Komputer 1',
    topic: 'Struktur Data Dasar', progress: 100, status: 'Completed'
  },
  {
    id: 'C2', name: '11-RPL-2', subject: 'Basis Data',
    session: 'Sesi 4-5', time: '10:30 - 12:00', room: 'Ruang Teori 4',
    topic: 'Relational Database', progress: 45, status: 'Ongoing'
  },
  {
    id: 'C3', name: '12-RPL-1', subject: 'Web Dev',
    session: 'Sesi 7-8', time: '13:30 - 15:00', room: 'Lab Komputer 3',
    topic: 'React Hooks & State', progress: 0, status: 'Upcoming'
  },
];

export default function AgendaCard() {
  const dispatch = useAppDispatch();
  const { currentTeacherProfile, selectedTeacherId } = useAppSelector((state) => state.teacher);
  const teacherId = currentTeacherProfile?.teacherId
  const { summary, schedules } = useAppSelector((state) => state.schoolSchedule);
  console.log('Schedules from Redux State:', selectedTeacherId);


  useEffect(() => {
    if (teacherId) {
      dispatch(fetchSchedulesByTeacher(teacherId));
    }
  }, [teacherId, dispatch]);


  console.log('Current Teacher Profile:', currentTeacherProfile);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. Time Utilization Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <StatsSchedule icon={<FiClock />} label="Total Jam Mengajar" value={summary?.totalTeachingHours || "0 Jam"} sub="Minggu ini" color="text-amber-500" />
        <StatsSchedule icon={<FiCheckCircle />} label="Materi Terselesaikan" value={summary?.totalMaterials || "0%"} sub="Sesuai Silabus" color="text-emerald-500" />
        <StatsSchedule icon={<FiAlertCircle />} label="Total materi" value={summary?.totalMaterials || 0} sub="Sistem Aman" color="text-cyan-500" />
        <StatsSchedule icon={<FiLayers />} label="Total Kelas" value={summary?.totalClasses || "03"} sub="Aktif Semester Ini" color="text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* 2. Today's Timeline (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Timeline Mengajar Hari Ini</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase italic">
              <FiCalendar /> 01 Februari 2026
            </div>
          </div>

          <AgendaList />
        </div>

        {/* 3. AI Schedule Analysis (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-linear-to-br from-amber-500 to-orange-600 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
            <FiTrendingUp className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-700" size={150} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-100 mb-6 italic">Pacing Analysis (AI)</h4>
            <div className="space-y-6 relative z-10">
              <p className="text-xs font-medium leading-relaxed italic">
                "Berdasarkan jadwal, Anda memiliki **3 jam jeda** hari ini. Waktu terbaik untuk mengoreksi tugas kelas **11-RPL-2** adalah pukul 15:00 saat energi fokus Anda sedang stabil."
              </p>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-amber-200">Rekomendasi Istirahat</p>
                <p className="text-[10px] font-bold italic">10:00 - 10:30 (Recharge Time)</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">Next Week Preview</h5>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold italic">
                <span>Senin, 09 Feb</span>
                <span className="text-amber-500">Ujian Tengah Semester</span>
              </div>
              <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
              <div className="flex justify-between text-[10px] font-bold italic">
                <span>Selasa, 10 Feb</span>
                <span className="text-slate-400 text-glow-indigo">Materi Baru: API Dev</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


