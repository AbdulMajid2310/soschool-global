"use client";

import React, { useState, useEffect } from 'react';
import { 
  // Core Icons
  FiHome, FiDollarSign, FiPackage, FiMessageSquare, FiUsers, FiTrendingUp,
  FiBarChart2, FiShield, FiCpu, FiZap, FiCalendar, FiUserCheck, FiEdit,
  FiGrid, FiChevronDown, FiChevronRight, FiBell, FiSearch, FiSettings,
  FiLogOut, FiFileText, FiCheckCircle, FiAlertCircle, FiActivity,
  FiDatabase, FiRefreshCw, FiClock, FiMapPin, FiMail, FiPaperclip,
  FiStar, FiAward, FiBookOpen, FiTool, FiGlobe, FiLock, FiUserPlus,
  FiUserX, FiDownload, FiUpload, FiFilter, FiPrinter, FiShare2,
  FiLink, FiEye, FiEyeOff, FiArchive, FiTrash2, FiEdit3, FiSave,
  FiX, FiPlus, FiMinus, FiMoreVertical, FiInfo, FiHelpCircle,
  FiUser, FiPhone, FiBriefcase, FiUserMinus, FiCheck, FiXCircle,
  FiPause, FiPlay, FiBook, FiUser as FiUserIcon, FiAperture,
  FiMap, FiClipboard, FiTarget, FiCalendar as FiCalendarIcon,
  FiTrendingUp as FiTrendingUpIcon, FiHeart, FiMusic, FiCamera,
  FiCode, FiPenTool, FiMic, FiFeather, FiZap as FiTalentZap,
  FiFolder, FiImage, FiFile, FiAward as FiTrophy, FiBookmark,
  FiPieChart, FiBarChart as FiBarChartIcon, FiGitBranch, FiLayers,
  FiUserPlus as FiAdmission, FiFilePlus, FiFolderPlus, FiCheckSquare,
  FiGrid as FiGridIcon, FiLayout, FiTag, FiPackage as FiDocument,
  FiBookmark as FiTalentBookmark, FiTrendingDown, FiActivity as FiActivityIcon,
  FiUser as FiUserAvatar, FiMail as FiEmailIcon, FiPhone as FiPhoneIcon,
  FiMapPin as FiLocationIcon, FiCalendar as FiDateIcon, FiClock as FiTimeIcon,
  FiAward as FiAwardIcon, FiStar as FiStarIcon, FiTrendingUp as FiStatsIcon,
  FiUsers as FiGroupIcon, FiBookOpen as FiBookIcon, FiFileText as FiFileIcon,
  FiCheckSquare as FiCheckIcon, FiAlertTriangle,
  FiChevronLeft, FiChevronRight as FiChevronRightIcon, FiCornerUpLeft,
  FiCornerUpRight, FiMaximize2, FiGrid as FiDashboardIcon, FiActivity as FiPulseIcon,
  FiBarChart as FiChartIcon, FiPieChart as FiPieChartIcon, FiTrendingUp as FiGrowthIcon,
  FiZap as FiLightningIcon, FiTarget as FiTargetIcon, FiAward as FiMedalIcon,
  FiBookmark as FiBookmarkIcon, FiTag as FiTagIcon, FiFilter as FiFilterIcon,
  FiSearch as FiSearchIcon, FiSettings as FiSettingsIcon, FiBell as FiBellIcon,
  FiUser as FiProfileIcon, FiLogOut as FiLogoutIcon, FiHelpCircle as FiHelpIcon,
  FiDownload as FiDownloadIcon, FiUpload as FiUploadIcon, FiFilePlus as FiFilePlusIcon,
  FiFolderPlus as FiFolderPlusIcon, FiEdit as FiEditIcon, FiTrash2 as FiTrashIcon,
  FiSave as FiSaveIcon, FiX as FiXIcon, FiPlus as FiPlusIcon, FiEye as FiEyeIcon,
  FiEyeOff as FiEyeOffIcon, FiShare2 as FiShareIcon, FiPrinter as FiPrinterIcon
} from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';

// --- TYPE DEFINITIONS (DIPERLUAS) ---

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  profileImage: string;
  attendanceRate: number;
  performanceScore: number;
  lastLogin: string;
  address: string;
  education: string;
  certifications: string[];
  emergencyContact: { name: string; relationship: string; phone: string; };
  basicSalary: number;
  bankAccount: string;
  bankName: string;
}

interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'hadir' | 'terlambat' | 'izin' | 'sakit' | 'tanpa-keterangan';
  location?: string;
}

interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  leaveType: 'tahunan' | 'sakit' | 'melahirkan' | 'penting';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvalDate?: string;
  rejectionReason?: string;
  attachment?: string;
}

interface PerformanceReview {
  id: string;
  staffId: string;
  period: string;
  reviewerId: string;
  reviewerName: string;
  score: number;
  notes: string;
  status: 'draft' | 'submitted' | 'approved';
  kpiScores: { kpiId: string; kpiName: string; score: number; weight: number; }[];
  goals: { id: string; description: string; dueDate: string; status: 'pending' | 'in-progress' | 'completed'; }[];
}

interface PayrollRecord {
  id: string;
  staffId: string;
  period: string;
  basicSalary: number;
  allowances: { name: string; amount: number; }[];
  deductions: { name: string; amount: number; }[];
  overtimePay: number;
  netSalary: number;
  status: 'draft' | 'confirmed' | 'paid';
  paymentDate?: string;
  slipUrl?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'all' | 'staff' | 'teachers' | 'parents';
  author: string;
  timestamp: string;
  pinned: boolean;
}

// INTERFACES UNTUK SISWA YANG DIPERLUAS
interface Student {
  id: string;
  nis: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: 'L' | 'P';
  religion: string;
  nationality: string;
  photo: string;
  classId: string;
  className: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred' | 'registration';
  parentIds: string[];
  emergencyContact: { name: string; relationship: string; phone: string; };
  medicalInfo: { bloodType: string; allergies: string[]; conditions: string[]; };
  attendanceRate: number;
  averageGrade: number;
  achievements: { id: string; title: string; date: string; level: string; }[];
  
  // Data tambahan untuk minat bakat
  talents: {
    id: string;
    category: 'akademik' | 'non-akademik' | 'olahraga' | 'seni' | 'teknologi' | 'sosial';
    name: string;
    level: 'pemula' | 'menengah' | 'lanjutan' | 'expert';
    description?: string;
    achievements?: string[];
  }[];
  
  interests: {
    id: string;
    category: string;
    name: string;
    priority: number; // 1-5
  }[];
  
  // Data sekolah sebelumnya
  previousSchools: {
    id: string;
    name: string;
    level: 'SD' | 'SMP' | 'SMA' | 'SMK' | 'MA';
    address: string;
    startYear: string;
    endYear: string;
    graduationDate?: string;
    nisn: string;
    reportCards: ReportCard[];
  }[];
  
  // Berkas siswa
  documents: {
    id: string;
    name: string;
    type: 'ijazah' | 'skhun' | 'akta' | 'kk' | 'raport' | 'sertifikat' | 'foto' | 'lainnya';
    url: string;
    uploadDate: string;
    fileSize: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
}

interface ReportCard {
  id: string;
  semester: number;
  academicYear: string;
  subjects: {
    subjectName: string;
    grade: number;
    description?: string;
  }[];
  rank: number;
  totalStudents: number;
  behavior: {
    discipline: number;
    cleanliness: number;
    politeness: number;
    responsibility: number;
  };
  attendance: {
    total: number;
    present: number;
    sick: number;
    permit: number;
    absent: number;
  };
  notes: string;
  homeroomTeacher: string;
  principalSignature: string;
}

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  relationship: 'ayah' | 'ibu' | 'wali';
  studentIds: string[];
  photo: string;
  username: string;
  lastLogin: string;
}

interface Class {
  id: string;
  name: string;
  level: string;
  major: string;
  room: string;
  capacity: number;
  currentStudents: number;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  academicYear: string;
  schedule: { day: string; startTime: string; endTime: string; subjectId: string; subjectName: string; teacherId: string; teacherName: string; }[];
}

interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  color: string;
  teacherIds: string[];
}

interface Teacher {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: 'L' | 'P';
  religion: string;
  photo: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  education: string;
  certifications: string[];
  subjectIds: string[];
  classIds: string[];
  schedule: { day: string; startTime: string; endTime: string; classId: string; className: string; subjectId: string; subjectName: string; }[];
  attendanceRate: number;
  performanceScore: number;
  lastLogin: string;
  emergencyContact: { name: string; relationship: string; phone: string; };
  basicSalary: number;
  bankAccount: string;
  bankName: string;
}

interface StudentAttendance {
  id: string;
  studentId: string;
  date: string;
  status: 'hadir' | 'sakit' | 'izin' | 'tanpa-keterangan';
  notes?: string;
  reportedBy: string;
}

interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  academicYear: string;
  semester: 'ganjil' | 'genap';
  type: 'tugas' | 'uts' | 'uas' | 'praktikum' | 'portofolio';
  title: string;
  score: number;
  maxScore: number;
  date: string;
  notes?: string;
}

interface Exam {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  room: string;
  type: 'uts' | 'uas' | 'quiz' | 'praktikum';
  description: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  grades: { studentId: string; score: number; status: 'graded' | 'ungraded'; }[];
}

interface AcademicCalendar {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'academic' | 'holiday' | 'event' | 'exam' | 'registration';
  color: string;
  affectedLevels: string[];
  notes?: string;
}

// NEW INTERFACES FOR REGISTRATION
interface StudentRegistration {
  id: string;
  registrationNumber: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: 'L' | 'P';
    religion: string;
    nationality: string;
    address: string;
  };
  parentInfo: {
    father: {
      name: string;
      phone: string;
      email: string;
      occupation: string;
      address?: string;
    };
    mother: {
      name: string;
      phone: string;
      email: string;
      occupation: string;
      address?: string;
    };
    guardian?: {
      name: string;
      phone: string;
      email: string;
      occupation: string;
      address?: string;
      relationship: string;
    };
  };
  previousEducation: {
    schoolName: string;
    schoolLevel: 'SD' | 'SMP' | 'SMA' | 'SMK' | 'MA';
    address: string;
    graduationYear: string;
    nisn: string;
    reportCards: ReportCard[];
  };
  talentsAndInterests: {
    talents: {
      category: 'akademik' | 'non-akademik' | 'olahraga' | 'seni' | 'teknologi' | 'sosial';
      name: string;
      level: 'pemula' | 'menengah' | 'lanjutan' | 'expert';
      description?: string;
    }[];
    interests: {
      category: string;
      name: string;
      priority: number;
    }[];
  };
  documents: {
    type: 'ijazah' | 'skhun' | 'akta' | 'kk' | 'raport' | 'sertifikat' | 'foto' | 'lainnya';
    url: string;
    fileName: string;
    fileSize: string;
  }[];
  registrationDate: string;
  status: 'pending' | 'processing' | 'accepted' | 'rejected';
  notes?: string;
  testScores?: {
    academic: number;
    psychological: number;
    interview: number;
    total: number;
  };
}

