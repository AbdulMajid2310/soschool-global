'use client';

import React, { useState, useMemo } from 'react';
import {
  FaUser,
  FaChalkboardTeacher,
  FaUserFriends,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCircle,
  FaIdCard,
  FaBook,
  FaUsers,
  FaPhone,
  FaPlus,
  FaCheckSquare,
  FaSquare,
  FaTimes,
} from 'react-icons/fa';

/* =======================
   TIPE DATA (Diperluas)
======================= */
type UserRole = 'siswa' | 'guru' | 'wali_murid';
type UserStatus = 'active' | 'inactive';

// Definisi izin/hak akses
type Permission = 'lihat_nilai' | 'edit_nilai' | 'kelola_jadwal' | 'lihat_laporan_keuangan' | 'kelola_pengguna';

interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  status: UserStatus;
  permissions: Permission[]; // Tambahkan hak akses
}

interface Siswa extends BaseUser {
  role: 'siswa';
  nis: string;
  kelas: string;
  jurusan: string;
}

interface Guru extends BaseUser {
  role: 'guru';
  nip: string;
  mataPelajaran: string[];
  isWaliKelas: boolean;
}

interface WaliMurid extends BaseUser {
  role: 'wali_murid';
  siswaDidaftar: string[];
  noHp: string;
}

type AllUsers = Siswa | Guru | WaliMurid;

// Definisi peran dengan hak akses default
const rolePermissions: Record<UserRole, Permission[]> = {
  siswa: ['lihat_nilai'],
  guru: ['lihat_nilai', 'edit_nilai', 'kelola_jadwal'],
  wali_murid: ['lihat_nilai'],
};

/* =======================
   DATA CONTOH
======================= */
const usersData: AllUsers[] = [
  {
    id: '1',
    name: 'Ali Rahman',
    email: 'ali.rahman@sma.example.sch.id',
    role: 'siswa',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    permissions: rolePermissions.siswa,
    nis: '202301001',
    kelas: 'XI IPA 1',
    jurusan: 'IPA',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    email: 'budi@sma.example.sch.id',
    role: 'siswa',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'inactive',
    permissions: rolePermissions.siswa,
    nis: '202201009',
    kelas: 'XII IPS 1',
    jurusan: 'IPS',
  },
  {
    id: '3',
    name: 'Dr. Andi Wijaya',
    email: 'andi@guru.sch.id',
    role: 'guru',
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: 'active',
    permissions: [...rolePermissions.guru, 'lihat_laporan_keuangan'], // Contoh guru dengan hak akses tambahan
    nip: '198503152010011001',
    mataPelajaran: ['Matematika', 'Fisika'],
    isWaliKelas: true,
  },
  {
    id: '4',
    name: 'Ahmad Fauzi',
    email: 'ahmad.parent@gmail.com',
    role: 'wali_murid',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'active',
    permissions: rolePermissions.wali_murid,
    siswaDidaftar: ['Ali Rahman (XI IPA 1)'],
    noHp: '+628123456789',
  },
];

/* =======================
   KOMPONEN PENDUKUNG
======================= */

// Modal untuk konfirmasi aksi
const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Ya, Lanjutkan</button>
        </div>
      </div>
    </div>
  );
};

// Notifikasi sederhana
const Notification: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4"><FaTimes /></button>
    </div>
  );
};

