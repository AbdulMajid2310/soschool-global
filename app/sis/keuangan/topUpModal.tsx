"use client";

import React, { useState } from 'react';
import { 
  FiX, FiChevronRight, FiShield, FiArrowLeft, 
  FiCopy, FiCheck, FiClock, FiZap, FiTarget,
  FiSmartphone
} from 'react-icons/fi';

const BANK_OPTIONS = [
  { id: 'bca', name: 'BCA Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
  { id: 'bni', name: 'BNI Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_BNI.svg' },
  { id: 'bri', name: 'BRI Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg' },
  { id: 'permata', name: 'Permata Virtual Account', img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Logo_Bank_Permata.svg' },
];

const WALLET_OPTIONS = [
  { id: 'gopay', name: 'GoPay', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  { id: 'dana', name: 'DANA', img: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
  { id: 'shopeepay', name: 'ShopeePay', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/ShopeePay.svg' },
  { id: 'ovo', name: 'OVO', img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
];

interface TopUpModalProps {
  onClose: () => void;
}

export default function TopUpModal({ onClose }: TopUpModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); 
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<'bank' | 'wallet' | 'qris' | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  const PRESET_AMOUNTS = ["20000", "50000", "100000", "200000", "500000", "1000000"];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* BACKGROUND BLUR */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-700" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-md bg-linear-to-b from-[#121212] to-[#080808] border border-white/8 rounded-[3rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* HEADER SECTION */}
        <div className="p-6 pb-2 shrink-0 border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
             {step > 1 ? (
               <button onClick={() => setStep((step - 1) as any)} className="w-10 h-10 flex items-center justify-center bg-white/3 hover:bg-white/8 border border-white/10 rounded-2xl text-white transition-all cursor-pointer">
                 <FiArrowLeft size={18} />
               </button>
             ) : (
               <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 rounded-2xl text-emerald-500">
                 <FiZap size={18} />
               </div>
             )}
             <div className="text-center">
                <h3 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Top Up SoPay</h3>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Langkah {step} dari 4</p>
             </div>
             <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/3 hover:bg-red-500/20 hover:text-red-500 border border-white/10 rounded-2xl text-gray-400 transition-all cursor-pointer">
               <FiX size={18} />
             </button>
          </div>
          {/* PROGRESS LINE */}
          <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-linear-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all duration-700 ease-out" 
               style={{ width: `${(step / 4) * 100}%` }}
             />
          </div>
        </div>

        {/* BODY SECTION (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
          
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8">
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-xl">Rp</span>
                <input 
                  type="number" placeholder="0" value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/2 border border-white/10 p-7 pl-16 rounded-4xl text-4xl font-black text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-gray-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PRESET_AMOUNTS.map((val) => (
                  <button
                    key={val} onClick={() => setAmount(val)}
                    className={`py-4 rounded-2xl text-[10px] font-black tracking-widest transition-all border cursor-pointer ${
                      amount === val 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-white/3 border-white/5 text-gray-500 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {parseInt(val).toLocaleString('id-ID')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-in slide-in-from-right-8">
              <CategoryCard title="Virtual Account" desc="BCA, Mandiri, BNI, BRI" icon={<FiTarget />} onClick={() => { setCategory('bank'); setStep(3); }} />
              <CategoryCard title="E-Wallet" desc="GoPay, OVO, Dana" icon={<FiSmartphone />} onClick={() => { setCategory('wallet'); setStep(3); }} />
              <CategoryCard title="QRIS" desc="Scan Pakai Apa Saja" icon={<FiZap />} onClick={() => { setSelectedProvider({name: 'QRIS'}); setStep(4); }} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2 animate-in slide-in-from-right-8">
              {(category === 'bank' ? BANK_OPTIONS : WALLET_OPTIONS).map((item) => (
                <button 
                  key={item.id} onClick={() => { setSelectedProvider(item); setStep(4); }}
                  className="w-full bg-white/3 border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                       <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-wider">{item.name}</span>
                  </div>
                  <FiChevronRight className="text-gray-700 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-4xl p-6 text-center">
                 <p className="text-[9px] font-black text-emerald-500/70 uppercase tracking-widest mb-1">Total Pembayaran</p>
                 <p className="text-4xl font-black text-white italic tracking-tighter">Rp {parseInt(amount).toLocaleString('id-ID')}</p>
                 <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-emerald-500 rounded-full text-[8px] font-black text-black uppercase">
                    <FiCheck size={10} /> Bebas Biaya Admin
                 </div>
              </div>

              {selectedProvider?.name === 'QRIS' ? (
                <div className="bg-white p-4 rounded-4xl w-56 h-56 mx-auto">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SOPAY_MAJID" alt="QRIS" className="w-full h-full" />
                </div>
              ) : (
                <div className="bg-white/2 border border-white/5 rounded-4xl p-6 space-y-4 text-center">
                  <div className="flex justify-between items-center mb-2">
                     <img src={selectedProvider?.img} className="h-4 opacity-80" alt="logo" />
                     <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase">
                        <FiClock className="text-emerald-500" /> Expired: 23:59:00
                     </div>
                  </div>
                  <div className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5">
                    <span className="text-xl font-mono font-black text-white tracking-[0.2em]">8820108123</span>
                    <button onClick={() => handleCopy("8820108123")} className="p-3 bg-white text-black rounded-xl hover:bg-emerald-400 transition-all cursor-pointer">
                      {isCopied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER SECTION */}
        <div className="p-6 pt-2 border-t border-white/5 shrink-0 bg-[#080808]/50 backdrop-blur-md">
          {step === 1 && (
            <button 
              disabled={!amount || parseInt(amount) < 10000}
              onClick={() => setStep(2)}
              className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-emerald-400 active:scale-95 transition-all disabled:opacity-20 cursor-pointer"
            >
              Lanjutkan
            </button>
          )}
          {step === 4 && (
            <button 
              onClick={onClose}
              className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
            >
              Saya Sudah Bayar
            </button>
          )}
          {step > 1 && step < 4 && (
            <p className="text-center text-[9px] font-bold text-gray-600 uppercase tracking-widest py-3 italic">
              Keamanan Terjamin oleh SoPay Secure
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const CategoryCard = ({ title, desc, icon, onClick }: any) => (
  <button onClick={onClick} className="w-full bg-white/3 border border-white/6 p-5 rounded-4xl flex items-center justify-between hover:bg-white/8 hover:border-white/20 transition-all group text-left cursor-pointer">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 flex items-center justify-center bg-white/3 border border-white/10 rounded-2xl text-white text-xl group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h4>
        <p className="text-[9px] font-bold text-gray-600 uppercase mt-0.5">{desc}</p>
      </div>
    </div>
    <FiChevronRight className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
  </button>
);
