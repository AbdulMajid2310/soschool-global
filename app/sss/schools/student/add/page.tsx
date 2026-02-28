
"use client"

import CreateStudentSection from "@/components/student/add/createdStudentSection";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function CreatedStudentPage() {
    const router = useRouter()
    return (
        <div>
            <button
                onClick={() => router.back()}
                className="group flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-all duration-300"
            >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                    <FaChevronLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
                </div>
                <span className="text-xl font-black uppercase italic tracking-tighter">
                    Kembali
                </span>
            </button>
            <div>
                <CreateStudentSection />
            </div>
        </div>
    )
}