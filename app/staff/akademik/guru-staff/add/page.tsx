"use client";

import AddTeacher from "@/components/teacher/addTeacher";
import { HiOutlineUserPlus, HiOutlineChevronLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function CreateTeacherPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 lg:p-8  bg-transparent animate-in fade-in duration-500">
      
      {/* Top Navigation & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 lg:mb-12">
        
        {/* Header Section */}
        <div className="flex items-center lg:gap-6 gap-3">
          <div className="relative">
             {/* Button Kembali */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 self-start md:self-center lg:px-6 px-4 py-2 lg:py-3 bg-white dark:bg-gray-900 text-slate-600 dark:text-gray-300 border border-slate-100 dark:border-gray-800 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
        >
          <div className="p-1.5 bg-slate-100 dark:bg-gray-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 rounded-lg transition-colors">
            <HiOutlineChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
        </button>
            {/* Dekorasi Aksen */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-400 rounded-full border-4 border-white dark:border-gray-950"></div>
          </div>
          
          <div>
            <div className="flex items-center gap-2">
               <h1 className="lg:text-3xl text-lg font-black text-slate-900 dark:text-white tracking-tight italic">
                Registrasi Guru
              </h1>
            </div>
            <p className="text-slate-500 dark:text-gray-400 font-medium text-sm md:text-base">
              Tambahkan personel akademik baru ke <span className="text-indigo-600 dark:text-indigo-400 font-bold underline decoration-indigo-200 underline-offset-4">SoSchool</span>
            </p>
          </div>
        </div>

       
      </div>

      {/* Form Container */}
      <div className="relative">
        {/* Efek Glow di Background (Opsional) */}
        <div className="absolute -top-24 -left-24 w-96 pb-10 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
        
        <AddTeacher />
      </div>
      
    </div>
  );
}