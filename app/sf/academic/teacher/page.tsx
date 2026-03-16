"use client";

import ListTeacherSection from "@/components/teacher/listTeacher";
import ButtonAddData from "@/components/ui/button/ButtonAddData";
import { useRouter } from "next/navigation";
import { BiAddToQueue } from "react-icons/bi";

export default function TeacherPage() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              Manajemen <span className="text-indigo-600">Guru</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
              Pusat Kendali Administrasi & Akses Tenaga Pengajar
            </p>
          </div>
        </div>
        <ButtonAddData
          label="Tambah Guru"
          icon={BiAddToQueue}
          onClick={() => router.push("/sf/academic/teacher/add")}
        />
      </div>
      <div>
        <ListTeacherSection />
      </div>
    </div>
  );
}
