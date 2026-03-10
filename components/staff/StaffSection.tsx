"use client";

import { useEffect, useState, useMemo } from "react";
import {
  FiBriefcase,
  FiFilter,
  FiCheckSquare,
  FiSquare,
  FiUserPlus,
  FiUserMinus,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteStaff,
  deleteBulkStaffs,
  fetchStaffs,
  toggleStaffStatus,
} from "@/redux/features/staff/thunks";
import {
  createBulkAccess,
  deleteBulkAccess,
} from "@/redux/features/user-access/thunk";
import { getUserRoleByCode } from "@/redux/features/userRole/thunk";
import StaffStats from "./staffStats";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SearchModal } from "../SearchModal";
import CardSchoolStaff from "./CardSchoolStaff";
import { ScrollFilter } from "../ScrollFilter";

interface SelectedData {
  staffId: string;
  userId: string;
}

export default function StaffSection() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  const [query, setQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [selectedIds, setSelectedIds] = useState<SelectedData[]>([]);
  const [showOption, setShowOption] = useState(false);

  const { staffs, loading } = useAppSelector((state) => state.schoolStaff);
  const { role } = useAppSelector((state) => state.userRole);
  const { loading: accessActionLoading } = useAppSelector(
    (state) => state.userAccess,
  );

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchStaffs(schoolId));

      // Ambil Role ID Staff dari ENV
      const staffRoleCode = process.env.NEXT_PUBLIC_ROLE_STAFF_ID;
      if (staffRoleCode) {
        dispatch(getUserRoleByCode(staffRoleCode));
      }
    }
  }, [dispatch, schoolId]);

  const positions = useMemo(() => {
    const allPositions = staffs.map((s) => s.position).filter(Boolean);
    return ["All", ...Array.from(new Set(allPositions))];
  }, [staffs]);

  const filteredStaffs = useMemo(() => {
    return staffs.filter((s) => {
      const sQuery = query.toLowerCase();
      const matchesSearch =
        s.user.username.toLowerCase().includes(sQuery) ||
        (s.nip && s.nip.includes(query)) ||
        (s.position && s.position.toLowerCase().includes(sQuery));

      const matchesPosition =
        selectedPosition === "All" || s.position === selectedPosition;
      return matchesSearch && matchesPosition;
    });
  }, [staffs, query, selectedPosition]);

  const isAllSelected =
    filteredStaffs.length > 0 && selectedIds.length === filteredStaffs.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        filteredStaffs.map((s) => ({
          staffId: s.staffId,
          userId: s.user.userId,
        })),
      );
    }
  };

  const handleSelectOne = (staffId: string, userId: string) => {
    setSelectedIds((prev) => {
      const exist = prev.find((i) => i.staffId === staffId);
      if (exist) return prev.filter((i) => i.staffId !== staffId);
      return [...prev, { staffId, userId }];
    });
  };

  const handleBulkAccess = (type: "add" | "remove") => {
    const staffRoleId =
      role?.userRoleId || process.env.NEXT_PUBLIC_ROLE_STAFF_ID;
    const userIds = selectedIds.map((i) => i.userId).filter(Boolean);

    if (!schoolId || !staffRoleId || userIds.length === 0)
      return toast.error("Data tidak lengkap");

    confirmActionToast({
      title: type === "add" ? "Beri Akses" : "Cabut Akses",
      message: `Proses hak akses aplikasi untuk ${userIds.length} staff terpilih?`,
      confirmText: "Ya, Proses",
      variant: type === "add" ? "warning" : "danger",
      onConfirm: async () => {
        const action = type === "add" ? createBulkAccess : deleteBulkAccess;
        await dispatch(
          action({ schoolId, userRoleId: staffRoleId, userIds }),
        ).unwrap();
        toast.success(`Akses staff berhasil diperbarui`);
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  const handleBulkDelete = () => {
    confirmActionToast({
      title: "Hapus Staff Massal",
      message: `Hapus permanen ${selectedIds.length} data staff terpilih?`,
      confirmText: "Hapus Semua",
      variant: "danger",
      onConfirm: async () => {
        const userIds = selectedIds.map((i) => i.userId);
        await dispatch(
          deleteBulkStaffs({ schoolId: schoolId!, userIds }),
        ).unwrap();
        toast.success("Data massal berhasil dihapus");
        setSelectedIds([]);
        setShowOption(false);
      },
    });
  };

  const handleDelete = (staffId: string) => {
    confirmActionToast({
      title: "Hapus Staff",
      message:
        "Apakah Anda yakin ingin menghapus data staff ini secara permanen?",
      confirmText: "Ya, Hapus",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(deleteStaff({ staffId, schoolId: schoolId! })).unwrap();
        toast.success("Data staff berhasil dihapus");
        setSelectedIds((prev) => prev.filter((i) => i.staffId !== staffId));
      },
    });
  };

  const handleToggleStatus = (staffId: string, currentStatus: boolean) => {
    const actionText = !currentStatus ? "Aktifkan" : "Nonaktifkan";
    confirmActionToast({
      title: `${actionText} Staff`,
      message: `Ubah akses staff menjadi ${actionText.toLowerCase()}?`,
      confirmText: `Ya, ${actionText}`,
      variant: "warning",
      onConfirm: async () => {
        await dispatch(
          toggleStaffStatus({
            staffId,
            schoolId: schoolId!,
            isActive: !currentStatus,
          }),
        ).unwrap();
        toast.success(`Staff berhasil di ${actionText}`);
      },
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
            Personalia <span className="text-indigo-600">Staff</span>
          </h1>
          <p className="text-gray-400 mt-2 font-bold flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
            <span className="w-8 h-1 bg-indigo-500 inline-block"></span>
            Manajemen Operasional Non-Akademik
          </p>
        </div>
      </div>

      <StaffStats />

      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col xl:flex-row justify-between gap-6">
        <div className="flex gap-3 items-center">
          <button
            title={isAllSelected ? "Batal pilih" : "Pilih semua"}
            onClick={handleSelectAll}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isAllSelected ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600"}`}
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
                title="Opsi Massal"
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
                      disabled={accessActionLoading}
                      className="flex items-center gap-4 w-full px-5 py-4 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-2xl font-black text-[10px] uppercase transition-all"
                    >
                      <FiUserPlus size={20} /> Beri Akses Login
                    </button>
                    <button
                      title="Cabut Akses"
                      onClick={() => handleBulkAccess("remove")}
                      disabled={accessActionLoading}
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

        <div className="flex flex-col md:flex-row items-center gap-4 flex-1 justify-end">
          <div className="w-full max-w-md">
            <SearchModal
              onSearch={setQuery}
              onRefresh={() => dispatch(fetchStaffs(schoolId!))}
              isLoading={loading}
            />
          </div>
          <div className="w-full md:w-64">
            <ScrollFilter
              items={positions}
              selectedItem={selectedPosition}
              onSelect={setSelectedPosition}
              labelCase="capitalize"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-72 bg-slate-100 dark:bg-slate-800 rounded-4xl"
            />
          ))}
        </div>
      ) : filteredStaffs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4 bg-white dark:bg-slate-900 rounded-4xl border-4 border-dashed border-slate-50 dark:border-slate-800">
          <FiAlertCircle size={80} className="text-slate-200" />
          <h3 className="text-2xl font-black uppercase italic text-slate-300">
            Data Staff Tidak Ditemukan
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStaffs.map((s) => {
            const isSelected = selectedIds.some((i) => i.staffId === s.staffId);
            return (
              <div key={s.staffId} className="relative group">
                <button
                  title={isSelected ? "Batal pilih" : "Pilih staff"}
                  onClick={() => handleSelectOne(s.staffId, s.user.userId)}
                  className={`absolute top-6 left-6 z-10 p-2 rounded-xl transition-all shadow-md ${isSelected ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-slate-200 opacity-0 group-hover:opacity-100"}`}
                >
                  {isSelected ? (
                    <FiCheckSquare size={20} />
                  ) : (
                    <FiSquare size={20} />
                  )}
                </button>
                <CardSchoolStaff
                  staff={s}
                  onToggleStatus={handleToggleStatus}
                  onEdit={(staff) => console.log("Edit:", staff)}
                  onDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
