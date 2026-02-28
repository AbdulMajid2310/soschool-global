"use client";

import React from 'react';
import {
    FiPlus, FiFileText, FiVideo, FiLink, FiMoreVertical,
    FiDownload, FiTrash2, FiEdit3, FiEye, FiLayers, FiSearch
} from 'react-icons/fi';

// Kita tambahkan data materi yang lebih variatif
const MATERIALS_DATA = [
    {
        id: '1',
        title: 'Pengenalan DOM & Manipulasi Elemen',
        type: 'PDF',
        size: '2.4 MB',
        uploadedAt: '12 Feb 2026',
        downloads: 28,
        isLocked: false
    },
    {
        id: '2',
        title: 'Tutorial Setup Project Next.js 15',
        type: 'Video',
        size: '15:20',
        uploadedAt: '14 Feb 2026',
        downloads: 45,
        isLocked: false
    },
    {
        id: '3',
        title: 'Dokumentasi Tailwind CSS v4',
        type: 'Link',
        size: 'External',
        uploadedAt: '15 Feb 2026',
        downloads: 12,
        isLocked: true
    },
];

export default function MaterialsManagement() {
    return (
        <section className="animate-in p-8 fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[3rem] overflow-hidden">

                {/* HEADER MANAJEMEN */}
                <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 dark:text-white">
                                <FiLayers className="text-indigo-600" /> Manajemen Materi
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                                Total {MATERIALS_DATA.length} File Terunggah
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="CARI MATERI..."
                                    className="pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-[10px] font-black tracking-widest focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                                <FiPlus strokeWidth={3} /> Upload
                            </button>
                        </div>
                    </div>
                </div>

                {/* LIST MATERI */}
                <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {MATERIALS_DATA.map((item) => (
                        <div
                            key={item.id}
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:px-10 hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-all duration-300"
                        >
                            <div className="flex items-center gap-5 flex-1">
                                {/* File Icon Berdasarkan Tipe */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${getFileStyle(item.type)}`}>
                                    {item.type === 'PDF' && <FiFileText size={24} />}
                                    {item.type === 'Video' && <FiVideo size={24} />}
                                    {item.type === 'Link' && <FiLink size={24} />}
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-base font-black italic uppercase text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h4>
                                        {item.isLocked && (
                                            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 text-[8px] font-black uppercase rounded">Locked</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
                                        <span className="flex items-center gap-1"><FiDownload size={10} /> {item.downloads} Unduhan</span>
                                        <span>•</span>
                                        <span>{item.size}</span>
                                        <span>•</span>
                                        <span>Diunggah {item.uploadedAt}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS (Visible on Hover in Desktop) */}
                            <div className="flex items-center gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button title="Lihat" className="p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                                    <FiEye size={18} />
                                </button>
                                <button title="Edit" className="p-3 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-all">
                                    <FiEdit3 size={18} />
                                </button>
                                <button title="Hapus" className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                                    <FiTrash2 size={18} />
                                </button>
                                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden md:block" />
                                <button className="p-3 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all">
                                    <FiDownload size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FOOTER / PAGINATION */}
                <div className="p-6 bg-slate-50/50 dark:bg-slate-800/30 text-center">
                    <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors italic">
                        Lihat Semua Arsip Materi
                    </button>
                </div>
            </div>
        </section>
    );
}

// Helper untuk styling icon berdasarkan tipe file
function getFileStyle(type: string) {
    switch (type) {
        case 'PDF':
            return 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 border border-rose-100 dark:border-rose-500/20';
        case 'Video':
            return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border border-indigo-100 dark:border-indigo-500/20';
        case 'Link':
            return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 border border-emerald-100 dark:border-emerald-500/20';
        default:
            return 'bg-slate-50 text-slate-500';
    }
}