import { ClassroomConfig } from "@/redux/features/classroom-config/types";
import { BiEdit } from "react-icons/bi";
import {
  HiOutlineAcademicCap,
  HiOutlineMapPin,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";

export const CardClassroom = ({
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
  const capacity = 36;
  const percent = (studentCount / capacity) * 100;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
        <button
          title="detail"
          onClick={() => onDetail(config.classroomConfigId)}
          className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          <TbListDetails size={18} />
        </button>
        <button
          title="edit"
          onClick={() => onEdit(config.classroomConfigId)}
          className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm"
        >
          <BiEdit size={18} />
        </button>
        <button
          title="hapus"
          onClick={() => onDelete(config.classroomConfigId)}
          className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>

      <div className="flex items-start gap-5 mb-6">
        <div className="shrink-0 w-16 h-16 bg-linear-to-br from-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
          <HiOutlineAcademicCap size={32} />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight italic uppercase truncate">
            {config.classroom?.name}
          </h3>
          <div className="flex items-center gap-1.5 text-indigo-500 font-black text-[10px] uppercase tracking-widest mt-1">
            <HiOutlineMapPin size={14} />
            {config.roomLocation || "TBA"}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
        <div className="shrink-0">
          {config.homeroomTeacher?.user?.avatar ? (
            <img
              src={config.homeroomTeacher.user.avatar}
              alt="avatar"
              className="h-12 w-12 object-cover rounded-2xl shadow-sm"
            />
          ) : (
            <div className="h-12 w-12 flex items-center justify-center bg-white dark:bg-slate-700 text-slate-300 rounded-2xl border border-slate-100 dark:border-slate-600">
              <HiOutlineUser size={24} />
            </div>
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-[9px] font-black uppercase tracking-tighter text-slate-400 mb-0.5">
            Wali Kelas
          </p>
          <h4 className="text-xs font-black text-slate-700 dark:text-slate-200 truncate uppercase italic">
            {config.homeroomTeacher?.user?.username || "N/A"}
          </h4>
          <p className="text-[10px] font-bold text-indigo-500 tracking-tight">
            NIP: {config.homeroomTeacher?.nip || "-"}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-end mb-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Okupansi Siswa
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white">
              {studentCount}{" "}
              <span className="text-slate-300 font-medium text-sm">
                / {capacity}
              </span>
            </p>
          </div>
          <div
            className={`px-2 py-1 rounded-lg text-[10px] font-black ${percent >= 90 ? "bg-rose-100 text-rose-600" : "bg-indigo-100 text-indigo-600"}`}
          >
            {Math.round(percent)}%
          </div>
        </div>
      </div>
    </div>
  );
};
