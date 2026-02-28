"use client";

import HeaderDetailTeacherAndStaff from "./headerDetailTeacherAndStaff";
import TabsTeacherAndStaff from "./tabsTeacherAndStaff";


export default function StudentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div>
        <HeaderDetailTeacherAndStaff />
      </div>
      <div>
      <TabsTeacherAndStaff/>
        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
