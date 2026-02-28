"use client";

import React, { useState, useEffect } from "react";
import { 
  FiX, FiChevronLeft, FiChevronRight, FiMaximize2, 
  FiHeart, FiDownload, FiLayers, FiCheckCircle, FiAward, FiCamera
} from "react-icons/fi";

// Data dengan kategori yang lebih spesifik
const galleryData = [
  { id: 1, type: "Projects", title: "SoSchool Dashboard", img: "https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?auto=format&fit=crop&q=80&w=1200", icon: <FiLayers /> },
  { id: 2, type: "Activities", title: "Tech Workshop 2026", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200", icon: <FiCamera /> },
  { id: 3, type: "Certificates", title: "Next.js Advanced", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200", icon: <FiAward /> },
  { id: 4, type: "Projects", title: "AI Chat System", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200", icon: <FiLayers /> },
  { id: 5, type: "Activities", title: "School Hackathon", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200", icon: <FiCamera /> },
];

export default function EnhancedGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = ["All", "Projects", "Activities", "Certificates"];
  
  // Filter data berdasarkan kategori
  const filteredGallery = activeTab === "All" 
    ? galleryData 
    : galleryData.filter(item => item.type === activeTab);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleNext = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
  const handlePrev = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null));

  return (
    <div className="space-y-8">
      {/* --- CATEGORY SELECTOR --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#0a1229] p-4 rounded-3xl border border-slate-200 dark:border-white/5">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl w-full md:w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat 
                ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm dark:shadow-blue-600/20" 
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 italic px-4">
          <FiCheckCircle className="text-emerald-500" /> {filteredGallery.length} Items Loaded
        </div>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGallery.map((item, index) => (
          <div 
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative bg-white dark:bg-[#0a1229] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/5 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Wrap */}
            <div className="aspect-4/5 overflow-hidden relative">
              <img 
                src={item.img} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={item.title} 
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Floating Category Icon */}
              <div className="absolute top-5 left-5 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white transform -rotate-12 group-hover:rotate-0 transition-all duration-500">
                {item.icon}
              </div>
            </div>

            {/* Title & Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2 block">
                {item.type}
              </span>
              <h3 className="text-xl font-black italic uppercase text-white leading-none tracking-tighter">
                {item.title}
              </h3>
              <div className="flex items-center gap-4 mt-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                 <div className="h-px flex-1 bg-white/20" />
                 <FiMaximize2 className="text-white hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FLOATING DETAIL OVERLAY --- */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Controls */}
          <button className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all z-60 cursor-pointer border border-white/10">
            <FiX size={24} />
          </button>

          <button onClick={(e) => {e.stopPropagation(); handlePrev();}} className="absolute left-6 p-5 bg-white/5 hover:bg-blue-600 text-white rounded-3xl transition-all z-60 cursor-pointer border border-white/10 group">
            <FiChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button onClick={(e) => {e.stopPropagation(); handleNext();}} className="absolute right-6 p-5 bg-white/5 hover:bg-blue-600 text-white rounded-3xl transition-all z-60 cursor-pointer border border-white/10 group">
            <FiChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Modal Content */}
          <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row gap-8 items-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 relative group">
              <img 
                src={filteredGallery[selectedIndex].img} 
                className="max-h-[75vh] w-full object-contain rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500"
                alt=""
              />
            </div>

            <div className="w-full md:w-md space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 italic block mb-2">
                  Featured {filteredGallery[selectedIndex].type}
                </span>
                <h3 className="text-3xl font-black italic uppercase text-white leading-[0.9] tracking-tighter">
                  {filteredGallery[selectedIndex].title}
                </h3>
                <p className="mt-6 text-sm text-slate-400 font-medium max-h-50 overflow-y-auto scrollbar-hide leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium eos voluptas repellat excepturi pariatur! Iusto delectus tenetur distinctio nemo odit sapiente modi sint incidunt pariatur aspernatur commodi odio veniam accusamus tempora est quos rem veritatis, dolore facere. Maxime accusamus, tempore quo, perspiciatis maiores suscipit nam a, tenetur eius dignissimos eos?
                </p>
                <div className="flex gap-3 mt-8">
                  <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <FiDownload size={16} /> Save
                  </button>
                  <button className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all">
                    <FiHeart size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}