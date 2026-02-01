"use client";

import { FaServer, FaUsers, FaSchool, FaBolt } from "react-icons/fa6";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const stats = [
  {
    id: 1,
    label: "Partner Sekolah",
    value: "250+",
    desc: "Migrasi Digital",
    icon: <FaSchool size={20} />,
    color: "from-blue-600 to-indigo-600",
    shadow: "shadow-blue-500/10"
  },
  {
    id: 2,
    label: "Siswa Aktif",
    value: "85K+",
    desc: "User Terintegrasi",
    icon: <FaUsers size={20} />,
    color: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-500/10"
  },
  {
    id: 3,
    label: "Infrastructure",
    value: "99.9%",
    desc: "Uptime Server",
    icon: <FaServer size={20} />,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10"
  },
  {
    id: 4,
    label: "Efisiensi",
    value: "60%",
    desc: "Pangkas Beban TU",
    icon: <FaBolt size={20} />,
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/10"
  }
];

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Background Pattern - v4 compatible */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header Stats */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Sistem Optimal
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic leading-none">
                Performa <span className="text-blue-600">Real-Time</span>
            </h2>
        </div>

        {/* Stats Grid - Responsive behavior fixed */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className={`group relative p-6 md:p-10 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-xl ${stat.shadow}`}
            >
              {/* Icon Floating - Resized for mobile */}
              <div className={`absolute -top-4 left-6 md:left-10 p-3 md:p-4 rounded-xl md:rounded-2xl bg-linear-to-br ${stat.color} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {stat.icon}
              </div>

              <div className="mt-4 space-y-1">
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-blue-600/80">
                  {stat.label}
                </div>
                {/* Responsive text size for the big numbers */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white italic leading-none">
                  {stat.value}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">
                  {stat.desc}
                </p>
              </div>

              {/* Minimalist Progress Bar */}
              <div className="mt-6 h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full bg-linear-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-1000 ease-out`} />
              </div>
            </div>
          ))}
        </div>

        {/* Integration Note - Responsive Layout fix */}
        <div className="mt-16 p-6 md:p-10 rounded-[2.5rem] bg-gray-900 dark:bg-blue-600 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20 shrink-0">
                    <IoShieldCheckmarkSharp size={24} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight">Keamanan Data Layer-7</h4>
                    <p className="text-blue-100/60 text-[10px] md:text-xs font-medium max-w-sm">Proteksi enkripsi AES-256 untuk seluruh basis data sekolah dan aset digital.</p>
                </div>
            </div>
            
            <button className="w-full lg:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all active:scale-95 shadow-xl relative z-10">
                Dokumentasi Keamanan
            </button>
        </div>

      </div>
    </section>
  );
}