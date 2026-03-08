"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiUser,
  FiLogOut,
  FiRepeat,
  FiChevronDown,
} from "react-icons/fi";
import { IoChatbubbles, IoHome } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { BsBank2 } from "react-icons/bs";

import ThemeToggle from "@/components/button/ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/auth/thunk";
import { fetchActivePeriod } from "@/redux/features/school-period/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Ambil data Global State
  const { profile } = useAppSelector((state) => state.auth);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod); // Pastikan state ini ada

  const activeContext = profile?.activeContext;
  const schoolId = useSchoolId();

  // 1. Inisialisasi Data Periode (Semester)
  useEffect(() => {
    if (schoolId) dispatch(fetchActivePeriod(schoolId));
  }, [dispatch, schoolId]);

  // 2. Click Outside Handler
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const toggleDropdown = (name: string) =>
    setActiveDropdown((prev) => (prev === name ? null : name));
  const isNavActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="h-16 md:h-20 w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 bg-white/80 dark:bg-gray-900 backdrop-blur-xl border-b border-slate-200 dark:border-blue-900/20 shadow-sm">
      {/* --- LEFT: LOGO & CONTEXT --- */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          title="menu"
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-blue-500/10 rounded-xl"
        >
          <FiMenu size={22} />
        </button>

        <Link href="/home" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="text-sm font-black italic text-slate-900 dark:text-white uppercase leading-none">
              SO<span className="text-blue-500">SCHOOL</span>
            </h1>
            <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest italic">
              Student Hub
            </p>
          </div>
        </Link>

        {/* Indikator Sekolah & Semester (Hanya muncul jika ada context) */}
        {activeContext && (
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-blue-900/20">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-slate-800 dark:text-slate-200 truncate max-w-37.5">
                {activeContext.schoolName || "Global System"}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[8px] font-bold uppercase italic">
                  {activeContext.role?.name}
                </span>
                <span className="text-[8px] font-medium text-slate-400 uppercase italic">
                  {activePeriod?.academicYear || "..."}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- CENTER: SEARCH --- */}
      <div className="flex-1 max-w-xs mx-8 hidden lg:block">
        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full py-2 pl-9 pr-4 rounded-xl text-[11px] font-bold bg-slate-100 dark:bg-blue-950/20 outline-none focus:ring-1 ring-blue-500/30"
          />
        </div>
      </div>

      {/* --- RIGHT: ACTIONS --- */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* Desktop Navigation Icons */}
        <div className="hidden xl:flex items-center gap-2 mr-2">
          <QuickLink
            href="/home"
            active={isNavActive("/home")}
            icon={<IoHome />}
          />
          <QuickLink
            href="/marketplace"
            active={isNavActive("/marketplace")}
            icon={<SiHomeassistantcommunitystore />}
          />
          <QuickLink
            href="/bank-soal"
            active={isNavActive("/bank-soal")}
            icon={<BsBank2 />}
          />
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-blue-900/20 pl-3">
          <IconButton
            icon={<IoChatbubbles />}
            count={3}
            active={activeDropdown === "chat"}
            onClick={() => toggleDropdown("chat")}
          />
          <IconButton
            icon={<FiBell />}
            active={activeDropdown === "notif"}
            onClick={() => toggleDropdown("notif")}
          />

          {/* Dropdown Profile */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("profile")}
              className={`flex items-center gap-2 p-1 rounded-xl transition-all ${activeDropdown === "profile" ? "bg-blue-500/10" : ""}`}
            >
              <img
                src={
                  profile?.user?.avatar || "https://i.pravatar.cc/150?u=majid"
                }
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 dark:border-blue-900/30"
                alt="User"
              />
              <FiChevronDown
                className={`text-slate-400 transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`}
                size={14}
              />
            </button>

            {activeDropdown === "profile" && (
              <div className="absolute top-12 right-0 w-64 p-2 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-blue-900/30 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-blue-900/10 mb-2">
                  <p className="text-[10px] font-black uppercase text-slate-900 dark:text-white truncate">
                    {profile?.user?.username}
                  </p>
                  <p className="text-[8px] text-slate-400 uppercase tracking-tighter">
                    {profile?.user?.email}
                  </p>
                </div>

                <DropdownAction
                  icon={<FiUser />}
                  title="Profil Saya"
                  onClick={() => router.push("/settings/profile")}
                />
                <DropdownAction
                  icon={<FiRepeat className="text-blue-500" />}
                  title="Ganti Peran / Sekolah"
                  onClick={() => router.push("/select-role")}
                />

                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-white/5 rounded-xl my-1">
                  <span className="text-[9px] font-bold uppercase text-slate-500 italic">
                    Dark Mode
                  </span>
                  <ThemeToggle />
                </div>

                <div className="h-px bg-slate-100 dark:bg-blue-900/10 my-1" />
                <DropdownAction
                  icon={<FiLogOut className="text-red-500" />}
                  title="Keluar Sesi"
                  onClick={() => {
                    dispatch(logoutUser());
                    router.push("/login");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Sub-components (Efficiency & Reusable) ---

const QuickLink = ({ href, active, icon }: any) => (
  <Link
    href={href}
    className={`p-2.5 rounded-xl transition-all ${active ? "text-blue-500 bg-blue-500/10" : "text-slate-400 hover:text-blue-500"}`}
  >
    <span className="text-xl">{icon}</span>
  </Link>
);

const IconButton = ({ icon, count, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`relative p-2 rounded-xl border transition-all ${active ? "bg-blue-600 border-blue-400 text-white" : "bg-slate-50 dark:bg-white/5 border-transparent text-slate-400"}`}
  >
    <span className="text-lg">{icon}</span>
    {count && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] text-white w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
        {count}
      </span>
    )}
  </button>
);

const DropdownAction = ({ icon, title, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-500/10 transition-all group"
  >
    <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
      {icon}
    </span>
    <span className="text-[10px] font-black uppercase italic text-slate-700 dark:text-slate-300">
      {title}
    </span>
  </button>
);

export default memo(Header);
