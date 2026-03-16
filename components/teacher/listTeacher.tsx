"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchTeachers,
  toggleTeacherStatus,
  deleteTeacher,
  deleteBulkTeachers,
} from "@/redux/features/teacher/thunk";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import {
  FiList,
  FiGrid,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
  FiUserPlus,
  FiUserMinus,
  FiPlus,
  FiAlertCircle,
  FiEdit,
  FiEye,
  FiActivity,
} from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import TeacherStats from "./teacherStats";
import { SearchModal } from "../SearchModal";
import { useRouter } from "next/navigation";

interface SelectedData {
  teacherId: string;
  userId: string;
}

export default function ListTeacherSection() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const router = useRouter();

  const { teachers, loading: teacherLoading } = useAppSelector(
    (state) => state.teacher,
  );
  const { role } = useAppSelector((state) => state.userRole);
  const { loading: accessActionLoading } = useAppSelector(
    (state) => state.userAccess,
  );

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("grid");
  const [selectedIds, setSelectedIds] = useState<SelectedData[]>([]);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchTeachers(schoolId));
      const teacherRoleCode = process.env.NEXT_PUBLIC_ROLE_TEACHER_ID;
      if (teacherRoleCode) dispatch(getUserRoleByCode(teacherRoleCode));
    }
  }, [dispatch, schoolId]);

  const filteredTeachers = useMemo(() => {
    const s = query.toLowerCase();
    return teachers.filter(
      (t) =>
        t.user.username.toLowerCase().includes(s) ||
        (t.nip && t.nip.includes(s)) ||
        t.user.email.toLowerCase().includes(s),
    );
  }, [teachers, query]);

  const isAllSelected =
    filteredTeachers.length > 0 &&
    selectedIds.length === filteredTeachers.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        filteredTeachers.map((t) => ({
          teacherId: t.teacherId,
          userId: t.user.userId,
        })),
      );
    }
  };

  const handleSelectOne = (teacherId: string, userId: string) => {
    setSelectedIds((prev) => {
      const exist = prev.find((i) => i.teacherId === teacherId);
      if (exist) return prev.filter((i) => i.teacherId !== teacherId);
      return [...prev, { teacherId, userId }];
    });
  };

  const handleBulkAccess = (type: "add" | "remove") => {
    const teacherRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_TEACHER_ID;
    const userIds = selectedIds.map((i) => i.userId).filter(Boolean);

    if (!schoolId || !teacherRoleId || userIds.length === 0)
      return toast.error("Data tidak lengkap");

    confirmActionToast({
      title: type === "add" ? "Beri Akses" : "Cabut Akses",
      message: `Proses hak akses untuk ${userIds.length} guru terpilih?`,
      confirmText: "Ya, Proses",
      variant: type === "add" ? "warning" : "danger",
      onConfirm: async () => {
        const action = type === "add" ? createBulkAccess : deleteBulkAccess;
        await dispatch(
          action({ schoolId, userRoleId: teacherRoleId, userIds }),
        ).unwrap();
        toast.success(`Akses berhasil diperbarui`);
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  // Perbaikan: Fungsi status dipisahkan agar rapi
  const handleToggleStatus = (teacherId: string, currentStatus: boolean) => {
    confirmActionToast({
      title: "Ubah Status",
      message: `Ubah status guru menjadi ${!currentStatus ? "Aktif" : "Nonaktif"}?`,
      confirmText: "Ya, Ubah",
      variant: "warning",
      onConfirm: async () => {
        await dispatch(
          toggleTeacherStatus({
            teacherId,
            schoolId: schoolId!,
            isActive: !currentStatus,
          }),
        ).unwrap();
        toast.success("Status berhasil diperbarui");
      },
    });
  };

  const handleDelete = (teacherId: string) => {
    confirmActionToast({
      title: "Hapus Guru",
      message: "Data akan dihapus permanen. Lanjutkan?",
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(
          deleteTeacher({ schoolId: schoolId!, teacherId }),
        ).unwrap();
        toast.success("Guru berhasil dihapus");
        setSelectedIds((prev) => prev.filter((i) => i.teacherId !== teacherId));
      },
    });
  };

  const handleBulkDelete = () => {
    confirmActionToast({
      title: "Hapus Massal",
      message: `Hapus permanen ${selectedIds.length} guru terpilih?`,
      confirmText: "Hapus Semua",
      variant: "danger",
      onConfirm: async () => {
        const userIds = selectedIds.map((i) => i.userId);
        await dispatch(
          deleteBulkTeachers({ schoolId: schoolId!, userIds }),
        ).unwrap();
        toast.success("Data massal berhasil dihapus");
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  const handleDetailStudent = (userId: string) => {
    router.push(`/profile/administration/biodata`);
    sessionStorage.setItem("userId", userId);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 text-slate-900 dark:text-white min-h-screen max-w-7xl mx-auto animate-in fade-in duration-500">
      <TeacherStats />

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col xl:flex-row justify-between gap-6">
        <div className="flex gap-3 items-center">
          <button
            type="button"
            title={isAllSelected ? "Batal pilih semua" : "Pilih semua guru"}
            onClick={handleSelectAll}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isAllSelected ? "bg-indigo-600 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600"}`}
          >
            {isAllSelected ? (
              <FiCheckSquare size={18} />
            ) : (
              <FiSquare size={18} />
            )}
            <span className="hidden sm:inline">
              {isAllSelected ? "Batal" : "Pilih Semua"}
            </span>
          </button>

          {selectedIds.length > 0 && (
            <div className="relative">
              <button
                type="button"
                title="Buka opsi tindakan massal"
                onClick={() => setShowOption(!showOption)}
                className="flex items-center gap-3 px-6 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl relative z-30"
              >
                <TbListDetails size={18} />
                <span>Opsi ({selectedIds.length})</span>
              </button>
              {showOption && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowOption(false)}
                  />
                  <div className="absolute left-0 mt-4 w-72 bg-white dark:bg-slate-800 rounded-4xl shadow-2xl border border-slate-100 dark:border-slate-700 p-3 z-30 animate-in slide-in-from-top-2">
                    <button
                      type="button"
                      title="Berikan akses login"
                      onClick={() => handleBulkAccess("add")}
                      className="flex items-center gap-4 w-full px-5 py-4 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiUserPlus size={20} /> Beri Akses login
                    </button>
                    <button
                      type="button"
                      title="Cabut akses login"
                      onClick={() => handleBulkAccess("remove")}
                      className="flex items-center gap-4 w-full px-5 py-4 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiUserMinus size={20} /> Cabut Akses login
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2 mx-4" />
                    <button
                      type="button"
                      title="Hapus data terpilih"
                      onClick={handleBulkDelete}
                      className="flex items-center gap-4 w-full px-5 py-4 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiTrash2 size={20} /> Hapus Data
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="w-full max-w-md">
            <SearchModal
              onSearch={setQuery}
              onRefresh={() => dispatch(fetchTeachers(schoolId!))}
              isLoading={teacherLoading}
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl shadow-inner">
            <button
              type="button"
              title="Tampilan daftar"
              onClick={() => setView("list")}
              className={`p-3 rounded-xl transition-all ${view === "list" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-md" : "text-slate-400"}`}
            >
              <FiList size={22} />
            </button>
            <button
              type="button"
              title="Tampilan grid"
              onClick={() => setView("grid")}
              className={`p-3 rounded-xl transition-all ${view === "grid" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-md" : "text-slate-400"}`}
            >
              <FiGrid size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {teacherLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-72 bg-slate-100 dark:bg-slate-800 rounded-4xl"
            />
          ))}
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-4xl text-slate-200">
            <FiAlertCircle size={80} />
          </div>
          <h3 className="text-2xl font-black uppercase italic text-slate-300">
            Data Guru Tidak Ditemukan
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTeachers.map((t) => {
            const isSelected = selectedIds.some(
              (s) => s.teacherId === t.teacherId,
            );
            return (
              <div
                key={t.teacherId}
                className={`group relative bg-white dark:bg-slate-900 rounded-4xl p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                  isSelected
                    ? "border-indigo-600 ring-8 ring-indigo-500/5 shadow-2xl"
                    : "border-slate-50 dark:border-slate-800 shadow-sm"
                }`}
              >
                {/* Checkbox Selection */}
                <button
                  type="button"
                  title={isSelected ? "Batal pilih" : "Pilih guru"}
                  onClick={() => handleSelectOne(t.teacherId, t.user.userId)}
                  className={`absolute top-5 left-5 z-20 p-2.5 rounded-2xl transition-all duration-300 transform active:scale-90 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-110"
                      : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-300 border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2"
                  }`}
                >
                  {isSelected ? (
                    <FiCheckSquare size={22} className="drop-shadow-sm" />
                  ) : (
                    <FiSquare size={22} />
                  )}
                </button>

                {/* Profile Info */}
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={
                        t.user.avatar ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${t.user.username}`
                      }
                      className="h-28 w-28 rounded-4xl mx-auto object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      alt={t.user.username}
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-white dark:border-slate-900 ${
                        t.isActive ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="font-black uppercase italic text-sm truncate px-2 text-slate-800 dark:text-slate-200">
                      {t.user.username}
                    </h3>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
                      NIP: {t.nip || "---"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 grid grid-cols-4 gap-2">
                    {/* Status Toggle */}
                    <button
                      type="button"
                      title={t.isActive ? "Nonaktifkan" : "Aktifkan"}
                      onClick={() =>
                        handleToggleStatus(t.teacherId, t.isActive)
                      }
                      className={`flex items-center justify-center p-3 rounded-2xl transition-all ${
                        t.isActive
                          ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                          : "bg-slate-50 text-slate-400 hover:bg-slate-600 hover:text-white"
                      }`}
                    >
                      <FiActivity size={18} />
                    </button>

                    {/* Detail Button */}
                    <button
                      type="button"
                      title="Lihat Detail"
                      onClick={() => handleDetailStudent(t.user.userId)}
                      className="flex items-center justify-center p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl transition-all"
                    >
                      <FiEye size={18} />
                    </button>

                    {/* Update/Edit Button */}
                    <button
                      type="button"
                      title="Edit Data"
                      onClick={() =>
                        router.push(
                          `/sf/academic/teacher/edit/${t.user.userId}`,
                        )
                      }
                      className="flex items-center justify-center p-3 bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white rounded-2xl transition-all"
                    >
                      <FiEdit size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      title="Hapus Data"
                      onClick={() => handleDelete(t.teacherId)}
                      className="flex items-center justify-center p-3 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
