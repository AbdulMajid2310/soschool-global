'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import {
  FaFileUpload,
  FaFileContract,
  FaUserShield,
  FaCertificate,
  FaUsers,
  FaHandshake,
  FaUniversity,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
  FaTrash,
  FaCloudUploadAlt,
} from 'react-icons/fa';

/* =======================
   TIPE DATA & KONFIGURASI
======================= */
type FileStatus = 'pending' | 'verified' | 'rejected';
type LicenseStatus = 'pending_submission' | 'under_review' | 'verified' | 'active' | 'rejected';

interface UploadedFile {
  id: string;
  fileName: string;
  category: string;
  uploadDate: string;
  status: FileStatus;
  fileUrl?: string; // URL jika sudah diunggah ke server
}

interface FileCategory {
  id: string;
  title: string;
  description: string;
  requiredFiles: {
    name: string;
    description: string;
  }[];
}

// Konfigurasi kategori dan berkas yang diperlukan
const fileCategories: FileCategory[] = [
  {
    id: 'utama',
    title: '1. Berkas Utama (Wajib)',
    description: 'Berkas ini adalah fondasi legalitas kerja sama Anda dengan sekolah.',
    requiredFiles: [
      {
        name: 'Surat Perjanjian Kerja Sama (MOU)',
        description: 'Dokumen yang sudah ditandatangani Kepala Sekolah di atas Meterai Rp10.000 dan dicap basah.',
      },
      {
        name: 'Scan SK Pengangkatan Kepala Sekolah',
        description: 'Memastikan orang yang menandatangani MOU adalah pejabat yang berwenang.',
      },
      {
        name: 'Scan Izin Operasional Sekolah / Sertifikat NPSN',
        description: 'Memastikan sekolah terdaftar resmi di Kemendikbud/Kemenag.',
      },
    ],
  },
  {
    id: 'operasional',
    title: '2. Berkas Operasional (Untuk Data Sistem)',
    description: 'Berkas ini dibutuhkan agar sistem Anda terisi dengan data yang valid.',
    requiredFiles: [
      {
        name: 'Data Induk Siswa & Guru (Format Excel)',
        description: 'Berisi Nama lengkap, NISN/NIP, NIK, dan alamat.',
      },
      {
        name: 'Surat Pernyataan Pakta Integritas Data',
        description: 'Pernyataan bahwa data yang dimasukkan adalah benar dan sekolah bertanggung jawab atas kerahasiaan akun.',
      },
    ],
  },
  {
    id: 'keuangan',
    title: '3. Berkas Verifikasi Keuangan (Jika Menggunakan Kantin/SPP)',
    description: 'Karena ada perputaran uang, Anda butuh data rekening tujuan untuk penyaluran dana.',
    requiredFiles: [
      {
        name: 'Fotokopi Buku Tabungan Rekening Sekolah/Yayasan',
        description: 'Sebagai tujuan transfer dana. Nama di rekening harus nama Instansi/Yayasan.',
      },
    ],
  },
];

/* =======================
   KOMPONEN PENDUKUNG
======================= */

// Badge untuk status berkas
const StatusBadge: React.FC<{ status: FileStatus }> = ({ status }) => {
  const config = {
    pending: { icon: FaClock, text: 'Menunggu Verifikasi', color: 'bg-yellow-100 text-yellow-800' },
    verified: { icon: FaCheckCircle, text: 'Terverifikasi', color: 'bg-green-100 text-green-800' },
    rejected: { icon: FaTimesCircle, text: 'Ditolak', color: 'bg-red-100 text-red-800' },
  };
  const { icon: Icon, text, color } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3" /> {text}
    </span>
  );
};

