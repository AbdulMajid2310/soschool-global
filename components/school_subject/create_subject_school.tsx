"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBulkSubject } from "@/redux/features/school_subject/thunks";
import { useSchoolId } from "@/hooks/useSchoolId";
import {
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiChevronDown,
  HiOutlineBookOpen,
  HiOutlineHashtag,
} from "react-icons/hi2";
import { toast } from "react-hot-toast";

// --- Custom Dropdown Component ---
const CustomDropdown = ({ label, value, options, onChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5 flex-1 relative" ref={dropdownRef}>
      <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 italic">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none text-sm font-bold transition-all dark:text-white shadow-sm"
      >
        <span className="truncate">{value}</span>
        <HiChevronDown
          className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt: string) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-5 py-3.5 text-sm font-bold transition-colors dark:text-slate-200 hover:bg-blue-600 hover:text-white ${
                  value.toString() === opt.toString()
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                    : ""
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
interface SubjectRow {
  name: string;
  code: string;
  category: string;
  sks: string;
  schoolClassroomId?: string;
  description?: string;
  targetLevel: string;
}

const BulkSubjectGridInput = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emptyRow: SubjectRow = {
    name: "",
    code: "",
    category: "WAJIB",
    sks: "2",
    schoolClassroomId: "",
    description: "",
    targetLevel: "10",
  };

  const [rows, setRows] = useState<SubjectRow[]>([{ ...emptyRow }]);

  // Generate Options Level 1 - 12
  const levelOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const handleInputChange = (
    index: number,
    field: keyof SubjectRow,
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, { ...emptyRow }]);
  const removeRow = (index: number) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!schoolId) return toast.error("School ID tidak ditemukan");
    if (!activePeriod?.periodId)
      return toast.error("Periode akademik aktif tidak ditemukan");

    const filledRows = rows.filter(
      (r) => r.name.trim() !== "" && r.code.trim() !== "",
    );
    if (filledRows.length === 0)
      return toast.error("Isi minimal satu mata pelajaran!");

    setIsSubmitting(true);
    const loadingToast = toast.loading("Syncing engine data...");

    try {
      const payload = {
        schoolId,
        periodId: activePeriod.periodId,
        subjects: filledRows.map((r) => ({
          ...r,
          schoolClassroomId: r.schoolClassroomId || undefined,
        })),
      };
      await dispatch(createBulkSubject(payload)).unwrap();
      toast.success("Batch Subject berhasil diterbitkan", { id: loadingToast });
      setRows([{ ...emptyRow }]);
    } catch (err: any) {
      toast.error(err || "Gagal sinkronisasi", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-10  min-h-screen transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 italic">
              Academic Core
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
            Subject <span className="text-blue-600">Batch.</span>
          </h2>
        </div>

        <button
          onClick={addRow}
          className="group w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-all font-black text-[11px] tracking-widest uppercase shadow-xl shadow-blue-500/30 active:scale-95"
        >
          <HiOutlinePlus size={20} strokeWidth={3} /> Tambah Baris
        </button>
      </div>

      {/* Rows */}
      <div className="space-y-8 w-full">
        {rows.map((row, index) => (
          <div
            key={index}
            className="group relative w-full flex flex-col  gap-6 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-transparent hover:border-blue-600/20 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all animate-in slide-in-from-bottom-4 duration-500"
          >
            {/* Index Counter */}
            <div className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xs font-black italic shadow-2xl z-10 border-4 border-white dark:border-slate-900  md:flex">
              {index + 1}
            </div>

            {/* Field: Identity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 italic flex items-center gap-1">
                  <HiOutlineBookOpen /> Nama Pelajaran
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none text-sm font-bold transition-all dark:text-white shadow-inner"
                  placeholder="e.g. Quantum Physics"
                  value={row.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1 italic flex items-center gap-1">
                  <HiOutlineHashtag /> Kode Unik MAjid
                </label>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none text-sm font-bold transition-all dark:text-white shadow-inner"
                  placeholder="PHS-101"
                  value={row.code}
                  onChange={(e) =>
                    handleInputChange(index, "code", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Field: Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomDropdown
                label="Level / Tingkat"
                value={`Level ${row.targetLevel}`}
                options={levelOptions}
                onChange={(val: string) =>
                  handleInputChange(index, "targetLevel", val)
                }
              />

              <CustomDropdown
                label="SKS"
                value={`${row.sks} SKS`}
                options={["1", "2", "3", "4", "6"]}
                onChange={(val: string) => handleInputChange(index, "sks", val)}
              />

              <CustomDropdown
                label="Kategori"
                value={row.category}
                options={["WAJIB", "PEMINATAN", "MULOK", "EKSTRA"]}
                onChange={(val: string) =>
                  handleInputChange(index, "category", val)
                }
              />
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4">
              <button
                title="hapus"
                onClick={() => removeRow(index)}
                disabled={rows.length === 1}
                className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all disabled:opacity-20"
              >
                <HiOutlineTrash size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col md:flex-row justify-end items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <button
          className="text-slate-400 hover:text-slate-800 dark:hover:text-white font-black text-[11px] uppercase tracking-[0.3em] italic transition-all"
          onClick={() => setRows([{ ...emptyRow }])}
        >
          Reset Batch.
        </button>
        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full md:w-auto flex items-center justify-center gap-4 px-16 py-6 bg-slate-900 dark:bg-blue-600 text-white rounded-4xl font-black text-[12px] tracking-[0.4em] uppercase hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Syncing...
            </div>
          ) : (
            <>
              <HiOutlineCloudArrowUp size={24} />
              Publish Schedulling
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BulkSubjectGridInput;
