import StudentAnalytics from "./StudentAnalytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Student <span className="text-indigo-600">Analytics</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest italic opacity-70">
            Transformasi data menjadi wawasan pendidikan
          </p>
        </div>
      </div>

      <StudentAnalytics />
    </div>
  );
}