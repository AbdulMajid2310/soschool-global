"use client";

import { 
  HiCheckCircle, 
  HiOutlineAcademicCap, 
  HiOutlineWindow, 
  HiOutlineChatBubbleLeftRight,
  HiArrowSmallRight 
} from "react-icons/hi2";

const lmsFeatures = [
  "Ujian Online & Bank Soal",
  "Tugas & Materi Digital",
  "Absensi Kehadiran Siswa",
  "Jadwal Pelajaran Otomatis",
  "Laporan Nilai & Raport",
  "Integrasi Pembayaran SPP"
];

export default function LMSSection() {
  return (
    <section className="py-24 bg-[#030712]">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-2 bg-blue-600"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
              Layanan Terpadu
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
            Infrastruktur <span className="text-blue-600">Gratis,</span> <br />
            Eksplorasi Tanpa Batas.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sisi Kiri: Sistem Manajemen & LMS */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 backdrop-blur-md relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <HiOutlineWindow className="text-blue-500 w-8 h-8" />
                Sistem Manajemen & LMS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {lmsFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group/item">
                    <HiCheckCircle className="text-blue-600 w-5 h-5 group-hover/item:scale-125 transition-transform" />
                    <span className="text-slate-400 group-hover/item:text-white transition-colors text-sm font-medium italic">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">
                  Mulai Gunakan Gratis
                </button>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">
                  * Syarat & Ketentuan Berlaku
                </span>
              </div>
            </div>
            
            {/* Dekorasi Ikon di Background */}
            <HiOutlineAcademicCap className="absolute -bottom-10 -right-10 w-64 h-64 text-white/2 -rotate-12 pointer-events-none" />
          </div>

          {/* Sisi Kanan: Layanan Akademik (Warna Biru yang Lebih Elegan) */}
          <div className="lg:col-span-5 bg-linear-to-br from-blue-700 to-indigo-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-500/10 flex flex-col justify-between group">
            <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight mb-8">
                Layanan Akademik
              </h3>
              
              <div className="space-y-4">
                {/* Card Kecil 1 */}
                <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer group/card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <HiOutlineChatBubbleLeftRight className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Konsultasi Sistem</h4>
                        <p className="text-white/60 text-[10px]">Tersedia 24/7 untuk bantuan teknis</p>
                      </div>
                    </div>
                    <HiArrowSmallRight className="group-hover/card:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Card Kecil 2 */}
                <div className="p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer group/card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <HiOutlineAcademicCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Pelatihan Guru</h4>
                        <p className="text-white/60 text-[10px]">Workshop sertifikasi digital</p>
                      </div>
                    </div>
                    <HiArrowSmallRight className="group-hover/card:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Pusat Bantuan
              </span>
              <button className="text-xs font-black uppercase underline underline-offset-8 hover:text-cyan-300 transition-colors">
                Hubungi Kami
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}