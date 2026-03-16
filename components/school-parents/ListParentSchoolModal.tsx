"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSchoolId } from "@/hooks/useSchoolId";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteParent,
  deleteBulkParents,
  fetchParents,
} from "@/redux/features/school-parents/thunks";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
import { SearchModal } from "../SearchModal";
import { HiOutlineSquares2X2, HiOutlineListBullet } from "react-icons/hi2";
import {
  FiCheckSquare,
  FiSquare,
  FiUserPlus,
  FiUserMinus,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import toast from "react-hot-toast";
import { ListTableParentSection } from "./ListTableParentSection";
import { ListCardParentSection } from "./ListCardParentSection";
import { useRouter } from "next/navigation";
import { confirmActionToast } from "@/components/toast/confirmActionToast";

interface SelectedData {
  parentId: string;
  userId: string;
}

export const ListParentSchoolModal = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const router = useRouter();

  const { parents, loading, error } = useAppSelector(
    (state) => state.schoolParents,
  );
  const { role } = useAppSelector((state) => state.userRole);

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [selectedIds, setSelectedIds] = useState<SelectedData[]>([]);
  const [showOption, setShowOption] = useState(false);
  console.log(parents);
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchParents(schoolId));
      const parentRoleCode = process.env.NEXT_PUBLIC_ROLE_PARENT_ID;
      if (parentRoleCode) dispatch(getUserRoleByCode(parentRoleCode));
    }
  }, [dispatch, schoolId]);

  const filteredParents = useMemo(() => {
    // Gunakan fallback array kosong [] jika parents bernilai null atau undefined
    const safeParents = parents ?? [];

    return safeParents.filter((parent) => {
      const searchStr = searchQuery.toLowerCase();

      // Gunakan optional chaining pada relasi user dan students untuk keamanan ekstra
      const matchesUser =
        parent.user?.username?.toLowerCase().includes(searchStr) ||
        parent.user?.email?.toLowerCase().includes(searchStr);

      const matchesStudents =
        parent.students?.some((s) =>
          s.user?.username?.toLowerCase().includes(searchStr),
        ) ?? false;

      return matchesUser || matchesStudents;
    });
  }, [parents, searchQuery]);

  const isAllSelected =
    filteredParents.length > 0 && selectedIds.length === filteredParents.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        filteredParents.map((p) => ({
          parentId: p.parentId,
          userId: p.user.userId,
        })),
      );
    }
  };

  const handleBulkAccess = (type: "add" | "remove") => {
    const parentRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_PARENT_ID;
    const userIds = selectedIds.map((i) => i.userId).filter(Boolean);

    if (!schoolId || !parentRoleId || userIds.length === 0)
      return toast.error("Data tidak lengkap");

    confirmActionToast({
      title: type === "add" ? "Beri Akses" : "Cabut Akses",
      message: `Proses hak akses login untuk ${userIds.length} wali murid terpilih?`,
      confirmText: "Ya, Proses",
      variant: type === "add" ? "warning" : "danger",
      onConfirm: async () => {
        const action = type === "add" ? createBulkAccess : deleteBulkAccess;
        await dispatch(
          action({ schoolId, userRoleId: parentRoleId, userIds }),
        ).unwrap();
        toast.success(`Akses berhasil diperbarui`);
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  const handleBulkDelete = () => {
    confirmActionToast({
      title: "Hapus Massal",
      message: `Hapus permanen ${selectedIds.length} data wali murid?`,
      confirmText: "Hapus Semua",
      variant: "danger",
      onConfirm: async () => {
        const userIds = selectedIds.map((i) => i.userId);
        await dispatch(
          deleteBulkParents({ schoolId: schoolId!, userIds }),
        ).unwrap();
        toast.success("Data massal berhasil dihapus");
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  const handleDelete = (parentId: string, parentName: string) => {
    confirmActionToast({
      title: "Hapus Orang Tua",
      message: `Hapus data ${parentName} secara permanen?`,
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(
          deleteParent({ schoolId: schoolId!, parentId }),
        ).unwrap();
        toast.success("Data berhasil dihapus");
        setSelectedIds((prev) => prev.filter((i) => i.parentId !== parentId));
      },
    });
  };

  const handleUpdateParent = (parentId: string) => {
    sessionStorage.setItem("parentId", parentId);
    router.push("parent/update");
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen animate-in fade-in duration-500">
      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col xl:flex-row justify-between gap-6">
        <div className="flex gap-3 items-center">
          <button
            title={isAllSelected ? "Batal pilih semua" : "Pilih semua data"}
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
                title="Tindakan Massal"
                onClick={() => setShowOption(!showOption)}
                className="flex items-center gap-3 px-6 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl relative z-30 animate-in zoom-in"
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
                      title="Beri Akses"
                      onClick={() => handleBulkAccess("add")}
                      className="flex items-center gap-4 w-full px-5 py-4 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiUserPlus size={20} /> Beri Akses Login
                    </button>
                    <button
                      title="Cabut Akses"
                      onClick={() => handleBulkAccess("remove")}
                      className="flex items-center gap-4 w-full px-5 py-4 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiUserMinus size={20} /> Cabut Akses Login
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2 mx-4" />
                    <button
                      title="Hapus Massal"
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
              onSearch={setSearchQuery}
              onRefresh={() => schoolId && dispatch(fetchParents(schoolId))}
              isLoading={loading}
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              title="Tampilan Grid"
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
            >
              <HiOutlineSquares2X2 size={22} />
            </button>
            <button
              title="Tampilan Tabel"
              onClick={() => setViewMode("table")}
              className={`p-3 rounded-xl transition-all ${viewMode === "table" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
            >
              <HiOutlineListBullet size={22} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-5 bg-rose-50 dark:bg-rose-500/10 border-2 border-rose-100 dark:border-rose-500/20 text-rose-600 rounded-3xl text-[10px] font-black uppercase italic animate-in slide-in-from-left-4">
          ⚠️ System Error: {error}
        </div>
      )}

      {/* Render Section */}
      <div className="relative">
        {viewMode === "table" ? (
          <ListTableParentSection
            loading={loading}
            parents={parents}
            filteredParents={filteredParents}
            onEdit={(parent) => handleUpdateParent(parent.parentId)}
            onDelete={handleDelete}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        ) : (
          <ListCardParentSection
            loading={loading}
            parents={parents}
            filteredParents={filteredParents}
            onEdit={(parent) => handleUpdateParent(parent.parentId)}
            onDelete={handleDelete}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        )}
      </div>
    </div>
  );
};
