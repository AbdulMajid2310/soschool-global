"use client";

import PromotionWizard from "@/components/classroom-student/PromotionWizard";
import { useRouter } from "next/navigation";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function PromotionPage() {
  const router = useRouter();
  return (
    <div>
      <div>
        <button
          type="button"
          title="kembali"
          onClick={() => router.back()}
          className="group flex gap-2 uppercase p-4 py-2 mb-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all active:scale-95"
        >
          <HiOutlineChevronLeft
            size={22}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm italic font-black">Kembali</span>
        </button>
      </div>
      <PromotionWizard />
    </div>
  );
}
