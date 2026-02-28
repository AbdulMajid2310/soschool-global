import { User } from "../user/types";

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
}

export interface ImportErrorDetail {
  baris: number;
  nama: string;
  pesan: string;
}

export interface ImportReport {
  total: number;
  success: number;
  failed: number;
  errors: ImportErrorDetail[];
}

export interface SchoolTeacher {
  teacherId: string;
  nip?: string;
  nuptk?: string;
  niy?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface TeacherState {
  teachers: SchoolTeacher[];
  stats: TeacherStats;
  importReport: ImportReport | null;
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
  nuptk?: string;
  niy?: string;
  phone?: string;
}