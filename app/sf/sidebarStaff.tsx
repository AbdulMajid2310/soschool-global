import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  FiHome,
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiLogOut,
  FiSettings,
  FiUser,
  FiUserPlus,
  FiUsers,
  FiCheckSquare,
  FiBookOpen,
  FiGrid,
  FiBook,
  FiAward,
  FiFileText,
  FiLayers,
  FiEdit,
  FiCalendar,
  FiHeart,
  FiTrendingUp,
  FiBell,
  FiMail,
  FiMessageSquare,
  FiArchive,
  FiSliders,
  FiDatabase,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiTool,
  FiUserCheck,
} from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";

interface SubMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { id: "1", name: "Dashboard", icon: <FiHome />, href: "/sf/dashboard" },
  {
    id: "2",
    name: "Akademik",
    icon: <FiBookOpen />,
    href: "/sf/academic",
    subItems: [
      {
        id: "2.1",
        name: "Data Siswa",
        icon: <FiUser />,
        href: "/sf/academic/student",
      },
      {
        id: "2.2",
        name: "Data Guru",
        icon: <FiUsers />,
        href: "/sf/academic/teacher",
      },
      {
        id: "2.7",
        name: "Data Staff",
        icon: <FiUsers />,
        href: "/sf/academic/staff",
      },
      {
        id: "2.3",
        name: "Data Wali Murid",
        icon: <FiUserPlus />,
        href: "/sf/academic/parent",
      },
      {
        id: "2.4",
        name: "Data Kelas",
        icon: <FiGrid />,
        href: "/sf/academic/class",
      },
      {
        id: "2.5",
        name: "Mata Pelajaran",
        icon: <FiBook />,
        href: "/sf/academic/subject",
      },
      {
        id: "2.6",
        name: "Kalender Akademik",
        icon: <FiCalendar />,
        href: "/sf/academic/calendar",
      },
    ],
  },
  {
    id: "3",
    name: "Pendaftaran",
    icon: <FiUserPlus />,
    href: "/sf/registration",
    subItems: [
      {
        id: "3.1",
        name: "Formulir Pendaftaran",
        icon: <FiEdit />,
        href: "/sf/registration/form",
      },
      {
        id: "3.2",
        name: "Data Pendaftar",
        icon: <FiUsers />,
        href: "/sf/registration/data",
      },
      {
        id: "3.3",
        name: "Proses Seleksi",
        icon: <FiCheckSquare />,
        href: "/sf/registration/selection",
      },
    ],
  },
  {
    id: "11",
    name: "Kehadiran",
    icon: <FiCheckCircle />,
    href: "/sf/attendance",
    subItems: [
      {
        id: "11.1",
        name: "Kehadiran Siswa",
        icon: <FiUser />,
        href: "/sf/attendance/student",
      },
      {
        id: "11.2",
        name: "Kehadiran Staff",
        icon: <FiUsers />,
        href: "/sf/attendance/staff",
      },
      {
        id: "11.3",
        name: "Laporan Kehadiran",
        icon: <FiFileText />,
        href: "/sf/attendance/report",
      },
    ],
  },
  {
    id: "12",
    name: "Penjadwalan",
    icon: <FiCalendar />,
    href: "/sf/scheduling",
    subItems: [
      {
        id: "12.1",
        name: "Jadwal Pelajaran",
        icon: <FiClock />,
        href: "/sf/scheduling/lesson",
      },
      {
        id: "12.2",
        name: "Jadwal Ujian",
        icon: <FiCalendar />,
        href: "/sf/scheduling/exam",
      },
      {
        id: "12.3",
        name: "Jadwal Guru",
        icon: <FiUserCheck />,
        href: "/sf/scheduling/teacher",
      },
    ],
  },
  {
    id: "4",
    name: "Keuangan",
    icon: <FiDollarSign />,
    href: "/sf/finance",
    subItems: [
      {
        id: "4.1",
        name: "Tagihan Siswa",
        icon: <FiFileText />,
        href: "/sf/finance/billing",
      },
      {
        id: "4.2",
        name: "Pembayaran",
        icon: <FiCreditCard />,
        href: "/sf/finance/payment",
      },
      {
        id: "4.3",
        name: "Penggajian",
        icon: <FiDollarSign />,
        href: "/sf/finance/payroll",
      },
      {
        id: "4.4",
        name: "Laporan Keuangan",
        icon: <FiPieChart />,
        href: "/sf/finance/report",
      },
    ],
  },
  {
    id: "5",
    name: "Nilai & Raport",
    icon: <FiFileText />,
    href: "/sf/grades",
    subItems: [
      {
        id: "5.1",
        name: "Input Nilai",
        icon: <FiEdit />,
        href: "/sf/grades/input",
      },
      {
        id: "5.2",
        name: "Raport Siswa",
        icon: <FiLayers />,
        href: "/sf/grades/report-card",
      },
      {
        id: "5.3",
        name: "Analitik Nilai",
        icon: <FiTrendingUp />,
        href: "/sf/grades/analytics",
      },
    ],
  },
  {
    id: "10",
    name: "Pengaturan Sistem",
    icon: <FiSliders />,
    href: "/sf/settings",
    subItems: [
      {
        id: "10.1",
        name: "Pengguna & Hak Akses",
        icon: <FiUsers />,
        href: "/sf/settings/users",
      },
      {
        id: "10.2",
        name: "Parameter Sistem",
        icon: <FiSettings />,
        href: "/sf/settings/parameters",
      },
      {
        id: "10.3",
        name: "Backup & Restore",
        icon: <FiDatabase />,
        href: "/sf/settings/backup",
      },
      {
        id: "10.4",
        name: "Manajemen Lisensi",
        icon: <GrCertificate />,
        href: "/sf/settings/license",
      },
    ],
  },
];

