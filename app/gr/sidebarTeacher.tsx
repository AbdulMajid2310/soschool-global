"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUserCheck,
  FiBookOpen,
  FiCpu,
  FiMessageCircle,
  FiVideo,
  FiAward,
  FiShield,
  FiChevronRight,
  FiChevronDown,
  FiX,
  FiLogOut,
  FiActivity,
  FiZap,
  FiBook,
  FiTarget,
  FiCalendar,
  FiEdit3,
  FiFolder,
  FiFileText,
  FiHeart,
  FiNavigation,
  FiUsers,
} from "react-icons/fi";
import { LuBrain } from "react-icons/lu";

export const GURU_MENU = [
  {
    group: "Operasional",
    icon: <FiZap />,
    items: [
      { label: "Beranda", icon: <FiHome />, path: "/gr/dashboard" },
      {
        label: "Presensi & Jurnal",
        icon: <FiUserCheck />,
        path: "/gr/presensi",
      },
      { label: "Agenda Kelas", icon: <FiCalendar />, path: "/gr/schedule" },
      {
        label: "Pantauan Perilaku",
        icon: <FiActivity />,
        path: "/gr/behavior",
      },
    ],
  },
  {
    group: "Wali Kelas",
    icon: <FiHeart />,
    items: [
      {
        label: "Kesehatan Siswa",
        icon: <FiHeart />,
        path: "/gr/homeroom/health",
      },
      {
        label: "Data Induk Siswa",
        icon: <FiUsers />,
        path: "/gr/homeroom/students",
      },
      {
        label: "Monitoring Rapor",
        icon: <FiFileText />,
        path: "/gr/homeroom/report-monitoring",
      },
      {
        label: "Kunjungan Rumah",
        icon: <FiNavigation />,
        path: "/gr/homeroom/home-visit",
      },
    ],
  },
  {
    group: "Akademik & Konten",
    icon: <FiBookOpen />,
    items: [
      { label: "Mata Pelajaran", icon: <FiBookOpen />, path: "/gr/subject" },
      { label: "Manajemen Tugas", icon: <FiFolder />, path: "/gr/assignment" },
      { label: "Bank Soal & CBT", icon: <FiZap />, path: "/gr/question-bank" },
      { label: "Perpustakaan Digital", icon: <FiBook />, path: "/gr/library" },
    ],
  },
  {
    group: "SoSchool AI (Beta)",
    icon: <LuBrain />,
    items: [
      { label: "Perencana RPP AI", icon: <LuBrain />, path: "/gr/ai-planner" },
      {
        label: "Koreksi Otomatis",
        icon: <FiTarget />,
        path: "/gr/auto-grading",
      },
      { label: "Studio Media", icon: <FiVideo />, path: "/gr/media-studio" },
    ],
  },
  {
    group: "Evaluasi & Laporan",
    icon: <FiEdit3 />,
    items: [
      { label: "Buku Nilai", icon: <FiEdit3 />, path: "/gr/grade-book" },
      { label: "E-Rapor Digital", icon: <FiFileText />, path: "/gr/e-report" },
      { label: "Analitik Siswa", icon: <FiActivity />, path: "/gr/analytics" },
    ],
  },
  {
    group: "Sosial & Bantuan",
    icon: <FiMessageCircle />,
    items: [
      { label: "Teacher Hub", icon: <FiAward />, path: "/gr/community" },
      {
        label: "Komunikasi Ortu",
        icon: <FiMessageCircle />,
        path: "/gr/communication",
      },
      { label: "Kesejahteraan", icon: <FiHeart />, path: "/gr/wellness" },
      { label: "Pusat Bantuan", icon: <FiShield />, path: "/gr/help-center" },
    ],
  },
];

const SidebarTeacher = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>("Operasional");

  useEffect(() => {
    GURU_MENU.forEach((group) => {
      const hasActiveChild = group.items.some(
        (item) =>
          pathname === item.path || pathname.startsWith(item.path + "/"),
      );
      if (hasActiveChild) setOpenGroup(group.group);
    });
  }, [pathname]);

  const toggleGroup = (groupName: string) => {
    setOpenGroup(openGroup === groupName ? null : groupName);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 transition-opacity lg:hidden 
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-100 h-screen w-72 bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-indigo-900/20 flex flex-col transition-all duration-500 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-8 pb-4 flex justify-between items-center">
          <h1 className="text-xl font-black italic tracking-tighter dark:text-white uppercase">
            So<span className="text-indigo-600">School</span>
          </h1>
          <button
            type="button"
            title="Tutup Menu"
            onClick={onClose}
            className="lg:hidden text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-2 overflow-y-auto py-6 no-scrollbar">
          {GURU_MENU.map((group, idx) => {
            const isExpanded = openGroup === group.group;
            const hasActiveChild = group.items.some(
              (item) =>
                pathname === item.path || pathname.startsWith(item.path + "/"),
            );

            return (
              <div key={idx} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.group)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl transition-all duration-300
                    ${
                      isExpanded || hasActiveChild
                        ? "bg-indigo-50 dark:bg-indigo-500/5 text-indigo-600 shadow-sm shadow-indigo-500/10"
                        : "text-slate-500 dark:text-indigo-100/40 hover:bg-slate-50 dark:hover:bg-white/2"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg transition-transform duration-300 ${isExpanded ? "scale-110" : ""}`}
                    >
                      {group.icon}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest italic">
                      {group.group}
                    </span>
                  </div>
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded
                      ? "max-h-150 opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <nav className="pl-3 space-y-1 border-l-2 border-slate-100 dark:border-white/5 ml-8">
                    {group.items.map((item) => {
                      const isActive =
                        pathname === item.path ||
                        pathname.startsWith(item.path + "/");
                      return (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={onClose}
                          className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 group
                            ${
                              isActive
                                ? "text-indigo-600 bg-indigo-500/5 font-bold"
                                : "text-slate-400 dark:text-slate-500 hover:text-indigo-500 hover:translate-x-1"
                            }`}
                        >
                          <span
                            className={`text-lg transition-all ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest italic pt-0.5">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-indigo-900/20">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-rose-500/60 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-black text-[10px] uppercase tracking-widest italic group">
            <FiLogOut
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarTeacher;
