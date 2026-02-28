"use client";

import React from 'react';
import { 
  FiSearch, FiFilter, FiDownload, FiUserPlus, 
  FiMail, FiPhone, FiMapPin, FiChevronRight, FiCheckCircle 
} from 'react-icons/fi';

const STUDENT_DATA = [
  { 
    id: 'S001', name: 'Ahmad Zaki', nisn: '009218212', gender: 'L', 
    status: 'Lengkap', parent: 'Majid Senior', phone: '0812-xxxx-xxxx',
    address: 'Karawang, Jawa Barat'
  },
  { 
    id: 'S002', name: 'Cahaya Putri', nisn: '009218215', gender: 'P', 
    status: 'Belum Valid', parent: 'Suryono', phone: '0857-xxxx-xxxx',
    address: 'Bekasi, Jawa Barat'
  },
  // Tambahkan data lainnya...
];

const StudentLedger = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-4">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Digital <span className="text-indigo-600">Ledger</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 italic">
            Buku Induk Siswa Kelas 11-RPL-2
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button className="px-6 py-3 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-white/5 rounded-2xl text-[9px] font-black uppercase italic text-slate-500 flex items-center gap-2 hover:border-indigo-500 transition-all">
            <FiDownload /> Export Dapodik
          </button>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[9px] font-black uppercase italic tracking-widest flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <FiUserPlus /> Tambah Siswa
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white dark:bg-[#0a0f1d] p-4 rounded-4xl border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari Nama, NISN, atau Nama Orang Tua..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-white/2 rounded-2xl border-none outline-none text-[11px] font-bold italic focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <button className="px-8 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase italic text-slate-500 flex items-center gap-2">
          <FiFilter /> Filter Status
        </button>
      </div>

      {/* 3. Student Table */}
      <div className="bg-white dark:bg-[#0a0f1d] rounded-[3rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Identitas Siswa</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">NISN</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Wali Murid</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Alamat</th>
                <th className="p-8 text-[9px] font-black uppercase tracking-widest text-slate-400 italic text-center">Data Status</th>
                <th className="p-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {STUDENT_DATA.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-all">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-black italic text-indigo-600">
                        {student.gender}
                      </div>
                      <div>
                        <h4 className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white leading-none">{student.name}</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8 text-[11px] font-bold text-slate-600 dark:text-slate-400 italic">{student.nisn}</td>
                  <td className="p-8">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200 italic leading-none">{student.parent}</span>
                      <span className="text-[9px] font-bold text-slate-400 mt-1">{student.phone}</span>
                    </div>
                  </td>
                  <td className="p-8 max-w-4xl">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiMapPin className="shrink-0" size={14} />
                      <span className="text-[10px] font-medium italic truncate">{student.address}</span>
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <span className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase italic tracking-widest ${
                      student.status === 'Lengkap' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-8">
                    <button className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all group-hover:scale-110">
                      <FiChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. AI Data Auditor */}
      <div className="bg-linear-to-br from-[#0a0f1d] to-[#1e1b4b] p-8 rounded-[3.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/20 rounded-4xl flex items-center justify-center text-indigo-400">
          <FiCheckCircle size={32} />
        </div>
        <div className="flex-1">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic mb-2">Data Integrity Auditor (AI)</h5>
          <p className="text-sm font-medium italic text-slate-400 leading-relaxed">
            "Majid, sistem mendeteksi ada **3 siswa** yang belum melampirkan fotokopi Kartu Keluarga dan **1 siswa** dengan format NIK tidak valid. Segera lakukan pembaruan sebelum penutupan sinkronisasi Dapodik."
          </p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-lg shadow-indigo-500/20">
          Validasi Massal
        </button>
      </div>

    </div>
  );
};

export default StudentLedger;