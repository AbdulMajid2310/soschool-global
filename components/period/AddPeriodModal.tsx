"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { createPeriod } from "@/redux/features/school-period/thunk";
import { toast } from "react-hot-toast";

interface AddPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolId: string;
}

export const AddPeriodModal = ({
  isOpen,
  onClose,
  schoolId,
}: AddPeriodModalProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    academicYear: "",
    semester: "GANJIL",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(createPeriod({ ...formData, schoolId })).unwrap();
      toast.success("Periode baru berhasil dibuat!");
      setFormData({ academicYear: "", semester: "GANJIL" });
      onClose();
    } catch (err: any) {
      toast.error(err || "Gagal membuat periode");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-[2.5rem] p-10 relative animate-in zoom-in-95">
        <h2 className="text-2xl font-black mb-6 dark:text-white italic">
          Tambah Periode
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Tahun Akademik
            </label>
            <input
              required
              placeholder="2025/2026"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold"
              value={formData.academicYear}
              onChange={(e) =>
                setFormData({ ...formData, academicYear: e.target.value })
              }
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Semester
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl">
              {["GANJIL", "GENAP"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, semester: s as any })
                  }
                  className={`py-3 rounded-xl font-black text-xs transition-all ${
                    formData.semester === s
                      ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm"
                      : "text-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Buat Periode"}
          </button>
        </form>
      </div>
    </div>
  );
};
