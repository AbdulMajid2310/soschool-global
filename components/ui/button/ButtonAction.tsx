"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ButtonActionProps {
  icon: React.ReactNode;
  to?: string; // Jadi opsional
  onClick?: (e: React.MouseEvent) => void; // Tambahkan ini
  className?: string;
  title?: string;
}

export default function ButtonAction({
  icon,
  to,
  onClick,
  className = "",
  title = "action",
}: ButtonActionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Jika ada props onClick (seperti fungsi download), jalankan itu
    if (onClick) {
      onClick(e);
      return;
    }

    // Jika tidak ada onClick tapi ada 'to', jalankan navigasi
    if (to) {
      const params = searchParams.toString();
      const query = params ? `?${params}` : "";
      router.push(`${pathname}/${to}${query}`);
    }
  };

  return (
    <button
      type="button"
      title={title}
      onClick={handleAction}
      className={`flex items-center justify-center p-2 rounded-xl transition-all active:scale-95 group shadow-lg ${className}`}
    >
      <span className="group-hover:rotate-12 transition-transform">{icon}</span>
    </button>
  );
}
