import { useSchoolId } from '@/hooks/useSchoolId';
import { updateCalendar } from '@/redux/features/school_academic_calendar/thunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaSave, FaTimes } from 'react-icons/fa';

interface CalendarUpdateProps {
    item: any;
    onClose: () => void;
}

const CalendarUpdate = ({ item, onClose }: CalendarUpdateProps) => {
    const dispatch = useAppDispatch();
    const schoolId = useSchoolId();
    /**
     * HELPER: Memastikan format tanggal adalah YYYY-MM-DD
     * Jika data dari backend adalah ISO String, kita ambil 10 karakter pertama.
     */
    const formatDateForInput = (dateString: any) => {
        if (!dateString) return '';
        try {
            // Jika formatnya ISO (2026-02-16T...) ambil YYYY-MM-DD saja
            return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
            return '';
        }
    };

    // State internal menggunakan format yang sudah dibersihkan
    const [data, setData] = useState({
        name: item.name || '',
        startDate: formatDateForInput(item.startDate),
        endDate: formatDateForInput(item.endDate),
        description: item.description || '',
        category: item.category || 'Kegiatan'
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validasi awal untuk menghilangkan error TS 'string | null'
        if (!schoolId) {
            toast.error("Gagal memperbarui: School ID tidak ditemukan.");
            return;
        }

        const loadingToast = toast.loading('Memperbarui agenda...');

        try {
            // 2. Kirim data dan gunakan .unwrap() untuk menangkap error async
            await dispatch(updateCalendar({
                id: item.calendarId,
                schoolId: schoolId as string, // Tegaskan ke TS bahwa ini string
                ...data
            })).unwrap();

            // 3. Feedback sukses dan tutup modal/form
            toast.success('Agenda berhasil diperbarui!', { id: loadingToast });
            onClose();
        } catch (err: any) {
            // 4. Handle error jika update ke Supabase gagal
            const errorMessage = err?.message || 'Gagal memperbarui agenda';
            toast.error(errorMessage, { id: loadingToast });
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-100 p-4 animate-in fade-in duration-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-800 w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 relative animate-in zoom-in-95 duration-300"
            >
                {/* Tombol Tutup */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-8 right-8 text-slate-400 hover:text-red-500 dark:hover:text-white transition-all"
                >
                    <FaTimes className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Edit Agenda</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium">Perbarui informasi jadwal akademik SoSchool.</p>

                <div className="space-y-5">
                    {/* Nama Agenda */}
                    <div>
                        <label className="block text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Nama Agenda</label>
                        <input
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all shadow-sm"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="Nama kegiatan sekolah..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Tanggal Mulai */}
                        <div>
                            <label className="block text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mulai</label>
                            <input
                                type="date"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                                value={data.startDate}
                                onChange={(e) => setData({ ...data, startDate: e.target.value })}
                            />
                        </div>
                        {/* Tanggal Selesai */}
                        <div>
                            <label className="block text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Selesai</label>
                            <input
                                type="date"
                                required
                                min={data.startDate}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                                value={data.endDate}
                                onChange={(e) => setData({ ...data, endDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="block text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Deskripsi Detail</label>
                        <textarea
                            rows={3}
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all resize-none shadow-sm"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            placeholder="Contoh: Ujian dilaksanakan secara online melalui portal SoSchool..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-4.5 font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-2xl transition-all"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-4.5 font-black bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none hover:bg-slate-800 dark:hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <FaSave className="w-4 h-4" /> Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CalendarUpdate;