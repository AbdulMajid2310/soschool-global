"use client";

import React from 'react';
import { 
  FiVideo, FiMic, FiGrid, FiPlayCircle, FiMoreHorizontal, 
  FiPlus, FiBarChart2, FiEye, FiClock, FiUploadCloud 
} from 'react-icons/fi';

export interface MediaContent {
  id: string;
  title: string;
  type: 'video' | 'podcast' | 'interactive';
  duration: string;
  status: 'published' | 'draft' | 'processing';
  thumbnail: string;
  views: number;
  date: string;
}

export const TEACHER_MEDIA: MediaContent[] = [
  { id: '1', title: 'Konsep Dasar Jaringan Komputer', type: 'video', duration: '12:40', status: 'published', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', views: 124, date: '20 Jan 2026' },
  { id: '2', title: 'Tips Menghadapi Ujian Akhir', type: 'podcast', duration: '05:20', status: 'published', thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400', views: 89, date: '25 Jan 2026' },
  { id: '3', title: 'Simulasi Gerbang Logika', type: 'interactive', duration: '-', status: 'draft', thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400', views: 0, date: '1 Feb 2026' },
];

const MediaStudio = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Recording Tools Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ToolCard 
          icon={<FiVideo />} 
          title="Video Recorder" 
          desc="Rekam layar & webcam" 
          color="from-rose-500 to-pink-600" 
        />
        <ToolCard 
          icon={<FiMic />} 
          title="Podcast Studio" 
          desc="Rekam audio berkualitas" 
          color="from-orange-500 to-amber-600" 
        />
        <ToolCard 
          icon={<FiGrid />} 
          title="Interactive Maker" 
          desc="Buat quiz interaktif" 
          color="from-emerald-500 to-teal-600" 
        />
      </div>

      {/* Content Library */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] p-8 border border-slate-200 dark:border-rose-900/20 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Content Library</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Semua Media Pembelajaran Anda</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/20">
            <FiUploadCloud /> Upload Media
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {TEACHER_MEDIA.map((item) => (
            <div key={item.id} className="group bg-slate-50 dark:bg-rose-950/10 rounded-4xl overflow-hidden border border-slate-100 dark:border-rose-900/10 hover:border-rose-500/50 transition-all duration-500">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiPlayCircle className="text-white text-5xl drop-shadow-2xl" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-md rounded-lg text-[10px] font-black text-white italic">
                  {item.duration}
                </div>
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest italic text-white shadow-lg ${item.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                  {item.status}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[9px] font-black uppercase text-rose-500 tracking-tighter italic flex items-center gap-1">
                    {item.type === 'video' ? <FiVideo /> : item.type === 'podcast' ? <FiMic /> : <FiGrid />} {item.type}
                  </span>
                  <button className="text-slate-400 hover:text-rose-500 transition-colors">
                    <FiMoreHorizontal />
                  </button>
                </div>
                <h4 className="text-sm font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-rose-500 transition-colors">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-rose-900/10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase"><FiEye /> {item.views}</span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase"><FiClock /> {item.date}</span>
                  </div>
                  <button className="p-2 bg-white dark:bg-[#0a0f1d] text-slate-400 hover:text-rose-500 rounded-xl transition-all border border-slate-100 dark:border-rose-900/20">
                    <FiBarChart2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component ToolCard
const ToolCard = ({ icon, title, desc, color }: any) => (
  <button className={`relative p-8 rounded-[2.5rem] bg-linear-to-br ${color} text-white text-left group overflow-hidden shadow-xl transition-all hover:-translate-y-2`}>
    <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-transform">
      {icon}
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{title}</h3>
      <p className="text-xs font-medium opacity-80 mt-1">{desc}</p>
    </div>
  </button>
);

export default MediaStudio;