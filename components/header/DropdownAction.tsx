export const DropdownAction = ({ icon, title, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-500/10 transition-all group"
  >
    <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
      {icon}
    </span>
    <span className="text-[10px] font-black uppercase italic text-slate-700 dark:text-slate-300">
      {title}
    </span>
  </button>
);
