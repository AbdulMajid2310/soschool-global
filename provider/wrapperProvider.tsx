"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import SidebarStudent from '@/app/siswa/sidebarStudent';
import SidebarParent from '@/app/wali-murid/sidebarParent';
import SidebarTeacher from '@/app/guru/sidebarTeacher';
import SidebarStaff from '@/app/staff/sidebarStaff';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProfileMe } from '@/redux/features/auth/thunk';
import { getUserRoleById } from '@/redux/features/userRole/thunk';
import { clearRoleDetail } from '@/redux/features/userRole/slice';
import LoadingScreen from '@/components/loading/loadingScreen';
import SidebarSuperAdmin from '@/app/sss/sidebarSuperAdmin';

export default function WrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { profile, authLoading } = useAppSelector((state) => state.auth);
  const { role, roleLoading } = useAppSelector((state) => state.userRole);

  useEffect(() => {
    dispatch(getProfileMe());
  }, [dispatch]);

  useEffect(() => {
    const roleId = profile?.role?.userRoleId;
    
    if (roleId) {
      dispatch(getUserRoleById(roleId));
    }

    return () => {
      dispatch(clearRoleDetail());
    };
  }, [dispatch, profile?.role?.userRoleId]);

  const renderSidebar = useMemo(() => {
    if (!role) return null;

    const sidebarProps = {
      isOpen: isSidebarOpen,
      onClose: () => setIsSidebarOpen(false)
    };

    switch (role.name.toLowerCase()) {
      case 'siswa':
        return <SidebarStudent {...sidebarProps} />;
      case 'wali-murid':
        return <SidebarParent {...sidebarProps} />;
      case 'guru':
        return <SidebarTeacher {...sidebarProps} />;
      case 'staff':
        return <SidebarStaff {...sidebarProps} />;
      case 'super-admin':
         return <SidebarSuperAdmin {...sidebarProps} />;
      default:
        return null;
    }
  }, [role, isSidebarOpen]);

  const isPublicRoute = pathname === '/' || pathname === '/login';

  if (isPublicRoute) {
    return <>{children}</>;
  }

  const isInitialLoading =  (profile && roleLoading && !role);
  
  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100">
      <div className="z-40 relative">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </div>

      <div className="flex  transition-all duration-300">
        <aside className="h-screen sticky top-0 z-20 overflow-y-auto">
          {renderSidebar}
        </aside>

        <main className="flex-1 pt-20 md:pt-4 pb-10 lg:pb-0 px-4  overflow-x-hidden">
          {!role && !roleLoading ? (
            <div className="flex h-[70vh] items-center justify-center">
              <p className="text-red-500 font-medium italic">Akses role tidak ditemukan. Silahkan hubungi admin.</p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}