import React from 'react';
import {
    FaCalendarDay,
    FaClock,
    FaTag,
    FaAlignLeft,
    FaTimes,
    FaInfoCircle,
    FaCalendarCheck
} from 'react-icons/fa';

interface CalendarDetailProps {
    item: any;
    onClose: () => void;
}

const CalendarDetail = ({ item, onClose }: CalendarDetailProps) => {
    if (!item) return null;

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden max-w-2xl w-full mx-auto shadow-2xl">
            {/* --- HEADER WITH GRADIENT --- */}
            <div className="relative h-32 sm:h-40 bg-linear-to-br from-indigo-600 to-violet-700 p-6 sm:p-8 flex items-end">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl transition-all"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                        {item.category || 'Agenda Akademik'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                        {item.name}
                    </h2>
                </div>
            </div>

            {/* --- CONTENT BODY --- */}
            <div className="p-6 sm:p-8 space-y-8">

                {/* Time & Date Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                            <FaCalendarDay className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mulai</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                                {formatDate(item.startDate)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-700">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                            <FaCalendarCheck className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Selesai</p>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                                {formatDate(item.endDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-black uppercase text-xs tracking-widest">
                        <FaAlignLeft className="text-indigo-500" /> Deskripsi Agenda
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm italic">
                            {item.description ? `"${item.description}"` : 'Tidak ada deskripsi tambahan untuk agenda ini.'}
                        </p>
                    </div>
                </div>

                {/* Additional Info Footer */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 text-[11px] font-medium text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <FaInfoCircle />
                        ID: {item.calendarId.split('-')[0]}...
                    </div>
                    <div className="flex items-center gap-1.5">
                        Status: <span className="text-emerald-500 font-bold uppercase tracking-tighter">Aktif</span>
                    </div>
                </div>
            </div>

            {/* --- FOOTER ACTION --- */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-sm shadow-sm"
                >
                    Tutup Detail
                </button>
            </div>
        </div>
    );
};

export default CalendarDetail;