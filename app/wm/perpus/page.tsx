"use client";

import PaymentFeatures from '@/components/payment/paymentFeatures';
import React, { useState } from 'react';
import { 
  FiBook, FiClock, FiCheckCircle, FiAlertCircle, 
  FiBookmark, FiCalendar, FiDollarSign, FiInfo, FiHash, FiArrowRight,
  FiArrowUpRight
} from 'react-icons/fi';

// --- MOCK DATA ---
const LOAN_DATA = {
  active: [
    { 
      id: "B-992", 
      judul: "Fisika Modern: Teori Quantum", 
      tglPinjam: "15 Jan 2026", 
      deadline: "22 Jan 2026", 
      keterlambatan: 11,
      denda: 11000, 
      status: "Dipinjam" 
    }
  ],
  history: [
    { id: "B-501", judul: "Algoritma Pemrograman", tglPinjam: "10 Jan 2026", tglKembali: "17 Jan 2026", denda: 0, status: "Lunas" },
    { id: "B-223", judul: "Sejarah Dunia", tglPinjam: "02 Jan 2026", tglKembali: "11 Jan 2026", denda: 2000, status: "Lunas" },
  ]
};

export default function PinjamanBukuNoTable() {
    const [showPayment, setShowPayment]= useState(false)
    const [activeFine, setActiveFine] = useState({ id: '', amount: 0 });
  const totalDenda = LOAN_DATA.active.reduce((acc, curr) => acc + curr.denda, 0);

  // Trigger pas klik denda
const handleOpenPayment = (id: string, amount: number) => {
    setActiveFine({ id, amount });
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans antialiased selection:bg-indigo-500 transition-colors">
      
      <main className="max-w-5xl mx-auto space-y-10">
        
        {/* --- HEADER --- */}
       <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
  {/* SISI KIRI: JUDUL MODUL */}
  <div className="relative space-y-2">
    <div className="absolute -left-4 top-0 w-1 h-12 bg-indigo-600 rounded-full hidden md:block" />
    <h1 className="text-6xl md:text-7xl font-bold italic tracking-tighter uppercase leading-[0.85] dark:text-white">
      Log <br />
      <span className="text-indigo-600 bg-linear-to-r from-indigo-600 to-violet-500 bg-clip-text ">Pustaka.</span>
    </h1>
    <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-[0.4em] mt-3 flex items-center gap-2">
      <span className="w-8 h-px bg-slate-300 dark:bg-slate-800" />
      Monitoring Literasi Siswa
    </p>
  </div>

  {/* SISI KANAN: BENTO ACTION BOX (DENDA) */}
  <div className="group relative w-full lg:w-auto">
    {/* Efek Glow di belakang box denda */}
    <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-700" />
    
    <div className="relative flex flex-col  items-center gap-6 bg-white dark:bg-slate-950 p-2 pr-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none">
      
      {/* Info Nominal Denda */}
      <div className="flex items-center gap-5 bg-rose-500 text-white p-5 rounded-4xl w-full sm:w-auto shadow-lg shadow-rose-500/30">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform">
          <FiDollarSign size={28} />
        </div>
        <div className="pr-4">
          <p className="text-[9px] font-black uppercase opacity-80 leading-none tracking-widest mb-1.5 italic">Total Tagihan Denda</p>
          <p className="text-3xl font-bold italic tracking-tighter leading-none">
            Rp {totalDenda.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tombol Aksi */}
      <button 
        onClick={() => handleOpenPayment("B-992", 11000)}
        className="group/btn relative h-16 px-10 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black italic uppercase text-[11px] tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl overflow-hidden w-full sm:w-auto"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        <span className="relative flex items-center justify-center gap-3">
          Bayar Sekarang
          <div className="w-5 h-5 bg-white/10 dark:bg-black/10 rounded-lg flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
            <FiArrowUpRight size={14} />
          </div>
        </span>
      </button>

    </div>
  </div>
</header>

        {/* --- SECTION 1: PINJAMAN AKTIF --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4">
             <h3 className="text-sm font-black uppercase tracking-widest italic">Sedang Dipinjam</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {LOAN_DATA.active.map((book) => (
              <div key={book.id} className={`group bg-white dark:bg-white/2 border ${book.keterlambatan > 0 ? 'border-rose-500/30' : 'border-slate-200 dark:border-white/5'} rounded-4xl p-6 md:p-8 relative overflow-hidden transition-all shadow-sm`}>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex gap-6 items-start">
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl flex items-center justify-center shrink-0 ${book.keterlambatan > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-600'}`}>
                      <FiBook size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest italic">ID: {book.id}</p>
                      <h4 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter leading-tight">{book.judul}</h4>
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-[10px] font-bold text-slate-400 italic">Batas: <span className="text-rose-500">{book.deadline}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0">
                    <p className="text-[9px] font-black uppercase text-slate-400 italic">Denda Saat Ini</p>
                    <p className="text-2xl md:text-4xl font-black italic text-rose-500 tracking-tighter">Rp {book.denda.toLocaleString()}</p>
                  </div>
                </div>

                {book.keterlambatan > 0 && (
                  <div className="absolute top-0 right-10 bg-rose-500 text-white px-4 py-1.5 rounded-b-2xl text-[9px] font-black uppercase italic">
                    Terlambat {book.keterlambatan} Hari
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 2: RIWAYAT (CARD LIST) --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
             <h3 className="text-sm font-black uppercase tracking-widest italic text-slate-500">Arsip Pengembalian</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LOAN_DATA.history.map((item) => (
              <div key={item.id} className="bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-4xl p-6 flex flex-col justify-between group hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white">
                    <FiCheckCircle size={20} />
                  </div>
                  <span className="text-[10px] font-black italic opacity-40 uppercase">#{item.id}</span>
                </div>

                <div className="mb-8">
                  <h5 className="text-lg font-black italic uppercase tracking-tighter leading-tight mb-2">{item.judul}</h5>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase italic opacity-60">
                    <span>{item.tglPinjam}</span>
                    <FiArrowRight size={12} />
                    <span>{item.tglKembali}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 pt-4 group-hover:border-white/10">
                   <span className="text-[9px] font-black uppercase italic">Denda Terbayar</span>
                   <span className="font-black italic">
                     {item.denda > 0 ? `Rp ${item.denda.toLocaleString()}` : 'Rp 0'}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- INFO POLIS --- */}
        <footer className="bg-indigo-600 rounded-4xl p-8 text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              <FiInfo size={40} className="opacity-50 shrink-0" />
              <p className="text-xs md:text-sm font-black italic uppercase leading-relaxed tracking-wide text-center md:text-left">
                Pastikan mengembalikan buku tepat waktu untuk menghindari denda harian. 
                Denda yang tercatat harus segera dilunasi untuk aktivasi peminjaman berikutnya.
              </p>
           </div>
           <FiBook className="absolute -right-10 -bottom-10 text-[200px] opacity-10 rotate-12" />
        </footer>
{/* KOMPONEN POP-UP DENGAN PROPS */}
      <PaymentFeatures 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        totalTagihan={activeFine.amount}
        idTagihan={activeFine.id}
        onSuccess={(trxId) => {
          alert(`Mantap Jid! Pembayaran sukses. Ref: ${trxId}`);
          // Di sini lu bisa re-fetch data perpus lu biar dendanya ilang
        }}
      />
      </main>
    </div>
  );
}