"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiZap, FiCheckCircle, FiMessageSquare, FiTrash2, 
  FiSettings, FiAward, FiShoppingBag, FiBell, FiArrowRight 
} from 'react-icons/fi';

// --- TYPES ---
type NotifType = 'learning' | 'achievement' | 'market' | 'social';

interface NotificationItem {
  id: number;
  type: NotifType;
  icon: React.ReactNode;
  title: string;
  time: string;
  desc: string;
  isUnread: boolean;
  category: string;
  route: string;
  color: string;
}

// --- DATA: LEBIH BANYAK & PADAT ---
const NOTIFICATIONS: NotificationItem[] = [
  { id: 1, type: 'learning', icon: <FiZap />, title: "Materi: Singular vs Plural", time: "2m ago", desc: "Pelajari rumus akhiran 'S' sekarang.", isUnread: true, category: "English", route: "/siswa/bank-soal/detail/materi", color: "text-amber-400" },
  { id: 2, type: 'achievement', icon: <FiAward />, title: "Level Up: Intermediate", time: "1h ago", desc: "Kamu mencapai 500 XP minggu ini.", isUnread: true, category: "Rank", route: "/siswa/profile", color: "text-emerald-400" },
  { id: 3, type: 'market', icon: <FiShoppingBag />, title: "Item Claimed", time: "3h ago", desc: "Voucher kantin berhasil ditukar.", isUnread: false, category: "Market", route: "/siswa/marketplace", color: "text-blue-400" },
  { id: 4, type: 'learning', icon: <FiCheckCircle />, title: "Quiz Result: Calculus", time: "5h ago", desc: "Skor 100/100! Kamu luar biasa.", isUnread: false, category: "Math", route: "/siswa/bank-soal", color: "text-purple-400" },
  { id: 5, type: 'social', icon: <FiMessageSquare />, title: "New Message: Pak Budi", time: "Yesterday", desc: "Cek catatan tambahan di library.", isUnread: false, category: "Discussion", route: "/siswa/chat", color: "text-pink-400" },
  { id: 6, type: 'learning', icon: <FiZap />, title: "Assignment Due", time: "Yesterday", desc: "Kumpulkan tugas Biologi malam ini.", isUnread: false, category: "Biology", route: "/siswa/home", color: "text-orange-400" },
  { id: 7, type: 'market', icon: <FiShoppingBag />, title: "New Item in Store", time: "2 days ago", desc: "Notebook eksklusif SoSchool tersedia.", isUnread: false, category: "Market", route: "/siswa/marketplace", color: "text-blue-400" },
];

export default function NotificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen  text-slate-400 font-sans selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto px-6 py-8">
        
        {/* COMPACT HEADER */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl">
              <FiBell className="text-blue-500 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Inbox</h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">You have {NOTIFICATIONS.filter(n => n.isUnread).length} unread alerts</p>
            </div>
          </div>
          <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-slate-500">
            <FiSettings size={18} />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: LIST (Compact Style) */}
          <div className="lg:col-span-8 space-y-2">
            {NOTIFICATIONS.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => router.push(notif.route)}
                className={`group flex items-center gap-4 p-3 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  notif.isUnread 
                  ? 'bg-blue-600/5 border-blue-500/20 hover:bg-blue-600/10' 
                  : 'bg-white/1 border-transparent hover:border-white/10 hover:bg-white/3'
                }`}
              >
                {/* Small Icon Box */}
                <div className={`w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform ${notif.color}`}>
                  {notif.icon}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black uppercase tracking-tighter text-slate-600 bg-white/5 px-2 py-0.5 rounded-md leading-none">
                        {notif.category}
                      </span>
                      <h3 className={`text-sm font-bold italic uppercase tracking-tight truncate ${notif.isUnread ? 'text-white' : 'text-slate-500'}`}>
                        {notif.title}
                      </h3>
                    </div>
                    <span className="text-[9px] font-medium text-slate-700 whitespace-nowrap italic">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                    {notif.desc}
                  </p>
                </div>

                {/* Quick Action Icon */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                  <FiArrowRight className="text-blue-500" />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: MINI SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-4xl bg-linear-to-br from-indigo-900/20 to-transparent border border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 italic">Learning Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">XP Points</p>
                  <p className="text-xl font-black text-white italic tracking-tighter">12,450</p>
                </div>
                <div className="p-4 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Rank</p>
                  <p className="text-xl font-black text-white italic tracking-tighter">Gold II</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-4xl bg-blue-600 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group cursor-pointer">
              <FiZap className="absolute -right-4 -bottom-4 text-7xl opacity-20 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Next Mission</p>
              <p className="text-lg font-black italic uppercase leading-none tracking-tighter">Solve 5 Math <br /> Problems</p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}