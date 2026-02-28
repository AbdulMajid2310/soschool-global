"use client"

// pages/wali-murid/index.tsx
import React, { useState } from 'react';
import { 
  FiUsers, FiCreditCard, FiTrendingUp, FiMessageCircle, FiShoppingBag,
  FiCheckCircle, FiDollarSign, FiAward, FiCalendar, FiFileText,
  FiSearch, FiBell, FiUser, FiClock, FiAlertTriangle, FiSend,
  FiPlus, FiDownload, FiEye, FiStar, FiShoppingCart, FiShield,
  FiChevronRight, FiHome, FiBookOpen, FiActivity,
  FiHeart
} from 'react-icons/fi';

// --- Type Definitions ---
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Child {
  id: string;
  name: string;
  class: string;
  attendanceStatus: 'masuk' | 'belum-masuk' | 'sakit' | 'izin';
  attendanceTime?: string;
}

interface Bill {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid';
}

interface Transaction {
  id: string;
  item: string;
  amount: number;
  timestamp: string;
}

interface TeacherNote {
  id: string;
  teacher: string;
  subject: string;
  note: string;
  type: 'positive' | 'improvement';
  timestamp: string;
}

interface Announcement {
  id: string;
  title: string;
  preview: string;
  date: string;
  hasAttachment: boolean;
}

// --- Mock Data ---
const mockChild: Child = {
  id: 'c1',
  name: 'Ahmad Rizki',
  class: 'X-A',
  attendanceStatus: 'masuk',
  attendanceTime: '06:55'
};

const mockBills: Bill[] = [
  { id: 'b1', description: 'SPP Bulan Juni', amount: 150000, dueDate: '2023-06-10', status: 'unpaid' },
  { id: 'b2', description: 'Uang Kegiatan Pramuka', amount: 75000, dueDate: '2023-06-15', status: 'unpaid' },
  { id: 'b3', description: 'SPP Bulan Mei', amount: 150000, dueDate: '2023-05-10', status: 'paid' },
];

const mockTransactions: Transaction[] = [
  { id: 't1', item: 'Nasi Goreng + Es Teh', amount: 15000, timestamp: 'Hari ini, 10:30' },
  { id: 't2', item: 'Bakso', amount: 13000, timestamp: 'Hari ini, 07:15' },
  { id: 't3', item: 'Puding', amount: 5000, timestamp: 'Kemarin, 14:20' },
];

const mockTeacherNotes: TeacherNote[] = [
  { id: 'n1', teacher: 'Pak Budi', subject: 'Matematika', note: 'Ahmad menunjukkan peningkatan signifikan dalam memahami persamaan kuadrat. Terus pertahankan!', type: 'positive', timestamp: '2 hari yang lalu' },
  { id: 'n2', teacher: 'Bu Ani', subject: 'BK', note: 'Perlu lebih berani bertanya di kelas jika ada materi yang belum dipahami.', type: 'improvement', timestamp: '1 minggu yang lalu' },
];

const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Libur Akhir Tahun', preview: 'Diberitahukan kepada seluruh wali murid bahwa libur akhir tahun akan dimulai pada...', date: '10 Juni 2023', hasAttachment: true },
  { id: 'a2', title: 'Pengumuman Kegiatan Parenting', preview: 'Sekolah akan mengadakan kegiatan parenting untuk orang tua siswa kelas X...', date: '5 Juni 2023', hasAttachment: false },
];

