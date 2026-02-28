"use client";

import React, { useState } from 'react';
import {
    FiArrowLeft, FiSearch, FiClock, FiCheckCircle,
    FiXCircle, FiCalendar, FiFilter, FiDownload,
    FiMessageSquare, FiX, FiUser, FiMapPin, FiActivity,
    FiFileText, FiPieChart
} from 'react-icons/fi';

// --- DATA MASTER (10 RANDOM) ---
const DATA_PERIZINAN = [
    { id: 'RQ-99012', tipe: 'Outpass', judul: 'Fotocopy Modul Sosiologi', desc: 'Perlu fotocopy materi bab 4 karena besok ada ulangan harian.', tgl: '02 Feb 2026', jam: '10:15 - 11:00', status: 'DISETUJUI', oleh: 'Drs. Budi Santoso', lokasi: 'Gerbang Utama' },
    { id: 'RQ-99011', tipe: 'Izin', judul: 'Sakit (Demam Tinggi)', desc: 'Badan menggigil sejak pagi, sudah istirahat di UKS.', tgl: '01 Feb 2026', jam: '3 Hari', status: 'MENUNGGU', oleh: '-', lokasi: '-' },
    { id: 'RQ-99010', tipe: 'Outpass', judul: 'Ambil Uang di ATM', desc: 'Mengambil uang kiriman orang tua untuk membayar praktikum.', tgl: '30 Jan 2026', jam: '09:00 - 09:45', status: 'DISETUJUI', oleh: 'Siti Aminah, S.Pd', lokasi: 'Gerbang Samping' },
    { id: 'RQ-99009', tipe: 'Izin', judul: 'Urusan Keluarga', desc: 'Menghadiri acara pernikahan kakak kandung.', tgl: '28 Jan 2026', jam: '1 Hari', status: 'DISETUJUI', oleh: 'Drs. Budi Santoso', lokasi: 'Izin Keluar' },
    { id: 'RQ-99008', tipe: 'Outpass', judul: 'Beli ATK Kelompok', desc: 'Membeli karton dan double tape untuk tugas prakarya.', tgl: '25 Jan 2026', jam: '13:00 - 13:30', status: 'DITOLAK', oleh: 'Guru Piket (Pak Ahmad)', lokasi: 'Gerbang Utama' },
    { id: 'RQ-99007', tipe: 'Izin', judul: 'Lomba Robotik', desc: 'Mewakili sekolah dalam kompetisi Robotik tingkat provinsi.', tgl: '20 Jan 2026', jam: '2 Hari', status: 'DISETUJUI', oleh: 'Kepala Sekolah', lokasi: 'Dinas Luar' },
    { id: 'RQ-99006', tipe: 'Outpass', judul: 'Ambil Barang Tertinggal', desc: 'Mengambil bekal makanan dan atribut upacara yang tertinggal.', tgl: '18 Jan 2026', jam: '07:15 - 07:45', status: 'DISETUJUI', oleh: 'Drs. Budi Santoso', lokasi: 'Gerbang Utama' },
    { id: 'RQ-99005', tipe: 'Izin', judul: 'Check-up Dokter', desc: 'Kontrol rutin ke dokter spesialis setelah operasi amandel.', tgl: '15 Jan 2026', jam: '12:00 - Selesai', status: 'DISETUJUI', oleh: 'Drs. Budi Santoso', lokasi: 'Izin Keluar' },
    { id: 'RQ-99004', tipe: 'Outpass', judul: 'Beli Makan Siang', desc: 'Keluar sebentar mencari makan siang karena kantin tutup.', tgl: '12 Jan 2026', jam: '12:00 - 13:00', status: 'DITOLAK', oleh: 'Guru Piket (Bu Dewi)', lokasi: '-' },
    { id: 'RQ-99003', tipe: 'Izin', judul: 'Kematian Kerabat', desc: 'Izin pulang lebih awal karena ada kabar duka kakek meninggal.', tgl: '10 Jan 2026', jam: 'Setengah Hari', status: 'DISETUJUI', oleh: 'Kepala Sekolah', lokasi: 'Izin Keluar' }
];

