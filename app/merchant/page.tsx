"use client"

// pages/merchant/index.tsx
import React, { useState } from 'react';
import { 
  FiHome, FiShoppingCart, FiPackage, FiList, FiCreditCard,
  FiDollarSign, FiTrendingUp, FiCamera, FiXCircle, FiCheckCircle,
  FiPlus, FiEdit, FiTrash2, FiDownload, FiRefreshCw, FiAlertCircle,
  FiSearch, FiBell, FiUser, FiToggleLeft, FiToggleRight
} from 'react-icons/fi';

// --- Type Definitions ---
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface Transaction {
  id: string;
  studentName: string;
  time: string;
  amount: number;
  status: 'success' | 'refund';
}

interface Withdrawal {
  id: string;
  amount: number;
  requestDate: string;
  status: 'processing' | 'sent' | 'completed';
}

// --- Mock Data ---
const mockProducts: Product[] = [
  { id: 'p1', name: 'Nasi Goreng', price: 15000, category: 'Makanan', image: 'https://via.placeholder.com/150', inStock: true },
  { id: 'p2', name: 'Mie Ayam', price: 13000, category: 'Makanan', image: 'https://via.placeholder.com/150', inStock: true },
  { id: 'p3', name: 'Es Teh Manis', price: 5000, category: 'Minuman', image: 'https://via.placeholder.com/150', inStock: false },
  { id: 'p4', name: 'Jus Jeruk', price: 10000, category: 'Minuman', image: 'https://via.placeholder.com/150', inStock: true },
];

const mockTransactions: Transaction[] = [
  { id: 't1', studentName: 'Ahmad Rizki', time: '10:30', amount: 15000, status: 'success' },
  { id: 't2', studentName: 'Siti Nurhaliza', time: '10:25', amount: 18000, status: 'success' },
  { id: 't3', studentName: 'Budi Santoso', time: '10:15', amount: 5000, status: 'refund' },
];

const mockWithdrawals: Withdrawal[] = [
  { id: 'w1', amount: 500000, requestDate: '2023-06-10', status: 'completed' },
  { id: 'w2', amount: 750000, requestDate: '2023-06-15', status: 'sent' },
];

