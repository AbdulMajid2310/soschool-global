"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteSubject } from '@/redux/features/school_subject/thunks';
import {
    HiOutlineBookOpen,
    HiOutlineTrash,
    HiOutlinePencilAlt,
    HiOutlineSparkles,
    HiOutlineAcademicCap
} from 'react-icons/hi';
import { confirmActionToast } from '../toast/confirmActionToast';
import toast from 'react-hot-toast';
import { TbListDetails } from 'react-icons/tb';

interface SubjectListProps {
    searchTerm: string;
    onEdit: (subject: any) => void;
}

const SubjectList = ({ searchTerm, onEdit }: SubjectListProps) => {
    const dispatch = useAppDispatch();
    const { subjects, loading } = useAppSelector((state) => state.schoolSubject);

    // Filter logic
    const filteredSubjects = subjects.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        confirmActionToast({
            title: 'Hapus Mata Pelajaran',
            message: `Apakah Anda yakin ingin menghapus "${name}"? Data yang sudah dihapus tidak dapat dikembalikan.`,
            confirmText: 'Ya, Hapus Permanen',
            variant: 'danger',
            onConfirm: async () => {
                // Proses unwrap() agar masuk ke block catch di custom toast jika gagal
                await dispatch(deleteSubject(id)).unwrap();
                toast.success(`Mapel ${name} berhasil dihapus!`);
            }
        });
    };

    const handleDetail = (id: string) => {
        sessionStorage.setItem('schoolSubjectId', id);
        window.location.href = '/staff/akademik/mapel/detail';
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-60 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
                ))}
            </div>
        );
    }

    if (filteredSubjects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <HiOutlineBookOpen className="text-slate-300 dark:text-slate-700 mb-4" size={64} />
                <p className="text-slate-500 dark:text-slate-400 font-medium">Tidak ada mata pelajaran ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
                <div
                    key={subject.subjectId}
                    className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                    {/* AI Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full border border-purple-100 dark:border-purple-800">
                        <HiOutlineSparkles size={12} className="animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">AI Summary</span>
                    </div>

                    <div className="flex flex-col h-full">
                        <div className="mb-4">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                {subject.code} / {subject.sks} SKS
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">
                                {subject.name}
                            </h3>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 italic mb-6 leading-relaxed">
                            "{subject.description || 'Menunggu materi diunggah untuk dirangkum AI...'}"
                        </p>

                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-500">
                                <HiOutlineAcademicCap size={18} className="text-indigo-500" />
                                <span className="text-xs font-semibold uppercase tracking-tight dark:text-slate-300">
                                    {subject.category}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDetail(subject.subjectId)}
                                    className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-red-500 transition-all cursor-pointer hover:scale-110 active:scale-90"
                                    title="Detail Mapel"
                                >
                                    <TbListDetails size={20} />
                                </button>
                                <button
                                    onClick={() => onEdit(subject)}
                                    className="p-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 transition-all cursor-pointer hover:scale-110 active:scale-90"
                                    title="Edit Mapel"
                                >
                                    <HiOutlinePencilAlt size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(subject.subjectId, subject.name)}
                                    className="p-2.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-red-500 transition-all cursor-pointer hover:scale-110 active:scale-90"
                                    title="Hapus Mapel"
                                >
                                    <HiOutlineTrash size={20} />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubjectList;