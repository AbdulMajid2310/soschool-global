"use client";

import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center  backdrop-blur-2xl">
      {/* Container Lingkaran Utama */}
      <div className="relative flex items-center justify-center">
        
        {/* Lingkaran Luar (Gradasi Oranye-Biru) */}
        <div className="h-48 w-48 rounded-full border-4 [background:linear-linear(#1e293b,#1e293b)_padding-box,linear-linear(to_bottom,#f97316,#3b82f6)_border-box] opacity-80 animate-[spin_4s_linear_infinite]"></div>
        
        {/* Lingkaran Tengah (Gradasi Ungu-Cyan) */}
        <div className="absolute h-40 w-40 rounded-full border-4 [background:linear-linear(#1e293b,#1e293b)_padding-box,linear-linear(to_right,#8b5cf6,#06b6d4)_border-box] opacity-60 animate-[spin_3s_linear_infinite_reverse]"></div>

        {/* Logo Card (Putih Melengkung) */}
        <div className="absolute flex h-40 w-40 flex-col items-center justify-center  shadow-[0_0_30px_rgba(255,255,255,0.3)] p-4">
          <img 
            src="/images/logo.png" 
            alt="logo" 
            className="h-full w-full object-contain " 
          />
          
        </div>
      </div>

      

      {/* Brand Name So School */}
      <div className="mt-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white flex items-baseline">
          So
          <span className="ml-2 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
            School
          </span>
          <span className="ml-1 h-2 w-4 bg-pink-500 rounded-sm inline-block animate-pulse"></span>
        </h1>
      </div>

    

      {/* Progress Bar Area */}
      <div className="mt-8 w-64">
        <div className="h-4 w-full rounded-full border border-gray-500/50 bg-transparent p-0.5 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-linear-to-r from-cyan-400 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-[progress_2s_infinite_ease-in-out]"></div>
        </div>
      </div>

      

      
    </div>
  );
}