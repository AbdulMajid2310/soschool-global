"use client";

import { FaStar } from "react-icons/fa";
import { FaPlay, FaRocket } from "react-icons/fa6";
import { useState, useEffect } from "react";
import StaticAnimatedLogo from "./staticAnimatedLogo";
import { LuSchool } from "react-icons/lu";

const heroSlides = [
  {
    badge: "The Future of Education",
    title1: "Digitalisasi",
    title2: "Tanpa Batas",
    desc: "Transformasikan ekosistem pendidikan Anda dengan manajemen sekolah berbasis cloud yang cerdas, aman, dan terintegrasi.",
    users: "250+ Sekolah Telah Bergabung",
    gradient: "from-blue-500 via-indigo-500 to-cyan-400",
    glow: "bg-blue-500/20"
  },
  {
    badge: "Smart Learning System",
    title1: "LMS Modern",
    title2: "Interaktif",
    desc: "Pantau perkembangan akademik siswa secara real-time dengan kurikulum digital yang dipersonalisasi untuk setiap kebutuhan.",
    users: "10.000+ Materi Digital Aktif",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    glow: "bg-red-500/20"
  },
  {
    badge: "Integrated Communication",
    title1: "Koneksi",
    title2: "Guru & Wali",
    desc: "Bangun transparansi pendidikan melalui laporan otomatis dan sistem notifikasi yang menghubungkan sekolah dengan orang tua.",
    users: "Komunitas Pendidikan Terbesar",
    gradient: "from-teal-400 to-blue-500",
    glow: "bg-teal-500/20"
  }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroSlides.length);
        setFade(true); 
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] pt-32 pb-20 lg:py-0">
      
      {/* --- BACKGROUND DYNAMICS --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[100vw] lg:w-[60vw] lg:h-[60vw] ${heroSlides[index].glow} blur-[120px] rounded-full transition-all duration-1000 opacity-40`} />
        
        {/* V4 Subtle Pattern: Blueprint Grid */}
        <div className="absolute inset-0 opacity-[0.05] [mask-[radial-gradient(circle,black,transparent_80%)" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-4 items-center">
          
          {/* --- LEFT CONTENT: Typographic Focus --- */}
          <div className="space-y-10 text-center lg:text-left order-2 lg:order-1">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-2.5 rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
                {heroSlides[index].badge}
              </span>
            </div>

            {/* Heading: Controlled Fluid Sizing */}
            <div className={`transition-all duration-700 ease-out ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl  font-black leading-[0.95] tracking-tighter uppercase italic">
                <span className={`bg-linear-to-r ${heroSlides[index].gradient} bg-clip-text text-transparent block transition-all duration-1000`}>
                  {heroSlides[index].title1}
                </span>
                <span className="text-white block">
                  {heroSlides[index].title2}
                </span>
              </h1>
              
              <p className="mt-8 text-base md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed italic border-l-0 lg:border-l-4 lg:border-blue-500/30 lg:pl-8">
                {heroSlides[index].desc}
              </p>
            </div>

            {/* CTAs: Interactive Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <button className="w-full sm:w-auto group relative bg-blue-600 hover:bg-white text-white hover:text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shadow-[0_0_40px_rgba(37,99,235,0.3)] active:scale-95">
                <LuSchool className="text-lg group-hover:rotate-12 transition-transform" /> 
                Daftar Sekolah
              </button>

              <button className="w-full sm:w-auto group border-2 border-slate-800 hover:border-blue-500/50 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 text-white transition-all duration-500 backdrop-blur-sm">
                <FaPlay className="text-blue-500 group-hover:scale-125 transition-transform" size={12} />
                Lihat Demo
              </button>
            </div>

            {/* Proofing Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-12 border-t border-white/5">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-2 border-[#030712] bg-slate-800 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={`https://i.pravatar.cc/150?u=school${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start gap-1 mb-1 text-blue-500">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={10} />)}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
                  {heroSlides[index].users}
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT VISUAL: Centered & Balanced --- */}
          <div className="relative w-full flex justify-center items-center order-1 lg:order-2">
            {/* Decorative Orbit Background */}
            <div className="absolute w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite] opacity-20" />
            
            <div className="relative w-full max-w-[320px] sm:max-w-112.5 lg:max-w-137.5 aspect-square">
              <StaticAnimatedLogo />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}