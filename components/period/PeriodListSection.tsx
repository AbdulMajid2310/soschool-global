import { SchoolPeriod } from "@/redux/features/school-period/types";
import {
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

interface PeriodListProps {
  periods: SchoolPeriod[];
  loading: boolean;
  onEdit: (period: SchoolPeriod) => void;
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string, active: boolean) => void;
}

export const PeriodListSection = ({
  periods,
  loading,
  onEdit,
  onToggle,
  onDelete,
}: PeriodListProps) => {
  if (loading && periods.length === 0) {
    return (
      <div className="h-40 flex flex-col items-center justify-center gap-3 text-slate-400 italic">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p>Menghubungkan ke Database SoSchool...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {periods.map((p) => (
        <div
          key={p.periodId}
          className={`flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-slate-900 border rounded-3xl transition-all ${
            p.isActive
              ? "border-indigo-500 ring-4 ring-indigo-500/5 shadow-lg"
              : "border-slate-100 dark:border-slate-800"
          }`}
        >
          <div className="flex items-center gap-5">
            <div
              className={`p-4 rounded-2xl ${p.isActive ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
            >
              <HiOutlineCalendarDays size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-white">
                {p.academicYear}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Semester {p.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => onToggle(p.periodId, p.isActive)}
              className={`px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                p.isActive
                  ? "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                  : "bg-slate-900 dark:bg-indigo-600 text-white"
              }`}
            >
              {p.isActive ? "Nonaktifkan" : "Aktifkan"}
            </button>
            <button
              type="button"
              title="edit"
              onClick={() => onEdit(p)}
              className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600"
            >
              <HiOutlinePencilSquare size={20} />
            </button>
            <button
              type="button"
              title="delete"
              onClick={() => onDelete(p.periodId, p.isActive)}
              className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-rose-600"
            >
              <HiOutlineTrash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
