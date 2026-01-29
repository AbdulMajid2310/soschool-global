"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiSearch, FiShoppingBag, FiZap, FiFilter, FiArrowRight, FiInbox } from 'react-icons/fi';

const CATEGORIES = ["SEMUA", "MERCHANDISE", "COURSES", "VOUCHERS"];

const PRODUCTS = [
  { id: 1, title: "Exclusive SoSchool Hoodie", price: 2500, category: "MERCHANDISE", stock: 5, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
  { id: 2, title: "CompTIA+ Exam Voucher", price: 5000, category: "VOUCHERS", stock: 2, img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400" },
  { id: 3, title: "Advanced React Patterns", price: 1200, category: "COURSES", stock: 50, img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
  { id: 4, title: "CyberSec Pro Sticker Pack", price: 150, category: "MERCHANDISE", stock: 100, img: "https://images.unsplash.com/photo-1572375927503-4a0050616954?w=400" },
];

const MarketplacePage = () => {
  const [activeCat, setActiveCat] = useState("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter()

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = activeCat === "SEMUA" || p.category === activeCat;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#050811] text-slate-300 pt-12 pb-20 px-4 md:px-12 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER & BALANCE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">School Store</h1>
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Tukarkan XP Prestasi Anda</p>
          </div>
          
          <div className="bg-white/3 backdrop-blur-md border border-white/5 rounded-3xl p-4 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Saldo XP Anda</span>
              <div className="flex items-center gap-2">
                <FiZap className="text-amber-500 fill-amber-500" size={14} />
                <span className="text-xl font-black text-white italic leading-none">3,240</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/5" />
            <button className="p-3 bg-white/5 rounded-2xl text-white hover:bg-blue-600 transition-all cursor-pointer group">
              <FiShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* SEARCH & CATEGORY */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center border-b border-white/5 pb-8">
          <div className="flex gap-8 overflow-x-auto no-scrollbar w-full md:w-auto scroll-smooth">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer relative py-2 ${
                  activeCat === cat ? 'text-blue-500' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                {cat}
                {activeCat === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 md:ml-auto group">
            <FiSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="CARI ITEM..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none pl-7 text-[10px] font-black text-white outline-none placeholder:text-slate-800 uppercase tracking-widest"
            />
          </div>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} onClick={()=> router.push('/siswa/marketplace/detail')} className="group bg-white/2 border border-white/5 rounded-4xl p-4 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/3">
                {/* Image Container */}
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 bg-black/40">
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/5">
                     <span className="text-[8px] font-black text-white uppercase italic tracking-widest">{product.category}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4 px-1">
                  <div className="h-10">
                    <h3 className="text-[11px] font-black text-white uppercase italic tracking-tight leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <div className="space-y-1">
                      <p className="text-[8px] font-bold text-slate-600 uppercase italic">Cost</p>
                      <div className="flex items-center gap-1.5 text-amber-500 font-black italic">
                        <FiZap size={12} className="fill-amber-500" />
                        <span className="text-sm tracking-tighter">{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-bold text-slate-700 uppercase italic">Stock: {product.stock}</p>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-white group-hover:text-black transition-all flex items-center justify-center gap-2 italic cursor-pointer">
                    Redeem Now <FiArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="size-16 bg-white/2 rounded-3xl flex items-center justify-center text-slate-800 border border-white/5">
              <FiInbox size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase italic tracking-widest">Barang tidak ditemukan</p>
              <p className="text-[9px] text-slate-600 font-bold uppercase mt-1">Coba gunakan kata kunci atau kategori lain</p>
            </div>
          </div>
        )}

        {/* FOOTER INFO */}
        <div className="mt-20 p-8 bg-blue-600/5 rounded-4xl border border-blue-500/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-blue-600/10 transition-colors">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/20">
               <FiFilter size={20} />
             </div>
             <div>
               <p className="text-[11px] font-black text-white uppercase italic tracking-widest">Special Request?</p>
               <p className="text-[9px] font-bold text-slate-600 uppercase mt-1">Saran item baru untuk inventory OSIS SoSchool</p>
             </div>
          </div>
          <button className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all cursor-pointer italic">
             Kirim Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default MarketplacePage;