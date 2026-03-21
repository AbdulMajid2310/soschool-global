"use client";

import React from "react";
import {
  FiBookOpen,
  FiCheckCircle,
  FiEdit3,
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { FaSwatchbook } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { StudyMaterial } from "@/redux/features/school_study_material/types";
import { useAppDispatch } from "@/redux/hooks";
import { confirmActionToast } from "../toast/confirmActionToast";
import { deleteStudyMaterial } from "@/redux/features/school_study_material/thunks";
import toast from "react-hot-toast";

interface DigitalResourcesProps {
  materials: StudyMaterial[];
}

const DigitalResources: React.FC<DigitalResourcesProps> = ({ materials }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDetailMaterial = (id: string) => {
    router.push("/gr/study-material/detail");
    sessionStorage.setItem("studyMaterialId", id);
  };

  const handleDeleteMaterial = (id: string) => {
    confirmActionToast({
      title: "Hapus Materi Digital",
      message:
        "Data materi akan dihapus permanen dari sistem. Protokol ini tidak dapat dibatalkan. Lanjutkan?",
      confirmText: "Ya, Hapus Permanen",
      variant: "danger",
      onConfirm: async () => {
        try {
          await dispatch(deleteStudyMaterial(id)).unwrap();
          toast.success("Materi berhasil dihapus dari database");
        } catch (err) {
          // Error sudah ditangani secara global oleh matcher di slice
          console.error("Delete Protocol Failed:", err);
        }
      },
    });
  };
  return (
    <section className="rounded-4xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
          <FiBookOpen className="text-blue-600" /> Digital Resources
        </h3>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500 uppercase">
            {materials.length} Items
          </span>
          <button
            onClick={() => router.push("/gr/study-material/add")}
            title="Tambah Materi"
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-90 cursor-pointer"
          >
            <FaSwatchbook size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {materials.length > 0 ? (
          materials.map((m) => (
            <div
              key={m.studyMaterialId}
              className="flex items-center justify-between p-4 pl-5 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    m.isComplete
                      ? "text-blue-500 bg-blue-500/10"
                      : "text-slate-300 bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  <FiCheckCircle size={20} />
                </div>
                <span className="text-xs font-black text-slate-700 dark:text-white uppercase group-hover:text-blue-600 transition-colors">
                  {m.title}
                </span>
              </div>

              {/* ACTION BUTTONS GROUP */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDetailMaterial(m.studyMaterialId)}
                  className="p-2.5 rounded-xl text-slate-400 hover:bg-blue-500/10 hover:text-blue-500 transition-all cursor-pointer"
                  title="View Detail"
                >
                  <FiEye size={16} />
                </button>
                <button
                  className="p-2.5 rounded-xl text-slate-400 hover:bg-amber-500/10 hover:text-amber-500 transition-all cursor-pointer"
                  title="Edit Material"
                >
                  <FiEdit3 size={16} />
                </button>
                <button
                  onClick={(e) => handleDeleteMaterial(m.studyMaterialId)}
                  className="p-2.5 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all cursor-pointer"
                  title="Delete Material"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center rounded-3xl border-2 border-dashed border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Protocol: Zero Materials found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DigitalResources;
