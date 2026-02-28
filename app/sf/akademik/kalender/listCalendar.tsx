import { deleteCalendar, fetchCalendars } from '@/redux/features/school_academic_calendar/thunks';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect, useState, useMemo } from 'react';
import { FaCalendarAlt, FaEdit, FaTrashAlt, FaClock, FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const CalendarList = ({
    schoolId,
    onEdit,
    onDetail
}: {
    schoolId: string,
    onEdit: (item: any) => void,
    onDetail: (item: any) => void
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: RootState) => state.schoolCalendarAcademic);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    useEffect(() => {
        if (schoolId) dispatch(fetchCalendars(schoolId));
    }, [dispatch, schoolId]);

    const handleDelete = (id: string) => {
        if (confirm('Yakin ingin menghapus agenda ini?')) {
            dispatch(deleteCalendar({ id, schoolId }));
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const availableMonths = useMemo(() => items.map(g => g.month), [items]);

    const filteredItems = useMemo(() => {
        return items
            .map(group => {
                const searchLower = searchQuery.toLowerCase();
                const isMatchMonthName = group.month.toLowerCase().includes(searchLower);

                const filteredData = group.data?.filter(item => {
                    const isMatchAgendaName = item.name.toLowerCase().includes(searchLower);
                    return isMatchAgendaName || isMatchMonthName;
                }) || [];

                return { ...group, data: filteredData };
            })
            .filter(group => {
                const isMonthMatch = selectedMonth ? group.month === selectedMonth : true;
                return isMonthMatch && group.data.length > 0;
            });
    }, [items, searchQuery, selectedMonth]);

    if (loading) {
        return (
            <div className="grid gap-4">
                {[1, 2, 3].map((n) => (
                    <div key={n} className="h-32 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 sm:space-y-6">
                <div className="relative group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Cari agenda atau bulan..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all outline-none text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="space-y-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <FaFilter className="w-3 h-3" /> Filter Bulan
                    </div>
                    <div className="flex max-w-full overflow-x-auto scrollbar-hide gap-2">
                        <button
                            onClick={() => setSelectedMonth(null)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedMonth === null
                                ? 'bg-indigo-600 text-white '
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            Semua
                        </button>
                        {availableMonths.map(month => (
                            <button
                                key={month}
                                onClick={() => setSelectedMonth(month)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedMonth === month
                                    ? 'bg-indigo-600 text-white '
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredItems.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <FaCalendarAlt className="mx-auto text-4xl text-slate-200 dark:text-slate-700 mb-3" />
                    <p className="text-slate-500 dark:text-slate-400 font-bold">Agenda tidak ditemukan</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {filteredItems.map((group) => (
                        <div key={group.month} className="relative">
                            <div className=" py-3 bg-[#F8FAFC]/95 dark:bg-slate-900/95 backdrop-blur-sm flex items-center gap-3 mb-4">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white shrink-0">
                                    {group.month}
                                </h3>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                            </div>

                            <div className="grid gap-4">
                                {group.data.map((item) => (
                                    <div
                                        key={item.calendarId}
                                        className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-4 sm:p-5 transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-400"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                                            <div className="flex gap-4 items-center">
                                                <div className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 border border-indigo-100 dark:border-indigo-800">
                                                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter leading-none">
                                                        Date
                                                    </span>
                                                    <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                                        {new Date(item.startDate).getDate()}
                                                    </span>
                                                </div>

                                                <div className="min-w-0 space-y-1">
                                                    <h4 className="font-bold capitalize text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 line-clamp-2 dark:text-slate-400 truncate">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                                                        <FaClock className="text-indigo-500 shrink-0" />
                                                        <span className="truncate">
                                                            {formatDate(item.startDate)} {item.endDate !== item.startDate && ` - ${formatDate(item.endDate)}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='absolute lg:relative top-0 right-2'>
                                                <div className="flex items-center justify-end sm:justify-center gap-1.5 ">
                                                    {onDetail && (
                                                        <button
                                                            onClick={() => onDetail(item)}
                                                            className="p-2.5 sm:p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all"
                                                            title="Detail"
                                                        >
                                                            <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => onEdit(item)}
                                                        className="p-2.5 sm:p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.calendarId)}
                                                        className="p-2.5 sm:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                                        title="Hapus"
                                                    >
                                                        <FaTrashAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CalendarList;