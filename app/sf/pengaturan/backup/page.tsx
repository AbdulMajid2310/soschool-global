'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCloudDownloadAlt,
  FaHistory,
  FaTrash,
  FaSyncAlt,
  FaPlus,
  FaDownload,
  FaExclamationTriangle,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';

/* =======================
   TIPE DATA & DATA CONTOH
======================= */
interface Backup {
  id: string;
  fileName: string;
  createdAt: Date;
  fileSize: string; // dalam format yang mudah dibaca, misal "15.2 MB"
  createdBy: string;
}

// Data contoh untuk simulasi
const mockBackups: Backup[] = [
  {
    id: '1',
    fileName: 'backup-2023-10-26-10-00-00.sql',
    createdAt: new Date('2023-10-26T10:00:00'),
    fileSize: '18.5 MB',
    createdBy: 'Admin User',
  },
  {
    id: '2',
    fileName: 'backup-2023-10-25-10-00-00.sql',
    createdAt: new Date('2023-10-25T10:00:00'),
    fileSize: '18.3 MB',
    createdBy: 'Admin User',
  },
  {
    id: '3',
    fileName: 'backup-sebelum-uts.sql',
    createdAt: new Date('2023-10-20T08:30:00'),
    fileSize: '17.9 MB',
    createdBy: 'Super Admin',
  },
];

/* =======================
   KOMPONEN PENDUKUNG
======================= */

// Modal Konfirmasi
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'danger' | 'warning';
}> = ({ isOpen, onConfirm, onCancel, title, message, confirmText, cancelText, type }) => {
  if (!isOpen) return null;
  const iconColor = type === 'danger' ? 'text-red-500' : 'text-yellow-500';
  const buttonColor = type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-yellow-600 hover:bg-yellow-700';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className={`text-2xl ${iconColor}`} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 text-white rounded-md ${buttonColor}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifikasi
const Notification: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? FaCheckCircle : FaExclamationTriangle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <Icon />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="ml-4"><FaTimes /></button>
    </div>
  );
};

/* =======================
   HALAMAN UTAMA
======================= */
export default function BackupRestorePage() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmation, setConfirmation] = useState<{
    action: () => void;
    title: string;
    message: string;
    type: 'danger' | 'warning';
  } | null>(null);

  // Simulasi pengambilan data backup saat komponen dimuat
  useEffect(() => {
    // fetch('/api/backups').then(res => res.json()).then(data => setBackups(data));
    setBackups(mockBackups);
  }, []);

  // --- HANDLER FUNGSI ---
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCreateBackup = async () => {
    setIsLoading(true);
    try {
      // Simulasi proses pembuatan backup di server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBackup: Backup = {
        id: Date.now().toString(),
        fileName: `backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.sql`,
        createdAt: new Date(),
        fileSize: `${(Math.random() * 5 + 15).toFixed(1)} MB`, // Ukuran acak untuk demo
        createdBy: 'Admin User', // Dapat diambil dari session user
      };

      setBackups(prev => [newBackup, ...prev]);
      showNotification('Backup berhasil dibuat!', 'success');
    } catch (error) {
      showNotification('Gagal membuat backup.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = (backup: Backup) => {
    setConfirmation({
      action: () => executeRestore(backup),
      title: 'Konfirmasi Pemulihan Data',
      message: `Apakah Anda yakin ingin memulihkan data dari backup "${backup.fileName}"? Tindakan ini akan mengganti semua data saat ini dan tidak dapat dibatalkan.`,
      type: 'warning',
    });
  };

  const executeRestore = async (backup: Backup) => {
    setIsLoading(true);
    setConfirmation(null);
    try {
      // Simulasi proses restore
      await new Promise(resolve => setTimeout(resolve, 3000));
      showNotification(`Sistem berhasil dipulihkan dari backup "${backup.fileName}".`, 'success');
    } catch (error) {
      showNotification('Gagal memulihkan data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (backup: Backup) => {
    setConfirmation({
      action: () => executeDelete(backup.id),
      title: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus backup "${backup.fileName}"? Tindakan ini tidak dapat dibatalkan.`,
      type: 'danger',
    });
  };

  const executeDelete = async (backupId: string) => {
    setIsLoading(true);
    setConfirmation(null);
    try {
      // Simulasi proses hapus
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBackups(prev => prev.filter(b => b.id !== backupId));
      showNotification('Backup berhasil dihapus.', 'success');
    } catch (error) {
      showNotification('Gagal menghapus backup.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (backup: Backup) => {
    // Di dunia nyata, Anda akan mendapatkan URL unduhan dari API
    // const downloadUrl = `/api/backups/download/${backup.id}`;
    // window.open(downloadUrl, '_blank');

    // Simulasi unduh untuk demo
    showNotification(`Mengunduh ${backup.fileName}...`, 'success');
    console.log(`Mengunduh file: ${backup.fileName}`);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
      {confirmation && (
        <ConfirmationModal
          isOpen={!!confirmation}
          onConfirm={confirmation.action}
          onCancel={() => setConfirmation(null)}
          title={confirmation.title}
          message={confirmation.message}
          confirmText="Ya, Lanjutkan"
          cancelText="Batal"
          type={confirmation.type}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl flex items-center gap-3">
            <FaSyncAlt className="animate-spin text-blue-600" />
            <span className="text-gray-800 dark:text-gray-200">Memproses...</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <FaHistory className="text-3xl text-gray-600 dark:text-gray-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Backup & Restore</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kelola cadangan data sistem untuk keamanan dan pemulihan.</p>
            </div>
          </div>
          <button
            onClick={handleCreateBackup}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <FaPlus /> Buat Backup Baru
          </button>
        </div>

        {/* Tabel Backup */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-slate-700 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama File</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal Dibuat</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ukuran</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dibuat Oleh</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                {backups.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      <FaCloudDownloadAlt className="mx-auto text-4xl mb-2" />
                      Belum ada backup. Buat backup pertama Anda sekarang.
                    </td>
                  </tr>
                ) : (
                  backups.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        {backup.fileName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {backup.createdAt.toLocaleString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {backup.fileSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {backup.createdBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleDownload(backup)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="Unduh">
                            <FaDownload />
                          </button>
                          <button onClick={() => handleRestore(backup)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300" title="Pulihkan">
                            <FaHistory />
                          </button>
                          <button onClick={() => handleDelete(backup)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" title="Hapus">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}