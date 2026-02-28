"use client";

import React from 'react';
import { 
  FiArrowLeft, FiShield, FiStar, FiActivity, 
  FiMapPin, FiClock, FiChevronRight, FiZap, 
  FiUser, FiSettings, FiExternalLink, FiCoffee
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ClubDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  // 1. DATA PEMBINA & CORE TEAM
  const PEMBINA = {
    name: "Majid Amin, S.Kom",
    role: "Pembina Ekskul",
    specialty: "Senior Software Engineer",
    avatar: "https://i.pravatar.cc/150?u=majid-pembina"
  };

  const CORE_DATA = [
    { id: '1', name: 'Sarah Az-Zahra', role: 'Ketua', class: '12-RPL-1', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: '2', name: 'Fajri Ramadhan', role: 'Wakil Ketua', class: '12-RPL-2', avatar: 'https://i.pravatar.cc/150?u=fajri' },
    { id: '3', name: 'Dimas Pratama', role: 'Sekretaris', class: '11-TKJ-1', avatar: 'https://i.pravatar.cc/150?u=dimas' },
    { id: '4', name: 'Indah Kusuma', role: 'Bendahara', class: '11-RPL-1', avatar: 'https://i.pravatar.cc/150?u=indah' },
  ];

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-1000">
      
      {/* --- 1. PREMIUM HEADER SECTION --- */}
      <div className="relative h-120 w-full px-4 pt-4">
        <div className="absolute top-10 left-10 z-30 flex gap-4">
          <button 
            onClick={() => router.back()}
            className="p-4 bg-black/20 backdrop-blur-3xl border border-white/20 rounded-3xl text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            <FiArrowLeft size={20} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-full w-full rounded-[4.5rem] overflow-hidden shadow-3xl">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600" 
            className="w-full h-full object-cover" 
            alt="cover" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
          
          {/* Header Content */}
          <div className="absolute bottom-16 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-[3.5rem] blur-3xl opacity-30" />
                <div className="relative w-40 h-40 bg-white dark:bg-gray-950 rounded-[3.5rem] p-8 border-12 border-white/5 shadow-2xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/6062/6062293.png" className="w-full h-full object-contain" alt="logo" />
                </div>
              </div>

              <div className="text-center md:text-left space-y-4">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                   <span className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">Technology</span>
                   <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">98.2% Stable</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                  Cyber <span className="text-blue-500">Tech</span>
                </h1>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.5em] italic">Building the future, one line at a time.</p>
              </div>
            </div>

            {/* --- ACTION: MANAGE DASHBOARD (Route ke Ketua) --- */}
            <Link href={`/siswa/ekskul/manage`}>
               <button className="group flex items-center gap-4 bg-blue-600 hover:bg-white text-white hover:text-black p-2 pr-8 rounded-[2.5rem] transition-all duration-700 shadow-2xl shadow-blue-500/30">
                  <div className="w-14 h-14 bg-white/20 group-hover:bg-blue-600 rounded-4xl flex items-center justify-center transition-colors">
                     <FiSettings className="group-hover:rotate-180 transition-transform duration-1000" size={20} />
                  </div>
                  <div className="text-left">
                     <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">Admin Access</p>
                     <p className="text-xs font-black uppercase tracking-tighter italic">Manage Dashboard</p>
                  </div>
               </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-12 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT: HIERARCHY & MEMBERS */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* 1. PEMBINA SECTION (Highlight) */}
          <section className="space-y-6">
             <h3 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 px-2 italic">Faculty Advisor</h3>
             <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-[4rem] p-1 overflow-hidden shadow-2xl">
                <div className="bg-white dark:bg-gray-950 rounded-[3.8rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden border-4 border-blue-500/20">
                         <img src={PEMBINA.avatar} alt="pembina" className="w-full h-full object-cover" />
                      </div>
                      <div>
                         <h4 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">{PEMBINA.name}</h4>
                         <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{PEMBINA.role}</p>
                         <div className="flex items-center gap-2 mt-2 text-gray-400">
                            <FiCoffee size={14} />
                            <span className="text-[10px] font-bold italic">{PEMBINA.specialty}</span>
                         </div>
                      </div>
                   </div>
                   <button className="px-8 py-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-widest dark:text-white hover:bg-blue-600 hover:text-white transition-all">
                      Hubungi Pembina
                   </button>
                </div>
             </div>
          </section>

          {/* 2. CORE TEAM SECTION */}
          <section className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 px-2 italic flex items-center gap-3">
               <FiShield className="text-blue-500" /> Executive Board
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CORE_DATA.map((member) => (
                <div key={member.id} className="group bg-white dark:bg-gray-900/50 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-500 shadow-sm">
                  <div className="flex items-center gap-6">
                    <img src={member.avatar} className="w-20 h-20 rounded-4xl object-cover group-hover:scale-105 transition-transform" alt="" />
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{member.role}</p>
                      <h4 className="text-xl font-black dark:text-white uppercase italic tracking-tighter mt-1">{member.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{member.class}</p>
                    </div>
                    <FiChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: TACTICAL INFO */}
        <div className="lg:col-span-4 space-y-12">
           
           {/* SCHEDULE CARD */}
           <div className="bg-white dark:bg-gray-900 rounded-[4rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
              <div className="flex items-center gap-5">
                 <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-4xl flex items-center justify-center text-blue-600">
                    <FiMapPin size={28} />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white leading-none">Lab Tech 3</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1 italic">Innovation Tower</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2.5rem]">
                    <div className="flex items-center gap-3">
                       <FiClock className="text-blue-500" />
                       <span className="text-[11px] font-black uppercase tracking-widest dark:text-white">Senin & Kamis</span>
                    </div>
                    <span className="text-[10px] font-black italic text-blue-600 uppercase">15:30</span>
                 </div>
              </div>

              <button className="w-full py-6 bg-gray-950 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl">
                 Lihat Kurikulum Sesi
              </button>
           </div>

           {/* LOGS / STATUS */}
           <div className="bg-gray-950 rounded-[4rem] p-10 text-white relative overflow-hidden shadow-3xl">
              <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 italic">Status Server</h4>
                    <FiActivity className="text-emerald-400 animate-pulse" />
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs font-black italic uppercase">
                       <span className="opacity-40">Presensi Rate</span>
                       <span className="text-blue-400">92%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-black italic uppercase">
                       <span className="opacity-40">Project Done</span>
                       <span className="text-blue-400">14</span>
                    </div>
                 </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" />
           </div>

        </div>

      </div>
    </div>
  );
};

export default ClubDetailPage;