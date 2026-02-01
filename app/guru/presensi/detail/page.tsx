import AttendanceManager from "./AttendanceManager";


export default function PresensiPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
          Presensi <span className="text-indigo-600">Digital</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase rounded-full border border-indigo-500/20">
            Kelas 10 - IPA 1
          </span>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
            • Senin, 2 Februari 2026
          </span>
        </div>
      </div>

      <AttendanceManager />
    </div>
  );
}