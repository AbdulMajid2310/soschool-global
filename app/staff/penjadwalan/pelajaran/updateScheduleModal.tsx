"use client";

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateSchedule } from '@/redux/features/school_schedule/thunks';
import { SchoolSchedule } from '@/redux/features/school_schedule/types';

interface UpdateProps {
    isOpen: boolean;
    onClose: () => void;
    data: SchoolSchedule | null; // Data jadwal yang dipilih untuk di-edit
}

export default function UpdateScheduleModal({ isOpen, onClose, data }: UpdateProps) {
    const dispatch = useAppDispatch();

    // 1. Ambil data master dari Redux
    const { isSubmitting } = useAppSelector((state) => state.schoolSchedule);
    const { subjects } = useAppSelector((state) => state.schoolSubject);
    const { teachers } = useAppSelector((state) => state.teacher);
    const { configs } = useAppSelector((state) => state.classroomConfig);

    // 2. State Internal Form
    const [formData, setFormData] = useState({
        day: '',
        startTime: '',
        endTime: '',
        subjectId: '',
        teacherId: '',
        classroomConfigId: ''
    });

    // 3. Logic Sync: Masukkan data lama ke dalam form saat modal dibuka
    useEffect(() => {
        if (data && isOpen) {
            setFormData({
                day: data.day,
                startTime: data.startTime,
                endTime: data.endTime,
                subjectId: data.subject?.subjectId || '',
                teacherId: data.teacher?.teacherId || '',
                classroomConfigId: data.classroomConfig?.classroomConfigId || ''
            });
        }
    }, [data, isOpen]);

    // 4. Logic Submit Update
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data) return;

        const result = await dispatch(updateSchedule({
            ...formData,
            scheduleId: data.scheduleId
        }));

        if (updateSchedule.fulfilled.match(result)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300">

                {/* Header Modal */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-amber-50/50 dark:bg-amber-900/10">
                    <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-amber-600">Perbarui Jadwal.</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edit detail slot pengajaran</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md hover:text-red-500 transition-colors font-bold"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    {/* Pilih Hari */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Hari Kerja</label>
                        <select
                            value={formData.day}
                            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none outline-none ring-2 ring-transparent focus:ring-amber-500 font-bold transition-all"
                        >
                            {['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'].map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    {/* Jam Pelajaran */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jam Mulai</label>
                            <input
                                type="time"
                                required
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Jam Selesai</label>
                            <input
                                type="time"
                                required
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Pilih Mata Pelajaran */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Mata Pelajaran</label>
                        <select
                            required
                            value={formData.subjectId}
                            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        >
                            <option value="">-- Pilih Pelajaran --</option>
                            {subjects.map(s => <option key={s.subjectId} value={s.subjectId}>{s.name} ({s.code})</option>)}
                        </select>
                    </div>

                    {/* Pilih Guru */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Guru Pengajar</label>
                        <select
                            required
                            value={formData.teacherId}
                            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        >
                            <option value="">-- Pilih Guru --</option>
                            {teachers.map(t => <option key={t.teacherId} value={t.teacherId}>{t.user?.username || t.user?.username}</option>)}
                        </select>
                    </div>

                    {/* Pilih Ruang Kelas */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Ruangan / Kelas</label>
                        <select
                            required
                            value={formData.classroomConfigId}
                            onChange={(e) => setFormData({ ...formData, classroomConfigId: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        >
                            <option value="">-- Pilih Ruangan --</option>
                            {configs.map(c => <option key={c.classroomConfigId} value={c.classroomConfigId}>{c.classroom?.name} - {c.period?.academicYear}</option>)}
                        </select>
                    </div>

                    {/* Tombol Submit Update */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 bg-slate-900 dark:bg-amber-600 text-white py-5 rounded-3xl font-black text-xs tracking-[0.2em] hover:opacity-90 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    >
                        {isSubmitting ? 'Memperbarui...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </div>
    );
}