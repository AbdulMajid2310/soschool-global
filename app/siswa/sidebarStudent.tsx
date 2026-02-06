"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBookOpen, FiFileText, FiBarChart2, FiStar, FiCreditCard, FiBook, FiChevronRight, FiX, FiLogOut } from 'react-icons/fi';

export const SISWA_MENU = [
  {
    group: "LMS Core",
    items: [
      { label: "Dashboard", icon: <FiHome />, path: "/siswa/dashboard" },
      { label: "Mata Pelajaran", icon: <FiBookOpen />, path: "/siswa/akademik" },
      { label: "Tugas & Kuis", icon: <FiFileText />, path: "/siswa/tugas" },
      { label: "Rapor Digital", icon: <FiBarChart2 />, path: "/siswa/rapor" },
    ]
  },
  {
    group: "Life & Skill",
    items: [
      { label: "Ekstrakurikuler", icon: <FiStar />, path: "/siswa/ekskul" },
      { label: "SoPay Balance", icon: <FiCreditCard />, path: "/siswa/keuangan" },
      { label: "Digital Library", icon: <FiBook />, path: "/siswa/perpustakaan" },
    ]
  }
];

const SidebarStudent = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY MOBILE */}
      <div 
        className={`fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300 lg:hidden 
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* SIDEBAR ASIDE */}
      <div className='pt-14  h-screen flex flex-col justify-end'>

      <aside className={`
        fixed lg:relative top-0 left-0 z-100  w-64 shadow-2xl rounded-2xl
        /* Light Mode: White | Dark Mode: Deep Blue */
        bg-white dark:bg-[#0a0f1d] 
        /* Borders */
        border-r border-slate-200 dark:border-blue-900/20 
        flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* CLOSE BUTTON MOBILE */}
        <button 
          onClick={onClose} 
          className="lg:hidden absolute top-6 right-6 p-2 rounded-xl transition-colors
          text-slate-500 dark:text-blue-400 
          bg-slate-100 dark:bg-blue-500/10 
          hover:bg-slate-200 dark:hover:bg-blue-500/20"
        >
          <FiX size={20} />
        </button>

        <div className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar py-6">
          {SISWA_MENU.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="px-6 text-[9px] font-black uppercase tracking-[0.3em] italic
                text-slate-400 dark:text-blue-400/30">
                {group.group}
              </h4>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      onClick={() => onClose()} 
                      className={`
                        flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 group
                        ${isActive 
                          ? 'bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]' 
                          : 'text-slate-500 dark:text-blue-100/40 hover:bg-slate-100 dark:hover:bg-blue-800/20 hover:text-blue-600 dark:hover:text-blue-300'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xl ${isActive ? 'text-white' : 'text-slate-400 dark:text-inherit'}`}>
                          {item.icon}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest italic">
                          {item.label}
                        </span>
                      </div>
                      {!isActive && <FiChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-100 dark:border-blue-900/20">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic
            text-red-500/60 dark:text-red-400/60 
            hover:bg-red-50 dark:hover:bg-red-500/10 
            hover:text-red-600 dark:hover:text-red-500">
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      </div>
    </>
  );
};

export default SidebarStudent;