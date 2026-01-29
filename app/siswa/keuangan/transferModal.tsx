"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  FiX, FiArrowLeft, FiSend, FiUser, FiCheck, FiLock, 
  FiSearch, FiClock, FiUserPlus, FiSave, FiShield, FiAlertCircle
} from 'react-icons/fi';

interface TransferModalProps {
  onClose: () => void;
}

const RECENT_USERS = [
  { id: 'SOPAY-9921', name: 'Ahmad Mujakkir', avatar: 'https://ui-avatars.com/api/?name=Ahmad+Mujakkir&background=3b82f6&color=fff' },
  { id: 'SOPAY-1102', name: 'Siti Aminah', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=ec4899&color=fff' },
];

export default function TransferModal({ onClose }: TransferModalProps) {
  const [step, setStep] = useState<1 | 1.5 | 1.6 | 2 | 3 | 4>(1); 
  // 1.6 adalah Step Verifikasi (Cek Data & Opsi Simpan)
  
  const [manualId, setManualId] = useState("");
  const [isSaveChecked, setIsSaveChecked] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const QUICK_AMOUNTS = ["10000", "20000", "50000", "100000"];

  // Simulasi Cek Data Server
  const handleVerifyUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulasi data ditemukan
      setSelectedUser({
        id: manualId,
        name: "Siswa SoSchool Terverifikasi",
        avatar: `https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff`
      });
      setIsLoading(false);
      setStep(1.6); // Pindah ke layar konfirmasi identitas
    }, 1500);
  };

  const handlePinChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  useEffect(() => {
    if (step === 3) setTimeout(() => inputRefs.current[0]?.focus(), 100);
  }, [step]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500" onClick={onClose} />

      <div className="relative w-full max-w-md bg-linear-to-b from-[#0f172a] to-[#050505] border border-white/8 rounded-4xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500">
        
        {/* HEADER */}
        <div className="p-6 pb-2 shrink-0 border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
             {step !== 1 && step < 4 ? (
               <button onClick={() => setStep(step === 1.5 ? 1 : step === 1.6 ? 1.5 : (step - 1) as any)} className="w-10 h-10 flex items-center justify-center bg-white/3 hover:bg-white/8 border border-white/10 rounded-2xl text-white transition-all cursor-pointer">
                 <FiArrowLeft size={18} />
               </button>
             ) : (
               <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-2xl text-blue-500">
                 <FiShield size={18} />
               </div>
             )}
             <div className="text-center">
                <h3 className="text-lg font-black text-white italic tracking-tighter uppercase leading-none">Keamanan SoPay</h3>
                <p className="text-[9px] font-bold text-blue-500/60 uppercase tracking-widest mt-1">Langkah {Math.floor(step)} dari 4</p>
             </div>
             <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white/3 hover:bg-red-500/20 hover:text-red-500 border border-white/10 rounded-2xl text-gray-400 transition-all cursor-pointer">
               <FiX size={18} />
             </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
          
          {/* STEP 1: PILIH RECENT */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <button onClick={() => setStep(1.5)} className="w-full flex items-center gap-4 p-5 bg-blue-600/10 border border-blue-500/30 rounded-3xl text-blue-400 hover:bg-blue-600/20 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><FiUserPlus size={20} /></div>
                <div className="text-left"><p className="text-sm font-black uppercase italic tracking-tight">Cari Tujuan Baru</p></div>
              </button>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Terakhir Terkirim</p>
                {RECENT_USERS.map((user) => (
                  <button key={user.id} onClick={() => { setSelectedUser(user); setStep(2); }} className="w-full flex items-center justify-between p-4 bg-white/2 hover:bg-white/5 border border-white/5 rounded-2xl transition-all cursor-pointer">
                    <div className="flex items-center gap-4"><img src={user.avatar} className="w-10 h-10 rounded-full" alt="" />
                    <div className="text-left"><p className="text-sm font-black text-white italic tracking-tight">{user.name}</p></div></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1.5: INPUT ID MANUAL */}
          {step === 1.5 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">Masukkan ID SoPay</label>
                <input type="text" placeholder="SOPAY-XXXX" value={manualId} onChange={(e) => setManualId(e.target.value.toUpperCase())}
                    className="w-full bg-white/2 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-blue-500/50 transition-all font-bold" />
              </div>
            </div>
          )}

          {/* STEP 1.6: VERIFIKASI DATA & OPSI SIMPAN */}
          {step === 1.6 && selectedUser && (
            <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
               <div className="bg-blue-500/10 border border-blue-500/20 rounded-4xl p-8 text-center space-y-4">
                  <div className="relative inline-block">
                    <img src={selectedUser.avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500/30" alt="" />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-4 border-[#0a101f]"><FiCheck size={12}/></div>
                  </div>
                  <div>
                    <h4 className="text-white font-black uppercase text-xl italic">{selectedUser.name}</h4>
                    <p className="text-blue-500 font-mono text-xs tracking-widest">{selectedUser.id}</p>
                  </div>
               </div>

               {/* OPSI SIMPAN */}
               <button onClick={() => setIsSaveChecked(!isSaveChecked)} className={`w-full p-5 rounded-3xl border transition-all flex items-center justify-between cursor-pointer ${isSaveChecked ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/2 border-white/5 opacity-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSaveChecked ? 'bg-emerald-500 text-black' : 'bg-white/10 text-gray-500'}`}><FiSave size={18} /></div>
                    <div className="text-left"><p className="text-xs font-black uppercase tracking-tight text-white">Simpan Kontak ini?</p></div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSaveChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20'}`}>{isSaveChecked && <FiCheck size={14} strokeWidth={4} />}</div>
               </button>
            </div>
          )}

          {/* STEP 2: INPUT NOMINAL */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-500 uppercase text-center tracking-widest">Masukkan Nominal Transfer</p>
                  <input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/2 border border-white/10 p-7 rounded-3xl text-4xl font-black text-white outline-none focus:border-blue-500/50 text-center" />
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_AMOUNTS.map((val) => (
                      <button key={val} onClick={() => setAmount(val)} className={`py-4 rounded-2xl text-[10px] font-black border cursor-pointer ${amount === val ? 'bg-blue-600 text-white' : 'bg-white/3 border-white/5 text-gray-500'}`}>{parseInt(val).toLocaleString('id-ID')}</button>
                    ))}
                  </div>
               </div>
            </div>
          )}

          {/* STEP 3 & 4 (PIN & SUCCESS) - SAMA SEPERTI SEBELUMNYA */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 text-center py-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto text-blue-500 border border-blue-500/20"><FiLock size={24} /></div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Konfirmasi PIN</h3>
              <div className="flex justify-center gap-2">
                {pin.map((digit, index) => (
                  <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type="password" maxLength={1} value={digit} onChange={(e) => handlePinChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black text-blue-500 outline-none focus:border-blue-500 transition-all" />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6"><FiCheck className="text-emerald-500 text-5xl" /></div>
              <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Berhasil!</h3>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 pt-2 border-t border-white/5 bg-[#080808]/50 backdrop-blur-md">
          {step === 1.5 && (
            <button disabled={isLoading || manualId.length < 5} onClick={handleVerifyUser} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg cursor-pointer flex items-center justify-center gap-3">
              {isLoading ? "Memverifikasi..." : "Verifikasi ID"}
            </button>
          )}
          {step === 1.6 && (
            <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg cursor-pointer">
              Benar, Lanjutkan
            </button>
          )}
          {step === 2 && (
            <button disabled={!amount} onClick={() => setStep(3)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg cursor-pointer">
              Lanjut ke PIN
            </button>
          )}
          {step === 3 && (
            <button disabled={pin.includes("")} onClick={() => setStep(4)} className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg cursor-pointer">
              Bayar Sekarang
            </button>
          )}
          {step === 4 && (
            <button onClick={onClose} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg cursor-pointer">
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}