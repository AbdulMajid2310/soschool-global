"use client"

// pages/perpustakaan/index.tsx
import React, { useState, useEffect } from 'react';
import { 
  FiBook, FiUsers, FiBarChart2, FiDownload, FiSearch, FiPlus,
  FiEdit, FiTrash2, FiCamera, FiCalendar, FiClock, FiAlertCircle,
  FiCheckCircle, FiXCircle, FiFilter, FiGrid, FiList, FiEye,
  FiBookmark, FiDollarSign, FiTrendingUp, FiAward, FiChevronRight,
  FiHome,  FiFileText, FiWifi, FiUser, FiBell,
  FiStar
} from 'react-icons/fi';
import { IoLibraryOutline } from 'react-icons/io5';

// --- Type Definitions ---
interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  category: string;
  deweyCode: string;
  stock: number;
  location: string;
  cover: string;
  barcode: string;
}

interface BorrowedBook {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  fine?: number;
}

interface EBook {
  id: string;
  title: string;
  author: string;
  category: string;
  fileUrl: string;
  cover: string;
  description: string;
}

// --- Mock Data ---
const mockBooks: Book[] = [
  { 
    id: 'b1', title: 'Laskar Pelangi', author: 'Andrea Hirata', 
    publisher: 'Bentang Pustaka', year: 2005, isbn: '978-602-291-025-8', 
    category: 'Fiksi', deweyCode: '823', stock: 5, location: 'Rak A-01', 
    cover: 'https://via.placeholder.com/150x200?text=Laskar+Pelangi', 
    barcode: '1234567890123' 
  },
  { 
    id: 'b2', title: 'Biologi untuk SMA Kelas X', author: 'Tim Guru Biologi', 
    publisher: 'Erlangga', year: 2021, isbn: '978-602-291-123-4', 
    category: 'Sains', deweyCode: '570', stock: 10, location: 'Rak B-02', 
    cover: 'https://via.placeholder.com/150x200?text=Biologi+SMA', 
    barcode: '1234567890124' 
  },
  { 
    id: 'b3', title: 'Sejarah Indonesia', author: 'Prof. Dr. Anhar', 
    publisher: 'Kementerian Pendidikan', year: 2020, isbn: '978-602-291-567-8', 
    category: 'Sejarah', deweyCode: '959.8', stock: 2, location: 'Rak C-03', 
    cover: 'https://via.placeholder.com/150x200?text=Sejarah+Indonesia', 
    barcode: '1234567890125' 
  },
];

const mockBorrowedBooks: BorrowedBook[] = [
  { 
    id: 'br1', bookId: 'b1', bookTitle: 'Laskar Pelangi', 
    studentId: 's1', studentName: 'Ahmad Rizki', 
    borrowDate: '2023-06-01', dueDate: '2023-06-15', 
    status: 'borrowed' 
  },
  { 
    id: 'br2', bookId: 'b2', bookTitle: 'Biologi untuk SMA Kelas X', 
    studentId: 's2', studentName: 'Siti Nurhaliza', 
    borrowDate: '2023-05-20', dueDate: '2023-06-03', 
    returnDate: '2023-06-01', status: 'returned' 
  },
  { 
    id: 'br3', bookId: 'b3', bookTitle: 'Sejarah Indonesia', 
    studentId: 's3', studentName: 'Budi Santoso', 
    borrowDate: '2023-05-10', dueDate: '2023-05-24', 
    status: 'overdue', fine: 5000 
  },
];

const mockEBooks: EBook[] = [
  { 
    id: 'e1', title: 'Panduan Belajar Efektif', author: 'Dr. Psikologi Pendidikan', 
    category: 'Pendidikan', fileUrl: '#', cover: 'https://via.placeholder.com/150x200?text=Panduan+Belajar', 
    description: 'Buku panduan untuk meningkatkan efektivitas belajar.' 
  },
  { 
    id: 'e2', title: 'Kumpulan Cerita Inspiratif', author: 'Tim Penulis Sekolah', 
    category: 'Fiksi', fileUrl: '#', cover: 'https://via.placeholder.com/150x200?text=Cerita+Inspiratif', 
    description: 'Kumpulan cerita pendek yang memotivasi.' 
  },
];

