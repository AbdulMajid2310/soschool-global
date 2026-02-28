"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft, FiEdit3, FiGlobe, FiMail, FiPhone,
  FiCalendar, FiAward, FiUsers, FiBookOpen, FiUserCheck,
  FiTrash2, FiMapPin, FiCpu, FiExternalLink
} from "react-icons/fi";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSchoolById } from "@/redux/features/school/thunk";
import { FaChalkboardTeacher, FaMapMarkedAlt, FaPlus } from "react-icons/fa";
import StatCard from "./StatsCard";



export default function SchoolDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const schoolId = sessionStorage.getItem("schoolId");
  const { selectedSchool, loading, error } = useAppSelector(
    (state: RootState) => state.school
  );

  if (!schoolId) {
    router.replace("/sss/schools"); // Tendang balik ke list jika ID hilang
  }

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolById(schoolId));
    }
  }, [dispatch, schoolId]);

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus sekolah ini? Data tidak dapat dikembalikan.")) {
      console.log("Menghapus sekolah:", selectedSchool?.schoolId);
      // Logic delete di sini
    }
  };



  return (
    <div className="min-h-screen  text-gray-700 dark:text-white ">
      <div className="max-w-6xl mx-auto">

        {/* Top Navigation & Actions */}
        <div className="flex  md:items-center justify-between gap-6 mb-10">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-slate-500 hover:text-blue-600 font-bold transition-all w-fit"
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-md">
              <FiArrowLeft className="w-5 h-5" />
            </div>
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-5 py-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl font-bold text-red-600 hover:bg-red-100 transition-all shadow-sm"
            >
              <FiTrash2 />
              <span className="hidden md:inline">Hapus Sekolah</span>
            </button>

            <button onClick={() => router.push('/sss/schools/edit')} className="flex items-center gap-2 px-5 sm:px-8  py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-600 dark:hover:text-white transition-all shadow-xl shadow-slate-200 dark:shadow-none">
              <FiEdit3 />
              <span className="hidden sm:inline">Edit Profil</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mb-32 group">
          {/* Banner - Dibuat lebih sinematik */}
          <div className="h-64 md:h-100 w-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative">
            <img
              src={selectedSchool?.background || "/images/background-school.png"}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              alt="Banner"
            />
            {/* Overlay Gradient: lebih gelap di bawah agar teks putih terbaca jelas */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          </div>

          {/* Profile Overlay */}
          <div className="absolute -bottom-4 left-4 right-4 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end gap-6">

            {/* Avatar - Menggunakan shadow indigo tipis agar terlihat premium */}
            <div className="relative sm:shrink-0 group/avatar">
              <div className="h-24 w-24 md:h-48 md:w-48 rounded-full md:rounded-[56px] bg-white dark:bg-slate-900 border-[6px] md:border-8 border-[#f8fafc] dark:border-[#020617] overflow-hidden shadow-2xl relative z-10">
                <img src={selectedSchool?.avatar} className="w-full h-full object-cover" alt="Logo" />
              </div>
              {/* Efek Glow di belakang avatar */}
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
            </div>

            {/* School Info Area */}
            <div className="flex-1 mb-1 md:mb-6">
              <div className="flex flex-col items-start gap-2">
                {/* Badge Plan - Glassmorphism style */}
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                  {selectedSchool?.plan || 'Standard'} Edition
                </span>

                {/* School Name - Diperbaiki agar tidak terpotong (line-clamp) tapi tetap besar */}
                <h1 className="text-xl md:text-6xl font-black text-white italic drop-shadow-2xl tracking-tighter leading-tight">
                  {selectedSchool?.name}
                </h1>

                {/* Meta Info (Domain & Location) */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2  font-bold italic text-white/80">
                  <a
                    href={`https://${selectedSchool?.domain}`}
                    target="_blank"
                    className="flex items-center text-sm gap-2 hover:text-white transition-colors group/link"
                  >
                    <FiGlobe className="text-blue-400 group-hover/link:animate-spin-slow" />
                    <span className="underline underline-offset-4 decoration-blue-500/40">{selectedSchool?.domain}</span>
                  </a>

                  <div className="flex items-center gap-2 text-sm bg-black/20 md:bg-transparent px-3 py-1 md:px-0 rounded-full backdrop-blur-sm md:backdrop-blur-none">
                    <FiMapPin className="text-rose-500" />
                    <span>{selectedSchool?.address?.city || 'Lokasi belum diatur'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">

          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
              <StatCard icon={<FiUsers />} label="Siswa" value={'2999'} color="text-blue-500" href={'/sss/schools/student'} />
              <StatCard icon={<FiUserCheck />} label="Guru" value={'300'} color="text-purple-500" href={'/sss/schools/teacher'} />
              <StatCard icon={<FaChalkboardTeacher />} label="staff" value={'300'} color="text-purple-500" href={'/sss/schools/staff'} />
              <StatCard icon={<FiBookOpen />} label="Kelas" value={'12'} color="text-emerald-500" href={'/sss/schools/classroom-config'} />
            </div>

            {/* Information Card */}
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiAward size={120} />
              </div>

              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-10 flex items-center gap-3">
                <div className="h-px w-8 bg-slate-200" /> Detail Institusi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <InfoItem icon={<FiAward />} label="Akreditasi" value={selectedSchool?.accreditation} />
                <InfoItem icon={<FiCpu />} label="Kurikulum" value={'Merdeka'} />
                <InfoItem
                  icon={<FiCalendar />}
                  label="Tanggal Berdiri"
                  value={
                    selectedSchool?.establishedDate
                      ? new Date(selectedSchool.establishedDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                      : '-'
                  }
                />
                <InfoItem icon={<FiExternalLink />} label="Website" value={selectedSchool?.domain} isLink />
                <InfoItem icon={<FiMail />} label="Email Resmi" value={selectedSchool?.email} />
                <InfoItem icon={<FiPhone />} label="Kontak" value={selectedSchool?.phone} />
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  Alamat Fisik & Lokasi
                </p>

                {selectedSchool?.address ? (
                  // TAMPILAN JIKA ALAMAT ADA
                  <div className="space-y-4">
                    <div className="relative p-6 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-gray-700">
                      <p className="text-slate-600 dark:text-slate-300 text-md leading-relaxed italic">
                        &quot;{selectedSchool.address.street}, {selectedSchool.address.village}, {selectedSchool.address.district}, {selectedSchool.address.city}, {selectedSchool.address.province} - {selectedSchool.address.postalCode}&quot;
                      </p>


                    </div>
                  </div>
                ) : (
                  // TAMPILAN JIKA ALAMAT KOSONG (EMPTY STATE)
                  <div className="flex flex-col items-center justify-center p-8 bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl border border-dashed border-amber-200 dark:border-amber-900/30 text-center">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4">
                      <FaMapMarkedAlt className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      Alamat Belum Dikonfigurasi
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mb-6 max-w-70">
                      Instansi ini belum memiliki data lokasi fisik yang terdaftar di sistem SoSchool.
                    </p>

                    <button
                      onClick={() => router.push('/sss/schools/address/add')}
                      className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                      <FaPlus className="w-3 h-3" />
                      Lengkapi Alamat Sekarang
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* System Config Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-8">System Status</h3>

              <div className="space-y-4">
                <StatusRow label="Account Status" value="Active" isActive />
                <StatusRow label="Jenjang Pendidikan" value={selectedSchool?.level} />
                <StatusRow label="NISP / NPSN" value={selectedSchool?.nisp} />
                <StatusRow label="Storage Used" value="1.2 GB / 10 GB" />
              </div>

              <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Subscription</p>
                <p className="text-xl font-black italic mb-4">{selectedSchool?.plan} Edition</p>
                <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl font-bold text-sm transition-all">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


function InfoItem({ icon, label, value, isLink }: any) {
  return (
    <div className="flex items-center gap-4 space-y-2 group">
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
        {icon}
      </div>
      <div className="overflow-hidden">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{label}</p>
        <p className={`font-bold truncate ${isLink ? 'text-blue-600 underline cursor-pointer' : 'text-slate-700 dark:text-slate-200'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusRow({ label, value, isActive }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-4xl border border-slate-100 dark:border-slate-800/50">
      <span className="text-xs font-bold text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
        <span className={`text-xs font-black uppercase italic ${isActive ? 'text-emerald-600' : 'text-slate-700 dark:text-slate-300'}`}>
          {value}
        </span>
      </div>
    </div>
  );
}