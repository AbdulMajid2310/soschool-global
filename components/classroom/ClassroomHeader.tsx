import {
  HiOutlineHomeModern,
  HiOutlinePlus,
  HiOutlineArrowLeft,
} from "react-icons/hi2";
import { SearchModal } from "../SearchModal";
import { BsBuildingFillAdd } from "react-icons/bs";

interface Props {
  onBack: () => void;
  onAdd: () => void;
  onSearch: (query: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const ClassroomHeader = ({
  onBack,
  onAdd,
  onSearch,
  onRefresh,
  isLoading,
}: Props) => (
  <div className="flex w-full flex-col md:flex-row md:items-center items-start justify-between gap-6">
    <div className="flex items-center gap-5 text-left">
      <div className="p-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl shadow-xl">
        <HiOutlineHomeModern size={32} />
      </div>
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
          Master Ruangan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">
          Kelola identitas fisik kelas dan laboratorium
        </p>
      </div>
    </div>
    <div className="flex w-full lg:w-auto gap-3 items-center">
      <SearchModal
        onSearch={onSearch}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      {/* Tombol Tambah: Accent Color */}
      <button
        type="button"
        title="Tambah Ruangan"
        onClick={onAdd}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
      >
        <BsBuildingFillAdd size={18} />
      </button>
    </div>
  </div>
);
