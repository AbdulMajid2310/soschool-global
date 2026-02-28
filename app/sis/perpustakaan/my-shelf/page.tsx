"use client";

import React, { useState } from 'react';
import { 
  FiClock, FiBookOpen, FiRotateCcw, FiAlertCircle, 
  FiArrowLeft, FiMapPin, FiCalendar, FiXCircle, 
  FiLayers, FiCreditCard, FiCheckCircle, FiChevronRight
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

// --- TYPES (English) ---
interface BookBase {
  id: string;
  title: string;
  cover: string;
}

interface Booking extends BookBase {
  rackLocation: string;
  pickupDeadline: string;
}

interface Loan extends BookBase {
  borrowedDate: string;
  dueDate: string;
  daysRemaining: number;
  status: 'Aktif' | 'Terlambat';
  fineAmount: number;
}

const MyLibraryShelf = () => {
  const router = useRouter();

  // --- DATA (Indonesian Content) ---
  const [bookings, setBookings] = useState<Booking[]>([
    { 
      id: 'BK-771', 
      title: 'Next.js 14: Revolusi Fullstack', 
      rackLocation: 'A-12 (Lantai 2)', 
      pickupDeadline: '29 Jan 2026, 15:00', 
      cover: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400' 
    },
    { 
      id: 'BK-782', 
      title: 'UI Design Patterns: Panduan Modern', 
      rackLocation: 'C-04 (Lantai 1)', 
      pickupDeadline: '30 Jan 2026, 09:00', 
      cover: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400' 
    },
    { 
      id: 'BK-790', 
      title: 'Psikologi Uang: Wealth & Happiness', 
      rackLocation: 'B-02 (Lantai 2)', 
      pickupDeadline: '01 Feb 2026, 12:00', 
      cover: 'https://images.unsplash.com/photo-1592492159418-39f319320569?w=400' 
    }
  ]);

  const [loans] = useState<Loan[]>([
    { 
      id: 'LP-992', 
      title: 'Atomic Habits: Perubahan Kecil', 
      borrowedDate: '22 Jan 2026',
      dueDate: '05 Feb 2026', 
      daysRemaining: 7, 
      status: 'Aktif', 
      fineAmount: 0,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' 
    },
    { 
      id: 'LP-881', 
      title: 'Cyber Security: Dasar Pertahanan', 
      borrowedDate: '11 Jan 2026',
      dueDate: '25 Jan 2026', 
      daysRemaining: -3, 
      status: 'Terlambat', 
      fineAmount: 6000,
      cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' 
    },
    { 
      id: 'LP-772', 
      title: 'Clean Code: Manual Software Craft', 
      borrowedDate: '27 Jan 2026',
      dueDate: '10 Feb 2026', 
      daysRemaining: 12, 
      status: 'Aktif', 
      fineAmount: 0,
      cover: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400' 
    },
  ]);

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#090A0B] text-gray-300 p-6 lg:p-12">
      
      {/* --- BREADCRUMB & HEADER --- */}
      <div className="max-w-7xl mx-auto mb-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 hover:text-white transition-colors mb-6"
        >
          <FiArrowLeft /> Kembali ke Katalog
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Rak <span className="text-emerald-500">Saya</span></h1>
            <p className="text-sm text-gray-500 mt-2">Kelola peminjaman dan reservasi buku aktif Anda.</p>
          </div>
          
          <div className="flex gap-4">
             <QuickStat label="Peminjaman" value={loans.length} />
             <div className="w-px h-10 bg-gray-800 self-center" />
             <QuickStat label="Booking" value={bookings.length} />
             <div className="w-px h-10 bg-gray-800 self-center" />
             <QuickStat label="Total Denda" value={`Rp ${loans.reduce((acc, curr) => acc + curr.fineAmount, 0).toLocaleString()}`} color="text-red-500" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* --- RESERVASI (BOOKING) --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <FiClock className="text-amber-500" /> Antrean Booking
            </h2>
            <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 font-bold">{bookings.length} Buku</span>
          </div>

          <div className="space-y-4">
            {bookings.map(book => (
              <div key={book.id} className="bg-[#111315] border border-gray-800 rounded-3xl p-5 group hover:border-amber-500/30 transition-all">
                <div className="flex gap-4">
                  <img src={book.cover} className="w-16 h-24 object-cover rounded-xl" alt={book.title} />
                  <div className="flex-1">
                    <h3 className="text-xs font-black text-white uppercase leading-tight line-clamp-2">{book.title}</h3>
                    <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1 font-medium">
                      <FiMapPin size={10} className="text-amber-500"/> {book.rackLocation}
                    </p>
                    <div className="mt-3 text-[10px] font-mono text-amber-500/80">
                      Batas Ambil: <br/> {book.pickupDeadline}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => cancelBooking(book.id)}
                  className="w-full mt-4 py-2 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-red-500/10"
                >
                  <FiXCircle /> Batalkan Booking
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- PINJAMAN AKTIF (LOANS) --- */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
              <FiBookOpen className="text-emerald-500" /> Buku Sedang Dipinjam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loans.map(loan => (
              <div key={loan.id} className={`bg-[#111315] border rounded-[2.5rem] overflow-hidden transition-all ${loan.status === 'Terlambat' ? 'border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.05)]' : 'border-gray-800'}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${loan.status === 'Terlambat' ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                      {loan.status}
                    </span>
                    <span className="text-[10px] font-mono text-gray-700">{loan.id}</span>
                  </div>

                  <div className="flex gap-5 mb-6">
                    <img src={loan.cover} className="w-20 h-28 object-cover rounded-2xl shadow-2xl" alt={loan.title} />
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none mb-3">{loan.title}</h3>
                      <div className="space-y-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        <div className="flex items-center gap-2"><FiCalendar className="text-emerald-500"/> Pinjam: {loan.borrowedDate}</div>
                        <div className="flex items-center gap-2 text-white/80"><FiCheckCircle className="text-emerald-500"/> Kembali: {loan.dueDate}</div>
                      </div>
                    </div>
                  </div>

                  {loan.fineAmount > 0 && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between">
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                          <FiCreditCard /> Denda Terakumulasi
                       </span>
                       <span className="text-sm font-black text-white italic">Rp {loan.fineAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                    <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Sisa Durasi</p>
                      <p className={`text-xl font-black italic ${loan.daysRemaining < 0 ? 'text-red-500' : 'text-white'}`}>
                        {loan.daysRemaining < 0 ? `${Math.abs(loan.daysRemaining)} Hari Telat` : `${loan.daysRemaining} Hari Lagi`}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-emerald-500 hover:text-black rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest">
                      Perpanjang <FiRotateCcw size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- INFO PANEL --- */}
      <div className="max-w-7xl mx-auto mt-16 p-8 bg-[#111315] border border-gray-800 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 group">
         <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-all">
            <FiAlertCircle size={28} />
         </div>
         <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className="font-black text-white italic uppercase tracking-widest">Informasi Pengembalian</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Gunakan Drop-Box di depan perpustakaan untuk pengembalian mandiri 24/7. Pastikan Anda melakukan scan QR Code pada buku sebelum memasukkannya ke dalam box. Denda dihitung otomatis oleh sistem SoSchool Engine.
            </p>
         </div>
         <button className="px-8 py-4 bg-white/5 hover:bg-white hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
            Lihat Histori Lengkap
         </button>
      </div>

    </div>
  );
};

// --- HELPER COMPONENTS ---
const QuickStat = ({ label, value, color = "text-white" }: { label: string, value: string | number, color?: string }) => (
  <div className="text-center md:text-right">
    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xl font-black italic tracking-tighter leading-none ${color}`}>{value}</p>
  </div>
);

export default MyLibraryShelf;