// --- Main Component ---
const ELibraryDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'pustakawan' | 'siswa'>('pustakawan');
  const [activeMenu, setActiveMenu] = useState<string>('katalog');
  const [activeStudentMenu, setActiveStudentMenu] = useState<string>('katalog-siswa');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddBookModal, setShowAddBookModal] = useState<boolean>(false);
  const [scannedStudent, setScannedStudent] = useState<{ id: string, name: string, class: string } | null>(null);
  const [scannedBook, setScannedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const librarianMenuItems = [
    { id: 'katalog', label: 'Manajemen Katalog Buku', icon: <FiBook className="w-5 h-5" /> },
    { id: 'sirkulasi', label: 'Sirkulasi (Peminjaman & Pengembalian)', icon: <FiUsers className="w-5 h-5" /> },
    { id: 'laporan', label: 'Laporan & Analitik', icon: <FiBarChart2 className="w-5 h-5" /> },
  ];

  const studentMenuItems = [
    { id: 'katalog-siswa', label: 'Katalog Buku', icon: <IoLibraryOutline  className="w-5 h-5" /> },
    { id: 'buku-saya', label: 'Buku Saya', icon: <FiBook className="w-5 h-5" /> },
    { id: 'ebook', label: 'Perpustakaan Digital (E-Book)', icon: <FiFileText className="w-5 h-5" /> },
  ];

  const handleScanStudentQR = () => {
    // Simulasi scan QR
    setScannedStudent({ id: 's1', name: 'Ahmad Rizki', class: 'X-A' });
  };

  const handleScanBookBarcode = () => {
    // Simulasi scan barcode
    setScannedBook(mockBooks[0]);
  };

  const handleBorrowBook = () => {
    if (scannedStudent && scannedBook) {
      alert(`Buku "${scannedBook.title}" berhasil dipinjamkan kepada ${scannedStudent.name}`);
      setScannedStudent(null);
      setScannedBook(null);
    }
  };

  const handleReturnBook = (bookId: string) => {
    alert(`Buku berhasil dikembalikan.`);
    // Logika pengembalian buku akan diimplementasikan di sini
  };

  // --- Render Functions for Librarian View ---
  const renderCatalogPage = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Manajemen Katalog Buku</h2>
        <button 
          onClick={() => setShowAddBookModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2"/> Tambah Buku Baru
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex items-center">
        <FiSearch className="text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Cari berdasarkan judul, penulis, atau ISBN..." 
          className="flex-1 outline-none dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          <FiFilter className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Penulis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Stok</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Lokasi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Barcode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {mockBooks.map(book => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={book.cover} alt={book.title} className="h-10 w-8 object-cover mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{book.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{book.publisher}, {book.year}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.barcode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                    <FiEdit />
                  </button>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Tambah Buku Baru</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Judul Buku</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Penulis</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white">
                  <option>Fiksi</option>
                  <option>Sains</option>
                  <option>Sejarah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stok</label>
                <input type="number" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                onClick={() => setShowAddBookModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Batal
              </button>
              <button 
                onClick={() => setShowAddBookModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCirculationPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Sirkulasi (Peminjaman & Pengembalian)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Peminjaman */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
            <FiDownload className="mr-2 transform rotate-180" /> Peminjaman
          </h3>
          
          {!scannedStudent && (
            <div className="mb-4">
              <button 
                onClick={handleScanStudentQR}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiCamera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">Scan QR Code Siswa</span>
              </button>
            </div>
          )}
          
          {scannedStudent && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">AR</div>
                <div>
                  <p className="font-medium dark:text-white">{scannedStudent.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Kelas {scannedStudent.class}</p>
                </div>
              </div>
            </div>
          )}
          
          {!scannedBook && scannedStudent && (
            <div className="mb-4">
              <button 
                onClick={handleScanBookBarcode}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiCamera className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-gray-500 dark:text-gray-400">Scan Barcode Buku</span>
              </button>
            </div>
          )}
          
          {scannedBook && (
            <div className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex">
                <img src={scannedBook.cover} alt={scannedBook.title} className="h-16 w-12 object-cover mr-3" />
                <div className="flex-1">
                  <p className="font-medium dark:text-white">{scannedBook.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{scannedBook.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stok: {scannedBook.stock}</p>
                </div>
              </div>
            </div>
          )}
          
          {scannedStudent && scannedBook && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Batas Pengembalian</span>
                <span className="text-sm font-medium dark:text-white">14 hari</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal Jatuh Tempo</span>
                <span className="text-sm font-medium dark:text-white">01 Juli 2023</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Denda Keterlambatan</span>
                <span className="text-sm font-medium dark:text-white">Rp 500/hari</span>
              </div>
              <button 
                onClick={handleBorrowBook}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Proses Peminjaman
              </button>
            </div>
          )}
        </div>
        
        {/* Pengembalian */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
            <FiDownload className="mr-2" /> Pengembalian
          </h3>
          
          <div className="mb-4">
            <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiCamera className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-500 dark:text-gray-400">Scan Barcode Buku</span>
            </button>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium dark:text-white">Buku Dipinjam Hari Ini</h4>
            {mockBorrowedBooks.filter(book => book.status === 'borrowed').map(borrowed => (
              <div key={borrowed.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium dark:text-white">{borrowed.bookTitle}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{borrowed.studentName} • Jatuh tempo: {borrowed.dueDate}</p>
                  </div>
                  <button 
                    onClick={() => handleReturnBook(borrowed.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    Kembalikan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Denda Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
          <FiDollarSign className="mr-2" /> Sistem Denda Otomatis
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nama Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Judul Buku</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Terlambat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Denda</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockBorrowedBooks.filter(book => book.status === 'overdue').map(borrowed => (
                <tr key={borrowed.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{borrowed.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{borrowed.bookTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">7 hari</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">Rp {borrowed.fine?.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Belum Dibayar
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Laporan & Analitik</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiBook className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Buku</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiDownload className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dipinjam Hari Ini</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">32</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiClock className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Terlambat</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FiDollarSign className="w-8 h-8 text-red-600 dark:text-red-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Denda</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Rp 35,000</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buku Terpopuler */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
            <FiTrendingUp className="mr-2" /> Buku Terpopuler
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 dark:text-gray-400 mr-3">1</span>
              <div className="flex-1">
                <p className="font-medium dark:text-white">Laskar Pelangi</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dipinjam 45 kali</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 dark:text-gray-400 mr-3">2</span>
              <div className="flex-1">
                <p className="font-medium dark:text-white">Biologi untuk SMA Kelas X</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dipinjam 38 kali</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-500 dark:text-gray-400 mr-3">3</span>
              <div className="flex-1">
                <p className="font-medium dark:text-white">Sejarah Indonesia</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dipinjam 32 kali</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistik Literasi */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
            <FiAward className="mr-2" /> Statistik Literasi
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">AR</div>
              <div className="flex-1">
                <p className="font-medium dark:text-white">Ahmad Rizki</p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">12 buku dibaca</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">SN</div>
              <div className="flex-1">
                <p className="font-medium dark:text-white">Siti Nurhaliza</p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">10 buku dibaca</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Render Functions for Student View ---
  const renderStudentCatalogPage = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">Katalog Buku</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <FiGrid />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <FiList />
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex items-center">
        <FiSearch className="text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Cari buku berdasarkan judul atau penulis..." 
          className="flex-1 outline-none dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mockBooks.map(book => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <img src={book.cover} alt={book.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="font-medium text-sm dark:text-white truncate">{book.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Stok: {book.stock}</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <FiBookmark />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Penulis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Stok</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockBooks.map(book => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={book.cover} alt={book.title} className="h-10 w-8 object-cover mr-3" />
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{book.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{book.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3">
                      Pinjam
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderMyBooksPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Buku Saya</h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Sedang Dipinjam</h3>
        <div className="space-y-4">
          {mockBorrowedBooks.filter(book => book.status === 'borrowed' && book.studentId === 's1').map(borrowed => (
            <div key={borrowed.id} className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <img src="https://via.placeholder.com/80x120" alt={borrowed.bookTitle} className="h-20 w-16 object-cover mr-4" />
              <div className="flex-1">
                <h4 className="font-medium dark:text-white">{borrowed.bookTitle}</h4>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiCalendar className="mr-1" />
                  <span>Pinjam: {borrowed.borrowDate}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  <span>Jatuh tempo: {borrowed.dueDate}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Aktif
                </span>
                <button className="mt-2 block text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Perpanjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Riwayat Peminjaman</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Judul Buku</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tanggal Pinjam</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Tanggal Kembali</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockBorrowedBooks.filter(book => book.status === 'returned' && book.studentId === 's1').map(borrowed => (
                <tr key={borrowed.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{borrowed.bookTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{borrowed.borrowDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{borrowed.returnDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Dikembalikan
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEBookPage = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Perpustakaan Digital (E-Book)</h2>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 flex items-center">
        <FiSearch className="text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Cari e-book..." 
          className="flex-1 outline-none dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEBooks.map(ebook => (
          <div key={ebook.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="relative">
              <img src={ebook.cover} alt={ebook.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full">
                <FiWifi className="text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium dark:text-white mb-1">{ebook.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{ebook.author}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ebook.description}</p>
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center justify-center">
                  <FiEye className="mr-2" /> Baca Online
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center">
                  <FiDownload className="dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Main Render Logic ---
  const renderContent = () => {
    if (activeView === 'pustakawan') {
      switch (activeMenu) {
        case 'katalog': return renderCatalogPage();
        case 'sirkulasi': return renderCirculationPage();
        case 'laporan': return renderReportsPage();
        default: return <div className="p-6"><h2 className="text-2xl font-bold dark:text-white">Halaman tidak ditemukan</h2></div>;
      }
    } else {
      switch (activeStudentMenu) {
        case 'katalog-siswa': return renderStudentCatalogPage();
        case 'buku-saya': return renderMyBooksPage();
        case 'ebook': return renderEBookPage();
        default: return <div className="p-6"><h2 className="text-2xl font-bold dark:text-white">Halaman tidak ditemukan</h2></div>;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">e-Library</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Perpustakaan Digital</p>
        </div>
        
        {/* Role Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setActiveView('pustakawan')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'pustakawan' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Pustakawan
            </button>
            <button
              onClick={() => setActiveView('siswa')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeView === 'siswa' 
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Siswa
            </button>
          </div>
        </div>
        
        <nav className="flex-1 mt-4 overflow-y-auto">
          {(activeView === 'pustakawan' ? librarianMenuItems : studentMenuItems).map(item => (
            <button
              key={item.id}
              onClick={() => activeView === 'pustakawan' ? setActiveMenu(item.id) : setActiveStudentMenu(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                (activeView === 'pustakawan' && activeMenu === item.id) || (activeView === 'siswa' && activeStudentMenu === item.id)
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400' 
                  : ''
              }`}
            >
              <span className={`mr-3 ${
                (activeView === 'pustakawan' && activeMenu === item.id) || (activeView === 'siswa' && activeStudentMenu === item.id)
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {item.icon}
              </span>
              <span className={`text-sm font-medium ${
                (activeView === 'pustakawan' && activeMenu === item.id) || (activeView === 'siswa' && activeStudentMenu === item.id)
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {activeView === 'pustakawan' 
                ? librarianMenuItems.find(item => item.id === activeMenu)?.label 
                : studentMenuItems.find(item => item.id === activeStudentMenu)?.label
              }
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                  activeView === 'pustakawan' ? 'bg-purple-600' : 'bg-green-600'
                }`}>
                  {activeView === 'pustakawan' ? 'PU' : 'SW'}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {activeView === 'pustakawan' ? 'Pustakawan' : 'Siswa'}
                </span>
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

export default ELibraryDashboard;