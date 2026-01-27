"use client"

import React, { useState } from 'react';
import {
  FiHome, FiBookOpen, FiDollarSign, FiUsers, FiMessageSquare, FiCalendar, FiSettings, FiLogOut, FiUser, FiChevronDown,
  FiAward, FiPackage, FiTrendingUp, FiBell, FiMail, FiCreditCard, FiActivity, FiTarget, FiEdit, FiTrash2, FiEye, FiPlus,
  FiFileText, FiShield, FiCheckCircle, FiXCircle, FiAlertCircle, FiMapPin, FiBriefcase
} from 'react-icons/fi';

// --- 1. TYPE DEFINITIONS (Representasi SEMUA Entity) ---

type Role = 'siswa' | 'guru' | 'staff' | 'wali_murid';

// --- User & Access ---
interface User { userId: string; username: string; email: string; phone: string; nik: string; isActive: boolean; role: Role; }
interface UserRole { roleId: string; roleName: string; }
interface UserSchoolAccess { accessId: string; user: User; school: School; roles: UserRole[]; }
interface Guardian { guardianId: string; user: User; }
interface Teacher { teacherId: string; nip: string; user: User; }
interface Student { studentId: string; nis: string; user: User; classroom: Classroom; guardian: Guardian; }
interface SchoolStaff { staffId: string; position: string; user: User; }

// --- Core School Data ---
interface School { schoolId: string; nisp: string; nameSchool: string; level: string; vision: string; mission: string; }
interface SchoolAddress { addressSchoolId: string; addressDetail: string; city: string; province: string; }
interface Classroom { classroomId: string; classname: string; homeroomTeacher: Teacher; }
interface Subject { subjectId: string; subjectName: string; level: string; }

// --- Academic & Learning ---
interface TeachingAssignment { teachingId: string; teacher: Teacher; subject: Subject; classroom: Classroom; }
interface Assessment { assessmentId: string; title: string; categoryAssessment: CategoryAssessment; teaching: TeachingAssignment; }
interface CategoryAssessment { categoryAssessmentId: string; category: string; persentase: number; }
interface AssessmentStudent { assessmentStudentId: string; student: Student; assessment: Assessment; }
interface ValueStudent { valueStudentId: string; score: number; criteria: string; gradedBy: Teacher; }
interface Attendance { attendanceId: string; meeting: number; description: string; teachingAssignment: TeachingAssignment; }
interface StudentAttendance { studentAttendanceId: string; student: Student; status: string; }
interface Syllabus { syllabusId: string; title: string; subject: Subject; }
interface Assignment { assignmentId: string; title: string; dueDate: string; teachingAssignment: TeachingAssignment; }

// --- Administrative & Operational ---
interface AcademicCalendar { calendarId: string; eventName: string; startDate: string; isHoliday: boolean; }
interface FeeType { feeTypeId: string; name: string; amount: number; billingCycle: string; }
interface Invoice { invoiceId: string; title: string; amount: number; dueDate: string; status: 'Unpaid' | 'Paid' | 'Overdue'; }
interface PaymentTransaction { transactionId: string; invoice: Invoice; paymentMethod: string; status: 'Success' | 'Pending'; }
interface LeaveRequest { leaveId: string; user: User; leaveType: string; status: 'Pending' | 'Approved'; }
interface InventoryItem { itemId: string; itemName: string; condition: 'Baik' | 'Rusak Ringan' | 'Rusak Berat'; location: string; }
interface FacilityBooking { bookingId: string; facilityName: string; bookingStartTime: string; user: User; }

// --- Student Welfare & Development ---
interface StudentMedicalRecord { medicalRecordId: string; student: Student; bloodType: string; allergies: string[]; }
interface StudentAchievement { achievementId: string; student: Student; title: string; level: string; }
interface StudentDisciplineRecord { disciplineId: string; student: Student; infraction: string; actionTaken: string; }
interface CounselingRecord { recordId: string; student: Student; issue: string; date: string; }
interface Extrakulikuler { eskulId: string; name: string; }
interface UserExtrakulikuler { userId: User; extrakulikuler: Extrakulikuler; position: string; }

