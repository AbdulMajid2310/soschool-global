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
  { id: '2', name: 'Akademik', icon: <FiBookOpen />, href: '/staff/akademik', subItems: [
    { id: '2.1', name: 'Data Siswa', icon: <FiUser />, href: '/staff/akademik/siswa' }, 
    { id: '2.2', name: 'Data Guru & Staf', icon: <FiUsers />, href: '/staff/akademik/staf' }, 
    { id: '2.3', name: 'Data Wali Murid', icon: <FiUserPlus />, href: '/staff/akademik/wali' }, 
    { id: '2.4', name: 'Data Kelas', icon: <FiGrid />, href: '/staff/akademik/kelas' }, 
    { id: '2.5', name: 'Mata Pelajaran', icon: <FiBook />, href: '/staff/akademik/mapel' }, 
    { id: '2.6', name: 'Kalender Akademik', icon: <FiCalendar />, href: '/staff/akademik/kalender' }
  ]},
  { id: '3', name: 'Pendaftaran', icon: <FiUserPlus />, href: '/staff/pendaftaran', subItems: [
    { id: '3.1', name: 'Formulir Pendaftaran', icon: <FiEdit />, href: '/staff/pendaftaran/formulir' }, 
    { id: '3.2', name: 'Data Pendaftar', icon: <FiUsers />, href: '/staff/pendaftaran/data' }, 
    { id: '3.3', name: 'Proses Seleksi', icon: <FiCheckSquare />, href: '/staff/pendaftaran/seleksi' }
  ]},
  { id: '11', name: 'Kehadiran', icon: <FiCheckCircle />, href: '/staff/kehadiran', subItems: [
    { id: '11.1', name: 'Kehadiran Siswa', icon: <FiUser />, href: '/staff/kehadiran/siswa' }, 
    { id: '11.2', name: 'Kehadiran Staf', icon: <FiUsers />, href: '/staff/kehadiran/staf' }, 
    { id: '11.3', name: 'Laporan Kehadiran', icon: <FiFileText />, href: '/staff/kehadiran/laporan' }
  ]},
  { id: '12', name: 'Penjadwalan', icon: <FiCalendar />, href: '/staff/penjadwalan', subItems: [
    { id: '12.1', name: 'Jadwal Pelajaran', icon: <FiClock />, href: '/staff/penjadwalan/pelajaran' }, 
    { id: '12.2', name: 'Jadwal Ujian', icon: <FiCalendar />, href: '/staff/penjadwalan/ujian' }, 
    { id: '12.3', name: 'Jadwal Guru', icon: <FiUserCheck />, href: '/staff/penjadwalan/guru' }
  ]},
  { id: '4', name: 'Keuangan', icon: <FiDollarSign />, href: '/staff/keuangan', subItems: [
    { id: '4.1', name: 'Tagihan Siswa', icon: <FiFileText />, href: '/staff/keuangan/tagihan' }, 
    { id: '4.2', name: 'Pembayaran', icon: <FiCreditCard />, href: '/staff/keuangan/pembayaran' }, 
    { id: '4.3', name: 'Penggajian', icon: <FiDollarSign />, href: '/staff/keuangan/gaji' }, 
    { id: '4.4', name: 'Laporan Keuangan', icon: <FiPieChart />, href: '/staff/keuangan/laporan' }, 
    { id: '4.5', name: 'Anggaran', icon: <FiDatabase />, href: '/staff/keuangan/anggaran' }
  ]},
  { id: '5', name: 'Nilai & Raport', icon: <FiFileText />, href: '/staff/nilai', subItems: [
    { id: '5.1', name: 'Input Nilai', icon: <FiEdit />, href: '/staff/nilai/input' }, 
    { id: '5.2', name: 'Raport Siswa', icon: <FiLayers />, href: '/staff/nilai/raport' }, 
    { id: '5.3', name: 'Analitik Nilai', icon: <FiTrendingUp />, href: '/staff/nilai/analitik' }
  ]},
  { id: '6', name: 'Ekstrakurikuler & Prestasi', icon: <FiAward />, href: '/staff/ekskul', subItems: [
    { id: '6.1', name: 'Data Ekstrakurikuler', icon: <FiHeart />, href: '/staff/ekskul/data' }, 
    { id: '6.2', name: 'Pencapaian Siswa', icon: <FiAward />, href: '/staff/ekskul/prestasi' }
  ]},
  { id: '7', name: 'Perpustakaan', icon: <FiBookOpen />, href: '/staff/perpustakaan', subItems: [
    { id: '7.1', name: 'Katalog Buku', icon: <FiBook />, href: '/staff/perpustakaan/katalog' }, 
    { id: '7.2', name: 'Peminjaman', icon: <FiArchive />, href: '/staff/perpustakaan/peminjaman' }, 
    { id: '7.3', name: 'Denda', icon: <FiDollarSign />, href: '/staff/perpustakaan/denda' }
  ]},
  { id: '8', name: 'Inventaris & Sarana', icon: <FiTool />, href: '/staff/inventaris', subItems: [
    { id: '8.1', name: 'Data Aset', icon: <FiDatabase />, href: '/staff/inventaris/aset' }, 
    { id: '8.2', name: 'Pemeliharaan', icon: <FiSettings />, href: '/staff/inventaris/pemeliharaan' }, 
    { id: '8.3', name: 'Ruangan', icon: <FiGrid />, href: '/staff/inventaris/ruangan' }
  ]},
  { id: '9', name: 'Komunikasi', icon: <FiMessageSquare />, href: '/staff/komunikasi', subItems: [
    { id: '9.1', name: 'Pengumuman', icon: <FiBell />, href: '/staff/komunikasi/pengumuman' }, 
    { id: '9.2', name: 'Pesan', icon: <FiMail />, href: '/staff/komunikasi/pesan' }
  ]},
  { id: '13', name: 'Laporan Terpadu', icon: <FiPieChart />, href: '/staff/laporan', subItems: [
    { id: '13.1', name: 'Laporan Akademik', icon: <FiTrendingUp />, href: '/staff/laporan/akademik' }, 
    { id: '13.2', name: 'Laporan Keuangan', icon: <FiDollarSign />, href: '/staff/laporan/keuangan' }, 
    { id: '13.3', name: 'Laporan Kehadiran', icon: <FiCheckCircle />, href: '/staff/laporan/kehadiran' }
  ]},
  { id: '14', name: 'Portal Orang Tua', icon: <FiUsers />, href: '/staff/portal-orang-tua', subItems: [
    { id: '14.1', name: 'Tinjauan Anak', icon: <FiUser />, href: '/staff/portal-orang-tua/tinjauan' }, 
    { id: '14.2', name: 'Komunikasi', icon: <FiMail />, href: '/staff/portal-orang-tua/komunikasi' }
  ]},
  { id: '10', name: 'Pengaturan Sistem', icon: <FiSliders />, href: '/staff/pengaturan', subItems: [
    { id: '10.1', name: 'Pengguna & Hak Akses', icon: <FiUsers />, href: '/staff/pengaturan/pengguna' }, 
    { id: '10.2', name: 'Parameter Sistem', icon: <FiSettings />, href: '/staff/pengaturan/parameter' }, 
    { id: '10.3', name: 'Backup & Restore', icon: <FiDatabase />, href: '/staff/pengaturan/backup' }
  ]},
];

