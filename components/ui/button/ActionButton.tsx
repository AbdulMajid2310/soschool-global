import React, { ReactNode, ReactElement } from "react";

// Definisikan interface untuk props ikon agar TS tenang
interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

interface ActionButtonProps {
  icon: ReactElement<IconProps>; // Gunakan interface tadi di sini
  color: string;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
}

export const ActionButton = ({
  icon,
  color,
  onClick,
  title,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
      }}
      disabled={disabled}
      title={title}
      className={`
        relative p-2.5 rounded-xl transition-all duration-300 group/btn
        bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700
        hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none
        hover:-translate-y-0.5 active:scale-90 disabled:opacity-50 
        disabled:cursor-not-allowed cursor-pointer
      `}
    >
      <span
        className={`${color} transition-transform duration-300 group-hover/btn:scale-110 block`}
      >
        {/* Sekarang TS tahu bahwa icon punya properti size dan strokeWidth */}
        {React.cloneElement(icon, {
          size: 18,
          strokeWidth: 2.5,
        })}
      </span>

      <div
        className={`absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-5 transition-opacity ${color.replace("text", "bg")}`}
      />
    </button>
  );
};
