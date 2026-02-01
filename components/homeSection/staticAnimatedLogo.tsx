"use client";

import { FaChartBar, FaVideo, FaBell, FaSchool } from "react-icons/fa6";

function FloatingIcon({ icon, className, color }: { icon: any, className: string, color: string }) {
  return (
    <div className={`absolute z-20 text-white ${color} backdrop-blur-xl p-2.5 md:p-4 rounded-xl md:rounded-2xl shadow-2xl border border-white/10 transition-all duration-700 hover:scale-125 hover:z-30 cursor-pointer ${className}`}>
      <span className="text-base md:text-xl block">{icon}</span>
    </div>
  );
}

export default function StaticAnimatedLogo() {
  return (
    // Menggunakan aspect-square agar kontainer stabil secara responsive
    <div className="relative w-full max-w-75 md:max-w-125 aspect-square flex items-center justify-center mx-auto">
      
      {/* --- BACKGROUND ORBIT RINGS --- */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Ring Luar */}
        <div className="absolute w-[90%] h-[90%] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
        {/* Ring Dalam */}
        <div className="absolute w-[70%] h-[70%] border border-dashed border-slate-700/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
        {/* Center Glow */}
        <div className="absolute w-1/2 h-1/2 bg-blue-600/15 blur-[60px] md:blur-[100px] rounded-full animate-pulse" />
      </div>

      {/* --- MAIN LOGO CONTAINER --- */}
      <div className="relative z-10 w-[60%] h-[60%] flex items-center justify-center">
        <img
          src="/images/logo.png"
          className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(37,99,235,0.4)] animate-[float_5s_ease-in-out_infinite]"
          alt="SoSchool Logo"
        />
        
        {/* AI Badge - Skala menyesuaikan */}
        <div className="absolute top-0 right-0 bg-blue-600 px-2 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg shadow-lg rotate-12 -translate-y-2 translate-x-2">
          <span className="text-[7px] md:text-[9px] font-black text-white uppercase tracking-tighter italic">AI Ready</span>
        </div>
      </div>

      {/* --- FLOATING ICONS (Positioned relative to the square container) --- */}
      {/* Ikon Video - Kiri Atas */}
      <FloatingIcon 
        icon={<FaVideo />} 
        color="bg-linear-to-br from-blue-500 to-indigo-600"
        className="top-[10%] left-[10%] animate-[bounce_4s_infinite]" 
      />
      
      {/* Ikon Bell - Kanan Atas */}
      <FloatingIcon 
        icon={<FaBell />} 
        color="bg-linear-to-br from-pink-500 to-rose-600"
        className="top-[15%] right-[5%] animate-[bounce_5s_infinite_1s]" 
      />
      
      {/* Ikon School - Kiri Bawah */}
      <FloatingIcon 
        icon={<FaSchool />} 
        color="bg-linear-to-br from-teal-500 to-emerald-600"
        className="bottom-[15%] left-[5%] animate-[bounce_6s_infinite_1.5s]" 
      />
      
      {/* Ikon Chart - Kanan Bawah */}
      <FloatingIcon 
        icon={<FaChartBar />} 
        color="bg-linear-to-br from-orange-500 to-amber-600"
        className="bottom-[10%] right-[10%] animate-[bounce_4.5s_infinite_0.5s]" 
      />

      {/* CSS untuk Animasi Float (Tambahkan di globals.css atau style tag) */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}