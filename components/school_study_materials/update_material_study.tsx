"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateStudyMaterial } from "@/redux/features/school_study_material/thunks";
import { fetchAiMaterialDescription } from "@/redux/features/artificial-intelligence/thunk";
import {
  HiOutlinePencilAlt,
  HiOutlineX,
  HiOutlineUserCircle,
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiSparkles,
  HiOutlineTrash,
  HiChevronDown,
  HiOutlineBookOpen,
} from "react-icons/hi";
import toast from "react-hot-toast";

const UpdateStudyMaterial = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Global State
  const { selectedMaterial, isSubmitting } = useAppSelector(
    (state) => state.schoolStudyMaterial,
  );
  const { loading: aiLoading } = useAppSelector(
    (state) => state.artificialIntelligence,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId: "",
    fileUrl: "",
  });

  // Auto-resize textarea logic
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Sync data saat modal dibuka
  useEffect(() => {
    if (selectedMaterial) {
      setFormData({
        title: selectedMaterial.title,
        description: selectedMaterial.description || "",
        authorId: selectedMaterial.author?.teacherId || "",
        fileUrl: selectedMaterial.fileUrl || "",
      });
    }
  }, [selectedMaterial]);

  useEffect(() => {
    adjustHeight();
  }, [formData.description]);

  const handleAiGenerate = async () => {
    if (!formData.title) return toast.error("Judul wajib diisi untuk AI");
    try {
      const result = await dispatch(
        fetchAiMaterialDescription({ title: formData.title }),
      ).unwrap();
      setFormData((prev) => ({ ...prev, description: result }));
      toast.success("Deskripsi diperbarui oleh AI");
    } catch (err) {
      toast.error("AI gagal merespon");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterial) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("authorId", formData.authorId);

    if (selectedFile) {
      data.append("file", selectedFile);
    }

    try {
      await dispatch(
        updateStudyMaterial({
          id: selectedMaterial.studyMaterialId,
          formData: data,
        }),
      ).unwrap();

      toast.success("Materi berhasil diperbarui");

      setSelectedFile(null);
    } catch (err: any) {
      toast.error(err || "Gagal memperbarui materi");
    }
  };

  if (!selectedMaterial) return null;

  return (
    <div className=" w-full md:p-4 transition-all">
      <div className="w-full h-full md:h-auto bg-white dark:bg-slate-900 md:rounded-4xl shadow-2xl border-l-4 border-amber-500 animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden">
        {/* Header - Mengikuti Metode Add */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <HiOutlineBookOpen size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Update Materi
              </h3>
              <div className="flex items-center mt-1">
                <span className="flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 uppercase tracking-wider">
                  <HiSparkles className="mr-1" size={12} /> AI Enabled
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Kolom Kiri - Input Teks */}
            <div className="lg:col-span-7 space-y-6">
              {/* Judul Materi */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                  Judul Materi
                </label>
                <input
                  required
                  placeholder="Masukkan Judul..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm transition-all font-bold"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Deskripsi & AI */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Deskripsi
                  </label>
                  <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={aiLoading || !formData.title}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 transition-all disabled:opacity-40"
                  >
                    <HiSparkles className={aiLoading ? "animate-spin" : ""} />
                    {aiLoading ? "AI Menulis..." : "Generate AI"}
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  placeholder="Tulis deskripsi..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm min-h-24 resize-none transition-all overflow-hidden"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Kolom Kanan - File Section */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">
                Ganti File (PDF)
              </label>
              <div
                className={`flex-1 relative min-h-62.5] rounded-4xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 ${
                  selectedFile
                    ? "border-amber-500 bg-amber-50/30 dark:bg-amber-900/10"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-amber-400"
                }`}
              >
                <input
                  type="file"
                  id="edit-file-upload"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${
                    selectedFile
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
                      : "bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700"
                  }`}
                >
                  {selectedFile ? (
                    <HiOutlineDocumentText size={32} />
                  ) : (
                    <HiOutlineCloudUpload size={32} />
                  )}
                </div>

                <div className="text-center">
                  <label
                    htmlFor="edit-file-upload"
                    className="cursor-pointer text-sm font-bold text-amber-600 hover:text-amber-700"
                  >
                    {selectedFile ? "Ganti Dokumen" : "Pilih File Baru"}
                  </label>
                  <p className="mt-1 text-[10px] text-slate-400 font-medium max-w-37.5 truncate mx-auto">
                    {selectedFile
                      ? selectedFile.name
                      : "Biarkan kosong untuk tetap memakai file lama"}
                  </p>
                </div>

                {selectedFile && (
                  <button
                    title="Batal"
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700"
                  >
                    <HiOutlineTrash size={16} />
                  </button>
                )}
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-6 w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Update Materi Sekarang"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudyMaterial;
