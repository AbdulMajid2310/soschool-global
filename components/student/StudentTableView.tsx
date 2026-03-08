import { FiEdit2, FiInfo, FiTrash2 } from "react-icons/fi";
import { ActionButton } from "../ui/button/ActionButton";
import { StatusBadge } from "../classroom-student/HelperClassroom";
import { Student } from "@/redux/features/student/types";

interface Props {
  students: any[];
  selectedIds: string[]; // Tambah ini
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>; // Tambah ini
  onDetail: (id: string) => void;
  onEdit: (student: Student) => void;
  onDelete?: (id: string) => void;
}

export const StudentTableView = ({
  students,
  selectedIds,
  setSelectedIds,
  onDetail,
  onEdit,
  onDelete,
}: Props) => {
  // Logic Toggle Per-baris
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Logic Select All
  const toggleSelectAll = () => {
    if (selectedIds.length === students.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.studentId));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-400">
              <th className="px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                <input
                  title="select"
                  type="checkbox"
                  className="rounded-lg border-2 border-slate-200"
                  checked={
                    students.length > 0 &&
                    selectedIds.length === students.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Siswa
              </th>
              {/* Kolom lainnya tetap sama... */}
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                NIS
              </th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Alamat
              </th>
              <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800">
                Status
              </th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100 dark:border-slate-800 text-right">
                Opsi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {students.map((s) => (
              <tr
                key={s.studentId}
                className={`group transition-all duration-300 ${selectedIds.includes(s.studentId) ? "bg-indigo-50/50 dark:bg-indigo-500/10" : "hover:bg-slate-50/50"}`}
              >
                <td className="px-8 py-5">
                  <input
                    title="selected"
                    type="checkbox"
                    className="rounded-lg border-2 border-slate-200 checked:bg-indigo-500"
                    checked={selectedIds.includes(s.studentId)}
                    onChange={() => toggleSelect(s.studentId)}
                  />
                </td>
                <td className="px-4 py-5">
                  {/* Konten Nama & Avatar sama seperti sebelumnya */}
                  <div className="flex items-center gap-4">
                    <img
                      title="image"
                      src={
                        s.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${s.user?.username}&background=6366f1&color=fff&bold=true`
                      }
                      className="w-11 h-11 rounded-[1.1rem] object-cover"
                    />
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-800 dark:text-slate-100 text-sm tracking-tight uppercase italic">
                        {s.user?.username}
                      </p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {s.user?.gender === "L" ? "Laki-laki" : "Perempuan"}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-xs font-black">{s.nis}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase">
                      {s.user?.address?.district || "---"}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter italic">
                      Kecamatan
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={s.isStatus} />
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-1.5 opacity-20 group-hover:opacity-100 transition-all">
                    <ActionButton
                      icon={<FiInfo />}
                      color="text-indigo-500"
                      onClick={() => onDetail(s.studentId)}
                    />
                    <ActionButton
                      icon={<FiEdit2 />}
                      color="text-amber-500"
                      onClick={() => onEdit(s)}
                    />
                    <ActionButton
                      icon={<FiTrash2 />}
                      color="text-rose-500"
                      onClick={() => onDelete?.(s.studentId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
