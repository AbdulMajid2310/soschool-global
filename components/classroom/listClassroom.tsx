"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchClassrooms,
  createClassroom,
  updateClassroom,
  deleteClassroom,
} from "@/redux/features/classroom/thunk";
import { resetClassroomStatus } from "@/redux/features/classroom/slice";
import {
  HiOutlineAcademicCap,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineHashtag,
  HiOutlineArrowPath,
  HiOutlineUsers,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { HiOutlineCollection } from "react-icons/hi";
import { useSchoolId } from "@/hooks/useSchoolId";
import { SchoolClassroom } from "@/redux/features/classroom/types";

interface ClassroomManagerProps {
  onSelect?: (classroom: SchoolClassroom) => void;
}

export default function ClassroomManager({ onSelect }: ClassroomManagerProps) {
  const dispatch = useAppDispatch();
  const { classrooms, loading, success, error } = useAppSelector(
    (state) => state.classroom,
  );

  const schoolId = useSchoolId();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Update Initial State dengan capacity
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    level: "1",
    capacity: 0,
  });

  useEffect(() => {
    if (schoolId) dispatch(fetchClassrooms(schoolId));
  }, [dispatch, schoolId]);

  useEffect(() => {
    if (success) {
      toast.success(editingId ? "Kelas diperbarui!" : "Kelas ditambahkan!");
      resetForm();
      dispatch(resetClassroomStatus());
    }
    if (error) {
      toast.error(typeof error === "string" ? error : "Terjadi kesalahan");
      dispatch(resetClassroomStatus());
    }
  }, [success, error, dispatch, editingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "capacity" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return toast.error("Sesi sekolah tidak ditemukan.");

    const payload = {
      ...formData,
      schoolId,
      name: formData.name.toUpperCase(),
      major: formData.major ? formData.major.toUpperCase() : null,
    };

    if (editingId) {
      dispatch(updateClassroom({ id: editingId, ...payload }));
    } else {
      dispatch(createClassroom(payload));
    }
  };

  const startEdit = (cls: SchoolClassroom) => {
    setEditingId(cls.schoolClassroomId);
    setFormData({
      name: cls.name,
      level: cls.level?.toString() || "1",
      major: cls.major || "",
      capacity: cls.capacity || 0,
    });
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", major: "", level: "1", capacity: 0 });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!schoolId) return;
    if (window.confirm("Hapus kelas ini?")) {
      dispatch(deleteClassroom({ id, schoolId }));
    }
  };

  const inputClass =
    "w-full px-5 py-4 bg-slate-50 dark:bg-gray-900 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold dark:text-white text-sm";
  const labelClass =
    "text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 ml-4 mb-1 block";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-6 rounded-[2.5rem] border border-slate-100 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
            <HiOutlineCollection size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black dark:text-white italic uppercase tracking-tight">
              Katalog Ruangan
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Master Data Workspace
            </p>
          </div>
        </div>
        <button
          type="button"
          title="edit"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`p-4 rounded-2xl transition-all ${isFormOpen ? "bg-rose-50 text-rose-500 rotate-45" : "bg-slate-900 dark:bg-indigo-600 text-white"}`}
        >
          <HiOutlinePlus size={24} />
        </button>
      </div>

      {/* Form Section */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-950 p-10 rounded-[3rem] border-2 border-indigo-100 dark:border-indigo-900/30 animate-in slide-in-from-top space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Nama Ruangan</label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="X-IPA-1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Jurusan (Opsional)</label>
                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  placeholder="IPA / IPS"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Level</label>
                  <input
                    title="level"
                    type="number"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Kapasitas</label>
                  <input
                    title="capacity"
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-xs font-black uppercase text-slate-400"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
            >
              {loading ? (
                <HiOutlineArrowPath className="animate-spin" />
              ) : editingId ? (
                "Update Ruangan"
              ) : (
                "Simpan Ruangan"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classrooms.map((cls) => (
          <div
            key={cls.schoolClassroomId}
            onClick={() => {
              setSelectedId(cls.schoolClassroomId);
              if (onSelect) onSelect(cls);
            }}
            className={`group p-8 rounded-[3rem] border-2 transition-all cursor-pointer relative ${selectedId === cls.schoolClassroomId ? "border-indigo-500 bg-indigo-50/50" : "border-slate-50 dark:border-gray-900 bg-white dark:bg-gray-950 hover:border-indigo-200"}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`p-4 rounded-2xl ${selectedId === cls.schoolClassroomId ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-gray-800 text-slate-400"}`}
              >
                <HiOutlineAcademicCap size={32} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-300 uppercase italic">
                  Level {cls.level}
                </span>
                {selectedId === cls.schoolClassroomId && (
                  <HiOutlineCheckCircle
                    size={24}
                    className="text-indigo-600 mt-2"
                  />
                )}
              </div>
            </div>

            <h4 className="font-black text-slate-900 dark:text-white text-2xl tracking-tighter uppercase mb-4">
              {cls.name}
            </h4>

            <div className="flex items-center gap-6 border-t border-slate-100 dark:border-gray-800 pt-6">
              <div className="flex items-center gap-2 text-slate-400">
                <HiOutlineUsers size={16} />
                <span className="text-[10px] font-black uppercase italic">
                  {cls.capacity || 0} Siswa
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <HiOutlineHashtag size={16} />
                <span className="text-[10px] font-black uppercase italic">
                  {cls.major || "Umum"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              <button
                type="button"
                title="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  startEdit(cls);
                }}
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"
              >
                Edit
              </button>
              <button
                type="button"
                title="hapus"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(cls.schoolClassroomId);
                }}
                className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-colors"
              >
                <HiOutlineTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
