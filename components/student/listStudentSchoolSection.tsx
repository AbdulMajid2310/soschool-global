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
  FiSearch,
  FiList,
  FiGrid,
  FiTrash2,
  FiCheckSquare,
  FiSquare,
} from "react-icons/fi";
import { StudentTableView } from "./StudentTableView";
import { StudentGridView } from "./StudentGridView";
import { SearchModal } from "../SearchModal";

export default function ListStudentSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const { students: data, loading } = useAppSelector((state) => state.student);

  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchStudents(schoolId));
    }
  }, [dispatch, schoolId]);

  const filteredStudents = useMemo(() => {
    return data.filter((s) => {
      const matchQuery =
        s.user.username.toLowerCase().includes(query.toLowerCase()) ||
        s.nis.includes(query);
      return matchQuery;
    });
  }, [data, query]);

  const isAllSelected =
    filteredStudents.length > 0 &&
    selectedIds.length === filteredStudents.length;

  const handleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(filteredStudents.map((s) => s.studentId));
  };

  const handleRefresh = () => {
    if (schoolId) {
      dispatch(fetchStudents(schoolId));
      toast.success("Data diperbarui");
    }
  };

  const handleDeleteSingle = async (studentId: string) => {
    if (!schoolId) return;
    if (confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      try {
        await dispatch(deleteStudent({ schoolId, studentId })).unwrap();
        toast.success("Siswa berhasil dihapus");
        setSelectedIds((prev) => prev.filter((id) => id !== studentId));
      } catch (err: any) {
        toast.error(err || "Gagal menghapus");
      }
    }
  };

  const handleDeleteBulk = async () => {
    if (!schoolId || selectedIds.length === 0) return;

    if (confirm(`Hapus ${selectedIds.length} siswa yang dipilih?`)) {
      try {
        await dispatch(
          deleteBulkStudents({ schoolId, studentIds: selectedIds }),
        ).unwrap();

        toast.success("Semua siswa terpilih berhasil dihapus");
        setSelectedIds([]); // Reset checkbox setelah berhasil
      } catch (err: any) {
        toast.error(err || "Gagal menghapus massal");
      }
    }
  };

  return (
    <div className="space-y-6 bg-transparent">
      {/* Toolbar Section */}
      <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex  flex-col-reverse xl:flex-row gap-6 items-center">
          {/* SISI KIRI: Select All & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full flex-1">
            <div className="w-full">
              <SearchModal
                onSearch={(q) => setQuery(q)}
                onRefresh={handleRefresh}
                isLoading={loading}
              />
            </div>
          </div>

          {/* SISI KANAN: View Switcher, Stats & Delete */}
          <div className="flex  items-center justify-center sm:justify-between xl:justify-end gap-4 w-full xl:w-auto ">
            {/* View Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl shadow-inner">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === "list"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 ring-1 ring-slate-200/50"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <FiList size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === "grid"
                    ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 ring-1 ring-slate-200/50"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <FiGrid size={16} />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
            <button
              type="button"
              onClick={handleSelectAll}
              className={`flex items-center justify-center gap-3 px-3 lg:px-6 py-3.5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.15em] shrink-0 w-auto  ${
                isAllSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {isAllSelected ? (
                <FiCheckSquare size={18} />
              ) : (
                <FiSquare size={18} />
              )}
              <span className="hidden lg:inline">
                {isAllSelected ? "Deselect All" : "Select All"}
              </span>
            </button>

            {/* Bulk Delete Button */}
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteBulk}
                className="flex items-center gap-3 px-6 py-3.5 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-rose-200 dark:shadow-none animate-in zoom-in duration-300"
              >
                <FiTrash2 size={16} />
                <span className="hidden lg:inline">Hapus </span>
                {selectedIds.length}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-8">
        {view === "list" ? (
          <StudentTableView
            students={filteredStudents}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDetail={(id) => router.push(`/staff/akademik/siswa/detail/${id}`)}
            onEdit={(s) => console.log("Edit", s)} // Ganti dengan fungsi edit kamu
            onDelete={handleDeleteSingle}
          />
        ) : (
          <StudentGridView
            students={filteredStudents}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDetail={(id) => router.push(`/staff/akademik/siswa/detail/${id}`)}
            onEdit={(s) => console.log("Edit", s)} // Ganti dengan fungsi edit kamu
            onDelete={handleDeleteSingle}
          />
        )}
      </div>
    </div>
  );
}

const StatCard = ({ label, count, color }: any) => (
  <div className="bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col min-w-24">
    <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">
      {label}
    </span>
    <span className={`text-xl font-black tracking-tighter ${color}`}>
      {count}
    </span>
  </div>
);
