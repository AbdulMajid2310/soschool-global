import { useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
  // Core & Navigation Icons
  FiHome, FiMenu, FiX, FiSearch, FiChevronDown, FiChevronRight, FiLogOut, FiSettings, FiHelpCircle, FiUser,
  // Academic Icons
  FiUserPlus, FiUsers, FiCheckSquare, FiBookOpen, FiGrid, FiBook, FiAward, FiFileText, FiLayers, FiEdit, FiCalendar,
  // Talent & Communication
  FiHeart, FiTrendingUp, FiBell, FiMail, FiMessageSquare,
  // Document & Finance
  FiFolder, FiFile, FiUpload, FiCheckCircle, FiDollarSign, FiCreditCard, FiPieChart,
  // Facility & Library
  FiTool, FiArchive,
  // System & UI
  FiMoon, FiSun, FiSliders, FiDatabase, FiActivity, FiClock, FiMapPin, FiPrinter, FiDownload,
  FiAlertTriangle, FiUserCheck,
} from 'react-icons/fi';
import { GrCertificate } from 'react-icons/gr';

// --- TYPE DEFINITIONS ---
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

// Menu items yang telah diperluas dengan prefix /staff
const menuItems: MenuItem[] = [
  { id: '1', name: 'Dashboard', icon: <FiHome />, href: '/staff/dashboard' },
  {
    id: '2', name: 'Akademik', icon: <FiBookOpen />, href: '/staff/akademik', subItems: [
      { id: '2.1', name: 'Data Siswa', icon: <FiUser />, href: '/staff/akademik/siswa' },
      { id: '2.2', name: 'Data Guru & Staf', icon: <FiUsers />, href: '/staff/akademik/guru-staff' },
      { id: '2.7', name: 'Data Staff', icon: <FiUsers />, href: '/staff/akademik/staff' },
      { id: '2.3', name: 'Data Wali Murid', icon: <FiUserPlus />, href: '/staff/akademik/wali' },
      { id: '2.4', name: 'Data Kelas', icon: <FiGrid />, href: '/staff/akademik/kelas' },
      { id: '2.5', name: 'Mata Pelajaran', icon: <FiBook />, href: '/staff/akademik/mapel' },
      { id: '2.6', name: 'Kalender Akademik', icon: <FiCalendar />, href: '/staff/akademik/kalender' }
    ]
  },
  {
    id: '3', name: 'Pendaftaran', icon: <FiUserPlus />, href: '/staff/pendaftaran', subItems: [
      { id: '3.1', name: 'Formulir Pendaftaran', icon: <FiEdit />, href: '/staff/pendaftaran/formulir' },
      { id: '3.2', name: 'Data Pendaftar', icon: <FiUsers />, href: '/staff/pendaftaran/data' },
      { id: '3.3', name: 'Proses Seleksi', icon: <FiCheckSquare />, href: '/staff/pendaftaran/seleksi' }
    ]
  },
  {
    id: '11', name: 'Kehadiran', icon: <FiCheckCircle />, href: '/staff/kehadiran', subItems: [
      { id: '11.1', name: 'Kehadiran Siswa', icon: <FiUser />, href: '/staff/kehadiran/siswa' },
      { id: '11.2', name: 'Kehadiran Staff', icon: <FiUsers />, href: '/staff/kehadiran/staff' },
      { id: '11.3', name: 'Laporan Kehadiran', icon: <FiFileText />, href: '/staff/kehadiran/laporan' }
    ]
  },
  {
    id: '12', name: 'Penjadwalan', icon: <FiCalendar />, href: '/staff/penjadwalan', subItems: [
      { id: '12.1', name: 'Jadwal Pelajaran', icon: <FiClock />, href: '/staff/penjadwalan/pelajaran' },
      { id: '12.2', name: 'Jadwal Ujian', icon: <FiCalendar />, href: '/staff/penjadwalan/ujian' },
      { id: '12.3', name: 'Jadwal Guru', icon: <FiUserCheck />, href: '/staff/penjadwalan/guru' }
    ]
  },
  {
    id: '4', name: 'Keuangan', icon: <FiDollarSign />, href: '/staff/keuangan', subItems: [
      { id: '4.1', name: 'Tagihan Siswa', icon: <FiFileText />, href: '/staff/keuangan/tagihan' },
      { id: '4.2', name: 'Pembayaran', icon: <FiCreditCard />, href: '/staff/keuangan/pembayaran' },
      { id: '4.3', name: 'Penggajian', icon: <FiDollarSign />, href: '/staff/keuangan/gaji' },
      { id: '4.4', name: 'Laporan Keuangan', icon: <FiPieChart />, href: '/staff/keuangan/laporan' },
      { id: '4.5', name: 'Anggaran', icon: <FiDatabase />, href: '/staff/keuangan/anggaran' }
    ]
  },
  {
    id: '5', name: 'Nilai & Raport', icon: <FiFileText />, href: '/staff/nilai', subItems: [
      { id: '5.1', name: 'Input Nilai', icon: <FiEdit />, href: '/staff/nilai/input' },
      { id: '5.2', name: 'Raport Siswa', icon: <FiLayers />, href: '/staff/nilai/raport' },
      { id: '5.3', name: 'Analitik Nilai', icon: <FiTrendingUp />, href: '/staff/nilai/analitik' }
    ]
  },
  {
    id: '6', name: 'Ekstrakurikuler & Prestasi', icon: <FiAward />, href: '/staff/ekskul', subItems: [
      { id: '6.1', name: 'Data Ekstrakurikuler', icon: <FiHeart />, href: '/staff/ekskul/data' },
      { id: '6.2', name: 'Pencapaian Siswa', icon: <FiAward />, href: '/staff/ekskul/prestasi' }
    ]
  },
  {
    id: '7', name: 'Perpustakaan', icon: <FiBookOpen />, href: '/staff/perpustakaan', subItems: [
      { id: '7.1', name: 'Katalog Buku', icon: <FiBook />, href: '/staff/perpustakaan/katalog' },
      { id: '7.2', name: 'Peminjaman', icon: <FiArchive />, href: '/staff/perpustakaan/peminjaman' },
      { id: '7.3', name: 'Denda', icon: <FiDollarSign />, href: '/staff/perpustakaan/denda' }
    ]
  },
  {
    id: '8', name: 'Inventaris & Sarana', icon: <FiTool />, href: '/staff/inventaris', subItems: [
      { id: '8.1', name: 'Data Aset', icon: <FiDatabase />, href: '/staff/inventaris/aset' },
      { id: '8.2', name: 'Pemeliharaan', icon: <FiSettings />, href: '/staff/inventaris/pemeliharaan' },
      { id: '8.3', name: 'Ruangan', icon: <FiGrid />, href: '/staff/inventaris/ruangan' }
    ]
  },
  {
    id: '9', name: 'Komunikasi', icon: <FiMessageSquare />, href: '/staff/komunikasi', subItems: [
      { id: '9.1', name: 'Pengumuman', icon: <FiBell />, href: '/staff/komunikasi/pengumuman' },
      { id: '9.2', name: 'Pesan', icon: <FiMail />, href: '/staff/komunikasi/pesan' }
    ]
  },
  {
    id: '13', name: 'Laporan Terpadu', icon: <FiPieChart />, href: '/staff/laporan', subItems: [
      { id: '13.1', name: 'Laporan Akademik', icon: <FiTrendingUp />, href: '/staff/laporan/akademik' },
      { id: '13.2', name: 'Laporan Keuangan', icon: <FiDollarSign />, href: '/staff/laporan/keuangan' },
      { id: '13.3', name: 'Laporan Kehadiran', icon: <FiCheckCircle />, href: '/staff/laporan/kehadiran' }
    ]
  },
  {
    id: '14', name: 'Portal Orang Tua', icon: <FiUsers />, href: '/staff/portal-orang-tua', subItems: [
      { id: '14.1', name: 'Tinjauan Anak', icon: <FiUser />, href: '/staff/portal-orang-tua/tinjauan' },
      { id: '14.2', name: 'Komunikasi', icon: <FiMail />, href: '/staff/portal-orang-tua/komunikasi' }
    ]
  },
  {
    id: '10', name: 'Pengaturan Sistem', icon: <FiSliders />, href: '/staff/pengaturan', subItems: [
      { id: '10.1', name: 'Pengguna & Hak Akses', icon: <FiUsers />, href: '/staff/pengaturan/pengguna' },
      { id: '10.2', name: 'Parameter Sistem', icon: <FiSettings />, href: '/staff/pengaturan/parameter' },
      { id: '10.3', name: 'Backup & Restore', icon: <FiDatabase />, href: '/staff/pengaturan/backup' },
      { id: '10.4', name: 'Menejemen Lisensi', icon: <GrCertificate />, href: '/staff/pengaturan/lisensi' }
    ]
  },
];






