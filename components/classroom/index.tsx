"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createClassroom, deleteClassroom, fetchClassrooms, updateClassroom } from '@/redux/features/classroom/thunk';
import { resetClassroomStatus } from '@/redux/features/classroom/slice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { confirmActionToast } from '../toast/confirmActionToast';

// Import sub-components
import { ClassroomHeader } from './ClassroomHeader';
import { ClassroomCard } from './ClassroomCard';
import { ClassroomModal } from './ClassroomModal';

export default function SchoolClassroomSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { profile } = useAppSelector((state) => state.auth);
  const { classrooms, loading, success, error } = useAppSelector((state) => state.classroom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', level: '1', major: '' });

  const schoolId = profile?.activeContext?.schoolId || (typeof window !== "undefined" ? sessionStorage.getItem("schoolId") : null);

  useEffect(() => {
    if (schoolId) dispatch(fetchClassrooms(schoolId));
  }, [dispatch, schoolId]);

  useEffect(() => {
    if (success) {
      toast.success(selectedId ? 'Ruangan diperbarui' : 'Ruangan ditambahkan');
      handleCloseModal();
      dispatch(resetClassroomStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(resetClassroomStatus());
    }
  }, [success, error, dispatch, selectedId]);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setSelectedId(item.schoolClassroomId);
      setFormData({ name: item.name, level: item.level || '1', major: item.major || '' });
    } else {
      setSelectedId(null);
      setFormData({ name: '', level: '1', major: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId || !formData.name.trim()) return toast.error("Nama wajib diisi");

    const payload = {
      schoolId,
      name: formData.name.trim().toUpperCase(),
      level: formData.level,
      major: formData.major.trim() === "" ? null : formData.major.trim().toUpperCase(),
    };

    if (selectedId) dispatch(updateClassroom({ id: selectedId, ...payload }));
    else dispatch(createClassroom(payload));
  };

  const handleDelete = (id: string) => {
    if (!schoolId) return;
    confirmActionToast({
      title: 'Hapus Ruangan?',
      message: 'Data ini mungkin terhubung dengan konfigurasi kelas lainnya.',
      variant: 'danger',
      onConfirm: async () => {
        await dispatch(deleteClassroom({ id, schoolId })).unwrap();
        toast.success('Ruangan berhasil dihapus');
      }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <ClassroomHeader onBack={() => router.back()} onAdd={() => handleOpenModal()} />

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl shadow-sm min-h-100">
        {loading && classrooms.length === 0 ? (
          <div className="p-32 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Sinkronisasi data...</p>
          </div>
        ) : classrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {classrooms.map((item) => (
              <ClassroomCard key={item.schoolClassroomId} item={item} onEdit={handleOpenModal} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="p-32 text-center">
            <p className="text-slate-100 dark:text-slate-800 font-black uppercase tracking-tighter text-7xl">Kosong</p>
          </div>
        )}
      </div>

      <ClassroomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEdit={selectedId}
      />
    </div>
  );
}