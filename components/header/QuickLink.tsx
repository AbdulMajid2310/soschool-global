import Link from "next/link";

export const QuickLink = ({ href, active, icon }: any) => (
  <Link
    href={href}
    className={`p-2.5 rounded-xl transition-all ${active ? "text-blue-500 bg-blue-500/10" : "text-slate-400 hover:text-blue-500"}`}
  >
    <span className="text-xl">{icon}</span>
  </Link>
);
