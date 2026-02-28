"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import {
    HiOutlineChevronLeft,
    HiOutlineUserGroup,
    HiOutlineMapPin,
    HiOutlineAcademicCap,
    HiOutlineCalendarDays,
    HiOutlineCheckCircle,
    HiOutlineMagnifyingGlass,
    HiOutlineXMark,
    HiOutlinePlus
} from "react-icons/hi2";
import toast from 'react-hot-toast';

// Thunks & Utils
import { updateClassroomConfig, fetchClassroomConfigById } from '@/redux/features/classroom-config/thunk';
import { fetchClassrooms } from '@/redux/features/classroom/thunk';
import { fetchTeachers } from '@/redux/features/teacher/thunk';
import { fetchStudents } from '@/redux/features/student/thunks';
import { resetConfigStatus } from '@/redux/features/classroom-config/slice';
import { confirmActionToast } from '@/components/toast/confirmActionToast';
import { useSchoolId } from '@/hooks/useSchoolId';

export default function UpdateClassroomConfigPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Refs
    const teacherRef = useRef<HTMLDivElement>(null);
    const studentRef = useRef<HTMLDivElement>(null);
    const classroomRef = useRef<HTMLDivElement>(null);

    // Redux Selectors
    const { detail, loading, success, error } = useAppSelector((state) => state.classroomConfig);
    const { classrooms } = useAppSelector((state) => state.classroom);
    const { teachers } = useAppSelector((state) => state.teacher);
    const { students } = useAppSelector((state) => state.student);
    const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

    // Identitas dari State & Session
    const schoolId = useSchoolId();
    const [configId, setConfigId] = useState<string | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        roomLocation: '',
        periodId: '',
        schoolClassroomId: '',
        homeroomTeacherId: '',
    });

    const [teacherSearch, setTeacherSearch] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [classroomSearch, setClassroomSearch] = useState('');
    const [showTeacherDrop, setShowTeacherDrop] = useState(false);
    const [showStudentDrop, setShowStudentDrop] = useState(false);
    const [showClassroomDrop, setShowClassroomDrop] = useState(false);
    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    // 1. Ambil configId dari sessionStorage
    useEffect(() => {
        const id = sessionStorage.getItem("classroomConfigId");
        if (id) {
            setConfigId(id);
        } else {
            toast.error("ID tidak ditemukan");
            router.push('/staff/akademik/kelas');
        }
    }, [router]);

    // 2. Fetch Detail & Master Data
    useEffect(() => {
        if (configId && schoolId) {
            dispatch(fetchClassroomConfigById({ id: configId, schoolId }));
            dispatch(fetchClassrooms(schoolId));
            dispatch(fetchTeachers(schoolId));
            dispatch(fetchStudents(schoolId));
        }
    }, [dispatch, configId, schoolId]);

    // 3. Hydrate Form saat 'detail' tersedia
    useEffect(() => {
        if (detail && detail.classroomConfigId === configId) {
            setFormData({
                roomLocation: detail.roomLocation || '',
                periodId: detail.period?.periodId || '',
                schoolClassroomId: detail.classroom?.schoolClassroomId || '',
                homeroomTeacherId: detail.homeroomTeacher?.teacherId || '',
            });
            setTeacherSearch(detail.homeroomTeacher?.user?.username || '');
            setClassroomSearch(detail.classroom?.name || '');
            setSelectedStudentIds(detail.classroomStudents?.map((s: any) => s.studentId) || []);
        }
    }, [detail, configId]);

    // 4. Success/Error Handling
    useEffect(() => {
        if (success) {
            toast.success("Konfigurasi diperbarui!");
            sessionStorage.removeItem("classroomConfigId");
            dispatch(resetConfigStatus());
            router.push('/staff/akademik/kelas');
        }
        if (error) {
            toast.error(error);
            dispatch(resetConfigStatus());
        }
    }, [success, error, router, dispatch]);

    // --- Memoized Filters ---
    const filteredTeachers = useMemo(() => {
        if (!teacherSearch) return [];
        return teachers.filter(t => t.user?.username.toLowerCase().includes(teacherSearch.toLowerCase()));
    }, [teachers, teacherSearch]);

    const filteredStudents = useMemo(() => {
        if (!studentSearch) return [];
        return students.filter(s =>
            (s.user?.username.toLowerCase().includes(studentSearch.toLowerCase()) || s.nis?.includes(studentSearch)) &&
            !selectedStudentIds.includes(s.studentId)
        );
    }, [students, studentSearch, selectedStudentIds]);

    const filteredClassrooms = useMemo(() => {
        return classrooms.filter(c => c.name.toLowerCase().includes(classroomSearch.toLowerCase()));
    }, [classrooms, classroomSearch]);

    // --- Submit Handler ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!schoolId || !configId) return;

        confirmActionToast({
            title: 'Simpan Perubahan?',
            message: 'Konfigurasi kelas ini akan diperbarui untuk periode ini.',
            confirmText: 'Ya, Update',
            variant: 'warning',
            onConfirm: async () => {
                // Kita bungkus sesuai signature thunk: { id, ...payload }
                await dispatch(updateClassroomConfig({
                    id: configId, // id akan dipisah oleh thunk untuk URL
                    roomLocation: formData.roomLocation,
                    periodId: formData.periodId || activePeriod?.periodId || '',
                    schoolClassroomId: formData.schoolClassroomId,
                    homeroomTeacherId: formData.homeroomTeacherId,
                    studentIds: selectedStudentIds,
                    schoolId: schoolId,
                })).unwrap();
            }
        });
    };

    // V4 Classes
    const sectionClass = "bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6";
    const labelClass = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1";
    const inputClass = "w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all dark:text-white";

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-5 mb-10">
                <button onClick={() => router.back()} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-slate-400 hover:text-amber-600 transition-colors">
                    <HiOutlineChevronLeft size={24} />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Edit Konfigurasi</h1>
                    <p className="text-slate-500 font-medium text-sm  italic">Update wali kelas dan daftar siswa</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Ruangan Section */}
                    <div className={sectionClass}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                                <HiOutlineMapPin size={24} />
                            </div>
                            <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Ruangan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative" ref={classroomRef}>
                                <label className={labelClass}>Nama Ruang</label>
                                <input
                                    required
                                    className={inputClass}
                                    value={classroomSearch}
                                    onFocus={() => setShowClassroomDrop(true)}
                                    onChange={(e) => { setClassroomSearch(e.target.value); setShowClassroomDrop(true); }}
                                />
                                {showClassroomDrop && (
                                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar">
                                        {filteredClassrooms.map((c) => (
                                            <div key={c.schoolClassroomId} onClick={() => { setFormData(p => ({ ...p, schoolClassroomId: c.schoolClassroomId })); setClassroomSearch(c.name); setShowClassroomDrop(false); }} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center">
                                                <p className="font-bold text-sm dark:text-white">{c.name}</p>
                                                {formData.schoolClassroomId === c.schoolClassroomId && <HiOutlineCheckCircle className="text-amber-600" size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Lokasi Fisik</label>
                                <input
                                    value={formData.roomLocation}
                                    onChange={(e) => setFormData(p => ({ ...p, roomLocation: e.target.value }))}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Wali Kelas Section */}
                    <div className={sectionClass} ref={teacherRef}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                                <HiOutlineAcademicCap size={24} />
                            </div>
                            <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Penanggung Jawab</h3>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Cari Wali Kelas</label>
                            <input
                                value={teacherSearch}
                                onFocus={() => setShowTeacherDrop(true)}
                                onChange={(e) => setTeacherSearch(e.target.value)}
                                className={inputClass}
                            />
                            {showTeacherDrop && filteredTeachers.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
                                    {filteredTeachers.map(t => (
                                        <div key={t.teacherId} onClick={() => { setFormData(p => ({ ...p, homeroomTeacherId: t.teacherId })); setTeacherSearch(t.user?.username); setShowTeacherDrop(false); }} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center">
                                            <p className="font-bold text-sm dark:text-white">{t.user?.username}</p>
                                            {formData.homeroomTeacherId === t.teacherId && <HiOutlineCheckCircle className="text-amber-600" size={20} />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Daftar Siswa Section */}
                    <div className={sectionClass} ref={studentRef}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Anggota Kelas ({selectedStudentIds.length})</h3>
                        </div>
                        <div className="relative mb-6">
                            <input
                                placeholder="Ketik nama siswa untuk menambah..."
                                value={studentSearch}
                                onFocus={() => setShowStudentDrop(true)}
                                onChange={(e) => setStudentSearch(e.target.value)}
                                className={inputClass}
                            />
                            {showStudentDrop && filteredStudents.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-48 overflow-y-auto custom-scrollbar">
                                    {filteredStudents.map(s => (
                                        <div key={s.studentId} onClick={() => { setSelectedStudentIds(p => [...p, s.studentId]); setStudentSearch(''); }} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center group">
                                            <p className="text-sm font-bold dark:text-white group-hover:text-amber-600">{s.user?.username}</p>
                                            <HiOutlinePlus size={16} className="text-amber-600" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedStudentIds.map(id => {
                                const s = students.find(item => item.studentId === id);
                                return (
                                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-amber-200 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center font-black text-[10px] text-amber-600 shadow-sm">{s?.user?.username.charAt(0)}</div>
                                            <p className="text-sm font-bold dark:text-white">{s?.user?.username}</p>
                                        </div>
                                        <button type="button" onClick={() => setSelectedStudentIds(p => p.filter(i => i !== id))} className="text-slate-300 hover:text-rose-500 transition-colors">
                                            <HiOutlineXMark size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Sticky */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-4xl text-white sticky top-10 shadow-2xl border border-slate-800">
                        <h4 className="font-black uppercase tracking-widest text-[10px] text-amber-500 mb-8 italic">Informasi Periode</h4>
                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/10">
                                <HiOutlineCalendarDays className="text-amber-500" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60 text-amber-200">Tahun Ajaran</p>
                                    <p className="text-sm font-bold">{activePeriod?.academicYear || 'Memuat...'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/10">
                                <HiOutlineUserGroup className="text-amber-500" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60 text-amber-200">Kapasitas Saat Ini</p>
                                    <p className="text-sm font-bold">{selectedStudentIds.length} Siswa</p>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-amber-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-amber-700 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-amber-900/20"
                        >
                            {loading ? "Menyimpan..." : "Update Konfigurasi"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}