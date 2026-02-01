import HelpCenter from "./HelpCenter";

export default function PusatBantuan() {
  return (
    <div className="py-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
          Pusat <span className="text-cyan-600">Bantuan</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest italic opacity-70">
          Dukungan teknis & panduan operasional SoSchool
        </p>
      </div>

      <HelpCenter />
    </div>
  );
}