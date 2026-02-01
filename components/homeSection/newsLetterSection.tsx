"use client";

import { HiChevronRight } from "react-icons/hi2";

export default function NewLetterSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      {/* Garis Pemisah Top (V4 bg-linear) */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-30" />
      
      {/* Glow Ambient di belakang Section */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-150 h-150 bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- NEWSLETTER: GLASS CARD --- */}
        <div className="relative group max-w-6xl mx-auto">
          
          {/* Animated Outer Border (V4 Blur-xs) */}
          <div className="absolute -inset-px bg-linear-to-r from-blue-600/40 via-indigo-500/40 to-cyan-400/40 rounded-[2.5rem] md:rounded-[3.5rem] blur-xs group-hover:blur-md transition-all duration-700 opacity-60" />
          
          {/* Main Card */}
          <div className="relative p-8 md:p-16 lg:p-20 rounded-[2.5rem] md:rounded-[3.5rem] bg-slate-950/80 backdrop-blur-3xl border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
            
            {/* Ambient Light inside card (Kanan Atas) */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-600/15 blur-[100px] rounded-full" />
            
            {/* Ambient Light inside card (Kiri Bawah) */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full" />

            {/* LEFT CONTENT */}
            <div className="relative z-10 max-w-xl space-y-6 text-center lg:text-left">
              {/* Badge kecil di atas judul */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">
                Newsletter
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.95]">
                Siap Modernisasi <br />
                <span className="bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent underline decoration-blue-500/20 underline-offset-12">
                  Sekolah Anda?
                </span>
              </h3>
              
              <p className="text-slate-400 text-sm md:text-lg font-medium italic max-w-md mx-auto lg:mx-0 leading-relaxed">
                Bergabunglah dengan ratusan instansi yang telah bertransformasi ke ekosistem digital SoSchool. Dapatkan panduan eksklusif setiap bulannya.
              </p>
            </div>
            
            {/* RIGHT CONTENT: FORM */}
            <form className="w-full lg:max-w-md relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-4">
                <div className="relative group/input">
                  <input 
                    type="email" 
                    placeholder="Masukkan email sekolah..."
                    className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl py-5 px-6 text-sm text-white placeholder:text-slate-600 focus:outline-hidden focus:border-blue-500/50 focus:bg-slate-900/80 focus:ring-4 focus:ring-blue-500/5 transition-all duration-500"
                  />
                  {/* Subtle Glow on Input Focus */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
                
                <button className="relative group/btn overflow-hidden bg-blue-600 hover:bg-white text-white hover:text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl shadow-blue-500/20 active:scale-95 whitespace-nowrap">
                  <span className="relative z-10 flex items-center gap-2">
                    Join Ecosystem <HiChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  {/* Flash effect on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] transition-transform" />
                </button>
              </div>
              
              <p className="mt-4 text-[10px] text-slate-500 text-center lg:text-left italic">
                *Kami menjaga privasi data sekolah Anda secara aman.
              </p>
            </form>

          </div>
        </div>
      </div>

      {/* Tambahkan custom animation shimmmel di globals.css jika belum ada */}
      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}