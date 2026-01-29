"use client"

// pages/super-admin/index.tsx
import React, { useState } from 'react';
import { 
  FiHome, FiUsers, FiDollarSign, FiShield, FiHelpCircle, FiServer, 
  FiChevronDown, FiChevronRight, FiTrendingUp, FiActivity, FiDatabase,
  FiFileText, FiGrid, FiSettings, FiCreditCard, FiRefreshCw, FiSend,
  FiMessageSquare, FiBook, FiFlag, FiHeadphones, FiAlertCircle, 
  FiUserCheck, FiFile, FiHardDrive
} from 'react-icons/fi';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const SuperAdminDashboard: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Pusat',
      icon: <FiHome className="w-5 h-5" />,
      children: [
        { id: 'ecosystem-status', label: 'Status Ekosistem', icon: <FiTrendingUp className="w-4 h-4" /> },
        { id: 'transaction-monitoring', label: 'Monitoring Transaksi', icon: <FiActivity className="w-4 h-4" /> },
        { id: 'system-health', label: 'System Health', icon: <FiDatabase className="w-4 h-4" /> }
      ]
    },
    {
      id: 'partnership',
      label: 'Manajemen Kemitraan',
      icon: <FiUsers className="w-5 h-5" />,
      children: [
        { id: 'verification', label: 'Verifikasi Berkas', icon: <FiFileText className="w-4 h-4" /> },
        { id: 'school-directory', label: 'Direktori Sekolah', icon: <FiGrid className="w-4 h-4" /> },
        { id: 'license-settings', label: 'Pengaturan Lisensi', icon: <FiSettings className="w-4 h-4" /> }
      ]
    },
    {
      id: 'financial',
      label: 'Kontrol Finansial',
      icon: <FiDollarSign className="w-5 h-5" />,
      children: [
        { id: 'fee-config', label: 'Fee Configuration', icon: <FiCreditCard className="w-4 h-4" /> },
        { id: 'bank-reconciliation', label: 'Rekonsiliasi Bank', icon: <FiRefreshCw className="w-4 h-4" /> },
        { id: 'settlement', label: 'Settlement/Payout', icon: <FiSend className="w-4 h-4" /> }
      ]
    },
    {
      id: 'content',
      label: 'Content & Community',
      icon: <FiShield className="w-5 h-5" />,
      children: [
        { id: 'global-feed', label: 'Global Feed Moderator', icon: <FiMessageSquare className="w-4 h-4" /> },
        { id: 'question-bank', label: 'Bank Soal Global', icon: <FiBook className="w-4 h-4" /> },
        { id: 'global-banner', label: 'Banner Pengumuman Global', icon: <FiFlag className="w-4 h-4" /> }
      ]
    },
    {
      id: 'support',
      label: 'Manajemen Tiket & Support',
      icon: <FiHelpCircle className="w-5 h-5" />,
      children: [
        { id: 'helpdesk', label: 'Helpdesk', icon: <FiHeadphones className="w-4 h-4" /> },
        { id: 'bug-report', label: 'Bug Report', icon: <FiAlertCircle className="w-4 h-4" /> }
      ]
    },
    {
      id: 'infrastructure',
      label: 'System Infrastructure',
      icon: <FiServer className="w-5 h-5" />,
      children: [
        { id: 'user-management', label: 'User Management', icon: <FiUserCheck className="w-4 h-4" /> },
        { id: 'audit-log', label: 'Audit Log', icon: <FiFile className="w-4 h-4" /> },
        { id: 'backup', label: 'Database Backup', icon: <FiHardDrive className="w-4 h-4" /> }
      ]
    }
  ];

  const toggleExpand = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const handleMenuClick = (itemId: string) => {
    setActiveMenu(itemId);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'ecosystem-status':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Status Ekosistem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Sekolah</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,245</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+12% dari bulan lalu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Siswa</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">245,678</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+8% dari bulan lalu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Guru</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">18,923</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+5% dari bulan lalu</p>
              </div>
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Pertumbuhan Pengguna</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Grafik pertumbuhan akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        );
      case 'transaction-monitoring':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Monitoring Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">GTV (Gross Transaction Value)</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">Rp 2.4M</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Hari ini</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Estimasi Revenue</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">Rp 6.1M</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dari admin fee bulan ini</p>
              </div>
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Transaksi Terkini</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID Transaksi</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sekolah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jumlah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Admin Fee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">TRX001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">SMA Negeri 1 Jakarta</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp 150,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp 2,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">10:23:45</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">TRX002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">SD Islam Al-Azhar</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp 200,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp 2,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">10:18:32</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'verification':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Verifikasi Berkas</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Sekolah</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">NPSN</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dokumen</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">SMK Teknologi Indonesia</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12345678</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Lihat Dokumen</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Menunggu Verifikasi
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3">Terima</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Tolak</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">SMA Swasta Budi Mulia</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">87654321</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Lihat Dokumen</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Menunggu Verifikasi
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 mr-3">Terima</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Tolak</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Dashboard Pusat</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Sekolah</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,245</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+12% dari bulan lalu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Siswa</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">245,678</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+8% dari bulan lalu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Total Guru</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">18,923</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+5% dari bulan lalu</p>
              </div>
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Pertumbuhan Pengguna</h3>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Grafik pertumbuhan akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeMenu === item.id;

    return (
      <div key={item.id} className="w-full">
        <button
          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400' : ''}`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              handleMenuClick(item.id);
            }
          }}
        >
          <div className="flex items-center">
            <span className={`mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {item.icon}
            </span>
            <span className={`text-sm font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <span className="text-gray-400 dark:text-gray-500">
              {isExpanded ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="bg-gray-50 dark:bg-gray-800/50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Super Admin</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Control Tower</p>
        </div>
        <nav className="mt-4">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Super Admin Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium">SA</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;