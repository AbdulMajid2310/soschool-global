import { useState } from "react";
import toast from "react-hot-toast";
import { useSchoolId } from "@/hooks/useSchoolId";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createClassroom } from "@/redux/features/classroom/thunk";
import {
  HiOutlineXMark,
  HiOutlineHashtag,
  HiOutlineHomeModern,
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineUsers, // Ikon baru untuk Kapasitas
} from "react-icons/hi2";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddClassroomModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.classroom);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  // Menambahkan capacity ke dalam state
  const [formData, setFormData] = useState({
    name: "",
    level: "1",
    major: "",
    capacity: 0,
  });

  const schoolId = useSchoolId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId || !formData.name.trim())
      return toast.error("Nama wajib diisi");

    const payload = {
      schoolId,
      name: formData.name.trim().toUpperCase(),
      level: formData.level,
      capacity: Number(formData.capacity), // Memastikan dikirim sebagai number
      major:
        formData.major.trim() === ""
          ? null
          : formData.major.trim().toUpperCase(),
    };

    dispatch(createClassroom(payload))
      .unwrap()
      .then(() => {
        onClose();
        setFormData({ name: "", level: "1", major: "", capacity: 0 });
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-4xl shadow-2xl border border-transparent dark:border-slate-800 overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
            Ruangan Baru
          </h3>
          <button
            type="button"
            title="close"
            onClick={onClose}
            className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-slate-400 hover:text-rose-600 rounded-2xl transition-all cursor-pointer"
          >
            <HiOutlineXMark size={24} strokeWidth={2.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Level Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">
                Tingkat / Level
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLevelOpen(!isLevelOpen)}
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-4xl flex items-center justify-between outline-none font-bold border-2 border-transparent focus:border-indigo-500/20 transition-all cursor-pointer relative"
                >
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                    <HiOutlineHashtag size={18} />
                  </div>
                  <span className="uppercase text-sm">
                    Lvl {formData.level}
                  </span>
                  <div
                    className={`text-slate-400 transition-transform duration-300 ${isLevelOpen ? "rotate-180" : ""}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>
                {isLevelOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsLevelOpen(false)}
                    />
                    <div className="absolute z-20 top-[110%] left-0 w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                      <div className="max-h-40 overflow-y-auto scrollbar-hide">
                        {[...Array(12)].map((_, i) => {
                          const val = (i + 1).toString();
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, level: val });
                                setIsLevelOpen(false);
                              }}
                              className={`w-full px-6 py-3 text-left text-sm font-bold transition-all flex items-center justify-between ${formData.level === val ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-600/10 dark:text-indigo-400" : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300"}`}
                            >
                              Level {val}
                              {formData.level === val && (
                                <HiOutlineCheckCircle size={16} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Capacity Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">
                Kapasitas
              </label>
              <div className="relative">
                <HiOutlineUsers
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="number"
                  min="0"
                  className="w-full pl-12 pr-4 py-5 bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-4xl outline-none font-bold text-sm"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="30"
                />
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">
              Nama Ruangan
            </label>
            <div className="relative">
              <HiOutlineHomeModern
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                required
                className="w-full pl-14 pr-8 py-5 bg-slate-50 uppercase dark:bg-slate-800/50 dark:text-white rounded-4xl outline-none font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="KELAS X-A"
              />
            </div>
          </div>

          {/* Major Input */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">
              Jurusan (Opsional)
            </label>
            <div className="relative">
              <HiOutlineAcademicCap
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                className="w-full pl-14 pr-8 py-5 bg-slate-50 uppercase dark:bg-slate-800/50 dark:text-white rounded-4xl outline-none font-bold"
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
                placeholder="IPA, IPS"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-4xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <HiOutlineCheckCircle size={20} /> Daftarkan Ruangan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
