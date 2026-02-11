"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createSubject } from '@/redux/features/school_subject/thunks';
import {
    HiOutlineX,
    HiChevronDown,
    HiCheck,
    HiOutlineBookOpen
} from 'react-icons/hi';
import { toast } from 'react-hot-toast'; // Opsional, sesuaikan dengan library toast kamu

interface CreateSubjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateSubjectModal = ({ isOpen, onClose }: CreateSubjectModalProps) => {
    const dispatch = useAppDispatch();

    // Ambil data pendukung dari Redux
    const { profile } = useAppSelector(state => state.auth);
    const { classrooms } = useAppSelector((state) => state.classroom);
    const { isSubmitting } = useAppSelector((state) => state.schoolSubject);

    const schoolId = profile?.school.schoolId || '';

    // Local States untuk Form
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        category: '',
        schoolClassroomId: ''
    });

    // Reset form saat modal ditutup atau dibuka
    useEffect(() => {
        if (!isOpen) {
            setFormData({ name: '', code: '', category: '', schoolClassroomId: '' });
            setIsDropdownOpen(false);
        }
    }, [isOpen]);

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

        if (!formData.schoolClassroomId) {
            return alert("Silahkan pilih kelas terlebih dahulu");
        }

        const payload = { ...formData, schoolId };

        try {
            await dispatch(createSubject(payload)).unwrap();
            // Jika berhasil
            onClose();
        } catch (err: any) {
            console.error("❌ Create Error:", err);
            // Error handling sudah dihandle thunk/service biasanya
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
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <HiOutlineBookOpen size={20} />
                        </div>
                        <h2 className="text-xl font-bold dark:text-white tracking-tight">Tambah Mapel</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 transition-colors">
                        <HiOutlineX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Input Nama */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 text-nowrap">Nama Mata Pelajaran</label>
                        <input
                            required
                            type="text"
                            placeholder="Masukan nama mapel..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Input Kode */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Kode Mapel</label>
                            <input
                                required
                                type="text"
                                placeholder="MTK-10"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            />
                        </div>
                        {/* Select Kategori */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Kategori</label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Pilih</option>
                                <option value="Wajib">Wajib</option>
                                <option value="Peminatan">Peminatan</option>
                                <option value="Ekstrakurikuler">Ekskul</option>
                            </select>
                        </div>
                    </div>

                    {/* Custom Classroom Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Target Kelas</label>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                        >
                            <span className={selectedClassroom ? "text-slate-900 dark:text-white" : "text-slate-400"}>
                                {selectedClassroom ? selectedClassroom.name : "Pilih Ruang Kelas"}
                            </span>
                            <HiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                                {classrooms.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-slate-500 italic">Data kelas tidak ditemukan</div>
                                ) : (
                                    classrooms.map((cls) => (
                                        <button
                                            key={cls.schoolClassroomId}
                                            type="button"
                                            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 transition-colors"
                                            onClick={() => {
                                                setFormData({ ...formData, schoolClassroomId: cls.schoolClassroomId });
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <span>{cls.name}</span>
                                            {formData.schoolClassroomId === cls.schoolClassroomId && <HiCheck className="text-blue-500" />}
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                'Konfirmasi & Simpan'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubjectModal;