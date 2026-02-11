"use client";

import CreateStudentPage from "@/components/student/addStudent";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function AddStudentPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-8">
      {/* Header Section dengan Tombol Kembali */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm cursor-pointer"
            title="Kembali"
          >
            <FaChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tambah Siswa
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Isi formulir di bawah untuk mendaftarkan siswa baru.
            </p>
          </div>
        </div>

      
      </div>

      {/* Komponen Form Utama */}
      <div className="">
         <CreateStudentPage />
      </div>
    </div>
  );
}