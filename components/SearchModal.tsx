import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineArrowPath } from "react-icons/hi2";

interface Props {
  onSearch: (query: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const SearchModal = ({ onSearch, onRefresh, isLoading }: Props) => {
  const [localQuery, setLocalQuery] = useState("");

  const handleClear = () => {
    setLocalQuery("");
    onSearch("");
  };

  return (
    <div className="flex  gap-4 items-center">
      {/* Search Input Group */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(localQuery);
        }}
        className="relative group w-full max-w-md"
      >
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <HiOutlineMagnifyingGlass size={20} strokeWidth={2.5} />
        </div>

        <input
          type="text"
          placeholder="Cari kelas atau jurusan..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="w-full pl-14 pr-32 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl outline-none font-bold text-sm shadow-sm focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
        />

        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          Cari
        </button>
      </form>

      {/* Refresh Button */}
      <button
        type="button"
        onClick={() => {
          handleClear();
          onRefresh();
        }}
        disabled={isLoading}
        className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:rotate-180 duration-500 disabled:opacity-50"
        title="Refresh Data"
      >
        <HiOutlineArrowPath
          size={20}
          strokeWidth={2.5}
          className={isLoading ? "animate-spin" : ""}
        />
      </button>
    </div>
  );
};
