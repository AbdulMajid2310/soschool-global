"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createBulkSchedule } from "@/redux/features/school_schedule/thunks";
import { fetchTeachers } from "@/redux/features/teacher/thunk";
import { fetchSubjects } from "@/redux/features/school_subject/thunks";
import { fetchClassroomConfigs } from "@/redux/features/classroom-config/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import { CreateSchedulePayload } from "@/redux/features/school_schedule/types";
import { toast } from "react-hot-toast";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineCloudArrowUp,
} from "react-icons/hi2";

// Import Custom Modals
import SelectedTeacherModal from "../teacher/SelectedTeacherModal";
import SelectedSubjectModal from "../school_subject/SelectedSubjectModal";
import SelectedClassroomConfigModal from "../classroom-config/SelectedClassroomConfigModal";

const BulkScheduleForm = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { isSubmitting } = useAppSelector((state) => state.schoolSchedule);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

  const emptyRow: CreateSchedulePayload = {
    day: "SENIN",
    startTime: "",
    endTime: "",
    subjectId: "",
    teacherId: "",
    classroomConfigId: "",
  };

  const [rows, setRows] = useState<CreateSchedulePayload[]>([{ ...emptyRow }]);

  // Load master data saat komponen mount
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchTeachers(schoolId));
      dispatch(fetchSubjects(schoolId));
      if (activePeriod?.periodId) {
        dispatch(
          fetchClassroomConfigs({ schoolId, periodId: activePeriod.periodId }),
        );
      }
    }
  }, [dispatch, schoolId, activePeriod]);

  const addRow = () => setRows([...rows, { ...emptyRow }]);

  const removeRow = (index: number) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof CreateSchedulePayload,
    value: string,
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleSubmit = async () => {
    const isInvalid = rows.some(
      (r) =>
        !r.startTime ||
        !r.endTime ||
        !r.subjectId ||
        !r.teacherId ||
        !r.classroomConfigId,
    );

    if (isInvalid)
      return toast.error("Lengkapi semua data jadwal di setiap baris!");

    try {
      await dispatch(createBulkSchedule({ schedules: rows })).unwrap();
      toast.success(`${rows.length} Jadwal berhasil disinkronkan!`);
      setRows([{ ...emptyRow }]);
    } catch (err: any) {
      toast.error(err || "Gagal menyimpan jadwal");
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 transition-all">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-10 h-1.5 bg-indigo-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 italic">
              Batch Processing
            </span>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
            Mass <span className="text-indigo-600 text-5xl">Entry.</span>
          </h2>
        </div>
        <button
          type="button"
          title="Tambah baris jadwal baru"
          onClick={addRow}
          className="group flex items-center gap-3 px-8 py-5 bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all font-black text-[11px] tracking-widest uppercase shadow-xl shadow-indigo-600/10 active:scale-95"
        >
          <HiOutlinePlus size={20} strokeWidth={3} /> Tambah Sesi
        </button>
      </div>

      {/* Grid Container */}
      <div className="space-y-8">
        {rows.map((row, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-10 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-500/20 transition-all group animate-in slide-in-from-bottom-4 duration-500"
          >
            {/* Index Counter */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black italic text-sm shadow-2xl z-10 border-4 border-white dark:border-slate-900  md:flex">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Kolom 1: Waktu & Hari (3 Col) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
                  Hari Efektif
                </label>
                <select
                  title="Pilih Hari"
                  value={row.day}
                  onChange={(e) => handleChange(index, "day", e.target.value)}
                  className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white shadow-sm appearance-none cursor-pointer"
                >
                  {["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"].map(
                    (d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
                    Mulai
                  </label>
                  <input
                    title="Jam Mulai"
                    type="time"
                    value={row.startTime}
                    onChange={(e) =>
                      handleChange(index, "startTime", e.target.value)
                    }
                    className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
                    Selesai
                  </label>
                  <input
                    title="Jam Selesai"
                    type="time"
                    value={row.endTime}
                    onChange={(e) =>
                      handleChange(index, "endTime", e.target.value)
                    }
                    className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Kolom 2: Modal Selectors (8 Col) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-end pb-1">
              {/* Selector Guru */}
              <SelectedTeacherModal
                selectedId={row.teacherId}
                onSelect={(id) => handleChange(index, "teacherId", id)}
              />

              {/* Selector Mata Pelajaran */}
              <SelectedSubjectModal
                selectedId={row.subjectId}
                onSelect={(id) => handleChange(index, "subjectId", id)}
              />

              {/* Selector Konfigurasi Kelas */}
              <div className="md:col-span-2">
                <SelectedClassroomConfigModal
                  selectedId={row.classroomConfigId}
                  onSelect={(id) =>
                    handleChange(index, "classroomConfigId", id)
                  }
                />
              </div>
            </div>

            {/* Kolom 3: Delete Action (1 Col) */}
            <div className="lg:col-span-1 flex items-center justify-end">
              <button
                type="button"
                title="Hapus baris"
                onClick={() => removeRow(index)}
                disabled={rows.length === 1}
                className="p-5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-3xl transition-all disabled:opacity-0"
              >
                <HiOutlineTrash size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-16 flex flex-col md:flex-row justify-end items-center gap-8 bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
        <button
          type="button"
          title="Reset semua input"
          className="text-slate-400 hover:text-slate-800 dark:hover:text-white font-black text-[11px] uppercase tracking-[0.3em] italic transition-colors"
          onClick={() => setRows([{ ...emptyRow }])}
        >
          Reset Batch.
        </button>
        <button
          type="button"
          title="Sinkronisasi semua jadwal ke server"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full md:w-auto flex items-center justify-center gap-4 px-16 py-6 bg-slate-900 dark:bg-indigo-600 text-white rounded-4xl font-black text-[12px] tracking-[0.4em] uppercase hover:bg-indigo-700 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Syncing...
            </div>
          ) : (
            <>
              <HiOutlineCloudArrowUp size={24} />
              Publish Schedulling
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BulkScheduleForm;
