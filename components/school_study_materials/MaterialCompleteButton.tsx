import React, { useState } from "react";
import { updateStudyMaterial } from "@/redux/features/school_study_material/thunks";
import { useAppDispatch } from "@/redux/hooks";
import {
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoTimeOutline,
} from "react-icons/io5";

interface CompleteButtonProps {
  isComplete: boolean;
}

export default function MaterialCompleteButton({
  isComplete,
}: CompleteButtonProps) {
  const dispatch = useAppDispatch();
  const [localLoading, setLocalLoading] = useState(false);

  const handleToggleComplete = async () => {
    const storedId = sessionStorage.getItem("studyMaterialId");

    if (!storedId) {
      alert("ID Materi tidak ditemukan. Silakan refresh halaman.");
      return;
    }

    setLocalLoading(true);

    try {
      const dto = {
        studyMaterialId: storedId,
        isComplete: !isComplete,
      };

      // Kita gunakan unwrap agar bisa menangani error/success langsung di komponen
      await dispatch(updateStudyMaterial(dto as any)).unwrap();
    } catch (err) {
      console.error("Gagal memperbarui status:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleComplete}
      disabled={localLoading}
      className={`relative px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden ${
        localLoading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          : isComplete
            ? "bg-emerald-50 text-emerald-600 border border-emerald-500 hover:bg-emerald-100 shadow-sm"
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95"
      }`}
    >
      {localLoading ? (
        <>
          <IoTimeOutline className="animate-spin text-xl" />
          <span>Memproses...</span>
        </>
      ) : isComplete ? (
        <>
          <IoCheckmarkCircle className="text-xl" />
          <span>Selesai Dipelajari</span>
        </>
      ) : (
        <>
          <IoCloudUploadOutline className="text-xl" />
          <span>Tandai Selesai</span>
        </>
      )}

      {/* Efek kilauan saat loading */}
      {localLoading && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </button>
  );
}
