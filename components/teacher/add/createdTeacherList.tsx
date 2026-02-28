"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
    HiOutlineMagnifyingGlass,
    HiOutlineCheck,
    HiOutlineFingerPrint,
    HiOutlinePaperAirplane,
    HiOutlinePlus,
    HiOutlineInbox,
    HiOutlineChevronDown,
    HiOutlineXMark
} from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFilteredUsers } from "@/redux/features/user/thunk";
import { api } from "@/lib/axiosInstance";

type IdType = 'nip' | 'nuptk' | 'niy';

export default function CreatedTeacherList() {
    const dispatch = useAppDispatch();
    const { filteredUsers, loading } = useAppSelector((state) => state.users);
    const { profile } = useAppSelector((state) => state.auth);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [teacherData, setTeacherData] = useState<Record<string, { type: IdType, value: string }>>({});
    const [activePopup, setActivePopup] = useState<string | null>(null);

    const schoolId = useMemo(() => {
        const fromProfile = profile?.activeContext?.schoolId;
        const fromSession = typeof window !== "undefined" ? sessionStorage.getItem("schoolId") : null;
        return (fromProfile || fromSession || "") as string;
    }, [profile]);

    useEffect(() => {
        if (schoolId) dispatch(getFilteredUsers({ schoolId, role: 'teacher', exists: false }));
    }, [dispatch, schoolId]);

    const toggleUser = (userId: string) => {
        if (selectedIds.includes(userId)) {
            setSelectedIds(prev => prev.filter(id => id !== userId));
            setActivePopup(null);
        } else {
            setSelectedIds(prev => [...prev, userId]);
            if (!teacherData[userId]) {
                setTeacherData(d => ({ ...d, [userId]: { type: 'nip', value: "" } }));
            }
            setActivePopup(userId); // Langsung buka popup saat dipilih
        }
    };

    const updateData = (id: string, field: 'type' | 'value', val: string) => {
        setTeacherData(prev => ({ ...prev, [id]: { ...prev[id], [field]: val } }));
    };

    const displayedUsers = useMemo(() => {
        if (!filteredUsers) return [];
        return filteredUsers.filter(u =>
            u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, filteredUsers]);

    // Tambahkan state loading di bagian atas component
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        // 1. Validasi Input
        const isAnyEmpty = selectedIds.some(id => !teacherData[id]?.value.trim());
        if (isAnyEmpty) return toast.error("Semua NIP/NUPTK harus diisi!");

        // 2. Persiapkan Payload
        const payload = selectedIds.map(id => ({
            userId: id,
            type: teacherData[id].type,
            value: teacherData[id].value
        }));

        // 3. Eksekusi Kirim ke Backend
        setIsSubmitting(true);
        const toastId = toast.loading("Sedang mendaftarkan guru...");

        try {
            // Asumsi base URL sudah diatur di axios interceptor
            // Endpoint: POST /school-teachers/bulk/:schoolId
            const response = await api.post(`/school-teachers/bulk/${schoolId}`, {
                teachers: payload
            });

            if (response.status === 201 || response.status === 200) {
                toast.success(`${selectedIds.length} Guru berhasil didaftarkan ke sekolah!`, { id: toastId });

                // 4. Reset State Lokal
                setSelectedIds([]);
                setTeacherData({});
                setActivePopup(null);

                // 5. Refresh Data List (agar guru yang sudah terdaftar hilang dari list "Tersedia")
                dispatch(getFilteredUsers({ schoolId, role: 'teacher', exists: false }));
            }
        } catch (error: any) {
            console.error("Error bulk create teacher:", error);
            const errorMessage = error.response?.data?.message || "Gagal mendaftarkan guru";
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full text-gray-700 dark:text-white space-y-6 pb-40 px-4">
            {/* SEARCH */}
            <div className="relative group">
                <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Cari user di database SoSchool..."
                    className="w-full pl-14 pr-6 py-5 border border-slate-100 dark:border-slate-800 rounded-4xl text-xs font-bold outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* LIST */}
            <div className="grid grid-cols-4 gap-4">
                {displayedUsers.map((user) => {
                    const isSelected = selectedIds.includes(user.userId);
                    const isOpen = activePopup === user.userId;
                    const data = teacherData[user.userId] || { type: 'nip', value: '' };

                    return (
                        <div key={user.userId} className="relative">
                            <div className={`flex flex-col items-center justify-between p-3 transition-all rounded-3xl border-2 ${isSelected ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-lg" : "bg-slate-50/50 dark:bg-slate-800/20 border-transparent hover:bg-white"
                                }`}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="absolute right-2 top-2">

                                        <button
                                            onClick={() => toggleUser(user.userId)}
                                            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-300 border hover:border-indigo-300'
                                                }`}
                                        >
                                            {isSelected ? <HiOutlineCheck size={20} strokeWidth={3} /> : <HiOutlinePlus size={18} />}
                                        </button>
                                    </div>

                                    <img src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} className="w-24 h-24 rounded-full object-cover border border-slate-100" />

                                    <div className="min-w-0">
                                        <h4 className="text-lg font-black uppercase italic truncate dark:text-white">{user.username}</h4>
                                        <p className="text-sm font-medium text-slate-400 leading-none">ID : {user.registrationNumber}</p>
                                    </div>
                                    {isSelected && (
                                        <button
                                            onClick={() => setActivePopup(isOpen ? null : user.userId)}
                                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase italic text-indigo-600 hover:bg-indigo-50 transition-colors"
                                        >
                                            {data.value ? data.value : `Set ${data.type}`}
                                            <HiOutlineChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>


                            </div>

                            {/* DROPDOWN POPUP */}
                            {isOpen && (
                                <div className="fixed inset-0 right-0 flex justify-center items-center z-40 p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
                                    <div className=" w-xl p-4 sm:p-8  bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl">

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black uppercase italic text-slate-400">Data Identitas</span>
                                            <button onClick={() => setActivePopup(null)}><HiOutlineXMark size={16} className="text-slate-400" /></button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                                {(['nip', 'nuptk', 'niy'] as IdType[]).map(t => (
                                                    <button
                                                        key={t}
                                                        onClick={() => updateData(user.userId, 'type', t)}
                                                        className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase italic transition-all ${data.type === t ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="relative">
                                                <HiOutlineFingerPrint className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder={`Masukkan nomor ${data.type.toUpperCase()}...`}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                    value={data.value}
                                                    onChange={(e) => updateData(user.userId, 'value', e.target.value)}
                                                />
                                            </div>

                                            <button
                                                onClick={() => setActivePopup(null)}
                                                className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase italic shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                                            >
                                                Selesai
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* FLOATING CONFIRMATION BAR */}
            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50">
                    <div className="bg-slate-900 p-3 pl-8 rounded-4xl flex items-center justify-between border border-white/10 shadow-2xl">
                        <div className="flex flex-col">
                            <span className="text-white text-[12px] font-black italic uppercase leading-none">Assign Guru</span>
                            <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-widest">{selectedIds.length} Terpilih</span>
                        </div>
                        <button onClick={handleSave} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-4xl text-[10px] font-black uppercase italic hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                            <HiOutlinePaperAirplane size={18} className="rotate-45" />
                            Simpan ke SoSchool
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}