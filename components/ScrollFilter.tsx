"use client";

interface ScrollFilterProps {
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
  labelCase?: "uppercase" | "capitalize" | "normal-case";
}

export const ScrollFilter = ({
  items,
  selectedItem,
  onSelect,
  labelCase = "capitalize",
}: ScrollFilterProps) => {
  return (
    <div className="relative group w-full border-y rounded-2xl dark:border-gray-500">
      {/* Container Scroll dengan Fade Effect di ujung (optional) */}
      <div className="flex items-center gap-2.5 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 scroll-smooth">
        {items.map((item) => {
          const isActive = selectedItem === item;

          return (
            <button
              type="button"
              key={item}
              onClick={() => onSelect(item)}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 rounded-full 
                transition-all duration-300 border font-poppins whitespace-nowrap
                text-[13px] font-medium tracking-wide
                ${labelCase}
                ${
                  isActive
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 scale-[1.02]"
                    : "bg-gray-50 dark:bg-gray-900 border-transparent text-gray-500 dark:text-gray-400 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 dark:hover:bg-gray-800"
                }
              `}
            >
              {/* Indikator Titik Aktif yang lebih subtle */}
              {isActive && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}

              <span>{item === "All" || item === "all" ? "Semua" : item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
