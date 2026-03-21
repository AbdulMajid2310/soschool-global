"use client";

import React from "react";
import { FiClock, FiArrowRight } from "react-icons/fi";

interface SessionData {
  day?: string;
  startTime: string;
  endTime: string;
}

interface SessionTimelineProps {
  sessions: SessionData[];
  title?: string;
}

const SessionTimeline: React.FC<SessionTimelineProps> = ({
  sessions,
  title = "Operational Sessions",
}) => {
  if (!sessions || sessions.length === 0) return null;

  return (
    <section className="rounded-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-6 md:p-8 shadow-2xl shadow-slate-200/40 dark:shadow-none">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 flex items-center gap-2">
            <FiClock className="animate-spin-slow" /> {title}
          </h3>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Timeline Period: {sessions.length} Segments Detected
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((s, i) => (
          <div
            key={i}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-50 dark:bg-white/1 border border-slate-100 dark:border-white/5 p-6 transition-all duration-500 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
          >
            {/* Glossy Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest shadow-sm">
                  Session {i + 1}
                </span>
                {s.day && (
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter italic">
                    {s.day}
                  </span>
                )}
              </div>

              <div className="flex items-end gap-3">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    Time Interval
                  </p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none flex items-center gap-2">
                    {s.startTime}
                    <FiArrowRight className="text-blue-600 text-sm group-hover:translate-x-1 transition-transform" />
                    {s.endTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Progress Visual */}
            <div className="mt-6 flex items-center gap-3 relative z-10">
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-0 group-hover:w-full bg-linear-to-r from-blue-600 to-indigo-500 transition-all duration-1000 ease-in-out" />
              </div>
              <span className="text-[8px] font-black text-slate-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Active
              </span>
            </div>

            {/* Subtle Watermark Icon */}
            <FiClock
              className="absolute -bottom-4 -right-4 text-slate-200 dark:text-slate-800 opacity-20 group-hover:opacity-40 group-hover:rotate-12 transition-all duration-700"
              size={100}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SessionTimeline;
