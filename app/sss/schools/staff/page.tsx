"use client";

import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { useRouter } from "next/navigation";
import ButtonAddData from "@/components/ui/button/ButtonAddData";
import { BiAddToQueue } from "react-icons/bi";
import StaffSection from "@/components/staff/StaffSection";

export default function StaffPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-4 rounded-4xl border border-slate-200/60 dark:border-white/5 shadow-sm">
        <ButtonBackUI />

        <ButtonAddData
          label="Tambah Staff"
          icon={BiAddToQueue}
          onClick={() => router.push("/sss/schools/staff/add")}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
            Personalia <span className="text-indigo-600">Staff</span>
          </h1>
          <p className="text-gray-400 mt-2 font-bold flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className="w-8 h-1 bg-indigo-500 inline-block"></span>
            Manajemen Operasional Non-Akademik
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 p-2">
        <StaffSection />
      </div>
    </div>
  );
}
