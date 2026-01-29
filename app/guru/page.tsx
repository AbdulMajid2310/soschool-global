"use client"

// pages/guru/index.tsx
import React, { useState } from 'react';
import { 
  FiHome, FiUserCheck, FiBookOpen, FiClipboard, FiMessageCircle,
  FiChevronDown, FiChevronRight, FiCalendar, FiBell, FiBarChart2,
  FiCheckSquare, FiEdit3, FiFileText, FiFolder, FiPlus, FiClock,
  FiCheckCircle, FiXCircle, FiAlertCircle, FiUpload, FiList,
  FiFile, FiMessageSquare, FiSend, FiSettings, FiUsers, FiTrendingUp,
  FiBook, FiVideo, FiMic, FiDownload, FiPrinter, FiFilter, FiSearch,
  FiStar, FiAward, FiActivity, FiPieChart, FiTarget, FiZap,
  FiCpu, FiUser, FiMapPin, FiShield, FiMail, FiPhone,
  FiImage, FiMusic, FiGrid, FiLayout, FiTool, FiHelpCircle,
  FiRefreshCw, FiSave, FiTrash2, FiEdit, FiEye, FiEyeOff,
  FiLock, FiUnlock, FiLink, FiShare2, FiBookmark, FiTag,
  FiDatabase, FiCloud, FiWifi, FiMonitor, FiSmartphone, FiTablet,
  FiHeart,
  FiPlay
} from 'react-icons/fi';
import { LuBrain } from 'react-icons/lu';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const GuruDashboard: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);
  const [activeMenu, setActiveMenu] = useState<MenuItem>({ id: 'dashboard', label: 'Dashboard Guru', icon: <FiHome className="w-5 h-5" /> });
  const [activeTab, setActiveTab] = useState<string>('absensi');

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Guru',
      icon: <FiHome className="w-5 h-5" />,
      children: [
        { id: 'schedule', label: 'Jadwal Mengajar', icon: <FiCalendar className="w-4 h-4" /> },
        { id: 'notifications', label: 'Notifikasi Tugas', icon: <FiBell className="w-4 h-4" /> },
        { id: 'statistics', label: 'Statistik Kelas', icon: <FiBarChart2 className="w-4 h-4" /> }
      ]
    },
    {
      id: 'presensi',
      label: 'Manajemen Kelas & Presensi',
      icon: <FiUserCheck className="w-5 h-5" />,
      children: [
        { id: 'absensi', label: 'Absensi Digital', icon: <FiCheckSquare className="w-4 h-4" /> },
        { id: 'jurnal', label: 'Jurnal Mengajar', icon: <FiEdit3 className="w-4 h-4" /> },
        { id: 'agenda', label: 'Agenda Kelas', icon: <FiFileText className="w-4 h-4" /> },
        { id: 'behavior', label: 'Tracking Perilaku', icon: <FiActivity className="w-4 h-4" /> }
      ]
    },
    {
      id: 'akademik',
      label: 'Akademik & Bank Soal',
      icon: <FiBookOpen className="w-5 h-5" />,
      children: [
        { id: 'tugas', label: 'Manajemen Tugas/PR', icon: <FiFolder className="w-4 h-4" /> },
        { id: 'bank-soal', label: 'Bank Soal Pribadi', icon: <FiList className="w-4 h-4" /> },
        { id: 'ujian', label: 'Ujian Online (CBT)', icon: <FiFile className="w-4 h-4" /> },
        { id: 'resource-library', label: 'Perpustakaan Digital', icon: <FiBook className="w-4 h-4" /> }
      ]
    },
    {
      id: 'ai-assistant',
      label: 'Asisten AI & Otomasi',
      icon: <FiCpu className="w-5 h-5" />,
      children: [
        { id: 'lesson-planner', label: 'Perencanaan Pelajaran AI', icon: <LuBrain className="w-4 h-4" /> },
        { id: 'auto-grading', label: 'Penilaian Otomatis', icon: <FiZap className="w-4 h-4" /> },
        { id: 'content-generator', label: 'Generator Konten', icon: <FiEdit3 className="w-4 h-4" /> },
        { id: 'quick-assessment', label: 'Asesmen Cepat', icon: <FiTarget className="w-4 h-4" /> }
      ]
    },
    {
      id: 'nilai',
      label: 'Penilaian & Rapor',
      icon: <FiClipboard className="w-5 h-5" />,
      children: [
        { id: 'buku-nilai', label: 'Buku Nilai', icon: <FiBarChart2 className="w-4 h-4" /> },
        { id: 'erapor', label: 'E-Rapor', icon: <FiFileText className="w-4 h-4" /> },
        { id: 'analytics', label: 'Analisis Performa Siswa', icon: <FiTrendingUp className="w-4 h-4" /> }
      ]
    },
    {
      id: 'komunikasi',
      label: 'Komunikasi & Kolaborasi',
      icon: <FiMessageCircle className="w-5 h-5" />,
      children: [
        { id: 'ruang-kreasi', label: 'Medsos Internal', icon: <FiMessageSquare className="w-4 h-4" /> },
        { id: 'chat', label: 'Chat/Konsultasi', icon: <FiSend className="w-4 h-4" /> },
        { id: 'parent-portal', label: 'Portal Orang Tua', icon: <FiUsers className="w-4 h-4" /> },
        { id: 'meeting-scheduler', label: 'Jadwal Pertemuan', icon: <FiCalendar className="w-4 h-4" /> }
      ]
    },
    {
      id: 'media',
      label: 'Studio Media Pembelajaran',
      icon: <FiVideo className="w-5 h-5" />,
      children: [
        { id: 'video-recording', label: 'Rekam Video Pembelajaran', icon: <FiVideo className="w-4 h-4" /> },
        { id: 'podcast', label: 'Podcast Edukasi', icon: <FiMic className="w-4 h-4" /> },
        { id: 'interactive-content', label: 'Konten Interaktif', icon: <FiGrid className="w-4 h-4" /> },
        { id: 'virtual-class', label: 'Kelas Virtual', icon: <FiMonitor className="w-4 h-4" /> }
      ]
    },
    {
      id: 'pengembangan',
      label: 'Pengembangan Profesional',
      icon: <FiAward className="w-5 h-5" />,
      children: [
        { id: 'training', label: 'Pelatihan & Sertifikasi', icon: <FiStar className="w-4 h-4" /> },
        { id: 'community', label: 'Komunitas Guru', icon: <FiUsers className="w-4 h-4" /> },
        { id: 'research', label: 'Riset & Publikasi', icon: <FiFileText className="w-4 h-4" /> }
      ]
    },
    {
      id: 'kesehatan',
      label: 'Kesehatan & Keselamatan',
      icon: <FiShield className="w-5 h-5" />,
      children: [
        { id: 'health-monitoring', label: 'Pemantauan Kesehatan', icon: <FiActivity className="w-4 h-4" /> },
        { id: 'safety-protocol', label: 'Protokol Keselamatan', icon: <FiLock className="w-4 h-4" /> },
        { id: 'wellness', label: 'Kesejahteraan Guru', icon: <FiHeart className="w-4 h-4" /> }
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

  const handleMenuClick = (item: MenuItem) => {
    setActiveMenu(item);
    if (item.id === 'presensi') {
      setActiveTab('absensi');
    }
  };

  const renderContent = () => {
    switch (activeMenu.id) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Dashboard Guru</h2>
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jadwal Hari Ini</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">4</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <FiCalendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tugas Pending</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                    <FiFolder className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pesan Belum Dibaca</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">5</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <FiMessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Aktif</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <FiCpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Jadwal Mengajar Hari Ini */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white flex items-center">
                  <FiCalendar className="mr-2" /> Jadwal Mengajar Hari Ini
                </h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="mr-4 text-blue-600 dark:text-blue-400">
                    <div className="text-sm font-medium">07:30 - 09:00</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">Matematika</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kelas X-A</div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                    Mulai Kelas
                  </button>
                </div>
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="mr-4 text-green-600 dark:text-green-400">
                    <div className="text-sm font-medium">09:30 - 11:00</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">Matematika</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kelas X-B</div>
                  </div>
                  <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                    Mulai Kelas
                  </button>
                </div>
                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="mr-4 text-purple-600 dark:text-purple-400">
                    <div className="text-sm font-medium">12:30 - 14:00</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">Matematika</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kelas XI-C</div>
                  </div>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700">
                    Mulai Kelas
                  </button>
                </div>
              </div>
            </div>
            
            {/* AI Assistant Recommendations */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                <LuBrain className="mr-2" /> Rekomendasi AI Assistant
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                      <FiZap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium dark:text-white">Optimasi Jadwal Mengajar</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Berdasarkan analisis, Anda bisa menggabungkan kelas X-A dan X-B untuk materi yang sama.</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">Lihat Detail</button>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                      <FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium dark:text-white">Siswa Butuh Perhatian</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">3 siswa di kelas XI-C menunjukkan penurunan performa. Rekomendasi remedial.</p>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">Lihat Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notifikasi Tugas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white flex items-center">
                  <FiBell className="mr-2" /> Notifikasi Tugas
                </h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FiAlertCircle className="mr-3 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <div className="font-medium dark:text-white">Tugas Matematika Kelas X-A</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">15 tugas belum dikoreksi</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700">
                    Tinjau
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FiXCircle className="mr-3 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="font-medium dark:text-white">Ujian Matematika Kelas XI-C</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Batas waktu pengumpulan besok</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
                    Lihat
                  </button>
                </div>
              </div>
            </div>
            
            {/* Statistik Kelas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white flex items-center">
                  <FiBarChart2 className="mr-2" /> Statistik Kelas
                </h3>
                <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>Minggu Ini</option>
                  <option>Bulan Ini</option>
                  <option>Semester Ini</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FiCheckCircle className="mr-2 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Hadir</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">87%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FiAlertCircle className="mr-2 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Sakit/Izin</div>
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">10%</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center">
                    <FiXCircle className="mr-2 text-red-600 dark:text-red-400" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Tanpa Keterangan</div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">3%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ai-assistant':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Asisten AI & Otomasi</h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'lesson-planner' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('lesson-planner')}
              >
                Perencanaan Pelajaran AI
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'auto-grading' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('auto-grading')}
              >
                Penilaian Otomatis
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'content-generator' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('content-generator')}
              >
                Generator Konten
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'quick-assessment' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('quick-assessment')}
              >
                Asesmen Cepat
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'lesson-planner' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Buat Rencana Pelajaran dengan AI</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="materi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materi Pelajaran</label>
                        <input
                          type="text"
                          id="materi"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Contoh: Persamaan Kuadrat"
                        />
                      </div>
                      <div>
                        <label htmlFor="kelas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
                        <select
                          id="kelas"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="x-a">Kelas X-A</option>
                          <option value="x-b">Kelas X-B</option>
                          <option value="xi-c">Kelas XI-C</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="durasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durasi Pembelajaran</label>
                      <select
                        id="durasi"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="45">45 menit</option>
                        <option value="90">90 menit</option>
                        <option value="120">120 menit</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tujuan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tujuan Pembelajaran</label>
                      <textarea
                        id="tujuan"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Siswa dapat menyelesaikan persamaan kuadrat dengan metode faktorisasi"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="kebutuhan-khusus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kebutuhan Khusus (Opsional)</label>
                      <textarea
                        id="kebutuhan-khusus"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Ada 3 siswa dengan kesulitan belajar, perlu pendekatan visual"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                        <LuBrain className="mr-2" /> Generate Rencana Pelajaran
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Rencana Pelajaran Sebelumnya</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium dark:text-white">Sistem Persamaan Linear</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelas X-A • 90 menit • 15 Juni 2023</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Metode Substitusi</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Metode Eliminasi</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Aplikasi</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium dark:text-white">Trigonometri Dasar</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelas XI-C • 90 menit • 10 Juni 2023</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Sinus</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Cosinus</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Tangen</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'auto-grading' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Penilaian Otomatis dengan AI</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium dark:text-white">Tugas: Persamaan Kuadrat</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Siap Dinilai
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Kelas X-A • 30 pengumpulan</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="tipe-soal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Soal</label>
                          <select
                            id="tipe-soal"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="pilihan-ganda">Pilihan Ganda</option>
                            <option value="isian">Isian Singkat</option>
                            <option value="esai">Esai</option>
                            <option value="campuran">Campuran</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="kriteria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kriteria Penilaian</label>
                          <select
                            id="kriteria"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="kebenaran">Kebenaran Jawaban</option>
                            <option value="prosedur">Prosedur Penyelesaian</option>
                            <option value="pemahaman">Pemahaman Konsep</option>
                            <option value="kreativitas">Kreativitas</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="rubrik" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rubrik Kustom (Opsional)</label>
                        <textarea
                          id="rubrik"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Contoh: Poin 1: Kesesuaian dengan rumus (30%), Poin 2: Ketepatan perhitungan (40%), Poin 3: Kesimpulan (30%)"
                        ></textarea>
                      </div>
                      <div className="flex justify-between">
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                          Preview Penilaian
                        </button>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                          <FiZap className="mr-2" /> Mulai Penilaian Otomatis
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium dark:text-white">Ujian: UTS Matematika</h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Sedang Diproses
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Kelas XI-C • 28 pengumpulan</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <span>Progress Penilaian</span>
                          <span>18/28</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '64%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                          Jeda
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                          Hentikan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Riwayat Penilaian Otomatis</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tugas/Ujian</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Jumlah Siswa</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">PR Fungsi Kuadrat</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">X-B</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">32</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">12 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Selesai
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">Lihat</button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Unduh</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Quiz Trigonometri</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">XI-C</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">28</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">8 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Selesai
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">Lihat</button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Unduh</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'content-generator' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Generator Konten Pembelajaran</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tipe-konten" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Konten</label>
                        <select
                          id="tipe-konten"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="soal">Soal Latihan</option>
                          <option value="materi">Materi Pembelajaran</option>
                          <option value="presentasi">Presentasi</option>
                          <option value="video-script">Naskah Video</option>
                          <option value="infografis">Infografis</option>
                          <option value="worksheet">Lembar Kerja Siswa</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="topik" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topik</label>
                        <input
                          type="text"
                          id="topik"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Contoh: Persamaan Kuadrat"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tingkat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tingkat Kesulitan</label>
                        <select
                          id="tingkat"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="mudah">Mudah</option>
                          <option value="sedang">Sedang</option>
                          <option value="sulit">Sulit</option>
                          <option value="campuran">Campuran</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jumlah</label>
                        <input
                          type="number"
                          id="jumlah"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Contoh: 10"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="instruksi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instruksi Kustom (Opsional)</label>
                      <textarea
                        id="instruksi"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Fokus pada aplikasi persamaan kuadrat dalam kehidupan sehari-hari"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                        <FiZap className="mr-2" /> Generate Konten
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Konten yang Telah Dibuat</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiFileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Soal Latihan Persamaan Kuadrat</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10 soal • Tingkat: Sedang</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiDownload className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiFileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Materi Trigonometri Dasar</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Presentasi • 15 slide</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiDownload className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiFileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Worksheet Fungsi Linear</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">LKS • 5 halaman</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiDownload className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'quick-assessment' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Asesmen Cepat dengan AI</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Buat Asesmen Baru</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="tipe-asesmen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Asesmen</label>
                          <select
                            id="tipe-asesmen"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="kuis">Kuis Singkat</option>
                            <option value="exit-ticket">Exit Ticket</option>
                            <option value="pemahaman">Cek Pemahaman</option>
                            <option value="refleksi">Refleksi</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="materi-asesmen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materi</label>
                          <input
                            type="text"
                            id="materi-asesmen"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: Persamaan Kuadrat"
                          />
                        </div>
                        <div>
                          <label htmlFor="kelas-asesmen" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas</label>
                          <select
                            id="kelas-asesmen"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="x-a">Kelas X-A</option>
                            <option value="x-b">Kelas X-B</option>
                            <option value="xi-c">Kelas XI-C</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="jumlah-soal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jumlah Soal</label>
                          <input
                            type="number"
                            id="jumlah-soal"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: 5"
                          />
                        </div>
                        <div>
                          <label htmlFor="waktu" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waktu Pengerjaan (menit)</label>
                          <input
                            type="number"
                            id="waktu"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: 10"
                          />
                        </div>
                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center">
                          <FiZap className="mr-2" /> Buat Asesmen Cepat
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Asesmen Aktif</h4>
                      <div className="space-y-3">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium dark:text-white">Kuis: Fungsi Kuadrat</h5>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Aktif
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Kelas X-A • 5 soal • 10 menit</p>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <span>Partisipasi</span>
                              <span>22/30</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{width: '73%'}}></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat Hasil</button>
                            <button className="text-sm text-red-600 dark:text-red-400 hover:underline">Akhiri</button>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium dark:text-white">Exit Ticket: Trigonometri</h5>
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Berakhir Segera
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Kelas XI-C • 3 soal • 5 menit</p>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                              <span>Partisipasi</span>
                              <span>18/28</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-yellow-600 h-2 rounded-full" style={{width: '64%'}}></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat Hasil</button>
                            <button className="text-sm text-red-600 dark:text-red-400 hover:underline">Akhiri</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Hasil Asesmen Terbaru</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asesmen</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kelas</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Partisipasi</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rata-rata Nilai</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Kuis: Persamaan Linear</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">X-A</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">10 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">28/30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">78.5</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Lihat Detail</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Exit Ticket: Trigonometri</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">XI-C</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">8 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">25/28</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">82.3</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Lihat Detail</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'media':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Studio Media Pembelajaran</h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'video-recording' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('video-recording')}
              >
                Rekam Video Pembelajaran
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'podcast' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('podcast')}
              >
                Podcast Edukasi
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'interactive-content' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('interactive-content')}
              >
                Konten Interaktif
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'virtual-class' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('virtual-class')}
              >
                Kelas Virtual
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'video-recording' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Rekam Video Pembelajaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-4">
                        <div className="text-center">
                          <FiVideo className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-500 dark:text-gray-400">Kamera tidak aktif</p>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                          <FiVideo className="mr-2" /> Mulai Rekam
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                          <FiSettings className="mr-2" /> Pengaturan
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Pengaturan Perekaman</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="judul-video" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Video</label>
                          <input
                            type="text"
                            id="judul-video"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: Persamaan Kuadrat Bagian 1"
                          />
                        </div>
                        <div>
                          <label htmlFor="deskripsi-video" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                          <textarea
                            id="deskripsi-video"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Jelaskan materi yang akan dibahas dalam video..."
                          ></textarea>
                        </div>
                        <div>
                          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                          <select
                            id="kategori"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="matematika">Matematika</option>
                            <option value="fisika">Fisika</option>
                            <option value="kimia">Kimia</option>
                            <option value="biologi">Biologi</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tag</label>
                          <input
                            type="text"
                            id="tag"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: matematika, persamaan kuadrat, kelas X"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="public"
                            name="public"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="public" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Publikasikan video setelah selesai
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Video Pembelajaran Saya</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiVideo className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Persamaan Kuadrat Bagian 1</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">15 menit • 120 views</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiVideo className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Trigonometri Dasar</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">20 menit • 85 views</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiVideo className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Fungsi Linear</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">18 menit • 95 views</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'podcast' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Buat Podcast Edukasi</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-4">
                        <div className="text-center">
                          <FiMic className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-500 dark:text-gray-400">Mikrofon tidak aktif</p>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                          <FiMic className="mr-2" /> Mulai Rekam
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                         // Lanjutan dari kode sebelumnya

                          <FiUpload className="mr-2" /> Upload Audio
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Detail Podcast</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="judul-podcast" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Podcast</label>
                          <input
                            type="text"
                            id="judul-podcast"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: Matematika Itu Menyenangkan Ep. 1"
                          />
                        </div>
                        <div>
                          <label htmlFor="deskripsi-podcast" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                          <textarea
                            id="deskripsi-podcast"
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Jelaskan topik yang akan dibahas dalam podcast..."
                          ></textarea>
                        </div>
                        <div>
                          <label htmlFor="durasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durasi Perkiraan (menit)</label>
                          <input
                            type="number"
                            id="durasi"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: 15"
                          />
                        </div>
                        <div>
                          <label htmlFor="narasumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Narasumber (Opsional)</label>
                          <input
                            type="text"
                            id="narasumber"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: Dr. Budi Santoso, M.Pd"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="transkripsi"
                            name="transkripsi"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="transkripsi" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Buat transkripsi otomatis
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Podcast Saya</h3>
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium dark:text-white">Matematika Itu Menyenangkan Ep. 1</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">15 menit • 45 plays</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Matematika</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Persamaan Kuadrat</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <FiPlay className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium dark:text-white">Tips Belajar Efektif</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">20 menit • 32 plays</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Studi</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Motivasi</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                            <FiPlay className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'interactive-content' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Buat Konten Interaktif</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                      <FiGrid className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <p className="text-sm font-medium dark:text-white">Quiz Interaktif</p>
                    </button>
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                      <FiLayout className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <p className="text-sm font-medium dark:text-white">Infografis</p>
                    </button>
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                      <FiMonitor className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                      <p className="text-sm font-medium dark:text-white">Simulasi</p>
                    </button>
                    <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                      <FiBook className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                      <p className="text-sm font-medium dark:text-white">E-Book Interaktif</p>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="tipe-konten" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Konten</label>
                      <select
                        id="tipe-konten"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="quiz">Quiz Interaktif</option>
                        <option value="infografis">Infografis</option>
                        <option value="simulasi">Simulasi</option>
                        <option value="ebook">E-Book Interaktif</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="judul-konten" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Konten</label>
                      <input
                        type="text"
                        id="judul-konten"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Quiz Persamaan Kuadrat"
                      />
                    </div>
                    <div>
                      <label htmlFor="target-audience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audiens</label>
                      <select
                        id="target-audience"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="x">Kelas X</option>
                        <option value="xi">Kelas XI</option>
                        <option value="xii">Kelas XII</option>
                        <option value="campuran">Campuran</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center">
                        <FiPlus className="mr-2" /> Buat Konten
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Konten Interaktif Saya</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiGrid className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Quiz Persamaan Kuadrat</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10 soal • 85 attempts</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiLayout className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Infografis Trigonometri</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">1 halaman • 120 views</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FiMonitor className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium dark:text-white">Simulasi Fungsi</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Interaktif • 65 uses</p>
                        <div className="mt-3 flex justify-between">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Lihat</button>
                          <div className="flex space-x-2">
                            <button className="text-sm text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'virtual-class' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Kelas Virtual</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Jadwalkan Kelas Virtual</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="judul-kelas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Kelas</label>
                          <input
                            type="text"
                            id="judul-kelas"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: Tambahan Persamaan Kuadrat"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                            <input
                              type="date"
                              id="tanggal"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="waktu" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waktu</label>
                            <input
                              type="time"
                              id="waktu"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="durasi-kelas" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durasi (menit)</label>
                          <input
                            type="number"
                            id="durasi-kelas"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Contoh: 60"
                          />
                        </div>
                        <div>
                          <label htmlFor="kelas-target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kelas Target</label>
                          <select
                            id="kelas-target"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="x-a">Kelas X-A</option>
                            <option value="x-b">Kelas X-B</option>
                            <option value="xi-c">Kelas XI-C</option>
                            <option value="semua">Semua Kelas</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="record"
                            name="record"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="record" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Rekam sesi kelas
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="reminder"
                            name="reminder"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="reminder" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Kirim pengingat ke siswa
                          </label>
                        </div>
                        <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center justify-center">
                          <FiCalendar className="mr-2" /> Jadwalkan Kelas
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Kelas Virtual Terjadwal</h4>
                      <div className="space-y-3">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium dark:text-white">Tambahan Persamaan Kuadrat</h5>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Akan Datang
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">20 Juni 2023 • 14:00-15:00</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Kelas X-A • 30 peserta</p>
                          <div className="flex justify-between">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                            <button className="text-sm text-green-600 dark:text-green-400 hover:underline">Mulai Sekarang</button>
                          </div>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium dark:text-white">Review UTS</h5>
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Sedang Berlangsung
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">15 Juni 2023 • 10:00-11:30</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Kelas XI-C • 28 peserta</p>
                          <div className="flex justify-between">
                            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Gabung</button>
                            <button className="text-sm text-red-600 dark:text-red-400 hover:underline">Akhiri</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Riwayat Kelas Virtual</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Judul Kelas</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Durasi</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Peserta</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Recording</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Introduction to Trigonometry</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">10 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">60 menit</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">25/30</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Tersedia
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">Lihat</button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">Unduh</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Problem Solving Session</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">5 Juni 2023</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">45 menit</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">18/28</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              Tidak Ada
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Lihat</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'presensi':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Manajemen Kelas & Presensi</h2>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'absensi' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('absensi')}
              >
                Absensi Digital
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'jurnal' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('jurnal')}
              >
                Jurnal Mengajar
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'agenda' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('agenda')}
              >
                Agenda Kelas
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'behavior' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('behavior')}
              >
                Tracking Perilaku
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'absensi' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">Absensi Kelas X-A - Matematika</h3>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
                        <FiUpload className="mr-2" /> Import QR Code
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="auto-mark"
                        name="auto-mark"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="auto-mark" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Tandai semua sebagai hadir
                      </label>
                    </div>
                    <div className="flex items-center">
                      <FiFilter className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
                      <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        <option>Semua Status</option>
                        <option>Hadir</option>
                        <option>Sakit</option>
                        <option>Izin</option>
                        <option>Tanpa Keterangan</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Siswa</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">NIS</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              defaultChecked
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Ahmad Rizki</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">20210001</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                              <option value="hadir" selected>Hadir</option>
                              <option value="sakit">Sakit</option>
                              <option value="izin">Izin</option>
                              <option value="absen">Tanpa Keterangan</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="-"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">2</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Siti Nurhaliza</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">20210002</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                              <option value="hadir">Hadir</option>
                              <option value="sakit" selected>Sakit</option>
                              <option value="izin">Izin</option>
                              <option value="absen">Tanpa Keterangan</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Demam"
                              defaultValue="Demam"
                            />
                          </td>
                        </tr>
                        {/* More rows would go here */}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Statistik Kehadiran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center">
                        <FiCheckCircle className="mr-2 text-green-600 dark:text-green-400" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Hadir</div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">28</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center">
                        <FiAlertCircle className="mr-2 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Sakit</div>
                          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-blue-600 dark:text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Izin</div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center">
                        <FiXCircle className="mr-2 text-red-600 dark:text-red-400" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Tanpa Keterangan</div>
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'behavior' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Tracking Perilaku Siswa</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        <option>Semua Siswa</option>
                        <option>Ahmad Rizki</option>
                        <option>Siti Nurhaliza</option>
                        <option>Budi Santoso</option>
                      </select>
                      <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                        <option>Semua Kategori</option>
                        <option>Prestasi</option>
                        <option>Perilaku Positif</option>
                        <option>Perilaku Negatif</option>
                        <option>Keterlambatan</option>
                      </select>
                      <input
                        type="date"
                        className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
                      <FiPlus className="mr-2" /> Catat Perilaku
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium dark:text-white">Ahmad Rizki - Membantu Teman</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">15 Juni 2023 • Matematika</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Siswa dengan sukarela membantu teman yang kesulitan mengerjakan soal persamaan kuadrat.</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Positif
                        </span>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium dark:text-white">Siti Nurhaliza - Juara 1 Olimpiade</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">10 Juni 2023 • Ekstrakurikuler</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Meraih juara 1 dalam olimpiade matematika tingkat kabupaten.</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          Prestasi
                        </span>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium dark:text-white">Budi Santoso - Terlambat</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">8 Juni 2023 • Matematika</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Terlambat masuk kelas selama 15 menit tanpa keterangan.</p>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Keterlambatan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">Ringkasan Perilaku Bulanan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Top 5 Perilaku Positif</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm dark:text-white">Membantu teman</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">12 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm dark:text-white">Aktif bertanya</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">10 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm dark:text-white">Menyelesaikan tugas tepat waktu</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">8 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm dark:text-white">Kebersihan kelas</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">7 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <span className="text-sm dark:text-white">Inisiatif</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">6 kali</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white mb-3">Top 5 Perilaku Perlu Perhatian</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                          <span className="text-sm dark:text-white">Menggunakan HP di kelas</span>
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">5 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                          <span className="text-sm dark:text-white">Tidak mengerjakan PR</span>
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">4 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                          <span className="text-sm dark:text-white">Terlambat</span>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">3 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                          <span className="text-sm dark:text-white">Lupa membawa buku</span>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">2 kali</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                          <span className="text-sm dark:text-white">Berisik</span>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">2 kali</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'jurnal' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Jurnal Mengajar - Matematika Kelas X-A</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                    <input
                      type="date"
                      id="tanggal"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label htmlFor="materi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materi yang Diajarkan</label>
                    <input
                      type="text"
                      id="materi"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: Persamaan Kuadrat"
                    />
                  </div>
                  <div>
                    <label htmlFor="tujuan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tujuan Pembelajaran</label>
                    <textarea
                      id="tujuan"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Tuliskan tujuan pembelajaran yang ingin dicapai..."
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="ringkasan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ringkasan Pembelajaran</label>
                    <textarea
                      id="ringkasan"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Jelaskan ringkasan materi yang telah diajarkan..."
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="evaluasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Evaluasi & Refleksi</label>
                    <textarea
                      id="evaluasi"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Evaluasi proses pembelajaran dan refleksi untuk perbaikan..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Simpan Jurnal
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'agenda' && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Agenda Kelas - Matematika Kelas X-A</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="tanggal-agenda" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
                    <input
                      type="date"
                      id="tanggal-agenda"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label htmlFor="kejadian" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kejadian Penting</label>
                    <input
                      type="text"
                      id="kejadian"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: Siswa sakit, pelanggaran, dll"
                    />
                  </div>
                  <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                    <textarea
                      id="deskripsi"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Jelaskan detail kejadian..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Tambah Agenda
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-3 dark:text-white">Agenda Sebelumnya</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium dark:text-white">Ahmad Rizki Sakit</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">15 Juni 2023</div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          Sakit
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium dark:text-white">Tugas Terlambat Pengumpulan</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">10 Juni 2023</div>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          Pelanggaran
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      // ... (other cases remain the same)
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Dashboard Guru</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400">Selamat datang di Dashboard Guru. Silakan pilih menu di sidebar untuk memulai.</p>
            </div>
          </div>
        );
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeMenu.id === item.id;

    return (
      <div key={item.id} className="w-full">
        <button
          className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400' : ''}`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.id);
            } else {
              handleMenuClick(item);
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
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Portal Guru</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Asisten Digital Anda</p>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Guru</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white font-medium">GU</span>
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

export default GuruDashboard;