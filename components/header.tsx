"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FiSearch, FiBell, FiMenu,
  FiSettings, FiLogOut, FiUser, FiCalendar, FiUsers
} from 'react-icons/fi';
import { IoChatbubbles, IoHome } from 'react-icons/io5';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { BsBank2 } from 'react-icons/bs';

import ThemeToggle from '@/components/button/ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';
import NotificationDropdown from '@/app/notifications/notificationDropdown';
import ChatDropdown from '@/app/chat/chatDropdown';

// --- Types ---
interface HeaderProps {
  onMenuClick?: () => void;
}

interface NavTabProps {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label?: string;
}

// --- Sub-components (Memoized for performance) ---

const NavTab = memo(({ href, active, icon }: NavTabProps) => (
  <Link 
    href={href} 
    className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all group 
    ${active ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400 dark:text-blue-900/60 hover:text-blue-500'}`}
  >
    <span className="text-2xl">{icon}</span>
    {active && <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />}
  </Link>
));
NavTab.displayName = 'NavTab';

const MobileNavTab = memo(({ href, active, icon }: NavTabProps) => (
  <Link 
    href={href} 
    className={`p-3 rounded-2xl transition-all duration-500 
    ${active ? 'bg-blue-600 text-white -translate-y-4 shadow-[0_10px_20px_rgba(37,99,235,0.4)]' : 'text-slate-400 dark:text-blue-900 hover:text-blue-500'}`}
  >
    <span className="text-2xl">{icon}</span>
  </Link>
));
MobileNavTab.displayName = 'MobileNavTab';

const DropdownContainer = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="absolute top-14 right-0 w-72 p-3 animate-in fade-in slide-in-from-top-2 z-100 
    bg-white dark:bg-[#0a0f1d]/95 backdrop-blur-3xl border border-slate-200 dark:border-blue-900/30 rounded-4xl shadow-2xl">
    <div className="px-4 py-3 mb-1 border-b border-slate-100 dark:border-blue-900/20">
      <h4 className="text-[9px] font-black text-slate-400 dark:text-blue-400/50 uppercase tracking-widest italic">{title}</h4>
    </div>
    <div className="mt-2 space-y-1">{children}</div>
  </div>
);

// --- Main Component ---

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { profile } = useAppSelector((state) => state.auth);
  console.log('Profile', profile)

  useEffect(() => {
    if (!profile) dispatch(getProfileMe());
  }, [dispatch, profile]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback((name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  }, []);

  const isNavActive = (path: string) => pathname.startsWith(path);

  return (
    <>
      <header className="h-16 md:h-20 w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 
        dark:bg-white/80 bg-[#050810] backdrop-blur-xl border-b border-slate-200 dark:border-blue-900/20 shadow-sm">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-slate-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-blue-500/10 rounded-xl transition-all"
          >
            <FiMenu size={24} />
          </button>

          <Link href="/home" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 md:w-10 md:h-10">
              <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:bg-blue-500/40 transition-all" />
              <img src="/images/logo.png" alt="SoSchool" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="hidden sm:block leading-none">
              <h1 className="text-sm md:text-base font-black italic uppercase text-slate-900 dark:text-white">
                SO<span className="text-blue-500">SCHOOL</span>
              </h1>
              <p className="text-[7px] font-bold text-slate-500 dark:text-blue-400/50 uppercase tracking-[0.2em] mt-0.5 italic">Student Hub</p>
            </div>
          </Link>
        </div>

        {/* CENTER: SEARCH */}
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Cari materi..."
              className="w-full py-2.5 pl-11 pr-4 rounded-2xl outline-none text-xs font-bold transition-all
                bg-slate-100 dark:bg-blue-950/20 border border-transparent focus:border-blue-500/30 
                text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <div className="hidden xl:flex items-center gap-1 mr-4">
            <NavTab href="/home" active={isNavActive('/home')} icon={<IoHome />} />
            <NavTab href="/events" active={isNavActive('/events')} icon={<FiCalendar />} />
            <NavTab href="/marketplace" active={isNavActive('/marketplace')} icon={<SiHomeassistantcommunitystore />} />
            <NavTab href="/bank-soal" active={isNavActive('/bank-soal')} icon={<BsBank2 />} />
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-blue-900/20 pl-4">
            {/* Chat Icon */}
            <div className="relative">
              <IconButton 
                icon={<IoChatbubbles />} 
                count={7} 
                active={activeDropdown === 'chat'} 
                onClick={() => toggleDropdown('chat')} 
              />
              {activeDropdown === 'chat' && (
                <DropdownContainer title="Pesan Masuk">
                  <ChatDropdown closeDropdown={() => setActiveDropdown(null)} />
                </DropdownContainer>
              )}
            </div>

            {/* Notification Icon */}
            <div className="relative">
              <IconButton 
                icon={<FiBell />} 
                active={activeDropdown === 'notif'} 
                onClick={() => toggleDropdown('notif')} 
              />
              {activeDropdown === 'notif' && (
                <DropdownContainer title="Pusat Notifikasi">
                  <NotificationDropdown closeDropdown={() => setActiveDropdown(null)} />
                </DropdownContainer>
              )}
            </div>

            {/* Profile */}
            <div className="relative ml-2">
              <button 
                onClick={() => toggleDropdown('profile')} 
                className={`w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border-2 transition-all 
                ${activeDropdown === 'profile' ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-blue-500/50'}`}
              >
                <img src={ "https://i.pravatar.cc/150?u=majid"} alt="Profile" className="w-full h-full object-cover" />
              </button>

              {activeDropdown === 'profile' && (
                <DropdownContainer title="Akun Saya">
                  <DropdownItem icon={<FiUser />} title={profile?.user?.username || "User"} desc="Lihat Profil" />
                  <DropdownItem icon={<FiSettings />} title="Pengaturan" desc="Tema & Privasi" />
                  <div className='flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl mx-1'>
                    <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 italic">Dark Mode</p>
                    <ThemeToggle/>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-blue-900/20 my-2 mx-2" />
                  <DropdownItem icon={<FiLogOut className="text-red-500" />} title="Keluar" desc="Akhiri Sesi" />
                </DropdownContainer>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 px-4 flex items-center justify-around border-t 
        bg-white/90 dark:bg-[#050810]/95 backdrop-blur-xl border-slate-200 dark:border-blue-900/20 shadow-2xl">
        <MobileNavTab href="/home" active={isNavActive('/home')} icon={<IoHome />} />
        <MobileNavTab href="/events" active={isNavActive('/events')} icon={<FiCalendar />} />
        <MobileNavTab href="/marketplace" active={isNavActive('/marketplace')} icon={<SiHomeassistantcommunitystore />} />
        <MobileNavTab href="/bank-soal" active={isNavActive('/bank-soal')} icon={<BsBank2 />} />
        <MobileNavTab href="/friends" active={isNavActive('/friends')} icon={<FiUsers />} />
      </nav>
    </>
  );
};

// --- Helpers ---

const IconButton = memo(({ icon, count, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`relative p-2.5 rounded-xl transition-all border outline-none
    ${active 
      ? 'bg-blue-600 border-blue-400 text-white shadow-blue-500/20' 
      : 'bg-slate-100 dark:bg-blue-950/20 border-transparent text-slate-500 dark:text-blue-400 hover:border-blue-500/30'}`}
  >
    <span className="text-xl">{icon}</span>
    {count && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-md border-2 border-white dark:border-[#050810]">
        {count}
      </span>
    )}
  </button>
));
IconButton.displayName = 'IconButton';

const DropdownItem = memo(({ icon, title, desc }: any) => (
  <button className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-blue-500/10 transition-all text-left group">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg transition-all
      bg-slate-100 dark:bg-blue-950/40 text-slate-500 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white">
      {icon}
    </div>
    <div className="overflow-hidden leading-tight">
      <p className="text-[10px] font-black uppercase italic tracking-tighter truncate text-slate-900 dark:text-white">{title}</p>
      <p className="text-[8px] truncate font-medium text-slate-500 dark:text-blue-100/30">{desc}</p>
    </div>
  </button>
));
DropdownItem.displayName = 'DropdownItem';

export default memo(Header);