// --- Communication & Community ---
interface Announcement { announcementId: string; title: string; content: string; targetAudience: string; }
interface DigitalCommunicationLog { logId: string; student: Student; message: string; senderType: 'Teacher' | 'Guardian'; }
interface Alumni { alumniId: string; student: Student; graduationYear: number; currentJob: string; university: string; }
interface DigitalLetter { letterId: string; subject: string; recipientType: string; isSent: boolean; }

// --- Advanced Features ---
interface ReportCardTemplate { templateId: string; templateName: string; level: string; isActive: boolean; }
interface StudentPerformancePrediction { predictionId: string; student: Student; riskLevel: 'Low' | 'Medium' | 'High'; }
interface AuditLog { logId: string; user: User; action: string; entityType: string; timestamp: string; }


// --- 2. COMPREHENSIVE STATIC MOCK DATA ---
const mockSchool: School = { schoolId: '1', nisp: '1234567890', nameSchool: 'SMA Nusantara Jaya', level: 'SMA', vision: 'Unggul dalam Prestasi, Berkarakter dalam Aksi', mission: 'Menciptakan pembelajar yang inovatif dan bertanggung jawab.' };
const mockAddress: SchoolAddress = { addressSchoolId: '1', addressDetail: 'Jl. Pendidikan No. 1', city: 'Jakarta', province: 'DKI Jakarta' };

const mockUsers: User[] = [
  { userId: 'u1', username: 'Budi Santoso', email: 'budi@student.sch.id', phone: '0812345678', nik: '3171012345670001', isActive: true, role: 'siswa' },
  { userId: 'u2', username: 'Andi Wijaya, S.Pd.', email: 'andi.wijaya@teacher.sch.id', phone: '0812345679', nik: '3171012345670002', isActive: true, role: 'guru' },
  { userId: 'u3', username: 'Siti Aminah', email: 'siti.aminah@staff.sch.id', phone: '0812345680', nik: '3171012345670003', isActive: true, role: 'staff' },
  { userId: 'u4', username: 'Rudi Hermawan', email: 'rudi.hermawan@parent.sch.id', phone: '0812345681', nik: '3171012345670004', isActive: true, role: 'wali_murid' },
];
const mockGuardian: Guardian = { guardianId: 'g1', user: mockUsers[3] };
const mockTeacher: Teacher = { teacherId: 't1', nip: '198012312001011001', user: mockUsers[1] };
const mockStudent: Student = { studentId: 's1', nis: '2021001', user: mockUsers[0], classroom: { classroomId: 'c1', classname: 'XII IPA 1', homeroomTeacher: mockTeacher }, guardian: mockGuardian };
const mockStaff: SchoolStaff = { staffId: 'sf1', position: 'Kepala Tata Usaha', user: mockUsers[2] };

const mockSubjects: Subject[] = [{ subjectId: 's1', subjectName: 'Matematika', level: 'SMA' }, { subjectId: 's2', subjectName: 'Fisika', level: 'SMA' }];
const mockTeachingAssignment: TeachingAssignment = { teachingId: 'ta1', teacher: mockTeacher, subject: mockSubjects[0], classroom: mockStudent.classroom };
const mockAssessment: Assessment = { assessmentId: 'a1', title: 'UH Turunan', categoryAssessment: { categoryAssessmentId: 'ca1', category: 'Ulangan Harian', persentase: 25 }, teaching: mockTeachingAssignment };

const mockInvoices: Invoice[] = [
  { invoiceId: 'inv1', title: 'SPP Bulan Desember', amount: 1500000, dueDate: '2023-12-10', status: 'Unpaid' },
  { invoiceId: 'inv2', title: 'Uang Study Tour', amount: 2500000, dueDate: '2023-12-20', status: 'Paid' },
];
const mockPaymentTransactions: PaymentTransaction[] = [
  { transactionId: 'pt1', invoice: mockInvoices[1], paymentMethod: 'BCA VA', status: 'Success' },
];