// --- Main Component ---
const WaliMuridDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [activeFinanceTab, setActiveFinanceTab] = useState<string>('billing');
  const [activeProgressTab, setActiveProgressTab] = useState<string>('rapor');
  const [activeNewsTab, setActiveNewsTab] = useState<string>('pengumuman');

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard Orang Tua', icon: <FiHome className="w-5 h-5" /> },
    { id: 'finance', label: 'Pusat Keuangan', icon: <FiCreditCard className="w-5 h-5" /> },
    { id: 'progress', label: 'Monitoring Akademik', icon: <FiTrendingUp className="w-5 h-5" /> },
    { id: 'news', label: 'Komunikasi & Informasi', icon: <FiMessageCircle className="w-5 h-5" /> },
    { id: 'pelopor', label: 'Layanan Unggulan', icon: <FiShoppingBag className="w-5 h-5" /> },
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  // --- Render Functions for each Menu ---
  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Ringkasan Anak</h2>
      
      {/* Status Kehadiran Anak */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiActivity className="mr-2"/> Status Kehadiran</h3>
        <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
          <FiCheckCircle className="text-green-600 dark:text-green-400 mr-4 text-2xl" />
          <div>
            <p className="font-medium dark:text-white">Ananda {mockChild.name} ({mockChild.class}) sudah masuk sekolah</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">pukul {mockChild.attendanceTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ringkasan Tagihan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiDollarSign className="mr-2"/> Ringkasan Tagihan</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">Total bulan ini</span>
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">Rp 225.000</span>
          </div>
          <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">Bayar Sekarang</button>
        </div>

        {/* Update Nilai Terakhir */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiAward className="mr-2"/> Update Nilai Terakhir</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="dark:text-white">Matematika (UTS)</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">88</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="dark:text-white">Fisika (Tugas)</span>
              <span className="font-bold text-green-600 dark:text-green-400">92</span>
            </div>
          </div>
          <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Lihat Semua Nilai</button>
        </div>
      </div>
    </div>
  );

  const renderFinancialCenter = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Pusat Keuangan</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['billing', 'pocket', 'history'].map((tab) => (
              <button key={tab} onClick={() => setActiveFinanceTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeFinanceTab === tab ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}>
                {tab === 'billing' ? 'Pembayaran Digital' : tab === 'pocket' ? 'Manajemen Uang Saku' : 'Riwayat Belanja Anak'}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeFinanceTab === 'billing' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Daftar Tagihan</h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Bayar Semua</button>
              </div>
              <div className="space-y-3">
                {mockBills.map(bill => (
                  <div key={bill.id} className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium dark:text-white">{bill.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Jatuh tempo: {bill.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">Rp {bill.amount.toLocaleString('id-ID')}</p>
                      <button className={`text-sm ${bill.status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400 hover:underline'}`}>
                        {bill.status === 'paid' ? 'Dibayar' : 'Bayar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeFinanceTab === 'pocket' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Saldo Anak Anda</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">Rp 75.000</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
                  <FiPlus className="mr-2"/> Top-Up Saldo
                </button>
              </div>
              <div>
                <h4 className="font-medium dark:text-white mb-2">Limit Pengeluaran Harian</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400">Rp</span>
                  <input type="number" defaultValue="15000" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"/>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700">Simpan</button>
                </div>
              </div>
            </div>
          )}
          {activeFinanceTab === 'history' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Riwayat Belanja di Kantin</h3>
              <div className="space-y-3">
                {mockTransactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <FiShoppingCart className="text-gray-400 mr-3"/>
                      <div>
                        <p className="font-medium dark:text-white">{transaction.item}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.timestamp}</p>
                      </div>
                    </div>
                    <span className="font-bold text-red-600 dark:text-red-400">-Rp {transaction.amount.toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProgressTracker = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Monitoring Akademik</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['rapor', 'notes', 'schedule'].map((tab) => (
              <button key={tab} onClick={() => setActiveProgressTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeProgressTab === tab ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}>
                {tab === 'rapor' ? 'Buku Rapor Digital' : tab === 'notes' ? 'Catatan Guru & BK' : 'Jadwal & Agenda'}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeProgressTab === 'rapor' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Rapor Semester Genap 2022/2023</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Mata Pelajaran</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nilai</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Predikat</th></tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Matematika</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">88</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">B</td></tr>
                    <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Fisika</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">92</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">A</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeProgressTab === 'notes' && (
            <div className="space-y-3">
              {mockTeacherNotes.map(note => (
                <div key={note.id} className={`p-4 rounded-lg ${note.type === 'positive' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium dark:text-white">{note.teacher} - {note.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{note.timestamp}</p>
                    </div>
                    {note.type === 'positive' ? <FiStar className="text-green-600 dark:text-green-400" /> : <FiAlertTriangle className="text-yellow-600 dark:text-yellow-400" />}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{note.note}</p>
                </div>
              ))}
            </div>
          )}
          {activeProgressTab === 'schedule' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Jadwal Pelajaran - {mockChild.class}</h3>
              <div className="space-y-2">
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="mr-4 text-gray-600 dark:text-gray-400">07:30 - 09:00</div>
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">Matematika</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pak Budi, Ruang 301</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="mr-4 text-gray-600 dark:text-gray-400">09:30 - 11:00</div>
                  <div className="flex-1">
                    <div className="font-medium dark:text-white">Fisika</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Bu Ani, Ruang Lab 2</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNewsroom = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Komunikasi & Informasi</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['pengumuman', 'chat', 'berita'].map((tab) => (
              <button key={tab} onClick={() => setActiveNewsTab(tab)} className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeNewsTab === tab ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}>
                {tab === 'pengumuman' ? 'Pusat Pengumuman' : tab === 'chat' ? 'Chat dengan Wali Kelas' : 'Berita Sekolah'}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {activeNewsTab === 'pengumuman' && (
            <div className="space-y-3">
              {mockAnnouncements.map(announcement => (
                <div key={announcement.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">{announcement.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{announcement.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{announcement.preview}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {announcement.hasAttachment && <FiFileText className="text-gray-400" />}
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
                      <FiEye className="mr-1"/> Lihat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeNewsTab === 'chat' && (
            <div className="flex h-96">
              <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-4">
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium dark:text-white">Wali Kelas X-A - Pak Budi</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Terima kasih informasinya, Pak.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col pl-4">
                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                      <p>Selamat pagi, Pak/Bu. Mohon perhatian untuk jadwal OSIS besok.</p>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">08:30</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-blue-600 text-white">
                      <p>Baik, Pak. Terima kasih infonya.</p>
                      <p className="text-xs mt-1 text-blue-100">08:45</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Ketik pesan..." className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"><FiSend/></button>
                </div>
              </div>
            </div>
          )}
          {activeNewsTab === 'berita' && (
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">S</div>
                  <div>
                    <p className="font-medium dark:text-white">Sekolah</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 hari yang lalu</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">Selamat kepada tim olimpiade matematika kita yang telah berhasil meraih juara 2 tingkat provinsi! Kalian adalah kebanggaan kita.</p>
                <img src="https://via.placeholder.com/600x300" alt="Berita" className="w-full rounded-lg mb-3"/>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <button className="flex items-center space-x-1"><FiHeart /> <span>45</span></button>
                  <button className="flex items-center space-x-1"><FiMessageCircle /> <span>12</span></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPeloporStrategy = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Layanan Unggulan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parent Marketplace */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiShoppingBag className="mr-2"/> Parent Marketplace</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Temukan penawaran menarik dari orang tua lainnya di komunitas sekolah.</p>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium dark:text-white">Katering Sehat untuk Anak</h4>
                <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">Sponsored</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Makanan sehat dan bergizi untuk kebutuhan sekolah anak Anda.</p>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Lihat Penawaran</button>
            </div>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium dark:text-white">Les Privat Matematika</h4>
                <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">Sponsored</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tingkatkan nilai matematika anak dengan bimbingan dari ahli.</p>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Lihat Penawaran</button>
            </div>
          </div>
        </div>

        {/* Asuransi & Tabungan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiShield className="mr-2"/> Asuransi & Tabungan Pendidikan</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Jaminan masa depan pendidikan anak Anda.</p>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium dark:text-white mb-2">Asuransi Pendidikan Terpercaya</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Perlindungan maksimal untuk biaya pendidikan dari TK hingga Kuliah.</p>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">Ajukan Sekarang</button>
            </div>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium dark:text-white mb-2">Tabungan Pendidikan</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Rencanakan masa depan pendidikan anak dengan menabung sejak dini.</p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Buka Tabungan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Main Render Logic ---
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'finance': return renderFinancialCenter();
      case 'progress': return renderProgressTracker();
      case 'news': return renderNewsroom();
      case 'pelopor': return renderPeloporStrategy();
      default: return <div className="p-6"><h2 className="text-2xl font-bold dark:text-white">Halaman tidak ditemukan</h2></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Portal Wali Murid</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Jendela Transparansi Anda</p>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                activeMenu === item.id ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400' : ''
              }`}
            >
              <span className={`mr-3 ${activeMenu === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>{item.icon}</span>
              <span className={`text-sm font-medium ${activeMenu === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-lg mr-4">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400"/>
              <input type="text" placeholder="Cari informasi..." className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center"><span className="text-white font-medium text-sm">WM</span></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Wali Murid</span>
              </div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <section className="flex-1 overflow-auto">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default WaliMuridDashboard;