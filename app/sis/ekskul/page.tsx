"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { 
  FiSearch, FiAward, FiZap, FiTarget, FiArrowRight, 
  FiMapPin, FiStar, FiUsers, FiHexagon, FiPlus, FiClock
} from 'react-icons/fi';

// 1. DATA TYPES (English)
interface Extracurricular {
  id: string;
  name: string;
  category: string;
  description: string;
  coach: string;
  membersCount: number;
  rating: number;
  intensity: 'High' | 'Medium' | 'Low';
  achievements: string[];
  tags: string[];
  logoUrl: string;
  coverImage: string;
  venue: string;
  isJoined: boolean;
  myProgress?: {
    role: string;
    attendanceRate: number;
    points: number;
    lastSession: string;
  };
}

// 2. DATA REALISTIK (8 Ekskul, 3 Diikuti)
const EKSKUL_DATA: Extracurricular[] = [
  { 
    id: "SOC-01", 
    name: "SoSchool Cyber Tech", 
    category: "Teknologi", 
    description: "Fokus pada Fullstack Web, Mobile App, dan Cyber Security.",
    coach: "Majid Amin, S.Kom", 
    membersCount: 32, rating: 5.0, intensity: 'High',
    achievements: ["Juara 1 LKS Nasional Web Tech"],
    tags: ["Code", "AI"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/6062/6062293.png",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800",
    venue: "Lab Komputer 3",
    isJoined: true,
    myProgress: { role: "Ketua Klub", attendanceRate: 100, points: 2450, lastSession: "Kemarin" }
  },
  { 
    id: "SOC-02", 
    name: "Persatuan Basket", 
    category: "Olahraga", 
    description: "Membina atletik untuk kompetisi liga pelajar nasional.",
    coach: "Coach Hardi Wijaya", 
    membersCount: 48, rating: 4.8, intensity: 'High',
    achievements: ["Top 3 DBL Regional"],
    tags: ["Sport", "Team"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/889/889455.png",
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800",
    venue: "GOR Utama",
    isJoined: true,
    myProgress: { role: "Point Guard", attendanceRate: 92, points: 1100, lastSession: "2 Hari Lalu" }
  },
  { 
    id: "SOC-03", 
    name: "English Debate", 
    category: "Akademik", 
    description: "Mengasah kemampuan berpikir kritis dan public speaking internasional.",
    coach: "Ms. Anggia, M.Pd", 
    membersCount: 18, rating: 4.9, intensity: 'Medium',
    achievements: ["National Best Speaker"],
    tags: ["English", "Speech"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/3468/3468081.png",
    coverImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800",
    venue: "Ruang Seminar",
    isJoined: true,
    myProgress: { role: "First Speaker", attendanceRate: 85, points: 950, lastSession: "Minggu Lalu" }
  },
  { 
    id: "SOC-04", 
    name: "Lensa Jurnalistik", 
    category: "Media", 
    description: "Wadah bagi fotografer dan pembuat konten berita sekolah.",
    coach: "Bpk. Doni Pratama", 
    membersCount: 22, rating: 4.6, intensity: 'Low',
    achievements: ["Buletin Terbaik 2024"],
    tags: ["Photo", "Writing"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/3178/3178183.png",
    coverImage: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?auto=format&fit=crop&w=800",
    venue: "Multimedia",
    isJoined: false
  },
  { 
    id: "SOC-05", 
    name: "Gita Suara Choir", 
    category: "Seni", 
    description: "Paduan suara yang mengasah harmoni vokal profesional.",
    coach: "Ibu Shinta Paramita", 
    membersCount: 35, rating: 4.7, intensity: 'Medium',
    achievements: ["Gold Medal Festival Seni"],
    tags: ["Music", "Vocal"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063649.png",
    coverImage: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800",
    venue: "Aula Musik",
    isJoined: false
  },
  { 
    id: "SOC-06", 
    name: "Archery Club", 
    category: "Olahraga", 
    description: "Melatih fokus dan konsentrasi melalui olahraga panahan.",
    coach: "Coach Bayu", 
    membersCount: 15, rating: 4.9, intensity: 'High',
    achievements: ["Piala Walikota 2025"],
    tags: ["Focus", "Archery"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/3143/3143586.png",
    coverImage: "https://images.unsplash.com/photo-1511306161271-66d6a7ed2660?auto=format&fit=crop&w=800",
    venue: "Lapangan Barat",
    isJoined: false
  },
  { 
    id: "SOC-07", 
    name: "Modern Dance", 
    category: "Seni", 
    description: "Ekspresi diri melalui koreografi tari modern dan hip-hop.",
    coach: "Kak Andre", 
    membersCount: 28, rating: 4.7, intensity: 'Medium',
    achievements: ["Best Performance 2024"],
    tags: ["Dance", "Stage"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/2995/2995101.png",
    coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800",
    venue: "Studio Dance",
    isJoined: false
  },
  { 
    id: "SOC-08", 
    name: "Karya Ilmiah (KIR)", 
    category: "Akademik", 
    description: "Eksplorasi penelitian sains dan penemuan solusi inovatif.",
    coach: "Dr. Sulistyo", 
    membersCount: 12, rating: 4.5, intensity: 'High',
    achievements: ["Inovator Muda Nasional"],
    tags: ["Science", "Research"],
    logoUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800",
    venue: "Lab Kimia",
    isJoined: false
  }
];

const EliteEkskulPage = () => {
  const myClubs = EKSKUL_DATA.filter(c => c.isJoined);
  const otherClubs = EKSKUL_DATA.filter(c => !c.isJoined);
  const router= useRouter()

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 italic">Talent Hub SoSchool</span>
          </div>
          <h2 className="text-6xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
            Ekskul <span className="text-gray-400">Pilihan</span>
          </h2>
        </div>
        <div className="relative group w-full lg:w-96">
           <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
           <input 
              type="text" 
              placeholder="CARI EKSKUL..." 
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
           />
        </div>
      </div>

      {/* 2. MY CLUBS (Dynamic Grid for 3 Items) */}
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 pl-2">Keanggotaan Aktif ({myClubs.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myClubs.map((club) => (
            <div key={club.id} className="relative h-96 rounded-[3.5rem] overflow-hidden group shadow-xl">
               <img src={club.coverImage} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
               
               <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="w-14 h-14 bg-white/95 rounded-2xl p-2.5 shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <img src={club.logoUrl} className="w-full h-full object-contain" alt="logo" />
                     </div>
                     <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                        {club.myProgress?.lastSession}
                     </span>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white">{club.name}</h4>
                        <p className="text-[10px] font-black text-blue-400 uppercase italic tracking-widest">{club.myProgress?.role}</p>
                     </div>
                     <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                           <FiHexagon className="text-yellow-400" />
                           <span className="text-xs font-black text-white">{club.myProgress?.points} XP</span>
                        </div>
                        <button onClick={()=> router.push('/siswa/ekskul/detail-inti')} className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                           <FiArrowRight />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ALL CLUBS (Enhanced List) */}
      <div className="space-y-8">
        <div className="flex justify-between items-end px-2">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Jelajahi Ekskul Lainnya</h3>
           <FiPlus className="text-gray-400 text-2xl" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {otherClubs.map((club) => (
            <div key={club.id} className="bg-white dark:bg-gray-900 rounded-[3rem] p-4 border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 flex flex-col sm:flex-row gap-6">
               <div className="w-full sm:w-48 h-56 rounded-[2.5rem] overflow-hidden relative shrink-0">
                  <img src={club.coverImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                     <img src={club.logoUrl} className="w-full h-full object-contain drop-shadow-2xl" />
                  </div>
               </div>

               <div className="flex-1 py-4 pr-6 flex flex-col justify-between">
                  <div className="space-y-4">
                     <div className="flex justify-between items-start">
                        <div>
                           <span className="text-[8px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md uppercase tracking-widest mb-1 inline-block">
                              {club.category}
                           </span>
                           <h4 className="text-xl font-black italic uppercase tracking-tighter dark:text-white">{club.name}</h4>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-black">
                           <FiStar className="fill-current" /> {club.rating}
                        </div>
                     </div>
                     <p className="text-[10px] font-medium text-gray-400 leading-relaxed italic pr-4">"{club.description}"</p>
                     
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[8px] font-black text-gray-500 uppercase">
                           <FiUsers className="text-blue-500" /> {club.membersCount} Siswa
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black text-gray-500 uppercase">
                           <FiMapPin className="text-red-500" /> {club.venue}
                        </div>
                        <div className="flex items-center gap-2 text-[8px] font-black text-gray-500 uppercase">
                           <FiClock className="text-green-500" /> {club.intensity}
                        </div>
                     </div>
                  </div>

                  <button className="mt-6 w-full py-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-[9px] font-black uppercase tracking-widest dark:text-white hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group">
                     Lihat Detail & Gabung <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EliteEkskulPage;