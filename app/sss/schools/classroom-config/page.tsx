"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineChevronLeft } from "react-icons/hi2";
import ClassroomConfigListSection from "@/components/classroom-config/page";

export default function ClassroomConfigPage() {
    const router = useRouter();

    return (
        <div className="space-y-3">
            {/* Navigation Button */}
            <div className="flex items-center">
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-500 hover:text-indigo-600 hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all active:scale-95"
                >
                    <HiOutlineChevronLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform duration-200"
                    />
                    <span className="text-sm font-black uppercase tracking-widest italic">
                        Kembali
                    </span>
                </button>
            </div>

            {/* List Section */}
            <div className=' p-4 pb-20 '>
                <ClassroomConfigListSection />
            </div>
        </div>
    );
}