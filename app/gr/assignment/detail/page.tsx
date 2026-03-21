
import { FiFilter, FiSearch } from 'react-icons/fi';
import TaskManager from './TaskManager';

export default function TugasPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Manajemen <span className="text-indigo-600">Tugas</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest italic opacity-70">Pantau dan koreksi hasil belajar siswa</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Cari tugas..." className="pl-10 pr-4 py-3 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-900/20 rounded-2xl text-[10px] font-black uppercase italic outline-none focus:border-indigo-500 transition-all" />
          </div>
          <button className="p-4 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-900/20 rounded-2xl text-slate-400 hover:text-indigo-500">
            <FiFilter />
          </button>
        </div>
      </div>

      <TaskManager />
    </div>
  );
}