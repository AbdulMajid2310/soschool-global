import TeacherCommunity from "./TeacherCommunity";

export default function KomunitasGuru() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Teacher <span className="text-amber-500">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest">Kolaborasi tanpa batas, mendidik lebih cerdas.</p>
        </div>
      </div>

      <TeacherCommunity />
    </div>
  );
}