// --- STATIC DATA (DIPERLUAS) ---

// Existing data remains the same
const initialStaffMembers: StaffMember[] = [
  { id: '1', name: 'Ahmad Suryadi', email: 'ahmad.suryadi@sekolah.sch.id', phone: '081234567890', position: 'Kepala Tata Usaha', department: 'Administrasi', joinDate: '2018-07-15', status: 'active', profileImage: '', attendanceRate: 98, performanceScore: 92, lastLogin: '2023-06-15 08:30', address: 'Jl. Merdeka No. 45, Jakarta', education: 'S1 Administrasi Negara', certifications: ['Manajemen Administrasi', 'Kepemimpinan'], emergencyContact: { name: 'Siti Nurhaliza', relationship: 'Istri', phone: '081234567891' }, basicSalary: 10000000, bankAccount: '1234567890', bankName: 'Bank Central Asia' },
  { id: '2', name: 'Ratna Dewi', email: 'ratna.dewi@sekolah.sch.id', phone: '082345678901', position: 'Staff Keuangan', department: 'Keuangan', joinDate: '2019-03-10', status: 'active', profileImage: '', attendanceRate: 95, performanceScore: 88, lastLogin: '2023-06-15 09:15', address: 'Jl. Sudirman No. 23, Jakarta', education: 'S1 Akuntansi', certifications: ['Akuntansi Dasar', 'Software Akuntansi'], emergencyContact: { name: 'Budi Santoso', relationship: 'Suami', phone: '082345678902' }, basicSalary: 8000000, bankAccount: '2345678901', bankName: 'Bank Mandiri' },
];

const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', staffId: '1', date: '2023-06-15', checkIn: '07:45', checkOut: '16:15', totalHours: 8.5, status: 'hadir', location: 'Kantor Pusat' },
  { id: 'a2', staffId: '2', date: '2023-06-15', checkIn: '08:05', checkOut: '16:30', totalHours: 8.4, status: 'terlambat', location: 'Kantor Pusat' },
];

const leaveRequests: LeaveRequest[] = [
  { id: 'l1', staffId: '3', staffName: 'Budi Pratama', leaveType: 'tahunan', startDate: '2023-06-15', endDate: '2023-06-17', totalDays: 3, reason: 'Liburan keluarga ke luar kota', status: 'approved', approver: 'Ahmad Suryadi', approvalDate: '2023-06-10' },
];

const performanceReviews: PerformanceReview[] = [
  { id: 'p1', staffId: '1', period: 'Q2 2023', reviewerId: 'headmaster', reviewerName: 'Kepala Sekolah', score: 92, notes: 'Kinerja sangat memuaskan', status: 'approved', kpiScores: [{kpiId: 'k1', kpiName: 'Kepemimpinan', score: 95, weight: 30}], goals: [{id: 'g1', description: 'Meningkatkan efisiensi', dueDate: '2023-08-01', status: 'in-progress'}] },
];

const payrollRecords: PayrollRecord[] = [
  { id: 'pr1', staffId: '1', period: 'Juni 2023', basicSalary: 10000000, allowances: [{name: 'Tunjangan Jabatan', amount: 2500000}], deductions: [{name: 'BPJS Kesehatan', amount: 200000}], overtimePay: 500000, netSalary: 12500000, status: 'paid', paymentDate: '2023-06-25' },
];

const announcements: Announcement[] = [
  { id: 'an1', title: 'Pengumuman: Libur Hari Raya Idul Adha', content: 'Diberitahukan kepada seluruh staf dan guru bahwa sekolah akan libur pada tanggal 28-29 Juni 2023', targetAudience: 'all', author: 'Admin', timestamp: '2023-06-15 10:00', pinned: true },
];

// NEW STATIC DATA FOR STUDENT REGISTRATION
const initialStudentRegistrations: StudentRegistration[] = [
  {
    id: 'reg1',
    registrationNumber: 'REG-2023001',
    personalInfo: {
      name: 'Rizki Ahmad Pratama',
      email: 'rizki.ahmad@email.com',
      phone: '081234567801',
      placeOfBirth: 'Jakarta',
      dateOfBirth: '2008-05-15',
      gender: 'L',
      religion: 'Islam',
      nationality: 'Indonesia',
      address: 'Jl. Merdeka No. 15, Jakarta'
    },
    parentInfo: {
      father: {
        name: 'Ahmad Fauzi',
        phone: '081234567802',
        email: 'ahmad.fauzi@email.com',
        occupation: 'Pegawai Swasta',
        address: 'Jl. Merdeka No. 15, Jakarta'
      },
      mother: {
        name: 'Siti Nurhaliza',
        phone: '081234567803',
        email: 'siti.nurhaliza@email.com',
        occupation: 'Ibu Rumah Tangga',
        address: 'Jl. Merdeka No. 15, Jakarta'
      }
    },
    previousEducation: {
      schoolName: 'SMP Negeri 1 Jakarta',
      schoolLevel: 'SMP',
      address: 'Jl. Sudirman No. 100, Jakarta',
      graduationYear: '2023',
      nisn: '0051234567',
      reportCards: [
        {
          id: 'rc1',
          semester: 1,
          academicYear: '2020/2021',
          subjects: [
            { subjectName: 'Matematika', grade: 85, description: 'Baik' },
            { subjectName: 'Bahasa Indonesia', grade: 90, description: 'Sangat Baik' },
            { subjectName: 'IPA', grade: 88, description: 'Baik' },
            { subjectName: 'IPS', grade: 82, description: 'Baik' }
          ],
          rank: 5,
          totalStudents: 32,
          behavior: {
            discipline: 85,
            cleanliness: 90,
            politeness: 88,
            responsibility: 87
          },
          attendance: {
            total: 24,
            present: 22,
            sick: 1,
            permit: 1,
            absent: 0
          },
          notes: 'Siswa berprestasi dan aktif dalam kegiatan ekstrakurikuler',
          homeroomTeacher: 'Dra. Siti Aminah',
          principalSignature: 'Dr. Budi Santoso, M.Pd'
        },
        {
          id: 'rc2',
          semester: 2,
          academicYear: '2020/2021',
          subjects: [
            { subjectName: 'Matematika', grade: 87, description: 'Baik' },
            { subjectName: 'Bahasa Indonesia', grade: 92, description: 'Sangat Baik' },
            { subjectName: 'IPA', grade: 90, description: 'Sangat Baik' },
            { subjectName: 'IPS', grade: 85, description: 'Baik' }
          ],
          rank: 3,
          totalStudents: 32,
          behavior: {
            discipline: 88,
            cleanliness: 92,
            politeness: 90,
            responsibility: 89
          },
          attendance: {
            total: 24,
            present: 23,
            sick: 1,
            permit: 0,
            absent: 0
          },
          notes: 'Menunjukkan peningkatan yang signifikan',
          homeroomTeacher: 'Dra. Siti Aminah',
          principalSignature: 'Dr. Budi Santoso, M.Pd'
        }
      ]
    },
    talentsAndInterests: {
      talents: [
        {
          category: 'akademik',
          name: 'Matematika',
          level: 'lanjutan',
          description: 'Sangat tertarik dan berbakat dalam bidang matematika'
        },
        {
          category: 'olahraga',
          name: 'Bola Basket',
          level: 'menengah',
          description: 'Aktif dalam tim basket sekolah'
        }
      ],
      interests: [
        { category: 'akademik', name: 'Programming', priority: 5 },
        { category: 'olahraga', name: 'Basket', priority: 4 },
        { category: 'seni', name: 'Musik', priority: 3 }
      ]
    },
    documents: [
      { type: 'ijazah', url: '/docs/ijazah.pdf', fileName: 'ijazah_smp.pdf', fileSize: '2.5 MB' },
      { type: 'skhun', url: '/docs/skhun.pdf', fileName: 'skhun.pdf', fileSize: '1.2 MB' },
      { type: 'raport', url: '/docs/raport.pdf', fileName: 'raport_smp.pdf', fileSize: '5.8 MB' },
      { type: 'foto', url: '/images/foto.jpg', fileName: 'foto_3x4.jpg', fileSize: '500 KB' }
    ],
    registrationDate: '2023-06-01',
    status: 'processing',
    testScores: {
      academic: 85,
      psychological: 78,
      interview: 82,
      total: 82
    }
  },
  {
    id: 'reg2',
    registrationNumber: 'REG-2023002',
    personalInfo: {
      name: 'Siti Aisyah',
      email: 'siti.aisyah@email.com',
      phone: '081234567804',
      placeOfBirth: 'Bandung',
      dateOfBirth: '2008-08-22',
      gender: 'P',
      religion: 'Islam',
      nationality: 'Indonesia',
      address: 'Jl. Sudirman No. 25, Bandung'
    },
    parentInfo: {
      father: {
        name: 'Budi Santoso',
        phone: '081234567805',
        email: 'budi.santoso@email.com',
        occupation: 'Wiraswasta',
        address: 'Jl. Sudirman No. 25, Bandung'
      },
      mother: {
        name: 'Dewi Lestari',
        phone: '081234567806',
        email: 'dewi.lestari@email.com',
        occupation: 'Guru',
        address: 'Jl. Sudirman No. 25, Bandung'
      }
    },
    previousEducation: {
      schoolName: 'SMP Negeri 2 Bandung',
      schoolLevel: 'SMP',
      address: 'Jl. Gatot Subroto No. 50, Bandung',
      graduationYear: '2023',
      nisn: '0051234568',
      reportCards: [
        {
          id: 'rc3',
          semester: 1,
          academicYear: '2020/2021',
          subjects: [
            { subjectName: 'Matematika', grade: 92, description: 'Sangat Baik' },
            { subjectName: 'Bahasa Indonesia', grade: 95, description: 'Sangat Baik' },
            { subjectName: 'IPA', grade: 90, description: 'Sangat Baik' },
            { subjectName: 'IPS', grade: 88, description: 'Baik' }
          ],
          rank: 2,
          totalStudents: 30,
          behavior: {
            discipline: 92,
            cleanliness: 95,
            politeness: 93,
            responsibility: 94
          },
          attendance: {
            total: 24,
            present: 24,
            sick: 0,
            permit: 0,
            absent: 0
          },
          notes: 'Siswa berprestasi dengan nilai konsisten tinggi',
          homeroomTeacher: 'Dra. Rina Wulandari',
          principalSignature: 'Dr. Ahmad Wijaya, M.Pd'
        }
      ]
    },
    talentsAndInterests: {
      talents: [
        {
          category: 'akademik',
          name: 'Bahasa',
          level: 'expert',
          description: 'Sangat berbakat dalam bidang bahasa dan sastra'
        },
        {
          category: 'seni',
          name: 'Menari',
          level: 'lanjutan',
          description: 'Juara 1 tingkat provinsi dalam kompetisi tari tradisional'
        }
      ],
      interests: [
        { category: 'akademik', name: 'Literature', priority: 5 },
        { category: 'seni', name: 'Dance', priority: 5 },
        { category: 'sosial', name: 'Volunteer', priority: 4 }
      ]
    },
    documents: [
      { type: 'ijazah', url: '/docs/ijazah2.pdf', fileName: 'ijazah_smp2.pdf', fileSize: '2.3 MB' },
      { type: 'skhun', url: '/docs/skhun2.pdf', fileName: 'skhun2.pdf', fileSize: '1.1 MB' },
      { type: 'raport', url: '/docs/raport2.pdf', fileName: 'raport_smp2.pdf', fileSize: '6.2 MB' },
      { type: 'foto', url: '/images/foto2.jpg', fileName: 'foto_3x4_2.jpg', fileSize: '480 KB' }
    ],
    registrationDate: '2023-06-02',
    status: 'accepted',
    testScores: {
      academic: 92,
      psychological: 85,
      interview: 90,
      total: 89
    }
  }
];

