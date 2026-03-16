import { Student } from "../student/types";

export interface ClassroomStudent {
  classroomStudentId: string;
  status: "ACTIVE" | "MUTATED" | "DROPOUT" | "GRADUATED";
  joinedAt: string;
  entryDate: string;
  exitDate?: string;
  notes?: string;
  student: Student;
  classroomConfig: {
    classroomConfigId: string;
    classroom: {
      name: string;
    };
    period?: {
      academicYear: string;
      semester: string;
    };
  };
}

export interface PromotionMapping {
  studentId: string;
  fromConfigId: string;
  toConfigId: string;
}

export interface ClassroomStudentState {
  students: ClassroomStudent[];
  loading: boolean;
  error: string | null;
  success: boolean;
}
