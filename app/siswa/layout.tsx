"use client";

import React, { useState } from 'react';
import Sidebar from './sidebarStudent';
import Header from './headerStudent';

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 ">

      <div className="z-40">
       <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <div className="flex transition-all duration-300">

        <div className='h-screen sticky top-0'>

       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* 4. CONTENT AREA (Scrollable) */}
        <main className="flex-1 overflow-y-auto py-20 px-4 lg:px-6 text-gray-800 dark:text-gray-100">

          {children}

        </main>

      </div>
    </div>
  );
}

