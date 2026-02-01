"use client";

import { FaChalkboardTeacher, FaShieldAlt } from "react-icons/fa";
import { FaBrain, FaChartBar, FaCloud, FaUsers, FaArrowRight } from "react-icons/fa6";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
  image: string;
}

const features: Feature[] = [
  {
    icon: <FaChalkboardTeacher size={18} />,
    title: "Infrastruktur Virtual",
    description: "Ruang kelas digital dengan sinkronisasi data instan untuk pengalaman belajar tanpa hambatan.",
    details: ["Latensi Rendah", "Sinkronisasi Papan Tulis"],
    color: "from-blue-600 to-cyan-500",
    image: "https://images.unsplash.com/photo-1588072432904-843af37f03ed?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <FaBrain size={18} />,
    title: "Otomatisasi Cerdas",
    description: "Efisiensi administrasi dengan penilaian otomatis dan pengarsipan berbasis kecerdasan buatan.",
    details: ["Penilaian AI", "Arsip Cerdas"],
    color: "from-indigo-600 to-purple-600",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <FaChartBar size={18} />,
    title: "Analitik Data Besar",
    description: "Visualisasi performa akademik dan operasional sekolah secara menyeluruh dan mendalam.",
    details: ["Ringkasan Eksekutif", "Ekspor Data"],
    color: "from-emerald-600 to-teal-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <FaUsers size={18} />,
    title: "Hub Terpusat",
    description: "Koordinasi antar guru, siswa, dan orang tua dalam satu platform tanpa birokrasi rumit.",
    details: ["Komunikasi Terpadu", "Akses SSO"],
    color: "from-orange-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <FaShieldAlt size={18} />,
    title: "Keamanan Standar Militer",
    description: "Proteksi data sensitif sekolah dengan enkripsi tingkat tinggi dan protokol keamanan global.",
    details: ["Enkripsi AES-256", "Kepatuhan ISO"],
    color: "from-slate-800 to-slate-900",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <FaCloud size={18} />,
    title: "Cloud Skalabel",
    description: "Arsitektur cloud yang siap menangani lonjakan trafik saat ujian nasional berlangsung.",
    details: ["Skala Otomatis", "Uptime 99.9%"],
    color: "from-blue-700 to-indigo-900",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header - Tipografi yang lebih tegas */}
       <div className="max-w-2xl mb-16 space-y-4">
  {/* Sub-heading dengan aksen dinamis */}
  <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-blue-600/5 dark:bg-blue-400/5 border border-blue-600/10 dark:border-blue-400/10">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
    </span>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
      Inti Infrastruktur SoSchool
    </span>
  </div>

  {/* Judul Utama dengan gaya High-End */}
  <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.85] text-slate-900 dark:text-white">
    Pusat <br />
    <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
      Kendali Digital
    </span>
  </h2>

  
</div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:border-blue-500/30 flex flex-col shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Image Header */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Syntax v4: bg-linear-to-br */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-40 mix-blend-multiply transition-opacity group-hover:opacity-20`} />
                
                {/* Icon Badge */}
                <div className="absolute top-5 left-5">
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 flex flex-col grow">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 tracking-tight uppercase italic leading-tight group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium leading-relaxed">
                  {feature.description}
                </p>

                {/* Details - Compact Tagging */}
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  {feature.details.map((detail, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                <button className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-gray-900 dark:bg-gray-800 text-white font-black uppercase tracking-widest text-[10px] group/btn hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25">
                  Dokumentasi Fitur
                  <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Accent Line v4 syntax */}
              <div className={`absolute bottom-0 left-0 h-1.5 bg-linear-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-700`} />
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}