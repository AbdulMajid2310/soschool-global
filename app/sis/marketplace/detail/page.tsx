"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    FiArrowLeft, FiZap, FiShield, FiPackage,
    FiInfo, FiShare2, FiChevronRight, FiCheckCircle,
    FiChevronLeft
} from 'react-icons/fi';

// --- TS INTERFACES ---
interface ProductImage {
    id: string;
    url: string;
    alt?: string;
}

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductDetail {
    id: number;
    title: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    specs: ProductSpec[];
    images: ProductImage[];
}

const ProductDetailPage: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<string>('L');
    const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
    const router = useRouter()

    const product: ProductDetail = {
        id: 1,
        title: "Exclusive SoSchool Cyber Hoodie v1.0",
        category: "Merchandise",
        price: 2500,
        stock: 5,
        description: `Hoodie edisi terbatas khusus untuk top-achiever SoSchool. Didesain dengan material premium heavy cotton 330gsm yang nyaman untuk sesi coding marathon. Menampilkan bordir high-definition logo SoSchool di dada dan aksen reflektif.`,
        specs: [
            { label: "Material", value: "Premium Heavy Cotton" },
            { label: "Weight", value: "330 GSM" },
            { label: "Printing", value: "High-Density Embroidery" },
            { label: "Edition", value: "Limited 2026 Batch" }
        ],
        images: [
            { id: "img-1", url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800", alt: "Front View" },
            { id: "img-2", url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", alt: "Back View" },
            { id: "img-3", url: "https://images.unsplash.com/photo-1512446816042-442d61036730?w=800", alt: "Detail View" },
        ]
    };

    const nextImg = () => setActiveImgIndex((prev) => (prev + 1) % product.images.length);
    const prevImg = () => setActiveImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

    return (
        <div className="min-h-screen transition-colors duration-300 font-sans relative overflow-hidden
            bg-slate-50 dark:bg-[#050811] text-slate-600 dark:text-slate-300 pt-30 pb-20 px-4 md:px-12">

            {/* --- NAVIGATION --- */}
            <div className="flex justify-between items-center mb-10">
                {/* Pakai komponen yang baru dibuat atau inline style ini */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-4 text-xs font-black tracking-widest text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-all cursor-pointer"
                >
                    <div className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all">
                        <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                        <span className="text-sm opacity-50 uppercase tracking-[0.3em]">Kembali</span>
                    </div>
                </button>

                <button className="p-4 rounded-2xl border transition-all cursor-pointer  bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 hover:text-blue-600 dark:hover:text-white">
                    <FiShare2 size={18} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* --- LEFT: GALLERY --- */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Rounded v4: rounded-4xl untuk 32px */}
                        <div className="relative aspect-square rounded-4xl overflow-hidden border bg-white dark:bg-white/2 border-slate-200 dark:border-white/10 group">
                            {product.images.map((img, idx) => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    alt={img.alt}
                                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${idx === activeImgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                                        }`}
                                />
                            ))}

                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={prevImg} className="p-4 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-slate-900 dark:text-white shadow-lg cursor-pointer hover:bg-blue-600 transition-all">
                                    <FiChevronLeft size={24} />
                                </button>
                                <button onClick={nextImg} className="p-4 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md text-slate-900 dark:text-white shadow-lg cursor-pointer hover:bg-blue-600 transition-all">
                                    <FiChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                            {product.images.map((img, i) => (
                                <button
                                    key={img.id}
                                    onClick={() => setActiveImgIndex(i)}
                                    className={`relative min-w-25 h-24 rounded-2xl border-2 overflow-hidden transition-all cursor-pointer ${activeImgIndex === i ? 'border-blue-600 scale-95' : 'border-transparent opacity-60'
                                        }`}
                                >
                                    <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: INFO --- */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] px-3 py-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                                {product.category}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white italic capitalize tracking-tighter">
                                {product.title}
                            </h1>
                        </div>

                        {/* Rounded v4: rounded-4xl */}
                        <div className="p-8 rounded-4xl border transition-all
                            bg-white dark:bg-linear-to-br dark:from-white/5 dark:to-transparent border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Redemption Cost</p>
                                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-black italic">
                                        <FiZap size={24} className="fill-current" />
                                        <span className="text-4xl tracking-tighter">{product.price.toLocaleString()}</span>
                                        <span className="text-xs not-italic text-slate-400">XP</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stock</p>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white italic">{product.stock}</p>
                                </div>
                            </div>
                        </div>

                        {/* Size Picker */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2">
                                <FiPackage className="text-blue-600" /> Select Size
                            </h3>
                            <div className="flex gap-3">
                                {['M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`size-14 rounded-2xl border-2 font-black text-sm transition-all cursor-pointer ${selectedSize === size
                                                ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-black scale-110 shadow-lg'
                                                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-400 hover:border-blue-600'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA: rounded-3xl untuk 24px */}
                        <div className="pt-4 space-y-6">
                            <button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 group">
                                Confirm Redemption <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-200 dark:border-white/10">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white capitalize italic flex items-center gap-2">
                            <FiInfo className="text-blue-600" /> Description
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                            {product.description}
                        </p>
                    </div>
                    {/* rounded-3xl */}
                    <div className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-white/10 rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm">
                        {product.specs.map((spec, i) => (
                            <div key={i} className="bg-white dark:bg-[#0b0f1a] p-6 space-y-1">
                                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{spec.label}</p>
                                <p className="text-xs font-bold text-slate-900 dark:text-white capitalize">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;