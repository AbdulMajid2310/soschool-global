import BehaviorTracker from "./BehaviorTracker";

export default function BehaviorPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-tight">
            Behavior <span className="text-indigo-600">Tracking</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest italic opacity-70">
            Monitor perkembangan karakter & poin XP siswa
          </p>
        </div>
      </div>

      <BehaviorTracker />
    </div>
  );
}