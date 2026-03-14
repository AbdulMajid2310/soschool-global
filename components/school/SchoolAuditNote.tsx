"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateSchool } from "@/redux/features/school/thunk";
import { FiSave, FiLoader } from "react-icons/fi";

export default function SchoolAuditNote() {
  const dispatch = useAppDispatch();
  const { selectedSchool, loading } = useAppSelector((state) => state.school);

  const [note, setNote] = useState("");

  useEffect(() => {
    if (selectedSchool?.notifications) {
      setNote(selectedSchool.notifications);
    } else {
      setNote("");
    }
  }, [selectedSchool]);

  const handleSaveNote = () => {
    if (!selectedSchool?.schoolId) return;

    dispatch(
      updateSchool({
        id: selectedSchool.schoolId,
        data: { notifications: note },
      }),
    );
  };

  return (
    <div className="mt-6">
      <label className="text-[10px] font-black uppercase italic mb-2 flex justify-between items-center text-slate-500 dark:text-slate-400">
        Catatan Auditor (Internal)
        {selectedSchool?.notifications !== note && (
          <span className="text-emerald-500 lowercase font-medium animate-pulse">
            Ada perubahan yang belum disimpan
          </span>
        )}
      </label>

      <div className="relative">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-emerald-500/50 min-h-30 transition-all resize-none shadow-sm dark:shadow-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
          placeholder="Berikan alasan jika dokumen ditolak atau catatan tambahan..."
        />

        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            title="Simpan perubahan catatan"
            onClick={handleSaveNote}
            disabled={loading || selectedSchool?.notifications === note}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase italic rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
            Simpan Catatan
          </button>
        </div>
      </div>
    </div>
  );
}
