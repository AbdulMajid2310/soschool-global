"use client";

import React, { useState } from "react";
import {
  HiOutlineLink,
  HiOutlineXMark,
  HiOutlineShieldCheck,
  HiOutlineIdentification,
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";
import { createParentByUserId } from "@/redux/features/school-parents/thunks";
import toast from "react-hot-toast";
import { SelectedUser } from "@/components/user/SelectedUser";
import { SelectedUserByNik } from "@/components/user/SelectedUserByNik";
import SelectedStudentModal from "@/components/student/SelectedStudentModal";
import { FaUserTie } from "react-icons/fa6";
import { User } from "@/redux/features/user/types";

export const AddParentByListSection = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { students } = useAppSelector((state) => state.student);

  const [searchMethod, setSearchMethod] = useState<"list" | "nik">("list");
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    registrationNumber: "",
    studentIds: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserFound = (user: User) => {
    setFormData((prev) => ({
      ...prev,
      userId: user.userId,
      username: user.username,
      registrationNumber: user.registrationNumber,
    }));
    toast.success(`Akun ${user.username} Terdeteksi`);
  };

  const handleClearUser = () => {
    setFormData((prev) => ({
      ...prev,
      userId: "",
      username: "",
      registrationNumber: "",
    }));
  };

  const handleToggleStudent = (studentId: string) => {
    setFormData((prev) => {
      const isExist = prev.studentIds.includes(studentId);
      const newIds = isExist
        ? prev.studentIds.filter((id) => id !== studentId)
        : [...prev.studentIds, studentId];
      return { ...prev, studentIds: newIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId)
      return toast.error("Silahkan pilih user terlebih dahulu");
    if (formData.studentIds.length === 0)
      return toast.error("Pilih minimal satu siswa");
    if (!schoolId) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Menghubungkan data relasi...");

    try {
      await dispatch(
        createParentByUserId({
          schoolId,
          userId: formData.userId,
          studentIds: formData.studentIds,
        }),
      ).unwrap();

      toast.success("Koneksi Akun Berhasil!", { id: loadingToast });
      setFormData({
        userId: "",
        username: "",
        registrationNumber: "",
        studentIds: [],
      });
    } catch (err: any) {
      toast.error(err || "Gagal menghubungkan akun", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" lg:py-6 lg:px-4 p-2">
      {/* Header dengan bg-linear-to-r */}
      <div className="relative lg:mb-8 mb-4 p-4 bg-linear-to-r from-indigo-600 to-violet-700 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-2 bg-white/20 backdrop-blur-lg rounded-4xl border border-white/30 text-white shadow-inner">
            <HiOutlineLink size={20} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="lg:text-xl text-sm font-black text-white uppercase italic tracking-tighter leading-none">
              Link Existing Account
            </h1>
            <p className="text-indigo-100 text-xs lg:font-bold uppercase tracking-[0.3em] mt-2 opacity-80">
              Integrasi Database User Pusat
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1  lg:gap-10 gap-4"
      >
        {/* Kolom Kiri */}
        <div className=" lg:space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[3rem] p-4 lg:p-10 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4 lg:mb-8">
              <div className="flex items-center gap-3">
                <span className="h-8 w-1.5 bg-indigo-600 rounded-full"></span>
                <h2 className="text-lg font-black italic uppercase text-slate-800 dark:text-white">
                  Identifikasi User
                </h2>
              </div>

              <div className="flex gap-2 items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/5">
                <div className="lg:inline hidden ">
                  {searchMethod === "list" ? (
                    <SelectedUser
                      role="parent"
                      onSelect={handleUserFound}
                      label="Pilih dari database"
                    />
                  ) : (
                    <SelectedUserByNik
                      onFound={handleUserFound}
                      onClear={handleClearUser}
                    />
                  )}
                </div>
                <button
                  type="button"
                  title="List View"
                  onClick={() => {
                    setSearchMethod("list");
                    handleClearUser();
                  }}
                  className={`p-2.5 rounded-xl transition-all ${searchMethod === "list" ? "bg-white dark:bg-slate-900 shadow-lg text-indigo-600 scale-105" : "text-slate-400"}`}
                >
                  <FaUserTie size={16} />
                </button>
                <button
                  type="button"
                  title="NIK Search"
                  onClick={() => {
                    setSearchMethod("nik");
                    handleClearUser();
                  }}
                  className={`p-2.5 rounded-xl transition-all ${searchMethod === "nik" ? "bg-white dark:bg-slate-900 shadow-lg text-indigo-600 scale-105" : "text-slate-400"}`}
                >
                  <HiOutlineIdentification size={20} />
                </button>
              </div>
            </div>

            <div className="min-h-30 lg:hidden ">
              {searchMethod === "list" ? (
                <SelectedUser
                  role="parent"
                  onSelect={handleUserFound}
                  label="Pilih dari database"
                />
              ) : (
                <SelectedUserByNik
                  onFound={handleUserFound}
                  onClear={handleClearUser}
                />
              )}
            </div>

            {formData.userId ? (
              <div className="mt-10 p-10 bg-linear-to-br from-slate-50 to-white dark:from-white/5 dark:to-transparent border border-slate-100 dark:border-white/10 rounded-4xl animate-in fade-in slide-in-from-bottom-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/5 rounded-full -mr-20 -mt-20 group-hover:bg-indigo-600/10 transition-all duration-700"></div>
                <div className="relative z-10 flex items-center gap-8">
                  <div className="w-24 h-24 rounded-4xl bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-indigo-300 dark:shadow-none italic">
                    {formData.username?.charAt(0)}
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] italic mb-2">
                      Verified Identity
                    </p>
                    <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter truncate leading-none mb-4">
                      {formData.username}
                    </h3>

                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black tracking-widest uppercase">
                        Registry
                      </div>
                      {formData.registrationNumber ? (
                        <p className="text-sm font-mono text-slate-500 dark:text-slate-400 font-black tracking-widest bg-white dark:bg-slate-800 px-4 py-1.5 rounded-xl border border-slate-100 dark:border-white/5 shadow-inner">
                          {formData.registrationNumber}
                        </p>
                      ) : (
                        <p className="text-[11px] font-black text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-4 py-1.5 rounded-xl border border-rose-100 dark:border-rose-500/20 italic uppercase tracking-[0.2em]">
                          Unregistered Account
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    title="Reset Selection"
                    onClick={handleClearUser}
                    className="p-5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/5 rounded-4xl transition-all duration-500 active:scale-90"
                  >
                    <HiOutlineXMark size={32} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:mt-10 lg:p-14 p-4 border-2 border-dashed border-slate-100 dark:border-white/5 rounded-4xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700 bg-slate-50/20">
                <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-4xl flex items-center justify-center text-slate-200 dark:text-slate-700 shadow-2xl mb-6">
                  <HiOutlineUserGroup size={48} />
                </div>
                <h4 className="text-[13px] font-black uppercase italic text-slate-400 tracking-[0.3em]">
                  System Standby
                </h4>
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-2 max-w-sm leading-relaxed italic">
                  Initiate identity lookup to proceed with pairing
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className=" space-y-6">
          <div className="bg-slate-900 dark:bg-indigo-900 p-10 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-200 dark:shadow-none min-h-full flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <HiOutlineUserGroup size={28} />
              </div>
              <h2 className="text-xl font-black italic uppercase tracking-tighter">
                Relasi Siswa
              </h2>
            </div>

            <div className="flex-1 space-y-6">
              <SelectedStudentModal
                selectedIds={formData.studentIds}
                onSelect={handleToggleStudent}
              />

              <div className="space-y-3 mt-6 max-h-72 overflow-y-auto pr-2 scrollbar-hide">
                {formData.studentIds.length > 0 ? (
                  formData.studentIds.map((id) => {
                    const student = students.find((s) => s.studentId === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group animate-in slide-in-from-right-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-xs">
                            {student?.user.username.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[11px] font-black uppercase italic tracking-wider leading-none">
                              {student?.user.username}
                            </p>
                            <p className="text-[9px] font-bold opacity-40 mt-1 uppercase tracking-widest">
                              NIS {student?.nis}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          title="Hapus"
                          onClick={() => handleToggleStudent(id)}
                          className="p-2 text-white/20 hover:text-rose-400 transition-colors"
                        >
                          <HiOutlineXMark size={20} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-16 text-center border-2 border-dashed border-white/10 rounded-4xl opacity-30">
                    <p className="text-[10px] font-black uppercase italic tracking-[0.3em]">
                      Belum Ada Relasi
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <button
                type="submit"
                title="Proses sinkronisasi data"
                disabled={isSubmitting || !formData.userId}
                className="w-full py-5 bg-white text-slate-900 rounded-4xl font-black uppercase tracking-[0.2em] italic text-xs shadow-xl hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-3 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  <>
                    <HiOutlineShieldCheck size={20} />
                    Finalize Connection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
