"use client";

import React, { memo } from 'react';
import { 
  FiPercent, FiDollarSign, FiShoppingBag, FiCreditCard, 
  FiArrowUpRight, FiInfo, FiSave, FiClock, FiSettings,
  FiZap, FiPieChart
} from 'react-icons/fi';

// --- MOCK DATA FEE CONFIG ---
const FEE_STRUCTURE = [
  {
    id: 'TRX-KANTIN',
    category: 'Kantin & Koperasi',
    type: 'Flat',
    value: 500,
    icon: <FiShoppingBag />,
    description: 'Potongan per transaksi belanja di merchant sekolah.',
    totalRevenueMonth: 'Rp 12.450.000'
  },
  {
    id: 'TRX-SPP',
    category: 'Pembayaran SPP/Biaya',
    type: 'Percentage',
    value: 1.5,
    icon: <FiCreditCard />,
    description: 'Biaya layanan untuk pembayaran tagihan pendidikan.',
    totalRevenueMonth: 'Rp 45.200.000'
  },
  {
    id: 'TRX-TOPUP',
    category: 'Top-up SoPay',
    type: 'Flat',
    value: 1000,
    icon: <FiZap />,
    description: 'Biaya admin untuk pengisian saldo via VA/Retail.',
    totalRevenueMonth: 'Rp 8.900.000'
  }
];

const PlatformFeeManagement = () => {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-200 p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <FiPieChart className="text-emerald-500 text-xl" />
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tight text-white">
              Platform <span className="text-emerald-500">Fee & MDR</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium italic uppercase tracking-widest">Revenue Sharing & Transaction Commission Settings</p>
        </div>
        
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20">
          <FiSave /> Simpan Konfigurasi
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT: FEE EDITOR CARDS (2 COLS) */}
        <div className="xl:col-span-2 space-y-6">
          {FEE_STRUCTURE.map((fee) => (
            <div key={fee.id} className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 text-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    {fee.icon}
                  </div>
                  <div className="max-w-xs">
                    <h3 className="text-lg font-black text-white uppercase italic leading-none mb-2">{fee.category}</h3>
                    <p className="text-[11px] text-slate-500 font-medium italic leading-relaxed uppercase">{fee.description}</p>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-slate-400 uppercase italic">ID: {fee.id}</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col md:items-end justify-center">
                  <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/5 w-full md:w-auto">
                    <div className="flex bg-white/5 p-1 rounded-xl">
                        <button className={`px-4 py-2 text-[10px] font-black uppercase italic rounded-lg transition-all ${fee.type === 'Flat' ? 'bg-emerald-500 text-black shadow-lg' : 'text-slate-500'}`}>Flat</button>
                        <button className={`px-4 py-2 text-[10px] font-black uppercase italic rounded-lg transition-all ${fee.type === 'Percentage' ? 'bg-emerald-500 text-black shadow-lg' : 'text-slate-500'}`}>%</button>
                    </div>
                    <div className="relative">
                        <input 
                            type="text" 
                            defaultValue={fee.value}
                            className="bg-transparent text-2xl font-black text-white w-24 text-right outline-none focus:text-emerald-400"
                        />
                        <span className="absolute -top-3 right-0 text-[8px] font-black text-slate-600 uppercase italic">Nominal</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] font-black text-slate-500 uppercase italic">
                    Revenue Bulan Ini: <span className="text-emerald-400">{fee.totalRevenueMonth}</span>
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: INSIGHTS & LOGS */}
        <div className="space-y-8">
          
          {/* REVENUE SUMMARY CARD */}
          <div className="bg-linear-to-br from-emerald-600 to-teal-800 rounded-4xl p-8 text-white shadow-xl shadow-emerald-900/30">
            <h4 className="font-black uppercase italic text-lg mb-2">Total Platform Fee</h4>
            <p className="text-emerald-100 text-[10px] font-medium leading-relaxed italic mb-6">Akumulasi keuntungan dari seluruh transaksi ekosistem SoSchool bulan ini.</p>
            <div className="space-y-1">
                <p className="text-4xl font-black italic leading-none">Rp 66.550.000</p>
                <div className="flex items-center gap-2 text-emerald-200 mt-2">
                    <FiArrowUpRight />
                    <span className="text-[10px] font-black uppercase italic">Naik 12% dari bulan lalu</span>
                </div>
            </div>
          </div>

          {/* SYSTEM LOGS */}
          <div className="bg-white/5 border border-white/10 rounded-4xl p-8 backdrop-blur-xl">
            <h3 className="text-sm font-black uppercase italic text-white flex items-center gap-2 mb-6">
              <FiClock className="text-emerald-500" /> Audit Trail
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-2 border-white/10 pl-4 py-1">
                    <p className="text-[10px] font-black text-white uppercase italic">Fee Update: Kantin</p>
                    <p className="text-[9px] text-slate-500 font-medium italic">Majid mengubah Flat Fee dari Rp400 ke Rp500</p>
                    <p className="text-[8px] text-slate-600 mt-1 uppercase font-bold tracking-widest">2 Jam yang lalu</p>
                </div>
              ))}
            </div>
          </div>

          {/* ADVISORY BOX */}
          <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-3xl flex items-start gap-4">
            <FiInfo className="text-blue-500 shrink-0 mt-1" />
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
              Potongan MDR (Merchant Discount Rate) biasanya dibebankan kepada merchant atau dibagi antara platform dan sekolah. Pastikan kebijakan ini sesuai dengan kontrak kerja sama.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default memo(PlatformFeeManagement);