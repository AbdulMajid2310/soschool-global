"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateStudyMaterial } from '@/redux/features/school_study_material/thunks';
import {
    HiOutlinePencilAlt, HiOutlineX, HiOutlineUserCircle,
    HiChevronDown, HiOutlineCloudUpload
} from 'react-icons/hi';
import toast from 'react-hot-toast';

interface UpdateStudyMaterialProps {
    material: any; // Ganti dengan interface StudyMaterial kamu
}

const UpdateStudyMaterial = ({ material }: UpdateStudyMaterialProps) => {
    const dispatch = useAppDispatch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Global State
    const { isSubmitting } = useAppSelector((state) => state.schoolStudyMaterial);
    const { teachers } = useAppSelector((state) => state.teacher);

    // Local State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTeacher, setSearchTeacher] = useState(material.author?.user?.username || '');
    const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: material.title,
        description: material.description || '',
        authorId: material.author?.teacherId || '',
        fileUrl: material.fileUrl || ''
    });

    // Sinkronisasi ulang jika data material berubah dari luar
    useEffect(() => {
        if (isModalOpen) {
            setFormData({
                title: material.title,
                description: material.description || '',
                authorId: material.author?.teacherId || '',
                fileUrl: material.fileUrl || ''
            });
            setSearchTeacher(material.author?.user?.username || '');
        }
    }, [material, isModalOpen]);

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
            t.user?.username?.toLowerCase().includes(searchTeacher.toLowerCase())
        );
    }, [teachers, searchTeacher]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('authorId', formData.authorId);

        // Jika ada file baru yang diupload, gunakan key 'fileUrl'
        if (selectedFile) {
            data.append('fileUrl', selectedFile);
        } else {
            // Jika tidak ada upload baru, kirim string URL lama
            data.append('fileUrl', formData.fileUrl);
        }

        try {
            await dispatch(updateStudyMaterial({
                studyMaterialId: material.studyMaterialId,
                formData: data
            } as any)).unwrap();

            toast.success("Materi berhasil diperbarui");
            setIsModalOpen(false);
        } catch (err: any) {
            toast.error(err || "Gagal memperbarui materi");
        }
    };

    return (
        <>
            {/* Trigger Button - Biasanya muncul di list item */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all cursor-pointer"
            >
                <HiOutlinePencilAlt size={20} />
            </button>

            {/* Modal Sidebar */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-end md:p-4 bg-slate-950/40 backdrop-blur-md">
                    <div className="w-full max-w-lg h-full md:h-auto bg-white dark:bg-[#0a0f1d] md:rounded-[3rem] shadow-2xl border-l-4 border-amber-500 animate-in slide-in-from-right duration-500 flex flex-col overflow-hidden">

                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                                    Update<span className="text-amber-500">.</span>Material
                                </h3>
                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">ID: {material.studyMaterialId.slice(0, 8)}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm">
                                <HiOutlineX size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
                            {/* Input Guru */}
                            <div className="space-y-2 relative" ref={dropdownRef}>
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Guru Pengampu</label>
                                <div className="relative">
                                    <HiOutlineUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Cari guru..."
                                        value={searchTeacher}
                                        onChange={(e) => { setSearchTeacher(e.target.value); setIsTeacherDropdownOpen(true); }}
                                        onFocus={() => setIsTeacherDropdownOpen(true)}
                                        className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-amber-500 dark:text-white transition-all font-black uppercase text-xs"
                                    />
                                </div>
                                {isTeacherDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95">
                                        <div className="max-h-40 overflow-y-auto">
                                            {filteredTeachers.map((t) => (
                                                <div
                                                    key={t.teacherId}
                                                    onClick={() => {
                                                        setFormData({ ...formData, authorId: t.teacherId });
                                                        setSearchTeacher(t.user?.username || '');
                                                        setIsTeacherDropdownOpen(false);
                                                    }}
                                                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${formData.authorId === t.teacherId ? 'bg-amber-500 text-white' : 'hover:bg-amber-50 dark:hover:bg-amber-900/30'}`}
                                                >
                                                    <p className="text-[10px] font-black uppercase">{t.user?.username}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Judul & Deskripsi */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Judul Materi</label>
                                <input
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-amber-500 dark:text-white font-bold text-sm"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* File Upload Section */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Update File/Link</label>
                                <div className="p-6 rounded-4xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-white/2 space-y-4">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <input
                                            type="file"
                                            id="file-update"
                                            className="hidden"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                        />
                                        <label htmlFor="file-update" className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase shadow-sm cursor-pointer hover:bg-amber-50 border border-slate-100 dark:border-slate-700">
                                            {selectedFile ? `Baru: ${selectedFile.name}` : 'Ganti File Fisik'}
                                        </label>
                                        {!selectedFile && formData.fileUrl && (
                                            <p className="text-[8px] text-slate-400 truncate max-w-full italic">Existing: {formData.fileUrl.split('/').pop()}</p>
                                        )}
                                    </div>

                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                                        <span className="relative bg-white dark:bg-[#0a0f1d] px-2 text-[9px] font-black text-slate-400 uppercase">Atau Edit Link</span>
                                    </div>

                                    <input
                                        type="url"
                                        placeholder="Edit link..."
                                        disabled={!!selectedFile}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:border-amber-500 dark:text-white text-xs"
                                        value={formData.fileUrl}
                                        onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Updating...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateStudyMaterial;