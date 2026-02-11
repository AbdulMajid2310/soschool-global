"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  createClassroom,
  deleteClassroom,
  fetchClassrooms,
  updateClassroom,
} from '@/redux/features/classroom/thunk';
import { resetClassroomStatus } from '@/redux/features/classroom/slice';
import {
  HiOutlineHomeModern,
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineAcademicCap // Icon tambahan untuk Major
} from "react-icons/hi2";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { confirmActionToast } from '../toast/confirmActionToast';

export default function SchoolClassroomPage() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { classrooms, loading, error, success } = useAppSelector((state) => state.classroom);
  const router = useRouter();

  const schoolId = profile?.school?.schoolId;

  // State UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [major, setMajor] = useState(''); // State Jurusan

  // 1. Initial Fetch
  useEffect(() => {
    if (schoolId) dispatch(fetchClassrooms(schoolId));
  }, [dispatch, schoolId]);

  // 2. Handle Success & Error Action
  useEffect(() => {
    if (success) {
      toast.success(selectedId ? 'Ruangan berhasil diperbarui' : 'Ruangan berhasil ditambahkan');
      handleCloseModal();
      dispatch(resetClassroomStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetClassroomStatus());
    }
  }, [success, error, dispatch, selectedId]);

  const handleOpenModal = (id: string | null = null, currentName: string = '', currentMajor: string = '') => {
    setSelectedId(id);
    setName(currentName);
    setMajor(currentMajor); // Set Major saat edit
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedId(null);
    setName('');
    setMajor('');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolId || !name.trim()) {
      toast.error("Nama ruangan wajib diisi");
      return;
    }

    // Konversi string kosong ke null agar sesuai interface string | null
    const finalMajor = major.trim() === "" ? null : major.trim();

    const payload = {
      schoolId,
      name: name.trim(),
      major: finalMajor,
    };

    if (selectedId) {
      dispatch(updateClassroom({ id: selectedId, ...payload }));
    } else {
      dispatch(createClassroom(payload));
    }
  };

  const handleDelete = (id: string) => {
    if (!schoolId) return;

    confirmActionToast({
      title: 'Hapus Ruangan?',
      message: 'Data ini mungkin terhubung dengan konfigurasi kelas lainnya.',
      onConfirm: async () => {
        // Jalankan dispatch dan unwrap di sini
        await dispatch(deleteClassroom({ id, schoolId })).unwrap();
        toast.success('Ruangan berhasil dihapus');
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-3xl shadow-xl">
            <HiOutlineHomeModern size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">Master Ruangan</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Kelola identitas fisik kelas dan laboratorium</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 cursor-pointer"
          >
            <HiOutlineArrowLeft size={18} strokeWidth={2.5} />
            Kembali
          </button>

          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-200/50 cursor-pointer"
          >
            <HiOutlinePlus size={20} strokeWidth={2.5} />
            Tambah Ruangan
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl shadow-sm overflow-hidden min-h-100">
        {loading && classrooms.length === 0 ? (
          <div className="p-32 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Sinkronisasi data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {classrooms.map((item) => (
              <div
                key={item.schoolClassroomId}
                className="group relative bg-slate-50/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 transition-all hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none hover:-translate-y-1"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-slate-800 text-indigo-600 rounded-2xl shadow-sm">
                        <HiOutlineHomeModern size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ruangan</p>
                        <h3 className="text-xl font-bold text-slate-800 uppercase dark:text-white leading-none">{item.name}</h3>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(item.schoolClassroomId, item.name, item.major)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-sm">
                        <HiOutlinePencilSquare size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.schoolClassroomId)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-sm">
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                      <HiOutlineAcademicCap size={18} className="text-indigo-500" />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.major ? item.major : 'Umum'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && classrooms.length === 0 && (
          <div className="p-32 text-center">
            <p className="text-slate-100 dark:text-slate-800 font-black uppercase tracking-tighter text-6xl">Kosong</p>
            <p className="text-slate-400 font-medium italic">Belum ada master ruangan terdaftar.</p>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={handleCloseModal} />

          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-4xl shadow-2xl border border-transparent dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                {selectedId ? 'Perbarui Ruangan' : 'Ruangan Baru'}
              </h3>
              <button onClick={handleCloseModal} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-600 rounded-2xl transition-all cursor-pointer">
                <HiOutlineXMark size={24} strokeWidth={2.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              {/* Input Nama Ruangan */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Nama Ruangan</label>
                <div className="relative">
                  <HiOutlineHomeModern className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    autoFocus
                    type="text"
                    required
                    placeholder="Contoh: Kelas X-IPA 1"
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 uppercase dark:bg-slate-800/50 border-none dark:text-white rounded-3xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Input Jurusan (Major) */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Jurusan / Fokus</label>
                <div className="relative">
                  <HiOutlineAcademicCap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Contoh: IPA, IPS, atau Umum"
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 uppercase dark:bg-slate-800/50 border-none dark:text-white rounded-3xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 shadow-xl shadow-indigo-200/50 mt-4"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <HiOutlineCheckCircle size={20} />
                    {selectedId ? 'Simpan Perubahan' : 'Daftarkan Ruangan'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}