"use client";

import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { useRouter } from "next/navigation";
import ButtonAddData from "@/components/ui/button/ButtonAddData";
import { BiAddToQueue } from "react-icons/bi";
import { ListParentSchoolModal } from "@/components/school-parents/ListParentSchoolModal";

export default function ParentPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-4xl border border-slate-200/60 dark:border-white/5 shadow-sm">
        <ButtonBackUI />

        <ButtonAddData
          label="Tambah Wali Murid"
          icon={BiAddToQueue}
          onClick={() => router.push("/sss/schools/parent/add")}
        />
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-800 dark:text-white tracking-tighter italic uppercase">
            Data <span className="text-indigo-600">Orang Tua</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
            Kelola wali murid dan relasi anak didik SoSchool
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 p-2">
        <ListParentSchoolModal />
      </div>
    </div>
  );
}
