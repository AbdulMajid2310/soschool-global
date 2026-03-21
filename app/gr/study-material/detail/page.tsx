"use client";

import StudyMaterialDetail from "@/components/school_study_materials/StudyMaterialDetail";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function DetailPage() {
  return (
    <div className="space-y-4">
      <ButtonBackUI />
      <StudyMaterialDetail />
    </div>
  );
}
