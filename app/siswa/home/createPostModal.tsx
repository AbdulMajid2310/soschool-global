"use client";

import React, { useState, useRef } from 'react';
import EmojiPicker, { Theme, EmojiStyle } from 'emoji-picker-react';
import { FiX, FiImage, FiSmile, FiSend, FiVideo, FiMapPin, FiChevronDown, FiTrash2 } from 'react-icons/fi';

const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // State untuk preview URL

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // --- Fungsi Handle Upload ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onEmojiClick = (emojiData: any) => {
    const cursor = textareaRef.current?.selectionStart || content.length;
    setContent(content.substring(0, cursor) + emojiData.emoji + content.substring(cursor));
  };

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#050811]/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />

      <div className="relative bg-[#111625] w-full max-w-2xl rounded-[2.5rem] border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-visible animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_#2563eb]" />
            <h3 className="font-black text-2xl text-white italic uppercase tracking-tighter leading-none">BUAT POSTINGAN</h3>
          </div>
          <button onClick={onClose} className="p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer">
            <FiX size={24} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {/* User & Input Section */}
          <div className="flex gap-6">
            <div className="relative shrink-0">
              <div className="p-1 bg-linear-to-tr from-orange-500 to-yellow-300 rounded-2xl">
                <img src="https://i.pravatar.cc/150?u=majid" className="w-14 h-14 rounded-[0.9rem] border-2 border-[#111625] object-cover" alt="majid" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ceritakan karyamu hari ini"
                className="w-full bg-transparent text-white text-md outline-none resize-none min-h-50 scrollbar-hide placeholder:text-blue-100/10"
              />


            </div>
          </div>
          {selectedImages.length > 0 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-4 scrollbar-hide">
              {selectedImages.slice().reverse().map((src, index) => (
                <div
                  key={src} // Gunakan src atau id unik agar animasi transisi berjalan lancar
                  className="relative group h-28 w-44 shrink-0 rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] animate-in slide-in-from-left-4 duration-500"
                >
                  

                  <img
                    src={src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="preview"
                  />

                  {/* Overlay Hapus saat Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0b0f1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                    <button
                      onClick={() => removeImage(selectedImages.length - 1 - index)} // Penyesuaian index karena di-reverse
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all shadow-xl shadow-red-500/20"
                    >
                      <FiTrash2 size={14} /> Hapus
                    </button>
                  </div>

                  
                </div>
              ))}

              
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="hidden"
          />

          {/* Action Bar */}
          <div className="flex items-center justify-between bg-[#161b2c] p-3 rounded-[1.8rem] border border-white/5">
            <div className="flex items-center gap-2 pl-2">

              <IconButton
                icon={<FiImage />}
                color="text-blue-400"
                bg="bg-blue-400/10"
                onClick={() => fileInputRef.current?.click()}
              />

              <div className="w-px h-8 bg-white/10 mx-2" />

              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`p-2 rounded-2xl text-sm lg:text-lg transition-all flex items-center gap-2 ${showEmojiPicker ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-orange-500/10 text-orange-400 hover:bg-orange-500/20'}`}
                >
                  <FiSmile  />
                </button>

                {showEmojiPicker && (
                  <div className="absolute bottom-full left-0 mb-6 z-50 shadow-2xl border border-blue-500/20 rounded-3xl overflow-hidden">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      theme={Theme.DARK}
                      emojiStyle={EmojiStyle.NATIVE}
                      width={300}
                      height={400}
                    />
                  </div>
                )}
              </div>
            </div>

            <button className="flex items-center gap-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white p-2 px-4 rounded-2xl font-black text-sm lg:text-lg  active:scale-95 group">
              <span className='text-sm'>Buat Postingan</span> <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update IconButton untuk menerima props onClick
const IconButton = ({ icon, color, bg, onClick }: { icon: any, color: string, bg: string, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-2xl text-sm lg:text-lg ${bg} ${color} hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-sm`}
  >
    {React.cloneElement(icon)}
  </button>
);

export default CreatePostModal;