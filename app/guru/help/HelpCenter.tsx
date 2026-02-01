"use client";

import React, { useState } from 'react';
import { 
  FiSearch, FiBook, FiMessageCircle, FiPhoneCall, 
  FiChevronRight, FiHelpCircle, FiSend, FiFileText 
} from 'react-icons/fi';

const HelpCenter = () => {
  const [search, setSearch] = useState('');

  const faqs = [
    { q: "Cara sinkronisasi nilai rapor?", a: "Buka menu Rapor, klik tombol 'Sinkronisasi' di pojok kanan atas..." },
    { q: "Lupa password akun SoSchool?", a: "Hubungi admin IT sekolah atau gunakan fitur 'Lupa Password' di login." },
    { q: "Cara upload video ke Media Studio?", a: "Masuk ke Media Studio, klik 'Upload Media' dan pilih file MP4." },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Search Hero Section */}
      <div className="relative p-12 rounded-[3.5rem] bg-linear-to-br from-cyan-600 to-blue-700 overflow-hidden shadow-2xl text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <FiHelpCircle size={300} className="absolute -left-20 -top-20 rotate-12" />
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Ada yang bisa kami <span className="text-cyan-200">Bantu?</span>
          </h2>
          <div className="max-w-xl mx-auto relative group">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 text-xl" />
            <input 
              type="text"
              placeholder="Cari solusi masalah Anda..."
              className="w-full p-5 pl-14 rounded-3xl bg-white/95 backdrop-blur-xl border-none outline-none text-sm font-bold shadow-2xl focus:ring-4 focus:ring-cyan-400/30 transition-all text-slate-800"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: FAQ & Support Categories */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SupportActionCard 
              icon={<FiBook />} 
              title="Panduan Penggunaan" 
              desc="Dokumentasi lengkap fitur SoSchool" 
              color="text-cyan-500" 
            />
            <SupportActionCard 
              icon={<FiPhoneCall />} 
              title="Hubungi Admin" 
              desc="Fast response via WhatsApp" 
              color="text-emerald-500" 
            />
          </div>

          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-cyan-900/20">
            <h3 className="text-sm font-black uppercase  tracking-widest text-slate-400 mb-6 italic">Pertanyaan Populer</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border-b border-slate-50 dark:border-cyan-900/10 last:border-0">
                  <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                    <span className="text-xs font-black uppercase italic tracking-tighter text-slate-700 dark:text-slate-200 group-hover:text-cyan-500 transition-colors">
                      {faq.q}
                    </span>
                    <FiChevronRight className="text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="pb-4 text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Ticket Submission */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-[#0a0f1d] p-8 rounded-[2.5rem] border border-slate-200 dark:border-cyan-900/20 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Kirim Tiket</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic mt-1">Bantuan Teknis Langsung</p>
            </div>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Subjek Masalah</label>
                <input type="text" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-cyan-950/20 border border-transparent focus:border-cyan-500 outline-none text-xs font-bold" placeholder="Misal: Error Upload Nilai" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Detail Pesan</label>
                <textarea className="w-full p-3 h-32 rounded-xl bg-slate-50 dark:bg-cyan-950/20 border border-transparent focus:border-cyan-500 outline-none text-xs font-bold resize-none" placeholder="Jelaskan kendala Anda..." />
              </div>
              <button className="w-full py-4 bg-cyan-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/20">
                <FiSend /> Kirim Laporan
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-cyan-900/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <FiMessageCircle size={20} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">Live Chat</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase italic">Online: 08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Card
const SupportActionCard = ({ icon, title, desc, color }: any) => (
  <button className="flex items-center gap-5 p-6 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-cyan-900/20 rounded-3xl hover:-translate-y-1 transition-all text-left group">
    <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-cyan-950/20 flex items-center justify-center text-2xl ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-black uppercase italic text-slate-900 dark:text-white">{title}</h4>
      <p className="text-[9px] font-medium text-slate-400 mt-1">{desc}</p>
    </div>
  </button>
);

export default HelpCenter;