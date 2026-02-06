"use client";

import React, { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  FiSearch,
  FiSend,
  FiMoreVertical,
  FiSmile,
  FiCheckCircle,
  FiPlus,
  FiArrowLeft,
  FiX,
  FiImage,
  FiUsers,
  FiUser,
} from "react-icons/fi";

// --- TYPES ---
interface Message {
  id: number;
  senderId: number; // 0: User (Majid), lainnya: Partner
  senderName: string;
  senderAvatar: string;
  text?: string;
  image?: string;
  time: string;
}

interface Partner {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
  role: string;
  lastMsg: string;
  isGroup: boolean;
}

// --- EXTENDED DATA ---
const INITIAL_PARTNERS: Partner[] = [
  { id: 1, name: "Pak Budi", avatar: "https://i.pravatar.cc/150?u=1", status: "online", role: "Guru Matematika", lastMsg: "Jangan lupa kuisnya ya.", isGroup: false },
  { id: 2, name: "Siti Aminah", avatar: "https://i.pravatar.cc/150?u=2", status: "offline", role: "Ketua Kelas", lastMsg: "Jid, pinjem buku catatan.", isGroup: false },
  { id: 101, name: "OSIS SoSchool", avatar: "https://i.pravatar.cc/150?u=99", status: "online", role: "Official Group", lastMsg: "Rapat jam 4 sore di aula.", isGroup: true },
  { id: 102, name: "12-IPA-1 (Main)", avatar: "https://i.pravatar.cc/150?u=88", status: "online", role: "Classroom", lastMsg: "Woy, tugas fisika udah?", isGroup: true },
  { id: 3, name: "Ibu Ratna", avatar: "https://i.pravatar.cc/150?u=4", status: "online", role: "Guru B.Inggris", lastMsg: "Great job today!", isGroup: false },
  { id: 4, name: "Budi Santoso", avatar: "https://i.pravatar.cc/150?u=5", status: "offline", role: "Teman", lastMsg: "Mabar kaga?", isGroup: false },
];

