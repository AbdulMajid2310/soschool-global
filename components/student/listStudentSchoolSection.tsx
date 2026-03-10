"use client";

import { useSchoolId } from "@/hooks/useSchoolId";
import {
  fetchStudents,
  deleteStudent,
  deleteBulkStudents,
} from "@/redux/features/student/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import {
  FiList,
  FiGrid,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import { StudentTableView } from "./StudentTableView";
import { StudentGridView } from "./StudentGridView";
import { SearchModal } from "../SearchModal";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
import { TbListDetails } from "react-icons/tb";
import { confirmActionToast } from "../toast/confirmActionToast";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";

interface SelectedData {
  studentId: string;
  userId: string;
}

export default function ListStudentSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { students: data, loading } = useAppSelector((state) => state.student);
  const { loading: accessLoading } = useAppSelector(
    (state) => state.userAccess,
  );
  const { role } = useAppSelector((state) => state.userRole);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedIds, setSelectedIds] = useState<SelectedData[]>([]);
  const [showOption, setShowOption] = useState(false);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchStudents(schoolId));
    }
    const studentRoleCode = process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;
    if (studentRoleCode) {
      dispatch(getUserRoleByCode(studentRoleCode));
    }
  }, [dispatch, schoolId]);

  const filteredStudents = useMemo(() => {
    return data.filter((s) => {
      const username = s.user?.username?.toLowerCase() || "";
      const nis = s.nis || "";
      const search = query.toLowerCase();
      return username.includes(search) || nis.includes(search);
    });
  }, [data, query]);

  const isAllSelected =
    filteredStudents.length > 0 &&
    selectedIds.length === filteredStudents.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const allSelected = filteredStudents.map((s) => ({
        studentId: s.studentId,
        userId: s.user?.userId || "",
      }));
      setSelectedIds(allSelected);
    }
  };

  const handleRefresh = () => {
    if (schoolId) {
      dispatch(fetchStudents(schoolId));
      toast.success("Data diperbarui");
    }
  };

  const handleBulkAddAccess = async () => {
    const studentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;

    if (!schoolId || !studentRoleId || selectedIds.length === 0) {
      return toast.error("Informasi tidak lengkap");
    }

    const userIds = selectedIds.map((item) => item.userId).filter((id) => !!id);

    confirmActionToast({
      title: "Berikan Akses",
      message: `Berikan hak akses aplikasi ke ${userIds.length} siswa ini?`,
      confirmText: "Ya, Berikan",
      variant: "warning",
      onConfirm: async () => {
        await dispatch(
          createBulkAccess({
            schoolId,
            userRoleId: studentRoleId,
            userIds: userIds,
          }),
        ).unwrap();
        toast.success("Hak akses berhasil diberikan");
        setSelectedIds([]);
      },
    });
  };

  const handleBulkRemoveAccess = async () => {
    const studentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STUDENT_ID;

    if (!schoolId || !studentRoleId || selectedIds.length === 0) {
      return toast.error("Informasi tidak lengkap");
    }

    const userIds = selectedIds.map((item) => item.userId).filter((id) => !!id);

    confirmActionToast({
      title: "Cabut Akses",
      message: `Cabut hak akses dari ${userIds.length} siswa ini? (Siswa tidak akan bisa login)`,
      confirmText: "Ya, Cabut Akses",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(
          deleteBulkAccess({
            schoolId,
            userRoleId: studentRoleId,
            userIds: userIds,
          }),
        ).unwrap();
        toast.success("Akses berhasil dicabut");
        setSelectedIds([]);
      },
    });
  };

  const handleDeleteSingle = async (studentId: string) => {
    if (!schoolId) return;

    confirmActionToast({
      title: "Hapus Siswa",
      message: "Apakah Anda yakin ingin menghapus data siswa ini?",
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(deleteStudent({ schoolId, studentId })).unwrap();
        toast.success("Siswa berhasil dihapus");
        setSelectedIds((prev) =>
          prev.filter((item) => item.studentId !== studentId),
        );
      },
    });
  };

  const handleDeleteBulk = async () => {
    if (!schoolId || selectedIds.length === 0) return;

    confirmActionToast({
      title: "Hapus Massal",
      message: `Hapus ${selectedIds.length} data siswa yang dipilih secara permanen?`,
      confirmText: "Ya, Hapus Semua",
      variant: "danger",
      onConfirm: async () => {
        const studentIds = selectedIds.map((item) => item.studentId);
        await dispatch(deleteBulkStudents({ schoolId, studentIds })).unwrap();
        toast.success("Berhasil dihapus massal");
        setSelectedIds([]);
      },
    });
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col-reverse xl:flex-row justify-between gap-6 items-center">
          <div className="flex gap-4 items-center">
            <button
              type="button"
              onClick={handleSelectAll}
              className={`flex items-center justify-center gap-3 px-3 lg:px-6 py-3.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.15em] shrink-0 w-auto ${
                isAllSelected
                  ? "bg-indigo-600 text-white "
                  : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100"
              }`}
            >
              {isAllSelected ? (
                <FiCheckSquare size={18} />
              ) : (
                <FiSquare size={18} />
              )}
              <span className="hidden lg:inline">
                {isAllSelected ? "Batal Pilih" : "Pilih Semua"}
              </span>
            </button>

            {selectedIds.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowOption(!showOption)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.15em] shadow-sm z-30 relative ${
                    showOption
                      ? "bg-slate-900 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <TbListDetails
                    size={18}
                    className={showOption ? "animate-pulse" : ""}
                  />
                  <span>Opsi Massal</span>
                  <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-lg text-[9px]">
                    {selectedIds.length}
                  </span>
                </button>

                {showOption && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setShowOption(false)}
                    />
                    <div className="absolute left-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-4xl shadow-2xl border border-slate-100 dark:border-slate-800 p-3 z-30 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
                      <div className="flex flex-col gap-1">
                        <div className="px-4 py-2 mb-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Tindakan
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            handleBulkAddAccess();
                            setShowOption(false);
                          }}
                          disabled={accessLoading}
                          className="flex items-center gap-3 w-full px-4 py-3 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl transition-all"
                        >
                          <FiUserPlus size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-left">
                            Beri Akses
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            handleBulkRemoveAccess();
                            setShowOption(false);
                          }}
                          disabled={accessLoading}
                          className="flex items-center gap-3 w-full px-4 py-3 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-2xl transition-all"
                        >
                          <FiUserMinus size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-left">
                            Cabut Akses
                          </span>
                        </button>

                        <div className="h-px bg-slate-50 dark:bg-slate-800 my-1" />

                        <button
                          onClick={() => {
                            handleDeleteBulk();
                            setShowOption(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all"
                        >
                          <FiTrash2 size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-left">
                            Hapus Data
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 w-full xl:w-auto">
            <div className="flex-1 xl:w-80">
              <SearchModal
                onSearch={setQuery}
                onRefresh={handleRefresh}
                isLoading={loading}
              />
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner">
              <button
                onClick={() => setView("list")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === "list"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600"
                    : "text-slate-400"
                }`}
              >
                <FiList size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setView("grid")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === "grid"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600"
                    : "text-slate-400"
                }`}
              >
                <FiGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {view === "list" ? (
          <StudentTableView
            students={filteredStudents}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDetail={(id) => router.push(`/staff/akademik/siswa/detail/${id}`)}
            onEdit={(s) => console.log("Edit", s)}
            onDelete={handleDeleteSingle}
          />
        ) : (
          <StudentGridView
            students={filteredStudents}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDetail={(id) => router.push(`/staff/akademik/siswa/detail/${id}`)}
            onEdit={(s) => console.log("Edit", s)}
            onDelete={handleDeleteSingle}
          />
        )}
      </div>
    </div>
  );
}