const initialStudents: Student[] = [
  { 
    id: 's1', 
    nis: '2023001', 
    name: 'Andi Pratama', 
    email: 'andi.pratama@sekolah.sch.id', 
    phone: '081234567801', 
    address: 'Jl. Merdeka No. 10, Jakarta', 
    dateOfBirth: '2005-05-15', 
    placeOfBirth: 'Jakarta', 
    gender: 'L', 
    religion: 'Islam', 
    nationality: 'Indonesia', 
    photo: '', 
    classId: 'c1', 
    className: 'X IPA 1', 
    enrollmentDate: '2022-07-15', 
    status: 'active', 
    parentIds: ['p1', 'p2'], 
    emergencyContact: { name: 'Budi Santoso', relationship: 'Ayah', phone: '081234567802' }, 
    medicalInfo: { bloodType: 'A', allergies: ['Seafood'], conditions: ['Asma ringan'] }, 
    attendanceRate: 95, 
    averageGrade: 85, 
    achievements: [
      { id: 'a1', title: 'Juara 2 Olimpiade Matematika', date: '2023-03-15', level: 'Kota' },
      { id: 'a2', title: 'Best Speaker English Debate', date: '2023-04-20', level: 'Provinsi' }
    ],
    talents: [
      {
        id: 't1',
        category: 'akademik',
        name: 'Matematika',
        level: 'lanjutan',
        description: 'Sangat tertarik dan berbakat dalam bidang matematika',
        achievements: ['Juara 2 Olimpiade Matematika Tingkat Kota']
      },
      {
        id: 't2',
        category: 'non-akademik',
        name: 'Debat Bahasa Inggris',
        level: 'lanjutan',
        description: 'Aktif dalam klub debat dan telah memenangkan beberapa kompetisi',
        achievements: ['Best Speaker English Debate Tingkat Provinsi']
      }
    ],
    interests: [
      { id: 'i1', category: 'akademik', name: 'Programming', priority: 5 },
      { id: 'i2', category: 'olahraga', name: 'Basket', priority: 3 },
      { id: 'i3', category: 'sosial', name: 'Leadership', priority: 4 }
    ],
    previousSchools: [
      {
        id: 'ps1',
        name: 'SMP Negeri 1 Jakarta',
        level: 'SMP',
        address: 'Jl. Sudirman No. 100, Jakarta',
        startYear: '2019',
        endYear: '2022',
        graduationDate: '2022-06-15',
        nisn: '0051234567',
        reportCards: [
          {
            id: 'rc1',
            semester: 1,
            academicYear: '2019/2020',
            subjects: [
              { subjectName: 'Matematika', grade: 85, description: 'Baik' },
              { subjectName: 'Bahasa Indonesia', grade: 90, description: 'Sangat Baik' },
              { subjectName: 'IPA', grade: 88, description: 'Baik' },
              { subjectName: 'IPS', grade: 82, description: 'Baik' }
            ],
            rank: 5,
            totalStudents: 32,
            behavior: {
              discipline: 85,
              cleanliness: 90,
              politeness: 88,
              responsibility: 87
            },
            attendance: {
              total: 24,
              present: 22,
              sick: 1,
              permit: 1,
              absent: 0
            },
            notes: 'Siswa berprestasi dan aktif dalam kegiatan ekstrakurikuler',
            homeroomTeacher: 'Dra. Siti Aminah',
            principalSignature: 'Dr. Budi Santoso, M.Pd'
          },
          {
            id: 'rc2',
            semester: 2,
            academicYear: '2019/2020',
            subjects: [
              { subjectName: 'Matematika', grade: 87, description: 'Baik' },
              { subjectName: 'Bahasa Indonesia', grade: 92, description: 'Sangat Baik' },
              { subjectName: 'IPA', grade: 90, description: 'Sangat Baik' },
              { subjectName: 'IPS', grade: 85, description: 'Baik' }
            ],
            rank: 3,
            totalStudents: 32,
            behavior: {
              discipline: 88,
              cleanliness: 92,
              politeness: 90,
              responsibility: 89
            },
            attendance: {
              total: 24,
              present: 23,
              sick: 1,
              permit: 0,
              absent: 0
            },
            notes: 'Menunjukkan peningkatan yang signifikan',
            homeroomTeacher: 'Dra. Siti Aminah',
            principalSignature: 'Dr. Budi Santoso, M.Pd'
          }
        ]
      }
    ],
    documents: [
      {
        id: 'd1',
        name: 'Ijazah SMP',
        type: 'ijazah',
        url: '/docs/ijazah_smp.pdf',
        uploadDate: '2022-07-01',
        fileSize: '2.5 MB',
        status: 'verified'
      },
      {
        id: 'd2',
        name: 'SKHUN',
        type: 'skhun',
        url: '/docs/skhun.pdf',
        uploadDate: '2022-07-01',
        fileSize: '1.2 MB',
        status: 'verified'
      },
      {
        id: 'd3',
        name: 'Raport SMP',
        type: 'raport',
        url: '/docs/raport_smp.pdf',
        uploadDate: '2022-07-01',
        fileSize: '5.8 MB',
        status: 'verified'
      }
    ]
  }
];

const initialParents: Parent[] = [
  { id: 'p1', name: 'Budi Santoso', email: 'budi.santoso@gmail.com', phone: '081234567811', address: 'Jl. Merdeka No. 10, Jakarta', occupation: 'Pengusaha', relationship: 'ayah', studentIds: ['s1'], photo: '', username: 'budi.santoso', lastLogin: '2023-06-14 19:30' },
  { id: 'p2', name: 'Dewi Lestari', email: 'dewi.lestari@gmail.com', phone: '081234567812', address: 'Jl. Merdeka No. 10, Jakarta', occupation: 'Ibu Rumah Tangga', relationship: 'ibu', studentIds: ['s1'], photo: '', username: 'dewi.lestari', lastLogin: '2023-06-15 08:15' },
];

const initialClasses: Class[] = [
  { 
    id: 'c1', 
    name: 'X IPA 1', 
    level: 'X', 
    major: 'IPA', 
    room: 'Lab IPA 1', 
    capacity: 36, 
    currentStudents: 32, 
    homeroomTeacherId: 't1', 
    homeroomTeacherName: 'Dr. Ahmad Wijaya', 
    academicYear: '2022/2023', 
    schedule: [] 
  }
];

const initialSubjects: Subject[] = [
  { id: 'sub1', code: 'MAT001', name: 'Matematika', description: 'Matematika Dasar', credits: 4, department: 'MIPA', color: '#3B82F6', teacherIds: ['t2'] },
  { id: 'sub2', code: 'FIS001', name: 'Fisika', description: 'Fisika Dasar', credits: 4, department: 'MIPA', color: '#EF4444', teacherIds: ['t3'] },
  { id: 'sub3', code: 'BIN001', name: 'Bahasa Indonesia', description: 'Bahasa Indonesia', credits: 4, department: 'Bahasa', color: '#10B981', teacherIds: ['t4'] },
  { id: 'sub4', code: 'BIO001', name: 'Biologi', description: 'Biologi Dasar', credits: 4, department: 'MIPA', color: '#8B5CF6', teacherIds: ['t5'] },
  { id: 'sub5', code: 'KIM001', name: 'Kimia', description: 'Kimia Dasar', credits: 4, department: 'MIPA', color: '#F59E0B', teacherIds: ['t6'] },
  { id: 'sub6', code: 'BING001', name: 'Bahasa Inggris', description: 'Bahasa Inggris', credits: 4, department: 'Bahasa', color: '#6366F1', teacherIds: ['t7'] },
  { id: 'sub7', code: 'EKO001', name: 'Ekonomi', description: 'Ekonomi Dasar', credits: 4, department: 'IPS', color: '#F97316', teacherIds: ['t8'] },
  { id: 'sub8', code: 'GEO001', name: 'Geografi', description: 'Geografi Dasar', credits: 4, department: 'IPS', color: '#0EA5E9', teacherIds: ['t9'] },
];

const initialTeachers: Teacher[] = [
  { 
    id: 't1', 
    nip: '198506152010011001', 
    name: 'Dr. Ahmad Wijaya', 
    email: 'ahmad.wijaya@sekolah.sch.id', 
    phone: '081234567820', 
    address: 'Jl. Merdeka No. 100, Jakarta', 
    dateOfBirth: '1985-06-15', 
    placeOfBirth: 'Jakarta', 
    gender: 'L', 
    religion: 'Islam', 
    photo: '', 
    position: 'Kepala Lab IPA', 
    department: 'MIPA', 
    joinDate: '2010-01-15', 
    status: 'active', 
    education: 'S3 Pendidikan IPA', 
    certifications: ['Guru Profesional', 'Kepala Laboratorium'], 
    subjectIds: ['sub1', 'sub14'], 
    classIds: ['c1', 'c3'], 
    schedule: [], 
    attendanceRate: 98, 
    performanceScore: 95, 
    lastLogin: '2023-06-15 07:30', 
    emergencyContact: { name: 'Siti Nurhaliza', relationship: 'Istri', phone: '081234567821' }, 
    basicSalary: 12000000, 
    bankAccount: '1234567890', 
    bankName: 'Bank Central Asia' 
  },
  { 
    id: 't2', 
    nip: '198708222010012002', 
    name: 'Siti Rahayu, S.Pd', 
    email: 'siti.rahayu@sekolah.sch.id', 
    phone: '081234567822', 
    address: 'Jl. Sudirman No. 200, Jakarta', 
    dateOfBirth: '1987-08-22', 
    placeOfBirth: 'Bandung', 
    gender: 'P', 
    religion: 'Islam', 
    photo: '', 
    position: 'Guru Matematika', 
    department: 'MIPA', 
    joinDate: '2010-07-01', 
    status: 'active', 
    education: 'S2 Pendidikan Matematika', 
    certifications: ['Guru Profesional'], 
    subjectIds: ['sub1'], 
    classIds: ['c1'], 
    schedule: [], 
    attendanceRate: 96, 
    performanceScore: 92, 
    lastLogin: '2023-06-15 07:45', 
    emergencyContact: { name: 'Ahmad Fauzi', relationship: 'Suami', phone: '081234567823' }, 
    basicSalary: 10000000, 
    bankAccount: '2345678901', 
    bankName: 'Bank Mandiri' 
  }
];

