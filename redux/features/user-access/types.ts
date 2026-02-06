export interface UserAccess {
  userAccessId: string;
  user: {
    userId: string;
    username: string;
    email: string;
  };
  school: {
    schoolId: string;
    name: string;
  } | null;
  role: {
    userRoleId: string;
    name: string;
    url: string;
  };
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