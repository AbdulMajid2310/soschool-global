"use client";

import React from 'react';
import { 
  FiBook, FiDownload, FiExternalLink, FiPlus, 
  FiSearch, FiGrid, FiList, FiBookmark, FiStar 
} from 'react-icons/fi';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  type: 'PDF' | 'EPUB' | 'Link';
  downloads: number;
  coverColor: string;
}

export const LIBRARY_BOOKS: Book[] = [
  { id: '1', title: 'Clean Code: A Handbook of Agile Software', author: 'Robert C. Martin', category: 'Informatika', type: 'PDF', downloads: 142, coverColor: 'bg-amber-600' },
  { id: '2', title: 'Struktur Data & Algoritma v2', author: 'Tim Kurikulum SoSchool', category: 'Modul Ajar', type: 'PDF', downloads: 850, coverColor: 'bg-indigo-600' },
  { id: '3', title: 'Jurnal Inovasi Pendidikan AI', author: 'Prof. Satria', category: 'Riset', type: 'Link', downloads: 45, coverColor: 'bg-emerald-600' },
  { id: '4', title: 'Kumpulan Soal Olimpiade Komputer', author: 'Majid Developer', category: 'Referensi', type: 'EPUB', downloads: 312, coverColor: 'bg-rose-600' },
];

const DigitalLibrary = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
      
      {/* Search & Categories Bar */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between">
        <div className="relative w-full xl:w-96 group">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Cari judul buku atau penulis..." 
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#0a0f1d] rounded-2xl border border-slate-200 dark:border-amber-900/20 text-xs font-bold outline-none focus:border-amber-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full xl:w-auto">
          {['Semua', 'Informatika', 'Modul Ajar', 'Riset', 'Sastra'].map((cat) => (
            <button key={cat} className="whitespace-now-nowrap px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest italic bg-white dark:bg-amber-950/10 border border-slate-100 dark:border-amber-900/20 text-slate-500 hover:text-amber-500 hover:border-amber-500 transition-all">
              {cat}
            </button>
          ))}
          <button className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20"><FiPlus /></button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {LIBRARY_BOOKS.map((book) => (
          <div key={book.id} className="group relative flex flex-col">
            {/* Book Cover Visual */}
            <div className={`aspect-3/4 rounded-4xl ${book.coverColor} p-8 flex flex-col justify-end relative overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-4`}>
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <FiBook size={200} className="absolute -right-10 -top-10 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <span className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-lg text-[8px] font-black text-white uppercase tracking-widest">
                  {book.type}
                </span>
                <h4 className="mt-4 text-lg font-black italic uppercase leading-tight tracking-tighter text-white">
                  {book.title}
                </h4>
                <p className="mt-2 text-[9px] font-bold text-white/60 uppercase tracking-widest italic">{book.author}</p>
              </div>

              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="w-12 h-12 bg-white text-amber-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform">
                  <FiDownload size={20} />
                </button>
                <button className="w-12 h-12 bg-white text-slate-800 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform">
                  <FiBookmark size={20} />
                </button>
              </div>
            </div>

            {/* Book Info Underneath */}
            <div className="mt-6 px-2 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{book.category}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">{book.downloads} Unduhan</p>
              </div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => <FiStar key={i} size={10} fill="currentColor" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalLibrary;