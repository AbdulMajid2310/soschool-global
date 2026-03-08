"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  promoteStudents,
  graduateStudents,
  fetchStudentsByPeriod,
  fetchStudentsByConfig,
} from "@/redux/features/classroom-student/thunks";
import {
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineArrowPath,
  HiOutlineArrowRightOnRectangle,
  HiOutlineMagnifyingGlass,
  HiChevronDown,
  HiOutlineArrowsUpDown,
} from "react-icons/hi2";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchClassroomConfigs } from "@/redux/features/classroom-config/thunk";
import { FaCheckDouble } from "react-icons/fa";

interface StudentTargetMap {
  [studentId: string]: string;
}

export default function PromotionWizard() {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { students } = useAppSelector((state) => state.classroomStudent);
  const { configs } = useAppSelector((state) => state.classroomConfig);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);
  const classroomConfigId = sessionStorage.getItem("classroomConfigId") || "";
  console.log(classroomConfigId);

  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [globalTargetId, setGlobalTargetId] = useState("");
  const [individualTargets, setIndividualTargets] = useState<StudentTargetMap>(
    {},
  );
  const [searchSiswa, setSearchSiswa] = useState("");
  const [mode, setMode] = useState<"PROMOTION" | "GRADUATION">("PROMOTION");

  const [searchTarget, setSearchTarget] = useState("");
  const [isBulkDropdownOpen, setIsBulkDropdownOpen] = useState(false);
  const [bulkSearchTarget, setBulkSearchTarget] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const bulkDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchClassroomConfigs({ schoolId }));

      if (classroomConfigId) {
        dispatch(
          fetchStudentsByConfig({ schoolId, configId: classroomConfigId }),
        );
      }
    }
  }, [dispatch, schoolId, classroomConfigId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveStudentId(null);
      }
      if (
        bulkDropdownRef.current &&
        !bulkDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBulkDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(
      (s) =>
        s.student.user.username
          .toLowerCase()
          .includes(searchSiswa.toLowerCase()) ||
        s.student.nis.includes(searchSiswa),
    );
  }, [students, searchSiswa]);

  const filteredConfigs = useMemo(() => {
    return configs.filter((c) =>
      c.classroom.name.toLowerCase().includes(searchTarget.toLowerCase()),
    );
  }, [configs, searchTarget]);

  const filteredBulkConfigs = useMemo(() => {
    return configs.filter((c) =>
      c.classroom.name.toLowerCase().includes(bulkSearchTarget.toLowerCase()),
    );
  }, [configs, bulkSearchTarget]);

  const applyGlobalTarget = () => {
    if (!globalTargetId) return;
    const newTargets = { ...individualTargets };
    selectedIds.forEach((id) => {
      newTargets[id] = globalTargetId;
    });
    setIndividualTargets(newTargets);
  };

  const handleAction = async () => {
    if (mode === "PROMOTION") {
      const mappings = selectedIds
        .map((id) => ({
          studentId: id,
          fromConfigId:
            students.find((s) => s.student.studentId === id)?.classroomConfig
              .classroomConfigId || "",
          toConfigId: individualTargets[id] || globalTargetId,
        }))
        .filter((m) => m.toConfigId !== "");

      if (mappings.length !== selectedIds.length) {
        alert("Beberapa siswa terpilih belum memiliki target kelas.");
        return;
      }
      await dispatch(promoteStudents(mappings));
    } else {
      const configId =
        students.find((s) => s.student.studentId === selectedIds[0])
          ?.classroomConfig.classroomConfigId || "";
      await dispatch(graduateStudents({ studentIds: selectedIds, configId }));
    }
    setSelectedIds([]);
    setIndividualTargets({});
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-10">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
            <HiOutlineArrowsUpDown className="text-indigo-600" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 italic">
              Akademik • Engine
            </span>
          </div>
          <h1 className="lg:text-5xl text-3xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white leading-none">
            Mutasi <span className="text-indigo-600">Massal</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
            Otomasi Transisi Tahun Ajaran & Kelulusan
          </p>
        </div>

        <div className="relative z-10 flex p-2 bg-slate-100 dark:bg-slate-800 rounded-4xl border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
          <button
            type="button"
            onClick={() => setMode("PROMOTION")}
            className={`px-10 py-3 rounded-3xl text-[11px] font-black uppercase transition-all duration-500 ${mode === "PROMOTION" ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-2xl" : "text-slate-400 hover:text-slate-600"}`}
          >
            Kenaikan
          </button>
          <button
            type="button"
            onClick={() => setMode("GRADUATION")}
            className={`px-10 py-3 rounded-3xl text-[11px] font-black uppercase transition-all duration-500 ${mode === "GRADUATION" ? "bg-white dark:bg-slate-700 text-rose-600 shadow-2xl" : "text-slate-400 hover:text-slate-600"}`}
          >
            Kelulusan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex  items-center justify-between gap-8">
              <div className="relative flex-1 lg:min-w-[320px] w-full group">
                <HiOutlineMagnifyingGlass
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari Siswa atau NIS..."
                  value={searchSiswa}
                  onChange={(e) => setSearchSiswa(e.target.value)}
                  className="w-full pl-16 pr-8 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-3xl text-sm font-bold outline-none border-none dark:text-white"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIds(
                      filteredStudents.map((s) => s.student.studentId),
                    )
                  }
                  className="px-8 py-3 flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <FaCheckDouble className="text-lg" />{" "}
                  <span className="hidden lg:inline">Select All</span>
                </button>
              </div>
            </div>

            <div className="max-h-150 h-full overflow-y-auto scrollbar-hide rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              {/* Header Section - Hidden on Mobile, Flex on LG */}
              <div className="sticky top-0 z-20 hidden lg:flex items-center bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                <div className="grid grid-cols-12 w-full text-[10px] font-black uppercase text-slate-400 tracking-widest italic">
                  <div className="col-span-5 px-4">Peserta Didik</div>
                  <div className="col-span-2 px-4">Asal Rombel</div>
                  <div className="col-span-3 px-4">
                    {mode === "PROMOTION" ? "Mapping Target" : "Outcome"}
                  </div>
                  <div className="col-span-2 px-4 text-center">Aksi</div>
                </div>
              </div>

              {/* Body Section */}
              <div className="flex flex-col divide-y h-100 divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((s) => (
                  <div
                    key={s.student.studentId}
                    className={`group transition-all duration-300 ${
                      selectedIds.includes(s.student.studentId)
                        ? "bg-indigo-50/40 dark:bg-indigo-500/5"
                        : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    {/* Container Grid: Stacked on Mobile, 12-Cols on LG */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center w-full px-6 py-5 gap-4 lg:gap-0">
                      {/* 1. Peserta Didik Column */}
                      <div
                        className="lg:col-span-5 lg:px-4 cursor-pointer"
                        onClick={() =>
                          setSelectedIds((prev) =>
                            prev.includes(s.student.studentId)
                              ? prev.filter((x) => x !== s.student.studentId)
                              : [...prev, s.student.studentId],
                          )
                        }
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={
                                s.student.user.avatar ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${s.student.user.username}`
                              }
                              className="w-12 h-12 lg:w-11 lg:h-11 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
                              alt=""
                            />
                            {/* Mobile-only check indicator */}
                            {selectedIds.includes(s.student.studentId) && (
                              <div className="absolute -top-1 -right-1 lg:hidden bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                                <HiOutlineCheckCircle size={14} />
                              </div>
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-black uppercase italic text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors truncate">
                              {s.student.user.username}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 tracking-widest mt-0.5">
                              NIS: {s.student.nis}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 2. Asal Rombel Column - Layout adjusted for mobile */}
                      <div className="lg:col-span-2 lg:px-4 flex items-center justify-between lg:justify-start">
                        <span className="text-[10px] font-bold text-slate-400 uppercase lg:hidden">
                          Asal:
                        </span>
                        <span className="inline-block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase italic bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                          {s.classroomConfig.classroom.name}
                        </span>
                      </div>

                      {/* 3. Target/Outcome Column */}
                      <div className="lg:col-span-3 lg:px-4 relative">
                        <span className="text-[10px] font-bold text-slate-400 uppercase lg:hidden block mb-2">
                          {mode === "PROMOTION"
                            ? "Target Kelas:"
                            : "Status Akhir:"}
                        </span>
                        {mode === "PROMOTION" ? (
                          <div
                            className="relative w-full"
                            ref={
                              activeStudentId === s.student.studentId
                                ? dropdownRef
                                : null
                            }
                          >
                            <div className="relative group/input">
                              <input
                                type="text"
                                readOnly
                                placeholder={
                                  configs.find(
                                    (c) =>
                                      c.classroomConfigId ===
                                      individualTargets[s.student.studentId],
                                  )?.classroom.name || "-- Pilih Target --"
                                }
                                value={
                                  activeStudentId === s.student.studentId
                                    ? searchTarget
                                    : ""
                                }
                                onFocus={() => {
                                  setActiveStudentId(s.student.studentId);
                                  setSearchTarget("");
                                }}
                                onChange={(e) =>
                                  setSearchTarget(e.target.value)
                                }
                                className="w-full text-[10px] font-black uppercase italic bg-white dark:bg-slate-800 p-3.5 pr-10 rounded-xl outline-none border border-slate-200 dark:border-slate-700 shadow-sm focus:border-indigo-500 transition-all cursor-pointer"
                              />
                              <HiChevronDown
                                className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${activeStudentId === s.student.studentId ? "rotate-180" : ""}`}
                                size={14}
                              />
                            </div>

                            {activeStudentId === s.student.studentId && (
                              <div className="absolute z-50 w-50 mt-2  bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="max-h-48  overflow-y-auto scrollbar-hide px-2 custom-scrollbar">
                                  {filteredConfigs.map((c) => (
                                    <button
                                      key={c.classroomConfigId}
                                      type="button"
                                      onClick={() => {
                                        setIndividualTargets({
                                          ...individualTargets,
                                          [s.student.studentId]:
                                            c.classroomConfigId,
                                        });
                                        setActiveStudentId(null);
                                      }}
                                      className={`w-full text-sm lg:text-xs px-4 py-2.5 mb-1 text-left rounded-lg flex justify-between items-center ${individualTargets[s.student.studentId] === c.classroomConfigId ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"}`}
                                    >
                                      <span className="  italic">
                                        {c.classroom.name}
                                      </span>
                                      <span className="opacity-60">
                                        {c.period?.academicYear}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] font-black text-rose-500 uppercase italic tracking-wider bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-100 dark:border-rose-500/20 inline-block">
                            GRADUATING
                          </span>
                        )}
                      </div>

                      {/* 4. Action Column - Floating or Fixed on Right */}
                      <div
                        className="lg:col-span-2 lg:px-4 flex justify-end lg:justify-center items-center pt-2 lg:pt-0 border-t lg:border-none border-slate-50 dark:border-slate-800"
                        onClick={() =>
                          setSelectedIds((prev) =>
                            prev.includes(s.student.studentId)
                              ? prev.filter((x) => x !== s.student.studentId)
                              : [...prev, s.student.studentId],
                          )
                        }
                      >
                        <div className="flex items-center gap-3 lg:block">
                          <span className="text-[10px] font-bold text-slate-400 uppercase lg:hidden">
                            Pilih:
                          </span>
                          <div
                            className={`w-9 h-9 lg:w-8 lg:h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                              selectedIds.includes(s.student.studentId)
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none scale-105"
                                : "border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <HiOutlineCheckCircle size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="sticky top-0 bg-slate-900 dark:bg-slate-950 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-500/20 lg:relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-20 translate-x-20" />
            <div className="relative z-10 space-y-10">
              <div className="p-5 bg-white/5 rounded-4xl border border-white/10 flex items-center justify-between shadow-inner">
                <div>
                  <p className="text-[10px] font-black uppercase text-indigo-400 italic mb-1">
                    Queue Total
                  </p>
                  <p className="text-5xl font-black italic tracking-tighter">
                    {selectedIds.length}
                  </p>
                </div>
                <HiOutlineUserGroup size={48} className="text-indigo-500/20" />
              </div>

              {mode === "PROMOTION" && (
                <div className="space-y-5" ref={bulkDropdownRef}>
                  <p className="text-[10px] font-black uppercase text-slate-500 italic tracking-[0.3em] px-2">
                    Set Penempatan Massal
                  </p>
                  <div className="relative group">
                    <HiOutlineMagnifyingGlass
                      className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder={
                        configs.find(
                          (c) => c.classroomConfigId === globalTargetId,
                        )?.classroom.name || "-- Pilih Target Rombel --"
                      }
                      value={isBulkDropdownOpen ? bulkSearchTarget : ""}
                      onFocus={() => setIsBulkDropdownOpen(true)}
                      onChange={(e) => setBulkSearchTarget(e.target.value)}
                      className="w-full pl-16 pr-12 py-6 bg-white/5 hover:bg-white/10 rounded-4xl border border-white/10 font-bold text-xs outline-none transition-all text-white placeholder:text-white/40 focus:ring-2 focus:ring-indigo-500/50"
                    />
                    <HiChevronDown
                      className={`absolute right-6 top-1/2 -translate-y-1/2 text-white/30 transition-transform ${isBulkDropdownOpen ? "rotate-180" : ""}`}
                      size={16}
                    />

                    {isBulkDropdownOpen && (
                      <div className="absolute z-40 mt-3 w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 py-3 animate-in slide-in-from-top-2 overflow-hidden">
                        <div className="max-h-60 overflow-y-auto px-2">
                          {filteredBulkConfigs.map((c) => (
                            <button
                              key={c.classroomConfigId}
                              type="button"
                              onClick={() => {
                                setGlobalTargetId(c.classroomConfigId);
                                setBulkSearchTarget("");
                                setIsBulkDropdownOpen(false);
                              }}
                              className={`w-full px-6 py-4 text-left rounded-2xl flex justify-between items-center transition-all ${globalTargetId === c.classroomConfigId ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"}`}
                            >
                              <span className="text-[11px] font-black uppercase italic">
                                {c.classroom.name}
                              </span>
                              <span className="text-[9px] font-bold opacity-50">
                                {c.period?.academicYear}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={applyGlobalTarget}
                    disabled={!globalTargetId || selectedIds.length === 0}
                    className="w-full py-5 bg-indigo-500/20 hover:bg-indigo-500/40 rounded-3xl text-[10px] font-black uppercase italic tracking-widest text-indigo-300 border border-indigo-500/30 transition-all disabled:opacity-10 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <HiOutlineArrowRightOnRectangle size={18} /> Assign to
                    Selection
                  </button>
                </div>
              )}

              <div className="pt-8 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleAction}
                  disabled={selectedIds.length === 0}
                  className="group w-full py-4 bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white rounded-full font-black uppercase italic tracking-widest shadow-2xl shadow-indigo-600/40 transition-all duration-700 disabled:opacity-20 flex items-center justify-center gap-4"
                >
                  {mode === "PROMOTION" ? (
                    <HiOutlineArrowPath
                      size={24}
                      className="group-hover:rotate-180 transition-transform duration-1000"
                    />
                  ) : (
                    <HiOutlineAcademicCap size={24} />
                  )}
                  <span>Jalankan Mutasi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
