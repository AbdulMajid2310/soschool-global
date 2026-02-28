"use client";

import React, { useState } from 'react';
import { 
  FiArrowLeft, FiCamera, FiUpload, FiSend, FiUsers, 
  FiUserPlus, FiBell, FiSettings, FiTrash2, FiEdit3, 
  FiCheck, FiX, FiImage, FiShield, FiMoreVertical, FiSearch,
  FiPlus, FiLayers, FiZap, FiTarget
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type TabType = 'branding' | 'members' | 'approvals' | 'posts' | 'notifications';

const ManageEkskulDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('branding');
  const [showNotifModal, setShowNotifModal] = useState(false);

  // --- 1. DATA REALISTIK DENGAN AVATAR ---
  const [ekskulData] = useState({
    name: "Cyber Tech",
    slogan: "Code Your Way to the Future",
    description: "Komunitas pengembang muda SoSchool yang berfokus pada Modern Web Dev, AI, dan Cyber Security.",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=cybertech",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600"
  });

  const [members] = useState([
    { id: '1', name: 'Sarah Az-Zahra', role: 'Ketua', type: 'CORE', class: '12-RPL-1', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: '2', name: 'Fajri Ramadhan', role: 'Wakil', type: 'CORE', class: '12-RPL-2', avatar: 'https://i.pravatar.cc/150?u=fajri' },
    { id: '3', name: 'Raka Altha', role: 'Anggota', type: 'REGULAR', class: '10-TKJ-1', avatar: 'https://i.pravatar.cc/150?u=raka' },
    { id: '4', name: 'Zulfa Amira', role: 'Sekretaris', type: 'CORE', class: '11-RPL-1', avatar: 'https://i.pravatar.cc/150?u=zulfa' },
  ]);

  const [approvals] = useState([
    { id: 'p1', name: 'Budi Setiawan', class: '10-IPA-2', date: '28 Jan 2026', avatar: 'https://i.pravatar.cc/150?u=budi', motive: 'Ingin belajar Next.js v15' },
    { id: 'p2', name: 'Indah Kusuma', class: '11-RPL-3', date: '27 Jan 2026', avatar: 'https://i.pravatar.cc/150?u=indah', motive: 'Tertarik UI/UX Design' },
  ]);

  return (
    <div className="lg:h-screen  h-full flex flex-col pt-18 bg-gray-50 dark:bg-gray-950 overflow-hidden font-sans">
      
      {/* --- TOP BAR --- */}
      <div className="flex-none p-6 md:p-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-4xl border border-gray-100 dark:border-white/5 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
              <FiArrowLeft />
            </button>
            <div>
               <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter dark:text-white leading-none">Admin <span className="text-blue-600">Console</span></h1>
               <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">SoSchool • Managed by Majid</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black dark:text-white uppercase leading-none">Majid Amin</p>
                <p className="text-[8px] font-bold text-blue-600 uppercase tracking-tighter">Super Admin</p>
             </div>
             <img src="https://i.pravatar.cc/150?u=majid" className="w-12 h-12 rounded-2xl border-2 border-blue-600/20 shadow-lg" alt="Admin" />
          </div>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 px-6 md:px-8 pb-8 overflow-hidden">
        
        {/* --- LEFT NAVIGATION (STICKY) --- */}
        <div className="lg:w-60 flex lg:flex-col flex-row justify-between gap-2 pt-4 lg:pt-0 lg:space-y-2 overflow-y-auto scrollbar-hide">
          <NavButton active={activeTab === 'branding'} label="Identity" icon={<FiTarget/>} onClick={() => setActiveTab('branding')} />
          <NavButton active={activeTab === 'members'} label="Database" icon={<FiUsers/>} onClick={() => setActiveTab('members')} />
          <NavButton active={activeTab === 'approvals'} label="Persetujuan" icon={<FiUserPlus/>} onClick={() => setActiveTab('approvals')} badge={approvals.length > 0 ? approvals.length.toString() : undefined} />
          <NavButton active={activeTab === 'posts'} label="Konten" icon={<FiLayers/>} onClick={() => setActiveTab('posts')} />
          <NavButton active={activeTab === 'notifications'} label="Aktivitas" icon={<FiBell/>} onClick={() => setActiveTab('notifications')} />
        </div>

        {/* --- MAIN WORKSPACE (SCROLLABLE) --- */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-6xl rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl shadow-black/2 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-8  scrollbar-hide">
            
            {/* TAB: BRANDING */}
            {activeTab === 'branding' && (
              <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader title="Branding" desc="Identitas visual ekskul Cyber Tech." />
                <div className="space-y-8">
                  <div className="relative h-72 w-full rounded-5xl overflow-hidden group border border-gray-100 dark:border-white/5">
                    <img src={ekskulData.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                      <button className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                         <FiCamera /> Ubah Sampul
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                     <div className="w-52 h-52 bg-gray-50 dark:bg-white/5 rounded-4xl border-4 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center relative group overflow-hidden shrink-0">
                        <img src={ekskulData.logo} className="w-28 h-28 object-contain" alt="logo" />
                        <div className="absolute inset-0 bg-blue-600/90 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                           <FiUpload size={32} />
                        </div>
                     </div>
                     <div className="flex-1 w-full space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <InputField label="Nama" value={ekskulData.name} />
                           <InputField label="Slogan" value={ekskulData.slogan} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[9px] font-black uppercase text-gray-400 pl-1 italic tracking-widest">Deskripsi</p>
                          <textarea defaultValue={ekskulData.description} className="w-full h-40 bg-gray-50 dark:bg-white/5 p-6 rounded-4xl text-[12px] font-medium italic outline-none border border-transparent focus:border-blue-600 transition-all dark:text-white" />
                        </div>
                        <button className="w-full py-6 bg-blue-600 text-white rounded-4xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/30 active:scale-95 transition-all">Publish Identity</button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MEMBERS (DENGAN AVATAR) */}
            {activeTab === 'members' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <SectionHeader title="Members" desc="Daftar resmi anggota Cyber Tech." />
                <div className="grid grid-cols-1 gap-4">
                  {members.map(member => (
                    <div key={member.id} className="p-5 bg-gray-50 dark:bg-white/2 rounded-4xl flex items-center justify-between border border-transparent hover:border-blue-600/20 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img src={member.avatar} className="w-16 h-16 rounded-3xl object-cover border-2 border-white dark:border-gray-800 shadow-lg" alt={member.name} />
                          {member.type === 'CORE' && (
                            <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white dark:border-gray-900">
                               <FiShield size={10} />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-base font-black dark:text-white uppercase italic tracking-tighter leading-none mb-1.5 group-hover:text-blue-600 transition-colors">{member.name}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">{member.role} • {member.class}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-4 bg-white dark:bg-white/10 rounded-2xl text-gray-400 hover:text-blue-600 shadow-sm transition-colors"><FiEdit3/></button>
                        <button className="p-4 bg-white dark:bg-white/10 rounded-2xl text-gray-400 hover:text-red-500 shadow-sm transition-colors"><FiTrash2/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: APPROVALS (DENGAN AVATAR) */}
            {activeTab === 'approvals' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                 <SectionHeader title="Requests" desc="Permohonan bergabung yang perlu diproses." />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {approvals.map(a => (
                      <div key={a.id} className="p-8 bg-gray-50 dark:bg-white/2 rounded-5xl border border-gray-100 dark:border-white/5 space-y-6 hover:shadow-2xl transition-all group">
                         <div className="flex items-center gap-5">
                            <img src={a.avatar} className="w-20 h-20 rounded-4xl object-cover shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500" alt={a.name} />
                            <div>
                               <h4 className="text-xl font-black dark:text-white uppercase italic tracking-tighter leading-none">{a.name}</h4>
                               <p className="text-[9px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{a.class} • {a.date}</p>
                            </div>
                         </div>
                         <div className="bg-white/60 dark:bg-gray-950/50 p-6 rounded-3xl border border-gray-100 dark:border-white/5">
                            <p className="text-[8px] font-black text-blue-600 uppercase mb-2 tracking-widest italic flex items-center gap-2"><FiZap /> Kenapa bergabung?</p>
                            <p className="text-xs font-medium italic dark:text-gray-300">"{a.motive}"</p>
                         </div>
                         <div className="flex gap-3">
                            <button className="flex-1 py-4 bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-red-500 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Tolak</button>
                            <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Konfirmasi</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS / LOGS */}
            {activeTab === 'notifications' && (
              <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center">
                  <SectionHeader title="System Logs" desc="History aktivitas ekosistem." />
                  <button onClick={() => setShowNotifModal(true)} className="px-8 py-5 bg-blue-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 transition-all">
                    <FiBell /> Blast Notif
                  </button>
                </div>
                <div className="space-y-4">
                  <NotificationTile label="New Member" desc="Raka Altha telah bergabung." time="2 Menit Lalu" type="INFO" avatar="https://i.pravatar.cc/150?u=raka" />
                  <NotificationTile label="System" desc="Majid memperbarui cover branding." time="1 Jam Lalu" type="SYSTEM" avatar="https://i.pravatar.cc/150?u=majid" />
                  <NotificationTile label="Broadcast" desc="Info kumpul besok sudah dikirim." time="3 Jam Lalu" type="POST" avatar="https://i.pravatar.cc/150?u=sarah" />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* MODAL & COMPONENT SAMA SEPERTI SEBELUMNYA */}
    </div>
  );
};

// --- MODIFIED MINI COMPONENTS ---

const NavButton = ({ active, label, icon, onClick, badge }: any) => (
  <button onClick={onClick} className={`lg:w-full  flex items-center lg:justify-between p-3 lg:p-7 rounded-4xl transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 -translate-y-1' : 'bg-white dark:bg-gray-900 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5'}`}>
    <div className="flex items-center lg:gap-5">
      <div className={`text-xl transition-transform group-hover:scale-125 duration-500 ${active ? 'text-white' : 'text-blue-600'}`}>{icon}</div>
      <span className="text-[10px] hidden lg:inline font-black uppercase tracking-widest leading-none">{label}</span>
    </div>
    {badge && <span className={`px-3 py-1.5 -mt-6 ml-5 absolute lg:relative rounded-xl text-[9px] font-black ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white animate-bounce'}`}>{badge}</span>}
  </button>
);

const SectionHeader = ({ title, desc }: any) => (
  <div className="border-l-8 border-blue-600 pl-8 space-y-2 mb-10">
    <h2 className="text-xl font-black italic uppercase tracking-tighter dark:text-white leading-none">{title}</h2>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">{desc}</p>
  </div>
);

const InputField = ({ label, value, placeholder }: any) => (
  <div className="space-y-3 w-full">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1 italic">{label}</label>
    <input type="text" defaultValue={value} placeholder={placeholder} className="w-full p-6 bg-gray-50 dark:bg-white/5 rounded-2xl text-[12px] font-black uppercase outline-none border-2 border-transparent focus:border-blue-600 transition-all dark:text-white shadow-sm" />
  </div>
);

const NotificationTile = ({ label, desc, time, type, avatar }: any) => (
  <div className="p-6 bg-gray-50 dark:bg-white/2 rounded-4xl border-l-8 border-blue-600 flex justify-between items-center transition-all hover:translate-x-2">
    <div className="flex items-center gap-6">
      <img src={avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="user" />
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{label}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase">• {time}</span>
        </div>
        <p className="text-sm font-bold dark:text-gray-200 italic tracking-tight leading-none">"{desc}"</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-blue-600 shadow-xl shadow-black/5">
      {type === 'INFO' ? <FiUserPlus /> : type === 'SYSTEM' ? <FiSettings /> : <FiSend />}
    </div>
  </div>
);

export default ManageEkskulDashboard;