"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    fetchMaterialsBySubject,
    createStudyMaterial,
    updateStudyMaterial,
    deleteStudyMaterial
} from '@/redux/features/school_study_material/thunks';
import {
    HiOutlinePlus,
    HiOutlineBookOpen,
    HiOutlineCloudUpload,
    HiOutlinePencilAlt,
    HiOutlineTrash,
    HiOutlineSparkles,
    HiOutlineX,
    HiOutlineDocumentText
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { confirmActionToast } from '../toast/confirmActionToast';



const StudyMaterialManager = () => {
    const dispatch = useAppDispatch();

    // Global State
    const { materials, loading, isSubmitting } = useAppSelector((state) => state.schoolStudyMaterial);
    const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
    const { currentTeacherProfile } = useAppSelector((state) => state.teacher);
    const subjectId = sessionStorage.getItem('schoolSubjectId') || '';
    // Local UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fileUrl: ''
    });

    useEffect(() => {
        if (subjectId) dispatch(fetchMaterialsBySubject(subjectId));
    }, [dispatch, subjectId]);

    const openModal = (material?: any) => {
        if (material) {
            setEditId(material.studyMaterialId);
            setFormData({
                title: material.title,
                description: material.description || '',
                fileUrl: material.fileUrl
            });
        } else {
            setEditId(null);
            setFormData({ title: '', description: '', fileUrl: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Sesuaikan authorId berdasarkan kebutuhan backend (biasanya teacherId dari profil)
        const payload = {
            ...formData,
            subjectId,
            authorId: currentTeacherProfile?.teacherId || '',
            periodId: activePeriod?.periodId || '',
        };

        try {
            if (editId) {
                await dispatch(updateStudyMaterial({ studyMaterialId: editId, ...payload })).unwrap();
                toast.success("Materi berhasil diperbarui");
            } else {
                await dispatch(createStudyMaterial(payload as any)).unwrap();
                toast.success("Materi berhasil diterbitkan & dirangkum AI");
            }
            setIsModalOpen(false);
        } catch (err: any) {
            toast.error(err || "Gagal memproses data");
        }
    };

    const handleDelete = (id: string, title: string) => {
        confirmActionToast({
            title: 'Hapus Materi?',
            message: `Materi "${title}" akan dihapus. AI akan memperbarui ringkasan mata pelajaran.`,
            onConfirm: async () => {
                await dispatch(deleteStudyMaterial(id)).unwrap();
                toast.success("Materi berhasil dihapus");
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Action Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <HiOutlineDocumentText className="text-blue-500" />
                        Materi Pembelajaran
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Total {materials?.length || 0} materi tersedia
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
                >
                    <HiOutlinePlus strokeWidth={2.5} />
                    Tambah Materi
                </button>
            </div>

            {/* List Materi */}
            {loading ? (
                <div className="grid grid-cols-1 gap-4 animate-pulse">
                    {[1, 2].map(i => <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl" />)}
                </div>
            ) : materials?.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-4xl bg-slate-50/50 dark:bg-slate-900/50">
                    <HiOutlineBookOpen className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={56} />
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Belum ada materi di sini.</p>
                    <p className="text-xs text-slate-400 mt-1">Mulai dengan menambahkan materi PDF atau Link Video.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {materials.map((m) => (
                        <div key={m.studyMaterialId} className="group flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xs hover:shadow-xl">
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                                    <HiOutlineCloudUpload size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{m.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 italic">
                                        {m.description || "Tidak ada deskripsi..."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                <button onClick={() => openModal(m)} className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors cursor-pointer">
                                    <HiOutlinePencilAlt size={20} />
                                </button>
                                <button onClick={() => handleDelete(m.studyMaterialId, m.title)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors cursor-pointer">
                                    <HiOutlineTrash size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* CRUD Modal / Sidebar */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-end md:p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
                    <div className="w-full max-w-lg h-full md:h-auto bg-white dark:bg-slate-900 md:rounded-[2.5rem] shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300 flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none">
                                    {editId ? 'Edit Materi' : 'Materi Baru'}
                                </h3>
                                <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tighter">Modul Kurikulum SoSchool</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer transition-colors">
                                <HiOutlineX size={24} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">Judul Materi</label>
                                <input
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all font-medium"
                                    placeholder="Contoh: Pengenalan Kalkulus"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                {!editId && (
                                    <div className="flex items-center gap-2 px-1">
                                        <HiOutlineSparkles className="text-blue-500 animate-pulse" size={14} />
                                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-tight">
                                            AI akan otomatis merangkum jika deskripsi kosong
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">Deskripsi Ringkas</label>
                                <textarea
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none transition-all font-medium"
                                    placeholder="Apa yang akan dipelajari siswa?"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">Tautan Sumber (File/URL)</label>
                                <div className="relative">
                                    <input
                                        required
                                        type="url"
                                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all font-medium"
                                        placeholder="https://drive.google.com/..."
                                        value={formData.fileUrl}
                                        onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                    />
                                    <HiOutlineCloudUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full py-5 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {isSubmitting ? 'Memproses Data...' : editId ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyMaterialManager;