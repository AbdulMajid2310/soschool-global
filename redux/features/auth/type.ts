import { UserRole } from "../userRole/type";


export interface UserAuth {
  userId: string;
  username: string;
  email: string;
}

export interface SchoolAuth {
  schoolId: string;
  name: string;
}



export interface UserProfileData {
  userAccessId: string;
  user: UserAuth;
  school: SchoolAuth;
  role: UserRole;
}

export interface ProfileResponseAuth {
  success: boolean;
  message: string;
  data: UserProfileData;
}

export interface ProfileState {
  profile: UserProfileData | null; 
  authLoading: boolean;
  AuthError: string | null;
  success: boolean;
}

export interface LoginResponse {
  data: {
    sid: string;
  };
}

export interface SelectRoleResponse {
  data: {
    sid: string;
    redirectUrl: string;
  };
}