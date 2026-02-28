import { useSchoolId } from '@/hooks/useSchoolId';
import { createBulkCalendar } from '@/redux/features/school_academic_calendar/thunks';
import { useAppSelector } from '@/redux/hooks';
import { AppDispatch } from '@/redux/store';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaSave, FaTrash, FaChevronDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

// Interface untuk state internal form
interface FormItem {
    name: string;
    startDate: string;
    endDate: string;
    category: string;
    description: string;
    isOpen: boolean; // Field tambahan untuk logic buka-tutup
}

const CalendarAddBulk = ({ onSuccess }: { onSuccess: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const schoolId = useSchoolId();
    // Inisialisasi dengan satu baris terbuka
    const [forms, setForms] = useState<FormItem[]>([
        { name: '', startDate: '', endDate: '', category: 'Kegiatan', description: '', isOpen: true }
    ]);

    // Tambah baris: Tutup baris lain, buka yang baru
    const addRow = () => {
        const closedOld = forms.map(f => ({ ...f, isOpen: false }));
        setForms([...closedOld, { name: '', startDate: '', endDate: '', category: 'Kegiatan', description: '', isOpen: true }]);
    };

    // Hapus baris
    const removeRow = (index: number) => {
        if (forms.length > 1) {
            setForms(forms.filter((_, i) => i !== index));
        }
    };

    // Toggle Buka-Tutup baris secara manual
    const toggleRow = (index: number) => {
        setForms(forms.map((f, i) => i === index ? { ...f, isOpen: !f.isOpen } : f));
    };

    const handleChange = (index: number, field: keyof FormItem, value: string) => {
        const updated = [...forms];
        updated[index] = { ...updated[index], [field]: value };
        setForms(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validasi awal: Pastikan schoolId tidak null
        if (!schoolId) {
            toast.error("Gagal menyimpan: School ID tidak terdeteksi.");
            return;
        }

        const loadingToast = toast.loading('Sedang menyimpan agenda...');

        try {
            // 2. Bersihkan payload & pastikan schoolId adalah string murni
            const payload = {
                calendars: forms.map(({ isOpen, ...rest }) => ({
                    ...rest,
                    schoolId: schoolId as string // Type casting atau gunakan validasi if di atas
                }))
            };

            // 3. Gunakan .unwrap() agar error API tertangkap di blok catch
            await dispatch(createBulkCalendar(payload)).unwrap();

            toast.success('Agenda berhasil disimpan!', { id: loadingToast });
            onSuccess();
        } catch (err: any) {
            const errorMessage = err?.message || 'Gagal membuat agenda massal';
            toast.error(errorMessage, { id: loadingToast });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Tambah Agenda Massal</h2>
                    <p className="text-sm text-slate-500">Input jadwal kegiatan sekolah SoSchool sekaligus.</p>
                </div>
                <button
                    type="button"
                    onClick={addRow}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-2xl hover:bg-indigo-700 font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                    <FaPlus className="w-4 h-4" /> Tambah Baris
                </button>
            </div>

            {/* Container List dengan Scrollbar */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                {forms.map((form, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border transition-all duration-300 ${form.isOpen
                            ? 'border-indigo-200 bg-indigo-50/30 dark:border-indigo-500/50 dark:bg-indigo-500/5 shadow-sm'
                            : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'
                            }`}
                    >
                        {/* HEADER: Selalu muncul & bisa diklik untuk toggle */}
                        <div
                            className="p-4 flex items-center justify-between cursor-pointer group"
                            onClick={() => toggleRow(index)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${form.isOpen ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'
                                    }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    {form.isOpen ? (
                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Sedang Diisi</span>
                                    ) : (
                                        <h4 className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-50 md:max-w-md">
                                            {form.name || <span className="text-slate-400 italic font-normal text-sm">Belum ada nama agenda...</span>}
                                        </h4>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {forms.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); removeRow(index); }}
                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        title="Hapus Baris"
                                    >
                                        <FaTrash className="w-3.5 h-3.5" />
                                    </button>
                                )}
                                <FaChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${form.isOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                        </div>

                        {/* BODY: Muncul dengan animasi saat isOpen true */}
                        {form.isOpen && (
                            <div className="px-5 pb-5 pt-2 animate-in slide-in-from-top-2 duration-300">
                                <div className="grid grid-cols-12 gap-4">
                                    {/* Nama Agenda */}
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Nama Agenda</label>
                                        <input
                                            required
                                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                                            value={form.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            placeholder="Contoh: Ujian Tengah Semester"
                                        />
                                    </div>

                                    {/* Mulai */}
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Mulai</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                            value={form.startDate}
                                            onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                        />
                                    </div>

                                    {/* Selesai */}
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Selesai</label>
                                        <input
                                            type="date"
                                            required
                                            min={form.startDate} // Validasi agar tgl selesai tidak mendahului tgl mulai
                                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                            value={form.endDate}
                                            onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                        />
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="col-span-12">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Deskripsi Tambahan</label>
                                        <textarea
                                            rows={2}
                                            className="w-full mt-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                            value={form.description}
                                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                                            placeholder="Tulis detail kegiatan jika ada..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tombol Simpan */}
            <div className="mt-8 border-t border-slate-100 dark:border-slate-700 pt-6">
                <button
                    type="submit"
                    className="w-full bg-slate-900 dark:bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all shadow-xl shadow-slate-200 dark:shadow-indigo-900/20 active:scale-[0.98]"
                >
                    <FaSave className="w-5 h-5" /> Simpan Semua Agenda ({forms.length})
                </button>
            </div>
        </form>
    );
};

export default CalendarAddBulk;