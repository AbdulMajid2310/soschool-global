"use client";

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { HiOutlineAcademicCap, HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineLightningBolt, HiOutlineArrowRight } from 'react-icons/hi';
import { RiCalendarCheckLine } from 'react-icons/ri';

export default function PeriodActiveCard() {
  const router = useRouter();
  const { activePeriod, loading } = useAppSelector((state) => state.schoolPeriod);



  if (loading) return (
    <div className="h-28 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-4xl"></div>
  );

  if (!activePeriod) return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all duration-500">
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="flex items-center justify-center w-14 h-14 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-3xl shadow-inner">
          <HiOutlineLightningBolt size={28} className="animate-bounce" />
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Periode Belum Aktif</h3>
          <p className="text-xs text-slate-500 font-medium italic">Sistem memerlukan periode akademik untuk pencatatan data.</p>
        </div>
        <button
          onClick={() => router.push('/staff/pengaturan/parameter/periode')}
          className="group/btn flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
        >
          <HiOutlinePlus size={16} className="group-hover/btn:rotate-90 transition-transform" />
          AKTIFKAN SEKARANG
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden group">
      <div className="flex flex-col md:flex-row items-center gap-5 bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">

        <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>

        <div className="flex items-center justify-center w-16 h-16 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <HiOutlineAcademicCap size={32} />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none">
              Periode Aktif
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Live</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight italic tracking-tighter">
            TA {activePeriod.academicYear}
          </h2>

          <div className="flex items-center gap-2 mt-1.5 text-slate-500">
            <RiCalendarCheckLine size={16} />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
              Semester {activePeriod.semester}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push('/staff/pengaturan/parameter/periode')}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all group/btn bg-slate-50 dark:bg-slate-800/50 px-5 py-3 rounded-2xl border border-transparent hover:border-indigo-100"
        >
          Manage
          <HiOutlineArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}