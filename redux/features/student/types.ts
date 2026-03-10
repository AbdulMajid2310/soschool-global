import { ClassroomConfig } from "../classroom-config/types";
import { User } from "../user/types";

export interface Student {
  studentId: string;
  nis: string;
  isActive: boolean;
  status: string;
  user: User;
  createdAt: string;
  classroom: ClassroomConfig;
}

export interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface CreateStudentPayload {
  nis: string;
  schoolId: string;
  username: string;
  nik: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface UpdateStudentPayload {
  studentId: string;
  schoolId: string;
  data: {
    nis: string;
    isActive?: boolean;
  };
}

export interface DeleteStudentPayload {
  studentId: string;
  schoolId: string;
}

export interface DeleteBulkStudentPayload {
  schoolId: string;
  studentIds: string[]; // Menggunakan Array string
}