export default function SoSchoolRiwayatPerizinan() {
    const [filterStatus, setFilterStatus] = useState('SEMUA');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState<typeof DATA_PERIZINAN[0] | null>(null);

    // --- LOGIKA STATISTIK ---
    const stats = {
        total: DATA_PERIZINAN.length,
        disetujui: DATA_PERIZINAN.filter(d => d.status === 'DISETUJUI').length,
        menunggu: DATA_PERIZINAN.filter(d => d.status === 'MENUNGGU').length,
        ditolak: DATA_PERIZINAN.filter(d => d.status === 'DITOLAK').length,
    };

    const dataTerfilter = DATA_PERIZINAN.filter(item => {
        const matchesStatus = filterStatus === 'SEMUA' || item.status === filterStatus;
        const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen  text-slate-900 dark:text-slate-100 antialiased pb-20 selection:bg-indigo-500 selection:text-white transition-colors">

            {/* --- NAVIGASI --- */}
            <nav className="sticky top-0 z-40  backdrop-blur-3xl border-b border-slate-200/60 dark:border-white/5 px-8 py-5">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button className="w-11 h-11 flex items-center justify-center bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                            <FiArrowLeft size={20} />
                        </button>
                        <div className="hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 italic">SOSCHOOL v4</p>
                            <h1 className="text-sm font-black uppercase tracking-widest italic leading-none mt-1">Sistem Arsip</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari data..."
                                className="bg-slate-100 dark:bg-white/5 border-none rounded-2xl px-12 py-3 text-[11px] font-bold italic w-40 md:w-64 focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                            />
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-8 pt-12">

                {/* --- STATS BENTO GRID --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

                    {/* TOTAL STATS */}
                    <div className="group relative bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 p-7 rounded-[2.5rem] overflow-hidden transition-all hover:border-indigo-500/30">
                        <div className="absolute -right-4 -bottom-4 text-slate-100 dark:text-white/5 group-hover:text-indigo-500/10 transition-colors">
                            <FiFileText size={100} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl">
                                <FiFileText size={20} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black italic tracking-tighter leading-none">{stats.total}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mt-1">Total Pengajuan</p>
                            </div>
                        </div>
                    </div>

                    {/* APPROVED STATS */}
                    <div className="group relative bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-500/20 p-7 rounded-[2.5rem] overflow-hidden transition-all hover:bg-emerald-500 hover:border-emerald-500 group">
                        <div className="absolute -right-4 -bottom-4 text-emerald-500/10 group-hover:text-white/20 transition-colors">
                            <FiCheckCircle size={100} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-emerald-500 text-emerald-500 dark:text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-emerald-500 transition-colors">
                                <FiCheckCircle size={20} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black italic tracking-tighter leading-none group-hover:text-white transition-colors">{stats.disetujui}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/70 group-hover:text-white/80 italic mt-1 transition-colors">Disetujui</p>
                            </div>
                        </div>
                    </div>

                    {/* PENDING STATS */}
                    <div className="group relative bg-amber-50 dark:bg-amber-500/5 border border-amber-500/20 p-7 rounded-[2.5rem] overflow-hidden transition-all hover:bg-amber-500 hover:border-amber-500">
                        <div className="absolute -right-4 -bottom-4 text-amber-500/10 group-hover:text-white/20 transition-colors">
                            <FiClock size={100} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-amber-500 text-amber-500 dark:text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-amber-500 transition-colors">
                                <FiClock size={20} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black italic tracking-tighter leading-none group-hover:text-white transition-colors">{stats.menunggu}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600/70 group-hover:text-white/80 italic mt-1 transition-colors">Menunggu</p>
                            </div>
                        </div>
                    </div>

                    {/* REJECTED STATS */}
                    <div className="group relative bg-red-50 dark:bg-red-500/5 border border-red-500/20 p-7 rounded-[2.5rem] overflow-hidden transition-all hover:bg-red-500 hover:border-red-500">
                        <div className="absolute -right-4 -bottom-4 text-red-500/10 group-hover:text-white/20 transition-colors">
                            <FiXCircle size={100} />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-red-500 text-red-500 dark:text-white flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-red-500 transition-colors">
                                <FiXCircle size={20} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black italic tracking-tighter leading-none group-hover:text-white transition-colors">{stats.ditolak}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600/70 group-hover:text-white/80 italic mt-1 transition-colors">Ditolak</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- FILTER TAB --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                    <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
                        Riwayat <span className="text-indigo-600 underline decoration-indigo-200 dark:decoration-indigo-900">Perizinan.</span>
                    </h2>

                    <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-4xl border border-slate-200 dark:border-white/5 overflow-x-auto no-scrollbar shadow-inner">
                        {['SEMUA', 'MENUNGGU', 'DISETUJUI', 'DITOLAK'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-6 py-3 rounded-4xl text-[9px] font-black uppercase italic tracking-widest transition-all whitespace-nowrap ${filterStatus === status ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xl' : 'text-slate-400'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- LIST CARDS --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {dataTerfilter.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative bg-white dark:bg-white/2 border border-slate-200 dark:border-white/5 rounded-3xl p-6 transition-all hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer flex flex-col  md:items-center justify-between gap-6"
                        >
                            <div className="flex flex-col items-center gap-6">
                                
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-indigo-600 text-white rounded-md italic">{item.tipe}</span>
                                        <p className="text-[10px] font-bold text-slate-400 italic">{item.id}</p>
                                    </div>
                                    <h3 className="text-lg line-clamp-2 font-black italic uppercase tracking-tighter group-hover:text-indigo-600 transition-colors leading-tight">{item.judul}</h3>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0">
                                <div className="text-left md:text-right">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Tanggal</p>
                                    <p className="text-xs font-black italic">{item.tgl}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase italic ${item.status === 'DISETUJUI' ? 'bg-emerald-500 text-white' :
                                        item.status === 'MENUNGGU' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    {item.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- DETAIL OVERLAY (MELAYANG INSET-0) --- */}
            {selectedItem && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8 transition-all animate-in fade-in duration-300">
                    <div className="absolute inset-0  backdrop-blur-xl" onClick={() => setSelectedItem(null)} />

                    <div className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0c] rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[90vh]">

                        {/* Header Overlay */}
                        <div className="p-8 md:p-10 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-linear-to-b from-slate-50 dark:from-white/2 to-transparent shrink-0">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shadow-lg ${selectedItem.status === 'DISETUJUI' ? 'bg-emerald-500 text-white' :
                                        selectedItem.status === 'MENUNGGU' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                    }`}>
                                    <FiActivity size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-slate-400 italic tracking-[0.2em]">Data Pengajuan</h4>
                                    <p className="font-black italic uppercase text-2xl tracking-tighter">{selectedItem.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedItem(null)} className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-sm border border-slate-200 dark:border-white/10">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="p-8 md:p-10 space-y-10 overflow-y-auto scrollbar-hide">
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="px-4 py-1 bg-indigo-600 text-[10px] font-black text-white rounded-full italic uppercase tracking-widest">{selectedItem.tipe}</span>
                                    <span className={`px-4 py-1 border rounded-full text-[10px] font-black uppercase italic ${selectedItem.status === 'DISETUJUI' ? 'text-emerald-500 border-emerald-500/20' :
                                            selectedItem.status === 'MENUNGGU' ? 'text-amber-500 border-amber-500/20' : 'text-red-500 border-red-500/20'
                                        }`}>• {selectedItem.status}</span>
                                </div>
                                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter leading-[0.9]">
                                    {selectedItem.judul}
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-6 bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Pelaksanaan</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 font-black italic uppercase text-sm"><FiCalendar className="text-indigo-600" /> {selectedItem.tgl}</div>
                                            <div className="flex items-center gap-2 font-black italic uppercase text-sm"><FiClock className="text-indigo-600" /> {selectedItem.jam}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 text-right">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Titik Lokasi</p>
                                        <div className="flex items-center justify-end gap-2 font-black italic uppercase text-sm">
                                            <FiMapPin className="text-indigo-600" /> {selectedItem.lokasi}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Deskripsi Alasan:</p>
                                <p className="text-xl font-bold italic text-slate-600 dark:text-slate-300 leading-relaxed bg-indigo-50 dark:bg-indigo-500/5 p-6 rounded-3xl border-l-4 border-indigo-600">
                                    "{selectedItem.desc}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10">
                                <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-500"><FiUser size={20} /></div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none mb-1">Disetujui Oleh</p>
                                    <p className="text-md font-black italic uppercase">{selectedItem.oleh}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Overlay */}
                        <div className="p-8 border-t border-slate-100 dark:border-white/5 shrink-0">
                            <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-4xl font-black uppercase italic text-xs tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                <FiDownload size={18} /> Unduh Digital Pass
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}