import { School } from "../school/types";
import { User } from "../user/types";
import { UserRole } from "../userRole/type";

export interface UserAccess {
  userAccessId: string;
  user: User;
  school: School | null;
  role: UserRole;
  createdAt: string;
}

export interface UserAccessResponse {
  success: boolean;
  message: string;
  data: UserAccess[];
}

export interface SingleUserAccessResponse {
  success: boolean;
  message: string;
  data: UserAccess;
}

export interface UserAccessState {
  accessList: UserAccess[];
  loading: boolean;
  error: string | null;
}