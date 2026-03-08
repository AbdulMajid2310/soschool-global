"use client";

import { HiOutlineAcademicCap, HiOutlineArrowRight } from "react-icons/hi2";
import {
  HiOutlineCalendarDays,
  HiOutlineIdentification,
} from "react-icons/hi2";
import { StatusBadge } from "./HelperClassroom";
import { ClassroomStudent } from "@/redux/features/classroom-student/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StudentActionModal from "./StudentActionModal";
import { MdMeetingRoom } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

export const StudentCard = ({ data }: { data: ClassroomStudent }) => {
  const router = useRouter();
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "STATUS" | "TRANSFER";
  }>({
    isOpen: false,
    type: "STATUS",
  });

  const handleClassroomCOnfig = (classroomConfigId: string) => {
    sessionStorage.setItem("classroomConfigId", classroomConfigId);
    router.push("./classroom-config/detail");
  };
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-1 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Decorative Background Element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500" />

      <div className="relative p-4 space-y-2">
        {/* Top Section: Avatar & Status */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-4xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <img
              src={
                data.student.user.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${data.student.user.username}`
              }
              className="relative w-24 h-24 rounded-4xl object-cover border-4 border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-500"
              alt={data.student.user.username}
            />
            <div className="absolute -bottom-2 -right-1 bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white dark:border-slate-900 transform group-hover:rotate-12 transition-transform">
              <HiOutlineAcademicCap size={16} />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <StatusBadge status={data.status} />
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-1 text-center">
          <h3 className="font-black uppercase italic text-lg line-clamp-1 tracking-tighter text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors duration-300">
            {data.student.user.username}
          </h3>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <HiOutlineIdentification size={14} className="text-indigo-500/50" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">
              ID: {data.student.nis}
            </p>
          </div>
        </div>

        {/* Class Badge Section */}
        <div className="relative overflow-hidden p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-transparent group-hover:border-indigo-500/10 transition-all duration-500">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-indigo-500/60 tracking-widest mb-1 italic">
                Active Placement
              </p>
              <p className="font-black text-md text-slate-700 dark:text-slate-200 uppercase italic leading-none">
                {data.classroomConfig.classroom.name}
              </p>
            </div>
            <button
              type="button"
              title="View Profile"
              onClick={() =>
                handleClassroomCOnfig(data.classroomConfig.classroomConfigId)
              }
              className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-700 text-indigo-600 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300"
            >
              <HiOutlineArrowRight
                size={20}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between gap-4 px-2 ">
          <div className="flex items-center gap-2 text-slate-400">
            <HiOutlineCalendarDays size={16} className="text-slate-300" />
            <div className="flex flex-col">
              <p className="text-[8px] font-black uppercase tracking-widest leading-none text-slate-300">
                Joined Period
              </p>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {new Date(data.joinedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-2  px-2">
            <button
              type="button"
              title="Update Status"
              onClick={() => setModalConfig({ isOpen: true, type: "STATUS" })}
              className="flex-1 py-1 rounded-2xl font-black text-2xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
            >
              <PiStudentBold />
            </button>
            <button
              type="button"
              title="pindah kelas"
              onClick={() => setModalConfig({ isOpen: true, type: "TRANSFER" })}
              className=" py-1 font-black text-2xl  text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
            >
              <MdMeetingRoom />{" "}
            </button>
          </div>
        </div>
      </div>
      <StudentActionModal
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        student={data}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />
    </div>
  );
};
