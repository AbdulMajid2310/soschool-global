"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateSubject } from '@/redux/features/school_subject/thunks';
import {
    HiOutlineX,
    HiChevronDown,
    HiCheck,
    HiOutlinePencilAlt
} from 'react-icons/hi';
import toast from 'react-hot-toast';

interface UpdateSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    subjectData: any; // Data mapel yang dipilih untuk diedit
}

const UpdateSubjectModal = ({ isOpen, onClose, subjectData }: UpdateSubjectModalProps) => {
    const dispatch = useAppDispatch();

    const { classrooms } = useAppSelector((state) => state.classroom);
    const { isSubmitting } = useAppSelector((state) => state.schoolSubject);
    const { profile } = useAppSelector(state => state.auth);
    const schoolId = profile?.school.schoolId || '';

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Local state untuk form edit
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        category: '',
        schoolClassroomId: '',
        description: ''
    });

    // Sync data saat modal dibuka atau subjectData berubah
    useEffect(() => {
        if (isOpen && subjectData) {
            setFormData({
                name: subjectData.name || '',
                code: subjectData.code || '',
                category: subjectData.category || '',
                schoolClassroomId: subjectData.classroom?.schoolClassroomId || subjectData.schoolClassroomId || '',
                description: subjectData.description || ''
            });
        }
    }, [isOpen, subjectData]);

    // Close dropdown click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            schoolId,
            subjectId: subjectData.subjectId
        };

        try {
            await dispatch(updateSubject(payload)).unwrap();
            toast.success("Mata pelajaran berhasil diperbarui!");
            onClose();
        } catch (err: any) {
            // Error ditangani oleh thunk/toast di service
        }
    };

    if (!isOpen) return null;

    const selectedClassroom = classrooms.find(c => c.schoolClassroomId === formData.schoolClassroomId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                            <HiOutlinePencilAlt size={20} />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white tracking-tight">Edit Mapel</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                        <HiOutlineX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nama Mapel</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Kode</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Kategori</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Wajib">Wajib</option>
                                <option value="Peminatan">Peminatan</option>
                                <option value="Ekstrakurikuler">Ekskul</option>
                            </select>
                        </div>
                    </div>

                    {/* Classroom Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Pindah Kelas</label>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        >
                            <span className={selectedClassroom ? "text-slate-900 dark:text-white" : "text-slate-400"}>
                                {selectedClassroom ? selectedClassroom.name : "Pilih Kelas"}
                            </span>
                            <HiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-40 overflow-y-auto">
                                {classrooms.map((cls) => (
                                    <button
                                        key={cls.schoolClassroomId}
                                        type="button"
                                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        onClick={() => {
                                            setFormData({ ...formData, schoolClassroomId: cls.schoolClassroomId });
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <span className="text-sm">{cls.name}</span>
                                        {formData.schoolClassroomId === cls.schoolClassroomId && <HiCheck className="text-blue-500" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSubjectModal;