import { School } from "../school/types";
import { User } from "../user/types";
import { UserRole } from "../userRole/type";

/**
 * Base Entity Interface
 */
export interface UserAccess {
  userAccessId: string;
  user: User;
  school: School | null; // Null jika level System/Superadmin
  role: UserRole;
  createdAt: string;
}

/**
 * Request Interfaces
 */
export interface CreateUserAccessRequest {
  userId: string;
  userRoleId: string;
  schoolId?: string;
}

export interface AssignBulkRequest {
  schoolId: string;
  userRoleId: string;
  userIds: string[];
}

export interface UpdateUserAccessRequest {
  userRoleId: string;
}

/**
 * Response Interfaces
 */
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

/**
 * Interface untuk fitur "Switch School" (Grouped by School)
 */
export interface AccessDetail {
  userAccessId: string;
  role: UserRole;
}

export interface GroupedUserAccess {
  schoolId: string;
  schoolName: string;
  accessDetails: AccessDetail[];
}

export interface GroupedUserAccessResponse {
  success: boolean;
  message: string;
  data: GroupedUserAccess[];
}

/**
 * Redux State Interface
 */
export interface UserAccessState {
  accessList: UserAccess[];
  groupedAccess: GroupedUserAccess[]; // Untuk list sekolah di Sidebar/Navbar
  activeAccess: UserAccess | null; // Untuk menyimpan konteks akses yang sedang dipakai
  loading: boolean;
  error: string | null;
}