// Menu items (diperbarui untuk mencerminkan sub-menu)
const menuItems = [
  { id: '1', name: 'Dashboard', icon: <FiHome />, active: true },
  { id: '2', name: 'Pendaftaran', icon: <FiAdmission />, active: false, subItems: [
    { id: '2.1', name: 'Pendaftaran Baru', icon: <FiUserPlus />, active: false },
    { id: '2.2', name: 'Data Pendaftar', icon: <FiUsers />, active: false },
    { id: '2.3', name: 'Seleksi', icon: <FiCheckSquare />, active: false },
  ]},
  { id: '3', name: 'Akademik', icon: <FiBookOpen />, active: false, subItems: [
    { id: '3.1', name: 'Data Siswa', icon: <FiUserIcon />, active: false },
    { id: '3.2', name: 'Data Guru', icon: <FiUsers />, active: false },
    { id: '3.3', name: 'Data Wali Murid', icon: <FiUserPlus />, active: false },
    { id: '3.4', name: 'Data Kelas', icon: <FiGrid />, active: false },
    { id: '3.5', name: 'Mata Pelajaran', icon: <FiBook />, active: false },
  ]},
  { id: '4', name: 'Minat & Bakat', icon: <FiTalentZap />, active: false, subItems: [
    { id: '4.1', name: 'Data Minat Bakat', icon: <FiHeart />, active: false },
    { id: '4.2', name: 'Pengembangan', icon: <FiTrendingUpIcon />, active: false },
    { id: '4.3', name: 'Prestasi', icon: <FiTrophy />, active: false },
  ]},
  { id: '5', name: 'Raport & Nilai', icon: <FiFileText />, active: false, subItems: [
    { id: '5.1', name: 'Raport Sekolah', icon: <FiFileText />, active: false },
    { id: '5.2', name: 'Raport Sebelumnya', icon: <FiLayers />, active: false },
    { id: '5.3', name: 'Input Nilai', icon: <FiEdit />, active: false },
  ]},
  { id: '6', name: 'Berkas Siswa', icon: <FiFolder />, active: false, subItems: [
    { id: '6.1', name: 'Dokumen', icon: <FiFile />, active: false },
    { id: '6.2', name: 'Upload Berkas', icon: <FiUpload />, active: false },
    { id: '6.3', name: 'Verifikasi', icon: <FiCheckCircle />, active: false },
  ]},
  { id: '7', name: 'Staf', icon: <FiUsers />, active: false, subItems: [
    { id: '7.1', name: 'Data Staf', icon: <FiUsers />, active: false },
    { id: '7.2', name: 'Kehadiran Staf', icon: <FiCheckCircle />, active: false },
    { id: '7.3', name: 'Penggajian', icon: <FiDollarSign />, active: false },
  ]},
  { id: '8', name: 'Komunikasi', icon: <FiMessageSquare />, active: false, subItems: [
    { id: '8.1', name: 'Pengumuman', icon: <FiBell />, active: false },
    { id: '8.2', name: 'Pesan', icon: <FiMail />, active: false },
  ]},
];

// --- HELPER FUNCTIONS ---

// Fungsi untuk mendapatkan nama siswa dari ID
const getStudentName = (studentId: string, studentList: Student[]) => {
  const student = studentList.find(s => s.id === studentId);
  return student ? student.name : 'Tidak Diketahui';
};

// Fungsi untuk mendapatkan nama guru dari ID
const getTeacherName = (teacherId: string, teacherList: Teacher[]) => {
  const teacher = teacherList.find(t => t.id === teacherId);
  return teacher ? teacher.name : 'Tidak Diketahui';
};

// Fungsi untuk mendapatkan nama wali murid dari ID
const getParentName = (parentId: string, parentList: Parent[]) => {
  const parent = parentList.find(p => p.id === parentId);
  return parent ? parent.name : 'Tidak Diketahui';
};

// Fungsi untuk mendapatkan nama kelas dari ID
const getClassName = (classId: string, classList: Class[]) => {
  const classItem = classList.find(c => c.id === classId);
  return classItem ? classItem.name : 'Tidak Diketahui';
};

// Fungsi untuk mendapatkan nama mata pelajaran dari ID
const getSubjectName = (subjectId: string, subjectList: Subject[]) => {
  const subject = subjectList.find(s => s.id === subjectId);
  return subject ? subject.name : 'Tidak Diketahui';
};

