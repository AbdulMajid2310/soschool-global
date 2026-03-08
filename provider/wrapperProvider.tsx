"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';

import Header from '@/components/header';
import LoadingScreen from '@/components/loading/loadingScreen';
import SidebarStudent from '@/app/sis/sidebarStudent';
import SidebarParent from '@/app/wm/sidebarParent';
import SidebarTeacher from '@/app/gr/sidebarTeacher';
import SidebarStaff from '@/app/sf/sidebarStaff';
import SidebarSuperAdmin from '@/app/sss/sidebarSuperAdmin';

// 1. Mapping Role ke Sidebar dan Prefix-nya
const ROLE_CONFIG: Record<string, { component: React.ElementType, prefix: string }> = {
  [process.env.NEXT_PUBLIC_ROLE_STUDENT_ID || '']: { component: SidebarStudent, prefix: '/sis' },
  [process.env.NEXT_PUBLIC_ROLE_PARENT_ID || '']: { component: SidebarParent, prefix: '/wm' },
  [process.env.NEXT_PUBLIC_ROLE_TEACHER_ID || '']: { component: SidebarTeacher, prefix: '/gr' },
  [process.env.NEXT_PUBLIC_ROLE_STAFF_ID || '']: { component: SidebarStaff, prefix: '/sf' },
  [process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN_ID || '']: { component: SidebarSuperAdmin, prefix: '/sss' },
};

// Daftar semua folder role untuk divalidasi
const PROTECTED_PREFIXES = ['/sis', '/wm', '/gr', '/sf', '/sss'];

export default function WrapperProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile, authLoading } = useAppSelector((state) => state.auth);

  const isPublicRoute = useMemo(() => ['/', '/login', '/verify-account'].includes(pathname), [pathname]);
  const isSelectRolePage = useMemo(() => pathname === '/select-role', [pathname]);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  // --- LOGIC AUTH & REDIRECT (KETAT) ---
  useEffect(() => {
    const token = localStorage.getItem('sid');

    if (!token) {
      if (!isPublicRoute) router.replace('/login');
      return;
    }

    if (!profile && !authLoading) {
      dispatch(getProfileMe());
      return;
    }

    // VALIDASI AKSES ROLE
    if (profile && !isPublicRoute && !isSelectRolePage) {
      const activeRoleCode = String(profile.activeContext?.role?.code);
      const config = ROLE_CONFIG[activeRoleCode];

      // Tentukan apakah user sedang berada di salah satu folder role (sis, gr, sss, dll)
      const isAccessingRoleFolder = PROTECTED_PREFIXES.some(prefix => pathname.startsWith(prefix));

      if (isAccessingRoleFolder) {
        // Jika user berada di folder role, cek apakah itu foldernya dia?
        if (!config || !pathname.startsWith(config.prefix)) {
          console.warn("⚠️ Akses Ilegal terdeteksi! Menendang user ke /home");
          router.replace('/home'); // Tendang ke Home
        }
      }
    }
  }, [profile, authLoading, isPublicRoute, isSelectRolePage, pathname, router, dispatch]);

  // --- RENDER SIDEBAR ---
  const Sidebar = useMemo(() => {
    const code = profile?.activeContext?.role?.code;
    const config = code ? ROLE_CONFIG[String(code)] : null;
    return config ? config.component : null;
  }, [profile?.activeContext?.role?.code]);

  // --- RENDER LOGIC ---
  if (isPublicRoute) return <>{children}</>;

  if (authLoading || (!profile && localStorage.getItem('sid'))) {
    return <LoadingScreen />;
  }

  if (!profile) return null;

  return (
    <div className="h-screen bg-[#F4F7FA] dark:bg-gray-900 font-sans overflow-hidden">
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />

      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex h-full">
        {/* Sidebar hanya muncul jika user punya config dan bukan di halaman pilih role */}
        {Sidebar && !isSelectRolePage && (
          <aside className="hidden md:block h-full sticky top-0 z-20 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300">
            <Sidebar isOpen={false} onClose={closeSidebar} />
          </aside>
        )}

        {/* Mobile Sidebar */}
        {isSidebarOpen && Sidebar && !isSelectRolePage && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={closeSidebar}>
            <div className="w-64 h-full bg-white dark:bg-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <Sidebar isOpen={true} onClose={closeSidebar} />
            </div>
          </div>
        )}

        <main className="flex-1 pt-16 md:pt-20 px-4 h-full overflow-y-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}