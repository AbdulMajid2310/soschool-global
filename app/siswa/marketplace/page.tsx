"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FiSearch, FiShoppingBag, FiZap, FiFilter, FiArrowRight, FiInbox, FiChevronRight } from 'react-icons/fi';

// --- DATA & TYPE INFERENCE ---
const PRODUCTS = [
    { id: 1, title: "Exclusive SoSchool Hoodie v4", price: 2500, category: "Merchandise", stock: 5, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 4, title: "CyberSec Pro Sticker Pack", price: 150, category: "Merchandise", stock: 100, img: "https://images.unsplash.com/photo-1572375927503-4a0050616954?w=400" },
    { id: 5, title: "Tumblr Stainless Stealth Black", price: 850, category: "Merchandise", stock: 15, img: "https://images.unsplash.com/photo-1589362483230-c71138216988?w=400" },
    { id: 2, title: "CompTIA+ Exam Voucher 2026", price: 5000, category: "Vouchers", stock: 2, img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400" },
    { id: 7, title: "AWS Cloud Practitioner Exam", price: 4200, category: "Vouchers", stock: 10, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400" },
    { id: 8, title: "Spotify Premium 3 Months", price: 600, category: "Vouchers", stock: 25, img: "https://images.unsplash.com/photo-1614680376593-902f74cc0d41?w=400" },
    { id: 3, title: "Advanced React Patterns & Next.js", price: 1200, category: "Courses", stock: 50, img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
    { id: 9, title: "Ethical Hacking: Zero to Mastery", price: 1800, category: "Courses", stock: 30, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400" },
    { id: 13, title: "Logitech MX Master 3S Clone", price: 3800, category: "Equipment", stock: 4, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" },
    { id: 14, title: "Portable SSD 512GB High Speed", price: 2900, category: "Equipment", stock: 7, img: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=400" },
    { id: 15, title: "Clean Code: A Handbook", price: 1100, category: "Books", stock: 12, img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400" },
    { id: 16, title: "The Pragmatic Programmer", price: 1300, category: "Books", stock: 8, img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
    { id: 17, title: "SaaS UI Kit - Figma Pro", price: 2200, category: "Digital", stock: 99, img: "https://images.unsplash.com/photo-1613909209435-24aa0b1550e5?w=400" },
    { id: 18, title: "Icon Pack: 2000+ Glassmorphism", price: 450, category: "Digital", stock: 150, img: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400" },
    { id: 12, title: "Monitor Light Bar Pro", price: 1500, category: "Setup", stock: 8, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { id: 11, title: "Ergonomic Desk Mat SoSchool", price: 700, category: "Setup", stock: 12, img: "https://images.unsplash.com/photo-1616412411311-5943a5aa9427?w=400" },
] as const;

const UNIQUE_CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));
const CATEGORIES = ["Semua", ...UNIQUE_CATEGORIES] as const;

type CategoryType = typeof CATEGORIES[number];

const MarketplacePage = () => {
    const [activeCat, setActiveCat] = useState<CategoryType>("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchCat = activeCat === "Semua" || p.category === activeCat;
            const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCat && matchSearch;
        });
    }, [activeCat, searchQuery]);

    return (
        <div className="min-h-screen transition-colors duration-300 font-sans relative overflow-hidden
            bg-slate-50 dark:bg-[#050811] text-slate-600 dark:text-slate-300 pt-30 pb-20 px-4 ">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                             <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white italic capitalize tracking-tight">
                                Store <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Inventory</span>
                             </h1>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold capitalize tracking-widest pl-4">Premium student rewards & merchandise</p>
                    </div>
                    
                    <div className="backdrop-blur-xl border p-3.5 flex items-center gap-6 rounded-3xl
                        bg-white dark:bg-white/3 border-slate-200 dark:border-white/5 shadow-xs dark:shadow-none">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Your Balance</span>
                            <div className="flex items-center gap-2">
                                <FiZap className="text-amber-500 fill-amber-500" size={16} />
                                <span className="text-2xl font-black text-slate-900 dark:text-white italic leading-none">3,240</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
                        <button className="p-3.5 bg-slate-100 dark:bg-white/5 rounded-2xl transition-all cursor-pointer group hover:bg-blue-600 hover:text-white text-slate-600 dark:text-white">
                            <FiShoppingBag size={18} />
                        </button>
                    </div>
                </div>

                {/* --- FILTER & SEARCH --- */}
                <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-200 dark:border-white/5 pb-6 mb-10">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCat(cat)}
                                className={`text-sm font-bold capitalize transition-all whitespace-nowrap cursor-pointer relative py-3 ${
                                    activeCat === cat 
                                    ? 'text-blue-600 dark:text-blue-500' 
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                            >
                                {cat}
                                {activeCat === cat && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative w-full md:w-72 flex items-center gap-3 md:ml-auto group border-slate-200 dark:border-white/10 border rounded-2xl py-2.5 px-4 bg-white/50 dark:bg-transparent focus-within:border-blue-500/50 transition-all">
                        <FiSearch className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search rewards..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent border-none text-sm font-medium outline-none 
                                text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700"
                        />
                    </div>
                </div>

                {/* --- GRID --- */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                            <div 
                                key={product.id} 
                                onClick={() => router.push('/siswa/marketplace/detail')} 
                                className="group border transition-all duration-500 cursor-pointer flex flex-col rounded-4xl p-3
                                    bg-white dark:bg-white/2 border-slate-200 dark:border-white/5 hover:border-blue-500/40 hover:shadow-xl dark:hover:shadow-blue-500/5"
                            >
                                <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-3 bg-slate-100 dark:bg-black/40">
                                    <img 
                                        src={product.img} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transition-all duration-700
                                            opacity-95 dark:opacity-50 grayscale-[0.1] dark:grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1.5 backdrop-blur-md rounded-xl border border-white/10 bg-black/30">
                                        <span className="text-[9px] font-bold text-white capitalize tracking-wide">{product.category}</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col px-1">
                                    <div className="min-h-11">
                                        <h3 className="text-sm font-bold capitalize tracking-tight leading-snug line-clamp-2 transition-colors
                                            text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                            {product.title}
                                        </h3>
                                    </div>
                                    
                                    <div className="flex justify-between items-center border-t border-slate-100 dark:border-white/5 mt-2  mb-2">
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 capitalize">Cost</p>
                                            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500 font-black italic">
                                                <FiZap size={13} className="fill-current" />
                                                <span className="text-base tracking-tight">{product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border capitalize
                                            ${product.stock < 10 ? 'border-rose-500/20 text-rose-500 bg-rose-500/5' : 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'}`}>
                                            Stock: {product.stock}
                                        </div>
                                    </div>

                                    <button className="w-full py-3.5 rounded-2xl text-[11px] font-bold capitalize tracking-wide transition-all flex items-center justify-center gap-2
                                        bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black">
                                        Redeem Item <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center space-y-5 bg-white dark:bg-white/1 rounded-4xl border border-dashed border-slate-200 dark:border-white/10">
                        <div className="size-16 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-300 dark:text-slate-800 border border-slate-100 dark:border-white/5">
                            <FiInbox size={32} />
                        </div>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 capitalize">No items found in this category</p>
                    </div>
                )}

                {/* --- FOOTER --- */}
                <div className="mt-24 p-8 md:p-10 rounded-4xl border transition-all relative overflow-hidden group
                    bg-blue-600/5 border-blue-500/10 hover:border-blue-500/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                             <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <FiFilter size={24} />
                             </div>
                             <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white capitalize">Have a special request?</h4>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Suggest new items or rewards for the SoSchool inventory</p>
                             </div>
                        </div>
                        <button className="w-full md:w-auto px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs capitalize tracking-wide hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all flex items-center justify-center gap-2">
                             Send Request <FiChevronRight />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketplacePage;