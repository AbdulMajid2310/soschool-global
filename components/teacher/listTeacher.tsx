"use client";

import { fetchTeachers, toggleTeacherStatus } from "@/redux/features/teacher/thunk";
import { teacherService } from "@/redux/features/teacher/service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FiSearch, FiList, FiGrid, FiInfo, FiEdit2, FiTrash2, FiPlus, FiUser, FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { TbListDetails } from "react-icons/tb";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import TeacherStats from "./teacherStats";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function ListTeacherSection() {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState("");
    const [view, setView] = useState<"list" | "grid">("list");

    const { teachers, loading } = useAppSelector((state) => state.teacher);
    const [showAddTeacher, setShowTeacher] = useState(false)

    const schoolId = useSchoolId();
    useEffect(() => {
        if (schoolId) dispatch(fetchTeachers(schoolId));
    }, [dispatch, schoolId]);

    const handleDelete = (teacherId: string) => {
        confirmActionToast({
            title: "Hapus Data Guru",
            message: "Data yang dihapus tidak dapat dikembalikan. Lanjutkan?",
            confirmText: "Ya, Hapus",
            variant: "danger",
            onConfirm: async () => {
                await teacherService.delete(schoolId!, teacherId);
                toast.success("Data guru berhasil dihapus");
                dispatch(fetchTeachers(schoolId!));
            },
        });
    };

    const handleToggleStatus = (teacherId: string, currentStatus: boolean) => {
        const actionLabel = !currentStatus ? 'Aktifkan' : 'Nonaktifkan';

        confirmActionToast({
            title: `${actionLabel} Guru`,
            message: `Apakah Anda yakin ingin ${actionLabel.toLowerCase()} akses guru ini?`,
            confirmText: `Ya, ${actionLabel}`,
            variant: 'warning', // Gunakan warna amber untuk aksi non-permanen
            onConfirm: async () => {
                await dispatch(toggleTeacherStatus({
                    teacherId,
                    schoolId: schoolId!,
                    isActive: !currentStatus
                })).unwrap();

                toast.success(`Guru berhasil di ${actionLabel}`);
            },
        });
    };

    const filteredTeachers = teachers.filter((t) =>
        t.user.username.toLowerCase().includes(query.toLowerCase()) ||
        (t.nip && t.nip.includes(query))
    );

    return (
        <div className="p-4 md:p-8 space-y-8 text-gray-900 dark:text-white  min-h-screen font-sans">

            {/* Upper Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold  tracking-tight">Manajemen Guru</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola data pengajar dan staf akademik SoSchool</p>
                </div>

            </div>

            {/* Stats Section - Bento Box Style */}
            <TeacherStats />

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="relative w-full md:w-96">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari berdasarkan nama atau NIP..."
                        className="w-full pl-12 pr-4 py-3 font-sans bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                    />
                </div>

                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    <button onClick={() => setView("list")} className={`p-2.5 rounded-lg transition-all ${view === "list" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-500"}`}><FiList size={20} /></button>
                    <button onClick={() => setView("grid")} className={`p-2.5 rounded-lg transition-all ${view === "grid" ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600" : "text-gray-500"}`}><FiGrid size={20} /></button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />)}
                </div>
            ) : (
                <>
                    {view === "list" ? (
                        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Informasi Guru</th>
                                        <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">NIP</th>
                                        <th className="px-8 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</th>
                                        <th className="px-8 py-5 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {filteredTeachers.map((t, i) => (
                                        <tr key={t.teacherId} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={`https://i.pravatar.cc/150?u=${t.teacherId}`}
                                                        alt="avatar"
                                                        className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 shadow-sm"
                                                    />
                                                    <div>
                                                        <p className="font-bold capitalize line-clamp-1 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{t.user.username}</p>
                                                        <p className="text-xs text-gray-400">{t.user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 font-mono text-sm text-gray-600 dark:text-gray-400">{t.nip || '—'}</td>
                                            <td className="px-8 py-5 font-mono text-sm text-gray-600 dark:text-gray-400">{t.user.phone || '—'}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleToggleStatus(t.teacherId, t.isActive)}
                                                        disabled={loading}
                                                        className={`
      relative inline-flex h-7 w-14 items-center rounded-full 
      transition-all duration-500 ease-in-out focus:outline-none group
      ${t.isActive
                                                                ? 'bg-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]'
                                                                : 'bg-gray-300 dark:bg-gray-700'
                                                            }
      ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
    `}
                                                    >

                                                        {/* Knob (Bulatan) */}
                                                        <div
                                                            className={`
        flex h-5 w-5 items-center justify-center rounded-full bg-white 
        shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-500
        ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
        ${t.isActive ? 'translate-x-8' : 'translate-x-1'}
      `}
                                                        >
                                                            {/* Icon di dalam Knob */}
                                                            {t.isActive ? (
                                                                <FiCheck className="text-emerald-500 size-3 stroke-[4px] animate-in zoom-in duration-300" />
                                                            ) : (
                                                                <FiX className="text-gray-400 size-3 stroke-[4px] animate-in zoom-in duration-300" />
                                                            )}
                                                        </div>

                                                        {/* Background Icon (Opsional: Memberikan indikator di belakang knob) */}
                                                        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                                                            <FiCheck className={`size-3 text-white transition-opacity duration-300 ${t.isActive ? 'opacity-40' : 'opacity-0'}`} />
                                                            <FiX className={`size-3 text-white transition-opacity duration-300 ${!t.isActive ? 'opacity-40' : 'opacity-0'}`} />
                                                        </div>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"><FiEdit2 size={18} /></button>
                                                    <button onClick={() => handleDelete(t.teacherId)} className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"><FiTrash2 size={18} /></button>
                                                    <button onClick={() => handleDelete(t.teacherId)} className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"><TbListDetails size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {filteredTeachers.map((t) => (
                                <div key={t.teacherId} className="relative bg-white dark:bg-gray-900 rounded-4xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${t.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                                    <div className="relative flex flex-col items-center text-center">
                                        <img
                                            src={`https://i.pravatar.cc/150?u=${t.teacherId}`}
                                            className="h-24 w-24 rounded-3xl object-cover ring-4 ring-gray-50 dark:ring-gray-800 shadow-xl mb-4"
                                            alt="profile"
                                        />
                                        <h3 className="text-lg capitalize font-black text-gray-900 dark:text-white line-clamp-1">{t.user.username}</h3>
                                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-1">NIP : {t.nip || 'Tanpa NIP'}</p>

                                        <div className="mt-6 w-full flex gap-3">
                                            <button
                                                onClick={() => handleToggleStatus(t.teacherId, t.isActive)}
                                                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all ${t.isActive ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                                                    }`}
                                            >
                                                {t.isActive ? 'Aktif' : 'Nonaktif'}
                                            </button>
                                            <button onClick={() => handleDelete(t.teacherId)} className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
                                                <FiTrash2 />
                                            </button>
                                            <button onClick={() => handleDelete(t.teacherId)} className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
                                                <TbListDetails />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {!loading && filteredTeachers.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-4xl border-2 border-dashed border-gray-100 dark:border-gray-800">
                    <FiUser size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-medium text-lg">Tidak ada data pengajar ditemukan</p>
                </div>
            )}

            {showAddTeacher && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
                    {/* Overlay Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setShowTeacher(false)}
                    />

                    {/* Modal Content Container */}
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 scrollbar-hide">
                        {/* Tombol Close (Opsional jika di AddStaffPage belum ada) */}
                        <button
                            onClick={() => setShowTeacher(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-rose-500 transition-colors z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}