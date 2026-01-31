"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FiArrowLeft, FiFileText, FiDownload, FiUploadCloud, 
  FiMessageCircle, FiClock, FiAlertCircle, FiCheck, FiX 
} from 'react-icons/fi';

const DetailTugasSiswa = () => {
  const params = useParams();
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  // Tambahkan state di dalam fungsi DetailTugasSiswa
const [isChatOpen, setIsChatOpen] = useState(false);
const [chatMessage, setChatMessage] = useState("");

  // Simulasi data detail (biasanya fetch dari API berdasarkan params.id)
  const taskDetail = {
    id: params.id,
    subject: "Matematika",
    teacher: "Drs. Mulyadi",
    title: "Latihan Integral Subtitusi",
    deadline: "2026-01-30T18:00:00",
    description: `Kerjakan soal-soal berikut dengan teliti. 
    1. Tentukan integral dari (2x+3)^5 dx.
    2. Gunakan metode subtitusi untuk menyelesaikan soal nomor 3-10 di buku cetak halaman 152.
    3. Pastikan tulisan tangan rapi dan terbaca jelas. 
    Format file: PDF atau JPG (maksimal 5MB).`,
    attachments: [
      { name: "Modul_Integral.pdf", size: "1.2 MB" },
      { name: "Contoh_Soal.jpg", size: "850 KB" }
    ],
    status: "pending"
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-24 animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* 1. TOP NAVIGATION */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-blue-600 transition-colors group"
      >
        <div className="p-3 bg-white font-bold dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 group-hover:shadow-md">
          <FiArrowLeft size={16} />
        </div>
        Kembali ke Daftar Tugas
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. LEFT COLUMN: INSTRUCTIONS & CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">Tugas Utama</span>
                <span className="text-[10px] font-black text-blue-600 uppercase italic">{taskDetail.subject}</span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter dark:text-white mb-6 leading-tight">
                {taskDetail.title}
              </h1>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed whitespace-pre-line">
                  {taskDetail.description}
                </p>
              </div>

              {/* Attachments from Teacher */}
              <div className="mt-10 pt-10 border-t border-gray-50 dark:border-gray-800">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Materi Lampiran</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {taskDetail.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 group cursor-pointer hover:border-blue-500 transition-all">
                      <div className="flex items-center gap-3">
                        <FiFileText className="text-blue-600" size={20} />
                        <div>
                          <p className="text-[10px] font-black dark:text-white uppercase truncate max-w-30">{file.name}</p>
                          <p className="text-[8px] text-gray-400 font-bold">{file.size}</p>
                        </div>
                      </div>
                      <FiDownload className="text-gray-400 group-hover:text-blue-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. RIGHT COLUMN: SUBMISSION AREA */}
        <div className="space-y-6">
          {/* Submission Card */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                   <FiUploadCloud size={20} />
                </div>
                <h3 className="text-sm font-black uppercase italic tracking-tight dark:text-white">Kumpul Tugas</h3>
             </div>

             {/* Drag & Drop Area */}
             <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
                }}
                className={`
                  relative border-2 border-dashed rounded-4xl p-8 text-center transition-all cursor-pointer
                  ${dragActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30'}
                  ${file ? 'border-green-500 bg-green-50/20' : ''}
                `}
             >
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                
                {file ? (
                  <div className="space-y-3">
                    <FiCheck className="mx-auto text-green-500 text-3xl" />
                    <p className="text-[10px] font-black uppercase truncate">{file.name}</p>
                    <button onClick={() => setFile(null)} className="text-[8px] font-black text-red-500 uppercase tracking-widest flex items-center justify-center gap-1 mx-auto">
                      <FiX /> Ganti File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <FiUploadCloud className="mx-auto text-gray-300 text-3xl" />
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">
                      Klik atau Seret file <br/> kesini untuk upload
                    </p>
                  </div>
                )}
             </div>

             <button 
                disabled={!file}
                className={`w-full mt-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all
                  ${file 
                    ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}
                `}
             >
                Kirim Sekarang
             </button>
          </div>

          {/* Time Limit Info */}
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-[8px] font-black opacity-60 uppercase tracking-[0.3em] mb-4">Sisa Waktu</p>
                <div className="flex items-center gap-4 mb-2">
                   <FiClock className="text-blue-400 text-2xl" />
                   <h4 className="text-3xl font-black italic uppercase tracking-tighter">02:14:55</h4>
                </div>
                <p className="text-[10px] font-medium text-blue-400 uppercase tracking-widest">Jam : Menit : Detik</p>
             </div>
             <FiAlertCircle className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-5 group-hover:scale-110 transition-transform" />
          </div>

          {/* Teacher Contact */}
         {/* Tombol Tanya Guru yang sudah dimodifikasi */}
<button 
  onClick={() => setIsChatOpen(true)}
  className="w-full p-6 bg-white dark:bg-gray-900 rounded-4xl border border-gray-100 dark:border-gray-800 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-all group"
>
   <FiMessageCircle size={18} className="group-hover:scale-110 transition-transform" /> 
   Tanya Guru Pengampu
</button>
        </div>

      </div>
      {/* --- MODAL QUICK CHAT --- */}
{isChatOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white dark:bg-gray-950 w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
      
      {/* Header Modal */}
      <div className="p-8 bg-blue-600 text-white flex justify-between items-center">
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-70">Direct Message</p>
          <h4 className="text-xl font-black italic uppercase tracking-tighter">Kepada: {taskDetail.teacher}</h4>
        </div>
        <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
          <FiX size={24} />
        </button>
      </div>

      {/* Konten Chat */}
      <div className="p-8 space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Topik Otomatis:</p>
          <p className="text-xs font-bold italic dark:text-gray-300">Tanya mengenai tugas: "{taskDetail.title}"</p>
        </div>

        <textarea 
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Tulis pertanyaanmu di sini secara sopan..."
          className="w-full h-40 bg-gray-50 dark:bg-gray-900 rounded-4xl p-6 text-sm font-medium outline-none border border-transparent focus:border-blue-500/30 transition-all resize-none"
        />

        <div className="flex gap-4">
          <button 
            onClick={() => setIsChatOpen(false)}
            className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600"
          >
            Batal
          </button>
          <button 
            disabled={!chatMessage}
            className="flex-2 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            Kirim Pertanyaan
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default DetailTugasSiswa;