"use client";

import React, { useState, memo } from 'react';
import { 
  FiShoppingBag, FiCheckCircle, FiXCircle, FiTruck, 
  FiFileText, FiStar, FiPackage, FiMoreVertical,
  FiSearch, FiFilter, FiExternalLink, FiArchive,
  FiGrid, FiList, FiAlertCircle
} from 'react-icons/fi';

// --- MOCK VENDOR & PRODUCT DATA ---
const PENDING_VENDORS = [
  {
    id: 'VND-771',
    name: 'Erlangga Global Press',
    category: 'Books & Digital Media',
    type: 'Official Publisher',
    location: 'Jakarta, ID',
    documents: 'Verified',
    products: [
      { name: 'Buku Matematika Kurikulum Merdeka SMP', price: 85000 },
      { name: 'Sains Eksperimental SD - Vol 1', price: 120000 }
    ],
    rating: 4.9,
    status: 'Pending'
  },
  {
    id: 'VND-652',
    name: 'Garmen Jaya Abadi',
    category: 'Uniform & Apparel',
    type: 'Manufacturer',
    location: 'Bandung, ID',
    documents: 'In Review',
    products: [
      { name: 'Seragam Batik Nasional (Custom)', price: 145000 },
      { name: 'Almamater Premium SoSchool Edition', price: 210000 }
    ],
    rating: 4.5,
    status: 'Flagged'
  }
];

const VendorMarketplaceApproval = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <FiShoppingBag className="text-emerald-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Marketplace <span className="text-emerald-500">Inventory Control</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Global Vendor Curation & Product Governance</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-[10px] font-black uppercase italic hover:bg-white/10 transition-all">
            Manage Categories
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20">
            Export Vendor List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* VENDOR QUEUE (3 COLS) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari vendor, produk, atau kategori..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 transition-all text-xs font-medium uppercase italic"
              />
            </div>
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1">
                <button className="p-3 bg-white/10 rounded-xl text-emerald-500"><FiGrid /></button>
                <button className="p-3 text-slate-500"><FiList /></button>
            </div>
          </div>

          <div className="space-y-6">
            {PENDING_VENDORS.map((vendor) => (
              <div key={vendor.id} className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
                
                <div className="p-8 flex flex-col lg:flex-row gap-8">
                  
                  {/* VENDOR LOGO/ICON */}
                  <div className="w-24 h-24 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center border border-white/5 shrink-0">
                    <FiPackage className="text-3xl text-emerald-500" />
                  </div>

                  {/* VENDOR INFO */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[9px] font-black text-emerald-500 uppercase italic px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20">{vendor.id}</span>
                        <h3 className="text-xl font-black text-white uppercase italic leading-none">{vendor.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                            <FiStar size={10} fill="currentColor" />
                            <span className="text-[10px] font-black">{vendor.rating}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase italic"><FiArchive /> {vendor.category}</span>
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase italic"><FiTruck /> {vendor.location}</span>
                        <span className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase italic"><FiFileText /> Legal Docs: {vendor.documents}</span>
                    </div>

                    {/* PRODUCT PREVIEW */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vendor.products.map((prod, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/5 p-3 rounded-2xl flex justify-between items-center">
                                <span className="text-[10px] font-medium text-slate-300 uppercase italic truncate pr-4">{prod.name}</span>
                                <span className="text-[10px] font-black text-white italic whitespace-nowrap">Rp {prod.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                  </div>

                  {/* ACTION PANEL */}
                  <div className="lg:w-64 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20">
                        <FiCheckCircle /> Approve Vendor
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 text-slate-400 rounded-2xl text-[10px] font-black uppercase italic transition-all border border-white/5 group-hover:border-white/10">
                        <FiXCircle /> Reject Access
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 hover:text-white uppercase italic transition-all py-2">
                        <FiExternalLink /> Review Full Catalog
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: INSIGHTS & FILTERS (1 COL) */}
        <div className="space-y-8">
          
          {/* MARKETPLACE SNAPSHOT */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
             <h3 className="text-[10px] font-black uppercase italic text-slate-500 tracking-[0.2em] mb-6">Marketplace Snapshot</h3>
             <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-2xl font-black text-white italic">84</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase italic mt-1">Active Vendors</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-black text-emerald-500 italic">2.4k+</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase italic mt-1">SKU Listed</p>
                    </div>
                </div>
                <div className="h-px bg-white/5 w-full" />
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase italic mb-1">Total Revenue Share</p>
                    <p className="text-xl font-black text-white italic">Rp 428.5M</p>
                </div>
             </div>
          </div>

          {/* POLICY ADVISORY */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-4xl p-8">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <FiAlertCircle className="text-xl" />
              <h4 className="text-[10px] font-black uppercase italic tracking-widest">Verification Protocol</h4>
            </div>
            <ul className="space-y-3">
                <li className="text-[9px] text-slate-400 font-medium italic leading-relaxed uppercase">• Cek NIB & NPWP Vendor</li>
                <li className="text-[9px] text-slate-400 font-medium italic leading-relaxed uppercase">• Pastikan Buku memiliki ISBN resmi</li>
                <li className="text-[9px] text-slate-400 font-medium italic leading-relaxed uppercase">• Verifikasi sample seragam (Bahan)</li>
            </ul>
          </div>

          {/* QUICK STATS */}
          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
             <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed uppercase text-center">
                Vendor yang disetujui akan muncul di <span className="text-white">Storefront</span> seluruh sekolah mitra SoSchool secara otomatis.
             </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(VendorMarketplaceApproval);