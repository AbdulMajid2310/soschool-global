import { Student } from "../student/types";
import { User } from "../user/types";

export interface SchoolParent {
  parentId: string;
  isActive: boolean;
  user: User;
  students: Student[];
  createdAt: string;
}

export interface CreateParentPayload {
  schoolId: string;
  username: string;
  nik: string;
  email: string;
  phone?: string;
  studentIds?: string[];
  password?: string;
}

export interface UpdateParentPayload extends Partial<CreateParentPayload> {
  isActive?: boolean;
}

export interface ParentState {
  parents: SchoolParent[];
  currentParent: SchoolParent | null;
  loading: boolean;
  error: string | null;
}

export interface CreateParentByUserIdPayload {
  schoolId: string;
  userId: string;
  studentIds?: string[];
}
