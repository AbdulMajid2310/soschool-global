import { CreateSchoolPeriod } from "@/redux/features/school-period/types";

interface PeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CreateSchoolPeriod;
  setFormData: (data: CreateSchoolPeriod) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const PeriodModalSection = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
}: PeriodModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => !loading && onClose()}
      />
      <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95">
        <h2 className="text-2xl font-black mb-6 dark:text-white italic">
          Konfigurasi Periode
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Tahun Akademik
            </label>
            <input
              required
              placeholder="2025/2026"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold transition-all"
              value={formData.academicYear}
              onChange={(e) =>
                setFormData({ ...formData, academicYear: e.target.value })
              }
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Pilih Semester
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
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
};
