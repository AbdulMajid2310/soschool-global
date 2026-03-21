"use client";

import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiAward,
  FiActivity,
  FiShield,
} from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { SchoolTeacher } from "@/redux/features/teacher/types";

interface CardTeacherProps {
  teacher: SchoolTeacher | null;
}

const CardTeacherModal: React.FC<CardTeacherProps> = ({ teacher }) => {
  if (!teacher) return null;

  return (
    <div className="w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none relative">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-blue-600 to-indigo-600"></div>

      <div className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="h-28 w-28 overflow-hidden rounded-4xl bg-slate-100 dark:bg-slate-800 ring-4 ring-white dark:ring-slate-950 shadow-2xl transition-transform hover:scale-105 duration-500">
              {teacher.user.avatar ? (
                <img
                  src={teacher.user.avatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-300">
                  <FaCircleUser size={60} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white border-4 border-white dark:border-slate-950 shadow-lg">
              <FiShield size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
              {teacher.user.username}
            </h2>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
              Master Instructor
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-slate-100 dark:border-white/5 pt-8">
          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FiUser size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Identification
              </p>
              <p className="text-xs font-black text-slate-700 dark:text-white uppercase">
                {teacher.nip || "N/A Protocol"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <FiMail size={16} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Network Email
              </p>
              <p className="text-xs font-black text-slate-700 dark:text-white truncate uppercase tracking-tighter">
                {teacher.user.email}
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-8 py-4 bg-slate-950 dark:bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-500/10 active:scale-95 cursor-pointer">
          Contact Instructor
        </button>
      </div>
    </div>
  );
};

export default CardTeacherModal;
