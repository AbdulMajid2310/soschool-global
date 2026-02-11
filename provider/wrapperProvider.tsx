"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';
import { getUserRoleById } from '@/redux/features/userRole/thunk';
import { clearRoleDetail } from '@/redux/features/userRole/slice';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/header';
import LoadingScreen from '@/components/loading/loadingScreen';

// Impor sidebar secara dinamis atau kelompokkan
import SidebarStudent from '@/app/siswa/sidebarStudent';
import SidebarParent from '@/app/wali-murid/sidebarParent';
import SidebarTeacher from '@/app/guru/sidebarTeacher';
import SidebarStaff from '@/app/staff/sidebarStaff';
import SidebarSuperAdmin from '@/app/sss/sidebarSuperAdmin';

const ROLE_CODES = {
  STUDENT: '188728',
  PARENT: '12323',
  TEACHER: '18787',
  STAFF: '18333',
  SUPER_ADMIN: '1842648',
} as const;

export default function WrapperProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile, authLoading } = useAppSelector((state) => state.auth);
  const { role, roleLoading } = useAppSelector((state) => state.userRole);

  const isPublicRoute = useMemo(() => ['/', '/login'].includes(pathname), [pathname]);

  // 1. Auth Guard & Profile Fetching
  useEffect(() => {
    const token = localStorage.getItem('sid');

    if (!token) {
      if (!isPublicRoute) router.replace('/login');
      return;
    }

    if (!profile && !authLoading) {
      dispatch(getProfileMe());
    }
  }, [dispatch, isPublicRoute, router, profile, authLoading]);

  // 2. Role Detail Fetching
  const userRoleId = profile?.role?.userRoleId;
  useEffect(() => {
    if (userRoleId) {
      dispatch(getUserRoleById(userRoleId));
    }
    return () => { dispatch(clearRoleDetail()); };
  }, [dispatch, userRoleId]);

  // 3. Dynamic Sidebar Mapper
  const SidebarComponent = useMemo(() => {
    if (!role?.code) return null;
    const code = role.code.toLowerCase();

    const sidebars: Record<string, React.ElementType> = {
      [ROLE_CODES.STUDENT]: SidebarStudent,
      [ROLE_CODES.PARENT]: SidebarParent,
      [ROLE_CODES.TEACHER]: SidebarTeacher,
      [ROLE_CODES.STAFF]: SidebarStaff,
      [ROLE_CODES.SUPER_ADMIN]: SidebarSuperAdmin,
    };

    const Component = sidebars[code];
    return Component ? <Component isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> : null;
  }, [role, isSidebarOpen]);

  if (isPublicRoute) return <>{children}</>;

  // Loading state handling
  const isLoading = authLoading || (profile && roleLoading && !role);
  if (isLoading) return <LoadingScreen />;

  // Error state: Profile fetched but no role found
  if (!isLoading && !role && !isPublicRoute) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <AccessDeniedCard onRetry={() => router.push('/login')} />
      </div>
    );
  }

  return (
    <div className="h-screen  bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />

      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex ">
        <aside className="hidden md:block h-screen sticky top-0 z-20 border-r border-gray-200 dark:border-gray-800">
          {SidebarComponent}
        </aside>

        {/* Mobile Sidebar with semantic <dialog> or Portal feel */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-64 h-full bg-white dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
              {SidebarComponent}
            </div>
          </div>
        )}

        <main className="flex-1 pt-20 md:pt-20  px-4 scrollbar-hide h-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

// Sub-component for cleaner JSX
const AccessDeniedCard = ({ onRetry }: { onRetry: () => void }) => (
  <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30 text-center">
    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
    <p className="text-red-600 dark:text-red-400 font-bold mb-2 uppercase tracking-widest text-xs">Akses Ditolak</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-6">Role tidak valid atau sesi berakhir.</p>
    <button onClick={onRetry} className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-sm font-bold transition-transform active:scale-95">
      Kembali ke Login
    </button>
  </div>
);