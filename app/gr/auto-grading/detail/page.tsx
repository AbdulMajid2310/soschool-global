import AutoGrading from "./AutoGrading";

export default function GradingPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Auto <span className="text-cyan-500">Grading</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest italic opacity-70">
            Penilaian cerdas dengan asisten AI terintegrasi
          </p>
        </div>
        <button className="px-8 py-4 bg-linear-to-r from-cyan-600 to-emerald-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all">
          Mulai Penilaian Otomatis
        </button>
      </div>

      <AutoGrading />
    </div>
  );
}