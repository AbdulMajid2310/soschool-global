"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa6';
import {
  FiBookOpen, FiUsers, FiClipboard, FiTarget,
  FiFileText, FiPlus, FiArrowLeft, FiCheckCircle,
  FiAlertCircle, FiUserCheck, FiUserX, FiExternalLink,
  FiClock, FiTrendingUp
} from 'react-icons/fi';
import { GrTasks } from 'react-icons/gr';

// Mock Data yang diperluas dengan detail Tugas
const SUBJECT_DETAIL = {
  name: "Informatika",
  grade: "10 - IPA 1",
  teacher: "Majid",
  progress: 75,
  stats: {
    students: 32,
    tasks: 12,
    materials: 8
  },
  attendance: {
    overallRate: 94.2,
    todayStatus: 'COMPLETED',
    lastSync: '16 Feb 2026 - 08:30',
    absentStudents: [
      { id: 's1', name: 'Ahmad Dani', reason: 'Sakit', avatar: 'AD' },
      { id: 's2', name: 'Siti Aminah', reason: 'Izin', avatar: 'SA' },
    ]
  },
  // Data Tugas yang diperbarui
  tasks: [
    {
      id: '1',
      title: 'Fundamental React v19',
      deadline: '12 Feb',
      status: 'Closed',
      submissions: 32,
      type: 'Praktikum'
    },
    {
      id: '2',
      title: 'Styling dengan Tailwind v4',
      deadline: '20 Feb',
      status: 'Active',
      submissions: 18,
      type: 'Proyek'
    },
    {
      id: '3',
      title: 'Analisis Performa Web',
      deadline: '25 Feb',
      status: 'Draft',
      submissions: 0,
      type: 'Teori'
    },
  ],
  materials: [
    { id: '1', title: 'Pengenalan DOM', type: 'PDF', size: '2.4 MB' },
    { id: '2', title: 'Setup Project Next.js', type: 'Video', size: '15:00' },
  ]
};

