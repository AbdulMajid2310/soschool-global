"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchSpecificScheduleDetail } from "@/redux/features/school_schedule/thunks";
import { clearSpecificDetail } from "@/redux/features/school_schedule/slice";
import { useAppSelector } from "@/redux/hooks";
import { FiInfo } from "react-icons/fi";
import CardTeacherModal from "../../teacher/CardTeacherModal";
import DigitalResources from "../../school_study_materials/DigitalResources";
import SessionTimeline from "./SessionTimeline";
import SubjectHero from "./SubjectHero";

const SpecificScheduleDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currentTeacherProfile } = useAppSelector((state) => state.teacher);
  const { specificDetail, loading, error } = useAppSelector(
    (state) => state.schoolSchedule,
  );

  const teacherId = currentTeacherProfile?.teacherId;
  const subjectId = sessionStorage.getItem("subjectId");
  const configId = sessionStorage.getItem("classroomConfigId");

  useEffect(() => {
    if (teacherId && subjectId && configId) {
      dispatch(fetchSpecificScheduleDetail({ teacherId, subjectId, configId }));
    }
    return () => {
      dispatch(clearSpecificDetail());
    };
  }, [dispatch, teacherId, subjectId, configId]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-xl border-4 border-blue-600/20"></div>
          <div className="absolute inset-0 rounded-xl border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-20 p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 text-center">
        <FiInfo className="mx-auto text-rose-500 mb-4" size={40} />
        <h3 className="text-rose-500 font-black uppercase tracking-widest text-sm">
          Protocol Breach
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-bold">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-black uppercase"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!specificDetail) return null;

  const { subject, teacher, sessions, classroom } = specificDetail;

  return (
    <div className="max-w-7xl mx-auto p-4  space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* HERO SECTION - MASTER DATA */}
      <SubjectHero subject={subject} classroom={classroom} />

      {/* CORE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: CONTENT (Col 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* SESSION TIMELINE */}
          <SessionTimeline sessions={sessions} title="Schedule Intervals" />

          {/* COURSE SYNOPSIS */}
          <section className="rounded-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
              <FiInfo className="text-blue-600" /> Course Abstract
            </h3>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {subject.description ||
                  "No description protocol provided for this instructional unit."}
              </p>
            </div>
          </section>

          {/* STUDY RESOURCES */}
          <DigitalResources materials={subject.materials} />
        </div>

        {/* RIGHT: SIDEBAR (Col 4) */}
        <div className="lg:col-span-4 space-y-8">
          {/* INSTRUCTOR CARD */}
          <CardTeacherModal teacher={teacher} />

          {/* SYSTEM LOG / METADATA */}
          <div className="p-8 rounded-4xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
            <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
              System Metadata
            </h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500">
                  Status
                </span>
                <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-[9px] font-black uppercase">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500">
                  Security
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificScheduleDetail;
