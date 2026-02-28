import { HiOutlineMagnifyingGlass, HiOutlineCheckCircle } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";

interface MemberProps {
    label: string;
    placeholder: string;
    searchValue: string;
    onSearchChange: (val: string) => void;
    // Options bisa berisi array Teacher[] atau Student[]
    options: any[];
    onSelect: (item: any) => void;
    selectedId?: string;
    // Tentukan tipe untuk membedakan label identitas (NIP/NIS)
    type: 'teacher' | 'student';
}

export const MemberSearchSelect = ({
    label, placeholder, searchValue, onSearchChange,
    options, onSelect, selectedId, type
}: MemberProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const idKey = type === 'teacher' ? 'teacherId' : 'studentId';
    const identityLabel = type === 'teacher' ? 'NIP' : 'NIS';
    const identityKey = type === 'teacher' ? 'nip' : 'nis';

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
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
                <HiOutlineMagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    className="w-full pl-14 pr-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder={placeholder}
                    value={searchValue}
                    onFocus={() => setIsOpen(true)}
                    onChange={(e) => {
                        onSearchChange(e.target.value);
                        setIsOpen(true);
                    }}
                />
            </div>

            {/* Dropdown Pop-up */}
            {isOpen && options.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {options.map((item) => {
                        const user = item.user;
                        const isSelected = selectedId === item[idKey];

                        return (
                            <div
                                key={item[idKey]}
                                onClick={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}
                                className="p-3 m-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl cursor-pointer flex justify-between items-center group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar Section */}
                                    <div className="w-11 h-11 relative shrink-0">
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.username}
                                                className="w-full h-full rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm uppercase">
                                                {user?.username?.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Identity Section */}
                                    <div>
                                        <p className="font-bold text-sm dark:text-white text-gray-700 group-hover:text-indigo-600 transition-colors">
                                            {user?.username || 'Unknown'}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                                            {identityLabel}: {item[identityKey] || '-'}
                                        </p>
                                    </div>
                                </div>

                                {isSelected && (
                                    <HiOutlineCheckCircle className="text-indigo-600" size={22} />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};