export default function SubjectDetailPage() {
  const router = useRouter();
  return (
    <div className="space-y-8 p-8 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">

      {/* Header Area */}
      <div className="flex flex-col gap-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold text-[10px] uppercase tracking-[0.2em]">
          <FiArrowLeft size={16} /> Kembali
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-tighter rounded-lg italic border border-indigo-200/50 dark:border-indigo-500/20">
                {SUBJECT_DETAIL.grade}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic opacity-60">Tahun Ajaran 2025/2026</span>
            </div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-[0.8]">
              {SUBJECT_DETAIL.name} <span className="text-indigo-600">Core</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <StatSmall label="Kehadiran" value={`${SUBJECT_DETAIL.attendance.overallRate}%`} icon={<FiUserCheck />} color="text-emerald-500" />
            <StatSmall label="Siswa" value={SUBJECT_DETAIL.stats.students} icon={<FiUsers />} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDE (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">

          {/* SECTION: ABSENSI HARI INI */}
          <section className="bg-linear-to-r from-slate-900 to-slate-800 dark:from-indigo-950/40 dark:to-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-slate-800">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 italic">Kontrol Absensi</h3>
                <h4 className="text-2xl font-black italic uppercase tracking-tight text-white">Sesi: Senin, 16 Feb 2026</h4>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Absensi Selesai</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium italic uppercase tracking-widest ">Tersinkron: {SUBJECT_DETAIL.attendance.lastSync}</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-3xl font-black italic uppercase text-xs tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-500 flex items-center gap-3 group">
                Kelola Presensi <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-1000 text-white">
              <FiUserCheck size={200} />
            </div>
          </section>

          {/* NEW SECTION: TUGAS & PENUGASAN */}
          <section className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-indigo-900/20">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-slate-900 dark:text-white">
                  <FiClipboard className="text-indigo-600" /> Penugasan Kelas
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Pantau progres pengumpulan siswa</p>
              </div>
              <button className="flex items-center gap-2  dark:text-white text-gray-400 rounded-xl text-2xl font-black uppercase tracking-widest  transition-all">
                <GrTasks />  <FaChevronRight />
              </button>
            </div>

            <div className="space-y-4">
              {SUBJECT_DETAIL.tasks.map((task) => (
                <div key={task.id} className="group relative p-6 rounded-4xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent hover:border-indigo-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-4 rounded-2xl ${task.status === 'Active' ? 'bg-indigo-100 text-indigo-600' :
                        task.status === 'Closed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'
                        }`}>
                        {task.status === 'Closed' ? <FiCheckCircle size={20} /> : <FiClock size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500/60">{task.type}</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${task.status === 'Active' ? 'bg-amber-100 text-amber-600' :
                            task.status === 'Closed' ? 'bg-slate-200 text-slate-600' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {task.status}
                          </span>
                        </div>
                        <h4 className="font-black italic uppercase text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors">{task.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Deadline: {task.deadline}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-black italic text-slate-900 dark:text-white leading-none">
                            {task.submissions}<span className="text-slate-300 dark:text-slate-700 mx-1">/</span>{SUBJECT_DETAIL.stats.students}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Siswa Mengumpulkan</p>
                        </div>
                        <div className="relative w-14 h-14 flex items-center justify-center group/progress">
                          {/* Layer 1: Background Circle (Track) */}
                          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="transparent"
                              stroke="currentColor"
                              strokeWidth="4"
                              className="text-slate-100 dark:text-slate-800 transition-colors duration-500"
                            />

                            {/* Layer 2: Progress Circle (Indicator) */}
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              fill="transparent"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round" // Membuat ujung garis jadi bulat/smooth
                              className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000 ease-out"
                              style={{
                                strokeDasharray: 125.6,
                                strokeDashoffset: 125.6 - (125.6 * (task.submissions / SUBJECT_DETAIL.stats.students))
                              }}
                            />
                          </svg>

                          {/* Layer 3: Text Center */}
                          <div className="flex flex-col items-center justify-center z-10">
                            <span className="text-[10px] font-black italic leading-none text-slate-900 dark:text-white">
                              {Math.round((task.submissions / SUBJECT_DETAIL.stats.students) * 100)}%
                            </span>
                            {/* Penanda kecil tambahan jika sudah 100% */}
                            {task.submissions === SUBJECT_DETAIL.stats.students && (
                              <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-white dark:border-slate-900">
                                <FiCheckCircle className="text-white" size={8} />
                              </div>
                            )}
                          </div>

                          {/* Decorative Glow on Hover */}
                          <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-400/10 blur-xl rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Materi */}
          <section className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-indigo-900/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-slate-900 dark:text-white">
                <FiBookOpen className="text-indigo-600" /> Materi Pembelajaran
              </h3>
              <button onClick={() => router.push('/guru/akademik/materi')} className="flex items-center gap-2 rounded-xl text-2xl font-black uppercase tracking-widest hover:text-indigo-500 transition-colors text-slate-900 dark:text-white">
                <FaBook />  <FaChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUBJECT_DETAIL.materials.map((m) => (
                <div key={m.id} className="p-6 rounded-4xl bg-slate-50 dark:bg-indigo-950/20 border border-transparent hover:border-indigo-500/30 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-2">{m.type}</p>
                      <h4 className="font-black italic uppercase text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors leading-tight">{m.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{m.size}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-indigo-900/20 rounded-2xl text-slate-300 group-hover:text-indigo-500 transition-colors">
                      <FiFileText size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Card: Insights (Visualisasi Progres) */}
          <div className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-indigo-900/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FiTrendingUp className="text-indigo-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white italic">Statistik Performa</h3>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Rata-rata Nilai Tugas</p>
                <p className="text-3xl font-black italic text-indigo-600 tracking-tighter">84.2</p>
              </div>
              <div className="p-5 rounded-3xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Ketepatan Waktu</p>
                <p className="text-3xl font-black italic text-emerald-600 tracking-tighter">91%</p>
              </div>
            </div>
          </div>

          {/* Card: Siswa Tidak Hadir */}
          <div className="bg-white dark:bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-indigo-900/20 shadow-sm text-slate-900 dark:text-white">
            <div className="flex items-center gap-3 mb-6">
              <FiUserX className="text-rose-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic">Ketidakhadiran (Hari Ini)</h3>
            </div>
            <div className="space-y-4">
              {SUBJECT_DETAIL.attendance.absentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500 font-black text-xs">
                      {student.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-black italic uppercase leading-none">{student.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.reason}</p>
                    </div>
                  </div>
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500"><FiAlertCircle /></button>
                </div>
              ))}
              <button className="w-full py-3 mt-4 border-2 border-dashed border-slate-100 dark:border-indigo-900/20 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                Lihat Semua Riwayat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatSmall = ({ label, value, icon, color = "text-indigo-500" }: any) => (
  <div className="flex items-center gap-4 px-6 py-5 bg-white dark:bg-[#0a0f1d] rounded-3xl border border-slate-200 dark:border-indigo-900/20 shadow-sm transition-transform hover:scale-105 duration-300">
    <div className={`${color} bg-slate-50 dark:bg-indigo-950/40 p-3 rounded-2xl`}>{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-xl font-black italic text-slate-900 dark:text-white leading-none tracking-tighter">{value}</p>
    </div>
  </div>
);