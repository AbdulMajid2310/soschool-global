"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react"; // Tambah useMemo
import { FiBriefcase, FiFilter } from "react-icons/fi"; // Tambah FiFilter
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteStaff,
  fetchStaffs,
  toggleStaffStatus,
} from "@/redux/features/staff/thunks";
import StaffStats from "./staffStats";
import { confirmActionToast } from "@/components/toast/confirmActionToast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SearchModal } from "../SearchModal";
import CardSchoolStaff from "./CardSchoolStaff";
import { ScrollFilter } from "../ScrollFilter";

export default function StaffSection() {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All"); // State baru untuk filter

  const { staffs, loading } = useAppSelector((state) => state.schoolStaff);
  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId) dispatch(fetchStaffs(schoolId));
  }, [dispatch, schoolId]);

  // Mendapatkan daftar posisi unik untuk dropdown
  const positions = useMemo(() => {
    const allPositions = staffs.map((s) => s.position);
    return ["All", ...Array.from(new Set(allPositions))];
  }, [staffs]);

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
      },
    });
  };

  const handleToggleStatus = (staffId: string, currentStatus: boolean) => {
    const actionText = !currentStatus ? "Aktifkan" : "Nonaktifkan";
    confirmActionToast({
      title: `${actionText} Staff`,
      message: `Apakah Anda yakin ingin ${actionText.toLowerCase()} akses staff ini?`,
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

  const handleRefresh = () => {
    if (schoolId) {
      dispatch(fetchStaffs(schoolId));
      toast.success("Data diperbarui");
    }
  };

  // Logika filter yang digabung (Search + Position)
  const filteredStaffs = staffs.filter((s) => {
    const matchesSearch =
      s.user.username.toLowerCase().includes(query.toLowerCase()) ||
      (s.nip && s.nip.includes(query)) ||
      s.position.toLowerCase().includes(query.toLowerCase());

    const matchesPosition =
      selectedPosition === "All" || s.position === selectedPosition;

    return matchesSearch && matchesPosition;
  });

  return (
    <div className="p-4 space-y-10 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">
            Personalia Staff
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-bold flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 inline-block"></span>
            Manajemen operasional non-akademik SoSchool
          </p>
        </div>
      </div>

      <StaffStats />

      {/* Kontainer Filter & Search */}
      <div className="sticky top-4 z-20 flex flex-col md:flex-row items-center gap-3">
        <div className=" w-full">
          <SearchModal
            onSearch={(e) => setQuery(e)}
            onRefresh={handleRefresh}
            isLoading={loading}
          />
        </div>

        {/* Dropdown Filter Position */}
        <div className="relative w-full ">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FiFilter />
          </div>
          <ScrollFilter
            items={positions}
            selectedItem={selectedPosition}
            onSelect={setSelectedPosition}
            labelCase="capitalize"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-72 bg-white dark:bg-gray-900 rounded-[2.5rem] animate-pulse border border-gray-100 dark:border-gray-800"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaffs.map((s) => (
            <CardSchoolStaff
              key={s.staffId}
              staff={s}
              onToggleStatus={handleToggleStatus}
              onEdit={(staff) => console.log("Edit:", staff)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && filteredStaffs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-gray-900 rounded-[3rem] border-4 border-dashed border-gray-50 dark:border-gray-800">
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-full mb-6">
            <FiBriefcase
              size={60}
              className="text-gray-200 dark:text-gray-700"
            />
          </div>
          <h3 className="text-2xl font-black text-gray-400 italic uppercase tracking-widest">
            Data Kosong
          </h3>
          <p className="text-gray-400 font-bold mt-2">
            Tidak ada staff dengan kriteria tersebut
          </p>
        </div>
      )}
    </div>
  );
}
