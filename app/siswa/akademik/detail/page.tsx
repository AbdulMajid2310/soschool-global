"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiPlay, FiFileText, FiCheckCircle, 
  FiLock, FiDownload, FiMessageCircle, FiStar 
} from 'react-icons/fi';

const DetailPelajaran = () => {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'materi' | 'tugas' | 'diskusi'>('materi');

  // Simulasi Data Detail (Nantinya diambil berdasarkan ID dari Database)
  const courseDetail = {
    name: "Matematika",
    teacher: "Drs. Mulyadi",
    modules: [
      { id: 1, title: "Pengenalan Integral", type: "video", duration: "15:00", status: "completed" },
      { id: 2, title: "Integral Tak Tentu", type: "pdf", size: "2.4MB", status: "completed" },
      { id: 3, title: "Integral Subtitusi", type: "video", duration: "22:10", status: "ongoing" },
      { id: 4, title: "Ujian Tengah Semester", type: "quiz", status: "locked" },
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 1. BACK BUTTON & HEADER */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => router.back()}
            className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:text-blue-600 transition-all shadow-sm"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">
              {courseDetail.name}
            </h2>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-1">
              Teacher: {courseDetail.teacher}
            </p>
          </div>
        </div>

        <div className="flex gap-2 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800">
          <TabButton active={activeTab === 'materi'} onClick={() => setActiveTab('materi')} label="Modul" />
          <TabButton active={activeTab === 'tugas'} onClick={() => setActiveTab('tugas')} label="Tugas" />
          <TabButton active={activeTab === 'diskusi'} onClick={() => setActiveTab('diskusi')} label="Diskusi" />
        </div>
      </div>

      {/* 2. VIDEO PLAYER / HERO AREA */}
      <div className="aspect-video w-full bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative group cursor-pointer border-4 border-white dark:border-gray-800">
         <img 
            src="https://images.unsplash.com/photo-1509228468518-180dd482180c?auto=format&fit=crop&w=1200" 
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
            alt="Thumbnail"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-3xl shadow-blue-500/50 group-hover:scale-110 transition-transform">
               <FiPlay size={32} fill="currentColor" />
            </div>
         </div>
         <div className="absolute bottom-10 left-10">
            <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Now Playing</span>
            <h3 className="text-2xl font-black text-white italic uppercase mt-2">{courseDetail.modules[2].title}</h3>
         </div>
      </div>

      {/* 3. LIST MODUL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Daftar Modul Pembelajaran</h4>
          {courseDetail.modules.map((modul) => (
            <div 
              key={modul.id}
              className={`p-6 rounded-4xl border transition-all flex items-center justify-between group cursor-pointer
                ${modul.status === 'locked' ? 'bg-gray-50/50 dark:bg-gray-900/20 opacity-50' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500'}
              `}
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                  ${modul.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}
                  ${modul.status === 'locked' ? 'bg-gray-100 text-gray-400' : ''}
                `}>
                  {modul.status === 'completed' ? <FiCheckCircle /> : modul.status === 'locked' ? <FiLock /> : <FiPlay />}
                </div>
                <div>
                  <h5 className="font-black dark:text-white uppercase italic text-sm tracking-tight">{modul.title}</h5>
                  <p className="text-[9px] text-gray-400 font-bold uppercase">
                    {modul.type === 'video' ? `Video • ${modul.duration}` : `Dokumen • ${modul.size}`}
                  </p>
                </div>
              </div>
              {modul.status !== 'locked' && (
                <button className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <FiDownload className="text-gray-400 group-hover:text-blue-600" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 4. SIDEBAR DETAIL: TEACHER & RATING */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-6">Instructor</p>
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black italic">MY</div>
                 <div>
                    <p className="text-sm font-black dark:text-white uppercase italic tracking-tight">{courseDetail.teacher}</p>
                    <p className="text-[9px] text-gray-400 font-bold">NIP: 198203102010</p>
                 </div>
              </div>
              <button className="w-full py-4 bg-gray-50 dark:bg-gray-800 hover:bg-blue-600 hover:text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                 <FiMessageCircle size={16} /> Hubungi Guru
              </button>
           </div>

           <div className="bg-linear-to-br from-yellow-400 to-orange-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-500/20">
              <h5 className="text-lg font-black italic uppercase mb-2 leading-none">Review Materi</h5>
              <p className="text-[9px] font-medium opacity-80 uppercase tracking-widest mb-6">Bantu guru meningkatkan kualitas materi</p>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(i => <FiStar key={i} fill={i < 5 ? "currentColor" : "none"} />)}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component ---
const TabButton = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all
      ${active ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}
    `}
  >
    {label}
  </button>
);

export default DetailPelajaran;