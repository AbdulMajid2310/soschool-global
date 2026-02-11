"use client";

import React, { useState } from 'react';
import {
  FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiZap, FiAward,
  FiArrowRight, FiStar, FiTarget, FiShoppingBag, FiExternalLink,
  FiCheckCircle, FiPlus, FiX, FiImage, FiSmile, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import CreatePostModal from './createPostModal';

// --- TYPESCRIPT INTERFACES ---
type PostType = 'REGULAR' | 'SPONSORED' | 'ANNOUNCEMENT';

interface PostData {
  id: string;
  type: PostType;
  user: {
    name: string;
    role: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  images?: string[]; // Diperbanyak jadi array
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  adMetadata?: {
    ctaText: string;
    ctaLink: string;
    sponsorName: string;
    isFlashSale?: boolean;
  };
}

interface MarketItemData {
  id: string;
  title: string;
  author: string;
  price: string;
  rating: number;
  sold: number;
}

// --- REALISTIC MOCK DATA (MULTI-IMAGE & MORE POSTS) ---
const FEED_DATA: PostData[] = [
  {
    id: 'p-1',
    type: 'REGULAR',
    user: { name: "Ahmad Mujakkir", role: "Ketua OSIS", avatar: "https://i.pravatar.cc/150?u=ahmad", isVerified: true },
    content: "Dokumentasi rapat persiapan PORSENI 2026 hari ini. Semangat panitia! 🏆",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
    ],
    stats: { likes: 1240, comments: 89, shares: 12 },
    timestamp: "12m ago"
  },
  {
    id: 'ad-1',
    type: 'SPONSORED',
    user: { name: "Gramedia Academy", role: "Official Partner", avatar: "https://i.pravatar.cc/150?u=gramedia", isVerified: true },
    content: "Dapatkan akses eksklusif ke 500+ E-Book pelajaran dan soal-soal latihan UTBK 2026. Diskon khusus buat user SoSchool!",
    images: ["https://images.unsplash.com/photo-1544640808-32ca72ac7f37?auto=format&fit=crop&w=800"],
    stats: { likes: 3200, comments: 45, shares: 210 },
    timestamp: "Sponsored",
    adMetadata: { ctaText: "Ambil Promo", ctaLink: "https://gramedia.com", sponsorName: "Gramedia", isFlashSale: true }
  },
  {
    id: 'p-2',
    type: 'ANNOUNCEMENT',
    user: { name: "Admin Sekolah", role: "Sistem Informasi", avatar: "https://i.pravatar.cc/150?u=admin", isVerified: true },
    content: "PEMBERITAHUAN: Server e-learning bakal maintenance besok jam 00:00 - 03:00 WIB.",
    stats: { likes: 15, comments: 2, shares: 50 },
    timestamp: "2h ago"
  },
  {
    id: 'p-3',
    type: 'REGULAR',
    user: { name: "Siti Haliza", role: "XII RPL 1", avatar: "https://i.pravatar.cc/150?u=siti", isVerified: false },
    content: "Project akhir SoSchool progress 90%! Makasih buat temen-temen yang udah bantu testing UI-nya. 💻✨",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800"
    ],
    stats: { likes: 450, comments: 32, shares: 8 },
    timestamp: "4h ago"
  }
];

const HomeFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen pt-4 bg-[#f0f4ff] dark:bg-[#0f172a]  scrollbar-hide px-4 md:px-8 transition-colors duration-500 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* --- CENTER SECTION --- */}
        <main className="lg:col-span-8 pt-5 xl:col-span-8 space-y-6 h-screen overflow-y-auto scrollbar-hide">
          {/* Create Post Trigger */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-white dark:bg-[#1e293b]/50 rounded-4xl p-6 border border-white dark:border-blue-800/20 shadow-xl cursor-pointer flex items-center gap-4 group"
          >
            <img src="https://i.pravatar.cc/150?u=majid" className="w-10 h-10 rounded-xl" alt="me" />
            <div className="bg-gray-50 dark:bg-blue-900/10 flex-1 py-3 px-5 rounded-2xl text-gray-400 font-bold text-sm group-hover:bg-gray-100 transition-all">
              Ceritakan karyamu hari ini...
            </div>
            <div className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <FiPlus size={20} />
            </div>
          </div>

          {/* List Postingan */}
          <div className="space-y-6 pb-50">
            {FEED_DATA.map((post) => (
              <PostCard key={post.id} data={post} />
            ))}
          </div>
        </main>

        {/* --- RIGHT SECTION --- */}
        {/* Tambahkan sticky & top agar sidebar tidak ikut hilang saat scroll */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 sticky top-0 h-screen overflow-y-auto scrollbar-hide">
          <div className="space-y-6 h-full pb-10">
            {/* Akademik Fokus */}
            <div className="bg-white dark:bg-[#1e293b]/50 rounded-4xl p-8 border border-white dark:border-blue-800/20 shadow-xl">
              <h4 className="font-black text-[10px] dark:text-white uppercase tracking-widest italic mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-2xl text-blue-500"><FiTarget size={18} /></div>
                Akademik Fokus
              </h4>
              <div className="space-y-6">
                <GoalItem label="Logika Pemrograman" progress={85} info="Bab 8: Data Structures" color="bg-blue-500" />
                <GoalItem label="English Speaking" progress={30} info="Level: Intermediate" color="bg-purple-500" />
              </div>
            </div>

            {/* Marketplace */}
            <div className="bg-white dark:bg-[#1e293b]/50 rounded-4xl p-8 border border-white dark:border-blue-800/20 shadow-xl">
              <h4 className="font-black text-[10px] dark:text-white uppercase tracking-widest italic mb-8 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-500"><FiShoppingBag size={18} /></div>
                Marketplace
              </h4>
              <div className="space-y-5">
                {[{ id: 'm-1', title: "Modul Next.js 15 Pro", author: "Majid", price: "Rp 50k", rating: 5.0, sold: 120 },
                { id: 'm-2', title: "Cheat Sheet Kalkulus", author: "Osis", price: "FREE", rating: 4.9, sold: 890 }].map((item) => (
                  <MarketItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

// --- MULTI-IMAGE GALLERY COMPONENT ---
const ImageGrid: React.FC<{ images: string[] }> = ({ images }) => {
  if (images.length === 1) {
    return (
      <div className="rounded-4xl overflow-hidden  mb-8 border border-white/10 shadow-xl group">
        <img src={images[0]} className="w-full h-auto object-cover max-h-80 group-hover:scale-105 transition-transform duration-700" alt="content" />
      </div>
    );
  }

  return (
    <div className={`grid gap-2 mb-8 rounded-4xl overflow-hidden h-60 ${images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'}`}>
      {images.slice(0, 4).map((img, idx) => (
        <div key={idx} className={`relative overflow-hidden group ${idx === 0 && images.length === 3 ? 'row-span-2' : ''}`}>
          <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="content" />
          {idx === 3 && images.length > 4 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-black text-2xl">+{images.length - 4}</div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

const PostCard: React.FC<{ data: PostData }> = ({ data }) => {
  const isAd = data.type === 'SPONSORED';
  const isAnnounce = data.type === 'ANNOUNCEMENT';

  return (
    <div className={`bg-white   dark:bg-gray-900 rounded-4xl p-8 border shadow-xl transition-all duration-500 hover:-translate-y-1 
      ${isAd ? 'border-blue-500/30' : isAnnounce ? 'border-amber-500/30 bg-amber-500/5' : 'border-white dark:border-blue-800/20'}`}>

      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <img src={data.user.avatar} className="w-14 h-14 rounded-2xl shadow-md object-cover" alt="avatar" />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-black dark:text-white uppercase italic tracking-tighter leading-none">{data.user.name}</h4>
              {data.user.isVerified && <FiCheckCircle className="text-blue-500" size={14} />}
            </div>
            <p className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest mt-1.5">{data.user.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAd && <span className="text-[8px] border border-blue-500/40 text-blue-500 px-2 py-0.5 rounded-md font-black tracking-widest uppercase italic">Sponsored</span>}
          <button className="text-gray-400 hover:text-blue-500 transition-colors"><FiMoreHorizontal size={20} /></button>
        </div>
      </div>

      <p className={`text-[16px] font-bold leading-relaxed mb-8 italic ${isAnnounce ? 'text-amber-700 dark:text-amber-200' : 'text-gray-700 dark:text-blue-100/80'}`}>
        "{data.content}"
      </p>

      {data.images && data.images.length > 0 && <ImageGrid images={data.images} />}

      {isAd && data.adMetadata && (
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl p-1 mb-8 shadow-lg shadow-blue-600/20">
          <a href={data.adMetadata.ctaLink} target="_blank" className="flex items-center justify-between bg-white dark:bg-[#0f172a] hover:bg-transparent hover:text-white p-5 rounded-[1.4rem] transition-all group">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black text-blue-500 group-hover:text-blue-200 uppercase tracking-widest mb-1">Official Sponsor</span>
              <span className="text-[12px] font-black uppercase tracking-wider">{data.adMetadata.ctaText}</span>
            </div>
            <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
          </a>
        </div>
      )}

      <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-blue-800/10 text-gray-400">
        <div className="flex gap-8">
          <button className="flex items-center gap-2.5 hover:text-red-500 font-black text-[11px] uppercase tracking-widest group cursor-pointer transition-all">
            <FiHeart className="group-hover:fill-red-500" /> {data.stats.likes.toLocaleString()}
          </button>
          <button className="flex items-center gap-2.5 hover:text-blue-500 font-black text-[11px] uppercase tracking-widest group cursor-pointer transition-all">
            <FiMessageCircle /> {data.stats.comments}
          </button>
        </div>
        <FiShare2 className="hover:text-blue-500 transition-all cursor-pointer" />
      </div>
    </div>
  );
};

// ... (GoalItem & MarketItem tetep sama kayak sebelumnya)
const GoalItem: React.FC<{ label: string, progress: number, info: string, color: string }> = ({ label, progress, info, color }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <div>
        <p className="text-[11px] font-black dark:text-white uppercase italic leading-none">{label}</p>
        <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{info}</p>
      </div>
      <p className="text-[11px] font-black dark:text-white">{progress}%</p>
    </div>
    <div className="h-2 w-full bg-gray-100 dark:bg-blue-900/20 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const MarketItem: React.FC<MarketItemData> = ({ title, author, price, rating, sold }) => (
  <div className="group cursor-pointer border-b border-gray-50 dark:border-blue-800/5 pb-4 last:border-0 last:pb-0">
    <div className="flex justify-between items-start mb-2">
      <div className="overflow-hidden">
        <p className="text-[12px] font-black dark:text-white uppercase italic truncate tracking-tighter group-hover:text-blue-500 transition-colors">{title}</p>
        <p className="text-[8px] font-bold text-gray-400 mt-1 uppercase leading-none">by {author}</p>
      </div>
      <span className="text-[9px] font-black px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">{price}</span>
    </div>
    <div className="flex items-center justify-between mt-3 text-[9px] font-black text-gray-400 uppercase">
      <div className="flex items-center gap-1.5 text-amber-500"><FiStar className="fill-current" /> {rating}</div>
      <span>{sold.toLocaleString()} Terjual</span>
    </div>
  </div>
);

export default HomeFeed;