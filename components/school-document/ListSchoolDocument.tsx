"use client";

import { useEffect } from "react";
import {
  FiFileText,
  FiEye,
  FiDownload,
  FiShield,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchDocuments,
  removeDocument,
} from "@/redux/features/school-documents/thunks";
import { useSchoolId } from "@/hooks/useSchoolId";
import SchoolAuditNote from "../school/SchoolAuditNote";
import AnnouncementSchoolDocument from "./AnnouncementSchoolDocument";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import ButtonAddNoTitle from "../ui/button/ButtonAddNoTitle";
import toast from "react-hot-toast";
import ButtonAction from "../ui/button/ButtonAction";
import { confirmActionToast } from "../toast/confirmActionToast";
import { useRouter } from "next/navigation";

export default function ListSchoolDocument() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const router = useRouter();
  console.log("schoolId", schoolId);

  const { documents, isLoading } = useAppSelector(
    (state) => state.schoolDocuments,
  );

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchDocuments({ schoolId }));
    }
  }, [dispatch, schoolId]);

  const handleView = (url: string) => {
    router.push("/view-document");
    sessionStorage.setItem("fileHash", url);
  };

  const handleDownload = (url: string, filename: string) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string, title: string) => {
    confirmActionToast({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus dokumen "${title}"? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Hapus Dokumen",
      variant: "danger",
      onConfirm: async () => {
        try {
          await dispatch(removeDocument(id)).unwrap();
          toast.success("Dokumen berhasil dihapus");
        } catch (error: any) {
          throw error;
        }
      },
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between bg-white/5 dark:bg-slate-900/40 p-4 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <FiFileText className="text-emerald-500 text-sm" />
              Dokumen Pendukung
              <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[9px]">
                {documents?.length || 0}
              </span>
            </h3>
            <div
              onClick={() => sessionStorage.setItem("schoolId", schoolId || "")}
            >
              <ButtonAddNoTitle
                icon={<HiOutlineDocumentPlus className="text-xl" />}
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="space-y-3">
                ,
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse border border-transparent dark:border-white/5"
                  />
                ))}
              </div>
            ) : documents && documents.length > 0 ? (
              documents.map((doc) => (
                <div
                  key={doc.schoolDocumentId}
                  className="flex flex-col relative sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-900/5 transition-all group gap-4 overflow-hidden"
                >
                  {/* KONTEN KIRI */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-xl text-emerald-600 dark:text-emerald-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FiFileText className="text-lg" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-black uppercase italic text-slate-800 dark:text-slate-100 truncate">
                        {doc.title}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-slate-400 truncate">
                          #{doc.refNumber || "Tanpa No. Ref"}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400/80 uppercase tracking-tighter">
                          {doc.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* TOMBOL AKSI (MUNCUL PAS HOVER) */}
                  <div className="sm:absolute sm:inset-y-0 sm:right-0 sm:pr-4 flex items-center justify-end w-full sm:w-auto">
                    <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-1 rounded-xl sm:p-0">
                      <button
                        type="button"
                        title="Lihat"
                        onClick={() => handleView(doc.fileUrl!)}
                        className="p-2 hover:bg-blue-500/10 rounded-xl text-slate-400 hover:text-blue-500 transition-all"
                      >
                        <FiEye className="text-lg" />
                      </button>

                      <button
                        type="button"
                        title="Download"
                        onClick={() => handleDownload(doc.fileUrl!, doc.title)}
                        className="p-2 hover:bg-emerald-500/10 rounded-xl text-slate-400 hover:text-emerald-500 transition-all"
                      >
                        <FiDownload className="text-lg" />
                      </button>

                      <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block" />

                      <ButtonAction
                        to={`edit`}
                        icon={<FiEdit3 />}
                        className="bg-amber-500 text-white shadow-amber-900/20"
                        onClick={() =>
                          sessionStorage.setItem("id", doc.schoolDocumentId)
                        }
                      />

                      <button
                        type="button"
                        title="Hapus"
                        onClick={() =>
                          handleDelete(doc.schoolDocumentId, doc.title)
                        }
                        className="p-2 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-500 transition-all"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2.5rem] text-center bg-slate-50/50 dark:bg-transparent">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  Belum ada dokumen yang diunggah
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-8">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 tracking-[0.2em] flex items-center gap-3">
              <FiShield className="text-emerald-500 text-sm" />
              Integrity Check
            </h3>

            <div className="space-y-6">
              <AnnouncementSchoolDocument />
              <div className="h-px bg-linear-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent w-full" />
              <SchoolAuditNote />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
