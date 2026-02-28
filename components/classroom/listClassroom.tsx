"use client";
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// Asumsi nama thunk & slice yang Majid buat
import { fetchClassrooms, createClassroom, updateClassroom, deleteClassroom } from '@/redux/features/classroom/thunk';
import { resetClassroomStatus } from '@/redux/features/classroom/slice';
import {
  HiOutlineAcademicCap,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineHashtag,
  HiOutlineArrowPath
} from "react-icons/hi2";
import toast from 'react-hot-toast';
import { HiOutlineCollection } from 'react-icons/hi';

interface ClassroomManagerProps {
  onSelect?: (classroom: any) => void;
}

export default function ClassroomManager({ onSelect }: ClassroomManagerProps) {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { classrooms, loading, success, error } = useAppSelector((state) => state.classroom);

  const selectSchoolId = sessionStorage.getItem("schoolId")

  const schoolId = profile?.activeContext?.schoolId || selectSchoolId

  // Local States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', major: '' });

  // 1. Fetch Data Initial
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchClassrooms(schoolId));
    }
  }, [dispatch, schoolId]);

  // 2. Handle Success/Error Side Effects
  useEffect(() => {
    if (success) {
      toast.success(editingId ? "Kelas diperbarui!" : "Kelas ditambahkan!");
      resetForm();
      dispatch(resetClassroomStatus());
    }
    if (error) {
      toast.error(typeof error === 'string' ? error : "Terjadi kesalahan");
      dispatch(resetClassroomStatus());
    }
  }, [success, error, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validasi awal
    if (!schoolId) {
      return toast.error("ID Sekolah tidak ditemukan. Silakan login ulang.");
    }

    // 2. Tentukan aksi berdasarkan state editingId
    if (editingId) {
      // Pastikan schoolId juga dikirim saat update untuk validasi keamanan di backend
      dispatch(updateClassroom({
        id: editingId,
        schoolId: schoolId,
        ...formData
      }));
    } else {
      // Tambah data baru
      dispatch(createClassroom({
        ...formData,
        schoolId: schoolId
      }));
    }
  };

  const handleDelete = (id: string) => {
    if (!schoolId) return toast.error("ID Sekolah tidak ditemukan");

    if (confirm("Hapus kelas ini secara permanen?")) {
      // Kirim sebagai objek karena Thunk biasanya hanya menerima satu argument payload
      dispatch(deleteClassroom({ id, schoolId }));
    }
  };

  const startEdit = (cls: any) => {
    setEditingId(cls.id);
    setFormData({ name: cls.name, code: cls.code, description: cls.description || '', major: cls.major || '' });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', description: '', major: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSelect = (cls: any) => {
    setSelectedId(cls.id);
    if (onSelect) onSelect(cls);
  };

  // UI Utilities
  const inputClass = "w-full px-5 py-3 bg-slate-50 dark:bg-gray-900 border border-transparent focus:border-indigo-500 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold dark:text-white text-sm";
  const labelClass = "text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 ml-2 mb-1 block";

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-6 rounded-[2.5rem] border border-slate-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
            <HiOutlineCollection size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black dark:text-white tracking-tight italic">Ruang Kelas</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manajemen Kelas SoSchool</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {loading && <HiOutlineArrowPath className="animate-spin text-indigo-500" size={20} />}
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`p-4 rounded-2xl transition-all ${isFormOpen ? 'bg-rose-50 text-rose-500 rotate-45' : 'bg-slate-900 dark:bg-indigo-600 text-white hover:scale-105 active:scale-95'}`}
          >
            <HiOutlinePlus size={24} />
          </button>
        </div>
      </div>

      {/* Form Section */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 p-8 rounded-[3rem] border-2 border-indigo-100 dark:border-indigo-900/30 animate-in slide-in-from-top duration-500 space-y-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-xs tracking-[0.2em]">
              {editingId ? "Update Data Kelas" : "Tambah Kelas Baru"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nama Kelas</label>
              <input name="name" required value={formData.name} onChange={handleChange} placeholder="Contoh: X IPA 1" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kode Unik</label>
              <input name="code" required value={formData.code} onChange={handleChange} placeholder="Contoh: X-IPA1" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Keterangan</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi atau lokasi kelas..." rows={2} className={inputClass} />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={resetForm} className="px-6 py-3 text-xs font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Batal</button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? "Memproses..." : editingId ? "Update Kelas" : "Simpan Kelas"}
            </button>
          </div>
        </form>
      )}

      {/* List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classrooms.map((cls: any) => (
          <div
            key={cls.id}
            onClick={() => handleSelect(cls)}
            className={`group p-6 rounded-[2.8rem] border-2 transition-all cursor-pointer relative ${selectedId === cls.id ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/10' : 'border-slate-50 dark:border-gray-900 bg-white dark:bg-gray-950 hover:border-indigo-200'}`}
          >
            {selectedId === cls.id && (
              <div className="absolute top-6 right-6 text-indigo-600 animate-in zoom-in duration-300">
                <HiOutlineCheckCircle size={24} />
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl transition-colors ${selectedId === cls.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-gray-900 text-slate-500 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600'}`}>
                <HiOutlineAcademicCap size={28} />
              </div>
              <div className="flex-1 pr-8">
                <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight leading-none mb-1">{cls.name}</h4>
                <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 mb-3">
                  <HiOutlineHashtag size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{cls.code}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2 mt-2 px-1 font-medium italic">
              "{cls.description || 'Tidak ada deskripsi ruangan'}"
            </p>

            {/* Floating Actions */}
            <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => { e.stopPropagation(); startEdit(cls); }}
                className="flex-1 py-3 bg-slate-50 dark:bg-gray-900 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(cls.id); }}
                className="p-3 bg-slate-50 dark:bg-gray-900 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 rounded-xl transition-all"
              >
                <HiOutlineTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {classrooms.length === 0 && !loading && (
        <div className="py-20 text-center bg-slate-50 dark:bg-gray-950/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-gray-800">
          <p className="font-black text-slate-300 dark:text-gray-700 uppercase tracking-widest italic">Belum ada data kelas</p>
        </div>
      )}
    </div>
  );
}