// Fungsi pembantu untuk badge
const getStatusBadge = (status: string) => {
  const statusConfig: { [key: string]: { text: string; class: string } } = {
    active: { text: 'Aktif', class: 'bg-green-100 text-green-800' },
    inactive: { text: 'Tidak Aktif', class: 'bg-gray-100 text-gray-800' },
    'on-leave': { text: 'Cuti', class: 'bg-yellow-100 text-yellow-800' },
    pending: { text: 'Menunggu', class: 'bg-yellow-100 text-yellow-800' },
    processing: { text: 'Diproses', class: 'bg-blue-100 text-blue-800' },
    approved: { text: 'Disetujui', class: 'bg-green-100 text-green-800' },
    accepted: { text: 'Diterima', class: 'bg-green-100 text-green-800' },
    rejected: { text: 'Ditolak', class: 'bg-red-100 text-red-800' },
    paid: { text: 'Dibayar', class: 'bg-green-100 text-green-800' },
    confirmed: { text: 'Dikonfirmasi', class: 'bg-blue-100 text-blue-800' },
    draft: { text: 'Draft', class: 'bg-gray-100 text-gray-800' },
    graduated: { text: 'Lulus', class: 'bg-blue-100 text-blue-800' },
    transferred: { text: 'Pindah', class: 'bg-purple-100 text-purple-800' },
    registration: { text: 'Pendaftaran', class: 'bg-orange-100 text-orange-800' },
    verified: { text: 'Terverifikasi', class: 'bg-green-100 text-green-800' },
    hadir: { text: 'Hadir', class: 'bg-green-100 text-green-800' },
    sakit: { text: 'Sakit', class: 'bg-yellow-100 text-yellow-800' },
    izin: { text: 'Izin', class: 'bg-blue-100 text-blue-800' },
    'tanpa-keterangan': { text: 'Tanpa Keterangan', class: 'bg-red-100 text-red-800' },
    scheduled: { text: 'Terjadwal', class: 'bg-blue-100 text-blue-800' },
    ongoing: { text: 'Berlangsung', class: 'bg-yellow-100 text-yellow-800' },
    completed: { text: 'Selesai', class: 'bg-green-100 text-green-800' },
    cancelled: { text: 'Dibatalkan', class: 'bg-red-100 text-red-800' },
    graded: { text: 'Sudah Dinilai', class: 'bg-green-100 text-green-800' },
    ungraded: { text: 'Belum Dinilai', class: 'bg-gray-100 text-gray-800' },
    pemula: { text: 'Pemula', class: 'bg-gray-100 text-gray-800' },
    menengah: { text: 'Menengah', class: 'bg-blue-100 text-blue-800' },
    lanjutan: { text: 'Lanjutan', class: 'bg-purple-100 text-purple-800' },
    expert: { text: 'Expert', class: 'bg-red-100 text-red-800' },
  };
  const config = statusConfig[status] || { text: status, class: 'bg-gray-100 text-gray-800' };
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.class}`}>{config.text}</span>;
};

// Fungsi untuk mendapatkan ikon kategori minat bakat
const getTalentCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    akademik: <FiBook />,
    'non-akademik': <FiAward />,
    olahraga: <FiActivity />,
    seni: <FiMusic />,
    teknologi: <FiCode />,
    sosial: <FiUsers />,
  };
  return iconMap[category] || <FiStar />;
};

// Fungsi untuk mendapatkan warna kategori minat bakat
const getTalentCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    akademik: 'bg-blue-100 text-blue-800',
    'non-akademik': 'bg-green-100 text-green-800',
    olahraga: 'bg-orange-100 text-orange-800',
    seni: 'bg-purple-100 text-purple-800',
    teknologi: 'bg-indigo-100 text-indigo-800',
    sosial: 'bg-pink-100 text-pink-800',
  };
  return colorMap[category] || 'bg-gray-100 text-gray-800';
};

// --- MAIN COMPONENT ---

const SchoolManagementPage: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [activeSubView, setActiveSubView] = useState<string>('');
  const [expandedMenuItems, setExpandedMenuItems] = useState<string[]>(['2', '3', '4', '5', '6', '7', '8']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Data States
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffMembers);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(attendanceRecords);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(leaveRequests);
  const [reviews, setReviews] = useState<PerformanceReview[]>(performanceReviews);
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(payrollRecords);
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>(announcements);
  
  // New Data States
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [studentRegistrations, setStudentRegistrations] = useState<StudentRegistration[]>(initialStudentRegistrations);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  // Form Data State
  const [formData, setFormData] = useState<any>({});

  // --- HANDLER FUNCTIONS ---
  const handleMenuClick = (itemId: string) => {
    setActiveSubView(''); 
    
    const viewMap: { [key: string]: { view: string; subView?: string } } = {
      '1': { view: 'dashboard' },
      '2.1': { view: 'registration', subView: 'new' },
      '2.2': { view: 'registration', subView: 'data' },
      '2.3': { view: 'registration', subView: 'selection' },
      '3.1': { view: 'academic', subView: 'students' },
      '3.2': { view: 'academic', subView: 'teachers' },
      '3.3': { view: 'academic', subView: 'parents' },
      '3.4': { view: 'academic', subView: 'classes' },
      '3.5': { view: 'academic', subView: 'subjects' },
      '4.1': { view: 'talents', subView: 'data' },
      '4.2': { view: 'talents', subView: 'development' },
      '4.3': { view: 'talents', subView: 'achievements' },
      '5.1': { view: 'reports', subView: 'current' },
      '5.2': { view: 'reports', subView: 'previous' },
      '5.3': { view: 'reports', subView: 'input' },
      '6.1': { view: 'documents', subView: 'list' },
      '6.2': { view: 'documents', subView: 'upload' },
      '6.3': { view: 'documents', subView: 'verification' },
      '7.1': { view: 'staff' },
      '7.2': { view: 'staff', subView: 'attendance' },
      '7.3': { view: 'staff', subView: 'payroll' },
      '8.1': { view: 'communication', subView: 'announcement' },
      '8.2': { view: 'communication', subView: 'message' },
    };

    const targetView = viewMap[itemId];
    if (targetView) {
      setActiveView(targetView.view);
      if (targetView.subView) {
        setActiveSubView(targetView.subView);
      }
    }
  };

  const toggleMenuItem = (itemId: string) => {
    setExpandedMenuItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };
  
  // --- RENDER LOGIC ---

  // 1. Render Sidebar
  const renderSidebar = () => (
    <div className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Sistem Manajemen Sekolah</h1>
        <p className="text-xs text-gray-500">Portal Administrasi</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Cari menu..." 
            className="w-full pl-8 pr-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button 
                onClick={() => handleMenuClick(item.id)} 
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeView === 'dashboard' && item.id === '1' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.subItems && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleMenuItem(item.id); }} 
                    className="p-1"
                  >
                    {expandedMenuItems.includes(item.id) ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                )}
              </button>
              {item.subItems && expandedMenuItems.includes(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button 
                      key={subItem.id} 
                      onClick={() => handleMenuClick(subItem.id)} 
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                        (activeView === 'registration' && subItem.id === '2.1' && activeSubView === 'new') ||
                        (activeView === 'registration' && subItem.id === '2.2' && activeSubView === 'data') ||
                        (activeView === 'registration' && subItem.id === '2.3' && activeSubView === 'selection') ||
                        (activeView === 'academic' && subItem.id === '3.1' && activeSubView === 'students') ||
                        (activeView === 'talents' && subItem.id === '4.1' && activeSubView === 'data') ||
                        (activeView === 'reports' && subItem.id === '5.2' && activeSubView === 'previous') ||
                        (activeView === 'documents' && subItem.id === '6.1' && activeSubView === 'list')
                          ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-3">{subItem.icon}</span>
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">A</div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-500">admin@sekolah.sch.id</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
            <FiSettings className="mr-2" /> Pengaturan
          </button>
          <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
            <FiLogOut className="mr-2" /> Keluar
          </button>
        </div>
      </div>
    </div>
  );

  // 2. Render Main Content Area
  const renderMainContent = () => {
    const header = (
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'registration' && (
                activeSubView === 'new' ? 'Pendaftaran Siswa Baru' :
                activeSubView === 'data' ? 'Data Pendaftar' :
                activeSubView === 'selection' ? 'Proses Seleksi' : 'Manajemen Pendaftaran'
              )}
              {activeView === 'academic' && (
                activeSubView === 'students' ? 'Data Siswa' :
                activeSubView === 'teachers' ? 'Data Guru' :
                activeSubView === 'parents' ? 'Data Wali Murid' :
                activeSubView === 'classes' ? 'Data Kelas' :
                activeSubView === 'subjects' ? 'Mata Pelajaran' : 'Manajemen Akademik'
              )}
              {activeView === 'talents' && (
                activeSubView === 'data' ? 'Data Minat & Bakat' :
                activeSubView === 'development' ? 'Pengembangan Minat Bakat' :
                activeSubView === 'achievements' ? 'Prestasi Siswa' : 'Manajemen Minat Bakat'
              )}
              {activeView === 'reports' && (
                activeSubView === 'current' ? 'Raport Sekolah' :
                activeSubView === 'previous' ? 'Raport Sekolah Sebelumnya' :
                activeSubView === 'input' ? 'Input Nilai' : 'Manajemen Raport'
              )}
              {activeView === 'documents' && (
                activeSubView === 'list' ? 'Dokumen Siswa' :
                activeSubView === 'upload' ? 'Upload Berkas' :
                activeSubView === 'verification' ? 'Verifikasi Berkas' : 'Manajemen Dokumen'
              )}
              {activeView === 'staff' && (
                activeSubView === 'attendance' ? 'Kehadiran Staf' :
                activeSubView === 'payroll' ? 'Penggajian Staf' : 'Manajemen Staf'
              )}
              {activeView === 'communication' && (
                activeSubView === 'announcement' ? 'Pengumuman' :
                activeSubView === 'message' ? 'Pesan' : 'Komunikasi'
              )}
            </h2>
            <p className="text-sm text-gray-500">Kelola informasi dengan efisien dan terintegrasi.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <FiHelpCircle />
            </button>
          </div>
        </div>
      </header>
    );

    const content = () => {
      if (activeView === 'dashboard') {
        return <DashboardView 
          students={students} 
          teachers={teachers} 
          classes={classes} 
          staffList={staffList} 
          leaves={leaves} 
          payrolls={payrolls}
          studentRegistrations={studentRegistrations}
        />;
      }
      if (activeView === 'registration') {
        return <RegistrationView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          studentRegistrations={studentRegistrations}
        />;
      }
      if (activeView === 'academic') {
        return <AcademicView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          students={students} 
          teachers={teachers} 
          parents={parents} 
          classes={classes} 
          subjects={subjects}
        />;
      }
      if (activeView === 'talents') {
        return <TalentsView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          students={students}
        />;
      }
      if (activeView === 'reports') {
        return <ReportsView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          students={students}
          subjects={subjects}
        />;
      }
      if (activeView === 'documents') {
        return <DocumentsView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          students={students}
        />;
      }
      if (activeView === 'staff') {
        return <StaffView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          staffList={staffList} 
          attendance={attendance} 
          leaves={leaves} 
          payrolls={payrolls}
        />;
      }
      if (activeView === 'communication') {
        return <CommunicationView 
          activeSubView={activeSubView} 
          setActiveSubView={setActiveSubView} 
          announcements={announcementsList}
        />;
      }
      return <div>Pilih menu dari sidebar untuk memulai.</div>;
    };

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {header}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {content()}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {renderSidebar()}
      {renderMainContent()}
    </div>
  );
};

// --- SUB-VIEW COMPONENTS ---

// Dashboard View
const DashboardView: React.FC<{ 
  students: Student[], 
  teachers: Teacher[], 
  classes: Class[], 
  staffList: StaffMember[], 
  leaves: LeaveRequest[], 
  payrolls: PayrollRecord[],
  studentRegistrations: StudentRegistration[]
}> = ({ students, teachers, classes, staffList, leaves, payrolls, studentRegistrations }) => {
  const quickStats = [
    { id: '1', title: 'Total Siswa', value: students.length, change: '+12', icon: <FiUserIcon />, color: 'bg-blue-500' },
    { id: '2', title: 'Pendaftaran Baru', value: studentRegistrations.filter(r => r.status === 'pending').length, change: '+5', icon: <FiAdmission />, color: 'bg-green-500' },
    { id: '3', title: 'Total Guru', value: teachers.length, change: '+2', icon: <FiUsers />, color: 'bg-purple-500' },
    { id: '4', title: 'Dokumen Pending', value: students.reduce((acc, s) => acc + s.documents.filter(d => d.status === 'pending').length, 0), change: '+3', icon: <FiFolder />, color: 'bg-yellow-500' },
  ];
  
  const recentActivities = [
    { id: '1', action: 'Rizki Ahmad Pratama mendaftar sebagai siswa baru', user: 'Sistem', timestamp: '2 jam yang lalu', icon: <FiUserPlus /> },
    { id: '2', action: 'Siti Aisyah diterima sebagai siswa baru', user: 'Admin', timestamp: '1 hari yang lalu', icon: <FiCheckCircle /> },
    { id: '3', action: 'Dokumen raport SMP dari Andi Pratama telah diverifikasi', user: 'Admin', timestamp: '3 hari yang lalu', icon: <FiFileText /> },
  ];

  const topTalents = students.flatMap(s => s.talents)
    .reduce((acc, talent) => {
      const existing = acc.find(item => item.name === talent.name);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ name: talent.name, count: 1, category: talent.category });
      }
      return acc;
    }, [] as { name: string; count: number; category: string }[])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map(stat => (
          <div key={stat.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-20 text-white`}>{stat.icon}</div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terkini</h3>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Minat & Bakat</h3>
          <div className="space-y-3">
            {topTalents.map((talent, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${getTalentCategoryColor(talent.category)}`}>
                    {getTalentCategoryIcon(talent.category)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{talent.name}</p>
                    <p className="text-xs text-gray-500">{talent.count} siswa</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Pendaftaran</h3>
          <div className="space-y-3">
            {['pending', 'processing', 'accepted', 'rejected'].map(status => {
              const count = studentRegistrations.filter(r => r.status === status).length;
              const percentage = studentRegistrations.length > 0 ? (count / studentRegistrations.length) * 100 : 0;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusBadge(status)}
                    <span className="ml-2 text-sm font-medium text-gray-700">{count} pendaftar</span>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        status === 'pending' ? 'bg-yellow-500' : 
                        status === 'processing' ? 'bg-blue-500' : 
                        status === 'accepted' ? 'bg-green-500' : 'bg-red-500'
                      }`} 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Dokumen</h3>
          <div className="space-y-3">
            {['verified', 'pending', 'rejected'].map(status => {
              const count = students.reduce((acc, s) => acc + s.documents.filter(d => d.status === status).length, 0);
              const total = students.reduce((acc, s) => acc + s.documents.length, 0);
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getStatusBadge(status)}
                    <span className="ml-2 text-sm font-medium text-gray-700">{count} dokumen</span>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        status === 'verified' ? 'bg-green-500' : 
                        status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Registration View
const RegistrationView: React.FC<{ 
  activeSubView: string, 
  setActiveSubView: React.Dispatch<React.SetStateAction<string>>,
  studentRegistrations: StudentRegistration[]
}> = ({ activeSubView, setActiveSubView, studentRegistrations }) => {
  const subViewTabs = [
    { id: 'new', name: 'Pendaftaran Baru', icon: <FiUserPlus /> },
    { id: 'data', name: 'Data Pendaftar', icon: <FiUsers /> },
    { id: 'selection', name: 'Proses Seleksi', icon: <FiCheckSquare /> },
  ];

  const renderSubView = () => {
    switch (activeSubView) {
      case 'new':
        return <NewRegistrationView />;
      case 'data':
        return <RegistrationDataView studentRegistrations={studentRegistrations} />;
      case 'selection':
        return <SelectionProcessView studentRegistrations={studentRegistrations} />;
      default:
        return <NewRegistrationView />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {subViewTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSubView === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          {renderSubView()}
        </div>
      </div>
    </div>
  );
};

// New Registration View
const NewRegistrationView: React.FC = () => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      placeOfBirth: '',
      dateOfBirth: '',
      gender: 'L',
      religion: '',
      nationality: '',
      address: ''
    },
    parentInfo: {
      father: {
        name: '',
        phone: '',
        email: '',
        occupation: '',
        address: ''
      },
      mother: {
        name: '',
        phone: '',
        email: '',
        occupation: '',
        address: ''
      }
    },
    previousEducation: {
      schoolName: '',
      schoolLevel: 'SMP',
      address: '',
      graduationYear: '',
      nisn: ''
    },
    talentsAndInterests: {
      talents: [],
      interests: []
    },
    documents: []
  });

  const steps = [
    { id: 1, title: 'Data Pribadi', icon: <FiUser /> },
    { id: 2, title: 'Data Orang Tua', icon: <FiUsers /> },
    { id: 3, title: 'Pendidikan Sebelumnya', icon: <FiBookOpen /> },
    { id: 4, title: 'Minat & Bakat', icon: <FiTalentZap /> },
    { id: 5, title: 'Upload Dokumen', icon: <FiUpload /> },
    { id: 6, title: 'Konfirmasi', icon: <FiCheckCircle /> }
  ];

  const nextStep = () => {
    if (registrationStep < steps.length) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (registrationStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Data Pribadi Calon Siswa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, name: e.target.value }
                  })}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, email: e.target.value }
                  })}
                  placeholder="Masukkan email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, phone: e.target.value }
                  })}
                  placeholder="Masukkan no. telepon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.placeOfBirth}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, placeOfBirth: e.target.value }
                  })}
                  placeholder="Masukkan tempat lahir"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, gender: e.target.value as 'L' | 'P' }
                  })}
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.religion}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, religion: e.target.value }
                  })}
                  placeholder="Masukkan agama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kewarganegaraan</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.personalInfo.nationality}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, nationality: e.target.value }
                  })}
                  placeholder="Masukkan kewarganegaraan"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.personalInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, address: e.target.value }
                  })}
                  placeholder="Masukkan alamat lengkap"
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Data Orang Tua</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Data Ayah</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.father.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          father: { ...formData.parentInfo.father, name: e.target.value }
                        }
                      })}
                      placeholder="Masukkan nama ayah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.father.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          father: { ...formData.parentInfo.father, phone: e.target.value }
                        }
                      })}
                      placeholder="Masukkan no. telepon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.father.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          father: { ...formData.parentInfo.father, email: e.target.value }
                        }
                      })}
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.father.occupation}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          father: { ...formData.parentInfo.father, occupation: e.target.value }
                        }
                      })}
                      placeholder="Masukkan pekerjaan"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Data Ibu</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.mother.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          mother: { ...formData.parentInfo.mother, name: e.target.value }
                        }
                      })}
                      placeholder="Masukkan nama ibu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.mother.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          mother: { ...formData.parentInfo.mother, phone: e.target.value }
                        }
                      })}
                      placeholder="Masukkan no. telepon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.mother.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          mother: { ...formData.parentInfo.mother, email: e.target.value }
                        }
                      })}
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.parentInfo.mother.occupation}
                      onChange={(e) => setFormData({
                        ...formData,
                        parentInfo: {
                          ...formData.parentInfo,
                          mother: { ...formData.parentInfo.mother, occupation: e.target.value }
                        }
                      })}
                      placeholder="Masukkan pekerjaan"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Pendidikan Sebelumnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.previousEducation.schoolName}
                  onChange={(e) => setFormData({
                    ...formData,
                    previousEducation: { ...formData.previousEducation, schoolName: e.target.value }
                  })}
                  placeholder="Masukkan nama sekolah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.previousEducation.schoolLevel}
                  onChange={(e) => setFormData({
                    ...formData,
                    previousEducation: { ...formData.previousEducation, schoolLevel: e.target.value as any }
                  })}
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                  <option value="SMK">SMK</option>
                  <option value="MA">MA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Sekolah</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.previousEducation.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    previousEducation: { ...formData.previousEducation, address: e.target.value }
                  })}
                  placeholder="Masukkan alamat sekolah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.previousEducation.graduationYear}
                  onChange={(e) => setFormData({
                    ...formData,
                    previousEducation: { ...formData.previousEducation, graduationYear: e.target.value }
                  })}
                  placeholder="Masukkan tahun lulus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NISN</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.previousEducation.nisn}
                  onChange={(e) => setFormData({
                    ...formData,
                    previousEducation: { ...formData.previousEducation, nisn: e.target.value }
                  })}
                  placeholder="Masukkan NISN"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-3">Upload Raport (Opsional)</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Klik untuk upload atau drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Pilih File
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Minat & Bakat</h3>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Bakat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: 'akademik', name: 'Matematika', icon: <FiBook /> },
                  { category: 'akademik', name: 'Sains', icon: <FiBook /> },
                  { category: 'olahraga', name: 'Sepak Bola', icon: <FiActivity /> },
                  { category: 'olahraga', name: 'Basket', icon: <FiActivity /> },
                  { category: 'seni', name: 'Musik', icon: <FiMusic /> },
                  { category: 'seni', name: 'Menari', icon: <FiMusic /> },
                  { category: 'teknologi', name: 'Programming', icon: <FiCode /> },
                  { category: 'teknologi', name: 'Desain Grafis', icon: <FiPenTool /> },
                ].map((talent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${getTalentCategoryColor(talent.category)}`}>
                        {talent.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{talent.name}</span>
                    </div>
                    <select className="px-2 py-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Pilih Level</option>
                      <option value="pemula">Pemula</option>
                      <option value="menengah">Menengah</option>
                      <option value="lanjutan">Lanjutan</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-3">Minat</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Programming', 'Musik', 'Olahraga', 'Seni', 'Sains', 'Bahasa',
                  'Leadership', 'Volunteer', 'Travel', 'Photography', 'Gaming', 'Reading'
                ].map((interest, index) => (
                  <label key={index} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Upload Dokumen</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: 'ijazah', name: 'Ijazah', required: true },
                { type: 'skhun', name: 'SKHUN', required: true },
                { type: 'raport', name: 'Raport', required: true },
                { type: 'akta', name: 'Akta Kelahiran', required: true },
                { type: 'kk', name: 'Kartu Keluarga', required: true },
                { type: 'foto', name: 'Pas Foto 3x4', required: true },
              ].map((doc, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      {doc.name} {doc.required && <span className="text-red-500">*</span>}
                    </label>
                    <FiFile className="text-gray-400" />
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FiUpload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-600">Upload {doc.name}</p>
                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                      Pilih File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Konfirmasi Pendaftaran</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-blue-800 mb-2">Ringkasan Data</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium">{formData.personalInfo.name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.personalInfo.email || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Telepon:</span>
                  <span className="font-medium">{formData.personalInfo.phone || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sekolah Asal:</span>
                  <span className="font-medium">{formData.previousEducation.schoolName || '-'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-md font-medium text-yellow-800 mb-2">Pernyataan</h4>
              <p className="text-sm text-gray-700">
                Dengan mengirimkan formulir ini, saya menyatakan bahwa semua data yang saya berikan adalah benar dan dapat dipertanggungjawabkan.
              </p>
              <div className="mt-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Saya setuju dengan syarat dan ketentuan yang berlaku</span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Formulir Pendaftaran Siswa Baru</h2>
          <div className="text-sm text-gray-500">
            Langkah {registrationStep} dari {steps.length}
          </div>
        </div>
        
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                registrationStep > step.id ? 'bg-green-500 text-white' :
                registrationStep === step.id ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {registrationStep > step.id ? <FiCheck /> : step.icon}
              </div>
              <div className={`ml-2 ${
                registrationStep > step.id ? 'text-green-600' :
                registrationStep === step.id ? 'text-blue-600' :
                'text-gray-500'
              }`}>
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  registrationStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        {renderStepContent()}
        
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={registrationStep === 1}
            className={`px-4 py-2 rounded-lg ${
              registrationStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Kembali
          </button>
          
          <button
            onClick={nextStep}
            className={`px-4 py-2 rounded-lg ${
              registrationStep === steps.length 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {registrationStep === steps.length ? 'Kirim Pendaftaran' : 'Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Registration Data View
const RegistrationDataView: React.FC<{ studentRegistrations: StudentRegistration[] }> = ({ studentRegistrations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const filteredRegistrations = studentRegistrations.filter(registration => {
    const matchesSearch = registration.personalInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          registration.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || registration.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pendaftar..."
              className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
          </div>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="processing">Diproses</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiDownloadIcon className="mr-2" /> Export Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRegistrations.map(registration => (
          <div key={registration.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">{registration.personalInfo.name}</h4>
              {getStatusBadge(registration.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <FiUser className="mr-2 text-gray-400" />
                <span>{registration.registrationNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TfiEmail  className="mr-2 text-gray-400" />
                <span className="truncate">{registration.personalInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiPhone className="mr-2 text-gray-400" />
                <span>{registration.personalInfo.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBookOpen className="mr-2 text-gray-400" />
                <span>{registration.previousEducation.schoolName}</span>
              </div>
            </div>
            
            {registration.testScores && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Total Nilai Tes</span>
                  <span className="text-sm font-bold text-blue-600">{registration.testScores.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${registration.testScores.total}%`}}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t flex justify-between items-center">
              <div className="text-xs text-gray-500">
                <span className="font-medium">Tanggal Daftar:</span> {registration.registrationDate}
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Selection Process View
const SelectionProcessView: React.FC<{ studentRegistrations: StudentRegistration[] }> = ({ studentRegistrations }) => {
  const [selectedTab, setSelectedTab] = useState('pending');
  
  const pendingRegistrations = studentRegistrations.filter(r => r.status === 'pending');
  const processingRegistrations = studentRegistrations.filter(r => r.status === 'processing');
  const acceptedRegistrations = studentRegistrations.filter(r => r.status === 'accepted');
  const rejectedRegistrations = studentRegistrations.filter(r => r.status === 'rejected');
  
  const tabs = [
    { id: 'pending', name: 'Menunggu Proses', count: pendingRegistrations.length, color: 'yellow' },
    { id: 'processing', name: 'Sedang Diproses', count: processingRegistrations.length, color: 'blue' },
    { id: 'accepted', name: 'Diterima', count: acceptedRegistrations.length, color: 'green' },
    { id: 'rejected', name: 'Ditolak', count: rejectedRegistrations.length, color: 'red' },
  ];
  
  const getRegistrationsByTab = () => {
    switch (selectedTab) {
      case 'pending': return pendingRegistrations;
      case 'processing': return processingRegistrations;
      case 'accepted': return acceptedRegistrations;
      case 'rejected': return rejectedRegistrations;
      default: return pendingRegistrations;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? `border-${tab.color}-500 text-${tab.color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full bg-${tab.color}-100 text-${tab.color}-800`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getRegistrationsByTab().map(registration => (
          <div key={registration.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-800">{registration.personalInfo.name}</h4>
              {getStatusBadge(registration.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <FiUser className="mr-2 text-gray-400" />
                <span>{registration.registrationNumber}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TfiEmail  className="mr-2 text-gray-400" />
                <span className="truncate">{registration.personalInfo.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBookOpen className="mr-2 text-gray-400" />
                <span>{registration.previousEducation.schoolName}</span>
              </div>
            </div>
            
            {registration.testScores && (
              <div className="mt-3 pt-3 border-t">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-gray-500">Akademik</p>
                    <p className="font-bold">{registration.testScores.academic}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Psikologi</p>
                    <p className="font-bold">{registration.testScores.psychological}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Wawancara</p>
                    <p className="font-bold">{registration.testScores.interview}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t flex justify-between">
              {registration.status === 'pending' && (
                <>
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                    Proses
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Tolak
                  </button>
                </>
              )}
              {registration.status === 'processing' && (
                <>
                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                    Terima
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Tolak
                  </button>
                </>
              )}
              {registration.status === 'accepted' && (
                <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                  Buat Akun Siswa
                </button>
              )}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Academic View
const AcademicView: React.FC<{ 
  activeSubView: string, 
  setActiveSubView: React.Dispatch<React.SetStateAction<string>>,
  students: Student[], 
  teachers: Teacher[], 
  parents: Parent[], 
  classes: Class[], 
  subjects: Subject[]
}> = ({ activeSubView, setActiveSubView, students }) => {
  const renderSubView = () => {
    switch (activeSubView) {
      case 'students':
        return <StudentsView students={students} />;
      default:
        return <div>Pilih sub-menu untuk melihat detail</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {[
              { id: 'students', name: 'Data Siswa', icon: <FiUserIcon /> },
              { id: 'teachers', name: 'Data Guru', icon: <FiUsers /> },
              { id: 'parents', name: 'Data Wali Murid', icon: <FiUserPlus /> },
              { id: 'classes', name: 'Data Kelas', icon: <FiGrid /> },
              { id: 'subjects', name: 'Mata Pelajaran', icon: <FiBook /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSubView === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          {renderSubView()}
        </div>
      </div>
    </div>
  );
};

// Students View
const StudentsView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.nis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || student.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari siswa..."
              className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-2 top-2.5 text-gray-400" />
          </div>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
            <option value="graduated">Lulus</option>
            <option value="transferred">Pindah</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlusIcon className="mr-2" /> Tambah Siswa
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{student.name}</h4>
                <p className="text-xs text-gray-500">{student.nis}</p>
              </div>
              {getStatusBadge(student.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <FiGrid className="mr-2 text-gray-400" />
                <span>{student.className}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <TfiEmail  className="mr-2 text-gray-400" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiPhone className="mr-2 text-gray-400" />
                <span>{student.phone}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Minat & Bakat</span>
                <span className="text-xs font-medium text-blue-600">{student.talents.length} bakat</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {student.talents.slice(0, 2).map(talent => (
                  <span 
                    key={talent.id}
                    className={`px-2 py-1 text-xs rounded-full ${getTalentCategoryColor(talent.category)}`}
                  >
                    {talent.name}
                  </span>
                ))}
                {student.talents.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                    +{student.talents.length - 2}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-3 flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Talents View
const TalentsView: React.FC<{ 
  activeSubView: string, 
  setActiveSubView: React.Dispatch<React.SetStateAction<string>>,
  students: Student[]
}> = ({ activeSubView, setActiveSubView, students }) => {
  const subViewTabs = [
    { id: 'data', name: 'Data Minat & Bakat', icon: <FiHeart /> },
    { id: 'development', name: 'Pengembangan', icon: <FiTrendingUpIcon /> },
    { id: 'achievements', name: 'Prestasi', icon: <FiTrophy /> },
  ];

  const renderSubView = () => {
    switch (activeSubView) {
      case 'data':
        return <TalentsDataView students={students} />;
      case 'development':
        return <TalentsDevelopmentView students={students} />;
      case 'achievements':
        return <AchievementsView students={students} />;
      default:
        return <TalentsDataView students={students} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {subViewTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSubView === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          {renderSubView()}
        </div>
      </div>
    </div>
  );
};

// Talents Data View
const TalentsDataView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const allTalents = students.flatMap(s => s.talents);
  const categories = [...new Set(allTalents.map(t => t.category))];
  
  const filteredTalents = allTalents.filter(talent => {
    const matchesCategory = !filterCategory || talent.category === filterCategory;
    const matchesStudent = !selectedStudent || students.find(s => s.talents.includes(talent))?.id === selectedStudent;
    
    return matchesCategory && matchesStudent;
  });
  
  const talentStats = categories.map(category => ({
    category,
    count: allTalents.filter(t => t.category === category).length,
    students: [...new Set(allTalents.filter(t => t.category === category).map(t => 
      students.find(s => s.talents.includes(t))?.id
    ))].length
  }));

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Semua Siswa</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlusIcon className="mr-2" /> Tambah Bakat
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {talentStats.map(stat => (
          <div key={stat.category} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getTalentCategoryColor(stat.category)}`}>
                {getTalentCategoryIcon(stat.category)}
              </div>
              <span className="text-2xl font-bold text-gray-800">{stat.count}</span>
            </div>
            <h3 className="font-medium text-gray-800 capitalize">{stat.category}</h3>
            <p className="text-sm text-gray-500">{stat.students} siswa</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-5 py-3 border-b bg-gray-50">
          <h3 className="font-medium text-gray-800">Detail Bakat Siswa</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTalents.map((talent, index) => {
              const student = students.find(s => s.talents.includes(talent));
              return student ? (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{talent.name}</h4>
                    {getStatusBadge(talent.level)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <FiUser className="mr-2 text-gray-400" />
                      <span>{student.name}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiGrid className="mr-2 text-gray-400" />
                      <span>{student.className}</span>
                    </div>
                    {talent.description && (
                      <div className="text-gray-600">
                        <p>{talent.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Talents Development View
const TalentsDevelopmentView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedProgram, setSelectedProgram] = useState('');
  
  const developmentPrograms = [
    {
      id: 'prog1',
      name: 'Olimpiade Matematika',
      category: 'akademik',
      description: 'Program persiapan untuk mengikuti olimpiade matematika tingkat nasional',
      participants: 5,
      schedule: 'Senin & Rabu, 15:00-17:00',
      mentor: 'Pak Budi Santoso, M.Si'
    },
    {
      id: 'prog2',
      name: 'Basket Club',
      category: 'olahraga',
      description: 'Pengembangan kemampuan basket dan persiapan kompetisi',
      participants: 12,
      schedule: 'Selasa & Kamis, 16:00-18:00',
      mentor: 'Pak Ahmad Wijaya'
    },
    {
      id: 'prog3',
      name: 'Robotics Club',
      category: 'teknologi',
      description: 'Belajar dasar robotika dan persiapan kompetisi',
      participants: 8,
      schedule: 'Jumat, 14:00-16:00',
      mentor: 'Pak Fajar Nugroho, M.Kom'
    }
  ];
  
  const selectedProgramData = developmentPrograms.find(p => p.id === selectedProgram);
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">Pilih Program</option>
            {developmentPrograms.map(program => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlusIcon className="mr-2" /> Buat Program Baru
        </button>
      </div>
      
      {selectedProgramData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">{selectedProgramData.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Deskripsi</h4>
                  <p className="text-gray-600">{selectedProgramData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Jadwal</h4>
                    <p className="text-gray-600">{selectedProgramData.schedule}</p>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">Pembimbing</h4>
                    <p className="text-gray-600">{selectedProgramData.mentor}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-2">Peserta ({selectedProgramData.participants})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {students.slice(0, selectedProgramData.participants).map(student => (
                      <div key={student.id} className="flex items-center p-2 border rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-2">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.className}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Frekuensi Kehadiran</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Pencapaian Target</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Partisipasi Aktif</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Catatan Pembimbing</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Peserta menunjukkan perkembangan yang baik. Perlu lebih banyak latihan untuk meningkatkan kemampuan teknik.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Update: 2 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {developmentPrograms.map(program => (
            <div key={program.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{program.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getTalentCategoryColor(program.category)}`}>
                  {program.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{program.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-2 text-gray-400" />
                  <span>{program.participants} peserta</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span>{program.schedule}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProgram(program.id)}
                className="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Achievements View
const AchievementsView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [filterLevel, setFilterLevel] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const allAchievements = students.flatMap(s => s.achievements);
  const levels = [...new Set(allAchievements.map(a => a.level))];
  const categories = ['akademik', 'non-akademik', 'olahraga', 'seni', 'sosial'];
  
  const filteredAchievements = allAchievements.filter(achievement => {
    const matchesLevel = !filterLevel || achievement.level === filterLevel;
    const matchesCategory = !filterCategory || categories.includes(filterCategory);
    
    return matchesLevel && matchesCategory;
  });
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="">Semua Tingkat</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlusIcon className="mr-2" /> Tambah Prestasi
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => {
          const student = students.find(s => s.achievements.includes(achievement));
          return student ? (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <FiTrophy className="text-yellow-500" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiUser className="mr-2 text-gray-400" />
                  <span>{student.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiGrid className="mr-2 text-gray-400" />
                  <span>{student.className}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiAward className="mr-2 text-gray-400" />
                  <span>{achievement.level}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span>{achievement.date}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

// Reports View
const ReportsView: React.FC<{ 
  activeSubView: string, 
  setActiveSubView: React.Dispatch<React.SetStateAction<string>>,
  students: Student[],
  subjects: Subject[]
}> = ({ activeSubView, setActiveSubView, students, subjects }) => {
  const subViewTabs = [
    { id: 'current', name: 'Raport Sekolah', icon: <FiFileText /> },
    { id: 'previous', name: 'Raport Sebelumnya', icon: <FiLayers /> },
    { id: 'input', name: 'Input Nilai', icon: <FiEdit /> },
  ];

  const renderSubView = () => {
    switch (activeSubView) {
      case 'current':
        return <CurrentReportsView students={students} />;
      case 'previous':
        return <PreviousReportsView students={students} />;
      case 'input':
        return <GradesInputView students={students} subjects={subjects} />;
      default:
        return <CurrentReportsView students={students} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {subViewTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSubView === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          {renderSubView()}
        </div>
      </div>
    </div>
  );
};

// Current Reports View
const CurrentReportsView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('ganjil');
  const [selectedYear, setSelectedYear] = useState('2022/2023');
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Pilih Kelas</option>
            {/* Add class options here */}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="ganjil">Semester Ganjil</option>
            <option value="genap">Semester Genap</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2022/2023">Tahun Ajaran 2022/2023</option>
            <option value="2023/2024">Tahun Ajaran 2023/2024</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiDownloadIcon className="mr-2" /> Cetak Raport
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{student.name}</h4>
                <p className="text-xs text-gray-500">{student.nis}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Kelas:</span>
                <span className="font-medium">{student.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Semester:</span>
                <span className="font-medium">{selectedSemester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rata-rata:</span>
                <span className="font-medium">{student.averageGrade}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t flex justify-between">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Lihat Raport</button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Cetak</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Previous Reports View
const PreviousReportsView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  const selectedStudentData = students.find(s => s.id === selectedStudent);
  const previousSchools = selectedStudentData?.previousSchools || [];
  const selectedSchoolData = previousSchools.find(s => s.id === selectedSchool);
  const reportCards = selectedSchoolData?.reportCards || [];
  const selectedReportCard = reportCards.find(rc => rc.id === selectedSemester);
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Pilih Siswa</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value="">Pilih Sekolah</option>
            {previousSchools.map(school => (
              <option key={school.id} value={school.id}>{school.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Pilih Semester</option>
            {reportCards.map(rc => (
              <option key={rc.id} value={rc.id}>Semester {rc.semester} - {rc.academicYear}</option>
            ))}
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiDownloadIcon className="mr-2" /> Unduh Raport
        </button>
      </div>
      
      {selectedReportCard ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Raport Semester {selectedReportCard.semester} - {selectedReportCard.academicYear}
              </h3>
              
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Nilai Mata Pelajaran</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mata Pelajaran</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nilai</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedReportCard.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{subject.subjectName}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{subject.grade}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{subject.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Perilaku</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Disiplin</span>
                      <span className="text-sm font-medium">{selectedReportCard.behavior.discipline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Kebersihan</span>
                      <span className="text-sm font-medium">{selectedReportCard.behavior.cleanliness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sopan Santun</span>
                      <span className="text-sm font-medium">{selectedReportCard.behavior.politeness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tanggung Jawab</span>
                      <span className="text-sm font-medium">{selectedReportCard.behavior.responsibility}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Kehadiran</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hadir</span>
                      <span className="text-sm font-medium">{selectedReportCard.attendance.present} hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sakit</span>
                      <span className="text-sm font-medium">{selectedReportCard.attendance.sick} hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Izin</span>
                      <span className="text-sm font-medium">{selectedReportCard.attendance.permit} hari</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tanpa Keterangan</span>
                      <span className="text-sm font-medium">{selectedReportCard.attendance.absent} hari</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Catatan Wali Kelas</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">{selectedReportCard.notes}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-5">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Informasi</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Peringkat</p>
                  <p className="text-lg font-bold text-blue-600">
                    {selectedReportCard.rank} / {selectedReportCard.totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wali Kelas</p>
                  <p className="text-sm font-medium">{selectedReportCard.homeroomTeacher}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kepala Sekolah</p>
                  <p className="text-sm font-medium">{selectedReportCard.principalSignature}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-md font-medium text-gray-700 mb-3">Statistik</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Rata-rata Nilai</span>
                      <span className="text-sm font-medium">
                        {(selectedReportCard.subjects.reduce((sum, s) => sum + s.grade, 0) / selectedReportCard.subjects.length).toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{width: `${(selectedReportCard.subjects.reduce((sum, s) => sum + s.grade, 0) / selectedReportCard.subjects.length) * 100 / 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Kehadiran</span>
                      <span className="text-sm font-medium">
                        {((selectedReportCard.attendance.present / selectedReportCard.attendance.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{width: `${(selectedReportCard.attendance.present / selectedReportCard.attendance.total) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Pilih siswa, sekolah, dan semester untuk melihat raport</p>
        </div>
      )}
    </div>
  );
};

// Grades Input View
const GradesInputView: React.FC<{ students: Student[], subjects: Subject[] }> = ({ students, subjects }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('tugas');
  const [selectedTitle, setSelectedTitle] = useState('');
  
  const filteredStudents = selectedClass 
    ? students.filter(student => student.classId === selectedClass)
    : [];
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Pilih Kelas</option>
            {/* Add class options here */}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="tugas">Tugas</option>
            <option value="uts">UTS</option>
            <option value="uas">UAS</option>
            <option value="praktikum">Praktikum</option>
            <option value="portofolio">Portofolio</option>
          </select>
          <input
            type="text"
            placeholder="Judul Penilaian"
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiSaveIcon className="mr-2" /> Simpan Nilai
        </button>
      </div>
      
      {selectedClass && selectedSubject && selectedTitle && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-3 border-b bg-gray-50">
            <h3 className="font-medium text-gray-800">
              Input Nilai: {selectedTitle} - {getSubjectName(selectedSubject, subjects)}
            </h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map(student => (
                <div key={student.id} className="border rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.nis}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nilai</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder="Opsional"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Documents View
const DocumentsView: React.FC<{ 
  activeSubView: string, 
  setActiveSubView: React.Dispatch<React.SetStateAction<string>>,
  students: Student[]
}> = ({ activeSubView, setActiveSubView, students }) => {
  const subViewTabs = [
    { id: 'list', name: 'Dokumen', icon: <FiFile /> },
    { id: 'upload', name: 'Upload Berkas', icon: <FiUpload /> },
    { id: 'verification', name: 'Verifikasi', icon: <FiCheckCircle /> },
  ];

  const renderSubView = () => {
    switch (activeSubView) {
      case 'list':
        return <DocumentsListView students={students} />;
      case 'upload':
        return <UploadDocumentsView students={students} />;
      case 'verification':
        return <DocumentVerificationView students={students} />;
      default:
        return <DocumentsListView students={students} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-5" aria-label="Tabs">
            {subViewTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeSubView === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          {renderSubView()}
        </div>
      </div>
    </div>
  );
};

// Documents List View
const DocumentsListView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const selectedStudentData = students.find(s => s.id === selectedStudent);
  const documents = selectedStudentData?.documents || [];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesType = !filterType || doc.type === filterType;
    const matchesStatus = !filterStatus || doc.status === filterStatus;
    
    return matchesType && matchesStatus;
  });
  
  const documentTypes = [
    { value: 'ijazah', label: 'Ijazah' },
    { value: 'skhun', label: 'SKHUN' },
    { value: 'akta', label: 'Akta Kelahiran' },
    { value: 'kk', label: 'Kartu Keluarga' },
    { value: 'raport', label: 'Raport' },
    { value: 'sertifikat', label: 'Sertifikat' },
    { value: 'foto', label: 'Pas Foto' },
    { value: 'lainnya', label: 'Lainnya' },
  ];
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Pilih Siswa</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Semua Jenis</option>
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="verified">Terverifikasi</option>
            <option value="pending">Menunggu Verifikasi</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <FiPlusIcon className="mr-2" /> Tambah Dokumen
        </button>
      </div>
      
      {selectedStudentData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(document => (
            <div key={document.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-gray-100 mr-3">
                    {document.type === 'ijazah' || document.type === 'skhun' ? <FiFileText /> :
                     document.type === 'raport' ? <FiBarChartIcon /> :
                     document.type === 'foto' ? <FiImage /> :
                     document.type === 'sertifikat' ? <FiAward /> :
                     <FiFile />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{document.name}</h4>
                    <p className="text-xs text-gray-500">{document.fileSize}</p>
                  </div>
                </div>
                {getStatusBadge(document.status)}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span>Upload: {document.uploadDate}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t flex justify-between">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <FiEye className="mr-1" /> Lihat
                </button>
                <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                  <FiDownloadIcon className="mr-1" /> Unduh
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FiFile className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">Pilih siswa untuk melihat dokumen</p>
        </div>
      )}
    </div>
  );
};

// Upload Documents View
const UploadDocumentsView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };
  
  const documentTypes = [
    { value: 'ijazah', label: 'Ijazah', required: true },
    { value: 'skhun', label: 'SKHUN', required: true },
    { value: 'akta', label: 'Akta Kelahiran', required: true },
    { value: 'kk', label: 'Kartu Keluarga', required: true },
    { value: 'raport', label: 'Raport', required: true },
    { value: 'sertifikat', label: 'Sertifikat', required: false },
    { value: 'foto', label: 'Pas Foto 3x4', required: true },
    { value: 'lainnya', label: 'Lainnya', required: false },
  ];
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Pilih Siswa</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Pilih Jenis Dokumen</option>
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label} {type.required && <span className="text-red-500">*</span>}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedStudent && documentType && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Upload {documentTypes.find(t => t.value === documentType)?.label}
          </h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FiUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop file di sini, atau klik untuk memilih file
            </p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Pilih File
            </button>
          </div>
          
          <div className="mt-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Informasi Siswa</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Nama:</span>
                  <p className="font-medium">{students.find(s => s.id === selectedStudent)?.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">NIS:</span>
                  <p className="font-medium">{students.find(s => s.id === selectedStudent)?.nis}</p>
                </div>
                <div>
                  <span className="text-gray-500">Kelas:</span>
                  <p className="font-medium">{students.find(s => s.id === selectedStudent)?.className}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">{students.find(s => s.id === selectedStudent)?.status}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Upload Dokumen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Document Verification View
const DocumentVerificationView: React.FC<{ students: Student[] }> = ({ students }) => {
  const [filterStatus, setFilterStatus] = useState('pending');
  
  const allDocuments = students.flatMap(s => s.documents);
  const filteredDocuments = allDocuments.filter(doc => doc.status === filterStatus);
  
  const tabs = [
    { id: 'pending', name: 'Menunggu Verifikasi', count: allDocuments.filter(d => d.status === 'pending').length, color: 'yellow' },
    { id: 'verified', name: 'Terverifikasi', count: allDocuments.filter(d => d.status === 'verified').length, color: 'green' },
    { id: 'rejected', name: 'Ditolak', count: allDocuments.filter(d => d.status === 'rejected').length, color: 'red' },
  ];
  
  return (
    <div>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filterStatus === tab.id
                    ? `border-${tab.color}-500 text-${tab.color}-600`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full bg-${tab.color}-100 text-${tab.color}-800`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document, index) => {
          const student = students.find(s => s.documents.includes(document));
          return student ? (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-gray-100 mr-3">
                    {document.type === 'ijazah' || document.type === 'skhun' ? <FiFileText /> :
                     document.type === 'raport' ? <FiBarChartIcon /> :
                     document.type === 'foto' ? <FiImage /> :
                     document.type === 'sertifikat' ? <FiAward /> :
                     <FiFile />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{document.name}</h4>
                    <p className="text-xs text-gray-500">{document.fileSize}</p>
                  </div>
                </div>
                {getStatusBadge(document.status)}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <FiUser className="mr-2 text-gray-400" />
                  <span>{student.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2 text-gray-400" />
                  <span>Upload: {document.uploadDate}</span>
                </div>
              </div>
              
              {filterStatus === 'pending' && (
                <div className="mt-3 pt-3 border-t flex justify-between">
                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                    Verifikasi
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">
                    Tolak
                  </button>
                </div>
              )}
              
              {filterStatus !== 'pending' && (
                <div className="mt-3 pt-3 border-t flex justify-between">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    <FiEye className="mr-1" /> Lihat
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center">
                    <FiDownloadIcon className="mr-1" /> Unduh
                  </button>
                </div>
              )}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

// Placeholder components for brevity
const StaffView: React.FC<any> = () => <div>Staff View</div>;
const CommunicationView: React.FC<any> = () => <div>Communication View</div>;

export default SchoolManagementPage;