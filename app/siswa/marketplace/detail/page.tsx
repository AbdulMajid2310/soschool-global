"use client";

import React, { useState } from 'react';
import {
    FiArrowLeft, FiZap, FiShield, FiPackage,
    FiInfo, FiShare2, FiChevronRight, FiCheckCircle
} from 'react-icons/fi';
import Link from 'next/link';

const ProductDetailPage = () => {
    const [selectedSize, setSelectedSize] = useState('L');

    // Data Produk Kompleks
    const product = {
        id: 1,
        title: "Exclusive SoSchool Cyber Hoodie v1.0",
        category: "MERCHANDISE",
        price: 2500,
        stock: 5,
        description: `Hoodie edisi terbatas khusus untuk top-achiever SoSchool. Didesain dengan material premium heavy cotton 330gsm yang nyaman untuk sesi coding marathon maupun kegiatan outdoor sekolah. 

    Menampilkan bordir high-definition logo SoSchool Cyber Community di bagian dada dan aksen reflektif pada bagian lengan untuk keamanan saat malam hari. Setiap pembelian mendapatkan tag autentikasi digital unik yang terdaftar di database prestasi siswa.`,
        specs: [
            { label: "Material", value: "Premium Heavy Cotton" },
            { label: "Weight", value: "330 GSM" },
            { label: "Printing", value: "High-Density Embroidery" },
            { label: "Edition", value: "Limited 2026 Batch" }
        ],
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
        ]
    };

    return (
        <div className="min-h-screen bg-[#050811] text-slate-300 pt-8 pb-20 px-4 md:px-12 font-sans relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 left-1/4 w-250 h-150 bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-4">
                    <Link href="/siswa/marketplace" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Store
                    </Link>
                    <button className="p-3 bg-white/2 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-400">
                        <FiShare2 size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* LEFT: IMAGE GALLERY */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                        <div className="relative h-100  aspect-square rounded-[40px] overflow-hidden border border-white/5 bg-white/2 group">
                            <img
                                src={product.images[0]}
                                className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                alt="product"
                            />
                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest italic">{product.category}</span>
                            </div>
                        </div>

                        {/* Thumbnail Placeholder */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/2 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden opacity-40 hover:opacity-100">
                                    <img src={product.images[0]} className="w-full h-full object-cover" alt="thumb" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: PRODUCT INFO */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1 h-1 rounded-full bg-blue-500" />)}
                                </div>
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Authentic School Gear</span>
                            </div>
                            <h1 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                                {product.title}
                            </h1>
                        </div>

                        {/* Price & Stock */}
                        <div className="flex items-center justify-between p-6 bg-white/2 rounded-3xl border border-white/5 border-l-blue-500 border-l-2">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">Redeem Cost</p>
                                <div className="flex items-center gap-2">
                                    <FiZap className="text-amber-500 fill-amber-500" size={20} />
                                    <span className="text-3xl font-black text-white italic tracking-tighter">{product.price.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-slate-500 uppercase mt-2">XP</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">Sisa Stok</p>
                                <p className="text-2xl font-black text-blue-500 italic">{product.stock}</p>
                            </div>
                        </div>



                        {/* Select Size (Jika Merchandise) */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                                <FiPackage className="text-blue-500" /> Pilih Ukuran
                            </h3>
                            <div className="flex gap-3">
                                {['M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`size-12 rounded-xl border font-black text-[10px] transition-all cursor-pointer ${selectedSize === size
                                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                                : 'border-white/5 bg-white/2 text-slate-600 hover:border-white/20'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 space-y-4">
                            <button className="w-full py-5 bg-white text-black rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 cursor-pointer">
                                Konfirmasi Redeem
                            </button>

                            <div className="flex items-center gap-4 px-2">
                                <div className="flex items-center gap-2 text-[8px] font-black text-emerald-500 uppercase italic">
                                    <FiShield /> 100% Authentic Gear
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-800" />
                                <div className="flex items-center gap-2 text-[8px] font-black text-slate-600 uppercase italic">
                                    <FiCheckCircle /> Free Pickup at OSIS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-4 mt-10">
                    <h3 className="text-md font-black text-white uppercase italic tracking-widest flex items-center gap-2">
                        <FiInfo className="text-blue-500" /> Detail Barang
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 font-medium text-justify  italic tracking-tight">
                        {product.description}
                    </p>
                </div>
                {/* BOTTOM SPECS GRID */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-4xl overflow-hidden">
                    {product.specs.map((spec, i) => (
                        <div key={i} className="bg-[#050811] p-8 space-y-2 hover:bg-white/2 transition-colors">
                            <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em] italic">{spec.label}</p>
                            <p className="text-[11px] font-black text-white uppercase italic tracking-widest">{spec.value}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;