'use client';

import ListStudentSchool from '@/components/student/listStudentSchool';
import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import { 
  FaGraduationCap, FaPlus,  FaFilter, 
  FaEllipsisVertical, FaUserCheck, FaUserClock, FaUsers 
} from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import {  HiOutlineIdentification } from 'react-icons/hi2';
import { MdOutlineSchool, MdOutlineClass } from 'react-icons/md';

// --- DATA STATIS ---
interface Student {
  id: string;
  nisn: string;
  name: string;
  school: string;
  level: string;
  class: string;
  email: string;
  status: 'Aktif' | 'Nonaktif' | 'Alumni';
  gender: 'L' | 'P';
}

const STATIC_STUDENTS: Student[] = [
  { id: '1', nisn: '0012345678', name: 'Majid Ikhwan', school: 'SMK Negeri 1 Karawang', level: 'SMK', class: 'XII RPL 1', email: 'majid@soschool.id', status: 'Aktif', gender: 'L' },
  { id: '2', nisn: '0023456789', name: 'Siti Rahmawati', school: 'SMA Negeri 2 Jakarta', level: 'SMA', class: 'XI IPA 4', email: 'siti.rahma@gmail.com', status: 'Aktif', gender: 'P' },
  { id: '3', nisn: '0034567890', name: 'Budi Hartanto', school: 'SMP Al-Azhar', level: 'SMP', class: 'IX B', email: 'budi.h@yahoo.com', status: 'Nonaktif', gender: 'L' },
  { id: '4', nisn: '0045678901', name: 'Alya Safira', school: 'SD Bina Bangsa', level: 'SD', class: 'VI A', email: 'alya.safira@outlook.com', status: 'Aktif', gender: 'P' },
  { id: '5', nisn: '0056789012', name: 'Dedi Kurniawan', school: 'SMK Negeri 1 Karawang', level: 'SMK', class: 'XII TKJ 2', email: 'dedi.k@soschool.id', status: 'Alumni', gender: 'L' },
];

export default function StudentSuperAdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState<Student[]>(STATIC_STUDENTS);

  // Filter sederhana berdasarkan search
  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.nisn.includes(searchTerm)
    );
  }, [searchTerm, students]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER & ACTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <FaGraduationCap className="text-white w-7 h-7" />
              </div>
              Data Siswa Nasional
            </h1>
            <p className="text-slate-500 dark:text-gray-400 mt-1 font-medium">
              Superadmin Dashboard &bull; Manajemen Data Terpusat SoSchool
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-xl">
            <FaPlus />
            Tambah Siswa
          </button>
        </div>

        {/* STATS CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FaUsers />} label="Total Siswa" value="1,240" color="bg-blue-500" />
          <StatCard icon={<FaUserCheck />} label="Siswa Aktif" value="1,192" color="bg-emerald-500" />
          <StatCard icon={<FaUserClock />} label="Pending" value="12" color="bg-amber-500" />
          <StatCard icon={<FaGraduationCap />} label="Alumni" value="36" color="bg-indigo-500" />
        </div>

        {/* TABLE SECTION */}
        <ListStudentSchool/>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-200 dark:border-gray-800 flex items-center gap-5 transition-transform hover:scale-[1.02]">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
