"use client";

import React, { useState } from 'react';
import { 
  FiArrowLeft, FiCamera, FiUpload, FiSend, FiUsers, 
  FiUserPlus, FiBell, FiSettings, FiTrash2, FiEdit3, 
  FiCheck, FiX, FiImage, FiShield, FiMoreVertical, FiSearch,
  FiPlus
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type TabType = 'branding' | 'members' | 'approvals' | 'posts' | 'notifications';

const ManageEkskulDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('branding');
  const [showNotifModal, setShowNotifModal] = useState(false);

  const [notifForm, setNotifForm] = useState({
  title: '',
  message: '',
  type: 'INFO' // INFO, URGENT, EVENT
});

// Handler pengiriman
const handleSendNotif = () => {
  if(!notifForm.title || !notifForm.message) return alert("Isi semua data!");
  console.log("Mengirim Notifikasi:", notifForm);
  // Di sini nanti panggil API (misal: Pusher atau Firebase)
  alert("Notifikasi berhasil dikirim ke semua anggota!");
  setNotifForm({ title: '', message: '', type: 'INFO' });
  setShowNotifModal(false)
};

  // --- 1. STATE MANAGEMENT (DATA REALISTIK) ---
  const [ekskulData, setEkskulData] = useState({
    name: "Cyber Tech",
    slogan: "Official Lead Commander",
    description: "Membangun masa depan melalui kode dan inovasi teknologi.",
    logo: "https://cdn-icons-png.flaticon.com/512/6062/6062293.png",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600"
  });

  const [members, setMembers] = useState([
    { id: '1', name: 'Sarah Az-Zahra', role: 'Ketua', type: 'CORE', class: '12-RPL-1' },
    { id: '2', name: 'Fajri Ramadhan', role: 'Wakil', type: 'CORE', class: '12-RPL-2' },
    { id: '3', name: 'Raka Altha', role: 'Anggota', type: 'REGULAR', class: '10-TKJ-1' },
  ]);

  const [approvals, setApprovals] = useState([
    { id: 'p1', name: 'Budi Setiawan', class: '10-IPA-2', date: '28 Jan 2026' },
    { id: 'p2', name: 'Indah Kusuma', class: '11-RPL-3', date: '27 Jan 2026' },
  ]);

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-700">
      
      {/* --- COMMANDER TOP BAR --- */}
      <div className="bg-white dark:bg-gray-950 p-8 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 mb-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            <FiArrowLeft />
          </button>
          <div>
             <h1 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">Admin <span className="text-blue-600">Console</span></h1>
             <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em]">SoSchool • Managed by Majid Amin</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex -space-x-3">
              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-4 border-white dark:border-gray-950" alt="" />)}
           </div>
        </div>
      </div>
      {/* --- FLOATING NOTIFICATION MODAL --- */}
{showNotifModal && (
  <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
    <div className="bg-white/90 dark:bg-gray-950/90 border border-white/20 w-full max-w-lg rounded-[4rem] p-12 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Dekorasi Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl" />

      {/* Close Button */}
      <button 
        onClick={() => setShowNotifModal(false)}
        className="absolute top-10 z-20 right-10 p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl hover:bg-red-500 hover:text-white transition-all "
      >
        <FiX size={20} />
      </button>

      {/* Form Content */}
      <div className="relative z-10 space-y-8">
        <div className="space-y-2">
           <div className="flex items-center gap-3 text-blue-600 mb-2">
              <FiBell size={24} className="animate-tada" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Broadcast</span>
           </div>
           <h3 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
             Send <span className="text-blue-600">Blast</span>
           </h3>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kirim pesan instan ke seluruh anggota</p>
        </div>

        <div className="space-y-5">
           {/* Input Judul */}
           <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-gray-500 pl-1">Notification Title</p>
              <input 
                type="text" 
                placeholder="Contoh: Info Latihan Besok"
                className="w-full p-5 bg-gray-100 dark:bg-gray-900/50 rounded-2xl text-[11px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-transparent"
              />
           </div>

           {/* Pilih Urgency */}
           <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-gray-500 pl-1">Urgency Level</p>
              <div className="grid grid-cols-3 gap-3">
                 {['INFO', 'URGENT', 'EVENT'].map((type) => (
                    <button 
                      key={type}
                      className="py-3 rounded-xl border border-gray-100 dark:border-gray-800 text-[8px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                    >
                       {type}
                    </button>
                 ))}
              </div>
           </div>

           {/* Isi Pesan */}
           <div className="space-y-2">
              <p className="text-[9px] font-black uppercase text-gray-500 pl-1">Short Message</p>
              <textarea 
                placeholder="Tulis pesan singkat di sini..."
                className="w-full h-32 bg-gray-100 dark:bg-gray-900/50 p-6 rounded-[2.5rem] text-[11px] font-medium italic outline-none focus:ring-2 focus:ring-blue-600 transition-all border border-transparent"
              />
           </div>
        </div>

        <button  onClick={() => setShowNotifModal(false)} className="group w-full py-6 z-20 bg-blue-600 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-blue-500/20">
           <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
           Kirim Notifikasi
        </button>
      </div>
    </div>
  </div>
)}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT NAVIGATION --- */}
        <div className="lg:col-span-3 space-y-2">
          <NavButton active={activeTab === 'branding'} label="Ekskul Identity" icon={<FiSettings/>} onClick={() => setActiveTab('branding')} />
          <NavButton active={activeTab === 'members'} label="Management Data" icon={<FiUsers/>} onClick={() => setActiveTab('members')} />
          <NavButton active={activeTab === 'approvals'} label="Persetujuan" icon={<FiUserPlus/>} onClick={() => setActiveTab('approvals')} badge={approvals.length > 0 ? approvals.length.toString() : undefined} />
          <NavButton active={activeTab === 'posts'} label="Buat Postingan" icon={<FiSend/>} onClick={() => setActiveTab('posts')} />
          <NavButton active={activeTab === 'notifications'} label="Notifikasi" icon={<FiBell/>} onClick={() => setActiveTab('notifications')} />
        </div>

        {/* --- MAIN WORKSPACE --- */}
        <div className="lg:col-span-9 bg-white dark:bg-gray-950 rounded-[4rem] border border-gray-100 dark:border-gray-800 p-10 shadow-sm min-h-175">
          
          {/* TAB 1: EKSKUL IDENTITY */}
          {activeTab === 'branding' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4">
              <SectionHeader title="Branding & Identity" desc="Kelola logo, cover, dan informasi dasar ekskul." />
              <div className="space-y-6">
                <div className="relative h-64 w-full rounded-[3.5rem] overflow-hidden group">
                  <img src={ekskulData.cover} className="w-full h-full object-cover" alt="cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button className="bg-white text-black px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                       <FiCamera /> Ubah Background
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                   <div className="w-48 h-48 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-gray-800 flex items-center justify-center relative group">
                      <img src={ekskulData.logo} className="w-24 h-24 object-contain" alt="logo" />
                      <div className="absolute inset-0 bg-blue-600/90 text-white opacity-0 group-hover:opacity-100 transition-all rounded-[2.8rem] flex items-center justify-center cursor-pointer">
                         <FiUpload size={24} />
                      </div>
                   </div>
                   <div className="flex-1 w-full space-y-6">
                      <InputField label="Nama Ekskul" value={ekskulData.name} />
                      <InputField label="Slogan / Tagline" value={ekskulData.slogan} />
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase text-gray-400 pl-1">Deskripsi</p>
                        <textarea defaultValue={ekskulData.description} className="w-full h-32 bg-gray-50 dark:bg-gray-900 p-5 rounded-3xl text-[11px] font-bold italic outline-none border border-transparent focus:border-blue-600" />
                      </div>
                      <button className="w-full py-5 bg-blue-600 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20">Update Identity</button>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGEMENT MEMBERS (CORE & REGULAR) */}
          {activeTab === 'members' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                 <SectionHeader title="Member Database" desc="Kelola struktur organisasi dan database anggota." />
                 <button className="px-6 py-4 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <FiUserPlus /> Tambah Manual
                 </button>
              </div>
              <div className="space-y-4">
                {members.map(member => (
                  <div key={member.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl flex items-center justify-between border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic ${member.type === 'CORE' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {member.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-black dark:text-white uppercase italic tracking-tight">{member.name}</h4>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">{member.role} • {member.class}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-blue-600"><FiEdit3/></button>
                      <button className="p-3 bg-white dark:bg-gray-800 rounded-xl text-gray-400 hover:text-red-500"><FiTrash2/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: APPROVALS */}
          {activeTab === 'approvals' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4">
               <SectionHeader title="Waiting List" desc="Persetujuan siswa yang mengajukan bergabung ke ekskul." />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {approvals.map(a => (
                    <div key={a.id} className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 space-y-6">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="text-xl font-black dark:text-white uppercase italic tracking-tighter leading-none">{a.name}</h4>
                             <p className="text-[9px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{a.class} • {a.date}</p>
                          </div>
                          <FiMoreVertical className="text-gray-400" />
                       </div>
                       <div className="flex gap-3 pt-2">
                          <button className="flex-1 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-red-500 rounded-2xl text-[9px] font-black uppercase tracking-widest">Tolak</button>
                          <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Terima</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* TAB 4: BUAT POSTINGAN */}
          {activeTab === 'posts' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4">
              <SectionHeader title="Create Content" desc="Bagikan materi belajar atau pengumuman terbaru." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="md:col-span-2">
                    <InputField label="Post Title" placeholder="Contoh: Tutorial Dasar Next.js" />
                 </div>
                 <div className="md:col-span-1 space-y-2">
                    <p className="text-[9px] font-black uppercase text-gray-400 pl-1 italic">Kategori Post</p>
                    <select className="w-full p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-[10px] font-black uppercase outline-none border-r-16 border-transparent">
                       <option>Materi Belajar</option>
                       <option>Pengumuman</option>
                       <option>Showcase Project</option>
                    </select>
                 </div>
                 <div className="md:col-span-1 space-y-2">
                    <p className="text-[9px] font-black uppercase text-gray-400 pl-1 italic">Banner Postingan</p>
                    <button className="w-full p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center justify-center gap-3 border-2 border-dashed border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase text-gray-400">
                       <FiImage /> Pilih Gambar
                    </button>
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <p className="text-[9px] font-black uppercase text-gray-400 pl-1 italic">Konten / Isi Postingan</p>
                    <textarea placeholder="Tulis sesuatu yang hebat..." className="w-full h-64 bg-gray-50 dark:bg-gray-900 p-8 rounded-[3.5rem] text-[12px] font-medium italic outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" />
                 </div>
                 <button className="md:col-span-2 py-6 bg-blue-600 text-white rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/30">Publish To Feed</button>
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFIKASI */}
          {activeTab === 'notifications' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4">
              <div className='flex justify-between items-center'>
               <SectionHeader title="Log Aktivitas" desc="Pantau riwayat perubahan dan notifikasi sistem." />
              <button 
  onClick={() => setShowNotifModal(true)}
  className="p-5 bg-blue-600 text-white rounded-4xl shadow-xl shadow-blue-500/30 hover:scale-105 transition-all"
>
  <FiPlus size={24} />
</button>
              </div>
               <div className="space-y-4">
                  <NotificationTile label="New Member" desc="Raka Altha telah bergabung ke Cyber Tech." time="2 Menit Lalu" type="INFO" />
                  <NotificationTile label="Identity Update" desc="Majid Amin mengubah profil background ekskul." time="1 Jam Lalu" type="SYSTEM" />
                  <NotificationTile label="Post Published" desc="Materi 'Pengenalan HTML' berhasil diterbitkan." time="3 Jam Lalu" type="POST" />
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- REUSABLE MINI COMPONENTS ---

const NavButton = ({ active, label, icon, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-6 rounded-[2.5rem] transition-all duration-500 ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 -translate-y-1' : 'bg-white dark:bg-gray-950 text-gray-400 hover:bg-gray-50 border border-gray-100 dark:border-gray-800'}`}
  >
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </div>
    {badge && <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black ${active ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>{badge}</span>}
  </button>
);

const SectionHeader = ({ title, desc }: any) => (
  <div className="border-l-4 border-blue-600 pl-6 space-y-1">
    <h2 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white leading-none">{title}</h2>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{desc}</p>
  </div>
);

const InputField = ({ label, value, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest pl-1 italic">{label}</label>
    <input 
      type="text" 
      defaultValue={value} 
      placeholder={placeholder}
      className="w-full p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl text-[11px] font-black uppercase outline-none border border-transparent focus:border-blue-500 transition-all" 
    />
  </div>
);

const NotificationTile = ({ label, desc, time, type }: any) => (
  <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-l-4 border-blue-600 flex justify-between items-center">
    <div>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{label}</span>
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">• {time}</span>
      </div>
      <p className="text-xs font-bold dark:text-gray-300 italic tracking-tight leading-none">"{desc}"</p>
    </div>
    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-[10px] text-blue-600 shadow-sm">
      {type === 'INFO' ? <FiUserPlus /> : type === 'SYSTEM' ? <FiSettings /> : <FiSend />}
    </div>
  </div>
);

export default ManageEkskulDashboard;