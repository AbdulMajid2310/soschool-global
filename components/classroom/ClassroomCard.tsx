import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineAcademicCap } from "react-icons/hi2";

interface Props {
    item: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

export const ClassroomCard = ({ item, onEdit, onDelete }: Props) => (
    <div className="group relative bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-2xl hover:shadow-indigo-100/30 dark:hover:shadow-none hover:-translate-y-1">
        <div className="flex flex-col h-full justify-between gap-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 text-left">
                    <div className="p-3 bg-white dark:bg-slate-800 text-indigo-600 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-700 text-lg font-black italic">
                        {item.level}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Level {item.level}</p>
                        <h3 className="text-xl font-bold text-slate-800 uppercase dark:text-white leading-none">{item.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(item)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all cursor-pointer"><HiOutlinePencilSquare size={18} /></button>
                    <button onClick={() => onDelete(item.schoolClassroomId)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all cursor-pointer"><HiOutlineTrash size={18} /></button>
                </div>
            </div>
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2 text-slate-500">
                <HiOutlineAcademicCap size={16} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.major || 'Umum'}</span>
            </div>
        </div>
    </div>
);