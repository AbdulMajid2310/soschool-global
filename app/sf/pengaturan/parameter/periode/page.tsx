"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";
import {
  HiPlus,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiChevronLeft,
} from "react-icons/hi2";
import { RiHistoryLine } from "react-icons/ri";

// Import Thunk & Actions
import {
  fetchSchoolPeriods,
  updatePeriod,
  togglePeriodStatus,
  deletePeriod,
  createPeriod,
  fetchActivePeriod,
} from "@/redux/features/school-period/thunk";
import { resetPeriodState } from "@/redux/features/school-period/slice";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useRouter } from "next/navigation";
import { useSchoolId } from "@/hooks/useSchoolId";

// Definisi Interface Lokal agar Type-Safe
interface PeriodFormData {
  periodId: string;
  academicYear: string;
  semester: "GANJIL" | "GENAP";
}

export default function SchoolPeriodManagementSection() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 1. Selector State
  const { periods, loading, success, error } = useAppSelector(
    (state) => state.schoolPeriod,
  );

  const schoolId = useSchoolId();
  // 2. Local State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PeriodFormData>({
    periodId: "",
    academicYear: "",
    semester: "GANJIL",
  });

  // 3. Initial Data Fetching
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolPeriods(schoolId));
      dispatch(fetchActivePeriod(schoolId));
    }
  }, [dispatch, schoolId]);

  // 4. Global Listener untuk Success/Error Handling
  useEffect(() => {
    if (success) {
      toast.success("Operasi berhasil diselesaikan");
      setIsModalOpen(false);
      setFormData({ periodId: "", academicYear: "", semester: "GANJIL" });
      dispatch(resetPeriodState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetPeriodState());
    }
  }, [success, error, dispatch]);

  // 5. Submit Logic (Create/Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return toast.error("Sesi sekolah tidak valid");

    // 1. Validasi Format Tahun (YYYY/YYYY)
    const yearPattern = /^\d{4}\/\d{4}$/;
    if (!yearPattern.test(formData.academicYear)) {
      return toast.error("Format tahun salah! Gunakan contoh: 2025/2026");
    }

    const payload = {
      academicYear: formData.academicYear,
      semester: formData.semester,
      schoolId,
    };

    // 2. Tampilkan Loading Toast
    const loadingToast = toast.loading(
      formData.periodId ? "Memperbarui periode..." : "Membuat periode baru...",
    );

    try {
      if (formData.periodId) {
        // --- UPDATE ---
        await dispatch(
          updatePeriod({
            id: formData.periodId,
            schoolId,
            dto: payload,
          }),
        ).unwrap();

        toast.success("Periode berhasil diperbarui!", { id: loadingToast });
      } else {
        // --- CREATE ---
        await dispatch(createPeriod(payload)).unwrap();

        toast.success("Periode baru berhasil dibuat!", { id: loadingToast });
      }

      // Modal otomatis tertutup via useEffect global (success state)
    } catch (err: any) {
      // 3. Tangkap error dari backend atau network
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Gagal menyimpan data";
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  // 6. Action Handlers (Menggunakan Custom Confirm Toast)
  const handleToggleActive = (id: string, currentStatus: boolean) => {
    if (!schoolId) return;

    confirmActionToast({
      title: currentStatus ? "Nonaktifkan Periode" : "Aktifkan Periode",
      message: currentStatus
        ? "Aplikasi tidak akan memiliki periode aktif. Lanjutkan?"
        : "Mengaktifkan ini akan otomatis menonaktifkan periode lainnya.",
      confirmText: currentStatus ? "Ya, Matikan" : "Ya, Aktifkan",
      variant: "warning",
      onConfirm: async () => {
        // .unwrap() digunakan agar catch di confirmActionToast bisa menangkap error thunk
        await dispatch(togglePeriodStatus({ id, schoolId })).unwrap();
      },
    });
  };

  const handleDelete = (id: string, isActive: boolean) => {
    if (isActive) return toast.error("Periode aktif tidak boleh dihapus!");

    confirmActionToast({
      title: "Hapus Periode",
      message: "Data periode yang dihapus tidak dapat dikembalikan. Lanjutkan?",
      confirmText: "Hapus Permanen",
      variant: "danger",
      onConfirm: async () => {
        if (schoolId) {
          await dispatch(deletePeriod({ id, schoolId })).unwrap();
        }
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 antialiased">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex items-start gap-4">
          {/* Tombol Kembali yang Elegan */}
          <button
            onClick={() => router.back()}
            className="mt-2 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group active:scale-95"
            title="Kembali"
          >
            <HiChevronLeft
              size={24}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1">
              <div className="p-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                <RiHistoryLine className="animate-spin-slow" />
              </div>
              <span>Academic Logic • SoSchool</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">
              Master{" "}
              <span className="text-indigo-600 dark:text-indigo-500 not-italic">
                Periode
              </span>
            </h1>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
              Kelola tahun ajaran dan semester aktif untuk seluruh sistem
              pendidikan.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({ periodId: "", academicYear: "", semester: "GANJIL" });
            setIsModalOpen(true);
          }}
          className="group flex items-center gap-3 bg-slate-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-3xl font-black text-xs uppercase tracking-widest transition-all hover:bg-indigo-700 dark:hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-slate-200 dark:shadow-indigo-900/20"
        >
          <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-90 transition-transform duration-300">
            <HiPlus size={18} />
          </div>
          <span>Tambah Periode Baru</span>
        </button>
      </div>

      {/* LIST DATA */}
      <div className="grid grid-cols-1 gap-4">
        {loading && periods.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center gap-3 text-slate-400 italic">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p>Menghubungkan ke Database SoSchool...</p>
          </div>
        ) : (
          periods.map((p) => (
            <div
              key={p.periodId}
              className={`flex flex-col md:flex-row items-center justify-between p-6 bg-white dark:bg-slate-900 border transition-all duration-300 rounded-3xl ${
                p.isActive
                  ? "border-indigo-500 ring-4 ring-indigo-500/5 shadow-lg"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-2xl ${p.isActive ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
                >
                  <HiOutlineCalendarDays size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white">
                    {p.academicYear}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Semester {p.semester}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleToggleActive(p.periodId, p.isActive)}
                  disabled={loading}
                  className={`px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    p.isActive
                      ? "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                      : "bg-slate-900 dark:bg-indigo-600 text-white hover:opacity-80"
                  }`}
                >
                  {p.isActive ? "Nonaktifkan" : "Aktifkan"}
                </button>
                <button
                  type="button"
                  title="edit"
                  onClick={() => {
                    setFormData({
                      periodId: p.periodId,
                      academicYear: p.academicYear,
                      semester: p.semester as any,
                    });
                    setIsModalOpen(true);
                  }}
                  className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <HiOutlinePencilSquare size={20} />
                </button>
                <button
                  type="button"
                  title="delete"
                  onClick={() => handleDelete(p.periodId, p.isActive)}
                  className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !loading && setIsModalOpen(false)}
          />
          <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black mb-6 dark:text-white italic">
              Konfigurasi Periode
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Tahun Akademik
                </label>
                <input
                  required
                  placeholder="YYYY/YYYY (2025/2026)"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-bold transition-all"
                  value={formData.academicYear}
                  onChange={(e) =>
                    setFormData({ ...formData, academicYear: e.target.value })
                  }
                  disabled={loading}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Pilih Semester
                </label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl">
                  {["GANJIL", "GENAP"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, semester: s as any })
                      }
                      className={`py-3 rounded-xl font-black text-xs transition-all ${
                        formData.semester === s
                          ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm"
                          : "text-slate-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
