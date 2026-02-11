"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-hot-toast';
import {
  HiPlus,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineInformationCircle
} from "react-icons/hi2";
import { RiExchangeLine, RiHistoryLine } from "react-icons/ri";

// Import Thunk & Actions yang kita buat tadi
import {
  fetchSchoolPeriods,
  updatePeriod,
  togglePeriodStatus,
  deletePeriod,
  createPeriod
} from '@/redux/features/school-period/thunk';
import { resetPeriodState } from '@/redux/features/school-period/slice';
// Import createPeriod jika sudah kamu buat di thunk, jika belum saya buatkan logic dispatch-nya
import { SchoolPeriodService } from '@/redux/features/school-period/service';

export default function SchoolPeriodManagement() {
  const dispatch = useAppDispatch();

  // Ambil state dari Redux
  const { profile } = useAppSelector((state) => state.auth);
  const { periods, loading, success, error } = useAppSelector((state) => state.schoolPeriod);

  const schoolId = profile?.school?.schoolId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    periodId: '',
    academicYear: '',
    semester: 'GANJIL' as 'GANJIL' | 'GENAP',
  });

  // 1. Sinkronisasi Awal
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolPeriods(schoolId));
    }
  }, [dispatch, schoolId]);

  // 2. Global Listener untuk Success/Error dari Thunk
  useEffect(() => {
    if (success) {
      toast.success("Berhasil memperbarui data periode");
      setIsModalOpen(false);
      dispatch(resetPeriodState()); // Reset status success agar tidak trigger berulang
    }
    if (error) {
      toast.error(error);
      dispatch(resetPeriodState());
    }
  }, [success, error, dispatch]);

  // 3. Handle Submit Menggunakan Thunk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return;

    // Siapkan payload agar bersih
    const payload = {
      academicYear: formData.academicYear,
      semester: formData.semester,
      schoolId
    };

    if (formData.periodId) {
      // --- FULL REDUX THUNK UPDATE ---
      dispatch(updatePeriod({
        id: formData.periodId,
        schoolId,
        dto: payload
      }));
    } else {
      // --- FULL REDUX THUNK CREATE ---
      // Kita tidak perlu try-catch lagi di sini karena sudah dihandle di slice (error state)
      dispatch(createPeriod(payload));
    }
  };

  // 4. Handle Toggle & Delete (Full Thunk)
  const handleToggleActive = (id: string) => {
    if (schoolId) {
      dispatch(togglePeriodStatus({ id, schoolId }));
    }
  };

  const handleDelete = (id: string, isActive: boolean) => {
    if (isActive) return toast.error("Periode aktif tidak bisa dihapus!");

    if (window.confirm("Hapus periode ini secara permanen?")) {
      if (schoolId) {
        dispatch(deletePeriod({ id, schoolId }));
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 antialiased">
      {/* ... (Header Section sama seperti sebelumnya) ... */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-widest">
            <RiHistoryLine />
            <span>Academic Logic</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Periode Pendidikan
          </h1>
        </div>

        <button
          onClick={() => {
            setFormData({ periodId: '', academicYear: '', semester: 'GANJIL' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105"
        >
          <HiPlus />
          <span>Buat Periode Baru</span>
        </button>
      </div>

      {/* LIST SECTION */}
      <div className="grid grid-cols-1 gap-4">
        {loading && periods.length === 0 ? (
          <div className="h-64 flex items-center justify-center animate-pulse text-slate-400 font-bold italic text-sm">
            Sinkronisasi Data via Redux...
          </div>
        ) : (
          periods.map((p) => (
            <div
              key={p.periodId}
              className={`flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-slate-900 border transition-all rounded-3xl ${p.isActive ? 'border-indigo-500 ring-4 ring-indigo-500/5' : 'border-slate-100 dark:border-slate-800'
                }`}
            >
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className={`p-4 rounded-2xl ${p.isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <HiOutlineCalendarDays size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white">{p.academicYear}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                    Semester {p.semester}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0 w-full md:w-auto">
                {/* Tombol Toggle Aktif */}
                <button
                  onClick={() => handleToggleActive(p.periodId)}
                  disabled={loading}
                  className={`flex-1 md:flex-none px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${p.isActive
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                    : 'bg-slate-900 text-white hover:bg-indigo-600'
                    }`}
                >
                  {p.isActive ? 'Matikan' : 'Aktifkan'}
                </button>

                {/* Tombol Edit */}
                <button
                  onClick={() => {
                    setFormData({ periodId: p.periodId, academicYear: p.academicYear, semester: p.semester });
                    setIsModalOpen(true);
                  }}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-indigo-600"
                >
                  <HiOutlinePencilSquare size={20} />
                </button>

                {/* Tombol Delete */}
                <button
                  onClick={() => handleDelete(p.periodId, p.isActive)}
                  className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-rose-600"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL MODEREN (Tailwind v4 Style) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop dengan Blur */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => !loading && setIsModalOpen(false)} // Cegah tutup saat loading
          />

          {/* Modal Card */}
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-3xl p-10 relative overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            {/* Dekorasi Aksen */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl pointer-events-none"></div>

            <div className="relative">
              <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white flex items-center gap-3 italic tracking-tighter">
                {formData.periodId ? 'Update Period' : 'New Period'}
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
                Konfigurasi Akademik SoSchool
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Tahun Akademik */}
                <div className="group space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
                    Tahun Akademik
                  </label>
                  <div className="relative">
                    <HiOutlineCalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input
                      required
                      placeholder="Contoh: 2026/2027"
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none ring-2 ring-transparent focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-bold text-slate-800 dark:text-slate-100"
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Selector Semester */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">
                    Pilih Semester
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-3xl">
                    {(['GANJIL', 'GENAP'] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={loading}
                        onClick={() => setFormData({ ...formData, semester: s })}
                        className={`py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${formData.semester === s
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 overflow-hidden"
                  >
                    {/* Spinner Loading */}
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>Simpan Konfigurasi</span>
                        <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="w-full py-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-rose-500 transition-all disabled:opacity-0"
                  >
                    Batal & Tutup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}