"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSchoolId } from "@/hooks/useSchoolId";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteParent,
  fetchParents,
} from "@/redux/features/school-parents/thunks";
import { SearchModal } from "../SearchModal";
import { HiOutlineSquares2X2, HiOutlineListBullet } from "react-icons/hi2";
import toast from "react-hot-toast";
import { ListTableParentSection } from "./ListTableParentSection";
import { ListCardParentSection } from "./ListCardParentSection";
import { useRouter } from "next/navigation";

export const ListParentSchoolModal = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const router = useRouter();

  // State Management
  const { parents, loading, error } = useAppSelector(
    (state) => state.schoolParents,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchParents(schoolId));
    }
  }, [dispatch, schoolId]);

  // Client-side Filtering
  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        parent.user.username.toLowerCase().includes(searchStr) ||
        parent.user.email.toLowerCase().includes(searchStr) ||
        parent.students.some((s) =>
          s.user.username.toLowerCase().includes(searchStr),
        )
      );
    });
  }, [parents, searchQuery]);

  const handleDelete = async (parentId: string, parentName: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus data orang tua: ${parentName}?`,
    );

    if (isConfirmed && schoolId) {
      try {
        await dispatch(deleteParent({ schoolId, parentId })).unwrap();
        toast.success("Data berhasil dihapus");
      } catch (err: any) {
        toast.error(err || "Gagal menghapus data");
      }
    }
  };

  const handleUpdateParent = (parentId: string) => {
    sessionStorage.setItem("parentId", parentId);
    router.push("parent/update");
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight italic uppercase">
            Data Orang Tua
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Kelola wali murid dan relasi anak didik
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchModal
            onSearch={(query) => setSearchQuery(query)}
            onRefresh={() => schoolId && dispatch(fetchParents(schoolId))}
            isLoading={loading}
          />
          {/* Toggle View Mode */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              title="card"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
            >
              <HiOutlineSquares2X2 size={20} />
            </button>
            <button
              type="button"
              title="table"
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-xl transition-all ${viewMode === "table" ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm" : "text-slate-400"}`}
            >
              <HiOutlineListBullet size={20} />
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black uppercase italic rounded-2xl animate-in fade-in duration-300">
          ⚠️ Error: {error}
        </div>
      )}

      {/* Conditional Rendering based on View Mode */}
      {viewMode === "table" ? (
        <ListTableParentSection
          loading={loading}
          parents={parents}
          filteredParents={filteredParents}
          onEdit={(parent) => handleUpdateParent(parent.parentId)}
          onDelete={handleDelete}
        />
      ) : (
        <ListCardParentSection
          loading={loading}
          parents={parents}
          filteredParents={filteredParents}
          onEdit={(parent) => handleUpdateParent(parent.parentId)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
