"use client";

import React, { useState, useEffect } from "react";
import {
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateParent,
  fetchParentById,
} from "@/redux/features/school-parents/thunks";
import SelectedStudentModal from "@/components/student/SelectedStudentModal";
import { UpdateParentPayload } from "@/redux/features/school-parents/types";
import { useSchoolId } from "@/hooks/useSchoolId";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCurrentParent } from "@/redux/features/school-parents/slices";

export const UpdateParentRelation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { currentParent, loading } = useAppSelector(
    (state) => state.schoolParents,
  );
  const { students } = useAppSelector((state) => state.student);

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const parentId = sessionStorage.getItem("parentId");
    if (parentId && schoolId) {
      dispatch(fetchParentById({ schoolId, parentId }));
    }
    return () => {
      dispatch(clearCurrentParent());
    };
  }, [dispatch, schoolId]);

  useEffect(() => {
    if (currentParent?.students) {
      setSelectedStudentIds(currentParent.students.map((s) => s.studentId));
    }
  }, [currentParent]);

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const handleSubmit = async () => {
    if (selectedStudentIds.length === 0) {
      toast.error("Minimal satu relasi siswa diperlukan");
      return;
    }

    if (!currentParent?.parentId || !schoolId) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Sinkronisasi database relasi...");

    const payload: UpdateParentPayload = {
      studentIds: selectedStudentIds,
    };

    try {
      await dispatch(
        updateParent({
          schoolId,
          parentId: currentParent.parentId,
          payload,
        }),
      ).unwrap();

      toast.success("Sinkronisasi relasi berhasil!", { id: loadingToast });
      router.back();
    } catch (err: any) {
      toast.error(err || "Gagal memperbarui relasi", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !currentParent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-30">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic animate-pulse text-center">
          Synchronizing Identity...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-4 md:py-8 px-2 md:px-4">
      <div className="bg-white dark:bg-slate-900 rounded-4xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-white/5 animate-in zoom-in duration-500">
        {/* Header Section - Responsive Flex */}
        <div className="p-6 md:p-10 py-5 flex flex-col sm:flex-row justify-between items-center bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

          <div className="relative z-10 flex items-center gap-4 md:gap-8">
            <div className="p-3 md:p-5 bg-white/5 backdrop-blur-2xl rounded-3xl md:rounded-4xl border border-white/10 shadow-inner text-indigo-400">
              <HiOutlinePencilSquare size={24} />
            </div>
            <div>
              <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 italic leading-none mb-2">
                Relational Mapping
              </p>
              <h2 className="text-lg md:text-xl font-black uppercase italic tracking-tighter leading-none">
                Update Linkage
              </h2>
            </div>
          </div>

          <div className="relative z-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              title="Commit system changes"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] rounded-2xl md:rounded-4xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-20 flex items-center justify-center gap-3 italic group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <HiOutlineShieldCheck
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span className="whitespace-nowrap">Confirm Update</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body - Responsive Grid */}
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Parent Info Card */}
          {currentParent && (
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 bg-linear-to-br from-slate-50 to-white dark:from-white/5 dark:to-transparent border border-slate-100 dark:border-white/10 rounded-4xl shadow-sm relative group h-fit">
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-4xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-3xl md:text-4xl shadow-xl italic transition-transform group-hover:scale-105 duration-500">
                {currentParent.user.username.charAt(0)}
              </div>

              <div className="flex-1 overflow-hidden text-center sm:text-left">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] italic mb-2 leading-none">
                  Verified Account
                </p>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tight leading-none truncate">
                  {currentParent.user.username}
                </h3>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                  <div className="px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white rounded-lg text-[8px] font-black tracking-widest uppercase shadow-md">
                    REG ID
                  </div>
                  <p className="text-xs md:text-sm font-mono text-slate-500 dark:text-slate-400 font-bold tracking-widest leading-none">
                    {currentParent.user.registrationNumber || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mapping Control Section */}
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 px-2">
              <div className="text-center sm:text-left">
                <h4 className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center sm:justify-start gap-3 italic mb-1">
                  <HiOutlineUserGroup size={20} className="text-indigo-500" />
                  Linked Dependents
                </h4>
                <p className="hidden sm:block text-[9px] text-slate-400 font-bold uppercase tracking-widest ml-8 italic leading-none">
                  Manage parent-student linkages
                </p>
              </div>
              <span className="text-[9px] md:text-[10px] font-black px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-full border border-indigo-100 dark:border-indigo-500/20 uppercase tracking-widest shadow-inner">
                {selectedStudentIds.length} Linked
              </span>
            </div>

            {/* Modal/Trigger Area */}
            <div className="relative z-60">
              <SelectedStudentModal
                selectedIds={selectedStudentIds}
                onSelect={handleToggleStudent}
              />
            </div>

            {/* Student List Container */}
            <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto pr-1 scrollbar-hide">
              {selectedStudentIds.length > 0 ? (
                selectedStudentIds.map((id) => {
                  const student = students.find((s) => s.studentId === id);
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-4 md:p-5 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-3xl md:rounded-4xl group animate-in slide-in-from-bottom-6 shadow-sm hover:shadow-md transition-all duration-500"
                    >
                      <div className="flex items-center gap-4 md:gap-5 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-xs md:text-sm text-slate-400 italic shadow-inner">
                          {student?.user.username.charAt(0) || "S"}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] md:text-[11px] font-black uppercase italic text-slate-700 dark:text-white truncate max-w-37.5 md:max-w-none leading-none mb-1.5">
                            {student?.user.username || "Unknown"}
                          </span>
                          <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-70 leading-none">
                            NIS {student?.nis}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleStudent(id)}
                        type="button"
                        title="Remove Mapping"
                        className="p-2 md:p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all duration-300 active:scale-90"
                      >
                        <HiOutlineXMark size={20} />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 md:py-20 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-4xl opacity-40 flex flex-col items-center bg-slate-50/30 px-4">
                  <HiOutlineUserGroup
                    size={40}
                    className="text-slate-200 mb-4"
                  />
                  <p className="text-[10px] font-black uppercase italic tracking-[0.4em] text-slate-400">
                    No active linkages found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Area */}
        <div className="px-6 md:px-10 pb-10">
          <button
            onClick={() => router.back()}
            type="button"
            className="w-full py-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all italic text-center border-t border-slate-50 dark:border-white/5"
          >
            Discard Changes & Return
          </button>
        </div>
      </div>
    </div>
  );
};
