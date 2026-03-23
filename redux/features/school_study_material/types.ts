import { SchoolPeriod } from "../school-period/types";
import { Subject } from "../school_subject/types";
import { SchoolTeacher } from "../teacher/types";

// src/redux/features/study_material/types.ts
export interface StudyMaterial {
  studyMaterialId: string;
  title: string;
  description: string;
  fileUrl: string;
  subject?: Subject;
  author?: SchoolTeacher;
  period?: SchoolPeriod;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStudyMaterialDto {
  title: string;
  description?: string;
  file: File;
  subjectId: string;
  authorId: string;
  periodId: string;
}

export interface UpdateStudyMaterialDto extends Partial<CreateStudyMaterialDto> {
  isComplete?: boolean;
}

export interface StudyMaterialState {
  materials: StudyMaterial[];
  selectedMaterial: StudyMaterial | null; // Untuk fungsi findOne
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
}