// --- Main Component ---
const MerchantDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);
  const [scannedStudent, setScannedStudent] = useState<{ name: string, class: string } | null>(null);
  const [transactionAmount, setTransactionAmount] = useState<string>('0');

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard Penjualan', icon: <FiHome className="w-5 h-5" /> },
    { id: 'pos', label: 'Point of Sales (POS)', icon: <FiShoppingCart className="w-5 h-5" /> },
    { id: 'products', label: 'Manajemen Menu & Stok', icon: <FiPackage className="w-5 h-5" /> },
    { id: 'history', label: 'Riwayat Transaksi', icon: <FiList className="w-5 h-5" /> },
    { id: 'withdrawal', label: 'Penarikan Dana', icon: <FiCreditCard className="w-5 h-5" /> },
  ];

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleScanQR = () => {
    // Simulasi scan QR
    setScannedStudent({ name: 'Ahmad Rizki', class: 'X-A' });
  };

  const handleProcessPayment = () => {
    // Simulasi proses pembayaran
    setTransactionSuccess(true);
    setTimeout(() => {
      setTransactionSuccess(false);
      setScannedStudent(null);
      setTransactionAmount('0');
    }, 2000);
  };

  const toggleStock = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const handleRefund = (transactionId: string) => {
    if (window.confirm('Apakah Anda yakin ingin melakukan refund untuk transaksi ini?')) {
      // Logika refund akan diimplementasikan di sini
      alert('Refund berhasil diproses!');
    }
  };

  // --- Render Functions for each Menu ---
  const renderDashboard = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Ringkasan Penjualan Hari Ini</h2>
      
      {/* Widget Pendapatan dan Transaksi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-linear-to-r from-green-500 to-blue-600 p-6 rounded-lg shadow text-white">
          <h3 className="text-lg font-semibold mb-2">Total Pendapatan Hari Ini</h3>
          <p className="text-4xl font-bold">Rp 1.250.000</p>
          <p className="text-sm mt-2 opacity-90">Dari 85 transaksi</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Status Saldo</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">Rp 2.450.000</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Siap ditarik</p>
        </div>
      </div>

      {/* Grafik Penjualan */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center"><FiTrendingUp className="mr-2"/> Grafik Penjualan</h3>
        <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Grafik jam sibuk akan ditampilkan di sini</p>
        </div>
      </div>
    </div>
  );

  const renderPOS = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Kasir Digital</h2>
      
      {!scannedStudent && !transactionSuccess && (
        <div className="flex flex-col items-center justify-center h-96">
          <button 
            onClick={handleScanQR}
            className="p-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mb-4"
          >
            <FiCamera className="w-16 h-16" />
          </button>
          <p className="text-lg dark:text-white">Scan QR Code Siswa</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Arahkan kamera ke kartu siswa</p>
        </div>
      )}

      {scannedStudent && !transactionSuccess && (
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">AR</div>
              <div>
                <p className="font-medium text-lg dark:text-white">{scannedStudent.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Kelas {scannedStudent.class}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Saldo Siswa</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">Rp 75.000</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Pembayaran</label>
            <div className="flex items-center">
              <span className="text-2xl mr-2 dark:text-white">Rp</span>
              <input 
                type="number" 
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                className="flex-1 text-2xl font-bold px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
            </div>
            <button 
              onClick={handleProcessPayment}
              className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700"
            >
              Proses Pembayaran
            </button>
          </div>
        </div>
      )}

      {transactionSuccess && (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="p-8 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <FiCheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold dark:text-white">Pembayaran Berhasil!</p>
          <p className="text-gray-500 dark:text-gray-400">Ding! Uang sudah masuk ke akun Anda</p>
        </div>
      )}
    </div>
  );

  const renderProductManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Manajemen Menu & Stok</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center">
          <FiPlus className="mr-2"/> Tambah Produk
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-medium dark:text-white">{product.name}</h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Rp {product.price.toLocaleString('id-ID')}</p>
              <div className="flex justify-between items-center mt-3">
                <button 
                  onClick={() => toggleStock(product.id)}
                  className={`flex items-center text-sm ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {product.inStock ? <FiToggleRight className="w-5 h-5 mr-1" /> : <FiToggleLeft className="w-5 h-5 mr-1" />}
                  {product.inStock ? 'Tersedia' : 'Habis'}
                </button>
                <div className="flex space-x-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <FiEdit />
                  </button>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactionHistory = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Riwayat Transaksi</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 flex items-center">
          <FiDownload className="mr-2"/> Ekspor Laporan
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nominal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{transaction.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp {transaction.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {transaction.status === 'success' ? 'Berhasil' : 'Refund'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {transaction.status === 'success' && (
                      <button 
                        onClick={() => handleRefund(transaction.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWithdrawal = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Penarikan Dana</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Penarikan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Ajukan Pencairan</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Saldo Tersedia</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">Rp 2.450.000</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nominal Penarikan</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Masukkan nominal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rekening Tujuan</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                <option>BCA - 1234567890 (An. Kantin Sejahtera)</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Ajukan Pencairan
            </button>
          </div>
        </div>
        
        {/* Riwayat Penarikan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Riwayat Penarikan</h3>
          <div className="space-y-3">
            {mockWithdrawals.map(withdrawal => (
              <div key={withdrawal.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium dark:text-white">Rp {withdrawal.amount.toLocaleString('id-ID')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{withdrawal.requestDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    withdrawal.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : withdrawal.status === 'sent'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {withdrawal.status === 'completed' ? 'Selesai' : withdrawal.status === 'sent' ? 'Terkirim' : 'Diproses'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info Potongan Admin */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <div className="flex items-start">
          <FiAlertCircle className="text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100">Informasi Potongan Admin</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Setiap transaksi dikenakan biaya admin sebesar 2.5% dari total transaksi. Biaya ini akan otomatis dipotong dari saldo Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Main Render Logic ---
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'pos': return renderPOS();
      case 'products': return renderProductManagement();
      case 'history': return renderTransactionHistory();
      case 'withdrawal': return renderWithdrawal();
      default: return <div className="p-6"><h2 className="text-2xl font-bold dark:text-white">Halaman tidak ditemukan</h2></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Portal Kantin</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Kasir Digital Anda</p>
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard Kantin</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-600 flex items-center justify-center"><span className="text-white font-medium text-sm">KT</span></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kantin Sejahtera</span>
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

export default MerchantDashboard;