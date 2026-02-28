"use client";

import { setSelectedSchool } from '@/redux/features/school/slice';
import { fetchSchools } from '@/redux/features/school/thunk';
import { School } from '@/redux/features/school/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useState, memo, useEffect } from 'react';
import {
  FiSearch, FiFilter, FiMoreVertical, FiEye,
  FiShield, FiGlobe, FiMapPin, FiCreditCard,
  FiPlus, FiCheckCircle, FiAlertCircle, FiExternalLink
} from 'react-icons/fi';



export default function SchoolDirectory() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter()
  const { schools, loading } = useAppSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  const handleGoToDetail = (school: School) => {
    sessionStorage.setItem("schoolId", school.schoolId);
    dispatch(setSelectedSchool(school));
    router.push("/sss/schools/detail");
  };



  return (
    <div className="min-h-screen  text-gray-700 dark:text-slate-200 p-6 md:p-10">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <FiGlobe className="text-indigo-400 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight dark:text-white">
              Direktori <span className="text-indigo-500">Sekolah</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Manajemen Tenant & Multi-School Ecosystem</p>
        </div>

        <button onClick={() => router.push('/sss/schools/add')} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase italic transition-all shadow-lg shadow-indigo-600/20">
          <FiPlus className="text-lg" /> Daftarkan Sekolah Baru
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Cari nama sekolah, ID, atau wilayah..."
            className="w-full bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-medium"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-xs font-black uppercase italic hover:bg-white/10 transition-all">
          <FiFilter /> Filter
        </button>
      </div>

      {/* SCHOOL TABLE */}
      <div className="bg-white/5 border border-slate-300 dark:border-white/10  rounded-4xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="px-6 py-5 text-[10px] font-black uppercase italic tracking-widest text-slate-500">Info Sekolah</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase italic tracking-widest text-slate-500">Wilayah</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase italic tracking-widest text-slate-500">Paket & Siswa</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase italic tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase italic tracking-widest text-slate-500 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-white/5 divide-gray-700">
              {schools.map((school, index) => (
                <tr key={index} className="group hover:bg-white/2 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center text-indigo-400 font-black text-sm border border-indigo-500/10 group-hover:border-indigo-500/40 transition-all">
                        <img src={school.avatar} alt={school.name} className='h-full w-full object-cover rounded-full' />
                      </div>
                      <div>
                        <h4 className="text-sm font-black  uppercase italic leading-none">{school.name}</h4>
                        <p className="text-[10px] text-slate-500 mt-2 font-bold flex items-center gap-1 uppercase tracking-tighter">
                          <FiGlobe size={10} /> {school.domain}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 ">
                      <FiMapPin className="text-slate-500" size={14} />
                      <span className="text-xs font-bold uppercase italic">{school.address?.province}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className={`text-[10px] font-black uppercase italic px-2 py-0.5 rounded-full w-fit ${school.plan === 'Enterprise' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        school.plan === 'Premium' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}>
                        {school.plan}
                      </span>
                      <span className="text-xs font-bold text-slate-400 mt-1">1233 Siswa</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      {/* Indikator Titik (Dot) */}
                      <div className={`relative w-2 h-2 rounded-full ${school.isActive
                        ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                        : 'bg-slate-400 dark:bg-slate-600'
                        }`}>
                        {/* Efek Ping (Hanya muncul jika Active) */}
                        {school.isActive && (
                          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                        )}
                      </div>

                      {/* Label Teks */}
                      <span className={`text-[10px] font-black uppercase tracking-tighter italic ${school.isActive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-500 dark:text-slate-500'
                        }`}>
                        {school.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-600 mt-1 uppercase font-bold tracking-tighter italic">Created : <span className="text-xs  text-slate-700 dark:text-slate-300 italic">
                      {new Date(school.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span></p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* IMPERSONATE BUTTON */}
                      <button
                        title="Impersonate (Masuk sebagai Admin)"
                        className="p-3 bg-indigo-500/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl transition-all group/btn"
                      >
                        <FiShield size={16} />
                      </button>

                      <button
                        title="Detail Sekolah"
                        onClick={() => handleGoToDetail(school)}
                        className="p-3 bg-white/5 dark:hover:bg-white/10 hover:bg-gray-600 text-slate-400 hover:text-white rounded-xl transition-all"
                      >
                        <FiEye size={16} />
                      </button>


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION INFO */}
        <div className="p-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black  uppercase italic tracking-widest">
            Menampilkan 5 dari 1,284 Sekolah Terdaftar
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase italic text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">Prev</button>
            <button className="px-4 py-2 bg-indigo-600 border border-indigo-500 rounded-xl text-[10px] font-black uppercase italic text-white transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* QUICK INSIGHTS FOOTER */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
          <FiCheckCircle className="text-emerald-500 text-2xl" />
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase italic">SLA Status</p>
            <p className="text-sm font-black dark:text-white text-blue-600 uppercase italic">99.9% Up-time</p>
          </div>
        </div>
        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-4">
          <FiAlertCircle className="text-amber-500 text-2xl" />
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase italic">Lisensi Expiring</p>
            <p className="text-sm font-black dark:text-white text-blue-600 uppercase italic">12 Sekolah (30 Hari)</p>
          </div>
        </div>
        <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-4">
          <FiCreditCard className="text-indigo-500 text-2xl" />
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase italic">Avg. ARPU</p>
            <p className="text-sm font-black dark:text-white text-blue-600 uppercase italic">Rp 4.5M / Sekolah</p>
          </div>
        </div>
      </div>

    </div>
  );
};
