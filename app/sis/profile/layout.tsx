import React from "react";
import HeaderProfile from "./headerProfile";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="in-h-screen bg-slate-100 dark:bg-[#02040a] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Header Profile yang kita buat tadi */}
      <HeaderProfile />

      {/* Konten Halaman (Feed, About, dll) */}
      <main className="max-w-6xl mx-auto py-8">
        {children}
      </main>
    </div>
  );
}