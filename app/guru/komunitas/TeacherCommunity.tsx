"use client";

import React from 'react';
import { 
  FiMessageSquare, FiHeart, FiShare2, FiFile, 
  FiTrendingUp, FiPlusCircle, FiFilter, FiAward 
} from 'react-icons/fi';

export interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  time: string;
  attachment?: {
    name: string;
    type: 'pdf' | 'doc';
  };
}

export const COMMUNITY_POSTS: Post[] = [
  {
    id: '1',
    author: { name: 'Drs. Bambang', role: 'Guru Matematika', avatar: 'https://i.pravatar.cc/150?u=bambang' },
    content: 'Rekan-rekan, ada yang punya referensi metode pengajaran Aljabar yang asik untuk anak gen-Z? Saya merasa metode ceramah sudah tidak efektif lagi.',
    tags: ['Pedagogi', 'Matematika'],
    likes: 24,
    comments: 8,
    time: '2 jam yang lalu'
  },
  {
    id: '2',
    author: { name: 'Ibu Ratna', role: 'Guru Bahasa Inggris', avatar: 'https://i.pravatar.cc/150?u=ratna' },
    content: 'Baru saja selesai menyusun modul ajar "Digital Storytelling". Silakan diunduh bagi yang membutuhkan untuk referensi semester ini.',
    tags: ['Modul Ajar', 'Bahasa'],
    likes: 56,
    comments: 12,
    time: '5 jam yang lalu',
    attachment: { name: 'Modul_Storytelling_V1.pdf', type: 'pdf' }
  }
];

const TeacherCommunity = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-700">
      
      {/* LEFT: Feed Section */}
      <div className="lg:col-span-8 space-y-6">
        {/* Create Post Card */}
        <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-amber-900/20 shadow-sm">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 overflow-hidden shrink-0 border-2 border-white dark:border-amber-900/40 shadow-lg shadow-amber-500/20">
              <img src="https://i.pravatar.cc/150?u=teacher" alt="You" />
            </div>
            <textarea 
              placeholder="Bagikan inspirasi atau tanyakan sesuatu..."
              className="w-full bg-slate-50 dark:bg-amber-950/10 rounded-2xl p-4 text-xs font-medium outline-none border border-transparent focus:border-amber-500/30 transition-all resize-none h-24"
            />
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-amber-900/10">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-amber-500 transition-colors">
              <FiFile /> Lampirkan File
            </button>
            <button className="px-8 py-2.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/30">
              Posting
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {COMMUNITY_POSTS.map((post) => (
          <div key={post.id} className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-amber-900/20 shadow-sm hover:shadow-xl hover:shadow-amber-500/5 transition-all">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
                <img src={post.author.avatar} className="w-10 h-10 rounded-xl" alt="" />
                <div>
                  <h4 className="text-xs font-black uppercase italic text-slate-900 dark:text-white">{post.author.name}</h4>
                  <p className="text-[9px] font-bold text-amber-500 tracking-widest uppercase opacity-70">{post.author.role}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase italic">{post.time}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {post.content}
            </p>

            {post.attachment && (
              <div className="mb-4 p-4 bg-slate-50 dark:bg-amber-950/20 rounded-2xl border border-dashed border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center">
                    <FiFile />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-200">{post.attachment.name}</span>
                </div>
                <button className="text-[9px] font-black uppercase text-amber-600 hover:underline tracking-widest">Download</button>
              </div>
            )}

            <div className="flex gap-3 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-amber-950/30 rounded-full text-[8px] font-black uppercase text-slate-400 tracking-widest">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-50 dark:border-amber-900/10">
              <button className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors text-[10px] font-black uppercase tracking-widest">
                <FiHeart /> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors text-[10px] font-black uppercase tracking-widest">
                <FiMessageSquare /> {post.comments}
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors text-[10px] font-black uppercase tracking-widest ml-auto">
                <FiShare2 /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT: Sidebar Section */}
      <div className="lg:col-span-4 space-y-6">
        {/* Trending Topics */}
        <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-amber-900/20">
          <h3 className="text-xs font-black uppercase italic tracking-widest text-amber-500 mb-6 flex items-center gap-2">
            <FiTrendingUp /> Trending Topics
          </h3>
          <div className="space-y-4">
            <TrendingItem label="Kurikulum Merdeka" count="1.2k posts" />
            <TrendingItem label="AI for Teacher" count="850 posts" />
            <TrendingItem label="Metode Socratic" count="420 posts" />
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-amber-900/20">
          <h3 className="text-xs font-black uppercase italic tracking-widest text-amber-500 mb-6 flex items-center gap-2">
            <FiAward /> Top Contributors
          </h3>
          <div className="space-y-4">
            <ContributorItem name="Drs. M. Arifin" points="4,200 XP" />
            <ContributorItem name="Siti Halimah" points="3,850 XP" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrendingItem = ({ label, count }: any) => (
  <div className="group cursor-pointer">
    <p className="text-[10px] font-black uppercase italic text-slate-800 dark:text-white group-hover:text-amber-500 transition-colors">{label}</p>
    <p className="text-[8px] font-bold text-slate-400">{count}</p>
  </div>
);

const ContributorItem = ({ name, points }: any) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-amber-950/20" />
    <div>
      <p className="text-[10px] font-black uppercase italic text-slate-800 dark:text-white">{name}</p>
      <p className="text-[8px] font-bold text-amber-500">{points}</p>
    </div>
  </div>
);

export default TeacherCommunity;