"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiUserCheck, FiCalendar, FiEdit3, FiStar, 
  FiCreditCard, FiMessageCircle, FiLogOut, FiChevronDown, FiX, 
  FiMapPin, FiTrendingUp, FiBookOpen, FiPocket, FiZap, FiAward, FiShare2
} from 'react-icons/fi';

export const ORTU_MENU = [
  {
    group: "Anak Saya",
    items: [
      { label: "Beranda", icon: <FiHome />, path: "/wali-murid/dashboard" },
      { label: "Presensi & Tracking", icon: <FiUserCheck />, path: "/wali-murid/absensi" },
      { label: "Jadwal Pelajaran", icon: <FiCalendar />, path: "/wali-murid/agenda" },
      { label: "Izin & Outpass", icon: <FiMapPin />, path: "/wali-murid/izin" },
    ]
  },
  {
    group: "Akademik & Progress",
    items: [
       { label: "Analisis Progres", icon: <FiTrendingUp />, path: "/wali-murid/progres" },
      { label: "Nilai & Rapor", icon: <FiEdit3 />, path: "/wali-murid/nilai" },
      { label: "Perilaku & Karakter", icon: <FiStar />, path: "/wali-murid/perilaku" },
     
      { label: "Bank Soal & Latihan", icon: <FiZap />, path: "/wali-murid/bank-soal" },
    ]
  },
  {
    group: "Layanan Digital",
    items: [
      { label: "SoPay (Uang Saku)", icon: <FiPocket />, path: "/wali-murid/sopay" },
      { label: "Pinjaman Buku", icon: <FiBookOpen />, path: "/wali-murid/perpus" },
      { label: "Event & Ekstrakurikuler", icon: <FiAward />, path: "/wali-murid/event" },
    ]
  },
  {
    group: "Sosial & Komunikasi",
    items: [
      { label: "Feed Postingan", icon: <FiShare2 />, path: "/wali-murid/feed" },
      { label: "Pesan Guru", icon: <FiMessageCircle />, path: "/wali-murid/chat" },
      { label: "Tagihan & SPP", icon: <FiCreditCard />, path: "/wali-murid/pembayaran" },
    ]
  }
];

export default function SidebarParent({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>("Anak Saya");

  // Helper untuk menentukan apakah sebuah item aktif
  const checkActive = (itemPath: string) => {
    if (itemPath === "/wali-murid/dashboard") {
      return pathname === itemPath;
    }
    // Mendeteksi jika pathname dimulai dengan itemPath (untuk handle sub-routes seperti /detail/soal)
    return pathname.startsWith(itemPath);
  };

  // Efek untuk membuka grup secara otomatis berdasarkan path yang aktif
  useEffect(() => {
    const activeGroup = ORTU_MENU.find(group => 
      group.items.some(item => checkActive(item.path))
    );
    if (activeGroup) setOpenGroup(activeGroup.group);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose} 
      />
      
      {/* Sidebar Aside */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-white/5 flex flex-col transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Logo Section */}
        <div className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <FiZap size={18} />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter dark:text-white uppercase leading-none">
              So<span className="text-indigo-600">School</span>
            </h1>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto no-scrollbar">
          {ORTU_MENU.map((group) => {
            const isExpanded = openGroup === group.group;
            
            return (
              <div key={group.group} className="space-y-1">
                <button 
                  onClick={() => setOpenGroup(isExpanded ? null : group.group)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest italic transition-all cursor-pointer ${
                    isExpanded 
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/5' 
                      : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/2'
                  }`}
                >
                  {group.group}
                  <FiChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-100 opacity-100 mb-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-1 mt-1">
                    {group.items.map((item) => {
                      // MENGGUNAKAN FUNGSI checkActive DISINI
                      const isActive = checkActive(item.path);
                      
                      return (
                        <Link 
                          key={item.path} 
                          href={item.path} 
                          onClick={onClose} 
                          className={`flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 group ${
                            isActive 
                              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/25' 
                              : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-50 dark:hover:bg-white/2'
                          }`}
                        >
                          <span className={`text-lg transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {item.icon}
                          </span>
                          <span className="text-[10px] font-black uppercase italic tracking-widest leading-none pt-0.5">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/1">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500/60 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-black text-[10px] uppercase italic tracking-widest group cursor-pointer">
            <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>
    </>
  );
}