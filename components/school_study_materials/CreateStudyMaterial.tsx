"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createStudyMaterial } from "@/redux/features/school_study_material/thunks";
import { fetchAiMaterialDescription } from "@/redux/features/artificial-intelligence/thunk";
import {
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiSparkles,
  HiOutlineBookOpen,
  HiOutlineTrash,
} from "react-icons/hi";
import toast from "react-hot-toast";

const CreateStudyMaterial = () => {
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const subjectId = sessionStorage.getItem("subjectId");
  const classroomConfigId = sessionStorage.getItem("classroomConfigId");

  const { isSubmitting } = useAppSelector((state) => state.schoolStudyMaterial);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const { currentTeacherProfile } = useAppSelector((state) => state.teacher);
  const { loading: aiLoading } = useAppSelector(
    (state) => state.artificialIntelligence,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId: "",
  });

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (currentTeacherProfile) {
      setFormData((prev) => ({
        ...prev,
        authorId: currentTeacherProfile.teacherId,
      }));
    }
  }, [currentTeacherProfile]);

  useEffect(() => {
    adjustHeight();
  }, [formData.description]);

  const handleAiGenerate = async () => {
    if (!formData.title) return toast.error("Judul wajib diisi");
    try {
      const result = await dispatch(
        fetchAiMaterialDescription({ title: formData.title }),
      ).unwrap();
      setFormData((prev) => ({ ...prev, description: result }));
      toast.success("Deskripsi berhasil dibuat oleh AI");
    } catch (err: any) {
      toast.error("AI gagal merespon");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Silakan unggah file materi");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("authorId", formData.authorId);
    data.append("subjectId", subjectId || "");
    data.append("periodId", activePeriod?.periodId || "");
    if (classroomConfigId) data.append("classroomConfigId", classroomConfigId);
    data.append("file", selectedFile);

    try {
      await dispatch(createStudyMaterial(data)).unwrap();
      toast.success("Materi berhasil diterbitkan");
      resetForm();
    } catch (err: any) {
      toast.error("Gagal menerbitkan materi");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      authorId: currentTeacherProfile?.teacherId || "",
    });
    setSelectedFile(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300">
      <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <HiOutlineBookOpen size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Tambah Materi
            </h3>
            <div className="flex items-center mt-1">
              <span className="flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 uppercase tracking-wider">
                <HiSparkles className="mr-1" size={12} /> AI Enabled
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
          >
            Reset
          </button>
          <button
            type="submit"
            form="material-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Proses...
              </>
            ) : (
              "Terbitkan Materi"
            )}
          </button>
        </div>
      </div>

      <form id="material-form" onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Judul Materi
              </label>
              <input
                required
                className="w-full px-4 py-3 capitalize rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm transition-all"
                placeholder="Buat Judul Materi..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Deskripsi Singkat
                </label>
                <button
                  type="button"
                  onClick={handleAiGenerate}
                  disabled={aiLoading || !formData.title}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 transition-all disabled:opacity-40"
                >
                  <HiSparkles className={aiLoading ? "animate-spin" : ""} />
                  {aiLoading ? "AI Sedang Menulis..." : "Generate dengan AI"}
                </button>
              </div>
              <textarea
                ref={textareaRef}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm min-h-35 resize-none transition-all overflow-hidden"
                placeholder="Jelaskan apa yang akan dipelajari siswa..."
                value={formData.description}
                rows={1}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="lg:col-span-5 h-full">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 block">
              File Sumber (PDF)
            </label>
            <div
              className={`group relative min-h-70 h-full rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 ${
                selectedFile
                  ? "border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-indigo-400"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${
                  selectedFile
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
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
                  htmlFor="file-upload"
                  className="cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  {selectedFile ? "Ganti Dokumen" : "Pilih File PDF"}
                </label>
                <p className="mt-1 text-xs text-slate-400 font-medium max-w-50 truncate">
                  {selectedFile
                    ? selectedFile.name
                    : "Klik atau seret file ke sini"}
                </p>
                {!selectedFile && (
                  <p className="mt-1 text-[10px] text-slate-400/80 italic">
                    Maksimal ukuran file 10MB
                  </p>
                )}
              </div>

              {selectedFile && (
                <button
                  title="hapus"
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 text-rose-500 rounded-full hover:bg-rose-500 hover:text-white transition-all shadow-md border border-slate-100 dark:border-slate-700"
                >
                  <HiOutlineTrash size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateStudyMaterial;
