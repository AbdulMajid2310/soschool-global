import { useRouter } from "next/navigation";
import { IoCaretBackOutline } from "react-icons/io5";

export default function ButtonBackUI() {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        title="kembali"
        onClick={() => router.back()}
        className="group lg:px-6 py-3 bg-white flex gap-2 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all active:scale-95"
      >
        <IoCaretBackOutline
          size={22}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="hidden lg:inline italic font-black uppercase text-sm">
          Kembali
        </span>
      </button>
    </div>
  );
}
