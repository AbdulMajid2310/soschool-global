"use client";

import HeaderProfileAdministration from "@/components/profile/administrations/HeaderProfileAdministration";
import TabsProfileAdministration from "@/components/profile/administrations/TabsProfileAdministration";

export default function StudentDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 space-y-4 md:p-4">
      <HeaderProfileAdministration />
      <TabsProfileAdministration />
      {/* Content */}
      <div className="shadow p-6">{children}</div>
    </div>
  );
}
