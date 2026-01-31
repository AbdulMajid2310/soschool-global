"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { FiZap, FiCheckCircle, FiMessageSquare, FiInfo } from 'react-icons/fi';

const NOTIF_DATA = [
  {
    id: 1,
    type: 'quiz',
    icon: <FiZap className="text-amber-400" />,
    title: "Kuis Baru Tersedia!",
    time: "2 Menit yang lalu",
    desc: "Materi Turunan sudah siap diuji.",
    isUnread: true
  },
  {
    id: 2,
    type: 'grade',
    icon: <FiCheckCircle className="text-emerald-400" />,
    title: "Nilai Keluar",
    time: "1 Jam yang lalu",
    desc: "Hasil tryout Bahasa Inggris: 95/100.",
    isUnread: false
  },
  {
    id: 3,
    type: 'chat',
    icon: <FiMessageSquare className="text-blue-400" />,
    title: "Pesan dari Guru",
    time: "3 Jam yang lalu",
    desc: "Bapak Budi: 'Jangan lupa PR-nya, Majid.'",
    isUnread: false
  }
];

const NotificationDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {

    const router = useRouter();

  const handleNavigate = () => {
    closeDropdown(); // Tutup dropdown
    router.push('/siswa/notifications'); // Pindah ke halaman notifikasi
  };
  return (
    <div className="space-y-1">
      {NOTIF_DATA.map((item) => (
        <button 
          key={item.id} 
          className={`w-full flex items-start gap-3 p-3 rounded-2xl transition-all text-left group relative overflow-hidden ${
            item.isUnread ? 'bg-blue-500/5 border border-blue-500/10' : 'hover:bg-blue-500/10'
          }`}
        >
          {/* Status Unread Indicator */}
          {item.isUnread && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
          )}

          <div className="w-10 h-10 bg-blue-950/40 rounded-xl flex items-center justify-center text-lg shrink-0">
            {item.icon}
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-[10px] font-black text-white uppercase italic tracking-tighter truncate">
                {item.title}
              </p>
              <span className="text-[8px] font-medium text-blue-100/30 whitespace-nowrap ml-2 italic">
                {item.time}
              </span>
            </div>
            <p className="text-[9px] text-blue-100/50 truncate font-medium leading-tight">
              {item.desc}
            </p>
          </div>
        </button>
      ))}

      <button onClick={handleNavigate} className="w-full py-3 mt-2 text-[9px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors border-t border-blue-900/20">
        Lihat Semua Notifikasi
      </button>
    </div>
  );
};

export default NotificationDropdown;