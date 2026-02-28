"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiBriefcase, FiCheck, FiX, FiPhone, FiCreditCard } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteStaff, fetchStaffs, toggleStaffStatus } from "@/redux/features/staff/thunks";
import StaffStats from "./staffStats";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import AddStaffPage from "./add/page";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function DataStaffPage() {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState("");

    const { staffs, loading } = useAppSelector((state) => state.schoolStaff);
    const schoolId = useSchoolId();
    const [showAddStaff, setShowAddStaff] = useState(false)

    useEffect(() => {
        if (schoolId) dispatch(fetchStaffs(schoolId));
    }, [dispatch, schoolId]);

    const handleDelete = (staffId: string) => {
        confirmActionToast({
            title: "Hapus Staff",
            message: "Apakah Anda yakin ingin menghapus data staff ini secara permanen?",
            confirmText: "Ya, Hapus",
            variant: "danger",
            onConfirm: async () => {
                await dispatch(deleteStaff({ staffId, schoolId: schoolId! })).unwrap();
                toast.success("Data staff berhasil dihapus");
            },
        });
    };

    const handleToggleStatus = (staffId: string, currentStatus: boolean) => {
        const actionText = !currentStatus ? 'Aktifkan' : 'Nonaktifkan';
        confirmActionToast({
            title: `${actionText} Staff`,
            message: `Apakah Anda yakin ingin ${actionText.toLowerCase()} akses staff ini?`,
            confirmText: `Ya, ${actionText}`,
            variant: 'warning',
            onConfirm: async () => {
                await dispatch(toggleStaffStatus({
                    staffId,
                    schoolId: schoolId!,
                    isActive: !currentStatus
                })).unwrap();

                toast.success(`Staff berhasil di ${actionText}`);
            },
        });
    };

    const filteredStaffs = staffs.filter((s) =>
        s.user.username.toLowerCase().includes(query.toLowerCase()) ||
        (s.nip && s.nip.includes(query)) ||
        s.position.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="p-4  space-y-10 min-h-screen font-sans">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
                        Personalia Staff
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-bold flex items-center gap-2">
                        <span className="w-8 h-1 bg-indigo-500 inline-block"></span>
                        Manajemen operasional non-akademik SoSchool
                    </p>
                </div>
                <button
                    onClick={() => setShowAddStaff(true)}
                    className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
                >
                    <FiPlus className="stroke-[4px] size-4" />
                    <span>Tambah Staff Baru</span>
                </button>
            </div>

            <StaffStats />

            <div className="sticky top-4 z-10">
                <div className="relative group">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 size-5 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari berdasarkan nama, NIP, atau jabatan staff..."
                        className="w-full pl-16 pr-6 py-5 bg-white dark:bg-gray-900 border-none rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none focus:ring-4 focus:ring-indigo-500/10 transition-all text-sm font-bold placeholder:text-slate-400"
                    />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-72 bg-white dark:bg-gray-900 rounded-[2.5rem] animate-pulse border border-gray-100 dark:border-gray-800" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredStaffs.map((s) => (
                        <div
                            key={s.staffId}
                            className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all duration-500 overflow-hidden"
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative mb-6">
                                    <div className="h-24 w-24 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-3xl font-black text-indigo-600 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {s.user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-xl border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-lg ${s.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                        {s.isActive ? <FiCheck className="text-white size-3 stroke-[4px]" /> : <FiX className="text-white size-3 stroke-[4px]" />}
                                    </div>
                                </div>

                                <div className="text-center space-y-1 mb-8">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white truncate max-w-50 italic uppercase tracking-tighter">
                                        {s.user.username}
                                    </h3>
                                    <div className="inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        {s.position}
                                    </div>
                                </div>

                                <div className="w-full space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                        <FiCreditCard className="size-4 shrink-0" />
                                        <span className="text-xs font-bold font-mono">{s.nip || s.employeeId || 'ID BELUM DISET'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                        <FiPhone className="size-4 shrink-0" />
                                        <span className="text-xs font-bold">{s.user.phone || 'NO TELEPON —'}</span>
                                    </div>
                                </div>

                                <div className="w-full grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleToggleStatus(s.staffId, s.isActive)}
                                        title={s.isActive ? "Nonaktifkan" : "Aktifkan"}
                                        className={`flex items-center justify-center p-3 rounded-2xl transition-all ${s.isActive
                                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                                            : 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white'
                                            }`}
                                    >
                                        {s.isActive ? <FiCheck size={18} strokeWidth={3} /> : <FiX size={18} strokeWidth={3} />}
                                    </button>
                                    <button className="flex items-center justify-center p-3 bg-slate-50 dark:bg-gray-800 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                                        <FiEdit2 size={18} strokeWidth={3} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s.staffId)}
                                        className="flex items-center justify-center p-3 bg-slate-50 dark:bg-gray-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                                    >
                                        <FiTrash2 size={18} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredStaffs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-gray-900 rounded-[3rem] border-4 border-dashed border-gray-50 dark:border-gray-800">
                    <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-full mb-6">
                        <FiBriefcase size={60} className="text-gray-200 dark:text-gray-700" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-400 italic uppercase tracking-widest">Data Kosong</h3>
                    <p className="text-gray-400 font-bold mt-2">Belum ada staff yang terdaftar di sekolah ini</p>
                </div>
            )}

            {showAddStaff && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
                    {/* Overlay Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setShowAddStaff(false)}
                    />

                    {/* Modal Content Container */}
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 scrollbar-hide">
                        {/* Tombol Close (Opsional jika di AddStaffPage belum ada) */}
                        <button
                            onClick={() => setShowAddStaff(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-rose-500 transition-colors z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <AddStaffPage />
                    </div>
                </div>
            )}
        </div>
    );
}