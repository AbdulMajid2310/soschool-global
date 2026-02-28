"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
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

// Thunks & Actions
import { registerClassroomConfig, updateClassroomConfig } from '@/redux/features/classroom-config/thunk';
import { fetchClassrooms } from '@/redux/features/classroom/thunk';
import { fetchTeachers } from '@/redux/features/teacher/thunk';
import { fetchStudents } from '@/redux/features/student/thunks';
import { resetConfigStatus } from '@/redux/features/classroom-config/slice';
import { CreateClassroomConfigPayload } from '@/redux/features/classroom-config/types';
import { useSchoolId } from '@/hooks/useSchoolId';

export default function ClassroomConfigFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const teacherRef = useRef<HTMLDivElement>(null);
    const studentRef = useRef<HTMLDivElement>(null);
    const classroomRef = useRef<HTMLDivElement>(null);

    const configId = searchParams.get('id');
    const isEdit = !!configId;

    // Redux Selectors
    const schoolId = useSchoolId();
    const { classrooms } = useAppSelector((state) => state.classroom);
    const { teachers } = useAppSelector((state) => state.teacher);
    const { students } = useAppSelector((state) => state.student);
    const { configs, loading, success, error } = useAppSelector((state) => state.classroomConfig);
    const { activePeriod } = useAppSelector((state) => state.schoolPeriod);


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

    // 1. Initial Fetch
    useEffect(() => {
        if (schoolId) {
            dispatch(fetchClassrooms(schoolId));
            dispatch(fetchTeachers(schoolId));
            dispatch(fetchStudents(schoolId));
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (teacherRef.current && !teacherRef.current.contains(event.target as Node)) setShowTeacherDrop(false);
            if (studentRef.current && !studentRef.current.contains(event.target as Node)) setShowStudentDrop(false);
            if (classroomRef.current && !classroomRef.current.contains(event.target as Node)) setShowClassroomDrop(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dispatch, schoolId]);

    // 2. Sync Period & Load Data for Edit Mode
    useEffect(() => {
        if (activePeriod && !isEdit) {
            setFormData(prev => ({ ...prev, periodId: activePeriod.periodId }));
        }

        if (isEdit && configs.length > 0 && configId) {
            const current = configs.find(c => c.classroomConfigId === configId);
            if (current) {
                setFormData({
                    roomLocation: current.roomLocation || '',
                    periodId: current.period?.periodId || '',
                    schoolClassroomId: current.classroom?.schoolClassroomId || '',
                    homeroomTeacherId: current.homeroomTeacher?.teacherId || '',
                });
                setTeacherSearch(current.homeroomTeacher?.user?.username || '');
                setClassroomSearch(current.classroom?.name || '');
                setSelectedStudentIds(current.classroomStudents?.map((s: any) => s.studentId) || []);
            }
        }
    }, [activePeriod, isEdit, configId, configs]);

    // 3. Success & Error Handling
    useEffect(() => {
        if (success) {
            toast.success(isEdit ? "Konfigurasi diperbarui!" : "Konfigurasi berhasil diaktifkan!");
            dispatch(resetConfigStatus());
            router.push('/staff/akademik/kelas');
        }
        if (error) {
            toast.error(error);
            dispatch(resetConfigStatus());
        }
    }, [success, error, isEdit, router, dispatch]);

    // Filters
    const filteredTeachers = useMemo(() => {
        if (!teacherSearch) return [];
        return teachers.filter(t =>
            t.user?.username.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            t.nip?.includes(teacherSearch)
        );
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

    // Handlers
    const handleSelectClassroom = (classroom: any) => {
        setFormData(prev => ({ ...prev, schoolClassroomId: classroom.schoolClassroomId }));
        setClassroomSearch(classroom.name);
        setShowClassroomDrop(false);
    };

    const handleSelectTeacher = (teacher: any) => {
        setFormData(prev => ({ ...prev, homeroomTeacherId: teacher.teacherId }));
        setTeacherSearch(teacher.user?.username);
        setShowTeacherDrop(false);
    };

    const handleSelectStudent = (student: any) => {
        setSelectedStudentIds(prev => [...prev, student.studentId]);
        setStudentSearch('');
        setShowStudentDrop(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!schoolId || !activePeriod) return toast.error("Informasi Sekolah/Periode tidak ditemukan");
        if (!formData.schoolClassroomId) return toast.error("Pilih ruang kelas!");
        if (!formData.homeroomTeacherId) return toast.error("Pilih wali kelas!");
        if (selectedStudentIds.length === 0) return toast.error("Minimal pilih satu siswa!");

        const payload: CreateClassroomConfigPayload = {
            ...formData,
            studentIds: selectedStudentIds,
            schoolId,
            periodId: formData.periodId || activePeriod.periodId
        };

        if (isEdit && configId) {
            dispatch(updateClassroomConfig({ id: configId, ...payload }));
        } else {
            dispatch(registerClassroomConfig(payload));
        }
    };

    // V4 Classes
    const sectionClass = "bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6";
    const labelClass = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1";
    const inputClass = "w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white";

    return (
        <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-500 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <HiOutlineChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic">
                            {isEdit ? 'Update Konfigurasi' : 'Buka Kelas Baru'}
                        </h1>
                        <p className="text-slate-500 font-medium text-sm italic">Hubungkan ruangan, wali kelas, dan siswa</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Identitas Fisik */}
                    <div className={sectionClass}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                <HiOutlineMapPin size={24} />
                            </div>
                            <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Identitas Fisik</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative" ref={classroomRef}>
                                <label className={labelClass}>Ruang Kelas</label>
                                <input
                                    required
                                    placeholder="Cari ruangan..."
                                    className={inputClass}
                                    value={classroomSearch}
                                    onFocus={() => setShowClassroomDrop(true)}
                                    onChange={(e) => {
                                        setClassroomSearch(e.target.value);
                                        setShowClassroomDrop(true);
                                    }}
                                />
                                {showClassroomDrop && (
                                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-60 overflow-y-auto">
                                        {filteredClassrooms.map((c) => (
                                            <div key={c.schoolClassroomId} onClick={() => handleSelectClassroom(c)} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center">
                                                <p className="font-bold text-sm dark:text-white">{c.name}</p>
                                                {formData.schoolClassroomId === c.schoolClassroomId && <HiOutlineCheckCircle className="text-indigo-600" size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Detail Lokasi</label>
                                <input
                                    placeholder="Gedung, Lantai, dll..."
                                    value={formData.roomLocation}
                                    onChange={(e) => setFormData(p => ({ ...p, roomLocation: e.target.value }))}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Wali Kelas */}
                    <div className={sectionClass} ref={teacherRef}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                <HiOutlineAcademicCap size={24} />
                            </div>
                            <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Penanggung Jawab</h3>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Wali Kelas</label>
                            <div className="relative">
                                <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Ketik nama atau NIP..."
                                    value={teacherSearch}
                                    onFocus={() => setShowTeacherDrop(true)}
                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                    className={`${inputClass} pl-14`}
                                />
                            </div>
                            {showTeacherDrop && filteredTeachers.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl">
                                    {filteredTeachers.map(t => (
                                        <div key={t.teacherId} onClick={() => handleSelectTeacher(t)} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-sm dark:text-white">{t.user?.username}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{t.nip}</p>
                                            </div>
                                            {formData.homeroomTeacherId === t.teacherId && <HiOutlineCheckCircle className="text-indigo-600" size={20} />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Daftar Siswa */}
                    <div className={sectionClass} ref={studentRef}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                                    <HiOutlineUserGroup size={24} />
                                </div>
                                <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">Daftar Siswa</h3>
                            </div>
                            <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase">
                                {selectedStudentIds.length} Terpilih
                            </span>
                        </div>

                        <div className="relative">
                            <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                placeholder="Cari nama siswa untuk ditambahkan..."
                                value={studentSearch}
                                onFocus={() => setShowStudentDrop(true)}
                                onChange={(e) => setStudentSearch(e.target.value)}
                                className={`${inputClass} pl-14`}
                            />
                            {showStudentDrop && filteredStudents.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-60 overflow-y-auto">
                                    {filteredStudents.map(s => (
                                        <div key={s.studentId} onClick={() => handleSelectStudent(s)} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center group">
                                            <div>
                                                <p className="font-bold text-sm dark:text-white group-hover:text-indigo-600">{s.user?.username}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{s.nis}</p>
                                            </div>
                                            <HiOutlinePlus size={16} className="text-slate-300 group-hover:text-indigo-600" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedStudentIds.map(id => {
                                const s = students.find(item => item.studentId === id);
                                return (
                                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-indigo-100 animate-in zoom-in">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-black text-indigo-600 shadow-sm uppercase">{s?.user?.username.charAt(0)}</div>
                                            <div>
                                                <p className="font-bold text-sm dark:text-white">{s?.user?.username}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{s?.nis}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setSelectedStudentIds(p => p.filter(i => i !== id))} className="p-2 text-slate-300 hover:text-rose-500">
                                            <HiOutlineXMark size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Sticky Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 dark:bg-indigo-700 p-8 rounded-4xl text-white sticky top-10 shadow-2xl">
                        <h4 className="font-black uppercase tracking-widest text-[10px] text-indigo-300 mb-8 italic">Ringkasan Konfigurasi</h4>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                                <HiOutlineCalendarDays size={20} />
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60">Periode Aktif</p>
                                    <p className="text-sm font-bold">{activePeriod ? `${activePeriod.academicYear} - ${activePeriod.semester}` : 'Loading...'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                                <HiOutlineAcademicCap size={20} />
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60">Wali Kelas</p>
                                    <p className="text-sm font-bold truncate">{teacherSearch || 'Belum dipilih'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                                <HiOutlineUserGroup size={20} />
                                <div>
                                    <p className="text-[10px] font-black uppercase opacity-60">Total Siswa</p>
                                    <p className="text-sm font-bold">{selectedStudentIds.length} Siswa Terdaftar</p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-white text-slate-900 dark:text-indigo-700 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl"
                        >
                            {loading ? "Memproses..." : isEdit ? "Simpan Perubahan" : "Aktifkan Kelas"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}