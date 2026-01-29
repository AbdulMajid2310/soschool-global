"use client";

import React, { useState, useRef } from 'react';
import EmojiPicker, { Theme, EmojiStyle, Categories } from 'emoji-picker-react';
import { FiX, FiImage, FiSmile, FiSend, FiVideo, FiMapPin, FiChevronDown } from 'react-icons/fi';

const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const onEmojiClick = (emojiData: any) => {
    const cursor = textareaRef.current?.selectionStart || content.length;
    setContent(content.substring(0, cursor) + emojiData.emoji + content.substring(cursor));
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-6">
      {/* Overlay dengan Blur */}
      <div className="absolute inset-0 bg-[#050811]/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />

      {/* Container Utama */}
      <div className="relative bg-[#111625] w-full max-w-2xl rounded-[2.5rem] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-visible animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_#2563eb]" />
            <div>
              <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter leading-none">BUAT POSTINGAN</h3>
              <p className="text-[10px] text-blue-400/50 font-bold tracking-[0.3em] mt-1">EKOSISTEM SOSCHOOL</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
            <FiX size={24} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* User Section & Input */}
          <div className="flex gap-6">
            <div className="relative shrink-0">
              <div className="p-1 bg-linear-to-tr from-orange-500 to-yellow-300 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <img 
                  src="https://i.pravatar.cc/150?u=majid" 
                  className="w-16 h-16 rounded-[0.9rem] border-2 border-[#111625] object-cover" 
                  alt="majid" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#111625]" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition-all">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Publik</span>
                <FiChevronDown className="text-gray-500" size={12} />
              </div>
              <textarea 
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Lagi mikirin apa hari ini, Jid?"
                className="w-full bg-transparent text-white font-bold text-2xl outline-none resize-none min-h-40 placeholder:text-blue-100/10 leading-relaxed"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between bg-[#161b2c] p-3 rounded-[1.8rem] border border-white/5 shadow-inner">
            <div className="flex items-center gap-2 pl-2">
              <IconButton icon={<FiImage />} color="text-blue-400" bg="bg-blue-400/10" />
              <IconButton icon={<FiVideo />} color="text-purple-400" bg="bg-purple-400/10" />
              <IconButton icon={<FiMapPin />} color="text-rose-400" bg="bg-rose-400/10" />
              
              <div className="w-px h-8 bg-white/10 mx-2" />

              <div className="relative">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center gap-2 ${showEmojiPicker ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'}`}
                >
                  <FiSmile size={24} />
                  {showEmojiPicker && <span className="text-[10px] font-black uppercase tracking-tighter italic">Tutup</span>}
                </button>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-6 z-50 shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-blue-500/20 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <EmojiPicker 
                      onEmojiClick={onEmojiClick}
                      theme={Theme.DARK}
                      emojiStyle={EmojiStyle.NATIVE}
                      width={340}
                      height={420}
                      skinTonesDisabled
                      searchPlaceholder="Cari emoji..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Post Button */}
            <button className="flex items-center gap-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] text-white px-10 py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all active:scale-95 cursor-pointer group">
              POSTING <FiSend size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconButton = ({ icon, color, bg }: { icon: any, color: string, bg: string }) => (
  <button className={`p-4 rounded-2xl ${bg} ${color} hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-sm`}>
    {React.cloneElement(icon, { size: 24 })}
  </button>
);

export default CreatePostModal;