"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  FiSearch, FiBell, FiMenu, FiSettings, FiLogOut, FiUser, FiCalendar, FiTrendingUp 
} from 'react-icons/fi';
import { IoChatbubbles, IoHome } from 'react-icons/io5';
import { LuBrain } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';
import ThemeToggle from '@/components/button/ThemeToggle';

const HeaderTeacher = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile } = useAppSelector((state) => state.auth);

  useEffect(() => { dispatch(getProfileMe()); }, [dispatch]);

  const isNavActive = (path: string) => pathname === path;

  return (
    <header className="h-16 md:h-20 w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border-b border-slate-200 dark:border-indigo-900/20 shadow-sm">
      
      {/* LEFT: LOGO */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button onClick={onMenuClick} className="lg:hidden p-2.5 text-slate-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
          <FiMenu size={24} />
        </button>

        <Link href="/guru" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full" />
            <img src="/images/logo.png" alt="SoSchool" className="w-full h-full object-contain relative z-10" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm md:text-lg font-black tracking-tighter italic uppercase leading-none text-slate-900 dark:text-white">
              SO<span className="text-indigo-500">SCHOOL</span>
            </h1>
            <p className="text-[7px] font-bold text-slate-500 dark:text-indigo-400/50 uppercase tracking-[0.2em] mt-0.5 italic">Teacher Center</p>
          </div>
        </Link>
      </div>

      {/* CENTER: SEARCH */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-indigo-800" />
          <input 
            type="text" 
            placeholder="Cari data siswa atau administrasi..." 
            className="w-full p-2.5 pl-11 rounded-2xl outline-none text-xs font-bold bg-slate-100 dark:bg-indigo-950/30 border border-transparent focus:border-indigo-500/30 dark:text-white transition-all"
          />
        </div>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center gap-1 md:gap-3 relative" ref={dropdownRef}>
        <div className="hidden xl:flex items-center gap-1 mr-2">
          <NavTab href="/guru/dashboard" active={isNavActive('/guru/dashboard')} icon={<IoHome />} />
          <NavTab href="/guru/ai-assistant" active={isNavActive('/guru/ai-assistant')} icon={<LuBrain />} />
          <NavTab href="/guru/analytics" active={isNavActive('/guru/analytics')} icon={<FiTrendingUp />} />
        </div>

        <div className="flex items-center gap-1 md:gap-2 border-l border-slate-200 dark:border-indigo-900/30 pl-2 md:pl-4">
          <IconButton icon={<IoChatbubbles />} count={12} active={activeDropdown === 'chat'} onClick={() => setActiveDropdown('chat')} />
          <IconButton icon={<FiBell />} active={activeDropdown === 'notif'} onClick={() => setActiveDropdown('notif')} />
          
          <button onClick={() => setActiveDropdown('profile')} className="ml-1 md:ml-2">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all">
              <img src="https://i.pravatar.cc/150?u=teacher" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

// Reusable Sub-components (Sama dengan logic Siswa agar konsisten)
const NavTab = ({ href, active, icon }: any) => (
  <Link href={href} className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all ${active ? 'text-indigo-500 bg-indigo-500/10' : 'text-slate-400 dark:text-indigo-900 hover:text-indigo-500'}`}>
    <span className="text-2xl">{icon}</span>
  </Link>
);

const IconButton = ({ icon, count, active, onClick }: any) => (
  <button onClick={onClick} className={`relative p-2.5 rounded-xl transition-all border ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-indigo-950/20 text-slate-500 dark:text-indigo-400'}`}>
    <span className="text-xl">{icon}</span>
    {count && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-md">{count}</span>}
  </button>
);

export default HeaderTeacher;