"use client";
import React from 'react';
import { FiBookOpen, FiSearch, FiEdit3, FiEye, FiTrash2, FiFileText } from 'react-icons/fi';

const DocumentationPage = () => {
  return (
    <div className="p-6 md:p-10 bg-[#050810] min-h-screen text-slate-200">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-white">Knowledge <span className="text-blue-500">Base</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Documentation & Self-Service Portal</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all flex items-center gap-2">
          <FiFileText /> Add New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-4xl hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><FiBookOpen size={20} /></div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg"><FiEdit3 size={12}/></button>
                <button className="p-2 bg-white/5 hover:bg-rose-500/10 text-rose-500 rounded-lg"><FiTrash2 size={12}/></button>
              </div>
            </div>
            <h4 className="text-sm font-black text-white uppercase italic mb-2">Setup Xendit Gateway</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic uppercase mb-6">Panduan langkah demi langkah integrasi pembayaran sekolah melalui API Xendit v2.</p>
            <div className="flex justify-between items-center border-t border-white/5 pt-6">
              <span className="text-[8px] font-black text-slate-600 uppercase">12.5k Reads</span>
              <span className="text-[9px] font-black text-blue-500 uppercase flex items-center gap-1 cursor-pointer">Preview <FiEye /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentationPage;