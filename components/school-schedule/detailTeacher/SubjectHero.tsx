"use client";

import React from "react";
import {
  FiLayers,
  FiBookOpen,
  FiMapPin,
  FiActivity,
  FiShield,
  FiMaximize2,
} from "react-icons/fi";

interface SubjectHeroProps {
  subject: {
    subjectId: string;
    name: string;
    code: string;
    category: string;
    sks: number | string;
  };
  classroom: {
    roomLocation: string;
    classroom: {
      name: string;
    };
  };
}

const SubjectHero: React.FC<SubjectHeroProps> = ({ subject, classroom }) => {
  return (
    <section className="relative overflow-hidden rounded-[3rem] bg-[#020617] p-8  text-white border border-white/5 shadow-3xl group/hero transition-all duration-1000">
      {/* GLOW EFFECTS */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 h-150 w-150 rounded-full bg-blue-600/10 blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-16">
        <div className="flex-1 space-y-12">
          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-600/20">
              <FiShield className="text-xs" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {subject.category}
              </span>
            </div>
            <span className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
              ID-{subject.subjectId.split("-")[0]}
            </span>
          </div>

          {/* MAIN TITLE WITH DEPTH */}
          <div className="relative">
            <h1 className="text-xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.75] mb-4">
              {subject.name}
              <span className="text-blue-600">.</span>
            </h1>
            <div className="absolute -top-6 left-1 text-blue-600/10 text-5xl font-black italic uppercase tracking-tighter leading-none select-none -z-10 opacity-30 transition-all duration-700 group-hover/hero:translate-x-4">
              {subject.name}
            </div>
          </div>

          {/* SPEC GRID */}
          <div className="flex flex-wrap items-center gap-10 md:gap-16 pt-6">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Protocol Code
              </p>
              <div className="flex items-center gap-4 group/icon">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover/icon:bg-blue-600 transition-colors">
                  <FiLayers
                    className="text-blue-500 group-hover:text-white"
                    size={20}
                  />
                </div>
                <span className="text-2xl font-black italic uppercase tracking-tight text-slate-200">
                  {subject.code}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
                Weightage
              </p>
              <div className="flex items-center gap-4 group/icon">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover/icon:bg-indigo-600 transition-colors">
                  <FiBookOpen
                    className="text-indigo-500 group-hover:text-white"
                    size={20}
                  />
                </div>
                <span className="text-2xl font-black italic uppercase tracking-tight text-slate-200">
                  {subject.sks} SKS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION MODULE */}
        <div className="w-full lg:w-auto lg:min-w-100">
          <div className="relative p-1 rounded-4xl bg-linear-to-br from-white/10 to-transparent">
            <div className=" backdrop-blur-3xl rounded-4xl p-6 space-y-10 border border-white/5 group/card transition-all duration-500 overflow-hidden">
              <FiMaximize2 className="absolute top-8 right-8 text-slate-700 hover:text-blue-500 cursor-pointer transition-colors" />

              <div className="space-y-2">
                <div className="p-4 bg-blue-600 w-fit rounded-3xl shadow-2xl shadow-blue-600/40 mb-8 group-hover/card:scale-110 transition-transform">
                  <FiMapPin size={32} />
                </div>
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-2">
                  Location Sector
                </p>
                <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                  {classroom.classroom.name}
                </h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-4 flex items-center gap-3">
                  <span className="h-1 w-8 bg-blue-600 rounded-full"></span>
                  {classroom.roomLocation}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-black uppercase text-slate-500">
                    Facility Online
                  </span>
                </div>
                <button className="text-[10px] font-black uppercase text-blue-500 hover:underline cursor-pointer">
                  Map View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectHero;
