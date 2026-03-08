"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updatePeriod } from "@/redux/features/school-period/thunk";
import { toast } from "react-hot-toast";
import { SchoolPeriod } from "@/redux/features/school-period/types";

interface UpdatePeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolId: string;
  initialData: SchoolPeriod | null;
}

export const UpdatePeriodModal = ({
  isOpen,
  onClose,
  schoolId,
  initialData,
}: UpdatePeriodModalProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    academicYear: "",
    semester: "GANJIL",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        academicYear: initialData.academicYear,
        semester: initialData.semester as "GANJIL" | "GENAP",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialData) return;
    setLoading(true);
    try {
      await dispatch(
        updatePeriod({
          id: initialData.periodId,
          schoolId,
          dto: formData,
        }),
      ).unwrap();
      toast.success("Periode berhasil diperbarui!");
      onClose();
    } catch (err: any) {
      toast.error(err || "Gagal memperbarui periode");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-[2.5rem] p-10 relative animate-in zoom-in-95">
        <h2 className="text-2xl font-black mb-6 dark:text-white italic">
          Update Periode
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Tahun Akademik
            </label>
            <input
              title="tahun akademik"
              required
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
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Update Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
};
