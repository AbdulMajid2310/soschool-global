"use client";

import React, { useState } from 'react';
import { FiMenu, FiBell, FiChevronDown, FiCheck } from 'react-icons/fi';

const CHILDREN = [
  { id: 1, name: "Ahmad Zaki", class: "11-RPL-2", color: "bg-indigo-600" },
  { id: 2, name: "Siti Fatimah", class: "10-AKL-1", color: "bg-rose-600" }
];

const HeaderOrtu = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [selectedChild, setSelectedChild] = useState(CHILDREN[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
  <header className="h-16 md:h-20 w-full fixed top-0 z-50 flex items-center justify-between px-4 md:px-8 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border-b border-slate-200 dark:border-indigo-900/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-600 dark:text-slate-300 active:scale-90 transition-transform">
            <FiMenu size={24} />
          </button>
          
          {/* Child Switcher Dropdown */}
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all">
              <div className={`w-8 h-8 ${selectedChild.color} rounded-lg flex items-center justify-center text-[10px] font-black italic text-white`}>
                {selectedChild.name[0]}
              </div>
              <div className="hidden sm:block text-left">
                <h4 className="text-[10px] font-black italic uppercase dark:text-white leading-none">{selectedChild.name}</h4>
                <p className="text-[8px] font-bold text-slate-400 mt-0.5">{selectedChild.class}</p>
              </div>
              <FiChevronDown className="text-slate-400 ml-2" />
            </button>

            {showDropdown && (
              <div className="absolute top-14 left-0 w-56 bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {CHILDREN.map((child) => (
                  <button key={child.id} onClick={() => { setSelectedChild(child); setShowDropdown(false); }} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-all border-b border-slate-100 dark:border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${child.color} rounded-lg flex items-center justify-center text-[10px] font-black italic text-white`}>{child.name[0]}</div>
                      <div className="text-left">
                        <p className="text-[10px] font-black italic uppercase dark:text-white leading-none">{child.name}</p>
                        <p className="text-[8px] font-bold text-slate-400">{child.class}</p>
                      </div>
                    </div>
                    {selectedChild.id === child.id && <FiCheck className="text-emerald-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="relative p-3 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-2xl hover:text-indigo-600 transition-all">
          <FiBell size={20} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0a0f1d]" />
        </button>

      </div>
    </header>
  );
}

export default HeaderOrtu