const mockInventory: InventoryItem[] = [
  { itemId: 'it1', itemName: 'Proyektor Epson EB-X41', condition: 'Baik', location: 'Ruang XII IPA 1' },
  { itemId: 'it2', itemName: 'Laptop Acer Aspire 5', condition: 'Rusak Ringan', location: 'Ruang Guru' },
];
const mockAlumni: Alumni[] = [
  { alumniId: 'al1', student: mockStudent, graduationYear: 2023, currentJob: 'Software Engineer', university: 'Universitas Indonesia' },
];
const mockMedicalRecord: StudentMedicalRecord = { medicalRecordId: 'mr1', student: mockStudent, bloodType: 'A', allergies: ['Udang', 'Debu'] };
const mockAchievement: StudentAchievement = { achievementId: 'ach1', student: mockStudent, title: 'Juara 1 OSN Fisika', level: 'Provinsi' };
const mockAuditLog: AuditLog[] = [
  { logId: 'l1', user: mockUsers[2], action: 'UPDATE', entityType: 'Invoice', timestamp: '2023-12-05T10:00:00Z' },
  { logId: 'l2', user: mockUsers[1], action: 'CREATE', entityType: 'Assessment', timestamp: '2023-12-05T09:30:00Z' },
];
const mockAnnouncements: Announcement[] = [
  { announcementId: 'ann1', title: 'Libur Akhir Tahun', content: 'Diberitahukan...', targetAudience: 'All' },
  { announcementId: 'ann2', title: 'Pengumuman Lomba Debat', content: 'Bagi siswa yang berminat...', targetAudience: 'Students' },
];