/* =======================
   USER CARD (Diperbaiki)
======================= */
const UserCard: React.FC<{
  user: AllUsers;
  onToggleStatus: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (user: AllUsers) => void;
  onDelete: (id: string) => void;
}> = ({ user, onToggleStatus, isSelected, onSelect, onEdit, onDelete }) => {
  const roleLabel = { siswa: 'Siswa', guru: 'Guru', wali_murid: 'Wali Murid' }[user.role];

  const renderDetail = () => {
    if (user.role === 'siswa') return <><p>NIS: {user.nis}</p><p>{user.kelas} - {user.jurusan}</p></>;
    if (user.role === 'guru') return <><p>NIP: {user.nip}</p><p>Mapel: {user.mataPelajaran.join(', ')}</p>{user.isWaliKelas && <p>Wali Kelas</p>}</>;
    return <><p>{user.noHp}</p><ul className="list-disc ml-4">{user.siswaDidaftar.map((s, i) => <li key={i}>{s}</li>)}</ul></>;
  };

  return (
    <div className={`bg-white dark:bg-slate-800 border rounded-xl p-5 shadow transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <img src={user.avatar} className="w-14 h-14 rounded-full" alt={user.name} />
        <div className="flex-1">
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-gray-400">
            {roleLabel}
            <FaCircle className={`text-xs ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`} />
            {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
          </p>
        </div>
      </div>

      <div className="text-sm mt-3 space-y-1 text-gray-600 dark:text-gray-300">
        <p>{user.email}</p>
        {renderDetail()}
        <div className="pt-2">
          <p className="font-semibold text-xs">Hak Akses:</p>
          <div className="flex flex-wrap gap-1">
            {user.permissions.map(p => <span key={p} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{p.replace('_', ' ')}</span>)}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => onEdit(user)} className="p-2 text-blue-600 hover:bg-blue-100 rounded" title="Edit"><FaEdit /></button>
        <button onClick={() => onDelete(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded" title="Hapus"><FaTrash /></button>
        <button onClick={() => onToggleStatus(user.id)} className={`px-3 py-1 rounded text-white text-sm ${user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
          {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
        </button>
      </div>
    </div>
  );
};

/* =======================
   PAGE (Lengkap)
======================= */
export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<AllUsers[]>(usersData);
  const [filter, setFilter] = useState<UserRole | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [notification, setNotification] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ message: string; action: () => void } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // --- FUNGSI CRUD ---
  const toggleStatus = (id: string) => {
    const user = users.find(u => u.id === id);
    setConfirmation({
      message: `Apakah Anda yakin ingin ${user?.status === 'active' ? 'menonaktifkan' : 'mengaktifkan'} pengguna ini?`,
      action: () => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
        setNotification(`Status pengguna berhasil diperbarui.`);
      }
    });
  };

  const deleteUser = (id: string) => {
    setConfirmation({
      message: 'Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.',
      action: () => {
        setUsers(prev => prev.filter(u => u.id !== id));
        setNotification('Pengguna berhasil dihapus.');
      }
    });
  };
  
  const editUser = (user: AllUsers) => {
    // TODO: Buka modal edit dengan data user
    alert(`Fitur edit untuk ${user.name} akan segera hadir!`);
  };

const addUser = (newUser: Omit<AllUsers, 'id' | 'avatar'>) => {
    const id = (users.length + 1).toString();
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

    let userToAdd: AllUsers; // 1. Deklarasikan variabel dengan tipe yang benar

    // 2. Gunakan switch sebagai type guard untuk membangun objek yang lengkap
    switch (newUser.role) {
        case 'siswa':
            // Kita perlu meyakinkan TypeScript bahwa ini adalah data 'siswa'
            const siswaData = newUser as Omit<Siswa, 'id' | 'avatar'>;
            userToAdd = {
                ...siswaData,
                id,
                avatar,
                // Tambahkan properti spesifik siswa (gunakan placeholder untuk demo)
                nis: 'N/A',
                kelas: 'N/A',
                jurusan: 'N/A',
            };
            break;

        case 'guru':
            const guruData = newUser as Omit<Guru, 'id' | 'avatar'>;
            userToAdd = {
                ...guruData,
                id,
                avatar,
                // Tambahkan properti spesifik guru
                nip: 'N/A',
                mataPelajaran: ['N/A'],
                isWaliKelas: false,
            };
            break;

        case 'wali_murid':
            const waliData = newUser as Omit<WaliMurid, 'id' | 'avatar'>;
            userToAdd = {
                ...waliData,
                id,
                avatar,
                // Tambahkan properti spesifik wali murid
                siswaDidaftar: ['N/A'],
                noHp: 'N/A',
            };
            break;

        default:
            // Sebagai pengaman, jika role tidak dikenali, jangan lakukan apa-apa
            return;
    }

    // 3. Tambahkan objek yang sudah lengkap dan bertipe dengan aman
    setUsers(prev => [...prev, userToAdd]);
    setNotification('Pengguna baru berhasil ditambahkan.');
    setIsAddModalOpen(false);
};

  // --- FUNGSI AKSI MASSAL ---
  const handleSelectUser = (id: string) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    const count = selectedUsers.size;
    const actionText = action === 'activate' ? 'mengaktifkan' : action === 'deactivate' ? 'menonaktifkan' : 'menghapus';
    setConfirmation({
      message: `Apakah Anda yakin ingin ${actionText} ${count} pengguna yang dipilih?`,
      action: () => {
        setUsers(prev => prev.map(u => {
          if (selectedUsers.has(u.id)) {
            if (action === 'delete') return null;
            return { ...u, status: action === 'activate' ? 'active' : 'inactive' };
          }
          return u;
        }).filter(Boolean) as AllUsers[]);
        setNotification(`${count} pengguna berhasil ${actionText}.`);
        setSelectedUsers(new Set());
      }
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      (filter === 'all' || u.role === filter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    );
  }, [users, filter, search]);

  return (
    <div className="p-6">
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      {confirmation && (
        <ConfirmationModal
          isOpen={!!confirmation}
          onConfirm={() => { confirmation.action(); setConfirmation(null); }}
          onCancel={() => setConfirmation(null)}
          message={confirmation.message}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FaPlus /> Tambah Pengguna
        </button>
      </div>

      <div className="flex gap-2 mb-4 items-center">
        <input
          type="checkbox"
          onChange={handleSelectAll}
          checked={filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        {['all', 'siswa', 'guru', 'wali_murid'].map((r) => (
          <button key={r} onClick={() => setFilter(r as any)} className={`px-3 py-1 rounded capitalize ${filter === r ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}>
            {r === 'all' ? 'Semua' : r.replace('_', ' ')}
          </button>
        ))}
        <div className="ml-auto relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input placeholder="Cari nama atau email..." className="pl-10 pr-3 py-1 border rounded-lg" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {selectedUsers.size > 0 && (
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-4 flex justify-between items-center">
          <span className="font-semibold">{selectedUsers.size} pengguna dipilih</span>
          <div className="flex gap-2">
            <button onClick={() => handleBulkAction('activate')} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Aktifkan</button>
            <button onClick={() => handleBulkAction('deactivate')} className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700">Nonaktifkan</button>
            <button onClick={() => handleBulkAction('delete')} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((u) => (
          <UserCard key={u.id} user={u} onToggleStatus={toggleStatus} isSelected={selectedUsers.has(u.id)} onSelect={handleSelectUser} onEdit={editUser} onDelete={deleteUser} />
        ))}
      </div>
      
      {/* Modal Tambah User (disederhanakan untuk demo) */}
      {isAddModalOpen && <AddUserModal onClose={() => setIsAddModalOpen(false)} onAdd={addUser} />}
    
  </div>
  );
};

// Komponen Modal Tambah User (disederhanakan)
const AddUserModal: React.FC<{ onClose: () => void; onAdd: (user: Omit<AllUsers, 'id' | 'avatar'>) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'siswa' as UserRole, status: 'active' as UserStatus });
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUser = { ...formData, permissions };
    // Untuk demo, kita hanya mengirim data dasar. Data spesifik role (nis, nip, dll) diabaikan.
    onAdd(baseUser as any);
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData({ ...formData, role });
    setPermissions(rolePermissions[role]); // Set hak akses default
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 text-gray-700 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Tambah Pengguna Baru</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Nama Lengkap" className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <select className="w-full p-2 border rounded" value={formData.role} onChange={(e) => handleRoleChange(e.target.value as UserRole)}>
            <option value="siswa">Siswa</option>
            <option value="guru">Guru</option>
            <option value="wali_murid">Wali Murid</option>
          </select>
          
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Tambah</button>
          </div>
        </form>
      </div>
    </div>
  );
};