import TeacherWellness from "./TeacherWellness";

export default function WellnessPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Teacher <span className="text-emerald-500 text-glow-emerald">Wellness</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest italic opacity-70">
            Kesehatan mental dan kebahagiaan Anda adalah prioritas kami
          </p>
        </div>
      </div>

      <TeacherWellness />
    </div>
  );
}