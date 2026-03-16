"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiAward,
  FiActivity,
  FiHeart,
  FiStar,
  FiClock,
} from "react-icons/fi";

interface RouteTab {
  fitur: string;
  url: string;
  icon: React.ReactNode;
}

const TABS_CONFIG: RouteTab[] = [
  { fitur: "Biodata", url: "biodata", icon: <FiUser /> },
  {
    fitur: "Kepegawaian & Legal",
    url: "employment-legal",
    icon: <FiBriefcase />,
  },
  {
    fitur: "Riwayat Pendidikan",
    url: "education-history",
    icon: <FiBookOpen />,
  },
  {
    fitur: "Kompetensi & Sertifikasi",
    url: "competency-certification",
    icon: <FiAward />,
  },
  { fitur: "Beban Kerja", url: "workload-assignment", icon: <FiActivity /> },
  { fitur: "Kesehatan", url: "health", icon: <FiHeart /> },
  { fitur: "Prestasi", url: "achievement", icon: <FiStar /> },
  { fitur: "Pengalaman", url: "experience", icon: <FiClock /> },
];

export default function TabsProfileAdministration() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const currentTab = TABS_CONFIG.findIndex((tab) =>
      pathname.includes(tab.url),
    );
    if (currentTab >= 0) {
      setActiveIndex(currentTab);
      tabRef.current[currentTab]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname]);

  const handleTabClick = (url: string, index: number) => {
    setActiveIndex(index);
    router.push(`/profile/administration/${url}`);
  };

  return (
    <div className="w-full bg-slate-200 dark:bg-gray-900 rounded-2xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {TABS_CONFIG.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.url}
              ref={(el) => {
                tabRef.current[index] = el;
              }}
              onClick={() => handleTabClick(item.url, index)}
              className={`
                relative shrink-0 flex items-center gap-3 px-5 py-5 text-sm font-bold tracking-tight transition-all duration-300
                ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                }
              `}
            >
              <span
                className={`text-lg transition-transform duration-300 ${isActive ? "scale-110" : "opacity-70 group-hover:opacity-100"}`}
              >
                {item.icon}
              </span>
              <span className="relative z-10 whitespace-nowrap">
                {item.fitur}
              </span>

              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)] transition-all" />
              )}

              {/* Background Hover Effect */}
              <div
                className={`
                absolute inset-x-1 inset-y-2 rounded-2xl transition-all duration-300 z-0
                ${isActive ? "bg-blue-50/60 dark:bg-blue-900/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/40"}
              `}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
