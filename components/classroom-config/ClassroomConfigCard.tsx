import { ClassroomConfig } from "@/redux/features/classroom-config/types";
import { BiEdit } from "react-icons/bi";
import {
  HiOutlineAcademicCap,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";

export const ClassroomConfigCard = ({
  config,
  onEdit,
  onDetail,
  onDelete,
}: {
  config: ClassroomConfig;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDetail: (id: string) => void;
}) => {
  const studentCount = config.classroomStudents?.length || 0;
  const capacity = config.classroom.capacity;
  const percent = (studentCount / capacity) * 100;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* Action Buttons (Hover Only) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          title="detail"
          onClick={() => onDetail(config.classroomConfigId)}
          className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
        >
          <TbListDetails size={18} />
        </button>
        <button
          type="button"
          title="edit"
          onClick={() => onEdit(config.classroomConfigId)}
          className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
        >
          <BiEdit size={18} />
        </button>
        <button
          type="button"
          title="delete"
          onClick={() => onDelete(config.classroomConfigId)}
          className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>

      {/* Card Header */}
      <div className="flex items-start gap-5 mb-4">
        <div className="shrink-0 w-16 h-16 bg-linear-to-br from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none group-hover:rotate-6 transition-transform">
          <HiOutlineAcademicCap size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic">
            {config.classroom?.name}
          </h3>
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <HiOutlineMapPin size={14} />
            {config.roomLocation || "Lokasi Belum Diatur"}
          </div>
        </div>
      </div>

      {/* Info Grid */}

      <div className="flex gap-4 items-center mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
        <div className="shrink-0">
          {config.homeroomTeacher?.user?.avatar ? (
            <img
              src={config.homeroomTeacher.user.avatar}
              alt={config.homeroomTeacher?.user?.username}
              className="h-14 w-14 object-cover rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
            />
          ) : (
            <div className="h-14 w-14 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-full border-2 border-white dark:border-slate-700">
              <HiOutlineUser size={28} />
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
            Wali Kelas
          </p>
          <h1 className="text-sm font-bold capitalize line-clamp-1 text-slate-700 dark:text-slate-200 truncate">
            {config.homeroomTeacher?.user?.username || "Belum Ditentukan"}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500/60 italic">
              {config.homeroomTeacher?.nip
                ? "NIP"
                : config.homeroomTeacher?.nuptk
                  ? "NUPTK"
                  : "NIY"}
              :
            </span>

            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-tight">
              {config.homeroomTeacher?.nip ||
                config.homeroomTeacher?.nuptk ||
                config.homeroomTeacher?.niy ||
                "---"}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="pt-3 border-t border-slate-50 dark:border-slate-800">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Kapasitas
            </p>
            <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
              {studentCount}{" "}
              <span className="text-slate-400 font-medium text-sm">
                / {capacity} Siswa
              </span>
            </p>
          </div>
          <span
            className={`text-xs font-black ${percent >= 100 ? "text-rose-500" : "text-indigo-600"}`}
          >
            {Math.round(percent)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-out rounded-full ${
              percent >= 100
                ? "bg-rose-500"
                : "bg-linear-to-r from-indigo-500 to-violet-400"
            } w-[${Math.min(percent, 100)}%]`}
          />
        </div>
      </div>
    </div>
  );
};
