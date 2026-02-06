export interface UserRole {
  userRoleId: string;
  name: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRoleResponse {
  success: boolean;
  message: string;
  data: UserRole[];
}


export interface SingleUserRoleResponse {
  success: boolean;
  message: string;
  data: UserRole;
}

export interface UserRoleState {
  roles: UserRole[];
  role: UserRole | null;
  roleLoading: boolean;
  roleError: string | null;
}