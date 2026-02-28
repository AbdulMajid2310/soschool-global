"use client"

import ListTeacherSection from "@/components/teacher/listTeacher";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaUserPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function StaffPage() {
    const router = useRouter()
    return (
        <div>
            <div className="flex justify-between">

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
                <button
                    onClick={() => router.push("teacher/add")}
                    className="group relative flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold tracking-tight shadow-[0_10px_25px_-5px_rgba(79,70,229,0.4)] dark:shadow-none transition-all duration-300 active:scale-95 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    <FaUserPlus className="text-xl stroke-[3px] transition-transform duration-300" />

                </button>
            </div>
            <div>
                <ListTeacherSection />
            </div>
        </div>
    )
}