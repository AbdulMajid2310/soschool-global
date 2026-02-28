import ParentPortal from "./ParentPortal";

export default function CommunicationPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Parent <span className="text-rose-500">Portal</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-widest italic opacity-70">
            Membangun kolaborasi harmonis antara Guru dan Orang Tua
          </p>
        </div>
      </div>

      <ParentPortal />
    </div>
  );
}