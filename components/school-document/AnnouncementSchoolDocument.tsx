"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { FiInfo, FiAlertCircle } from "react-icons/fi";
import { fetchDocumentById } from "@/redux/features/school-documents/thunks";

export default function AnnouncementSchoolDocument() {
  const dispatch = useAppDispatch();
  const { document, isLoading } = useAppSelector(
    (state) => state.schoolDocuments,
  );

  const schoolDocumentId =
    typeof window !== "undefined" ? sessionStorage.getItem("id") : null;

  useEffect(() => {
    if (
      schoolDocumentId &&
      (!document || document.schoolDocumentId !== schoolDocumentId)
    ) {
      dispatch(fetchDocumentById(schoolDocumentId));
    }
  }, [dispatch, schoolDocumentId, document]);

  if (isLoading) {
    return (
      <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl animate-pulse">
        <div className="h-2 bg-emerald-500/20 rounded w-1/2 mb-2" />
        <div className="h-2 bg-emerald-500/10 rounded w-full" />
      </div>
    );
  }

  // 2. Jika ID tidak ada atau data pengumuman kosong
  if (!schoolDocumentId || !document?.announcement) {
    return (
      <div className="bg-slate-500/5 border border-slate-500/10 p-6 rounded-3xl flex items-start gap-3">
        <FiAlertCircle className="text-slate-500 mt-1 shrink-0" />
        <p className="text-[10px] text-slate-500 font-medium italic">
          Belum ada catatan atau instruksi tambahan untuk dokumen ini.
        </p>
      </div>
    );
  }

  // 3. Tampilan jika data ada
  return (
    <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-3xl space-y-4 transition-all duration-300 shadow-sm shadow-emerald-500/5">
      <div className="h-px bg-emerald-500/10 w-full my-2" />
      <div className="flex items-start gap-3">
        <FiInfo className="text-emerald-500 mt-1 shrink-0" />
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 block">
            Catatan Auditor
          </span>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
            "{document.announcement}"
          </p>
        </div>
      </div>
    </div>
  );
}
