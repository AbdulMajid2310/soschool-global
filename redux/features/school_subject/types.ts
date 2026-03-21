import { ClassroomConfig } from "../classroom-config/types";
import { SchoolClassroom } from "../classroom/types";
import { SchoolPeriod } from "../school-period/types";
import { StudyMaterial } from "../school_study_material/types";

export interface Subject {
  subjectId: string;
  name: string;
  description: string;
  sks: string;
  code: string;
  targetLevel: string;
  category: string;
  schoolId: string;
  classroomConfig: ClassroomConfig & { classroom: SchoolClassroom };
  materials: StudyMaterial[];
  period: SchoolPeriod;
}

export interface SubjectState {
  subjects: Subject[];
  currentSubject: Subject | null;
  loading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

export interface CreateSubjectPayload {
  name: string;
  description?: string;
  code: string;
  category: string;
  sks: string;
  schoolId: string;
  periodId: SchoolPeriod;
  classroomConfigId?: string;
}

export interface CreateBulkSubjectPayload {
  schoolId: string;
  periodId: string;
  subjects: Omit<CreateSubjectPayload, "schoolId" | "periodId">[];
}

export interface UpdateSubjectPayload extends Partial<CreateSubjectPayload> {
  subjectId: string;
}
