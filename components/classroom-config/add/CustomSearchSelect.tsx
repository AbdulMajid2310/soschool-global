import {
  HiOutlineMagnifyingGlass,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";

interface Props {
  label: string;
  placeholder: string;
  searchValue: string;
  onSearchChange: (val: string) => void;
  options: any[];
  onSelect: (item: any) => void;
  selectedId: string;
  displayKey: string;
  subtitleKey?: string;
  idKey: string;
}

export const CustomSearchSelect = ({
  label,
  placeholder,
  searchValue,
  onSearchChange,
  options,
  onSelect,
  selectedId,
  displayKey,
  subtitleKey,
  idKey,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative space-y-3" ref={containerRef}>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 italic">
        {label}
      </label>
      <div className="relative">
        <HiOutlineMagnifyingGlass
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          className="w-full pl-14 pr-5 py-4 uppercase bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
          placeholder={placeholder}
          value={searchValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
        />
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute scrollbar-hide z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-60 overflow-y-auto animate-in fade-in zoom-in-95">
          {options.map((item) => (
            <div
              key={item[idKey]}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex justify-between items-center group"
            >
              <div>
                <p className="font-bold text-sm dark:text-white text-gray-700 group-hover:text-indigo-600 transition-colors">
                  {item[displayKey]}
                </p>
                {subtitleKey && (
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {item[subtitleKey]}
                  </p>
                )}
              </div>
              {selectedId === item[idKey] && (
                <HiOutlineCheckCircle className="text-indigo-600" size={20} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