// Komponen untuk satu kategori unggah berkas
const FileUploadSection: React.FC<{
  category: FileCategory;
  uploadedFiles: UploadedFile[];
  onFileUpload: (category: string, files: FileList) => void;
}> = ({ category, uploadedFiles, onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(category.id, e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(category.id, e.target.files);
    }
  };

  const filesInThisCategory = uploadedFiles.filter(f => f.category === category.id);

  return (
    <fieldset className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
      <legend className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{category.title}</legend>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>

      {/* Daftar Berkas yang Diperlukan */}
      <div className="mb-4 space-y-2">
        {category.requiredFiles.map((req) => {
          const isUploaded = filesInThisCategory.some(f => f.fileName.includes(req.name.split(' ')[0]));
          return (
            <div key={req.name} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
              {isUploaded ? <FaCheckCircle className="text-green-500 mt-0.5" /> : <div className="w-4 h-4 border-2 border-gray-400 rounded-full mt-0.5" />}
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{req.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{req.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Area Unggah Berkas */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-3" />
        <p className="text-gray-600 dark:text-gray-400 mb-2">Seret dan lepas berkas di sini, atau</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          className="hidden"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Pilih Berkas
        </button>
        <p className="text-xs text-gray-500 mt-2">Format yang didukung: PDF, DOC, XLS, JPG, PNG (Maks. 10MB per berkas)</p>
      </div>

      {/* Daftar Berkas yang Telah Diunggah */}
      {filesInThisCategory.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Berkas yang Diunggah:</h4>
          <ul className="space-y-2">
            {filesInThisCategory.map((file) => (
              <li key={file.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700 rounded">
                <div className="flex items-center gap-2">
                  <FaFileContract className="text-gray-500" />
                  <span className="text-sm text-gray-800 dark:text-gray-200">{file.fileName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={file.status} />
                  <button className="text-blue-600 hover:text-blue-800" title="Lihat">
                    <FaEye />
                  </button>
                  {/* <button className="text-red-600 hover:text-red-800" title="Hapus">
                    <FaTrash />
                  </button> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </fieldset>
  );
};

/* =======================
   HALAMAN UTAMA
======================= */
export default function ManajemenLisensiPage() {
  const [licenseStatus, setLicenseStatus] = useState<LicenseStatus>('pending_submission');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulasi pengambilan data awal
  // React.useEffect(() => {
  //   // fetch('/api/license-status').then(res => res.json()).then(data => {
  //   //   setLicenseStatus(data.status);
  //   //   setUploadedFiles(data.files);
  //   // });
  // }, []);

  const handleFileUpload = async (categoryId: string, files: FileList) => {
    setIsLoading(true);
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Di sini Anda akan melakukan upload ke server
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('category', categoryId);
      // const result = await api.uploadFile(formData);

      // Simulasi upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      newFiles.push({
        id: `${Date.now()}-${i}`,
        fileName: file.name,
        category: categoryId,
        uploadDate: new Date().toLocaleDateString('id-ID'),
        status: 'pending', // Status awal adalah 'pending'
        // fileUrl: result.fileUrl
      });
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
    setIsLoading(false);
    
    // Logika untuk memperbarui status lisensi secara otomatis
    // (Ini adalah contoh sederhana, logika yang lebih kompleks mungkin diperlukan)
    if (licenseStatus === 'pending_submission') {
      setLicenseStatus('under_review');
    }
  };

  const getStatusInfo = () => {
    switch (licenseStatus) {
      case 'pending_submission':
        return { text: 'Menunggu Pengiriman Berkas', color: 'bg-gray-100 text-gray-800', icon: FaClock };
      case 'under_review':
        return { text: 'Sedang Dalam Tinjauan', color: 'bg-blue-100 text-blue-800', icon: FaEye };
      case 'verified':
        return { text: 'Terverifikasi', color: 'bg-green-100 text-green-800', icon: FaCheckCircle };
      case 'active':
        return { text: 'Lisensi Aktif', color: 'bg-emerald-100 text-emerald-800', icon: FaCheckCircle };
      case 'rejected':
        return { text: 'Ditolak', color: 'bg-red-100 text-red-800', icon: FaTimesCircle };
      default:
        return { text: 'Status Tidak Diketahui', color: 'bg-gray-100 text-gray-800', icon: FaClock };
    }
  };

  const { text: statusText, color: statusColor, icon: StatusIcon } = getStatusInfo();

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Status Lisensi */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Manajemen Lisensi</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unggah berkas yang diperlukan untuk mengaktifkan dan memverifikasi lisensi sekolah Anda.
            </p>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${statusColor}`}>
            <StatusIcon className="w-5 h-5" />
            {statusText}
          </div>
        </div>

        {/* Daftar Kategori Unggah Berkas */}
        <div className="space-y-6">
          {fileCategories.map((category) => (
            <FileUploadSection
              key={category.id}
              category={category}
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
            />
          ))}
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-xl flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Mengunggah berkas...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}