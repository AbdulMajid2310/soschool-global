"use client";

import React from "react";
import { HiOutlineHashtag } from "react-icons/hi2";

// Definisi interface berdasarkan struktur JSON data
interface SubjectPeriod {
  academicYear: string;
  semester: string;
}

interface SubjectData {
  subjectId: string;
  name: string;
  code: string;
  description: string;
  category: string;
  sks: string;
  targetLevel: string;
  period: SubjectPeriod;
}

interface HeaderSubjectProps {
  data: SubjectData;
}

export default function HeaderSubject({ data }: HeaderSubjectProps) {
  // Jika data belum ada, tampilkan placeholder atau null
  if (!data) return null;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="space-y-8 flex-1">
        <div className="space-y-4">
          {/* Label Periode Akademik */}
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic text-white">
              {data.period.academicYear} • {data.period.semester}
            </span>
            <div className="h-1 w-12 bg-white/30 rounded-full" />
          </div>

          {/* Nama Mata Pelajaran */}
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.8] drop-shadow-2xl text-white">
            {data.name}
          </h1>

          <div className="flex items-center gap-6">
            {/* Target Level / Tingkat */}
            <h2 className="text-4xl md:text-5xl font-black italic uppercase text-blue-400 dark:text-blue-100 opacity-90 tracking-tighter">
              Kelas {data.targetLevel}
            </h2>

            <div className="h-10 w-px bg-white/20 rotate-12 hidden md:block" />

            {/* Kode Mata Pelajaran */}
            <div className="flex items-center gap-3 text-sm font-bold opacity-60 italic tracking-[0.2em] uppercase text-white">
              <HiOutlineHashtag size={20} className="text-blue-400" />{" "}
              {data.code}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
