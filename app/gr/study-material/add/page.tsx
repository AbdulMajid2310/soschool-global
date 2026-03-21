"use client";

import React, { useState } from "react";
import BulkCreateStudyMaterial from "@/components/school_study_materials/BulkCreateStudyMaterial";
import CreateStudyMaterial from "@/components/school_study_materials/CreateStudyMaterial";
import { HiOutlineDocumentAdd, HiOutlineCollection } from "react-icons/hi";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function AddPage() {
  const [isBulk, setIsBulk] = useState(false);

  return (
    <div className="p-4  space-y-4">
      {/* Switcher UI */}
      <div className="flex justify-between items-center">
        <ButtonBackUI />
        <div className="flex justify-center">
          <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-4xl flex items-center gap-1 shadow-inner border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsBulk(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                !isBulk
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <HiOutlineDocumentAdd size={16} />
              Single Upload
            </button>

            <button
              onClick={() => setIsBulk(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                isBulk
                  ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <HiOutlineCollection size={16} />
              Bulk Upload
            </button>
          </div>
        </div>
      </div>

      {/* Render Component dengan Animasi */}
      <div className="animate-in fade-in zoom-in-95 duration-500">
        {isBulk ? <BulkCreateStudyMaterial /> : <CreateStudyMaterial />}
      </div>

      {/* Info Helper */}
      <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">
        {isBulk
          ? "Processing multiple documents with AI Analysis"
          : "Single document publishing system"}
      </p>
    </div>
  );
}
