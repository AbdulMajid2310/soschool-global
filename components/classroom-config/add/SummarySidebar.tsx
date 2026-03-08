import {
  HiOutlineCalendarDays,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
} from "react-icons/hi2";

interface Props {
  activePeriod: any;
  teacherName: string;
  studentCount: number;
  loading: boolean;
  isEdit: boolean;
}

export const SummarySidebar = ({
  activePeriod,
  teacherName,
  studentCount,
  loading,
  isEdit,
}: Props) => (
  <div className="bg-slate-900 dark:bg-indigo-700 p-8 rounded-4xl text-white sticky top-10 shadow-2xl">
    <h4 className="font-black uppercase tracking-widest text-[10px] text-indigo-300 mb-8 italic">
      Ringkasan Konfigurasi
    </h4>
    <div className="space-y-6 mb-10">
      <SummaryItem
        icon={<HiOutlineCalendarDays size={20} />}
        label="Periode Aktif"
        value={
          activePeriod
            ? `${activePeriod.academicYear} - ${activePeriod.semester}`
            : "Loading..."
        }
      />
      <SummaryItem
        icon={<HiOutlineAcademicCap size={20} />}
        label="Wali Kelas"
        value={teacherName || "Belum dipilih"}
      />
      <SummaryItem
        icon={<HiOutlineUserGroup size={20} />}
        label="Total Siswa"
        value={`${studentCount} Siswa Terdaftar`}
      />
    </div>
    <button
      type="submit"
      disabled={loading}
      className="w-full py-5 bg-white text-slate-900 dark:text-indigo-700 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl"
    >
      {loading
        ? "Memproses..."
        : isEdit
          ? "Simpan Perubahan"
          : "Aktifkan Kelas"}
    </button>
  </div>
);

const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex capitalize items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
    {icon}
    <div>
      <p className="text-[10px] font-black uppercase opacity-60">{label}</p>
      <p className="text-sm font-bold truncate">{value}</p>
    </div>
  </div>
);
