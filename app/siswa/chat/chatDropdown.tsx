"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit3, FiSearch, FiCircle } from 'react-icons/fi';

const CHAT_DATA = [
  {
    id: 1,
    name: "Pak Budi",
    avatar: "https://i.pravatar.cc/150?u=budi",
    lastMsg: "Sudah cek tugas kalkulus kamu?",
    time: "2m ago",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    name: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?u=siti",
    lastMsg: "Jid, pinjem buku catatan dong.",
    time: "15m ago",
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    name: "Group: 12-IPA-1",
    avatar: "https://i.pravatar.cc/150?u=group",
    lastMsg: "Besok ada olahraga guys!",
    time: "1h ago",
    isOnline: true,
    unreadCount: 5
  }
];

const ChatDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    closeDropdown();
    router.push(`/siswa/chat/${id}`);
  };

  return (
    <div className="flex flex-col h-full max-h-112.5">
      {/* SEARCH CHAT */}
      <div className="relative mb-3 px-1">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={12} />
        <input 
          type="text" 
          placeholder="Cari pesan..." 
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-9 text-[10px] focus:outline-none focus:border-blue-500/50 transition-all"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
        {CHAT_DATA.map((chat) => (
          <button 
            key={chat.id} 
            onClick={() => handleNavigate(chat.id)}
            className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-blue-600/10 transition-all text-left group"
          >
            <div className="relative shrink-0">
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-xl object-cover" />
              {chat.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0a0f1d] rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className="text-[11px] font-black text-white uppercase italic tracking-tighter truncate leading-none">
                  {chat.name}
                </h4>
                <span className="text-[8px] font-medium text-slate-600 italic">{chat.time}</span>
              </div>
              <p className="text-[10px] text-slate-500 truncate leading-tight">
                {chat.lastMsg}
              </p>
            </div>

            {chat.unreadCount > 0 && (
              <div className="w-4 h-4 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_10px_#2563eb]">
                <span className="text-[8px] font-black text-white leading-none">{chat.unreadCount}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between px-1">
        <button 
          onClick={() => { closeDropdown(); router.push('/siswa/chat'); }}
          className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          Buka Semua Pesan
        </button>
        <button className="p-2 bg-blue-600 rounded-lg text-white hover:scale-110 transition-transform">
          <FiEdit3 size={12} />
        </button>
      </div>
    </div>
  );
};

export default ChatDropdown;