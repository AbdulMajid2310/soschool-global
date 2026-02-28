import ClassAgenda from "./ClassAgenda";

export default function AgendaPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Agenda <span className="text-indigo-600">Harian</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest italic opacity-70">
            Kelola jadwal mengajar dan tugas profesional Anda
          </p>
        </div>
      </div>

      <ClassAgenda />
    </div>
  );
}