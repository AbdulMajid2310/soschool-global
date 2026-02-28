"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface RouteTab {
  fitur: string;
  url: string; 
}

const RouteTabTeacherAndStaff: RouteTab[] = [
  { fitur: "Biodata", url: "/bio" },
  { fitur: "Kepegawaian & Legal", url: "/kepegawaian-legal" },
  { fitur: "Riwayat Pendidikan", url: "/riwayat-pendidikan" },
  { fitur: "Kompetensi & Sertifikasi", url: "/kompetensi-sertifikasi" },
  { fitur: "Beban Kerja & Penugasan", url: "/beban-kerja" },
  { fitur: "Kesehatan", url: "/kesehatan" },
  { fitur: "Prestasi", url: "/prestasi" },
  { fitur: "Pengalaman", url: "/pengalaman" },
];

export default function TabsTeacherAndStaff() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tabRef = useRef<(HTMLButtonElement | null)[]>([]);
  const underlineRef = useRef<HTMLSpanElement | null>(null);

  // Ambil path terakhir dari URL untuk mencocokkan tab
  const getLastPath = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    return parts.length ? `/${parts[parts.length - 1]}` : "/";
  };

  // Set active tab berdasarkan path terakhir
  useEffect(() => {
    const lastPath = getLastPath(pathname);
    const idx = RouteTabTeacherAndStaff.findIndex(tab => tab.url === lastPath);
    if (idx >= 0) setActiveIndex(idx);
  }, [pathname]);

  // Pindahkan underline ke tab aktif
  useEffect(() => {
    const currentTab = tabRef.current[activeIndex];
    if (currentTab && underlineRef.current) {
      underlineRef.current.style.width = `${currentTab.offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${currentTab.offsetLeft}px)`;
    }
  }, [activeIndex]);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-sm">
      <div className="relative flex gap-2 overflow-x-auto scrollbar-hide">
        {RouteTabTeacherAndStaff.map((item, index) => (
          <button
            key={index}
            ref={(el) => { tabRef.current[index] = el; }}
            onClick={() => router.push(`/staff/akademik/guru-staff/detail${item.url}`)}
            aria-current={activeIndex === index ? "page" : undefined}
            className={`
              px-6 py-2 text-sm font-medium transition-all whitespace-nowrap
              rounded-full
              ${activeIndex === index
                ? "text-blue-600 dark:text-blue-400 font-semibold shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"}
              hover:scale-105
            `}
          >
            {item.fitur}
          </button>
        ))}
        {/* Underline */}
        <span
          ref={underlineRef}
          className="absolute bottom-0 left-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300"
        />
      </div>
    </div>
  );
}
