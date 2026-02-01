"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FiSearch, FiBell, FiZap, FiMenu,
  FiSettings, FiLogOut, FiUser, FiCalendar, FiUsers
} from 'react-icons/fi';
import { IoChatbubbles, IoHome } from 'react-icons/io5';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { BsBank2 } from 'react-icons/bs';
import NotificationDropdown from './notifications/notificationDropdown';
import ChatDropdown from './chat/chatDropdown';
import ThemeToggle from '@/components/button/ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';


interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isNavActive = (path: string) => pathname === path;
 const { profile } = useAppSelector((state) => state.auth);
 useEffect(() => {
  dispatch(getProfileMe());
}, [dispatch]);
console.log('data user',profile)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

 
  return (
    <>
      {/* --- HEADER DENGAN MODE DARK --- */}
      <header className="h-16 md:h-20 w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 transition-all border-b 
        bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border-slate-200 dark:border-blue-900/20 shadow-sm dark:shadow-none">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 text-slate-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-blue-500/10 rounded-xl transition-all"
          >
            <FiMenu size={24} />
          </button>

          <Link href="/siswa" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full group-hover:bg-blue-500/40" />
              <img src="/images/logo.png" alt="SoSchool" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm md:text-lg font-black tracking-tighter italic uppercase leading-none text-slate-900 dark:text-white">
                SO<span className="text-blue-500">SCHOOL</span>
              </h1>
              <p className="text-[7px] font-bold text-slate-500 dark:text-blue-400/50 uppercase tracking-[0.2em] mt-0.5 italic text-nowrap">Student Hub</p>
            </div>
          </Link>
        </div>

        {/* CENTER: SEARCH */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <div className="relative group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-blue-800 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Cari materi atau teman..."
              className="w-full p-2.5 pl-11 rounded-2xl outline-none text-xs font-bold transition-all
                bg-slate-100 dark:bg-blue-950/30 
                border border-transparent focus:border-blue-500/30 
                text-slate-900 dark:text-white 
                placeholder:text-slate-400 dark:placeholder:text-blue-900"
            />
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-1 md:gap-3 relative" ref={dropdownRef}>
          <div className="hidden xl:flex items-center gap-1 mr-2">
            <NavTab href="/siswa/home" active={isNavActive('/siswa/home')} icon={<IoHome />} label="Home" />
            <NavTab href="/siswa/events" active={isNavActive('/siswa/events')} icon={<FiCalendar />} label="Events" />
            <NavTab href="/siswa/marketplace" active={isNavActive('/siswa/marketplace')} icon={<SiHomeassistantcommunitystore />} label="Market" />
            <NavTab href="/siswa/bank-soal" active={isNavActive('/siswa/bank-soal')} icon={<BsBank2 />} label="Bank" />
          </div>

          <div className="flex items-center gap-1 md:gap-2 border-l border-slate-200 dark:border-blue-900/30 pl-2 md:pl-4">
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

            {/* Profile Dropdown */}
            <div className="relative ml-1 md:ml-2">
              <button onClick={() => toggleDropdown('profile')} className="relative group cursor-pointer">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden border-2 transition-all 
                  ${activeDropdown === 'profile' ? 'border-blue-500 shadow-[0_0_15px_#3b82f6]' : 'border-transparent group-hover:border-blue-500/50'}`}>
                  <img src={"https://i.pravatar.cc/150?u=majid"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </button>

              {activeDropdown === 'profile' && (
                <DropdownContainer title="Profil Siswa">
                  <DropdownItem icon={<FiUser />} title={profile?.user.username || "Siswa"} desc={`${ 0} XP • ${ 'Class'}`} />
                  <DropdownItem icon={<FiSettings />} title="Pengaturan" desc="Tema & Privasi" />
                  <div className='flex justify-between items-center px-4 py-2'>
                    <p className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 italic">Mode Dark</p>
                    <ThemeToggle/>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-blue-900/20 my-2 mx-2" />
                  <DropdownItem icon={<FiLogOut className="text-red-500" />} title="Keluar" desc="Log out" />
                </DropdownContainer>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-around border-t 
        bg-white/95 dark:bg-[#0a0f1d]/95 backdrop-blur-2xl border-slate-200 dark:border-blue-900/20">
        <MobileNavTab href="/siswa/home" active={isNavActive('/siswa/home')} icon={<IoHome />} />
        <MobileNavTab href="/siswa/events" active={isNavActive('/siswa/events')} icon={<FiCalendar />} />
        <MobileNavTab href="/siswa/marketplace" active={isNavActive('/siswa/marketplace')} icon={<SiHomeassistantcommunitystore />} />
        <MobileNavTab href="/siswa/bank-soal" active={isNavActive('/siswa/bank-soal')} icon={<BsBank2 />} />
        <MobileNavTab href="/siswa/friends" active={isNavActive('/siswa/friends')} icon={<FiUsers />} />
      </nav>
    </>
  );
};

const NavTab = ({ href, active, icon }: any) => (
  <Link href={href} className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all group 
    ${active ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400 dark:text-blue-900 hover:text-blue-500'}`}>
    <span className="text-2xl">{icon}</span>
    {active && <div className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />}
  </Link>
);

const MobileNavTab = ({ href, active, icon }: any) => (
  <Link href={href} className={`p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-blue-600 text-white -translate-y-4 shadow-[0_10px_20px_rgba(37,99,235,0.4)]' : 'text-slate-400 dark:text-blue-900 hover:text-blue-500'}`}>
    <span className="text-2xl">{icon}</span>
  </Link>
);

const IconButton = ({ icon, hasBadge, count, active, onClick }: any) => (
  <button onClick={onClick} className={`relative p-2.5 rounded-xl transition-all cursor-pointer border 
    ${active 
      ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
      : 'bg-slate-100 dark:bg-blue-950/20 border-transparent text-slate-500 dark:text-blue-400 hover:border-blue-500/30'}`}>
    <span className="text-xl">{icon}</span>
    {hasBadge && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white dark:border-[#0a0f1d]" />}
    {count && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-md border-2 border-white dark:border-[#0a0f1d]">{count}</span>}
  </button>
);

const DropdownContainer = ({ children, title }: any) => (
  <div className="absolute top-14 right-0 w-64 p-3 animate-in fade-in slide-in-from-top-2 z-100 
    bg-white dark:bg-[#0a0f1d]/98 backdrop-blur-3xl border border-slate-200 dark:border-blue-900/30 rounded-4xl shadow-2xl">
    <div className="px-4 py-3 mb-1 border-b border-slate-100 dark:border-blue-900/20">
      <h4 className="text-[9px] font-black text-slate-400 dark:text-blue-400/50 uppercase tracking-widest italic">{title}</h4>
    </div>
    <div className="mt-2 space-y-1">{children}</div>
  </div>
);

const DropdownItem = ({ icon, title, desc }: any) => (
  <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-blue-500/10 transition-all text-left group">
    <div className="w-9 h-9 flex items-center justify-center rounded-xl transition-all
      bg-slate-100 dark:bg-blue-950/40 text-slate-500 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black uppercase italic tracking-tighter truncate text-slate-900 dark:text-white">{title}</p>
      <p className="text-[9px] truncate mt-0.5 font-medium text-slate-500 dark:text-blue-100/30">{desc}</p>
    </div>
  </button>
);

export default Header;