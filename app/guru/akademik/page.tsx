"use client";

import { useRouter } from 'next/dist/client/components/navigation';
import React from 'react';
import {
  FiActivity, FiTrendingUp, FiAlertTriangle, FiAward,
  FiArrowRight, FiTarget, FiZap, FiStar
} from 'react-icons/fi';

const CLASS_BEHAVIOR_ANALYTICS = [
  {
    id: 'C1', name: '10-IPA-1', subject: 'Informatika',
    totalXP: 12500, topPerformer: 'Ahmad Zaki',
    positiveRate: 92, alertCount: 0, status: 'Exemplary'
  },
  {
    id: 'C2', name: '11-RPL-2', subject: 'Basis Data',
    totalXP: 8400, topPerformer: 'Siti Aminah',
    positiveRate: 75, alertCount: 4, status: 'Improving'
  },
  {
    id: 'C3', name: '12-RPL-1', subject: 'Web Dev',
    totalXP: 15600, topPerformer: 'Rani Wijaya',
    positiveRate: 88, alertCount: 1, status: 'Stable'
  },
];

const BehaviorList = () => {
  const router = useRouter();

  return (
    <div className="space-y-8 p-8 mt-10 animate-in fade-in zoom-in duration-700">

      {/* 1. Global Behavior Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <BehaviorStat label="Total XP Terdistribusi" value="36.5K" sub="Bulan ini" icon={<FiZap />} color="text-cyan-500" />
        <BehaviorStat label="Positive Interaction" value="84%" sub="Rata-rata Global" icon={<FiStar />} color="text-amber-500" />
        <BehaviorStat label="Kebutuhan Konseling" value="05" sub="Siswa (Alert)" icon={<FiAlertTriangle />} color="text-rose-500" />
        <BehaviorStat label="Achievement Unlocked" value="12" sub="Minggu Ini" icon={<FiAward />} color="text-violet-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* 2. Class Comparison Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 italic">Leaderboard & Kondisi Kelas</h3>

          <div className="space-y-4">
            {CLASS_BEHAVIOR_ANALYTICS.map((cls) => (
              <div key={cls.id} className="group p-6 rounded-[2.5rem] border border-slate-50 dark:border-white/5 hover:border-violet-500/30 transition-all flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center font-black italic">
                    {cls.id}
                  </div>
                  <div>
                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{cls.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cls.subject}</p>
                  </div>
                </div>

                <div className="flex gap-10">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Total XP</p>
                    <p className="text-sm font-black text-cyan-500 italic">{cls.totalXP.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Top Performer</p>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{cls.topPerformer}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Behavior Rate</p>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500" style={{ width: `${cls.positiveRate}%` }} />
                      </div>
                      <span className="text-[10px] font-black italic">{cls.positiveRate}%</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => router.push('akademik/subject')} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all shadow-xs group-hover:shadow-violet-500/20">
                  <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AI Behavior Insights (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-linear-to-br from-[#0a0f1d] to-[#1a1f3d] p-8 rounded-[3rem] border border-violet-500/20 text-white relative overflow-hidden group">
            <FiActivity className="absolute -right-6 -top-6 text-violet-500/10 group-hover:scale-110 transition-transform duration-700" size={150} />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-6 italic">Behavior Analyst (AI)</h4>

            <div className="space-y-6 relative z-10">
              <div className="p-4 bg-violet-500/10 rounded-2xl border border-violet-500/20">
                <p className="text-[11px] font-medium leading-relaxed italic text-violet-200">
                  "Kelas **11-RPL-2** menunjukkan penurunan keaktifan diskusi sebesar 15% minggu ini. Disarankan memberikan tugas kelompok berbasis gamifikasi."
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Paling Aktif Hari Ini</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-black">AZ</div>
                  <p className="text-[10px] font-bold italic uppercase">Ahmad Zaki (10-IPA-1)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f1d] p-8 rounded-[3rem] border border-slate-200 dark:border-white/5">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-4 italic flex items-center gap-2">
              <FiAlertTriangle /> Attention Required
            </h5>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
              Ada **4 siswa** di kelas Basis Data yang mendapatkan poin negatif berturut-turut dalam 3 sesi terakhir.
            </p>
            <button className="mt-4 w-full py-3 bg-rose-500/10 text-rose-500 rounded-xl text-[9px] font-black uppercase tracking-widest italic hover:bg-rose-500 hover:text-white transition-all">
              Tinjau Sekarang
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components
const BehaviorStat = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
    <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
      {icon} {label}
    </div>
    <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
  </div>
);

export default BehaviorList;