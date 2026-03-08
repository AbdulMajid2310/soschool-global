import React from "react";

export const QuickStat = ({ label, value, icon, color }: any) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 shadow-sm">
      <div className={`p-3 rounded-2xl text-white shadow-lg ${color}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-xl font-black text-slate-800 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    ACTIVE:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    MUTATED:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    DROPOUT: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${styles[status] || styles.ACTIVE}`}
    >
      {status}
    </span>
  );
};

export const LoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-4xl p-6 border border-slate-100 dark:border-slate-800 space-y-8"
        >
          {/* Header Skeleton */}
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl" />
            <div className="flex-1 pt-2 space-y-3">
              <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded-lg w-3/4" />
              <div className="h-3 bg-slate-50 dark:bg-slate-800/50 rounded-md w-1/2" />
            </div>
          </div>

          {/* Body Skeleton */}
          <div className="space-y-4">
            <div className="h-16 bg-slate-50 dark:bg-slate-800/30 rounded-3xl w-full" />
            <div className="flex gap-4 px-2">
              <div className="space-y-2">
                <div className="h-2 bg-slate-50 dark:bg-slate-800/50 rounded w-16" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
