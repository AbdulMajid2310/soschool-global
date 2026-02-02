"use client";

import React, { useState } from 'react';
import SidebarOrtu from './sidebar';
import Header from '../siswa/headerStudent';

export default function OrtuLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060a13] font-sans text-gray-900 dark:text-gray-100">
      <div className="z-40">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <div className="flex transition-all duration-300">
        <div className='h-screen sticky top-0'>
          <SidebarOrtu isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="flex-1 pt-20 md:pt-24 pb-10 px-4 lg:px-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}