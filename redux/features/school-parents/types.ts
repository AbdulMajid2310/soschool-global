import { Student } from "../student/types";
import { User } from "../user/types";

export interface SchoolParent {
  parentId: string;
  isActive: boolean;
  user: User;
  students: Student[];
  createdAt: string;
}

export interface ParentStats {
  total: number;
  active: number;
  inactive: number;
}

export interface CreateParentPayload {
  schoolId: string;
  username: string;
  nik: string;
  email: string;
  gender: string;
  phone?: string;
  studentIds?: string[];
  password?: string;
}

export interface UpdateParentPayload extends Partial<
  Omit<CreateParentPayload, "schoolId">
> {
  isActive?: boolean;
}

export interface CreateParentByUserIdPayload {
  schoolId: string;
  userId: string;
  studentIds?: string[];
}

export interface ParentState {
  parents: SchoolParent[];
  stats: ParentStats;
  currentParent: SchoolParent | null;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface ParentResponse {
  parents: SchoolParent[];
  stats: ParentStats;
}
