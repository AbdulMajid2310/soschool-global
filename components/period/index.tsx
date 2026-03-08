"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";

// Import Thunks & Actions
import {
  fetchSchoolPeriods,
  togglePeriodStatus,
  deletePeriod,
  fetchActivePeriod,
} from "@/redux/features/school-period/thunk";
import { resetPeriodState } from "@/redux/features/school-period/slice";

// Import Shared Components & Hooks
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SchoolPeriod } from "@/redux/features/school-period/types";
import { PeriodHeaderSection } from "./PeriodHeaderSection";
import { PeriodListSection } from "./PeriodListSection";
import { AddPeriodModal } from "./AddPeriodModal";
import { UpdatePeriodModal } from "./UpdatePeriodModal";

export default function SchoolPeriodManagementSection() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  // 1. Selector State dari Redux
  const { periods, loading, success, error } = useAppSelector(
    (state) => state.schoolPeriod,
  );

  // 2. Local State untuk UI Control
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPeriodForUpdate, setSelectedPeriodForUpdate] =
    useState<SchoolPeriod | null>(null);

  // 3. Initial Data Fetching
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolPeriods(schoolId));
      dispatch(fetchActivePeriod(schoolId));
    }
  }, [dispatch, schoolId]);

  // 4. Global Listener untuk Error Handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetPeriodState());
    }
  }, [error, dispatch]);

  // 5. Handlers untuk Action List
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
        await dispatch(togglePeriodStatus({ id, schoolId })).unwrap();
        toast.success("Status periode berhasil diubah");
      },
    });
  };

  const handleDelete = (id: string, isActive: boolean) => {
    if (isActive) return toast.error("Periode aktif tidak boleh dihapus!");
    if (!schoolId) return;

    confirmActionToast({
      title: "Hapus Periode",
      message: "Data periode yang dihapus tidak dapat dikembalikan. Lanjutkan?",
      confirmText: "Hapus Permanen",
      variant: "danger",
      onConfirm: async () => {
        await dispatch(deletePeriod({ id, schoolId })).unwrap();
        toast.success("Periode berhasil dihapus");
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 antialiased">
      {/* 1. Header Section */}
      <PeriodHeaderSection onAddClick={() => setIsAddModalOpen(true)} />

      {/* 2. Main List Section */}
      <div className="min-h-100">
        <PeriodListSection
          periods={periods}
          loading={loading}
          onEdit={(period) => setSelectedPeriodForUpdate(period)}
          onToggle={handleToggleActive}
          onDelete={handleDelete}
        />
      </div>

      {/* 3. Modal Add Period */}
      <AddPeriodModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        schoolId={schoolId || ""}
      />

      {/* 4. Modal Update Period */}
      <UpdatePeriodModal
        isOpen={!!selectedPeriodForUpdate}
        onClose={() => setSelectedPeriodForUpdate(null)}
        schoolId={schoolId || ""}
        initialData={selectedPeriodForUpdate}
      />

      {/* Hint / Footer Information */}
      {!loading && periods.length > 0 && (
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-4">
          Gunakan periode aktif untuk mengatur rentang operasional akademik saat
          ini.
        </p>
      )}
    </div>
  );
}
