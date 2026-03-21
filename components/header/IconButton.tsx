export const IconButton = ({ icon, count, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`relative p-2 rounded-xl border transition-all ${active ? "bg-blue-600 border-blue-400 text-white" : "bg-slate-50 dark:bg-white/5 border-transparent text-slate-400"}`}
  >
    <span className="text-lg">{icon}</span>
    {count && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-[8px] text-white w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
        {count}
      </span>
    )}
  </button>
);
