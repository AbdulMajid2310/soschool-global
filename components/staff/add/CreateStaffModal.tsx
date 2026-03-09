"use client";

import { useState } from "react";
import { FiUserPlus, FiFileText, FiList } from "react-icons/fi";
import AddSingleStaff from "./AddSingleStaff";
import CreatedStaffList from "./CreatedStaffList";
import ImportStaffCsv from "./ImportStaffCsv";

// Best Practice: Definisikan tipe di luar komponen
type ViewMethod = "list" | "input" | "import";

export default function CreateStaffSection() {
  const [method, setMethod] = useState<ViewMethod>("list");

  // Helper untuk render konten agar JSX tetap bersih
  const renderContent = () => {
    switch (method) {
      case "input":
        return <AddSingleStaff />;
      case "import":
        return <ImportStaffCsv />;
      case "list":
      default:
        return <CreatedStaffList />;
    }
  };

  const tabs = [
    { id: "list", label: "Daftar List", icon: FiList },
    { id: "input", label: "Input Manual", icon: FiUserPlus },
    { id: "import", label: "Import CSV", icon: FiFileText },
  ] as const;

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 font-poppins">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic">
            Registrasi Staff
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Kelola data staf SoSchool dalam satu manajemen terpusat.
          </p>
        </div>

        {/* Tab Navigation - Best Practice: Menggunakan Array Mapping */}
        <div className="flex bg-gray-100 dark:bg-gray-800/50 p-1.5 rounded-2xl w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = method === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMethod(tab.id)}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300
                  ${
                    isActive
                      ? "bg-white dark:bg-gray-700 text-indigo-600 shadow-sm ring-1 ring-black/5"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }
                `}
              >
                <Icon size={16} strokeWidth={isActive ? 3 : 2} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-100 bg-white dark:bg-gray-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-200/60 dark:shadow-none border border-gray-100 dark:border-gray-800">
        {/* Animasi sederhana saat perpindahan tab (Opsional: bisa gunakan Framer Motion) */}
        <div
          key={method}
          className="animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
