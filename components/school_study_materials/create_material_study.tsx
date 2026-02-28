"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createStudyMaterial } from '@/redux/features/school_study_material/thunks';
import {
    HiOutlinePlus, HiOutlineX, HiOutlineUserCircle,
    HiChevronDown, HiOutlineCloudUpload
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const CreateStudyMaterial = () => {
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Global State
    const { isSubmitting } = useAppSelector((state) => state.schoolStudyMaterial);
    const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
    const { teachers } = useAppSelector((state) => state.teacher);

    // Ambil subjectId dari sessionStorage (Pastikan ini set saat masuk ke halaman detail subject)
    const [subjectId, setSubjectId] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSubjectId(sessionStorage.getItem('schoolSubjectId') || '');
        }
    }, []);

    // Local State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTeacher, setSearchTeacher] = useState('');
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        authorId: '',
    });

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsTeacherDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredTeachers = useMemo(() => {
        if (!searchTeacher) return teachers;
        return teachers.filter(t =>
            t.user?.username?.toLowerCase().includes(searchTeacher.toLowerCase()) ||
            t.nip?.toLowerCase().includes(searchTeacher.toLowerCase())
        );
    }, [teachers, searchTeacher]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.authorId) return toast.error("Pilih guru pengampu");
        if (!selectedFile) return toast.error("Silakan upload file materi");
        if (!subjectId) return toast.error("ID Mata Pelajaran tidak ditemukan");
        if (!activePeriod?.periodId) return toast.error("Periode akademik aktif tidak ditemukan");

        // Gunakan FormData karena mengirim File
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('authorId', formData.authorId);
        data.append('subjectId', subjectId);
        data.append('periodId', activePeriod.periodId);

        // SESUAIKAN DENGAN BACKEND: Key harus 'file' (sesuai FileInterceptor('file'))
        data.append('file', selectedFile);

        try {
            // Kita unwrap agar bisa masuk ke block catch jika backend return error
            await dispatch(createStudyMaterial(data as any)).unwrap();

            toast.success("Materi berhasil diterbitkan & dirangkum AI");
            setIsModalOpen(false);
            resetForm();
        } catch (err: any) {
            // Mengambil pesan error dari backend
            const errorMsg = typeof err === 'string' ? err : err?.message || "Gagal membuat materi";
            toast.error(errorMsg);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', authorId: '' });
        setSelectedFile(null);
        setSearchTeacher('');
    };

    return (
        <>
            {/* Button Trigger - Menggunakan Tailwind v4 style yang kamu pakai */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
            >
                <HiOutlinePlus strokeWidth={2.5} /> Tambah Materi
            </button>

            {/* Modal Sidebar */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-end md:p-4 bg-slate-950/40 backdrop-blur-md">
                    <div className="w-full max-w-lg h-full md:h-auto bg-white dark:bg-[#0a0f1d] md:rounded-[3rem] shadow-2xl border-l-4 border-blue-600 animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                                    Create<span className="text-blue-600">.</span>Material
                                </h3>
                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">SoSchool Content System</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer">
                                <HiOutlineX size={20} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[80vh] scrollbar-hide">

                            {/* Input Guru */}
                            <div className="space-y-2 relative" ref={dropdownRef}>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Guru Pengampu</label>
                                <div className="relative group">
                                    <HiOutlineUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Cari & pilih guru..."
                                        value={searchTeacher}
                                        onChange={(e) => { setSearchTeacher(e.target.value); setIsTeacherDropdownOpen(true); }}
                                        onFocus={() => setIsTeacherDropdownOpen(true)}
                                        className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 dark:text-white transition-all font-black uppercase text-xs"
                                    />
                                    <HiChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 transition-transform ${isTeacherDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {isTeacherDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95">
                                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                            {filteredTeachers.length > 0 ? (
                                                filteredTeachers.map((t) => (
                                                    <div
                                                        key={t.teacherId}
                                                        onClick={() => {
                                                            setFormData({ ...formData, authorId: t.teacherId });
                                                            setSearchTeacher(t.user?.username || '');
                                                            setIsTeacherDropdownOpen(false);
                                                        }}
                                                        className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${formData.authorId === t.teacherId ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] border ${formData.authorId === t.teacherId ? 'bg-white/20 border-white/20' : 'bg-blue-600 text-white border-blue-400'}`}>
                                                            {t.user?.username?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black uppercase line-clamp-1">{t.user?.username}</p>
                                                            <p className="text-xs ">NIP : {t.nip}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-[9px] text-center p-4 uppercase font-bold text-slate-400">Guru tidak ditemukan</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Judul Materi */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Judul Materi</label>
                                <input
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 dark:text-white font-bold text-sm"
                                    placeholder="Contoh: Dasar Pemrograman Web"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Deskripsi Singkat (Opsional)</label>
                                <textarea
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-blue-600 dark:text-white font-bold text-sm min-h-24 resize-none"
                                    placeholder="Biarkan kosong jika ingin AI yang menulis deskripsi..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            {/* File Upload UI */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Upload Modul</label>
                                <div className={`relative p-8 rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${selectedFile ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-white/2'}`}>
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-colors ${selectedFile ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-400 shadow-sm'}`}>
                                        <HiOutlineCloudUpload size={32} />
                                    </div>

                                    <div className="text-center">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        />
                                        <label htmlFor="file-upload" className="block cursor-pointer">
                                            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-700 underline underline-offset-4">
                                                {selectedFile ? 'Ganti File' : 'Pilih File Materi'}
                                            </span>
                                        </label>
                                        <p className="text-[9px] text-slate-400 font-bold mt-2 uppercase tracking-tight truncate max-w-50 px-4">
                                            {selectedFile ? selectedFile.name : 'PDF, DOCX, atau PPT (Max 10MB)'}
                                        </p>
                                    </div>

                                    {selectedFile && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFile(null)}
                                            className="absolute top-4 right-4 p-2 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <HiOutlineX size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:translate-y-0 cursor-pointer"
                            >
                                {isSubmitting ? 'Sedang Memproses...' : 'Terbitkan Modul'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateStudyMaterial;