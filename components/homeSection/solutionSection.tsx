"use client";

import { 
  HiOutlineCpuChip, 
  HiOutlineGlobeAsiaAustralia, 
  HiOutlineLockClosed, 
  HiOutlineSparkles,
  HiArrowSmallRight
} from "react-icons/hi2";
import { TbShieldCheckeredFilled } from "react-icons/tb";

const solutions = [
  {
    title: 'Smart Analytics Dashboard',
    category: 'Management',
    description: 'Pantau performa akademik dan finansial sekolah secara real-time dengan visualisasi data yang cerdas.',
    icon: <HiOutlineCpuChip />,
    gradient: 'from-blue-600 to-cyan-500',
    size: 'md:col-span-2'
  },
  {
    title: 'Parent-Teacher Hub',
    category: 'Communication',
    description: 'Ekosistem kolaborasi instan untuk transparansi perkembangan siswa.',
    icon: <HiOutlineGlobeAsiaAustralia />,
    gradient: 'from-indigo-600 to-violet-500',
    size: 'md:col-span-1'
  },
  {
    title: 'Zero-Trust Security',
    category: 'Privacy',
    description: 'Enkripsi data end-to-end dengan standar keamanan perbankan internasional.',
    icon: <HiOutlineLockClosed />,
    gradient: 'from-emerald-600 to-teal-500',
    size: 'md:col-span-1'
  },
  {
    title: 'AI-Powered Automation',
    category: 'Efficiency',
    description: 'Otomatisasi penjadwalan, absensi, hingga raport digital dengan teknologi AI terbaru.',
    icon: <HiOutlineSparkles />,
    gradient: 'from-orange-500 to-amber-400',
    size: 'md:col-span-2'
  },
];

export default function SolutionSection() {
  return (
    <section className="relative  ">
      
    

      <div className="container relative z-10 py-6 mx-auto">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-18">
          <h2 className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-full uppercase bg-indigo-50/50 dark:bg-indigo-950/30">
            The SoSchool Edge
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
            Digitalisasi Sekolah <br /> 
            {/* Menggunakan bg-linear-to-r & bg-size */}
            <span className="bg-linear-to-r from-slate-900 via-indigo-600 to-slate-900 dark:from-white dark:via-indigo-400 dark:to-white bg-size-[200%_auto] animate-gradient text-transparent bg-clip-text">
              Tanpa Kompromi.
            </span>
          </h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <div 
              key={index} 
              className={`
                group relative overflow-hidden rounded-[2.5rem] p-6
                bg-slate-50 dark:bg-[#111214] border border-slate-200 dark:border-slate-800
                hover:border-indigo-500/50 transition-all duration-700
                ${item.size}
              `}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {/* Menggunakan bg-linear-to-br */}
                    <div className={`p-4 rounded-2xl bg-linear-to-br ${item.gradient} text-white text-3xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-1">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 text-base md:text-lg max-w-lg">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold group/btn cursor-pointer">
                  <span>Explore Features</span>
                  <HiArrowSmallRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Decorative Number - Menggunakan opacity /2 (2%) */}
              <div className="absolute -bottom-10 -right-5 text-9xl font-black text-slate-200/20 dark:text-white/2 pointer-events-none select-none uppercase">
                <TbShieldCheckeredFilled />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}