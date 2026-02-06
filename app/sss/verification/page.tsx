"use client";

import React, { useState, memo } from 'react';
import { 
  FiFileText, FiCheck, FiX, FiEye, 
  FiDownload, FiInfo, FiAlertCircle, FiClipboard,
  FiCalendar, FiUser, FiMapPin, FiMail,
  FiShield
} from 'react-icons/fi';

// --- MOCK DATA PENDAFTAR BARU ---
const PENDING_VERIFICATIONS = [
  {
    id: 'REQ-2026-001',
    schoolName: 'SMA Nusantara Unggul',
    npsn: '20103245',
    picName: 'Drs. Bambang Sudjatmiko',
    email: 'admin@smanusantara.sch.id',
    submitDate: '5 Feb 2026, 14:20',
    documents: [
      { name: 'SK Izin Operasional', status: 'Uploaded' },
      { name: 'Sertifikat Akreditasi', status: 'Uploaded' },
      { name: 'KTP Kepala Sekolah', status: 'Uploaded' },
    ],
    status: 'Pending'
  },
  {
    id: 'REQ-2026-002',
    schoolName: 'ITB Schools Global',
    npsn: '69781223',
    picName: 'Sarah Wijaya, M.Pd',
    email: 'info@itbschools.edu',
    submitDate: '5 Feb 2026, 09:15',
    documents: [
      { name: 'SK Izin Operasional', status: 'Uploaded' },
      { name: 'Sertifikat Akreditasi', status: 'Uploaded' },
      { name: 'KTP Kepala Sekolah', status: 'Uploaded' },
    ],
    status: 'Reviewing'
  }
];

const VerificationCenter = () => {
  const [activeReq, setActiveReq] = useState(PENDING_VERIFICATIONS[0]);

  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <FiClipboard className="text-emerald-500 text-xl" />
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
            Verifikasi <span className="text-emerald-500">Sekolah Baru</span>
          </h1>
        </div>
        <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Antrean Kurasi Dokumen & Validasi NPSN</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT: LIST OF REQUESTS (4 Cols) */}
        <div className="xl:col-span-4 space-y-4">
          <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">Daftar Antrean ({PENDING_VERIFICATIONS.length})</h3>
          {PENDING_VERIFICATIONS.map((req) => (
            <div 
              key={req.id}
              onClick={() => setActiveReq(req)}
              className={`p-5 rounded-3xl border cursor-pointer transition-all duration-300 ${
                activeReq.id === req.id 
                ? 'bg-emerald-600 border-emerald-400 shadow-xl shadow-emerald-900/20' 
                : 'bg-white/5 border-white/10 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                  activeReq.id === req.id ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {req.id}
                </span>
                <span className="text-[9px] font-bold opacity-60">{req.submitDate}</span>
              </div>
              <h4 className={`text-sm font-black uppercase italic ${activeReq.id === req.id ? 'text-white' : 'text-slate-200'}`}>
                {req.schoolName}
              </h4>
              <p className={`text-[10px] mt-1 font-bold ${activeReq.id === req.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                NPSN: {req.npsn}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT: DETAIL VIEW (8 Cols) */}
        <div className="xl:col-span-8 bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic">{activeReq.schoolName}</h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <FiUser className="text-emerald-500" /> PIC: {activeReq.picName}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <FiMail className="text-emerald-500" /> {activeReq.email}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl text-[10px] font-black uppercase italic transition-all">
                <FiX /> Tolak
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20">
                <FiCheck /> Verifikasi & Aktifkan
              </button>
            </div>
          </div>

          {/* DOCUMENT CHECKLIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-6 flex items-center gap-2">
                <FiFileText className="text-emerald-500" /> Dokumen Pendukung
              </h3>
              <div className="space-y-3">
                {activeReq.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <FiFileText />
                      </div>
                      <span className="text-xs font-bold text-slate-300 group-hover:text-white">{doc.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-blue-400 transition-all">
                        <FiEye />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-emerald-400 transition-all">
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRITY CHECK (EXTERNAL SIMULATION) */}
            <div>
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-6 flex items-center gap-2">
                <FiShield className="text-emerald-500" /> Integrity Check
              </h3>
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase italic">Validasi NPSN (Kemendikbud)</span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1">
                    <FiCheck /> Valid
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase italic">Domain Availability</span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1">
                    <FiCheck /> Available
                  </span>
                </div>
                <div className="h-px bg-emerald-500/10 w-full my-2" />
                <div className="flex items-start gap-3">
                  <FiInfo className="text-emerald-500 mt-1 shrink-0" />
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                    Sistem secara otomatis telah mencocokkan data NPSN dengan database pusat. Dokumen SK Izin Operasional perlu diperiksa manual untuk memastikan masa berlaku.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                 <label className="text-[10px] font-black text-slate-500 uppercase italic mb-2 block">Catatan Auditor (Internal)</label>
                 <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium outline-none focus:border-emerald-500/50 min-h-25"
                  placeholder="Tambahkan catatan jika ada dokumen yang kurang..."
                 />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default memo(VerificationCenter);