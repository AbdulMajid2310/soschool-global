"use client";

import {
  fetchTeachers,
  toggleTeacherStatus,
} from "@/redux/features/teacher/thunk";
import { teacherService } from "@/redux/features/teacher/service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState, useMemo } from "react";
import {
  FiSearch,
  FiList,
  FiGrid,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUser,
  FiCheck,
  FiX,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { TbListDetails, TbIdBadge2 } from "react-icons/tb";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import TeacherStats from "./teacherStats";
import { useSchoolId } from "@/hooks/useSchoolId";

export default function ListTeacherSection() {
  const dispatch = useAppDispatch();
  const { teachers, loading } = useAppSelector((state) => state.teacher);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("grid");
  const [showAddTeacher, setShowTeacher] = useState(false);

  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId) dispatch(fetchTeachers(schoolId));
  }, [dispatch, schoolId]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(
      (t) =>
        t.user.username.toLowerCase().includes(query.toLowerCase()) ||
        (t.nip && t.nip.includes(query)) ||
        t.user.email.toLowerCase().includes(query.toLowerCase()),
    );
  }, [teachers, query]);

  const handleDelete = (teacherId: string) => {
    confirmActionToast({
      title: "Hapus Data Guru",
      message: "Data yang dihapus tidak dapat dikembalikan. Lanjutkan?",
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        try {
          await teacherService.delete(schoolId!, teacherId);
          toast.success("Data guru berhasil dihapus");
          dispatch(fetchTeachers(schoolId!));
        } catch (error) {
          toast.error("Gagal menghapus data");
        }
      },
    });
  };

  const handleToggleStatus = (teacherId: string, currentStatus: boolean) => {
    const actionLabel = !currentStatus ? "Aktifkan" : "Nonaktifkan";
    confirmActionToast({
      title: `${actionLabel} Guru`,
      message: `Apakah Anda yakin ingin ${actionLabel.toLowerCase()} akses guru ini?`,
      confirmText: `Ya, ${actionLabel}`,
      variant: "warning",
      onConfirm: async () => {
        await dispatch(
          toggleTeacherStatus({
            teacherId,
            schoolId: schoolId!,
            isActive: !currentStatus,
          }),
        ).unwrap();
        toast.success(`Guru berhasil di ${actionLabel}`);
      },
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-8 text-gray-900 dark:text-white min-h-screen font-sans max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            Manajemen Guru
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Panel kendali data pengajar dan administrasi akademik
          </p>
        </div>
      </div>

      <TeacherStats />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-5 rounded-4xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="relative w-full md:w-112.5 group">
          <FiSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={20}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, NIP, atau email..."
            title="Cari Guru"
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/20 rounded-xl outline-none transition-all text-sm font-bold"
          />
        </div>

        <div className="hidden lg:inline">
          <div
            className="flex  bg-slate-100 dark:bg-slate-800 p-1.5 rounded-4xl"
            aria-label="Pilihan Tampilan"
          >
            <button
              type="button"
              onClick={() => setView("list")}
              title="Tampilan Daftar"
              aria-current={view === "list" ? "true" : undefined}
              className={`p-3 rounded-xl  transition-all ${view === "list" ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <FiList size={22} />
            </button>

            <button
              type="button"
              onClick={() => setView("grid")}
              title="Tampilan Grid"
              aria-current={view === "grid" ? "true" : undefined}
              className={`p-3 rounded-xl transition-all ${view === "grid" ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <FiGrid size={22} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 dark:bg-slate-800 rounded-4xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {view === "list" ? (
            <div className="bg-white dark:bg-slate-900 rounded-4xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Profil Pengajar
                      </th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Identitas
                      </th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Kontak
                      </th>
                      <th className="px-10 py-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Status
                      </th>
                      <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Tindakan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {filteredTeachers.map((t) => (
                      <tr
                        key={t.teacherId}
                        className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-all"
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-5">
                            <img
                              src={
                                t.user.avatar ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${t.user.username}`
                              }
                              alt={t.user.username}
                              title={t.user.username}
                              className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-lg"
                            />
                            <div>
                              <p className="font-black text-slate-900 dark:text-white uppercase italic text-sm group-hover:text-indigo-600 transition-colors">
                                {t.user.username}
                              </p>
                              <div className="flex items-center gap-1 text-slate-400 mt-1">
                                <FiMail size={12} />
                                <span className="text-[11px] font-medium">
                                  {t.user.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <TbIdBadge2
                                className="text-indigo-500"
                                size={16}
                              />
                              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                NIP: {t.nip || "—"}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-6">
                              NUPTK: {t.nuptk || "—"}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <FiPhone size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold">
                              {t.user.phone || "—"}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex justify-center">
                            <button
                              type="button"
                              title={
                                t.isActive
                                  ? "Nonaktifkan Status"
                                  : "Aktifkan Status"
                              }
                              aria-current={t.isActive ? "true" : undefined}
                              onClick={() =>
                                handleToggleStatus(t.teacherId, t.isActive)
                              }
                              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                                t.isActive
                                  ? "bg-emerald-500"
                                  : "bg-slate-300 dark:bg-slate-700"
                              }`}
                            >
                              <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                  t.isActive ? "translate-x-8" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              title="Lihat detail"
                              aria-label="Lihat detail"
                              className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                            >
                              <TbListDetails size={20} />
                            </button>
                            <button
                              type="button"
                              title="Edit data"
                              aria-label="Edit data"
                              className="p-3 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-xl transition-all"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              type="button"
                              title="Hapus data"
                              aria-label="Hapus data"
                              onClick={() => handleDelete(t.teacherId)}
                              className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredTeachers.map((t) => (
                <div
                  key={t.teacherId}
                  className="group relative bg-white dark:bg-slate-900 rounded-4xl p-8 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 shadow-sm hover:shadow-2xl transition-all duration-500 text-center"
                >
                  <div className="absolute top-6 right-6">
                    <div
                      className={`h-3 w-3 rounded-full animate-pulse ${t.isActive ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-slate-300"}`}
                    />
                  </div>
                  <img
                    src={
                      t.user.avatar ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${t.user.username}`
                    }
                    className="h-28 w-28 rounded-4xl object-cover mx-auto ring-8 ring-slate-50 dark:ring-slate-800 shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500"
                    alt={t.user.username}
                    title={t.user.username}
                  />
                  <h3 className="text-lg font-black uppercase italic dark:text-white line-clamp-1">
                    {t.user.username}
                  </h3>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-2">
                    NIP: {t.nip || "---"}
                  </p>

                  <div className="mt-8 flex gap-2">
                    <button
                      type="button"
                      title={t.isActive ? "Nonaktifkan" : "Aktifkan"}
                      onClick={() =>
                        handleToggleStatus(t.teacherId, t.isActive)
                      }
                      className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase italic transition-all ${t.isActive ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-600 hover:text-white"}`}
                    >
                      {t.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                    <button
                      type="button"
                      title="Lihat detail"
                      aria-label="Lihat detail"
                      className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all"
                    >
                      <TbListDetails size={20} />
                    </button>
                    <button
                      type="button"
                      title="Hapus data"
                      aria-label="Hapus data"
                      onClick={() => handleDelete(t.teacherId)}
                      className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-600 rounded-2xl transition-all"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && filteredTeachers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-4xl border-4 border-dashed border-slate-100 dark:border-slate-800">
          <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-4xl mb-6">
            <FiUser size={64} className="text-slate-200" />
          </div>
          <p className="text-xl font-black uppercase italic text-slate-400 tracking-tighter">
            Data Guru Tidak Ditemukan
          </p>
        </div>
      )}

      {showAddTeacher && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={() => setShowTeacher(false)}
          />
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 overflow-y-auto max-h-[90vh] custom-scrollbar">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black uppercase italic text-indigo-600">
                  Registrasi Pengajar Baru
                </h2>
                <button
                  type="button"
                  title="Tutup"
                  aria-label="Tutup"
                  onClick={() => setShowTeacher(false)}
                  className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-all"
                >
                  <FiX size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
