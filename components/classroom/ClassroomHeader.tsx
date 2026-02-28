import { HiOutlineHomeModern, HiOutlinePlus, HiOutlineArrowLeft } from "react-icons/hi2";

interface Props {
    onBack: () => void;
    onAdd: () => void;
}

export const ClassroomHeader = ({ onBack, onAdd }: Props) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-left">
            <div className="p-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl shadow-xl">
                <HiOutlineHomeModern size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Master Ruangan</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium italic text-sm">Kelola identitas fisik kelas dan laboratorium</p>
            </div>
        </div>
        <div className='flex gap-4 items-center'>
            <button onClick={onBack} className="flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 border border-slate-100 dark:border-slate-700 cursor-pointer">
                <HiOutlineArrowLeft size={18} strokeWidth={2.5} /> Kembali
            </button>
            <button onClick={onAdd} className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-200/50 cursor-pointer">
                <HiOutlinePlus size={20} strokeWidth={2.5} /> Tambah Ruangan
            </button>
        </div>
    </div>
);