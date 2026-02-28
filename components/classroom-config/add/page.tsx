"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

// Components
import { CustomSearchSelect } from './CustomSearchSelect';
import { SummarySidebar } from './SummarySidebar';
import {
    HiOutlineChevronLeft,
    HiOutlineMapPin,
    HiOutlineUserGroup,
    HiOutlineXMark,
    HiOutlineAcademicCap,
    HiOutlinePlus,
    HiOutlineUserPlus
} from "react-icons/hi2";

// Redux Thunks & Actions
import { registerClassroomConfig, updateClassroomConfig } from '@/redux/features/classroom-config/thunk';
import { fetchClassrooms } from '@/redux/features/classroom/thunk';
import { fetchTeachers } from '@/redux/features/teacher/thunk';
import { fetchStudents } from '@/redux/features/student/thunks';
import { resetConfigStatus } from '@/redux/features/classroom-config/slice';
import { CreateClassroomConfigPayload } from '@/redux/features/classroom-config/types';
import { MemberSearchSelect } from './MemberSearchSelect';

export default function ClassroomConfigFormSection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const configId = searchParams.get('id');
    const isEdit = !!configId;

    // --- Redux Selectors ---
    const { classrooms } = useAppSelector((state) => state.classroom);
    const { teachers } = useAppSelector((state) => state.teacher);
    const { students } = useAppSelector((state) => state.student);
    const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
    const { profile } = useAppSelector((state) => state.auth);
    const { loading, success, error, configs } = useAppSelector((state) => state.classroomConfig);
    console.log(teachers)

    const schoolId = profile?.activeContext?.schoolId || sessionStorage.getItem("schoolId");

    // --- Form States ---
    const [formData, setFormData] = useState({
        roomLocation: '',
        periodId: '',
        schoolClassroomId: '',
        homeroomTeacherId: ''
    });
    const [teacherSearch, setTeacherSearch] = useState('');
    const [classroomSearch, setClassroomSearch] = useState('');
    const [studentSearch, setStudentSearch] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    // --- 1. Initial Fetch Data ---
    useEffect(() => {
        if (schoolId) {
            dispatch(fetchClassrooms(schoolId));
            dispatch(fetchTeachers(schoolId));
            dispatch(fetchStudents(schoolId));
        }
    }, [dispatch, schoolId]);

    // --- 2. Load Data for Edit Mode & Active Period ---
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
                setSelectedStudentIds(current.classroomStudents?.map((s) => s.student.studentId) || []);
            }
        }
    }, [activePeriod, isEdit, configId, configs]);

    // --- 3. Success & Error Handling ---
    useEffect(() => {
        if (success) {
            toast.success(isEdit ? "Konfigurasi diperbarui!" : "Konfigurasi berhasil diaktifkan!");
            dispatch(resetConfigStatus());
            router.back();
        }
        if (error) {
            toast.error(error);
            dispatch(resetConfigStatus());
        }
    }, [success, error, isEdit, router, dispatch]);

    // --- 4. Memoized Filters ---
    const filteredClassrooms = useMemo(() =>
        classrooms.filter(c => c.name.toLowerCase().includes(classroomSearch.toLowerCase())),
        [classrooms, classroomSearch]);

    const filteredTeachers = useMemo(() =>
        teachers.filter(t =>
            t.user?.username.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            t.nip?.includes(teacherSearch)
        ),
        [teachers, teacherSearch]);

    const filteredStudents = useMemo(() =>
        students.filter(s =>
            (s.user?.username.toLowerCase().includes(studentSearch.toLowerCase()) || s.nis?.includes(studentSearch)) &&
            !selectedStudentIds.includes(s.studentId)
        ),
        [students, studentSearch, selectedStudentIds]);

    // --- 5. Handlers ---
    const handleSelectStudent = (student: any) => {
        setSelectedStudentIds(prev => [...prev, student.studentId]);
        setStudentSearch('');
    };

    const handleRemoveStudent = (id: string) => {
        setSelectedStudentIds(prev => prev.filter(item => item !== id));
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
            schoolId: schoolId as string,
            periodId: formData.periodId || activePeriod.periodId
        };

        if (isEdit && configId) {
            dispatch(updateClassroomConfig({ id: configId, ...payload }));
        } else {
            dispatch(registerClassroomConfig(payload));
        }
    };

    const sectionStyle = "bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6";

    return (
        <div className="animate-in fade-in duration-500 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-5">
                    <button onClick={() => router.back()} className="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all active:scale-95">
                        <HiOutlineChevronLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-md">Manajemen Kelas</span>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{isEdit ? 'Update Konfigurasi' : 'Inisialisasi Kelas'}</h1>
                    </div>
                </div>
                {!isEdit && (
                    <button onClick={() => router.push("./classroom")} className="px-8 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-4xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl">
                        <HiOutlineUserPlus size={18} /> Konfirmasi Buka Kelas
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 text-gray-700 dark:text-white lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Section 1: Identitas Fisik */}
                    <div className={sectionStyle}>
                        <SectionTitle icon={<HiOutlineMapPin size={24} />} title="Identitas Fisik" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CustomSearchSelect
                                label="Ruang Kelas"
                                placeholder="Cari ruangan..."
                                searchValue={classroomSearch}
                                onSearchChange={setClassroomSearch}
                                options={filteredClassrooms}
                                onSelect={(c) => { setFormData({ ...formData, schoolClassroomId: c.schoolClassroomId }); setClassroomSearch(c.name); }}
                                selectedId={formData.schoolClassroomId}
                                idKey="schoolClassroomId"
                                displayKey="name"
                            />
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">Detail Lokasi</label>
                                <input className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white" value={formData.roomLocation} onChange={(e) => setFormData({ ...formData, roomLocation: e.target.value })} placeholder="Gedung, Lantai..." />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Wali Kelas */}
                    <div className={sectionStyle}>
                        <SectionTitle icon={<HiOutlineAcademicCap size={24} />} title="Penanggung Jawab" />
                        <MemberSearchSelect
                            type="teacher"
                            label="Wali Kelas"
                            placeholder="Ketik nama atau NIP..."
                            searchValue={teacherSearch}
                            onSearchChange={setTeacherSearch}
                            options={filteredTeachers}
                            selectedId={formData.homeroomTeacherId}
                            onSelect={(t) => {
                                setFormData({ ...formData, homeroomTeacherId: t.teacherId });
                                setTeacherSearch(t.user?.username);
                            }}
                        />
                    </div>

                    {/* Section 3: Daftar Siswa */}
                    <div className={sectionStyle}>
                        <div className="flex items-center justify-between">
                            <SectionTitle icon={<HiOutlineUserGroup size={24} />} title="Daftar Siswa" />
                            <span className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase">{selectedStudentIds.length} Terpilih</span>
                        </div>

                        <MemberSearchSelect
                            type="student"
                            label="Tambah Siswa"
                            placeholder="Cari nama atau NIS..."
                            searchValue={studentSearch}
                            onSearchChange={setStudentSearch}
                            options={filteredStudents}
                            onSelect={(s) => {
                                handleSelectStudent(s);
                                setStudentSearch(""); // Reset pencarian setelah pilih
                            }}
                        />

                        {/* List Siswa Terpilih */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {selectedStudentIds.map(id => {
                                const s = students.find(item => item.studentId === id);
                                return (
                                    <div key={id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-indigo-100 animate-in zoom-in duration-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-black text-indigo-600 uppercase">{s?.user?.username.charAt(0)}</div>
                                            <div>
                                                <p className="font-bold text-sm dark:text-white">{s?.user?.username}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{s?.nis}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveStudent(id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
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
                    <SummarySidebar
                        activePeriod={activePeriod}
                        teacherName={teacherSearch}
                        studentCount={selectedStudentIds.length}
                        loading={loading}
                        isEdit={isEdit}
                    />
                </div>
            </form>
        </div>
    );
}

const SectionTitle = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">{icon}</div>
        <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">{title}</h3>
    </div>
);