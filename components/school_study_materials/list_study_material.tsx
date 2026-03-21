"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchMaterialsBySubject,
  deleteStudyMaterial,
} from "@/redux/features/school_study_material/thunks";
import { fetchTeachers } from "@/redux/features/teacher/thunk";
import {
  HiOutlineBookOpen,
  HiOutlineCloudUpload,
  HiOutlineTrash,
  HiOutlineDocumentText,
} from "react-icons/hi";
import toast from "react-hot-toast";
import { confirmActionToast } from "../toast/confirmActionToast";
import CreateStudyMaterial from "./CreateStudyMaterial";
import UpdateStudyMaterial from "./update_material_study";
import { useSchoolId } from "@/hooks/useSchoolId";

// Import Komponen Modular

const StudyMaterialManager = () => {
  const dispatch = useAppDispatch();

  // Global State
  const { materials, loading } = useAppSelector(
    (state) => state.schoolStudyMaterial,
  );
  const schoolId = useSchoolId();
  const subjectId = sessionStorage.getItem("subjectId");

  // Fetch data awal
  useEffect(() => {
    if (subjectId) dispatch(fetchMaterialsBySubject(subjectId));
    if (schoolId) dispatch(fetchTeachers(schoolId));
  }, [dispatch, subjectId, schoolId]);

  const handleDelete = (id: string, title: string) => {
    confirmActionToast({
      title: "Hapus Materi?",
      message: `Materi "${title}" akan dihapus. AI akan memperbarui ringkasan mata pelajaran.`,
      onConfirm: async () => {
        try {
          await dispatch(deleteStudyMaterial(id)).unwrap();
          toast.success("Materi berhasil dihapus");
        } catch (err: any) {
          toast.error(err || "Gagal menghapus materi");
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <HiOutlineDocumentText className="text-blue-600" size={24} />
            Materi<span className="text-blue-600">.</span>Pembelajaran
          </h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
            Total {materials?.length || 0} modul tersedia
          </p>
        </div>

        {/* Komponen Create Mandiri */}
        <CreateStudyMaterial />
      </div>

      {/* Content List */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : materials?.length === 0 ? (
        <div className="text-center py-20 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] bg-slate-50/30 dark:bg-slate-900/20">
          <HiOutlineBookOpen
            className="mx-auto text-slate-200 dark:text-slate-800 mb-4"
            size={64}
          />
          <p className="text-slate-400 font-black text-xs uppercase tracking-widest">
            Belum ada materi pembelajaran
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {materials.map((m) => (
            <div
              key={m.studyMaterialId}
              className="group flex items-center justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl hover:border-blue-500 transition-all shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl group-hover:rotate-6 transition-transform">
                  <HiOutlineCloudUpload size={28} />
                </div>
                <div>
                  <h4 className="font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">
                    {m.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">
                      {m.author?.user?.username || "Guru"}
                    </span>
                    <span className="text-slate-300">•</span>
                    <p className="text-[10px] text-slate-400 font-bold line-clamp-1 italic">
                      {m.description || "Tanpa deskripsi materi"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all">
                {/* Komponen Update Mandiri dengan passing data material */}
                <UpdateStudyMaterial material={m} />

                <button
                  onClick={() => handleDelete(m.studyMaterialId, m.title)}
                  className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all cursor-pointer"
                  title="Hapus Materi"
                >
                  <HiOutlineTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyMaterialManager;
