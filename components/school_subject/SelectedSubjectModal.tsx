"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchSubjects } from "@/redux/features/school_subject/thunks";

interface Props {
  selectedId?: string;
  onSelect: (subjectId: string) => void;
}

export default function SelectedSubjectModal({ selectedId, onSelect }: Props) {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();

  // Ambil data dari store
  const { subjects, loading } = useAppSelector((state) => state.schoolSubject);
  const { activePeriod } = useAppSelector((state) => state.schoolPeriod);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch data saat modal dibuka atau sekolah/periode berubah
  useEffect(() => {
    if (schoolId && showModal) {
      dispatch(fetchSubjects(schoolId));
    }
  }, [dispatch, schoolId, showModal]);

  // Cari nama subject yang terpilih untuk ditampilkan di input
  const selectedSubjectName = useMemo(() => {
    const found = subjects.find((s) => s.subjectId === selectedId);
    return found ? `${found.name} (${found.code})` : "";
  }, [subjects, selectedId]);

  // Filter pencarian berdasarkan nama atau kode
  const filteredSubjects = useMemo(() => {
    const s = search.toLowerCase();
    return subjects.filter(
      (subj) =>
        subj.name.toLowerCase().includes(s) ||
        subj.code.toLowerCase().includes(s),
    );
  }, [subjects, search]);

  const handleClose = () => {
    setShowModal(false);
    setSearch("");
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  return (
    <section className="w-full">
      <div className="space-y-3">
        <label className="ml-1 text-[10px] font-black italic uppercase tracking-widest text-slate-400">
          Mata Pelajaran
        </label>

        <div className="group relative">
          <HiOutlineBookOpen
            className="absolute left-5 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-blue-500 pointer-events-none"
            size={20}
          />

          <input
            type="text"
            readOnly
            title="Buka pilihan mata pelajaran"
            placeholder="Pilih mata pelajaran..."
            value={selectedSubjectName}
            onClick={() => setShowModal(true)}
            className="w-full cursor-pointer rounded-2xl border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold outline-none transition-all hover:border-blue-500/10 focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800/50 dark:text-white"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 animate-in fade-in bg-slate-900/60 backdrop-blur-md duration-300"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative flex max-h-[85vh] w-full max-w-2xl animate-in zoom-in-95 flex-col overflow-hidden rounded-4xl bg-white shadow-2xl duration-300 dark:bg-slate-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-800/30">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-500/20">
                  <HiOutlineBookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black italic uppercase leading-none text-slate-800 dark:text-white">
                    Library <span className="text-blue-600">Subjects.</span>
                  </h2>
                  <p className="mt-1 text-[10px] font-bold italic uppercase tracking-widest text-slate-400">
                    Tahun Ajaran: {activePeriod?.academicYear || "---"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                title="Tutup modal"
                onClick={handleClose}
                className="rounded-2xl border border-slate-100 bg-white p-3 text-slate-400 shadow-sm transition-all hover:text-rose-500 dark:border-slate-700 dark:bg-slate-800"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            {/* Search Input */}
            <div className="border-b border-slate-50 px-8 py-6 dark:border-slate-800/50">
              <div className="group relative">
                <HiOutlineMagnifyingGlass
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-blue-600"
                  size={20}
                />
                <input
                  autoFocus
                  title="Cari mata pelajaran"
                  placeholder="Cari nama atau kode mapel..."
                  className="w-full rounded-2xl border-2 border-transparent bg-slate-50 py-4 pl-14 pr-6 text-sm font-bold outline-none transition-all placeholder:text-slate-300 focus:border-blue-500/20 dark:bg-slate-800/50 dark:text-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* List Items */}
            <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-2 pb-4">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subj) => {
                    const isSelected = selectedId === subj.subjectId;
                    return (
                      <button
                        key={subj.subjectId}
                        type="button"
                        title={`Pilih ${subj.name}`}
                        onClick={() => handleSelect(subj.subjectId)}
                        className={`group flex w-full items-center justify-between border-2 p-4 transition-all rounded-3xl ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                            : "border-transparent bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black italic text-xs ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                            }`}
                          >
                            {subj.code.substring(0, 3)}
                          </div>
                          <div>
                            <p
                              className={`text-sm font-black italic uppercase leading-none ${
                                isSelected
                                  ? "text-white"
                                  : "text-slate-700 dark:text-white"
                              }`}
                            >
                              {subj.name}
                            </p>
                            <p
                              className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${
                                isSelected ? "text-white/70" : "text-slate-400"
                              }`}
                            >
                              Code: {subj.code} • {subj.category}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <HiOutlineCheckCircle
                            className="animate-in zoom-in text-white"
                            size={26}
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 opacity-40">
                    <HiOutlineBookOpen
                      size={48}
                      className="mb-4 text-slate-300"
                    />
                    <p className="text-xs font-black italic uppercase text-slate-400">
                      Mata pelajaran tidak ditemukan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
