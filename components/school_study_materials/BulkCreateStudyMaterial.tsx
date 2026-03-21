"use client";

import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBulkStudyMaterial } from "@/redux/features/school_study_material/thunks"; // Pastikan thunk ini sudah ada
import { useParams } from "next/navigation";
import {
  HiOutlineCloudUpload,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlinePlus,
} from "react-icons/hi";
import toast from "react-hot-toast";

interface MaterialItem {
  title: string;
  description: string;
  file: File | null;
  authorId: string;
}

const BulkCreateStudyMaterial = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const subjectId = params.subjectId as string;
  const classroomConfigId = params.configId as string;

  const { isSubmitting } = useAppSelector((state) => state.schoolStudyMaterial);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const { teachers } = useAppSelector((state) => state.teacher);

  // State untuk menampung banyak baris materi
  const [items, setItems] = useState<MaterialItem[]>([
    { title: "", description: "", file: null, authorId: "" },
  ]);

  const addRow = () => {
    setItems([
      ...items,
      { title: "", description: "", file: null, authorId: "" },
    ]);
  };

  const removeRow = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof MaterialItem,
    value: any,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activePeriod?.periodId)
      return toast.error("Periode aktif tidak ditemukan");

    const formData = new FormData();

    // Loop items untuk dimasukkan ke FormData dengan format array NestJS
    items.forEach((item, index) => {
      if (!item.file)
        return toast.error(`File pada baris ${index + 1} belum dipilih`);
      if (!item.authorId)
        return toast.error(`Guru pada baris ${index + 1} belum dipilih`);

      // Mapping Data ke format DTO Array
      formData.append(`materials[${index}][title]`, item.title);
      formData.append(
        `materials[${index}][description]`,
        item.description || "",
      );
      formData.append(`materials[${index}][subjectId]`, subjectId);
      formData.append(`materials[${index}][authorId]`, item.authorId);
      formData.append(`materials[${index}][periodId]`, activePeriod.periodId);
      if (classroomConfigId) {
        formData.append(
          `materials[${index}][classroomConfigId]`,
          classroomConfigId,
        );
      }

      // Append File ke field 'files' (Sesuai FilesInterceptor('files'))
      formData.append("files", item.file);
    });

    try {
      await dispatch(createBulkStudyMaterial(formData)).unwrap();
      toast.success(`${items.length} Materi berhasil diterbitkan!`);
      setItems([{ title: "", description: "", file: null, authorId: "" }]); // Reset
    } catch (err: any) {
      toast.error(err?.message || "Gagal bulk upload");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#0a0f1d] md:rounded-[3rem] shadow-2xl border-t-8 border-blue-600 overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
        <div>
          <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">
            Bulk<span className="text-blue-600">.</span>Upload
          </h3>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">
            SoSchool Batch Material Processing
          </p>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-600 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
        >
          <HiOutlinePlus size={14} /> Add Row
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-4xl bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 relative group animate-in fade-in slide-in-from-bottom-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Info & Title */}
                <div className="md:col-span-4 space-y-3">
                  <input
                    required
                    placeholder="Judul Materi..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:border-blue-600 dark:text-white"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                  />
                  <select
                    title="guru"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:border-blue-600 dark:text-white appearance-none"
                    value={item.authorId}
                    onChange={(e) =>
                      handleInputChange(index, "authorId", e.target.value)
                    }
                  >
                    <option value="">Pilih Guru...</option>
                    {teachers.map((t) => (
                      <option key={t.teacherId} value={t.teacherId}>
                        {t.user?.username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <textarea
                    placeholder="Deskripsi singkat (opsional)..."
                    className="w-full h-full min-h-20 px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold outline-none focus:border-blue-600 dark:text-white resize-none"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </div>

                {/* File Upload Mini */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <input
                    type="file"
                    id={`file-${index}`}
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "file",
                        e.target.files?.[0] || null,
                      )
                    }
                  />
                  <label
                    htmlFor={`file-${index}`}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${item.file ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-slate-300 dark:border-slate-700 hover:border-blue-400"}`}
                  >
                    <HiOutlineCloudUpload
                      className={item.file ? "text-blue-600" : "text-slate-400"}
                      size={24}
                    />
                    <span className="text-[9px] font-black uppercase mt-1 text-center line-clamp-1 px-2">
                      {item.file ? item.file.name : "Choose PDF"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Remove Button */}
              {items.length > 1 && (
                <button
                  title="hapus"
                  type="button"
                  onClick={() => removeRow(index)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-all scale-0 group-hover:scale-100"
                >
                  <HiOutlineX size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div className="pt-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-blue-500/40 transition-all hover:-translate-y-1 disabled:opacity-50"
          >
            {isSubmitting
              ? "Uploading Batch..."
              : `Publish ${items.length} Materials Now`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BulkCreateStudyMaterial;
