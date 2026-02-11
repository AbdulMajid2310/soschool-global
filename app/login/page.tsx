'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosInstance';
import RoleSelector from './roleSelector';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [availableAccess, setAvailableAccess] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', formData);
      const { sid } = res.data.data;
      localStorage.setItem('sid', sid);
      
      const payloadBase64 = sid.split('.')[1];
      const decodedToken = JSON.parse(atob(payloadBase64));
      const accessRes = await api.get(`/user-access/user/${decodedToken.sub}`);

      setAvailableAccess(accessRes.data.data);
      setShowRoleSelector(true);
    } catch (err: any) {
      console.error('Error Login Stage:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login gagal, periksa email/password');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = async (userAccessId: string) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/select-role', { userAccessId });
      const { sid, redirectUrl } = res.data.data;
      localStorage.setItem('sid', sid);

      let targetPath: string;
      if (redirectUrl.startsWith('http')) {
        const url = new URL(redirectUrl);
        targetPath = url.pathname + url.search;
      } else {
        targetPath = redirectUrl;
      }

      router.push(targetPath);
    } catch (err: any) {
      console.error('Error Select Role Stage:', err.response?.data || err.message);
      setError('Gagal memproses akses role');
      setLoading(false);
    }
  };

  return (
    // Container utama dengan background image
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/images/background2.webp')" }} // Pastikan ekstensi file benar (.webp)
    >
      {/* Overlay Gelap agar form lebih terbaca */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />

      {/* Card Container - Menggunakan Glassmorphism style */}
      <div className="relative z-10 max-w-md w-full space-y-8 p-8  backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-800/50 transition-all">
        
        <div className="text-center">
          <div className='flex  items-center'>
          <div>
            <img src="/images/logo.png" alt="logo" className='w-20 h-20 object-contain' />
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            So<span className="text-blue-600">School</span>
          </h1>
          </div>
          <p className="mt-2 text-slate-600 dark:text-white text-sm lg:text-md lg:font-semibold font-medium">
            {showRoleSelector ? 'Pilih akses masuk Anda' : 'Satu akun untuk seluruh ekosistem sekolah'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-600 dark:text-white p-4 rounded-2xl text-sm border border-red-500/20 backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {error}
          </div>
        )}

        {!showRoleSelector ? (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="name@school.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-xl shadow-blue-600/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   Memproses...
                </div>
              ) : 'Masuk'}
            </button>
          </form>
        ) : (
          <RoleSelector 
            availableAccess={availableAccess} 
            onSelectRole={handleSelectRole} 
            onBack={() => setShowRoleSelector(false)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}