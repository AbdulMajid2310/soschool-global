"use client";

import React from 'react';
import { 
  FiMessageSquare, FiSend, FiBell, FiCalendar, 
  FiCheckCircle, FiMoreVertical, FiUser, FiInfo 
} from 'react-icons/fi';

export interface ParentMessage {
  id: string;
  parentName: string;
  studentName: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
}

export const PARENT_CHATS: ParentMessage[] = [
  { id: '1', parentName: 'Bpk. Hendra', studentName: 'Ahmad Zaki', lastMessage: 'Terima kasih informasinya Pak, Zaki akan belajar lebih giat.', time: '10:15 AM', unread: 2, status: 'online' },
  { id: '2', parentName: 'Ibu Maya', studentName: 'Siti Aminah', lastMessage: 'Apakah besok ada ujian susulan?', time: 'Kemarin', unread: 0, status: 'offline' },
  { id: '3', parentName: 'Bpk. Sugeng', studentName: 'Budi Santoso', lastMessage: 'Saya ingin konsultasi mengenai nilai matematika Budi.', time: '2 hari lalu', unread: 0, status: 'offline' },
];

const ParentPortal = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* LEFT: Chat & Broadcast List (5 Cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-rose-900/20 shadow-sm overflow-hidden flex flex-col h-162.5">
          
          {/* Header Portal */}
          <div className="p-8 border-b border-slate-50 dark:border-rose-900/10 flex justify-between items-center bg-rose-50/30 dark:bg-rose-500/5">
            <div>
              <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white">Messages</h3>
              <p className="text-[8px] font-bold text-rose-500 uppercase tracking-widest mt-1">Chat dengan Orang Tua</p>
            </div>
            <button className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-110 transition-transform">
              <FiBell size={18} />
            </button>
          </div>

          {/* List Chat */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
            {PARENT_CHATS.map((chat) => (
              <div key={chat.id} className="group p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-rose-500/5 transition-all cursor-pointer border border-transparent hover:border-rose-500/20">
                <div className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-rose-950/30 rounded-2xl flex items-center justify-center text-rose-500">
                      <FiUser size={24} />
                    </div>
                    {chat.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-[#0a0f1d] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[11px] font-black uppercase italic text-slate-900 dark:text-white truncate">{chat.parentName}</h4>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{chat.time}</span>
                    </div>
                    <p className="text-[9px] font-bold text-rose-400 uppercase tracking-tighter mt-0.5">Siswa: {chat.studentName}</p>
                    <p className="text-[10px] text-slate-500 mt-2 truncate italic">"{chat.lastMessage}"</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-rose-500 rounded-lg flex items-center justify-center text-[9px] font-black text-white italic">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Global Announcement & School-Home Link (7 Cols) */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Broadcast Widget */}
        <div className="bg-linear-to-br from-rose-500 to-orange-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
          <FiSend className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-110 transition-transform duration-700" size={200} />
          <div className="relative z-10">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Broadcast Info</h3>
            <p className="text-xs font-medium text-rose-100 mt-2 uppercase tracking-widest italic">Kirim pengumuman massal ke seluruh orang tua kelas.</p>
            
            <div className="mt-8 flex gap-3">
              <input 
                type="text" 
                placeholder="Tulis pengumuman kelas hari ini..." 
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-xs font-bold outline-none placeholder:text-white/40 focus:bg-white/20 transition-all"
              />
              <button className="p-4 bg-white text-rose-600 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule/Meeting Cards */}
        <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-rose-900/20 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-900 dark:text-white">Jadwal Konsultasi</h3>
            <button className="text-[9px] font-black uppercase italic text-rose-500 hover:underline">Atur Jadwal Baru</button>
          </div>

          <div className="space-y-4">
            <MeetingItem date="05 Feb" name="Ibu Maya (Siti Aminah)" type="Via Zoom" time="14:00" />
            <MeetingItem date="07 Feb" name="Bpk. Sugeng (Budi)" type="Offline" time="09:00" />
          </div>
        </div>

        {/* School Policy Note */}
        <div className="p-6 bg-slate-50 dark:bg-rose-950/10 rounded-3xl border-l-4 border-rose-500 flex items-start gap-4">
          <FiInfo className="text-rose-500 shrink-0" size={20} />
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 italic leading-relaxed">
            Sistem **SoSchool Link** secara otomatis menjaga privasi nomor WhatsApp guru. Semua pesan akan dienkripsi dan hanya dapat diakses melalui portal resmi selama jam operasional sekolah.
          </p>
        </div>

      </div>
    </div>
  );
};

// Sub-component
const MeetingItem = ({ date, name, type, time }: any) => (
  <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 dark:border-rose-950/20 hover:border-rose-500/30 transition-all">
    <div className="flex items-center gap-5">
      <div className="text-center">
        <p className="text-[10px] font-black italic text-rose-500 leading-none uppercase">{date.split(' ')[1]}</p>
        <p className="text-lg font-black italic text-slate-900 dark:text-white tracking-tighter">{date.split(' ')[0]}</p>
      </div>
      <div className="h-10 w-px bg-slate-100 dark:bg-rose-900/30" />
      <div>
        <h4 className="text-[11px] font-black uppercase italic text-slate-800 dark:text-white leading-none">{name}</h4>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{type} • {time} WIB</p>
      </div>
    </div>
    <FiCalendar className="text-slate-300" />
  </div>
);

export default ParentPortal;