"use client";

import React from "react";
import { FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";

interface ButtonAddDataProps {
  label?: string;
  onClick?: () => void;
  icon?: IconType;
  className?: string;
}

export default function ButtonAddData({
  label = "Tambah Data",
  onClick,
  icon: Icon = FiPlus,
  className = "",
}: ButtonAddDataProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 hover:pr-8 active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-center gap-2">
        <div className="  rounded-lg group-hover:rotate-90 transition-transform duration-500">
          <Icon className="size-6 " />
        </div>
        <span className="group-hover:translate-x-1 font-black transition-transform duration-300">
          {label}
        </span>
      </div>
    </button>
  );
}
