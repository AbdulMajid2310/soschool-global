

export interface UserAuth {
  userId: string;
  username: string;
  email: string;
}

export interface SchoolAuth {
  schoolId: string;
  name: string;
}

export interface RoleAuth {
  name: string;
  url: string;
}

export interface UserProfileData {
  userAccessId: string;
  user: UserAuth;
  school: SchoolAuth;
  role: RoleAuth;
}

export interface ProfileResponseAuth {
  success: boolean;
  message: string;
  data: UserProfileData;
}

export interface ProfileState {
  profile: UserProfileData | null; 
  loading: boolean;
  error: string | null;
  success: boolean;
}