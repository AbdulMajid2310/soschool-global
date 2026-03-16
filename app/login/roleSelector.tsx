"use client";

import React, { useState } from "react";
import {
  HiOutlineChevronDown,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBuildingLibrary,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from "react-icons/hi2";

interface Role {
  userRoleId: string;
  name: string;
  url: string;
}

interface AccessDetail {
  userAccessId: string;
  role: Role;
}

interface SchoolAccess {
  schoolId: string;
  schoolName: string;
  accessDetails: AccessDetail[];
}

interface RoleSelectorProps {
  availableAccess: SchoolAccess[];
  onSelectRole: (userAccessId: string) => void;
  onBack: () => void;
  loading: boolean;
}

export default function RoleSelector({
  availableAccess,
  onSelectRole,
  onBack,
  loading,
}: RoleSelectorProps) {
  const [openSchool, setOpenSchool] = useState<string | null>(
    availableAccess[0]?.schoolId || null,
  );

  const toggleSchool = (id: string) => {
    setOpenSchool(openSchool === id ? null : id);
  };

  return (
    <div className="mt-6 space-y-3 max-h-60 lg:max-h-80 overflow-y-auto pr-2 scrollbar-hide">
      {availableAccess.map((school) => {
        const isOpen = openSchool === school.schoolId;

        return (
          <div
            key={school.schoolId}
            className={`group border-2 transition-all duration-500 rounded-4xl overflow-hidden ${
              isOpen
                ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-xl"
                : "bg-slate-50/50 dark:bg-slate-800/20 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            }`}
          >
            <button
              onClick={() => toggleSchool(school.schoolId)}
              className="w-full flex items-center justify-between p-5 text-left outline-none"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isOpen
                      ? "bg-indigo-600 text-white rotate-360"
                      : "bg-white dark:bg-slate-900 text-slate-400 shadow-sm"
                  }`}
                >
                  <HiOutlineBuildingLibrary size={24} />
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block leading-none mb-1.5">
                    Instansi Terdaftar
                  </span>
                  <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase italic truncate max-w-45 sm:max-w-xs">
                    {school.schoolName}
                  </h3>
                </div>
              </div>

              <div
                className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen
                    ? "bg-indigo-50 text-indigo-600 rotate-180"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <HiOutlineChevronDown size={16} strokeWidth={2.5} />
              </div>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 pt-0 grid grid-cols-1 gap-2 animate-in slide-in-from-top-4 duration-500">
                <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-2" />

                {school.accessDetails.map((detail) => (
                  <button
                    type="button"
                    key={detail.userAccessId}
                    onClick={() => onSelectRole(detail.userAccessId)}
                    disabled={loading}
                    className="group/role flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-600 rounded-3xl transition-all duration-300 border border-transparent hover:border-indigo-400 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <HiOutlineShieldCheck
                        size={18}
                        className="text-indigo-600 group-hover/role:text-white transition-colors"
                      />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-black text-slate-800 dark:text-white group-hover/role:text-white transition-colors capitalize">
                          {detail.role.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 group-hover/role:text-indigo-100 transition-colors uppercase">
                          {school.accessDetails.length > 1
                            ? "Otoritas Ganda"
                            : "Otoritas Penuh"}
                        </span>
                      </div>
                    </div>

                    <HiOutlineArrowRight
                      size={16}
                      className="text-slate-300 group-hover/role:text-white group-hover/role:translate-x-1 transition-all"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-4">
        <button
          onClick={onBack}
          className="group flex items-center justify-center gap-3 w-full py-5 text-[10px] font-black uppercase italic text-slate-400 hover:text-rose-500 transition-all duration-300 rounded-4xl border border-transparent hover:bg-rose-50/30 dark:hover:bg-rose-500/5"
        >
          <HiOutlineArrowLeftOnRectangle
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Batalkan & Kembali ke Login
        </button>
      </div>
    </div>
  );
}
