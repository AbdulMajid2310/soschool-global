
import { FiLayers } from 'react-icons/fi';
import SubjectManager from './SubjectManager';

export default function AkademikGuru() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Pusat <span className="text-indigo-600">Akademik</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Kelola kurikulum dan materi ajar untuk setiap kelas.</p>
        </div>
        
        <div className="flex items-center gap-3 p-2 bg-white dark:bg-[#0a0f1d] rounded-2xl border border-slate-200 dark:border-indigo-900/20">
          <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center">
            <FiLayers />
          </div>
          <div className="pr-4">
            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none">Total SKS</p>
            <p className="text-sm font-black italic text-slate-900 dark:text-white">24 Jam / Minggu</p>
          </div>
        </div>
      </div>

      <SubjectManager />
    </div>
  );
}