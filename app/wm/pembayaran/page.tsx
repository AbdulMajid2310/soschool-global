"use client";

import React from 'react';
import {
    FiCreditCard, FiDownload, FiChevronRight, FiCopy,
    FiPieChart, FiCheck, FiArrowRight, FiActivity,
    FiShield, FiClock, FiGrid, FiArrowUpRight, FiLayers
} from 'react-icons/fi';

// --- DATA SOURCE: FINANCE ECOSYSTEM ---
const FINANCE_SUMMARY = {
    totalDue: 1600000,
    paidThisMonth: 1250000,
    nextDue: "10 Feb",
    safetyScore: "98/100"
};

const BILLING_LIST = [
    {
        id: 'INV/2026/02/01',
        title: 'SPP Februari 2026',
        category: 'Biaya Pokok',
        amount: 1250000,
        status: 'pending',
        due: '10 Feb',
        va: '8801 0812 3456 7890',
        tags: ['Wajib', 'Bulanan']
    },
    {
        id: 'INV/2026/02/02',
        title: 'Kit Robotik V2',
        category: 'Ekskul Tools',
        amount: 350000,
        status: 'unpaid',
        due: '15 Feb',
        va: '8801 0812 0000 1234',
        tags: ['Aktivitas', 'Non-Reguler']
    }
];

