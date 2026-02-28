"use client";

import React, { useState, useEffect } from 'react';
import { resetCalendarStatus } from '@/redux/features/school_academic_calendar/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { FaChevronLeft, FaPlus } from 'react-icons/fa';
import { IoCalendar } from 'react-icons/io5';

// Import komponen internal
import CalendarAddBulk from './addCalender';
import CalendarList from './listCalendar';
import CalendarUpdate from './updateCalendar';
import CalendarDetail from './calendarDetail';

const AcademicCalendarPage = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { success, loading } = useAppSelector((state) => state.schoolCalendarAcademic);

  // Ambil schoolId dari profile auth
  const schoolId = profile?.school?.schoolId || "";

  // State UI
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Reset status sukses untuk menutup form/modal otomatis
  useEffect(() => {
    if (success) {
      setIsAdding(false);
      setEditingItem(null);
      // Reset status agar tidak trigger penutupan berulang
      dispatch(resetCalendarStatus());
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 text-slate-700 dark:text-slate-200 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
              <IoCalendar className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Manajemen Akademik</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Kalender Akademik
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
              Kelola jadwal ujian, hari libur, dan seluruh agenda kegiatan sekolah
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold ml-1">SoSchool</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="group flex items-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
              >
                <FaPlus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                Tambah Agenda
              </button>
            ) : (
              <button
                onClick={() => setIsAdding(false)}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-3.5 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <FaChevronLeft className="w-4 h-4" />
                Kembali
              </button>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative">

          {/* Form Tambah Massal (Accordion Style) */}
          {isAdding && (
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <CalendarAddBulk
                schoolId={schoolId}
                onSuccess={() => {
                  // Status success di Redux akan menangani penutupan via useEffect
                }}
              />
            </div>
          )}

          {/* List Data Agenda dengan Efek Fokus */}
          <div className={`transition-all duration-700 ease-in-out ${isAdding
            ? 'opacity-30 blur-[2px] pointer-events-none scale-[0.98]'
            : 'opacity-100 blur-0 scale-100'
            }`}>
            <CalendarList
              onDetail={(item) => setSelectedItem(item)}
              schoolId={schoolId}
              onEdit={(item) => setEditingItem(item)}
            />
          </div>
        </div>

        {/* Modal Update (Single Item Edit) */}
        {editingItem && (
          <CalendarUpdate
            item={editingItem}
            schoolId={schoolId}
            onClose={() => setEditingItem(null)}
          />
        )}

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <CalendarDetail
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        )}

        {/* Empty State Logic */}
        {!loading && !isAdding && (
          <div className="hidden only:flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-700">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-full shadow-inner mb-6">
              <IoCalendar className="w-16 h-16 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Belum Ada Agenda</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">
              Kalender akademik sekolahmu masih kosong. Klik tombol di atas untuk mulai membuat jadwal.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AcademicCalendarPage;