import { HiPlus, HiChevronLeft } from "react-icons/hi2";
import { RiHistoryLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface PeriodHeaderProps {
  onAddClick: () => void;
}

export const PeriodHeaderSection = ({ onAddClick }: PeriodHeaderProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-slate-100 dark:border-slate-800/50">
      <div className="flex items-start gap-4">
        <button
          type="button"
          title="kembali"
          onClick={() => router.back()}
          className="mt-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all active:scale-95 group"
        >
          <HiChevronLeft
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
            <RiHistoryLine /> <span>Academic Logic • SoSchool</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">
            Master{" "}
            <span className="text-indigo-600 dark:text-indigo-500 not-italic">
              Periode
            </span>
          </h1>
        </div>
      </div>

      <button
        onClick={onAddClick}
        className="group flex items-center gap-3 bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-indigo-700 active:scale-95 shadow-2xl"
      >
        <HiPlus size={18} /> <span>Tambah Periode Baru</span>
      </button>
    </div>
  );
};