export default function SoSchoolModernBilling() {
    return (
        <div className="min-h-screen  pb-32 font-sans selection:bg-indigo-100">

            {/* 1. ULTRA-MODERN HEADER */}
            <div className="max-w-105 mx-auto lg:px-6  space-y-8">
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                            <FiLayers size={20} />
                        </div>
                        <div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Finance Hub</h2>
                            <p className="text-sm font-black dark:text-white uppercase italic tracking-tighter">SoSchool Ecosystem</p>
                        </div>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
                        <FiGrid size={18} />
                    </button>
                </header>

                {/* 2. MAIN WALLET CARD (GLASS EFFECT) */}
                <section className="relative group perspective-2000 max-w-4xl mx-auto">
                    {/* 1. EFEK CAHAYA AMBIENT */}
                    <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 via-purple-600 to-blue-500 rounded-[4.5rem] blur-3xl opacity-0 group-hover:opacity-15 transition-all duration-1000" />

                    {/* 2. KARTU UTAMA: Deep Space Glass */}
                    <div className="relative bg-slate-950 dark:bg-[#020406] rounded-2xl lg:rounded-[4rem] lg:p-12 p-6 text-white overflow-hidden border border-white/10 shadow-2xl">

                        {/* Dekorasi Cahaya Interior */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/30 transition-all duration-700" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

                        <div className="relative z-10 space-y-6">

                            {/* HEADER: INFO SALDO & STATUS */}
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                        </span>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300 italic">Sistem Keuangan Aktif</p>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-[11px] font-bold text-white/30 uppercase italic tracking-[0.2em] ml-1">Total Tagihan Anda</p>
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-6xl font-bold italic tracking-tighter uppercase leading-none drop-shadow-2xl">
                                                Rp 1.6<span className="text-indigo-500">jt</span>
                                            </h3>
                                            <div className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                                <p className="text-[9px] font-black text-indigo-400 uppercase italic leading-none">Februari</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* LOGO PERISAI */}
                                <div className="relative group/shield">
                                    <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover/shield:opacity-50 transition-opacity" />
                                    <div className="relative w-24 h-24 bg-linear-to-br from-white/10 to-transparent rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl backdrop-blur-3xl transition-all duration-700 group-hover:rotate-12">
                                        <FiShield size={42} className="text-white drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
                                    </div>
                                </div>
                            </div>

                            {/* RINGKASAN BENTO */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Progress Capaian - Menggunakan bg-white/3 & hover:bg-white/6 */}
                                <div className="group/item relative p-8 bg-white/3 rounded-[3rem] border border-white/5 transition-all hover:bg-white/6 overflow-hidden">
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 italic">Sudah Terbayar</p>
                                            <FiCheck className="text-emerald-500" />
                                        </div>
                                        <h4 className="text-3xl  font-bold italic leading-none">78<span className="text-sm opacity-40 ml-1">%</span></h4>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-linear-to-r from-indigo-600 to-emerald-500 w-[78%] rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                {/* Sisa Waktu */}
                                <div className="group/item relative p-8 bg-white/3 rounded-[3rem] border border-white/5 transition-all hover:bg-white/6 overflow-hidden">
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 italic">Batas Waktu</p>
                                            <FiClock className="text-rose-500 animate-pulse" />
                                        </div>
                                        <h4 className="text-3xl font-bold italic leading-none text-rose-500 uppercase">07<span className="text-sm opacity-40 lowercase text-white ml-1"> hari</span></h4>
                                        <p className="text-[8px] font-bold text-white uppercase italic tracking-widest">Jatuh Tempo: 10 Feb</p>
                                    </div>
                                </div>
                            </div>

                            {/* TOMBOL AKSI UTAMA */}
                            <div className="relative pt-2">
                                {/* Glow di belakang tombol - Menggunakan blur-2xl */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-full bg-indigo-600/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <button className="group/btn relative w-full h-24 bg-slate-200 text-black rounded-[2.5rem] transition-all duration-300 active:scale-95 shadow-2xl flex items-center justify-between px-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                                    <div className="flex items-center gap-6 relative z-10">
                                        {/* Rotate-360 yang lebih ringkas */}
                                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white transition-transform group-hover/btn:rotate-360 duration-1000">
                                            <FiArrowUpRight size={28} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] font-semibold  uppercase tracking-[0.2em]  italic leading-none mb-1.5">Aksi Diperlukan</p>
                                            <h5 className="text-2xl font-bold uppercase italic tracking-tighter leading-none">Bayar Sekarang</h5>
                                        </div>
                                    </div>

                                    <div className="hidden sm:block relative z-10 text-right">
                                        <FiCreditCard size={32} className="opacity-10 group-hover/btn:opacity-100 transition-all duration-500 group-hover/btn:scale-110" />
                                    </div>
                                </button>
                            </div>

                        </div>

                        {/* ELEMEN DEKORATIF AKHIR */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />


                        {/* POLA GRID HALUS */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none"
                        />
                    </div>
                </section>

                {/* 3. DYNAMIC BILLING LIST */}
                <section className="space-y-4 pt-4">
                    <div className="flex justify-between items-end px-2">
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic leading-none mb-1">Daftar Invoice</h4>
                            <p className="text-xl font-black italic dark:text-white uppercase tracking-tighter">Tagihan Aktif</p>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 italic underline cursor-pointer">Lihat Semua</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {BILLING_LIST.map((bill) => (
                            <div key={bill.id} className="relative group">
                                {/* Status Indicator Bar */}
                                <div className={`absolute -left-1 top-10 bottom-10 w-2 rounded-full z-10 ${bill.status === 'unpaid' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]'}`} />

                                <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-slate-100 dark:border-white/10 shadow-sm transition-all group-hover:shadow-xl group-hover:scale-[1.01]">

                                    {/* Bill Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-1">
                                            <div className="flex gap-2 mb-2">
                                                {bill.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-[7px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold italic dark:text-white uppercase tracking-tighter leading-none">{bill.title}</h3>
                                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">{bill.id}</p>
                                        </div>
                                        <div className={`p-3 rounded-2xl ${bill.status === 'unpaid' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-500'}`}>
                                            <FiClock size={20} />
                                        </div>
                                    </div>

                                    {/* VA & Amount Glass Box */}
                                    <div className="relative p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-4 overflow-hidden">
                                        <div className="flex justify-between items-center relative z-10">
                                            <div>
                                                <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1 tracking-widest leading-none">Nominal Tagihan</p>
                                                <p className="text-2xl font-bold italic text-indigo-600 tracking-tighter uppercase">Rp {bill.amount.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1 tracking-widest leading-none">Virtual Account</p>
                                                <div className="flex items-center gap-2 group/copy cursor-pointer">
                                                    <span className="text-xs font-black dark:text-white tracking-widest">{bill.va}</span>
                                                    <FiCopy className="text-indigo-600 group-hover/copy:scale-110 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between mt-8">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <FiCheck size={14} />
                                            </div>
                                            <span className="text-[9px] font-black uppercase italic tracking-widest text-slate-400">Sistem Terverifikasi</span>
                                        </div>
                                        <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase italic tracking-widest shadow-xl active:scale-95 transition-all">
                                            Bayar <FiArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. HISTORY PREVIEW SECTION */}
                <section className="space-y-4 pt-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic px-2">Aktivitas Terakhir</h4>
                    <div className="bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden">
                        {[
                            { title: 'SPP Januari 2026', date: '05 Jan', status: 'Sukses', price: '1.250k' },
                            { title: 'Biaya Daftar Ulang', date: '20 Des', status: 'Sukses', price: '500k' }
                        ].map((hist, i) => (
                            <div key={i} className={`p-6 flex items-center justify-between ${i === 0 ? 'border-b border-slate-50 dark:border-white/5' : ''}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><FiCheck /></div>
                                    <div>
                                        <p className="text-[11px] font-black dark:text-white uppercase italic leading-none">{hist.title}</p>
                                        <p className="text-[8px] font-bold text-slate-400 uppercase italic mt-1 tracking-widest">{hist.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black dark:text-white italic">Rp {hist.price}</p>
                                    <FiArrowUpRight className="ml-auto text-slate-300 mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. DOWNLOAD CTA */}
                <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-[3.5rem] p-10 text-white relative overflow-hidden text-center group">
                    <div className="relative z-10 space-y-4">
                        <h4 className="text-2xl font-bold italic uppercase tracking-tighter leading-[0.85]">Download <br /> Rekap Tahunan.</h4>
                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest leading-relaxed px-4">Laporan rincian biaya pendidikan anak Anda format PDF.</p>
                        <button className="w-full py-5 bg-white text-black rounded-3xl font-bold text-[10px] uppercase italic tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all">
                            Dapatkan File <FiDownload />
                        </button>
                    </div>
                    <FiPieChart className="absolute -left-10 -bottom-10 w-48 h-48 opacity-10 -rotate-12 group-hover:rotate-0 transition-all duration-700" />
                </div>
            </div>

            {/* BRANDING FOOTER */}
            <div className="mt-16 text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-white/10 italic">Secure Payment by SoSchool Finance</p>
            </div>

        </div>
    );
}