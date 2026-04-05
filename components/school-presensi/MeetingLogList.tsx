"use client";

import React, { useState } from "react";
import {
  FiCalendar,
  FiBookOpen,
  FiUser,
  FiArrowRight,
  FiPlus,
  FiTag,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function MeetingLogList() {
  // Mock Data Pertemuan
  const meetings = [
    {
      id: "m-1",
      date: "2026-03-20",
      topic: "Pengenalan React Hooks",
      content:
        "Membahas useState dan useEffect beserta lifecycle component dalam functional component.",
      teacherName: "Lutfi Dev",
      isSubstitute: false,
      attendanceStats: { present: 28, total: 30 },
    },
    {
      id: "m-2",
      date: "2026-03-18",
      topic: "Tailwind CSS Dasar",
      content:
        "Implementasi utility-first CSS untuk membangun UI responsive dengan cepat.",
      teacherName: "Majid Substitute",
      isSubstitute: true,
      attendanceStats: { present: 25, total: 30 },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Halaman */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">
            Journal<span className="text-indigo-600">.</span>Meetings
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Riwayat Pembelajaran Kelas
          </p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-indigo-500/20">
          <FiPlus size={16} /> Pertemuan Baru
        </button>
      </div>

      {/* List Pertemuan */}
      <div className="grid gap-4">
        {meetings.map((meeting) => (
          <div className="group relative bg-white dark:bg-[#0a0f1d] p-6 rounded-4xl border border-slate-200 dark:border-indigo-900/20 hover:border-indigo-500 transition-all cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 space-y-4">
                {/* Bagian Atas: Tanggal & Label */}
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-slate-100 dark:bg-indigo-950/40 rounded-full flex items-center gap-2">
                    <FiCalendar className="text-indigo-500" size={12} />
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                      {meeting.date}
                    </span>
                  </div>
                  {meeting.isSubstitute && (
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1">
                      <HiSparkles /> Pengganti
                    </span>
                  )}
                </div>

                {/* Bagian Tengah: Judul & Deskripsi */}
                <div>
                  <h4 className="text-lg font-black uppercase italic text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {meeting.topic}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {meeting.content}
                  </p>
                </div>

                {/* Bagian Bawah: Guru & Statistik */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-200 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <FiUser size={12} className="text-slate-500" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                      {meeting.teacherName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 dark:border-indigo-900/40 pl-4">
                    <span className="text-[10px] font-black text-indigo-500 uppercase">
                      Hadir: {meeting.attendanceStats.present}/
                      {meeting.attendanceStats.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Detail (Visual Only) */}
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 dark:bg-indigo-950/20 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner group-hover:shadow-lg group-hover:shadow-indigo-500/40 group-hover:-rotate-12">
                <FiArrowRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
