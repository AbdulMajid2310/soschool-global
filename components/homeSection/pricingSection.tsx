"use client";

import { FaCheck, FaArrowRight, FaGraduationCap, FaChalkboard, FaUserShield, FaStore, FaStar } from "react-icons/fa6";

export default function PricingSection() {
  const coreFeatures = [
    "LMS & Ruang Kelas Digital",
    "Database Siswa & Guru",
    "Presensi & Jurnal Mengajar",
    "E-Raport Otomatis",
    "Notifikasi Orang Tua",
    "Keamanan Data AES-256"
  ];

  const premiumServices = [
    {
      title: "Marketplace Kursus",
      desc: "Materi tambahan bersertifikat.",
      icon: <FaGraduationCap />,
      tag: "Pay-per-use",
      theme: "text-blue-600 bg-blue-50"
    },
    {
      title: "Creator Tools",
      desc: "Studio konten digital guru.",
      icon: <FaChalkboard />,
      tag: "Premium",
      theme: "text-emerald-600 bg-emerald-50"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="">
        
        {/* Header - Tipografi Lebih Terkontrol */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-2 bg-blue-600"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Model Bisnis Transparan</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900 dark:text-white leading-[1.1] mb-4">
            Infrastruktur <span className="text-blue-600">Gratis,</span><br/>
            Eksplorasi Tanpa Batas.
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-xl">
            Kami mengeliminasi biaya sistem agar sekolah fokus pada kualitas pengajaran. Bayar hanya untuk konten akademik tambahan pilihan Anda.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Content: Core System (Gratis) */}
          <div className="lg:col-span-8 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <FaStore size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 text-emerald-600">
                <FaStar size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Always Free Core System</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase italic mb-8">
                Sistem Manajemen & LMS
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {coreFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                       <FaCheck size={8} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all active:scale-95 shadow-lg">
                  Mulai Gunakan Gratis
                </button>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Tanpa Kartu Kredit • Tanpa Kontrak
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar: Premium (Berbayar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden grow">
              <h4 className="text-lg font-black uppercase italic mb-6">Layanan Akademik</h4>
              
              <div className="space-y-4">
                {premiumServices.map((service, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all cursor-pointer group/item">
                    <div className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${service.theme}`}>
                        {service.icon}
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                           <h5 className="text-[11px] font-black uppercase tracking-tight">{service.title}</h5>
                           <span className="text-[7px] font-black bg-white/20 px-2 py-0.5 rounded-full">{service.tag}</span>
                        </div>
                        <p className="text-[10px] text-blue-100 font-medium leading-tight">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 flex items-center justify-between p-4 bg-white text-blue-600 rounded-xl font-black uppercase tracking-widest text-[9px] group/btn hover:shadow-lg transition-all">
                Cek Marketplace
                <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Support/Custom Box */}
            <div className="p-6 rounded-[2.5rem] bg-gray-900 dark:bg-gray-800 border border-gray-800 flex items-center justify-between group cursor-pointer hover:bg-gray-800 transition-all">
               <div className="space-y-0.5">
                  <h5 className="text-[10px] font-black text-white uppercase italic">Butuh Custom?</h5>
                  <p className="text-[9px] text-gray-400 font-medium uppercase">Konsultasi Tim Ahli</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 transition-all">
                  <FaArrowRight className="-rotate-45" size={12} />
               </div>
            </div>
          </div>

        </div>
        
        {/* Footer Note */}
        <div className="mt-12 text-center opacity-30">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-500">SoSchool Open Infrastructure • 2026</p>
        </div>

      </div>
    </section>
  );
}