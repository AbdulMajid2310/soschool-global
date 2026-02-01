
import { FiSearch, FiFilter } from 'react-icons/fi';
import BankSoal from './BankSoal';

export default function BankSoalPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Bank <span className="text-violet-600">Soal</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest italic opacity-70">Aset intelektual dan instrumen evaluasi</p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari materi..." 
              className="pl-12 pr-6 py-4 bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-violet-900/20 rounded-3xl text-[10px] font-black uppercase italic outline-none focus:border-violet-500 transition-all" 
            />
          </div>
        </div>
      </div>

      <BankSoal />
    </div>
  );
}