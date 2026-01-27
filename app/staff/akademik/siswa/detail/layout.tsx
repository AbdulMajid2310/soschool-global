"use client";

import HeaderDetailStudent from "./headerDetailStudent";
import TabsStudentDetail from "./studentDetailLayout";


export default function StudentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div>
        <HeaderDetailStudent />
      </div>
      <div>
      <TabsStudentDetail/>
        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