// --- 3. MAIN COMPONENT ---
const SoSchoolHome: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role>('siswa');
  const [activeSection, setActiveSection] = useState<string>('Dashboard');

  const handleLogin = (user: User) => { setCurrentUser(user); setSelectedRole(user.role); };
  const handleLogout = () => { setCurrentUser(null); setActiveSection('Dashboard'); };

  // --- UI Components ---
  const LoginScreen = () => ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"> <div className="p-8 bg-white rounded-xl shadow-2xl w-full max-w-md"> <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Selamat Datang di</h1> <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">SoSchool</h2> <p className="text-center text-gray-600 mb-6">Pilih peran untuk masuk:</p> <div className="space-y-3"> {mockUsers.map((user) => ( <button key={user.userId} onClick={() => handleLogin(user)} className="w-full p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 flex items-center justify-between group"> <div> <p className="font-semibold text-gray-800 group-hover:text-blue-700">{user.username}</p> <p className="text-sm text-gray-500">{user.email}</p> </div> <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">{user.role.replace('_', ' ')}</span> </button> ))} </div> </div> </div> );

  const Sidebar = () => {
    const menuItems = [
      { section: 'Dashboard', icon: FiHome, label: 'Beranda', roles: ['siswa', 'guru', 'staff', 'wali_murid'] },
      { section: 'Akademik', icon: FiBookOpen, label: 'Akademik', roles: ['siswa', 'guru', 'staff', 'wali_murid'] },
      { section: 'Keuangan', icon: FiDollarSign, label: 'Keuangan', roles: ['siswa', 'staff', 'wali_murid'] },
      { section: 'Kesiswaan', icon: FiUsers, label: 'Kesiswaan', roles: ['guru', 'staff', 'wali_murid'] },
      { section: 'Komunikasi', icon: FiMessageSquare, label: 'Komunikasi', roles: ['siswa', 'guru', 'staff', 'wali_murid'] },
      { section: 'Inventaris', icon: FiPackage, label: 'Inventaris', roles: ['staff'] },
      { section: 'Alumni', icon: FiAward, label: 'Alumni', roles: ['staff'] },
      { section: 'Analitik', icon: FiTrendingUp, label: 'Analitik', roles: ['staff'] },
      { section: 'Keamanan', icon: FiShield, label: 'Log Audit', roles: ['staff'] },
      { section: 'Laporan', icon: FiFileText, label: 'Template Rapor', roles: ['staff'] },
    ];
    return ( <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0"> <div className="p-6"> <h1 className="text-2xl font-bold">SoSchool</h1> <p className="text-xs text-gray-400">{mockSchool.nameSchool}</p> </div> <nav className="mt-6"> {menuItems.map((item) => { if (!item.roles.includes(selectedRole)) return null; const Icon = item.icon; return ( <button key={item.section} onClick={() => setActiveSection(item.section)} className={`w-full flex items-center space-x-3 px-6 py-3 hover:bg-gray-800 transition-colors duration-200 ${activeSection === item.section ? 'bg-gray-800 border-l-4 border-blue-500' : ''}`}> <Icon className="w-5 h-5" /> <span>{item.label}</span> </button> ); })} </nav> </aside> );
  };

  const Header = () => ( <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10"> <div className="flex justify-between items-center px-8 py-4"> <h2 className="text-xl font-semibold text-gray-800">{activeSection}</h2> <div className="flex items-center space-x-4"> <button className="relative p-2 text-gray-600 hover:text-gray-900"> <FiBell className="w-5 h-5" /> <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> </button> <div className="relative group"> <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"> <img src={`https://i.pravatar.cc/40?u=${currentUser?.userId}`} alt="Profile" className="w-8 h-8 rounded-full" /> <div className="text-left"> <p className="text-sm font-medium text-gray-900">{currentUser?.username}</p> <p className="text-xs text-gray-500 capitalize">{selectedRole.replace('_', ' ')}</p> </div> <FiChevronDown className="w-4 h-4 text-gray-500" /> </button> <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible"> <p className="px-4 py-2 text-xs text-gray-500 border-b">Simulasi Role:</p> {(['siswa', 'guru', 'staff', 'wali_murid'] as Role[]).map((role) => ( <button key={role} onClick={() => setSelectedRole(role)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"> {role.replace('_', ' ')} </button> ))} <hr className="my-2" /> <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"> <FiLogOut className="w-4 h-4" /> <span>Keluar</span> </button> </div> </div> </div> </div> </header> );

  const Card = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: React.ElementType }) => ( <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200"> <div className="flex items-center justify-between mb-4"> <h3 className="text-lg font-semibold text-gray-800">{title}</h3> {Icon && <Icon className="w-5 h-5 text-gray-400" />} </div> {children} </div> );
  const WidgetCard = ({ title, content, icon: Icon }: { title: string; content: string | React.ReactNode; icon: React.ElementType }) => ( <Card title={title} icon={Icon}> <p className="text-gray-600">{content}</p> </Card> );

  // --- CONTENT SECTIONS ---
  const DashboardContent = () => {
    const getRoleSpecificWidgets = () => {
      switch (selectedRole) {
        case 'siswa': return (<><WidgetCard icon={FiCalendar} title="Jadwal Hari Ini" content="Matematika (07:00), Fisika (09:00)" /><WidgetCard icon={FiEdit} title="Tugas Mendatang" content="Laporan Praktikum Fisika (Deadline: 10 Des)" /><WidgetCard icon={FiActivity} title="Nilai Terbaru" content="UH Matematika: 85" /></>);
        case 'guru': return (<><WidgetCard icon={FiCalendar} title="Jadwal Mengajar" content="XII IPA 1 - Matematika (07:00)" /><WidgetCard icon={FiUsers} title="Presensi Hari Ini" content="30 dari 32 Siswa Hadir" /><WidgetCard icon={FiEdit} title="Penilaian" content="2 Penilaian Menunggu Dinilai" /></>);
        case 'staff': return (<><WidgetCard icon={FiUsers} title="Pendaftaran Baru" content="25 Pendaftar PPDB" /><WidgetCard icon={FiDollarSign} title="Tagihan Belum Dibayar" content="Rp 45.000.000 (30 Siswa)" /><WidgetCard icon={FiPackage} title="Inventaris Rusak" content="5 Item Perlu Perbaikan" /></>);
        case 'wali_murid': return (<><WidgetCard icon={FiActivity} title="Pembelajaran Anak" content="Nilai rata-rata: 88.5" /><WidgetCard icon={FiCreditCard} title="Tagihan Bulan Ini" content="SPP Desember - Belum Dibayar" /><WidgetCard icon={FiMail} title="Pengumuman Terbaru" content="Libur Akhir Tahun" /></>);
        default: return null;
      }
    };
    return ( <div className="p-8"> <h3 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h3> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{getRoleSpecificWidgets()}</div> </div> );
  };

  const AkademikContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Akademik</h3><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card title="Mata Pelajaran"><ul className="space-y-2">{mockSubjects.map(sub => <li key={sub.subjectId} className="p-2 bg-gray-50 rounded">{sub.subjectName}</li>)}</ul></Card><Card title="Penilaian & Tugas"><ul className="space-y-2">{mockAssessment ? <li className="p-2 bg-gray-50 rounded flex justify-between"><span>{mockAssessment.title}</span><span className="text-xs text-gray-500">{mockAssessment.categoryAssessment.category}</span></li> : null}</ul></Card></div></div> );
  const KeuanganContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Keuangan</h3><Card title="Riwayat Tagihan"><table className="w-full text-left"><thead><tr className="border-b"><th className="pb-2">Judul</th><th className="pb-2">Jumlah</th><th className="pb-2">Status</th></tr></thead><tbody>{mockInvoices.map(inv => (<tr key={inv.invoiceId} className="border-b"><td className="py-2">{inv.title}</td><td className="py-2">Rp {inv.amount.toLocaleString('id-ID')}</td><td className="py-2"><span className={`px-2 py-1 text-xs rounded-full ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : inv.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{inv.status}</span></td></tr>))}</tbody></table></Card><Card title="Riwayat Pembayaran" className="mt-6"><table className="w-full text-left"><thead><tr className="border-b"><th>Tagihan</th><th>Metode</th><th>Status</th></tr></thead><tbody>{mockPaymentTransactions.map(pt => (<tr key={pt.transactionId} className="border-b"><td className="py-2">{pt.invoice.title}</td><td className="py-2">{pt.paymentMethod}</td><td className="py-2"><span className={`px-2 py-1 text-xs rounded-full ${pt.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{pt.status}</span></td></tr>))}</tbody></table></Card></div> );
  const KesiswaanContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Kesiswaan</h3><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card title="Data Kesehatan Siswa"><p><strong>Golongan Darah:</strong> {mockMedicalRecord.bloodType}</p><p><strong>Alergi:</strong> {mockMedicalRecord.allergies.join(', ')}</p></Card><Card title="Prestasi Siswa"><p className="text-green-600"><FiAward className="inline mr-2"/> {mockAchievement.title} ({mockAchievement.level})</p></Card></div></div> );
  const KomunikasiContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Komunikasi</h3><Card title="Pengumuman Sekolah"><ul className="space-y-3">{mockAnnouncements.map(ann => (<li key={ann.announcementId} className="border-l-4 border-blue-500 pl-4"><h4 className="font-semibold">{ann.title}</h4><p className="text-sm text-gray-600">{ann.content}</p></li>))}</ul></Card></div> );
  const InventarisContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Inventaris Sekolah</h3><Card title="Daftar Aset"><table className="w-full text-left"><thead><tr className="border-b"><th>Nama Barang</th><th>Kondisi</th><th>Lokasi</th><th>Aksi</th></tr></thead><tbody>{mockInventory.map(item => (<tr key={item.itemId} className="border-b"><td className="py-2">{item.itemName}</td><td className="py-2"><span className={`px-2 py-1 text-xs rounded-full ${item.condition === 'Baik' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.condition}</span></td><td className="py-2">{item.location}</td><td className="py-2"><button className="text-blue-600 hover:underline"><FiEdit/></button></td></tr>))}</tbody></table></Card></div> );
  const AlumniContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Data Alumni</h3><Card title="Jejak Karir Alumni"><ul className="space-y-3">{mockAlumni.map(al => (<li key={al.alumniId} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"><FiBriefcase className="w-5 h-5 text-gray-400 mt-1"/><div><p className="font-semibold">{al.student.user.username}</p><p className="text-sm text-gray-600">{al.currentJob} ({al.university})</p></div></li>))}</ul></Card></div> );
  const AnalitikContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Analitik Sekolah</h3><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card title="Prediksi Kinerja Siswa"><p className="text-sm text-gray-600 mb-2">Siswa dengan risiko tinggi memerlukan intervensi.</p><div className="space-y-2"><div><div className="flex justify-between text-sm"><span>Rendah</span><span>75%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div></div></div><div><div className="flex justify-between text-sm"><span>Sedang</span><span>20%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{width: '20%'}}></div></div></div><div><div className="flex justify-between text-sm"><span>Tinggi</span><span>5%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{width: '5%'}}></div></div></div></div></Card><Card title="Statistik Keuangan"><p className="text-2xl font-bold text-green-600">Rp 450.000.000</p><p className="text-sm text-gray-600">Total Pemasukan Bulan Ini</p></Card></div></div> );
  const KeamananContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Log Audit Sistem</h3><Card title="Aktivitas Terakhir"><table className="w-full text-left"><thead><tr className="border-b"><th>Pengguna</th><th>Aksi</th><th>Entitas</th><th>Waktu</th></tr></thead><tbody>{mockAuditLog.map(log => (<tr key={log.logId} className="border-b"><td className="py-2">{log.user.username}</td><td className="py-2"><span className={`px-2 py-1 text-xs rounded ${log.action === 'CREATE' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{log.action}</span></td><td className="py-2">{log.entityType}</td><td className="py-2 text-sm text-gray-500">{new Date(log.timestamp).toLocaleString('id-ID')}</td></tr>))}</tbody></table></Card></div> );
  const LaporanContent = () => ( <div className="p-8"><h3 className="text-2xl font-bold text-gray-800 mb-6">Template Dokumen</h3><Card title="Template Rapor"><ul className="space-y-2">{['Rapor SMA Kurikulum Merdeka', 'Rapor SMP Semester Ganjil'].map((template, i) => (<li key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>{template}</span><div className="space-x-2"><button className="text-blue-600 hover:underline"><FiEye/></button><button className="text-green-600 hover:underline"><FiEdit/></button></div></li>))}</ul></Card></div> );

  const renderContent = () => {
    switch (activeSection) { case 'Dashboard': return <DashboardContent />; case 'Akademik': return <AkademikContent />; case 'Keuangan': return <KeuanganContent />; case 'Kesiswaan': return <KesiswaanContent />; case 'Komunikasi': return <KomunikasiContent />; case 'Inventaris': return <InventarisContent />; case 'Alumni': return <AlumniContent />; case 'Analitik': return <AnalitikContent />; case 'Keamanan': return <KeamananContent />; case 'Laporan': return <LaporanContent />; default: return <DashboardContent />; }
  };

  if (!currentUser) return <LoginScreen />;
  return ( <div className="flex h-screen bg-gray-100"> <Sidebar /> <div className="flex-1 flex flex-col overflow-hidden"> <Header /> <main className="flex-1 overflow-y-auto"> {renderContent()} </main> </div> </div> );
};

export default SoSchoolHome;