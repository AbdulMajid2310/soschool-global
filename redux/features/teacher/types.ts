import { User } from "../user/types";

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
}

export interface SchoolTeacher {
  teacherId: string;
  nip?: string;
  isActive: boolean;
  user: User;
}

export interface TeacherState {
  teachers: SchoolTeacher[];
  stats: TeacherStats; // Tambahkan ini
  selectedTeacherId: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface CreateTeacherPayload {
  schoolId: string;
  username: string;
  email: string;
  nik: string;
  password?: string;
  nip?: string;
  phone?: string;
}