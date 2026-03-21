
import { FiFilter } from 'react-icons/fi';
import RaporManager from './RaporManager';

export default function RaporPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            E-Rapor <span className="text-emerald-600">Digital</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Sistem Penilaian Akhir Semester (PAS)</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-emerald-900/20 px-4 py-3 rounded-2xl text-[10px] font-black uppercase italic outline-none">
            <option>10 - IPA 1</option>
            <option>10 - IPA 2</option>
          </select>
          <button className="p-4 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-emerald-900/20 rounded-2xl text-slate-400 hover:text-emerald-500">
            <FiFilter />
          </button>
        </div>
      </div>

      <RaporManager />
    </div>
  );
}