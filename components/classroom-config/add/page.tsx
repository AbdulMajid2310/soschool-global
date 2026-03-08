"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Components & Icons
import { SummarySidebar } from "./SummarySidebar";
import {
  HiOutlineMapPin,
  HiOutlineUserGroup,
  HiOutlineXMark,
  HiOutlineAcademicCap,
  HiOutlinePlus,
} from "react-icons/hi2";

// Thunks & Hooks
import {
  registerClassroomConfig,
  updateClassroomConfig,
  validateClassroomCsv,
} from "@/redux/features/classroom-config/thunk";
import { resetConfigStatus } from "@/redux/features/classroom-config/slice";
import { useSchoolId } from "@/hooks/useSchoolId";

// MODAL COMPONENTS
import SelectedTeacherModal from "@/components/teacher/SelectedTeacherModal";
import SelectedStudentModal from "@/components/student/SelectedStudentModal";
import SelectedClassroomModal from "@/components/classroom/selectedClassroomModal";

export default function ClassroomConfigFormSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const configId = searchParams.get("id");
  const isEdit = !!configId;

  // --- Redux Selectors ---
  const { students } = useAppSelector((state) => state.student);
  const { teachers } = useAppSelector((state) => state.teacher);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const { loading, success, error, configs } = useAppSelector(
    (state) => state.classroomConfig,
  );

  // --- Form States ---
  const [formData, setFormData] = useState({
    roomLocation: "",
    schoolClassroomId: "",
    homeroomTeacherId: "",
    studentIds: [] as string[],
  });

  // --- 1. Load Edit Data ---
  useEffect(() => {
    if (isEdit && configs.length > 0 && configId) {
      const current = configs.find((c) => c.classroomConfigId === configId);
      if (current) {
        setFormData({
          roomLocation: current.roomLocation || "",
          schoolClassroomId: current.classroom?.schoolClassroomId || "",
          homeroomTeacherId: current.homeroomTeacher?.teacherId || "",
          studentIds:
            current.classroomStudents?.map((s) => s.student.studentId) || [],
        });
      }
    }
  }, [isEdit, configId, configs]);

  // --- 2. Status Handling ---
  useEffect(() => {
    if (success) {
      toast.success(isEdit ? "Data diperbarui!" : "Konfigurasi aktif!");
      dispatch(resetConfigStatus());
      router.back();
    }
    if (error) {
      toast.error(error);
      dispatch(resetConfigStatus());
    }
  }, [success, error, isEdit, router, dispatch]);

  // --- 3. Handlers ---
  const handleToggleStudent = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      studentIds: prev.studentIds.includes(id)
        ? prev.studentIds.filter((i) => i !== id)
        : [...prev.studentIds, id],
    }));
  }, []);

  const handleCsvValidation = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !schoolId) return;

    const toastId = toast.loading("Memvalidasi data siswa...");
    try {
      const result = await dispatch(
        validateClassroomCsv({ schoolId, file }),
      ).unwrap();
      const newIds = result.validStudents.map((s: any) => s.studentId);

      setFormData((prev) => ({
        ...prev,
        studentIds: Array.from(new Set([...prev.studentIds, ...newIds])),
      }));

      result.invalidNis.length > 0
        ? toast.error(`${result.invalidNis.length} NIS tidak ditemukan.`, {
            id: toastId,
          })
        : toast.success(
            `Berhasil menambahkan ${result.validStudents.length} siswa.`,
            { id: toastId },
          );
    } catch (err: any) {
      toast.error(err || "Gagal memproses file", { id: toastId });
    } finally {
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId || !activePeriod)
      return toast.error("Konteks sekolah tidak valid");
    if (!formData.schoolClassroomId || !formData.homeroomTeacherId)
      return toast.error("Lengkapi data kelas & wali kelas!");

    const payload = {
      ...formData,
      schoolId: schoolId as string,
      periodId: activePeriod.periodId,
    };

    try {
      if (isEdit) {
        await dispatch(
          updateClassroomConfig({ id: configId as string, ...payload }),
        ).unwrap();
      } else {
        await dispatch(registerClassroomConfig(payload)).unwrap();
      }
    } catch (err: any) {
      toast.error(err || "Terjadi kesalahan");
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          {/* Identitas Fisik */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <SectionTitle
              icon={<HiOutlineMapPin size={24} />}
              title="Identitas Fisik"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectedClassroomModal
                selectedId={formData.schoolClassroomId}
                onSelect={(id) =>
                  setFormData((p) => ({ ...p, schoolClassroomId: id }))
                }
              />
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
                  Detail Lokasi
                </label>
                <input
                  className="w-full capitalize px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  value={formData.roomLocation}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, roomLocation: e.target.value }))
                  }
                  placeholder="Gedung, Lantai..."
                />
              </div>
            </div>
          </div>

          {/* Penanggung Jawab */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <SectionTitle
              icon={<HiOutlineAcademicCap size={24} />}
              title="Penanggung Jawab"
            />
            <SelectedTeacherModal
              selectedId={formData.homeroomTeacherId}
              onSelect={(id) =>
                setFormData((p) => ({ ...p, homeroomTeacherId: id }))
              }
            />
          </div>

          {/* Daftar Siswa */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4">
              <SectionTitle
                icon={<HiOutlineUserGroup size={24} />}
                title="Daftar Siswa"
              />
              <div className="flex gap-3">
                <label className="cursor-pointer px-5 py-2 rounded-2xl text-[10px] font-black uppercase transition-all flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100">
                  <HiOutlinePlus /> Import CSV
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleCsvValidation}
                  />
                </label>
                <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                  {formData.studentIds.length} Terpilih
                </span>
              </div>
            </div>

            <SelectedStudentModal
              selectedIds={formData.studentIds}
              onSelect={handleToggleStudent}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-100 scrollbar-hide overflow-y-auto pr-2 custom-scrollbar">
              {formData.studentIds.map((id) => {
                const s = students.find((item) => item.studentId === id);
                if (!s) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-transparent hover:border-indigo-100 group animate-in zoom-in duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center font-black text-indigo-600 uppercase shadow-sm">
                        {s.user?.username.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold capitalize text-sm dark:text-white">
                          {s.user?.username}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {s.nis}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      title="hapus"
                      onClick={() => handleToggleStudent(id)}
                      className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <HiOutlineXMark size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <SummarySidebar
            activePeriod={activePeriod}
            teacherName={
              teachers.find((t) => t.teacherId === formData.homeroomTeacherId)
                ?.user.username || ""
            }
            studentCount={formData.studentIds.length}
            loading={loading}
            isEdit={isEdit}
          />
        </div>
      </form>
    </div>
  );
}

const SectionTitle = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
      {icon}
    </div>
    <h3 className="font-black text-lg tracking-tight dark:text-white uppercase italic">
      {title}
    </h3>
  </div>
);