const INITIAL_MESSAGES: Record<number, Message[]> = {
  102: [
    { id: 1, senderId: 2, senderName: "Siti", senderAvatar: "https://i.pravatar.cc/150?u=2", text: "Guys, tugas fisika dikumpulin kapan?", time: "08:00 AM" },
    { id: 2, senderId: 4, senderName: "Budi", senderAvatar: "https://i.pravatar.cc/150?u=5", text: "Besok jam 7 pagi di meja Pak Bambang.", time: "08:05 AM" },
    { id: 3, senderId: 0, senderName: "Majid", senderAvatar: "https://i.pravatar.cc/150?u=10", text: "Siap, otw ngerjain! 🚀", time: "08:10 AM" },
  ],
  1: [
    { id: 1, senderId: 1, senderName: "Pak Budi", senderAvatar: "https://i.pravatar.cc/150?u=1", text: "Jid, sudah paham materi turunan?", time: "09:00 AM" },
  ]
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Partner>(INITIAL_PARTNERS[3]); // Default ke grup 12-IPA-1
  const [showChatArea, setShowChatArea] = useState(false);
  const [chatHistory, setChatHistory] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const currentMessages = chatHistory[selectedChat.id] || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages, showChatArea, selectedImage]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 0,
      senderName: "Majid",
      senderAvatar: "https://i.pravatar.cc/150?u=10",
      text: inputText || undefined,
      image: selectedImage || undefined,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory({
      ...chatHistory,
      [selectedChat.id]: [...currentMessages, newMessage]
    });
    
    setInputText("");
    setSelectedImage(null);
    setShowEmoji(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-white dark:bg-[#02040a] text-slate-600 dark:text-slate-400 flex overflow-hidden transition-colors duration-500">
      
      {/* SIDEBAR */}
      <aside className={`${showChatArea ? "hidden md:flex" : "flex"} w-full md:w-80 lg:w-96 flex-col bg-slate-50 dark:bg-[#0a1229] border-r border-slate-200 dark:border-white/5 h-full`}>
        <div className="p-6 pt-10 md:pt-24  flex gap-3">
           
           <div className="relative group w-full">
             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
             <input type="text" placeholder="Cari teman atau grup..." className="w-full bg-white dark:bg-[#0d1733] border border-slate-200 dark:border-white/10 rounded-2xl py-3 pl-11 text-xs font-bold text-slate-900 dark:text-white outline-none" />
           </div>

           <div>
             <button className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"><FiPlus size={20}/></button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-2 scrollbar-hide">
          {INITIAL_PARTNERS.map((p) => (
            <button key={p.id} onClick={() => { setSelectedChat(p); setShowChatArea(true); }} className={`w-full flex items-center gap-4 p-2 rounded-3xl transition-all group ${selectedChat.id === p.id ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 translate-x-1" : "hover:bg-slate-200 dark:hover:bg-white/5"}`}>
              <div className="relative shrink-0">
                <img src={p.avatar} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-blue-400 transition-all" alt="" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-slate-50 dark:border-[#0a1229] rounded-full ${p.status === "online" ? "bg-emerald-500" : "bg-slate-400"}`} />
                {p.isGroup && <div className="absolute -top-2 -left-2 bg-blue-500 text-white p-1 rounded-lg shadow-md"><FiUsers size={10}/></div>}
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-widest ${selectedChat.id === p.id ? "text-blue-100" : "text-blue-600"}`}>{p.role}</span>
                    <span className="text-[8px] opacity-50 font-bold">12:30</span>
                </div>
                <h4 className="font-bold italic capitalize tracking-tight truncate leading-none">{p.name}</h4>
                <p className={`text-[10px] truncate mt-1 opacity-70`}>{p.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* CHAT AREA */}
      <section className={`${showChatArea ? "flex" : "hidden md:flex"} flex-1 flex-col bg-white dark:bg-[#02040a] relative h-full transition-all`}>
        
        {/* Header */}
        <header className=" shrink-0 border-b pt-20 border-slate-200 dark:border-white/5 flex items-center justify-between px-6 bg-white/80 dark:bg-[#02040a]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4 p-3">
            <button onClick={() => setShowChatArea(false)} className="md:hidden p-2 text-slate-900 dark:text-white"><FiArrowLeft size={22} /></button>
            <div className="relative">
              <img src={selectedChat.avatar} className="w-10 h-10 md:w-10 md:h-10 rounded-2xl shadow-lg" alt="" />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 border-2 md:border-4 border-white dark:border-[#02040a] rounded-full ${selectedChat.status === "online" ? "bg-emerald-500" : "bg-slate-400"}`} />
            </div>
            <div>
              <h3 className="font-black italic uppercase text-slate-900 dark:text-white tracking-tighter text-lg leading-none">{selectedChat.name}</h3>
              <div className="flex items-center gap-2 mt-1.5">
                {selectedChat.isGroup ? <FiUsers className="text-blue-600" size={12}/> : <FiUser className="text-blue-600" size={12}/>}
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{selectedChat.isGroup ? "Group Members: 24" : selectedChat.status}</p>
              </div>
            </div>
          </div>
          <button className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-500 hover:text-blue-600 transition-all cursor-pointer"><FiMoreVertical size={20}/></button>
        </header>

        {/* MESSAGES AREA */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-4 scrollbar-hide">
          {currentMessages.map((msg, index) => {
            const isMe = msg.senderId === 0;
            return (
              <div key={msg.id} className={`flex items-end gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {/* Profile Image di samping bubble */}
                <img src={msg.senderAvatar} className="w-8 h-8 rounded-xl object-cover shadow-md shrink-0 mb-6" alt="" />
                
                <div className={`max-w-[80%] md:max-w-[60%] space-y-1 ${isMe ? "items-end text-right" : "items-start text-left"}`}>
                  {selectedChat.isGroup && !isMe && (
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 ml-2 mb-1 block uppercase tracking-tighter">
                      {msg.senderName}
                    </span>
                  )}
                  
                  <div className={`p-1 rounded-3xl overflow-hidden border transition-all ${
                    isMe 
                    ? "bg-blue-600 border-blue-500 rounded-br-none shadow-lg shadow-blue-600/10" 
                    : "bg-slate-100 dark:bg-[#151f3d] border-slate-200 dark:border-white/5 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.image && <img src={msg.image} className="max-w-full rounded-2xl mb-1 object-cover max-h-80 w-full" alt="" />}
                    {msg.text && (
                      <p className={`px-2 py-1 text-sm  font-medium leading-relaxed ${isMe ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                        {msg.text}
                      </p>
                    )}
                  </div>
                  <div className={`flex items-center gap-2 px-2`}>
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{msg.time}</span>
                    {isMe && <FiCheckCircle className="text-blue-500" size={10} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT FOOTER */}
        <footer className="p-4 md:p-10 shrink-0 bg-white/95 dark:bg-[#02040a]/95 border-t border-slate-200 dark:border-white/5 relative">
          
          {showEmoji && (
            <div ref={emojiRef} className="absolute bottom-32 left-4 md:left-10 z-50 animate-in slide-in-from-bottom-5">
              <EmojiPicker 
                onEmojiClick={(emojiData) => setInputText(prev => prev + emojiData.emoji)}
                theme={document.documentElement.classList.contains('dark') ? Theme.DARK : Theme.LIGHT}
                width={300}
                height={400}
              />
            </div>
          )}

          <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto">
            {selectedImage && (
              <div className="mb-4 relative inline-block group">
                <img src={selectedImage} className="h-28 w-28 object-cover rounded-2xl border-2 border-blue-600 shadow-2xl" alt="" />
                <button type="button" onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg hover:bg-red-500 transition-all"><FiX size={14} /></button>
              </div>
            )}

            <div className="flex items-center gap-2 md:gap-4 bg-slate-50 dark:bg-[#0d1733] p-2 rounded-4xl border border-slate-200 dark:border-white/5 shadow-inner">
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              
              <div className="flex items-center gap-1 pl-2">
                <button type="button" onClick={() => fileInputRef.current?.click()} className={`p-3.5 rounded-2xl transition-all cursor-pointer ${selectedImage ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-blue-600'}`}><FiImage size={20} /></button>
                <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={`p-3.5 rounded-2xl transition-all cursor-pointer ${showEmoji ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}><FiSmile size={22} /></button>
              </div>

              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setShowEmoji(false)}
                placeholder={selectedChat.isGroup ? `Pesan ke ${selectedChat.name}...` : "Ketik pesan..."}
                className="flex-1 bg-transparent py-4 px-2 text-sm font-bold text-slate-900 dark:text-white focus:outline-none placeholder:opacity-50"
              />
              
              <div className="pr-2">
                <button type="submit" className="p-4 bg-blue-600 text-white rounded-[1.4rem] hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-600/30 cursor-pointer flex items-center justify-center">
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </form>
        </footer>
      </section>
    </div>
  );
}