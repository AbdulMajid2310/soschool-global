"use client";

import StudyMaterialDetail from "@/components/school_study_materials/StudyMaterialDetail";
import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function DetailPage() {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <ButtonBackUI />
        <button
          onClick={() => router.push("./update")}
          title="Edit Materi"
          aria-label="Edit Materi Pembelajaran"
          className="p-3 bg-white flex gap-3 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-xl transition-all shadow-sm active:scale-95"
        >
          <HiOutlinePencilAlt size={20} />
          <span className="hidden lg:inline">Edit Data</span>
        </button>
      </div>
      <StudyMaterialDetail />
    </div>
  );
}
