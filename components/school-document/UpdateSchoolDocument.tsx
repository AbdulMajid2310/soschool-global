"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import toast from "react-hot-toast";
import { resetSchoolDocument } from "@/redux/features/school-documents/slices";
import { MdDocumentScanner } from "react-icons/md";
import { updateDoc } from "@/redux/features/school-documents/thunks";

const CATEGORIES = ["MOU", "Legalitas", "Akreditasi", "Lainnya"];

const UpdateSchoolDocument = () => {
  const params = useParams();
  const docId = params?.id as string;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { documents, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.schoolDocuments,
  );
  const { profile } = useAppSelector((state) => state.auth);
  const userId = profile?.user.userId;

  const [input, setInput] = useState({
    title: "",
    refNumber: "",
    category: "",
    file: null as File | null,
    isOpen: false,
  });

  useEffect(() => {
    if (docId && documents.length > 0) {
      const doc = documents.find((d) => d.schoolDocumentId === docId);
      if (doc) {
        setInput((prev) => ({
          ...prev,
          title: doc.title,
          refNumber: doc.refNumber || "",
          category: doc.category,
        }));
      }
    }
  }, [docId, documents]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Dokumen berhasil diperbarui");
      dispatch(resetSchoolDocument());
      router.back();
    }
    if (isError) {
      toast.error(message || "Gagal memperbarui dokumen");
      dispatch(resetSchoolDocument());
    }
  }, [isSuccess, isError, message, dispatch, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !schoolId || !docId)
      return toast.error("Data tidak lengkap");

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("refNumber", input.refNumber);
    formData.append("category", input.category);
    formData.append("schoolId", schoolId);
    formData.append("userId", userId);

    if (input.file) {
      formData.append("file", input.file);
    }

    // Gunakan id dan formData sesuai kontrak updateDoc lu
    dispatch(updateDoc({ id: docId, formData }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-10 group">
        <div className="relative p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
          <MdDocumentScanner size={22} />
        </div>
        <div className="flex flex-col -space-y-1">
          <h1 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
            Update{" "}
            <span className="text-blue-600 dark:text-blue-500">Dokumen</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Perbarui Informasi Berkas Sekolah
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-white dark:bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Judul Dokumen
              </label>
              <input
                title="nama berkas"
                type="text"
                required
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Nomor Ref / SK
              </label>
              <input
                title="nomer berkas"
                type="text"
                value={input.refNumber}
                onChange={(e) =>
                  setInput({ ...input, refNumber: e.target.value })
                }
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Kategori Berkas
              </label>
              <button
                type="button"
                onClick={() => setInput({ ...input, isOpen: !input.isOpen })}
                className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center hover:border-blue-400 transition-all"
              >
                <span
                  className={`text-sm font-medium ${input.category ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                >
                  {input.category || "Pilih Kategori"}
                </span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${input.isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {input.isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setInput({ ...input, category: cat, isOpen: false })
                      }
                      className="w-full text-left p-3.5 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Ganti Berkas (Opsional)
              </label>
              <div className="relative group">
                <input
                  title="upload"
                  type="file"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      file: e.target.files ? e.target.files[0] : null,
                    })
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full p-3.5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-center group-hover:border-blue-500 transition-all">
                  <span className="text-[11px] font-bold text-slate-500 truncate block px-2">
                    {input.file ? input.file.name : "Klik untuk ganti file"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black uppercase italic text-xs tracking-widest shadow-xl shadow-blue-600/30 disabled:opacity-50 transition-all active:scale-95"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiSave size={18} /> Simpan Perubahan
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateSchoolDocument;
