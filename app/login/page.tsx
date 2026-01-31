'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosInstance';

interface Role {
  userRoleId: string;
  name: string;
  url: string;
}

interface AccessDetail {
  userAccessId: string;
  role: Role;
}

interface SchoolAccess {
  schoolId: string;
  schoolName: string;
  accessDetails: AccessDetail[];
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [availableAccess, setAvailableAccess] = useState<SchoolAccess[]>([]);

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
    try {
      
      setLoading(true);
      const res = await api.post('/auth/select-role', { userAccessId });
      const { sid, redirectUrl } = res.data.data;
      localStorage.setItem('sid', sid);
      const targetPath = new URL(redirectUrl).pathname;
      router.push(targetPath);
    } catch (err: any) {
      console.error('Error Select Role Stage:', err.response?.data || err.message);
      setError('Gagal memproses akses role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-blue-900/10 border border-slate-100 dark:border-slate-800 transition-all">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            So<span className="text-blue-600">School</span>
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
            {showRoleSelector ? 'Pilih akses masuk Anda' : 'Satu akun untuk seluruh ekosistem sekolah'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm border border-red-100 dark:border-red-900/30 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {error}
          </div>
        )}

        {!showRoleSelector ? (
          /* FORM LOGIN */
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Email</label>
                <input
                  type="email"
                  required
                  className="block w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="name@school.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 ml-1">Password</label>
                <input
                  type="password"
                  required
                  className="block w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 rounded-2xl shadow-lg shadow-blue-500/30 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Memproses...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* ROLE SELECTOR */
          <div className="mt-8 space-y-6 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            {availableAccess.map((school) => (
              <div key={school.schoolId} className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center px-2">
                    {school.schoolName}
                  </span>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {school.accessDetails.map((detail) => (
                    <button
                      key={detail.userAccessId}
                      onClick={() => handleSelectRole(detail.userAccessId)}
                      disabled={loading}
                      className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 rounded-2xl transition-all cursor-pointer text-left disabled:opacity-50"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 capitalize">
                          {detail.role.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Klik untuk masuk sebagai {detail.role.name}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <span className="text-lg">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => setShowRoleSelector(false)}
              className="w-full py-3 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
            >
              ← Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}