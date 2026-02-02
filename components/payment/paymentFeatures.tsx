"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiCheckCircle, FiShield, FiX, FiZap, 
  FiHome, FiCpu, FiLock, FiArrowLeft, FiCopy, FiClock, FiSmartphone 
} from 'react-icons/fi';

// --- DATA REAL ---
const BANKS = [
  { id: 'bca', name: 'BCA', code: '8830', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
  { id: 'mandiri', name: 'Mandiri', code: '90012', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
  { id: 'bri', name: 'BRI', code: '002', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_Logo.svg' },
];

const WALLETS = [
  { id: 'gopay', name: 'GoPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
  { id: 'dana', name: 'DANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
  { id: 'ovo', name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
];

type Step = 'pilih' | 'detail' | 'sukses';

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  totalTagihan: number;
  idTagihan: string;
  onSuccess?: (trxId: string) => void;
}

export default function PaymentFeatures({ isOpen, onClose, totalTagihan, idTagihan, onSuccess }: PaymentProps) {
  const [step, setStep] = useState<Step>('pilih');
  const [metodeUtama, setMetodeUtama] = useState<string>('sopay');
  const [subPilihan, setSubPilihan] = useState<any>(null);
  const [sedangProses, setSedangProses] = useState(false);
  const [sisaWaktu, setSisaWaktu] = useState(300);

  useEffect(() => {
    if (step === 'detail' && sisaWaktu > 0) {
      const timer = setInterval(() => setSisaWaktu(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, sisaWaktu]);

  if (!isOpen) return null;

  const formatWaktu = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const keDetail = () => {
    if ((metodeUtama === 'bank' || metodeUtama === 'ewallet') && !subPilihan) return;
    setSedangProses(true);
    setTimeout(() => { setSedangProses(false); setStep('detail'); }, 1000);
  };

  const konfirmasiBayar = () => {
    setSedangProses(true);
    setTimeout(() => {
      setSedangProses(false);
      setStep('sukses');
      if (onSuccess) onSuccess(`SO-TRX-${Math.random().toString(36).substring(5).toUpperCase()}`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0  backdrop-blur-2xl transition-all animate-in fade-in duration-500" onClick={onClose} />

      {/* MODAL CONTAINER - Menggunakan max-w-105 & h-fit dengan max-height layar */}
      <div className="relative w-full max-w-lg rounded-2xl max-h-[90vh] flex flex-col bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-white/10 rounded-5xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* STICKY HEADER */}
        <div className="p-8 pb-4 flex justify-between items-center relative z-10 shrink-0 bg-white/80 dark:bg-gray-900 backdrop-blur-md">
          {step === 'detail' ? (
            <button onClick={() => setStep('pilih')} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:scale-110 transition-transform dark:text-white"><FiArrowLeft/></button>
          ) : <div className="w-10" />}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 italic">SoSchool Pay</p>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl hover:scale-110 transition-transform dark:text-white"><FiX/></button>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="p-8 pt-0 overflow-y-auto no-scrollbar flex-1">
          {step === 'pilih' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-500">
              <div className="text-center space-y-1 py-4  bg-white dark:bg-gray-900 z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase italic tracking-widest">Total Pembayaran</p>
                <h2 className="text-5xl font-black italic tracking-tighter text-slate-900 dark:text-white">Rp {totalTagihan.toLocaleString()}</h2>
              </div>

              <div className="space-y-3">
                {/* SOPAY */}
                <div onClick={() => { setMetodeUtama('sopay'); setSubPilihan(null); }} 
                  className={`p-5 rounded-4xl border-2 transition-all cursor-pointer flex items-center gap-4 ${metodeUtama === 'sopay' ? 'border-indigo-600 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-lg shadow-indigo-500/10' : 'border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-white/5 hover:border-indigo-200'}`}>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 shrink-0"><FiZap size={22} /></div>
                    <div className="flex-1 text-left">
                      <h4 className="text-[11px] font-black uppercase dark:text-white italic leading-none">Saldo SoPay</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase italic mt-1">Pembayaran Instan</p>
                    </div>
                    {metodeUtama === 'sopay' && <FiCheckCircle className="text-indigo-600" size={20} />}
                </div>

                {/* BANK */}
                <div className={`rounded-4xl border-2 transition-all ${metodeUtama === 'bank' ? 'border-indigo-600 bg-indigo-500/5 dark:bg-indigo-500/10' : 'border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-white/5'}`}>
                   <div onClick={() => setMetodeUtama('bank')} className="p-5 flex items-center gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0"><FiHome size={22} /></div>
                      <div className="flex-1 text-left">
                         <h4 className="text-[11px] font-black uppercase dark:text-white italic leading-none">Virtual Account</h4>
                         <p className="text-[9px] text-slate-400 font-bold uppercase italic mt-1">Verifikasi Otomatis</p>
                      </div>
                   </div>
                   {metodeUtama === 'bank' && (
                     <div className="px-5 pb-8 grid grid-cols-3 gap-3 animate-in slide-in-from-top-2">
                        {BANKS.map(bank => (
                          <button key={bank.id} onClick={() => setSubPilihan(bank)} className={`p-3 rounded-2xl border-2 bg-white flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm ${subPilihan?.id === bank.id ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-slate-100 opacity-60'}`}>
                             <img src={bank.logo} alt={bank.name} className="h-4 w-auto object-contain" />
                             <span className="text-[8px] font-black uppercase text-slate-900">{bank.name}</span>
                          </button>
                        ))}
                     </div>
                   )}
                </div>

                {/* E-WALLET */}
                <div className={`rounded-4xl border-2 transition-all ${metodeUtama === 'ewallet' ? 'border-indigo-600 bg-indigo-500/5 dark:bg-indigo-500/10' : 'border-slate-50 dark:border-white/5 bg-slate-50 dark:bg-white/5'}`}>
                   <div onClick={() => setMetodeUtama('ewallet')} className="p-5 flex items-center gap-4 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0"><FiSmartphone size={22} /></div>
                      <div className="flex-1 text-left">
                         <h4 className="text-[11px] font-black uppercase dark:text-white italic leading-none">E-Wallet</h4>
                         <p className="text-[9px] text-slate-400 font-bold uppercase italic mt-1">Gopay, OVO, DANA</p>
                      </div>
                   </div>
                   {metodeUtama === 'ewallet' && (
                     <div className="px-5 pb-8 grid grid-cols-3 gap-3 animate-in slide-in-from-top-2">
                        {WALLETS.map(wallet => (
                          <button key={wallet.id} onClick={() => setSubPilihan(wallet)} className={`p-3 rounded-2xl border-2 bg-white flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 shadow-sm ${subPilihan?.id === wallet.id ? 'border-indigo-600 ring-4 ring-indigo-500/10' : 'border-slate-100 opacity-60'}`}>
                             <img src={wallet.logo} alt={wallet.name} className="h-4 w-auto object-contain" />
                             <span className="text-[8px] font-black uppercase text-slate-900">{wallet.name}</span>
                          </button>
                        ))}
                     </div>
                   )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DETAIL */}
          {step === 'detail' && (
            <div className="text-center space-y-8 animate-in slide-in-from-right-10 duration-500 py-4">
               <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-500/10 text-rose-500 dark:text-white rounded-full border border-rose-500/20">
                  <FiClock className="animate-pulse" />
                  <span className="text-xs font-black font-mono tracking-tighter">Batas Waktu: {formatWaktu(sisaWaktu)}</span>
               </div>

               {metodeUtama === 'bank' ? (
                 <div className="bg-slate-50 dark:bg-gray-900 p-10 rounded-4xl border border-slate-100 dark:border-white/5">
                    <img src={subPilihan?.logo} alt="bank" className="h-6 mx-auto mb-6 opacity-80" />
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Nomor Virtual Account {subPilihan?.name}</p>
                    <div className="flex items-center justify-center gap-4">
                       <h3 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">{subPilihan?.code}0812990033</h3>
                       <button className="p-3 bg-white dark:bg-white/10 rounded-2xl shadow-sm text-indigo-600"><FiCopy size={20}/></button>
                    </div>
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="bg-white p-6 rounded-5xl inline-block shadow-inner border-12 border-slate-50">
                       <div className="w-48 h-48 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200">
                          <FiCpu size={64} className="text-slate-300 opacity-20" />
                       </div>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest leading-relaxed">Silahkan Scan QRIS Atas Nama <br/><span className="text-indigo-600 font-black">SoSchool Education</span></p>
                 </div>
               )}
            </div>
          )}

          {/* STEP 3: SUKSES */}
          {step === 'sukses' && (
            <div className="text-center py-10 animate-in zoom-in-50 duration-500">
               <div className="w-32 h-32 border rounded-full text-white rounded-5xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40 rotate-6">
                  <FiCheckCircle size={64} />
               </div>
               <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Berhasil!</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 italic">ID Transaksi: {idTagihan}</p>
            </div>
          )}
        </div>

        {/* STICKY FOOTER ACTION */}
        <div className="p-4 pt-0 shrink-0 bg-white dark:bg-gray-900">
          {step === 'pilih' && (
            <button onClick={keDetail} disabled={sedangProses} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-4xl font-black text-xs uppercase italic tracking-[0.2em] shadow-2xl transition-all active:scale-95 disabled:opacity-30">
              {sedangProses ? 'Mohon Tunggu...' : 'Lanjutkan Pembayaran'}
            </button>
          )}
          {step === 'detail' && (
            <button onClick={konfirmasiBayar} className="w-full py-4 bg-indigo-600 text-white rounded-4xl font-black text-xs uppercase italic tracking-widest shadow-xl shadow-indigo-600/30 transition-all active:scale-95">
              {sedangProses ? 'Memverifikasi...' : 'Saya Sudah Bayar'}
            </button>
          )}
          {step === 'sukses' && (
            <button onClick={onClose} className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-4xl font-black text-xs uppercase italic tracking-widest shadow-xl active:scale-95 transition-all">Selesai</button>
          )}
          
          <div className="flex items-center justify-center gap-3 mt-3 pt-6 border-t border-slate-100 dark:border-white/5 opacity-50">
             <FiShield className="text-indigo-500" size={14} />
             <span className="text-[8px] font-black uppercase text-slate-400 italic tracking-[0.3em]">SoSchool Secured Gateway v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}