"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchTeachers } from "@/redux/features/teacher/thunk";

interface Props {
  selectedId?: string;
  onSelect: (teacherId: string) => void;
}

export default function SelectedTeacherModal({ selectedId, onSelect }: Props) {
  const dispatch = useAppDispatch();
  const { teachers } = useAppSelector((state) => state.teacher);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const schoolId = useSchoolId();
  const selectedTeacherName = useMemo(() => {
    return (
      teachers.find((t) => t.teacherId === selectedId)?.user.username || ""
    );
  }, [teachers, selectedId]);

  useEffect(() => {
    if (schoolId) dispatch(fetchTeachers(schoolId));
  }, [dispatch, schoolId]);

  const filteredTeachers = useMemo(() => {
    const s = search.toLowerCase();
    return teachers.filter(
      (t) =>
        t.user.username.toLowerCase().includes(s) ||
        (t.nip && t.nip.includes(s)),
    );
  }, [teachers, search]);

  const handleClose = () => {
    setShowModal(false);
    setSearch("");
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (showModal) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

  return (
    <section>
      <div className="space-y-3">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
            Wali Kelas
          </label>

          <div className="relative group">
            {/* Icon tetap berada di atas input */}
            <HiOutlineAcademicCap
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors z-10 pointer-events-none"
              size={20}
            />

            {/* Input sekarang menjadi elemen interaktif tunggal */}
            <input
              type="text"
              readOnly
              title="Buka pilihan wali kelas"
              placeholder="Pilih wali kelas..."
              value={selectedTeacherName}
              onClick={() => setShowModal(true)}
              // Tambahkan onKeyDown agar bisa dibuka pakai keyboard (Enter/Space)
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowModal(true);
                }
              }}
              className="w-full capitalize pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-indigo-500/10 rounded-2xl font-bold text-sm cursor-pointer outline-none transition-all dark:text-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={handleClose}
          />

          <div className="relative bg-white dark:bg-slate-900 rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 w-full max-w-2xl flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
                  <HiOutlineAcademicCap size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic text-slate-800 dark:text-white leading-none">
                    Daftar Pengajar
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">
                    Pilih wali kelas untuk periode ini
                  </p>
                </div>
              </div>
              <button
                type="button"
                title="Tutup modal"
                onClick={handleClose}
                className="p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <HiOutlineXMark size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800/50">
              <div className="relative group">
                <HiOutlineMagnifyingGlass
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  autoFocus
                  title="Cari pengajar"
                  className="w-full pl-14 pr-6 py-4 capitalize bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl font-bold text-sm outline-none transition-all dark:text-white placeholder:text-slate-300"
                  placeholder="Cari berdasarkan nama atau NIP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 custom-scrollbar">
              <div className="space-y-2 pb-4">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((t) => {
                    const isSelected = selectedId === t.teacherId;
                    return (
                      <button
                        key={t.teacherId}
                        type="button"
                        title={`Pilih ${t.user.username}`}
                        onClick={() => handleSelect(t.teacherId)}
                        className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all border-2 group ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xl"
                            : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <img
                            src={
                              t.user.avatar ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${t.user.username}`
                            }
                            className={`h-12 w-12 rounded-2xl object-cover ${isSelected ? "ring-4 ring-white/20" : "shadow-sm group-hover:scale-105"}`}
                            alt={`Foto ${t.user.username}`}
                          />
                          <div>
                            <p
                              className={`text-sm font-black uppercase italic leading-none ${isSelected ? "text-white" : "text-slate-700 dark:text-white"}`}
                            >
                              {t.user.username}
                            </p>
                            <p
                              className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isSelected ? "text-white/70" : "text-slate-400"}`}
                            >
                              NIP: {t.nip || "---"}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <HiOutlineCheckCircle
                            className="text-white animate-in zoom-in"
                            size={26}
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center opacity-40">
                    <HiOutlineAcademicCap
                      size={48}
                      className="text-slate-300 mb-4"
                    />
                    <p className="text-xs font-black uppercase text-slate-400 italic">
                      Guru tidak ditemukan
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
