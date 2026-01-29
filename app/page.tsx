"use client";

import React from 'react';
import Link from 'next/link';
import { FiUser, FiShield, FiBriefcase, FiBookOpen, FiArrowRight } from 'react-icons/fi';

const SelectRolePage = () => {
  const roles = [
    {
      title: "SISWA",
      desc: "Akses materi, tugas, dan komunitas sekolah.",
      icon: <FiUser size={32} />,
      href: "/siswa/home",
      color: "from-blue-600 to-cyan-400",
      glow: "shadow-blue-500/20",
      bg: "bg-blue-500/5"
    },
    {
      title: "GURU",
      desc: "Kelola kurikulum, nilai, dan absensi siswa.",
      icon: <FiBookOpen size={32} />,
      href: "/guru",
      color: "from-purple-600 to-pink-500",
      glow: "shadow-purple-500/20",
      bg: "bg-purple-500/5"
    },
    {
      title: "STAFF",
      desc: "Administrasi, inventaris, dan manajemen sekolah.",
      icon: <FiBriefcase size={32} />,
      href: "/staff/dashboard",
      color: "from-emerald-600 to-teal-400",
      glow: "shadow-emerald-500/20",
      bg: "bg-emerald-500/5"
    },
    {
      title: "SUPER ADMIN",
      desc: "Kontrol penuh seluruh ekosistem SoSchool.",
      icon: <FiShield size={32} />,
      href: "/super-admin",
      color: "from-rose-600 to-orange-500",
      glow: "shadow-rose-500/20",
      bg: "bg-rose-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050811] flex flex-col items-center justify-center p-6 font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/10 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="relative text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-block p-1 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
           <div className="bg-[#050811] px-4 py-1 rounded-[0.9rem]">
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] italic">Ecosystem Access</span>
           </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
          PILIH <span className="text-blue-500">DASHBOARD</span>
        </h1>
        <p className="mt-4 text-gray-500 font-medium tracking-wide">Selamat datang kembali, silakan masuk ke portal Anda.</p>
      </div>

      {/* Grid Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl relative z-10">
        {roles.map((role, idx) => (
          <Link 
            key={role.title} 
            href={role.href}
            className={`group relative p-8 rounded-[2.5rem] border border-white/5 ${role.bg} backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Hover Glow Effect */}
            <div className={`absolute -inset-20 bg-linear-to-r ${role.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-tr ${role.color} flex items-center justify-center text-white shadow-lg ${role.glow} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {role.icon}
              </div>

              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-3">
                {role.title}
              </h3>
              <p className="text-sm text-gray-500 font-bold leading-relaxed mb-8 flex-1">
                {role.desc}
              </p>

              <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                Masuk Portal <FiArrowRight className="text-blue-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <p className="mt-16 text-[9px] font-black text-gray-600 uppercase tracking-[0.5em] italic">
        SoSchool Version 4.0 • Built for Future Education
      </p>
    </div>
  );
};

export default SelectRolePage;