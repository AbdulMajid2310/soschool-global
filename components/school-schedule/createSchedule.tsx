"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createSchedule,
  fetchSchedulesBySchool,
} from "@/redux/features/school_schedule/thunks";
import { fetchTeachers } from "@/redux/features/teacher/thunk";
import { fetchSubjects } from "@/redux/features/school_subject/thunks";
import { fetchClassroomConfigs } from "@/redux/features/classroom-config/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";

interface CreateProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDay?: string;
}

// --- SEARCHABLE SELECT V2: SINGLE INPUT SYSTEM ---
const SearchableSelect = ({
  label,
  value,
  options,
  onChange,
  placeholder,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Temukan label dari ID yang terpilih
  const selectedOption = useMemo(
    () => options.find((opt: any) => opt.id === value),
    [options, value],
  );

  // Sinkronisasi input dengan label yang dipilih saat dropdown tertutup
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm(selectedOption ? selectedOption.label : "");
    }
  }, [isOpen, selectedOption]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logic filter data
  const filteredOptions = useMemo(() => {
    // Jika sedang mencari (teks tidak sama dengan label terpilih), lakukan filter
    if (searchTerm !== selectedOption?.label) {
      return options.filter((opt: any) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return options;
  }, [options, searchTerm, selectedOption]);

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.15em] ml-1 block">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm(""); // Langsung kosongkan saat klik agar user bisa ngetik
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full bg-slate-50 dark:bg-slate-800/50 p-4 pr-12 rounded-2xl font-bold text-sm transition-all border-2 outline-none ${
            isOpen
              ? "border-blue-600 ring-4 ring-blue-600/5 bg-white dark:bg-slate-800 shadow-xl"
              : "border-transparent focus:border-blue-600"
          } ${value && !isOpen ? "text-blue-600" : "text-slate-900 dark:text-white"}`}
        />

        {/* Arrow Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-110 w-full mt-2 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-52 overflow-y-auto custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt: any) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-4 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-between ${
                    value === opt.id
                      ? "bg-blue-50 dark:bg-blue-600/10 text-blue-600"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <span>{opt.label}</span>
                  {value === opt.id && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                  Tidak Ditemukan
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CreateScheduleModal({
  isOpen,
  onClose,
  defaultDay,
}: CreateProps) {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { isSubmitting } = useAppSelector((state) => state.schoolSchedule);
  const { subjects } = useAppSelector((state) => state.schoolSubject);
  const { teachers } = useAppSelector((state) => state.teacher);
  const { configs } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

  const [formData, setFormData] = useState({
    day: defaultDay || "SENIN",
    startTime: "",
    endTime: "",
    subjectId: "",
    teacherId: "",
    classroomConfigId: "",
  });

  useEffect(() => {
    if (schoolId && isOpen) {
      dispatch(fetchSchedulesBySchool(schoolId));
      dispatch(fetchTeachers(schoolId));
      dispatch(fetchSubjects(schoolId));
      if (activePeriod?.periodId) {
        dispatch(
          fetchClassroomConfigs({ schoolId, periodId: activePeriod.periodId }),
        );
      }
    }
  }, [dispatch, schoolId, activePeriod?.periodId, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.subjectId ||
      !formData.teacherId ||
      !formData.classroomConfigId
    ) {
      return alert("Harap lengkapi semua pilihan!");
    }

    const result = await dispatch(createSchedule(formData));
    if (createSchedule.fulfilled.match(result)) {
      setFormData({
        day: defaultDay || "SENIN",
        startTime: "",
        endTime: "",
        subjectId: "",
        teacherId: "",
        classroomConfigId: "",
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        {/* Header Section */}
        <div className="p-10 pb-6 flex justify-between items-start shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                SoSchool Engine
              </span>
            </div>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
              Entry <span className="text-blue-600">Jadwal.</span>
            </h3>
          </div>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-10 pt-0 space-y-6 scrollbar-hide"
        >
          <SearchableSelect
            label="Hari Efektif"
            placeholder="Pilih Hari..."
            value={formData.day}
            onChange={(val: string) => setFormData({ ...formData, day: val })}
            options={["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"].map(
              (d) => ({ id: d, label: d }),
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] ml-1">
                Jam Mulai
              </label>
              <input
                title="jam mulai"
                type="time"
                required
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 font-bold outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em] ml-1">
                Jam Selesai
              </label>
              <input
                title="jam selesai"
                type="time"
                required
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 font-bold outline-none transition-all"
              />
            </div>
          </div>

          <SearchableSelect
            label="Mata Pelajaran"
            placeholder="Ketik Nama/Kode Mapel..."
            value={formData.subjectId}
            onChange={(val: string) =>
              setFormData({ ...formData, subjectId: val })
            }
            options={subjects.map((s) => ({
              id: s.subjectId,
              label: `${s.name} (${s.code})`,
            }))}
          />

          <SearchableSelect
            label="Guru Pengampu"
            placeholder="Cari Username Guru..."
            value={formData.teacherId}
            onChange={(val: string) =>
              setFormData({ ...formData, teacherId: val })
            }
            options={teachers.map((t) => ({
              id: t.teacherId,
              label: t.user?.username || "Tanpa Nama",
            }))}
          />

          <SearchableSelect
            label="Kelas & Ruangan"
            placeholder="Pilih Konfigurasi Kelas..."
            value={formData.classroomConfigId}
            onChange={(val: string) =>
              setFormData({ ...formData, classroomConfigId: val })
            }
            options={configs.map((c) => ({
              id: c.classroomConfigId,
              label: `${c.classroom?.name} - T.A ${c.period?.academicYear}`,
            }))}
          />

          {/* Submit Button */}
          <div className="pt-4 sticky bottom-0 bg-white dark:bg-slate-900 mt-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white py-6 rounded-4xl font-black text-[11px] tracking-[0.3em] hover:bg-blue-700 dark:hover:bg-blue-500 shadow-2xl shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 uppercase flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                "Simpan Jadwal Baru"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
