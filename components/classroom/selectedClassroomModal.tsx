"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  HiOutlineXMark,
  HiOutlineAcademicCap,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineUsers,
  HiOutlineHashtag,
} from "react-icons/hi2";
import { fetchClassrooms } from "@/redux/features/classroom/thunk";
import { useSchoolId } from "@/hooks/useSchoolId";
import { HiOutlineCollection } from "react-icons/hi";

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SelectedClassroomModal({
  selectedId,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const schoolId = useSchoolId();
  const dispatch = useAppDispatch();

  const { classrooms, loading } = useAppSelector((state) => state.classroom);
  useEffect(() => {
    if (schoolId) dispatch(fetchClassrooms(schoolId));
  }, [dispatch, schoolId]);

  // Mengambil data kelas yang sedang terpilih untuk label input
  const selectedClassroom = useMemo(
    () => classrooms.find((c) => c.schoolClassroomId === selectedId),
    [classrooms, selectedId],
  );

  // Filter data berdasarkan search bar (Nama atau Jurusan)
  const filteredClassrooms = useMemo(() => {
    const s = searchQuery.toLowerCase();
    return classrooms.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        (c.major && c.major.toLowerCase().includes(s)),
    );
  }, [classrooms, searchQuery]);

  const handleRefresh = () => {
    if (schoolId) dispatch(fetchClassrooms(schoolId));
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleSelectItem = (id: string) => {
    onSelect(id);
    handleClose();
  };

  // Tutup dengan ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
        Ruang Kelas
      </label>

      {/* Trigger Input Style */}
      <div className="relative group">
        <HiOutlineCollection
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors z-10 pointer-events-none"
          size={20}
        />
        <input
          type="text"
          readOnly
          placeholder="Pilih ruang kelas..."
          value={
            selectedClassroom
              ? `${selectedClassroom.name} - ${selectedClassroom.major || "Umum"}`
              : ""
          }
          onClick={() => setIsOpen(true)}
          className="w-full capitalize pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-indigo-500/20 rounded-2xl font-bold text-sm cursor-pointer outline-none transition-all dark:text-white focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleClose}
          />

          <div className="relative bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between bg-white dark:bg-slate-950 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
                  <HiOutlineCollection size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black dark:text-white uppercase italic tracking-tighter">
                    Daftar Ruangan
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    Pilih lokasi belajar mengajar
                  </p>
                </div>
              </div>
              <button
                title="hapus"
                type="button"
                onClick={handleClose}
                className="p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/50 flex gap-4">
              <div className="relative group flex-1">
                <HiOutlineMagnifyingGlass
                  size={20}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                />
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari berdasarkan nama kelas atau jurusan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl outline-none font-bold text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all dark:text-white"
                />
              </div>

              <button
                type="button"
                title="refresh"
                onClick={handleRefresh}
                disabled={loading}
                className="p-4 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all disabled:opacity-50"
              >
                <HiOutlineArrowPath
                  size={24}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>

            {/* List Ruangan (Grid) */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredClassrooms.length > 0 ? (
                  filteredClassrooms.map((cls) => {
                    const isSelected = selectedId === cls.schoolClassroomId;
                    return (
                      <div
                        key={cls.schoolClassroomId}
                        onClick={() => handleSelectItem(cls.schoolClassroomId)}
                        className={`group p-4 py-3 rounded-[2.5rem] border-2 transition-all cursor-pointer relative flex items-center justify-between ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none"
                            : "border-slate-50 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-200"
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div
                            className={`p-4 rounded-2xl ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-gray-800 text-indigo-600"}`}
                          >
                            <HiOutlineAcademicCap size={28} />
                          </div>
                          <div>
                            <h4
                              className={`font-black uppercase italic tracking-tighter text-lg ${isSelected ? "text-white" : "text-slate-900 dark:text-white"}`}
                            >
                              {cls.name}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span
                                className={`text-[10px] font-bold uppercase flex items-center gap-1 ${isSelected ? "text-white/80" : "text-slate-400"}`}
                              >
                                <HiOutlineHashtag size={12} />{" "}
                                {cls.major || "UMUM"}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase flex items-center gap-1 ${isSelected ? "text-white/80" : "text-slate-400"}`}
                              >
                                <HiOutlineUsers size={12} /> Cap: {cls.capacity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected ? (
                          <HiOutlineCheckCircle
                            size={28}
                            className="text-white animate-in zoom-in"
                          />
                        ) : (
                          <div className="text-[10px] font-black uppercase text-slate-300 group-hover:text-indigo-500 transition-colors italic">
                            Pilih
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-40">
                    <HiOutlineCollection
                      size={48}
                      className="text-slate-300 mb-4"
                    />
                    <p className="text-xs font-black uppercase text-slate-400 italic">
                      Data kelas tidak ditemukan
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                SoSchool Workspace System • v1.0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
