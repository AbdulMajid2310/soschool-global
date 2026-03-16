"use client";

import React from "react";
import { FiGlobe, FiMapPin, FiChevronRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { School } from "@/redux/features/school/types";

interface CardSchoolSectionProps {
  schools: School[];
  onDetailClick: (schoolId: string) => void;
}

const CardSchoolSection = ({
  schools,
  onDetailClick,
}: CardSchoolSectionProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {schools.map((school) => {
        const isEnterprise = school.plan === "Enterprise";

        return (
          <div
            key={school.schoolId}
            onClick={() => onDetailClick(school.schoolId)}
            className="group relative bg-white dark:bg-[#1c202a] border border-slate-100 dark:border-white/5 rounded-2xl lg:rounded-full p-4 lg:px-8 lg:py-3 transition-all duration-300 hover:ring-4 hover:ring-indigo-500/10 dark:hover:ring-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
          >
            {/* Dekorasi Aksen untuk Plan Enterprise */}
            {isEnterprise && (
              <div className="absolute inset-y-0 left-0 w-1.5 bg-indigo-600 rounded-l-full hidden lg:block" />
            )}

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start lg:items-center">
              {/* --- BAGIAN 1: IDENTITAS --- */}
              <div className="w-full lg:col-span-5 flex items-center gap-4">
                <div className="relative w-14 h-14 lg:w-12 lg:h-12 shrink-0">
                  <div className="w-full h-full rounded-2xl lg:rounded-full overflow-hidden border-2 border-slate-100 dark:border-white/10 group-hover:border-indigo-500/50 transition-colors bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    {school?.avatar ? (
                      <Image
                        src={school.avatar}
                        alt={school.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xl group-hover:scale-110 transition-transform duration-500">
                        {school?.name?.charAt(0) || "?"}
                      </span>
                    )}
                  </div>
                  {/* Status Aktif */}
                  {school.isActive && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                    </span>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm lg:text-base tracking-tight truncate uppercase italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {school.name}
                    </h3>
                    {isEnterprise && (
                      <MdVerified
                        className="text-blue-500 shrink-0"
                        size={16}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    <span className="font-mono tracking-tighter">
                      ID: {school.nisp}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                    <span className="uppercase text-indigo-500 dark:text-indigo-400 font-black">
                      {school.level || "INSTITUSI"}
                    </span>
                  </div>
                </div>
              </div>

              {/* --- BAGIAN 2: NETWORK & DOMAIN --- */}
              <div className="w-full lg:col-span-4 flex items-center gap-3 py-3 lg:py-0 border-y lg:border-none border-slate-50 dark:border-white/5">
                <div className="hidden sm:flex p-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-slate-400 group-hover:text-indigo-500 transition-colors">
                  <FiGlobe size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 lowercase truncate italic tracking-tight">
                    {school.domain}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                    <FiMapPin size={10} />
                    <span>{school.address?.province || "Main Cluster"}</span>
                  </div>
                </div>
              </div>

              {/* --- BAGIAN 3: PLAN & ACTION --- */}
              <div className="w-full lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                <div className="flex flex-col items-end">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300
                    ${
                      isEnterprise
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                        : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-500 border-transparent"
                    }`}
                  >
                    {school.plan}
                  </span>
                </div>

                <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 text-slate-300 dark:text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  <FiChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSchoolSection;
