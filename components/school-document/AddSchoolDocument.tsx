"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiTrash2, FiSave, FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { createBulkDocs } from "@/redux/features/school-documents/thunks";
import toast from "react-hot-toast";
import { resetSchoolDocument } from "@/redux/features/school-documents/slices";
import { MdDocumentScanner, MdOutlineAddToPhotos } from "react-icons/md";

const CATEGORIES = ["MOU", "Legalitas", "Akreditasi", "Lainnya"];

const AddSchoolDocument = () => {
  const [inputs, setInputs] = useState([
    {
      title: "",
      refNumber: "",
      category: "",
      file: null as File | null,
      isOpen: false,
    },
  ]);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.schoolDocuments,
  );
  const { profile } = useAppSelector((state) => state.auth);
  const userId = profile?.user.userId;

  // Logic Validasi: Cek apakah ada field wajib yang kosong
  const isFormInvalid = inputs.some(
    (input) => !input.title.trim() || !input.category || !input.file,
  );

  const handleAddField = () => {
    setInputs([
      ...inputs,
      { title: "", refNumber: "", category: "", file: null, isOpen: false },
    ]);
  };

  const handleRemoveField = (index: number) => {
    if (inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  const toggleDropdown = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index].isOpen = !newInputs[index].isOpen;
    setInputs(newInputs);
  };

  const selectCategory = (index: number, cat: string) => {
    const newInputs = [...inputs];
    newInputs[index].category = cat;
    newInputs[index].isOpen = false;
    setInputs(newInputs);
  };

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newInputs = [...inputs];
    if (e.target.files) {
      newInputs[index].file = e.target.files[0];
    }
    setInputs(newInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !schoolId)
      return toast.error("Data User atau Sekolah tidak ditemukan");

    const formData = new FormData();
    const jsonData = inputs.map((item) => ({
      title: item.title,
      refNumber: item.refNumber,
      category: item.category,
      schoolId,
      userId,
    }));

    formData.append("data", JSON.stringify(jsonData));
    inputs.forEach((item) => {
      if (item.file) formData.append("file", item.file);
    });

    dispatch(createBulkDocs(formData));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 group">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
                  <MdDocumentScanner size={22} />
                </div>
              </div>
              <div className="flex flex-col -space-y-1">
                <h1 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">
                  Tambah{" "}
                  <span className="text-blue-600 dark:text-blue-500">
                    Dokumen
                  </span>
                </h1>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  Management System • Verifikasi Berkas
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddField}
          className="w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500 hover:border-blue-500 transition-all font-black uppercase italic text-[10px] tracking-widest bg-white dark:bg-transparent"
        >
          <MdOutlineAddToPhotos size={24} />{" "}
          <span className="hidden lg:inline">Tambah Item</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {inputs.map((input, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800/50 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
                Item #{index + 1}
              </span>
              {inputs.length > 1 && (
                <button
                  title="hapus"
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-all"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Judul
                </label>
                <input
                  type="text"
                  required
                  value={input.title}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[index].title = e.target.value;
                    setInputs(newInputs);
                  }}
                  placeholder="Judul Dokumen"
                  className="w-full p-3.5 capitalize rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Nomor Ref / SK
                </label>
                <input
                  type="text"
                  value={input.refNumber}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[index].refNumber = e.target.value;
                    setInputs(newInputs);
                  }}
                  placeholder="Contoh: 421.3/SK-2026"
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Kategori
                </label>
                <button
                  type="button"
                  onClick={() => toggleDropdown(index)}
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center hover:border-blue-400 transition-all"
                >
                  <span
                    className={`text-sm font-medium ${input.category ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                  >
                    {input.category || "Kategori"}
                  </span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${input.isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {input.isOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => selectCategory(index, cat)}
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
                  Berkas
                </label>
                <div className="relative group">
                  <input
                    title="upload"
                    type="file"
                    required
                    onChange={(e) => handleFileChange(index, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full p-3.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-center group-hover:border-blue-500 transition-all overflow-hidden">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate block">
                      {input.file ? input.file.name : "Pilih Berkas"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading || isFormInvalid}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl sm:rounded-3xl font-black uppercase italic text-xs tracking-widest shadow-xl shadow-blue-600/30 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiSave size={18} /> Simpan Semua Dokumen
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchoolDocument;
