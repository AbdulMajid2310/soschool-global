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

const MOCK_SCHOOL = {
  id: "sch-9921",
  name: "SMA Negeri 1 Jakarta",
  nisp: "10293847",
  email: "info@sman1jkt.sch.id",
  phone: "+62 21 1234 5678",
  domain: "sman1jkt",
  level: "SLTA",
  plan: "Pro",
  accreditation: "A",
  establishedDate: "1960-08-17",
  isActive: true,
  avatar: "https://ui-avatars.com/api/?name=SMAN1&background=0D8ABC&color=fff&size=128",
  background: "https://images.unsplash.com/photo-1523050335312-0d0571050b44?q=80&w=2000",
  address: "Jl. Budi Utomo No.7, Sawah Besar, Jakarta Pusat",
  website: "https://sman1jkt.sch.id",
  curriculum: "Kurikulum Merdeka",
  stats: {
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 36
  }
};

export default function SchoolDetailPage() {
  const router = useRouter();
  const schoolData = MOCK_SCHOOL;
  const dispatch = useAppDispatch();
  const schoolId = sessionStorage.getItem("schoolId");
const { selectedSchool, loading, error } = useAppSelector(
    (state: RootState) => state.school
  );

  console.log("data id dari windows", schoolId)
  console.log('data dari redux', selectedSchool)

  
  if (!schoolId) {
   router.replace("/sss/schools"); // Tendang balik ke list jika ID hilang
}

useEffect(() => {
    // 3. Panggil API hanya jika schoolId ada
    if (schoolId) {
      dispatch(fetchSchoolById(schoolId));
    }
  }, [dispatch, schoolId]); // Re-run jika schoolId berubah
  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus sekolah ini? Data tidak dapat dikembalikan.")) {
      console.log("Menghapus sekolah:", schoolData.id);
      // Logic delete di sini
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
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
            
            <button  onClick={() => router.push('/sss/schools/edit')} className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-600 dark:hover:text-white transition-all shadow-xl shadow-slate-200 dark:shadow-none">
              <FiEdit3 />
              <span>Edit Profil</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mb-20">
          {/* Banner */}
          <div className="h-64 md:h-96 w-full rounded-4xl overflow-hidden shadow-2xl relative">
            <img src={selectedSchool?.background} className="w-full h-full object-cover" alt="Banner" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Profile Overlay */}
          <div className="absolute -bottom-12 left-6 right-6 md:left-12 md:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-6">
              <div className="h-32 w-32 md:h-44 md:w-44 rounded-[40px] bg-white dark:bg-slate-900 border-[6px] border-[#f8fafc] dark:border-[#020617] overflow-hidden shadow-2xl shrink-0">
                <img src={selectedSchool?.avatar} className="w-full h-full object-cover" alt="Logo" />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl md:text-5xl font-black text-white italic drop-shadow-xl tracking-tight">
                    {selectedSchool?.name}
                  </h1>
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-500/40">
                    {selectedSchool?.plan} Plan
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/90 font-bold italic">
                  <span className="flex items-center gap-2">
                    <FiGlobe className="text-blue-400" />
                    {selectedSchool?.domain}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-white/40 hidden md:block" />
                  <span className="hidden md:flex items-center gap-2">
                    <FiMapPin className="text-red-400" />
                    Jakarta, Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <StatCard icon={<FiUsers />} label="Siswa" value={schoolData.stats.totalStudents} color="text-blue-500" />
              <StatCard icon={<FiUserCheck />} label="Guru" value={schoolData.stats.totalTeachers} color="text-purple-500" />
              <StatCard icon={<FiBookOpen />} label="Kelas" value={schoolData.stats.totalClasses} color="text-emerald-500" />
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
                <InfoItem icon={<FiAward />} label="Akreditasi" value={schoolData.accreditation} />
                <InfoItem icon={<FiCpu />} label="Kurikulum" value={schoolData.curriculum} />
                <InfoItem icon={<FiCalendar />} label="Tanggal Berdiri" value={new Date(schoolData.establishedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                <InfoItem icon={<FiExternalLink />} label="Website" value={schoolData.website} isLink />
                <InfoItem icon={<FiMail />} label="Email Resmi" value={schoolData.email} />
                <InfoItem icon={<FiPhone />} label="Kontak" value={schoolData.phone} />
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Alamat Fisik</p>
                <p className="text-slate-600 dark:text-slate-300 font-bold text-lg leading-relaxed italic">
                  &quot;{schoolData.address}&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* System Config Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-[0.3em] mb-8">System Status</h3>
              
              <div className="space-y-4">
                <StatusRow label="Account Status" value="Active" isActive />
                <StatusRow label="Jenjang Pendidikan" value={schoolData.level} />
                <StatusRow label="NISP / NPSN" value={schoolData.nisp} />
                <StatusRow label="Storage Used" value="1.2 GB / 10 GB" />
              </div>

              <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Subscription</p>
                <p className="text-xl font-black italic mb-4">{schoolData.plan} Edition</p>
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

// Reusable Components dengan Tailwind v4 Style
function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300">
      <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 mb-4 ${color} group-hover:scale-110 transition-transform shadow-inner`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter">{value.toLocaleString()}</p>
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
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-[22px] border border-slate-100 dark:border-slate-800/50">
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