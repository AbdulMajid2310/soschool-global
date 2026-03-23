import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { updateStudyMaterial } from "@/redux/features/school_study_material/thunks";

interface MaterialCompleteButtonProps {
  studyMaterialId: string; // Ambil ID dari props lebih aman daripada sessionStorage
  isComplete: boolean;
}

export default function MaterialCompleteButton({
  studyMaterialId,
  isComplete,
}: MaterialCompleteButtonProps) {
  const dispatch = useAppDispatch();
  const [localLoading, setLocalLoading] = useState(false);

  const handleToggleComplete = async () => {
    const targetId =
      studyMaterialId || sessionStorage.getItem("studyMaterialId");

    if (!targetId) {
      alert("ID Materi tidak ditemukan.");
      return;
    }

    setLocalLoading(true);

    try {
      // 2. Tentukan nilai baru (Logic: Toggle)
      const nextStatus = !isComplete;

      // 3. Siapkan FormData
      const formData = new FormData();
      // Mengirim sebagai string "true" atau "false" (akan dihandle @Transform di Backend)
      formData.append("isComplete", String(nextStatus));

      // 4. Eksekusi Thunk
      await dispatch(
        updateStudyMaterial({
          id: targetId,
          formData: formData,
        }),
      ).unwrap();

      // Opsional: Kamu bisa tambahkan toast sukses di sini
    } catch (err: any) {
      console.error("Gagal memperbarui status:", err);
      // Menampilkan pesan error spesifik dari backend jika ada
      alert(err || "Terjadi kesalahan saat memperbarui status.");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleComplete}
      disabled={localLoading}
      type="button"
      className={`relative px-6 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 overflow-hidden ${
        localLoading
          ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          : isComplete
            ? "bg-emerald-50 text-emerald-600 border border-emerald-500 hover:bg-emerald-100 shadow-sm"
            : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95"
      }`}
    >
      <div className="flex items-center gap-2 z-10">
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
      </div>

      {/* Efek kilauan saat loading - Memperbaiki class gradient */}
      {localLoading && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      )}
    </button>
  );
}
