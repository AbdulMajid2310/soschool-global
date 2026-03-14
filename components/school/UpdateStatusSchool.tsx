"use client";

import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchSchoolById, updateStatus } from "@/redux/features/school/thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiMail, FiUser, FiX } from "react-icons/fi";

export default function UpdateStatusSchool() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { selectedSchool, loading } = useAppSelector((state) => state.school);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchSchoolById(schoolId));
    }
  }, [dispatch, schoolId]);

  const handleUpdateStatus = async (status: boolean) => {
    if (!schoolId) return;

    const result = await dispatch(
      updateStatus({ id: schoolId, isActive: status }),
    );

    if (updateStatus.fulfilled.match(result)) {
      toast.success(
        `Sekolah berhasil ${status ? "diaktifkan" : "dinonaktifkan"}`,
      );
    } else {
      toast.error("Gagal memperbarui status");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6  ">
      <div>
        <h2 className="text-2xl font-black  uppercase italic">
          {selectedSchool?.name || "Belum Pilih Data"}
        </h2>
        <div className="flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1 text-[10px] font-bold  uppercase tracking-tighter">
            <FiUser className="text-emerald-500" /> PIC: {"Admin Sekolah"}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold  uppercase tracking-tighter">
            <FiMail className="text-emerald-500" />{" "}
            {selectedSchool?.email || "-"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {/* Tombol Tolak / Nonaktifkan */}
        <button
          type="button"
          onClick={() => handleUpdateStatus(false)}
          disabled={loading || !selectedSchool?.isActive}
          className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl text-[10px] font-black uppercase italic transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiX /> {selectedSchool?.isActive ? "Nonaktifkan" : "Tolak"}
        </button>

        {/* Tombol Verifikasi / Aktifkan */}
        <button
          type="button"
          onClick={() => handleUpdateStatus(true)}
          disabled={loading || selectedSchool?.isActive}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase italic transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiCheck />{" "}
          {selectedSchool?.isActive ? "Sudah Aktif" : "Verifikasi & Aktifkan"}
        </button>
      </div>
    </div>
  );
}
