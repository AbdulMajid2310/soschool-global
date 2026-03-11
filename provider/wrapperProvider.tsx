"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileMe } from "@/redux/features/auth/thunk";

import Header from "@/components/header";
import LoadingScreen from "@/components/loading/loadingScreen";

// Import Sidebar
import SidebarStudent from "@/app/sis/sidebarStudent";
import SidebarParent from "@/app/wm/sidebarParent";
import SidebarTeacher from "@/app/gr/sidebarTeacher";
import SidebarStaff from "@/app/sf/sidebarStaff";
import SidebarSuperAdmin from "@/app/sss/sidebarSuperAdmin";

const ROLE_CONFIG: Record<
  string,
  { component: React.ElementType; prefix: string }
> = {
  [process.env.NEXT_PUBLIC_ROLE_STUDENT_ID || ""]: {
    component: SidebarStudent,
    prefix: "/sis",
  },
  [process.env.NEXT_PUBLIC_ROLE_PARENT_ID || ""]: {
    component: SidebarParent,
    prefix: "/wm",
  },
  [process.env.NEXT_PUBLIC_ROLE_TEACHER_ID || ""]: {
    component: SidebarTeacher,
    prefix: "/gr",
  },
  [process.env.NEXT_PUBLIC_ROLE_STAFF_ID || ""]: {
    component: SidebarStaff,
    prefix: "/sf",
  },
  [process.env.NEXT_PUBLIC_ROLE_SUPER_ADMIN_ID || ""]: {
    component: SidebarSuperAdmin,
    prefix: "/sss",
  },
};

const PROTECTED_PREFIXES = ["/sis", "/wm", "/gr", "/sf", "/sss"];

export default function WrapperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { profile, authLoading } = useAppSelector((state) => state.auth);

  // --- ROUTE MATCHERS ---
  const isAuthPage = useMemo(() => pathname.startsWith("/auth"), [pathname]);
  const isPublicRoute = useMemo(
    () => ["/", "/login", "/verify-account"].includes(pathname) || isAuthPage,
    [pathname, isAuthPage],
  );
  const isSelectRolePage = useMemo(
    () => pathname === "/select-role",
    [pathname],
  );

  // Header & Sidebar hanya muncul jika bukan public, bukan select-role, dan bukan /auth/
  const shouldShowLayout = !isPublicRoute && !isSelectRolePage;

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  // --- AUTH LOGIC ---
  useEffect(() => {
    const token = localStorage.getItem("sid");

    if (!token) {
      if (!isPublicRoute) router.replace("/login");
      return;
    }

    if (!profile && !authLoading) {
      dispatch(getProfileMe());
    }
  }, [profile, authLoading, isPublicRoute, dispatch, router]);

  // --- ROLE VALIDATION (SECURITY) ---
  useEffect(() => {
    if (profile && !isPublicRoute && !isSelectRolePage) {
      const activeRoleCode = String(profile.activeContext?.role?.code);
      const config = ROLE_CONFIG[activeRoleCode];

      const isAccessingOtherRole = PROTECTED_PREFIXES.some(
        (prefix) =>
          pathname.startsWith(prefix) && (!config || prefix !== config.prefix),
      );

      if (isAccessingOtherRole) {
        console.warn("⚠️ Illegal Access: Redirecting to /home");
        router.replace("/home");
      }
    }
  }, [profile, pathname, isPublicRoute, isSelectRolePage, router]);

  // --- SIDEBAR COMPONENT SELECTOR ---
  const SidebarComponent = useMemo(() => {
    const code = profile?.activeContext?.role?.code;
    return code ? ROLE_CONFIG[String(code)]?.component : null;
  }, [profile?.activeContext?.role?.code]);

  // --- RENDERER ---

  // 1. Public / Auth Pages (No Layout)
  if (isPublicRoute) return <>{children}</>;

  // 2. Loading State
  if (authLoading || (!profile && localStorage.getItem("sid"))) {
    return <LoadingScreen />;
  }

  // 3. Authenticated but no profile yet
  if (!profile) return null;

  return (
    <div className="h-screen bg-[#F4F7FA] dark:bg-gray-900 font-sans overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{ style: { zIndex: 9999 } }}
      />

      {/* Header (Hidden on Auth/SelectRole) */}
      {shouldShowLayout && (
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      )}

      <div className="flex h-full">
        {/* Desktop Sidebar */}
        {shouldShowLayout && SidebarComponent && (
          <aside className="hidden md:block h-full sticky top-0 z-20 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <SidebarComponent isOpen={false} onClose={closeSidebar} />
          </aside>
        )}

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && shouldShowLayout && SidebarComponent && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={closeSidebar}
          >
            <div
              className="w-64 h-full bg-white dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarComponent isOpen={true} onClose={closeSidebar} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 h-full overflow-y-auto scrollbar-hide ${shouldShowLayout ? "pt-16 md:pt-20" : ""}`}
        >
          <div className="max-w-7xl mx-auto py-6 px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