type UserRole = 'admin' | 'teacher' | 'staff' | 'parent';

interface SidebarProps {
  userRole?: UserRole;
  userName?: string;
  userEmail?: string;
}

export default function Sidebar({ userRole = 'admin', userName = 'Admin User', userEmail = 'admin@sekolah.sch.id' }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeView, setActiveView] = useState('dashboard');
  const [activeSubView, setActiveSubView] = useState('');
  // PERUBAHAN 1: State awal diubah menjadi array kosong
  const [expandedMenuItems, setExpandedMenuItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (itemId: string, href: string) => {
    router.push(href);
    setActiveSubView('');
    const pathParts = href.split('/');
    setActiveView(pathParts[pathParts.length - 1]);
    if (pathParts.length > 2) {
      setActiveSubView(pathParts[pathParts.length - 1]);
    }
    if (window.innerWidth < 768) {
      // Logika untuk menutup menu mobile
    }
  };

  // PERUBAHAN 2: Logika toggle diubah untuk perilaku accordion
  const toggleMenuItem = (itemId: string) => {
    setExpandedMenuItems(prev => 
      prev.includes(itemId) ? [] : [itemId] 
    );
  };

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // PERUBAHAN 3: useEffect untuk membuka menu yang aktif secara otomatis
  useEffect(() => {
    const activeParentItem = menuItems.find(item => 
      pathname.startsWith(item.href) && item.subItems
    );

    if (activeParentItem) {
      setExpandedMenuItems([activeParentItem.id]);
    } else {
      setExpandedMenuItems([]);
    }
  }, [pathname]);


  const filteredMenuItems = menuItems.filter((item: MenuItem) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subItems && item.subItems.some((subItem: SubMenuItem) => subItem.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const getFilteredMenuByRole = (items: MenuItem[]): MenuItem[] => {
    if (userRole === 'admin') return items;
    return items.filter(item => item.id !== '10');
  };

  const isActive = (item: MenuItem, subItem?: SubMenuItem) => {
    if (subItem) {
      return pathname === subItem.href;
    }
    return (
      pathname === item.href ||
      (pathname.startsWith(item.href) && item.href !== '/staff')
    );
  };

  const getUserInitial = (name: string): string => name.charAt(0).toUpperCase();
  const roleFilteredMenuItems = getFilteredMenuByRole(filteredMenuItems);

  return (
    <div className="w-64 bg-white sticky top-0 pt-20 lg:pt-16 dark:bg-gray-800 shadow-md flex flex-col h-screen md:relative transition-all duration-300 ease-in-out transform">
      <div className="p-4">
        <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg">
          <input type="text" placeholder="Cari menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hide">
        <nav className="space-y-1">
          {roleFilteredMenuItems.map((item: MenuItem) => (
            <div key={item.id}>
              <a href={item.href} onClick={(e) => { 
                e.preventDefault(); 
                handleMenuClick(item.id, item.href); 
              }} className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(item) ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </div>
                {item.subItems && (
                  <button onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    toggleMenuItem(item.id); 
                  }} className="p-1">
                    {expandedMenuItems.includes(item.id) ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                )}
              </a>
              {item.subItems && expandedMenuItems.includes(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem: SubMenuItem) => (
                    <a key={subItem.id} href={subItem.href} onClick={(e) => { 
                      e.preventDefault(); 
                      handleMenuClick(subItem.id, subItem.href); 
                    }} className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isActive(item, subItem) ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      <span className="mr-3">{subItem.icon}</span>
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative" ref={profileMenuRef}>
          <button onClick={toggleProfileMenu} className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">{getUserInitial(userName)}</div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
            </div>
            <FiChevronDown className={`w-4 h-4 transition-transform text-gray-500 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a href="/staff/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"><FiUser className="inline mr-2" /> Profil Saya</a>
                <a href="/staff/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"><FiSettings className="inline mr-2" /> Pengaturan</a>
                <a href="/staff/help" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"><FiHelpCircle className="inline mr-2" /> Bantuan</a>
                <hr className="my-1 border-gray-200 dark:border-gray-600" />
                <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"><FiLogOut className="inline mr-2" /> Keluar</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}