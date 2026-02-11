"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { registerTeacher } from '@/redux/features/teacher/thunk';
import { resetTeacherStatus } from '@/redux/features/teacher/slice';
import { 
  HiOutlineUserPlus, 
  HiOutlineIdentification, 
  HiOutlineEnvelope, 
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlinePhone
} from "react-icons/hi2";
import toast from 'react-hot-toast';

export default function AddTeacher() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { loading, error, success } = useAppSelector((state) => state.teacher);
  
  const schoolId = profile?.school?.schoolId;

  // Local States - Properti disesuaikan dengan CreateSchoolTeacherDto
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nik: '',
    password: '',
    nip: '',      // Sesuai DTO (sebelumnya employeeNumber)
    phone: '',    // Pastikan phone terisi karena di DTO @IsNotEmpty
  });

  useEffect(() => {
    if (success) {
      setFormData({ username: '', email: '', nik: '', password: '', nip: '', phone: '' });
      dispatch(resetTeacherStatus());
      toast.success('Guru berhasil didaftarkan!');
    }
  }, [success, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana sebelum kirim
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan");
      return;
    }

    // Pastikan mengirim payload yang persis sama dengan DTO
    dispatch(registerTeacher({ 
      ...formData, 
      schoolId: schoolId // Harus UUID
    }));
  };

  const inputClass = "w-full px-6 py-4 bg-slate-50 dark:bg-gray-900 border border-transparent focus:border-indigo-500 dark:text-white rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold placeholder:text-slate-400";
  const labelClass = "text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 dark:text-gray-500 ml-4 mb-2 block";

  return (
    <div className="w-full  lg:p-12 animate-in fade-in duration-700">
      
    

      <form onSubmit={handleSubmit} className="space-y-10">
        {error && (
          <div className="p-5 bg-rose-50 dark:bg-rose-950/30 border-l-4 border-rose-500 text-rose-700 dark:text-rose-400 rounded-2xl font-bold animate-in slide-in-from-top-1">
            {/* Menampilkan error dari backend secara detail */}
            {typeof error === 'string' ? error : "Terjadi kesalahan pada data yang dikirim"}
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-gray-950 p-3 md:p-8 rounded-2xl lg:rounded-4xl border border-slate-100 dark:border-gray-800 shadow-2xl shadow-slate-500/5'>
          
          {/* Kolom Kiri: Akun */}
          <div className="p-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600">
                <HiOutlineEnvelope size={20} />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-800 dark:text-slate-200">Kredensial Akun</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>Nama Lengkap (Username)</label>
                <input 
                  type="text" required
                  placeholder="Nama Lengkap Guru"
                  className={inputClass}
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClass}>Email Aktif</label>
                <input 
                  type="email" required
                  placeholder="guru@soschool.id"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClass}>Password Login</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min. 8 Karakter"
                    className={`${inputClass} pl-12 pr-14`}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Identitas (NIP, NIK, Phone) */}
          <div className="p-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600">
                <HiOutlineIdentification size={20} />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-slate-800 dark:text-slate-200">Data Identitas</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className={labelClass}>NIP (Nomor Induk Pegawai)</label>
                <input 
                  type="text" required
                  placeholder="Wajib diisi (Sesuai DTO)"
                  className={`${inputClass} bg-white dark:bg-gray-950 border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-none`}
                  value={formData.nip}
                  onChange={(e) => setFormData({...formData, nip: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClass}>NIK (Nomor Induk Kependudukan)</label>
                <input 
                  type="text" required
                  placeholder="16 Digit NIK KTP"
                  className={inputClass}
                  value={formData.nik}
                  onChange={(e) => setFormData({...formData, nik: e.target.value})}
                />
              </div>

              <div>
                <label className={labelClass}>Nomor Telepon/WA</label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-600" />
                  <input 
                    type="text" required
                    placeholder="08xxxxxxxxxx"
                    className={`${inputClass} pl-12`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2 flex justify-center'>
            {/* Action Button */}
        <div className="flex justify-end items-center gap-6 ">
          <button
            type="submit"
            disabled={loading}
            className="group relative flex items-center justify-center gap-4 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-10 py-5 rounded-4xl font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-xl shadow-slate-200 dark:shadow-none disabled:opacity-50 cursor-pointer active:scale-95"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Mendaftarkan...</span>
              </div>
            ) : (
              <>
                Konfirmasi Registrasi
                <HiOutlineArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </div>
          </div>
        </div>

        
      </form>
    </div>
  );
}