import { SchoolClassroom } from "@/redux/features/classroom/types";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineAcademicCap,
  HiOutlineInboxStack,
  HiOutlineChevronRight,
} from "react-icons/hi2";

interface Props {
  item: SchoolClassroom;
  onEdit: (item: SchoolClassroom) => void;
  onDelete: (id: string) => void;
}

export const ClassroomCard = ({ item, onEdit, onDelete }: Props) => (
  <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-4xl p-6 transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
    {/* Top Section: Identity */}
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-4">
        {/* Minimalist Level Indicator */}
        <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white">
          <span className="text-[10px] font-black leading-none opacity-50 uppercase">
            Lvl
          </span>
          <span className="text-xl font-black leading-none">{item.level}</span>
        </div>

        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none mb-1.5">
            {item.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Operational
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Action Menu: Hidden by default, appears on hover */}
      <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
        <button
          type="button"
          title="edit"
          onClick={() => onEdit(item)}
          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all cursor-pointer border border-transparent hover:border-indigo-100 dark:hover:border-slate-600"
        >
          <HiOutlinePencilSquare size={18} />
        </button>
        <button
          type="button"
          title="delete"
          onClick={() => onDelete(item.schoolClassroomId)}
          className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-100 dark:hover:border-slate-600"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>
    </div>

    {/* Middle Section: Stats/Info */}
    <div className="flex items-center gap-8 mb-4">
      <div className="space-y-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Department
        </p>
        <div className="flex items-center gap-2">
          <HiOutlineAcademicCap className="text-indigo-500" size={16} />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {item.major || "General"}
          </span>
        </div>
      </div>

      <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />

      <div className="space-y-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Capacity
        </p>
        <div className="flex items-center gap-2">
          <HiOutlineInboxStack className="text-slate-400" size={16} />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {item.capacity}
          </span>
        </div>
      </div>
    </div>

    {/* Refined Glass Highlight (Top Light) */}
    <div className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);