export default function SidebarStaff({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenuItems, setExpandedMenuItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { profile } = useAppSelector((state) => state.auth);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuItem = (itemId: string) => {
    setExpandedMenuItems(prev => prev.includes(itemId) ? [] : [itemId]);
  };

  useEffect(() => {
    const activeParentItem = menuItems.find(item =>
      pathname.startsWith(item.href) && item.subItems
    );
    if (activeParentItem) setExpandedMenuItems([activeParentItem.id]);
  }, [pathname]);

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subItems?.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <aside className={`fixed h-screen lg:relative inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300 lg:translate-x-0  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>


      {/* Search Section */}
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

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
        {filteredMenuItems.map((item) => {
          const isExpanded = expandedMenuItems.includes(item.id);
          const isParentActive = pathname.startsWith(item.href);

          return (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => item.subItems ? toggleMenuItem(item.id) : router.push(item.href)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${isParentActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${isParentActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.subItems && (
                  <FiChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                )}
              </button>

              {/* Submenu Accordion */}
              {item.subItems && (
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  {item.subItems.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => router.push(sub.href)}
                        className={`w-full flex items-center gap-3 pl-11 pr-4 py-2 text-sm rounded-lg transition-colors ${isSubActive
                          ? 'text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
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

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800" ref={profileMenuRef}>
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">
              <img src="/images/background-school.webp" alt="profil" className='h-full w-full object-cover rounded-full' />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                {'Abdul Majid'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Staff Sekolah</p>
            </div>
            <FiChevronDown className={`w-4 h-4 transition-transform text-gray-400 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Upwards */}
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
