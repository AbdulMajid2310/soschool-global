"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  FiArrowLeft, FiCamera, FiCheck, FiChevronDown, 
  FiGlobe, FiMail, FiPhone, FiInfo, FiShield, FiCalendar
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearError } from "@/redux/features/school/slice";
import { createSchool } from "@/redux/features/school/thunk";

const LEVELS = ["SD", "SLTP", "SLTA"];
const PLANS = ["Basic", "Premium", "Pro"];

export default function AddSchoolForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.school);

  const [level, setLevel] = useState("SD");
  const [plan, setPlan] = useState("Basic");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [previews, setPreviews] = useState({ avatar: "", background: "" });
  const avatarRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'background') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError());

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      nisp: formData.get("nisp") as string,
      email: formData.get("email") as string,
      establishedDate: formData.get("establishedDate") as string,
      accreditation: formData.get("accreditation") as string,
      level, 
      plan,
      domain: (formData.get("domain") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
      avatar: avatarRef.current?.files?.[0],
      background: backgroundRef.current?.files?.[0],
    };

    const result = await dispatch(createSchool(payload));
    
    if (createSchool.fulfilled.match(result)) {
      toast.success("Sekolah Berhasil Didaftarkan!");
      router.push("/dashboard/schools");
    } else {
      toast.error(result.payload as string || "Terjadi kesalahan sistem");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Tombol Submit dihubungkan ke form via ID */}
        <div className="flex items-center justify-between mb-10">
          <button 
            type="button"
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-slate-500 hover:text-blue-600 font-semibold transition-all"
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:shadow-md transition-all">
              <FiArrowLeft className="w-5 h-5" />
            </div>
            <span>Kembali</span>
          </button>
          
          <div className="text-right">
             <button
                form="school-form" // MENGHUBUNGKAN BUTTON KE FORM
                type="submit"
                disabled={loading}
                className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-blue-500/30 transition-all active:scale-[0.97] disabled:bg-slate-400 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Daftarkan Sekolah</>
                )}
              </button>
          </div>
        </div>

        {/* Tambahkan ID pada form */}
        <form id="school-form" onSubmit={handleSubmit} className="space-y-8">
          
          {/* ASSETS SECTION */}
          <div className="relative group">
            <div className="h-64 md:h-80 w-full rounded-[40px] bg-slate-200 dark:bg-slate-800 overflow-hidden relative border-4 border-white dark:border-slate-900 shadow-2xl">
              {previews.background ? (
                <img src={previews.background} className="w-full h-full object-cover" alt="bg" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <FiCamera className="text-4xl mb-2" />
                  <p className="text-sm font-medium">Klik icon kamera untuk background</p>
                </div>
              )}
              <button 
                type="button"
                onClick={() => backgroundRef.current?.click()}
                className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/40 transition-all text-white border border-white/30"
              >
                <FiCamera className="w-6 h-6" />
              </button>
              <input type="file" ref={backgroundRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'background')} />
            </div>

            <div className="absolute -bottom-12 left-12 h-32 w-32 md:h-40 md:w-40 rounded-full bg-white dark:bg-slate-900 border-[6px] border-[#f8fafc] dark:border-[#020617] overflow-hidden shadow-xl flex items-center justify-center group/avatar">
              {previews.avatar ? (
                <img src={previews.avatar} className="w-full h-full object-cover" alt="logo" />
              ) : (
                <div className="text-slate-300 dark:text-slate-700 flex flex-col items-center">
                  <FiCamera className="text-3xl" />
                </div>
              )}
              <button 
                type="button"
                onClick={() => avatarRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white"
              >
                <FiCamera className="w-6 h-6" />
              </button>
              <input type="file" ref={avatarRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
            </div>
          </div>

          <div className="pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <FiInfo className="text-blue-600 w-5 h-5" />
                  <h2 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-sm">Informasi Institusi</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Nama Sekolah" name="name" placeholder="SMA Negeri 1..." required />
                  <InputField label="NISP / NPSN" name="nisp" placeholder="10293XXX" required />
                  <InputField label="Email Resmi" name="email" type="email" placeholder="admin@sekolah.sch.id" required />
                  <InputField label="Nomor Telepon" name="phone" placeholder="+62..." />
                </div>
                
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Alamat Subdomain</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden">
                    <input name="domain" className="flex-1 p-4 bg-transparent outline-hidden font-medium" placeholder="slug-nama-sekolah" />
                    <span className="px-5 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold border-l border-slate-200 dark:border-slate-700">.soschool.site</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <FiShield className="text-purple-600 w-5 h-5" />
                  <h2 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest text-sm">Sistem & Paket</h2>
                </div>

                <CustomSelect 
                  label="Jenjang Pendidikan" 
                  value={level} 
                  options={LEVELS} 
                  isOpen={openDropdown === 'level'} 
                  setOpen={(val) => setOpenDropdown(val ? 'level' : null)} 
                  onSelect={setLevel} 
                />

                <CustomSelect 
                  label="Paket Layanan" 
                  value={plan} 
                  options={PLANS} 
                  isOpen={openDropdown === 'plan'} 
                  setOpen={(val) => setOpenDropdown(val ? 'plan' : null)} 
                  onSelect={setPlan} 
                />

                <InputField label="Tanggal Berdiri" name="establishedDate" type="date" required />
                <InputField label="Akreditasi" name="accreditation" placeholder="A / B / Unggul" required />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// 1. Definisikan Interface untuk Props agar lebih aman
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  setOpen: (val: boolean) => void; // Menentukan bahwa val adalah boolean
  onSelect: (val: string) => void;
}

// 2. Terapkan pada Sub-komponen Input
function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black rounded-2xl uppercase text-slate-400 tracking-[0.2em] ml-2 group-focus-within:text-blue-500 transition-colors">
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl p-4 ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-blue-500 outline-hidden transition-all font-medium"
      />
    </div>
  );
}

// 3. Terapkan pada Sub-komponen Custom Select
function CustomSelect({ label, value, options, isOpen, setOpen, onSelect }: CustomSelectProps) {
  return (
    <div className="space-y-2 relative">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!isOpen)} // val di sini otomatis boolean
        className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 hover:ring-blue-400 transition-all font-bold text-slate-700 dark:text-slate-300"
      >
        {value}
        <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
          {options.map((opt: string) => (
            <button
              key={opt}
              type="button"
              onClick={() => { 
                onSelect(opt); 
                setOpen(false); 
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between ${
                value === opt 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {opt}
              {value === opt && <FiCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}