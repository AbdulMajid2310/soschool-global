"use client";

import React, { useState } from 'react';
import { 
  FiArrowLeft, FiClock, FiFileText, FiMapPin, FiCheckCircle, 
  FiAlertCircle, FiCalendar, FiChevronRight, FiSend, FiActivity 
} from 'react-icons/fi';

const RIWAYAT_IZIN = [
  { id: 1, tipe: 'Outpass', keperluan: 'Fotocopy Tugas', status: 'Disetujui', waktu: '10:15 - 11:00', tgl: '02 Feb' },
  { id: 2, tipe: 'Izin', keperluan: 'Sakit (Demam)', status: 'Menunggu', waktu: '01 Feb - 03 Feb', tgl: '01 Feb' },
];

export default function SoSchoolIzinOutpass() {
  const [activeTab, setActiveTab] = useState<'Izin' | 'Outpass'>('Izin');

  return (
    <div className="min-h-screen  text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 pb-20 transition-colors">
      
      {/* --- HEADER NAV --- */}
      <nav className="sticky top-0   backdrop-blur-2xl border-b border-slate-200/60 dark:border-white/5 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button className="group flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <FiArrowLeft size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic opacity-50">Dashboard</span>
          </button>
          <div className="px-5 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-indigo-500/20">
            E-Permit SoSchool
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-0.5 w-12 bg-indigo-600" />
               <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] italic">Pengajuan Baru</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase italic">
              Pusat <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400">{activeTab}.</span>
            </h1>
          </div>

          {/* Tab Switcher - Cleaned rounded-4xl */}
          <div className="flex p-2 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 w-fit shadow-sm">
            <button 
              onClick={() => setActiveTab('Izin')}
              className={`px-10 py-4 rounded-4xl text-[11px] font-black uppercase italic tracking-widest transition-all ${activeTab === 'Izin' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400'}`}
            >
              Izin Sekolah
            </button>
            <button 
              onClick={() => setActiveTab('Outpass')}
              className={`px-10 py-4 rounded-4xl text-[11px] font-black uppercase italic tracking-widest transition-all ${activeTab === 'Outpass' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'text-slate-400'}`}
            >
              Outpass Gerbang
            </button>
          </div>

          {/* Form Card - Cleaned bg-white/2 */}
          <div className="bg-white dark:bg-white/2 p-10 md:p-14 rounded-[4rem] border border-slate-200/60 dark:border-white/5 shadow-2xl shadow-indigo-500/5 space-y-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Kategori Keperluan</label>
              <div className="relative">
                <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-4xl px-8 py-5 text-sm font-bold italic appearance-none focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer">
                  {activeTab === 'Izin' ? (
                    <>
                      <option>Sakit (Perlu Konfirmasi Orang Tua)</option>
                      <option>Urusan Keluarga Penting</option>
                      <option>Lomba / Mewakili Sekolah</option>
                    </>
                  ) : (
                    <>
                      <option>Fotocopy / Beli Alat Tulis</option>
                      <option>Ambil Barang di Rumah (Emergency)</option>
                      <option>Ke ATM / Urusan Bank</option>
                    </>
                  )}
                </select>
                <FiChevronRight className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-indigo-600 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeTab === 'Izin' ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Tanggal Mulai</label>
                    <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-4xl px-8 py-5 text-sm font-bold italic focus:ring-2 focus:ring-indigo-600 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Tanggal Selesai</label>
                    <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-4xl px-8 py-5 text-sm font-bold italic focus:ring-2 focus:ring-indigo-600 transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Jam Keluar</label>
                    <div className="relative">
                      <input type="time" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-4xl px-8 py-5 text-sm font-bold italic focus:ring-2 focus:ring-indigo-600 transition-all" />
                      <FiClock className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-600 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Estimasi Kembali</label>
                    <div className="relative">
                      <input type="time" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-4xl px-8 py-5 text-sm font-bold italic focus:ring-2 focus:ring-indigo-600 transition-all" />
                      <FiClock className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-600 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Detail Alasan</label>
              <textarea 
                rows={3}
                placeholder="Berikan alasan yang jelas..."
                className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-[2.5rem] px-10 py-8 text-sm font-bold italic focus:ring-2 focus:ring-indigo-600 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>

            <button className="w-full py-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2.5rem] font-black uppercase italic text-xs tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl shadow-indigo-500/30 hover:scale-[1.01] active:scale-95 transition-all">
              <FiSend size={18} /> Ajukan {activeTab}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900 dark:bg-slate-100 rounded-[4rem] p-12 text-white dark:text-slate-900 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <FiActivity size={24} className="text-indigo-400 animate-pulse" />
                <div className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase italic tracking-widest">Live Permit</div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 italic">Siswa:</p>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Majid Dev<span className="text-indigo-500">.</span></h3>
              </div>
              <div className="p-6 bg-white/10 dark:bg-slate-100 rounded-4xl border border-white/10 dark:border-slate-200">
                <p className="text-[9px] font-black uppercase opacity-60 italic mb-2 tracking-widest">Status Saat Ini:</p>
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                   <p className="text-lg font-black italic uppercase leading-tight tracking-tight">Outpass Aktif s/d 11:00</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-white dark:bg-white/2 p-10 rounded-[3.5rem] border border-slate-200 dark:border-white/5 space-y-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none px-2">Riwayat</h3>
            <div className="space-y-4">
              {RIWAYAT_IZIN.map((item) => (
                <div key={item.id} className="p-7 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-transparent hover:border-indigo-500/20 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.status === 'Disetujui' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                      {item.status === 'Disetujui' ? <FiCheckCircle size={20} /> : <FiClock size={20} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-indigo-100 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 rounded-md italic">{item.tipe}</span>
                        <p className="text-sm font-black italic uppercase tracking-tight leading-none">{item.keperluan}</p>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase italic tracking-tighter">{item.tgl} • {item.waktu}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}