export default function SidebarStaff({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenuItems, setExpandedMenuItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuItem = (itemId: string) => {
    setExpandedMenuItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
  };

  useEffect(() => {
    const activeParentItem = menuItems.find(
      (item) => pathname.startsWith(item.href) && item.subItems,
    );
    if (activeParentItem) setExpandedMenuItems([activeParentItem.id]);
  }, [pathname]);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subItems?.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <aside
      className={`fixed h-screen lg:relative inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 pt-30">
        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        {filteredMenuItems.map((item) => {
          const isExpanded = expandedMenuItems.includes(item.id);
          const isParentActive = pathname.startsWith(item.href);

          return (
            <div key={item.id} className="mb-1">
              <button
                onClick={() =>
                  item.subItems
                    ? toggleMenuItem(item.id)
                    : router.push(item.href)
                }
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isParentActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${isParentActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.subItems && (
                  <FiChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  />
                )}
              </button>

              {item.subItems && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded
                      ? "max-h-96 opacity-100 mt-1"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems.map((sub) => {
                    const isSubActive = pathname.startsWith(sub.href);

                    return (
                      <button
                        key={sub.id}
                        onClick={() => router.push(sub.href)}
                        className={`w-full flex items-center gap-3 pl-11 pr-4 py-2 text-sm rounded-lg transition-colors ${
                          isSubActive
                            ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-900/10"
                            : "text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <span className="text-base">{sub.icon}</span>
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div
        className="p-4 border-t border-gray-100 dark:border-gray-800"
        ref={profileMenuRef}
      >
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm overflow-hidden">
              <img
                src="/images/background-school.webp"
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                Abdul Majid
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Staff Sekolah
              </p>
            </div>
            <FiChevronDown
              className={`w-4 h-4 transition-transform text-gray-400 ${isProfileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-bottom-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <FiUser /> Profil Saya
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <FiSettings /> Pengaturan
              </button>
              <div className="my-1 border-t border-gray-100 dark:border-gray-700" />
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                <FiLogOut /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
