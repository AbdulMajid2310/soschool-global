"use client";

import SpecificScheduleDetail from "@/components/school-schedule/detailTeacher/SpecificScheduleDetail";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function DetailPage() {
  return (
    <div className="space-y-2">
      <ButtonBackUI />
      <SpecificScheduleDetail />
    </div>
  );
}
