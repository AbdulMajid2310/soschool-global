"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSubjects } from '@/redux/features/school_subject/thunks';
import { fetchClassrooms } from '@/redux/features/classroom/thunk';
import { HiOutlinePlus, HiOutlineSearch } from 'react-icons/hi';
import SubjectList from './subject_list_school';
import CreateSubjectModal from './create_subject_school';
import UpdateSubjectModal from './update_subject_school';
import { Subject } from '@/redux/features/school_subject/types';
import { useSchoolId } from '@/hooks/useSchoolId';

// Import komponen hasil split

const SubjectPage = () => {
    const dispatch = useAppDispatch();
    const schoolId = useSchoolId();


    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<Subject>();

    useEffect(() => {
        if (schoolId) {
            dispatch(fetchClassrooms(schoolId));
            dispatch(fetchSubjects(schoolId));
        }
    }, [dispatch, schoolId]);

    const handleEditOpen = (subject: Subject) => {
        setSelectedSubject(subject);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight italic">
                            So<span className="text-blue-600">School</span> Subject
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Kelola kurikulum cerdas berbasis AI.</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                    >
                        <HiOutlinePlus className="text-xl" />
                        <span>Tambah Mapel</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari mapel atau kode..."
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* List & Delete Area */}
                <SubjectList
                    searchTerm={searchTerm}
                    onEdit={handleEditOpen}
                />
            </div>

            {/* Create Modal */}
            <CreateSubjectModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            {/* Update Modal */}
            <UpdateSubjectModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                subjectData={selectedSubject}
            />
        </div>
    );
};

export default SubjectPage;