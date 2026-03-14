"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface GlobalAddButtonProps {
  icon: React.ReactNode;
  className?: string;
}

export default function ButtonAddNoTitle({
  icon,
  className = "",
}: GlobalAddButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = () => {
    router.push(`${pathname}/add`);
  };

  return (
    <button
      type="button"
      title="add"
      onClick={handleNavigate}
      className={`flex items-center justify-center p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95 group ${className}`}
    >
      <span className="group-hover:rotate-12 transition-transform">{icon}</span>
    </button>
  );
}
